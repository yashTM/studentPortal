import Link from "next/link";

export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-2xl bg-white p-6 shadow-sm ${className}`}>
      {children}
    </section>
  );
}

const badgeTones = {
  green: "bg-green-100 text-green-800",
  blue: "bg-blue-100 text-blue-800",
  amber: "bg-amber-100 text-amber-800",
  red: "bg-red-100 text-red-800",
  grey: "bg-zinc-100 text-zinc-700",
};

export function Badge({
  tone,
  children,
}: {
  tone: keyof typeof badgeTones;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`inline-block shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${badgeTones[tone]}`}
    >
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
    <Card className="mx-auto max-w-xl text-center">
      <p className="text-4xl" aria-hidden>
        🔒
      </p>
      <h1 className="mt-3 text-2xl font-semibold text-primary">{title}</h1>
      <p className="mt-2 text-foreground/70">{text}</p>
      <Link
        href={href}
        className="mt-6 inline-block rounded-full bg-primary px-6 py-2.5 font-semibold text-white hover:opacity-90"
      >
        {cta}
      </Link>
    </Card>
  );
}

export const primaryButton =
  "rounded-full bg-primary px-6 py-2.5 font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40";
export const secondaryButton =
  "rounded-full border border-primary/30 px-6 py-2.5 font-semibold text-primary hover:bg-muted";
