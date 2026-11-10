import type { Metadata } from "next";
import LearningServices from "@/components/student/LearningServices";

export const metadata: Metadata = { title: "Learning services" };

export default function Page() {
  return <LearningServices />;
}
