import type { SectionKey } from "@/lib/applicantStore";

export type FieldDef = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "date" | "number" | "select" | "textarea";
  options?: string[];
  placeholder?: string;
  optional?: boolean;
  wide?: boolean;
};

export const sections: { key: SectionKey; label: string; hint: string; fields: FieldDef[] }[] = [
  {
    key: "personal",
    label: "Personal details",
    hint: "Tell us who you are, exactly as on your official documents.",
    fields: [
      { name: "firstName", label: "First name" },
      { name: "lastName", label: "Last name" },
      { name: "dob", label: "Date of birth", type: "date" },
      {
        name: "gender",
        label: "Gender",
        type: "select",
        options: ["Female", "Male", "Non-binary", "Prefer not to say"],
      },
      { name: "nationality", label: "Nationality", placeholder: "e.g. Indian" },
    ],
  },
  {
    key: "contact",
    label: "Contact details",
    hint: "We will use these to reach you about your application.",
    fields: [
      { name: "email", label: "Email", type: "email" },
      { name: "phone", label: "Phone number", type: "tel", placeholder: "+91 98765 43210" },
      { name: "address", label: "Address", wide: true },
      { name: "city", label: "City" },
      { name: "state", label: "State" },
      { name: "pincode", label: "PIN code", type: "number" },
    ],
  },
  {
    key: "academic",
    label: "Academic background",
    hint: "Your most recent school or college qualification.",
    fields: [
      {
        name: "board",
        label: "Board / university",
        type: "select",
        options: ["CBSE", "ICSE", "State board", "IB", "Other"],
      },
      { name: "school", label: "School / college name", wide: true },
      { name: "year", label: "Year of passing", type: "number", placeholder: "2026" },
      { name: "percentage", label: "Percentage / CGPA", placeholder: "e.g. 86%" },
      { name: "entranceExam", label: "Entrance exam (if any)", optional: true, placeholder: "e.g. JEE Main" },
      { name: "entranceScore", label: "Entrance score", optional: true },
    ],
  },
  {
    key: "program",
    label: "Program choice",
    hint: "Pick the program you want to join.",
    fields: [
      {
        name: "program",
        label: "Program",
        type: "select",
        options: [
          "BSc Computer Science",
          "BSc Data Science",
          "BBA Business Administration",
          "BCom Accounting & Finance",
          "BA Economics",
          "BEng Mechanical Engineering",
          "BEng Electronics",
        ],
      },
      { name: "intake", label: "Intake", type: "select", options: ["Fall 2027"] },
      {
        name: "campus",
        label: "Campus",
        type: "select",
        options: ["Main Campus", "City Campus"],
      },
      {
        name: "statement",
        label: "Why do you want to join this program?",
        type: "textarea",
        wide: true,
      },
    ],
  },
];

export const requiredDocs = [
  { key: "marksheet10", name: "10th marksheet" },
  { key: "marksheet12", name: "12th marksheet" },
  { key: "idProof", name: "ID proof (Aadhaar or passport)" },
  { key: "photo", name: "Passport size photo" },
];

export const enrollmentTasks = [
  { key: "deposit", label: "Pay the enrollment deposit", text: "A refundable deposit of ₹25,000 secures your seat." },
  { key: "hostel", label: "Choose your hostel preference", text: "Pick on-campus housing or tell us you will commute." },
  { key: "orientation", label: "Book your orientation slot", text: "Meet your batch and faculty before classes begin." },
];

export const dates = {
  applicationDeadline: "Dec 1, 2026",
  documentsDeadline: "Dec 8, 2026",
  decision: "Jan 10, 2027",
  offerDeadline: "Feb 15, 2027",
  classesBegin: "Aug 18, 2027",
};

export const keyDates = [
  { label: "Application closes", date: dates.applicationDeadline },
  { label: "Documents due", date: dates.documentsDeadline },
  { label: "Decisions released", date: dates.decision },
  { label: "Offer acceptance deadline", date: dates.offerDeadline },
  { label: "Classes begin", date: dates.classesBegin },
];

export function isSectionComplete(
  values: Record<string, string> | undefined,
  key: SectionKey,
) {
  const section = sections.find((s) => s.key === key)!;
  return section.fields
    .filter((f) => !f.optional)
    .every((f) => (values?.[f.name] ?? "").trim() !== "");
}
