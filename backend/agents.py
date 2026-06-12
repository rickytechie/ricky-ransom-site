from pathlib import Path
import os
from dotenv import load_dotenv

# Recommended imports for CrewAI and Groq integration
from crewai import Crew
from langchain_groq import ChatGroq

BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / ".env")

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
if not GROQ_API_KEY:
    raise EnvironmentError(
        "GROQ_API_KEY is missing. Please add it to backend/.env"
    )


def _build_agent_prompt(company_description: str) -> str:
    return (
        "You are a Social Media Strategist specializing in high-converting LinkedIn content. "
        "Given the business description below, generate exactly 3 custom LinkedIn post hooks that are concise, compelling, "
        "and designed to drive clicks, engagement, and lead generation. "
        "Do not output anything else.\n\n"
        f"Business Description:\n{company_description.strip()}\n\n"
        "Output Format:\n"
        "1. Hook one\n"
        "2. Hook two\n"
        "3. Hook three"
    )


def run_content_generator(company_description: str) -> str:
    """Run the CrewAI Social Media Strategist agent and return 3 LinkedIn hooks."""
    groq_model = ChatGroq(api_key=GROQ_API_KEY, model="llama3-8b-8192")

    crew = Crew(api_key=GROQ_API_KEY)

    prompt = _build_agent_prompt(company_description)

    # Create the agent workflow. This is a clean wrapper around Crew + Groq.
    agent = crew.create_agent(
        name="Social Media Strategist",
        description=(
            "A CrewAI agent that converts a business description into three high-converting "
            "LinkedIn post hooks using the Groq llama3-8b-8192 model."
        ),
        model=groq_model,
        input_variables=["company_description"],
        instructions=prompt,
    )

    result = agent.run({"company_description": company_description})

    if isinstance(result, dict):
        if "output_text" in result:
            return result["output_text"]
        if "text" in result:
            return result["text"]
        return str(result)

    return str(result)
