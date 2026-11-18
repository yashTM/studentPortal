import Link from "next/link";
import Logo from "@/components/shared/Logo";
import { buttonStyles } from "@/components/ui/Button";
import Reveal from "./Reveal";

/** Closing call to action on navy with a faint crest watermark. */
export default function CtaBand({ title = "Ready to begin your journey?", text = "Applications for Fall 2027 are open. It takes about ten minutes to start." }: { title?: string; text?: string }) {
  return (
    <section aria-label="Get started" className="relative overflow-hidden bg-brand-900 py-16 text-white sm:py-20">
      <div aria-hidden className="pointer-events-none absolute -right-8 top-1/2 -translate-y-1/2 opacity-[0.08]"><Logo variant="mark" tone="light" className="h-80 w-auto" /></div>
      <Reveal className="relative mx-auto max-w-7xl px-5">
        <span aria-hidden className="mb-4 block h-[3px] w-12 rounded bg-accent" />
        <h2 className="max-w-xl !text-white text-3xl sm:text-4xl">{title}</h2>
        <p className="mt-3 max-w-lg text-white/80">{text}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/signup" className={buttonStyles({ size: "lg", className: "!bg-accent !text-accent-foreground hover:!bg-gold-300" })}>Start your application</Link>
          <Link href="/contact" className={buttonStyles({ size: "lg", variant: "secondary", className: "!border-white/40 !bg-transparent !text-white hover:!bg-white/10" })}>Contact admissions</Link>
        </div>
      </Reveal>
    </section>
  );
}
