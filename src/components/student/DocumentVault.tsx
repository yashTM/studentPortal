"use client";

import { FileImage, FileText, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { getDocuments } from "@/services/student";
import { studentData } from "@/lib/studentData";
import { useAsync } from "@/lib/useAsync";
import { formatDate } from "@/lib/format";
import AsyncView from "@/components/shared/AsyncView";
import { Dropzone } from "@/components/shared/FormControls";
import { EmptyState } from "@/components/shared/States";
import { Badge } from "@/components/portal/ui";
import { useToast } from "@/components/ui/Toast";

const MAX_MB = 5;
const ACCEPTED = ["application/pdf", "image/jpeg", "image/png"];
const DEMO_UPLOAD_DATE = "2027-08-23";

export default function DocumentVault() {
  const { state, retry } = useAsync(getDocuments);
  const { value } = studentData.useStore();
  const toast = useToast();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const onFile = (file: File) => {
    if (!ACCEPTED.includes(file.type)) return setError("Only PDF, JPG or PNG files are accepted.");
    if (file.size > MAX_MB * 1024 * 1024) return setError(`File must be smaller than ${MAX_MB} MB.`);
    setError("");
    setUploading(true);
    window.setTimeout(() => {
      setUploading(false);
      studentData.update((d) => ({
        ...d,
        uploads: [...d.uploads, { id: `u${d.uploads.length + 1}-${file.name}`, name: file.name, date: DEMO_UPLOAD_DATE }],
      }));
      toast(`${file.name} added (demo upload)`);
    }, 800);
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <section aria-labelledby="vault-h">
        <h2 id="vault-h" className="mb-1">Your documents</h2>
        <p className="mb-4 text-sm text-subtle">Keep your important documents in one place. Uploads are simulated and stay on this device.</p>
        <AsyncView state={state} retry={retry} label="Loading documents">
          {(docs) => {
            const all = [
              ...docs,
              ...value.uploads.map((u) => ({ id: u.id, name: u.name, category: "Uploaded this session", date: u.date })),
            ];
            return all.length === 0 ? (
              <EmptyState art="folder" title="No documents yet" text="Upload a document to see it here." />
            ) : (
              <ul className="divide-y divide-line rounded-lg border border-line bg-surface">
                {all.map((d) => {
                  const Icon = /\.(png|jpe?g)$/i.test(d.name) ? FileImage : FileText;
                  return (
                    <li key={d.id} className="flex items-center gap-4 px-4 py-3.5">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand-50 text-primary">
                        <Icon aria-hidden className="h-5 w-5" strokeWidth={1.75} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">{d.name}</p>
                        <p className="text-xs text-subtle">{d.category} · {formatDate(d.date)}</p>
                      </div>
                      <Badge tone="grey">Stored (demo)</Badge>
                    </li>
                  );
                })}
              </ul>
            );
          }}
        </AsyncView>
      </section>

      <div className="space-y-6">
        <section aria-labelledby="upload-h">
          <h2 id="upload-h" className="mb-3 text-lg">Upload a document</h2>
          <Dropzone label="Drag a file here" hint={`PDF, JPG or PNG up to ${MAX_MB} MB`} accept=".pdf,.jpg,.jpeg,.png" onFile={onFile} />
          {uploading && <p role="status" className="mt-2 text-sm text-subtle">Uploading...</p>}
          {error && <p role="alert" className="mt-2 text-sm font-medium text-danger-fg">{error}</p>}
        </section>

        <section aria-labelledby="dl-h" className="rounded-lg border border-dashed border-line-strong p-5">
          <div className="flex items-start justify-between gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-muted text-n-500"><ShieldCheck aria-hidden className="h-5 w-5" strokeWidth={1.75} /></span>
            <Badge tone="amber">Integration coming soon</Badge>
          </div>
          <h2 id="dl-h" className="mt-3 text-lg">DigiLocker</h2>
          <p className="mt-1 text-sm text-subtle">Fetch verified documents straight from your DigiLocker account. This is a placeholder and makes no connection.</p>
          <button type="button" disabled className="mt-4 min-h-9 cursor-not-allowed rounded-full border border-line px-4 text-[13px] font-semibold text-n-400">
            Connect DigiLocker
          </button>
        </section>
      </div>
    </div>
  );
}
