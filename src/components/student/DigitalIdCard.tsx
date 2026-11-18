"use client";

import { Printer } from "lucide-react";
import { useCallback, useState } from "react";
import { getStudentProfile } from "@/services/student";
import { branding } from "@/config/branding";
import { useProfileSeed } from "@/lib/studentData";
import { useAsync } from "@/lib/useAsync";
import { formatDate } from "@/lib/format";
import { intakeSemesterLabel } from "@/lib/intake";
import AsyncView from "@/components/shared/AsyncView";
import CampusImage from "@/components/shared/CampusImage";
import Logo from "@/components/shared/Logo";
import PageHeader from "@/components/shared/PageHeader";
import Button from "@/components/ui/Button";
import type { StudentProfile } from "@/types/student";

// Decorative placeholder pattern, not a scannable QR code.
const QR_CELLS = Array.from({ length: 81 }, (_, i) => (i * 7 + Math.floor(i / 9) * 3) % 5 < 2);
const face = "absolute inset-0 flex flex-col overflow-hidden rounded-lg border border-line-strong bg-surface shadow-lg [backface-visibility:hidden]";

function QrPlaceholder({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 9 9" role="img" aria-label="QR code placeholder" className={className}>
      {QR_CELLS.map((on, i) => (on ? <rect key={i} x={i % 9} y={Math.floor(i / 9)} width="1" height="1" fill="currentColor" /> : null))}
    </svg>
  );
}

function Front({ p }: { p: StudentProfile }) {
  return (
    <>
      <div className="flex items-center justify-between bg-brand-800 px-5 py-3">
        <Logo tone="light" className="h-8 w-auto" />
        <span className="eyebrow !text-accent">Student ID</span>
      </div>
      <div className="h-[3px] bg-accent" />
      <div className="flex flex-1 gap-5 p-5">
        <div role="img" aria-label="Photo placeholder" className="flex h-32 w-26 shrink-0 items-center justify-center rounded-md border border-line bg-muted font-heading text-3xl font-semibold text-n-400">
          {p.firstName[0]}
          {p.lastName[0]}
        </div>
        <dl className="min-w-0 flex-1 text-sm">
          <dt className="sr-only">Name</dt>
          <dd className="font-heading text-xl font-semibold leading-tight text-primary">{p.firstName} {p.lastName}</dd>
          <dt className="eyebrow mt-3">Student ID</dt>
          <dd className="font-mono text-base font-semibold tracking-wide text-foreground">{p.studentId}</dd>
          <dt className="eyebrow mt-3">Program</dt>
          <dd className="font-medium">{p.program}</dd>
          <dt className="eyebrow mt-3">Intake / Semester</dt>
          <dd className="font-medium">{intakeSemesterLabel(p.intake, p.semester)}</dd>
        </dl>
        <div className="flex shrink-0 flex-col items-end justify-between">
          <span className="rounded-full bg-success-bg px-2.5 py-0.5 text-[11px] font-bold text-success-fg">Enrolled</span>
          <QrPlaceholder className="h-16 w-16 text-primary" />
        </div>
      </div>
    </>
  );
}

function Back({ p }: { p: StudentProfile }) {
  return (
    <>
      {/* Crest watermark */}
      <div aria-hidden className="pointer-events-none absolute -right-6 top-1/2 -translate-y-1/2 opacity-[0.07]">
        <Logo variant="mark" className="h-64 w-auto" />
      </div>
      <div className="relative flex flex-1 flex-col justify-between p-5">
        <div>
          <p className="font-heading text-lg font-semibold italic text-primary">{branding.tagline}</p>
          <span aria-hidden className="mt-2 block h-[3px] w-10 rounded bg-accent" />
          <p className="mt-3 max-w-sm text-[12px] text-n-600">
            Valid for the 2027 to 2028 academic year, issued {formatDate("2027-07-15")}. This card remains the property of {branding.name}. If found, return it to the Student Services desk.
          </p>
        </div>
        <div className="flex items-end justify-between text-xs text-subtle">
          <span className="border-t border-line-strong pt-1">Signature of holder</span>
          <span className="font-mono">{p.studentId}</span>
        </div>
      </div>
      <div className="relative h-14 shrink-0">
        <CampusImage variant="banner" sizes="520px" position="center 40%" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-brand-900/90 to-brand-900/30" />
        <p className="relative flex h-full items-center px-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">{branding.name}</p>
      </div>
    </>
  );
}

/** Two-sided card. The flip is CSS-only; reduced-motion users get an instant switch. */
export function IdCard({ profile, side }: { profile: StudentProfile; side: "front" | "back" }) {
  return (
    <div className="w-full max-w-lg [perspective:1400px]">
      <div
        className="relative aspect-[1.586/1] transition-transform duration-[650ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] [transform-style:preserve-3d]"
        style={{ transform: side === "back" ? "rotateY(180deg)" : "none" }}
      >
        <div className={face} inert={side === "back"} aria-hidden={side === "back"}><Front p={profile} /></div>
        <div className={`${face} [transform:rotateY(180deg)]`} inert={side === "front"} aria-hidden={side === "front"}><Back p={profile} /></div>
      </div>
    </div>
  );
}

export default function DigitalIdCard() {
  const seed = useProfileSeed();
  const load = useCallback(() => getStudentProfile(seed), [seed]);
  const { state, retry } = useAsync(load);
  const [side, setSide] = useState<"front" | "back">("front");

  return (
    <>
      <div className="print:hidden">
        <PageHeader title="Digital student ID" description="Show this card on campus. The photo and QR code are placeholders in this demo.">
          <Button icon={<Printer aria-hidden className="h-4 w-4" />} onClick={() => window.print()}>
            Download or print
          </Button>
        </PageHeader>
      </div>
      {/* Print letterhead */}
      <div className="mb-6 hidden print:block">
        <Logo variant="full" className="h-14 w-auto" />
        <span aria-hidden className="mt-3 block h-[3px] w-full bg-accent" />
      </div>
      <AsyncView state={state} retry={retry} label="Loading your ID">
        {(profile) => (
          <div className="space-y-5">
            <div role="group" aria-label="Card side" className="inline-flex rounded-full border border-line bg-muted p-1 text-sm font-semibold print:hidden">
              {(["front", "back"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-pressed={side === s}
                  onClick={() => setSide(s)}
                  className={`rounded-full px-5 py-1.5 capitalize ${side === s ? "bg-surface text-primary shadow-sm" : "text-subtle hover:text-primary"}`}
                >
                  {s}
                </button>
              ))}
            </div>
            <IdCard profile={profile} side={side} />
            <p className="text-xs text-subtle print:hidden">Placeholder only. A real card would carry a verifiable code and photograph.</p>
            <p className="hidden pt-6 text-center font-heading text-sm italic text-n-600 print:block">{branding.tagline}</p>
          </div>
        )}
      </AsyncView>
    </>
  );
}
