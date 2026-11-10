"use client";

import { CircleAlert, FileUp } from "lucide-react";
import { useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const inputClass =
  "mt-1.5 block h-11 w-full rounded-md border bg-surface px-3.5 text-[15px] text-foreground placeholder:text-n-400 outline-none transition-colors hover:border-n-400 focus:border-brand-400 focus:ring-4 focus:ring-brand-100 read-only:bg-muted read-only:text-n-600 disabled:opacity-50";

type Common = {
  label: string;
  error?: string;
  hint?: string;
};

function Wrapper({
  id,
  label,
  error,
  hint,
  children,
}: Common & { id: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="text-[13px] font-semibold text-n-700">
        {label}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-subtle">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-start gap-1.5 text-xs font-medium text-danger-fg">
          <CircleAlert aria-hidden className="mt-px h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

const describedBy = (id: string, error?: string, hint?: string) =>
  error ? `${id}-error` : hint ? `${id}-hint` : undefined;

export function TextField({
  label,
  error,
  hint,
  value,
  onChange,
  type = "text",
  ...rest
}: Common & {
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  readOnly?: boolean;
}) {
  const id = useId();
  return (
    <Wrapper id={id} label={label} error={error} hint={hint}>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={describedBy(id, error, hint)}
        className={cn(inputClass, error ? "border-danger" : "border-line-strong")}
        {...rest}
      />
    </Wrapper>
  );
}

export function TextAreaField({
  label,
  error,
  hint,
  value,
  onChange,
  rows = 5,
}: Common & { value: string; onChange: (value: string) => void; rows?: number }) {
  const id = useId();
  return (
    <Wrapper id={id} label={label} error={error} hint={hint}>
      <textarea
        id={id}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={describedBy(id, error, hint)}
        className={cn(inputClass, "h-auto py-2.5", error ? "border-danger" : "border-line-strong")}
      />
    </Wrapper>
  );
}

export function SelectField({
  label,
  error,
  hint,
  value,
  onChange,
  options,
}: Common & {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  const id = useId();
  return (
    <Wrapper id={id} label={label} error={error} hint={hint}>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={describedBy(id, error, hint)}
        className={cn(inputClass, "appearance-auto pr-8", error ? "border-danger" : "border-line-strong")}
      >
        <option value="">Select...</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </Wrapper>
  );
}

export function CheckField({
  label,
  checked,
  onChange,
  error,
}: {
  label: React.ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
}) {
  const id = useId();
  return (
    <div className="text-sm">
      <div className="flex items-start gap-3">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-0.5 h-[18px] w-[18px] shrink-0 rounded accent-[var(--primary)]"
        />
        <label htmlFor={id} className="leading-snug text-n-700">
          {label}
        </label>
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1 flex items-start gap-1.5 pl-[30px] text-xs font-medium text-danger-fg">
          <CircleAlert aria-hidden className="mt-px h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

/** Selectable card built on a real radio input (keyboard and screen-reader friendly). */
export function OptionCard({
  name,
  checked,
  onChange,
  title,
  description,
  aside,
  disabled,
}: {
  name: string;
  checked: boolean;
  onChange: () => void;
  title: string;
  description?: string;
  aside?: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-start gap-3 rounded-lg border bg-surface p-4 transition-colors has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-brand-100",
        checked ? "border-primary bg-brand-50" : "border-line-strong hover:border-n-400",
        disabled && "cursor-not-allowed opacity-60",
      )}
    >
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="mt-1 h-4 w-4 shrink-0 accent-[var(--primary)]"
      />
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-foreground">{title}</span>
        {description && <span className="mt-0.5 block text-[13px] text-subtle">{description}</span>}
      </span>
      {aside && <span className="tnum shrink-0 text-sm font-bold text-primary">{aside}</span>}
    </label>
  );
}

export function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex items-center gap-3 text-sm font-medium"
    >
      <span className={cn("relative h-6 w-11 rounded-full transition-colors", checked ? "bg-primary" : "bg-n-300")}>
        <span className={cn("absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all", checked ? "left-[22px]" : "left-0.5")} />
      </span>
      {label}
    </button>
  );
}

/** Drag-and-drop file zone. Click, keyboard (Enter/Space) and drop all work. */
export function Dropzone({
  label,
  hint,
  accept,
  onFile,
}: {
  label: string;
  hint: string;
  accept: string;
  onFile: (file: File) => void;
}) {
  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        const f = e.dataTransfer.files?.[0];
        if (f) onFile(f);
      }}
      className={cn(
        "flex flex-col items-center rounded-lg border-2 border-dashed px-4 py-7 text-center transition-colors",
        over ? "border-primary bg-brand-50" : "border-line-strong bg-surface",
      )}
    >
      <FileUp aria-hidden className="h-7 w-7 text-brand-400" />
      <p className="mt-2 text-sm font-semibold text-foreground">{label}</p>
      <p className="mt-0.5 text-xs text-subtle">{hint}</p>
      <label
        htmlFor={id}
        className="mt-3 inline-flex min-h-8 cursor-pointer items-center rounded-full border border-line-strong px-3.5 text-[13px] font-semibold text-primary hover:bg-brand-50 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-brand-100"
      >
        Choose file
        <input
          id={id}
          ref={input}
          type="file"
          accept={accept}
          className="sr-only"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onFile(f);
            e.target.value = "";
          }}
        />
      </label>
    </div>
  );
}
