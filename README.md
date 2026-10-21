# ARISE Foundation website

Public website for ARISE Foundation (arisegiving.org). React 18 + TypeScript,
built with Vite and deployed on Vercel.

## Development

```bash
npm install
npm run dev          # local dev server
npm run build        # type-check and production build into dist/
npm run preview      # serve dist/ on http://localhost:4173
npm run check:site   # end-to-end checks against the preview server
```

`check:site` needs a Playwright browser once: `npx playwright install chromium`.
Set `SHOTS_DIR=./shots` to save full-page screenshots of every route.

## Where content lives

| What | File |
|---|---|
| Organization facts, inboxes, official statements (PA disclosure, nondiscrimination, mission) | `src/data/organization.ts` |
| Programs and application requirements | `src/data/programs.ts` |
| Directors, Areas of Impact, partners, at-a-glance figures | `src/data/siteContent.ts` |
| News stories (to move to the database) | `src/data/news.ts` |
| Navigation | `src/data/navigation.ts` |
| Photos (registry of `public/images/<name>-800.webp` / `-1600.webp`) | `src/data/images.ts` |

Content the client has not supplied yet is marked with `<Placeholder>`
(`src/components/common/Placeholder.tsx`), rendered as a highlighted
"To write / Image needed / Document needed / Needs approval" box. Never
replace a placeholder with invented text.

## Assets

- Fonts are self-hosted in `public/fonts` (SIL Open Font License) and the
  critical files are preloaded in `index.html`.
- Photos are WebP at 800 px and 1600 px. To add one, export both widths into
  `public/images/` and add an entry to `src/data/images.ts`.
- Logo files are in `public/brand`; the frame uses rounded corners.

## Deployment

Vercel deploys every branch to a preview URL and `main` to production.
Work on a branch, review the preview, then merge to `main`.

Rollback: Vercel dashboard → Deployments → select the previous production
deployment → Instant Rollback (or `git revert` the commit and push).
