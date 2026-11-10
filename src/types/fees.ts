export type FeeStatus = "Paid" | "Due" | "Overdue" | "Upcoming";

export type FeeCategory =
  | "Registration"
  | "Tuition"
  | "Library and Lab"
  | "Technology"
  | "Scholarship"
  | "Late fee"
  | "Payment";

export type PaymentMethod = "UPI" | "Card" | "Net Banking" | "Enrollment (demo)";

/** One payable line on the fee schedule. */
export type FeeInstallment = {
  id: string;
  label: string;
  due: string; // ISO date
  amount: number;
  paid: number;
  remaining: number;
  status: FeeStatus;
};

export type PaymentAllocation = { itemId: string; label: string; amount: number };

/** A completed demo payment. Never holds card, UPI or bank details. */
export type Payment = {
  id: string;
  receiptNo: string;
  reference: string;
  date: string; // ISO date
  amount: number;
  method: PaymentMethod;
  allocations: PaymentAllocation[];
};

export type LedgerEntry = {
  id: string;
  date: string;
  description: string;
  reference: string;
  category: FeeCategory;
  kind: "charge" | "payment" | "waiver";
  debit: number;
  credit: number;
  balance: number;
  paymentId?: string;
};

export type FeeContext = {
  option: "full" | "installment";
  initialPayment: { amount: number; reference: string } | null;
  payments: Payment[];
};

export type FeeAccount = {
  installments: FeeInstallment[];
  ledger: LedgerEntry[];
  payments: Payment[];
  total: number;
  paid: number;
  outstanding: number;
  percentPaid: number;
  nextDue: FeeInstallment | null;
  planLabel: string;
};

export type PaymentRequest = {
  allocations: PaymentAllocation[];
  method: Exclude<PaymentMethod, "Enrollment (demo)">;
  simulateFailure: boolean;
};

export type PaymentResult =
  | { ok: true; payment: Payment }
  | { ok: false; reason: string };
