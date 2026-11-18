import type { Metadata } from "next";
import DigitalIdCard from "@/components/student/DigitalIdCard";

export const metadata: Metadata = { title: "Digital student ID" };

export default function Page() {
  return <DigitalIdCard />;
}
