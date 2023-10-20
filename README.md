# Musicbot

- [Musicbot](#musicbot)
  - [Setup](#setup)
  - [VSCode](#vscode)
    - [Recommended extensions](#recommended-extensions)
  - [Python](#python)
  - [JavaScript](#javascript)
  - [Troubleshooting](#troubleshooting)
  - [Audio editing](#audio-editing)
  - [Research](#research)
  - [Contributing code](#contributing-code)

## Setup

1. `cd musicbot`
2. Install system dependencies `make setup-system`
3. Open a new terminal tab and run `make setup-python`

## VSCode

1. `cmd+shift+p`: "Install code command in PATH"
2. Then in a new terminal, `cd musicbot && code .`. This should pick up on the shell config (including the venv).

### Recommended extensions

Some recommended extensions are added in `.vscode/extensions.json`. When starting VSCode, you will see a popup asking if you want to install them. Click yes. This will give you nice formatting, linting etc.

## Python

See [python/README.md](./python/README.md)

## JavaScript

See [javascript/README.md](./javascript/README.md)

## Troubleshooting

- Issues with `ffmpeg`? Run `ffmpeg -version`. If error, then do `brew update`, `brew upgrade`, `brew reinstall ffmpeg`.

## Audio editing

- [Audacity](https://www.audacityteam.org/) - free
- [Fission](https://rogueamoeba.com/fission/) - paid
- [GarageBand](https://www.apple.com/mac/garageband/) - free
- [Logic Pro](https://www.apple.com/logic-pro/) - paid

## Research

- https://docs.google.com/spreadsheets/d/1JxU7ohP_io_oanKfflreld1SaABMPdboTUK2IQZmmCk/edit#gid=0

## Contributing code

- You can cannot commit code directly to `main`, you must make a PR and merge as squash commit instead.
