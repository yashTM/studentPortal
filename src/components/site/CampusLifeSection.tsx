import Link from "next/link";
import { campusPoints } from "@/data/site/home";
import { branding } from "@/config/branding";
import CampusImage from "@/components/shared/CampusImage";
import { buttonStyles } from "@/components/ui/Button";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

/** Split layout: campus photo beside three value points. Uses the tagline once. */
export default function CampusLifeSection() {
  return (
    <section id="campus-life" aria-labelledby="campus-h" className="scroll-mt-20 py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-2 lg:gap-16">
        <Reveal className="relative aspect-[4/3] overflow-hidden rounded-lg">
          <CampusImage variant="hero" sizes="(min-width: 1024px) 560px, 100vw" position="65% center" />
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-brand-900/70 to-transparent" />
          <p className="absolute bottom-4 left-5 font-heading text-xl font-semibold italic text-white">{branding.tagline}</p>
        </Reveal>
        <div>
          <Reveal><SectionHeading eyebrow="Why Horizon" title="A place to learn, grow and belong" text="From your first tour to graduation day, we design the experience around the person, not the paperwork." /></Reveal>
          <span id="campus-h" className="sr-only">Campus life</span>
          <ul className="mt-8 space-y-6">
            {campusPoints.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i + 1} className="flex gap-4">
                <span className="tnum mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent bg-gold-50 text-sm font-bold text-gold-700">{i + 1}</span>
                <div>
                  <h3 className="text-lg">{p.title}</h3>
                  <p className="mt-1 text-sm text-subtle">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={4} className="mt-8"><Link href="/about" className={buttonStyles({ variant: "secondary" })}>About Horizon</Link></Reveal>
        </div>
      </div>
    </section>
  );
}
