"use client";

import { Menu, Search } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { baseProfile } from "@/data/mock/student";
import { branding } from "@/config/branding";
import { useProfileSeed } from "@/lib/studentData";
import { useStudentSession } from "@/lib/studentSession";
import BackToTop from "@/components/site/BackToTop";
import BrandLoader from "@/components/shared/BrandLoader";
import Logo from "@/components/shared/Logo";
import Dialog from "@/components/ui/Dialog";
import SidebarNav from "./SidebarNav";
import UserMenu from "./UserMenu";
import { extraTitles, isNavActive, studentNav } from "./nav";

/** Client-side route guard + layout. DEMO ONLY: this does not secure anything. */
export default function StudentShell({ children }: { children: React.ReactNode }) {
  const { ready, studentId, logout } = useStudentSession();
  const router = useRouter();
  const pathname = usePathname();
  const seed = useProfileSeed();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (ready && !studentId) router.replace("/student/login");
  }, [ready, studentId, router]);

  if (!ready || !studentId) return <BrandLoader label="Checking your session" />;

  const name = `${seed.firstName ?? baseProfile.firstName} ${seed.lastName ?? baseProfile.lastName}`.trim();
  const title = studentNav.find((n) => isNavActive(n, pathname))?.label ?? extraTitles[pathname] ?? branding.portalName;
  const homeLabel = `${branding.name} ${branding.portalName} home`;

  const onLogout = () => {
    logout();
    router.replace("/student/login");
  };

  return (
    <div className="flex flex-1 lg:grid lg:grid-cols-[17.5rem_1fr]">
      {/* Desktop sidebar: Horizon Navy */}
      <nav aria-label="Student portal" className="sticky top-0 hidden h-dvh flex-col overflow-y-auto bg-brand-900 text-white lg:flex print:hidden">
        <div className="px-5 pb-5 pt-6">
          <Link href="/student" aria-label={homeLabel}>
            <Logo tone="light" className="h-11 w-auto" priority />
          </Link>
        </div>
        <div className="flex-1 px-4 pb-6">
          <SidebarNav />
        </div>
        <p className="mx-4 border-t border-white/10 px-1 py-4 font-heading text-[13px] italic text-white/55">{branding.tagline}</p>
      </nav>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-line bg-surface px-4 py-2.5 sm:px-6 print:hidden">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            aria-haspopup="dialog"
            className="-ml-1 rounded-md p-2 text-primary hover:bg-muted lg:hidden"
          >
            <Menu aria-hidden className="h-5 w-5" />
          </button>
          <Link href="/student" aria-label={homeLabel} className="lg:hidden">
            <Logo className="h-8 w-auto" />
          </Link>
          <div className="hidden leading-tight lg:block">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-subtle">{branding.name} {branding.portalName}</p>
            <p className="font-heading text-xl font-semibold text-primary">{title}</p>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <div role="search" className="relative hidden xl:block">
              <Search aria-hidden className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-n-400" />
              <input
                type="search"
                readOnly
                aria-label="Search (not available in the demo)"
                placeholder="Search (demo)"
                className="h-9 w-64 rounded-full border border-line bg-muted pl-9 pr-3 text-[13px] placeholder:text-n-400"
              />
            </div>
            <UserMenu name={name} studentId={studentId} onLogout={onLogout} />
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-16 pt-6 sm:px-6 lg:px-8 lg:pt-8">
          <p className="mb-6 rounded-md border border-warning/30 bg-warning-bg px-3 py-2 text-xs font-medium text-warning-fg print:hidden" role="note">
            Demo environment: all student data on these pages is sample data and is not saved to any server.
          </p>
          {children}
        </main>
      </div>

      <BackToTop />

      {/* Mobile drawer: same navy treatment */}
      <Dialog open={drawerOpen} onClose={() => setDrawerOpen(false)} label="Student portal menu" variant="drawer" tone="dark">
        <div id="student-nav-mobile" className="p-4 pt-5">
          <div className="mb-5 pr-10"><Logo tone="light" className="h-10 w-auto" /></div>
          <SidebarNav onNavigate={() => setDrawerOpen(false)} />
          <p className="mt-6 border-t border-white/10 px-1 pt-4 font-heading text-[13px] italic text-white/55">{branding.tagline}</p>
        </div>
      </Dialog>
    </div>
  );
}
