"use client";

import EnrollmentWizard from "@/components/enrollment/EnrollmentWizard";
import { useApplicant } from "@/lib/applicantStore";
import { Locked } from "./ui";

export default function Enrollment() {
  const s = useApplicant();

  if (!s.offerAccepted) {
    return (
      <Locked
        title="Enrollment is locked"
        text="Accept your offer of admission to unlock enrollment and onboarding."
        href={s.submittedAt ? "/portal/decision" : "/portal/application"}
        cta={s.submittedAt ? "Go to decision & offer" : "Go to application"}
      />
    );
  }

  return <EnrollmentWizard />;
}
