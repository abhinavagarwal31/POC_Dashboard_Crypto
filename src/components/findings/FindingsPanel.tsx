"use client";

import { useEffect, useRef } from "react";
import { Check, Crosshair, Info, TriangleAlert } from "lucide-react";
import { evidenceForFinding, findings, type Finding } from "@/mock";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { scrollToPanel } from "@/lib/scroll";
import { Panel } from "@/components/workspace/Panel";
import { FINDINGS_PANEL_ID, GRAPH_PANEL_ID } from "@/components/workspace/panelIds";
import { useWorkspace } from "@/components/workspace/WorkspaceContext";

const KIND_LABEL: Record<Finding["kind"], string> = {
  attribution: "ATTRIBUTION",
  behaviour: "BEHAVIOUR",
  "cross-chain": "CROSS-CHAIN",
  provider: "PROVIDERS",
  risk: "RISK",
};

const highlightLabel = (id: string) => `Finding ${id}`;

export function FindingsPanel() {
  const { highlight, setHighlight } = useWorkspace();
  const evidenceRef = useRef<HTMLDivElement>(null);

  // The active finding is whichever one owns the current graph highlight, so
  // the list and the graph can never disagree.
  const active = findings.find((f) => highlight?.label === highlightLabel(f.id));
  const evidence = active ? evidenceForFinding(active.id) : undefined;

  useEffect(() => {
    if (active) {
      evidenceRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [active]);

  const toggle = (f: Finding) => {
    const ev = evidenceForFinding(f.id);
    if (!ev || active?.id === f.id) {
      setHighlight(null);
      return;
    }
    setHighlight({
      label: highlightLabel(f.id),
      sourceId: FINDINGS_PANEL_ID,
      ...ev.highlight,
    });
  };

  return (
    <Panel id={FINDINGS_PANEL_ID} title="Findings & evidence" className="lg:h-full">
      <ul className="space-y-1">
        {findings.map((f) => {
          const selected = active?.id === f.id;
          const Icon = f.severity === "warn" ? TriangleAlert : Info;
          return (
            <li key={f.id}>
              <button
                type="button"
                onClick={() => toggle(f)}
                aria-pressed={selected}
                className={cn(
                  "flex w-full items-start gap-2.5 rounded-sm border px-2 py-1.5 text-left transition-colors",
                  selected
                    ? "border-cyan-accent bg-cyan-accent/10"
                    : "border-transparent hover:border-border hover:bg-muted/50",
                )}
              >
                <span
                  className={cn(
                    "font-addr mt-px shrink-0 text-[11px]",
                    selected ? "text-cyan-accent" : "text-muted-foreground",
                  )}
                >
                  {f.id}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] leading-snug">
                    {f.statement}
                  </span>
                  <span
                    className={cn(
                      "mt-0.5 flex items-center gap-1 text-[9px] font-semibold tracking-wider",
                      f.severity === "warn" ? "text-warn" : "text-muted-foreground",
                    )}
                  >
                    <Icon className="size-3" />
                    {KIND_LABEL[f.kind]}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {active && evidence && (
        <div
          ref={evidenceRef}
          className="mt-3 rounded-sm border border-border bg-background/50 p-3"
        >
          <div className="flex items-baseline justify-between">
            <span className="label-caps text-[10px]">Evidence</span>
            <span className="font-addr text-[11px] text-cyan-accent">
              Finding {active.id}
            </span>
          </div>
          <blockquote className="mt-2 border-l-2 border-cyan-accent/60 pl-2.5 text-sm italic leading-snug">
            {evidence.quote}
          </blockquote>

          <div className="label-caps mt-3 mb-1.5 text-[10px]">
            Supporting evidence
          </div>
          <ul className="space-y-1">
            {evidence.supporting.map((s) => (
              <li key={s} className="flex items-start gap-1.5 text-[13px] leading-snug">
                <Check className="mt-0.5 size-3.5 shrink-0 text-ok" />
                {s}
              </li>
            ))}
          </ul>

          <Button
            variant="outline"
            onClick={() => scrollToPanel(GRAPH_PANEL_ID)}
            className="mt-3 w-full gap-2 text-xs font-semibold tracking-[0.12em]"
          >
            <Crosshair className="size-4" />
            VIEW ON GRAPH
          </Button>
          <p className="mt-1.5 text-center text-[10px] text-muted-foreground">
            {evidence.highlight.nodeIds.length} addresses ·{" "}
            {evidence.highlight.edgeIds.length} links highlighted
          </p>
        </div>
      )}
    </Panel>
  );
}
