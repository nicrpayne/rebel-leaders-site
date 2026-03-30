/**
 * Mirror Confirmation Pair Library
 *
 * Confirmation pairs are lived-language contrasts that help disambiguate
 * between two plausible pattern families beneath the same Gravitas result.
 *
 * Rules:
 *   - Both options must feel potentially true
 *   - The fear object must differ
 *   - Short enough to feel immediate (3-5 lines each)
 *   - Written in first-person felt language
 *   - Frameworks remain invisible
 */

import type { ConfirmationPair, PatternFamily } from "./types";

// ─── Pair Routing ────────────────────────────────────────────────────
// Maps Gravitas combo → ordered sequence of pairs to try.
// The engine tries the first pair. If confidence is still medium after,
// it branches to the appropriate second pair.

export interface PairSequence {
  first: string; // pair ID
  /** If family_a wins first pair and confidence still medium, show this */
  if_a_wins?: string;
  /** If family_b wins first pair and confidence still medium, show this */
  if_b_wins?: string;
}

export const PAIR_ROUTING: Record<string, PairSequence> = {
  "COMPENSATION ORBIT::CULTURE::VISION": {
    first: "pair_1a",
    if_a_wins: "pair_1b", // Performance Carrier wins → vs Warmth Protector
    if_b_wins: "pair_1c", // Velocity Defender wins → vs Significance Seeker
  },
  "FRICTION BELT::RELATIONSHIP::IDENTITY": {
    first: "pair_2a",
    if_a_wins: "pair_2b", // Silence Stabilizer wins → vs Standard-Bearer
    if_b_wins: "pair_2c", // Bandwidth Conserver wins → vs Significance Seeker
  },
  "FRICTION BELT::VISION::CULTURE": {
    first: "pair_3a",
    if_a_wins: "pair_3b", // Warmth Protector wins → vs Map-Maker
    if_b_wins: "pair_3b_alt", // Standard-Bearer wins → vs Map-Maker
  },
  "COMPENSATION ORBIT::CULTURE::CULTURE": {
  first: "pair_1a",
  if_a_wins: "pair_1b",
  if_b_wins: "pair_1c",
},
};

// ─── All Confirmation Pairs ──────────────────────────────────────────

