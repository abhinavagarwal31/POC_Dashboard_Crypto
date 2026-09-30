"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, ClipboardCheck, Info, SearchCheck, ShieldCheck, XOctagon } from "lucide-react";
import { intelByNodeId, recommendedVasp } from "@/mock";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/workspace/Panel";
import { useWorkspace } from "@/components/workspace/WorkspaceContext";
import { ConfirmedAndRequest, RequestPreview, RequestPrepared } from "./SahyogFlow";

const EVIDENCE_REVIEWED = [
  "Fund flow",
  "Address behaviour",
  "Hot wallet relationship",
  "Provider agreement",
  "Timing",
];

function PendingReview() {
  const { decide } = useWorkspace();
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <section className="rounded-md border border-ok/40 bg-ok/[0.04] p-3.5">
        <div className="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.14em] text-ok">
          <ShieldCheck className="size-4" />
          SYSTEM RECOMMENDATION
        </div>
        <div className="label-caps mt-3 text-[10px]">Candidate VASP</div>
        <div className="text-lg font-semibold uppercase tracking-wide">
          {recommendedVasp.name}
        </div>
        <div className="font-addr text-sm text-ok">
          {recommendedVasp.confidence}% CONFIDENCE
        </div>
        <div className="label-caps mt-3 mb-1 text-[10px]">Evidence reviewed</div>
        <ul className="space-y-0.5">
          {EVIDENCE_REVIEWED.map((e) => (
            <li key={e} className="flex items-center gap-1.5 text-[13px]">
              <Check className="size-3.5 text-ok" />
              {e}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-md border border-border bg-background/50 p-3.5">
        <div className="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.14em] text-cyan-accent">
          <ClipboardCheck className="size-4" />
          INVESTIGATOR REVIEW
        </div>
        <p className="mt-2 mb-3 text-xs text-muted-foreground">
          The system recommends. The investigator decides.
        </p>
        <div className="space-y-2">
          <Button
            onClick={() => decide("confirmed")}
            className="w-full gap-2 text-xs font-semibold tracking-[0.12em]"
          >
            <Check className="size-4" />
            CONFIRM VASP
          </Button>
          <Button
            variant="outline"
            onClick={() => decide("further")}
            className="w-full gap-2 text-xs font-semibold tracking-[0.12em]"
          >
            <SearchCheck className="size-4" />
            REQUEST FURTHER INVESTIGATION
          </Button>
          <Button
            variant="outline"
            onClick={() => decide("rejected")}
            className="w-full gap-2 border-danger/50 text-xs font-semibold tracking-[0.12em] text-danger hover:bg-danger/10 hover:text-danger"
          >
            <XOctagon className="size-4" />
            REJECT ATTRIBUTION
          </Button>
        </div>
      </section>

      <section className="rounded-md border border-border bg-background/50 p-3.5">
        <div className="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.14em] text-muted-foreground">
          <Info className="size-4" />
          WHAT HAPPENS NEXT
        </div>
        <ul className="mt-2 space-y-2 text-[13px] leading-snug text-muted-foreground">
          <li>
            <span className="font-semibold text-foreground">Confirm</span> — prepares
            a SAHYOG disclosure request for {recommendedVasp.name} for your review.
          </li>
          <li>
            <span className="font-semibold text-foreground">Further investigation</span>{" "}
            — the case stays open; nothing is prepared.
          </li>
          <li>
            <span className="font-semibold text-foreground">Reject</span> — the
            attribution is recorded as rejected; no request is prepared.
          </li>
        </ul>
        <p className="mt-3 text-[11px] text-muted-foreground/80">
          Decisions only change this screen. No external action is taken.
        </p>
      </section>
    </div>
  );
}

function FurtherInvestigation() {
  const { decide } = useWorkspace();
  const unknown = intelByNodeId("unknownWallet");
  const items = [
    `Classify the unknown wallet (${unknown?.confidence}% classification confidence)`,
    "Obtain the missing Elliptic label for the destination",
    "Attempt to trace mixer output (not deterministic)",
  ];
  return (
    <div className="mx-auto max-w-xl rounded-md border border-warn/50 bg-warn/[0.05] p-4">
      <div className="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.14em] text-warn">
        <SearchCheck className="size-4" />
        FURTHER INVESTIGATION REQUESTED
      </div>
      <p className="mt-2 text-sm">
        Attribution to {recommendedVasp.name} is not confirmed. The case remains
        active.
      </p>
      <div className="label-caps mt-3 mb-1 text-[10px]">Suggested follow-up</div>
      <ul className="space-y-1 text-[13px]">
        {items.map((i) => (
          <li key={i} className="flex gap-1.5">
            <span className="text-warn">→</span>
            {i}
          </li>
        ))}
      </ul>
      <Button
        variant="outline"
        onClick={() => decide("pending")}
        className="mt-4 text-xs font-semibold tracking-[0.12em]"
      >
        RETURN TO REVIEW
      </Button>
    </div>
  );
}

function Rejected() {
  const { decide } = useWorkspace();
  return (
    <div className="mx-auto max-w-xl rounded-md border border-danger/50 bg-danger/[0.05] p-4">
      <div className="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.14em] text-danger">
        <XOctagon className="size-4" />
        ATTRIBUTION REJECTED
      </div>
      <p className="mt-2 text-sm">
        The {recommendedVasp.name} attribution was rejected by the investigator.
        No SAHYOG request will be prepared.
      </p>
      <Button
        variant="outline"
        onClick={() => decide("pending")}
        className="mt-4 text-xs font-semibold tracking-[0.12em]"
      >
        REVISE DECISION
      </Button>
    </div>
  );
}

export function ReviewPanel() {
  const { decision, sahyogStage } = useWorkspace();

  const view =
    decision === "pending" ? "pending"
    : decision === "further" ? "further"
    : decision === "rejected" ? "rejected"
    : sahyogStage === "preview" ? "preview"
    : sahyogStage === "prepared" ? "prepared"
    : "request";

  return (
    <Panel title="Investigator review · SAHYOG" id="review-panel">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {view === "pending" && <PendingReview />}
          {view === "further" && <FurtherInvestigation />}
          {view === "rejected" && <Rejected />}
          {view === "request" && <ConfirmedAndRequest />}
          {view === "preview" && <RequestPreview />}
          {view === "prepared" && <RequestPrepared />}
        </motion.div>
      </AnimatePresence>
    </Panel>
  );
}
