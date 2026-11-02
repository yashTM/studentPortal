import Link from "next/link";
import PortalNav from "@/components/PortalNav";
import ApplicantBadge from "@/components/portal/ApplicantBadge";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col bg-muted/50">
      <header className="border-b border-primary/10 bg-background">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 pt-4">
          <Link href="/" className="font-heading text-xl font-bold text-primary">
            Student Portal
          </Link>
          <div className="flex items-center gap-3">
            <ApplicantBadge />
            <Link
              href="/login"
              className="rounded-full border border-primary/30 px-4 py-1.5 text-sm font-semibold text-primary hover:bg-muted"
            >
              Log out
            </Link>
          </div>
        </div>
        <div className="mx-auto mt-3 max-w-6xl px-5">
          <PortalNav />
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-8">
        {children}
      </main>
    </div>
  );
}
