import { Check, ChevronRight } from "lucide-react";
import { workflowStages, type WorkflowStageKey } from "@/mock";
import { cn } from "@/lib/utils";

/** WALLET → TRACE → CLASSIFY → ATTRIBUTE → VERIFY → SAHYOG, with the current stage marked. */
export function WorkflowIndicator({ current }: { current: WorkflowStageKey }) {
  const currentIndex = workflowStages.findIndex((s) => s.key === current);

  return (
    <nav
      aria-label="Investigation workflow"
      className="shrink-0 overflow-x-auto border-b border-border bg-background/60"
    >
      <ol className="mx-auto flex w-max min-w-full items-start justify-center gap-1 px-4 pt-2 pb-1.5">
        {workflowStages.map((stage, i) => {
          const state =
            i < currentIndex ? "done" : i === currentIndex ? "current" : "todo";
          return (
            <li key={stage.key} className="flex items-start gap-1">
              <div className="flex flex-col items-center gap-1">
                <span
                  aria-current={state === "current" ? "step" : undefined}
                  className={cn(
                    "flex items-center gap-1.5 rounded-sm border px-2.5 py-1 text-[11px] font-semibold tracking-[0.14em]",
                    state === "done" && "border-ok/30 text-ok",
                    state === "current" &&
                      "border-cyan-accent bg-cyan-accent/10 text-cyan-accent",
                    state === "todo" && "border-border text-muted-foreground",
                  )}
                >
                  {state === "done" ? (
                    <Check className="size-3" />
                  ) : (
                    <span>{i + 1}</span>
                  )}
                  {stage.label}
                </span>
                <span
                  className={cn(
                    "h-3 text-[9px] font-semibold tracking-[0.16em] text-cyan-accent",
                    state !== "current" && "invisible",
                  )}
                >
                  ▲ CURRENT
                </span>
              </div>
              {i < workflowStages.length - 1 && (
                <ChevronRight className="mt-1.5 size-3.5 text-muted-foreground/60" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
