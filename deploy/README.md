# Mnemonic Medium — Deployment Pipeline

## Architecture
```
Mac (dev) → GitHub push → GitHub Actions (build) → rsync → Raspberry Pi (Caddy serves dist/)
```

## Setup Checklist

### GitHub (one-time)
- [ ] Create repo on GitHub
- [ ] Push code
- [ ] Add secrets: `PI_HOST`, `PI_USER`, `PI_SSH_KEY`, `PI_DEPLOY_PATH`

### Raspberry Pi (one-time)
- [ ] Install Caddy (`sudo apt install caddy`)
- [ ] Run `deploy/pi-setup.sh` on the Pi
- [ ] Copy the generated SSH public key and add to GitHub secrets
- [ ] Update Caddyfile if using a domain

### Deploying
- Push to `main` → auto-deploys in ~30 seconds
- Manual: `npm run deploy` (direct rsync, no CI)
