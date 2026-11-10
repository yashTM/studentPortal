import {
  BookOpenCheck,
  CalendarDays,
  ClipboardCheck,
  ClipboardList,
  FolderOpen,
  GraduationCap,
  LayoutDashboard,
  UserRound,
  Wallet,
  type LucideIcon,
} from "lucide-react";

// Single source of truth for Student Portal navigation. The desktop sidebar, mobile drawer and
// dashboard quick links all read this list; change labels, order, groups or routes here only.
export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  description: string;
  group: "Student" | "Academics" | "Finance" | "Resources";
  /** Route prefix that keeps this item active on sub-routes (for example tab routes). */
  matchPrefix?: string;
};

export const studentNav: NavItem[] = [
  { href: "/student", label: "Dashboard", icon: LayoutDashboard, description: "Your overview", group: "Student" },
  { href: "/student/profile", label: "Profile and status", icon: UserRound, description: "Status and personal details", group: "Student" },
  { href: "/student/documents", label: "Documents and Credentials", icon: FolderOpen, description: "Document vault and academic credentials", group: "Student" },
  { href: "/student/courses", label: "Course Registration", icon: BookOpenCheck, description: "Choose and submit your courses", group: "Academics" },
  { href: "/student/calendar", label: "Academic Calendar", icon: CalendarDays, description: "Key dates, timetable and registered courses", group: "Academics" },
  { href: "/student/attendance", label: "Attendance", icon: ClipboardCheck, description: "Attendance by course", group: "Academics" },
  { href: "/student/assignments", label: "Assignments", icon: ClipboardList, description: "Upcoming work and grades", group: "Academics" },
  { href: "/student/fees/ledger", label: "Fee Payments", icon: Wallet, description: "Fee ledger, receipts and demo payments", group: "Finance", matchPrefix: "/student/fees" },
  { href: "/student/learning", label: "Learning services", icon: GraduationCap, description: "LMS, library and support links", group: "Resources" },
];

export const navGroups: NavItem["group"][] = ["Student", "Academics", "Finance", "Resources"];

export const isNavActive = (n: NavItem, pathname: string) =>
  pathname === n.href || (!!n.matchPrefix && pathname.startsWith(n.matchPrefix));

/** Titles for routes that are not in the nav but still live in the portal. */
export const extraTitles: Record<string, string> = {
  "/student/id-card": "Digital student ID",
  "/student/enrollment-summary": "Enrollment Summary",
};
