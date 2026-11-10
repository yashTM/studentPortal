"use client";

import { Minus, Plus } from "lucide-react";
import { useId, useState } from "react";
import { cn } from "@/lib/cn";

/** Single-open accordion with proper button/region semantics. */
export default function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const base = useId();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line rounded-lg border border-line bg-surface">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.q}>
            <h3 className="!font-body text-base">
              <button
                type="button"
                id={`${base}-q${i}`}
                aria-expanded={isOpen}
                aria-controls={`${base}-a${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-sans text-[15px] font-semibold text-primary hover:bg-brand-50/60"
              >
                {it.q}
                {isOpen ? <Minus aria-hidden className="h-4 w-4 shrink-0 text-accent-foreground" /> : <Plus aria-hidden className="h-4 w-4 shrink-0 text-n-500" />}
              </button>
            </h3>
            <div id={`${base}-a${i}`} role="region" aria-labelledby={`${base}-q${i}`} hidden={!isOpen} className={cn("px-5 pb-5 text-sm text-n-700", isOpen && "rise")}>
              {it.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
