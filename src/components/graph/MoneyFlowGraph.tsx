"use client";

import { useMemo, useState } from "react";
import {
  Background,
  BackgroundVariant,
  Controls,
  MarkerType,
  Panel as FlowPanel,
  ReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { X } from "lucide-react";
import { tracePaths } from "@/mock";
import { useWorkspace } from "@/components/workspace/WorkspaceContext";
import { FlowEdgeView, edgeColor } from "./FlowEdge";
import {
  BridgeNode,
  DepositNode,
  HotWalletNode,
  MixerNode,
  SubjectNode,
  UnknownNode,
  VaspNode,
} from "./nodes";
import { ChainZone, ClusterZone } from "./ZoneNodes";
import { buildEdges, buildNodes } from "./graphModel";

// Defined at module level so React Flow never sees new type maps.
const nodeTypes = {
  subject: SubjectNode,
  unknown: UnknownNode,
  deposit: DepositNode,
  hot: HotWalletNode,
  mixer: MixerNode,
  bridge: BridgeNode,
  vasp: VaspNode,
  clusterZone: ClusterZone,
  chainZone: ChainZone,
};
const edgeTypes = { flow: FlowEdgeView };

export function MoneyFlowGraph() {
  const {
    selectedNodeId,
    selectedEdgeId,
    highlight,
    selectNode,
    selectEdge,
    clearSelection,
    setHighlight,
  } = useWorkspace();
  const [hoveredEdgeId, setHoveredEdgeId] = useState<string | null>(null);

  const selection = useMemo(
    () => ({
      nodeId: selectedNodeId,
      edgeId: selectedEdgeId,
      hoveredEdgeId,
      highlight,
    }),
    [selectedNodeId, selectedEdgeId, hoveredEdgeId, highlight],
  );

  const nodes = useMemo(() => buildNodes(selection), [selection]);
  const edges = useMemo(
    () =>
      buildEdges(selection).map((e) => ({
        ...e,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 16,
          height: 16,
          color: edgeColor(e.data!.tone, e.data!.selected || e.data!.highlighted),
        },
      })),
    [selection],
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      colorMode="dark"
      fitView
      fitViewOptions={{ padding: 0.03 }}
      minZoom={0.3}
      maxZoom={1.6}
      nodesDraggable={false}
      nodesConnectable={false}
      elementsSelectable={false}
      onNodeClick={(_, n) => {
        if (n.type !== "clusterZone" && n.type !== "chainZone") selectNode(n.id);
      }}
      onEdgeClick={(_, e) => selectEdge(e.id)}
      onEdgeMouseEnter={(_, e) => setHoveredEdgeId(e.id)}
      onEdgeMouseLeave={() => setHoveredEdgeId(null)}
      onPaneClick={clearSelection}
      proOptions={{ hideAttribution: false }}
      className="!bg-transparent"
    >
      <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="oklch(0.96 0.01 250 / 10%)" />
      <Controls showInteractive={false} position="bottom-left" />

      <FlowPanel position="top-left" className="flex items-center gap-1.5">
        <span className="label-caps mr-1 hidden text-[9px] sm:inline">Show path</span>
        {tracePaths.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() =>
              setHighlight({ label: p.label, nodeIds: p.nodeIds, edgeIds: p.edgeIds })
            }
            className="rounded-sm border border-border bg-panel px-2 py-1 text-[10px] font-semibold tracking-wider text-muted-foreground transition-colors hover:border-cyan-accent/60 hover:text-cyan-accent"
          >
            {p.label.toUpperCase()}
          </button>
        ))}
      </FlowPanel>

      {highlight && (
        <FlowPanel position="top-center">
          <button
            type="button"
            onClick={() => setHighlight(null)}
            className="flex items-center gap-2 rounded-sm border border-cyan-accent/60 bg-panel px-2.5 py-1 text-[10px] font-semibold tracking-wider text-cyan-accent"
          >
            HIGHLIGHT · {highlight.label.toUpperCase()}
            <X className="size-3" />
          </button>
        </FlowPanel>
      )}
    </ReactFlow>
  );
}
