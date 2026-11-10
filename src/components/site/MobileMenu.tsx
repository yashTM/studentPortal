"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { siteNav } from "@/data/site/nav";
import Logo from "@/components/shared/Logo";
import { buttonStyles } from "@/components/ui/Button";
import Dialog from "@/components/ui/Dialog";
import { cn } from "@/lib/cn";

/** Navy navigation drawer for mobile and tablet. Groups are accordions. */
export default function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const row = "flex w-full items-center justify-between rounded-md px-3 py-3 text-left text-[15px] font-semibold text-white hover:bg-white/10";

  return (
    <Dialog open={open} onClose={onClose} label="Site menu" variant="drawer" tone="dark">
      <div className="flex min-h-full flex-col p-5 pt-6">
        <div className="mb-6 pr-10"><Logo tone="light" className="h-10 w-auto" /></div>
        <nav aria-label="Site menu" className="flex-1">
          <ul className="space-y-0.5">
            {siteNav.map((item) =>
              item.children ? (
                <li key={item.id}>
                  <button type="button" aria-expanded={expanded === item.id} aria-controls={`m-${item.id}`} onClick={() => setExpanded(expanded === item.id ? null : item.id)} className={row}>
                    {item.label}
                    <ChevronDown aria-hidden className={cn("h-4 w-4 text-white/60 transition-transform", expanded === item.id && "rotate-180")} />
                  </button>
                  {expanded === item.id && (
                    <ul id={`m-${item.id}`} className="mb-2 ml-3 space-y-0.5 border-l border-accent/50 pl-3">
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link href={c.href} onClick={onClose} className="block rounded-md px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white">{c.label}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={item.id}>
                  <Link href={item.href!} onClick={onClose} className={row}>{item.label}</Link>
                </li>
              ),
            )}
          </ul>
        </nav>
        <div className="mt-6 space-y-3 border-t border-white/15 pt-5">
          <Link href="/login" onClick={onClose} className={buttonStyles({ variant: "secondary", className: "w-full !border-white/30 !bg-transparent !text-white hover:!bg-white/10" })}>Login</Link>
          <Link href="/signup" onClick={onClose} className={buttonStyles({ className: "w-full !bg-accent !text-accent-foreground hover:!bg-gold-300" })}>Create account</Link>
        </div>
      </div>
    </Dialog>
  );
}
