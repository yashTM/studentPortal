import { ChevronRight } from "lucide-react";
import Link from "next/link";
import CampusImage from "@/components/shared/CampusImage";

/** Shorter hero for inner pages, with a breadcrumb (Home / Page). */
export default function PageHero({
  title,
  description,
  trail,
}: {
  title: string;
  description?: string;
  /** Breadcrumb items between Home and the current page. */
  trail?: { label: string; href: string }[];
}) {
  return (
    <section className="relative overflow-hidden bg-brand-900 text-white">
      <CampusImage variant="banner" sizes="100vw" position="right center" alt="" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-brand-900 via-brand-900/90 to-brand-900/55" />
      <div className="relative mx-auto max-w-7xl px-5 py-14 sm:py-20">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-white/75">
            <li><Link href="/" className="underline-offset-4 hover:text-white hover:underline">Home</Link></li>
            {trail?.map((t) => (
              <li key={t.href} className="flex items-center gap-1.5">
                <ChevronRight aria-hidden className="h-3.5 w-3.5" />
                <Link href={t.href} className="underline-offset-4 hover:text-white hover:underline">{t.label}</Link>
              </li>
            ))}
            <li aria-current="page" className="flex items-center gap-1.5 font-semibold text-white">
              <ChevronRight aria-hidden className="h-3.5 w-3.5" />
              {title}
            </li>
          </ol>
        </nav>
        <span aria-hidden className="mb-4 mt-6 block h-[3px] w-12 rounded bg-accent" />
        <h1 className="!text-white">{title}</h1>
        {description && <p className="mt-3 max-w-2xl text-lg text-white/85">{description}</p>}
      </div>
    </section>
  );
}
