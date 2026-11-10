// Inline, theme-coloured empty-state illustrations built on the Horizon shield and laurel motif.
// Colours come from the design tokens so they follow the brand palette.
export type ArtName = "folder" | "calendar" | "award" | "list" | "search";

const navy = "var(--brand-800)";
const soft = "var(--brand-100)";
const gold = "var(--accent-400)";

/** Shield outline with a pair of laurel sprigs; the glyph for each state sits inside. */
function Crest({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* laurels */}
      <g stroke={gold} strokeWidth="2.2" strokeLinecap="round" fill="none">
        <path d="M22 62c-6-10-6-24 0-36" />
        <path d="M98 62c6-10 6-24 0-36" />
      </g>
      <g fill={gold}>
        <ellipse cx="19" cy="34" rx="2.4" ry="4.2" transform="rotate(-24 19 34)" />
        <ellipse cx="17" cy="46" rx="2.4" ry="4.2" transform="rotate(-10 17 46)" />
        <ellipse cx="19" cy="58" rx="2.4" ry="4.2" transform="rotate(8 19 58)" />
        <ellipse cx="101" cy="34" rx="2.4" ry="4.2" transform="rotate(24 101 34)" />
        <ellipse cx="103" cy="46" rx="2.4" ry="4.2" transform="rotate(10 103 46)" />
        <ellipse cx="101" cy="58" rx="2.4" ry="4.2" transform="rotate(-8 101 58)" />
      </g>
      {/* shield */}
      <path d="M60 6l28 8v22c0 20-12 33-28 40-16-7-28-20-28-40V14z" fill={soft} stroke={navy} strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M60 11l23 6.5V36c0 16.5-9.5 27.5-23 34-13.5-6.5-23-17.5-23-34V17.5z" fill="none" stroke={gold} strokeWidth="1.4" />
      {children}
    </>
  );
}

export default function Illustration({ name }: { name: ArtName }) {
  const common = { viewBox: "0 0 120 84", className: "h-20 w-auto", "aria-hidden": true, fill: "none" } as const;
  const stroke = { stroke: navy, strokeWidth: 2.4, strokeLinecap: "round", strokeLinejoin: "round" } as const;

  return (
    <svg {...common}>
      <Crest>
        {name === "folder" && (
          <g {...stroke} fill="#fff">
            <path d="M46 30h10l3 4h15v20H46z" />
            <path d="M46 38h28" />
          </g>
        )}
        {name === "calendar" && (
          <g {...stroke} fill="#fff">
            <rect x="46" y="30" width="28" height="24" rx="3" />
            <path d="M46 38h28M53 27v6M67 27v6" />
            <circle cx="60" cy="46" r="2.4" fill={gold} stroke="none" />
          </g>
        )}
        {name === "award" && (
          <g {...stroke} fill="#fff">
            <circle cx="60" cy="40" r="10" />
            <path d="M55 49l-3 9 8-3 8 3-3-9" />
            <circle cx="60" cy="40" r="4.5" fill={gold} stroke="none" />
          </g>
        )}
        {name === "search" && (
          <g {...stroke} fill="#fff">
            <circle cx="57" cy="39" r="9" />
            <path d="M64 46l8 8" strokeWidth="3.4" />
          </g>
        )}
        {name === "list" && (
          <g {...stroke}>
            <path d="M48 34h24M48 42h24M48 50h14" />
            <path d="M66 52l3 3 6-7" stroke={gold} strokeWidth="2.6" />
          </g>
        )}
      </Crest>
    </svg>
  );
}
