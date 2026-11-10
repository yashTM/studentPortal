"use client";

import { Award, Hourglass } from "lucide-react";
import { getCredentials } from "@/services/student";
import { useAsync } from "@/lib/useAsync";
import { formatDate } from "@/lib/format";
import AsyncView from "@/components/shared/AsyncView";
import { EmptyState } from "@/components/shared/States";
import { Badge } from "@/components/portal/ui";

export default function Credentials() {
  const { state, retry } = useAsync(getCredentials);

  return (
    <>
      <p className="mb-6 text-sm text-subtle">Certificates and transcripts issued to you. Entries are samples.</p>
      <AsyncView state={state} retry={retry} label="Loading credentials">
        {(list) => {
          const issued = list.filter((c) => c.status === "issued");
          const pending = list.filter((c) => c.status === "not-issued");
          return (
            <div className="space-y-10">
              <section aria-labelledby="issued">
                <h2 id="issued" className="mb-4">Issued</h2>
                {issued.length === 0 ? (
                  <EmptyState art="award" title="Nothing issued yet" text="Credentials appear here once they are issued." />
                ) : (
                  <ul className="grid gap-5 sm:grid-cols-2">
                    {issued.map((c) => (
                      <li key={c.id}>
                        {/* Certificate-style: double rule with a gold seal */}
                        <div className="relative h-full rounded-lg border-2 border-brand-800 p-1.5">
                          <div className="flex h-full flex-col rounded-md border border-accent/70 bg-gold-50/60 px-5 pb-5 pt-6">
                            <span className="absolute -top-4 left-6 flex h-9 w-9 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-sm">
                              <Award aria-hidden className="h-5 w-5" strokeWidth={1.75} />
                            </span>
                            <p className="eyebrow">Certificate</p>
                            <h3 className="mt-1 text-xl">{c.title}</h3>
                            <p className="mt-auto pt-4 text-[13px] text-n-600">{c.issuer} · Issued {c.date && formatDate(c.date)}</p>
                            <div className="mt-2"><Badge tone="green">Issued</Badge></div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
              <section aria-labelledby="pending">
                <h2 id="pending" className="mb-4">Not yet issued</h2>
                <ul className="grid gap-5 sm:grid-cols-2">
                  {pending.map((c) => (
                    <li key={c.id} className="rounded-lg border border-dashed border-line-strong p-5">
                      <div className="flex items-center justify-between gap-2">
                        <Hourglass aria-hidden className="h-5 w-5 text-n-400" strokeWidth={1.75} />
                        <Badge tone="grey">Not yet issued</Badge>
                      </div>
                      <h3 className="mt-3 text-lg text-n-700">{c.title}</h3>
                      <p className="mt-1 text-[13px] text-subtle">{c.note}</p>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          );
        }}
      </AsyncView>
    </>
  );
}
