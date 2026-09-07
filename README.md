# Anas Ahmed — Data Engineer Portfolio

A static, dark, technical personal portfolio built with plain HTML, CSS, and JavaScript. Designed to be hosted on GitHub Pages at `2nsv.github.io`.

## Structure

```
/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── icons/
│   │   └── favicon.svg
│   └── images/        (empty — add an Open Graph cover image here if desired)
└── README.md
```

## Run locally

No build step is required. From the project folder, run any static file server, e.g.:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser. Opening `index.html` directly by double-clicking also works.

## Deploy to GitHub Pages

1. Create a repository named `anasahmed.github.io` on GitHub (this exact name publishes at the root domain).
2. Push these files to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/anasahmed.github.io.git
   git push -u origin main
   ```
3. In the repository settings, go to **Settings → Pages** and confirm the source is set to the `main` branch, root folder (this is automatic for a `<username>.github.io` repo).
4. The site will be live at `https://anasahmed.github.io` within a few minutes.

## Placeholders to replace

Before publishing, update the contact section in `index.html`:

- `your-email@example.com` → your real email address
- `https://github.com/your-github-username` → your real GitHub profile URL (and the visible text)
- `https://linkedin.com/in/your-linkedin-username` → your real LinkedIn profile URL (and the visible text)

Optional: add a real Open Graph image at `assets/images/og-cover.png` (1200×630px recommended) — the `<meta property="og:image">` tag in `index.html` already points to this path.

## Notes

- Technology logos are loaded from the Devicon CDN; conceptual icons (database, pipeline, etc.) come from Phosphor Icons. Both are CDN-hosted and work on static GitHub Pages hosting with no build step.
- Fonts (Space Grotesk, Inter, JetBrains Mono) are loaded from Google Fonts.
- Animations respect `prefers-reduced-motion`.
- All experience and content reflects only what was provided — no invented employers, metrics, or achievements.
