---
name: ui-ux-review
description: Review a page, flow, or component of the student portal for usability, accessibility, visual hierarchy, consistency, responsiveness, and missing states, and recommend improvements before any change is made. Use when asked to critique, audit, or polish the UI.
---

# UI/UX review

Review only; **do not edit files** until the user approves the recommendations.

## Steps
1. Identify the target (route or component) and read its source plus the shared pieces it uses (`Field`, `AuthCard`, `portal/ui.tsx`, `globals.css` tokens).
2. Walk the user flow from entry to completion and note where a first-time applicant could be confused or stuck.
3. Evaluate each area below.

| Area | Look for |
|---|---|
| Usability | Clear primary action, understandable labels, helpful validation messages, obvious next step, safe undo/confirm for irreversible actions |
| Accessibility | Labels/`aria` where needed, heading order, focus visibility, keyboard path, colour contrast, not conveying meaning by colour alone |
| Hierarchy | Heading levels, spacing, emphasis, one dominant call to action per view |
| Consistency | Same component, spacing, wording, and tokens for the same purpose across pages |
| Responsive | Layout at ~360px, ~768px, desktop; touch target size; text wrapping |
| States | Loading, empty, error, success, disabled; first-visit vs returning |
| Honesty | Demo/mock behaviour clearly labelled |

## Report format
Group findings as **High / Medium / Low**. For each: location (`file:line`), problem, why it matters to the user, and a specific fix. End with a short recommended order of work and ask which items to implement.
