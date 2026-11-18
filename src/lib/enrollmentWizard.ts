import {
  acknowledgements,
  onboardingDocs,
  policies,
} from "@/data/enrollment";
import { updateState, type WizardState } from "./applicantStore";

const PHONE = /^\+?[0-9 ]{10,14}$/;

/** Updates wizard progress and keeps the legacy enrollment task flags (used by the overview) in sync. */
export function updateWizard(fn: (w: WizardState) => WizardState) {
  updateState((s) => {
    const wizard = fn(s.wizard);
    return {
      ...s,
      wizard,
      enrollment: {
        ...s.enrollment,
        deposit: wizard.payment.status === "paid",
        hostel: !!wizard.data.housing,
        orientation: !!wizard.data.orientationSlot,
      },
    };
  });
}

export function onboardingProgress(w: WizardState) {
  const total = onboardingDocs.length + policies.length + 1;
  const done =
    onboardingDocs.filter((d) => w.docs[d.key]).length +
    policies.filter((p) => w.flags[p.key]).length +
    (w.data.orientationSlot ? 1 : 0);
  return { done, total };
}

/** Returns field/section errors for a wizard step. An empty object means the step is valid. */
export function stepErrors(step: number, w: WizardState): Record<string, string> {
  const e: Record<string, string> = {};
  if (step === 0) {
    for (const a of acknowledgements)
      if (!w.flags[a.key]) e[a.key] = "Please confirm this to continue.";
  }
  if (step === 1) {
    if (!w.data.semester) e.semester = "Select a semester.";
    if (!(w.data.legalName ?? "").trim()) e.legalName = "Enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((w.data.studentEmail ?? "").trim()))
      e.studentEmail = "Enter a valid email address.";
    if (!PHONE.test((w.data.studentPhone ?? "").trim()))
      e.studentPhone = "Enter a valid phone number (10 to 14 digits).";
    if (!(w.data.emergencyName ?? "").trim()) e.emergencyName = "Enter a contact name.";
    if (!w.data.emergencyRelation) e.emergencyRelation = "Select a relationship.";
    if (!PHONE.test((w.data.emergencyPhone ?? "").trim()))
      e.emergencyPhone = "Enter a valid phone number (10 to 14 digits).";
    if (!w.flags.confirm_personal) e.confirm_personal = "Please confirm your details.";
  }
  if (step === 2) {
    if (w.payment.status !== "paid")
      e.payment = "Choose a payment option and complete the simulated payment to continue.";
  }
  if (step === 3) {
    for (const d of onboardingDocs) if (!w.docs[d.key]) e[d.key] = "Upload this document.";
    for (const p of policies) if (!w.flags[p.key]) e[p.key] = "Acknowledge this policy.";
    if (!w.data.orientationSlot) e.orientationSlot = "Choose an orientation slot.";
  }
  if (step === 4) {
    if (!w.data.housing) e.housing = "Tell us your housing preference.";
  }
  if (step === 5) {
    if (!w.flags.final_confirm) e.final_confirm = "Please confirm before submitting.";
  }
  return e;
}

export const setData = (key: string, value: string) =>
  updateWizard((w) => ({ ...w, data: { ...w.data, [key]: value } }));

export const setFlag = (key: string, value: boolean) =>
  updateWizard((w) => ({ ...w, flags: { ...w.flags, [key]: value } }));
