---
description: Review the current uncommitted changes for regressions, duplication, safety, naming, and accessibility
---

Review the current working-tree changes. Do not commit, push, stage, or modify files.

Focus (if given): $ARGUMENTS

1. Run `git status` and `git diff` (staged and unstaged); read untracked new files too.
2. Check for: behaviour regressions, broken imports/routes, duplicated logic or components that already exist, unsafe changes (secrets, `.env`, config, git/deploy), poor naming, unnecessary `"use client"` or dependencies, accessibility issues, missing loading/error states, unlabelled mock data, and missing tests (note the project currently has no test setup).
3. Report findings by severity with `file:line` and a suggested fix, then a short verdict. Mention if `/verify-frontend` should be run.
