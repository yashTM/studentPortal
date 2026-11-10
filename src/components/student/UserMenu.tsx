"use client";

import { ChevronDown, FileText, LogOut, UserRound } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/** Top-bar user menu: closes on Escape, outside click or selection. */
export default function UserMenu({
  name,
  studentId,
  onLogout,
}: {
  name: string;
  studentId: string;
  onLogout: () => void;
}) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const item = "flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left text-sm font-medium text-n-700 hover:bg-muted";

  return (
    <div ref={root} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2.5 rounded-full border border-line py-1 pl-1 pr-3 hover:bg-muted"
      >
        <span aria-hidden className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-800 text-xs font-bold text-white">
          {initials}
        </span>
        <span className="hidden text-left leading-tight sm:block">
          <span className="block text-[13px] font-semibold text-primary">{name}</span>
          <span className="block font-mono text-[11px] text-subtle">{studentId}</span>
        </span>
        <ChevronDown aria-hidden className="h-4 w-4 text-subtle" />
      </button>
      {open && (
        <div role="menu" className="rise absolute right-0 z-30 mt-2 w-56 rounded-lg border border-line bg-surface p-1.5 shadow-lg">
          <Link role="menuitem" href="/student/profile" onClick={() => setOpen(false)} className={item}>
            <UserRound aria-hidden className="h-4 w-4 text-n-500" /> Profile and status
          </Link>
          <Link role="menuitem" href="/student/enrollment-summary" onClick={() => setOpen(false)} className={item}>
            <FileText aria-hidden className="h-4 w-4 text-n-500" /> Enrollment Summary
          </Link>
          <div className="my-1 border-t border-line" />
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              onLogout();
            }}
            className={item}
          >
            <LogOut aria-hidden className="h-4 w-4 text-n-500" /> Log out
          </button>
        </div>
      )}
    </div>
  );
}
