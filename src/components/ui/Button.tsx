import { Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap select-none disabled:cursor-not-allowed disabled:opacity-45 aria-busy:cursor-progress";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground shadow-sm hover:bg-brand-700 active:bg-brand-900",
  secondary: "border border-line-strong bg-surface text-primary hover:border-brand-400 hover:bg-brand-50",
  ghost: "text-primary hover:bg-brand-50",
  danger: "bg-danger text-white hover:opacity-90",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-8 px-3.5 py-1 text-[13px]",
  md: "min-h-10 px-5 py-2 text-sm",
  lg: "min-h-12 px-7 py-3 text-base",
};

/** Class string for anything that should look like a button (links included). */
export const buttonStyles = ({
  variant = "primary",
  size = "md",
  className,
}: { variant?: ButtonVariant; size?: ButtonSize; className?: string } = {}) =>
  cn(base, variants[variant], sizes[size], className);

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  className,
  children,
  disabled,
  type = "button",
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={buttonStyles({ variant, size, className })}
      {...rest}
    >
      {loading ? <Loader2 aria-hidden className="h-4 w-4 animate-spin" /> : icon}
      {children}
    </button>
  );
}
