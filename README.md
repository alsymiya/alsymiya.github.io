# Zhijie Lyu — Personal Website

A modern portfolio site for **Zhijie Lyu**, PhD in Mechanical Engineering from Stony Brook University. The focused homepage links to dedicated Publications, CV, and Updates pages. Built with plain HTML + CSS + a tiny vanilla-JS file — no build step, ready for GitHub Pages.

## File layout

```
.
├── index.html          # focused homepage: Home, About, and Projects
├── publications.html   # publication list and filters
├── cv.html             # education, experience, skills, and resume links
├── updates.html        # dated news and milestones
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

- **Add a new publication** — copy any `<article class="pub" ...>` block in `publications.html` and adjust the `data-tags` attribute (e.g. `first 2026`) so the filter chips pick it up.
- **Change the accent colors** — `styles.css` top of file, the `:root` block: `--accent` (purple) and `--accent-2` (cyan). The hero name and key headings inherit from these.
- **Replace the headshot** — drop a square crop (≈400–600 px) at `assets/img/avatar.png` (or `.jpg`). The hero avatar slot shows the photo when present and falls back to a stylized "ZL" gradient mark otherwise. To use a different filename or extension, edit the single `<img src="assets/img/avatar.png" ...>` line in `index.html`.
- **Update the CV** — edit the summary in `cv.html`; the downloadable PDF lives at `Resume/Lyu_Zhijie_Resume.pdf`, with its LaTeX source in `Resume/main.tex`.

## Content sources

The publication and CV content was assembled from the user's resume (`Resume/main.tex` and `Resume/main-v2.tex`) and the published-paper PDFs in `PhD_Thesis/PrevPub/`. First-author publications follow their published abstracts; co-author entries are kept brief, per the user's preference.
