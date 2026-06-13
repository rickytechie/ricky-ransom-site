from __future__ import annotations

import json

from crewai import Agent, Crew, Task


async def kickoff_single_agent(agent: Agent, prompt: str) -> str:
    """Run a single CrewAI Agent by creating a concrete Task.

    CrewAI versions commonly expect at least one Task to execute.
    """

    task = Task(
        description=prompt,
        expected_output="Plain text response.",
        agent=agent,
    )

    crew = Crew(agents=[agent], tasks=[task], verbose=True)
    result = await crew.kickoff_async()

    # CrewAI can return different shapes depending on version.
    # Keep it always JSON-serializable and string-safe.
    raw = getattr(result, "raw", result)
    if isinstance(raw, (dict, list)):
        return json.dumps(raw, ensure_ascii=False)
    return str(raw)

