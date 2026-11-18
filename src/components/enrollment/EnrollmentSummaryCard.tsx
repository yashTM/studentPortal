"use client";

import { ArrowRight, Printer } from "lucide-react";
import Link from "next/link";
import { useApplicant } from "@/lib/applicantStore";
import { buildEnrollmentSummary } from "@/lib/enrollmentSummary";
import { useFeeAccount } from "@/lib/feeStore";
import { formatDate, formatINR } from "@/lib/format";
import { EmptyState } from "@/components/shared/States";
import Logo from "@/components/shared/Logo";
import Button from "@/components/ui/Button";

/**
 * Shows the (demo) enrollment summary. Used on the enrollment success screen and in the Student
 * Portal. Shows an empty state with a link back to enrollment when enrollment is not complete.
 */
export default function EnrollmentSummaryCard({
  fullSummaryHref,
  printable = false,
  variant = "panel",
}: {
  fullSummaryHref?: string;
  printable?: boolean;
  /** `certificate` is the welcome-card treatment used on the enrollment success screen. */
  variant?: "panel" | "certificate";
}) {
  const cert = variant === "certificate";
  const state = useApplicant();
  const summary = buildEnrollmentSummary(state);
  const { account } = useFeeAccount();

  if (!summary)
    return (
      <EmptyState
        art="folder"
        title="Enrollment not completed"
        text="Complete enrollment in the admission portal to see your enrollment summary here."
      >
        <Link href="/portal/enrollment" className="text-primary underline underline-offset-4">
          Go to enrollment
        </Link>
      </EmptyState>
    );

  const rows: [string, string][] = [
    ["Student name", summary.name],
    ["Student ID", summary.studentId],
    ["Program", summary.program],
    ["Intake / semester", summary.intake],
    [
      "Fee status",
      `${account ? (account.outstanding === 0 ? "Paid in full" : `${account.planLabel}: ${account.percentPaid}% paid`) : summary.feeStatus} (demo)`,
    ],
    [
      "Amount paid",
      account ? `${formatINR(account.paid)} of ${formatINR(account.total)}` : `${formatINR(summary.amountPaid)} of ${formatINR(summary.totalFees)}`,
    ],
    ["Onboarding checklist", `${summary.onboardingDone} of ${summary.onboardingTotal} complete`],
    ["Enrollment date", summary.enrolledOn ? formatDate(summary.enrolledOn) : "Not recorded"],
  ];

  return (
    <section className={cert ? "relative overflow-hidden rounded-lg border-2 border-accent bg-surface shadow-md" : "rounded-lg border border-line bg-surface"}>
      {cert && (
        <div aria-hidden className="pointer-events-none absolute -bottom-6 -right-6 opacity-[0.06]">
          <Logo variant="mark" className="h-64 w-auto" />
        </div>
      )}
      <div className={cert ? "relative border-b border-accent/50 px-5 py-5" : "border-b border-line px-5 py-4"}>
        {cert && <Logo variant="compact" className="mb-4 h-8 w-auto" />}
        <p className="eyebrow">{cert ? "Certificate of enrollment" : "Record"}</p>
        <h2 className="mt-0.5 text-xl">Enrollment Summary</h2>
        {cert && <span aria-hidden className="mt-2 block h-[3px] w-10 rounded bg-accent" />}
        <p className="mt-1 text-xs text-subtle">Demo data. No real payment or account was created.</p>
      </div>
      <dl className="relative divide-y divide-line px-5">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-baseline justify-between gap-4 py-2.5 text-sm">
            <dt className="shrink-0 text-subtle">{k}</dt>
            <dd className="text-right font-semibold text-foreground">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="flex flex-wrap items-center gap-3 border-t border-line px-5 py-3.5 print:hidden">
        {fullSummaryHref && (
          <Link href={fullSummaryHref} className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline">
            View full summary <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        )}
        {printable && (
          <Button variant="secondary" size="sm" icon={<Printer aria-hidden className="h-4 w-4" />} onClick={() => window.print()}>
            Print or save as PDF
          </Button>
        )}
      </div>
    </section>
  );
}
