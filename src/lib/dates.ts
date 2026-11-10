// Shared date helpers for the Academic Calendar, Assignments and Attendance modules.
// Keep date logic here so Attendance and the Calendar can be merged later without duplication.

const DAY_MS = 86_400_000;
const utc = (iso: string) => Date.parse(`${iso}T00:00:00Z`);

export const daysBetween = (fromIso: string, toIso: string) =>
  Math.round((utc(toIso) - utc(fromIso)) / DAY_MS);

export function dueLabel(due: string, today: string) {
  const d = daysBetween(today, due);
  if (d < 0) return `Overdue by ${-d} ${-d === 1 ? "day" : "days"}`;
  if (d === 0) return "Due today";
  if (d === 1) return "Due tomorrow";
  return `Due in ${d} days`;
}

export const isoDate = (y: number, m: number, d: number) =>
  `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

export const monthName = (y: number, m: number) =>
  new Date(Date.UTC(y, m, 1)).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

export const eventOn = (e: { date: string; endDate?: string }, date: string) =>
  date >= e.date && date <= (e.endDate ?? e.date);
