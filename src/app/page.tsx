import Link from "next/link";

const stages = [
  {
    title: "Create your account",
    summary: "Sign up in a minute with your email.",
    points: ["One account for your whole application", "Save and come back anytime"],
  },
  {
    title: "Fill in your application",
    summary: "Personal, contact and academic details, plus your program choice.",
    points: ["Answers save automatically", "Review everything before you submit"],
  },
  {
    title: "Upload documents & track",
    summary: "Add your marksheets and ID, then follow the review.",
    points: ["See exactly what is missing", "Status updates as you go"],
  },
  {
    title: "Get your decision",
    summary: "Receive your offer of admission in the portal.",
    points: ["Scholarship details included", "Accept your offer online"],
  },
  {
    title: "Enroll and join",
    summary: "Secure your seat and get ready for day one.",
    points: ["Pay your deposit", "Choose hostel and orientation"],
  },
];

const features = [
  {
    title: "Always know what's next",
    text: "Your dashboard shows your current stage, what is missing and every deadline.",
  },
  {
    title: "Documents without the back-and-forth",
    text: "Upload once, see the review status and fix anything flagged in a click.",
  },
  {
    title: "Private and secure",
    text: "Your application is only visible to you and the admissions team.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="sticky top-0 z-10 border-b border-primary/10 bg-background/90 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link href="/" className="font-heading text-xl font-bold text-primary">
            Student Portal
          </Link>
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Link
              href="/login"
              className="rounded-full px-4 py-2 text-primary hover:bg-muted"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="rounded-full bg-primary px-4 py-2 text-primary-foreground hover:opacity-90"
            >
              Create account
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-br from-primary to-[oklch(62%_0.17_250)] text-primary-foreground">
          <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
          <div className="relative mx-auto max-w-6xl px-5 py-24 sm:py-32">
            <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wide text-accent-foreground">
              Applications for Fall 2027 are open
            </span>
            <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight sm:text-6xl">
              Your admission journey, <em className="text-accent">start to finish</em>{" "}
              in one place.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-primary-foreground/80">
              Apply, upload your documents, track your review and accept
              your offer from a single, simple applicant portal.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/signup"
                className="rounded-full bg-accent px-7 py-3 text-center font-semibold text-accent-foreground hover:opacity-90"
              >
                Start your application
              </Link>
              <Link
                href="/login"
                className="rounded-full border border-primary-foreground/40 px-7 py-3 text-center font-semibold hover:bg-primary-foreground/10"
              >
                I already have one
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="text-3xl font-semibold text-primary sm:text-4xl">
            Five stages. One clear path.
          </h2>
          <ol className="mt-12 divide-y divide-primary/10 border-y border-primary/10">
            {stages.map((s, i) => (
              <li
                key={s.title}
                className="grid gap-4 py-8 sm:grid-cols-[6rem_1fr_1fr]"
              >
                <span className="font-heading text-4xl font-semibold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-primary">
                    {s.title}
                  </h3>
                  <p className="mt-1 text-foreground/70">{s.summary}</p>
                </div>
                <ul className="space-y-1 text-sm text-foreground/80">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span className="text-accent">●</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        <section className="bg-muted">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:grid-cols-3">
            {features.map((f) => (
              <div key={f.title}>
                <h3 className="text-xl font-semibold text-primary">
                  {f.title}
                </h3>
                <p className="mt-2 text-foreground/70">{f.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-20 text-center">
          <h2 className="text-3xl font-semibold text-primary sm:text-4xl">
            Ready to get started?
          </h2>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/signup"
              className="rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground hover:opacity-90"
            >
              Create account
            </Link>
            <Link
              href="/login"
              className="rounded-full border border-primary px-7 py-3 font-semibold text-primary hover:bg-muted"
            >
              Log in
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-primary/10">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-2 px-5 py-8 text-sm text-foreground/70 sm:flex-row">
          <span className="font-heading font-bold text-primary">
            Student Portal
          </span>
          <span>&copy; 2026 Student Portal. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
