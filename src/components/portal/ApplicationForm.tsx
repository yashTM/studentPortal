"use client";

import { useState } from "react";
import Link from "next/link";
import { isSectionComplete, sections, type FieldDef } from "@/data/admission";
import { updateState, useApplicant, type SectionKey } from "@/lib/applicantStore";
import { Badge, Card, primaryButton, secondaryButton } from "./ui";

const REVIEW = sections.length;

function FormField({
  field,
  value,
  error,
  onChange,
}: {
  field: FieldDef;
  value: string;
  error: boolean;
  onChange: (v: string) => void;
}) {
  const cls = `mt-1 w-full rounded-lg border bg-white px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-accent ${
    error ? "border-red-500" : "border-zinc-300"
  }`;
  const id = `f-${field.name}`;

  return (
    <div className={field.wide ? "sm:col-span-2" : ""}>
      <label htmlFor={id} className="text-sm font-medium">
        {field.label}
        {field.optional && <span className="text-foreground/50"> (optional)</span>}
      </label>
      {field.type === "select" ? (
        <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className={cls}>
          <option value="">Select…</option>
          {field.options?.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      ) : field.type === "textarea" ? (
        <textarea
          id={id}
          rows={5}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cls}
        />
      ) : (
        <input
          id={id}
          type={field.type ?? "text"}
          value={value}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={cls}
        />
      )}
      {error && <p className="mt-1 text-xs text-red-600">This field is required.</p>}
    </div>
  );
}

function setField(section: SectionKey, name: string, value: string) {
  updateState((s) => ({
    ...s,
    application: {
      ...s.application,
      [section]: { ...s.application[section], [name]: value },
    },
  }));
}

export default function ApplicationForm() {
  const s = useApplicant();
  const [step, setStep] = useState(0);
  const [showErrors, setShowErrors] = useState(false);
  const [justSubmitted, setJustSubmitted] = useState(false);

  const complete = sections.map((sec) => isSectionComplete(s.application[sec.key], sec.key));
  const allComplete = complete.every(Boolean);

  if (s.submittedAt) {
    return (
      <div className="space-y-6">
        <Card className={justSubmitted ? "border-2 border-green-500" : ""}>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-3xl font-semibold text-primary">
                {justSubmitted ? "Application submitted 🎉" : "Your application"}
              </h1>
              <p className="mt-1 text-foreground/70">
                Reference <strong>{s.reference}</strong> · submitted on {s.submittedAt}
              </p>
            </div>
            <Badge tone="blue">
              {s.decision === "admitted" ? "Decision released" : "Under review"}
            </Badge>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/portal/documents" className={primaryButton}>
              Go to documents
            </Link>
            <Link href="/portal" className={secondaryButton}>
              Back to overview
            </Link>
          </div>
        </Card>
        <Review values={s.application} />
      </div>
    );
  }

  const goTo = (i: number) => {
    setShowErrors(false);
    setStep(i);
  };

  const next = () => {
    if (!complete[step]) {
      setShowErrors(true);
      return;
    }
    goTo(step + 1);
  };

  const submit = () => {
    updateState((st) => ({
      ...st,
      submittedAt: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      reference: `UG-FA27-${Math.floor(100000 + Math.random() * 900000)}`,
    }));
    setJustSubmitted(true);
  };

  const section = sections[step];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-primary">Admission application</h1>
        <p className="mt-1 text-foreground/70">
          Your answers are saved automatically as you type.
        </p>
      </div>

      <ol className="flex flex-wrap gap-2">
        {[...sections.map((x) => x.label), "Review & submit"].map((label, i) => (
          <li key={label}>
            <button
              type="button"
              onClick={() => goTo(i)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold ${
                i === step
                  ? "bg-primary text-white"
                  : "bg-white text-foreground/70 shadow-sm hover:text-primary"
              }`}
            >
              {i < REVIEW && complete[i] ? "✓ " : `${i + 1}. `}
              {label}
            </button>
          </li>
        ))}
      </ol>

      {step < REVIEW ? (
        <Card>
          <h2 className="text-2xl font-semibold text-primary">{section.label}</h2>
          <p className="mt-1 text-sm text-foreground/60">{section.hint}</p>
          {showErrors && (
            <p className="mt-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">
              Please fill in all required fields before continuing.
            </p>
          )}
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {section.fields.map((f) => {
              const value = s.application[section.key]?.[f.name] ?? "";
              return (
                <FormField
                  key={f.name}
                  field={f}
                  value={value}
                  error={showErrors && !f.optional && value.trim() === ""}
                  onChange={(v) => setField(section.key, f.name, v)}
                />
              );
            })}
          </div>
          <div className="mt-8 flex justify-between gap-3">
            <button
              type="button"
              onClick={() => goTo(step - 1)}
              disabled={step === 0}
              className={`${secondaryButton} disabled:invisible`}
            >
              Back
            </button>
            <button type="button" onClick={next} className={primaryButton}>
              Save & continue
            </button>
          </div>
        </Card>
      ) : (
        <>
          <Review values={s.application} onEdit={goTo} />
          <Card>
            {!allComplete && (
              <p className="mb-4 rounded-lg bg-amber-50 px-4 py-2 text-sm text-amber-800">
                Complete these sections before submitting:{" "}
                {sections
                  .filter((_, i) => !complete[i])
                  .map((x) => x.label)
                  .join(", ")}
              </p>
            )}
            <label className="flex items-start gap-3 text-sm">
              <input
                type="checkbox"
                checked={s.application.program.declaration === "yes"}
                onChange={(e) =>
                  setField("program", "declaration", e.target.checked ? "yes" : "")
                }
                className="mt-1"
              />
              I confirm that the information I have given is true and complete.
            </label>
            <div className="mt-6 flex justify-between gap-3">
              <button type="button" onClick={() => goTo(REVIEW - 1)} className={secondaryButton}>
                Back
              </button>
              <button
                type="button"
                onClick={submit}
                disabled={!allComplete || s.application.program.declaration !== "yes"}
                className={primaryButton}
              >
                Submit application
              </button>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}

function Review({
  values,
  onEdit,
}: {
  values: Record<SectionKey, Record<string, string>>;
  onEdit?: (step: number) => void;
}) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {sections.map((sec, i) => (
        <Card key={sec.key}>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-primary">{sec.label}</h2>
            {onEdit && (
              <button
                type="button"
                onClick={() => onEdit(i)}
                className="text-sm font-semibold text-primary hover:underline"
              >
                Edit
              </button>
            )}
          </div>
          <dl className="mt-3 space-y-2 text-sm">
            {sec.fields.map((f) => (
              <div key={f.name} className="grid grid-cols-[40%_1fr] gap-3">
                <dt className="text-foreground/60">{f.label}</dt>
                <dd className="break-words font-medium">
                  {values[sec.key]?.[f.name] || <span className="text-foreground/40">-</span>}
                </dd>
              </div>
            ))}
          </dl>
        </Card>
      ))}
    </div>
  );
}
