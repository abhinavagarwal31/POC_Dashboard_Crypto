"use client";

import { motion } from "framer-motion";
import { Fingerprint, Network, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { investigationCase } from "@/mock";
import { WorkflowStrip } from "./WorkflowStrip";

function Field({
  label,
  icon: Icon,
  value,
  mono,
}: {
  label: string;
  icon: typeof Search;
  value: string;
  mono?: boolean;
}) {
  return (
    <div>
      <div className="label-caps mb-1.5">{label}</div>
      <div className="flex items-center gap-2.5 rounded-sm border border-border bg-background/60 px-3 py-2.5">
        <Icon className="size-4 shrink-0 text-cyan-accent" />
        <span className={mono ? "font-addr text-sm" : "text-sm"}>{value}</span>
      </div>
    </div>
  );
}

export function IntakeScreen({ onStart }: { onStart: () => void }) {
  return (
    <motion.main
      key="intake"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      className="flex flex-1 flex-col items-center justify-center gap-10 px-6 py-12"
    >
      <div className="text-center">
        <p className="label-caps">Blockchain Intelligence · Law Enforcement</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Blockchain Investigation Workspace
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
          Start from a suspicious wallet. Trace the money, classify what it
          touched, and determine which VASP is best supported by the evidence.
        </p>
      </div>

      <section className="w-full max-w-lg rounded-md border border-border bg-panel p-6 shadow-lg shadow-black/20">
        <div className="mb-5 flex items-center justify-between border-b border-border pb-3">
          <span className="label-caps">New investigation</span>
          <span className="rounded-sm border border-cyan-accent/40 bg-cyan-accent/10 px-2 py-0.5 text-[11px] font-semibold tracking-wider text-cyan-accent">
            CASE {investigationCase.number}
          </span>
        </div>

        <div className="space-y-4">
          <Field
            label="Suspicious wallet"
            icon={Fingerprint}
            value={investigationCase.subjectAddress}
            mono
          />
          <Field
            label="Network"
            icon={Network}
            value={investigationCase.networkInput}
          />
        </div>

        <Button
          size="lg"
          onClick={onStart}
          className="mt-6 h-11 w-full gap-2 text-sm font-semibold tracking-[0.14em]"
        >
          <Search className="size-4" />
          START INVESTIGATION
        </Button>
        <p className="mt-3 text-center text-[11px] text-muted-foreground">
          Proof of concept · simulated analysis · no live blockchain or SAHYOG
          connections
        </p>
      </section>

      <WorkflowStrip />
    </motion.main>
  );
}
