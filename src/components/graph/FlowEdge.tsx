import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  type EdgeProps,
} from "@xyflow/react";
import { cn } from "@/lib/utils";
import { useWorkspace } from "@/components/workspace/WorkspaceContext";
import type { EdgeTone, FlowEdge } from "./graphModel";

const TONE_COLOR: Record<EdgeTone, string> = {
  transfer: "oklch(0.62 0.05 250)",
  mixer: "oklch(0.8 0.15 80)",
  crosschain: "oklch(0.72 0.12 290)",
  attribution: "oklch(0.72 0.15 155)",
};
const ACTIVE_COLOR = "oklch(0.85 0.13 215)";

export function edgeColor(tone: EdgeTone, active: boolean): string {
  return active && tone === "transfer" ? ACTIVE_COLOR : TONE_COLOR[tone];
}

export function FlowEdgeView({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
  data,
}: EdgeProps<FlowEdge>) {
  const { selectEdge } = useWorkspace();
  if (!data) return null;

  const [path, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  const active = data.selected || data.highlighted;
  const dashed = data.tone !== "transfer";
  const showTime = data.hovered || active;

  return (
    <>
      <BaseEdge
        id={id}
        path={path}
        markerEnd={markerEnd}
        interactionWidth={22}
        style={{
          stroke: edgeColor(data.tone, active),
          strokeWidth: data.selected ? 3.5 : active ? 2.75 : 1.75,
          strokeDasharray: dashed ? "6 4" : undefined,
          opacity: data.dimmed ? 0.15 : 1,
          transition: "opacity 200ms, stroke-width 150ms",
        }}
      />
      <EdgeLabelRenderer>
        <button
          type="button"
          onClick={() => selectEdge(id)}
          className={cn(
            "nodrag nopan pointer-events-auto absolute cursor-pointer rounded-sm border bg-background/95 px-1.5 py-0.5 text-center leading-tight transition-opacity duration-200",
            data.selected
              ? "border-cyan-accent"
              : active
                ? "border-cyan-accent/60"
                : "border-border",
            data.dimmed && "opacity-15",
          )}
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
          }}
        >
          {data.tone === "attribution" ? (
            <span className="text-[9px] font-semibold tracking-wider text-ok">
              {data.link.label?.toUpperCase()}
            </span>
          ) : (
            <>
              <span className="font-addr block text-[10px] font-semibold">
                {data.amount}
              </span>
              {showTime && (
                <span className="font-addr block text-[9px] text-muted-foreground">
                  {data.time} UTC
                </span>
              )}
            </>
          )}
        </button>
      </EdgeLabelRenderer>
    </>
  );
}
