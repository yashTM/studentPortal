"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { news } from "@/data/site/home";
import { cn } from "@/lib/cn";
import Tabs from "@/components/shared/Tabs";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const tabs = [
  { id: "all", label: "All" },
  { id: "News", label: "News" },
  { id: "Event", label: "Events" },
];

function DateBadge({ iso }: { iso: string }) {
  const d = new Date(`${iso}T00:00:00Z`);
  return (
    <span className="flex h-16 w-14 shrink-0 flex-col items-center justify-center rounded-md bg-primary text-white">
      <span className="tnum font-heading text-2xl font-semibold leading-none">{d.toLocaleDateString("en-GB", { day: "numeric", timeZone: "UTC" })}</span>
      <span className="mt-1 text-[10px] font-bold uppercase tracking-wider text-accent">{d.toLocaleDateString("en-GB", { month: "short", timeZone: "UTC" })}</span>
    </span>
  );
}

/** News and events as a tabbed, scroll-snap row. Demo content. */
export default function NewsEvents() {
  return (
    <section id="news" aria-labelledby="news-h" className="scroll-mt-20 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal><SectionHeading eyebrow="News & Events" title="What is happening at Horizon" /></Reveal>
        <span id="news-h" className="sr-only">News and events</span>
        <div className="mt-8">
          <Tabs tabs={tabs} label="News and events filter">
            {(active) => (
              <ul className="no-scrollbar relative -mx-5 flex snap-x gap-5 overflow-x-auto px-5 pb-4">
                {news
                  .filter((n) => active === "all" || n.category === active)
                  .sort((a, b) => a.date.localeCompare(b.date))
                  .map((n) => (
                    <li key={n.id} className="w-[18rem] shrink-0 snap-start sm:w-[20rem]">
                      <article className="flex h-full flex-col rounded-lg border border-line bg-surface p-5">
                        <div className="flex items-start gap-4">
                          <DateBadge iso={n.date} />
                          <span className={cn("rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide", n.category === "Event" ? "bg-gold-100 text-gold-700" : "bg-brand-100 text-brand-800")}>{n.category}</span>
                        </div>
                        <h3 className="mt-4 text-lg">{n.title}</h3>
                        <p className="mt-2 flex-1 text-sm text-subtle">{n.text}</p>
                        <Link href="/contact" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline">
                          Read more <span className="sr-only">about {n.title}</span> <ArrowRight aria-hidden className="h-4 w-4" />
                        </Link>
                      </article>
                    </li>
                  ))}
              </ul>
            )}
          </Tabs>
        </div>
      </div>
    </section>
  );
}
