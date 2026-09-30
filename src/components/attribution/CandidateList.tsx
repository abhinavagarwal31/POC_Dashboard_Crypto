import { ChevronRight, ShieldCheck } from "lucide-react";
import type { VaspCandidate } from "@/mock";
import { cn } from "@/lib/utils";

/**
 * Candidate attribution — deliberately not ranked: no positions, no medals,
 * no comparative bars. The recommended candidate is emphasised because it is
 * the system's current recommendation, nothing more.
 */
export function CandidateList({
  candidates,
  onOpen,
}: {
  candidates: VaspCandidate[];
  onOpen: (id: string) => void;
}) {
  const recommended = candidates.filter((c) => c.recommended);
  const others = candidates.filter((c) => !c.recommended);

  return (
    <div className="space-y-2.5">
      {recommended.map((c) => (
        <button
          key={c.id}
          type="button"
          onClick={() => onOpen(c.id)}
          className="group w-full rounded-md border-2 border-ok/60 bg-ok/[0.06] p-3 text-left transition-colors hover:bg-ok/10"
        >
          <div className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.14em] text-ok">
            <ShieldCheck className="size-3.5" />
            CURRENT SYSTEM RECOMMENDATION
          </div>
          <div className="mt-2 flex items-end justify-between gap-3">
            <div>
              <div className="text-lg font-semibold uppercase tracking-wide">
                {c.name}
              </div>
              <div className="font-addr text-sm text-ok">
                {c.confidence}% CONFIDENCE
              </div>
            </div>
            <span className="flex items-center gap-0.5 text-xs font-medium text-cyan-accent">
              Why this VASP?
              <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </button>
      ))}

      <div className="label-caps pt-1 text-[10px]">Other candidates considered</div>
      {others.map((c) => (
        <button
          key={c.id}
          type="button"
          onClick={() => onOpen(c.id)}
          className={cn(
            "group flex w-full items-center justify-between gap-3 rounded-sm border border-border px-3 py-2 text-left transition-colors",
            "hover:border-muted-foreground/50 hover:bg-muted/40",
          )}
        >
          <span>
            <span className="block text-sm font-medium uppercase tracking-wide text-foreground/90">
              {c.name}
            </span>
            <span className="block text-[11px] text-muted-foreground">
              {c.summary}
            </span>
          </span>
          <span className="flex items-center gap-1">
            <span className="font-addr text-sm text-muted-foreground">
              {c.confidence}%
            </span>
            <ChevronRight className="size-4 text-muted-foreground/60" />
          </span>
        </button>
      ))}
    </div>
  );
}
