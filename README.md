This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Demo prototype notes

This is a frontend-only prototype. There is no backend, database or real authentication.

- Student Portal login (`/student/login`) uses hardcoded demo credentials from `src/config/demo-credentials.ts`
  (`STU2027001` / `Student@123`). This is **not secure authentication**; it stores only the Student ID in
  `sessionStorage` and guards routes on the client. A real backend must replace it.
- All student, fee, course, attendance and assignment data is demo data in `src/data/mock/`, served through
  async functions in `src/services/student.ts` so a real API can replace them without UI changes.
- Payments, uploads and DigiLocker are simulated or placeholders.

### Student Portal tabs

Navigation is defined once in `src/components/student/nav.ts` (sidebar, mobile drawer and dashboard quick links read it):
Dashboard, Profile and status, Documents and Credentials, Course Registration, Academic Calendar, Attendance, Assignments, Learning services.
The compact Digital Student ID card sits above the navigation and opens `/student/id-card`.

- Documents and Credentials: two sub-tabs (Document Vault, Academic Credentials).
- Academic Calendar: key dates, upcoming activities, weekly timetable, and "My Registered Courses" (after courses are submitted).
- Assignments: Upcoming (default), Pending, Submitted, Graded.
- Enrollment Summary: success screen, dashboard, Profile page and `/student/enrollment-summary` (printable).
- Redirects: `/student/credentials`, `/student/academic-plan` and `/student/timetable` forward to the merged pages.


### Design system

Tokens (colour, type scale, radii, elevation, motion) live in `src/app/globals.css`. Primitives: `src/components/ui/` (Button, Dialog, Toast, DataTable, Stat, Illustration) and `src/components/shared/` (Tabs, ProgressBar, ProgressRing, States, FormControls, PageHeader). Fonts: Fraunces (display), Manrope (body), IBM Plex Mono (IDs) via `next/font`. Icons: `lucide-react`.

### Fee Payments (demo)

`/student/fees/ledger` and `/student/fees/payments` (`/student/fees` redirects to the ledger). Nav group "Finance" sits between Academics and Resources.
- Single source of truth: `src/lib/fees.ts` builds the schedule, ledger and balance from the enrollment fee step (`src/data/enrollment.ts`) plus session payments (`src/lib/feeStore.ts`, sessionStorage). Only amounts, method type and references are stored; card, UPI and bank details never are.
- Mock services (future API seams): `src/services/fees.ts` (`getFeeAccount`, `getFeeSchedule`, `getFeeLedger`, `submitDemoPayment`).
- All payments are simulated. Use "Simulate failure" under Review and pay to test the failure path.

### Branding (Horizon University)

Brand config: `src/config/branding.ts` (name, tagline, logo variants, campus crops, blur placeholders). Assets: `public/branding/` (`logo-full`, `logo-compact`, `logo-mark`, light versions for dark surfaces, `campus-hero|banner|portrait.webp`). Favicon, Apple icon and Open Graph images are generated from them into `src/app/` (`icon.png`, `apple-icon.png`, `opengraph-image.jpg`). Originals are kept in `design/branding-source/`. To change the logo or photo, replace the files and keep the names (or update the config). Tokens (Horizon Navy `#04305B`, Horizon Gold `#EDB34B`) are in `src/app/globals.css`.

### Public site (Home, About Us, Contact)

Route group `src/app/(site)/` owns the public layout (skip link, two-tier header, footer, back-to-top). It contains Home (`/`), `/about`, `/contact`, the applicant `/login` and `/signup`, and a "coming soon" template at `/coming-soon/[slug]` for navigation links whose full page is not built yet. `/portal` and `/student` have their own shells and never show the public header or footer.
- Components: `src/components/site/` (SiteHeader, MobileMenu, SearchOverlay, HeroSlider, AnnouncementTicker, JourneySection, ProgramsCarousel, StatsBand, CampusLifeSection, NewsEvents, Testimonials, CtaBand, SiteFooter, BackToTop, Reveal, Accordion, ContactForm).
- Content (typed, editable): `src/data/site/` (`nav.ts` is the header navigation map, plus `home.ts`, `about.ts`, `contact.ts`). All names, figures, dates and contact details are demo content.
- Sliders, the ticker, count-up and reveal animations use React and CSS only and respect `prefers-reduced-motion`. Forms (contact, newsletter, search) are mock and store nothing.
