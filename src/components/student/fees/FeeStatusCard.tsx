"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { dueText, urgencyOf } from "@/lib/fees";
import { useFeeAccount } from "@/lib/feeStore";
import { formatDate, formatINR } from "@/lib/format";
import ProgressBar from "@/components/shared/ProgressBar";
import { buttonStyles } from "@/components/ui/Button";

/** Compact fee status for the dashboard. Reads the same account as the Fee Payments module. */
export default function FeeStatusCard() {
  const { account } = useFeeAccount();

  if (!account) return <div role="status" aria-label="Loading fee status" className="skeleton h-44" />;

  const next = account.nextDue;
  const urgency = next ? urgencyOf(next.due) : "normal";

  return (
    <section aria-labelledby="fee-card-h" className="rounded-lg border border-line bg-surface">
      <div className="px-5 pt-4">
        <p className="eyebrow">Fees</p>
        <h2 id="fee-card-h" className="mt-0.5 text-xl">Fee status</h2>
      </div>
      <div className="px-5 py-4">
        <p className="eyebrow">Outstanding</p>
        <p className="tnum mt-1 font-heading text-3xl font-semibold text-primary">{formatINR(account.outstanding)}</p>
        <div className="mt-3"><ProgressBar value={account.percentPaid} max={100} label="Percent of fees paid" tone="green" /></div>
        <p className="tnum mt-2 text-[13px] text-subtle">{formatINR(account.paid)} of {formatINR(account.total)} paid ({account.percentPaid}%)</p>
        <p className={cn("mt-3 text-sm font-semibold", !next ? "text-success-fg" : urgency === "overdue" ? "text-danger-fg" : urgency === "soon" ? "text-warning-fg" : "text-foreground")}>
          {next ? `${next.label}: ${formatDate(next.due)} (${dueText(next.due).toLowerCase()})` : "All fees cleared"}
        </p>
      </div>
      <div className="border-t border-line px-5 py-3.5">
        <Link href="/student/fees/ledger" className={buttonStyles({ variant: "secondary", size: "sm" })}>
          Open Fee Payments <ArrowRight aria-hidden className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
}
