import { Award, HeartHandshake, Lightbulb, ShieldCheck, Target, Eye, type LucideIcon } from "lucide-react";
import type { Metadata } from "next";
import { accreditations, leadership, milestones, missionVision, story, values } from "@/data/site/about";
import CampusImage from "@/components/shared/CampusImage";
import CtaBand from "@/components/site/CtaBand";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import SectionHeading from "@/components/site/SectionHeading";

export const metadata: Metadata = { title: "About Us", description: "The story, mission, values and people of Horizon University." };

const icons: Record<string, LucideIcon> = { Lightbulb, ShieldCheck, HeartHandshake, Award };
const gallery = [
  { variant: "hero", position: "70% 40%", label: "The main entrance and steps" },
  { variant: "banner", position: "30% center", label: "Walkways between buildings" },
  { variant: "portrait", position: "center 60%", label: "Students crossing the quad" },
] as const;

export default function AboutPage() {
  return (
    <>
      <PageHero title="About Us" description="A university where every student can learn, grow and belong." />

      <section aria-labelledby="story-h" className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1fr_1.2fr]">
          <Reveal><SectionHeading eyebrow="Our story" title="Small beginnings, a shared belief" /></Reveal>
          <span id="story-h" className="sr-only">Our story</span>
          <Reveal delay={1} className="space-y-5 text-[17px] leading-relaxed text-n-700">
            {story.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
          </Reveal>
        </div>
      </section>

      <section aria-label="Mission and vision" className="bg-muted/60 py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 md:grid-cols-2">
          {([["Our mission", missionVision.mission, Target], ["Our vision", missionVision.vision, Eye]] as const).map(([t, text, Icon], i) => (
            <Reveal key={t} delay={i} className="rounded-lg border border-line bg-surface p-8">
              <span className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-50 text-primary"><Icon aria-hidden className="h-5 w-5" strokeWidth={1.6} /></span>
              <h2 className="mt-5 text-2xl">{t}</h2>
              <p className="mt-3 text-n-700">{text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section aria-labelledby="values-h" className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5">
          <Reveal><SectionHeading eyebrow="What we stand for" title="Our core values" /></Reveal>
          <span id="values-h" className="sr-only">Core values</span>
          <ul className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => {
              const Icon = icons[v.icon];
              return (
                <Reveal as="li" key={v.title} delay={i}>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-accent bg-gold-50 text-gold-700"><Icon aria-hidden className="h-5 w-5" strokeWidth={1.6} /></span>
                  <h3 className="mt-4 text-xl">{v.title}</h3>
                  <p className="mt-1.5 text-sm text-subtle">{v.text}</p>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      <section aria-labelledby="timeline-h" className="bg-brand-800 py-16 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-5">
          <Reveal><SectionHeading tone="light" eyebrow="Milestones" title="Twenty-eight years of growth" /></Reveal>
          <span id="timeline-h" className="sr-only">Milestones</span>
          <ol className="relative mt-12 space-y-8 border-l border-accent/50 pl-8">
            {milestones.map((m, i) => (
              <Reveal as="li" key={m.year} delay={i} className="relative">
                <span aria-hidden className="absolute -left-[39px] top-1.5 h-3 w-3 rounded-full bg-accent ring-4 ring-brand-800" />
                <p className="tnum font-heading text-2xl font-semibold text-accent">{m.year}</p>
                <h3 className="mt-0.5 text-lg !text-white">{m.title}</h3>
                <p className="mt-1 max-w-xl text-sm text-white/75">{m.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="leaders-h" className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5">
          <Reveal><SectionHeading eyebrow="Leadership" title="The people who guide Horizon" text="Names and roles are sample content for this demo." /></Reveal>
          <span id="leaders-h" className="sr-only">Leadership team</span>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {leadership.map((p, i) => (
              <Reveal as="li" key={p.name} delay={i} className="rounded-lg border border-line bg-surface p-6 text-center">
                <span aria-hidden className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary font-heading text-2xl font-semibold text-white">{p.name.replace(/^(Dr|Prof|Ms|Mr)\.\s/, "").split(" ").map((x) => x[0]).join("")}</span>
                <h3 className="mt-4 text-lg">{p.name}</h3>
                <p className="mt-1 text-sm text-subtle">{p.role}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="accred-h" className="border-y border-line bg-muted/50 py-12">
        <div className="mx-auto max-w-7xl px-5">
          <h2 id="accred-h" className="eyebrow !text-n-600 !font-sans !text-[11px]">Accreditation and recognition (placeholders)</h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-3">
            {accreditations.map((a) => (
              <li key={a} className="flex items-center gap-3 rounded-md border border-dashed border-line-strong bg-surface px-4 py-3 text-sm text-n-700">
                <Award aria-hidden className="h-5 w-5 shrink-0 text-gold-700" strokeWidth={1.6} /> {a}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-label="Campus gallery" className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 sm:grid-cols-3">
          {gallery.map((g, i) => (
            <Reveal key={g.label} delay={i} className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <CampusImage variant={g.variant} sizes="(min-width: 640px) 400px, 100vw" position={g.position} alt={g.label} />
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand title="Become part of Horizon" text="Explore admissions, or talk to our team about your plans." />
    </>
  );
}
