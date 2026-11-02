"use client";

import { useRouter } from "next/navigation";
import { resetState, updateState } from "@/lib/applicantStore";

function nameFromEmail(email: string) {
  const local = email.split("@")[0] ?? "";
  const name = local
    .split(/[._-]+/)
    .filter(Boolean)
    .map((p) => p[0].toUpperCase() + p.slice(1))
    .join(" ");
  return name || "Applicant";
}

export default function DemoForm({
  mode,
  submitLabel,
  children,
}: {
  mode: "login" | "signup";
  submitLabel: string;
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const email = String(data.get("email") ?? "").trim();
        const name = String(data.get("name") ?? "").trim();

        if (mode === "signup") {
          resetState({ name: name || nameFromEmail(email), email });
        } else {
          updateState((s) =>
            s.account && s.account.email.toLowerCase() === email.toLowerCase()
              ? s
              : { ...s, account: { name: nameFromEmail(email), email } },
          );
        }
        router.push("/portal");
      }}
    >
      {children}
      <button
        type="submit"
        className="w-full rounded-lg bg-primary py-2.5 font-medium text-white hover:opacity-90"
      >
        {submitLabel}
      </button>
      <p className="text-center text-xs text-foreground/60">
        Demo preview: any details will take you into the sample applicant portal.
      </p>
    </form>
  );
}
