import os
from MusicLM import Music

if not os.path.exists("generated"):
    os.makedirs("generated")

# Create a new instance of Music
music = Music()

input = "Ambient, soft sounding music I can study to"
tracks = music.get_tracks(input, 2)

if isinstance(tracks, list):
    music.b64toMP3(tracks, f"./generated/{input}")
