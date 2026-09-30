"use client";

import { ArrowLeft, Crosshair } from "lucide-react";
import type { VaspCandidate } from "@/mock";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useWorkspace } from "@/components/workspace/WorkspaceContext";
import { scrollToPanel } from "@/lib/scroll";
import { ConfidenceBreakdown } from "./ConfidenceBreakdown";

export const VASP_PANEL_ID = "vasp-attribution-panel";
export const GRAPH_PANEL_ID = "graph-panel";

export function WhyVasp({
  candidate,
  onBack,
}: {
  candidate: VaspCandidate;
  onBack: () => void;
}) {
  const { highlight, setHighlight } = useWorkspace();
  const label = `${candidate.name} · evidence`;
  const active = highlight?.label === label;

  const toggleHighlight = () => {
    if (active) {
      setHighlight(null);
      return;
    }
    setHighlight({ label, sourceId: VASP_PANEL_ID, ...candidate.highlight });
    scrollToPanel(GRAPH_PANEL_ID);
  };

  return (
    <div className="flex min-h-full flex-col">
      <button
        type="button"
        onClick={onBack}
        className="mb-2 flex w-fit items-center gap-1 text-[11px] font-semibold tracking-wider text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        CANDIDATES
      </button>

      <div className="mb-3 flex items-end justify-between border-b border-border pb-2.5">
        <div>
          <div className="label-caps text-[10px]">Why this VASP?</div>
          <div className="text-base font-semibold uppercase tracking-wide">
            {candidate.name}
          </div>
        </div>
        <div className="font-addr text-sm text-ok">
          {candidate.confidence}% CONFIDENCE
        </div>
      </div>

      <Tabs defaultValue="why" className="flex-1 gap-3">
        <TabsList className="w-full">
          <TabsTrigger value="why" className="text-xs">
            EVIDENCE
          </TabsTrigger>
          <TabsTrigger value="confidence" className="text-xs">
            CONFIDENCE
          </TabsTrigger>
        </TabsList>

        <TabsContent value="why">
          <ul className="space-y-3">
            {candidate.why.map((f) => (
              <li key={f.key}>
                <div className="label-caps text-[10px]">{f.title}</div>
                <div className="mt-0.5 text-sm leading-snug">{f.headline}</div>
                {f.detail && (
                  <div className="mt-0.5 text-xs text-muted-foreground">
                    {f.detail}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </TabsContent>

        <TabsContent value="confidence">
          <ConfidenceBreakdown candidate={candidate} />
        </TabsContent>
      </Tabs>

      <div className="sticky bottom-0 -mx-3 -mb-3 mt-3 border-t border-border bg-panel px-3 py-2.5">
        <Button
          onClick={toggleHighlight}
          variant={active ? "secondary" : "default"}
          className="w-full gap-2 text-xs font-semibold tracking-[0.12em]"
        >
          <Crosshair className="size-4" />
          {active ? "CLEAR HIGHLIGHT" : "HIGHLIGHT EVIDENCE ON GRAPH"}
        </Button>
      </div>
    </div>
  );
}