export const CONFIRMATION_PAIRS: Record<string, ConfirmationPair> = {
  // ── Set 1: Compensation Orbit / Culture leak / Vision force ──

  pair_1a: {
    id: "pair_1a",
    gravitas_combo: "COMPENSATION ORBIT::CULTURE::VISION",
    family_a: "performance_carrier",
    family_b: "velocity_defender",
    option_a: {
      id: "pair_1a_a",
      text: "When pressure rises, I get clearer, sharper, and more energizing. I feel responsible for keeping the future vivid enough that people do not lose heart. Slowing down feels dangerous because too much may start to show.",
      supports_family: "performance_carrier",
      weight: 4,
    },
    option_b: {
      id: "pair_1a_b",
      text: "When pressure rises, I create motion. Options, ideas, next steps, momentum. I do not want the room to get heavy or pinned down. Staying too long with what is wrong feels like letting the energy die.",
      supports_family: "velocity_defender",
      weight: 4,
    },
    distinguishes: "protecting meaningful success through performance vs protecting aliveness through motion",
  },

  pair_1b: {
    id: "pair_1b",
    gravitas_combo: "COMPENSATION ORBIT::CULTURE::VISION",
    family_a: "performance_carrier",
    family_b: "warmth_protector",
    option_a: {
      id: "pair_1b_a",
      text: "I often feel responsible for keeping the mission compelling enough that people can keep going. If the future loses its pull, I worry the whole thing will sag. I would rather sharpen the story than expose how costly the present has become.",
      supports_family: "performance_carrier",
      weight: 4,
    },
    option_b: {
      id: "pair_1b_b",
      text: "I often work hard to keep the environment warm, encouraging, and human so no one quietly disappears inside the mission. I resist anything that might make the room feel colder, even when honesty would probably help.",
      supports_family: "warmth_protector",
      weight: 4,
    },
    distinguishes: "future-pull as compensation vs relational warmth as compensation",
  },

  pair_1c: {
    id: "pair_1c",
    gravitas_combo: "COMPENSATION ORBIT::CULTURE::VISION",
    family_a: "velocity_defender",
    family_b: "significance_seeker",
    option_a: {
      id: "pair_1c_a",
      text: "I trust movement more than I trust stillness. If we keep generating energy, I can believe we are still alive. Being pinned down in the real cost of things feels heavier than I know how to carry.",
      supports_family: "velocity_defender",
      weight: 4,
    },
    option_b: {
      id: "pair_1c_b",
      text: "I need the work to feel vivid, charged, and unmistakably alive. Ordinary language and ordinary effort drain me fast. What I resist is not just slowing down, but becoming forgettable inside something flat.",
      supports_family: "significance_seeker",
      weight: 4,
    },
    distinguishes: "fear of heaviness/stuckness vs fear of flattening/disappearance",
  },

  // ── Set 2: Friction Belt / Relationship leak / Identity force ──

  pair_2a: {
    id: "pair_2a",
    gravitas_combo: "FRICTION BELT::RELATIONSHIP::IDENTITY",
    family_a: "silence_stabilizer",
    family_b: "bandwidth_conserver",
    option_a: {
      id: "pair_2a_a",
      text: "I often know what is true before I say it. The difficulty is not insight. It is the cost of introducing that truth into a system that depends on things staying smooth. Silence can feel kinder than disruption.",
      supports_family: "silence_stabilizer",
      weight: 4,
    },
    option_b: {
      id: "pair_2a_b",
      text: "I do not avoid depth because I do not care. I avoid unstructured contact because it costs more than people realize, and I am not always sure the exchange will justify what it takes from me.",
      supports_family: "bandwidth_conserver",
      weight: 4,
    },
    distinguishes: "protecting external peace vs protecting internal reserves",
  },

  pair_2b: {
    id: "pair_2b",
    gravitas_combo: "FRICTION BELT::RELATIONSHIP::IDENTITY",
    family_a: "silence_stabilizer",
    family_b: "standard_bearer",
    option_a: {
      id: "pair_2b_a",
      text: "I often carry truth privately because speaking it feels like lighting a fuse in a room already under strain. I tell myself I am protecting the whole by not adding more weight.",
      supports_family: "silence_stabilizer",
      weight: 4,
    },
    option_b: {
      id: "pair_2b_b",
      text: "I often hold back because I do not yet know how to say it cleanly enough. If I am going to disrupt the room, I want to be certain I am not introducing more confusion than clarity.",
      supports_family: "standard_bearer",
      weight: 4,
    },
    distinguishes: "avoidance of disruption vs avoidance of inaccuracy/disorder",
  },

  pair_2c: {
    id: "pair_2c",
    gravitas_combo: "FRICTION BELT::RELATIONSHIP::IDENTITY",
    family_a: "bandwidth_conserver",
    family_b: "significance_seeker",
    option_a: {
      id: "pair_2c_a",
      text: "What I protect most is my energy. If too many people reach for me too directly, I start disappearing inward just to stay intact. I need some kind of frame or distance before real contact feels possible.",
      supports_family: "bandwidth_conserver",
      weight: 4,
    },
    option_b: {
      id: "pair_2c_b",
      text: "What I protect most is the part of me that feels difficult to translate. If I speak too quickly or too plainly, I worry the real thing will be flattened into something ordinary.",
      supports_family: "significance_seeker",
      weight: 4,
    },
    distinguishes: "conserving reserves vs preserving irreducible selfhood",
  },

  // ── Set 3: Friction Belt / Vision leak / Culture force ──

  pair_3a: {
    id: "pair_3a",
    gravitas_combo: "FRICTION BELT::VISION::CULTURE",
    family_a: "warmth_protector",
    family_b: "standard_bearer",
    option_a: {
      id: "pair_3a_a",
      text: "I can feel when the room is together even if I cannot fully say where we are going. Losing that sense of togetherness feels more dangerous than moving slowly. I would rather preserve the bond than force a direction no one can carry.",
      supports_family: "warmth_protector",
      weight: 4,
    },
    option_b: {
      id: "pair_3a_b",
      text: "I can feel when the room is well-held, but I still feel restless if the direction is fuzzy. What bothers me is not only slowness, but the sense that no one is willing to name what the standard actually requires.",
      supports_family: "standard_bearer",
      weight: 4,
    },
    distinguishes: "protecting relational cohesion vs protecting directional/moral coherence",
  },

  pair_3b: {
    id: "pair_3b",
    gravitas_combo: "FRICTION BELT::VISION::CULTURE",
    family_a: "warmth_protector",
    family_b: "map_maker",
    option_a: {
      id: "pair_3b_a",
      text: "I do not want anyone left behind by a sharper direction. If the way forward costs us the people I most want to keep with us, it does not feel like the right way forward.",
      supports_family: "warmth_protector",
      weight: 4,
    },
    option_b: {
      id: "pair_3b_b",
      text: "I can tolerate ambiguity longer than most as long as I feel the pattern is becoming clearer. What unsettles me is not lack of speed, but the sense that we are moving without understanding what kind of system we are actually in.",
      supports_family: "map_maker",
      weight: 4,
    },
    distinguishes: "fear of relational exclusion vs fear of conceptual incoherence",
  },

  pair_3b_alt: {
    id: "pair_3b_alt",
    gravitas_combo: "FRICTION BELT::VISION::CULTURE",
    family_a: "standard_bearer",
    family_b: "map_maker",
    option_a: {
      id: "pair_3b_alt_a",
      text: "When the environment starts to drift, I want to restore integrity quickly. It bothers me when people act as though tone can substitute for truth.",
      supports_family: "standard_bearer",
      weight: 4,
    },
    option_b: {
      id: "pair_3b_alt_b",
      text: "When the environment starts to drift, I want to understand the pattern underneath it before I intervene. It bothers me when people rush to correction without understanding the structure they are actually inside.",
      supports_family: "map_maker",
      weight: 4,
    },
    distinguishes: "corrective integrity vs explanatory clarity",
  },
};
