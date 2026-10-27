import Link from "next/link";

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
    <main className="flex flex-1 items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 px-4 py-12 dark:from-zinc-900 dark:to-zinc-950">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl dark:bg-zinc-900">
        <Link href="/" className="text-sm text-indigo-600 hover:underline">
          ← Back to home
        </Link>
        <h1 className="mt-4 text-2xl font-bold">{title}</h1>
        <p className="mt-1 mb-6 text-sm text-zinc-500">{subtitle}</p>
        {children}
      </div>
    </main>
  );
}
