import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/shared/Logo";
import { buttonStyles } from "@/components/ui/Button";
import { branding } from "@/config/branding";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-20 text-center">
      <Logo variant="full" className="h-16 w-auto" />
      <span aria-hidden className="mt-8 block h-[3px] w-12 rounded bg-accent" />
      <p className="eyebrow mt-6">Error 404</p>
      <h1 className="mt-2">We could not find that page</h1>
      <p className="mt-3 max-w-md text-subtle">The link may be out of date, or the page may have moved. Head back home and pick up where you left off.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className={buttonStyles()}>Go to {branding.name}</Link>
        <Link href="/student" className={buttonStyles({ variant: "secondary" })}>Student Portal</Link>
      </div>
      <p className="mt-12 font-heading text-sm italic text-n-600">{branding.tagline}</p>
    </main>
  );
}
