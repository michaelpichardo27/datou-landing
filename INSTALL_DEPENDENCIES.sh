#!/bin/bash

# Installation script for DATOU Landing Page Test Dependencies
# This script will install Node.js and the required testing packages

echo "🚀 DATOU Landing Page - Test Dependencies Installation"
echo "========================================================"
echo ""

# Check if Homebrew is installed
if ! command -v brew &> /dev/null; then
    echo "❌ Homebrew is not installed."
    echo "📦 Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
else
    echo "✅ Homebrew is already installed"
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "📦 Installing Node.js via Homebrew..."
    brew install node
else
    echo "✅ Node.js is already installed (version: $(node -v))"
fi

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "📦 Installing pnpm..."
    npm install -g pnpm
else
    echo "✅ pnpm is already installed (version: $(pnpm -v))"
fi

# Navigate to project directory
cd "$(dirname "$0")"

echo ""
echo "📦 Installing project dependencies..."
pnpm install

echo ""
echo "📦 Installing test dependencies..."
pnpm add -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom @vitejs/plugin-react

echo ""
echo "✅ Installation complete!"
echo ""
echo "🧪 You can now run tests using:"
echo "   pnpm test          # Run tests in watch mode"
echo "   pnpm test:ui       # Run tests with UI"
echo "   pnpm test:run      # Run tests once"
echo "   pnpm test:coverage # Run tests with coverage"
echo ""

