"use client";

import { CalendarClock, ChevronRight, ClipboardList, Clock, ListChecks, MapPin, Wallet } from "lucide-react";
import Link from "next/link";
import { useCallback } from "react";
import { getAssignments, getAttendance, getCalendarEvents, getStudentProfile } from "@/services/student";
import { DEMO_TODAY } from "@/data/mock/student";
import { useApplicant } from "@/lib/applicantStore";
import { nextSession, totalCredits } from "@/lib/courses";
import { dueLabel } from "@/lib/dates";
import { onboardingProgress } from "@/lib/enrollmentWizard";
import { useFeeAccount } from "@/lib/feeStore";
import { formatDate, formatINR, percent } from "@/lib/format";
import { useProfileSeed, useActiveCourses } from "@/lib/studentData";
import { useAsync } from "@/lib/useAsync";
import EnrollmentSummaryCard from "@/components/enrollment/EnrollmentSummaryCard";
import AsyncView from "@/components/shared/AsyncView";
import CampusImage from "@/components/shared/CampusImage";
import ProgressBar from "@/components/shared/ProgressBar";
import ProgressRing from "@/components/shared/ProgressRing";
import { buttonStyles } from "@/components/ui/Button";
import Stat from "@/components/ui/Stat";
import { MAX_CREDITS } from "@/data/mock/courses";
import FeeStatusCard from "./fees/FeeStatusCard";
import { studentNav } from "./nav";

