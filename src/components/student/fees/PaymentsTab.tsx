"use client";

import { CircleCheck, CreditCard, Landmark, Smartphone, TriangleAlert, type LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { MIN_CUSTOM_PAYMENT } from "@/data/mock/fees";
import { cn } from "@/lib/cn";
import { allocateCustom } from "@/lib/fees";
import { recordPayment } from "@/lib/feeStore";
import { formatDate, formatINR } from "@/lib/format";
import { submitDemoPayment } from "@/services/fees";
import { CheckField, OptionCard, TextField, Toggle } from "@/components/shared/FormControls";
import ProgressBar from "@/components/shared/ProgressBar";
import Button from "@/components/ui/Button";
import CopyButton from "@/components/ui/CopyButton";
import DataTable from "@/components/ui/DataTable";
import { EmptyState } from "@/components/shared/States";
import type { FeeAccount, Payment, PaymentAllocation } from "@/types/fees";
import PayMethodForm, { emptyPayForm, payFormErrors, type PayForm } from "./PayMethodForm";
import ReceiptDialog from "./ReceiptDialog";
import StatusPill from "./StatusPill";

type Step = "select" | "method" | "review" | "processing" | "success" | "failure";
type Method = "UPI" | "Card" | "Net Banking";

const methods: { id: Method; title: string; description: string; icon: LucideIcon }[] = [
  { id: "UPI", title: "UPI", description: "Pay with a UPI ID", icon: Smartphone },
  { id: "Card", title: "Debit or credit card", description: "Use a test card number", icon: CreditCard },
  { id: "Net Banking", title: "Net banking", description: "Choose a demo bank", icon: Landmark },
];
const stepLabels = ["Select", "Method", "Review and pay"];
const CONVENIENCE_FEE = 0; // demo

export default function PaymentsTab({ account, preselect }: { account: FeeAccount | null; preselect: string[] | null }) {
  const router = useRouter();
  const submitting = useRef(false);
  const [step, setStep] = useState<Step>("select");
  const [picked, setPicked] = useState<string[] | null>(null);
  const [custom, setCustom] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  const [method, setMethod] = useState<Method | null>(null);
  const [form, setForm] = useState<PayForm>(emptyPayForm);
  const [ack, setAck] = useState(false);
  const [simulateFailure, setSimulateFailure] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<Payment | null>(null);
  const [failure, setFailure] = useState("");
  const [receiptOpen, setReceiptOpen] = useState(false);

  if (!account)
    return <div role="status" aria-label="Loading payments" className="space-y-3"><div className="skeleton h-12 w-1/2" /><div className="skeleton h-64" /></div>;

  const payable = account.installments.filter((i) => i.remaining > 0);
  const defaultSel = (preselect ?? []).filter((id) => payable.some((p) => p.id === id));
  const selected = picked ?? (defaultSel.length ? defaultSel : account.nextDue ? [account.nextDue.id] : []);
  const customValue = Math.floor(Number(customAmount.replace(/,/g, "")));
  const allocations: PaymentAllocation[] = custom
    ? Number.isFinite(customValue) && customValue > 0 ? allocateCustom(customValue, account.installments) : []
    : payable.filter((i) => selected.includes(i.id)).map((i) => ({ itemId: i.id, label: i.label, amount: i.remaining }));
  const subtotal = allocations.reduce((n, a) => n + a.amount, 0);
  const total = subtotal + CONVENIENCE_FEE;

  const reset = () => {
    setStep("select"); setPicked(null); setCustom(false); setCustomAmount(""); setMethod(null);
    setForm(emptyPayForm); setAck(false); setErrors({}); setResult(null); setFailure("");
  };

  if (account.outstanding === 0 && step === "select")
    return (
      <div className="rounded-lg border border-success/30 bg-success-bg/60 px-6 py-10 text-center">
        <CircleCheck aria-hidden className="mx-auto h-10 w-10 text-success" strokeWidth={1.5} />
        <h2 className="mt-3">All fees cleared</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-subtle">You have no outstanding balance for this semester. Your receipts are available in the Fee Ledger tab.</p>
        <Button variant="secondary" className="mt-5" onClick={() => router.push("/student/fees/ledger")}>View ledger</Button>
      </div>
    );

  const validateSelect = () => {
    const e: Record<string, string> = {};
    if (custom) {
      const min = Math.min(MIN_CUSTOM_PAYMENT, account.outstanding);
      if (!customAmount.trim() || !Number.isFinite(customValue)) e.amount = "Enter an amount in rupees.";
      else if (customValue < min) e.amount = `The minimum payment is ${formatINR(min)}.`;
      else if (customValue > account.outstanding) e.amount = `You cannot pay more than the outstanding balance of ${formatINR(account.outstanding)}.`;
    } else if (selected.length === 0) e.items = "Select at least one item to pay.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const validateMethod = () => {
    const e: Record<string, string> = {};
    if (!method) e.method = "Choose a payment method.";
    else Object.assign(e, payFormErrors(method, form));
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const pay = async () => {
    if (submitting.current || !method) return; // block double submission
    if (!ack) return setErrors({ ack: "Please confirm to continue." });
    submitting.current = true;
    setErrors({});
    setForm(emptyPayForm); // wipe any entered details before the attempt
    setStep("processing");
    const res = await submitDemoPayment({ allocations, method, simulateFailure });
    submitting.current = false;
    if (res.ok) {
      recordPayment(res.payment);
      setResult(res.payment);
      setStep("success");
    } else {
      setFailure(res.reason);
      setStep("failure");
    }
  };

  const stepIndex = step === "select" ? 0 : step === "method" ? 1 : 2;
  const showFlow = step === "select" || step === "method" || step === "review";

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <div className="min-w-0">
        <p className="mb-6 flex flex-wrap items-center gap-2 rounded-md border border-warning/30 bg-warning-bg px-3 py-2 text-[13px] font-medium text-warning-fg">
          <TriangleAlert aria-hidden className="h-4 w-4 shrink-0" />
          Demo payment. No real money is charged.
        </p>

        {showFlow && (
          <ol aria-label="Payment steps" className="mb-8 flex gap-2 text-[13px] font-semibold">
            {stepLabels.map((l, i) => (
              <li key={l} aria-current={i === stepIndex ? "step" : undefined} className={cn("flex flex-1 items-center gap-2 border-t-2 pt-2", i <= stepIndex ? "border-primary text-primary" : "border-line text-n-400")}>
                <span className="tnum">{i + 1}</span> {l}
              </li>
            ))}
          </ol>
        )}

        {step === "select" && (
          <section aria-labelledby="sel-h" className="rise space-y-6">
            <h2 id="sel-h">What would you like to pay?</h2>
            <fieldset disabled={custom} className="space-y-3 disabled:opacity-50">
              <legend className="sr-only">Payable items</legend>
              {payable.map((i) => {
                const on = selected.includes(i.id);
                return (
                  <label key={i.id} className={cn("flex cursor-pointer items-center gap-4 rounded-lg border bg-surface p-4 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-brand-100", on ? "border-primary bg-brand-50" : "border-line-strong hover:border-n-400")}>
                    <input type="checkbox" checked={on} onChange={() => setPicked(on ? selected.filter((x) => x !== i.id) : [...selected, i.id])} className="h-[18px] w-[18px] accent-[var(--primary)]" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold">{i.label}</span>
                      <span className="tnum block text-[13px] text-subtle">Due {formatDate(i.due)}</span>
                    </span>
                    <StatusPill status={i.status} />
                    <span className="tnum w-24 text-right text-sm font-bold text-primary">{formatINR(i.remaining)}</span>
                  </label>
                );
              })}
            </fieldset>
            {errors.items && <p role="alert" className="text-sm font-medium text-danger-fg">{errors.items}</p>}

            <div className="rounded-lg border border-line p-4">
              <Toggle label="Pay a custom amount" checked={custom} onChange={(v) => { setCustom(v); setErrors({}); }} />
              {custom && (
                <div className="mt-4 max-w-xs">
                  <TextField label="Amount in rupees" value={customAmount} onChange={setCustomAmount} placeholder="e.g. 5000" autoComplete="off" error={errors.amount} hint={`Minimum ${formatINR(Math.min(MIN_CUSTOM_PAYMENT, account.outstanding))}. Maximum ${formatINR(account.outstanding)}. Applied to the earliest dues first.`} />
                </div>
              )}
            </div>
            <div className="flex justify-end"><Button onClick={() => validateSelect() && setStep("method")}>Continue</Button></div>
          </section>
        )}

        {step === "method" && (
          <section aria-labelledby="meth-h" className="rise space-y-6">
            <h2 id="meth-h">Choose a payment method</h2>
            <fieldset>
              <legend className="sr-only">Payment method</legend>
              <div className="grid gap-3 sm:grid-cols-3">
                {methods.map((m) => (
                  <OptionCard key={m.id} name="pay-method" checked={method === m.id} onChange={() => { setMethod(m.id); setErrors({}); }} title={m.title} description={m.description} />
                ))}
              </div>
              {errors.method && <p role="alert" className="mt-2 text-sm font-medium text-danger-fg">{errors.method}</p>}
            </fieldset>
            {method && <PayMethodForm method={method} form={form} setForm={setForm} errors={errors} />}
            <div className="flex justify-between">
              <Button variant="ghost" onClick={() => setStep("select")}>Back</Button>
              <Button onClick={() => validateMethod() && setStep("review")}>Review payment</Button>
            </div>
          </section>
        )}

        {step === "review" && (
          <section aria-labelledby="rev-h" className="rise space-y-6">
            <h2 id="rev-h">Review and pay</h2>
            <DataTable
              caption="Order summary"
              rows={[...allocations, ...(CONVENIENCE_FEE >= 0 ? [{ itemId: "conv", label: "Convenience fee (demo)", amount: CONVENIENCE_FEE }] : [])]}
              rowKey={(a) => a.itemId}
              columns={[
                { key: "item", header: "Item", render: (a) => <span className="font-normal">{a.label}</span> },
                { key: "amt", header: "Amount", align: "right", render: (a) => formatINR(a.amount) },
              ]}
              footer={<tr><th scope="row" className="px-4 py-3.5 text-left text-base">Total</th><td className="tnum px-4 py-3.5 text-right font-heading text-xl font-semibold text-primary">{formatINR(total)}</td></tr>}
            />
            <p className="text-sm text-subtle">Method: <span className="font-semibold text-foreground">{method}</span> (details checked, not stored)</p>
            <CheckField label={`I understand this is a demo payment of ${formatINR(total)} and no real money is charged.`} checked={ack} onChange={setAck} error={errors.ack} />
            <div className="rounded-lg border border-dashed border-line-strong bg-muted/40 p-4">
              <p className="eyebrow mb-3">Demo control</p>
              <Toggle label="Simulate failure" checked={simulateFailure} onChange={setSimulateFailure} />
            </div>
            <div className="flex justify-between">
              <Button variant="ghost" onClick={() => setStep("method")}>Back</Button>
              <Button onClick={pay}>Pay {formatINR(total)}</Button>
            </div>
          </section>
        )}

        {step === "processing" && (
          <section aria-live="polite" className="rise rounded-lg border border-line bg-surface px-6 py-14 text-center">
            <p role="status" className="font-heading text-xl font-semibold text-primary">Processing demo payment</p>
            <p className="mt-1 text-sm text-subtle">Please do not close this page. This takes a few seconds.</p>
            <div className="mx-auto mt-6 max-w-sm">
              <div className="h-1.5 overflow-hidden rounded-full bg-muted"><div className="grow-x h-full rounded-full bg-primary" style={{ animationDuration: "2.5s", animationTimingFunction: "linear" }} /></div>
            </div>
          </section>
        )}

        {step === "success" && result && (
          <section aria-labelledby="ok-h" className="rise rounded-lg border border-success/30 bg-surface">
            <div className="border-b border-line bg-success-bg/60 px-6 py-6 text-center">
              <CircleCheck aria-hidden className="mx-auto h-10 w-10 text-success" strokeWidth={1.5} />
              <h2 id="ok-h" role="status" className="mt-2">Payment successful</h2>
              <p className="mt-1 text-sm text-subtle">Your demo payment was recorded and your balance has been updated.</p>
            </div>
            <dl className="grid gap-x-8 gap-y-4 px-6 py-6 text-sm sm:grid-cols-2">
              <div><dt className="text-subtle">Amount</dt><dd className="tnum font-heading text-2xl font-semibold text-primary">{formatINR(result.amount)}</dd></div>
              <div><dt className="text-subtle">Method</dt><dd className="font-semibold">{result.method}</dd></div>
              <div><dt className="text-subtle">Receipt number</dt><dd className="flex items-center gap-1 font-mono font-semibold">{result.receiptNo}<CopyButton value={result.receiptNo} label="Receipt number" /></dd></div>
              <div><dt className="text-subtle">Reference</dt><dd className="flex items-center gap-1 font-mono font-semibold">{result.reference}<CopyButton value={result.reference} label="Reference" /></dd></div>
              <div><dt className="text-subtle">Date</dt><dd className="tnum font-semibold">{formatDate(result.date)}</dd></div>
            </dl>
            <div className="flex flex-wrap gap-3 border-t border-line px-6 py-4">
              <Button onClick={() => setReceiptOpen(true)}>Download or print receipt</Button>
              <Button variant="secondary" onClick={() => router.push("/student/fees/ledger")}>View ledger</Button>
              <Button variant="ghost" onClick={reset}>Make another payment</Button>
            </div>
            <ReceiptDialog payment={receiptOpen ? result : null} onClose={() => setReceiptOpen(false)} />
          </section>
        )}

        {step === "failure" && (
          <section aria-labelledby="fail-h" className="rise rounded-lg border border-danger/30 bg-surface px-6 py-8">
            <TriangleAlert aria-hidden className="h-9 w-9 text-danger" strokeWidth={1.5} />
            <h2 id="fail-h" role="alert" className="mt-3">Payment did not go through</h2>
            <p className="mt-2 max-w-lg text-sm text-subtle">{failure} You can try again or choose another method. Nothing was recorded on your account.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button onClick={() => { setAck(false); setStep("method"); }}>Try again</Button>
              <Button variant="secondary" onClick={() => { setMethod(null); setAck(false); setStep("method"); }}>Choose another method</Button>
            </div>
          </section>
        )}
      </div>

      {/* Live payment summary */}
      <aside aria-label="Payment summary" className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-lg border border-line bg-surface">
          <div className="border-b border-line px-5 py-4">
            <p className="eyebrow">Payment summary</p>
            <p className="tnum mt-1 font-heading text-3xl font-semibold text-primary">{formatINR(showFlow ? total : result?.amount ?? 0)}</p>
          </div>
          <div className="px-5 py-4 text-sm">
            {showFlow && allocations.length > 0 ? (
              <ul className="divide-y divide-line">
                {allocations.map((a) => (
                  <li key={a.itemId} className="flex justify-between gap-3 py-2"><span>{a.label}</span><span className="tnum font-semibold">{formatINR(a.amount)}</span></li>
                ))}
              </ul>
            ) : showFlow ? (
              <EmptyState art="list" title="Nothing selected" text="Choose what to pay to see your total." />
            ) : (
              <p className="text-subtle">Outstanding after this payment: <span className="tnum font-semibold text-foreground">{formatINR(account.outstanding)}</span></p>
            )}
          </div>
          <div className="border-t border-line px-5 py-4">
            <p className="mb-2 text-[13px] text-subtle"><span className="tnum">{account.percentPaid}%</span> of fees paid</p>
            <ProgressBar value={account.percentPaid} max={100} label="Percent of fees paid" tone="green" />
          </div>
        </div>
      </aside>
    </div>
  );
}
