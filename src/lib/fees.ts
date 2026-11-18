import { feeTotal, installmentPlan } from "@/data/enrollment";
import {
  billingDate,
  enrollmentPaymentDate,
  feeCharges,
  lateFee,
} from "@/data/mock/fees";
import { DEMO_TODAY } from "@/data/mock/student";
import type {
  FeeAccount,
  FeeContext,
  FeeInstallment,
  FeeStatus,
  LedgerEntry,
  Payment,
} from "@/types/fees";
import { daysBetween } from "./dates";

const DUE_WINDOW_DAYS = 30;

const statusFor = (remaining: number, due: string): FeeStatus => {
  if (remaining <= 0) return "Paid";
  const d = daysBetween(DEMO_TODAY, due);
  if (d < 0) return "Overdue";
  return d <= DUE_WINDOW_DAYS ? "Due" : "Upcoming";
};

/** The initial payment made in the enrollment wizard, expressed as a normal Payment record. */
function initialPaymentRecord(ctx: FeeContext, instalmentId: string, label: string): Payment | null {
  if (!ctx.initialPayment) return null;
  return {
    id: "pay-enrollment",
    receiptNo: `RCT-${ctx.initialPayment.reference.replace(/^DEMO-/, "")}`,
    reference: ctx.initialPayment.reference,
    date: enrollmentPaymentDate,
    amount: ctx.initialPayment.amount,
    method: "Enrollment (demo)",
    allocations: [{ itemId: instalmentId, label, amount: ctx.initialPayment.amount }],
  };
}

/**
 * Pure builder: schedule, ledger and totals from the enrollment payment plus session payments.
 * This is the single source of truth for every fee figure in the portal.
 */
export function buildFeeAccount(ctx: FeeContext): FeeAccount {
  const planned =
    ctx.option === "full"
      ? [{ id: "inst-1", label: "Enrollment payment (in full)", due: installmentPlan[0].dueIso, amount: feeTotal }]
      : installmentPlan.map((p, i) => ({
          id: `inst-${i + 1}`,
          label: i === 0 ? "Enrollment installment" : p.label,
          due: p.dueIso,
          amount: p.amount,
        }));
  const items = [...planned, { id: "late-fee", label: "Late registration fee (demo)", due: lateFee.due, amount: lateFee.amount }];

  const initial = initialPaymentRecord(ctx, "inst-1", planned[0].label);
  const payments = [...(initial ? [initial] : []), ...ctx.payments];

  const paidBy = new Map<string, number>();
  for (const p of payments) for (const a of p.allocations) paidBy.set(a.itemId, (paidBy.get(a.itemId) ?? 0) + a.amount);

  const installments: FeeInstallment[] = items.map((i) => {
    const paid = Math.min(i.amount, paidBy.get(i.id) ?? 0);
    const remaining = i.amount - paid;
    return { ...i, paid, remaining, status: statusFor(remaining, i.due) };
  });

  // Ledger: charges and waivers, then payments, ordered by date (stable).
  const charges: Omit<LedgerEntry, "balance">[] = [
    { id: "c-reg", date: billingDate, description: "Registration fee (enrollment deposit, refundable)", reference: "FEE-2027-0001", category: "Registration", kind: "charge", debit: feeCharges.registration, credit: 0 },
    { id: "c-tuition", date: billingDate, description: "Tuition fee, Semester 1", reference: "FEE-2027-0002", category: "Tuition", kind: "charge", debit: feeCharges.tuition, credit: 0 },
    { id: "c-lib", date: billingDate, description: "Library and lab fee", reference: "FEE-2027-0003", category: "Library and Lab", kind: "charge", debit: feeCharges.libraryLab, credit: 0 },
    { id: "c-tech", date: billingDate, description: "Technology fee", reference: "FEE-2027-0004", category: "Technology", kind: "charge", debit: feeCharges.technology, credit: 0 },
    { id: "w-merit", date: billingDate, description: "Merit scholarship (25% of tuition)", reference: "WVR-2027-0001", category: "Scholarship", kind: "waiver", debit: 0, credit: feeCharges.scholarship },
    { id: "c-late", date: lateFee.charged, description: "Late registration fee (demo)", reference: "FEE-2027-0005", category: "Late fee", kind: "charge", debit: lateFee.amount, credit: 0 },
  ];
  const received: Omit<LedgerEntry, "balance">[] = payments.map((p) => ({
    id: `p-${p.id}`,
    date: p.date,
    description: `Payment received: ${p.allocations.map((a) => a.label).join(", ")}`,
    reference: p.reference,
    category: "Payment",
    kind: "payment",
    debit: 0,
    credit: p.amount,
    paymentId: p.id,
  }));
  const raw = [...charges, ...received].sort((a, b) => a.date.localeCompare(b.date));

  let balance = 0;
  const ledger: LedgerEntry[] = raw.map((e) => {
    balance += e.debit - e.credit;
    return { ...e, balance };
  });

  const total = items.reduce((n, i) => n + i.amount, 0);
  const paid = payments.reduce((n, p) => n + p.amount, 0);
  const unpaid = installments.filter((i) => i.remaining > 0).sort((a, b) => a.due.localeCompare(b.due));

  return {
    installments,
    ledger,
    payments,
    total,
    paid,
    outstanding: total - paid,
    percentPaid: total === 0 ? 0 : Math.round((paid / total) * 100),
    nextDue: unpaid[0] ?? null,
    planLabel: ctx.option === "full" ? "Paid in full at enrollment" : "Installment plan",
  };
}

/** Spread a custom amount over the earliest unpaid items. */
export function allocateCustom(amount: number, installments: FeeInstallment[]) {
  let left = amount;
  const out: { itemId: string; label: string; amount: number }[] = [];
  for (const i of installments.filter((x) => x.remaining > 0).sort((a, b) => a.due.localeCompare(b.due))) {
    if (left <= 0) break;
    const part = Math.min(left, i.remaining);
    out.push({ itemId: i.id, label: i.label, amount: part });
    left -= part;
  }
  return out;
}

export const dueText = (due: string) => {
  const d = daysBetween(DEMO_TODAY, due);
  if (d < 0) return `Overdue by ${-d} ${-d === 1 ? "day" : "days"}`;
  if (d === 0) return "Due today";
  return `Due in ${d} ${d === 1 ? "day" : "days"}`;
};

/** Urgency of the next due date: danger when overdue, warning within 7 days. */
export const urgencyOf = (due: string) => {
  const d = daysBetween(DEMO_TODAY, due);
  return d < 0 ? ("overdue" as const) : d <= 7 ? ("soon" as const) : ("normal" as const);
};
