# Student Portal — Project Guide

@AGENTS.md
@my-rule.md

## Overview and scope
Applicant admission portal (home, login, signup, and `/portal/*` journey: application → documents → decision → enrollment).
**Frontend-only.** No backend, database, or real auth. All "accounts" and progress live in `localStorage` via `src/lib/applicantStore.ts` and are demo data. The backend will later be a separate Node.js service.

## Stack (verified from package.json)
Next.js 16.4.3 (App Router, `src/app`, `cacheComponents` on), React 19.3, TypeScript strict, Tailwind v4. Path alias `@/*` → `src/*`.
Next.js here differs from older versions: read the relevant guide in `node_modules/next/dist/docs/` before using or changing framework APIs.

## Where code goes
| Kind | Location |
|---|---|
| Routes, layouts (thin; render a component) | `src/app/` |
| Generic, reusable UI (forms, cards, nav) | `src/components/` |
| Portal-specific screens | `src/components/portal/` |
| Static/demo content and config | `src/data/` (mock data in `src/data/mock/`) |
| Public site (Home, About, Contact) pages / layout | `src/app/(site)/` |
| Public site components and content | `src/components/site/`, `src/data/site/` |
| Enrollment wizard steps | `src/components/enrollment/` |
| Student Portal modules / shell | `src/components/student/` |
| Async mock service layer | `src/services/` |
| Demo credentials | `src/config/demo-credentials.ts` |
| Branding config and assets | `src/config/branding.ts`, `public/branding/` |
| Shared states, form controls, tabs, progress | `src/components/shared/` |
| Design-system primitives (Button, Dialog, Toast, DataTable, Stat) | `src/components/ui/` |
| Design tokens (colour, type, radius, elevation, motion) | `src/app/globals.css` |
| Client state, pure logic, helpers | `src/lib/` |

When a domain grows past ~8 files, group it under `src/features/<domain>/{components,hooks,types,utils}`. Don't create that nesting preemptively. Don't move files without approval.

## Conventions
- Server Components by default; add `"use client"` only for state, effects, or browser APIs, and keep it as low in the tree as possible.
- Components: PascalCase files, default export, props typed inline or with a `type`. Hooks `useX`. Other files camelCase.
- One component per file; split when a file passes ~200 lines or mixes concerns. Extract duplicated logic before copying it.
- No `any`; prefer `unknown` plus narrowing. Reuse `Field`, `AuthCard`, `portal/ui.tsx` before building new primitives.
- Tailwind utilities with the design tokens in `globals.css` (brand navy, gold accent, warm neutrals, 3 radii). Icons come from `lucide-react`; no emojis. Headings inherit navy, so set `text-white` explicitly on dark panels.
- No new dependencies without asking.

## UI/UX and accessibility
Semantic HTML, labelled inputs, visible focus, keyboard operable, sufficient contrast, responsive from mobile up. Every data-dependent view needs loading, empty, and error states. Anything unfinished or simulated must say so ("Demo").

## State and mock data
Local component state first; shared state only through the existing store. Mock data lives in `src/data/`, never inline in JSX, and must be labelled demo/non-persistent. Never present it as real.

## Commands
- Lint: `npm run lint`
- Type-check: `npx tsc --noEmit`
- Build: `npm run build`
- Dev: `npm run dev`

Run all three after changes and report actual results.

## Git and safety
No commit, push, branch change, or deploy without explicit permission. Never read, edit, or print `.env*` or secrets. No backend, database, deployment, or production config changes in this phase. Student Portal navigation lives only in `src/components/student/nav.ts`; branding (Horizon University logo and campus photo) is configured in `src/config/branding.ts`; assets live in `public/branding/` and originals in `design/branding-source/`.

## Claude Code setup
- `my-rule.md` — personal workflow rules (imported above)
- `.claude/skills/` — `frontend-best-practices`, `ui-ux-review`, `plan-act-verify`
- `.claude/commands/` — `/audit-frontend`, `/plan-feature`, `/verify-frontend`, `/review-changes`
