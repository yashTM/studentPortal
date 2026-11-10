import CampusImage from "@/components/shared/CampusImage";

/** Branded hero band for the admission portal: campus photo, navy overlay, serif title, gold rule. */
export default function PortalHero({
  eyebrow,
  title,
  description,
  aside,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  aside?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="rise relative overflow-hidden rounded-lg bg-brand-900">
      <CampusImage variant="banner" priority sizes="(min-width: 1152px) 1100px, 100vw" position="right center" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-brand-900 via-brand-900/85 to-brand-900/35" />
      <div className="relative flex flex-wrap items-end justify-between gap-6 px-6 py-8 sm:px-10 sm:py-10">
        <div className="min-w-0 max-w-2xl">
          <span aria-hidden className="mb-4 block h-[3px] w-12 rounded bg-accent" />
          {eyebrow && <p className="eyebrow mb-2 !text-accent">{eyebrow}</p>}
          <h1 className="!text-white">{title}</h1>
          {description && <p className="mt-3 text-[15px] text-white/85">{description}</p>}
          {children}
        </div>
        {aside}
      </div>
    </section>
  );
}
