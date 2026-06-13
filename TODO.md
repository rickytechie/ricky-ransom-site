# TODO - Agentic Execution Engine Rebuild

## Planned steps

1. Inspect existing backend (`backend/agents.py`, `backend/main.py`, `backend/task_executor.py`) and frontend header navigation.
2. Rebuild `backend/agents.py` from scratch:
   - strict async execution
   - `os.environ["GROQ_API_KEY"] = GROQ_API_KEY`
   - `Agent(..., llm="groq/llama3-8b-8192")` with explicit `role/goal/backstory`
   - non-blocking worker uses `await crew.kickoff_async(inputs=...)`
   - expose `run_content_generator` and `run_lead_research`
   - ensure LF line endings (rewrite files)
3. Rebuild `backend/main.py`:
   - robust custom CORS allowing localhost any port + whitelisting production domains
   - async POST routes calling `await` agent runners
   - explicit validation/try-except loops
4. Verify frontend “Portfolio” link routes to `/projects` (and fix if needed).
5. Run a quick syntax check / import check where possible.

## Progress

- [x] Rebuilt `backend/agents.py`.
- [x] Rebuilt `backend/main.py`.
- [x] Verified `app/layout.tsx` Portfolio link already targets `/projects`.
- [ ] Verify LF-only line endings (tooling limitations in this environment).
