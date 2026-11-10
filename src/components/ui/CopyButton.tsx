"use client";

import { Copy } from "lucide-react";
import { useToast } from "./Toast";

/** Icon button that copies a value and confirms with a toast. */
export default function CopyButton({ value, label }: { value: string; label: string }) {
  const toast = useToast();
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      toast(`${label} copied`);
    } catch {
      toast(`Could not copy ${label.toLowerCase()}. Select it and copy manually.`, "danger");
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy ${label.toLowerCase()} ${value}`}
      className="inline-flex h-6 w-6 items-center justify-center rounded text-n-400 hover:bg-brand-50 hover:text-primary print:hidden"
    >
      <Copy aria-hidden className="h-3.5 w-3.5" />
    </button>
  );
}
