"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { WorkflowStageKey } from "@/mock";
import { CaseHeader } from "./CaseHeader";
import { CaseSummary } from "./CaseSummary";
import { InvestigationProgress } from "./InvestigationProgress";
import { Panel, PanelPlaceholder } from "./Panel";
import { WorkflowIndicator } from "./WorkflowIndicator";

export function Workspace({ onRestart }: { onRestart: () => void }) {
  // Trace and attribution are complete; the investigator now verifies.
  const [stage] = useState<WorkflowStageKey>("verify");

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
        {/* Stage: context (left) · money-flow graph (centre) · inspector (right) */}
        <div className="grid gap-3 lg:h-[clamp(540px,64vh,780px)] lg:grid-cols-[300px_minmax(0,1fr)_340px]">
          <div className="flex min-h-0 flex-col gap-3 lg:overflow-y-auto">
            <CaseSummary />
            <InvestigationProgress />
            <Panel title="Trace path">
              <PanelPlaceholder step={6} text="Trace path" />
            </Panel>
          </div>

          <Panel title="Money-flow graph" className="min-h-[420px]" bodyClassName="p-0">
            <div className="h-full p-3">
              <PanelPlaceholder step={5} text="Money-flow graph (React Flow)" />
            </div>
          </Panel>

          <Panel title="Inspector" className="min-h-[240px]">
            <PanelPlaceholder step={7} text="Address intelligence · transaction · cross-chain" />
          </Panel>
        </div>

        {/* Conclusion → evidence → timeline */}
        <div className="grid gap-3 lg:grid-cols-3">
          <Panel title="VASP attribution" className="min-h-56">
            <PanelPlaceholder step={8} text="Candidate VASPs · why this VASP?" />
          </Panel>
          <Panel title="Findings & evidence" className="min-h-56">
            <PanelPlaceholder step={9} text="Findings F-001 – F-005 · evidence" />
          </Panel>
          <Panel title="Transaction timeline" className="min-h-56">
            <PanelPlaceholder step={10} text="Transaction timeline" />
          </Panel>
        </div>

        <Panel title="Investigator review · SAHYOG">
          <PanelPlaceholder step={11} text="System recommendation · investigator decision · SAHYOG request" />
        </Panel>
      </main>
    </motion.div>
  );
}
