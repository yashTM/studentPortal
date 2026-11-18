"use client";

import { FileText, Receipt, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import { formatDate, formatINR } from "@/lib/format";
import { EmptyState } from "@/components/shared/States";
import Button from "@/components/ui/Button";
import CopyButton from "@/components/ui/CopyButton";
import DataTable, { type Column } from "@/components/ui/DataTable";
import type { FeeAccount, LedgerEntry, Payment } from "@/types/fees";
import InstallmentTimeline from "./InstallmentTimeline";
import ReceiptDialog from "./ReceiptDialog";
import StatementDialog from "./StatementDialog";

const control =
  "mt-1.5 block h-10 w-full rounded-md border border-line-strong bg-surface px-3 text-sm outline-none hover:border-n-400 focus:border-brand-400 focus:ring-4 focus:ring-brand-100";

const statusOf = (e: LedgerEntry) => (e.kind === "payment" ? "Paid" : e.kind === "waiver" ? "Waived" : "Charged");
const money = (n: number) => (n === 0 ? <span className="text-n-400">-</span> : formatINR(n));

export default function LedgerTab({ account }: { account: FeeAccount | null }) {
  const [status, setStatus] = useState("All");
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [receipt, setReceipt] = useState<Payment | null>(null);
  const [statementOpen, setStatementOpen] = useState(false);

  const categories = useMemo(() => ["All", ...new Set((account?.ledger ?? []).map((e) => e.category))], [account]);

  if (!account)
    return (
      <div role="status" aria-label="Loading ledger" className="space-y-3">
        <div className="skeleton h-24" />
        <div className="skeleton h-10 w-2/3" />
        <div className="skeleton h-64" />
      </div>
    );

  const shown = account.ledger.filter(
    (e) =>
      (status === "All" || statusOf(e) === status) &&
      (category === "All" || e.category === category) &&
      e.reference.toLowerCase().includes(query.trim().toLowerCase()),
  );
  const filtered = status !== "All" || category !== "All" || query.trim() !== "";
  const debit = shown.reduce((n, e) => n + e.debit, 0);
  const credit = shown.reduce((n, e) => n + e.credit, 0);
  const closing = shown.length ? shown[shown.length - 1].balance : 0;
  const paymentOf = (e: LedgerEntry) => account.payments.find((p) => p.id === e.paymentId) ?? null;

  const columns: Column<LedgerEntry>[] = [
    { key: "date", header: "Date", render: (e) => <span className="tnum whitespace-nowrap">{formatDate(e.date)}</span> },
    {
      key: "desc",
      header: "Description",
      render: (e) => {
        const p = paymentOf(e);
        return (
          <span className="font-normal">
            {e.description}
            {p && (
              <button type="button" onClick={() => setReceipt(p)} className="ml-2 text-[13px] font-semibold text-primary underline underline-offset-4">
                View receipt<span className="sr-only"> {p.receiptNo}</span>
              </button>
            )}
          </span>
        );
      },
    },
    { key: "ref", header: "Reference", render: (e) => <span className="inline-flex items-center gap-1 font-mono text-xs">{e.reference}<CopyButton value={e.reference} label="Reference" /></span> },
    { key: "debit", header: "Debit", align: "right", render: (e) => money(e.debit) },
    { key: "credit", header: "Credit", align: "right", render: (e) => (e.credit ? <span className="text-success-fg">{formatINR(e.credit)}</span> : money(0)) },
    { key: "balance", header: "Balance", align: "right", render: (e) => <span className="font-semibold">{formatINR(e.balance)}</span> },
  ];

  return (
    <div className="space-y-12">
      <section aria-labelledby="schedule-h">
        <h2 id="schedule-h" className="mb-1">Fee schedule</h2>
        <p className="mb-6 text-sm text-subtle">Your installments for Semester 1. Paid items include the payment you made during enrollment.</p>
        <InstallmentTimeline installments={account.installments} />
      </section>

      <section aria-labelledby="ledger-h">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="ledger-h">Fee ledger</h2>
            <p className="mt-1 text-sm text-subtle">A running statement of every charge, waiver and payment.</p>
          </div>
          <Button variant="secondary" size="sm" icon={<FileText aria-hidden className="h-4 w-4" />} onClick={() => setStatementOpen(true)}>
            Download statement
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-[10rem_12rem_1fr]">
          <label className="text-[13px] font-semibold text-n-700">
            Status
            <select value={status} onChange={(e) => setStatus(e.target.value)} className={control}>
              {["All", "Charged", "Paid", "Waived"].map((s) => <option key={s}>{s}</option>)}
            </select>
          </label>
          <label className="text-[13px] font-semibold text-n-700">
            Fee category
            <select value={category} onChange={(e) => setCategory(e.target.value)} className={control}>
              {categories.map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
          <label className="text-[13px] font-semibold text-n-700">
            Search reference number
            <span className="relative block">
              <Search aria-hidden className="pointer-events-none absolute left-3 top-1/2 mt-[3px] h-4 w-4 -translate-y-1/2 text-n-400" />
              <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="For example FEE-2027-0002" className={cn(control, "pl-9")} />
            </span>
          </label>
        </div>

        <div className="mb-3 mt-4 flex items-center gap-3 text-[13px] text-subtle">
          <p aria-live="polite">{shown.length} of {account.ledger.length} entries</p>
          {filtered && (
            <button type="button" onClick={() => { setStatus("All"); setCategory("All"); setQuery(""); }} className="font-semibold text-primary underline underline-offset-4">
              Clear filters
            </button>
          )}
        </div>

        {shown.length === 0 ? (
          <EmptyState art="search" title={account.ledger.length === 0 ? "No ledger entries yet" : "No matching entries"} text={account.ledger.length === 0 ? "Charges and payments will appear here." : "Try a different status, category or reference number."} />
        ) : (
          <>
            <DataTable
              caption="Fee ledger"
              rows={shown}
              rowKey={(e) => e.id}
              columns={columns}
              footer={
                <tr>
                  <th scope="row" colSpan={3} className="px-4 py-3 text-left">Totals{filtered ? " (filtered)" : ""}</th>
                  <td className="tnum px-4 py-3 text-right font-semibold">{formatINR(debit)}</td>
                  <td className="tnum px-4 py-3 text-right font-semibold text-success-fg">{formatINR(credit)}</td>
                  <td className="tnum px-4 py-3 text-right font-heading text-lg font-semibold text-primary">{formatINR(closing)}</td>
                </tr>
              }
            />
            <p className="tnum mt-3 text-sm font-semibold md:hidden">
              Totals: debit {formatINR(debit)}, credit {formatINR(credit)}, balance {formatINR(closing)}
            </p>
          </>
        )}
      </section>

      <section aria-labelledby="history-h">
        <h2 id="history-h" className="mb-4">Payment history</h2>
        {account.payments.length === 0 ? (
          <EmptyState art="folder" title="No payments yet" text="Payments you make will be listed here with a receipt for each." />
        ) : (
          <ul className="divide-y divide-line rounded-lg border border-line bg-surface">
            {[...account.payments].reverse().map((p) => (
              <li key={p.id} className="flex flex-wrap items-center gap-x-4 gap-y-2 px-5 py-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-success-bg text-success-fg"><Receipt aria-hidden className="h-5 w-5" strokeWidth={1.75} /></span>
                <div className="min-w-0 flex-1 basis-56">
                  <p className="text-sm font-semibold">{p.allocations.map((a) => a.label).join(", ")}</p>
                  <p className="text-[13px] text-subtle"><span className="tnum">{formatDate(p.date)}</span> · {p.method} · <span className="font-mono">{p.receiptNo}</span></p>
                </div>
                <p className="tnum font-heading text-lg font-semibold text-primary">{formatINR(p.amount)}</p>
                <Button variant="secondary" size="sm" onClick={() => setReceipt(p)}>View receipt<span className="sr-only"> {p.receiptNo}</span></Button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <ReceiptDialog payment={receipt} onClose={() => setReceipt(null)} />
      <StatementDialog account={account} open={statementOpen} onClose={() => setStatementOpen(false)} />
    </div>
  );
}
