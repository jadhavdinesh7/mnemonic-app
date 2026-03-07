#!/bin/bash
# ============================================================
# Raspberry Pi Setup Script for Mnemonic Medium
#
# How it works:
#   GitHub Actions builds the app → pushes to gh-pages branch
#   You run 'mnemonic-pull' on the Pi whenever you want to update
#   Apache serves the static files
#
# Usage: bash pi-setup.sh [github-user] [repo-name]
# Example: bash pi-setup.sh jadhavdinesh7 mnemonic-app
# ============================================================

set -e

GITHUB_USER="${1:-jadhavdinesh7}"
REPO_NAME="${2:-mnemonic-app}"
DEPLOY_DIR="/var/www/mnemonic"
REPO_URL="https://github.com/${GITHUB_USER}/${REPO_NAME}.git"

echo "🍓 Setting up Raspberry Pi for Mnemonic Medium..."
echo "   Repo: $REPO_URL"
echo "   Deploy dir: $DEPLOY_DIR"
echo ""

# 1. Clone gh-pages branch
echo "📁 Cloning gh-pages branch to $DEPLOY_DIR..."
sudo mkdir -p "$(dirname $DEPLOY_DIR)"

if [ -d "$DEPLOY_DIR/.git" ]; then
    echo "   Already cloned, pulling latest..."
    cd "$DEPLOY_DIR" && sudo git pull origin gh-pages
else
    sudo rm -rf "$DEPLOY_DIR"
    sudo git clone --branch gh-pages --single-branch --depth 1 "$REPO_URL" "$DEPLOY_DIR"
fi

sudo chown -R www-data:www-data "$DEPLOY_DIR"

# 2. Create the pull command (run manually whenever you want to update)
echo "📋 Creating 'mnemonic-pull' command..."
sudo tee /usr/local/bin/mnemonic-pull > /dev/null << 'SCRIPT'
#!/bin/bash
echo "🔄 Pulling latest build..."
cd /var/www/mnemonic && sudo git fetch origin gh-pages --depth 1 && sudo git reset --hard origin/gh-pages
sudo chown -R www-data:www-data /var/www/mnemonic
echo "✅ Updated! Changes are live."
SCRIPT
sudo chmod +x /usr/local/bin/mnemonic-pull

# 3. Set up Apache virtual host
echo "📋 Setting up Apache..."
if command -v apache2 &> /dev/null || command -v apachectl &> /dev/null; then
    SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    if [ -f "$SCRIPT_DIR/mnemonic.conf" ]; then
        sudo cp "$SCRIPT_DIR/mnemonic.conf" /etc/apache2/sites-available/mnemonic.conf
        sudo a2ensite mnemonic.conf 2>/dev/null || true
        sudo a2enmod rewrite 2>/dev/null || true
        sudo systemctl reload apache2
        echo "   ✅ Apache site enabled and reloaded"
    else
        echo "   ⚠️  Copy deploy/mnemonic.conf to /etc/apache2/sites-available/ manually"
    fi
else
    echo "   ⚠️  Apache not found. Copy deploy/mnemonic.conf manually."
fi

PI_IP=$(hostname -I | awk '{print $1}')
echo ""
echo "============================================================"
echo "✅ Done! Here's your workflow:"
echo ""
echo "   1. Push code to main on GitHub"
echo "   2. GitHub Actions builds it (~30 sec)"
echo "   3. On your Pi, run: mnemonic-pull"
echo "   4. Site is live at http://${PI_IP}"
echo ""
echo "   That's it. No cron, no tunnels, just one command. 🎉"
echo "============================================================"
