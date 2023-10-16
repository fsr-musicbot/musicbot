# Musicbot

- [Musicbot](#musicbot)
  - [Setup](#setup)
  - [VSCode](#vscode)
  - [Python](#python)
    - [Jupyter notebook](#jupyter-notebook)
  - [JavaScript](#javascript)

## Setup

1. `cd musicbot`
2. Install system dependencies `make setup-system`
3. Open a new terminal tab and run `make setup-python`

## VSCode

1. `cmd+shift+p`: "Install code command in PATH"
2. Then in a new terminal, `cd musicbot && code .`. This should pick up on the shell config (including the venv).

## Python

1. Put packages to install in `python/requirements.txt`
2. Run `make python` to install them

### Jupyter notebook

1. `make jupyter` will start an interactive notebook for prototyping.
2. Alternatively, you can open an `.ipynb` notebook in VSCode. Click the play button, and select the venv for the kernel.

## JavaScript

1. `cd musicbot/javascript`
2. `pnpm install` to install dependencies
3. `pnpm run dev` is an example script inside `package.json`. It uses `tsx` to run TypeScript.
