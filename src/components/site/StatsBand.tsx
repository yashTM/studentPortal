"use client";

import { useEffect, useRef, useState } from "react";
import { stats } from "@/data/site/home";
import Reveal from "./Reveal";

function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const run = () => {
      if (reduce) return setValue(to);
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / 1400);
        setValue(Math.round(to * (1 - Math.pow(1 - t, 3))));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        io.disconnect();
        run();
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  return (
    <span ref={ref} aria-label={`${to.toLocaleString("en-IN")}${suffix}`}>
      <span aria-hidden>{value.toLocaleString("en-IN")}{suffix}</span>
    </span>
  );
}

/** Navy stats band. Figures are demo data; they count up once when scrolled into view. */
export default function StatsBand() {
  return (
    <section aria-label="Horizon at a glance" className="bg-brand-800 py-14 text-white">
      <dl className="mx-auto grid max-w-7xl gap-y-10 px-5 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-white/15">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i} className="lg:px-8 lg:first:pl-0">
            <dd className="tnum font-heading text-5xl font-semibold text-accent"><CountUp to={s.value} suffix={s.suffix} /></dd>
            <dt className="mt-2 text-sm font-medium uppercase tracking-[0.1em] text-white/80">{s.label}</dt>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
