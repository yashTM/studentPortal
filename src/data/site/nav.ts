// Public site navigation. Every link resolves: built pages, Home anchors, or the "coming soon" template.
export type NavLink = { label: string; href: string; description?: string };
export type NavItem = { id: string; label: string; href?: string; children?: NavLink[] };

export const siteNav: NavItem[] = [
  { id: "home", label: "Home", href: "/" },
  {
    id: "admissions",
    label: "Admissions",
    children: [
      { label: "How to Apply", href: "/#admission-journey", description: "Five steps from application to enrollment" },
      { label: "Requirements", href: "/coming-soon/admission-requirements", description: "Documents and eligibility" },
      { label: "Fees and Scholarships", href: "/coming-soon/fees-scholarships", description: "Tuition, aid and merit awards" },
      { label: "Important Dates", href: "/coming-soon/important-dates", description: "Deadlines for Fall 2027" },
      { label: "Track Application", href: "/portal", description: "See where your application stands" },
    ],
  },
  {
    id: "academics",
    label: "Academics",
    children: [
      { label: "Programs", href: "/#programs", description: "Undergraduate and postgraduate" },
      { label: "Faculties", href: "/coming-soon/faculties", description: "Schools and departments" },
      { label: "Academic Calendar", href: "/coming-soon/academic-calendar", description: "Terms, exams and holidays" },
      { label: "Library", href: "/coming-soon/library", description: "Collections and study spaces" },
      { label: "Research", href: "/coming-soon/research", description: "Labs, centres and publications" },
    ],
  },
  {
    id: "student-life",
    label: "Student Life",
    children: [
      { label: "Campus Life", href: "/#campus-life", description: "Life on and around the quad" },
      { label: "Housing", href: "/coming-soon/housing", description: "Residences and commuting" },
      { label: "Clubs and Societies", href: "/coming-soon/clubs", description: "Find your community" },
      { label: "Health and Wellbeing", href: "/coming-soon/wellbeing", description: "Counselling and care" },
      { label: "Career Services", href: "/coming-soon/careers", description: "Internships and mentoring" },
    ],
  },
  { id: "news", label: "News & Events", href: "/#news" },
  { id: "about", label: "About Us", href: "/about" },
  { id: "contact", label: "Contact", href: "/contact" },
];

export const searchSuggestions: NavLink[] = [
  { label: "Start your application", href: "/signup" },
  { label: "Programs and courses", href: "/#programs" },
  { label: "Fees and scholarships", href: "/coming-soon/fees-scholarships" },
  { label: "Important dates", href: "/coming-soon/important-dates" },
  { label: "Track your application", href: "/portal" },
  { label: "Student Portal sign in", href: "/student/login" },
  { label: "Contact admissions", href: "/contact" },
];

/** Titles and short descriptions for the "coming soon" template. Slugs match the hrefs above. */
export const comingSoonPages: Record<string, { title: string; text: string; parent: string }> = {
  "admission-requirements": { title: "Admission Requirements", text: "Eligibility criteria, required documents and entrance guidance for each program.", parent: "Admissions" },
  "fees-scholarships": { title: "Fees and Scholarships", text: "Tuition schedules, payment options and merit scholarships of up to 25 percent.", parent: "Admissions" },
  "important-dates": { title: "Important Dates", text: "Application, document, decision and enrollment deadlines for the Fall 2027 intake.", parent: "Admissions" },
  faculties: { title: "Faculties", text: "Our schools, departments and the people who teach in them.", parent: "Academics" },
  "academic-calendar": { title: "Academic Calendar", text: "Term dates, examination windows and university holidays.", parent: "Academics" },
  library: { title: "Library", text: "Collections, digital journals and bookable study rooms.", parent: "Academics" },
  research: { title: "Research", text: "Research centres, labs and recent publications.", parent: "Academics" },
  housing: { title: "Housing", text: "On-campus residences, commuting options and how to apply.", parent: "Student Life" },
  clubs: { title: "Clubs and Societies", text: "Student-led clubs across sport, arts, technology and service.", parent: "Student Life" },
  wellbeing: { title: "Health and Wellbeing", text: "Counselling, medical care and accessibility support.", parent: "Student Life" },
  careers: { title: "Career Services", text: "Internships, employer events and one-to-one mentoring.", parent: "Student Life" },
  privacy: { title: "Privacy Policy", text: "How a real deployment would handle your personal information.", parent: "Legal" },
  terms: { title: "Terms of Use", text: "The terms that would apply to using this portal.", parent: "Legal" },
  accessibility: { title: "Accessibility", text: "Our commitment to an accessible website and the support available.", parent: "Legal" },
};
