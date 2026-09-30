import { Check, Minus } from "lucide-react";
import { providers } from "@/mock";

/** Mock integrations — the verdict column is the provider's label for the destination. */
export function IntelSources() {
  return (
    <div>
      <div className="label-caps mb-1.5 text-[10px]">Intelligence sources</div>
      <ul className="space-y-1">
        {providers.map((p) => (
          <li key={p.id} className="flex items-center gap-2 text-[13px]">
            {p.verdict === "no-label" ? (
              <Minus className="size-3.5 shrink-0 text-muted-foreground" />
            ) : (
              <Check className="size-3.5 shrink-0 text-ok" />
            )}
            <span className="min-w-0 flex-1 truncate">{p.name}</span>
            <span className="text-[11px] text-muted-foreground">
              {p.verdict === "consistent"
                ? p.label
                : p.verdict === "no-label"
                  ? "no label"
                  : "indexed"}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-1.5 text-[10px] text-muted-foreground/70">
        Mock integrations · no API calls
      </p>
    </div>
  );
}
