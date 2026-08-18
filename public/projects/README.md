# Adding media to project cards

Each project card has a `media` field in `src/main.jsx`. To show a picture, video, or GIF on a card:

1. Put your file inside this folder: `public/projects/`
   - e.g. `public/projects/theportal-dashboard.png`
   - Supported: `.png`, `.jpg`, `.jpeg`, `.webp`, `.gif` (images) and `.mp4` (video)
2. Open `src/main.jsx`, find the matching project in the `projects` array, and set:
   ```js
   media: '/projects/theportal-dashboard.png'
   ```
3. Save — Vite reloads automatically. No rebuild needed during dev.

If `media` is empty, the card shows a styled placeholder until you add one.

## Screenshot gallery (auto-scroll, pause on hover)

Instead of a single `media` file, a card can show several screenshots that
auto-scroll and pause while hovered. Use a `screens` array:

```js
{
  title: 'Job Tracker',
  screens: [
    '/projects/job-tracker/1.png',
    '/projects/job-tracker/2.png',
    '/projects/job-tracker/3.png',
  ],
  github: '',
  live: '',
}
```

Drop the images in a folder like `public/projects/job-tracker/`, named to
match the array. While hovered the rotation pauses; arrows and dots let
visitors scrub through manually.

## Photo

Your personal photo goes in `public/me.jpg` (or any `.jpg`/`.png` name). Then point to it in `src/main.jsx`:

```js
const profile = {
  ...
  photo: '/me.jpg',
};
```

If the file is missing, the hero shows your "NM" monogram instead.

## Project links

In the same `projects` array, replace:

- `github` — your repository URL
- `live` — the deployed app URL (use `'#'` until you have one)

> Tip: keep media file names short and lowercase, e.g. `theportal.png`, `edu-platform.mp4`.
