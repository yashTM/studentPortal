"use client";

import { ArrowLeft, CircleAlert } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { REVIEW_STEP, wizardSteps } from "@/data/enrollment";
import { useApplicant } from "@/lib/applicantStore";
import { stepErrors, updateWizard } from "@/lib/enrollmentWizard";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import FeesStep from "./FeesStep";
import OnboardingStep from "./OnboardingStep";
import RegistrationStep from "./RegistrationStep";
import ReviewStep from "./ReviewStep";
import ServicesStep from "./ServicesStep";
import StartStep from "./StartStep";
import SuccessScreen from "./SuccessScreen";
import WizardStepper from "./WizardStepper";

export default function EnrollmentWizard() {
  const { wizard } = useApplicant();
  const [showErrors, setShowErrors] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const toast = useToast();
  const step = wizard.step;

  // Move focus to the step heading when the step changes (keyboard and screen reader users).
  useEffect(() => {
    headingRef.current?.focus();
  }, [step]);

  if (wizard.completed) return <SuccessScreen />;

  const errors = showErrors ? stepErrors(step, wizard) : {};
  const errorCount = Object.keys(errors).length;

  const goTo = (next: number) => {
    setShowErrors(false);
    updateWizard((w) => ({ ...w, step: next }));
  };

  const next = () => {
    if (Object.keys(stepErrors(step, wizard)).length > 0) {
      setShowErrors(true);
      return;
    }
    if (step === REVIEW_STEP) {
      updateWizard((w) => ({ ...w, completed: true, completedAt: new Date().toISOString().slice(0, 10) }));
      return;
    }
    goTo(step + 1);
  };

  const props = { wizard, errors };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="rise mb-8">
        <span aria-hidden className="mb-3 block h-[3px] w-10 rounded bg-accent" />
        <h1>Enrollment and onboarding</h1>
        <p className="mt-2 max-w-2xl text-subtle">Finish these steps to secure your seat. Your progress is saved on this device as you go.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[15.5rem_minmax(0,1fr)] lg:gap-12">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <WizardStepper current={step} onGo={goTo} />
        </div>

        <div className="min-w-0">
          <section aria-labelledby="step-h" className="rounded-lg border border-line bg-surface">
            <div className="border-b border-line px-6 py-5 sm:px-8">
              <p className="eyebrow tnum">Step {step + 1} of {wizardSteps.length}</p>
              <h2 id="step-h" ref={headingRef} tabIndex={-1} className="mt-1 outline-none">
                {wizardSteps[step].label}
              </h2>
            </div>

            <div key={step} className="rise px-6 py-7 sm:px-8">
              {errorCount > 0 && (
                <p role="alert" className="mb-6 flex items-center gap-2 rounded-md border border-danger/30 bg-danger-bg px-3 py-2.5 text-sm font-medium text-danger-fg">
                  <CircleAlert aria-hidden className="h-4 w-4 shrink-0" />
                  Please fix {errorCount} {errorCount === 1 ? "item" : "items"} below to continue.
                </p>
              )}
              {step === 0 && <StartStep {...props} />}
              {step === 1 && <RegistrationStep {...props} />}
              {step === 2 && <FeesStep {...props} />}
              {step === 3 && <OnboardingStep {...props} />}
              {step === 4 && <ServicesStep {...props} />}
              {step === 5 && <ReviewStep {...props} onEdit={goTo} />}
            </div>

            {/* Sticky action bar */}
            <div className="sticky bottom-0 z-10 flex flex-wrap items-center justify-between gap-3 rounded-b-lg border-t border-line bg-surface/95 px-6 py-4 backdrop-blur-sm sm:px-8">
              <Button variant="ghost" onClick={() => goTo(step - 1)} disabled={step === 0} icon={<ArrowLeft aria-hidden className="h-4 w-4" />}>
                Back
              </Button>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <Button
                  variant="ghost"
                  onClick={() => toast("Progress saved on this device (demo). You can return to this page any time.")}
                >
                  Save and continue later
                </Button>
                <Button onClick={next}>
                  {step === REVIEW_STEP ? "Confirm enrollment" : step === 0 ? "Start enrollment" : "Continue"}
                </Button>
              </div>
            </div>
          </section>
          <p className="mt-4 text-xs text-subtle">
            Need to leave? <Link href="/portal" className="font-semibold text-primary underline underline-offset-4">Go to your overview</Link>. Saved progress is demo state in this browser only.
          </p>
        </div>
      </div>
    </div>
  );
}
