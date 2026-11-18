/** Stylised campus map drawn in SVG. No external map or API key. */
export default function MapPlaceholder() {
  return (
    <figure className="overflow-hidden rounded-lg border border-line bg-surface">
      <svg viewBox="0 0 600 340" role="img" aria-label="Stylised campus map placeholder" className="block w-full">
        <rect width="600" height="340" fill="var(--brand-50)" />
        <g fill="var(--brand-100)">
          <rect x="30" y="30" width="150" height="90" rx="8" />
          <rect x="230" y="26" width="130" height="70" rx="8" />
          <rect x="420" y="40" width="150" height="110" rx="8" />
          <rect x="40" y="190" width="120" height="110" rx="8" />
          <rect x="400" y="210" width="170" height="90" rx="8" />
        </g>
        <path d="M0 160 H600 M290 0 V340" stroke="#fff" strokeWidth="18" />
        <path d="M0 160 H600 M290 0 V340" stroke="var(--line-strong)" strokeWidth="1.5" strokeDasharray="8 8" />
        <g fill="var(--success)" opacity=".35">
          <ellipse cx="215" cy="240" rx="60" ry="38" />
          <ellipse cx="335" cy="262" rx="40" ry="26" />
        </g>
        <g transform="translate(290 138)">
          <path d="M0 0c-14-18-22-28-22-40a22 22 0 0144 0c0 12-8 22-22 40z" fill="var(--brand-800)" />
          <circle cx="0" cy="-40" r="8" fill="var(--accent-400)" />
        </g>
        <text x="326" y="106" fontSize="15" fontWeight="700" fill="var(--brand-800)">Horizon University</text>
      </svg>
      <figcaption className="border-t border-line px-4 py-2.5 text-xs text-subtle">Campus map (demo). A real map would appear here.</figcaption>
    </figure>
  );
}
