"use client";

import { Printer } from "lucide-react";
import Logo from "@/components/shared/Logo";
import { branding } from "@/config/branding";
import Button from "@/components/ui/Button";
import CopyButton from "@/components/ui/CopyButton";
import Dialog from "@/components/ui/Dialog";
import { formatDate, formatINR } from "@/lib/format";
import { useStudentIdentity } from "@/lib/useStudentIdentity";
import type { Payment } from "@/types/fees";

/** Print-friendly receipt. The `printable` class makes the print stylesheet show only this dialog. */
export default function ReceiptDialog({ payment, onClose }: { payment: Payment | null; onClose: () => void }) {
  const who = useStudentIdentity();

  return (
    <Dialog open={!!payment} onClose={onClose} label="Payment receipt" className="printable">
      {payment && (
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4 pr-8">
            <Logo variant="full" className="h-14 w-auto" />
            <div className="text-right">
              <p className="eyebrow">Payment receipt</p>
              <p className="mt-1 flex items-center justify-end gap-1 font-mono text-sm font-semibold">
                {payment.receiptNo}
                <CopyButton value={payment.receiptNo} label="Receipt number" />
              </p>
            </div>
          </div>

          <span aria-hidden className="mt-4 block h-[3px] w-full bg-accent" />
          <p className="mt-5 rounded-md bg-warning-bg px-3 py-2 text-xs font-medium text-warning-fg">
            Demo receipt. No real money was charged and this document has no legal or financial value.
          </p>

          <dl className="mt-6 grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
            {([
              ["Student", who.name],
              ["Student ID", who.studentId],
              ["Program", who.program],
              ["Intake / semester", who.intakeLabel],
              ["Date", formatDate(payment.date)],
              ["Payment method", payment.method],
              ["Reference", payment.reference],
              ["Status", "Success"],
            ] as const).map(([k, v]) => (
              <div key={k}>
                <dt className="text-subtle">{k}</dt>
                <dd className="font-semibold">{v}</dd>
              </div>
            ))}
          </dl>

          <table className="mt-6 w-full text-sm">
            <caption className="sr-only">Receipt items</caption>
            <thead>
              <tr className="border-y border-line-strong text-left">
                <th scope="col" className="py-2 text-xs font-bold uppercase tracking-wider text-n-600">Item</th>
                <th scope="col" className="py-2 text-right text-xs font-bold uppercase tracking-wider text-n-600">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {payment.allocations.map((a) => (
                <tr key={a.itemId}>
                  <th scope="row" className="py-2.5 text-left font-normal">{a.label}</th>
                  <td className="tnum py-2.5 text-right">{formatINR(a.amount)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-line-strong">
                <th scope="row" className="py-3 text-left">Total paid</th>
                <td className="tnum py-3 text-right font-heading text-xl font-semibold text-primary">{formatINR(payment.amount)}</td>
              </tr>
            </tfoot>
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
