"use client";

import { Info } from "lucide-react";
import { paymentBanks } from "@/data/mock/fees";
import { SelectField, TextField } from "@/components/shared/FormControls";
import Button from "@/components/ui/Button";

/** Transient, never-stored payment form values. They live only in component state and are wiped when a payment starts. */
export type PayForm = { upi: string; cardNumber: string; expiry: string; cvv: string; cardName: string; bank: string };
export const emptyPayForm: PayForm = { upi: "", cardNumber: "", expiry: "", cvv: "", cardName: "", bank: "" };

/** Format-only validation. Nothing is verified against any bank. */
export function payFormErrors(method: string, f: PayForm): Partial<Record<keyof PayForm, string>> {
  const e: Partial<Record<keyof PayForm, string>> = {};
  if (method === "UPI" && !/^[\w.-]{2,}@[a-zA-Z]{2,}$/.test(f.upi.trim())) e.upi = "Enter a UPI ID such as demo@bank.";
  if (method === "Card") {
    if (f.cardNumber.replace(/\s/g, "").length !== 16 || !/^\d+$/.test(f.cardNumber.replace(/\s/g, ""))) e.cardNumber = "Enter a 16 digit card number.";
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(f.expiry.trim())) e.expiry = "Use MM/YY.";
    if (!/^\d{3}$/.test(f.cvv.trim())) e.cvv = "Enter 3 digits.";
    if (!f.cardName.trim()) e.cardName = "Enter the name on the card.";
  }
  if (method === "Net Banking" && !f.bank) e.bank = "Select a bank.";
  return e;
}

export default function PayMethodForm({
  method,
  form,
  setForm,
  errors,
}: {
  method: "UPI" | "Card" | "Net Banking";
  form: PayForm;
  setForm: (f: PayForm) => void;
  errors: Partial<Record<keyof PayForm, string>>;
}) {
  const set = (k: keyof PayForm) => (v: string) => setForm({ ...form, [k]: v });

  return (
    <div className="rounded-lg border border-line bg-muted/50 p-5">
      <p className="mb-4 flex items-start gap-2 text-[13px] text-subtle">
        <Info aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
        Demo form. Only the format is checked. These details are never sent or stored, and are cleared as soon as you pay.
      </p>
      {method === "UPI" && (
        <div className="max-w-sm">
          <TextField label="UPI ID (demo)" value={form.upi} onChange={set("upi")} placeholder="demo@bank" autoComplete="off" error={errors.upi} />
        </div>
      )}
      {method === "Card" && (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <TextField label="Card number (test value only)" value={form.cardNumber} onChange={set("cardNumber")} placeholder="4242 4242 4242 4242" autoComplete="off" error={errors.cardNumber} />
            </div>
            <TextField label="Expiry" value={form.expiry} onChange={set("expiry")} placeholder="MM/YY" autoComplete="off" error={errors.expiry} />
            <TextField label="CVV" value={form.cvv} onChange={set("cvv")} placeholder="123" autoComplete="off" error={errors.cvv} />
            <div className="sm:col-span-2">
              <TextField label="Name on card" value={form.cardName} onChange={set("cardName")} autoComplete="off" error={errors.cardName} />
            </div>
          </div>
          <Button variant="secondary" size="sm" onClick={() => setForm({ ...form, cardNumber: "4242 4242 4242 4242", expiry: "12/30", cvv: "123", cardName: "Demo Student" })}>
            Fill test card
          </Button>
        </div>
      )}
      {method === "Net Banking" && (
        <div className="max-w-sm">
          <SelectField label="Choose your bank (demo)" value={form.bank} onChange={set("bank")} options={paymentBanks} error={errors.bank} />
        </div>
      )}
    </div>
  );
}
