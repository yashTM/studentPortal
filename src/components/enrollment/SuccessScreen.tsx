"use client";

import { ArrowRight, Check, Copy, Info } from "lucide-react";
import Link from "next/link";
import { DEMO_STUDENT } from "@/config/demo-credentials";
import { dates } from "@/data/admission";
import Logo from "@/components/shared/Logo";
import { branding } from "@/config/branding";
import Button, { buttonStyles } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import EnrollmentSummaryCard from "./EnrollmentSummaryCard";

function CredentialRow({ label, value, secret }: { label: string; value: string; secret?: boolean }) {
  const toast = useToast();
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      toast(`${label} copied`);
    } catch {
      toast(`Could not copy ${label.toLowerCase()}. Select it and copy manually.`, "danger");
    }
  };
  return (
    <div className="flex items-center justify-between gap-3 py-3">
      <div className="min-w-0">
        <dt className="eyebrow">{label}</dt>
        <dd className={`mt-1 font-mono text-lg font-semibold text-foreground ${secret ? "select-all" : ""}`}>{value}</dd>
      </div>
      <Button variant="secondary" size="sm" onClick={copy} icon={<Copy aria-hidden className="h-3.5 w-3.5" />} aria-label={`Copy ${label.toLowerCase()}`}>
        Copy
      </Button>
    </div>
  );
}

export default function SuccessScreen() {
  return (
    <div className="mx-auto max-w-5xl">
      <section className="rise relative overflow-hidden rounded-lg bg-brand-900 px-6 py-10 text-white sm:px-10 sm:py-12">
        <span aria-hidden className="absolute inset-y-0 left-0 w-1.5 bg-accent" />
        <div aria-hidden className="pointer-events-none absolute -right-6 top-1/2 -translate-y-1/2 opacity-[0.08]">
          <Logo variant="mark" tone="light" className="h-72 w-auto" />
        </div>
        <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
          <Check aria-hidden className="h-6 w-6" strokeWidth={3} />
        </span>
        <p className="eyebrow relative mt-5 !text-accent">Enrollment confirmed</p>
        <h1 className="relative mt-1 !text-white">Welcome to {branding.name}</h1>
        <span aria-hidden className="relative mt-3 block h-[3px] w-12 rounded bg-accent" />
        <p className="relative mt-3 max-w-xl text-white/85">
          Your enrollment is complete. Next, sign in to the Student Portal to view your timetable, choose courses and complete your profile. Classes begin on {dates.classesBegin}.
        </p>
      </section>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <EnrollmentSummaryCard printable variant="certificate" />

        <div className="space-y-5 print:hidden">
          <section aria-labelledby="cred-h" className="rounded-lg border-2 border-brand-800 bg-surface">
            <div className="flex items-center justify-between gap-2 bg-brand-800 px-5 py-3 text-white">
              <h2 id="cred-h" className="!text-base !text-white">Your demo student login</h2>
              <span className="rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-accent-foreground">Demo</span>
            </div>
            <dl className="divide-y divide-line px-5">
              <CredentialRow label="Student ID" value={DEMO_STUDENT.studentId} />
              <CredentialRow label="Password" value={DEMO_STUDENT.password} secret />
            </dl>
            <p className="flex items-start gap-2 border-t border-line bg-warning-bg/70 px-5 py-3 text-[13px] text-warning-fg" role="note">
              <Info aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
              Demo credentials only. They are the same for every demo user, are not secure, and no real account has been created.
            </p>
          </section>
          <Link href="/student/login" className={buttonStyles({ size: "lg", className: "w-full" })}>
            Go to Student Portal <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
