import { Megaphone } from "lucide-react";
import { announcements } from "@/data/site/home";

/** Sliding notice strip. Pauses on hover and focus; static and wrapped for reduced motion (CSS). */
export default function AnnouncementTicker() {
  const items = (hidden: boolean) =>
    announcements.map((a) => (
      <li key={a + hidden} aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-3 px-6 text-[13px] font-medium">
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand-900" />
        {a}
      </li>
    ));
  return (
    <section aria-label="Announcements" className="marquee overflow-hidden bg-accent text-accent-foreground">
      <div className="mx-auto flex max-w-7xl items-center">
        <span className="z-10 flex shrink-0 items-center gap-2 bg-brand-900 px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-accent">
          <Megaphone aria-hidden className="h-4 w-4" /> Notices
        </span>
        <div className="min-w-0 flex-1 overflow-hidden">
          <ul className="marquee-track py-2.5">
            {items(false)}
            {items(true)}
          </ul>
        </div>
      </div>
    </section>
  );
}
