import { ArrowRight, Check } from "lucide-react";
import { progressChecklist } from "@/mock";
import { cn } from "@/lib/utils";
import { Panel } from "./Panel";
import { useWorkspace } from "./WorkspaceContext";

export function InvestigationProgress() {
  const { decision, sahyogStage } = useWorkspace();

  // The last mock item is "Investigator review"; its state follows the decision.
  const base = progressChecklist.slice(0, -1);
  const review = progressChecklist[progressChecklist.length - 1];
  const items = [
    ...base,
    decision === "confirmed"
      ? { label: "Investigator review · VASP confirmed", done: true }
      : decision === "further"
        ? { label: "Investigator review · further investigation", done: false }
        : decision === "rejected"
          ? { label: "Investigator review · attribution rejected", done: false }
          : review,
    ...(decision === "confirmed"
      ? [
          sahyogStage === "prepared"
            ? { label: "SAHYOG request prepared", done: true }
            : { label: "SAHYOG request", done: false },
        ]
      : []),
  ];

  return (
    <Panel title="Investigation progress">
      <ol className="space-y-1.5">
        {items.map((item) => (
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
