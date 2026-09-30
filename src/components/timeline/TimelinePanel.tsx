"use client";

import { ArrowRight, Link2, Repeat, Shuffle, type LucideIcon } from "lucide-react";
import { timeline, type TimelineEvent } from "@/mock";
import { formatTime } from "@/lib/format";
import { cn } from "@/lib/utils";
import { scrollToPanel } from "@/lib/scroll";
import { Panel } from "@/components/workspace/Panel";
import { GRAPH_PANEL_ID, TIMELINE_PANEL_ID } from "@/components/workspace/panelIds";
import { useWorkspace } from "@/components/workspace/WorkspaceContext";

const KIND_STYLE: Record<TimelineEvent["kind"], { icon: LucideIcon; tone: string }> = {
  transfer: { icon: ArrowRight, tone: "text-muted-foreground" },
  sweep: { icon: Repeat, tone: "text-cyan-accent" },
  mixer: { icon: Shuffle, tone: "text-warn" },
  crosschain: { icon: Link2, tone: "text-[oklch(0.8_0.1_290)]" },
};

const highlightLabel = (e: TimelineEvent) => `Timeline ${formatTime(e.timestamp)}`;

export function TimelinePanel() {
  const { highlight, selectedEdgeId, setHighlight, selectEdge, clearSelection } =
    useWorkspace();

  const select = (e: TimelineEvent) => {
    if (highlight?.label === highlightLabel(e)) {
      setHighlight(null);
      clearSelection();
      return;
    }
    setHighlight({
      label: highlightLabel(e),
      sourceId: TIMELINE_PANEL_ID,
      ...e.highlight,
    });
    selectEdge(e.txId); // also opens the transaction in the inspector
  };

  return (
    <Panel id={TIMELINE_PANEL_ID} title="Transaction timeline" className="lg:h-full">
      <div className="label-caps mb-2 text-[10px]">30 Sep 2026 · UTC</div>
      <ol className="relative">
        {/* vertical rail */}
        <span className="absolute top-2 bottom-2 left-[52px] w-px bg-border" aria-hidden />
        {timeline.map((e) => {
          const { icon: Icon, tone } = KIND_STYLE[e.kind];
          const lit = highlight?.label === highlightLabel(e);
          const current = lit || selectedEdgeId === e.txId;
          return (
            <li key={e.id} className="relative">
              <button
                type="button"
                onClick={() => select(e)}
                aria-pressed={current}
                className={cn(
                  "flex w-full items-start gap-2 rounded-sm border py-1.5 pr-2 pl-1 text-left transition-colors",
                  current
                    ? "border-cyan-accent bg-cyan-accent/10"
                    : "border-transparent hover:border-border hover:bg-muted/50",
                )}
              >
                <span
                  className={cn(
                    "font-addr w-11 shrink-0 pt-px text-right text-xs",
                    current ? "text-cyan-accent" : "text-muted-foreground",
                  )}
                >
                  {formatTime(e.timestamp)}
                </span>
                <span
                  className={cn(
                    "z-10 mt-px flex size-[18px] shrink-0 items-center justify-center rounded-full border bg-panel",
                    current ? "border-cyan-accent" : "border-border",
                    tone,
                  )}
                >
                  <Icon className="size-2.5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] leading-snug font-medium">
                    {e.title}
                  </span>
                  {e.detail && (
                    <span className="font-addr block text-[11px] leading-snug text-muted-foreground">
                      {e.detail}
                    </span>
                  )}
                </span>
              </button>
              {current && (
                <button
                  type="button"
                  onClick={() => scrollToPanel(GRAPH_PANEL_ID)}
                  className="mr-2 mb-1 ml-[66px] text-[10px] font-semibold tracking-wider text-cyan-accent hover:underline"
                >
                  VIEW ON GRAPH ↑
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </Panel>
  );
}
