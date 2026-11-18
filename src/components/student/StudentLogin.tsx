"use client";

import { Info } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DEMO_STUDENT } from "@/config/demo-credentials";
import { useStudentSession } from "@/lib/studentSession";
import { TextField } from "@/components/shared/FormControls";
import Button from "@/components/ui/Button";

export default function StudentLogin() {
  const router = useRouter();
  const { ready, studentId: signedIn, login } = useStudentSession();
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<{ studentId?: string; password?: string; form?: string }>({});

  useEffect(() => {
    if (ready && signedIn) router.replace("/student");
  }, [ready, signedIn, router]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!studentId.trim()) next.studentId = "Enter your Student ID.";
    if (!password) next.password = "Enter your password.";
    if (next.studentId || next.password) return setErrors(next);
    setBusy(true);
    // Short delay so the loading state is visible (demo only).
    window.setTimeout(() => {
      if (login(studentId, password)) router.replace("/student");
      else {
        setBusy(false);
        setErrors({ form: "Student ID or password is incorrect." });
      }
    }, 450);
  };

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <p className="flex items-start gap-2 rounded-md bg-info-bg px-3 py-2.5 text-[13px] text-info-fg" role="note">
        <Info aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
        Demo environment. Use the demo credentials shown after enrollment.
      </p>
      <TextField label="Student ID" value={studentId} onChange={setStudentId} placeholder="STU2027001" autoComplete="username" error={errors.studentId} />
      <TextField label="Password" type="password" value={password} onChange={setPassword} autoComplete="current-password" error={errors.password} />
      {errors.form && (
        <p role="alert" className="rounded-md border border-danger/30 bg-danger-bg px-3 py-2.5 text-sm font-medium text-danger-fg">
          {errors.form}
        </p>
      )}
      <Button type="submit" size="lg" loading={busy} className="w-full">
        {busy ? "Signing in" : "Log in"}
      </Button>
      <Button
        variant="ghost"
        className="w-full"
        onClick={() => {
          setStudentId(DEMO_STUDENT.studentId);
          setPassword(DEMO_STUDENT.password);
          setErrors({});
        }}
      >
        Use demo credentials
      </Button>
    </form>
  );
}
