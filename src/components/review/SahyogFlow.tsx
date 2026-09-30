"use client";

import { Fragment } from "react";
import { ArrowDown, ArrowLeft, Check, CheckCircle2, FileText, Send } from "lucide-react";
import { investigationCase, sahyogRequest as req, walletById } from "@/mock";
import { shortAddr } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/inspector/Field";
import { useWorkspace } from "@/components/workspace/WorkspaceContext";

/** Shown right after CONFIRM VASP: what was confirmed, and the request to review. */
export function ConfirmedAndRequest() {
  const { setSahyogStage, decide } = useWorkspace();
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <section className="rounded-md border-2 border-ok/50 bg-ok/[0.05] p-3.5">
        <div className="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.14em] text-ok">
          <CheckCircle2 className="size-4" />
          VASP ATTRIBUTION CONFIRMED
        </div>
        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3">
          <Field label="Candidate">{req.vaspName}</Field>
          <Field label="Case" mono>{req.caseId}</Field>
          <Field label="Relevant wallet" mono>{shortAddr(req.subjectAddress)}</Field>
          <Field label="Evidence">{req.linkedTransactionIds.length} linked transactions</Field>
        </div>
        <button
          type="button"
          onClick={() => decide("pending")}
          className="mt-3 text-[11px] font-semibold tracking-wider text-muted-foreground hover:text-foreground"
        >
          ← REVISE DECISION
        </button>
      </section>

      <section className="rounded-md border border-border bg-background/50 p-3.5">
        <div className="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.14em] text-cyan-accent">
          <FileText className="size-4" />
          SAHYOG REQUEST
        </div>
        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3">
          <Field label="Request type">{req.requestType}</Field>
          <Field label="VASP">{req.vaspName}</Field>
          <Field label="Case ID" mono>{req.caseId}</Field>
          <Field label="Relevant addresses" mono>{req.relevantAddressIds.length}</Field>
          <Field label="Supporting evidence">
            <span className="text-ok">Attached</span>
          </Field>
        </div>
        <Button
          onClick={() => setSahyogStage("preview")}
          className="mt-4 w-full gap-2 text-xs font-semibold tracking-[0.12em]"
        >
          REVIEW REQUEST
        </Button>
      </section>
    </div>
  );
}

function pathLabel(nodeId: string): { main: string; mono: boolean } {
  const w = walletById(nodeId);
  if (w.kind === "vasp") return { main: req.vaspName, mono: false };
  if (w.kind === "deposit") return { main: "Deposit address", mono: false };
  return { main: shortAddr(w.address ?? ""), mono: true };
}

/** Full request as it would be sent. Submitting only simulates. */
export function RequestPreview() {
  const { setSahyogStage } = useWorkspace();
  return (
    <div className="mx-auto max-w-3xl rounded-md border border-border bg-background/50 p-4">
      <div className="flex items-center justify-between border-b border-border pb-2.5">
        <div className="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.14em] text-cyan-accent">
          <FileText className="size-4" />
          SAHYOG DISCLOSURE REQUEST
        </div>
        <span className="font-addr text-xs text-muted-foreground">
          CASE {investigationCase.number}
        </span>
      </div>

      <div className="mt-3 grid gap-x-6 gap-y-3 sm:grid-cols-3">
        <Field label="Requested VASP">{req.vaspName}</Field>
        <Field label="Subject wallet" mono>{shortAddr(req.subjectAddress)}</Field>
        <Field label="Reason">{req.reason}</Field>
      </div>

      <div className="mt-4 grid gap-6 sm:grid-cols-2">
        <div>
          <div className="label-caps mb-1.5 text-[10px]">Relevant transaction path</div>
          <ol className="space-y-0.5">
            {req.tracePathNodeIds.map((id, i) => {
              const { main, mono } = pathLabel(id);
              return (
                <Fragment key={id}>
                  {i > 0 && (
                    <li aria-hidden className="pl-1">
                      <ArrowDown className="size-3.5 text-muted-foreground/60" />
                    </li>
                  )}
                  <li className={mono ? "font-addr text-sm" : "text-sm font-medium"}>
                    {main}
                  </li>
                </Fragment>
              );
            })}
          </ol>
        </div>
        <div>
          <div className="label-caps mb-1.5 text-[10px]">Supporting evidence</div>
          <ul className="space-y-1">
            {req.supportingEvidence.map((s) => (
              <li key={s} className="flex items-start gap-1.5 text-[13px]">
                <Check className="mt-0.5 size-3.5 shrink-0 text-ok" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-5 flex gap-2 border-t border-border pt-3">
        <Button
          variant="outline"
          onClick={() => setSahyogStage("request")}
          className="gap-1.5 text-xs font-semibold tracking-[0.12em]"
        >
          <ArrowLeft className="size-4" />
          BACK
        </Button>
        <Button
          onClick={() => setSahyogStage("prepared")}
          className="flex-1 gap-2 text-xs font-semibold tracking-[0.12em]"
        >
          <Send className="size-4" />
          SUBMIT REQUEST
        </Button>
      </div>
      <p className="mt-2 text-center text-[10px] text-muted-foreground">
        Proof of concept — submitting only prepares the request. Nothing is sent to SAHYOG.
      </p>
    </div>
  );
}

export function RequestPrepared() {
  return (
    <div className="mx-auto max-w-md rounded-md border-2 border-ok/50 bg-ok/[0.05] p-5 text-center">
      <CheckCircle2 className="mx-auto size-8 text-ok" />
      <div className="mt-2 text-sm font-semibold tracking-[0.16em]">REQUEST PREPARED</div>
      <div className="mt-4 grid grid-cols-2 gap-4 text-left">
        <Field label="SAHYOG request ID" mono>{req.requestId}</Field>
        <Field label="Status">
          <span className="font-semibold text-ok">{req.finalStatus}</span>
        </Field>
      </div>
      <p className="mt-4 text-[11px] text-muted-foreground">
        Simulated. No request has been transmitted to SAHYOG or to {req.vaspName}.
      </p>
    </div>
  );
}
