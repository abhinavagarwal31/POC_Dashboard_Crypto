"use client";

import { useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { IntakeScreen } from "@/components/intake/IntakeScreen";
import { AnalysisPipeline } from "@/components/intake/AnalysisPipeline";
import { investigationCase } from "@/mock";

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
        // Placeholder until the workspace shell is built (Step 4).
        <main key="workspace" className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <p className="label-caps">Investigation workspace</p>
            <h1 className="mt-2 text-2xl font-semibold">
              Case {investigationCase.number}
            </h1>
            <button
              className="mt-4 text-xs text-cyan-accent underline"
              onClick={() => setPhase("intake")}
            >
              Restart demo
            </button>
          </div>
        </main>
      )}
    </AnimatePresence>
  );
}
