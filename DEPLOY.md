# sriya v3 — deploy guide

A vanilla-JS PWA. No framework, no build step. Drop the folder anywhere that serves static files.

---

## Open it locally

The fastest way (works on macOS / Linux / WSL):

```
cd sriya-v3
python3 -m http.server 8080
```

Then open `http://localhost:8080`. (`file://` won't work — service workers and the manifest need an HTTP origin.)

Windows alternative — VS Code Live Server extension, or `npx serve .` if you have Node.

---

## Deploy to Netlify (drag-drop, free)

1. Go to https://app.netlify.com/drop.
2. Drag the entire `sriya-v3` folder onto the page.
3. Netlify gives you a URL like `https://something-pink-1234.netlify.app`. Done.
4. To rename: Site settings → Domain management → Options → Edit site name → `sriya-v3` (or whatever's free).
5. To redeploy after changes: drag the folder onto the same site again, or wire it up to GitHub for auto-deploys.

That's the whole deploy. No build, no env vars, no config.

> Already-connected services (Vercel / Neon / GitHub via your Chrome): you can also deploy as a Vercel static project — point at this folder, framework "Other," output directory "."  No env vars needed. Neon isn't used here (v3 stores everything in `localStorage`).

---

## Install on iPhone (Safari)

1. Open the deployed URL in **Safari** (not Chrome).
2. Tap the share icon (square with up-arrow).
3. Scroll down → **Add to Home Screen**.
4. Confirm name "sriya ✿" and tap Add.
5. Open the new icon. It runs full-screen, works offline.

If the heart icon looks fuzzy after install, Safari sometimes caches the placeholder — delete the icon and re-add.

---

## Install on Android (Chrome)

1. Open the deployed URL in Chrome.
2. Either: Chrome offers an **"Install app"** prompt automatically — tap Install.
3. Or: ⋮ menu → **Install app** / **Add to Home screen**.
4. The icon lands on your home screen and opens like a native app.

---

## Updating after deploy

The service worker caches the app for offline use. After redeploying:

- **Android Chrome** picks up the new version on the next launch (close all instances first).
- **iOS Safari** sometimes holds the old cache. Force-refresh: open Safari → visit the URL once, then re-launch the home-screen icon. Or remove and re-install.
- The cache name (`sriya-v3-…`) bumps when you edit `sw.js`, which forces every device to refresh.

---

## File map

```
sriya-v3/
├── index.html              entry point
├── styles.css              theme + components (ports v1, adds v3)
├── data.js                 static config (DO NOT edit — hand-built by Sriya)
├── icons.js                BRAND_HEART, ph(), NAV_ICONS, PERSON_SVGS
├── app.js                  every render fn, state, parser, flow engine
├── manifest.webmanifest    PWA identity ("sriya ✿", pink theme)
├── sw.js                   offline cache (sriya-v3-… cache name)
└── DEPLOY.md               this file
```

All app data lives in the browser's `localStorage` under the `sriya.v3.*` namespace. Export anytime from `me → settings → data`.
