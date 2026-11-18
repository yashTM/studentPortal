import { cn } from "@/lib/cn";

export type Column<T> = {
  key: string;
  header: string;
  align?: "left" | "right";
  render: (row: T) => React.ReactNode;
};

/**
 * Responsive table: a real <table> from `md` up (sticky header, row hover, dividers) and
 * stacked label/value rows on small screens.
 */
export default function DataTable<T>({
  caption,
  columns,
  rows,
  rowKey,
  footer,
}: {
  caption: string;
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  footer?: React.ReactNode;
}) {
  return (
    <>
      <div className="hidden max-h-[40rem] overflow-auto rounded-lg border border-line md:block">
        <table className="w-full text-sm">
          <caption className="sr-only">{caption}</caption>
          <thead className="sticky top-0 bg-muted">
            <tr>
              {columns.map((c) => (
                <th key={c.key} scope="col" className={cn("px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-n-600", c.align === "right" ? "text-right" : "text-left")}>
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line bg-surface">
            {rows.map((r) => (
              <tr key={rowKey(r)} className="hover:bg-brand-50/60">
                {columns.map((c, i) => {
                  const Cell = i === 0 ? "th" : "td";
                  return (
                    <Cell key={c.key} scope={i === 0 ? "row" : undefined} className={cn("px-4 py-3 align-top", i === 0 ? "text-left font-semibold" : "font-normal", c.align === "right" && "text-right")}>
                      {c.render(r)}
                    </Cell>
                  );
                })}
              </tr>
            ))}
          </tbody>
          {footer && <tfoot className="border-t border-line-strong bg-muted/60">{footer}</tfoot>}
        </table>
      </div>

      <ul className="divide-y divide-line rounded-lg border border-line bg-surface md:hidden" aria-label={caption}>
        {rows.map((r) => (
          <li key={rowKey(r)} className="space-y-1 p-4 text-sm">
            {columns.map((c, i) => (
              <div key={c.key} className={cn("flex justify-between gap-4", i === 0 && "font-semibold")}>
                {i > 0 && <span className="text-subtle">{c.header}</span>}
                <span className={cn(i === 0 ? "" : "text-right")}>{c.render(r)}</span>
              </div>
            ))}
          </li>
        ))}
      </ul>
    </>
  );
}
