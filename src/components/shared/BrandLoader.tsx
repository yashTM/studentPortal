import Logo from "./Logo";

/** Full-area branded loading state: the shield with a gentle pulse. */
export default function BrandLoader({ label = "Loading" }: { label?: string }) {
  return (
    <div role="status" aria-live="polite" className="flex flex-1 flex-col items-center justify-center gap-4 p-10">
      <span className="motion-safe:animate-pulse"><Logo variant="mark" className="h-16 w-auto" /></span>
      <p className="text-sm text-subtle">{label}...</p>
    </div>
  );
}
