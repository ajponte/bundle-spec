#!/usr/bin/env bash

# Bail immediately upon errors
set -e

# Ensure nvm is sourced correctly
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

# Check if node_modules directory exists to avoid reinstalling dependencies
if [ -d "node_modules" ]; then
    echo "Dependencies already installed, skipping npm install"
else
    echo "Installing dependencies"
    nvm install
    nvm use

      # If package-lock.json exists, use npm ci
    if [ -f "package-lock.json" ]; then
        npm ci
    else
        npm install  # Generate the package-lock.json file if it doesn't exist
    fi
fi

# Run bundle
echo "Bundling schema"
npm run bundle-modular-schema
echo "Success"
