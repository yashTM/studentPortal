import type { Metadata } from "next";
import DocumentsAndCredentials from "@/components/student/DocumentsAndCredentials";

export const metadata: Metadata = { title: "Documents and Credentials" };

export default function Page() {
  return <DocumentsAndCredentials />;
}
