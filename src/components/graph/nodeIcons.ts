import {
  ArrowDownToLine,
  ArrowLeftRight,
  Building2,
  CircleHelp,
  Crosshair,
  Shuffle,
  Vault,
  type LucideIcon,
} from "lucide-react";
import type { NodeKind } from "@/mock";

/** One icon per node type, shared by the graph and the panels that refer to it. */
export const nodeIcons: Record<NodeKind, LucideIcon> = {
  subject: Crosshair,
  unknown: CircleHelp,
  deposit: ArrowDownToLine,
  hot: Vault,
  mixer: Shuffle,
  bridge: ArrowLeftRight,
  vasp: Building2,
};
