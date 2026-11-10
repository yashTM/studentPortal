import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
import { formatDate, formatINR } from "@/lib/format";
import type { FeeInstallment } from "@/types/fees";
import StatusPill from "./StatusPill";

const node = {
  Paid: "bg-success text-white",
  Due: "bg-primary text-white ring-4 ring-brand-100",
  Overdue: "bg-danger text-white ring-4 ring-danger-bg",
  Upcoming: "border-2 border-line-strong bg-surface text-n-400",
} as const;

/** Horizontal on desktop, vertical on mobile. Items animate in (CSS, reduced-motion safe). */
export default function InstallmentTimeline({ installments }: { installments: FeeInstallment[] }) {
  const sorted = [...installments].sort((a, b) => a.due.localeCompare(b.due));
  return (
    <ol className="grid lg:grid-flow-col lg:auto-cols-fr" aria-label="Fee schedule">
      {sorted.map((i, idx) => (
        <li key={i.id} className="rise relative flex gap-4 pb-7 last:pb-0 lg:block lg:pb-0 lg:pr-6" style={{ ["--i" as string]: idx }}>
          {idx < sorted.length - 1 && (
            <>
              <span aria-hidden className={cn("absolute left-[15px] top-9 h-[calc(100%-1.5rem)] w-px lg:hidden", i.status === "Paid" ? "bg-success" : "bg-line-strong")} />
              <span aria-hidden className={cn("absolute left-10 right-3 top-[15px] hidden h-px lg:block", i.status === "Paid" ? "bg-success" : "bg-line-strong")} />
            </>
          )}
          <span aria-hidden className={cn("relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px] font-bold", node[i.status])}>
            {i.status === "Paid" ? <Check className="h-4 w-4" strokeWidth={3} /> : idx + 1}
          </span>
          <div className="min-w-0 lg:mt-3">
            <p className="text-sm font-semibold text-foreground">{i.label}</p>
            <p className="tnum text-[13px] text-subtle">{formatDate(i.due)}</p>
            <p className="tnum mt-1 font-heading text-lg font-semibold text-primary">{formatINR(i.amount)}</p>
            {i.status !== "Paid" && i.paid > 0 && (
              <p className="tnum text-xs text-subtle">{formatINR(i.remaining)} remaining</p>
            )}
            <div className="mt-2"><StatusPill status={i.status} /></div>
          </div>
        </li>
      ))}
    </ol>
  );
}
