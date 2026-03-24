/**
 * Mirror Content Router — Reading Assembly Engine
 *
 * This is a CONTENT ROUTER, not a generative system.
 * It looks at: top_family + gravitas_combo + confidence_band
 * and retrieves the right pre-written reading block.
 *
 * v1 scope: 3 Gravitas combos × most likely families = starter set.
 * Content blocks are PLACEHOLDERS — real content will be delivered
 * as a content update, not a code change.
 *
 * Key format: "${gravitas_combo}::${top_family}::${confidence_band}"
 *
 * When a precise key isn't found, the router falls back:
 *   1. Try exact key
 *   2. Try with "medium" confidence (broader language)
 *   3. Try combo + family without confidence
 *   4. Return generic fallback
 */

import type { ReadingBlock, MirrorResult } from "./types";

// ─── Reading Content Map ─────────────────────────────────────────────

const READING_BLOCKS: Map<string, ReadingBlock> = new Map();

/**
 * Register a reading block in the content map.
 */
function register(block: ReadingBlock): void {
  READING_BLOCKS.set(block.key, block);
}

// ─── Combo 1: Compensation Orbit / Culture leak / Vision force ──────

register({
  key: "COMPENSATION ORBIT::CULTURE::VISION::performance_carrier::high",
  opening_interpretation:
    "[PLACEHOLDER — Performance Carrier reading for Compensation Orbit / Culture leak / Vision force at high confidence. This will be replaced with pre-written interpretive prose that speaks to the felt experience of someone who compensates for a culture leak by carrying the mission forward through performance and future-vision.]",
  what_may_be_shaping_this:
    "[PLACEHOLDER — What may be shaping this pattern. Connects the Gravitas signal to the Mirror family in felt language.]",
  what_strength_may_cover:
    "[PLACEHOLDER — What the force (Vision) may be covering for. The double-duty the strength is doing.]",
  what_this_may_cost_others:
    "[PLACEHOLDER — What this pattern may be costing the people around the leader.]",
  what_kind_of_move:
    "[PLACEHOLDER — What kind of move this person likely needs. Not a prescription — an invitation.]",
  why_this_is_hard:
    "[PLACEHOLDER — Why this particular move is hard for this particular pattern. Names the resistance without shaming it.]",
  wisdom_thread: null,
});

register({
  key: "COMPENSATION ORBIT::CULTURE::VISION::performance_carrier::medium",
  opening_interpretation:
    "[PLACEHOLDER — Performance Carrier reading at medium confidence. Slightly broader, includes modest hedging.]",
  what_may_be_shaping_this:
    "[PLACEHOLDER — Shaping factors at medium confidence.]",
  what_strength_may_cover:
    "[PLACEHOLDER — What strength may cover, medium confidence.]",
  what_this_may_cost_others:
    "[PLACEHOLDER — Cost to others, medium confidence.]",
  what_kind_of_move:
    "[PLACEHOLDER — Move invitation, medium confidence.]",
  why_this_is_hard:
    "[PLACEHOLDER — Why this is hard, medium confidence.]",
  wisdom_thread: null,
});

register({
  key: "COMPENSATION ORBIT::CULTURE::VISION::velocity_defender::high",
  opening_interpretation:
    "[PLACEHOLDER — Velocity Defender reading for Compensation Orbit / Culture leak / Vision force at high confidence.]",
  what_may_be_shaping_this:
    "[PLACEHOLDER — Shaping factors for Velocity Defender.]",
  what_strength_may_cover:
    "[PLACEHOLDER — What Vision force covers when the pattern is motion-generation.]",
  what_this_may_cost_others:
    "[PLACEHOLDER — Cost to others when the leader creates constant motion to avoid heaviness.]",
  what_kind_of_move:
    "[PLACEHOLDER — Move invitation for Velocity Defender.]",
  why_this_is_hard:
    "[PLACEHOLDER — Why stillness is hard for this pattern.]",
  wisdom_thread: null,
});

