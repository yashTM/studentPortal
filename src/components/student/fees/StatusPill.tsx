import { Badge } from "@/components/portal/ui";
import type { FeeStatus } from "@/types/fees";

const tone = { Paid: "green", Due: "blue", Overdue: "red", Upcoming: "grey" } as const;

/** Fee status pill with consistent semantics across the schedule, timeline and payment list. */
export default function StatusPill({ status }: { status: FeeStatus }) {
  return <Badge tone={tone[status]}>{status}</Badge>;
}
