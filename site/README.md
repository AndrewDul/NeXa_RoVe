# NeXa RoVe static visual tour

This folder supports the root `index.html` static project tour.

The tour is built with plain local files:

- `index.html` controls the page structure.
- `site/styles.css` controls the visual design and responsive layout.
- `site/app.js` controls the face interaction, panels, gallery, calendar, code copying and mini game.
- `site/check_site.py` validates local paths and wording checks.

## Preview locally

From the repository root:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

## GitHub Pages

When repository Pages is enabled from the repository root, `index.html` can become the live visual tour entry point.

## Validate

```bash
python3 site/check_site.py
```

The checker verifies required files, local media paths, practical repository links, and wording rules for this visual tour.
