// DEMO DATA for the Fee Payments module. Amounts derive from the enrollment fee step
// (data/enrollment.ts) so the wizard and the ledger always agree.
import { feeItems, installmentPlan } from "@/data/enrollment";

const amountOf = (key: string) => feeItems.find((f) => f.key === key)!.amount;

/** The "Library, IT and student services fee" from enrollment is split into two ledger lines. */
const LIBRARY_AND_LAB = 7500;

export const feeCharges = {
  registration: amountOf("deposit"),
  tuition: amountOf("tuition"),
  libraryLab: LIBRARY_AND_LAB,
  technology: amountOf("services") - LIBRARY_AND_LAB,
  scholarship: -amountOf("scholarship"), // positive credit
};

/** Sample late fee (demo): not part of the enrollment total. */
export const lateFee = { amount: 500, charged: "2027-08-19", due: "2027-08-29" };

export const billingDate = "2027-07-14";
export const enrollmentPaymentDate = "2027-07-15";
export const MIN_CUSTOM_PAYMENT = 500;

export const installmentDates = installmentPlan.map((i) => i.dueIso);
export const paymentBanks = ["State Bank of India", "HDFC Bank", "ICICI Bank", "Axis Bank", "Punjab National Bank"];
