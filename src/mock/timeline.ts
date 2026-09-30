import { transactions, txById } from "./transactions";
import type { TimelineEvent } from "./types";

const NAMES: Record<string, string> = {
  subject: "Subject wallet",
  walletA: "Wallet A",
  walletB: "Wallet B",
  unknownWallet: "Unknown wallet",
  mixer: "Mixer",
  deposit: "Deposit address",
  hot: "Exchange X hot wallet",
  bridge: "Bridge",
  tronWallet: "Tron wallet",
  vaspX: "Exchange X",
};
const name = (id: string) => NAMES[id];

const kindOf = (txId: string): TimelineEvent["kind"] => {
  if (txId === "t05") return "mixer";
  if (txId === "t06" || txId === "t08") return "crosschain";
  if (txId === "t07") return "sweep";
  return "transfer";
};

const titleOf = (txId: string): string => {
  const t = txById(txId);
  if (txId === "t05") return "Mixer interaction detected";
  if (txId === "t06") return "Cross-chain interaction detected";
  if (txId === "t08") return "Bridge release observed on Tron";
  return `${name(t.from)} → ${name(t.to)}`;
};

const tx = txById;

const minutesBetween = (fromIso: string, toIso: string) =>
  Math.round((Date.parse(toIso) - Date.parse(fromIso)) / 60_000);

const detailOf = (txId: string): string => {
  const t = tx(txId);
  const eth = `${t.amountEth.toFixed(2)} ETH`;
  if (txId === "t07") {
    // Sweep delay is measured from the deposit that funded it.
    return `${eth} · swept ${minutesBetween(tx("t04").timestamp, t.timestamp)} min after deposit`;
  }
  if (txId === "t08") return `${eth} equivalent released on Tron`;
  if (txId === "t05" || txId === "t06") return `${name(t.from)} → ${name(t.to)} · ${eth}`;
  return eth;
};

/** Chronological, derived from the transaction list. */
export const timeline: TimelineEvent[] = [...transactions]
  .sort((a, b) => a.timestamp.localeCompare(b.timestamp))
  .map((t) => ({
    id: `ev-${t.id}`,
    timestamp: t.timestamp,
    kind: kindOf(t.id),
    title: titleOf(t.id),
    detail: detailOf(t.id),
    txId: t.id,
    highlight: { nodeIds: [t.from, t.to], edgeIds: [t.id] },
  }));
