"use client";

import { useHash } from "@/lib/useHash";
import PageHeader from "@/components/shared/PageHeader";
import Tabs from "@/components/shared/Tabs";
import Credentials from "./Credentials";
import DocumentVault from "./DocumentVault";

const tabs = [
  { id: "documents", label: "Document Vault" },
  { id: "credentials", label: "Academic Credentials" },
];

export default function DocumentsAndCredentials() {
  // Old /student/credentials links redirect to /student/documents#credentials.
  const hash = useHash();
  const initial = hash === "credentials" ? "credentials" : "documents";

  return (
    <>
      <PageHeader title="Documents and Credentials" description="Your uploaded documents and the academic credentials issued to you." />
      <Tabs key={initial} tabs={tabs} defaultId={initial} label="Documents and credentials" variant="segmented">
        {(active) => (active === "credentials" ? <Credentials /> : <DocumentVault />)}
      </Tabs>
    </>
  );
}
