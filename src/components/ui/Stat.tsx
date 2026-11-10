import { cn } from "@/lib/cn";

/** Key figure with an optional visual (ring, bar or sparkline) on the right. Not a card: sits in a stat row. */
export default function Stat({
  label,
  value,
  hint,
  visual,
  className,
  index = 0,
}: {
  label: string;
  value: React.ReactNode;
  hint?: React.ReactNode;
  visual?: React.ReactNode;
  className?: string;
  index?: number;
}) {
  return (
    <div className={cn("rise flex items-center justify-between gap-4 px-5 py-4", className)} style={{ ["--i" as string]: index }}>
      <div className="min-w-0">
        <p className="eyebrow">{label}</p>
        <p className="tnum mt-1 truncate font-heading text-[1.65rem] font-semibold leading-tight text-primary">{value}</p>
        {hint && <p className="mt-0.5 text-[13px] text-subtle">{hint}</p>}
      </div>
      {visual}
    </div>
  );
}

/** Tiny inline sparkline (SVG, no chart library). */
export function Sparkline({ points, label }: { points: number[]; label: string }) {
  const max = Math.max(...points, 1);
  const w = 72;
  const h = 28;
  const step = w / (points.length - 1 || 1);
  const d = points.map((p, i) => `${i === 0 ? "M" : "L"}${(i * step).toFixed(1)} ${(h - (p / max) * (h - 4) - 2).toFixed(1)}`).join(" ");
  return (
    <svg role="img" aria-label={label} width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="shrink-0 text-brand-400">
      <path d={d} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
