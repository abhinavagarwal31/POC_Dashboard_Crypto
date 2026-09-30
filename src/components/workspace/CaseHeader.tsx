import { RotateCcw, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { investigationCase } from "@/mock";

export function CaseHeader({ onRestart }: { onRestart: () => void }) {
  return (
    <header className="flex h-12 shrink-0 items-center justify-between gap-4 border-b border-border bg-panel px-4">
      <div className="flex min-w-0 items-center gap-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-4 text-cyan-accent" />
          <span className="text-sm font-semibold tracking-wide">
            CASE {investigationCase.number}
          </span>
        </div>
        <span className="hidden h-4 w-px bg-border sm:block" />
        <span className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.12em] text-cyan-accent">
          <span className="size-1.5 rounded-full bg-cyan-accent" />
          <span className="hidden sm:inline">ACTIVE INVESTIGATION</span>
        </span>
        <span className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.12em] text-ok">
          <span className="size-1.5 rounded-full bg-ok" />
          TRACE COMPLETE
        </span>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={onRestart}
        className="gap-1.5 text-xs text-muted-foreground"
      >
        <RotateCcw className="size-3.5" />
        <span className="hidden sm:inline">Restart demo</span>
      </Button>
    </header>
  );
}
