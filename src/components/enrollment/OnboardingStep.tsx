"use client";

import { FileCheck2, FileUp } from "lucide-react";
import { useState } from "react";
import { onboardingDocs, orientationSlots, policies } from "@/data/enrollment";
import { onboardingProgress, setData, setFlag, updateWizard } from "@/lib/enrollmentWizard";
import { CheckField, SelectField } from "@/components/shared/FormControls";
import ProgressRing from "@/components/shared/ProgressRing";
import { Badge } from "@/components/portal/ui";
import type { StepProps } from "./types";

const MAX_MB = 5;
const ACCEPTED = ["application/pdf", "image/jpeg", "image/png"];

export default function OnboardingStep({ wizard, errors }: StepProps) {
  const [uploading, setUploading] = useState<string | null>(null);
  const [fileErrors, setFileErrors] = useState<Record<string, string>>({});
  const { done, total } = onboardingProgress(wizard);

  const onFile = (key: string, file: File | undefined) => {
    if (!file) return;
    let error = "";
    if (!ACCEPTED.includes(file.type)) error = "Only PDF, JPG or PNG files are accepted.";
    else if (file.size > MAX_MB * 1024 * 1024) error = `File must be smaller than ${MAX_MB} MB.`;
    setFileErrors((e) => ({ ...e, [key]: error }));
    if (error) return;
    setUploading(key);
    window.setTimeout(() => {
      setUploading(null);
      updateWizard((w) => ({ ...w, docs: { ...w.docs, [key]: file.name } }));
    }, 800);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-5 rounded-lg bg-muted/60 p-5">
        <ProgressRing value={done} max={total} label="Onboarding checklist progress" size={64} stroke={7} tone="green">{done}</ProgressRing>
        <div>
          <p className="font-semibold"><span className="tnum">{done} of {total}</span> items complete</p>
          <p className="text-[13px] text-subtle">Uploads are simulated and no file leaves your device.</p>
        </div>
      </div>

      <section aria-labelledby="ob-docs">
        <h3 id="ob-docs" className="mb-3">Documents</h3>
        <ul className="divide-y divide-line rounded-lg border border-line">
          {onboardingDocs.map((d) => {
            const file = wizard.docs[d.key];
            const error = fileErrors[d.key] || errors[d.key];
            const Icon = file ? FileCheck2 : FileUp;
            return (
              <li key={d.key} className="flex flex-wrap items-center gap-4 px-4 py-3.5 text-sm">
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md ${file ? "bg-success-bg text-success-fg" : "bg-brand-50 text-primary"}`}>
                  <Icon aria-hidden className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <div className="min-w-0 flex-1 basis-48">
                  <p className="font-semibold">{d.name}</p>
                  {file ? <p className="truncate text-[13px] text-subtle">{file}</p> : <p className="text-[13px] text-subtle">PDF, JPG or PNG up to {MAX_MB} MB</p>}
                  {uploading === d.key && <p role="status" className="text-[13px] text-subtle">Uploading...</p>}
                  {error && <p className="mt-1 text-xs font-medium text-danger-fg">{error}</p>}
                </div>
                {file ? <Badge tone="green">Uploaded</Badge> : <Badge tone="amber">Required</Badge>}
                <label className="inline-flex min-h-8 cursor-pointer items-center rounded-full border border-line-strong px-3.5 text-[13px] font-semibold text-primary hover:bg-brand-50 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-brand-100">
                  {file ? "Replace file" : "Choose file"}
                  <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="sr-only" onChange={(e) => onFile(d.key, e.target.files?.[0])} />
                </label>
              </li>
            );
          })}
        </ul>
      </section>

      <fieldset className="space-y-3.5">
        <legend className="mb-1 font-heading text-lg font-semibold text-primary">Policy acknowledgements</legend>
        {policies.map((p) => (
          <CheckField
            key={p.key}
            label={`I have read and agree to the ${p.label.toLowerCase()}.`}
            checked={!!wizard.flags[p.key]}
            onChange={(v) => setFlag(p.key, v)}
            error={errors[p.key]}
          />
        ))}
      </fieldset>

      <div className="max-w-sm">
        <SelectField
          label="Orientation session"
          value={wizard.data.orientationSlot ?? ""}
          onChange={(v) => setData("orientationSlot", v)}
          options={orientationSlots}
          error={errors.orientationSlot}
          hint="Meet your batch and faculty before classes begin."
        />
      </div>
    </div>
  );
}
