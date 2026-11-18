"use client";

import { Briefcase, ExternalLink, GraduationCap, Laptop, Library, LifeBuoy, Mail, type LucideIcon } from "lucide-react";
import { getLearningServices } from "@/services/student";
import { useAsync } from "@/lib/useAsync";
import AsyncView from "@/components/shared/AsyncView";
import PageHeader from "@/components/shared/PageHeader";
import { useToast } from "@/components/ui/Toast";

const icons: Record<string, LucideIcon> = {
  lms: GraduationCap,
  library: Library,
  mail: Mail,
  labs: Laptop,
  support: LifeBuoy,
  career: Briefcase,
};

export default function LearningServices() {
  const { state, retry } = useAsync(getLearningServices);
  const toast = useToast();

  return (
    <>
      <PageHeader title="Learning services" description="Jump to the tools you use to learn. Links are placeholders in this demo." />
      <AsyncView state={state} retry={retry} label="Loading services">
        {(list) => (
          <ul className="grid divide-y divide-line overflow-hidden rounded-lg border border-line bg-surface sm:grid-cols-2 sm:divide-y-0">
            {list.map((s, i) => {
              const Icon = icons[s.id] ?? GraduationCap;
              return (
                <li key={s.id} className={i % 2 === 0 ? "sm:border-r sm:border-line" : ""}>
                  <button
                    type="button"
                    onClick={() => toast(`${s.title} is a placeholder link and is not connected yet.`, "info")}
                    className="group flex w-full items-start gap-4 border-line p-5 text-left hover:bg-brand-50/60 sm:border-b"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-brand-50 text-primary">
                      <Icon aria-hidden className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold text-primary">{s.title}<span className="sr-only">. Placeholder link</span></span>
                      <span className="mt-0.5 block text-[13px] text-subtle">{s.text}</span>
                    </span>
                    <ExternalLink aria-hidden className="mt-1 h-4 w-4 shrink-0 text-n-400 group-hover:text-primary" />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </AsyncView>
    </>
  );
}
