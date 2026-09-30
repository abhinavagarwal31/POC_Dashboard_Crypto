import { ArrowRight, Link2 } from "lucide-react";
import { formatEth } from "@/lib/format";
import { crossChainTransfers } from "@/mock";
import { Field } from "./Field";

export function CrossChainCard({ bridgeNodeId }: { bridgeNodeId: string }) {
  const t = crossChainTransfers.find((x) => x.bridgeNodeId === bridgeNodeId);
  if (!t) return null;
  return (
    <div className="rounded-sm border border-[oklch(0.72_0.12_290/0.5)] bg-[oklch(0.72_0.12_290/0.06)] p-2.5">
      <div className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.14em] text-[oklch(0.8_0.1_290)]">
        <Link2 className="size-3" />
        CROSS-CHAIN TRANSFER
      </div>
      <div className="flex items-center gap-2 text-sm font-semibold">
        {t.sourceChain}
        <ArrowRight className="size-3.5 text-muted-foreground" />
        {t.destinationChain}
      </div>
      <div className="mt-2 space-y-2">
        <Field label="Transferred" mono>
          {formatEth(t.amountEthEquivalent)}
          <span className="ml-1 font-sans text-[11px] text-muted-foreground">
            equivalent
          </span>
        </Field>
        <Field label="Status">
          <span className="text-ok">{t.status}</span>
        </Field>
      </div>
    </div>
  );
}
