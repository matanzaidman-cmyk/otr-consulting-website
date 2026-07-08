# Deploying OTR-Consulting.com

This is a static site (no build step) — `index.html`, `css/styles.css`, `js/main.js`. It's already been tested locally and committed to a git repo in this folder.

## 1. Create a free Netlify account
Go to https://app.netlify.com/signup and sign up (GitHub, GitLab, email, whatever's easiest).

## 2. Deploy the site (drag-and-drop, no GitHub needed)
1. Go to https://app.netlify.com/drop
2. Drag the entire `otr-consulting-site` folder (this folder) into the browser window.
3. Netlify uploads it and gives you a live URL like `random-name-123.netlify.app` within seconds.
4. Open that URL and click around — confirm the page and the "Book a Call" modal work.

The contact form will work automatically: Netlify scans `index.html` at deploy time, sees the `<form data-netlify="true">`, and starts capturing submissions. You'll see them under **Site settings → Forms** in the Netlify dashboard, and you can turn on email notifications there (Site settings → Forms → Form notifications → Email notification) so submissions land in your inbox.

> If you later want continuous deployment (edit code → auto-redeploy), push this folder to a GitHub repo and use "Import from Git" in Netlify instead of drag-and-drop. Ask me and I'll help push it once you have a GitHub repo ready.

## 3. Point OTR-Consulting.com at the Netlify site
Once the site is live on Netlify:
1. In the Netlify dashboard, go to your site → **Domain settings** → **Add a domain** → enter `otr-consulting.com`.
2. Netlify will show you DNS records to add. Two options:
   - **Easiest: use Netlify DNS** — Netlify gives you 4 nameservers; you update your domain registrar (wherever OTR-Consulting.com is registered) to point to those nameservers. Netlify then manages all DNS and issues a free HTTPS certificate automatically.
   - **Alternative: keep your current DNS provider** — add an `A` record for `@` pointing to Netlify's load balancer IP (`75.2.60.5`) and a `CNAME` for `www` pointing to your `*.netlify.app` address. Netlify's domain settings page shows the exact current values to use.
3. DNS changes can take a few minutes to a few hours to propagate. Netlify auto-provisions a free SSL certificate (Let's Encrypt) once it detects the domain is pointed correctly — no extra steps needed.
4. Once live, set `otr-consulting.com` (not `www`) as the primary domain in Netlify's domain settings, and it'll auto-redirect `www` → the root domain (or vice versa, your choice).

## Notes
- `matan@otr-consulting.com` and the phone number in the contact modal are hardcoded as the direct-contact fallback — update those in `index.html` if they change.
- The `netlify.toml` in this folder just sets basic security headers; no build command is needed since this is plain HTML/CSS/JS.
