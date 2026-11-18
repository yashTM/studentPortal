"use client";

import Link from "next/link";
import { getCourses } from "@/services/student";
import { totalCredits } from "@/lib/courses";
import { studentData } from "@/lib/studentData";
import { useAsync } from "@/lib/useAsync";
import AsyncView from "@/components/shared/AsyncView";
import { Badge } from "@/components/portal/ui";
import DataTable from "@/components/ui/DataTable";

/** Submitted course selection (formerly the Academic Plan tab). Render only after submission. */
export default function RegisteredCourses() {
  const { state, retry } = useAsync(getCourses);
  const { value } = studentData.useStore();
  const submitted = value.submittedPlan;
  if (!submitted) return null;

  return (
    <AsyncView state={state} retry={retry} label="Loading your registered courses">
      {(all) => {
        const plan = all.filter((c) => submitted.includes(c.id));
        return (
          <div>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <h3 className="text-xl">Semester 1, Fall 2027</h3>
              <Badge tone="green">Confirmed (demo)</Badge>
              <p className="tnum text-sm text-subtle">{plan.length} courses · {totalCredits(plan)} credits</p>
            </div>
            <DataTable
              caption="Registered courses"
              rows={plan}
              rowKey={(c) => c.id}
              columns={[
                { key: "course", header: "Course", render: (c) => `${c.code}: ${c.title}` },
                { key: "instructor", header: "Instructor", render: (c) => <span className="text-subtle">{c.instructor}</span> },
                { key: "slots", header: "Schedule", render: (c) => <span className="text-subtle">{c.slots.map((s) => `${s.day} ${s.start}`).join(", ")}</span> },
                { key: "credits", header: "Credits", align: "right", render: (c) => c.credits },
              ]}
            />
            <Link href="/student/courses" className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">Change selection</Link>
          </div>
        );
      }}
    </AsyncView>
  );
}
