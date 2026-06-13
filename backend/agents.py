import os
import json
from typing import Any, Dict

from crewai import Agent, Crew


GROQ_API_KEY = os.environ["GROQ_API_KEY"]
os.environ["GROQ_API_KEY"] = GROQ_API_KEY


def _base_agent_common(**overrides: Any) -> Agent:
    """Create an Agent with explicit role/goal/backstory and native string model id."""

    return Agent(
        llm="groq/llama3-8b-8192",
        verbose=True,
        **overrides,
    )


async def _run_crew_single_agent(agent: Agent, *, inputs: Dict[str, Any]) -> str:
    """Non-blocking crew worker using CrewAI async kickoff."""

    # CrewAI versions commonly expect at least one task. If your CrewAI build
    # requires tasks, you can adjust this to include a Task.
    crew = Crew(agents=[agent], tasks=[], verbose=True)

    result = await crew.kickoff_async(inputs=inputs)

    raw = getattr(result, "raw", result)
    if isinstance(raw, (dict, list)):
        return json.dumps(raw, ensure_ascii=False)
    return str(raw)


async def run_content_generator(company_description: str) -> str:
    """Run the Social Media Strategist workflow and return exactly 3 LinkedIn hooks."""

    agent = _base_agent_common(
        role="Social Media Strategist",
        goal=(
            "Generate high-converting LinkedIn post hooks that drive engagement, clicks, "
            "and B2B lead conversion."
        ),
        backstory=(
            "You specialize in high-performing LinkedIn messaging for B2B SaaS and "
            "enterprise teams. You write concise hooks that spark curiosity and action."
        ),
    )

    prompt = (
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

    return await _run_crew_single_agent(agent, inputs={"prompt": prompt})


async def run_lead_research(target_market: str) -> str:
    """Run lead research and return structured buyer segments and outreach angles."""

    agent = _base_agent_common(
        role="Autonomous Lead Researcher",
        goal=(
            "Identify ideal buyer profile segments and explain their technology bottlenecks "
            "and the best outreach angle."
        ),
        backstory=(
            "You research B2B markets for SaaS and enterprise sales teams. "
            "You produce structured, actionable insights with clear outreach hooks."
        ),
    )

    prompt = (
        "You are an Autonomous Lead Researcher for B2B SaaS and enterprise sales teams. "
        "Given the target market below, identify 3 ideal buyer profile segments and explain each profile's likely "
        "technology bottlenecks and the best outreach angle. "
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

    return await _run_crew_single_agent(agent, inputs={"prompt": prompt})

