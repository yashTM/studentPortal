import type { WizardState } from "@/lib/applicantStore";

/** Props shared by every wizard step. `errors` is empty until the user tries to continue. */
export type StepProps = {
  wizard: WizardState;
  errors: Record<string, string>;
};
