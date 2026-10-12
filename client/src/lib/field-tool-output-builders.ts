import {
  buildAITrialPackage,
  buildReadinessBrief,
  buildTrialCard,
  buildEvidenceRecord,
  buildDecisionBrief,
} from "./ai-trial";

import {
  LEADERSHIP_OUTPUT_BUILDERS,
  buildDeadlineUpdate,
  buildTradeoffBrief,
  buildMandateRequest,
  buildStakeholderResponse,
} from "./leadership-output";

export const FIELD_OUTPUT_BUILDERS: Record<
  string,
  (v: Record<string, string>) => string
> = {
  "ai-stalemate": buildAITrialPackage,
  "deadline-reset": buildDeadlineUpdate,
  "priority-whiplash": buildTradeoffBrief,
  "mandate-reset": buildMandateRequest,
  "product-project-translator": buildStakeholderResponse,
};
export const TOOL_ARTIFACT_BUILDERS = LEADERSHIP_OUTPUT_BUILDERS;
export const AI_OUTPUT_BUILDERS = {
  "readiness-brief": buildReadinessBrief,
  "trial-card": buildTrialCard,
  "evidence-record": buildEvidenceRecord,
  "decision-brief": buildDecisionBrief,
  "working-record": buildAITrialPackage,
};
