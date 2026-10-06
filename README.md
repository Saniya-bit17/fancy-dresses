# Maison Solène — Full Stack Haute Couture Application

A modern full-stack web application for **Maison Solène Occasion & Evening Wear**, featuring a modular React frontend and an Express.js REST API backend.

## Quick Start (Run Both)

### Option 1: One-Click Launch
Double click **`run-fullstack.bat`** (or run `.\run-fullstack.ps1` in PowerShell).

### Option 2: Run in Separate Terminals

#### Terminal 1 (Backend):
```powershell
cd backend
npm.cmd start
```
Runs at: **http://localhost:5000/api** (Health check: `http://localhost:5000/api/health`)

#### Terminal 2 (Frontend):
```powershell
cd frontend
npm.cmd run dev
```
Runs at: **http://localhost:3000/**

---

## Documentation
- [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) — **Step-by-step deployment guide for Vercel (frontend) & Render (backend).**
- [RUN_FULLSTACK_GUIDE.md](RUN_FULLSTACK_GUIDE.md) — Comprehensive guide to run both services locally.
- [FRONTEND_RUN_GUIDE.md](FRONTEND_RUN_GUIDE.md) — Detailed React frontend architecture and pages documentation.
- [BACKEND_RUN_GUIDE.md](BACKEND_RUN_GUIDE.md) — REST API endpoints, schemas, and persistence documentation.

