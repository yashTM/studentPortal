"use client";

import Image from "next/image";
import { useState } from "react";
import { branding, type CampusVariant } from "@/config/branding";

/**
 * Campus photo that fills its (relatively positioned) parent. Crops are pre-cut so the old
 * signage is never in frame. Uses a blur placeholder, falls back to a navy gradient if it fails.
 */
export default function CampusImage({
  variant = "hero",
  priority = false,
  sizes = "100vw",
  position = "center",
  alt = branding.campus.alt,
}: {
  variant?: CampusVariant;
  priority?: boolean;
  sizes?: string;
  /** CSS object-position, for example "right center". */
  position?: string;
  alt?: string;
}) {
  const [failed, setFailed] = useState(false);
  const c = branding.campus[variant];

  if (failed) return <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-brand-800 to-brand-600" />;
  return (
    <Image
      src={c.src}
      alt={alt}
      fill
      sizes={sizes}
      loading={priority ? "eager" : undefined}
      fetchPriority={priority ? "high" : undefined}
      placeholder="blur"
      blurDataURL={c.blur}
      className="object-cover"
      style={{ objectPosition: position }}
      onError={() => setFailed(true)}
    />
  );
}
