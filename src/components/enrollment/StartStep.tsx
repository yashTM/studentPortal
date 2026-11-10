"use client";

import { acknowledgements } from "@/data/enrollment";
import { useApplicant } from "@/lib/applicantStore";
import { setFlag } from "@/lib/enrollmentWizard";
import { Badge } from "@/components/portal/ui";
import { CheckField } from "@/components/shared/FormControls";
import type { StepProps } from "./types";

export default function StartStep({ wizard, errors }: StepProps) {
  const { application } = useApplicant();
  const p = application.program;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-3">
        <Badge tone="green">Offer accepted</Badge>
        <span className="text-sm text-subtle">Merit scholarship: 25% of tuition</span>
      </div>
      <p className="max-w-2xl text-subtle">
        Welcome. Enrollment has five short steps: registration, initial fees, onboarding checklist
        and student services, then a final review. Your progress is saved as you go. Confirm your
        program and intake below, then accept the terms to start.
      </p>
      <dl className="grid divide-y divide-line rounded-lg border border-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {[
          ["Program", p.program || "Not selected"],
          ["Intake", p.intake || "Fall 2027"],
          ["Campus", p.campus || "Main Campus"],
        ].map(([k, v]) => (
          <div key={k} className="px-5 py-4">
            <dt className="eyebrow">{k}</dt>
            <dd className="mt-1 font-semibold">{v}</dd>
          </div>
        ))}
      </dl>
      <fieldset className="space-y-3.5">
        <legend className="mb-3 font-heading text-lg font-semibold text-primary">Acknowledgements</legend>
        {acknowledgements.map((a) => (
          <CheckField
            key={a.key}
            label={a.label}
            checked={!!wizard.flags[a.key]}
            onChange={(v) => setFlag(a.key, v)}
            error={errors[a.key]}
          />
        ))}
      </fieldset>
    </div>
  );
}
