/**
 * Mirror — Public API
 *
 * Everything the UI layer needs to run the Mirror flow.
 */

// Types
export type {
  PatternFamily,
  ConfidenceBand,
  CodexFramingFlag,
  ReadingToneFlag,
  FamilyScores,
  GravitasPrior,
  MirrorResult,
  MirrorQuestion,
  MirrorAdaptiveQuestion,
  MirrorAnswerOption,
  ConfirmationPair,
  ConfirmationPairOption,
  ReadingBlock,
} from "./types";

export { PATTERN_FAMILIES, FAMILY_LABELS, emptyFamilyScores } from "./types";

// Questions
export { MIRROR_CORE_QUESTIONS, MIRROR_ADAPTIVE_QUESTIONS } from "./questions";

// Scoring
export {
  scoreMirror,
  buildGravitasComboKey,
  applyGravitasPriors,
  applyAnswerWeights,
  rankFamilies,
  determineConfidence,
  isAmbiguous,
  shouldTriggerConfirmationPair,
} from "./scoring";
export type { ScoringInput } from "./scoring";

// Confirmation Pairs
export { CONFIRMATION_PAIRS, PAIR_ROUTING } from "./confirmation-pairs";
export type { PairSequence } from "./confirmation-pairs";

// Content / Reading Assembly
export { getReadingBlock, hasExactReading } from "./content";
