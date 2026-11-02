import Link from "next/link";
import AuthCard from "@/components/AuthCard";
import DemoForm from "@/components/DemoForm";
import Field from "@/components/Field";

export default function SignupPage() {
  return (
    <AuthCard title="Create account" subtitle="Create an applicant account to start your application">
      <DemoForm mode="signup" submitLabel="Create account">
        <Field label="Full name" name="name" placeholder="Your name" />
        <Field label="Email" name="email" type="email" placeholder="you@school.edu" />
        <Field label="Password" name="password" type="password" placeholder="••••••••" />
        <Field label="Confirm password" name="confirmPassword" type="password" placeholder="••••••••" />
      </DemoForm>
      <p className="mt-6 text-center text-sm text-zinc-500">
        Already have an account?{" "}
        <Link href="/login" className="text-primary hover:underline">
          Log in
        </Link>
      </p>
    </AuthCard>
  );
}
