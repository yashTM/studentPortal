import { Check } from "lucide-react";
import { wizardSteps } from "@/data/enrollment";
import { cn } from "@/lib/cn";
import ProgressBar from "@/components/shared/ProgressBar";

/** Vertical rail with connecting lines on desktop (sticky); compact bar on small screens. */
export default function WizardStepper({
  current,
  onGo,
}: {
  current: number;
  onGo: (step: number) => void;
}) {
  return (
    <nav aria-label="Enrollment progress">
      <div className="lg:hidden">
        <p className="mb-2 text-sm font-semibold">
          <span className="tnum text-subtle">Step {current + 1} of {wizardSteps.length}</span>
          <span aria-hidden className="mx-2 text-n-300">/</span>
          {wizardSteps[current].label}
        </p>
        <ProgressBar value={current + 1} max={wizardSteps.length} label="Enrollment steps" />
      </div>

      <ol className="hidden lg:block">
        {wizardSteps.map((s, i) => {
          const state = i < current ? "done" : i === current ? "current" : "todo";
          return (
            <li key={s.label} className="relative pb-6 last:pb-0">
              {i < wizardSteps.length - 1 && (
                <span aria-hidden className={cn("absolute left-[15px] top-8 h-[calc(100%-1.25rem)] w-px", state === "done" ? "bg-primary" : "bg-line-strong")} />
              )}
              <button
                type="button"
                disabled={state === "todo"}
                onClick={() => onGo(i)}
                aria-current={state === "current" ? "step" : undefined}
                className="group relative flex w-full items-start gap-3 text-left disabled:cursor-default"
              >
                <span
                  className={cn(
                    "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px] font-bold transition-colors",
                    state === "done" && "bg-primary text-white group-hover:bg-brand-700",
                    state === "current" && "bg-accent text-accent-foreground ring-4 ring-gold-100",
                    state === "todo" && "border-2 border-line-strong bg-surface text-n-400",
                  )}
                >
                  {state === "done" ? <Check aria-hidden className="h-4 w-4" strokeWidth={3} /> : i + 1}
                </span>
                <span className="-mt-0.5 min-w-0">
                  <span className={cn("block text-sm font-semibold", state === "todo" ? "text-n-400" : "text-foreground")}>{s.label}</span>
                  <span className={cn("block text-xs", state === "todo" ? "text-n-400" : "text-subtle")}>{s.description}</span>
                  <span className="sr-only">{state === "done" ? "completed" : state === "current" ? "current step" : "not started"}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
