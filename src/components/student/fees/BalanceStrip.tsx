"use client";

import { CircleCheck, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { dueText, urgencyOf } from "@/lib/fees";
import { setPreselect } from "@/lib/feeStore";
import { formatDate, formatINR } from "@/lib/format";
import { cn } from "@/lib/cn";
import ProgressRing from "@/components/shared/ProgressRing";
import Button from "@/components/ui/Button";
import type { FeeAccount } from "@/types/fees";
import { useStudentIdentity } from "@/lib/useStudentIdentity";

/** Balance summary shared by both Fee Payments tabs. */
export default function BalanceStrip({ account }: { account: FeeAccount | null }) {
  const router = useRouter();
  const who = useStudentIdentity();

  if (!account)
    return (
      <div role="status" aria-label="Loading balance" className="mb-8 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => <div key={i} className="skeleton h-24 !rounded-none" />)}
      </div>
    );

  const next = account.nextDue;
  const urgency = next ? urgencyOf(next.due) : "normal";
  const cleared = account.outstanding === 0;

  const payNow = () => {
    if (next) setPreselect([next.id]);
    router.push("/student/fees/payments");
  };

  return (
    <>
      <section aria-label="Balance summary" className="rise mb-4 grid divide-y divide-line overflow-hidden rounded-lg border border-line bg-surface sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-[1.35fr_1fr_1.1fr_1.15fr] lg:divide-x">
        <div className={cn("px-6 py-5", cleared ? "bg-success-bg/60" : "bg-brand-50")}>
          <p className="eyebrow">Outstanding balance</p>
          <p className="tnum mt-1 font-heading text-[2.25rem] font-semibold leading-none text-primary">{formatINR(account.outstanding)}</p>
          <p className="mt-2 text-[13px] text-subtle">{who.intakeLabel} · {account.planLabel}</p>
        </div>
        <div className="px-6 py-5">
          <p className="eyebrow">Total fees</p>
          <p className="tnum mt-1 font-heading text-2xl font-semibold text-primary">{formatINR(account.total)}</p>
          <p className="mt-1 text-[13px] text-subtle">After scholarship</p>
        </div>
        <div className="flex items-center justify-between gap-3 px-6 py-5">
          <div>
            <p className="eyebrow">Paid to date</p>
            <p className="tnum mt-1 font-heading text-2xl font-semibold text-primary">{formatINR(account.paid)}</p>
            <p className="mt-1 text-[13px] text-subtle">{account.percentPaid}% paid</p>
          </div>
          <ProgressRing value={account.percentPaid} max={100} label="Percent of fees paid" size={56} stroke={6} tone="green">{""}</ProgressRing>
        </div>
        <div className="px-6 py-5">
          <p className="eyebrow">Next due</p>
          {next ? (
            <>
              <p className="tnum mt-1 font-heading text-2xl font-semibold text-primary">{formatDate(next.due)}</p>
              <p className={cn("mt-1 text-[13px] font-semibold", urgency === "overdue" ? "text-danger-fg" : urgency === "soon" ? "text-warning-fg" : "text-secondary")}>
                {dueText(next.due)} · {formatINR(next.remaining)}
              </p>
            </>
          ) : (
            <p className="mt-1 flex items-center gap-2 font-heading text-xl font-semibold text-success-fg">
              <CircleCheck aria-hidden className="h-5 w-5" /> All fees cleared
            </p>
          )}
        </div>
      </section>

      {next && urgency !== "normal" && (
        <div
          role="status"
          className={cn(
            "mb-8 flex flex-wrap items-center justify-between gap-3 rounded-md border px-4 py-3 text-sm",
            urgency === "overdue" ? "border-danger/30 bg-danger-bg text-danger-fg" : "border-warning/30 bg-warning-bg text-warning-fg",
          )}
        >
          <p className="flex items-start gap-2 font-medium">
            <TriangleAlert aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{next.label} is {dueText(next.due).toLowerCase()} ({formatINR(next.remaining)}).</span>
          </p>
          <Button size="sm" variant={urgency === "overdue" ? "danger" : "primary"} onClick={payNow}>Pay now</Button>
        </div>
      )}
      {!(next && urgency !== "normal") && <div className="mb-8" />}
    </>
  );
}
