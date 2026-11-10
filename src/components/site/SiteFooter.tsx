import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { address, offices } from "@/data/site/contact";
import { branding } from "@/config/branding";
import Logo from "@/components/shared/Logo";
import NewsletterForm from "./NewsletterForm";
import SocialIcons from "./SocialIcons";

const quick = [
  ["Home", "/"],
  ["About Us", "/about"],
  ["Admissions", "/#admission-journey"],
  ["Academics", "/#programs"],
  ["Student Life", "/#campus-life"],
  ["News & Events", "/#news"],
  ["Contact", "/contact"],
] as const;

const students = [
  ["Login", "/login"],
  ["Create account", "/signup"],
  ["Track application", "/portal"],
  ["Student Portal", "/student/login"],
  ["Fee payments", "/student/fees/ledger"],
  ["Help and contact", "/contact"],
] as const;

const legal = [
  ["Privacy Policy", "/coming-soon/privacy"],
  ["Terms", "/coming-soon/terms"],
  ["Accessibility", "/coming-soon/accessibility"],
] as const;

const heading = "mb-4 text-[13px] font-bold uppercase tracking-[0.12em] text-accent";
const link = "text-sm text-white/80 underline-offset-4 hover:text-white hover:underline";

export default function SiteFooter() {
  return (
    <footer className="bg-brand-900 text-white print:hidden">
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-5 py-8">
          <div>
            <h2 className="!text-xl !text-white">Stay updated</h2>
            <p className="mt-1 text-sm text-white/75">Deadlines, open days and scholarship news, a few times a term.</p>
          </div>
          <NewsletterForm />
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <Logo variant="full" tone="light" className="h-14 w-auto" />
          <p className="mt-4 max-w-xs text-sm text-white/75">
            A university where every student can learn, grow and belong. Apply, enroll and manage your studies in one place.
          </p>
          <p className="mt-4 font-heading text-lg italic text-accent">{branding.tagline}</p>
        </div>
        <nav aria-label="Quick links">
          <h2 className={heading}>Quick links</h2>
          <ul className="space-y-2.5">
            {quick.map(([l, h]) => <li key={l}><Link href={h} className={link}>{l}</Link></li>)}
          </ul>
        </nav>
        <nav aria-label="For students">
          <h2 className={heading}>For students</h2>
          <ul className="space-y-2.5">
            {students.map(([l, h]) => <li key={l}><Link href={h} className={link}>{l}</Link></li>)}
          </ul>
        </nav>
        <div>
          <h2 className={heading}>Contact</h2>
          <ul className="space-y-3 text-sm text-white/80">
            <li className="flex gap-3"><MapPin aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent" /><span>{address.join(", ")}</span></li>
            <li className="flex gap-3"><Phone aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent" /><span>{offices[0].phone}</span></li>
            <li className="flex gap-3"><Mail aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent" /><a href={`mailto:${offices[0].email}`} className="underline-offset-4 hover:underline">{offices[0].email}</a></li>
            <li className="pl-7 text-white/65">Mon to Fri, 9:00 AM to 5:30 PM</li>
          </ul>
          <div className="mt-6"><SocialIcons /></div>
        </div>
      </div>

      <div className="border-t border-accent/40">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-5 py-5 text-[13px] text-white/70 md:flex-row md:items-center">
          <p>&copy; 2026 {branding.name}. All rights reserved. <span className="text-white/50">Demo environment.</span></p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            {legal.map(([l, h]) => <li key={l}><Link href={h} className="underline-offset-4 hover:text-white hover:underline">{l}</Link></li>)}
          </ul>
        </div>
      </div>
    </footer>
  );
}
