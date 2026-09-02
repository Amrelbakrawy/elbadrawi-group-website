# Full Website + API Deployment Notes

This package is for hosting that can run a Node.js app.

It includes:

- `dist/` built frontend website
- `backend/` Express API for quote submissions and admin submissions
- `backend/runtime/quotes.json` file-based quote storage
- `package.json` and `package-lock.json`

It does not include `node_modules`. Install dependencies on the server with:

```bash
npm install --omit=dev
```

Start the app with:

```bash
npm start
```

Required production environment variables:

```bash
PORT=3000
ADMIN_USERNAME=your-admin-username
ADMIN_PASSWORD=your-strong-admin-password
ADMIN_SESSION_SECRET=use-a-long-random-secret
QUOTES_STORAGE_DRIVER=file
QUOTES_STORAGE_PATH=./backend/runtime/quotes.json
```

Optional email notification variables:

```bash
RESEND_API_KEY=your-resend-api-key
ADMIN_EMAIL=info@elbadrawigroup.net
RESEND_FROM_EMAIL=quotes@your-domain.com
```

Before building for production, set the public site URL:

```bash
VITE_SITE_URL=https://www.elbadrawigroup.com npm run build
```

If the frontend and backend run on the same domain, `VITE_API_URL` is not needed.

If the backend runs on a different domain, rebuild the frontend with:

```bash
VITE_API_URL=https://your-api-domain.com VITE_SITE_URL=https://www.elbadrawigroup.com npm run build
```

Then redeploy the new `dist/` folder.

For full setup instructions, see [README.md](./README.md).
