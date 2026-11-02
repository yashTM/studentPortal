"use client";

import Link from "next/link";
import { dates } from "@/data/admission";
import { updateState, useApplicant } from "@/lib/applicantStore";
import { Badge, Card, Locked, primaryButton, secondaryButton } from "./ui";

export default function Decision() {
  const s = useApplicant();
  const program = s.application.program;

  if (!s.submittedAt) {
    return (
      <Locked
        title="Decision & offer is locked"
        text="Submit your application first. Your admission decision will appear here."
        href="/portal/application"
        cta="Go to application"
      />
    );
  }

  if (s.decision === "pending") {
    return (
      <div className="space-y-6">
        <Card>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="text-3xl font-semibold text-primary">Your application is under review</h1>
              <p className="mt-2 text-foreground/70">
                Our admissions team is reviewing application <strong>{s.reference}</strong>. Decisions
                are released on <strong>{dates.decision}</strong>.
              </p>
            </div>
            <Badge tone="blue">Under review</Badge>
          </div>
          <ol className="mt-6 space-y-3 text-sm">
            {[
              ["Application received", true],
              ["Completeness check", true],
              ["Academic review", false],
              ["Decision released", false],
            ].map(([label, done]) => (
              <li key={label as string} className="flex items-center gap-3">
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                    done ? "bg-green-500 text-white" : "bg-primary/10 text-primary"
                  }`}
                >
                  {done ? "✓" : ""}
                </span>
                {label}
              </li>
            ))}
          </ol>
        </Card>
        <Card className="border-2 border-dashed border-accent">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent-foreground">
            Demo only
          </p>
          <p className="mt-1 text-sm text-foreground/70">
            Skip the wait and see what an admitted applicant sees.
          </p>
          <button
            type="button"
            onClick={() => updateState((st) => ({ ...st, decision: "admitted" }))}
            className={`${primaryButton} mt-4`}
          >
            Release sample decision
          </button>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-2 border-green-500">
        <p className="text-sm font-semibold uppercase tracking-wide text-green-700">
          Offer of admission
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-primary sm:text-4xl">
          Congratulations, {s.account?.name.split(" ")[0] || "Applicant"}! 🎉
        </h1>
        <p className="mt-3 text-foreground/70">
          We are delighted to offer you a place in <strong>{program.program}</strong> starting{" "}
          <strong>{program.intake}</strong> at our <strong>{program.campus}</strong>.
        </p>
        <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-3">
          {[
            ["Scholarship", "Merit scholarship · 25% tuition"],
            ["Accept by", dates.offerDeadline],
            ["Classes begin", dates.classesBegin],
          ].map(([k, v]) => (
            <div key={k} className="rounded-xl bg-muted p-4">
              <dt className="text-foreground/60">{k}</dt>
              <dd className="mt-1 font-semibold">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-6 flex flex-wrap gap-3">
          {s.offerAccepted ? (
            <>
              <Badge tone="green">Offer accepted</Badge>
              <Link href="/portal/enrollment" className={primaryButton}>
                Continue to enrollment
              </Link>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => updateState((st) => ({ ...st, offerAccepted: true }))}
                className={primaryButton}
              >
                Accept offer
              </button>
              <Link href="/portal" className={secondaryButton}>
                Decide later
              </Link>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}
