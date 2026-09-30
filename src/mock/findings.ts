import { fundFlowPctToExchangeX } from "./vasp";
import { providerAgreement } from "./providers";
import type { Finding } from "./types";

export const findings: Finding[] = [
  {
    id: "F-001",
    kind: "attribution",
    severity: "info",
    statement: `${fundFlowPctToExchangeX}% of traced funds reached Exchange X.`,
  },
  {
    id: "F-002",
    kind: "behaviour",
    severity: "info",
    statement: "Deposit address repeatedly swept funds to Exchange X hot wallet.",
  },
  {
    id: "F-003",
    kind: "cross-chain",
    severity: "info",
    statement: "Cross-chain movement detected: Ethereum → Tron.",
  },
  {
    id: "F-004",
    kind: "provider",
    severity: "info",
    statement: `${providerAgreement.agreeing === 3 ? "Three" : providerAgreement.agreeing} intelligence providers agree on Exchange X attribution.`,
  },
  {
    id: "F-005",
    kind: "risk",
    severity: "warn",
    statement: "Wallet B interacted with a mixer.",
  },
];
