"use client";

import { dates, enrollmentTasks } from "@/data/admission";
import { updateState, useApplicant } from "@/lib/applicantStore";
import { Card, Locked } from "./ui";

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

  const done = enrollmentTasks.filter((t) => s.enrollment[t.key]).length;
  const allDone = done === enrollmentTasks.length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-primary">Enrollment & onboarding</h1>
        <p className="mt-1 text-foreground/70">
          {done} of {enrollmentTasks.length} tasks complete · classes begin {dates.classesBegin}
        </p>
      </div>

      {allDone && (
        <Card className="border-2 border-green-500">
          <h2 className="text-2xl font-semibold text-primary">You are all set! 🎓</h2>
          <p className="mt-1 text-foreground/70">
            Welcome to the {s.application.program.program} batch. See you on {dates.classesBegin}.
          </p>
        </Card>
      )}

      <ul className="space-y-4">
        {enrollmentTasks.map((t) => {
          const checked = !!s.enrollment[t.key];
          return (
            <li key={t.key}>
              <Card className="flex items-center justify-between gap-4">
                <div>
                  <p className={`font-semibold ${checked ? "text-foreground/50 line-through" : ""}`}>
                    {t.label}
                  </p>
                  <p className="text-sm text-foreground/60">{t.text}</p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    updateState((st) => ({
                      ...st,
                      enrollment: { ...st.enrollment, [t.key]: !checked },
                    }))
                  }
                  className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold ${
                    checked
                      ? "bg-green-100 text-green-800"
                      : "bg-primary text-white hover:opacity-90"
                  }`}
                >
                  {checked ? "✓ Done" : "Mark done"}
                </button>
              </Card>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
