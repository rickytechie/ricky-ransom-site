#!/usr/bin/env bash
set -e

python3 -m venv venv
source venv/bin/activate
python -m pip install --upgrade pip
pip install -r requirements.txt

echo "\nBackend virtual environment created." 
echo "Activate it with: source backend/venv/bin/activate"
echo "Then run: uvicorn main:app --reload --host 127.0.0.1 --port 8000"
