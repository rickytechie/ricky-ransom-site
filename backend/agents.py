from pathlib import Path
import os
from dotenv import load_dotenv

from crewai import Crew
from langchain_groq import ChatGroq

BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / ".env")

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
if not GROQ_API_KEY:
    raise EnvironmentError(
        "GROQ_API_KEY is missing. Please add it to backend/.env"
    )


def _normalize_agent_result(result) -> str:
    if isinstance(result, dict):
        for key in ("output_text", "output", "text"):
            if key in result:
                return str(result[key])
        return str(result)
    return str(result)


def _build_content_prompt(company_description: str) -> str:
    return (
        "You are a Social Media Strategist specializing in high-converting LinkedIn content for LinkedIn feeds. "
        "Given the business description below, generate exactly 3 custom LinkedIn post hooks that are bold, concise, "
        "and designed to drive engagement, clicks, and B2B lead conversion. "
        "Return the answer as a short numbered list of hooks.\n\n"
        f"Business Description:\n{company_description.strip()}\n\n"
        "Example Output:\n"
        "1. Hook one\n"
        "2. Hook two\n"
        "3. Hook three"
    )


def _build_lead_prompt(target_market: str) -> str:
    return (
        "You are an Autonomous Lead Researcher for B2B SaaS and enterprise sales teams. "
        "Given the target market below, identify 3 ideal buyer profile segments and explain each profile's likely technology bottlenecks and the best outreach angle. "
        "Format the response as a numbered list with each profile including:\n"
        "- Profile name / company type\n"
        "- Key role or decision-maker\n"
        "- Likely tech bottlenecks\n"
        "- Recommended outreach angle\n\n"
        f"Target Market:\n{target_market.strip()}\n\n"
        "Example Output:\n"
        "1. Profile Name / Company Type:\n"
        "   - Role:\n"
        "   - Likely tech bottlenecks:\n"
        "   - Outreach angle:\n"
    )


def _run_agent(prompt: str, variable_name: str, value: str):
    groq_model = ChatGroq(api_key=GROQ_API_KEY, model="llama3-8b-8192")
    crew = Crew(api_key=GROQ_API_KEY)

    agent = crew.create_agent(
        name="Agentic Engine",
        description=(
            "A dual-agent workflow using CrewAI and Groq for content ideation and B2B lead research."
        ),
        model=groq_model,
        instructions=prompt,
        input_variables=[variable_name],
    )

    result = agent.run({variable_name: value})
    return _normalize_agent_result(result)


def run_content_generator(company_description: str) -> str:
    """Run the Social Media Strategist workflow and return three LinkedIn hooks."""
    prompt = _build_content_prompt(company_description)
    return _run_agent(prompt, "company_description", company_description)


def run_lead_research(target_market: str) -> str:
    """Run the Autonomous Lead Researcher workflow and return three B2B profile recommendations."""
    prompt = _build_lead_prompt(target_market)
    return _run_agent(prompt, "target_market", target_market)
