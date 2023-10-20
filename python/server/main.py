from fastapi import FastAPI
from pydantic import BaseModel
import subprocess

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


class MusicGenRequestBody(BaseModel):
    file_path: str
    start_time: float
    end_time: float


@app.post("/musicgen")
def generate_music(body: MusicGenRequestBody):
    # extract a slice of audio from the file path and save it as tmp.mp3
    subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-i",
            body.file_path,
            "-ss",
            str(body.start_time),
            "-to",
            str(body.end_time),
            "tmp.mp3",
        ]
    )

    # Your code for generating music goes here
    return {"success": True}
