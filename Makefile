setup-system:
	brew install pyenv pyenv-virtualenv ffmpeg
	brew install --cask audacity
	brew install npm
	npm install -g pnpm
	./scripts/shell-config.sh
	
