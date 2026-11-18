import Link from "next/link";

/** Applicant sign-in / sign-up card. Rendered inside the public site layout (header and footer provide the branding). */
export default function AuthCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 items-center justify-center bg-muted px-4 py-14">
      <div className="w-full max-w-md rounded-lg border border-line bg-surface p-8 shadow-lg">
        <Link href="/" className="text-sm font-semibold text-primary underline-offset-4 hover:underline">
          &larr; Back to Home
        </Link>
        <span aria-hidden className="mt-5 block h-[3px] w-10 rounded bg-accent" />
        <h1 className="mt-3 text-3xl">{title}</h1>
        <p className="mb-6 mt-1 text-sm text-subtle">{subtitle}</p>
        {children}
      </div>
    </div>
  );
}
