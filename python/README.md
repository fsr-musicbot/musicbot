# Python

- [Python](#python)
  - [Overview of packages](#overview-of-packages)
  - [Installing dependencies](#installing-dependencies)
  - [Jupyter notebook](#jupyter-notebook)

## Overview of packages

- `examples`: random notebooks exploring huggingface
- `musiclm`: the unofficial way to access Google's MusicLM via http and cached token
- `server`: simple flask server, that can serve models locally

## Installing dependencies

1. Put packages to install in `python/requirements.txt`
2. Run `cd ~/musicbot && make python` to install them

## Jupyter notebook

1. `cd ~/musicbot && make jupyter` will start an interactive notebook for prototyping.
2. Alternatively, you can open an `.ipynb` notebook in VSCode. Click the play button, and select the venv for the kernel.
