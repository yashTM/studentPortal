import type { Metadata } from "next";
import ProfileModule from "@/components/student/ProfileModule";

export const metadata: Metadata = { title: "Profile and status" };

export default function Page() {
  return <ProfileModule />;
}
