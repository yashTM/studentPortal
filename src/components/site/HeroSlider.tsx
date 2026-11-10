"use client";

import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { heroSlides } from "@/data/site/home";
import { cn } from "@/lib/cn";
import { useSlider, useSwipe } from "@/lib/useSlider";
import { useReducedMotion } from "@/lib/useReducedMotion";
import CampusImage from "@/components/shared/CampusImage";
import Logo from "@/components/shared/Logo";
import { buttonStyles } from "@/components/ui/Button";

const INTERVAL = 6; // seconds

/**
 * Accessible hero carousel. Auto-advance is driven by the active dot's progress animation, pauses on
 * hover and focus, can be paused by the user, and is disabled for prefers-reduced-motion.
 */
export default function HeroSlider() {
  const { index, setIndex, next, prev } = useSlider(heroSlides.length);
  const reduced = useReducedMotion();
  const [userPaused, setUserPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const playing = !userPaused && !reduced;
  const running = playing && !hovered && !focused;
  const swipe = useSwipe((dir) => (dir === 1 ? next() : prev()));
  const arrow = "flex h-10 w-10 items-center justify-center rounded-full border border-white/35 bg-brand-900/40 text-white hover:bg-white/15";

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured highlights"
      className="relative overflow-hidden bg-brand-900 text-white"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocused(false);
      }}
      {...swipe}
    >
      <h1 className="sr-only">Horizon University: Learn. Grow. Belong.</h1>
      <div className="relative min-h-[36rem] sm:min-h-[34rem] lg:min-h-[38rem]" aria-live={playing ? "off" : "polite"}>
        {heroSlides.map((s, i) => {
          const active = i === index;
          return (
            <div
              key={s.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${heroSlides.length}`}
              aria-hidden={!active}
              inert={!active}
              className={cn("absolute inset-0 transition-opacity duration-700", active ? "opacity-100" : "pointer-events-none opacity-0")}
            >
              {s.media === "brand" ? (
                <>
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700" />
                  <div aria-hidden className="pointer-events-none absolute -right-10 top-1/2 -translate-y-1/2 opacity-[0.09]">
                    <Logo variant="mark" tone="light" className="h-[30rem] w-auto" />
                  </div>
                </>
              ) : (
                <>
                  <CampusImage variant={s.media} priority={i === 0} sizes="100vw" position={s.position ?? "center"} />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-brand-900 via-brand-900/85 to-brand-900/30 max-sm:from-brand-900/95 max-sm:via-brand-900/80" />
                </>
              )}
              <div className="relative mx-auto flex h-full max-w-7xl items-center px-5 pb-24 pt-14 sm:pb-20">
                <div className="max-w-2xl">
                  <p className="inline-block rounded-full bg-accent px-3.5 py-1 text-xs font-bold uppercase tracking-wide text-accent-foreground">{s.eyebrow}</p>
                  <h2 className="mt-5 font-heading text-[2.4rem] font-semibold leading-[1.08] !text-white sm:text-5xl lg:text-6xl">
                    {s.headline} <em className="text-accent">{s.emphasis}</em> {s.headlineEnd}
                  </h2>
                  <p className="mt-5 max-w-xl text-base text-white/85 sm:text-lg">{s.text}</p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    {s.ctas.map((c) => (
                      <Link
                        key={c.label}
                        href={c.href}
                        className={buttonStyles({
                          size: "lg",
                          variant: c.primary ? "primary" : "secondary",
                          className: c.primary ? "!bg-accent !text-accent-foreground hover:!bg-gold-300" : "!border-white/40 !bg-transparent !text-white hover:!bg-white/10",
                        })}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 pb-6">
          <div role="group" aria-label="Choose slide" className="flex items-center gap-2">
            {heroSlides.map((s, i) => {
              const active = i === index;
              return (
                <button key={s.id} type="button" onClick={() => setIndex(i)} aria-label={`Go to slide ${i + 1}: ${s.eyebrow}`} aria-current={active} className="group flex h-8 items-center px-0.5">
                  <span className={cn("relative block h-1 overflow-hidden rounded-full bg-white/35 transition-[width] duration-300", active ? "w-14" : "w-7 group-hover:bg-white/60")}>
                    {active && (
                      <span
                        key={index}
                        className={cn("absolute inset-0 rounded-full bg-accent", playing && "slide-progress")}
                        style={playing ? { animationDuration: `${INTERVAL}s`, animationPlayState: running ? "running" : "paused" } : undefined}
                        onAnimationEnd={next}
                      />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setUserPaused((p) => !p)} aria-label={playing ? "Pause slideshow" : "Play slideshow"} disabled={reduced} className={arrow}>
              {playing ? <Pause aria-hidden className="h-4 w-4" /> : <Play aria-hidden className="h-4 w-4" />}
            </button>
            <button type="button" onClick={prev} aria-label="Previous slide" className={arrow}><ChevronLeft aria-hidden className="h-5 w-5" /></button>
            <button type="button" onClick={next} aria-label="Next slide" className={arrow}><ChevronRight aria-hidden className="h-5 w-5" /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
