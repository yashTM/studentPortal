"use client";

import Link from "next/link";
import { DEMO_TODAY_DAY, DEMO_TODAY_MINUTES } from "@/data/mock/student";
import { cn } from "@/lib/cn";
import { days, sessionsOn } from "@/lib/courses";
import { useActiveCourses } from "@/lib/studentData";
import { EmptyState } from "@/components/shared/States";

const START_HOUR = 8;
const END_HOUR = 18;
const ROW = 56; // px per hour
const hours = Array.from({ length: END_HOUR - START_HOUR }, (_, i) => START_HOUR + i);

// Course block palettes (tinted background, solid left edge, dark text: all AA).
const palettes = [
  "bg-brand-100 border-brand-600 text-brand-900",
  "bg-gold-100 border-gold-500 text-gold-700",
  "bg-success-bg border-success text-success-fg",
  "bg-info-bg border-info text-info-fg",
  "bg-danger-bg border-danger text-danger-fg",
  "bg-muted border-n-500 text-n-800",
];

const minutes = (t: string) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3));
const top = (t: string) => ((minutes(t) - START_HOUR * 60) / 60) * ROW;

/** Weekly timetable section, rendered inside the Academic Calendar page. */
export default function Timetable() {
  const { courses, isSample } = useActiveCourses();
  const colour = (id: string) => palettes[courses.findIndex((c) => c.id === id) % palettes.length];

  if (courses.length === 0)
    return <EmptyState art="calendar" title="No classes scheduled" text="Register for courses to see your timetable." />;

  return (
    <>
      {isSample && (
        <p className="mb-5 rounded-md border border-info/30 bg-info-bg px-4 py-3 text-sm text-info-fg" role="note">
          This is a sample timetable of the core courses. Submit your own selection in{" "}
          <Link href="/student/courses" className="font-semibold underline underline-offset-4">Course Registration</Link> to personalise it.
        </p>
      )}

      {/* Desktop: time grid with a current-time indicator */}
      <div className="hidden overflow-hidden rounded-lg border border-line bg-surface md:block">
        <div className="grid grid-cols-[3.5rem_repeat(5,minmax(0,1fr))] border-b border-line bg-muted">
          <span />
          {days.map((d) => (
            <p key={d} className={cn("py-2 text-center text-[11px] font-bold uppercase tracking-wider", d === DEMO_TODAY_DAY ? "text-primary" : "text-n-600")}>
              {d}{d === DEMO_TODAY_DAY && <span className="ml-1.5 rounded-full bg-primary px-1.5 py-px text-[9px] text-white">Today</span>}
            </p>
          ))}
        </div>
        <div className="grid grid-cols-[3.5rem_repeat(5,minmax(0,1fr))]" style={{ height: hours.length * ROW }}>
          <div className="relative">
            {hours.map((h) => (
              <span key={h} className="tnum absolute right-2 -translate-y-1/2 text-[11px] text-subtle" style={{ top: (h - START_HOUR) * ROW + (h === START_HOUR ? 8 : 0) }}>
                {String(h).padStart(2, "0")}:00
              </span>
            ))}
          </div>
          {days.map((day) => (
            <div key={day} className="relative border-l border-line" style={{ backgroundImage: `repeating-linear-gradient(to bottom, transparent 0, transparent ${ROW - 1}px, var(--line) ${ROW - 1}px, var(--line) ${ROW}px)` }}>
              <h3 className="sr-only">{day}</h3>
              {sessionsOn(courses, day).map(({ course, slot }) => (
                <div
                  key={`${course.id}-${slot.start}`}
                  className={cn("absolute inset-x-1 overflow-hidden rounded-md border-l-4 px-2 py-1 text-[11px] leading-tight", colour(course.id))}
                  style={{ top: top(slot.start) + 1, height: ((minutes(slot.end) - minutes(slot.start)) / 60) * ROW - 3 }}
                >
                  <p className="font-bold">{course.code}</p>
                  <p className="truncate">{course.title}</p>
                  <p className="tnum opacity-80">{slot.start} to {slot.end} · {slot.room}</p>
                </div>
              ))}
              {day === DEMO_TODAY_DAY && (
                <div aria-hidden className="pointer-events-none absolute inset-x-0 z-10 flex items-center" style={{ top: ((DEMO_TODAY_MINUTES - START_HOUR * 60) / 60) * ROW }}>
                  <span className="-ml-1 h-2 w-2 rounded-full bg-danger" />
                  <span className="h-px flex-1 bg-danger" />
                </div>
              )}
            </div>
          ))}
        </div>
        <p className="border-t border-line px-4 py-2 text-xs text-subtle"><span aria-hidden className="mr-1.5 inline-block h-2 w-2 rounded-full bg-danger" />Red line marks the demo time (Monday 10:00).</p>
      </div>

      {/* Mobile: day-by-day list */}
      <div className="space-y-5 md:hidden">
        {days.map((day) => {
          const sessions = sessionsOn(courses, day);
          return (
            <section key={day} aria-label={day}>
              <h3 className="eyebrow mb-2">{day}</h3>
              {sessions.length === 0 ? (
                <p className="rounded-md border border-dashed border-line-strong p-3 text-sm text-subtle">No classes</p>
              ) : (
                <ul className="space-y-2">
                  {sessions.map(({ course, slot }) => (
                    <li key={`${course.id}-${slot.start}`} className={cn("rounded-md border-l-4 p-3 text-sm", colour(course.id))}>
                      <p className="tnum text-xs font-semibold opacity-80">{slot.start} to {slot.end}</p>
                      <p className="font-bold">{course.code}: {course.title}</p>
                      <p className="text-xs opacity-80">{slot.room} · {course.instructor}</p>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          );
        })}
      </div>
    </>
  );
}
