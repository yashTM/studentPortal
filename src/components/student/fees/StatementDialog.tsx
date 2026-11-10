"use client";

import { Printer } from "lucide-react";
import Logo from "@/components/shared/Logo";
import { branding } from "@/config/branding";
import Button from "@/components/ui/Button";
import Dialog from "@/components/ui/Dialog";
import { formatDate, formatINR } from "@/lib/format";
import { useStudentIdentity } from "@/lib/useStudentIdentity";
import type { FeeAccount } from "@/types/fees";

const money = (n: number) => (n === 0 ? "-" : formatINR(n));

/** Full account statement in a print-friendly layout. */
export default function StatementDialog({
  account,
  open,
  onClose,
}: {
  account: FeeAccount | null;
  open: boolean;
  onClose: () => void;
}) {
  const who = useStudentIdentity();

  return (
    <Dialog open={open} onClose={onClose} label="Fee statement" className="printable !w-[min(56rem,calc(100vw-2rem))]">
      {account && (
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4 pr-8">
            <Logo variant="full" className="h-14 w-auto" />
            <div className="text-right">
              <p className="eyebrow">Fee statement</p>
              <p className="mt-1 text-sm font-semibold">As of {formatDate("2027-08-23")}</p>
            </div>
          </div>
          <span aria-hidden className="mt-4 block h-[3px] w-full bg-accent" />
          <p className="mt-5 rounded-md bg-warning-bg px-3 py-2 text-xs font-medium text-warning-fg">
            Demo statement built from sample data. It has no legal or financial value.
          </p>
          <dl className="mt-5 grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
            <div><dt className="text-subtle">Student</dt><dd className="font-semibold">{who.name} ({who.studentId})</dd></div>
            <div><dt className="text-subtle">Program</dt><dd className="font-semibold">{who.program}</dd></div>
            <div><dt className="text-subtle">Intake / semester</dt><dd className="font-semibold">{who.intakeLabel}</dd></div>
            <div><dt className="text-subtle">Outstanding balance</dt><dd className="tnum font-heading text-xl font-semibold text-primary">{formatINR(account.outstanding)}</dd></div>
          </dl>

          <table className="mt-6 w-full text-[13px]">
            <caption className="sr-only">Statement entries</caption>
            <thead>
              <tr className="border-y border-line-strong text-left text-xs uppercase tracking-wider text-n-600">
                <th scope="col" className="py-2 pr-2">Date</th>
                <th scope="col" className="py-2 pr-2">Description</th>
                <th scope="col" className="py-2 pr-2 text-right">Debit</th>
                <th scope="col" className="py-2 pr-2 text-right">Credit</th>
                <th scope="col" className="py-2 text-right">Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {account.ledger.map((e) => (
                <tr key={e.id}>
                  <td className="tnum py-2 pr-2 align-top">{formatDate(e.date)}</td>
                  <th scope="row" className="py-2 pr-2 text-left font-normal">{e.description}<span className="block font-mono text-[11px] text-subtle">{e.reference}</span></th>
                  <td className="tnum py-2 pr-2 text-right align-top">{money(e.debit)}</td>
                  <td className="tnum py-2 pr-2 text-right align-top">{money(e.credit)}</td>
                  <td className="tnum py-2 text-right align-top font-semibold">{formatINR(e.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-8 border-t border-line pt-4 text-center font-heading text-sm italic text-n-600">{branding.name} · {branding.tagline}</p>
          <div className="mt-6 flex flex-wrap justify-end gap-3 print:hidden">
            <Button variant="secondary" onClick={onClose}>Close</Button>
            <Button icon={<Printer aria-hidden className="h-4 w-4" />} onClick={() => window.print()}>Print or save as PDF</Button>
          </div>
        </div>
      )}
    </Dialog>
  );
}
