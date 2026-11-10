// Session-only DEMO state for fee payments. Stores non-sensitive records only (amounts, method
// type, references). Card numbers, UPI IDs and bank details are never stored anywhere.
import { useEffect, useMemo, useState } from "react";
import { getFeeAccount } from "@/services/fees";
import type { FeeAccount, FeeContext, Payment } from "@/types/fees";
import { useApplicant } from "./applicantStore";
import { createSessionStore } from "./sessionStore";

export type FeeStoreState = {
  payments: Payment[];
  /** Installment ids to preselect when the Payments tab opens (set by "Pay now" nudges). */
  preselect: string[] | null;
};

export const feeStore = createSessionStore<FeeStoreState>("student-portal-fees", {
  payments: [],
  preselect: null,
});

export const recordPayment = (payment: Payment) =>
  feeStore.update((s) => ({ ...s, payments: [...s.payments, payment], preselect: null }));

export const setPreselect = (ids: string[] | null) => feeStore.update((s) => ({ ...s, preselect: ids }));

/** The fee account, built through the service layer. Keeps the previous value while reloading. */
export function useFeeAccount() {
  const { wizard } = useApplicant();
  const { value } = feeStore.useStore();
  const { payment } = wizard;

  const ctx = useMemo<FeeContext>(
    () => ({
      option: payment.option === "full" ? "full" : "installment",
      initialPayment:
        payment.status === "paid" && payment.reference
          ? { amount: payment.amount, reference: payment.reference }
          : null,
      payments: value.payments,
    }),
    [payment.option, payment.status, payment.reference, payment.amount, value.payments],
  );

  const [account, setAccount] = useState<FeeAccount | null>(null);
  useEffect(() => {
    let cancelled = false;
    getFeeAccount(ctx).then((a) => {
      if (!cancelled) setAccount(a);
    });
    return () => {
      cancelled = true;
    };
  }, [ctx]);

  return { account, preselect: value.preselect };
}
