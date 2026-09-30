# Blockchain Investigation Workspace — POC

A **frontend-only proof of concept** of a blockchain-intelligence investigation workspace for Law Enforcement Agencies (LEAs).

It answers one question for an investigator:

> *Where did the money go, what entities did it interact with, and which VASP is the most strongly supported candidate?*

Everything on screen is **mock data for one fictional case**. There is no backend, no blockchain or SAHYOG connection, no LLM, no authentication and no database.

## What the POC demonstrates

- Starting from a suspicious wallet and simulating the analysis pipeline.
- A money-flow graph (React Flow) that explains the investigation rather than decorating it: wallet-to-wallet movement, deposit addresses, hot wallets, a mixer, a cross-chain bridge, a Tron leg, an entity cluster and the attributed VASP.
- Address classification with observed behaviour, for every node.
- **Conclusion → evidence → graph**: a VASP recommendation that can be traced back to the exact nodes and transactions that support it.
- Investigator-in-the-loop review: the system recommends, the investigator decides, and a SAHYOG disclosure request is prepared for review.

## Investigation workflow

```
WALLET → TRACE → CLASSIFY → ATTRIBUTE → VERIFY → SAHYOG
```

| Stage | In the UI |
|---|---|
| Wallet | Intake screen (case, subject wallet, auto-detected network) |
| Trace | Simulated pipeline, then the money-flow graph, trace path and timeline |
| Classify | Address intelligence and intelligence sources in the inspector |
| Attribute | VASP attribution panel with confidence and "Why this VASP?" |
| Verify | Findings & evidence, then the investigator review |
| SAHYOG | Disclosure request card, preview and "request prepared" state |

The workflow indicator at the top tracks the current stage. It starts on **VERIFY** and moves to **SAHYOG** once the investigator confirms a VASP.

## Demo case

| | |
|---|---|
| Case | `CASE-20491` (`#20491`) |
| Subject wallet | `0x7A91F2…82FC` (Ethereum) |
| Funds traced | 12.84 ETH across 137 analysed transactions |
| Primary trace | Subject → Wallet A → Wallet B → Exchange X deposit address → Exchange X hot wallet |
| Cross-chain trace | Wallet B → Ethereum/Tron bridge → Tron wallet → Exchange X |
| Additional activity | Wallet B → Mixer (1.41 ETH); Subject → Unknown wallet (0.90 ETH) |
| Candidate VASPs | Exchange X (91%), Exchange Y (46%), Exchange Z (21%) |
| Key evidence | 82% of traced funds reached Exchange X · 3 hops · deposit address swept to a labelled hot wallet in 40 min · 3 of 4 providers agree |

All figures are derived from one set of mock transactions (`src/mock/`), so the graph, timeline, findings, evidence and SAHYOG request always agree.

## Demo script (1–2 minutes)

1. **Intake.** "This is the suspicious wallet. Network is auto-detected." Click **START INVESTIGATION**.
2. **Pipeline.** While it runs: "We identify the chain, pull history, build the money-flow graph, classify addresses, trace across chains and identify candidate VASPs."
3. **Graph.** "This is the money trail. Funds go Subject → Wallet A → Wallet B, then split: to an exchange deposit address, to a mixer, and across a bridge to Tron." Click the bridge to show the cross-chain transfer.
4. **Classification.** Click the deposit address: "The system doesn't just follow addresses — it classifies them. This one behaves like an exchange deposit address (94%)."
5. **Attribution.** Scroll to **VASP attribution**. "Exchange X is the current recommendation at 91%. The others are weak, indirect links." Click **Why this VASP?**
6. **Evidence → graph.** Show the evidence (82% of funds, 3 hops, 40-minute sweep, 3/4 providers) and the confidence breakdown, then click **HIGHLIGHT EVIDENCE ON GRAPH**. "Here is exactly the path that supports the conclusion."
7. **Findings and timeline.** Click finding **F-002**, then a timeline event, to show each conclusion tied to specific transactions.
8. **Decision.** In **Investigator review**: "The system recommends; the investigator decides." Click **CONFIRM VASP**.
9. **SAHYOG.** Click **REVIEW REQUEST**, then **SUBMIT REQUEST**: "The request is prepared — `SH-20491-001`, ready for submission. Nothing is actually sent."

Use **Restart demo** (top right) to replay.

## What is mocked

- The analysis pipeline (timed steps with fixed results).
- All blockchain data: addresses, transactions, hashes, blocks, timestamps.
- Address classification, confidence scores and "observed behaviour".
- VASP candidates, attribution confidence and its breakdown.
- Intelligence providers (TRM, Chainalysis, Elliptic, OKLink, indexed data) — no API calls are made.
- Cross-chain linking (Ethereum → Tron).
- The SAHYOG request, its ID and its status. Submitting only changes frontend state.

## What is not implemented

- Real blockchain indexing or wallet analysis.
- Real VASP identification or a real scoring algorithm.
- Provider integrations and their authentication.
- Any backend, database, user accounts or persistence.
- Real SAHYOG integration or submission.
- Any LLM — attribution is deliberately evidence-based, not model-generated.
- Production security, audit logging and access control.
- Editing the case inputs; the intake form is display-only for the fixed demo case.

## Tech

Next.js · TypeScript · Tailwind CSS · shadcn/ui · React Flow (`@xyflow/react`) · Framer Motion · Lucide.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Layout notes

Designed for a desktop investigation workstation (≥1280 px wide). Below 1024 px the panels stack into a single column, with the graph first. The graph can be panned and zoomed at any size.

## Code map

```
src/mock/                  one coherent fictional case (typed)
src/components/intake/     intake screen and analysis pipeline
src/components/workspace/  shell, header, workflow indicator, summary, trace path, shared state
src/components/graph/      React Flow graph, node types, edges, zones
src/components/inspector/  address intelligence, transaction, cross-chain, sources
src/components/attribution/ candidate VASPs, "Why this VASP?", confidence
src/components/findings/   findings and evidence
src/components/timeline/   transaction timeline
src/components/review/     investigator review and SAHYOG flow
```
