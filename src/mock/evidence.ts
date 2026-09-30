import { findings } from "./findings";
import { providers, providerAgreement } from "./providers";
import { fundsTracedEth, txById } from "./transactions";
import { fundFlowPctToExchangeX, tracedToExchangeXEth, avgSweepMinutes } from "./vasp";
import type { Evidence } from "./types";

const statement = (id: string) => findings.find((f) => f.id === id)!.statement;
const agreeing = providers.filter((p) => p.kind === "commercial" && p.verdict === "consistent");
const mixerEth = txById("t05").amountEth;

export const evidence: Evidence[] = [
  {
    findingId: "F-001",
    quote: statement("F-001"),
    supporting: [
      `${tracedToExchangeXEth.toFixed(2)} ETH of ${fundsTracedEth.toFixed(2)} ETH traced funds reached Exchange X (${fundFlowPctToExchangeX}%)`,
      `${txById("t07").amountEth.toFixed(2)} ETH via the deposit address and hot wallet`,
      `${txById("t09").amountEth.toFixed(2)} ETH via the Ethereum → Tron bridge path`,
      `${mixerEth.toFixed(2)} ETH entered a mixer and ${txById("t02").amountEth.toFixed(2)} ETH went to an unclassified wallet (not attributed)`,
    ],
    highlight: {
      nodeIds: ["subject", "walletA", "walletB", "deposit", "hot", "vaspX", "bridge", "tronWallet"],
      edgeIds: ["t01", "t03", "t04", "t07", "attr-hot-vasp", "t06", "t08", "t09"],
    },
  },
  {
    findingId: "F-002",
    quote: statement("F-002"),
    supporting: [
      "7 deposits observed",
      "6 corresponding hot-wallet sweeps",
      `Average sweep time: ${avgSweepMinutes} minutes`,
      "Destination wallet labelled Exchange X Hot Wallet",
      "Cluster relationship detected",
    ],
    highlight: {
      nodeIds: ["walletB", "deposit", "hot", "vaspX"],
      edgeIds: ["t04", "t07", "attr-hot-vasp"],
    },
  },
  {
    findingId: "F-003",
    quote: statement("F-003"),
    supporting: [
      `${txById("t06").amountEth.toFixed(2)} ETH deposited into the bridge by Wallet B`,
      "Matching release observed on Tron 2 min 24 s later",
      "Transfers linked by amount and timing",
      "Tron wallet forwarded the full amount to an Exchange X-labelled address",
    ],
    highlight: {
      nodeIds: ["walletB", "bridge", "tronWallet", "vaspX"],
      edgeIds: ["t06", "t08", "t09"],
    },
  },
  {
    findingId: "F-004",
    quote: statement("F-004"),
    supporting: [
      ...agreeing.map((p) => `${p.name} labels the destination ${p.label}`),
      "Elliptic returned no label",
      `Agreement: ${providerAgreement.agreeing} / ${providerAgreement.total} providers`,
    ],
    highlight: {
      nodeIds: ["deposit", "hot", "vaspX"],
      edgeIds: ["t07", "attr-hot-vasp"],
    },
  },
  {
    findingId: "F-005",
    quote: statement("F-005"),
    supporting: [
      `${mixerEth.toFixed(2)} ETH sent to a mixing service`,
      "Mixer flagged by 4 / 4 providers",
      "Onward flow cannot be traced deterministically",
      "Excluded from Exchange X attribution",
    ],
    highlight: { nodeIds: ["walletB", "mixer"], edgeIds: ["t05"] },
  },
];

export const evidenceForFinding = (findingId: string): Evidence | undefined =>
  evidence.find((e) => e.findingId === findingId);
