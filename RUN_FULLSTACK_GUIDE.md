# Maison Solène — Full Stack Run Guide

Complete step-by-step instructions to run both the **React Frontend** and the **Express.js Backend API** simultaneously.

---

## 🟢 Current Live Status

> **Both servers are currently active and running in the background right now!**
>
> - **Frontend Application**: [http://localhost:3000/](http://localhost:3000/)
> - **Backend REST API**: [http://localhost:5000/api](http://localhost:5000/api)
> - **Backend Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)
>
> You can immediately open **[http://localhost:3000/](http://localhost:3000/)** in Google Chrome or Microsoft Edge to test the full-stack application.

---

## Method 1: One-Click Launch (Easiest)

We have created automated launch scripts for Windows in your project folder:

### Option A: Double-Click Batch File
Simply double-click **`run-fullstack.bat`** in the project folder. It will open two terminal windows (one for the backend and one for the frontend) and start both servers automatically.

### Option B: Using PowerShell
Run this single command from your project root:
```powershell
.\run-fullstack.ps1
```

---

## Method 2: Manual Step-by-Step in Two Terminals

If you prefer to start them manually or in your code editor (e.g. VS Code):

### Step 1: Start the Backend API (Terminal 1)

1. Open a new terminal window or tab.
2. Navigate to the `backend` directory:
   ```powershell
   cd c:\Users\sharm\Downloads\maison-solene-fancy-dresses\backend
   ```
3. *(First time only)* Install dependencies:
   ```powershell
   npm.cmd install
   ```
4. Start the backend server:
   ```powershell
   npm.cmd start
   ```
   *(Or for auto-reload development mode: `npm.cmd run dev`)*
5. **Confirmation**: You should see:
   ```
   ✦ Maison Solène Atelier API listening at: http://localhost:5000/api
   ✦ Health check endpoint: http://localhost:5000/api/health
   ```

---

### Step 2: Start the Frontend App (Terminal 2)

1. Open a second terminal window or tab.
2. Navigate to the `frontend` directory:
   ```powershell
   cd c:\Users\sharm\Downloads\maison-solene-fancy-dresses\frontend
   ```
3. *(First time only)* Install dependencies:
   ```powershell
   npm.cmd install
   ```
4. Start the Vite development server:
   ```powershell
   npm.cmd run dev
   ```
5. **Confirmation**: You should see:
   ```
   VITE v5.4.21 ready in 432 ms
   ➜  Local:   http://localhost:3000/
   ```
6. Open your browser and visit: **[http://localhost:3000/](http://localhost:3000/)**

---

## Verifying Full-Stack Integration

Once both servers are running:
1. **Browse Lookbook**: Open [http://localhost:3000/](http://localhost:3000/) and click **"Collection"** to view all silhouettes.
2. **Book a Fitting**: Click **"Book a fitting"** in the top navigation, fill in your details, and submit. The frontend sends the request to `POST http://localhost:5000/api/appointments` and returns a real bespoke confirmation reference (e.g. `MS-2026-7F46`).
3. **Send an Inquiry**: Go to **"Contact"**, send a message or swatch request. It saves directly to `backend/src/data/inquiries.json` with an inquiry tracking reference (`INQ-XXXX`).
4. **Subscribe to Newsletter**: Enter an email in the consultation footer on the home page. It records to `backend/src/data/newsletter.json`.

---

## Common Troubleshooting Tips

### 1. PowerShell Script Execution Restriction
If PowerShell prevents running `npm`:
- **Quick Fix**: Always use `npm.cmd` instead of `npm` (e.g. `npm.cmd start`, `npm.cmd run dev`).
- **Permanent Fix**: Run this once in PowerShell:
  ```powershell
  Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
  ```

### 2. Node Not Recognized in a New Terminal
Ensure `C:\Program Files\nodejs` is in your session PATH:
```powershell
$env:PATH = "C:\Program Files\nodejs;" + $env:PATH
```

### 3. Ports Already in Use
- The backend defaults to port `5000`. You can change it in `backend/.env` (`PORT=5001`).
- The frontend defaults to port `3000`. Vite will automatically suggest port `3001` if `3000` is busy.
