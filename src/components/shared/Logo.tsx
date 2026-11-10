import Image from "next/image";
import { branding, type LogoVariant } from "@/config/branding";

/**
 * Horizon University logo. `variant`: full lockup, compact (no tagline) or shield mark.
 * `tone="light"` is for navy or photo surfaces. Never recolour or stretch it: set a height only.
 */
export default function Logo({
  variant = "compact",
  tone = "dark",
  className = "h-9 w-auto",
  priority = false,
}: {
  variant?: LogoVariant;
  tone?: "dark" | "light";
  className?: string;
  priority?: boolean;
}) {
  const l = branding.logos[variant];
  return (
    <Image
      src={tone === "light" ? l.lightSrc : l.src}
      alt={variant === "mark" ? `${branding.name} crest` : branding.name}
      width={l.width}
      height={l.height}
      className={className}
      loading={priority ? "eager" : undefined}
      fetchPriority={priority ? "high" : undefined}
    />
  );
}
