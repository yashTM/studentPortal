import { baseProfile } from "@/data/mock/student";
import { intakeSemesterLabel } from "./intake";
import { useProfileSeed } from "./studentData";

/** Synchronous identity used by the ID card widgets, receipts and statements. */
export function useStudentIdentity() {
  const p = { ...baseProfile, ...useProfileSeed() };
  return {
    name: `${p.firstName} ${p.lastName}`.trim(),
    studentId: p.studentId,
    program: p.program,
    intakeLabel: intakeSemesterLabel(p.intake, p.semester),
  };
}
