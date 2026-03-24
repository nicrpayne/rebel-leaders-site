/**
 * Mirror Scoring Engine
 *
 * Processes answers through the content-driven schema to produce:
 *   - family score tallies
 *   - top/secondary family hypothesis
 *   - confidence band (high/medium/low)
 *   - collected tone and framing flags
 *   - the full MirrorResult internal object
 *
 * This engine is deterministic — no API calls, no randomness.
 * Sophistication is in the content; the engine just routes.
 */

import type {
  PatternFamily,
  ConfidenceBand,
  FamilyScores,
  GravitasPrior,
  MirrorResult,
  MirrorAnswerOption,
  ReadingToneFlag,
  CodexFramingFlag,
} from "./types";
import { emptyFamilyScores, PATTERN_FAMILIES } from "./types";

// ─── Gravitas Prior Weights ──────────────────────────────────────────
// Maps Gravitas combo → which families get a structural prior boost.
// These shape which families are more plausible before a single
// Mirror question is answered.

interface PriorMapping {
  families: Partial<Record<PatternFamily, number>>;
}

const GRAVITAS_PRIORS: Record<string, PriorMapping> = {
  // Combo 1: Compensation Orbit / Culture leak / Vision force
  "COMPENSATION ORBIT::CULTURE::VISION": {
    families: {
      performance_carrier: 4,
      velocity_defender: 3,
      significance_seeker: 2,
      warmth_protector: 1,
    },
  },
  // Combo 2: Friction Belt / Relationship leak / Identity force
  "FRICTION BELT::RELATIONSHIP::IDENTITY": {
    families: {
      silence_stabilizer: 4,
      bandwidth_conserver: 3,
      standard_bearer: 2,
      significance_seeker: 1,
    },
  },
  // Combo 3: Friction Belt / Vision leak / Culture force
  "FRICTION BELT::VISION::CULTURE": {
    families: {
      warmth_protector: 4,
      standard_bearer: 3,
      map_maker: 2,
    },
  },
};

/**
 * Build the Gravitas combo key from a GravitasPrior.
 * Format: "ARCHETYPE::LEAK_DIMENSION::FORCE_DIMENSION"
 */
export function buildGravitasComboKey(prior: GravitasPrior): string {
  return `${prior.archetype.toUpperCase()}::${prior.leak.toUpperCase()}::${prior.force.toUpperCase()}`;
}

// ─── Score Accumulation ──────────────────────────────────────────────

/**
 * Apply Gravitas priors to a fresh family score set.
 */
export function applyGravitasPriors(
  prior: GravitasPrior,
): FamilyScores {
  const scores = emptyFamilyScores();
  const comboKey = buildGravitasComboKey(prior);
  const mapping = GRAVITAS_PRIORS[comboKey];

  if (mapping) {
    for (const [family, weight] of Object.entries(mapping.families)) {
      scores[family as PatternFamily] += weight;
    }
  }

  return scores;
}

/**
 * Apply a single answer's family weights to the running score.
 * Mutates `scores` in place for efficiency.
 */
export function applyAnswerWeights(
  scores: FamilyScores,
  option: MirrorAnswerOption,
): void {
  for (const [family, weight] of Object.entries(option.family_weights)) {
    if (weight && PATTERN_FAMILIES.includes(family as PatternFamily)) {
      scores[family as PatternFamily] += weight;
    }
  }
}

// ─── Ranking & Confidence ────────────────────────────────────────────

interface RankedFamily {
  family: PatternFamily;
  score: number;
}

/**
 * Rank families by score, descending.
 */
export function rankFamilies(scores: FamilyScores): RankedFamily[] {
  return PATTERN_FAMILIES.map((family) => ({
    family,
    score: scores[family],
  })).sort((a, b) => b.score - a.score);
}

/**
 * Determine confidence band based on the gap between top two families.
 *
 * High:   top leads by 4+ points, no near-tie
 * Medium: top leads by 2-3 points
 * Low:    top two within 0-1 points
 */
export function determineConfidence(ranked: RankedFamily[]): ConfidenceBand {
  if (ranked.length < 2) return "high";
  const gap = ranked[0].score - ranked[1].score;
  if (gap >= 4) return "high";
  if (gap >= 2) return "medium";
  return "low";
}

