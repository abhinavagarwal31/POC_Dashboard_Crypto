import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Small-caps label over a value. */
export function Field({
  label,
  children,
  mono,
  className,
}: {
  label: string;
  children: ReactNode;
  mono?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("min-w-0", className)}>
      <div className="label-caps text-[10px]">{label}</div>
      <div className={cn("mt-0.5 truncate text-sm", mono && "font-addr")}>
        {children}
      </div>
    </div>
  );
}
