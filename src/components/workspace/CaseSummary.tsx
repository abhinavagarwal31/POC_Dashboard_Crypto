import { investigationCase as c } from "@/mock";
import { shortAddr } from "@/lib/format";
import { Panel } from "./Panel";
import { useWorkspace } from "./WorkspaceContext";

const STATUS = {
  pending: c.status,
  further: "Further investigation",
  rejected: "Attribution rejected",
  confirmed: "VASP confirmed",
} as const;

function Row({
  label,
  children,
  mono,
}: {
  label: string;
  children: React.ReactNode;
  mono?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-border/60 py-1.5 last:border-0">
      <dt className="label-caps shrink-0">{label}</dt>
      <dd className={`text-right text-sm ${mono ? "font-addr" : ""}`}>
        {children}
      </dd>
    </div>
  );
}

export function CaseSummary() {
  const { decision, sahyogStage } = useWorkspace();
  const status =
    sahyogStage === "prepared" ? "SAHYOG request prepared" : STATUS[decision];
  return (
    <Panel title="Case summary">
      <dl>
        <Row label="Status">
          <span className="text-cyan-accent">{status}</span>
        </Row>
        <Row label="Subject wallet" mono>
          {shortAddr(c.subjectAddress)}
        </Row>
        <Row label="Network">{c.network}</Row>
        <Row label="Tx analyzed" mono>
          {c.transactionsAnalyzed}
        </Row>
        <Row label="Funds traced" mono>
          {c.fundsTracedEth.toFixed(2)} ETH
        </Row>
        <Row label="Chains">{c.chains.join(" · ")}</Row>
        <Row label="Candidate VASPs" mono>
          {c.candidateVasps}
        </Row>
      </dl>
    </Panel>
  );
}
