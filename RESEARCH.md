# Research

- [Research](#research)
  - [Text-to-speech](#text-to-speech)
  - [Text-to-music](#text-to-music)
  - [Voice-to-voice (voice conversion)](#voice-to-voice-voice-conversion)
    - [Singing voice conversion (SVC)](#singing-voice-conversion-svc)
      - [Diff-SVC](#diff-svc)
      - [So-VITS](#so-vits)
    - [Plain voice conversion](#plain-voice-conversion)
  - [Music-to-music](#music-to-music)
  - [Stemming](#stemming)
    - [Audio to MIDI](#audio-to-midi)
  - [Voice-to-MIDI](#voice-to-midi)
  - [MIDI-to-voice](#midi-to-voice)
  - [Audio effects and analysis (e.g. EQ)](#audio-effects-and-analysis-eg-eq)
  - [Running models](#running-models)

## Text-to-speech

- https://github.com/neonbjb/tortoise-tts

## Text-to-music

- AudioCraft: MusicGen (Meta)
  - https://github.com/facebookresearch/audiocraft - good for melodies, instrumentals. Maybe we need to separate the vocals from the audio. It can play instruments, conditioned on a melody. It seems to ignore the vocals from the input file.
  - https://huggingface.co/spaces/facebook/MusicGen
- MusicLM (Google)
  - https://google-research.github.io/seanet/musiclm/examples/
- MusicLDM
  - https://musicldm.github.io/
  - They say they are better than Riffusion, AudioLDM, MuBERT
- AudioLDM
  - https://audioldm.github.io/audioldm2/
- OpenAI
  - https://openai.com/research/jukebox - music completions, new lyrics, conditioning
- Dance Diffusion
  - https://wandb.ai/wandb_gen/audio/reports/A-Gentle-Introduction-to-Dance-Diffusion--VmlldzoyNjg1Mzky
  - https://drive.google.com/file/d/1nEFEpK27v0nytNXmmYQb06X_RI6kKPve/view - guide
- Beatoven
  - https://www.beatoven.ai/ - Make music for moods

## Voice-to-voice (voice conversion)

### Singing voice conversion (SVC)

#### Diff-SVC

- https://github.com/prophesier/diff-svc
- https://docs.google.com/document/d/1nA3PfQ-BooUpjCYErU-BHYvg2_NazAYJ0mvvmcjG40o/edit#heading=h.x5mtoparsl14 - tutorial

#### So-VITS

- https://github.com/voicepaw/so-vits-svc-fork (used for Kanye deepfake)
- https://github.com/svc-develop-team/so-vits-svc - original repo
- https://docs.google.com/spreadsheets/d/1qzeFdpUPr7E0jOFwWSXd8LF30ZLjz1CSVEBiG8gPHTU/edit#gid=1792554832 - Models for various artists 🙀
- https://colab.research.google.com/drive/1z31ZfcisCXCSGA5jeid0UNjiHb9oupuV#scrollTo=oFr2MWaQfR6X

### Plain voice conversion

- https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI
- https://elevenlabs.io/
- https://app.uberduck.ai/voice-to-voice - not really singing, more like plain voices or rap music

## Music-to-music

- https://magenta.tensorflow.org/music-vae - blending/interpolation between music
- https://experiments.withgoogle.com/ai/beat-blender/view/

## Stemming

Separating vocals/instrumental.

- https://huggingface.co/spaces/abidlabs/music-separation
- https://github.com/Anjok07/ultimatevocalremovergui
- https://mvsep.com/en
- https://www.lalal.ai/
- https://www.stemroller.com/

### Audio to MIDI

- https://samplab.com/ (this one converts each stem to MIDI too and lets you edit it)
- https://github.com/spotify/basic-pitch

## Voice-to-MIDI

- https://vochlea.com/

## MIDI-to-voice

- https://github.com/ORI-Muchim/Midi-to-Singing-Voice-Conversion - takes lyrics, MIDI and a voice, and creates a song with the voice singing the lyrics

## Audio effects and analysis (e.g. EQ)

- https://www.soundtheory.com/home - Gullfoss: AI assisted EQ
- https://engineering.atspotify.com/2021/09/introducing-pedalboard-spotifys-audio-effects-library-for-python/ - distortion, convolution, reverb, other DAW effects in Python.
- https://github.com/Dream-High/RMVPE - pitch estimation
- https://github.com/openvpi/audio-slicer - slice audio into pieces and remove silences

## Running models

- Replicate e.g. https://replicate.com/meta/musicgen
