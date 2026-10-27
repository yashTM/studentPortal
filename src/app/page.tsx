import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 px-4 text-center dark:from-zinc-900 dark:to-zinc-950">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Student Portal
      </h1>
      <p className="mt-4 max-w-md text-zinc-600 dark:text-zinc-400">
        Access your courses, grades and campus updates in one place.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/login"
          className="rounded-full bg-indigo-600 px-8 py-3 font-medium text-white transition hover:bg-indigo-700"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="rounded-full border border-indigo-600 px-8 py-3 font-medium text-indigo-600 transition hover:bg-indigo-50 dark:hover:bg-zinc-800"
        >
          Create Account
        </Link>
      </div>
    </main>
  );
}
