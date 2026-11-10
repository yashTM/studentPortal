"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { baseProfile } from "@/data/mock/student";
import { intakeSemesterLabel } from "@/lib/intake";
import { useProfileSeed } from "@/lib/studentData";

/** Compact digital ID shown above the navigation (echoes the full ID card). Links to the full ID page. */
export default function SidebarIdCard({ onNavigate }: { onNavigate?: () => void }) {
  const seed = useProfileSeed();
  const p = { ...baseProfile, ...seed };
  const name = `${p.firstName} ${p.lastName}`.trim();

  return (
    <Link
      href="/student/id-card"
      onClick={onNavigate}
      aria-label={`Open the full digital student ID for ${name}`}
      className="group relative block overflow-hidden rounded-lg bg-white/[0.07] p-3.5 text-white ring-1 ring-inset ring-accent/35 hover:bg-white/10"
    >
      <span aria-hidden className="absolute inset-y-0 left-0 w-1 bg-accent" />
      <div className="flex items-center gap-3 pl-1">
        <span aria-hidden className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-accent font-heading text-base font-bold text-accent-foreground">
          {p.firstName[0]}
          {p.lastName[0]}
        </span>
        <div className="min-w-0">
          <p className="truncate font-heading text-[15px] font-semibold leading-tight">{name}</p>
          <p className="mt-0.5 font-mono text-[11px] tracking-wide text-white/70">{p.studentId}</p>
        </div>
      </div>
      <p className="mt-3 truncate pl-1 text-[11px] text-white/70">{p.program}</p>
      <div className="mt-2 flex items-end justify-between gap-2 pl-1">
        <div className="min-w-0">
          <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-accent">Intake / Semester</p>
          <p className="truncate text-[12px] font-semibold">{intakeSemesterLabel(p.intake, p.semester)}</p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-[11px] font-semibold">Enrolled</span>
      </div>
      <span className="mt-2 flex items-center gap-1 pl-1 text-[11px] font-semibold text-accent">
        View ID
        <ChevronRight aria-hidden className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
