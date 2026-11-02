"use client";

import { useApplicant } from "@/lib/applicantStore";

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
      <div className="hidden text-right text-sm sm:block">
        <p className="font-semibold text-primary">{name}</p>
        <p className="text-xs text-foreground/60">
          {reference ?? "Application not submitted"}
        </p>
      </div>
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
        {initials}
      </span>
    </>
  );
}
