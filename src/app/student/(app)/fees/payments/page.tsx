import type { Metadata } from "next";
import FeesModule from "@/components/student/fees/FeesModule";

export const metadata: Metadata = { title: "Make a Payment | Fee Payments" };

export default function Page() {
  return <FeesModule tab="payments" />;
}
