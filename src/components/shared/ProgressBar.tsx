import { cn } from "@/lib/cn";

/** Slim progress bar. Animates in on mount. `marker` draws a threshold tick (0-100). */
export default function ProgressBar({
  value,
  max,
  label,
  tone = "primary",
  marker,
}: {
  value: number;
  max: number;
  label: string;
  tone?: "primary" | "green" | "amber" | "red";
  marker?: number;
}) {
  const pct = max === 0 ? 0 : Math.min(100, Math.round((value / max) * 100));
  const fill = {
    primary: "bg-primary",
    green: "bg-success",
    amber: "bg-warning",
    red: "bg-danger",
  }[tone];
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      className="relative h-1.5 w-full rounded-full bg-muted"
    >
      <div className="h-full overflow-hidden rounded-full">
        <div className={cn("grow-x h-full rounded-full", fill)} style={{ width: `${pct}%` }} />
      </div>
      {marker !== undefined && (
        <span aria-hidden className="absolute -top-1 h-3.5 w-0.5 rounded bg-foreground/50" style={{ left: `${marker}%` }} />
      )}
    </div>
  );
}
