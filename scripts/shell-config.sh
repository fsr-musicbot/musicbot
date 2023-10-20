if ! grep -q "pyenv init" ~/.zshrc; then
  cat <<EOT >> ~/.zshrc
export PYENV_ROOT="\$HOME/.pyenv"
command -v pyenv >/dev/null || export PATH="\$PYENV_ROOT/bin:\$PATH"
eval "\$(pyenv init -)"
eval "\$(pyenv virtualenv-init -)"
EOT
fi
