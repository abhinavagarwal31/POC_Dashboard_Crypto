import { Check, TriangleAlert } from "lucide-react";
import { intelByNodeId, walletById } from "@/mock";
import { Field } from "./Field";

const chainName = (c: string) => (c === "tron" ? "Tron" : "Ethereum");

export function AddressIntelCard({ nodeId }: { nodeId: string }) {
  const w = walletById(nodeId);
  const intel = intelByNodeId(nodeId);
  if (!intel) return null;

  return (
    <div className="grid gap-x-6 gap-y-3 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
      <div className="space-y-2.5">
        <Field label="Address" mono>
          <span title={w.address}>
            {w.address ?? `${w.role} (entity)`}
          </span>
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Classification">{intel.classification}</Field>
          <div>
            <div className="label-caps text-[10px]">Confidence</div>
            <div className="mt-1 flex items-center gap-2">
              <span className="font-addr text-sm">{intel.confidence}%</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-cyan-accent"
                  style={{ width: `${intel.confidence}%` }}
                />
              </div>
            </div>
          </div>
        </div>
        <p className="text-[11px] text-muted-foreground">
          {w.label} · {chainName(w.chain)}
          {w.txCount ? ` · ${w.txCount} TX` : ""}
        </p>
      </div>

      <div>
        <div className="label-caps mb-1 text-[10px]">Observed behaviour</div>
        <ul className="space-y-1">
          {intel.observedBehaviour.map((b) => (
            <li key={b} className="flex items-start gap-1.5 text-[13px] leading-snug">
              <Check className="mt-0.5 size-3.5 shrink-0 text-ok" />
              {b}
            </li>
          ))}
        </ul>
        {intel.caveat && (
          <p className="mt-2 flex items-start gap-1.5 text-[11px] text-warn">
            <TriangleAlert className="mt-0.5 size-3.5 shrink-0" />
            {intel.caveat}
          </p>
        )}
      </div>
    </div>
  );
}
