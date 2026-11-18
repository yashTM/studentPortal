import type { Metadata } from "next";
import EnrollmentSummaryPage from "@/components/student/EnrollmentSummaryPage";

export const metadata: Metadata = { title: "Enrollment Summary" };

export default function Page() {
  return <EnrollmentSummaryPage />;
}
