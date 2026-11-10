"use client";

import { Check } from "lucide-react";
import { useCallback, useState } from "react";
import { getStatusTimeline, getStudentProfile } from "@/services/student";
import { cn } from "@/lib/cn";
import { studentData, useProfileSeed } from "@/lib/studentData";
import { useAsync } from "@/lib/useAsync";
import { formatDate } from "@/lib/format";
import EnrollmentSummaryCard from "@/components/enrollment/EnrollmentSummaryCard";
import AsyncView from "@/components/shared/AsyncView";
import { TextField } from "@/components/shared/FormControls";
import PageHeader from "@/components/shared/PageHeader";
import { Badge } from "@/components/portal/ui";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import type { StudentProfile } from "@/types/student";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(p: StudentProfile) {
  const e: Partial<Record<keyof StudentProfile, string>> = {};
  if (!p.firstName.trim()) e.firstName = "Enter your first name.";
  if (!p.lastName.trim()) e.lastName = "Enter your last name.";
  if (!EMAIL.test(p.email)) e.email = "Enter a valid email address.";
  if (!/^\+?[0-9 ]{10,14}$/.test(p.phone.trim())) e.phone = "Enter a valid phone number.";
  if (!/^[0-9]{6}$/.test(p.pincode.trim())) e.pincode = "PIN code must be 6 digits.";
  if (!p.address.trim()) e.address = "Enter your address.";
  if (!p.city.trim()) e.city = "Enter your city.";
  return e;
}

function StatusTimeline() {
  const { state, retry } = useAsync(getStatusTimeline);
  return (
    <section aria-labelledby="status-h" className="rounded-lg border border-line bg-surface p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 id="status-h" className="text-xl">Enrollment and student status</h2>
        <div className="flex gap-2">
          <Badge tone="green">Enrolled</Badge>
          <Badge tone="blue">Good standing</Badge>
        </div>
      </div>
      <AsyncView state={state} retry={retry} label="Loading status">
        {(steps) => (
          <ol className="mt-6">
            {steps.map((s, i) => (
              <li key={s.label} className="relative flex gap-4 pb-6 last:pb-0">
                {i < steps.length - 1 && <span aria-hidden className={cn("absolute left-[11px] top-6 h-full w-px", s.state === "done" ? "bg-success" : "bg-line-strong")} />}
                <span
                  aria-hidden
                  className={cn(
                    "relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                    s.state === "done" && "bg-success text-white",
                    s.state === "current" && "bg-primary ring-4 ring-brand-100",
                    s.state === "upcoming" && "border-2 border-line-strong bg-surface",
                  )}
                >
                  {s.state === "done" && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                  {s.state === "current" && <span className="h-2 w-2 rounded-full bg-white" />}
                </span>
                <div className="-mt-0.5 text-sm">
                  <p className="font-semibold">
                    {s.label}
                    <span className="sr-only"> ({s.state === "done" ? "completed" : s.state === "current" ? "current" : "upcoming"})</span>
                  </p>
                  <p className="tnum text-[13px] text-subtle">{formatDate(s.date)}</p>
                </div>
              </li>
            ))}
          </ol>
        )}
      </AsyncView>
    </section>
  );
}

function PersonalDetailsForm({ profile }: { profile: StudentProfile }) {
  const [form, setForm] = useState(profile);
  const [errors, setErrors] = useState<ReturnType<typeof validate>>({});
  const toast = useToast();

  const field = (key: keyof StudentProfile, label: string, extra: { type?: string; readOnly?: boolean; hint?: string } = {}) => (
    <TextField label={label} value={form[key]} onChange={(v) => setForm((f) => ({ ...f, [key]: v }))} error={errors[key]} {...extra} />
  );

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    studentData.update((d) => ({ ...d, profile: { ...d.profile, ...form } }));
    toast("Details saved for this session (demo). Nothing is stored on a server.");
  };

  return (
    <form onSubmit={save} noValidate>
      <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
        {field("firstName", "First name")}
        {field("lastName", "Last name")}
        {field("email", "Email", { type: "email" })}
        {field("phone", "Phone number", { type: "tel" })}
        {field("dob", "Date of birth", { type: "date" })}
        {field("program", "Program", { readOnly: true, hint: "Program changes go through the registrar." })}
        <div className="sm:col-span-2">{field("address", "Address")}</div>
        {field("city", "City")}
        {field("state", "State")}
        {field("pincode", "PIN code")}
      </div>
      <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-line pt-5">
        <Button type="submit">Save changes</Button>
        <Button variant="ghost" onClick={() => { setForm(profile); setErrors({}); }}>Reset</Button>
      </div>
    </form>
  );
}

export default function ProfileModule() {
  const seed = useProfileSeed();
  const load = useCallback(() => getStudentProfile(seed), [seed]);
  const { state, retry } = useAsync(load);

  return (
    <>
      <PageHeader title="Profile and status" description="Your enrollment status and personal details." />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <section aria-labelledby="details-h">
          <h2 id="details-h" className="mb-5">Personal details</h2>
          <AsyncView state={state} retry={retry} label="Loading profile">
            {(profile) => <PersonalDetailsForm key={profile.studentId + profile.email} profile={profile} />}
          </AsyncView>
        </section>
        <div className="space-y-6">
          <StatusTimeline />
          <EnrollmentSummaryCard fullSummaryHref="/student/enrollment-summary" />
        </div>
      </div>
    </>
  );
}
