import type { VaspCandidate } from "@/mock";

/** Confidence shown as the evidence behind it, not as a bare number. */
export function ConfidenceBreakdown({ candidate }: { candidate: VaspCandidate }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="label-caps text-[10px]">Attribution confidence</span>
        <span className="font-addr text-2xl text-foreground">
          {candidate.confidence}%
        </span>
      </div>
      <div className="label-caps mt-3 mb-2 text-[10px]">Supported by</div>
      <ul className="space-y-2.5">
        {candidate.breakdown.map((f) => (
          <li key={f.key}>
            <div className="mb-1 flex items-center justify-between text-[13px]">
              <span>{f.label}</span>
              <span className="font-addr text-xs text-muted-foreground">
                {f.score}
              </span>
            </div>
            <div
              className="h-1.5 overflow-hidden rounded-full bg-muted"
              role="meter"
              aria-label={f.label}
              aria-valuenow={f.score}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-full bg-cyan-accent"
                style={{ width: `${f.score}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[11px] leading-snug text-muted-foreground">
        Assessed from independent on-chain and provider signals. No language
        model is involved in attribution.
      </p>
    </div>
  );
}
