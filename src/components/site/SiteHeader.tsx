"use client";

import { ChevronDown, Menu, Search, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { siteNav, type NavItem } from "@/data/site/nav";
import { branding } from "@/config/branding";
import { cn } from "@/lib/cn";
import Logo from "@/components/shared/Logo";
import { buttonStyles } from "@/components/ui/Button";
import MobileMenu from "./MobileMenu";
import SearchOverlay from "./SearchOverlay";

const topAction = "inline-flex items-center gap-2 rounded-md px-2 py-2 text-[13px] font-bold uppercase tracking-[0.08em] text-primary hover:bg-muted";

/** Two-tier public header: logo and actions on top, sticky navy navigation band below. */
export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [drawer, setDrawer] = useState(false);
  const [search, setSearch] = useState(false);
  const triggers = useRef<Record<string, HTMLButtonElement | null>>({});
  const panels = useRef<Record<string, HTMLUListElement | null>>({});

  const isActive = (item: NavItem) =>
    item.href
      ? item.href === pathname
      : !!item.children?.some((c) => !c.href.includes("#") && c.href === pathname);

  const focusLink = (id: string, to: "first" | "last" | 1 | -1) => {
    const links = [...(panels.current[id]?.querySelectorAll<HTMLElement>("a") ?? [])];
    if (!links.length) return;
    const i = links.indexOf(document.activeElement as HTMLElement);
    const target = to === "first" ? 0 : to === "last" ? links.length - 1 : (i + to + links.length) % links.length;
    links[target].focus();
  };

  const onTriggerKey = (e: React.KeyboardEvent, id: string) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(id);
      requestAnimationFrame(() => focusLink(id, "first"));
    } else if (e.key === "Escape") setOpen(null);
  };
  const onPanelKey = (e: React.KeyboardEvent, id: string) => {
    if (e.key === "ArrowDown") { e.preventDefault(); focusLink(id, 1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); focusLink(id, -1); }
    else if (e.key === "Home") { e.preventDefault(); focusLink(id, "first"); }
    else if (e.key === "End") { e.preventDefault(); focusLink(id, "last"); }
    else if (e.key === "Escape") { setOpen(null); triggers.current[id]?.focus(); }
  };

  const itemClass = (active: boolean) =>
    cn(
      "relative flex h-full items-center gap-1.5 px-5 py-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-white/90 hover:text-white",
      "after:absolute after:inset-x-5 after:bottom-0 after:h-[3px] after:origin-left after:rounded-t after:bg-accent after:transition-transform after:duration-300",
      active ? "text-white after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100",
    );

  return (
    <>
      <header className="z-40 border-b border-line bg-background max-lg:sticky max-lg:top-0 print:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 lg:py-4">
          <Link href="/" aria-label={`${branding.name} home`}>
            <Logo variant="full" className="h-11 w-auto sm:h-12 lg:h-14" priority />
          </Link>
          <div className="flex items-center gap-1 sm:gap-3">
            <button type="button" onClick={() => setSearch(true)} aria-haspopup="dialog" className={topAction}>
              <Search aria-hidden className="h-5 w-5" />
              <span className="max-sm:sr-only">Search</span>
            </button>
            <Link href="/login" className={cn(topAction, "max-lg:hidden")}>
              <UserRound aria-hidden className="h-5 w-5" />
              Login
            </Link>
            <Link href="/signup" className={buttonStyles({ className: "max-lg:hidden" })}>
              Create account
            </Link>
            <button type="button" onClick={() => setDrawer(true)} aria-label="Open menu" aria-haspopup="dialog" className="rounded-md p-2 text-primary hover:bg-muted lg:hidden">
              <Menu aria-hidden className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <nav aria-label="Primary" className="sticky top-0 z-40 hidden bg-brand-800 text-white shadow-md lg:block print:hidden">
        <ul className="mx-auto flex max-w-7xl items-stretch px-5">
          {siteNav.map((item, i) => (
            <li
              key={item.id}
              className={cn("relative", i > 0 && "before:absolute before:left-0 before:top-1/2 before:h-5 before:w-px before:-translate-y-1/2 before:bg-accent/60")}
              onMouseEnter={() => item.children && setOpen(item.id)}
              onMouseLeave={() => item.children && setOpen(null)}
              onBlur={(e) => {
                if (item.children && !e.currentTarget.contains(e.relatedTarget as Node)) setOpen(null);
              }}
            >
              {item.children ? (
                <>
                  <button
                    type="button"
                    ref={(el) => { triggers.current[item.id] = el; }}
                    aria-expanded={open === item.id}
                    aria-controls={`menu-${item.id}`}
                    onClick={() => setOpen(open === item.id ? null : item.id)}
                    onKeyDown={(e) => onTriggerKey(e, item.id)}
                    className={itemClass(isActive(item) || open === item.id)}
                  >
                    {item.label}
                    <ChevronDown aria-hidden className={cn("h-3.5 w-3.5 transition-transform", open === item.id && "rotate-180")} />
                  </button>
                  {open === item.id && (
                    <ul
                      id={`menu-${item.id}`}
                      ref={(el) => { panels.current[item.id] = el; }}
                      onKeyDown={(e) => onPanelKey(e, item.id)}
                      className="rise absolute left-0 top-full z-50 w-80 border-t-[3px] border-accent bg-surface py-2 text-foreground shadow-lg"
                    >
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link href={c.href} onClick={() => setOpen(null)} className="block px-5 py-2.5 hover:bg-brand-50 focus-visible:bg-brand-50">
                            <span className="block text-sm font-semibold normal-case tracking-normal text-primary">{c.label}</span>
                            {c.description && <span className="block text-xs normal-case tracking-normal text-subtle">{c.description}</span>}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link href={item.href!} aria-current={item.href === pathname ? "page" : undefined} className={itemClass(isActive(item))}>
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <MobileMenu open={drawer} onClose={() => setDrawer(false)} />
      <SearchOverlay open={search} onClose={() => setSearch(false)} />
    </>
  );
}
