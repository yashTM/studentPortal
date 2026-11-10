---
description: Produce a step-by-step implementation plan for a feature without implementing it
argument-hint: <feature description>
---

Plan this feature: $ARGUMENTS

**Do not implement it.** Do not create or edit source files.

1. Inspect the relevant routes, components, data, and state; look for reusable pieces.
2. Restate the feature in your own words, and list any assumptions or open questions.
3. Confirm it is frontend-only and fits the current phase; flag anything that would need a backend.
4. Produce an ordered plan covering: files to create or change, data/mock-data needs (labelled demo), component breakdown, loading/empty/error states, accessibility considerations.
5. List risks to existing functionality and the verification steps (lint, type-check, build, manual checks).
6. End by asking for approval before any implementation.
