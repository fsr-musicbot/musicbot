.PHONY: python javascript

# installs python and pnpm
setup-system:
	brew install pyenv pyenv-virtualenv ffmpeg
	brew install --cask audacity
	npm install -g pnpm
	./scripts/shell-config.sh
	
# installs python, sets up a venv and installs dependencies 
setup-python:
	pyenv install 3.10.13
	pyenv virtualenv 3.10.13 venv-3.10.13
	pyenv local venv-3.10.13
	pip install --upgrade pip
	pip install -r python/requirements.txt

# activates the virtualenv, installs any dependencies 
python:
	pyenv local venv-3.10.13
	pip install -r python/requirements.txt
	
# starts a jupyter notebook
jupyter: python
	jupyter lab


javascript:
	pnpm -C javascript install 
