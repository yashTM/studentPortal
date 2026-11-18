import type { Metadata } from "next";
import FeesModule from "@/components/student/fees/FeesModule";

export const metadata: Metadata = { title: "Fee Ledger | Fee Payments" };

export default function Page() {
  return <FeesModule tab="ledger" />;
}
