# Research

- [Research](#research)
  - [Text-to-music](#text-to-music)
  - [Voice-to-voice](#voice-to-voice)
    - [Singing voice conversion (SVC)](#singing-voice-conversion-svc)
      - [Diff-SVC](#diff-svc)
      - [So-VITS](#so-vits)
    - [Plain voice conversion](#plain-voice-conversion)
  - [Text-to-speech](#text-to-speech)
  - [Stemming](#stemming)
  - [Voice-to-MIDI](#voice-to-midi)
  - [MIDI-to-voice](#midi-to-voice)

## Text-to-music

- https://huggingface.co/spaces/facebook/MusicGen - good for melodies, instrumentals. Maybe we need to separate the vocals from the audio. It can play instruments, conditioned on a melody. It seems to ignore the vocals from the input file.
- https://openai.com/research/jukebox - music completions, new lyrics, conditioning
- https://www.beatoven.ai/ - Make music for moods

## Voice-to-voice

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

- https://elevenlabs.io/
- https://app.uberduck.ai/voice-to-voice - not really singing, more like plain voices or rap music

## Text-to-speech

- https://github.com/neonbjb/tortoise-tts

## Stemming

Separating vocals from instrumental.

- https://huggingface.co/spaces/abidlabs/music-separation
- https://mvsep.com/en
- https://www.lalal.ai/

## Voice-to-MIDI

- https://vochlea.com/

## MIDI-to-voice

- https://github.com/ORI-Muchim/Midi-to-Singing-Voice-Conversion - takes lyrics, MIDI and a voice, and creates a song with the voice singing the lyrics
