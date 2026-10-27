import Link from "next/link";
import AuthCard from "@/components/AuthCard";
import Field from "@/components/Field";

export default function SignupPage() {
  return (
    <AuthCard title="Create account" subtitle="Sign up to join the Student Portal">
      <form className="space-y-4">
        <Field label="Full name" name="name" placeholder="Your name" />
        <Field label="Email" name="email" type="email" placeholder="you@school.edu" />
        <Field label="Password" name="password" type="password" placeholder="••••••••" />
        <Field label="Confirm password" name="confirmPassword" type="password" placeholder="••••••••" />
        <button
          type="submit"
          className="w-full rounded-lg bg-indigo-600 py-2.5 font-medium text-white hover:bg-indigo-700"
        >
          Sign up
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-zinc-500">
        Already have an account?{" "}
        <Link href="/login" className="text-indigo-600 hover:underline">
          Login
        </Link>
      </p>
    </AuthCard>
  );
}
