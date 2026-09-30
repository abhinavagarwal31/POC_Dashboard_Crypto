import { formatEth, formatTimestamp, shortAddr } from "@/lib/format";
import { txById, walletById } from "@/mock";
import { Field } from "./Field";

function Party({ nodeId }: { nodeId: string }) {
  const w = walletById(nodeId);
  return (
    <span title={w.address}>
      {w.address ? shortAddr(w.address) : w.role}
      <span className="ml-1.5 font-sans text-[11px] text-muted-foreground">
        {w.label}
      </span>
    </span>
  );
}

export function TransactionCard({ txId }: { txId: string }) {
  const tx = txById(txId);
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 md:grid-cols-3">
      <Field label="Amount" mono>
        {formatEth(tx.amountEth)}
      </Field>
      <Field label="From" mono>
        <Party nodeId={tx.from} />
      </Field>
      <Field label="To" mono>
        <Party nodeId={tx.to} />
      </Field>
      <Field label="Timestamp" mono>
        {formatTimestamp(tx.timestamp)}
      </Field>
      <Field label="Block" mono>
        {tx.block.toLocaleString("en-US")}
        <span className="ml-1.5 font-sans text-[11px] text-muted-foreground">
          {tx.chain === "tron" ? "Tron" : "Ethereum"}
        </span>
      </Field>
      <Field label="Hop" mono>
        {tx.hop}
      </Field>
      <Field label="Transaction hash" mono className="col-span-2 md:col-span-3">
        <span title={tx.hash}>{tx.hash}</span>
      </Field>
    </div>
  );
}
