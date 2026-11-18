import { DEMO_STUDENT } from "@/config/demo-credentials";
import { feeTotal } from "@/data/enrollment";
import type { State } from "./applicantStore";
import { onboardingProgress } from "./enrollmentWizard";
import { intakeSemesterLabel, parseSemesterOption } from "./intake";

/** Non-sensitive snapshot of a completed (demo) enrollment. Never includes the password. */
export type EnrollmentSummary = {
  name: string;
  studentId: string;
  program: string;
  intake: string;
  feeStatus: string;
  amountPaid: number;
  totalFees: number;
  onboardingDone: number;
  onboardingTotal: number;
  enrolledOn: string | null;
};

export function buildEnrollmentSummary(s: State): EnrollmentSummary | null {
  const w = s.wizard;
  if (!w.completed) return null;
  const { done, total } = onboardingProgress(w);
  return {
    name: w.data.legalName || s.account?.name || "Student",
    studentId: DEMO_STUDENT.studentId,
    program: s.application.program.program || "Not selected",
    intake: (() => {
      const p = parseSemesterOption(w.data.semester);
      return p ? intakeSemesterLabel(p.intake, p.semester) : s.application.program.intake || "Fall 2027";
    })(),
    feeStatus:
      w.payment.option === "installment"
        ? "Installment plan: first installment paid"
        : "Paid in full",
    amountPaid: w.payment.amount,
    totalFees: feeTotal,
    onboardingDone: done,
    onboardingTotal: total,
    enrolledOn: w.completedAt ?? null,
  };
}