register({
  key: "COMPENSATION ORBIT::CULTURE::VISION::velocity_defender::medium",
  opening_interpretation:
    "[PLACEHOLDER — Velocity Defender at medium confidence.]",
  what_may_be_shaping_this:
    "[PLACEHOLDER]",
  what_strength_may_cover:
    "[PLACEHOLDER]",
  what_this_may_cost_others:
    "[PLACEHOLDER]",
  what_kind_of_move:
    "[PLACEHOLDER]",
  why_this_is_hard:
    "[PLACEHOLDER]",
  wisdom_thread: null,
});

register({
  key: "COMPENSATION ORBIT::CULTURE::VISION::significance_seeker::high",
  opening_interpretation:
    "[PLACEHOLDER — Significance Seeker reading for Compensation Orbit / Culture leak / Vision force.]",
  what_may_be_shaping_this:
    "[PLACEHOLDER]",
  what_strength_may_cover:
    "[PLACEHOLDER]",
  what_this_may_cost_others:
    "[PLACEHOLDER]",
  what_kind_of_move:
    "[PLACEHOLDER]",
  why_this_is_hard:
    "[PLACEHOLDER]",
  wisdom_thread: null,
});

register({
  key: "COMPENSATION ORBIT::CULTURE::VISION::warmth_protector::high",
  opening_interpretation:
    "[PLACEHOLDER — Warmth Protector reading for Compensation Orbit / Culture leak / Vision force.]",
  what_may_be_shaping_this:
    "[PLACEHOLDER]",
  what_strength_may_cover:
    "[PLACEHOLDER]",
  what_this_may_cost_others:
    "[PLACEHOLDER]",
  what_kind_of_move:
    "[PLACEHOLDER]",
  why_this_is_hard:
    "[PLACEHOLDER]",
  wisdom_thread: null,
});

// ─── Combo 2: Friction Belt / Relationship leak / Identity force ────

register({
  key: "FRICTION BELT::RELATIONSHIP::IDENTITY::silence_stabilizer::high",
  opening_interpretation:
    "[PLACEHOLDER — Silence Stabilizer reading for Friction Belt / Relationship leak / Identity force at high confidence.]",
  what_may_be_shaping_this:
    "[PLACEHOLDER]",
  what_strength_may_cover:
    "[PLACEHOLDER — What Identity force covers when the pattern is silence-as-protection.]",
  what_this_may_cost_others:
    "[PLACEHOLDER]",
  what_kind_of_move:
    "[PLACEHOLDER]",
  why_this_is_hard:
    "[PLACEHOLDER]",
  wisdom_thread: null,
});

register({
  key: "FRICTION BELT::RELATIONSHIP::IDENTITY::silence_stabilizer::medium",
  opening_interpretation:
    "[PLACEHOLDER — Silence Stabilizer at medium confidence.]",
  what_may_be_shaping_this:
    "[PLACEHOLDER]",
  what_strength_may_cover:
    "[PLACEHOLDER]",
  what_this_may_cost_others:
    "[PLACEHOLDER]",
  what_kind_of_move:
    "[PLACEHOLDER]",
  why_this_is_hard:
    "[PLACEHOLDER]",
  wisdom_thread: null,
});

register({
  key: "FRICTION BELT::RELATIONSHIP::IDENTITY::bandwidth_conserver::high",
  opening_interpretation:
    "[PLACEHOLDER — Bandwidth Conserver reading for Friction Belt / Relationship leak / Identity force.]",
  what_may_be_shaping_this:
    "[PLACEHOLDER]",
  what_strength_may_cover:
    "[PLACEHOLDER]",
  what_this_may_cost_others:
    "[PLACEHOLDER]",
  what_kind_of_move:
    "[PLACEHOLDER]",
  why_this_is_hard:
    "[PLACEHOLDER]",
  wisdom_thread: null,
});

