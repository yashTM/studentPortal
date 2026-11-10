---
name: plan-act-verify
description: Run a disciplined Plan → Act → Verify workflow for any code change in this repo - inspect first, write a small plan, implement incrementally, run lint/type-check/build, and report what was and was not verified. Use for features, fixes, and refactors.
---

# Plan → Act → Verify

## 1. Plan
- Read the files you will touch and their importers/consumers. Note existing reusable code.
- Write a short plan: goal, files to change/create, ordered steps, risks, and the checks you will run. Keep it to what the task needs.
- For large moves, deletions, or anything destructive, stop and get confirmation before acting.

## 2. Act
- Implement one step at a time; keep the app compiling between steps.
- Smallest change that works; preserve existing behaviour; no new dependencies unless approved.
- Follow `CLAUDE.md` conventions. Do not touch `.env*`, git state, or deployment config.

## 3. Verify
- Run `npm run lint`, `npx tsc --noEmit`, `npm run build` (check `package.json` scripts first, in case they changed).
- If a check fails, fix it or explain exactly why it cannot be fixed. Never call a task done with unexplained failures.
- Where possible, exercise the changed UI (run dev server, check the route) rather than relying only on static checks.

## 4. Report
Give: what changed (files), what was verified with actual command results, what was **not** verified, and any open issues or follow-ups. Use plain language.
