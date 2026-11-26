# How to ship Clueless (free, no card needed)

Stack: GitHub (stores code) → Cloudflare Pages (hosts site) + Firebase (live multiplayer).
Total cost: ₹0. Cloudflare Pages free = unlimited bandwidth, 500 deploys/month.

## Step 1: Firebase rules (2 min)
1. Go to console.firebase.google.com → project **testing-ziago**.
2. Left menu → Build → **Realtime Database** → **Rules** tab.
3. Delete everything, paste the rules from README.md, click **Publish**.

## Step 2: Test on your Mac (3 min)
1. Open Terminal. Type `cd ` (with a space), drag the site folder into Terminal, press Enter.
2. Run: `python3 -m http.server 8000`
3. Chrome → http://localhost:8000
4. Open Bolo Mat! in 2 tabs (one normal, one incognito). Create a room in one, join in the other.
5. Stop server: Ctrl + C.

## Step 3: Put code on GitHub (5 min)
1. Sign up at github.com (free). Click **New repository**. Name: `clueless`. Public. Do NOT add a README. Create.
2. In Terminal, inside the site folder, run these one by one:
```
git init
git add .
git commit -m "first version"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/clueless.git
git push -u origin main
```
(Replace YOUR-USERNAME. GitHub may ask you to log in.)
Easier option: install GitHub Desktop → File → Add Local Repository → Publish.

## Step 4: Host on Cloudflare Pages (5 min)
1. Sign up at dash.cloudflare.com (free, no card).
2. Left menu → **Workers & Pages** → **Create** → **Pages** tab → **Connect to Git**.
3. Allow GitHub, pick the `clueless` repo → Begin setup.
4. Framework preset: **None**. Build command: leave **empty**. Output directory: type `/` (or leave blank).
5. **Save and Deploy**. In ~1 min you get `clueless.pages.dev`.
6. Rename the project if you want a nicer link (it becomes name.pages.dev).

## Step 5: Updating later
Edit files → in Terminal run:
```
git add .
git commit -m "what I changed"
git push
```
Cloudflare redeploys by itself in about a minute.

## Step 6: Test on real phones
Open your pages.dev link on 2 phones. Create a room on one, join on the other. The Copy button works now because pages.dev is https.

## Before you share widely (do these)
1. **Limit:** Firebase free = about 100 people connected at the same time. Past that, new people can't connect. It will not charge you.
2. **Firebase rules are open** (anyone can write). OK for a test, not for a big launch. Later: turn on Anonymous Auth and tighten rules.
3. **API key:** Google Cloud Console → APIs & Services → Credentials → your browser key → restrict to your pages.dev domain.
4. **Words can be read** from the database by tech-savvy cheaters. Fine for friends. A fix later needs a server function.

## Custom domain (optional, costs money)
A .in or .com domain costs roughly ₹500–900/year. Skip for now. pages.dev is free.

Prices change. Quick re-check: pages.cloudflare.com and firebase.google.com/pricing.
