import { ShieldCheck } from "lucide-react";
import Logo from "@/components/shared/Logo";
import CampusImage from "@/components/shared/CampusImage";
import { branding } from "@/config/branding";

/** Split layout: campus photo with a navy overlay on the left, a calm light form surface on the right. */
export default function StudentAuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="grid flex-1 lg:grid-cols-[1.05fr_1fr]">
      <section className="relative min-h-56 overflow-hidden bg-brand-900 lg:min-h-dvh">
        <CampusImage variant="portrait" priority sizes="(min-width: 1024px) 52vw, 100vw" position="center 30%" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-brand-900 via-brand-900/70 to-brand-900/35" />
        <div className="relative flex h-full min-h-56 flex-col justify-between p-6 lg:min-h-dvh lg:p-12">
          <Logo variant="full" tone="light" className="h-14 w-auto lg:h-20" priority />
          <div className="mt-10">
            <span aria-hidden className="mb-4 block h-[3px] w-12 rounded bg-accent" />
            <p className="font-heading text-3xl font-semibold leading-tight text-white lg:text-5xl">{branding.tagline}</p>
            <p className="mt-3 hidden max-w-md text-[15px] text-white/85 lg:block">
              Your timetable, courses, attendance, fees and documents, together in one calm place.
            </p>
          </div>
        </div>
      </section>
      <section className="flex items-center justify-center px-5 py-10 sm:px-10">
        <div className="w-full max-w-sm">
          <div className="mb-8"><Logo variant="mark" className="h-14 w-auto" /></div>
          {children}
          <p className="mt-8 flex items-start gap-2 text-xs text-subtle">
            <ShieldCheck aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
            Demonstration build. Sign-in is simulated and no real account or data is involved.
          </p>
        </div>
      </section>
    </main>
  );
}
