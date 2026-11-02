import Link from "next/link";
import AuthCard from "@/components/AuthCard";
import DemoForm from "@/components/DemoForm";
import Field from "@/components/Field";

export default function LoginPage() {
  return (
    <AuthCard title="Welcome back" subtitle="Log in to continue your admission application">
      <DemoForm mode="login" submitLabel="Log in">
        <Field label="Email" name="email" type="email" placeholder="you@school.edu" />
        <Field label="Password" name="password" type="password" placeholder="••••••••" />
      </DemoForm>
      <p className="mt-6 text-center text-sm text-zinc-500">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-primary hover:underline">
          Create account
        </Link>
      </p>
    </AuthCard>
  );
}
