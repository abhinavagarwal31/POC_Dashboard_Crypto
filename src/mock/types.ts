/** Shared types for the fictional CASE-20491 investigation. All data is mock. */

export type ChainId = "ethereum" | "tron";

export type NodeKind =
  | "subject"
  | "unknown"
  | "deposit"
  | "hot"
  | "mixer"
  | "bridge"
  | "vasp";

export interface WalletNode {
  id: string;
  kind: NodeKind;
  /** Display title, e.g. "WALLET A" */
  label: string;
  /** Short role description shown under the title */
  role: string;
  /** Full address. Entity nodes (VASP) have none. */
  address?: string;
  chain: ChainId;
  txCount?: number;
  /** Status tag shown on the node, e.g. "HIGH INTEREST" */
  flag?: string;
  clusterId?: string;
  position: { x: number; y: number };
}

export interface Transaction {
  id: string;
  hash: string;
  from: string; // WalletNode id
  to: string; // WalletNode id
  amountEth: number;
  /** ISO-8601, UTC */
  timestamp: string;
  block: number;
  chain: ChainId;
  /** Hops from the subject wallet */
  hop: number;
}

/** A drawn graph edge: either a real transaction or an entity-attribution link. */
export interface GraphLink {
  id: string;
  source: string;
  target: string;
  kind: "transfer" | "attribution";
  txId?: string;
  /** Label for attribution links */
  label?: string;
}

export interface TracePath {
  id: string;
  label: string;
  nodeIds: string[];
  edgeIds: string[];
}

export interface CrossChainTransfer {
  id: string;
  bridgeNodeId: string;
  sourceChain: string;
  destinationChain: string;
  amountEthEquivalent: number;
  status: string;
  sourceTxId: string;
  destinationTxId: string;
}

export interface Highlight {
  nodeIds: string[];
  edgeIds: string[];
}

export interface Cluster {
  id: string;
  label: string;
  memberIds: string[];
}

export interface AddressIntel {
  nodeId: string;
  classification: string;
  /** 0-100 */
  confidence: number;
  observedBehaviour: string[];
  /** Plain-language caveat, shown for low-certainty addresses */
  caveat?: string;
}

export interface Provider {
  id: string;
  name: string;
  kind: "commercial" | "indexed";
  verdict: "consistent" | "no-label" | "n/a";
  label?: string;
}

export interface ConfidenceFactor {
  key: string;
  label: string;
  /** 0-100 strength of this evidence */
  score: number;
}

export interface WhyFactor {
  key: string;
  title: string;
  headline: string;
  detail?: string;
}

export interface VaspCandidate {
  id: string;
  name: string;
  /** 0-100 */
  confidence: number;
  /** Current system recommendation */
  recommended: boolean;
  summary: string;
  breakdown: ConfidenceFactor[];
  why: WhyFactor[];
  highlight: Highlight;
}

export type FindingKind =
  | "attribution"
  | "behaviour"
  | "cross-chain"
  | "provider"
  | "risk";

export interface Finding {
  id: string; // F-001
  kind: FindingKind;
  severity: "info" | "warn";
  statement: string;
}

export interface Evidence {
  findingId: string;
  quote: string;
  supporting: string[];
  highlight: Highlight;
}

export interface TimelineEvent {
  id: string;
  /** ISO-8601, UTC */
  timestamp: string;
  kind: "transfer" | "sweep" | "mixer" | "crosschain";
  title: string;
  detail?: string;
  txId: string;
  highlight: Highlight;
}

export interface AnalysisStep {
  running: string;
  done: string;
}

export interface SahyogRequest {
  requestId: string;
  requestType: string;
  vaspName: string;
  caseId: string;
  subjectAddress: string;
  reason: string;
  relevantAddressIds: string[];
  linkedTransactionIds: string[];
  tracePathNodeIds: string[];
  supportingEvidence: string[];
  finalStatus: string;
}
