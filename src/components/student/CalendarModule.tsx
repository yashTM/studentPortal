"use client";

// NOTE: Attendance is a separate tab for now. It is planned to merge with this calendar later,
// so date logic lives in lib/dates.ts and is shared rather than duplicated here.
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { getAssignments, getCalendarEvents } from "@/services/student";
import { DEMO_TODAY } from "@/data/mock/student";
import { cn } from "@/lib/cn";
import { eventOn, isoDate, monthName } from "@/lib/dates";
import { useAsync } from "@/lib/useAsync";
import { formatDate } from "@/lib/format";
import { studentData } from "@/lib/studentData";
import AsyncView from "@/components/shared/AsyncView";
import { EmptyState } from "@/components/shared/States";
import PageHeader from "@/components/shared/PageHeader";
import type { CalendarEvent } from "@/types/student";
import RegisteredCourses from "./RegisteredCourses";
import Timetable from "./Timetable";

// One colour per event type, used for chips, the legend and the agenda dots.
const typeStyle = {
  Academic: { chip: "bg-brand-100 text-brand-800", dot: "bg-brand-600" },
  Exam: { chip: "bg-danger-bg text-danger-fg", dot: "bg-danger" },
  Fee: { chip: "bg-warning-bg text-warning-fg", dot: "bg-warning" },
  Holiday: { chip: "bg-success-bg text-success-fg", dot: "bg-success" },
} as const;
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function Legend() {
  return (
    <ul aria-label="Event types" className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-n-600">
      {(Object.keys(typeStyle) as (keyof typeof typeStyle)[]).map((t) => (
        <li key={t} className="flex items-center gap-1.5">
          <span aria-hidden className={cn("h-2 w-2 rounded-full", typeStyle[t].dot)} /> {t}
        </li>
      ))}
    </ul>
  );
}

