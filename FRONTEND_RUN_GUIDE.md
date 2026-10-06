# Maison Solène — Frontend Run Guide

This guide provides step-by-step instructions to run, build, and preview the **Maison Solène** luxury couture React application.

---

## Current Status

> **The frontend dev server is currently running in the background at:**
> **URL**: [http://localhost:3000/](http://localhost:3000/)
>
> You can immediately open [http://localhost:3000/](http://localhost:3000/) in any browser (Google Chrome, Microsoft Edge, Brave, etc.) to view the live app!

---

## Prerequisites

- **Node.js**: v18.0.0 or higher *(Node.js v24.19.0 LTS is already installed on this machine in `C:\Program Files\nodejs\`)*
- **npm**: v10.0.0 or higher *(Installed alongside Node.js)*

---

## Step-by-Step Instructions to Run the Frontend

### Method 1: Using PowerShell (Recommended)

1. Open **PowerShell** or your terminal inside the project.
2. Navigate into the `frontend` directory:
   ```powershell
   cd c:\Users\sharm\Downloads\maison-solene-fancy-dresses\frontend
   ```
3. *(First time only)* Install dependencies:
   ```powershell
   npm.cmd install
   ```
   *(Note: On Windows PowerShell, use `npm.cmd` if you encounter a script execution policy restriction).*

4. Start the Vite development server:
   ```powershell
   npm.cmd run dev
   ```
5. Open your browser and visit:
   ```
   http://localhost:3000/
   ```

---

### Method 2: Using Command Prompt (cmd.exe)

1. Open **Command Prompt**.
2. Navigate to the frontend directory:
   ```cmd
   cd c:\Users\sharm\Downloads\maison-solene-fancy-dresses\frontend
   ```
3. Install dependencies:
   ```cmd
   npm install
   ```
4. Start the server:
   ```cmd
   npm run dev
   ```
5. Open your browser at [http://localhost:3000/](http://localhost:3000/).

---

## Available NPM Scripts

All commands should be executed from within the `frontend/` directory:

| Command | Description |
| :--- | :--- |
| `npm run dev` (or `npm.cmd run dev`) | Starts the local Vite development server with Hot Module Replacement (HMR) at port `3000`. |
| `npm run build` (or `npm.cmd run build`) | Compiles the production-ready optimized bundle into `frontend/dist/`. |
| `npm run preview` (or `npm.cmd run preview`) | Previews the compiled production build locally. |

---

## Troubleshooting Common Windows Issues

### 1. "File npm.ps1 cannot be loaded because running scripts is disabled on this system"
Windows PowerShell restricts script execution by default. You can bypass this easily using either of these solutions:
- **Solution A**: Use `npm.cmd` instead of `npm`:
  ```powershell
  npm.cmd run dev
  ```
- **Solution B**: Set your user execution policy once in PowerShell:
  ```powershell
  Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
  ```

### 2. "Port 3000 is already in use"
If the port is already busy (or another dev instance is running), Vite will automatically ask to use port 3001, or you can specify a port:
```powershell
npm.cmd run dev -- --port 3001
```

### 3. "node is not recognized as an internal or external command"
Ensure `C:\Program Files\nodejs` is in your environment PATH:
```powershell
$env:PATH = "C:\Program Files\nodejs;" + $env:PATH
```

---

## Directory Structure Overview

```
frontend/
├── index.html                       # HTML template with luxury Google Fonts (Fraunces & Jost)
├── package.json                     # Project dependencies & scripts
├── vite.config.js                   # Vite React configuration
└── src/
    ├── index.css                    # Haute-couture CSS design tokens & utilities
    ├── main.jsx                     # React DOM entry point
    ├── App.jsx                      # Page switcher, header, footer & modals
    ├── data/
    │   ├── dresses.js               # 6 signature silhouettes, pricing & 9 base shades
    │   ├── atelier.js               # Jaipur courtyard history & craft statistics
    │   └── fittingSteps.js          # 3-step fitting process & FAQs
    ├── components/
    │   ├── Header.jsx               # Sticky navigation & mobile drawer menu
    │   ├── Footer.jsx               # Salons, showroom links & care guide
    │   ├── MarqueeStrip.jsx         # Continuous animated ticker ribbon
    │   ├── QuickViewModal.jsx       # Gown quick-inspection & shade customizer
    │   └── AppointmentModal.jsx     # Multi-location booking modal
    └── pages/
        ├── HomePage/                # Hero, lookbook grid, atelier story, fitting, CTA
        ├── CollectionPage/          # Full catalogue with category filters, search & sort
        ├── ProductDetailPage/       # Single gown view with shade picker & custom measurements
        ├── AtelierPage/             # Jaipur Courtyard No. 4 history & workshop blueprint
        ├── FittingPage/             # Measure, Drape, Finish guide & 12-point checklist
        ├── AppointmentsPage/        # Standalone booking flow (Jaipur, Delhi, Virtual)
        └── ContactPage/             # Salon addresses, telephone lines & inquiry form
```
