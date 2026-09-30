"use client";

import { Fragment } from "react";
import { ArrowDown, Crosshair } from "lucide-react";
import {
  tracePaths,
  txById,
  walletById,
  type NodeKind,
  type TracePath as TracePathData,
} from "@/mock";
import { formatEth, formatTime, shortAddr } from "@/lib/format";
import { cn } from "@/lib/utils";
import { nodeIcons } from "@/components/graph/nodeIcons";
import { Panel } from "./Panel";
import { useWorkspace } from "./WorkspaceContext";

const EXCHANGE_X_KINDS: NodeKind[] = ["deposit", "hot", "vasp"];

function Step({ index, nodeId }: { index: number; nodeId: string }) {
  const { selectedNodeId, highlight, selectNode } = useWorkspace();
  const w = walletById(nodeId);
  const Icon = nodeIcons[w.kind] ?? Crosshair;
  const selected = selectedNodeId === nodeId;
  const lit = !!highlight?.nodeIds.includes(nodeId);
  const isVasp = w.kind === "vasp";

  return (
    <button
      type="button"
      onClick={() => selectNode(selected ? null : nodeId)}
      aria-pressed={selected}
      className={cn(
        "group flex w-full items-center gap-2.5 rounded-sm border px-2 py-1.5 text-left transition-colors",
        selected
          ? "border-cyan-accent bg-cyan-accent/10"
          : lit
            ? "border-cyan-accent/40 bg-cyan-accent/[0.04]"
            : "border-transparent hover:border-border hover:bg-muted/50",
      )}
    >
      <span
        className={cn(
          "font-addr w-5 shrink-0 text-[11px]",
          selected ? "text-cyan-accent" : "text-muted-foreground",
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <Icon
        className={cn(
          "size-4 shrink-0",
          selected ? "text-cyan-accent" : "text-foreground/70",
        )}
      />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[11px] font-semibold tracking-wider">
          {isVasp ? "VASP" : w.label}
        </span>
        <span className="font-addr block truncate text-[11px] text-muted-foreground">
          {isVasp
            ? w.role
            : `${shortAddr(w.address ?? "")}${
                EXCHANGE_X_KINDS.includes(w.kind) ? " · Exchange X" : ""
              }`}
        </span>
      </span>
    </button>
  );
}

function Connector({ txId }: { txId: string }) {
  const { selectedEdgeId, highlight, selectEdge } = useWorkspace();
  const tx = txById(txId);
  const selected = selectedEdgeId === txId;
  const lit = !!highlight?.edgeIds.includes(txId);
  const crossChain = walletById(tx.from).chain !== walletById(tx.to).chain;

  return (
    <div className="flex items-center gap-2.5 pl-2">
      <span className="flex w-5 shrink-0 justify-center">
        <ArrowDown
          className={cn(
            "size-3.5",
            selected || lit ? "text-cyan-accent" : "text-muted-foreground/60",
          )}
        />
      </span>
      <button
        type="button"
        onClick={() => selectEdge(selected ? null : txId)}
        aria-pressed={selected}
        className={cn(
          "font-addr flex items-center gap-1.5 rounded-sm border px-1.5 py-0.5 text-[10px] transition-colors",
          selected
            ? "border-cyan-accent text-cyan-accent"
            : lit
              ? "border-cyan-accent/40 text-cyan-accent"
              : "border-transparent text-muted-foreground hover:border-border hover:text-foreground",
        )}
      >
        {formatEth(tx.amountEth)} · {formatTime(tx.timestamp)}
        {crossChain && (
          <span className="rounded-sm bg-[oklch(0.72_0.12_290/0.2)] px-1 font-sans text-[9px] font-semibold tracking-wider text-[oklch(0.8_0.1_290)]">
            CROSS-CHAIN
          </span>
        )}
      </button>
    </div>
  );
}

function PathBlock({ path }: { path: TracePathData }) {
  const { highlight, setHighlight } = useWorkspace();
  const active = highlight?.label === path.label;

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <span className="label-caps">{path.label}</span>
        <button
          type="button"
          onClick={() =>
            setHighlight(
              active
                ? null
                : { label: path.label, nodeIds: path.nodeIds, edgeIds: path.edgeIds },
            )
          }
          className={cn(
            "rounded-sm border px-1.5 py-0.5 text-[9px] font-semibold tracking-wider transition-colors",
            active
              ? "border-cyan-accent bg-cyan-accent/10 text-cyan-accent"
              : "border-border text-muted-foreground hover:border-cyan-accent/60 hover:text-cyan-accent",
          )}
        >
          {active ? "CLEAR" : "HIGHLIGHT"}
        </button>
      </div>
      <div className="space-y-0.5">
        {path.nodeIds.map((nodeId, i) => (
          <Fragment key={nodeId}>
            <Step index={i} nodeId={nodeId} />
            {i < path.edgeIds.length && <Connector txId={path.edgeIds[i]} />}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export function TracePath() {
  return (
    <Panel title="Trace path">
      <div className="space-y-4">
        {tracePaths.map((p) => (
          <PathBlock key={p.id} path={p} />
        ))}
      </div>
    </Panel>
  );
}
