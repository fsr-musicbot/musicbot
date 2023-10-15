.PHONY: python

setup-system:
	brew install pyenv pyenv-virtualenv
	npm install -g pnpm
	./scripts/shell-config.sh
	
setup-python:
	pyenv install 3.10.13
	pyenv virtualenv 3.10.13 venv-3.10.13
	pyenv local venv-3.10.13
	pip install --upgrade pip
	pip install -r python/requirements.txt

python:
	pyenv local venv-3.10.13
	pip install -r python/requirements.txt
	