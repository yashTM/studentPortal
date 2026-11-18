import { cn } from "@/lib/cn";

/** SVG progress ring with an animated sweep. Children render in the centre. */
export default function ProgressRing({
  value,
  max,
  label,
  size = 72,
  stroke = 7,
  tone = "primary",
  children,
}: {
  value: number;
  max: number;
  label: string;
  size?: number;
  stroke?: number;
  tone?: "primary" | "green" | "amber" | "red";
  children?: React.ReactNode;
}) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const pct = max === 0 ? 0 : Math.min(1, value / max);
  const color = { primary: "var(--primary)", green: "var(--success)", amber: "var(--warning)", red: "var(--danger)" }[tone];

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      className={cn("relative inline-flex shrink-0 items-center justify-center")}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90" aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--n-200)" strokeWidth={stroke} />
        <circle
          className="ring-in"
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={circ * (1 - pct)}
          style={{ ["--ring-circ" as string]: circ }}
        />
      </svg>
      <span className="tnum absolute text-sm font-bold text-foreground">{children}</span>
    </div>
  );
}
