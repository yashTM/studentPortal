/** Consistent page header: gold tick, title, one-line description, optional primary action. */
export default function PageHeader({
  title,
  description,
  eyebrow,
  children,
}: {
  title: string;
  description?: string;
  eyebrow?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="rise mb-8 flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        <span aria-hidden className="mb-3 block h-[3px] w-10 rounded bg-accent" />
        {eyebrow && <p className="eyebrow mb-1.5">{eyebrow}</p>}
        <h1>{title}</h1>
        {description && <p className="mt-2 max-w-2xl text-[15px] text-subtle">{description}</p>}
      </div>
      {children}
    </header>
  );
}
