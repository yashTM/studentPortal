import type { Metadata } from "next";
import Assignments from "@/components/student/Assignments";

export const metadata: Metadata = { title: "Assignments" };

export default function Page() {
  return <Assignments />;
}
