import { StudentSessionProvider } from "@/lib/studentSession";

export default function StudentRootLayout({ children }: { children: React.ReactNode }) {
  return <StudentSessionProvider>{children}</StudentSessionProvider>;
}
