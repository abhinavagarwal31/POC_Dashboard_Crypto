import { round2 } from "@/lib/format";
import { providerAgreement } from "./providers";
import { fundsTracedEth, txById } from "./transactions";
import type { VaspCandidate } from "./types";

// Figures for Exchange X are derived from the transaction data so the UI
// can never disagree with the graph.
export const tracedToExchangeXEth = round2(
  txById("t07").amountEth + txById("t09").amountEth,
);
export const fundFlowPctToExchangeX = Math.round(
  (tracedToExchangeXEth / fundsTracedEth) * 100,
);
export const avgSweepMinutes = 40;
export const traceDistanceHops = txById("t04").hop; // subject → deposit address

export const vaspCandidates: VaspCandidate[] = [
  {
    id: "exchange-x",
    name: "Exchange X",
    confidence: 91,
    recommended: true,
    summary: "Current system recommendation",
    breakdown: [
      { key: "fund-flow", label: "Fund flow", score: 88 },
      { key: "hop-distance", label: "Hop distance", score: 92 },
      { key: "timing", label: "Timing pattern", score: 94 },
      { key: "provider", label: "Provider agreement", score: 82 },
      { key: "deposit-hot", label: "Deposit → hot wallet behaviour", score: 97 },
    ],
    why: [
      {
        key: "fund-flow",
        title: "Fund flow",
        headline: `${fundFlowPctToExchangeX}% of traced funds reached this VASP.`,
        detail: `${tracedToExchangeXEth.toFixed(2)} of ${fundsTracedEth.toFixed(2)} ETH, via the deposit address and the Tron bridge path.`,
      },
      {
        key: "hop-distance",
        title: "Trace distance",
        headline: `${traceDistanceHops} hops`,
        detail: "From the subject wallet to the Exchange X deposit address.",
      },
      {
        key: "deposit",
        title: "Deposit behaviour",
        headline:
          "Suspected deposit address repeatedly swept funds to a known Exchange X hot wallet.",
      },
      {
        key: "timing",
        title: "Sweep timing",
        headline: `Average sweep: ${avgSweepMinutes} minutes`,
      },
      {
        key: "provider",
        title: "Intelligence provider agreement",
        headline: `${providerAgreement.agreeing} / ${providerAgreement.total} providers identify the destination consistently.`,
      },
      {
        key: "cluster",
        title: "Entity cluster",
        headline: "Deposit address is associated with a known Exchange X cluster.",
      },
    ],
    highlight: {
      nodeIds: [
        "subject", "walletA", "walletB", "deposit", "hot", "vaspX",
        "bridge", "tronWallet",
      ],
      edgeIds: ["t01", "t03", "t04", "t07", "attr-hot-vasp", "t06", "t08", "t09"],
    },
  },
  {
    id: "exchange-y",
    name: "Exchange Y",
    confidence: 46,
    recommended: false,
    summary: "Weak indirect link",
    breakdown: [
      { key: "fund-flow", label: "Fund flow", score: 30 },
      { key: "hop-distance", label: "Hop distance", score: 55 },
      { key: "timing", label: "Timing pattern", score: 40 },
      { key: "provider", label: "Provider agreement", score: 25 },
      { key: "deposit-hot", label: "Deposit → hot wallet behaviour", score: 0 },
    ],
    why: [
      {
        key: "fund-flow",
        title: "Fund flow",
        headline: `Only ${round2(txById("t02").amountEth)} ETH (7%) reached the unclassified wallet.`,
      },
      {
        key: "provider",
        title: "Intelligence provider agreement",
        headline: "1 / 4 providers associate the unclassified wallet with Exchange Y.",
      },
    ],
    highlight: { nodeIds: ["subject", "unknownWallet"], edgeIds: ["t02"] },
  },
  {
    id: "exchange-z",
    name: "Exchange Z",
    confidence: 21,
    recommended: false,
    summary: "Speculative link",
    breakdown: [
      { key: "fund-flow", label: "Fund flow", score: 10 },
      { key: "hop-distance", label: "Hop distance", score: 35 },
      { key: "timing", label: "Timing pattern", score: 20 },
      { key: "provider", label: "Provider agreement", score: 0 },
      { key: "deposit-hot", label: "Deposit → hot wallet behaviour", score: 0 },
    ],
    why: [
      {
        key: "fund-flow",
        title: "Fund flow",
        headline: "Possible downstream mixer output; path cannot be traced deterministically.",
      },
    ],
    highlight: { nodeIds: ["walletB", "mixer"], edgeIds: ["t05"] },
  },
];

export const recommendedVasp = vaspCandidates.find((v) => v.recommended)!;
