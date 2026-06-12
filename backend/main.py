from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from agents import run_content_generator, run_lead_research

app = FastAPI(
    title="CrewAI + Groq Agentic Backend",
    description="FastAPI backend exposing two CrewAI/Groq autonomous workflows for content and lead research.",
)

allowed_origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ContentRequest(BaseModel):
    company_description: str


class LeadRequest(BaseModel):
    target_market: str


class AgentResponse(BaseModel):
    success: bool
    result: str


@app.post("/api/run-content-agent", response_model=AgentResponse)
async def run_content_agent(request: ContentRequest):
    try:
        result = run_content_generator(request.company_description)
        return AgentResponse(success=True, result=result)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))


@app.post("/api/run-lead-agent", response_model=AgentResponse)
async def run_lead_agent(request: LeadRequest):
    try:
        result = run_lead_research(request.target_market)
        return AgentResponse(success=True, result=result)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
