"use client";

import { TriangleAlert } from "lucide-react";
import { getAttendance } from "@/services/student";
import { useActiveCourses } from "@/lib/studentData";
import { useAsync } from "@/lib/useAsync";
import { percent } from "@/lib/format";
import AsyncView from "@/components/shared/AsyncView";
import ProgressBar from "@/components/shared/ProgressBar";
import ProgressRing from "@/components/shared/ProgressRing";
import { EmptyState } from "@/components/shared/States";
import PageHeader from "@/components/shared/PageHeader";
import { Badge } from "@/components/portal/ui";

// NOTE: Attendance stays a separate tab for now. It is planned to merge with the Academic Calendar
// later; reuse lib/dates.ts and lib/courses.ts for shared logic instead of duplicating it.
export const ATTENDANCE_MIN = 75;

export default function Attendance() {
  const { state, retry } = useAsync(getAttendance);
  const { courses } = useActiveCourses();

  return (
    <>
      <PageHeader title="Attendance" description={`You need at least ${ATTENDANCE_MIN}% attendance in each course to sit examinations.`} />
      <AsyncView state={state} retry={retry} label="Loading attendance">
        {(records) => {
          const rows = courses.flatMap((c) => {
            const r = records.find((x) => x.courseId === c.id);
            return r ? [{ course: c, ...r, pct: percent(r.attended, r.held) }] : [];
          });
          if (rows.length === 0) return <EmptyState art="list" title="No attendance records" text="Attendance appears once your classes begin." />;
          const low = rows.filter((r) => r.pct < ATTENDANCE_MIN);
          const overall = percent(rows.reduce((n, r) => n + r.attended, 0), rows.reduce((n, r) => n + r.held, 0));
          return (
            <div className="space-y-8">
              {low.length > 0 && (
                <div role="alert" className="flex items-start gap-3 rounded-md border border-danger/30 bg-danger-bg px-4 py-3 text-sm text-danger-fg">
                  <TriangleAlert aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
                  <p><span className="font-semibold">Low attendance in {low.map((r) => r.course.code).join(", ")}.</span> Attend upcoming classes to get back above {ATTENDANCE_MIN}%.</p>
                </div>
              )}

              <section aria-label="Overall attendance" className="flex items-center gap-6 rounded-lg border border-line bg-surface p-6">
                <ProgressRing value={overall} max={100} label="Overall attendance" size={96} stroke={9} tone={overall < ATTENDANCE_MIN ? "red" : "green"}>{overall}%</ProgressRing>
                <div>
                  <p className="eyebrow">Overall attendance</p>
                  <p className="mt-1 font-heading text-3xl font-semibold text-primary">{overall}%</p>
                  <p className="text-[13px] text-subtle">Minimum required: {ATTENDANCE_MIN}%</p>
                </div>
              </section>

              <section aria-labelledby="by-course">
                <h2 id="by-course" className="mb-3">By course</h2>
                <ul className="divide-y divide-line rounded-lg border border-line bg-surface">
                  {rows.map((r) => (
                    <li key={r.courseId} className="flex flex-wrap items-center gap-x-5 gap-y-3 px-5 py-4">
                      <ProgressRing value={r.pct} max={100} label={`${r.course.code} attendance`} size={52} stroke={6} tone={r.pct < ATTENDANCE_MIN ? "red" : "green"}>{""}</ProgressRing>
                      <div className="min-w-0 flex-1 basis-48">
                        <p className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-[13px] font-semibold text-primary">{r.course.code}</span>
                          {r.pct < ATTENDANCE_MIN ? <Badge tone="red">Low</Badge> : <Badge tone="green">On track</Badge>}
                        </p>
                        <p className="truncate text-sm font-semibold">{r.course.title}</p>
                        <p className="tnum text-[13px] text-subtle">{r.attended} of {r.held} classes attended</p>
                      </div>
                      <div className="w-full basis-full sm:w-48 sm:basis-48">
                        <p className="tnum mb-1.5 text-right text-lg font-bold text-foreground">{r.pct}%</p>
                        <ProgressBar value={r.pct} max={100} label={`${r.course.code} attendance`} tone={r.pct < ATTENDANCE_MIN ? "red" : "green"} marker={ATTENDANCE_MIN} />
                        <p className="mt-1 text-right text-[11px] text-subtle">Minimum {ATTENDANCE_MIN}%</p>
                      </div>
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
