import { wallets, walletById } from "./wallets";
import { fundsTracedEth } from "./transactions";
import { vaspCandidates } from "./vasp";
import type { AnalysisStep } from "./types";

const subject = walletById("subject");

export const investigationCase = {
  id: "CASE-20491",
  number: "#20491",
  status: "Active Investigation",
  subjectAddress: subject.address!,
  network: "Ethereum",
  networkInput: "Auto Detect",
  // Totals from the full (mock) analysis; the graph shows the traced subset.
  transactionsAnalyzed: subject.txCount!,
  relatedAddresses: 42,
  knownEntities: 8,
  fundsTracedEth,
  chains: ["Ethereum", "Tron"],
  candidateVasps: vaspCandidates.length,
  tracedSubgraphNodes: wallets.length,
} as const;

/** The six-stage workflow shown in the header indicator. */
export const workflowStages = [
  { key: "wallet", label: "WALLET" },
  { key: "trace", label: "TRACE" },
  { key: "classify", label: "CLASSIFY" },
  { key: "attribute", label: "ATTRIBUTE" },
  { key: "verify", label: "VERIFY" },
  { key: "sahyog", label: "SAHYOG" },
] as const;

export type WorkflowStageKey = (typeof workflowStages)[number]["key"];

/** Simulated pipeline shown after "Start Investigation". */
export const analysisSteps: AnalysisStep[] = [
  { running: "IDENTIFYING BLOCKCHAIN…", done: "Ethereum detected" },
  {
    running: "RETRIEVING TRANSACTION HISTORY…",
    done: `${investigationCase.transactionsAnalyzed} transactions found`,
  },
  {
    running: "BUILDING MONEY-FLOW GRAPH…",
    done: `${investigationCase.relatedAddresses} related addresses identified`,
  },
  {
    running: "CLASSIFYING ADDRESSES…",
    done: `${investigationCase.knownEntities} known entities identified`,
  },
  {
    running: "TRACING CROSS-CHAIN MOVEMENT…",
    done: "Ethereum → Tron path detected",
  },
  {
    running: "IDENTIFYING CANDIDATE VASPs…",
    done: `${investigationCase.candidateVasps} candidate VASPs found`,
  },
  { running: "CALCULATING ATTRIBUTION…", done: "Evidence assembled" },
];

/** Checklist in the case summary. `done: false` = the current step. */
export const progressChecklist = [
  { label: "Wallet identified", done: true },
  { label: "Blockchain identified", done: true },
  { label: "Transaction history analyzed", done: true },
  { label: "Money flow traced", done: true },
  { label: "Addresses classified", done: true },
  { label: "Candidate VASPs identified", done: true },
  { label: "Investigator review", done: false },
];
