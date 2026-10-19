# MWM Orals website

Maritime With Maro OOW Orals: COLREGs and IALA buoyage study notes, an encounter trainer and a mock oral.
Live at https://omugbe-maro.github.io/mwm-orals/

- `index.html` is the website. It loads `content.json`.
- `content.json` holds every study note, question and encounter, and the contact details (`meta.contact`). The Android app downloads the same file.
- `pictures/`, `encounters/` and `sounds/` hold the images and sound signals the app uses; `brand/` holds icons and preview images; `fonts/` holds the self-hosted fonts.
- `privacy.html` and `terms.html` are linked from the site footer and the Google Play listing.
- `sw.js` and `manifest.webmanifest` let visitors install the site on their phone and use it offline.

To change a question, a note or the contact details, edit `content.json` here and raise `meta.version`. The website and the app both pick up the change.
