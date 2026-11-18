/** Shared formatting for the intake/semester label (ID card, Enrollment Summary, fee schedule, receipts). */

/** "Semester 1 (Fall 2027)" -> { semester: "Semester 1", intake: "Fall 2027" } */
export function parseSemesterOption(option: string | undefined) {
  const m = /^(.*?)\s*\((.*)\)$/.exec(option ?? "");
  return m ? { semester: m[1], intake: m[2] } : null;
}

/** "Fall 2027 / Semester 1" */
export const intakeSemesterLabel = (intake: string, semester: string) => `${intake} / ${semester}`;
