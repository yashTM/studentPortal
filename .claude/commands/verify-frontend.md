---
description: Run lint, type-check, and build, and report the real results
---

Verify the frontend.

1. Read `package.json` scripts to see what exists.
2. Run, in order: `npm run lint`, `npx tsc --noEmit`, `npm run build`. Run all three even if an earlier one fails.
3. Report each command's actual outcome (pass/fail, error and warning counts, and the specific messages with `file:line`).
4. Do not hide, shorten away, or dismiss failures. For each failure, say whether it looks pre-existing or caused by recent changes, and propose a fix. Don't change files unless I ask.
