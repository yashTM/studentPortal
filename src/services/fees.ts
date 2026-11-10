// Mock service layer for Fee Payments. Every function is async and returns DEMO data.
// Backend integration points (replace the bodies with fetch() calls; the UI stays the same):
//   getFeeAccount      -> GET  /fees/account            (schedule, ledger, totals)
//   getFeeSchedule     -> GET  /fees/schedule
//   getFeeLedger       -> GET  /fees/ledger
//   submitDemoPayment  -> POST /payments                (payment initiation via a real gateway)
//   receipts           -> GET  /payments/:id/receipt
import { DEMO_TODAY } from "@/data/mock/student";
import { buildFeeAccount } from "@/lib/fees";
import type { FeeAccount, FeeContext, PaymentRequest, PaymentResult } from "@/types/fees";

const delay = <T>(value: T, ms: number) =>
  new Promise<T>((resolve) => setTimeout(() => resolve(value), ms));

export const getFeeAccount = (ctx: FeeContext): Promise<FeeAccount> => delay(buildFeeAccount(ctx), 150);
export const getFeeSchedule = async (ctx: FeeContext) => (await getFeeAccount(ctx)).installments;
export const getFeeLedger = async (ctx: FeeContext) => (await getFeeAccount(ctx)).ledger;

const digits = (n: number) => String(Math.floor(Math.random() * 10 ** n)).padStart(n, "0");

/**
 * Simulated gateway. Takes 2.5 seconds, then succeeds or fails. It receives no card, UPI or bank
 * details at all: only what is being paid and the method type.
 */
export async function submitDemoPayment(req: PaymentRequest): Promise<PaymentResult> {
  await delay(null, 2500);
  if (req.simulateFailure)
    return { ok: false, reason: "The demo bank declined the transaction (simulated). No money was taken." };
  const amount = req.allocations.reduce((n, a) => n + a.amount, 0);
  return {
    ok: true,
    payment: {
      id: `pay-${digits(8)}`,
      receiptNo: `RCT-${digits(6)}`,
      reference: `PAY-${digits(8)}`,
      date: DEMO_TODAY,
      amount,
      method: req.method,
      allocations: req.allocations,
    },
  };
}
