"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { analysisSteps, investigationCase } from "@/mock";
import { shortAddr } from "@/lib/format";

/** Mock latency per step (ms) so the pipeline feels like real work. */
const STEP_DELAYS = [600, 800, 750, 700, 900, 650, 800];
const HANDOFF_DELAY = 600;

export function AnalysisPipeline({ onComplete }: { onComplete: () => void }) {
  const total = analysisSteps.length;
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    const finished = completed >= total;
    const timer = setTimeout(
      finished ? onComplete : () => setCompleted((c) => c + 1),
      finished ? HANDOFF_DELAY : STEP_DELAYS[completed],
    );
    return () => clearTimeout(timer);
  }, [completed, total, onComplete]);

  const pct = Math.round((completed / total) * 100);

  return (
    <motion.main
      key="analysis"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-1 items-center justify-center px-6 py-12"
    >
      <section className="w-full max-w-xl rounded-md border border-border bg-panel p-6 shadow-lg shadow-black/20">
        <header className="mb-4 flex items-start justify-between gap-4 border-b border-border pb-4">
          <div>
            <div className="label-caps">Case {investigationCase.number}</div>
            <div className="font-addr mt-1 text-sm">
              {shortAddr(investigationCase.subjectAddress)}
            </div>
          </div>
          <div className="text-right">
            <div className="label-caps">Analysis</div>
            <div className="font-addr mt-1 text-sm text-cyan-accent">
              {pct}%
            </div>
          </div>
        </header>

        <div
          className="mb-5 h-1 overflow-hidden rounded-full bg-muted"
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <motion.div
            className="h-full bg-cyan-accent"
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        <ul className="space-y-3">
          <AnimatePresence initial={false}>
            {analysisSteps.map((step, i) => {
              if (i > completed) return null;
              const done = i < completed;
              return (
                <motion.li
                  key={step.running}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <div
                    className={`font-addr text-xs tracking-wider ${
                      done ? "text-muted-foreground" : "text-foreground"
                    }`}
                  >
                    {step.running}
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-sm">
                    {done ? (
                      <>
                        <Check className="size-4 text-ok" />
                        <span>{step.done}</span>
                      </>
                    ) : (
                      <>
                        <Loader2 className="size-4 animate-spin text-cyan-accent" />
                        <span className="text-muted-foreground">Working…</span>
                      </>
                    )}
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>

        {completed >= total && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-5 border-t border-border pt-4 text-center text-xs tracking-[0.14em] text-cyan-accent"
          >
            OPENING INVESTIGATION WORKSPACE…
          </motion.p>
        )}
      </section>
    </motion.main>
  );
}
