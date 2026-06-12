# Backend Setup

This directory contains a Python backend for CrewAI + Groq integration.

## Setup

1. Open a terminal in the project root.
2. Run:
   ```bash
   cd backend
   chmod +x setup.sh
   ./setup.sh
   ```
3. Open `backend/.env` and paste your real `GROQ_API_KEY`.

## Run the server

```bash
source backend/venv/bin/activate
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

## API endpoint

- `POST /api/run-agent`
- JSON body:
  ```json
  {
    "company_description": "Your business description here"
  }
  ```

## Response

The endpoint returns a JSON object with the raw agent output and extracted hooks.
