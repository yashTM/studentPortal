"use client";

import Link from "next/link";
import { dates, keyDates } from "@/data/admission";
import { useApplicant } from "@/lib/applicantStore";
import { computeJourney, type StageStatus } from "@/lib/journey";
import { Badge, Card } from "./ui";

const stageBadge: Record<StageStatus, { tone: "green" | "blue" | "grey"; text: string }> = {
  complete: { tone: "green", text: "Complete" },
  current: { tone: "blue", text: "In progress" },
  upcoming: { tone: "grey", text: "Upcoming" },
};

export default function Overview() {
  const s = useApplicant();
  const j = computeJourney(s);
  const firstName = s.account?.name.split(" ")[0] || "Applicant";
  const current = j.stages[j.currentIndex];
  const program = s.application.program;

  const messages = [
    ...(s.decision === "admitted"
      ? [{ title: "Your admission decision is ready", date: dates.decision, text: "Open Decision & offer to view your offer letter." }]
      : []),
    ...(s.submittedAt
      ? [{ title: "Application received", date: s.submittedAt, text: `We have received application ${s.reference}. Our admissions team will review it shortly.` }]
      : []),
    { title: "Virtual info session", date: "Oct 20, 2026", text: "Join us online on Nov 4 to learn about programs, scholarships and hostels." },
    { title: "Welcome to the applicant portal", date: "Oct 1, 2026", text: "Complete your application form and upload your documents before the deadline." },
  ];

  return (
    <div className="space-y-8">
      {!s.account && (
        <p className="rounded-xl bg-accent/20 px-4 py-3 text-sm">
          You are viewing the portal without an account.{" "}
          <Link href="/signup" className="font-semibold text-primary underline">
            Create an account
          </Link>{" "}
          to start your application.
        </p>
      )}

      <section>
        <p className="text-sm font-semibold uppercase tracking-wide text-foreground/60">
          Stage {j.currentIndex + 1} of {j.stages.length} · {current.title}
        </p>
        <h1 className="mt-1 text-3xl font-semibold text-primary sm:text-4xl">
          Welcome back, {firstName}
        </h1>
        <div className="mt-4 max-w-xl">
          <div className="flex justify-between text-sm text-foreground/70">
            <span>Your admission journey</span>
            <span>
              {j.done} of {j.total} steps complete
            </span>
          </div>
          <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-primary/10">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${(j.done / j.total) * 100}%` }}
            />
          </div>
        </div>
      </section>

      {j.actions.length > 0 && (
        <section className="rounded-2xl border border-accent/60 bg-accent/20 p-5">
          <h2 className="text-xl font-semibold text-accent-foreground">
            {j.actions.length} {j.actions.length === 1 ? "action" : "actions"} needed
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            {j.actions.map((a) => (
              <li key={a.title} className="flex flex-wrap justify-between gap-x-4">
                <Link href={a.href} className="hover:underline">
                  {a.title}
                </Link>
                <span className="font-semibold">Due {a.due}</span>
              </li>
            ))}
          </ul>
          <Link
            href={j.actions[0].href}
            className="mt-4 inline-block rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            Continue
          </Link>
        </section>
      )}

      <div className="grid gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-primary">
            Your journey ({j.stages.length} stages)
          </h2>
          <ol className="mt-4 space-y-4">
            {j.stages.map((st, i) => (
              <li
                key={st.title}
                className={`rounded-xl border p-4 ${
                  st.status === "current" ? "border-primary/40 bg-primary/5" : "border-primary/10"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex gap-3">
                    <span className="font-heading text-2xl font-semibold text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="font-semibold">{st.title}</p>
                      <p className="text-sm text-foreground/60">
                        {st.done} of {st.steps.length} steps · {st.summary}
                      </p>
                    </div>
                  </div>
                  <Badge tone={stageBadge[st.status].tone}>{stageBadge[st.status].text}</Badge>
                </div>
                {st.status === "current" && (
                  <ul className="mt-3 space-y-1 pl-10 text-sm">
                    {st.steps.map((step) => (
                      <li key={step.label} className={step.done ? "text-foreground/50 line-through" : ""}>
                        {step.done ? "✓" : "○"} {step.label}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        </Card>

        <div className="space-y-8">
          <Card>
            <div className="flex items-start justify-between gap-2">
              <h2 className="text-xl font-semibold text-primary">Application</h2>
              <Badge tone={s.submittedAt ? "blue" : "amber"}>{j.status}</Badge>
            </div>
            <dl className="mt-4 space-y-2 text-sm">
              {[
                ["Reference", s.reference ?? "Assigned on submission"],
                ["Program", program.program || "Not chosen yet"],
                ["Intake", program.intake || "Fall 2027"],
                ["Campus", program.campus || "Not chosen yet"],
                ["Submitted", s.submittedAt ?? "Not yet"],
                ["Decision expected", dates.decision],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4">
                  <dt className="text-foreground/60">{k}</dt>
                  <dd className="text-right font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
            <Link
              href="/portal/application"
              className="mt-5 block rounded-full border border-primary/30 py-2 text-center text-sm font-semibold text-primary hover:bg-muted"
            >
              {s.submittedAt ? "View application" : "Continue application"}
            </Link>
          </Card>

          <Card>
            <h2 className="text-xl font-semibold text-primary">Key dates</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {keyDates.map((d) => (
                <li key={d.label} className="flex justify-between gap-4">
                  <span className="text-foreground/70">{d.label}</span>
                  <span className="shrink-0 font-semibold">{d.date}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      <Card>
        <h2 className="text-xl font-semibold text-primary">Messages ({messages.length})</h2>
        <ul className="mt-4 divide-y divide-primary/10">
          {messages.map((m) => (
            <li key={m.title} className="py-3">
              <div className="flex justify-between gap-4">
                <p className="font-semibold">{m.title}</p>
                <span className="shrink-0 text-xs text-foreground/50">{m.date}</span>
              </div>
              <p className="mt-1 text-sm text-foreground/70">{m.text}</p>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
