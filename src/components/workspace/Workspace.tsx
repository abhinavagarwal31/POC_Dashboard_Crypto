"use client";

import { motion } from "framer-motion";
import type { WorkflowStageKey } from "@/mock";
import { CaseHeader } from "./CaseHeader";
import { CaseSummary } from "./CaseSummary";
import { InvestigationProgress } from "./InvestigationProgress";
import { Panel } from "./Panel";
import { Inspector } from "@/components/inspector/Inspector";
import { VaspAttribution } from "@/components/attribution/VaspAttribution";
import { GRAPH_PANEL_ID } from "./panelIds";
import { TimelinePanel } from "@/components/timeline/TimelinePanel";
import { FindingsPanel } from "@/components/findings/FindingsPanel";
import { TracePath } from "./TracePath";
import { WorkflowIndicator } from "./WorkflowIndicator";
import { WorkspaceProvider, useWorkspace } from "./WorkspaceContext";
import { ReviewPanel } from "@/components/review/ReviewPanel";
import { MoneyFlowGraph } from "@/components/graph/MoneyFlowGraph";
import { GraphLegend } from "@/components/graph/GraphLegend";

function WorkspaceBody({ onRestart }: { onRestart: () => void }) {
  // Trace and attribution are complete; the investigator verifies until a
  // VASP is confirmed, which moves the case on to SAHYOG.
  const { decision } = useWorkspace();
  const stage: WorkflowStageKey = decision === "confirmed" ? "sahyog" : "verify";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex min-h-screen flex-col"
    >
      <CaseHeader onRestart={onRestart} />
      <WorkflowIndicator current={stage} />

      <main className="flex flex-1 flex-col gap-3 p-3">
        {/* Stage: context (left) · money-flow graph with inspector beneath (right) */}
        <div className="grid gap-3 lg:h-[clamp(620px,82vh,880px)] lg:grid-cols-[280px_minmax(0,1fr)]">
          <div className="order-2 flex min-h-0 flex-col gap-3 lg:order-1 lg:overflow-y-auto [&>*]:shrink-0">
            <CaseSummary />
            <InvestigationProgress />
            <TracePath />
          </div>

          <div className="order-1 flex min-h-0 flex-col gap-3 lg:order-2">
            <Panel
              id={GRAPH_PANEL_ID}
              title="Money-flow graph"
              className="h-[520px] lg:h-auto lg:flex-1"
              bodyClassName="flex flex-col overflow-hidden p-0"
            >
              <div className="min-h-0 flex-1">
                <MoneyFlowGraph />
              </div>
              <GraphLegend />
            </Panel>
            <Inspector />
          </div>
        </div>

        {/* Conclusion → evidence → timeline */}
        <div className="grid gap-3 lg:h-[440px] lg:grid-cols-3">
          <VaspAttribution />
          <FindingsPanel />
          <TimelinePanel />
        </div>

        <ReviewPanel />
      </main>
    </motion.div>
  );
}

export function Workspace({ onRestart }: { onRestart: () => void }) {
  return (
    <WorkspaceProvider>
      <WorkspaceBody onRestart={onRestart} />
    </WorkspaceProvider>
  );
}