export default function Dashboard() {
  const seed = useProfileSeed();
  const load = useCallback(() => getStudentProfile(seed), [seed]);
  const profile = useAsync(load);
  const work = useAsync(getAssignments);
  const events = useAsync(getCalendarEvents);
  const attendance = useAsync(getAttendance);
  const { wizard } = useApplicant();
  const { account: fees } = useFeeAccount();
  const { courses } = useActiveCourses();
  const { done, total } = onboardingProgress(wizard);
  const next = nextSession(courses);
  const credits = totalCredits(courses);

  return (
    <AsyncView state={profile.state} retry={profile.retry} label="Loading your dashboard">
      {(p) => {
        const upcoming = work.state.status === "ready"
          ? work.state.data.filter((a) => a.status === "pending" && a.due >= DEMO_TODAY && courses.some((c) => c.id === a.courseId)).sort((a, b) => a.due.localeCompare(b.due))
          : [];
        const nextEvent = events.state.status === "ready"
          ? events.state.data.filter((e) => e.date >= DEMO_TODAY).sort((a, b) => a.date.localeCompare(b.date))[0]
          : null;
        const overall = attendance.state.status === "ready"
          ? (() => {
              const rows = attendance.state.data.filter((r) => courses.some((c) => c.id === r.courseId));
              return percent(rows.reduce((n, r) => n + r.attended, 0), rows.reduce((n, r) => n + r.held, 0));
            })()
          : null;

        const agenda = [
          next && {
            icon: Clock,
            title: `${next.course.code}: ${next.course.title}`,
            meta: `${next.day} ${next.slot.start} to ${next.slot.end}`,
            side: next.slot.room,
            kind: "Next class",
            href: "/student/calendar#timetable",
          },
          upcoming[0] && {
            icon: ClipboardList,
            title: upcoming[0].title,
            meta: formatDate(upcoming[0].due),
            side: dueLabel(upcoming[0].due, DEMO_TODAY),
            kind: "Assignment due",
            href: "/student/assignments",
          },
          nextEvent && {
            icon: CalendarClock,
            title: nextEvent.title,
            meta: formatDate(nextEvent.date),
            side: dueLabel(nextEvent.date, DEMO_TODAY),
            kind: "Next deadline",
            href: "/student/calendar",
          },
          done < total && {
            icon: ListChecks,
            title: "Finish your onboarding checklist",
            meta: `${total - done} of ${total} items remaining`,
            side: "Continue",
            kind: "Onboarding",
            href: "/portal/enrollment",
          },
        ].filter(Boolean) as { icon: typeof Clock; title: string; meta: string; side: string; kind: string; href: string }[];

        return (
          <>
            {/* Greeting band */}
            <section className="rise relative mb-8 overflow-hidden rounded-lg bg-brand-900">
              <CampusImage variant="banner" priority sizes="(min-width: 1024px) 70vw, 100vw" position="right center" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-brand-900 via-brand-900/80 to-brand-900/20" />
              <div className="relative flex flex-wrap items-end justify-between gap-5 px-6 py-8 sm:px-8 sm:py-10">
                <div>
                  <p className="eyebrow !text-accent">Welcome back</p>
                  <h1 className="mt-1 !text-white">{p.firstName} {p.lastName}</h1>
                  <p className="mt-1 text-sm text-white/80">Student ID {p.studentId} · {p.program}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                  {next && (
                    <p className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-2xl bg-white/10 px-3 py-1.5 text-[13px] font-medium text-white">
                      <Clock aria-hidden className="h-4 w-4 text-accent" />
                      Next class {next.course.code}, {next.day} {next.slot.start}
                      <MapPin aria-hidden className="ml-1 h-3.5 w-3.5 text-white/60" /> {next.slot.room}
                    </p>
                  )}
                  {fees?.nextDue && (
                    <p className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-3 py-1.5 text-[13px] font-medium text-white">
                      <Wallet aria-hidden className="h-4 w-4 text-accent" />
                      Next fee due {formatDate(fees.nextDue.due)} · {formatINR(fees.nextDue.remaining)}
                    </p>
                  )}
                  </div>
                </div>
                <Link href="/student/calendar#timetable" className={buttonStyles({ variant: "primary", className: "!bg-accent !text-accent-foreground hover:!bg-gold-100" })}>
                  View timetable
                </Link>
              </div>
            </section>

            {/* Stat row: one bordered strip, not four cards */}
            <section aria-label="Key figures" className="mb-8 grid divide-y divide-line rounded-lg border border-line bg-surface sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
              <Stat
                index={0}
                label="Attendance"
                value={overall === null ? "..." : `${overall}%`}
                hint="Across current courses"
                visual={overall !== null && <ProgressRing value={overall} max={100} label="Overall attendance" size={52} stroke={6} tone={overall < 75 ? "red" : "green"}>{""}</ProgressRing>}
              />
              <Stat
                index={1}
                label="Credits"
                value={<>{credits}<span className="text-base text-subtle"> / {MAX_CREDITS}</span></>}
                hint={`${courses.length} courses this semester`}
                visual={<div className="w-16"><ProgressBar value={credits} max={MAX_CREDITS} label="Credits" /></div>}
              />
              <Stat
                index={2}
                label="Work due"
                value={upcoming.length}
                hint={upcoming[0] ? `Next: ${dueLabel(upcoming[0].due, DEMO_TODAY).toLowerCase()}` : "Nothing upcoming"}
              />
              <Stat
                index={3}
                label="Onboarding"
                value={<>{done}<span className="text-base text-subtle"> / {total}</span></>}
                hint={done === total ? "All items complete" : "Items remaining"}
                visual={<ProgressRing value={done} max={total} label="Onboarding progress" size={52} stroke={6} tone="green">{""}</ProgressRing>}
              />
            </section>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_21rem]">
              <section aria-labelledby="next-h" className="min-w-0">
                <div className="mb-3 flex items-baseline justify-between">
                  <h2 id="next-h">What&apos;s next</h2>
                  <Link href="/student/calendar" className="text-sm font-semibold text-primary underline-offset-4 hover:underline">Academic Calendar</Link>
                </div>
                {agenda.length === 0 ? (
                  <p className="rounded-lg border border-dashed border-line-strong p-6 text-sm text-subtle">You are all caught up.</p>
                ) : (
                  <ul className="divide-y divide-line rounded-lg border border-line bg-surface">
                    {agenda.map((a, i) => {
                      const Icon = a.icon;
                      return (
                        <li key={a.kind} className="rise" style={{ ["--i" as string]: i + 2 }}>
                          <Link href={a.href} className="group flex items-center gap-4 px-5 py-4 hover:bg-brand-50/60">
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand-50 text-primary">
                              <Icon aria-hidden className="h-5 w-5" strokeWidth={1.75} />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="eyebrow block">{a.kind}</span>
                              <span className="block truncate font-semibold text-foreground">{a.title}</span>
                              <span className="block text-[13px] text-subtle">{a.meta}</span>
                            </span>
                            <span className="hidden shrink-0 text-right text-[13px] font-semibold text-secondary sm:block">{a.side}</span>
                            <ChevronRight aria-hidden className="h-4 w-4 shrink-0 text-n-400 transition-transform group-hover:translate-x-0.5" />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}

                <h2 className="mb-3 mt-10">Explore</h2>
                <ul className="grid divide-y divide-line overflow-hidden rounded-lg border border-line bg-surface sm:grid-cols-2 sm:divide-y-0">
                  {studentNav.slice(1).map((n, i) => {
                    const Icon = n.icon;
                    return (
                      <li key={n.href} className={i % 2 === 0 ? "sm:border-r sm:border-line" : ""}>
                        <Link href={n.href} className="group flex items-center gap-3 border-line px-4 py-3.5 hover:bg-brand-50/60 sm:border-b">
                          <Icon aria-hidden className="h-5 w-5 shrink-0 text-n-500 group-hover:text-primary" strokeWidth={1.75} />
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-semibold text-primary">{n.label}</span>
                            <span className="block truncate text-xs text-subtle">{n.description}</span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>

              <aside aria-label="Enrollment and fees" className="min-w-0 space-y-6">
                <FeeStatusCard />
                <EnrollmentSummaryCard fullSummaryHref="/student/enrollment-summary" />
              </aside>
            </div>
          </>
        );
      }}
    </AsyncView>
  );
}
