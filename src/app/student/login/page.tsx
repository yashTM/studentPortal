import type { Metadata } from "next";
import Link from "next/link";
import StudentAuthLayout from "@/components/student/StudentAuthLayout";
import StudentLogin from "@/components/student/StudentLogin";

export const metadata: Metadata = { title: "Student sign in" };

export default function StudentLoginPage() {
  return (
    <StudentAuthLayout>
      <h1 className="text-[2rem]">Welcome back</h1>
      <p className="mb-7 mt-2 text-subtle">Sign in to the Student Portal with your Student ID.</p>
      <StudentLogin />
      <p className="mt-6 text-sm text-subtle">
        Not enrolled yet?{" "}
        <Link href="/login" className="font-semibold text-primary underline underline-offset-4">
          Go to the applicant portal
        </Link>
      </p>
    </StudentAuthLayout>
  );
}
