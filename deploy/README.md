# Mnemonic Medium — Deployment

## How It Works
```
You push to main → GitHub builds it → you run 'mnemonic-pull' on Pi → done
```

## Setup (one-time)

### 1. Create GitHub repo & push
```bash
# On your Mac:
cd "/Users/dineshjadhav/Documents/projects mnemonic/mnemonic-app"
git remote add origin git@github.com:jadhavdinesh7/mnemonic-app.git
git push -u origin main
```

### 2. On your Raspberry Pi
```bash
# Copy deploy/ folder to your Pi, then:
bash pi-setup.sh jadhavdinesh7 mnemonic-app
```

### 3. Deploying (every time)
```bash
# On Mac: push your changes
git add -A && git commit -m "update" && git push

# On Pi: pull the latest build (after GitHub Actions finishes, ~30 sec)
mnemonic-pull
```

## Notes
- Uses your existing Apache — no extra web server
- No cron jobs, SSH keys, or tunnels
- `mnemonic-pull` is just a one-liner you run when you want to update
