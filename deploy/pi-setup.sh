#!/bin/bash
# ============================================================
# Raspberry Pi Setup Script for Mnemonic Medium
# Run this ONCE on your Pi to prepare it for deployments
# Usage: bash pi-setup.sh
# ============================================================

set -e

DEPLOY_DIR="/var/www/mnemonic"
SSH_KEY_PATH="$HOME/.ssh/github_deploy_key"

echo "🍓 Setting up Raspberry Pi for Mnemonic Medium deployment..."
echo ""

# 1. Create web directory
echo "📁 Creating deploy directory: $DEPLOY_DIR"
sudo mkdir -p "$DEPLOY_DIR"
sudo chown "$USER:$USER" "$DEPLOY_DIR"

# 2. Generate SSH key for GitHub Actions
if [ ! -f "$SSH_KEY_PATH" ]; then
    echo "🔑 Generating SSH deploy key..."
    ssh-keygen -t ed25519 -f "$SSH_KEY_PATH" -N "" -C "github-actions-deploy"
    
    # Add to authorized_keys so GitHub can rsync in
    cat "${SSH_KEY_PATH}.pub" >> "$HOME/.ssh/authorized_keys"
    chmod 600 "$HOME/.ssh/authorized_keys"
    
    echo ""
    echo "============================================================"
    echo "🔐 IMPORTANT: Copy this PRIVATE key to GitHub Secrets"
    echo "   Go to: GitHub repo → Settings → Secrets → Actions"
    echo "   Create secret named: PI_SSH_KEY"
    echo "   Paste the following:"
    echo "============================================================"
    echo ""
    cat "$SSH_KEY_PATH"
    echo ""
    echo "============================================================"
    echo ""
else
    echo "🔑 SSH key already exists at $SSH_KEY_PATH"
fi

# 3. Install Caddy config
echo "📋 Setting up Caddy..."
if command -v caddy &> /dev/null; then
    # Copy Caddyfile if the deploy directory has one
    SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    if [ -f "$SCRIPT_DIR/Caddyfile" ]; then
        sudo cp "$SCRIPT_DIR/Caddyfile" /etc/caddy/Caddyfile
        sudo systemctl reload caddy
        echo "   ✅ Caddyfile installed and Caddy reloaded"
    else
        echo "   ⚠️  No Caddyfile found in script directory. Copy deploy/Caddyfile to /etc/caddy/Caddyfile manually."
    fi
else
    echo "   ⚠️  Caddy not installed yet. Install it first:"
    echo "      sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https curl"
    echo "      curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg"
    echo "      curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list"
    echo "      sudo apt update && sudo apt install caddy"
fi

# 4. Create a placeholder index
if [ ! -f "$DEPLOY_DIR/index.html" ]; then
    echo '<!DOCTYPE html><html><body><h1>Mnemonic Medium — Waiting for first deploy...</h1></body></html>' > "$DEPLOY_DIR/index.html"
fi

echo ""
echo "============================================================"
echo "✅ Pi is ready! Now add these GitHub Secrets:"
echo ""
echo "   PI_HOST     = $(hostname -I | awk '{print $1}')"
echo "   PI_USER     = $USER"
echo "   PI_SSH_KEY  = (the private key printed above)"
echo "   PI_DEPLOY_PATH = $DEPLOY_DIR/"
echo ""
echo "Then push to main — it'll auto-deploy! 🚀"
echo "============================================================"
