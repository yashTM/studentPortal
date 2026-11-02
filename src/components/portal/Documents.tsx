"use client";

import { useState } from "react";
import { dates, requiredDocs } from "@/data/admission";
import { updateState, useApplicant } from "@/lib/applicantStore";
import { Badge, Card } from "./ui";

const MAX_MB = 5;
const ACCEPTED = ["application/pdf", "image/jpeg", "image/png"];

export default function Documents() {
  const s = useApplicant();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const uploaded = requiredDocs.filter((d) => s.documents[d.key]).length;

  const onFile = (key: string, file: File | undefined) => {
    if (!file) return;
    let error = "";
    if (!ACCEPTED.includes(file.type)) error = "Only PDF, JPG or PNG files are accepted.";
    else if (file.size > MAX_MB * 1024 * 1024) error = `File must be smaller than ${MAX_MB} MB.`;
    setErrors((e) => ({ ...e, [key]: error }));
    if (error) return;
    updateState((st) => ({ ...st, documents: { ...st.documents, [key]: file.name } }));
  };

  const remove = (key: string) =>
    updateState((st) => {
      const documents = { ...st.documents };
      delete documents[key];
      return { ...st, documents };
    });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-primary">Documents</h1>
        <p className="mt-1 text-foreground/70">
          {uploaded} of {requiredDocs.length} required documents uploaded · due{" "}
          {dates.documentsDeadline}. PDF, JPG or PNG up to {MAX_MB} MB.
        </p>
      </div>

      <ul className="space-y-4">
        {requiredDocs.map((d) => {
          const file = s.documents[d.key];
          return (
            <li key={d.key}>
              <Card className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="font-semibold">{d.name}</p>
                  <p className="mt-0.5 truncate text-sm text-foreground/60">
                    {file ? `📄 ${file}` : "No file uploaded yet"}
                  </p>
                  {errors[d.key] && (
                    <p className="mt-1 text-sm text-red-600">{errors[d.key]}</p>
                  )}
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  {file ? (
                    <Badge tone={s.submittedAt ? "blue" : "green"}>
                      {s.submittedAt ? "Under review" : "Uploaded"}
                    </Badge>
                  ) : (
                    <Badge tone="red">Action needed</Badge>
                  )}
                  <label className="cursor-pointer rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-white hover:opacity-90">
                    {file ? "Replace" : "Upload"}
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="sr-only"
                      onChange={(e) => {
                        onFile(d.key, e.target.files?.[0]);
                        e.target.value = "";
                      }}
                    />
                  </label>
                  {file && !s.submittedAt && (
                    <button
                      type="button"
                      onClick={() => remove(d.key)}
                      className="text-sm font-semibold text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </Card>
            </li>
          );
        })}
      </ul>
      <p className="text-xs text-foreground/50">
        Demo preview: only the file name is saved in your browser. Files are not uploaded to a server yet.
      </p>
    </div>
  );
}
