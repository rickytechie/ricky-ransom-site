from __future__ import annotations

from typing import Callable, List, Optional

from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware


from agents import run_content_generator, run_lead_research


app = FastAPI(

    title="CrewAI + Groq Agentic Backend",
    description="FastAPI backend exposing two CrewAI/Groq autonomous workflows for content and lead research.",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ContentRequest(BaseModel):

    company_description: str


class LeadRequest(BaseModel):
    target_market: str


@app.post("/api/run-content-agent")
async def run_content_agent(request: ContentRequest):
    try:
        result = await run_content_generator(request.company_description)
        return {"status": "success", "data": result}
    except Exception as exc:
        raise HTTPException(status_code=500, detail="Agent execution failed") from exc


@app.post("/api/run-lead-agent")
async def run_lead_agent(request: LeadRequest):
    try:
        result = await run_lead_research(request.target_market)
        return {"status": "success", "data": result}
    except Exception as exc:
        raise HTTPException(status_code=500, detail="Agent execution failed") from exc


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)

