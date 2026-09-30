import { investigationCase } from "./case";
import { providerAgreement } from "./providers";
import { recommendedVasp } from "./vasp";
import type { SahyogRequest } from "./types";

// Every transaction on the attributed paths is a linked transaction.
const linkedTransactionIds = recommendedVasp.highlight.edgeIds.filter((id) =>
  id.startsWith("t"),
);

export const sahyogRequest: SahyogRequest = {
  requestId: "SH-20491-001",
  requestType: "Disclosure Request",
  vaspName: recommendedVasp.name,
  caseId: investigationCase.number,
  subjectAddress: investigationCase.subjectAddress,
  reason: "Cybercrime investigation",
  relevantAddressIds: ["subject", "deposit", "hot"],
  linkedTransactionIds,
  tracePathNodeIds: ["subject", "walletA", "walletB", "deposit", "vaspX"],
  supportingEvidence: [
    "Transaction history",
    "Address classification",
    "VASP attribution evidence",
    `Intelligence provider agreement (${providerAgreement.agreeing} / ${providerAgreement.total})`,
  ],
  finalStatus: "READY FOR SUBMISSION",
};
