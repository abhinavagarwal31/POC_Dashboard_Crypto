import type { ReactNode } from "react";
import { Handle, Position } from "@xyflow/react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ChainId } from "@/mock";
import type { VisualState } from "./graphModel";

const TAG_TONES = {
  danger: "border-danger/60 bg-danger/15 text-danger",
  warn: "border-warn/60 bg-warn/10 text-warn",
  ok: "border-ok/60 bg-ok/10 text-ok",
  info: "border-cyan-accent/50 bg-cyan-accent/10 text-cyan-accent",
} as const;

export type TagTone = keyof typeof TAG_TONES;

const CHAIN_CHIP: Record<ChainId, string> = { ethereum: "ETH", tron: "TRX" };

interface NodeFrameProps {
  state: VisualState;
  icon: LucideIcon;
  /** Kind label, e.g. "EXCHANGE DEPOSIT" */
  title: string;
  chain?: ChainId;
  /** Structural identity of this node type: border style, shape, background. */
  shapeClass: string;
  iconClass: string;
  tag?: { text: string; tone: TagTone; icon?: LucideIcon };
  children: ReactNode;
}

const handleClass =
  "!size-1.5 !min-h-0 !min-w-0 !border-0 !bg-transparent";

/**
 * Shared chrome for every graph node. Node types differ in border style,
 * shape, icon and content structure — not only colour.
 */
export function NodeFrame({
  state,
  icon: Icon,
  title,
  chain,
  shapeClass,
  iconClass,
  tag,
  children,
}: NodeFrameProps) {
  const TagIcon = tag?.icon;
  return (
    <div
      className={cn(
        "flex h-[92px] w-[208px] cursor-pointer flex-col justify-between overflow-hidden px-2.5 py-2 transition-[opacity,box-shadow] duration-200",
        shapeClass,
        state.dimmed && "opacity-20",
        state.highlighted &&
          "shadow-[0_0_0_1px_oklch(0.85_0.13_215),0_0_18px_oklch(0.78_0.12_215/0.4)]",
        state.selected &&
          "outline-2 outline-offset-[3px] outline-cyan-accent",
      )}
    >
      <Handle id="in-l" type="target" position={Position.Left} isConnectable={false} className={handleClass} />
      <Handle id="out-r" type="source" position={Position.Right} isConnectable={false} className={handleClass} />
      <Handle id="in-t" type="target" position={Position.Top} isConnectable={false} className={handleClass} />
      <Handle id="out-t" type="source" position={Position.Top} isConnectable={false} className={handleClass} />
      <Handle id="in-b" type="target" position={Position.Bottom} isConnectable={false} className={handleClass} />
      <Handle id="out-b" type="source" position={Position.Bottom} isConnectable={false} className={handleClass} />

      <div className="flex items-center gap-1.5">
        <span className={cn("flex size-6 shrink-0 items-center justify-center rounded-sm", iconClass)}>
          <Icon className="size-3.5" />
        </span>
        <span className="min-w-0 flex-1 truncate text-[11px] font-semibold tracking-wider">
          {title}
        </span>
      </div>

      <div className="min-w-0 space-y-0.5">{children}</div>

      <div className="flex items-center justify-between gap-2">
        {tag && (
          <span
            className={cn(
              "flex min-w-0 items-center gap-1 rounded-sm border px-1.5 py-px text-[10px] font-semibold tracking-wide",
              TAG_TONES[tag.tone],
            )}
          >
            {TagIcon && <TagIcon className="size-2.5 shrink-0" />}
            <span className="truncate">{tag.text}</span>
          </span>
        )}
        {chain && (
          <span className="font-addr ml-auto shrink-0 rounded-sm border border-border px-1 text-[10px] text-muted-foreground">
            {CHAIN_CHIP[chain]}
          </span>
        )}
      </div>
    </div>
  );
}
