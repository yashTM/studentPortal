import Link from "next/link";
import AuthCard from "@/components/AuthCard";
import Field from "@/components/Field";

export default function LoginPage() {
  return (
    <AuthCard title="Welcome back" subtitle="Login to your student account">
      <form className="space-y-4">
        <Field label="Email" name="email" type="email" placeholder="you@school.edu" />
        <Field label="Password" name="password" type="password" placeholder="••••••••" />
        <button
          type="submit"
          className="w-full rounded-lg bg-indigo-600 py-2.5 font-medium text-white hover:bg-indigo-700"
        >
          Login
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-zinc-500">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-indigo-600 hover:underline">
          Create account
        </Link>
      </p>
    </AuthCard>
  );
}
