import type { WalletNode } from "./types";

/**
 * Nodes of the traced sub-graph. The full investigation found 42 related
 * addresses; these are the ones on the traced paths.
 * Positions lay the graph out left → right (source → destination).
 */
export const wallets: WalletNode[] = [
  {
    id: "subject",
    kind: "subject",
    label: "SUBJECT WALLET",
    role: "Suspicious wallet under investigation",
    address: "0x7A91F2c4d8E35b1A90f6E27cB4D1a3859E0482FC",
    chain: "ethereum",
    txCount: 137,
    flag: "HIGH INTEREST",
    position: { x: 0, y: 220 },
  },
  {
    id: "walletA",
    kind: "unknown",
    label: "WALLET A",
    role: "Intermediary — pass-through",
    address: "0x81FAc03b77D92e4a1F60b58C3e7a2914d6B392AC",
    chain: "ethereum",
    txCount: 9,
    flag: "REQUIRES REVIEW",
    position: { x: 310, y: 220 },
  },
  {
    id: "walletB",
    kind: "unknown",
    label: "WALLET B",
    role: "Intermediary — splits funds",
    address: "0x92BAe5170c3F8d29aB46e07C1d5b83a9F2E472DC",
    chain: "ethereum",
    txCount: 14,
    flag: "REQUIRES REVIEW",
    position: { x: 620, y: 220 },
  },
  {
    id: "unknownWallet",
    kind: "unknown",
    label: "UNKNOWN WALLET",
    role: "Unclassified recipient",
    address: "0x91BA7d20f4C6e1B835a92d0F47c6E1c93e1d72AC",
    chain: "ethereum",
    txCount: 23,
    flag: "REQUIRES REVIEW",
    position: { x: 310, y: 470 },
  },
  {
    id: "mixer",
    kind: "mixer",
    label: "MIXER",
    role: "Interaction detected",
    address: "0x5C1d8e93A7b04F62d1c5E9a3078B4f6d2C1e90a3",
    chain: "ethereum",
    flag: "OBFUSCATION",
    position: { x: 950, y: 20 },
  },
  {
    id: "deposit",
    kind: "deposit",
    label: "EXCHANGE DEPOSIT",
    role: "Receives funds · repeated sweep detected",
    address: "0x82FA19c7D3e04b6A58f1C27d9E30b4a65F0d12BC",
    chain: "ethereum",
    txCount: 31,
    clusterId: "cluster-exchange-x",
    position: { x: 950, y: 220 },
  },
  {
    id: "hot",
    kind: "hot",
    label: "EXCHANGE HOT WALLET",
    role: "Known entity",
    address: "0x91F2b60E4d7Ac35f98D10e2B74c6A3f59d1CA82D",
    chain: "ethereum",
    clusterId: "cluster-exchange-x",
    position: { x: 1260, y: 220 },
  },
  {
    id: "bridge",
    kind: "bridge",
    label: "CROSS-CHAIN BRIDGE",
    role: "Ethereum → Tron",
    address: "0xB71C04e9d2F3a86B5c170dE92a4f63C8b15D07e4",
    chain: "ethereum",
    position: { x: 950, y: 440 },
  },
  {
    id: "tronWallet",
    kind: "unknown",
    label: "TRON WALLET",
    role: "Receives bridged funds",
    address: "TXyZ9kQm4Rb7LwVd2NfPa8cHs5JtUe3Gq1",
    chain: "tron",
    txCount: 4,
    flag: "REQUIRES REVIEW",
    clusterId: "cluster-exchange-x",
    position: { x: 1260, y: 440 },
  },
  {
    id: "vaspX",
    kind: "vasp",
    label: "VASP",
    role: "Exchange X",
    chain: "ethereum",
    clusterId: "cluster-exchange-x",
    position: { x: 1570, y: 330 },
  },
];

export const walletById = (id: string): WalletNode => {
  const w = wallets.find((n) => n.id === id);
  if (!w) throw new Error(`Unknown wallet node: ${id}`);
  return w;
};
