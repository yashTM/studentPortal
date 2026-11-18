import { Award, ClipboardCheck, FileText, GraduationCap, Upload, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { journeySteps } from "@/data/site/home";
import { buttonStyles } from "@/components/ui/Button";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const icons: Record<string, LucideIcon> = { FileText, Upload, ClipboardCheck, Award, GraduationCap };

/** Admission journey: horizontal timeline on desktop, vertical on mobile. */
export default function JourneySection() {
  return (
    <section id="admission-journey" aria-labelledby="journey-h" className="scroll-mt-20 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal>
          <SectionHeading eyebrow="Admissions" title="Five steps. One clear path." text="Apply once and the portal guides you from application to your first day." />
        </Reveal>
        <span id="journey-h" className="sr-only">Admission journey</span>
        <ol className="mt-12 grid gap-0 lg:grid-flow-col lg:auto-cols-fr">
          {journeySteps.map((s, i) => {
            const Icon = icons[s.icon];
            return (
              <Reveal as="li" key={s.title} delay={i} className="relative flex gap-5 pb-9 last:pb-0 lg:block lg:pb-0 lg:pr-8">
                {i < journeySteps.length - 1 && (
                  <>
                    <span aria-hidden className="absolute left-[27px] top-14 h-[calc(100%-2.5rem)] w-px bg-line-strong lg:hidden" />
                    <span aria-hidden className="absolute left-16 right-4 top-[27px] hidden h-px bg-line-strong lg:block" />
                  </>
                )}
                <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary text-white ring-4 ring-background">
                  <Icon aria-hidden className="h-6 w-6" strokeWidth={1.6} />
                  <span className="tnum absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-accent-foreground">{i + 1}</span>
                </span>
                <div className="min-w-0 lg:mt-5">
                  <h3 className="text-xl">{s.title}</h3>
                  <p className="mt-1.5 text-sm text-subtle">{s.text}</p>
                </div>
              </Reveal>
            );
          })}
        </ol>
        <Reveal className="mt-12">
          <Link href="/signup" className={buttonStyles({ size: "lg" })}>Start your application</Link>
        </Reveal>
      </div>
    </section>
  );
}
