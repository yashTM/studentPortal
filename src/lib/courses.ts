import { DEMO_TODAY_DAY, DEMO_TODAY_MINUTES } from "@/data/mock/student";
import type { Course, Day, Slot } from "@/types/student";

export const days: Day[] = ["Mon", "Tue", "Wed", "Thu", "Fri"];

export const totalCredits = (list: Course[]) => list.reduce((n, c) => n + c.credits, 0);

const overlaps = (a: Slot, b: Slot) => a.day === b.day && a.start < b.end && b.start < a.end;

export type Clash = { a: Course; b: Course };

export function findClashes(list: Course[]): Clash[] {
  const out: Clash[] = [];
  for (let i = 0; i < list.length; i++)
    for (let j = i + 1; j < list.length; j++)
      if (list[i].slots.some((s) => list[j].slots.some((t) => overlaps(s, t))))
        out.push({ a: list[i], b: list[j] });
  return out;
}

export type Session = { course: Course; slot: Slot };

export const sessionsOn = (list: Course[], day: Day): Session[] =>
  list
    .flatMap((course) => course.slots.filter((s) => s.day === day).map((slot) => ({ course, slot })))
    .sort((x, y) => x.slot.start.localeCompare(y.slot.start));

const toMinutes = (t: string) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3));

/** Next class after the demo "now" (Monday 10:00), looking up to a week ahead. */
export function nextSession(list: Course[]): (Session & { day: Day }) | null {
  const start = days.indexOf(DEMO_TODAY_DAY as Day);
  for (let offset = 0; offset < days.length; offset++) {
    const day = days[(start + offset) % days.length];
    const found = sessionsOn(list, day).find(
      (s) => offset > 0 || toMinutes(s.slot.start) > DEMO_TODAY_MINUTES,
    );
    if (found) return { ...found, day };
  }
  return null;
}

/** Deterministic demo seat count so the catalog looks realistic and stays stable between renders. */
export const seatsLeft = (courseId: string) =>
  5 + ((courseId.charCodeAt(0) * 7 + courseId.charCodeAt(courseId.length - 1) * 3) % 26);
