import type { Metadata } from "next";
import Attendance from "@/components/student/Attendance";

export const metadata: Metadata = { title: "Attendance" };

export default function Page() {
  return <Attendance />;
}
