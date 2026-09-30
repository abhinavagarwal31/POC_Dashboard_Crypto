import type { NodeProps } from "@xyflow/react";
import { Layers, Network } from "lucide-react";
import type { ZoneFlowNode } from "./graphModel";

/** Dashed outline around addresses attributed to one entity cluster. */
export function ClusterZone({ data }: NodeProps<ZoneFlowNode>) {
  return (
    <div className="pointer-events-none h-full w-full rounded-lg border border-dashed border-cyan-accent/50 bg-cyan-accent/[0.04]">
      <div className="flex items-center gap-1.5 px-2.5 pt-1.5 text-[10px] font-semibold tracking-[0.14em] text-cyan-accent">
        <Layers className="size-3" />
        {data.label.toUpperCase()}
        {data.sublabel && (
          <span className="font-normal text-muted-foreground">· {data.sublabel}</span>
        )}
      </div>
    </div>
  );
}

/** Band marking a different blockchain, so the crossing is visible. Label sits on the bottom edge. */
export function ChainZone({ data }: NodeProps<ZoneFlowNode>) {
  return (
    <div className="pointer-events-none flex h-full w-full flex-col justify-end rounded-lg border border-[oklch(0.72_0.12_290/0.5)] bg-[oklch(0.72_0.12_290/0.06)]">
      <div className="flex items-center gap-1.5 whitespace-nowrap px-2.5 pb-1.5 text-[10px] font-semibold tracking-[0.14em] text-[oklch(0.8_0.1_290)]">
        <Network className="size-3" />
        {data.label.toUpperCase()}
      </div>
    </div>
  );
}
