# Deploy On Vercel (Free)

## 1. Prerequisites
- A GitHub account
- A Vercel account (free tier)
- Project pushed to a GitHub repository

## 2. Environment Variables (Placeholders)
Set these in Vercel Project Settings -> Environment Variables:

- `VITE_API_BASE_URL=https://api.example-ngo.org`
- `VITE_API_TIMEOUT_MS=12000`

You can copy defaults from:
- `.env.example`

## 3. Deploy Using Vercel Dashboard
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Confirm settings:
 - Framework: `Vite`
 - Build Command: `npm run build`
 - Output Directory: `dist`
4. Add environment variables above
5. Click `Deploy`

## 4. Deploy Using Vercel CLI (Optional)
```bash
npm i -g vercel
cd /Users/shehryarusman/Documents/Codex/ngo
vercel
```

For production deployment:
```bash
vercel --prod
```

## 5. Why React Routes Work On Refresh
This project includes `vercel.json` with a rewrite rule:
- `/(.*)` -> `/index.html`

That ensures React Router routes (e.g. `/about`, `/stories`) work on direct load and refresh.
