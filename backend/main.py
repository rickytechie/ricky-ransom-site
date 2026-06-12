from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from agents import run_content_generator

app = FastAPI(
    title="CrewAI Groq Backend",
    description="Backend API for running a CrewAI Social Media Strategist agent with Groq.",
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


class RunAgentRequest(BaseModel):
    company_description: str


class RunAgentResponse(BaseModel):
    success: bool
    result: str
    hooks: list[str]


def _extract_hooks(raw_output: str) -> list[str]:
    lines = [line.strip() for line in raw_output.splitlines() if line.strip()]
    hooks = []
    for line in lines:
        if line[0].isdigit() and line[1] in ".)":
            hooks.append(line[2:].strip())
        elif line.startswith("-") or line.startswith("*"):
            hooks.append(line[1:].strip())
        else:
            hooks.append(line)
    return hooks[:3]


@app.post("/api/run-agent", response_model=RunAgentResponse)
async def run_agent(request: RunAgentRequest):
    try:
        raw_result = run_content_generator(request.company_description)
        hooks = _extract_hooks(raw_result)
        return RunAgentResponse(success=True, result=raw_result, hooks=hooks)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
