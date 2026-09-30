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
