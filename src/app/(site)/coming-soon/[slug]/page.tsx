import { Hammer } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { comingSoonPages } from "@/data/site/nav";
import PageHero from "@/components/site/PageHero";
import { buttonStyles } from "@/components/ui/Button";

export function generateStaticParams() {
  return Object.keys(comingSoonPages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/coming-soon/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const page = comingSoonPages[slug];
  return { title: page ? page.title : "Page not found" };
}

/** Polished placeholder for navigation links whose full page is not built yet. */
export default async function ComingSoonPage({ params }: PageProps<"/coming-soon/[slug]">) {
  const { slug } = await params;
  const page = comingSoonPages[slug];
  if (!page) notFound();

  return (
    <>
      <PageHero title={page.title} description={page.text} trail={[{ label: page.parent, href: "/" }]} />
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-5">
          <div className="rounded-lg border border-dashed border-line-strong bg-surface p-8 sm:p-10">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-100 text-gold-700"><Hammer aria-hidden className="h-6 w-6" strokeWidth={1.6} /></span>
            <h2 className="mt-5 text-2xl">This page is coming soon</h2>
            <p className="mt-2 text-subtle">
              We are still preparing the full {page.title.toLowerCase()} page. In the meantime, our admissions team can answer any question, and you can start your application at any time.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/contact" className={buttonStyles()}>Contact admissions</Link>
              <Link href="/signup" className={buttonStyles({ variant: "secondary" })}>Start your application</Link>
              <Link href="/" className={buttonStyles({ variant: "ghost" })}>Back to Home</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
