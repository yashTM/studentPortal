"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import SidebarIdCard from "./SidebarIdCard";
import { isNavActive, navGroups, studentNav } from "./nav";

/** Sidebar body for the navy surface: ID widget plus grouped nav. Shared by the desktop sidebar and mobile drawer. */
export default function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="space-y-6">
      <SidebarIdCard onNavigate={onNavigate} />
      {navGroups.map((group) => (
        <div key={group}>
          <p className="eyebrow mb-2 px-3 !text-white/50">{group}</p>
          <ul className="space-y-0.5">
            {studentNav
              .filter((n) => n.group === group)
              .map((n) => {
                const active = isNavActive(n, pathname);
                const Icon = n.icon;
                return (
                  <li key={n.href}>
                    <Link
                      href={n.href}
                      onClick={onNavigate}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative flex items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold",
                        active ? "bg-white/10 text-white" : "text-white/75 hover:bg-white/5 hover:text-white",
                      )}
                    >
                      {active && <span aria-hidden className="absolute inset-y-1.5 left-0 w-[3px] rounded-r bg-accent" />}
                      <Icon aria-hidden strokeWidth={1.75} className={cn("h-[18px] w-[18px] shrink-0", active ? "text-accent" : "text-white/55")} />
                      {n.label}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
      ))}
    </div>
  );
}
