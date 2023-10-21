import json
import os
import subprocess
from contextlib import asynccontextmanager

import replicate
from anyio.streams.file import FileWriteStream
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from .utils.main import mp3_to_base64_data_uri
import requests


load_dotenv()

dirname = os.path.dirname(__file__)


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


@app.post("/musicgen")
def generate_music(body: MusicGenRequestBody):
    input_audio_path = body.file_path

    # extract a slice of audio from the file path and save it as tmp.mp3
    sliced_audio_path = os.path.join(dirname, "sliced.mp3")
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
            "prompt": "a country guitar riff",
            # audio file to generate music from
            "input_audio": sliced_audio_data_uri,
            # number of seconds to generate
            "duration": 8,
            # if true, then it will continue the input audio
            # if false, it will adopt the style of the input audio
            "continuation": True,
            # can be wav or mp3
            "output_format": "mp3",
        },
    )

    print(output)

    # get the output audio from url
    generated_audio_path = os.path.join(dirname, "generated.mp3")
    response = requests.get(output)
    with open(generated_audio_path, "wb") as outfile:
        outfile.write(response.content)

    # Your code for generating music goes here
    return {"success": True}
