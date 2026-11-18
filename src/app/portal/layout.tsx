import Link from "next/link";
import PortalNav from "@/components/PortalNav";
import ApplicantBadge from "@/components/portal/ApplicantBadge";
import Logo from "@/components/shared/Logo";
import { buttonStyles } from "@/components/ui/Button";
import { branding } from "@/config/branding";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col">
      <header className="sticky top-0 z-20 border-b-[3px] border-accent bg-brand-900 text-white print:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 pt-3">
          <Link href="/" aria-label={`${branding.name} home`}>
            <Logo tone="light" className="h-10 w-auto" priority />
          </Link>
          <div className="flex items-center gap-3">
            <ApplicantBadge />
            <Link href="/login" className={buttonStyles({ variant: "secondary", size: "sm", className: "!border-white/30 !bg-transparent !text-white hover:!bg-white/10" })}>
              Log out
            </Link>
          </div>
        </div>
        <div className="mx-auto mt-2 max-w-6xl px-5">
          <PortalNav />
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-5 pb-20 pt-8 sm:pt-10">{children}</main>
    </div>
  );
}
