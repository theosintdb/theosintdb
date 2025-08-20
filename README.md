<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

## GOSID — The Global Open Source Intelligence Dashboard

GOSID is a full‑stack TypeScript project that provides a public OSINT portal and secure admin backoffice. The frontend is a Vite + React app; the backend is an Express API with Prisma ORM on SQLite by default.

### Features
- Public pages: News, Resources, Learn, OPSEC, About, Donate, Report, Contact
- Admin area (role: Admin, Owner): manage news, resources, training, applications, reports, core pages, homepage
- Owner area (role: Owner): manage site‑wide content and settings
- JWT authentication with role‑based access control
- Data validation with Zod and secure headers with Helmet

### Tech Stack
- Frontend: React 19, React Router 6, Vite 6, TypeScript
- Backend: Express 4, Prisma 5, SQLite (switchable), Zod, JWT, Helmet, CORS, Morgan

---

## Getting Started

### Prerequisites
- Node.js 18+

### 1) Install and run (single step)

```bash
npm install
npm run dev
```

The root postinstall will:
- Install backend dependencies
- Copy `server/.env.example` to `server/.env` if missing
- Generate Prisma client and run migrations/seeding (non-interactively)

Defaults in `server/.env`:
- DATABASE_URL: SQLite file in `server/prisma/dev.db`
- PORT: 4000
- JWT_SECRET: change this in production
- CORS_ORIGIN: http://localhost:5173 (set to your frontend origin in prod)

This seeds an admin and owner user:
- admin / admin123 (role: Admin)
- owner / owner123 (role: Owner)

The dev script runs both backend and frontend together. The Vite dev server proxies API calls to `http://localhost:4000/api` automatically.

---

## Usage Notes

- Login at `/#/login` with one of the seeded accounts.
- Admin can manage content within `/#/admin/*`. Owner has access to `/#/owner/*` in addition.
- Public submissions (e.g., resources, reports, applications) do not require login; moderation actions require an authenticated Admin/Owner.

---

## Configuration & Security

- Vite dev proxy is set in `vite.config.ts` (`/api -> http://localhost:4000`).
- Backend security:
  - Helmet for common security headers
  - CORS restricted by origin when deployed; dev mode allows all
  - JWT auth middleware with role checks
  - Zod input validation on all write endpoints
- Never commit real secrets. Use environment variables and rotate the `JWT_SECRET` in production.

---

## Backend API Overview

Base path: `/api`

- Auth
  - POST `/auth/login` { username, password } -> { token, role }
- News
  - GET `/news`
  - POST `/news` (Admin/Owner)
  - PUT `/news/:id` (Admin/Owner)
  - DELETE `/news/:id` (Admin/Owner)
- Resources
  - GET `/resources`
  - POST `/resources`
  - PUT `/resources/:id/status` (Admin/Owner) body: { status: 'approved' }
  - DELETE `/resources/:id` (Admin/Owner)
- Training
  - GET `/training`
  - POST `/training` (Admin/Owner)
  - PUT `/training/:id` (Admin/Owner)
  - DELETE `/training/:id` (Admin/Owner)
- Homepage/Core Pages/Site Content
  - GET `/homepage` | PUT `/homepage` (Admin/Owner)
  - GET `/core-pages` | PUT `/core-pages` (Admin/Owner)
  - GET `/site-content` | PUT `/site-content` (Owner)
- Settings
  - GET `/settings` | PUT `/settings` (Owner)
- Applications
  - GET `/applications` (Admin/Owner)
  - POST `/applications`
  - PUT `/applications/:id/status` (Admin/Owner)
- Reports
  - GET `/reports` (Admin/Owner)
  - POST `/reports`
  - PUT `/reports/:id/status` (Admin/Owner)

---

## Deployment

You can deploy frontend and backend separately:

- Backend: Build with `npm run build` in `server/`. Provide `DATABASE_URL`, `PORT`, `JWT_SECRET`. Run `prisma migrate deploy` on boot, then `node dist/index.js`.
- Frontend: Build with `npm run build` at repo root. Serve `dist/` behind a reverse proxy that forwards `/api` to the backend service.

For containerization, create a multi-stage Dockerfile per service or a single compose file wiring the proxy and server.

---

## Development Tips

- Types: Add new fields to `types.ts` then map them in Prisma models and API.
- Validation: Keep schemas in sync with frontend forms to ensure consistent errors.
- Replace SQLite by setting a different `DATABASE_URL` and updating the Prisma datasource provider.
