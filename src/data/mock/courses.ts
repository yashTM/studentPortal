// DEMO DATA: invented courses, instructors and timetable slots.
import type { Course } from "@/types/student";

export const MIN_CREDITS = 12;
export const MAX_CREDITS = 20;

export const courses: Course[] = [
  {
    id: "cs101", code: "CS101", title: "Programming Fundamentals", credits: 4, department: "Computer Science",
    kind: "Core", instructor: "Dr. Meera Iyer",
    slots: [
      { day: "Mon", start: "09:00", end: "10:30", room: "B-204" },
      { day: "Wed", start: "09:00", end: "10:30", room: "B-204" },
    ],
  },
  {
    id: "ma101", code: "MA101", title: "Calculus I", credits: 4, department: "Mathematics",
    kind: "Core", instructor: "Prof. Rohan Nair",
    slots: [
      { day: "Tue", start: "09:00", end: "10:30", room: "A-101" },
      { day: "Thu", start: "09:00", end: "10:30", room: "A-101" },
    ],
  },
  {
    id: "cs102", code: "CS102", title: "Introduction to Computing Systems", credits: 3, department: "Computer Science",
    kind: "Core", instructor: "Dr. Sana Qureshi",
    slots: [
      { day: "Mon", start: "11:00", end: "12:30", room: "B-110" },
      { day: "Fri", start: "11:00", end: "12:30", room: "B-110" },
    ],
  },
  {
    id: "en101", code: "EN101", title: "Academic Writing", credits: 2, department: "Humanities",
    kind: "Core", instructor: "Ms. Priya Menon",
    slots: [{ day: "Wed", start: "11:00", end: "13:00", room: "C-005" }],
  },
  {
    id: "st101", code: "ST101", title: "Statistics for Data Science", credits: 3, department: "Mathematics",
    kind: "Core", instructor: "Dr. Arjun Rao",
    slots: [
      { day: "Tue", start: "11:00", end: "12:30", room: "A-205" },
      { day: "Thu", start: "11:00", end: "12:30", room: "A-205" },
    ],
  },
  {
    id: "ds110", code: "DS110", title: "Data Literacy", credits: 3, department: "Computer Science",
    kind: "Elective", instructor: "Dr. Kavya Pillai",
    slots: [
      { day: "Mon", start: "09:00", end: "10:30", room: "B-301" },
      { day: "Fri", start: "14:00", end: "15:30", room: "B-301" },
    ],
  },
  {
    id: "ph101", code: "PH101", title: "Introduction to Philosophy", credits: 2, department: "Humanities",
    kind: "Elective", instructor: "Prof. Imran Sheikh",
    slots: [{ day: "Wed", start: "14:00", end: "15:30", room: "C-102" }],
  },
  {
    id: "ec101", code: "EC101", title: "Principles of Economics", credits: 3, department: "Business",
    kind: "Elective", instructor: "Dr. Neha Kapoor",
    slots: [
      { day: "Tue", start: "14:00", end: "15:30", room: "D-210" },
      { day: "Thu", start: "14:00", end: "15:30", room: "D-210" },
    ],
  },
  {
    id: "de101", code: "DE101", title: "Design Thinking", credits: 2, department: "Design",
    kind: "Elective", instructor: "Ms. Ritu Bansal",
    slots: [{ day: "Fri", start: "09:00", end: "11:00", room: "Studio 2" }],
  },
  {
    id: "cs120", code: "CS120", title: "Web Development Basics", credits: 3, department: "Computer Science",
    kind: "Elective", instructor: "Mr. Dev Malhotra",
    slots: [
      { day: "Mon", start: "14:00", end: "15:30", room: "Lab 3" },
      { day: "Wed", start: "14:00", end: "15:30", room: "Lab 3" },
    ],
  },
  {
    id: "lg101", code: "LG101", title: "Communication Skills Lab", credits: 1, department: "Humanities",
    kind: "Elective", instructor: "Ms. Priya Menon",
    slots: [{ day: "Fri", start: "15:30", end: "17:00", room: "C-005" }],
  },
  {
    id: "fa101", code: "FA101", title: "Introduction to Music", credits: 2, department: "Arts",
    kind: "Elective", instructor: "Mr. Samuel Dias",
    slots: [{ day: "Thu", start: "15:30", end: "17:00", room: "Arts Hall" }],
  },
];

/** Core courses are pre-assigned until the student submits their own selection. */
export const defaultCourseIds = courses.filter((c) => c.kind === "Core").map((c) => c.id);
