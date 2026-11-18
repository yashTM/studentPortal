// Session-only DEMO state for the Student Portal (profile edits, course selection, uploads).
// It lives in sessionStorage and is lost when the tab closes; nothing is sent anywhere.
import { useMemo } from "react";
import { courses, defaultCourseIds } from "@/data/mock/courses";
import type { Course, StudentProfile } from "@/types/student";
import { useApplicant } from "./applicantStore";
import { parseSemesterOption } from "./intake";
import { createSessionStore } from "./sessionStore";

export type StudentData = {
  profile: Partial<StudentProfile>;
  selectedCourseIds: string[];
  submittedPlan: string[] | null;
  submittedAt: string | null;
  uploads: { id: string; name: string; date: string }[];
  submittedAssignments: string[];
};

export const studentData = createSessionStore<StudentData>("student-portal-data", {
  profile: {},
  selectedCourseIds: [],
  submittedPlan: null,
  submittedAt: null,
  uploads: [],
  submittedAssignments: [],
});

/** Profile fields we can pre-fill from the admission application. */
export function useProfileSeed() {
  const { account, application, wizard } = useApplicant();
  const { value } = studentData.useStore();
  return useMemo(() => {
    const [firstName = "", ...rest] = (account?.name ?? "").split(" ");
    const a = application;
    const seed: Partial<StudentProfile> = {
      firstName: a.personal.firstName || firstName || undefined,
      lastName: a.personal.lastName || rest.join(" ") || undefined,
      email: a.contact.email || account?.email || undefined,
      phone: a.contact.phone || undefined,
      dob: a.personal.dob || undefined,
      address: a.contact.address || undefined,
      city: a.contact.city || undefined,
      state: a.contact.state || undefined,
      pincode: a.contact.pincode || undefined,
      program: a.program.program || undefined,
      campus: a.program.campus || undefined,
      intake: parseSemesterOption(wizard.data.semester)?.intake,
      semester: parseSemesterOption(wizard.data.semester)?.semester,
    };
    const defined = Object.fromEntries(Object.entries(seed).filter(([, v]) => v));
    return { ...defined, ...value.profile } as Partial<StudentProfile>;
  }, [account, application, wizard.data.semester, value.profile]);
}

/** Courses the student is currently following: their submitted plan, else the default core set. */
export function useActiveCourses(): { courses: Course[]; isSample: boolean } {
  const { value } = studentData.useStore();
  const ids = value.submittedPlan ?? defaultCourseIds;
  return {
    courses: courses.filter((c) => ids.includes(c.id)),
    isSample: value.submittedPlan === null,
  };
}
