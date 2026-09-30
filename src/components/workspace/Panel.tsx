import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Bordered workspace panel with a small-caps title bar. */
export function Panel({
  id,
  title,
  action,
  className,
  bodyClassName,
  children,
}: {
  id?: string;
  title: string;
  action?: ReactNode;
  className?: string;
  bodyClassName?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "flex min-h-0 scroll-mt-3 flex-col rounded-md border border-border bg-panel",
        className,
      )}
    >
      <header className="flex h-9 shrink-0 items-center justify-between border-b border-border px-3">
        <h2 className="label-caps">{title}</h2>
        {action}
      </header>
      <div className={cn("min-h-0 flex-1 overflow-auto p-3", bodyClassName)}>
        {children}
      </div>
    </section>
  );
}

/** Temporary slot for panels built in later steps. */
export function PanelPlaceholder({ step, text }: { step: number; text: string }) {
  return (
    <div className="flex h-full min-h-24 flex-col items-center justify-center gap-1 rounded-sm border border-dashed border-border text-center">
      <span className="text-xs text-muted-foreground">{text}</span>
      <span className="label-caps text-[10px] text-muted-foreground/60">
        Step {step}
      </span>
    </div>
  );
}
