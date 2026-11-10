"use client";

import { ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { searchSuggestions } from "@/data/site/nav";
import Dialog from "@/components/ui/Dialog";

/** Mock search: filters a short list of suggested links. Nothing is searched or sent anywhere. */
export default function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => input.current?.focus(), 0);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  const results = searchSuggestions.filter((s) => s.label.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <Dialog open={open} onClose={onClose} label="Search" className="!mt-[10vh]">
      <div className="p-6 sm:p-8">
        <h2 className="pr-8">Search Horizon University</h2>
        <form role="search" onSubmit={(e) => e.preventDefault()} className="relative mt-5">
          <label htmlFor="site-search" className="sr-only">Search the site</label>
          <Search aria-hidden className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-n-400" />
          <input
            id="site-search"
            ref={input}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try programs, fees or dates"
            autoComplete="off"
            className="h-12 w-full rounded-md border border-line-strong bg-surface pl-12 pr-4 text-base outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
          />
        </form>
        <p className="mt-3 text-xs text-subtle">Demo search: it only filters the suggested links below.</p>
        <p className="eyebrow mb-2 mt-5">{query ? "Matching links" : "Suggested links"}</p>
        {results.length === 0 ? (
          <p className="rounded-md border border-dashed border-line-strong p-4 text-sm text-subtle">No suggestions match that. Try &ldquo;fees&rdquo; or &ldquo;apply&rdquo;.</p>
        ) : (
          <ul className="divide-y divide-line rounded-md border border-line">
            {results.map((r) => (
              <li key={r.href}>
                <Link href={r.href} onClick={onClose} className="group flex items-center justify-between px-4 py-3 text-sm font-semibold text-primary hover:bg-brand-50">
                  {r.label}
                  <ArrowRight aria-hidden className="h-4 w-4 text-n-400 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Dialog>
  );
}
