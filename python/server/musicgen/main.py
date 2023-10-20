import os

from audiocraft.data.audio import audio_write
from audiocraft.models import MusicGen

dirname = os.path.dirname(__file__)
model = MusicGen.get_pretrained("facebook/musicgen-melody")


def run_musicgen():
    # generate 8 seconds.
    model.set_generation_params(duration=8)

    # generates 4 unconditional audio samples
    # wav = model.generate_unconditional(4)

    descriptions = ["happy rock", "energetic EDM", "sad jazz"]

    # generates 3 samples.
    wav = model.generate(descriptions)

    # sample = os.path.join(dirname, "../server/tmp.mp3")
    # melody, sr = torchaudio.load(sample)

    # generates using the melody from the given audio and
    # the provided descriptions.
    # wav = model.generate_with_chroma(descriptions, melody[None].expand(3, -1, -1), sr)
    print(wav)

    for idx, one_wav in enumerate(wav):
        path = os.path.join(dirname, f"{idx}.wav")
        # Will save under {idx}.wav, with loudness normalization at -14 db LUFS.
        audio_write(
            path,
            one_wav.cpu(),
            model.sample_rate,
            strategy="loudness",
            loudness_compressor=True,
        )
