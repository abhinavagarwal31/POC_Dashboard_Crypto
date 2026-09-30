import type { NodeProps } from "@xyflow/react";
import {
  ArrowDownToLine,
  ArrowLeftRight,
  BadgeCheck,
  Building2,
  CircleHelp,
  Crosshair,
  Repeat,
  ShieldCheck,
  Shuffle,
  Vault,
} from "lucide-react";
import { shortAddr } from "@/lib/format";
import { crossChainTransfers, recommendedVasp } from "@/mock";
import { NodeFrame } from "./NodeFrame";
import type { WalletFlowNode } from "./graphModel";

const Addr = ({ value }: { value?: string }) => (
  <div className="font-addr truncate text-[13px]">{value ? shortAddr(value) : "—"}</div>
);
const Meta = ({ children }: { children: React.ReactNode }) => (
  <div className="truncate text-[11px] text-muted-foreground">{children}</div>
);

const chainName = (c: string) => (c === "tron" ? "Tron" : "Ethereum");

/** Solid cyan double-outline: the focus of the whole investigation. */
export function SubjectNode({ data }: NodeProps<WalletFlowNode>) {
  const { wallet: w, ...state } = data;
  return (
    <NodeFrame
      state={state}
      icon={Crosshair}
      title="SUBJECT WALLET"
      chain={w.chain}
      shapeClass="rounded-md border-2 border-cyan-accent bg-panel-raised shadow-[0_0_0_3px_oklch(0.78_0.12_215/0.15)]"
      iconClass="bg-cyan-accent text-primary-foreground"
      tag={{ text: w.flag ?? "", tone: "danger" }}
    >
      <Addr value={w.address} />
      <Meta>
        {chainName(w.chain)} · {w.txCount} TX
      </Meta>
    </NodeFrame>
  );
}

/** Dashed outline + question mark: identity not established. */
export function UnknownNode({ data }: NodeProps<WalletFlowNode>) {
  const { wallet: w, ...state } = data;
  return (
    <NodeFrame
      state={state}
      icon={CircleHelp}
      title={w.label}
      chain={w.chain}
      shapeClass="rounded-md border border-dashed border-muted-foreground/70 bg-panel"
      iconClass="border border-dashed border-muted-foreground/70 text-muted-foreground"
      tag={{ text: w.flag ?? "", tone: "warn" }}
    >
      <Addr value={w.address} />
      <Meta>
        {chainName(w.chain)} · {w.txCount} TX
      </Meta>
    </NodeFrame>
  );
}

/** Heavy left edge + inbox arrow: funds arrive here. */
export function DepositNode({ data }: NodeProps<WalletFlowNode>) {
  const { wallet: w, ...state } = data;
  return (
    <NodeFrame
      state={state}
      icon={ArrowDownToLine}
      title={w.label}
      chain={w.chain}
      shapeClass="rounded-sm border border-border border-l-[5px] border-l-cyan-accent bg-panel-raised"
      iconClass="bg-cyan-accent/15 text-cyan-accent"
      tag={{ text: "Repeated sweep detected", tone: "info", icon: Repeat }}
    >
      <Addr value={w.address} />
      <Meta>Receives funds</Meta>
    </NodeFrame>
  );
}

/** Heavy top edge + vault: a labelled, known entity wallet. */
export function HotWalletNode({ data }: NodeProps<WalletFlowNode>) {
  const { wallet: w, ...state } = data;
  return (
    <NodeFrame
      state={state}
      icon={Vault}
      title={w.label}
      chain={w.chain}
      shapeClass="rounded-sm border border-ok/40 border-t-[5px] border-t-ok bg-panel-raised"
      iconClass="bg-ok/15 text-ok"
      tag={{ text: "Known entity", tone: "ok", icon: BadgeCheck }}
    >
      <Addr value={w.address} />
      <Meta>Exchange X · labelled</Meta>
    </NodeFrame>
  );
}

/** Amber hatched fill + dashed border: obfuscation, trail goes cold. */
export function MixerNode({ data }: NodeProps<WalletFlowNode>) {
  const { wallet: w, ...state } = data;
  return (
    <NodeFrame
      state={state}
      icon={Shuffle}
      title={w.label}
      chain={w.chain}
      shapeClass="rounded-md border-2 border-dashed border-warn/70 bg-panel bg-[repeating-linear-gradient(135deg,transparent_0_7px,oklch(0.8_0.15_80/0.09)_7px_14px)]"
      iconClass="bg-warn/15 text-warn"
      tag={{ text: w.flag ?? "", tone: "warn" }}
    >
      <Addr value={w.address} />
      <Meta>Interaction detected</Meta>
    </NodeFrame>
  );
}

/** Fully rounded capsule with two chain chips: a crossing between networks. */
export function BridgeNode({ data }: NodeProps<WalletFlowNode>) {
  const { wallet: w, ...state } = data;
  const xc = crossChainTransfers.find((t) => t.bridgeNodeId === w.id);
  return (
    <NodeFrame
      state={state}
      icon={ArrowLeftRight}
      title={w.label}
      chain={w.chain}
      shapeClass="rounded-[26px] border border-[oklch(0.72_0.12_290)] bg-panel-raised"
      iconClass="bg-[oklch(0.72_0.12_290/0.2)] text-[oklch(0.8_0.1_290)]"
      tag={{ text: xc?.status ?? "", tone: "ok" }}
    >
      <Addr value={w.address} />
      <Meta>
        {xc?.sourceChain} → {xc?.destinationChain}
      </Meta>
    </NodeFrame>
  );
}

/** Thick green outline + confidence bar: the attributed entity. */
export function VaspNode({ data }: NodeProps<WalletFlowNode>) {
  const { wallet: w, ...state } = data;
  const conf = recommendedVasp.confidence;
  return (
    <NodeFrame
      state={state}
      icon={Building2}
      title="VASP"
      shapeClass="rounded-lg border-2 border-ok bg-panel-raised shadow-[0_0_0_3px_oklch(0.72_0.15_155/0.12)]"
      iconClass="bg-ok text-primary-foreground"
      tag={{ text: `${conf}% CONFIDENCE`, tone: "ok", icon: ShieldCheck }}
    >
      <div className="truncate text-sm font-semibold">{w.role}</div>
      <div className="h-1 overflow-hidden rounded-full bg-muted">
        <div className="h-full bg-ok" style={{ width: `${conf}%` }} />
      </div>
    </NodeFrame>
  );
}
