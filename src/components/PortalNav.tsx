"use client";

import { Lock } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
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

const base =
  "relative inline-flex items-center gap-1.5 whitespace-nowrap px-4 py-3 text-sm font-semibold after:absolute after:inset-x-3 after:-bottom-px after:h-0.5 after:origin-left after:rounded-full after:bg-accent after:transition-transform after:duration-300";

export default function PortalNav() {
  const pathname = usePathname();
  const state = useApplicant();
  const { missingDocs } = computeJourney(state);

  return (
    <nav aria-label="Admission portal" className="-mb-px flex gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {tabs.map((t) => {
        if (t.locked?.(state)) {
          return (
            <span
              key={t.href}
              title={t.lockText}
              aria-disabled
              className={cn(base, "cursor-not-allowed text-white/40 after:scale-x-0")}
            >
              <Lock aria-hidden className="h-3.5 w-3.5" />
              {t.label}
              <span className="sr-only"> (locked). {t.lockText}</span>
            </span>
          );
        }
        const active = pathname === t.href;
        return (
          <Link
            key={t.href}
            href={t.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              base,
              active ? "text-white after:scale-x-100" : "text-white/70 after:scale-x-0 hover:text-white hover:after:scale-x-50 hover:after:bg-white/40",
            )}
          >
            {t.label}
            {t.href === "/portal/documents" && missingDocs > 0 && (
              <span className="tnum rounded-full bg-accent px-1.5 py-px text-[11px] font-bold text-accent-foreground">{missingDocs}</span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
