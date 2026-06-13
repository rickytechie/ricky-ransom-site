# Turbopack / port conflict mitigation notes

## What changed

- `package.json`: updated `dev` script to use port 3002.
- `next.config.ts`: disabled Turbopack config block to avoid SST write-batch compaction crashes.

## Important

- Tooling errors indicate `npm` was not found inside the current terminal environment; run `npm run dev` in an environment where Node/npm are available.
- If Turbopack still starts, remove any other `turbopack` references and ensure your Next version supports the configuration you’re using.
