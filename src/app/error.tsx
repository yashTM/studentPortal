"use client";

import Link from "next/link";
import Logo from "@/components/shared/Logo";
import Button, { buttonStyles } from "@/components/ui/Button";
import { branding } from "@/config/branding";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-20 text-center">
      <Logo variant="full" className="h-16 w-auto" />
      <span aria-hidden className="mt-8 block h-[3px] w-12 rounded bg-accent" />
      <p className="eyebrow mt-6">Something went wrong</p>
      <h1 className="mt-2">This page hit a problem</h1>
      <p role="alert" className="mt-3 max-w-md text-subtle">An unexpected error occurred. You can try again, or return home. Nothing you entered has been lost in this demo.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button onClick={reset}>Try again</Button>
        <Link href="/" className={buttonStyles({ variant: "secondary" })}>Go to {branding.name}</Link>
      </div>
    </main>
  );
}
