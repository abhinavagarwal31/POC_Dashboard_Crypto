"use client";

import { useState } from "react";
import { vaspCandidates } from "@/mock";
import { Panel } from "@/components/workspace/Panel";
import { CandidateList } from "./CandidateList";
import { VASP_PANEL_ID, WhyVasp } from "./WhyVasp";

export function VaspAttribution() {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = vaspCandidates.find((c) => c.id === openId);

  return (
    <Panel id={VASP_PANEL_ID} title="VASP attribution" className="lg:h-full">
      {open ? (
        <WhyVasp candidate={open} onBack={() => setOpenId(null)} />
      ) : (
        <CandidateList candidates={vaspCandidates} onOpen={setOpenId} />
      )}
    </Panel>
  );
}
