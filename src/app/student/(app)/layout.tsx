import StudentShell from "@/components/student/StudentShell";

export default function StudentAppLayout({ children }: { children: React.ReactNode }) {
  return <StudentShell>{children}</StudentShell>;
}
