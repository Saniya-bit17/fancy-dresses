# ✦ Maison Solène Haute Couture — Full-Stack Deployment Guide

This guide details step-by-step instructions to deploy the **Backend API on Render** and the **Frontend Web Application on Vercel**, backed by **MongoDB Atlas**.

---

## ✦ System Architecture & Verified State

```
 ┌─────────────────────────────────────────────────────────────┐
 │                    CLIENT WEB BROWSER                       │
 └──────────────────────────────┬──────────────────────────────┘
                                │ HTTPS Requests
         ┌──────────────────────┴──────────────────────┐
         ▼                                             ▼
┌─────────────────────────┐               ┌─────────────────────────┐
│     VERCEL HOSTING      │               │     RENDER HOSTING      │
│  React 18 + Vite (SPA)  │  REST API     │  Node.js + Express API  │
│  Root Dir: `frontend/`  ├──────────────►│  Root Dir: `backend/`   │
│  Rewrites: vercel.json  │  CORS-Secured │  Port: 10000 / 0.0.0.0  │
└─────────────────────────┘               └────────────┬────────────┘
                                                       │ Mongoose TLS
                                                       ▼
                                          ┌─────────────────────────┐
                                          │   MONGODB ATLAS CLOUD   │
                                          │  Cluster0 / maison_solene
                                          └─────────────────────────┘
```

### Verified Pre-Flight Audit Summary
- **Frontend**: Vite production build verified (`dist/` generated with zero errors, gzip bundle ~65 KB).
- **Backend**: Express router and controllers verified. Port binds immediately to `0.0.0.0` for cloud container health checks.
- **Resilient Fallback**: If MongoDB takes time to connect, backend operates safely with local JSON archive and automatically shifts to MongoDB once connected.
- **CORS Protection**: Auto-authorizes `*.vercel.app` (including preview branches), custom domains, and localhost without unhandled server crashes.
- **Git & Secret Hygiene**: All `.env` files and `node_modules` are gitignored. Hardcoded database credentials have been extracted into environment variables.

---

## Step 1: Push Code to GitHub

Before deploying to Render or Vercel, push your code to a GitHub repository:

1. Open your terminal in the project root: `c:\Users\sharm\Downloads\maison-solene-fancy-dresses`
2. Stage and commit the verified code:
   ```bash
   git add .
   git commit -m "feat: production-ready full-stack Maison Solène with Vercel and Render configurations"
   ```
