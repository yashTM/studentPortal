"use client";

import EnrollmentSummaryCard from "@/components/enrollment/EnrollmentSummaryCard";
import PageHeader from "@/components/shared/PageHeader";

export default function EnrollmentSummaryPage() {
  return (
    <>
      <div className="print:hidden">
        <PageHeader title="Enrollment Summary" description="A record of your completed enrollment. You can print it or save it as a PDF." />
      </div>
      <div className="max-w-3xl">
        <EnrollmentSummaryCard printable />
      </div>
    </>
  );
}
