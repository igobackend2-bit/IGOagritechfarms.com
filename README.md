# IGO Agritech Farms — Website

Official website for **IGO Agritech Farms**, an Agri Engineering & Agri Consulting brand. A multi-page React app covering services, projects, products, blog, careers, and an agri-startup enquiry platform.

Live at [www.igoagritechfarms.com](https://www.igoagritechfarms.com).

## Tech stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build tool | Vite 5 |
| Routing | React Router DOM v6 |
| Styling | Tailwind CSS v3 + shadcn/ui |
| Animations | Framer Motion |
| 3D graphics | Three.js + `@react-three/fiber` + `@react-three/drei` (used only in `Hero3D.tsx`) |
| Forms | React Hook Form + Zod |
| Data fetching | TanStack React Query v5 |
| Backend | Supabase (auth + database) |
| Testing | Vitest + Testing Library |

## Run it

```bash
npm install
cp .env.example .env   # fill in your Supabase project values
npm run dev
```

Other scripts:

```bash
npm run build           # production build
npm run build:dev       # build in development mode
npm run preview         # preview the production build
npm run lint             # ESLint
npm run test              # Vitest, single run
npm run test:watch       # Vitest, watch mode
npm run compress-images  # optimize images in place (scripts/compress-images.js)
npm run prerender         # bake per-route SEO HTML into dist/ (see below)
```

## Deployment & prerendering

Production builds run `vite build` and then `npm run prerender`, which uses headless Chromium (`scripts/prerender.mjs`) to bake the real per-page `<title>`, `<meta description>` and `<link rel="canonical">` into static HTML for each route, so it's visible in "View Source" rather than only after JavaScript runs. This step is wired into every deploy path:

- **Netlify** (`netlify.toml`) — `npm run build && npm run prerender`, publishing `dist/`. Unmatched routes fall back to `/200.html` (a neutral CSR shell), not `index.html` — the prerender step overwrites `index.html` with the homepage's own rendered content, so reusing it for the SPA fallback would serve a duplicate homepage for every unmatched URL.
- **Vercel** (`vercel.json`) — same build command, same `200.html` rewrite convention.
- **Docker/nginx** (`Dockerfile`, `nginx.conf`) — a Node build stage (with Chromium installed for the prerender step) feeding an `nginx:alpine` runtime stage. The nginx config also 301-redirects the bare domain to `https://www.igoagritechfarms.com`, strips trailing slashes, and serves `200.html` for any URL that isn't a real file.
- **Nixpacks** (`nixpacks.toml`) — plain `npm install` / `npm run build` / `npm run start`, for platforms that use it instead of Docker.

## Backend

Supabase project `vcllwqrtkfdspayntnwi` (see `supabase/config.toml`) provides auth and database. Client and generated types live in `src/integrations/supabase/`. Schema changes are tracked under `supabase/migrations/`.

Never commit `.env` or Supabase keys — `netlify.toml` explicitly excludes `VITE_SUPABASE_PROJECT_ID`, `VITE_SUPABASE_PUBLISHABLE_KEY` and `VITE_SUPABASE_URL` from Netlify's secrets scanner because they're intentionally public (anon-key) values baked into the client bundle.

### Contact form mail service

`mail-service/` is a small standalone Express + Nodemailer service that sends the homepage contact form's messages via Gmail SMTP, with the recipient fixed server-side (`MAIL_TO`) so the `/send` endpoint can't be used as an open relay, and CORS restricted to `ALLOWED_ORIGINS`. Point `VITE_MAIL_SERVICE_URL` at a deployed instance; if it's unset, the contact form falls back to Formsubmit.co.

## Project structure
