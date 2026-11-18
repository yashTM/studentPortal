"use client";

import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Built on the native <dialog> element: showModal() gives a real focus trap, inert background
 * and Escape-to-close without extra code. `variant="drawer"` slides in from the left;
 * `tone="dark"` is for the navy navigation drawer.
 */
export default function Dialog({
  open,
  onClose,
  label,
  variant = "modal",
  tone = "light",
  children,
  className,
}: {
  open: boolean;
  onClose: () => void;
  label: string;
  variant?: "modal" | "drawer";
  tone?: "light" | "dark";
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-label={label}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose(); // backdrop click
      }}
      className={cn(
        variant === "drawer"
          ? cn("drawer m-0 h-dvh max-h-none w-[min(20rem,88vw)] p-0 shadow-lg", tone === "dark" ? "bg-brand-900 text-white" : "bg-surface")
          : "modal m-auto w-[min(40rem,calc(100vw-2rem))] rounded-lg bg-surface p-0 shadow-lg",
        className,
      )}
    >
      {open && (
        <div className={cn("relative overflow-y-auto", variant === "drawer" ? "h-dvh" : "max-h-[calc(100dvh-2rem)]")}>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className={cn(
              "absolute right-3 top-3 z-10 rounded-full p-1.5 print:hidden",
              tone === "dark" ? "text-white/70 hover:bg-white/10 hover:text-white" : "text-subtle hover:bg-muted hover:text-foreground",
            )}
          >
            <X aria-hidden className="h-5 w-5" />
          </button>
          {children}
        </div>
      )}
    </dialog>
  );
}
