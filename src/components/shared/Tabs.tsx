"use client";

import { useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export type TabDef = { id: string; label: string };

/**
 * Accessible tabs: roving tabindex, Arrow/Home/End keys, automatic activation.
 * `underline` has an animated indicator; `segmented` is a compact pill control.
 */
export default function Tabs({
  tabs,
  defaultId,
  value,
  onValueChange,
  label,
  variant = "underline",
  children,
}: {
  tabs: TabDef[];
  defaultId?: string;
  /** Controlled mode (for example route-driven tabs). */
  value?: string;
  onValueChange?: (id: string) => void;
  label: string;
  variant?: "underline" | "segmented";
  children: (activeId: string) => React.ReactNode;
}) {
  const base = useId();
  const [inner, setInner] = useState(defaultId ?? tabs[0].id);
  const active = value ?? inner;
  const setActive = (id: string) => {
    onValueChange?.(id);
    if (value === undefined) setInner(id);
  };
  const buttons = useRef<Record<string, HTMLButtonElement | null>>({});

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    const last = tabs.length - 1;
    const target =
      e.key === "ArrowRight" ? (index === last ? 0 : index + 1)
      : e.key === "ArrowLeft" ? (index === 0 ? last : index - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : -1;
    if (target < 0) return;
    e.preventDefault();
    const id = tabs[target].id;
    setActive(id);
    buttons.current[id]?.focus();
  };

  const segmented = variant === "segmented";

  return (
    <div>
      <div
        role="tablist"
        aria-label={label}
        className={cn(
          "flex gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          segmented ? "w-fit max-w-full rounded-full border border-line bg-muted p-1" : "border-b border-line",
        )}
      >
        {tabs.map((t, i) => {
          const selected = t.id === active;
          return (
            <button
              key={t.id}
              ref={(el) => {
                buttons.current[t.id] = el;
              }}
              type="button"
              role="tab"
              id={`${base}-tab-${t.id}`}
              aria-selected={selected}
              aria-controls={`${base}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(t.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                "relative whitespace-nowrap text-sm font-semibold",
                segmented
                  ? cn("rounded-full px-4 py-1.5", selected ? "bg-surface text-primary shadow-sm" : "text-subtle hover:text-primary")
                  : cn(
                      "px-4 py-3 after:absolute after:inset-x-3 after:-bottom-px after:h-0.5 after:origin-left after:rounded-full after:bg-primary after:transition-transform after:duration-300",
                      selected ? "text-primary after:scale-x-100" : "text-subtle after:scale-x-0 hover:text-primary hover:after:scale-x-50 hover:after:bg-line-strong",
                    ),
              )}
            >
              {t.label}
            </button>
          );
        })}
      </div>
      <div role="tabpanel" id={`${base}-panel`} aria-labelledby={`${base}-tab-${active}`} tabIndex={0} className="rise pt-6 outline-offset-4" key={active}>
        {children(active)}
      </div>
    </div>
  );
}
