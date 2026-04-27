# Zhijie Lyu — Personal Website

A modern dark-portfolio static site for **Zhijie Lyu**, PhD candidate in Mechanical Engineering at Stony Brook University. Single-page layout with Home/About, Publications, Projects, and CV sections. Built with plain HTML + CSS + a tiny vanilla-JS file — no build step, ready for GitHub Pages.

## File layout

```
.
├── index.html          # the entire site (single page, anchor-scrolled)
├── styles.css          # design tokens + dark theme
├── script.js           # nav, scroll-spy, publication filter, reveal-on-scroll
├── .nojekyll           # tells GitHub Pages not to run Jekyll
├── assets/
│   ├── papers/         # PDFs of published papers (linked from Publications)
│   └── img/            # (empty — drop a profile photo or figures here)
├── Resume/             # original LaTeX source for the resume
│   ├── main.tex
│   └── main-v2.tex
└── README.md
```

## Local preview

Just open `index.html` in a browser, or serve the folder with a quick local server so relative paths resolve cleanly:

```bash
# Python 3
python -m http.server 8080
# then visit http://localhost:8080
```

## Deploy to GitHub Pages

1. Create a new GitHub repo, e.g. `alsymiya/alsymiya.github.io` (a *user* site) or any repo name (a *project* site).
2. Push the contents of this folder to the `main` branch.
3. Repo **Settings → Pages → Source = main branch / root**.
4. After a minute, the site is live at `https://<username>.github.io/` (user site) or `https://<username>.github.io/<repo>/` (project site).

The `.nojekyll` file disables Jekyll processing so files starting with underscores or located inside subfolders are served as-is.

## Editing tips

- **Add a new publication** — copy any `<article class="pub" ...>` block in `index.html` and adjust the `data-tags` attribute (e.g. `first 2026`) so the filter chips pick it up.
- **Change the accent colors** — `styles.css` top of file, the `:root` block: `--accent` (purple) and `--accent-2` (cyan). The hero name and key headings inherit from these.
- **Add your headshot** — save a square crop (≈600×600 px) at `assets/img/avatar.jpg`. The hero avatar slot is already wired up: it shows the photo when present and falls back to a stylized "ZL" gradient mark otherwise. To use a different filename or extension, edit the single `<img src="assets/img/avatar.jpg" ...>` line in `index.html`.
- **Update the CV** — the website currently links to `Resume/main.tex`. To link a compiled PDF, place `resume.pdf` at the project root and change the `View LaTeX Source` button's `href` in `index.html`.

## Content sources

The publication and CV content was assembled from the user's resume (`Resume/main.tex` and `Resume/main-v2.tex`) and the published-paper PDFs in `PhD_Thesis/PrevPub/`. First-author publications follow their published abstracts; co-author entries are kept brief, per the user's preference.

The unpublished 2026 Assur graph work is intentionally **not** included.
