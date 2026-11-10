export const formatINR = (amount: number) =>
  `${amount < 0 ? "-" : ""}₹${Math.abs(amount).toLocaleString("en-IN")}`;

// ISO date (YYYY-MM-DD) -> "23 Aug 2027". Pinned to UTC so server and client agree.
export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export const percent = (part: number, whole: number) =>
  whole === 0 ? 0 : Math.round((part / whole) * 100);
