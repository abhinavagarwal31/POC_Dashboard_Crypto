import {
  ArrowDownToLine,
  ArrowLeftRight,
  Building2,
  CircleHelp,
  Crosshair,
  Shuffle,
  Vault,
} from "lucide-react";

const ITEMS = [
  { icon: Crosshair, label: "Subject" },
  { icon: CircleHelp, label: "Unknown" },
  { icon: ArrowDownToLine, label: "Deposit address" },
  { icon: Vault, label: "Hot wallet" },
  { icon: Shuffle, label: "Mixer" },
  { icon: ArrowLeftRight, label: "Bridge" },
  { icon: Building2, label: "VASP" },
];

export function GraphLegend() {
  return (
    <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border bg-panel px-3 py-1.5 text-[10px] text-muted-foreground">
      {ITEMS.map(({ icon: Icon, label }) => (
        <li key={label} className="flex items-center gap-1.5">
          <Icon className="size-3 text-foreground/70" />
          {label}
        </li>
      ))}
      <li className="ml-auto flex items-center gap-3">
        <span className="flex items-center gap-1.5">
          <span className="h-px w-5 bg-[oklch(0.62_0.05_250)]" /> transfer
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-5 border-t border-dashed border-[oklch(0.72_0.12_290)]" /> cross-chain
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-5 border-t border-dashed border-warn" /> mixer
        </span>
      </li>
    </ul>
  );
}
