"use client";

import { CircleCheck, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { feeItems, feeTotal, installmentPlan } from "@/data/enrollment";
import { formatINR } from "@/lib/format";
import { updateWizard } from "@/lib/enrollmentWizard";
import { OptionCard } from "@/components/shared/FormControls";
import Button from "@/components/ui/Button";
import DataTable from "@/components/ui/DataTable";
import type { StepProps } from "./types";

type Outcome = "success" | "fail";

export default function FeesStep({ wizard, errors }: StepProps) {
  const { payment } = wizard;
  const [processing, setProcessing] = useState(false);
  const [failed, setFailed] = useState(false);
  const [outcome, setOutcome] = useState<Outcome>("success");
  const paid = payment.status === "paid";
  const amountDue = payment.option === "installment" ? installmentPlan[0].amount : feeTotal;

  const pay = () => {
    setProcessing(true);
    setFailed(false);
    window.setTimeout(() => {
      setProcessing(false);
      if (outcome === "fail") {
        setFailed(true);
        return;
      }
      updateWizard((w) => ({
        ...w,
        payment: {
          ...w.payment,
          status: "paid",
          amount: amountDue,
          reference: `DEMO-${Math.floor(100000 + Math.random() * 900000)}`,
        },
      }));
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <p className="text-subtle">Review your initial fees and choose how to pay. No real payment is taken in this demo.</p>

      <section aria-labelledby="fee-h">
        <h3 id="fee-h" className="mb-3">Fee summary</h3>
        <DataTable
          caption="Fee summary"
          rows={feeItems}
          rowKey={(f) => f.key}
          columns={[
            { key: "item", header: "Item", render: (f) => <span className="font-normal">{f.label}</span> },
            { key: "amount", header: "Amount", align: "right", render: (f) => <span className={f.amount < 0 ? "text-success-fg" : ""}>{formatINR(f.amount)}</span> },
          ]}
          footer={
            <tr>
              <th scope="row" className="px-4 py-3.5 text-left text-base">Total initial fees</th>
              <td className="px-4 py-3.5 text-right font-heading text-xl font-semibold text-primary">{formatINR(feeTotal)}</td>
            </tr>
          }
        />
      </section>

      <fieldset disabled={paid || processing}>
        <legend className="mb-3 text-lg font-semibold font-heading text-primary">Payment option</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          <OptionCard
            name="payment-option"
            checked={payment.option === "full"}
            onChange={() => updateWizard((w) => ({ ...w, payment: { ...w.payment, option: "full" } }))}
            title="Pay in full"
            description="One payment today. No further fee reminders this semester."
            aside={formatINR(feeTotal)}
          />
          <OptionCard
            name="payment-option"
            checked={payment.option === "installment"}
            onChange={() => updateWizard((w) => ({ ...w, payment: { ...w.payment, option: "installment" } }))}
            title="Installments"
            description="Pay part now and the rest in two scheduled payments."
            aside={formatINR(installmentPlan[0].amount)}
          />
        </div>
      </fieldset>

      {payment.option === "installment" && (
        <ul className="divide-y divide-line rounded-md border border-line bg-muted/50 text-sm">
          {installmentPlan.map((i) => (
            <li key={i.label} className="flex justify-between gap-4 px-4 py-2.5">
              <span>{i.label} <span className="text-subtle">({i.due})</span></span>
              <span className="tnum font-semibold">{formatINR(i.amount)}</span>
            </li>
          ))}
        </ul>
      )}

      <section aria-label="Demo payment" className="rounded-lg border border-dashed border-line-strong bg-muted/40 p-5">
        <p className="eyebrow">Demo payment</p>
        {paid ? (
          <p role="status" className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-success-bg px-2.5 py-0.5 text-xs font-semibold text-success-fg">
              <CircleCheck aria-hidden className="h-3.5 w-3.5" /> Payment successful
            </span>
            <span className="tnum">{formatINR(payment.amount)} paid. Reference <span className="font-mono">{payment.reference}</span>.</span>
          </p>
        ) : (
          <>
            <fieldset className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm" disabled={processing}>
              <legend className="sr-only">Simulated outcome</legend>
              {(["success", "fail"] as const).map((o) => (
                <label key={o} className="flex items-center gap-2">
                  <input type="radio" name="demo-outcome" checked={outcome === o} onChange={() => setOutcome(o)} className="accent-[var(--primary)]" />
                  Simulate {o === "success" ? "success" : "failure"}
                </label>
              ))}
            </fieldset>
            <Button onClick={pay} disabled={!payment.option} loading={processing} className="mt-4">
              {processing ? "Processing" : `Pay ${payment.option ? formatINR(amountDue) : ""}`.trim()}
            </Button>
            {processing && <p role="status" className="mt-2 text-sm text-subtle">Contacting the demo payment service...</p>}
            {failed && (
              <p role="alert" className="mt-3 flex items-start gap-2 rounded-md bg-danger-bg px-3 py-2 text-sm font-medium text-danger-fg">
                <TriangleAlert aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
                The simulated payment failed. No money was taken. Try again.
              </p>
            )}
          </>
        )}
        {errors.payment && !paid && <p className="mt-3 text-sm font-medium text-danger-fg">{errors.payment}</p>}
      </section>
    </div>
  );
}