3. Create a new repository on [GitHub](https://github.com/new) (e.g. `maison-solene-fancy-dresses`).
4. Link and push your branch:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/maison-solene-fancy-dresses.git
   git push -u origin main
   ```

---

## Step 2: Configure MongoDB Atlas (Crucial for Render)

Cloud providers like Render use dynamic IP addresses. Unless access is allowed from anywhere, MongoDB Atlas will block the connection.

1. Log in to [MongoDB Atlas](https://cloud.mongodb.com/).
2. In the left navigation menu, go to **Network Access** (under *Security*).
3. Click **Add IP Address**.
4. Click **Allow Access From Anywhere** (this enters `0.0.0.0/0`).
5. Click **Confirm**. Wait ~1 minute until the status displays **Active**.
6. In **Database Access**, verify your database user and password (e.g. user `saniyakaushiknagwan_db_user`).
7. Click **Database** -> **Connect** -> **Drivers** to copy your connection string:
   ```
   mongodb+srv://<username>:<password>@<cluster>.mongodb.net/maison_solene?retryWrites=true&w=majority
   ```

---

## Step 3: Deploy Backend on Render

You can deploy the backend using **Option A (Render Blueprint)** or **Option B (Manual Web Service)**.

### Option A: Using Render Blueprint (Fastest, 1-Click)
1. Go to your [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** at the top right and select **Blueprint**.
3. Connect your GitHub repository: `maison-solene-fancy-dresses`.
4. Render will read [`render.yaml`](./render.yaml) automatically.
5. In the prompts, enter the required secrets:
   - `MONGODB_URI`: Your MongoDB Atlas connection URI.
   - `CLIENT_ORIGIN`: `https://*.vercel.app` (or your initial frontend URL).
6. Click **Apply**.

---

### Option B: Manual Web Service Setup (Step-by-Step)
1. In your [Render Dashboard](https://dashboard.render.com/), click **New +** -> **Web Service**.
2. Select **Build and deploy from a Git repository** and pick `maison-solene-fancy-dresses`.
3. Configure the service settings:
   - **Name**: `maison-solene-backend`
   - **Region**: Choose the region closest to your users (e.g., `Singapore`, `Frankfurt`, or `Oregon`).
   - **Branch**: `main`
   - **Root Directory**: `backend` *(Critical: specifies the backend subfolder)*
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan Type**: `Free`
4. Expand **Advanced**:
   - **Health Check Path**: `/api/health`
5. Under **Environment Variables**, add:
   | Key | Value | Description |
   | :--- | :--- | :--- |
   | `NODE_ENV` | `production` | Production optimizations |
   | `PORT` | `10000` | Render default port |
   | `DB_NAME` | `maison_solene` | MongoDB database name |
   | `MONGODB_URI` | `mongodb+srv://...` | Your Atlas connection string |
   | `CLIENT_ORIGIN` | `https://maison-solene.vercel.app` | Your Vercel frontend URL |
6. Click **Create Web Service**.
7. Render will build and launch your service.
8. Once live, test the health check in your browser:
   ```
   https://maison-solene-backend.onrender.com/api/health
   ```
   Expected response:
   ```json
   {
     "status": "ok",
     "service": "Maison Solène Haute Couture API",
     "database": {
       "state": "connected",
       "connected": true,
       "database": "maison_solene"
     }
   }
   ```
9. **Copy your Render URL**: e.g., `https://maison-solene-backend.onrender.com`.

---

## Step 4: Deploy Frontend on Vercel

1. Log in to [Vercel](https://vercel.com/).
2. Click **Add New...** -> **Project**.
3. Import your GitHub repository: `maison-solene-fancy-dresses`.
4. In the **Configure Project** screen:
   - **Project Name**: `maison-solene` (or your preferred name)
   - **Framework Preset**: `Vite` (auto-detected)
   - **Root Directory**: Click **Edit** and choose `frontend`. *(Critical)*
   - **Build and Output Settings**: Default (`npm run build` and output `dist`).
5. Under **Environment Variables**, add:
   | Key | Value | Notes |
   | :--- | :--- | :--- |
   | `VITE_API_URL` | `https://<YOUR-RENDER-APP>.onrender.com/api` | Replace with your live Render backend URL |
6. Click **Deploy**.
7. Vercel will compile the React app and deploy it to a global edge CDN in under 1 minute.
8. Once finished, click your production URL (e.g., `https://maison-solene.vercel.app`).

---

## Step 5: Final Handshake (Connect Frontend & Backend)

1. Copy your live Vercel production domain: e.g., `https://maison-solene.vercel.app`.
2. Go to your **Render Dashboard** -> **maison-solene-backend** -> **Environment**.
3. Ensure `CLIENT_ORIGIN` matches your Vercel domain:
   ```
   CLIENT_ORIGIN=https://maison-solene.vercel.app
   ```
   *(Note: Multiple domains can be entered comma-separated, e.g. `https://maison-solene.vercel.app,https://yourcustomdomain.com`)*.
4. Render will automatically redeploy the service with updated origins.

---

## Step 6: Live Verification Test Checklist

| Feature | What to Test | Expected Result |
| :--- | :--- | :--- |
| **Lookbook Catalog** | Visit `/` and `/collection` | All 6 couture silhouettes load with pricing and details |
| **Bespoke Appointment** | Open "Reserve Fitting" modal or `/appointments` | Submits to backend, saves to MongoDB, returns bespoke `MS-2026-XXXX` reference code |
| **Private Inquiry** | Go to Contact page and submit message | Returns `INQ-XXXX` reference code with instant confirmation |
| **Newsletter Dispatch** | Submit email in the footer or home banner | Confirms subscription with welcome message |
| **Direct Navigation** | Refresh page on any route (e.g., `/fitting`) | `vercel.json` SPA rewrite serves page cleanly without 404 error |

---

## ✦ Tips for Free Tier Hosting

> [!NOTE]
> **Render Free Tier Spin-Down:**
> On Render's Free tier, services spin down after 15 minutes of inactivity. When a new visitor accesses the site, the first request may take ~30–50 seconds to wake up the backend.
> - **Self-Healing UI**: Maison Solène's frontend features an automatic offline fallback wrapper so the user experience never crashes even if the backend is waking up.
> - **Zero Downtime Option**: Set up a free heartbeat ping every 10 minutes using [UptimeRobot](https://uptimerobot.com/) targeting `https://<YOUR-APP>.onrender.com/api/health` to keep the backend warm.