/**
 * Check if the top two families are ambiguous enough to warrant
 * an adaptive deepener question.
 */
export function isAmbiguous(ranked: RankedFamily[]): boolean {
  if (ranked.length < 2) return false;
  return ranked[0].score - ranked[1].score <= 2;
}

/**
 * Check if a confirmation pair should be triggered.
 * Returns the two families to disambiguate, or null if not needed.
 */
export function shouldTriggerConfirmationPair(
  ranked: RankedFamily[],
): [PatternFamily, PatternFamily] | null {
  if (ranked.length < 2) return null;
  const gap = ranked[0].score - ranked[1].score;
  // Trigger when top two are close (gap <= 3) and both have meaningful signal
  if (gap <= 3 && ranked[1].score >= 3) {
    return [ranked[0].family, ranked[1].family];
  }
  return null;
}

// ─── Resistance & Move Logic Keys ────────────────────────────────────
// These are internal keys used by the reading assembly engine.

const RESISTANCE_KEYS: Record<PatternFamily, string> = {
  performance_carrier: "slowing_down_reveals_cracks",
  silence_stabilizer: "speaking_disrupts_the_field",
  standard_bearer: "imprecision_creates_disorder",
  power_holder: "releasing_grip_invites_collapse",
  warmth_protector: "honesty_costs_belonging",
  bandwidth_conserver: "engagement_depletes_reserves",
  significance_seeker: "ordinariness_erases_self",
  velocity_defender: "stillness_exposes_heaviness",
  map_maker: "acting_without_understanding_is_reckless",
};

const MOVE_LOGIC_KEYS: Record<PatternFamily, string> = {
  performance_carrier: "tell_truth_in_service_of_future",
  silence_stabilizer: "structured_safe_contact",
  standard_bearer: "integrity_through_honest_imperfection",
  power_holder: "strength_through_release",
  warmth_protector: "care_that_includes_honesty",
  bandwidth_conserver: "bounded_sustainable_engagement",
  significance_seeker: "depth_without_performance",
  velocity_defender: "presence_in_the_weight",
  map_maker: "act_before_full_clarity",
};

// ─── Full Scoring Pipeline ───────────────────────────────────────────

export interface ScoringInput {
  gravitasPrior: GravitasPrior;
  /** Map of question_id → selected option */
  answers: Record<string, MirrorAnswerOption>;
}

/**
 * Run the full Mirror scoring pipeline.
 *
 * 1. Apply Gravitas priors
 * 2. Accumulate answer weights
 * 3. Collect tone and framing flags
 * 4. Rank families
 * 5. Determine confidence
 * 6. Build the MirrorResult
 */
export function scoreMirror(input: ScoringInput): MirrorResult {
  // Step 1: Gravitas priors
  const scores = applyGravitasPriors(input.gravitasPrior);

  // Step 2 & 3: Accumulate answer weights + collect flags
  const toneFlags: ReadingToneFlag[] = [];
  const framingFlags: CodexFramingFlag[] = [];

  for (const option of Object.values(input.answers)) {
    applyAnswerWeights(scores, option);

    if (option.reading_tone_flag) {
      toneFlags.push(option.reading_tone_flag);
    }
    if (option.codex_framing_flag) {
      framingFlags.push(option.codex_framing_flag);
    }
  }

  // Step 4: Rank
  const ranked = rankFamilies(scores);

  // Step 5: Confidence
  const confidence = determineConfidence(ranked);

  // Step 6: Build result
  const topFamily = ranked[0].family;
  const secondaryFamily =
    ranked.length >= 2 && ranked[1].score > 0 ? ranked[1].family : null;

  const comboKey = buildGravitasComboKey(input.gravitasPrior);

  return {
    top_family: topFamily,
    secondary_family: secondaryFamily,
    confidence_band: confidence,
    gravitas_combo: comboKey,
    confirmation_pair_used: null, // Set by the flow controller if a pair is shown
    adaptive_question_used: null, // Set by the flow controller if adaptive Q is shown
    reading_tone_flags: Array.from(new Set(toneFlags)),
    codex_framing_flags: Array.from(new Set(framingFlags)),
    resistance_core_key: RESISTANCE_KEYS[topFamily],
    move_logic_family: MOVE_LOGIC_KEYS[topFamily],
    family_scores: { ...scores },
  };
}
