"use client";

import { AlertTriangle, Plus, Search, X } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { getCourses } from "@/services/student";
import { MAX_CREDITS, MIN_CREDITS } from "@/data/mock/courses";
import { findClashes, seatsLeft, totalCredits } from "@/lib/courses";
import { cn } from "@/lib/cn";
import { studentData } from "@/lib/studentData";
import { useAsync } from "@/lib/useAsync";
import AsyncView from "@/components/shared/AsyncView";
import PageHeader from "@/components/shared/PageHeader";
import ProgressRing from "@/components/shared/ProgressRing";
import { EmptyState } from "@/components/shared/States";
import { Badge } from "@/components/portal/ui";
import Button from "@/components/ui/Button";
import DataTable from "@/components/ui/DataTable";
import Dialog from "@/components/ui/Dialog";
import { useToast } from "@/components/ui/Toast";
import type { Course } from "@/types/student";

const slotText = (c: Course) => c.slots.map((s) => `${s.day} ${s.start}-${s.end}`).join(", ");
const control =
  "mt-1.5 block h-10 w-full rounded-md border border-line-strong bg-surface px-3 text-sm outline-none hover:border-n-400 focus:border-brand-400 focus:ring-4 focus:ring-brand-100";

function Catalog({ list, selected, onToggle }: { list: Course[]; selected: string[]; onToggle: (id: string) => void }) {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState("All");
  const [dept, setDept] = useState("All");
  const departments = useMemo(() => ["All", ...new Set(list.map((c) => c.department))], [list]);
  const shown = list.filter(
    (c) =>
      (kind === "All" || c.kind === kind) &&
      (dept === "All" || c.department === dept) &&
      `${c.code} ${c.title} ${c.instructor}`.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-[1fr_auto_11rem]">
        <label className="text-[13px] font-semibold text-n-700">
          Search courses
          <span className="relative block">
            <Search aria-hidden className="pointer-events-none absolute left-3 top-1/2 mt-[3px] h-4 w-4 -translate-y-1/2 text-n-400" />
            <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Code, title or instructor" className={cn(control, "pl-9")} />
          </span>
        </label>
        <div>
          <p className="text-[13px] font-semibold text-n-700">Type</p>
          <div role="group" aria-label="Course type" className="mt-1.5 inline-flex rounded-full border border-line bg-muted p-1 text-[13px] font-semibold">
            {["All", "Core", "Elective"].map((k) => (
              <button key={k} type="button" aria-pressed={kind === k} onClick={() => setKind(k)} className={cn("rounded-full px-3.5 py-1", kind === k ? "bg-surface text-primary shadow-sm" : "text-subtle hover:text-primary")}>
                {k}
              </button>
            ))}
          </div>
        </div>
        <label className="text-[13px] font-semibold text-n-700">
          Department
          <select value={dept} onChange={(e) => setDept(e.target.value)} className={control}>
            {departments.map((d) => <option key={d}>{d}</option>)}
          </select>
        </label>
      </div>
      <p className="mt-4 text-[13px] text-subtle" aria-live="polite">{shown.length} of {list.length} courses</p>
      {shown.length === 0 ? (
        <div className="mt-3"><EmptyState art="search" title="No matching courses" text="Try a different search or clear the filters." /></div>
      ) : (
        <ul className="mt-3 divide-y divide-line rounded-lg border border-line bg-surface">
          {shown.map((c) => {
            const on = selected.includes(c.id);
            return (
              <li key={c.id} className={cn("flex flex-wrap items-center gap-4 px-4 py-4", on && "bg-brand-50/70")}>
                <div className="min-w-0 flex-1">
                  <p className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[13px] font-semibold text-primary">{c.code}</span>
                    <Badge tone={c.kind === "Core" ? "brand" : "grey"}>{c.kind}</Badge>
                  </p>
                  <p className="mt-0.5 font-semibold text-foreground">{c.title}</p>
                  <p className="text-[13px] text-subtle">{c.department} · {c.instructor}</p>
                  <p className="mt-1 text-xs text-n-600">{slotText(c)}</p>
                </div>
                <div className="tnum text-right text-[13px] text-subtle">
                  <p className="text-lg font-bold text-primary">{c.credits}<span className="text-xs font-semibold text-subtle"> cr</span></p>
                  <p>{seatsLeft(c.id)} seats left (demo)</p>
                </div>
                <Button
                  variant={on ? "secondary" : "primary"}
                  size="sm"
                  aria-pressed={on}
                  onClick={() => onToggle(c.id)}
                  icon={on ? <X aria-hidden className="h-3.5 w-3.5" /> : <Plus aria-hidden className="h-3.5 w-3.5" />}
                  className="w-24"
                >
                  {on ? "Remove" : "Add"}<span className="sr-only"> {c.code}</span>
                </Button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function Selection({ chosen, onReview, onRemove }: { chosen: Course[]; onReview: () => void; onRemove: (id: string) => void }) {
  const credits = totalCredits(chosen);
  const clashes = findClashes(chosen);
  const problems = [
    credits < MIN_CREDITS && `Select at least ${MIN_CREDITS} credits (you have ${credits}).`,
    credits > MAX_CREDITS && `You can take at most ${MAX_CREDITS} credits (you have ${credits}).`,
    ...clashes.map((c) => `Time clash: ${c.a.code} and ${c.b.code}.`),
  ].filter(Boolean) as string[];
  const tone = credits > MAX_CREDITS ? "red" : credits >= MIN_CREDITS ? "green" : "amber";

  return (
    <aside aria-label="Selection summary" className="rounded-lg border border-line bg-surface lg:sticky lg:top-24">
      <div className="flex items-center gap-4 border-b border-line p-5">
        <ProgressRing value={credits} max={MAX_CREDITS} label="Credits selected" size={64} stroke={7} tone={tone}>{credits}</ProgressRing>
        <div>
          <h2 className="text-lg">Your selection</h2>
          <p className="text-[13px] text-subtle">{credits} credits · allowed {MIN_CREDITS} to {MAX_CREDITS}</p>
        </div>
      </div>
      <div className="p-5">
        {chosen.length === 0 ? (
          <p className="text-sm text-subtle">No courses selected yet. Add courses from the catalog.</p>
        ) : (
          <ul className="divide-y divide-line text-sm">
            {chosen.map((c) => (
              <li key={c.id} className="flex items-center justify-between gap-2 py-2">
                <span><span className="font-mono text-[13px] font-semibold text-primary">{c.code}</span> <span className="text-subtle">{c.credits} cr</span></span>
                <button type="button" onClick={() => onRemove(c.id)} className="text-[13px] font-semibold text-primary underline-offset-4 hover:underline">
                  Remove<span className="sr-only"> {c.code}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
        {problems.length > 0 && chosen.length > 0 && (
          <ul role="alert" className="mt-4 space-y-1.5 rounded-md bg-warning-bg p-3 text-[13px] font-medium text-warning-fg">
            {problems.map((p) => (
              <li key={p} className="flex items-start gap-2"><AlertTriangle aria-hidden className="mt-0.5 h-3.5 w-3.5 shrink-0" />{p}</li>
            ))}
          </ul>
        )}
        <Button onClick={onReview} disabled={problems.length > 0 || chosen.length === 0} className="mt-5 w-full">
          Review and submit
        </Button>
      </div>
    </aside>
  );
}

export default function CourseRegistration() {
  const { state, retry } = useAsync(getCourses);
  const { value } = studentData.useStore();
  const toast = useToast();
  const [reviewing, setReviewing] = useState(false);
  const selected = value.selectedCourseIds;

  const toggle = (id: string) =>
    studentData.update((d) => ({
      ...d,
      selectedCourseIds: d.selectedCourseIds.includes(id)
        ? d.selectedCourseIds.filter((x) => x !== id)
        : [...d.selectedCourseIds, id],
    }));

  const submit = () => {
    studentData.update((d) => ({ ...d, submittedPlan: d.selectedCourseIds, submittedAt: new Date().toISOString() }));
    setReviewing(false);
    toast("Courses submitted (demo). Your plan is now in the Academic Calendar.");
  };

  return (
    <>
      <PageHeader title="Course Registration" description="Explore the catalog, build your semester selection and submit it for confirmation." />
      {value.submittedPlan && (
        <p role="status" className="mb-6 rounded-md border border-success/30 bg-success-bg px-4 py-3 text-sm font-medium text-success-fg">
          Your courses were submitted (demo). <Link href="/student/calendar#registered" className="underline underline-offset-4">View My Registered Courses</Link>. You can change your selection and submit again.
        </p>
      )}
      <AsyncView state={state} retry={retry} label="Loading course catalog">
        {(list) => {
          const chosen = list.filter((c) => selected.includes(c.id));
          return (
            <>
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_21rem]">
                <Catalog list={list} selected={selected} onToggle={toggle} />
                <Selection chosen={chosen} onReview={() => setReviewing(true)} onRemove={toggle} />
              </div>
              <Dialog open={reviewing} onClose={() => setReviewing(false)} label="Review your course selection">
                <div className="p-6 sm:p-8">
                  <h2 className="pr-8">Review your selection</h2>
                  <p className="mb-5 mt-1 text-sm text-subtle">Check your courses, then submit. This is a demo submission and is not sent to any server.</p>
                  <DataTable
                    caption="Selected courses"
                    rows={chosen}
                    rowKey={(c) => c.id}
                    columns={[
                      { key: "course", header: "Course", render: (c) => `${c.code}: ${c.title}` },
                      { key: "schedule", header: "Schedule", render: (c) => <span className="text-subtle">{slotText(c)}</span> },
                      { key: "credits", header: "Credits", align: "right", render: (c) => c.credits },
                    ]}
                    footer={
                      <tr>
                        <th scope="row" colSpan={2} className="px-4 py-3 text-left">Total credits</th>
                        <td className="px-4 py-3 text-right font-bold">{totalCredits(chosen)}</td>
                      </tr>
                    }
                  />
                  <div className="mt-6 flex flex-wrap justify-end gap-3">
                    <Button variant="secondary" onClick={() => setReviewing(false)}>Back to catalog</Button>
                    <Button onClick={submit}>Submit courses</Button>
                  </div>
                </div>
              </Dialog>
            </>
          );
        }}
      </AsyncView>
    </>
  );
}
