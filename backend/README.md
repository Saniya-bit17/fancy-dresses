# Maison Solène — Node.js & Express Backend

REST API for **Maison Solène** Haute Couture Evening & Occasion Wear.

## Quick Start

### 1. Install Dependencies
```powershell
npm.cmd install
```

### 2. Start the Server
```powershell
npm.cmd start
```
Or in auto-reloading watch mode:
```powershell
npm.cmd run dev
```

API Server will be available at: **http://localhost:5000/api**  
Health Check: **http://localhost:5000/api/health**

## Endpoints Overview
- `GET /api/health` — Health check
- `GET /api/dresses` — Silhouette catalogue (supports category, search, sort)
- `GET /api/dresses/:id` — Single gown details
- `POST /api/appointments` — Book a bespoke fitting session
- `GET /api/appointments` — List appointments
- `POST /api/inquiries` — Submit client inquiry / swatch request
- `POST /api/inquiries/newsletter` — Subscribe for consultations
- `POST /api/measurements` — Record bespoke measurement sheet
- `GET /api/atelier` — Atelier heritage and salon information

See [BACKEND_RUN_GUIDE.md](../BACKEND_RUN_GUIDE.md) for full request & response schemas.
