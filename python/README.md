# Python

- [Python](#python)
  - [Overview of packages](#overview-of-packages)
  - [Installing dependencies](#installing-dependencies)
  - [Jupyter notebook](#jupyter-notebook)

## Overview of packages

- `examples`: random notebooks exploring huggingface
- `musiclm`: the unofficial way to access Google's MusicLM via http and cached token
- `server`: simple FastAPI server, that can do backend operations and serve models locally
  - Serves on http://localhost:8000
  - Has auto-generated OpenAPI docs on http://localhost:8000/docs

## Installing dependencies

1. Put packages to install in `requirements.txt`
2. Run `make install-dependencies` to install them

## Jupyter notebook

1. `make jupyter` will start an interactive notebook for prototyping.
2. Alternatively, you can open an `.ipynb` notebook in VSCode. Click the play button, and select the venv for the kernel.
