/** Tiny class-name joiner (replaces clsx). */
export const cn = (...parts: (string | false | null | undefined)[]) => parts.filter(Boolean).join(" ");
