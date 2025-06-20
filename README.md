# Boutique Hala | بوتيك هالة

A mobile-first, bilingual (Arabic/English) boutique website for showcasing abayas, with a minimalistic design inspired by the provided logo.

## Features

- Responsive, mobile-first design
- Bilingual (Arabic/English) with RTL/LTR support
- Gallery with filtering by size and color
- Item detail pages with photo/video gallery
- Admin dashboard (login protected) for managing abayas
- No backend: data stored in JSON/localStorage
- SEO-ready, GitHub Pages compatible

## Structure

- `/index.html` — Customer homepage (gallery)
- `/item.html?id={id}` — Item detail page
- `/admin/index.html` — Admin login
- `/admin/dashboard.html` — Admin panel
- `/assets/images/` — Item photos
- `/assets/videos/` — Optional videos
- `/assets/snapcode.png` — Snapchat placeholder
- `/data/items.json` — Abaya data

## Running Locally

Just open `index.html` in your browser. For full functionality, use a local server (e.g. VSCode Live Server) due to browser restrictions on local JSON fetch.

## Deploying to GitHub Pages

- Push all files to your repo
- Set GitHub Pages source to root or `/docs` folder
- All routing uses static files and query params

---

For any issues, contact the developer.
