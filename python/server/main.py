import json
import os
import subprocess
from contextlib import asynccontextmanager

from anyio.streams.file import FileWriteStream
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

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
