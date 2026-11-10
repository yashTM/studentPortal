import { Lock } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { buttonStyles } from "@/components/ui/Button";

/** Flat, bordered surface. Use for discrete or grouped items, not for every section. */
export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("rounded-lg border border-line bg-surface p-6 shadow-sm", className)}>
      {children}
    </section>
  );
}

const badgeTones = {
  green: "bg-success-bg text-success-fg",
  blue: "bg-info-bg text-info-fg",
  amber: "bg-warning-bg text-warning-fg",
  red: "bg-danger-bg text-danger-fg",
  grey: "bg-muted text-n-600",
  brand: "bg-brand-100 text-brand-800",
};
const dotTones = {
  green: "bg-success",
  blue: "bg-info",
  amber: "bg-warning",
  red: "bg-danger",
  grey: "bg-n-400",
  brand: "bg-brand-600",
};

/** Status pill: one size, tinted background, small leading dot. */
export function Badge({
  tone,
  children,
}: {
  tone: keyof typeof badgeTones;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold",
        badgeTones[tone],
      )}
    >
      <span aria-hidden className={cn("h-1.5 w-1.5 rounded-full", dotTones[tone])} />
      {children}
    </span>
  );
}

export function Locked({
  title,
  text,
  href,
  cta,
}: {
  title: string;
  text: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="mx-auto max-w-xl rounded-lg border border-line bg-surface p-8 sm:p-10">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-primary">
        <Lock aria-hidden className="h-5 w-5" />
      </span>
      <h1 className="mt-5 text-2xl">{title}</h1>
      <p className="mt-2 text-subtle">{text}</p>
      <Link href={href} className={buttonStyles({ className: "mt-6" })}>
        {cta}
      </Link>
    </div>
  );
}

// Legacy class-string exports (used across the existing screens).
export const primaryButton = buttonStyles({ variant: "primary" });
export const secondaryButton = buttonStyles({ variant: "secondary" });
