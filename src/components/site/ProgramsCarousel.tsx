"use client";

import { ArrowRight, CalendarDays, ChevronLeft, ChevronRight, Clock, GraduationCap } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { programs } from "@/data/site/home";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

/** Scroll-snap carousel with arrows, touch swipe (native) and mouse drag. */
export default function ProgramsCarousel() {
  const track = useRef<HTMLUListElement>(null);
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: false });
  const [edges, setEdges] = useState({ start: true, end: false });

  const update = () => {
    const el = track.current;
    if (el) setEdges({ start: el.scrollLeft <= 2, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2 });
  };
  const scrollBy = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * Math.max(300, el.clientWidth * 0.8), behavior: reduce ? "auto" : "smooth" });
  };
  const arrow = "flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-surface text-primary hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <section id="programs" aria-labelledby="programs-h" className="scroll-mt-20 bg-muted/60 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal><SectionHeading eyebrow="Academics" title="Programs built around you" text="Drag, swipe or use the arrows to browse. Intakes shown are for Fall 2027." /></Reveal>
          <div className="flex gap-2">
            <button type="button" aria-label="Previous programs" onClick={() => scrollBy(-1)} disabled={edges.start} className={arrow}><ChevronLeft aria-hidden className="h-5 w-5" /></button>
            <button type="button" aria-label="Next programs" onClick={() => scrollBy(1)} disabled={edges.end} className={arrow}><ChevronRight aria-hidden className="h-5 w-5" /></button>
          </div>
        </div>
        <span id="programs-h" className="sr-only">Programs</span>
        <ul
          ref={track}
          tabIndex={0}
          aria-label="Programs, scrollable list"
          onScroll={update}
          onPointerDown={(e) => {
            if (e.pointerType !== "mouse" || !track.current) return;
            drag.current = { active: true, startX: e.clientX, startLeft: track.current.scrollLeft, moved: false };
          }}
          onPointerMove={(e) => {
            const d = drag.current;
            if (!d.active || !track.current) return;
            const dx = e.clientX - d.startX;
            if (Math.abs(dx) > 5) d.moved = true;
            track.current.scrollLeft = d.startLeft - dx;
          }}
          onPointerUp={() => (drag.current.active = false)}
          onPointerLeave={() => (drag.current.active = false)}
          onClickCapture={(e) => {
            if (drag.current.moved) {
              e.preventDefault();
              drag.current.moved = false;
            }
          }}
          className="no-scrollbar relative mt-10 flex cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 active:cursor-grabbing"
        >
          {programs.map((p, i) => (
            <li key={p.id} className="w-[17.5rem] shrink-0 snap-start sm:w-[19rem]">
              <Reveal delay={i % 3} className="h-full">
                <article className="group flex h-full flex-col rounded-lg border border-line bg-surface p-6 transition-shadow hover:shadow-lg">
                  <span className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-50 text-primary"><GraduationCap aria-hidden className="h-5 w-5" strokeWidth={1.6} /></span>
                  <p className="eyebrow mt-5">{p.level}</p>
                  <h3 className="mt-1 text-xl">{p.name}</h3>
                  <dl className="mt-4 space-y-1.5 text-sm text-subtle">
                    <div className="flex items-center gap-2"><Clock aria-hidden className="h-4 w-4" /><dt className="sr-only">Duration</dt><dd>{p.duration}</dd></div>
                    <div className="flex items-center gap-2"><CalendarDays aria-hidden className="h-4 w-4" /><dt className="sr-only">Intake</dt><dd>{p.intake}</dd></div>
                  </dl>
                  <Link href="/signup" draggable={false} className="mt-6 inline-flex items-center gap-1.5 pt-1 text-sm font-semibold text-primary underline-offset-4 hover:underline">
                    Learn more <span className="sr-only">about {p.name}</span> <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
