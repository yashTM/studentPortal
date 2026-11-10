"use client";

import { Pencil } from "lucide-react";
import { housingOptions, studentServices, wizardSteps } from "@/data/enrollment";
import { formatINR } from "@/lib/format";
import { useApplicant } from "@/lib/applicantStore";
import { onboardingProgress, setFlag } from "@/lib/enrollmentWizard";
import { CheckField } from "@/components/shared/FormControls";
import type { StepProps } from "./types";

export default function ReviewStep({
  wizard,
  errors,
  onEdit,
}: StepProps & { onEdit: (step: number) => void }) {
  const { application } = useApplicant();
  const d = wizard.data;
  const { done, total } = onboardingProgress(wizard);
  const requested = studentServices.filter((s) => wizard.flags[s.key]).map((s) => s.title);
  const housing = housingOptions.find((o) => o.value === d.housing)?.label ?? "Not chosen";

  const sections: { step: number; rows: [string, string][] }[] = [
    {
      step: 0,
      rows: [
        ["Program", application.program.program || "Not selected"],
        ["Offer of admission", "Accepted"],
        ["Terms acknowledged", "Yes"],
      ],
    },
    {
      step: 1,
      rows: [
        ["Semester", d.semester ?? ""],
        ["Name", d.legalName ?? ""],
        ["Email and phone", `${d.studentEmail ?? ""}, ${d.studentPhone ?? ""}`],
        ["Emergency contact", `${d.emergencyName ?? ""} (${d.emergencyRelation ?? ""}), ${d.emergencyPhone ?? ""}`],
      ],
    },
    {
      step: 2,
      rows: [
        ["Payment plan", wizard.payment.option === "installment" ? "Installment plan" : "Paid in full"],
        ["Paid now", `${formatINR(wizard.payment.amount)} (ref ${wizard.payment.reference})`],
      ],
    },
    {
      step: 3,
      rows: [
        ["Checklist", `${done} of ${total} complete`],
        ["Orientation", d.orientationSlot ?? ""],
      ],
    },
    {
      step: 4,
      rows: [
        ["Housing", housing],
        ["Service requests", requested.length ? requested.join(", ") : "None"],
      ],
    },
  ];

  return (
    <div className="space-y-8">
      <p className="text-subtle">Check your answers. You can edit any section before submitting.</p>
      <div className="divide-y divide-line rounded-lg border border-line">
        {sections.map((sec) => (
          <section key={sec.step} className="px-5 py-4 text-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-base">{wizardSteps[sec.step].label}</h3>
              <button type="button" onClick={() => onEdit(sec.step)} className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[13px] font-semibold text-primary hover:bg-brand-50">
                <Pencil aria-hidden className="h-3.5 w-3.5" />
                Edit<span className="sr-only"> {wizardSteps[sec.step].label}</span>
              </button>
            </div>
            <dl className="mt-2 space-y-1.5">
              {sec.rows.map(([k, v]) => (
                <div key={k} className="grid gap-x-4 sm:grid-cols-[10rem_1fr]">
                  <dt className="text-subtle">{k}</dt>
                  <dd className="font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
      <div className="rounded-lg bg-muted/60 p-5">
        <CheckField
          label="I confirm that everything above is correct and I want to complete my enrollment."
          checked={!!wizard.flags.final_confirm}
          onChange={(v) => setFlag("final_confirm", v)}
          error={errors.final_confirm}
        />
      </div>
    </div>
  );
}
