from pathlib import Path
import os
from dotenv import load_dotenv

from crewai import Agent, Task, Crew
from langchain_groq import ChatGroq

BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / ".env")

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "your_key_here")
if not GROQ_API_KEY or GROQ_API_KEY.strip() in ("", "your_key_here"):
    # Allow placeholder for testing; production requires real key
    print("⚠️  WARNING: GROQ_API_KEY not set. Using placeholder for testing only.")
    print("   Add your real key to backend/.env: GROQ_API_KEY=your_actual_key")


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
        "   - Outreach angle:"
    )


def _run_agent(prompt: str, variable_name: str, value: str) -> str:
    # Model config/API keys belong ONLY in the LLM/Agent definitions.
    groq_model = ChatGroq(api_key=GROQ_API_KEY, model="llama3-8b-8192")

    agent = Agent(
        name="Agentic Engine",
        description="A dual-agent workflow using CrewAI and Groq for content ideation and B2B lead research.",
        llm=groq_model,
        instructions=prompt,
    )

    task = Task(
        description=prompt,
        expected_output="A plain text numbered list as requested by the prompt.",
        agent=agent,
    )

    # Crew must receive ONLY agents, tasks, verbose=True (no config/api keys)
    crew = Crew(
        agents=[agent],
        tasks=[task],
        verbose=True,
    )

    crew_output = crew.kickoff(inputs={variable_name: value})

    # Force clean serialization for FastAPI.
    # CrewOutput is not JSON serializable; return a plain string.
    return str(getattr(crew_output, "raw", crew_output))


def run_content_generator(company_description: str) -> str:
    """Run the Social Media Strategist workflow and return three LinkedIn hooks."""
    prompt = _build_content_prompt(company_description)
    return _run_agent(prompt, "company_description", company_description)


def run_lead_research(target_market: str) -> str:
    """Run the Autonomous Lead Researcher workflow and return three B2B profile recommendations."""
    prompt = _build_lead_prompt(target_market)
    return _run_agent(prompt, "target_market", target_market)

