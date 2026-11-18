"use client";

import { WalletCards } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFeeAccount } from "@/lib/feeStore";
import PageHeader from "@/components/shared/PageHeader";
import Tabs from "@/components/shared/Tabs";
import { buttonStyles } from "@/components/ui/Button";
import BalanceStrip from "./BalanceStrip";
import LedgerTab from "./LedgerTab";
import PaymentsTab from "./PaymentsTab";

const tabs = [
  { id: "ledger", label: "Fee Ledger" },
  { id: "payments", label: "Payments" },
];

/** Route-driven tabs: /student/fees/ledger and /student/fees/payments are both deep-linkable. */
export default function FeesModule({ tab }: { tab: "ledger" | "payments" }) {
  const router = useRouter();
  const { account, preselect } = useFeeAccount();

  return (
    <>
      <PageHeader title="Fee Payments" description="Your fee schedule, statement and receipts, and a simulated way to pay what is due.">
        {tab !== "payments" && (
          <Link href="/student/fees/payments" className={buttonStyles()}>
            <WalletCards aria-hidden className="h-4 w-4" /> Make a payment
          </Link>
        )}
      </PageHeader>
      <BalanceStrip account={account} />
      <Tabs tabs={tabs} value={tab} onValueChange={(id) => router.push(`/student/fees/${id}`)} label="Fee payments sections">
        {(active) => (active === "payments" ? <PaymentsTab account={account} preselect={preselect} /> : <LedgerTab account={account} />)}
      </Tabs>
    </>
  );
}
