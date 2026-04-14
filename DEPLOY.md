# Deploy bernstein.run

## Prerequisites
- bernstein.run DNS pointed to Cloudflare
- Cloudflare A record: bernstein.run -> 135.125.243.120 (proxied)
- SSH access to VPS: deploy@135.125.243.120

## Step 1: Point DNS (Spaceship → Cloudflare)

In Spaceship domain settings for bernstein.run:
- Set nameservers to Cloudflare:
  - `ada.ns.cloudflare.com`
  - `chad.ns.cloudflare.com`
  (or whatever Cloudflare assigns — check Cloudflare dashboard)

In Cloudflare (zone for bernstein.run):
- Add A record: `bernstein.run` -> `135.125.243.120` (proxied)
- Add CNAME: `www.bernstein.run` -> `bernstein.run` (proxied)
- SSL: Full (strict)

## Step 2: Update Caddyfile on VPS

Add to `/srv/homepage/deploy/Caddyfile`:

```
bernstein.run {
  encode zstd gzip

  tls {
    issuer acme {
      disable_tlsalpn_challenge
    }
  }

  header {
    Referrer-Policy "strict-origin-when-cross-origin"
    X-Content-Type-Options "nosniff"
  }

  reverse_proxy bernstein-landing:80
}

www.bernstein.run {
  redir https://bernstein.run{uri} permanent
}
```

## Step 3: Deploy on VPS

```bash
ssh deploy@135.125.243.120

# Clone the repo
cd /srv
sudo mkdir -p /srv/bernstein-landing
sudo chown deploy:deploy /srv/bernstein-landing
git clone https://github.com/chernistry/bernstein-landing.git /srv/bernstein-landing/app

# Build and start
cd /srv/bernstein-landing/app
docker compose up -d --build

# Reload Caddy to pick up new config
cd /srv/homepage/deploy
docker compose restart caddy
```

## Step 4: Update alexchernysh.com redirect

In the homepage middleware.ts, add redirect for /bernstein:
```typescript
if (pathname === '/bernstein') {
  return NextResponse.redirect('https://bernstein.run', 301);
}
```

## Step 5: Verify
- https://bernstein.run loads the landing page
- https://www.bernstein.run redirects to bernstein.run
- https://alexchernysh.com/bernstein redirects to bernstein.run
