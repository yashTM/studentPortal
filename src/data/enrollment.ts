// DEMO DATA for the enrollment wizard. Amounts, dates and options are invented.

export const wizardSteps = [
  { label: "Start enrollment", short: "Start", description: "Confirm your offer and terms" },
  { label: "Semester registration", short: "Register", description: "Your details and emergency contact" },
  { label: "Initial fees", short: "Fees", description: "Review fees and pay (simulated)" },
  { label: "Onboarding checklist", short: "Onboarding", description: "Documents, policies, orientation" },
  { label: "Student services", short: "Services", description: "Library, IT, support, housing" },
  { label: "Review and confirm", short: "Review", description: "Check everything and submit" },
] as const;

export const REVIEW_STEP = wizardSteps.length - 1;

export const acknowledgements = [
  { key: "ack_terms", label: "I accept the offer of admission and the program terms and conditions." },
  { key: "ack_accuracy", label: "I confirm that the details in my application are true and complete." },
  { key: "ack_fees", label: "I understand the fee structure and refund policy." },
];

export const semesters = ["Semester 1 (Fall 2027)"];
export const relationships = ["Parent", "Guardian", "Spouse", "Sibling", "Other"];

export const feeItems = [
  { key: "deposit", label: "Enrollment deposit (refundable)", amount: 25000 },
  { key: "tuition", label: "Tuition, Semester 1", amount: 110000 },
  { key: "scholarship", label: "Merit scholarship (25% of tuition)", amount: -27500 },
  { key: "services", label: "Library, IT and student services fee", amount: 12500 },
];

export const feeTotal = feeItems.reduce((sum, f) => sum + f.amount, 0);

export const installmentPlan = [
  { label: "Due now", amount: 60000, due: "At enrollment", dueIso: "2027-07-15" },
  { label: "Installment 2", amount: 30000, due: "Sep 15, 2027", dueIso: "2027-09-15" },
  { label: "Installment 3", amount: 30000, due: "Oct 15, 2027", dueIso: "2027-10-15" },
];

export const onboardingDocs = [
  { key: "medical", name: "Medical fitness certificate" },
  { key: "immunisation", name: "Immunisation record" },
];

export const policies = [
  { key: "policy_conduct", label: "Student code of conduct" },
  { key: "policy_ragging", label: "Anti-ragging undertaking" },
  { key: "policy_it", label: "IT acceptable use policy" },
  { key: "policy_academic", label: "Academic expectations and attendance requirements" },
];

export const orientationSlots = [
  "Aug 10, 2027, 10:00 AM",
  "Aug 11, 2027, 2:00 PM",
  "Aug 12, 2027, 10:00 AM",
];

export const studentServices = [
  {
    key: "service_library",
    title: "Library access",
    text: "Borrow books, use digital journals and book study rooms.",
    detail: "Your library card is activated after enrollment is confirmed. Digital journals are available from any device.",
    action: "Request library card",
  },
  {
    key: "service_it",
    title: "IT account",
    text: "Campus email, Wi-Fi and software licences.",
    detail: "Your campus email and Wi-Fi access are created within two working days of enrollment confirmation.",
    action: "Request IT account",
  },
  {
    key: "service_support",
    title: "Student support",
    text: "Advising, counselling and accessibility support.",
    detail: "Support teams are available on campus and online. Requests are handled in confidence.",
    action: "Request an advisor",
  },
];

export const housingOptions = [
  { value: "on-campus", label: "I would like on-campus housing" },
  { value: "commute", label: "I will commute and do not need housing" },
];
