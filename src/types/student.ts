export type Day = "Mon" | "Tue" | "Wed" | "Thu" | "Fri";

export type Slot = { day: Day; start: string; end: string; room: string };

export type Course = {
  id: string;
  code: string;
  title: string;
  credits: number;
  department: string;
  kind: "Core" | "Elective";
  instructor: string;
  slots: Slot[];
};

export type StudentProfile = {
  studentId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  program: string;
  intake: string;
  semester: string;
  campus: string;
};

export type ProfileSeed = Partial<StudentProfile>;

export type StatusStep = { label: string; date: string; state: "done" | "current" | "upcoming" };

export type CalendarEvent = {
  id: string;
  title: string;
  date: string; // ISO yyyy-mm-dd
  endDate?: string;
  type: "Academic" | "Exam" | "Fee" | "Holiday";
};

export type AttendanceRecord = { courseId: string; held: number; attended: number };

export type Assignment = {
  id: string;
  courseId: string;
  title: string;
  due: string; // ISO date
  status: "pending" | "submitted" | "graded";
  score?: number;
  maxScore: number;
};

export type Credential = {
  id: string;
  title: string;
  issuer: string;
  status: "issued" | "not-issued";
  date?: string;
  note: string;
};

export type VaultDocument = { id: string; name: string; category: string; date: string };

export type LearningService = { id: string; title: string; text: string };
