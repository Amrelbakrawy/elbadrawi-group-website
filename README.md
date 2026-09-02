# Elbadrawi Group Website

Official website for **Elbadrawi Group** — an Egyptian manufacturer of premium bedding and home textiles serving hospitality, retail, wholesale, private label, and export partners.

Built with React, Vite, Tailwind CSS, and an Express API for quote submissions and admin review.

## Features

- Bilingual marketing site (English and Arabic)
- Product catalog and industry solution pages
- Quote request form with backend persistence
- Admin login and submissions dashboard
- SEO metadata, Open Graph tags, sitemap, and structured data
- Privacy Policy and Terms of Service pages

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React 18, React Router 7, Tailwind CSS 4, Vite 6 |
| Backend | Express 5, Resend (email notifications) |
| Storage | File-based quote store (configurable path) |

## Quick Start

### Prerequisites

- Node.js 20+ (22 recommended)
- npm

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy the example files and update values for your environment:

```bash
cp .env.example .env.local
cp backend/.env.example backend/.env
```

Frontend variables (`.env.local`):

- `VITE_SITE_URL` — public website URL for SEO
- `VITE_API_URL` — API base URL (omit when frontend and API share the same domain)
- `VITE_CONTACT_*` — contact details shown in the UI

Backend variables (`backend/.env`):

- `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET` — admin access
- `RESEND_API_KEY`, `ADMIN_EMAIL`, `RESEND_FROM_EMAIL` — quote email notifications
- `QUOTES_STORAGE_PATH` — file path for quote submissions

### 3. Run locally

Frontend only:

```bash
npm run dev
```

Frontend + API together:

```bash
npm run dev:all
```

- Website: http://localhost:5173
- API: http://localhost:3000

## Production Build

```bash
npm run build
npm start
```

The Express server serves the built frontend from `dist/` and exposes API routes under `/api/*`.

If the API runs on a different domain, rebuild with the correct API URL:

```bash
VITE_API_URL=https://api.your-domain.com npm run build
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start Vite dev server |
| `npm run dev:backend` | Start Express API |
| `npm run dev:all` | Start frontend and API concurrently |
| `npm run build` | Build production frontend to `dist/` |
| `npm start` | Start production server |
| `npm run test:api` | Run backend smoke tests |

## Deployment

See [GODADDY_FULL_DEPLOYMENT.md](./GODADDY_FULL_DEPLOYMENT.md) for hosting on platforms that support Node.js.

For static-only hosting (no quote API), deploy the contents of `dist/` and configure SPA fallback routing. Quote submissions require the backend.

### Production checklist

- [ ] Set strong `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and `ADMIN_SESSION_SECRET`
- [ ] Configure `RESEND_API_KEY` and verified sender domain
- [ ] Set `VITE_SITE_URL` to your live domain before building
- [ ] Back up `QUOTES_STORAGE_PATH` regularly if using file storage
- [ ] Enable HTTPS and set `TRUST_PROXY=true` behind a reverse proxy

## Project Structure

```
├── backend/           Express API, auth, quote storage
├── public/            Static assets (robots.txt, sitemap, favicon)
├── src/
│   ├── components/    UI and layout components
│   ├── config/        Site, product, and page metadata config
│   ├── pages/         Route pages
│   └── hooks/         Shared React hooks
├── dist/              Production build output
└── index.html         HTML shell
```

## License

Proprietary — © Elbadrawi Group. All rights reserved.

Third-party attributions: see [ATTRIBUTIONS.md](./ATTRIBUTIONS.md).
