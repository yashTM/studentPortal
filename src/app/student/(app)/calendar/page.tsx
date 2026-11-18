import type { Metadata } from "next";
import CalendarModule from "@/components/student/CalendarModule";

export const metadata: Metadata = { title: "Academic Calendar" };

export default function Page() {
  return <CalendarModule />;
}
