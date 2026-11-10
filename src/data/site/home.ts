// DEMO CONTENT for the public Home page. Names, figures and dates are invented.
export type HeroSlide = {
  id: string;
  eyebrow: string;
  headline: string;
  /** The italic gold phrase inside the headline. */
  emphasis: string;
  headlineEnd: string;
  text: string;
  /** Photo variant, or "brand" for a navy slide with a crest watermark. */
  media: "hero" | "banner" | "portrait" | "brand";
  position?: string;
  ctas: { label: string; href: string; primary?: boolean }[];
};

export const heroSlides: HeroSlide[] = [
  {
    id: "apply",
    eyebrow: "Applications for Fall 2027 are open",
    headline: "Your admission journey,",
    emphasis: "start to finish",
    headlineEnd: "in one place.",
    text: "Apply, upload your documents, track your review and accept your offer from a single, simple applicant portal.",
    media: "hero",
    position: "right center",
    ctas: [
      { label: "Start your application", href: "/signup", primary: true },
      { label: "I already have one", href: "/login" },
    ],
  },
  {
    id: "programs",
    eyebrow: "Programs",
    headline: "Programs built around",
    emphasis: "your horizon",
    headlineEnd: "",
    text: "From computer science to psychology, choose a path with small classes, industry projects and mentors who know your name.",
    media: "brand",
    ctas: [
      { label: "Explore programs", href: "/#programs", primary: true },
      { label: "How to apply", href: "/#admission-journey" },
    ],
  },
  {
    id: "campus",
    eyebrow: "Campus life",
    headline: "A campus where",
    emphasis: "you belong",
    headlineEnd: "from day one.",
    text: "Sunlit walkways, shared study spaces and a community that celebrates every kind of learner.",
    media: "portrait",
    position: "center 35%",
    ctas: [
      { label: "Book a campus visit", href: "/contact", primary: true },
      { label: "Explore campus life", href: "/#campus-life" },
    ],
  },
  {
    id: "scholarships",
    eyebrow: "Scholarships",
    headline: "Merit scholarships",
    emphasis: "up to 25 percent",
    headlineEnd: "of tuition.",
    text: "Every applicant is considered automatically. Apply early and see your award alongside your offer.",
    media: "brand",
    ctas: [
      { label: "Fees and scholarships", href: "/coming-soon/fees-scholarships", primary: true },
      { label: "Start your application", href: "/signup" },
    ],
  },
];

export const announcements = [
  "Fall 2027 applications close December 1, 2026",
  "Merit scholarship window open until December 8",
  "Admission decisions released January 10, 2027",
  "Orientation for new students: August 10 to 12, 2027",
  "Campus visit days every second Saturday",
];

export const journeySteps = [
  { title: "Apply", text: "Create your account and complete the application form.", icon: "FileText" },
  { title: "Upload documents", text: "Add marksheets, ID and a photo. We show what is missing.", icon: "Upload" },
  { title: "Track your review", text: "Follow each stage of the review from your dashboard.", icon: "ClipboardCheck" },
  { title: "Receive your offer", text: "See your decision and any scholarship, then accept online.", icon: "Award" },
  { title: "Enroll", text: "Register, pay fees and complete onboarding to join Horizon.", icon: "GraduationCap" },
] as const;

export const programs = [
  { id: "bsc-cs", name: "BSc Computer Science", level: "Undergraduate", duration: "3 years", intake: "Fall 2027" },
  { id: "bsc-ds", name: "BSc Data Science", level: "Undergraduate", duration: "3 years", intake: "Fall 2027" },
  { id: "bba", name: "BBA Business Administration", level: "Undergraduate", duration: "3 years", intake: "Fall 2027" },
  { id: "bcom", name: "BCom Accounting and Finance", level: "Undergraduate", duration: "3 years", intake: "Fall 2027" },
  { id: "ba-psy", name: "BA Psychology", level: "Undergraduate", duration: "3 years", intake: "Fall 2027" },
  { id: "msc-ds", name: "MSc Data Science", level: "Postgraduate", duration: "2 years", intake: "Fall 2027" },
];

/** Demo figures, not real statistics. */
export const stats = [
  { value: 12500, suffix: "+", label: "Students on campus" },
  { value: 48, suffix: "", label: "Programs offered" },
  { value: 620, suffix: "", label: "Faculty and mentors" },
  { value: 94, suffix: "%", label: "Graduate satisfaction" },
];

export const campusPoints = [
  { title: "Small classes, real mentors", text: "Learn in groups where faculty know your name and your goals." },
  { title: "Spaces to think and gather", text: "Quiet libraries, open studios and lawns made for conversation." },
  { title: "A community that includes you", text: "Clubs, support teams and traditions that help every student belong." },
];

export type NewsItem = { id: string; category: "News" | "Event"; date: string; title: string; text: string };
export const news: NewsItem[] = [
  { id: "n1", category: "Event", date: "2026-12-05", title: "Open campus day for applicants and families", text: "Tour the quad, meet faculty and join a live admissions Q and A." },
  { id: "n2", category: "News", date: "2026-11-18", title: "Merit scholarships now open for Fall 2027", text: "Awards of up to 25 percent of tuition, considered automatically." },
  { id: "n3", category: "Event", date: "2026-12-12", title: "Computer Science showcase and demo night", text: "Student teams present projects built with industry mentors." },
  { id: "n4", category: "News", date: "2026-11-05", title: "New digital library collections available", text: "Thousands of journals and e-books added for all programs." },
  { id: "n5", category: "Event", date: "2027-01-10", title: "Admission decisions released", text: "Sign in to the applicant portal to see your decision and offer." },
  { id: "n6", category: "News", date: "2026-10-28", title: "Horizon opens a new student wellbeing centre", text: "Counselling, accessibility and peer support, all in one place." },
];

export const testimonials = [
  { id: "t1", quote: "The applicant portal told me exactly what was missing at every step. I never had to chase anyone for an answer.", name: "Aanya Rao", program: "BSc Computer Science, Class of 2029" },
  { id: "t2", quote: "My mentor knew my name in week one. Small classes made it easy to ask the questions I would have kept to myself.", name: "Daniel Okafor", program: "BBA Business Administration, Class of 2029" },
  { id: "t3", quote: "From the offer letter to my student ID, everything felt organised and welcoming. I felt like I belonged before I arrived.", name: "Meera Nair", program: "BA Psychology, Class of 2029" },
];
