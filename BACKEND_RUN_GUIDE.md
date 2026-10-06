# Maison Solène — Backend REST API Guide

This guide provides instructions to run, configure, and consume the **Maison Solène** Node.js/Express backend API.

---

## Current Status

> **The backend API server is actively running in the background at:**
> **Base URL**: [http://localhost:5000/api](http://localhost:5000/api)
> **Healthcheck**: [http://localhost:5000/api/health](http://localhost:5000/api/health)
>
> It is pre-configured with CORS to seamlessly receive requests from the React frontend running at `http://localhost:3000`.

---

## Step-by-Step Instructions to Run the Backend

### Method 1: Using PowerShell (Recommended)

1. Open PowerShell and navigate to the `backend` folder:
   ```powershell
   cd c:\Users\sharm\Downloads\maison-solene-fancy-dresses\backend
   ```

2. *(First time only)* Install dependencies:
   ```powershell
   npm.cmd install
   ```

3. Start the API server:
   ```powershell
   npm.cmd start
   ```
   Or run in development watch mode (auto-reloads on file changes):
   ```powershell
   npm.cmd run dev
   ```

4. You will see:
   ```
   ✦ Maison Solène Atelier API listening at: http://localhost:5000/api
   ✦ Health check endpoint: http://localhost:5000/api/health
   ```

---

### Method 2: Using Command Prompt (cmd.exe)

1. Open Command Prompt:
   ```cmd
   cd c:\Users\sharm\Downloads\maison-solene-fancy-dresses\backend
   npm install
   npm start
   ```

---

## Complete API Reference

### 1. System Health
- **`GET /api/health`**
  - **Description**: Verifies server status and uptime.
  - **Sample Response**:
    ```json
    {
      "status": "ok",
      "service": "Maison Solène Haute Couture API",
      "time": "2026-09-08T05:15:00.000Z",
      "uptime": 124.5
    }
    ```

---

### 2. Collection & Silhouettes
- **`GET /api/dresses`**
  - **Query Parameters**:
    - `category`: Filter by silhouette category (`Ball Gown`, `Column`, `Cape Silhouette`, etc.)
    - `search`: Search by name, fabric, or silhouette
    - `sort`: `price-low`, `price-high`, `name`
- **`GET /api/dresses/:id`**
  - **Description**: Detailed craft notes, fabrics, and pricing for a single gown.

---

### 3. Fitting Appointments
- **`POST /api/appointments`**
  - **Description**: Books a bespoke fitting session at Jaipur, Delhi, or virtual format.
  - **Request Body**:
    ```json
    {
      "location": "jaipur",
      "dress": "The Solène Gown",
      "date": "2026-10-15",
      "timeSlot": "02:00 PM - 03:30 PM",
      "fullName": "Pooja Singhania",
      "email": "pooja@example.com",
      "phone": "+91 98200 11223",
      "eventDate": "2026-11-20",
      "notes": "Autumn wedding reception in Udaipur."
    }
    ```
  - **Response (`201 Created`)**: Returns appointment with unique booking reference `MS-2026-XXXX`.

- **`GET /api/appointments`**
  - **Description**: Lists all booked consultations (supports `?location=jaipur` or `?status=confirmed`).
- **`GET /api/appointments/:id`**
  - **Description**: Fetch appointment by ID or reference code.
- **`PATCH /api/appointments/:id/status`**
  - **Description**: Update appointment status (`confirmed`, `toile_in_progress`, `fitting_completed`, `rescheduled`).

---

### 4. Inquiries & Newsletter
- **`POST /api/inquiries`**
  - **Description**: Submit a client message, fabric swatch request, or alteration ticket.
  - **Request Body**:
    ```json
    {
      "inquiryType": "swatch",
      "name": "Radhika Roy",
      "email": "radhika@example.com",
      "phone": "+91 99887 66554",
      "message": "Requesting silk chiffon swatches in Bourgogne Imperial."
    }
    ```
  - **Response (`201 Created`)**: Returns tracking reference `INQ-XXXX`.

- **`GET /api/inquiries`**
  - **Description**: Lists all received client messages.

- **`POST /api/inquiries/newsletter`**
  - **Description**: Subscribes an email for consultation invitations.
  - **Request Body**:
    ```json
    { "email": "client@example.com" }
    ```

---

### 5. Bespoke Measurements
- **`POST /api/measurements`**
  - **Description**: Records a client's 12-point anatomical vectors.
  - **Request Body**:
    ```json
    {
      "clientName": "Pooja Singhania",
      "email": "pooja@example.com",
      "dressId": "solene-gown",
      "measurements": {
        "bust": 88,
        "waist": 68,
        "hip": 94,
        "height": 168,
        "hollowToHem": 142
      }
    }
    ```

---

### 6. Atelier Information
- **`GET /api/atelier`**
  - **Description**: Returns Jaipur Courtyard No. 4 heritage, artisan statistics, and salon directory.

---

## Data Storage

Data is automatically persisted atomically in JSON format inside `backend/src/data/`:
- `appointments.json` — All consultation bookings.
- `inquiries.json` — Contact requests and swatch inquiries.
- `newsletter.json` — Consultation subscribers.
- `measurements.json` — Custom anatomical measurement profiles.
- `dresses.json` — Catalog silhouettes.
- `atelier.json` — Atelier heritage specifications.

---

## Directory Structure

```
backend/
├── package.json               # Backend dependencies & scripts
├── server.js                  # Entry point / port listener
├── .env                       # Environment variables (PORT=5000, CLIENT_ORIGIN)
└── src/
    ├── app.js                 # Express app configuration & middleware
    ├── config/
    │   └── constants.js       # Configuration values
    ├── data/                  # Persisted storage files
    ├── routes/                # Express routing layer
    ├── controllers/           # Business logic & request validation
    ├── services/              # Atomic JSON storage service
    └── middleware/            # Error handling & CORS
```
