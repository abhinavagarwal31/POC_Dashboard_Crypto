import type { AddressIntel, Cluster } from "./types";

export const clusters: Cluster[] = [
  {
    id: "cluster-exchange-x",
    label: "Exchange X cluster",
    memberIds: ["deposit", "hot", "tronWallet"],
  },
];

/** Address / entity classification for every node on the graph. */
export const addressIntel: AddressIntel[] = [
  {
    nodeId: "subject",
    classification: "Suspect Wallet",
    confidence: 100,
    observedBehaviour: [
      "Source of all traced funds",
      "Rapid outbound transfers after receipt",
      "No interaction with known exchange addresses directly",
    ],
  },
  {
    nodeId: "walletA",
    classification: "Private Wallet (Intermediary)",
    confidence: 83,
    observedBehaviour: [
      "Forwards full balance within minutes of receipt",
      "No other meaningful activity",
      "Funded only by the subject wallet",
    ],
  },
  {
    nodeId: "walletB",
    classification: "Private Wallet (Splitter)",
    confidence: 86,
    observedBehaviour: [
      "Splits received funds across three destinations",
      "Interacted with a mixer",
      "Initiated a cross-chain bridge transfer",
    ],
  },
  {
    nodeId: "unknownWallet",
    classification: "Unclassified Wallet",
    confidence: 38,
    observedBehaviour: [
      "Received funds directly from the subject wallet",
      "23 transactions, mixed counterparties",
      "No entity cluster match",
    ],
    caveat: "Insufficient evidence to classify. Requires investigator review.",
  },
  {
    nodeId: "mixer",
    classification: "Mixing Service",
    confidence: 97,
    observedBehaviour: [
      "Fixed-denomination deposit pattern",
      "Flagged by 4 / 4 intelligence providers",
      "Funds leaving this node cannot be traced deterministically",
    ],
  },
  {
    nodeId: "deposit",
    classification: "Exchange Deposit Address",
    confidence: 94,
    observedBehaviour: [
      "Receives funds from multiple wallets",
      "Repeatedly forwards funds",
      "Sends funds to known hot wallet",
      "Short average sweep time",
      "Matches known entity cluster",
    ],
  },
  {
    nodeId: "hot",
    classification: "Exchange Hot Wallet",
    confidence: 98,
    observedBehaviour: [
      "Labelled Exchange X Hot Wallet by 3 providers",
      "Receives sweeps from many deposit addresses",
      "High-volume consolidation and withdrawal pattern",
      "Member of the Exchange X cluster",
    ],
  },
  {
    nodeId: "bridge",
    classification: "Cross-Chain Bridge",
    confidence: 99,
    observedBehaviour: [
      "Verified bridge contract (Ethereum → Tron)",
      "Source and destination transfers linked by amount and timing",
      "Release observed on Tron 2 min 24 s after deposit",
    ],
  },
  {
    nodeId: "tronWallet",
    classification: "Exchange-Linked Wallet (Tron)",
    confidence: 81,
    observedBehaviour: [
      "Funded only by the bridge release",
      "Forwards full amount to an Exchange X-labelled Tron address",
      "Address-cluster heuristic links it to Exchange X",
    ],
  },
  {
    nodeId: "vaspX",
    classification: "Virtual Asset Service Provider",
    confidence: 91,
    observedBehaviour: [
      "Exchange X operates the labelled hot wallet",
      "Deposit address belongs to the same cluster",
      "Regulated entity — disclosure request possible via SAHYOG",
    ],
  },
];

export const intelByNodeId = (nodeId: string): AddressIntel | undefined =>
  addressIntel.find((i) => i.nodeId === nodeId);
