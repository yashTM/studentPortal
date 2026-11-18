"use client";

import { useApplicant } from "@/lib/applicantStore";

/** Applicant name and reference, styled for the navy portal header. */
export default function ApplicantBadge() {
  const { account, reference } = useApplicant();
  const name = account?.name || "Applicant";
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <>
      <div className="hidden text-right leading-tight sm:block">
        <p className="text-[13px] font-semibold text-white">{name}</p>
        <p className="font-mono text-[11px] text-white/65">{reference ?? "Application not submitted"}</p>
      </div>
      <span aria-hidden className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
        {initials}
      </span>
    </>
  );
}
