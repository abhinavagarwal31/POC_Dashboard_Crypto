"use client";

import { useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { IntakeScreen } from "@/components/intake/IntakeScreen";
import { AnalysisPipeline } from "@/components/intake/AnalysisPipeline";
import { Workspace } from "@/components/workspace/Workspace";

type Phase = "intake" | "analyzing" | "workspace";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("intake");
  const openWorkspace = useCallback(() => setPhase("workspace"), []);

  return (
    <AnimatePresence mode="wait">
      {phase === "intake" && (
        <IntakeScreen key="intake" onStart={() => setPhase("analyzing")} />
      )}
      {phase === "analyzing" && (
        <AnalysisPipeline key="analysis" onComplete={openWorkspace} />
      )}
      {phase === "workspace" && (
        <Workspace key="workspace" onRestart={() => setPhase("intake")} />
      )}
    </AnimatePresence>
  );
}
