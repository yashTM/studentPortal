---
name: frontend-best-practices
description: Apply maintainable Next.js App Router and React patterns when writing or refactoring components, pages, hooks, or types in this portal. Use for component design, splitting large files, server vs client decisions, and TypeScript usage.
---

# Frontend best practices

Read `CLAUDE.md` for project conventions first; this skill adds the checklist.

## Before writing
- Search `src/components/`, `src/lib/`, and `src/data/` for something reusable. Extend it rather than duplicating.
- Check `node_modules/next/dist/docs/` for any Next.js API you are unsure of (this version has breaking changes).

## Checklist
1. **Server vs client**: default to Server Component. `"use client"` only where state, effects, event handlers, or browser APIs are needed; push it down to the smallest leaf.
2. **Size and cohesion**: one responsibility per component; split files over ~200 lines. Pull logic out into `lib/` functions or `useX` hooks when it is reused or not about rendering.
3. **Data separation**: content, option lists, and demo data go in `src/data/`, not JSX.
4. **TypeScript**: no `any`; type props explicitly; derive types from data (`typeof`, `as const`) instead of repeating them; use union types for statuses.
5. **No premature abstraction**: wait for the second or third real use before generalising. Don't add a library for something small.
6. **Accessibility**: semantic elements, labels tied to inputs, button vs link used correctly, keyboard and focus behaviour, alt text, adequate contrast.
7. **Responsive**: verify mobile width layout; avoid fixed widths.
8. **States**: loading, empty, error, and success paths exist for anything async or data-dependent. Handle unavailable `localStorage`.
9. **Demo honesty**: simulated behaviour is labelled demo and never implies persistence.

## Output
State which checklist items were applied or deliberately skipped and why, in plain language.
