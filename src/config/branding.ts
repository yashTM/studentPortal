// Single place to swap branding. Replace the files in public/branding/ (same names) and update the
// sizes below if the proportions change. Source originals live in design/branding-source/.
import { campusBlur } from "./brandingBlur";

export const branding = {
  name: "Horizon University",
  portalName: "Student Portal",
  tagline: "Learn. Grow. Belong.",
  taglineSpaced: "Learn • Grow • Belong",
  logos: {
    /** Full lockup: shield, wordmark and tagline. */
    full: { src: "/branding/logo-full.png", lightSrc: "/branding/logo-full-light.png", width: 1200, height: 348 },
    /** Shield plus wordmark, no tagline: for headers and sidebars. */
    compact: { src: "/branding/logo-compact.png", lightSrc: "/branding/logo-compact-light.png", width: 1000, height: 301 },
    /** Shield only: favicon, watermarks, compact spots. */
    mark: { src: "/branding/logo-mark.png", lightSrc: "/branding/logo-mark.png", width: 480, height: 528 },
  },
  campus: {
    hero: { src: "/branding/campus-hero.webp", width: 1600, height: 1055, blur: campusBlur.hero },
    banner: { src: "/branding/campus-banner.webp", width: 1600, height: 556, blur: campusBlur.banner },
    portrait: { src: "/branding/campus-portrait.webp", width: 1000, height: 1032, blur: campusBlur.portrait },
    alt: "Students walking across the sunlit Horizon University quad toward the main entrance",
  },
} as const;

export type LogoVariant = keyof typeof branding.logos;
export type CampusVariant = keyof Omit<typeof branding.campus, "alt">;