function MonthGrid({ events }: { events: CalendarEvent[] }) {
  const [year, month] = DEMO_TODAY.split("-").map(Number);
  const [cursor, setCursor] = useState({ y: year, m: month - 1 });
  const { y, m } = cursor;
  const lead = new Date(Date.UTC(y, m, 1)).getUTCDay();
  const length = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
  const cells = [...Array(lead).fill(null), ...Array.from({ length }, (_, i) => i + 1)];
  const prefix = isoDate(y, m, 1).slice(0, 7);
  const inMonth = events.filter((e) => e.date.startsWith(prefix) || e.endDate?.startsWith(prefix));
  const move = (delta: number) => {
    const d = new Date(Date.UTC(y, m + delta, 1));
    setCursor({ y: d.getUTCFullYear(), m: d.getUTCMonth() });
  };
  const nav = "rounded-full border border-line-strong p-1.5 text-primary hover:bg-brand-50";

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-2">
        <h3 className="text-xl" aria-live="polite">{monthName(y, m)}</h3>
        <div className="flex gap-2">
          <button type="button" onClick={() => move(-1)} aria-label="Previous month" className={nav}><ChevronLeft aria-hidden className="h-4 w-4" /></button>
          <button type="button" onClick={() => move(1)} aria-label="Next month" className={nav}><ChevronRight aria-hidden className="h-4 w-4" /></button>
        </div>
      </div>
      <div className="overflow-hidden rounded-lg border border-line bg-surface">
        <table className="w-full table-fixed text-sm">
          <caption className="sr-only">Academic calendar for {monthName(y, m)}</caption>
          <thead>
            <tr className="bg-muted">{weekdays.map((d) => <th key={d} scope="col" className="py-2 text-center text-[11px] font-bold uppercase tracking-wider text-n-600">{d}</th>)}</tr>
          </thead>
          <tbody>
            {Array.from({ length: Math.ceil(cells.length / 7) }, (_, row) => (
              <tr key={row} className="border-t border-line">
                {Array.from({ length: 7 }, (_, col) => {
                  const day = cells[row * 7 + col];
                  if (!day) return <td key={col} className="bg-muted/40" />;
                  const date = isoDate(y, m, day);
                  const todays = events.filter((e) => eventOn(e, date));
                  const isToday = date === DEMO_TODAY;
                  return (
                    <td key={col} className="h-14 border-l border-line p-1 align-top first:border-l-0 sm:h-20">
                      <span className={cn("tnum inline-flex h-6 min-w-6 items-center justify-center rounded-full px-1 text-xs font-semibold", isToday ? "bg-primary text-white" : "text-n-700")}>{day}</span>
                      <div className="mt-1 hidden space-y-0.5 sm:block">
                        {todays.slice(0, 2).map((e) => (
                          <p key={e.id} className={cn("truncate rounded px-1 py-px text-[10px] font-semibold leading-tight", typeStyle[e.type].chip)}>{e.title}</p>
                        ))}
                      </div>
                      <div className="mt-1 flex gap-0.5 sm:hidden" aria-hidden>
                        {todays.slice(0, 3).map((e) => <span key={e.id} className={cn("h-1.5 w-1.5 rounded-full", typeStyle[e.type].dot)} />)}
                      </div>
                      {todays.length > 0 && <span className="sr-only">{todays.map((e) => e.title).join(", ")}</span>}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3"><Legend /></div>
      <h3 className="mb-2 mt-6 text-base">Events this month</h3>
      {inMonth.length === 0 ? (
        <p className="text-sm text-subtle">No events this month.</p>
      ) : (
        <ul className="divide-y divide-line rounded-lg border border-line bg-surface text-sm">
          {inMonth.map((e) => (
            <li key={e.id} className="flex flex-wrap items-center gap-x-3 gap-y-1 px-4 py-2.5">
              <span aria-hidden className={cn("h-2 w-2 shrink-0 rounded-full", typeStyle[e.type].dot)} />
              <span className="font-semibold">{e.title}</span>
              <span className="text-[13px] text-subtle">{formatDate(e.date)}{e.endDate && ` to ${formatDate(e.endDate)}`}</span>
              <span className="sr-only">{e.type}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Agenda() {
  const events = useAsync(getCalendarEvents);
  const work = useAsync(getAssignments);
  return (
    <div>
      <h3 className="mb-4 text-xl">Upcoming activities</h3>
      <AsyncView state={events.state} retry={events.retry} label="Loading activities">
        {(evs) => (
          <AsyncView state={work.state} retry={work.retry} label="Loading activities">
            {(tasks) => {
              const items = [
                ...evs.filter((e) => (e.endDate ?? e.date) >= DEMO_TODAY).map((e) => ({ id: e.id, title: e.title, date: e.date, label: e.type, dot: typeStyle[e.type].dot })),
                ...tasks.filter((t) => t.status === "pending" && t.due >= DEMO_TODAY).map((t) => ({ id: t.id, title: t.title, date: t.due, label: "Assignment due", dot: "bg-n-500" })),
              ].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 8);
              return items.length === 0 ? (
                <EmptyState art="calendar" title="Nothing coming up" text="New activities will appear here." />
              ) : (
                <ol className="relative space-y-4 border-l border-line-strong pl-6">
                  {items.map((i) => (
                    <li key={i.id} className="relative">
                      <span aria-hidden className={cn("absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full ring-4 ring-background", i.dot)} />
                      <p className="tnum text-xs font-semibold text-subtle">{formatDate(i.date)} · {i.label}</p>
                      <p className="text-sm font-semibold text-foreground">{i.title}</p>
                    </li>
                  ))}
                </ol>
              );
            }}
          </AsyncView>
        )}
      </AsyncView>
    </div>
  );
}

export default function CalendarModule() {
  const { state, retry } = useAsync(getCalendarEvents);
  const { value } = studentData.useStore();
  const registered = value.submittedPlan !== null;

  return (
    <>
      <PageHeader title="Academic Calendar" description="Key academic dates, upcoming activities, your weekly timetable and registered courses." />
      <nav aria-label="On this page" className="-mt-2 mb-8 flex flex-wrap gap-x-6 gap-y-1 border-b border-line pb-3 text-sm font-semibold">
        <a href="#key-dates" className="text-primary underline-offset-4 hover:underline">Key dates</a>
        <a href="#timetable" className="text-primary underline-offset-4 hover:underline">Weekly timetable</a>
        {registered && <a href="#registered" className="text-primary underline-offset-4 hover:underline">My Registered Courses</a>}
      </nav>

      <section id="key-dates" aria-labelledby="key-dates-h" className="scroll-mt-24">
        <h2 id="key-dates-h" className="sr-only">Key dates and upcoming activities</h2>
        <div className="grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <AsyncView state={state} retry={retry} label="Loading calendar">
            {(events) => <MonthGrid events={events} />}
          </AsyncView>
          <Agenda />
        </div>
      </section>

      <section id="timetable" aria-labelledby="timetable-h" className="mt-14 scroll-mt-24 border-t border-line pt-10">
        <h2 id="timetable-h" className="mb-5">Weekly timetable</h2>
        <Timetable />
      </section>

      <section id="registered" aria-labelledby="registered-h" className="mt-14 scroll-mt-24 border-t border-line pt-10">
        <h2 id="registered-h" className="mb-5">My Registered Courses</h2>
        {registered ? (
          <RegisteredCourses />
        ) : (
          <EmptyState art="list" title="No courses registered yet" text="Your submitted course selection will appear here.">
            <Link href="/student/courses" className="text-primary underline underline-offset-4">Go to Course Registration</Link>
          </EmptyState>
        )}
      </section>
    </>
  );
}
