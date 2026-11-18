"use client";

import { Check, Laptop, Library, LifeBuoy, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { housingOptions, studentServices } from "@/data/enrollment";
import { setData, setFlag } from "@/lib/enrollmentWizard";
import { cn } from "@/lib/cn";
import { OptionCard } from "@/components/shared/FormControls";
import Button from "@/components/ui/Button";
import type { StepProps } from "./types";

const icons: Record<string, LucideIcon> = {
  service_library: Library,
  service_it: Laptop,
  service_support: LifeBuoy,
};

export default function ServicesStep({ wizard, errors }: StepProps) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <p className="text-subtle">
        These services are available from day one. Requests are optional except your housing preference, and requests here are demo only.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {studentServices.map((s) => {
          const requested = !!wizard.flags[s.key];
          const Icon = icons[s.key] ?? Library;
          return (
            <article key={s.key} className={cn("flex flex-col rounded-lg border p-5 text-sm transition-colors", requested ? "border-success/50 bg-success-bg/40" : "border-line bg-surface")}>
              <div className="flex items-start justify-between gap-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-50 text-primary">
                  <Icon aria-hidden className="h-5 w-5" strokeWidth={1.75} />
                </span>
                {requested && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-success-bg px-2.5 py-0.5 text-xs font-semibold text-success-fg">
                    <Check aria-hidden className="h-3 w-3" strokeWidth={3} /> Requested
                  </span>
                )}
              </div>
              <h3 className="mt-3 text-base">{s.title}</h3>
              <p className="mt-1 text-[13px] text-subtle">{s.text}</p>
              {open === s.key && <p className="mt-3 rounded-md bg-muted px-3 py-2 text-[13px] text-n-700">{s.detail}</p>}
              <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
                <Button variant={requested ? "secondary" : "primary"} size="sm" aria-pressed={requested} onClick={() => setFlag(s.key, !requested)}>
                  {requested ? "Cancel request" : s.action}
                </Button>
                <Button variant="ghost" size="sm" aria-expanded={open === s.key} onClick={() => setOpen(open === s.key ? null : s.key)}>
                  {open === s.key ? "Hide details" : "Learn more"}
                </Button>
              </div>
            </article>
          );
        })}
      </div>

      <fieldset>
        <legend className="mb-3 font-heading text-lg font-semibold text-primary">Housing preference</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {housingOptions.map((o) => (
            <OptionCard key={o.value} name="housing" checked={wizard.data.housing === o.value} onChange={() => setData("housing", o.value)} title={o.label} />
          ))}
        </div>
        {errors.housing && <p className="mt-2 text-xs font-medium text-danger-fg">{errors.housing}</p>}
      </fieldset>
    </div>
  );
}
