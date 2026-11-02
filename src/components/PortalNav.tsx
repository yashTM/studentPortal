"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApplicant, type State } from "@/lib/applicantStore";
import { computeJourney } from "@/lib/journey";

const tabs: {
  href: string;
  label: string;
  locked?: (s: State) => boolean;
  lockText?: string;
}[] = [
  { href: "/portal", label: "Overview" },
  { href: "/portal/application", label: "Application" },
  { href: "/portal/documents", label: "Documents" },
  {
    href: "/portal/decision",
    label: "Decision & offer",
    locked: (s) => !s.submittedAt,
    lockText: "Unlocks after you submit your application",
  },
  {
    href: "/portal/enrollment",
    label: "Enrollment",
    locked: (s) => !s.offerAccepted,
    lockText: "Unlocks after you accept your offer",
  },
];

export default function PortalNav() {
  const pathname = usePathname();
  const state = useApplicant();
  const { missingDocs } = computeJourney(state);

  return (
    <nav className="-mb-px flex gap-1 overflow-x-auto">
      {tabs.map((t) => {
        const base = "whitespace-nowrap border-b-2 px-4 py-3 text-sm font-semibold";
        if (t.locked?.(state)) {
          return (
            <span
              key={t.href}
              title={t.lockText}
              aria-disabled
              className={`${base} cursor-not-allowed border-transparent text-foreground/35`}
            >
              🔒 {t.label}
            </span>
          );
        }
        const active = pathname === t.href;
        return (
          <Link
            key={t.href}
            href={t.href}
            aria-current={active ? "page" : undefined}
            className={`${base} ${
              active
                ? "border-primary text-primary"
                : "border-transparent text-foreground/60 hover:text-primary"
            }`}
          >
            {t.label}
            {t.href === "/portal/documents" && missingDocs > 0 && (
              <span className="ml-2 rounded-full bg-accent px-2 py-0.5 text-xs text-accent-foreground">
                {missingDocs}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
