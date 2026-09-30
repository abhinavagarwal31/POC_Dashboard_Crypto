import type { Provider } from "./types";

/** Mock integrations — no API calls are made. */
export const providers: Provider[] = [
  { id: "trm", name: "TRM", kind: "commercial", verdict: "consistent", label: "Exchange X" },
  { id: "chainalysis", name: "Chainalysis", kind: "commercial", verdict: "consistent", label: "Exchange X" },
  { id: "elliptic", name: "Elliptic", kind: "commercial", verdict: "no-label" },
  { id: "oklink", name: "OKLink", kind: "commercial", verdict: "consistent", label: "Exchange X" },
  { id: "indexed", name: "Blockchain indexed data", kind: "indexed", verdict: "n/a" },
];

const commercial = providers.filter((p) => p.kind === "commercial");

export const providerAgreement = {
  agreeing: commercial.filter((p) => p.verdict === "consistent").length, // 3
  total: commercial.length, // 4
};
