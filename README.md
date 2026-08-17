# Nadine Mlayeh — Portfolio

A personal portfolio built with React + Vite, designed around a black & red aesthetic with subtle motion. Fully responsive, deploy-ready on Vercel.

## Tech stack

- **React 19** + **Vite 7**
- **Framer Motion** — scroll reveals, staggered hero animation, parallax, scroll progress
- **Lucide React** — icons
- **Poppins** + **JetBrains Mono** (Google Fonts)

## Features

- Sticky header with scroll-spy navigation and a photo avatar
- Animated hero (word-by-word name reveal, red underline, parallax background, tech ticker)
- About section with quick-fact cards
- Experience timeline, project cards, skills grid, education & certifications, awards
- Project cards with GitHub / live links — or an NDA badge when code can't be shared
- Scroll progress bar, mouse spotlight, back-to-top button
- Fully responsive (mobile menu, stacked layouts, reduced-motion support)

## Getting started

```bash
# install dependencies
npm install

# run dev server
npm run dev

# production build
npm run build

# preview the production build
npm run preview
```

## Project structure

```
├── index.html            # meta tags, fonts, favicon
├── vercel.json           # Vercel build config
├── public/
│   ├── me.jpg            # ← your profile photo
│   ├── Nadine_Mlayah_CV_EN.pdf
│   └── projects/         # ← screenshots / videos for project cards
└── src/
    ├── main.jsx          # all content & components
    └── styles.css        # all styling
```

## Customizing the content

Everything is data-driven from `src/main.jsx`:

| What | Where in `src/main.jsx` |
| --- | --- |
| Name, role, email, links, photo | `profile` object |
| Experience entries | `experiences` array |
| Project cards | `projects` array |
| Skills panels | `skills` array |
| Awards / recognition | `awards` object |
| Education & certifications | `education` + `certifications` |

### Profile photo

Drop your picture at `public/me.jpg` (or any name), then set it in `profile.photo`:

```js
photo: '/me.jpg',
```

If the file is missing, the site falls back to an "NM" monogram.

### Project media

1. Put the file in `public/projects/` (`.png`, `.jpg`, `.webp`, `.gif`, or `.mp4`).
2. Point the project's `media` field to it:

```js
media: '/projects/theportal.png',
```

### Project links

In each project entry, set `github` and `live`. For a project you can't share (e.g. under NDA), set `nda: true` — the card will show a lock badge instead of the buttons:

```js
{
  title: 'ThePortal',
  github: '',
  live: '',
  nda: true,
}
```

## Deploying to Vercel

The repo is already configured via `vercel.json` (framework: Vite, output: `dist`).

**Via GitHub (recommended):**

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

Then on [vercel.com](https://vercel.com) → **Import Project** → pick the repo. Vercel auto-detects Vite; no extra config needed.

**Via CLI:**

```bash
npm i -g vercel
vercel
```

Both options pick up future pushes automatically and redeploy.

## License

Personal project. Not licensed for reuse.