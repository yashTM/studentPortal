// Simple inline glyphs (lucide v1 has no brand icons). Links are placeholders.
const glyphs: Record<string, React.ReactNode> = {
  Facebook: <path d="M14 8h2.5V5H14c-2 0-3.5 1.5-3.5 3.5V11H8v3h2.5v6h3v-6H16l.5-3h-3V8.8c0-.5.2-.8.5-.8z" />,
  X: <path d="M5 5l14 14M19 5L5 19" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />,
  LinkedIn: <path d="M6.5 9.5v8M6.5 6.5v.01M10.5 17.5v-8m0 3c0-2 1.2-3 2.7-3s2.3 1 2.3 3v5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />,
  Instagram: (
    <>
      <rect x="5" y="5" width="14" height="14" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="3.2" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="16.2" cy="7.8" r="0.9" />
    </>
  ),
  YouTube: (
    <>
      <rect x="4" y="7" width="16" height="10" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M10.5 9.8v4.4l3.8-2.2z" />
    </>
  ),
};

export default function SocialIcons() {
  return (
    <ul className="flex gap-2">
      {Object.entries(glyphs).map(([name, glyph]) => (
        <li key={name}>
          <a href="#" aria-label={`${name} (placeholder link)`} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white/85 hover:border-accent hover:text-accent">
            <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">{glyph}</svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