register({
  key: "FRICTION BELT::RELATIONSHIP::IDENTITY::bandwidth_conserver::medium",
  opening_interpretation:
    "[PLACEHOLDER — Bandwidth Conserver at medium confidence.]",
  what_may_be_shaping_this:
    "[PLACEHOLDER]",
  what_strength_may_cover:
    "[PLACEHOLDER]",
  what_this_may_cost_others:
    "[PLACEHOLDER]",
  what_kind_of_move:
    "[PLACEHOLDER]",
  why_this_is_hard:
    "[PLACEHOLDER]",
  wisdom_thread: null,
});

register({
  key: "FRICTION BELT::RELATIONSHIP::IDENTITY::standard_bearer::high",
  opening_interpretation:
    "[PLACEHOLDER — Standard-Bearer reading for Friction Belt / Relationship leak / Identity force.]",
  what_may_be_shaping_this:
    "[PLACEHOLDER]",
  what_strength_may_cover:
    "[PLACEHOLDER]",
  what_this_may_cost_others:
    "[PLACEHOLDER]",
  what_kind_of_move:
    "[PLACEHOLDER]",
  why_this_is_hard:
    "[PLACEHOLDER]",
  wisdom_thread: null,
});

register({
  key: "FRICTION BELT::RELATIONSHIP::IDENTITY::significance_seeker::high",
  opening_interpretation:
    "[PLACEHOLDER — Significance Seeker reading for Friction Belt / Relationship leak / Identity force.]",
  what_may_be_shaping_this:
    "[PLACEHOLDER]",
  what_strength_may_cover:
    "[PLACEHOLDER]",
  what_this_may_cost_others:
    "[PLACEHOLDER]",
  what_kind_of_move:
    "[PLACEHOLDER]",
  why_this_is_hard:
    "[PLACEHOLDER]",
  wisdom_thread: null,
});

// ─── Combo 3: Friction Belt / Vision leak / Culture force ───────────

register({
  key: "FRICTION BELT::VISION::CULTURE::warmth_protector::high",
  opening_interpretation:
    "[PLACEHOLDER — Warmth Protector reading for Friction Belt / Vision leak / Culture force at high confidence.]",
  what_may_be_shaping_this:
    "[PLACEHOLDER]",
  what_strength_may_cover:
    "[PLACEHOLDER — What Culture force covers when the pattern is warmth-protection.]",
  what_this_may_cost_others:
    "[PLACEHOLDER]",
  what_kind_of_move:
    "[PLACEHOLDER]",
  why_this_is_hard:
    "[PLACEHOLDER]",
  wisdom_thread: null,
});

register({
  key: "FRICTION BELT::VISION::CULTURE::warmth_protector::medium",
  opening_interpretation:
    "[PLACEHOLDER — Warmth Protector at medium confidence.]",
  what_may_be_shaping_this:
    "[PLACEHOLDER]",
  what_strength_may_cover:
    "[PLACEHOLDER]",
  what_this_may_cost_others:
    "[PLACEHOLDER]",
  what_kind_of_move:
    "[PLACEHOLDER]",
  why_this_is_hard:
    "[PLACEHOLDER]",
  wisdom_thread: null,
});

register({
  key: "FRICTION BELT::VISION::CULTURE::standard_bearer::high",
  opening_interpretation:
    "[PLACEHOLDER — Standard-Bearer reading for Friction Belt / Vision leak / Culture force.]",
  what_may_be_shaping_this:
    "[PLACEHOLDER]",
  what_strength_may_cover:
    "[PLACEHOLDER]",
  what_this_may_cost_others:
    "[PLACEHOLDER]",
  what_kind_of_move:
    "[PLACEHOLDER]",
  why_this_is_hard:
    "[PLACEHOLDER]",
  wisdom_thread: null,
});

register({
  key: "FRICTION BELT::VISION::CULTURE::standard_bearer::medium",
  opening_interpretation:
    "[PLACEHOLDER — Standard-Bearer at medium confidence.]",
  what_may_be_shaping_this:
    "[PLACEHOLDER]",
  what_strength_may_cover:
    "[PLACEHOLDER]",
  what_this_may_cost_others:
    "[PLACEHOLDER]",
  what_kind_of_move:
    "[PLACEHOLDER]",
  why_this_is_hard:
    "[PLACEHOLDER]",
  wisdom_thread: null,
});

