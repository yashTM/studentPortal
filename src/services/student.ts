// Service layer for the Student Portal.
// Every function is async and currently returns DEMO data after a short delay.
// To connect a backend later, replace the bodies with fetch() calls; the UI does not change.
import { courses } from "@/data/mock/courses";
import {
  assignments,
  attendance,
  baseProfile,
  calendarEvents,
  credentials,
  learningServices,
  statusTimeline,
  vaultDocuments,
} from "@/data/mock/student";
import type { ProfileSeed, StudentProfile } from "@/types/student";

const delay = <T>(value: T, ms = 350) =>
  new Promise<T>((resolve) => setTimeout(() => resolve(value), ms));

export const getStudentProfile = (seed: ProfileSeed = {}): Promise<StudentProfile> =>
  delay({ ...baseProfile, ...seed });

export const getStatusTimeline = () => delay(statusTimeline);
export const getCourses = () => delay(courses);
export const getAttendance = () => delay(attendance);
export const getAssignments = () => delay(assignments);
export const getCalendarEvents = () => delay(calendarEvents);
export const getCredentials = () => delay(credentials);
export const getDocuments = () => delay(vaultDocuments);
export const getLearningServices = () => delay(learningServices);
