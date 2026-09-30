"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Highlight } from "@/mock";

/** Evidence currently emphasised on the graph; everything else is dimmed. */
export interface ActiveHighlight extends Highlight {
  /** What produced the highlight, e.g. "Exchange X · evidence" */
  label: string;
  /** DOM id of the panel that produced it, so the graph can link back. */
  sourceId?: string;
}

interface WorkspaceState {
  selectedNodeId: string | null;
  /** Graph link id (a transaction id, or an attribution link id). */
  selectedEdgeId: string | null;
  highlight: ActiveHighlight | null;
  selectNode: (id: string | null) => void;
  selectEdge: (id: string | null) => void;
  setHighlight: (h: ActiveHighlight | null) => void;
  clearSelection: () => void;
}

const Ctx = createContext<WorkspaceState | null>(null);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [selectedNodeId, setNode] = useState<string | null>(null);
  const [selectedEdgeId, setEdge] = useState<string | null>(null);
  const [highlight, setHighlight] = useState<ActiveHighlight | null>(null);

  // A node and an edge are never selected at the same time.
  const selectNode = useCallback((id: string | null) => {
    setNode(id);
    setEdge(null);
  }, []);
  const selectEdge = useCallback((id: string | null) => {
    setEdge(id);
    setNode(null);
  }, []);
  const clearSelection = useCallback(() => {
    setNode(null);
    setEdge(null);
  }, []);

  const value = useMemo(
    () => ({
      selectedNodeId,
      selectedEdgeId,
      highlight,
      selectNode,
      selectEdge,
      setHighlight,
      clearSelection,
    }),
    [selectedNodeId, selectedEdgeId, highlight, selectNode, selectEdge, clearSelection],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useWorkspace(): WorkspaceState {
  const v = useContext(Ctx);
  if (!v) throw new Error("useWorkspace must be used inside WorkspaceProvider");
  return v;
}
