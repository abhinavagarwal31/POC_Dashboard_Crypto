"use client";

import { MousePointerClick, X } from "lucide-react";
import { graphLinks, providerAgreement, walletById } from "@/mock";
import { Panel } from "@/components/workspace/Panel";
import { useWorkspace } from "@/components/workspace/WorkspaceContext";
import { AddressIntelCard } from "./AddressIntelCard";
import { CrossChainCard } from "./CrossChainCard";
import { IntelSources } from "./IntelSources";
import { TransactionCard } from "./TransactionCard";

function EmptyState() {
  return (
    <div className="flex h-full min-h-24 flex-col items-center justify-center gap-1.5 text-center">
      <MousePointerClick className="size-5 text-muted-foreground/60" />
      <p className="text-sm text-muted-foreground">
        Select an address or a transaction on the graph
      </p>
      <p className="text-[11px] text-muted-foreground/70">
        to see what the system knows about it
      </p>
    </div>
  );
}

/** Content for the current selection, plus the panel title that names it. */
function useInspectorContent(): { title: string; body: React.ReactNode } | null {
  const { selectedNodeId, selectedEdgeId } = useWorkspace();

  if (selectedNodeId) {
    const w = walletById(selectedNodeId);
    return {
      title: "Address intelligence",
      body: (
        <div className="flex flex-col gap-3 xl:flex-row">
          <div className="min-w-0 flex-1">
            <AddressIntelCard nodeId={selectedNodeId} />
          </div>
          {w.kind === "bridge" && (
            <div className="xl:w-[240px] xl:shrink-0">
              <CrossChainCard bridgeNodeId={w.id} />
            </div>
          )}
        </div>
      ),
    };
  }

  if (selectedEdgeId) {
    const link = graphLinks.find((l) => l.id === selectedEdgeId);
    if (!link) return null;

    if (link.kind === "attribution") {
      return {
        title: "Entity attribution",
        body: (
          <div className="space-y-1.5 text-sm">
            <p>
              <span className="font-semibold">Exchange X hot wallet</span> is
              operated by <span className="font-semibold">Exchange X</span>.
            </p>
            <p className="text-[13px] text-muted-foreground">
              Labelled by {providerAgreement.agreeing} of{" "}
              {providerAgreement.total} intelligence providers. Not an on-chain
              transfer.
            </p>
          </div>
        ),
      };
    }

    const crossChainBridge = [link.source, link.target]
      .map(walletById)
      .find((w) => w.kind === "bridge");
    return {
      title: "Transaction",
      body: (
        <div className="flex flex-col gap-3 xl:flex-row">
          <div className="min-w-0 flex-1">
            <TransactionCard txId={link.txId!} />
          </div>
          {crossChainBridge && (
            <div className="xl:w-[240px] xl:shrink-0">
              <CrossChainCard bridgeNodeId={crossChainBridge.id} />
            </div>
          )}
        </div>
      ),
    };
  }
  return null;
}

export function Inspector() {
  const { clearSelection, selectedNodeId, selectedEdgeId } = useWorkspace();
  const content = useInspectorContent();
  const hasSelection = !!(selectedNodeId || selectedEdgeId);

  return (
    <Panel
      title={content ? `Inspector · ${content.title}` : "Inspector"}
      className="min-h-[200px] lg:h-[230px]"
      bodyClassName="p-0"
      action={
        hasSelection && (
          <button
            type="button"
            onClick={clearSelection}
            aria-label="Clear selection"
            className="flex items-center gap-1 text-[10px] font-semibold tracking-wider text-muted-foreground hover:text-foreground"
          >
            CLEAR <X className="size-3" />
          </button>
        )
      }
    >
      <div className="grid h-full lg:grid-cols-[minmax(0,1fr)_250px]">
        <div className="min-h-0 overflow-auto p-3">
          {content ? content.body : <EmptyState />}
        </div>
        <div className="overflow-auto border-t border-border p-3 lg:border-t-0 lg:border-l">
          <IntelSources />
        </div>
      </div>
    </Panel>
  );
}
