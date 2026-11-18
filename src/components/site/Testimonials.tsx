"use client";

import { ChevronLeft, ChevronRight, Pause, Play, Quote } from "lucide-react";
import { useState } from "react";
import { testimonials } from "@/data/site/home";
import { cn } from "@/lib/cn";
import { useSlider, useSwipe } from "@/lib/useSlider";
import { useReducedMotion } from "@/lib/useReducedMotion";
import SectionHeading from "./SectionHeading";

const INTERVAL = 8;

/** Quote slider: auto-advances, pauses on hover/focus, arrows, dots and swipe. */
export default function Testimonials() {
  const { index, setIndex, next, prev } = useSlider(testimonials.length);
  const reduced = useReducedMotion();
  const [userPaused, setUserPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const playing = !userPaused && !reduced;
  const running = playing && !hovered && !focused;
  const swipe = useSwipe((d) => (d === 1 ? next() : prev()));
  const btn = "flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-primary hover:bg-brand-50 disabled:opacity-40";

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Student testimonials"
      className="bg-gold-50/70 py-16 sm:py-24"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocused(false);
      }}
      {...swipe}
    >
      <div className="mx-auto max-w-4xl px-5">
        <SectionHeading eyebrow="Student voices" title="In their words" />
        <div className="relative mt-10 min-h-[15rem] sm:min-h-[12rem]" aria-live={playing ? "off" : "polite"}>
          {testimonials.map((t, i) => (
            <figure
              key={t.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${testimonials.length}`}
              aria-hidden={i !== index}
              inert={i !== index}
              className={cn("absolute inset-0 transition-opacity duration-500", i === index ? "opacity-100" : "pointer-events-none opacity-0")}
            >
              <Quote aria-hidden className="h-8 w-8 text-accent" strokeWidth={1.5} />
              <blockquote className="mt-3 font-heading text-xl font-medium leading-snug text-primary sm:text-2xl">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span aria-hidden className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">{t.name.split(" ").map((p) => p[0]).join("")}</span>
                <span className="text-sm"><span className="block font-semibold">{t.name}</span><span className="text-subtle">{t.program}</span></span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-8 flex items-center justify-between gap-4">
          <div role="group" aria-label="Choose testimonial" className="flex items-center gap-2">
            {testimonials.map((t, i) => (
              <button key={t.id} type="button" onClick={() => setIndex(i)} aria-label={`Show testimonial ${i + 1}`} aria-current={i === index} className="flex h-8 items-center">
                <span className={cn("relative block h-1 overflow-hidden rounded-full bg-primary/20 transition-[width] duration-300", i === index ? "w-12" : "w-6")}>
                  {i === index && (
                    <span
                      key={index}
                      className={cn("absolute inset-0 rounded-full bg-primary", playing && "slide-progress")}
                      style={playing ? { animationDuration: `${INTERVAL}s`, animationPlayState: running ? "running" : "paused" } : undefined}
                      onAnimationEnd={next}
                    />
                  )}
                </span>
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => setUserPaused((p) => !p)} disabled={reduced} aria-label={playing ? "Pause testimonials" : "Play testimonials"} className={btn}>
              {playing ? <Pause aria-hidden className="h-4 w-4" /> : <Play aria-hidden className="h-4 w-4" />}
            </button>
            <button type="button" onClick={prev} aria-label="Previous testimonial" className={btn}><ChevronLeft aria-hidden className="h-5 w-5" /></button>
            <button type="button" onClick={next} aria-label="Next testimonial" className={btn}><ChevronRight aria-hidden className="h-5 w-5" /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