register({
  key: "FRICTION BELT::VISION::CULTURE::map_maker::high",
  opening_interpretation:
    "[PLACEHOLDER — Map-Maker reading for Friction Belt / Vision leak / Culture force.]",
  what_may_be_shaping_this:
    "[PLACEHOLDER]",
  what_strength_may_cover:
    "[PLACEHOLDER]",
  what_this_may_cost_others:
    "[PLACEHOLDER]",
  what_kind_of_move:
    "[PLACEHOLDER]",
  why_this_is_hard:
    "[PLACEHOLDER]",
  wisdom_thread: null,
});

register({
  key: "FRICTION BELT::VISION::CULTURE::map_maker::medium",
  opening_interpretation:
    "[PLACEHOLDER — Map-Maker at medium confidence.]",
  what_may_be_shaping_this:
    "[PLACEHOLDER]",
  what_strength_may_cover:
    "[PLACEHOLDER]",
  what_this_may_cost_others:
    "[PLACEHOLDER]",
  what_kind_of_move:
    "[PLACEHOLDER]",
  why_this_is_hard:
    "[PLACEHOLDER]",
  wisdom_thread: null,
});

// ─── Generic Low-Confidence Fallback ─────────────────────────────────

const GENERIC_LOW_CONFIDENCE: ReadingBlock = {
  key: "GENERIC::low",
  opening_interpretation:
    "[PLACEHOLDER — Generic low-confidence reading. Used when the signal is blended and no precise family emerged. Language stays broader, more invitational, less specific. Acknowledges that the person may alternate between strategies depending on context.]",
  what_may_be_shaping_this:
    "[PLACEHOLDER — Broad shaping factors for blended signal.]",
  what_strength_may_cover:
    "[PLACEHOLDER — What the dominant Gravitas force may be covering in general terms.]",
  what_this_may_cost_others:
    "[PLACEHOLDER — General cost language for blended patterns.]",
  what_kind_of_move:
    "[PLACEHOLDER — Broader move invitation that doesn't assume a single family.]",
  why_this_is_hard:
    "[PLACEHOLDER — Why change is hard when the pattern is diffuse.]",
  wisdom_thread: null,
};

// ─── Content Router ──────────────────────────────────────────────────

/**
 * Retrieve the reading block for a given Mirror result.
 *
 * Fallback chain:
 *   1. Exact key: combo::family::confidence
 *   2. Broader: combo::family::medium
 *   3. Any confidence: combo::family::high
 *   4. Generic low-confidence fallback
 */
export function getReadingBlock(result: MirrorResult): ReadingBlock {
  const { gravitas_combo, top_family, confidence_band } = result;

  // 1. Exact match
  const exactKey = `${gravitas_combo}::${top_family}::${confidence_band}`;
  const exact = READING_BLOCKS.get(exactKey);
  if (exact) return exact;

  // 2. Try medium confidence
  if (confidence_band !== "medium") {
    const mediumKey = `${gravitas_combo}::${top_family}::medium`;
    const medium = READING_BLOCKS.get(mediumKey);
    if (medium) return medium;
  }

  // 3. Try high confidence
  if (confidence_band !== "high") {
    const highKey = `${gravitas_combo}::${top_family}::high`;
    const high = READING_BLOCKS.get(highKey);
    if (high) return high;
  }

  // 4. Generic fallback
  return GENERIC_LOW_CONFIDENCE;
}

/**
 * Check if a precise reading block exists for the given result.
 * Useful for UI — can show a "your reading is available" indicator.
 */
export function hasExactReading(result: MirrorResult): boolean {
  const key = `${result.gravitas_combo}::${result.top_family}::${result.confidence_band}`;
  return READING_BLOCKS.has(key);
}
