import { ChevronRight } from "lucide-react";
import { workflowStages } from "@/mock";

/** Static overview of the six-stage pipeline, used on the intake screen. */
export function WorkflowStrip() {
  return (
    <ol className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2">
      {workflowStages.map((s, i) => (
        <li key={s.key} className="flex items-center gap-1">
          <span className="rounded-sm border border-border bg-panel px-2.5 py-1 text-[11px] font-semibold tracking-[0.14em] text-muted-foreground">
            <span className="mr-1.5 text-cyan-accent">{i + 1}</span>
            {s.label}
          </span>
          {i < workflowStages.length - 1 && (
            <ChevronRight className="size-3.5 text-muted-foreground/60" />
          )}
        </li>
      ))}
    </ol>
  );
}
