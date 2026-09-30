import type { Edge, Node } from "@xyflow/react";
import {
  clusters,
  graphLinks,
  txById,
  walletById,
  wallets,
  type GraphLink,
  type NodeKind,
  type WalletNode,
} from "@/mock";
import { formatEth, formatTime } from "@/lib/format";
import type { ActiveHighlight } from "@/components/workspace/WorkspaceContext";

export const NODE_W = 208;
export const NODE_H = 92;

export type VisualState = {
  dimmed: boolean;
  selected: boolean;
  highlighted: boolean;
};

export type WalletFlowNode = Node<
  VisualState & { wallet: WalletNode },
  NodeKind
>;

export type ZoneFlowNode = Node<
  { label: string; sublabel?: string },
  "clusterZone" | "chainZone"
>;

export type FlowNode = WalletFlowNode | ZoneFlowNode;

export type EdgeTone = "transfer" | "mixer" | "crosschain" | "attribution";

export type FlowEdge = Edge<
  VisualState & {
    link: GraphLink;
    tone: EdgeTone;
    hovered: boolean;
    amount?: string;
    time?: string;
  },
  "flow"
>;

export interface GraphSelection {
  nodeId: string | null;
  edgeId: string | null;
  hoveredEdgeId: string | null;
  highlight: ActiveHighlight | null;
}

const PAD = 18;
const LABEL_H = 26;

/**
 * Bounding box around a set of wallet nodes, with room for a zone label at
 * the top or bottom edge.
 */
function zoneAround(ids: string[], labelAt: "top" | "bottom" = "top") {
  const ws = ids.map(walletById);
  const x = Math.min(...ws.map((w) => w.position.x)) - PAD;
  const y =
    Math.min(...ws.map((w) => w.position.y)) -
    PAD -
    (labelAt === "top" ? LABEL_H : 0);
  const right = Math.max(...ws.map((w) => w.position.x)) + NODE_W + PAD;
  const bottom =
    Math.max(...ws.map((w) => w.position.y)) +
    NODE_H +
    PAD +
    (labelAt === "bottom" ? LABEL_H : 0);
  return { x, y, width: right - x, height: bottom - y };
}

function zoneNodes(): ZoneFlowNode[] {
  const zones: ZoneFlowNode[] = [];

  // Exchange X cluster: members on Ethereum are boxed together.
  for (const c of clusters) {
    const eth = c.memberIds.filter((id) => walletById(id).chain === "ethereum");
    if (eth.length === 0) continue;
    const { x, y, width, height } = zoneAround(eth);
    zones.push({
      id: `zone-${c.id}`,
      type: "clusterZone",
      position: { x, y },
      style: { width, height },
      data: { label: c.label, sublabel: "Ethereum" },
      draggable: false,
      selectable: false,
      focusable: false,
      zIndex: -2,
    });
  }

  // Tron lane: where the bridged funds land.
  const tron = wallets.filter((w) => w.chain === "tron").map((w) => w.id);
  if (tron.length) {
    const { x, y, width, height } = zoneAround(tron, "bottom");
    zones.push({
      id: "zone-tron",
      type: "chainZone",
      position: { x, y },
      style: { width, height },
      data: { label: "Tron network" },
      draggable: false,
      selectable: false,
      focusable: false,
      zIndex: -1,
    });
  }
  return zones;
}

export function buildNodes(sel: GraphSelection): FlowNode[] {
  const hl = sel.highlight;
  const walletNodes: WalletFlowNode[] = wallets.map((w) => ({
    id: w.id,
    type: w.kind,
    position: w.position,
    width: NODE_W,
    height: NODE_H,
    draggable: false,
    data: {
      wallet: w,
      selected: sel.nodeId === w.id,
      highlighted: !!hl?.nodeIds.includes(w.id),
      dimmed: !!hl && !hl.nodeIds.includes(w.id),
    },
  }));
  return [...zoneNodes(), ...walletNodes];
}

function toneOf(link: GraphLink): EdgeTone {
  if (link.kind === "attribution") return "attribution";
  const from = walletById(link.source);
  const to = walletById(link.target);
  if (to.kind === "mixer") return "mixer";
  if (from.kind === "bridge" || to.kind === "bridge") return "crosschain";
  return "transfer";
}

/** Nodes stacked in one column connect top↔bottom; otherwise left→right. */
function handlesFor(link: GraphLink) {
  const s = walletById(link.source).position;
  const t = walletById(link.target).position;
  if (Math.abs(s.x - t.x) < 60) {
    return t.y > s.y
      ? { sourceHandle: "out-b", targetHandle: "in-t" }
      : { sourceHandle: "out-t", targetHandle: "in-b" };
  }
  return { sourceHandle: "out-r", targetHandle: "in-l" };
}

export function buildEdges(sel: GraphSelection): FlowEdge[] {
  const hl = sel.highlight;
  return graphLinks.map((link) => {
    const tx = link.txId ? txById(link.txId) : undefined;
    return {
      ...handlesFor(link),
      id: link.id,
      type: "flow",
      source: link.source,
      target: link.target,
      data: {
        link,
        tone: toneOf(link),
        amount: tx ? formatEth(tx.amountEth) : undefined,
        time: tx ? formatTime(tx.timestamp) : undefined,
        selected: sel.edgeId === link.id,
        hovered: sel.hoveredEdgeId === link.id,
        highlighted: !!hl?.edgeIds.includes(link.id),
        dimmed: !!hl && !hl.edgeIds.includes(link.id),
      },
    };
  });
}
