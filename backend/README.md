# Backend Setup

This directory contains the dual-agent Python backend for CrewAI + Groq.

## What this backend exposes

- `POST /api/run-content-agent`
  - Payload: `{ "company_description": "..." }`
  - Returns: three AI-generated LinkedIn post hooks.
- `POST /api/run-lead-agent`
  - Payload: `{ "target_market": "..." }`
  - Returns: three structured B2B profile recommendations.

## Setup

1. Open a terminal in the project root.
2. Navigate to the backend folder:
   ```bash
   cd backend
   ```
3. Create or activate a virtual environment and install dependencies:
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```
4. Open `backend/.env` and paste your real `GROQ_API_KEY`.

## Run the backend server

```bash
source backend/venv/bin/activate
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

## Local frontend integration

Your frontend page should POST to these local endpoints:

- `http://localhost:8000/api/run-content-agent`
- `http://localhost:8000/api/run-lead-agent`

Make sure the backend is running before testing the frontend.
