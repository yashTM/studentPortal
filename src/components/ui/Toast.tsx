"use client";

import { CircleAlert, CircleCheck, Info, X } from "lucide-react";
import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type Tone = "success" | "info" | "danger";
type ToastItem = { id: number; title: string; tone: Tone };

const ToastContext = createContext<(title: string, tone?: Tone) => void>(() => {});

/** Lightweight toasts for mock saves. Announced politely to screen readers; auto-dismiss after 4s. */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const nextId = useRef(1);

  const dismiss = useCallback((id: number) => setItems((l) => l.filter((t) => t.id !== id)), []);
  const push = useCallback(
    (title: string, tone: Tone = "success") => {
      const id = nextId.current++;
      setItems((l) => [...l.slice(-2), { id, title, tone }]);
      window.setTimeout(() => dismiss(id), 4000);
    },
    [dismiss],
  );
  const value = useMemo(() => push, [push]);

  const icon = { success: CircleCheck, info: Info, danger: CircleAlert };
  const color = { success: "text-success", info: "text-info", danger: "text-danger" };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex flex-col items-center gap-2 px-4 sm:items-end sm:px-6 print:hidden"
      >
        {items.map((t) => {
          const Icon = icon[t.tone];
          return (
            <div
              key={t.id}
              className="toast pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-lg border border-line bg-surface p-3.5 text-sm shadow-lg"
            >
              <Icon aria-hidden className={cn("mt-0.5 h-5 w-5 shrink-0", color[t.tone])} />
              <p className="flex-1 font-medium text-foreground">{t.title}</p>
              <button type="button" onClick={() => dismiss(t.id)} aria-label="Dismiss notification" className="text-subtle hover:text-foreground">
                <X aria-hidden className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
