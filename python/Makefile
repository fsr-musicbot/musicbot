.PHONY: server

setup-python:
	pyenv install 3.10.13
	pyenv virtualenv 3.10.13 venv-3.10.13
	pyenv local venv-3.10.13
	pip install --upgrade pip
	pip install -r python/requirements.txt

set-env:
	pyenv local venv-3.10.13

install-dependencies: set-env
	pip install -r requirements.txt

server: install-dependencies
	uvicorn main:app --reload

jupyter: install-dependencies
	jupyter lab

