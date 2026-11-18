// DEMO DATA: a fictional student record. Nothing here is real or persisted by a server.
import { DEMO_STUDENT } from "@/config/demo-credentials";
import type {
  Assignment,
  AttendanceRecord,
  CalendarEvent,
  Credential,
  LearningService,
  StatusStep,
  StudentProfile,
  VaultDocument,
} from "@/types/student";

/** The portal pretends it is this moment: Monday, first week of classes. */
export const DEMO_TODAY = "2027-08-23";
export const DEMO_TODAY_DAY = "Mon";
export const DEMO_TODAY_MINUTES = 10 * 60;

export const baseProfile: StudentProfile = {
  studentId: DEMO_STUDENT.studentId,
  firstName: "Demo",
  lastName: "Student",
  email: "demo.student@example.edu",
  phone: "+91 98765 43210",
  dob: "2009-04-12",
  address: "12 Example Street",
  city: "Pune",
  state: "Maharashtra",
  pincode: "411001",
  program: "BSc Computer Science",
  intake: "Fall 2027",
  semester: "Semester 1",
  campus: "Main Campus",
};

export const statusTimeline: StatusStep[] = [
  { label: "Application submitted", date: "2026-11-20", state: "done" },
  { label: "Offer of admission", date: "2027-01-10", state: "done" },
  { label: "Offer accepted", date: "2027-02-01", state: "done" },
  { label: "Enrollment confirmed", date: "2027-07-15", state: "done" },
  { label: "Classes begin", date: "2027-08-18", state: "current" },
  { label: "Semester 1 examinations", date: "2027-12-06", state: "upcoming" },
];

export const calendarEvents: CalendarEvent[] = [
  { id: "e1", title: "Classes begin", date: "2027-08-18", type: "Academic" },
  { id: "e2", title: "Add/drop course window closes", date: "2027-09-01", type: "Academic" },
  { id: "e3", title: "Fee installment 2 due", date: "2027-09-15", type: "Fee" },
  { id: "e4", title: "Fee installment 3 due", date: "2027-10-15", type: "Fee" },
  { id: "e5", title: "Mid-semester examinations", date: "2027-10-11", endDate: "2027-10-15", type: "Exam" },
  { id: "e6", title: "Festival break", date: "2027-11-04", endDate: "2027-11-07", type: "Holiday" },
  { id: "e7", title: "Last day of classes", date: "2027-11-30", type: "Academic" },
  { id: "e8", title: "End-semester examinations", date: "2027-12-06", endDate: "2027-12-17", type: "Exam" },
  { id: "e9", title: "Semester ends", date: "2027-12-20", type: "Academic" },
  { id: "e10", title: "Independence Day (university closed)", date: "2027-08-15", type: "Holiday" },
];

export const attendance: AttendanceRecord[] = [
  { courseId: "cs101", held: 8, attended: 8 },
  { courseId: "ma101", held: 8, attended: 7 },
  { courseId: "cs102", held: 8, attended: 5 },
  { courseId: "en101", held: 4, attended: 4 },
  { courseId: "st101", held: 8, attended: 6 },
  { courseId: "ds110", held: 8, attended: 6 },
  { courseId: "ph101", held: 4, attended: 3 },
  { courseId: "ec101", held: 8, attended: 7 },
  { courseId: "de101", held: 4, attended: 4 },
  { courseId: "cs120", held: 8, attended: 5 },
  { courseId: "lg101", held: 4, attended: 4 },
  { courseId: "fa101", held: 4, attended: 3 },
];

export const assignments: Assignment[] = [
  { id: "a1", courseId: "cs101", title: "Lab 1: Variables and control flow", due: "2027-08-20", status: "graded", score: 9, maxScore: 10 },
  { id: "a2", courseId: "ma101", title: "Problem set 1: Limits", due: "2027-08-22", status: "submitted", maxScore: 20 },
  { id: "a3", courseId: "en101", title: "Reflective essay draft", due: "2027-08-21", status: "graded", score: 16, maxScore: 20 },
  { id: "a4", courseId: "cs101", title: "Lab 2: Functions", due: "2027-08-27", status: "pending", maxScore: 10 },
  { id: "a5", courseId: "st101", title: "Quiz 1: Descriptive statistics", due: "2027-08-26", status: "pending", maxScore: 15 },
  { id: "a6", courseId: "cs102", title: "Reading report: Number systems", due: "2027-08-30", status: "pending", maxScore: 10 },
  { id: "a7", courseId: "ma101", title: "Problem set 2: Derivatives", due: "2027-09-03", status: "pending", maxScore: 20 },
  { id: "a8", courseId: "ds110", title: "Dataset critique", due: "2027-09-02", status: "pending", maxScore: 25 },
  { id: "a9", courseId: "ec101", title: "Case note: Supply and demand", due: "2027-09-06", status: "pending", maxScore: 20 },
  { id: "a10", courseId: "cs120", title: "Build a personal page", due: "2027-09-10", status: "pending", maxScore: 30 },
  { id: "a11", courseId: "de101", title: "User interview summary", due: "2027-08-25", status: "pending", maxScore: 15 },
  { id: "a12", courseId: "ph101", title: "Short response: Ethics", due: "2027-08-24", status: "submitted", maxScore: 10 },
];

export const credentials: Credential[] = [
  { id: "c1", title: "Offer of Admission Letter", issuer: "Office of Admissions", status: "issued", date: "2027-01-10", note: "Sample entry" },
  { id: "c2", title: "Enrollment Certificate", issuer: "Registrar", status: "issued", date: "2027-07-15", note: "Sample entry" },
  { id: "c3", title: "Semester 1 Transcript", issuer: "Registrar", status: "not-issued", note: "Issued after Semester 1 results are published." },
  { id: "c4", title: "Bachelor's Degree Certificate", issuer: "Registrar", status: "not-issued", note: "Issued on completion of the program." },
];

export const vaultDocuments: VaultDocument[] = [
  { id: "d1", name: "Offer of admission letter.pdf", category: "Admission", date: "2027-01-10" },
  { id: "d2", name: "Enrollment fee receipt.pdf", category: "Finance", date: "2027-07-14" },
  { id: "d3", name: "12th marksheet.pdf", category: "Academic", date: "2026-11-25" },
];

export const learningServices: LearningService[] = [
  { id: "lms", title: "Learning management system", text: "Course pages, materials and announcements." },
  { id: "library", title: "Digital library", text: "E-books, journals and research databases." },
  { id: "mail", title: "Campus email", text: "Your university mailbox and calendar." },
  { id: "labs", title: "Virtual labs", text: "Remote access to lab software." },
  { id: "support", title: "Student support desk", text: "Advising, counselling and help requests." },
  { id: "career", title: "Career services", text: "Internships, workshops and mentoring." },
];
