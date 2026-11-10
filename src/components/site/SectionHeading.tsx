import { cn } from "@/lib/cn";

/** Section heading with the signature gold tick. `tone="light"` is for navy sections. */
export default function SectionHeading({
  eyebrow,
  title,
  text,
  tone = "dark",
  className,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <span aria-hidden className="mb-3 block h-[3px] w-10 rounded bg-accent" />
      {eyebrow && <p className={cn("eyebrow mb-2", tone === "light" && "!text-accent")}>{eyebrow}</p>}
      <h2 className={cn("text-3xl sm:text-4xl", tone === "light" && "!text-white")}>{title}</h2>
      {text && <p className={cn("mt-3 text-[15px]", tone === "light" ? "text-white/80" : "text-subtle")}>{text}</p>}
    </div>
  );
}
