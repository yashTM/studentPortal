"use client";

import { ArrowRight, Check, FlaskConical } from "lucide-react";
import Link from "next/link";
import { dates } from "@/data/admission";
import { cn } from "@/lib/cn";
import { updateState, useApplicant } from "@/lib/applicantStore";
import Logo from "@/components/shared/Logo";
import PortalHero from "./PortalHero";
import Button, { buttonStyles } from "@/components/ui/Button";
import { Badge, Locked } from "./ui";

const stages = ["Application received", "Completeness check", "Academic review", "Decision released"];

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
    const reached = 2; // demo: first two stages complete
    return (
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <PortalHero
            eyebrow="Decision and offer"
            title="Your application is under review"
            description={`Our admissions team is reviewing application ${s.reference}. Decisions are released on ${dates.decision}.`}
            aside={<span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-info-fg">Under review</span>}
          />
        </div>

        <ol aria-label="Review progress" className="grid gap-0 rounded-lg border border-line bg-surface p-6 sm:grid-cols-4">
          {stages.map((label, i) => {
            const done = i < reached;
            const current = i === reached;
            return (
              <li key={label} className="relative flex gap-3 pb-5 last:pb-0 sm:block sm:pb-0 sm:pr-4">
                {i < stages.length - 1 && (
                  <>
                    <span aria-hidden className={cn("absolute left-[13px] top-8 h-[calc(100%-1rem)] w-px sm:hidden", done ? "bg-success" : "bg-line-strong")} />
                    <span aria-hidden className={cn("absolute left-8 right-2 top-[13px] hidden h-px sm:block", done ? "bg-success" : "bg-line-strong")} />
                  </>
                )}
                <span
                  aria-hidden
                  className={cn(
                    "relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                    done && "bg-success text-white",
                    current && "bg-primary ring-4 ring-brand-100",
                    !done && !current && "border-2 border-line-strong bg-surface",
                  )}
                >
                  {done && <Check className="h-4 w-4" strokeWidth={3} />}
                  {current && <span className="h-2 w-2 rounded-full bg-white" />}
                </span>
                <div className="sm:mt-3">
                  <p className="text-sm font-semibold">{label}</p>
                  <p className="text-xs text-subtle">{done ? "Complete" : current ? "In progress" : "Upcoming"}</p>
                </div>
              </li>
            );
          })}
        </ol>

        <p className="mt-6 text-sm text-subtle">
          While you wait, you can review your <Link href="/portal/documents" className="font-semibold text-primary underline underline-offset-4">documents</Link> or your <Link href="/portal/application" className="font-semibold text-primary underline underline-offset-4">application</Link>.
        </p>

        {/* Developer/demo control: deliberately visually distinct from product UI */}
        <aside aria-label="Demo control" className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-dashed border-line-strong bg-muted/50 px-5 py-4">
          <div className="flex items-start gap-3">
            <FlaskConical aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-n-500" />
            <div>
              <p className="eyebrow">Demo control</p>
              <p className="mt-0.5 max-w-xl text-[13px] text-subtle">
                Skip the wait and see what an admitted applicant sees. This button is demo functionality only. After the sample decision is released, accept the offer to unlock Enrollment and onboarding.
              </p>
            </div>
          </div>
          <Button variant="secondary" size="sm" onClick={() => updateState((st) => ({ ...st, decision: "admitted" }))}>
            Release sample decision
          </Button>
        </aside>
      </div>
    );
  }

  const first = s.account?.name.split(" ")[0] || "Applicant";
  const terms: [string, string][] = [
    ["Program", program.program ?? ""],
    ["Intake", program.intake ?? ""],
    ["Campus", program.campus ?? ""],
    ["Scholarship", "Merit scholarship, 25% of tuition"],
    ["Accept by", dates.offerDeadline],
    ["Classes begin", dates.classesBegin],
  ];

  return (
    <div className="mx-auto max-w-4xl">
      <article className="overflow-hidden rounded-lg border border-line bg-surface shadow-lg">
        <div className="relative bg-brand-900 px-6 py-9 text-white sm:px-10 sm:py-12">
          <span aria-hidden className="absolute inset-y-0 left-0 w-1.5 bg-accent" />
          {/* Crest watermark, very low opacity */}
          <div aria-hidden className="pointer-events-none absolute -right-8 top-1/2 -translate-y-1/2 opacity-[0.07]">
            <Logo variant="mark" tone="light" className="h-72 w-auto" />
          </div>
          <div className="relative">
          <p className="eyebrow !text-accent">Offer of admission</p>
          <h1 className="mt-2 !text-white">Congratulations, {first}.</h1>
          <span aria-hidden className="mt-3 block h-[3px] w-12 rounded bg-accent" />
          <p className="mt-3 max-w-xl text-white/85">
            We are delighted to offer you a place in <strong className="font-semibold text-white">{program.program}</strong> starting{" "}
            <strong className="font-semibold text-white">{program.intake}</strong>.
          </p>
          </div>
        </div>

        <dl className="grid divide-y divide-line sm:grid-cols-2 sm:divide-y-0">
          {terms.map(([k, v], i) => (
            <div key={k} className={cn("px-6 py-4 sm:px-10", i < 4 && "sm:border-b sm:border-line", i % 2 === 0 && "sm:border-r sm:border-line")}>
              <dt className="eyebrow">{k}</dt>
              <dd className="mt-1 font-semibold">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="flex flex-wrap items-center gap-4 border-t border-line bg-muted/50 px-6 py-5 sm:px-10">
          {s.offerAccepted ? (
            <>
              <Badge tone="green">Offer accepted</Badge>
              <Link href="/portal/enrollment" className={buttonStyles({ size: "lg", className: "ml-auto" })}>
                Start Enrollment <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
            </>
          ) : (
            <>
              <p className="min-w-0 flex-1 basis-60 text-sm text-subtle">
                Accepting your offer unlocks the Enrollment tab, where you complete registration, fees and onboarding.
              </p>
              <Link href="/portal" className={buttonStyles({ variant: "ghost" })}>Decide later</Link>
              <Button size="lg" onClick={() => updateState((st) => ({ ...st, offerAccepted: true }))}>
                Accept offer
              </Button>
            </>
          )}
        </div>
      </article>
    </div>
  );
}
