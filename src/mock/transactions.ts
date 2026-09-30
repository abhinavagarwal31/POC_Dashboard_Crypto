import { round2 } from "@/lib/format";
import type {
  CrossChainTransfer,
  GraphLink,
  TracePath,
  Transaction,
} from "./types";

/**
 * The linked transactions of CASE-20491. Amounts are conserved across hops
 * (net of network fees, rounded). "Hop" counts wallets away from the subject.
 */
export const transactions: Transaction[] = [
  {
    id: "t01",
    hash: "0x9d07d1552b8636aad2b5d4ee32846f6d214e93572f161a3dc4a12166b95867ae",
    from: "subject",
    to: "walletA",
    amountEth: 11.94,
    timestamp: "2026-09-30T10:42:17Z",
    block: 18_492_078,
    chain: "ethereum",
    hop: 1,
  },
  {
    id: "t03",
    hash: "0xc8f55e7abceae2ab496711ba3ab43f53c6e47e85cc5e6931692c47a96a851e40",
    from: "walletA",
    to: "walletB",
    amountEth: 11.94,
    timestamp: "2026-09-30T10:44:41Z",
    block: 18_492_090,
    chain: "ethereum",
    hop: 2,
  },
  {
    id: "t04",
    hash: "0x7af277b1328f2dd1e74845ed4851a82951accfae1a4376d904b2f8322550c921",
    from: "walletB",
    to: "deposit",
    amountEth: 7.11,
    timestamp: "2026-09-30T10:47:05Z",
    block: 18_492_102,
    chain: "ethereum",
    hop: 3,
  },
  {
    id: "t05",
    hash: "0x6c60fcdb0bf405ddfbf20e4ee024bd61d5121f837583836adf1f8cd90f436b9a",
    from: "walletB",
    to: "mixer",
    amountEth: 1.41,
    timestamp: "2026-09-30T10:49:29Z",
    block: 18_492_114,
    chain: "ethereum",
    hop: 3,
  },
  {
    id: "t06",
    hash: "0x1d59935b4ec0502832bc2a07fb6524bb7708c3981040f075dbfc8120f580ee24",
    from: "walletB",
    to: "bridge",
    amountEth: 3.42,
    timestamp: "2026-09-30T10:52:17Z",
    block: 18_492_128,
    chain: "ethereum",
    hop: 3,
  },
  {
    id: "t02",
    hash: "0x1f1cbd81007087bf75caf7c83a5bdb7638089982d8b4d3be6c62e7798998b1df",
    from: "subject",
    to: "unknownWallet",
    amountEth: 0.9,
    timestamp: "2026-09-30T10:55:05Z",
    block: 18_492_142,
    chain: "ethereum",
    hop: 1,
  },
  {
    id: "t07",
    hash: "0x99891d1de21049a6e6467d40b5b42955edb4b455f0cf5e9be6ea35f689d50b6b",
    from: "deposit",
    to: "hot",
    amountEth: 7.11,
    timestamp: "2026-09-30T11:27:05Z",
    block: 18_492_302,
    chain: "ethereum",
    hop: 4,
  },
  {
    id: "t08",
    hash: "0x46f41dfc18ad4a0a00f6798614c7a5ae4dee021390202ba9e8de636fd203b283",
    from: "bridge",
    to: "tronWallet",
    amountEth: 3.42, // ETH-equivalent value of the TRX released on Tron
    timestamp: "2026-09-30T11:29:41Z",
    block: 68_204_417,
    chain: "tron",
    hop: 4,
  },
  {
    id: "t09",
    hash: "0xadefa5cedcd5fdec3aea2105bd4a85bc8a73ca88ff153a761d1716c10ce12fc4",
    from: "tronWallet",
    to: "vaspX",
    amountEth: 3.42,
    timestamp: "2026-09-30T11:44:12Z",
    block: 68_204_707,
    chain: "tron",
    hop: 5,
  },
];

export const txById = (id: string): Transaction => {
  const t = transactions.find((x) => x.id === id);
  if (!t) throw new Error(`Unknown transaction: ${id}`);
  return t;
};

/** Edges drawn on the graph. One per transaction, plus one attribution link. */
export const graphLinks: GraphLink[] = [
  ...transactions.map<GraphLink>((t) => ({
    id: t.id,
    source: t.from,
    target: t.to,
    kind: "transfer",
    txId: t.id,
  })),
  {
    id: "attr-hot-vasp",
    source: "hot",
    target: "vaspX",
    kind: "attribution",
    label: "Operated by",
  },
];

/** Funds that left the subject wallet into the traced graph. */
export const fundsTracedEth = round2(
  transactions
    .filter((t) => t.from === "subject")
    .reduce((sum, t) => sum + t.amountEth, 0),
);

export const tracePaths: TracePath[] = [
  {
    id: "primary",
    label: "Primary trace",
    nodeIds: ["subject", "walletA", "walletB", "deposit", "hot"],
    edgeIds: ["t01", "t03", "t04", "t07"],
  },
  {
    id: "cross-chain",
    label: "Cross-chain trace",
    nodeIds: ["walletB", "bridge", "tronWallet", "vaspX"],
    edgeIds: ["t06", "t08", "t09"],
  },
];

export const crossChainTransfers: CrossChainTransfer[] = [
  {
    id: "xc-01",
    bridgeNodeId: "bridge",
    sourceChain: "Ethereum",
    destinationChain: "Tron",
    amountEthEquivalent: 3.42,
    status: "TRACE LINKED",
    sourceTxId: "t06",
    destinationTxId: "t08",
  },
];
