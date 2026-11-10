import { CircleAlert } from "lucide-react";
import Button from "@/components/ui/Button";
import Illustration, { type ArtName } from "@/components/ui/Illustration";

/** Skeleton placeholder for content that is loading (replaces spinners). */
export function LoadingState({ label = "Loading" }: { label?: string }) {
  return (
    <div role="status" aria-live="polite" className="space-y-3 py-2">
      <span className="sr-only">{label}...</span>
      <div className="skeleton h-6 w-1/3" />
      <div className="skeleton h-4 w-2/3" />
      <div className="grid gap-3 pt-2 sm:grid-cols-3">
        <div className="skeleton h-24" />
        <div className="skeleton h-24" />
        <div className="skeleton h-24" />
      </div>
    </div>
  );
}

export function EmptyState({
  title,
  text,
  art = "list",
  children,
}: {
  title: string;
  text: string;
  art?: ArtName;
  children?: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-dashed border-line-strong bg-surface/60 px-6 py-8 text-center">
      <div className="flex justify-center"><Illustration name={art} /></div>
      <h3 className="mt-3 text-lg">{title}</h3>
      <p className="mx-auto mt-1 max-w-md text-sm text-subtle">{text}</p>
      {children && <div className="mt-4 text-sm font-semibold">{children}</div>}
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="rounded-lg border border-danger/30 bg-danger-bg p-5">
      <div role="alert" className="flex items-start gap-3">
        <CircleAlert aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-danger" />
        <div>
          <h3 className="text-base text-danger-fg">We could not load this section</h3>
          <p className="mt-1 text-sm text-danger-fg/90">{message}</p>
        </div>
      </div>
      <Button variant="secondary" size="sm" onClick={onRetry} className="mt-4">
        Try again
      </Button>
    </div>
  );
}
