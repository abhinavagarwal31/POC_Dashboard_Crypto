import { ArrowRight, Check } from "lucide-react";
import { progressChecklist } from "@/mock";
import { cn } from "@/lib/utils";
import { Panel } from "./Panel";

export function InvestigationProgress() {
  return (
    <Panel title="Investigation progress">
      <ol className="space-y-1.5">
        {progressChecklist.map((item) => (
          <li
            key={item.label}
            className={cn(
              "flex items-center gap-2 text-sm",
              !item.done && "font-medium text-cyan-accent",
            )}
          >
            {item.done ? (
              <Check className="size-4 shrink-0 text-ok" />
            ) : (
              <ArrowRight className="size-4 shrink-0" />
            )}
            {item.label}
          </li>
        ))}
      </ol>
    </Panel>
  );
}
