import json
import os
import random
import subprocess
from contextlib import asynccontextmanager
import whisper

import replicate
import requests
from anyio.streams.file import FileWriteStream
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pydub import AudioSegment

from .utils.main import mp3_to_base64_data_uri

load_dotenv()

dirname = os.path.dirname(__file__)
assetsDirname = os.path.join(dirname, "assets")


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    A context manager that mounts and unmounts the application's lifespan.

    Args:
        app (FastAPI): The FastAPI application instance.
    """
    # mount
    path = os.path.join(dirname, "openapi.json")
    schema = json.dumps(app.openapi(), indent=2).encode("utf-8")
    async with await FileWriteStream.from_path(path) as stream:
        await stream.send(schema)

    # unmount
    yield
    # unmount code here


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


class MusicGenRequestBody(BaseModel):
    file_path: str
    start_time: float
    end_time: float
    prompt: str


@app.post("/musicgen")
def generate_music(body: MusicGenRequestBody):
    input_audio_path = body.file_path

    # extract a slice of audio from the file path and save it as tmp.mp3
    sliced_audio_path = os.path.join(assetsDirname, "sliced.mp3")
    subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-i",
            input_audio_path,
            "-ss",
            str(body.start_time),
            "-to",
            str(body.end_time),
            sliced_audio_path,
        ]
    )

    sliced_audio_data_uri = mp3_to_base64_data_uri(sliced_audio_path)

    # send it to musicgen
    output = replicate.run(
        "meta/musicgen:7a76a8258b23fae65c5a22debb8841d1d7e816b75c2f24218cd2bd8573787906",
        input={
            # allows for conditioning on a melody
            "model_version": "melody",
            # prompt
            "prompt": body.prompt,
            # audio file to generate music from
            "input_audio": sliced_audio_data_uri,
            # number of seconds to generate
            # we want to replace the input audio with the generated audio
            "duration": int(abs(body.end_time - body.start_time)),
            # if true, then it will continue the input audio
            # if false, it will adopt the style of the input audio
            "continuation": False,
            # I think replicate has some caching going on so cache busting might
            # be needed
            "seed": random.randint(0, 100),
            # mp3 or wav output
            "output_format": "mp3",
        },
    )
    print(output)

    # get the output audio from url
    generated_audio_path = body.file_path + ".generated.mp3"
    response = requests.get(output)
    with open(generated_audio_path, "wb") as outfile:
        outfile.write(response.content)

    # now mutate the original audio with the generated audio
    input_audio_segment = AudioSegment.from_mp3(input_audio_path)
    generated_audio_segment = AudioSegment.from_mp3(generated_audio_path)
    mutated_audio_segment = (
        # pydub expects milliseconds
        input_audio_segment[: body.start_time * 1000]
        + generated_audio_segment
        + input_audio_segment[body.end_time * 1000 :]
    )

    # save the mutated audio
    mutated_audio_path = os.path.join(assetsDirname, "mutated.mp3")
    mutated_audio_segment.export(mutated_audio_path, format="mp3")

    # Your code for generating musicx goes here
    return {"success": True, "filepath": body.file_path}

class LyricsGenRequestBody(BaseModel):
    file_path: str
    start_time: float
    end_time: float

@app.post("/whisper")
def generate_lyrics(body: LyricsGenRequestBody): 
    model = whisper.load_model("base")
    result = model.transcribe(body.file_path)
    print(result["text"])