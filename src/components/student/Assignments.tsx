"use client";

import { Check } from "lucide-react";
import { getAssignments } from "@/services/student";
import { DEMO_TODAY } from "@/data/mock/student";
import { cn } from "@/lib/cn";
import { daysBetween, dueLabel } from "@/lib/dates";
import { studentData, useActiveCourses } from "@/lib/studentData";
import { useAsync } from "@/lib/useAsync";
import { formatDate } from "@/lib/format";
import AsyncView from "@/components/shared/AsyncView";
import { EmptyState } from "@/components/shared/States";
import PageHeader from "@/components/shared/PageHeader";
import Tabs from "@/components/shared/Tabs";
import { Badge } from "@/components/portal/ui";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import type { Assignment } from "@/types/student";

type TabId = "upcoming" | "pending" | "submitted" | "graded";

const emptyText: Record<TabId, [string, string]> = {
  upcoming: ["Nothing upcoming", "You have no assignments or assessments that are due soon."],
  pending: ["No pending work", "Everything for your current courses has been submitted."],
  submitted: ["Nothing submitted yet", "Assignments you submit will wait here for grading."],
  graded: ["No grades yet", "Graded assignments will appear here."],
};

/** Urgency drives the left edge colour and the due label tone. */
function urgency(a: Assignment) {
  if (a.status !== "pending") return "none" as const;
  const d = daysBetween(DEMO_TODAY, a.due);
  return d < 0 ? ("overdue" as const) : d <= 2 ? ("soon" as const) : ("later" as const);
}
const edge = { none: "border-l-line", later: "border-l-brand-200", soon: "border-l-warning", overdue: "border-l-danger" } as const;
const dueTone = { none: "", later: "text-secondary", soon: "text-warning-fg", overdue: "text-danger-fg" } as const;

export default function Assignments() {
  const { state, retry } = useAsync(getAssignments);
  const { courses } = useActiveCourses();
  const { value } = studentData.useStore();
  const toast = useToast();

  const submit = (a: Assignment) => {
    studentData.update((d) => ({ ...d, submittedAssignments: [...d.submittedAssignments, a.id] }));
    toast(`"${a.title}" marked as submitted (demo)`);
  };

  return (
    <>
      <PageHeader title="Assignments and assessments" description="Track what is coming up, what is pending and what has been graded." />
      <AsyncView state={state} retry={retry} label="Loading assignments">
        {(all) => {
          const items: Assignment[] = all
            .filter((a) => courses.some((c) => c.id === a.courseId))
            .map((a) => ({
              ...a,
              status: a.status === "pending" && value.submittedAssignments.includes(a.id) ? ("submitted" as const) : a.status,
            }))
            .sort((a, b) => a.due.localeCompare(b.due));

          const byTab: Record<TabId, Assignment[]> = {
            upcoming: items.filter((a) => a.status === "pending" && a.due >= DEMO_TODAY),
            pending: items.filter((a) => a.status === "pending"),
            submitted: items.filter((a) => a.status === "submitted"),
            graded: items.filter((a) => a.status === "graded"),
          };
          const tabs = (Object.keys(byTab) as TabId[]).map((id) => ({
            id,
            label: `${id[0].toUpperCase()}${id.slice(1)} (${byTab[id].length})`,
          }));

          return (
            <Tabs tabs={tabs} defaultId="upcoming" label="Assignment status">
              {(active) => {
                const list = byTab[active as TabId];
                if (list.length === 0) {
                  const [title, text] = emptyText[active as TabId];
                  return <EmptyState art="list" title={title} text={text} />;
                }
                return (
                  <ul className="divide-y divide-line overflow-hidden rounded-lg border border-line bg-surface">
                    {list.map((a) => {
                      const course = courses.find((c) => c.id === a.courseId)!;
                      const u = urgency(a);
                      return (
                        <li key={a.id} className={cn("flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-l-4 px-5 py-4", edge[u])}>
                          <div className="min-w-0 text-sm">
                            <p className="font-semibold text-foreground">{a.title}</p>
                            <p className="mt-0.5 text-[13px] text-subtle">
                              <span className="font-mono font-semibold text-n-600">{course.code}</span> · {formatDate(a.due)}
                              {a.status === "pending" && <span className={cn("ml-2 font-semibold", dueTone[u])}>{dueLabel(a.due, DEMO_TODAY)}</span>}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            {a.status === "graded" && <span className="tnum text-sm font-bold text-foreground">{a.score} / {a.maxScore}</span>}
                            <Badge tone={a.status === "graded" ? "green" : a.status === "submitted" ? "blue" : u === "overdue" ? "red" : "amber"}>
                              {a.status[0].toUpperCase() + a.status.slice(1)}
                            </Badge>
                            {a.status === "pending" && (
                              <Button variant="secondary" size="sm" onClick={() => submit(a)} icon={<Check aria-hidden className="h-3.5 w-3.5" />}>
                                Mark submitted<span className="sr-only">: {a.title}</span>
                              </Button>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                );
              }}
            </Tabs>
          );
        }}
      </AsyncView>
    </>
  );
}
