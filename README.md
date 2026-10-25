# Menyanyo Games

A static page that lists the Menyanyo Games games. Vite + TypeScript, no framework, no back end.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check, then a static site in dist/
npm run preview   # serve dist/
```

`dist/` uses relative paths, so it works at a domain root and under a sub-path.

## Deploy

A push to `main` deploys: `.github/workflows/deploy.yml` builds the site and publishes it to GitHub
Pages at https://menyanyo-games.es (`public/CNAME`). The DNS is at Hostinger: four `A` records on
`@` to GitHub Pages (185.199.108.153, .109.153, .110.153, .111.153) and a `CNAME` `www` →
`mbernardo95.github.io`.

## Add a game

Add one entry to `GAMES` in [`src/games.ts`](src/games.ts). The hero carousel (`featured` and
`status: 'live'`), the library and its filter counts (`tags`) and the detail overlay all read from
that array. Every text field has a Spanish and an English version.

Art goes in `public/games/<id>/` and is referenced without a leading slash:

| Field | File | Notes |
|---|---|---|
| `cover` | `cover.webp` | 16:9 key art. Without it the page shows the placeholder art in `src/components/cover.ts`. |
| `coverTall` | `cover-tall.webp` | 9:16 crop for the mobile hero (optional). |
| `trailer` | `trailer.mp4` | Muted loop. Mounted only on hover, in the hero, or in the open overlay. |
| `shots` | `shot-1.webp`… | Up to 3 gallery screenshots for the overlay (optional). |

## Where things are

- `src/main.ts` — state, rendering, the carousel, the overlay (focus trap, Esc, back button, `#game=<id>` deep links), the accent that follows the game in focus.
- `src/i18n.ts` — all UI copy. Language: `?lang=` → saved choice → browser language → Spanish.
- `src/tokens.css` — design tokens; `src/styles.css` — components and the breakpoints (1100 px, 760 px).
- `src/components/` — one module per section; each returns HTML.

## Still open

- `STUDIO.email` in `src/games.ts` is `null`, so the footer shows no mail link.
