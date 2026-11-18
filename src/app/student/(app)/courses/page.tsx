import type { Metadata } from "next";
import CourseRegistration from "@/components/student/CourseRegistration";

export const metadata: Metadata = { title: "Course Registration" };

export default function Page() {
  return <CourseRegistration />;
}
