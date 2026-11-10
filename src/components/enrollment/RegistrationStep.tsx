"use client";

import { useEffect } from "react";
import { relationships, semesters } from "@/data/enrollment";
import { useApplicant } from "@/lib/applicantStore";
import { setData, setFlag } from "@/lib/enrollmentWizard";
import { CheckField, SelectField, TextField } from "@/components/shared/FormControls";
import type { StepProps } from "./types";

export default function RegistrationStep({ wizard, errors }: StepProps) {
  const { application, account } = useApplicant();
  const d = wizard.data;
  const defaultName = account?.name ?? "";

  const defaultEmail = application.contact.email ?? account?.email ?? "";
  const defaultPhone = application.contact.phone ?? "";

  // Pre-filled values are stored too; otherwise validation sees them as empty.
  useEffect(() => {
    const seeds: [string, string][] = [
      ["legalName", defaultName],
      ["studentEmail", defaultEmail],
      ["studentPhone", defaultPhone],
    ];
    for (const [key, value] of seeds)
      if (value && wizard.data[key] === undefined) setData(key, value);
  }, [defaultName, defaultEmail, defaultPhone, wizard.data]);

  return (
    <div className="space-y-6">
      <p className="text-foreground/70">
        Register for your first semester and confirm your personal and emergency contact details.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="Program"
          value={application.program.program ?? ""}
          onChange={() => {}}
          readOnly
          hint="From your application."
        />
        <SelectField
          label="Semester"
          value={d.semester ?? ""}
          onChange={(v) => setData("semester", v)}
          options={semesters}
          error={errors.semester}
        />
        <TextField
          label="Full name (as on official documents)"
          value={d.legalName ?? defaultName}
          onChange={(v) => setData("legalName", v)}
          autoComplete="name"
          error={errors.legalName}
        />
        <TextField
          label="Student email"
          type="email"
          value={d.studentEmail ?? defaultEmail}
          onChange={(v) => setData("studentEmail", v)}
          autoComplete="email"
          error={errors.studentEmail}
        />
        <TextField
          label="Student phone"
          type="tel"
          value={d.studentPhone ?? defaultPhone}
          onChange={(v) => setData("studentPhone", v)}
          autoComplete="tel"
          error={errors.studentPhone}
        />
      </div>
      <fieldset>
        <legend className="mb-3 font-semibold">Emergency contact</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            label="Contact name"
            value={d.emergencyName ?? ""}
            onChange={(v) => setData("emergencyName", v)}
            error={errors.emergencyName}
          />
          <SelectField
            label="Relationship"
            value={d.emergencyRelation ?? ""}
            onChange={(v) => setData("emergencyRelation", v)}
            options={relationships}
            error={errors.emergencyRelation}
          />
          <TextField
            label="Contact phone"
            type="tel"
            value={d.emergencyPhone ?? ""}
            onChange={(v) => setData("emergencyPhone", v)}
            placeholder="+91 98765 43210"
            autoComplete="tel"
            error={errors.emergencyPhone}
          />
        </div>
      </fieldset>
      <CheckField
        label="I confirm my personal details above are correct."
        checked={!!wizard.flags.confirm_personal}
        onChange={(v) => setFlag("confirm_personal", v)}
        error={errors.confirm_personal}
      />
    </div>
  );
}
