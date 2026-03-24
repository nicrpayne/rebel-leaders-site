/**
 * Mirror Type Definitions
 *
 * All internal types for the Mirror scoring, question, and reading systems.
 * Pattern family names are INTERNAL ONLY — never shown to users.
 */

// ─── Pattern Families ────────────────────────────────────────────────
// The 9 internal pattern clusters. These are the operational middle layer
// between raw answers and human-readable readings.

export type PatternFamily =
  | "performance_carrier"
  | "silence_stabilizer"
  | "standard_bearer"
  | "power_holder"
  | "warmth_protector"
  | "bandwidth_conserver"
  | "significance_seeker"
  | "velocity_defender"
  | "map_maker";

export const PATTERN_FAMILIES: PatternFamily[] = [
  "performance_carrier",
  "silence_stabilizer",
  "standard_bearer",
  "power_holder",
  "warmth_protector",
  "bandwidth_conserver",
  "significance_seeker",
  "velocity_defender",
  "map_maker",
];

export const FAMILY_LABELS: Record<PatternFamily, string> = {
  performance_carrier: "Performance Carrier",
  silence_stabilizer: "Silence Stabilizer",
  standard_bearer: "Standard-Bearer",
  power_holder: "Power-Holder",
  warmth_protector: "Warmth Protector",
  bandwidth_conserver: "Bandwidth Conserver",
  significance_seeker: "Significance Seeker",
  velocity_defender: "Velocity Defender",
  map_maker: "Map-Maker",
};

// ─── Confidence ──────────────────────────────────────────────────────

export type ConfidenceBand = "high" | "medium" | "low";

// ─── Codex Framing Flags ─────────────────────────────────────────────

export type CodexFramingFlag =
  | "lead_with_future_truth"
  | "lead_with_safety_for_contact"
  | "lead_with_integrity"
  | "lead_with_energy_protection"
  | "lead_with_relational_cost"
  | "lead_with_curiosity_not_exposure";

// ─── Reading Tone Flags ──────────────────────────────────────────────

export type ReadingToneFlag =
  | "future_language"
  | "precision_language"
  | "warmth_language"
  | "intensity_language"
  | "stillness_language"
  | "motion_language";

// ─── Question Schema ─────────────────────────────────────────────────

export interface MirrorAnswerOption {
  id: string;
  text: string;
  /** Weighted signal contributions to pattern families */
  family_weights: Partial<Record<PatternFamily, number>>;
  /** Optional tone flag — shapes reading language without changing family hypothesis */
  reading_tone_flag?: ReadingToneFlag | null;
  /** Optional Codex framing flag — shapes how the move is presented */
  codex_framing_flag?: CodexFramingFlag | null;
}

export interface MirrorQuestion {
  id: string;
  text: string;
  /** Internal label for what this question probes — never shown to user */
  probe: string;
  options: MirrorAnswerOption[];
}

export interface MirrorAdaptiveQuestion extends MirrorQuestion {
  /** When to trigger this adaptive question */
  trigger: "ambiguous_top_two" | "tone_refinement";
}

// ─── Confirmation Pairs ──────────────────────────────────────────────

export interface ConfirmationPairOption {
  id: string;
  text: string;
  /** Which family this option supports */
  supports_family: PatternFamily;
  /** Score boost if selected */
  weight: number;
}

export interface ConfirmationPair {
  id: string;
  /** Which Gravitas combo this pair belongs to */
  gravitas_combo: string;
  /** The two families being disambiguated */
  family_a: PatternFamily;
  family_b: PatternFamily;
  option_a: ConfirmationPairOption;
  option_b: ConfirmationPairOption;
  /** Internal label for what this pair separates */
  distinguishes: string;
}

// ─── Gravitas Input ──────────────────────────────────────────────────

export interface GravitasPrior {
  archetype: string;
  leak: string;
  force: string;
  identity: number;
  relationship: number;
  vision: number;
  culture: number;
  total: number;
}

// ─── Family Scores ───────────────────────────────────────────────────

export type FamilyScores = Record<PatternFamily, number>;

export function emptyFamilyScores(): FamilyScores {
  return {
    performance_carrier: 0,
    silence_stabilizer: 0,
    standard_bearer: 0,
    power_holder: 0,
    warmth_protector: 0,
    bandwidth_conserver: 0,
    significance_seeker: 0,
    velocity_defender: 0,
    map_maker: 0,
  };
}

// ─── Mirror Internal Result ──────────────────────────────────────────

export interface MirrorResult {
  top_family: PatternFamily;
  secondary_family: PatternFamily | null;
  confidence_band: ConfidenceBand;
  gravitas_combo: string;
  confirmation_pair_used: string | null;
  adaptive_question_used: string | null;
  reading_tone_flags: ReadingToneFlag[];
  codex_framing_flags: CodexFramingFlag[];
  /** Internal key for the resistance pattern */
  resistance_core_key: string;
  /** Internal key for the move logic */
  move_logic_family: string;
  /** Raw family scores for debugging / future use */
  family_scores: FamilyScores;
}

// ─── Reading Content ─────────────────────────────────────────────────

export interface ReadingBlock {
  /** Lookup key: ${gravitas_combo}::${top_family}::${confidence_band} */
  key: string;
  opening_interpretation: string;
  what_may_be_shaping_this: string;
  what_strength_may_cover: string;
  what_this_may_cost_others: string;
  what_kind_of_move: string;
  why_this_is_hard: string;
  /** Optional — only when precise and earned */
  wisdom_thread?: string | null;
}
