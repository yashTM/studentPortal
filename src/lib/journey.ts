import {
  dates,
  enrollmentTasks,
  isSectionComplete,
  requiredDocs,
  sections,
} from "@/data/admission";
import type { State } from "@/lib/applicantStore";

export type Step = { label: string; done: boolean };
export type StageStatus = "complete" | "current" | "upcoming";
export type Stage = {
  title: string;
  summary: string;
  steps: Step[];
  status: StageStatus;
  done: number;
};
export type Action = { title: string; due: string; href: string };

export function computeJourney(s: State) {
  const sectionDone = sections.map((sec) => ({
    label: `Complete ${sec.label.toLowerCase()}`,
    done: isSectionComplete(s.application[sec.key], sec.key),
  }));
  const missingDocs = requiredDocs.filter((d) => !s.documents[d.key]);
  const pendingEnrollment = enrollmentTasks.filter((t) => !s.enrollment[t.key]);

  const raw: Omit<Stage, "status" | "done">[] = [
    {
      title: "Portal access & account",
      summary: "Create your applicant account and sign in.",
      steps: [{ label: "Create your account", done: !!s.account }],
    },
    {
      title: "Admission application",
      summary: "Fill in the application form and submit it.",
      steps: [
        ...sectionDone,
        { label: "Submit your application", done: !!s.submittedAt },
      ],
    },
    {
      title: "Documents & tracking",
      summary: "Upload what is required and follow the review.",
      steps: requiredDocs.map((d) => ({
        label: `Upload ${d.name}`,
        done: !!s.documents[d.key],
      })),
    },
    {
      title: "Admission decision & offer",
      summary: "Receive your decision and accept your offer.",
      steps: [
        { label: "Decision released", done: s.decision === "admitted" },
        { label: "Accept your offer", done: s.offerAccepted },
      ],
    },
    {
      title: "Enrollment & onboarding",
      summary: "Secure your seat and get ready for day one.",
      steps: enrollmentTasks.map((t) => ({
        label: t.label,
        done: !!s.enrollment[t.key],
      })),
    },
  ];

  let currentFound = false;
  const stages: Stage[] = raw.map((st) => {
    const done = st.steps.filter((x) => x.done).length;
    let status: StageStatus = "upcoming";
    if (done === st.steps.length) status = "complete";
    else if (!currentFound) {
      status = "current";
      currentFound = true;
    }
    return { ...st, status, done };
  });

  const total = stages.reduce((n, st) => n + st.steps.length, 0);
  const done = stages.reduce((n, st) => n + st.done, 0);

  const actions: Action[] = [];
  if (!s.submittedAt) {
    sectionDone
      .filter((x) => !x.done)
      .forEach((x) =>
        actions.push({
          title: x.label,
          due: dates.applicationDeadline,
          href: "/portal/application",
        }),
      );
    if (sectionDone.every((x) => x.done))
      actions.push({
        title: "Review and submit your application",
        due: dates.applicationDeadline,
        href: "/portal/application",
      });
  }
  missingDocs.forEach((d) =>
    actions.push({
      title: `Upload ${d.name}`,
      due: dates.documentsDeadline,
      href: "/portal/documents",
    }),
  );
  if (s.decision === "admitted" && !s.offerAccepted)
    actions.push({
      title: "Accept your offer of admission",
      due: dates.offerDeadline,
      href: "/portal/decision",
    });
  if (s.offerAccepted && pendingEnrollment.length > 0)
    actions.push({
      title: `Finish enrollment tasks (${pendingEnrollment.length} left)`,
      due: "Before classes begin",
      href: "/portal/enrollment",
    });

  const currentIndex = stages.findIndex((st) => st.status === "current");

  let status = "Not started";
  const sectionsDone = sectionDone.filter((x) => x.done).length;
  if (s.offerAccepted) status = "Offer accepted";
  else if (s.decision === "admitted") status = "Admitted";
  else if (s.submittedAt) status = "Under review";
  else if (sectionsDone > 0) status = `Draft · ${sectionsDone} of ${sectionDone.length} sections`;

  return {
    stages,
    done,
    total,
    actions,
    missingDocs: missingDocs.length,
    currentIndex: currentIndex === -1 ? stages.length - 1 : currentIndex,
    status,
  };
}
