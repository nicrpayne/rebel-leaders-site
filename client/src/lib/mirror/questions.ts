/**
 * Mirror Questions — Content-Driven Schema
 *
 * The 7 core questions and 2 adaptive deepeners for Mirror v1.
 * Answer options are PLACEHOLDERS — real content will be delivered as a
 * content update, not a code change. The engine reads from this schema.
 *
 * Each option carries:
 *   - family_weights: { family_key: score } — primary +3, secondary +1
 *   - reading_tone_flag: optional tone signal for reading language
 *   - codex_framing_flag: optional flag for how Codex presents the move
 */

import type {
  MirrorQuestion,
  MirrorAdaptiveQuestion,
} from "./types";

// ─── 7 Core Questions ────────────────────────────────────────────────

export const MIRROR_CORE_QUESTIONS: MirrorQuestion[] = [
  {
    id: "q1",
    text: "When something is off, what do you feel most responsible for fixing?",
    probe: "responsibility_under_strain",
    options: [
      {
        id: "q1_a",
        text: "I make sure the momentum doesn't die — people need to feel like we're still going somewhere worth going.",
        family_weights: { performance_carrier: 3, velocity_defender: 1 },
        reading_tone_flag: "future_language",
        codex_framing_flag: null,
      },
      {
        id: "q1_b",
        text: "I hold the room together so no one quietly checks out while the storm passes.",
        family_weights: { warmth_protector: 3, silence_stabilizer: 1 },
        reading_tone_flag: "warmth_language",
        codex_framing_flag: null,
      },
      {
        id: "q1_c",
        text: "I figure out what's actually broken and name it, even if no one asked me to.",
        family_weights: { standard_bearer: 3, map_maker: 1 },
        reading_tone_flag: "precision_language",
        codex_framing_flag: null,
      },
      {
        id: "q1_d",
        text: "I take the weight so others don't have to carry it — someone has to hold the line.",
        family_weights: { power_holder: 3, bandwidth_conserver: 1 },
        reading_tone_flag: null,
        codex_framing_flag: "lead_with_energy_protection",
      },
    ],
  },
  {
    id: "q2",
    text: "Under real pressure, what do you find yourself doing that you later wish you hadn't?",
    probe: "pressure_behavior_regret",
    options: [
      {
        id: "q2_a",
        text: "I push harder and faster until the people around me can't keep up — then I wonder why I'm alone at the front.",
        family_weights: { performance_carrier: 3, velocity_defender: 1 },
        reading_tone_flag: "motion_language",
        codex_framing_flag: null,
      },
      {
        id: "q2_b",
        text: "I go quiet. I know what's true but I sit on it because the cost of saying it feels too high.",
        family_weights: { silence_stabilizer: 3, bandwidth_conserver: 1 },
        reading_tone_flag: "stillness_language",
        codex_framing_flag: "lead_with_safety_for_contact",
      },
      {
        id: "q2_c",
        text: "I get sharp — my standards come out as edges, and people feel judged before they feel helped.",
        family_weights: { standard_bearer: 3, power_holder: 1 },
        reading_tone_flag: "precision_language",
        codex_framing_flag: "lead_with_integrity",
      },
      {
        id: "q2_d",
        text: "I take over. I stop trusting anyone else to carry it and absorb everything myself.",
        family_weights: { power_holder: 3, performance_carrier: 1 },
        reading_tone_flag: null,
        codex_framing_flag: "lead_with_energy_protection",
      },
      {
        id: "q2_e",
        text: "I generate options, pivots, new energy — anything to keep us from sitting in the heaviness.",
        family_weights: { velocity_defender: 3, significance_seeker: 1 },
        reading_tone_flag: "motion_language",
        codex_framing_flag: null,
      },
    ],
  },
  {
    id: "q3",
    text: "What kind of feedback feels most threatening to you?",
    probe: "threatening_feedback",
    options: [
      {
        id: "q3_a",
        text: "That what I built isn't actually working — that the results don't justify the cost.",
        family_weights: { performance_carrier: 3, significance_seeker: 1 },
        reading_tone_flag: "future_language",
        codex_framing_flag: "lead_with_future_truth",
      },
      {
        id: "q3_b",
        text: "That people don't feel safe around me — that my presence creates distance instead of trust.",
        family_weights: { warmth_protector: 3, silence_stabilizer: 1 },
        reading_tone_flag: "warmth_language",
        codex_framing_flag: "lead_with_relational_cost",
      },
      {
        id: "q3_c",
        text: "That I'm wrong about something I was certain about — that my read of the situation was off.",
        family_weights: { standard_bearer: 3, map_maker: 1 },
        reading_tone_flag: "precision_language",
        codex_framing_flag: "lead_with_integrity",
      },
      {
        id: "q3_d",
        text: "That I'm too much — too intense, too demanding, too hard to be around.",
        family_weights: { significance_seeker: 3, power_holder: 1 },
        reading_tone_flag: "intensity_language",
        codex_framing_flag: "lead_with_curiosity_not_exposure",
      },
      {
        id: "q3_e",
        text: "That I'm not doing enough — that I've been coasting while others carried the real weight.",
        family_weights: { bandwidth_conserver: 3, silence_stabilizer: 1 },
        reading_tone_flag: "stillness_language",
        codex_framing_flag: "lead_with_energy_protection",
      },
    ],
  },
  {
    id: "q4",
    text: "What kind of leader frustrates you most — and what do they cost?",
    probe: "frustrating_leader_projection",
    options: [
      {
        id: "q4_a",
        text: "The one who talks a big game but never delivers. All vision, no follow-through. It costs everyone's belief.",
        family_weights: { performance_carrier: 3, standard_bearer: 1 },
        reading_tone_flag: "future_language",
        codex_framing_flag: null,
      },
      {
        id: "q4_b",
        text: "The one who bulldozes through people to get results. Effective, maybe — but the wreckage is real.",
        family_weights: { warmth_protector: 3, bandwidth_conserver: 1 },
        reading_tone_flag: "warmth_language",
        codex_framing_flag: "lead_with_relational_cost",
      },
      {
        id: "q4_c",
        text: "The one who keeps everything vague so nothing can be measured or held accountable.",
        family_weights: { standard_bearer: 3, map_maker: 1 },
        reading_tone_flag: "precision_language",
        codex_framing_flag: "lead_with_integrity",
      },
      {
        id: "q4_d",
        text: "The one who avoids conflict at all costs — everything stays nice and nothing ever changes.",
        family_weights: { power_holder: 2, velocity_defender: 2 },
        reading_tone_flag: null,
        codex_framing_flag: null,
      },
      {
        id: "q4_e",
        text: "The one who makes everything transactional — no soul, no fire, just process.",
        family_weights: { significance_seeker: 3, warmth_protector: 1 },
        reading_tone_flag: "intensity_language",
        codex_framing_flag: null,
      },
    ],
  },
  {
    id: "q5",
    text: "What do you most resist letting go of when change is needed?",
    probe: "resistance_attachment",
    options: [
      {
        id: "q5_a",
        text: "The plan I already committed to — changing direction feels like admitting I was wrong.",
        family_weights: { performance_carrier: 2, standard_bearer: 2 },
        reading_tone_flag: "precision_language",
        codex_framing_flag: null,
      },
      {
        id: "q5_b",
        text: "The people. I'd rather slow the whole thing down than leave someone behind who trusted me.",
        family_weights: { warmth_protector: 3, silence_stabilizer: 1 },
        reading_tone_flag: "warmth_language",
        codex_framing_flag: "lead_with_relational_cost",
      },
      {
        id: "q5_c",
        text: "Control. If I can't shape how it unfolds, I don't trust it to land right.",
        family_weights: { power_holder: 3, map_maker: 1 },
        reading_tone_flag: null,
        codex_framing_flag: "lead_with_energy_protection",
      },
      {
        id: "q5_d",
        text: "My energy. I've already given so much — starting over feels like it might break something in me.",
        family_weights: { bandwidth_conserver: 3, silence_stabilizer: 1 },
        reading_tone_flag: "stillness_language",
        codex_framing_flag: "lead_with_energy_protection",
      },
      {
        id: "q5_e",
        text: "The intensity. If the new version is quieter, calmer, more ordinary — I'm not sure I want it.",
        family_weights: { significance_seeker: 3, velocity_defender: 1 },
        reading_tone_flag: "intensity_language",
        codex_framing_flag: null,
      },
    ],
  },
  {
    id: "q6",
    text: "When the environment felt genuinely alive, what made that true?",
    probe: "alive_environment",
    options: [
      {
        id: "q6_a",
        text: "We were building something that mattered and everyone could feel the pull of where we were headed.",
        family_weights: { performance_carrier: 3, velocity_defender: 1 },
        reading_tone_flag: "future_language",
        codex_framing_flag: "lead_with_future_truth",
      },
      {
        id: "q6_b",
        text: "People actually knew each other. Not just roles — the real stuff underneath.",
        family_weights: { warmth_protector: 3, silence_stabilizer: 1 },
        reading_tone_flag: "warmth_language",
        codex_framing_flag: null,
      },
      {
        id: "q6_c",
        text: "The standard was high and everyone held it without being told to. Excellence was the culture, not the policy.",
        family_weights: { standard_bearer: 3, performance_carrier: 1 },
        reading_tone_flag: "precision_language",
        codex_framing_flag: null,
      },
      {
        id: "q6_d",
        text: "There was real creative tension — ideas colliding, energy moving, nothing stale.",
        family_weights: { velocity_defender: 2, significance_seeker: 2 },
        reading_tone_flag: "motion_language",
        codex_framing_flag: null,
      },
      {
        id: "q6_e",
        text: "Everyone understood the system we were inside — the patterns, the stakes, the real game being played.",
        family_weights: { map_maker: 3, standard_bearer: 1 },
        reading_tone_flag: "precision_language",
        codex_framing_flag: null,
      },
    ],
  },
  {
    id: "q7",
    text: "What feels most dangerous about telling the deepest truth about what's really happening?",
    probe: "danger_of_truth",
    options: [
      {
        id: "q7_a",
        text: "That it would stop the momentum. The truth might be heavy enough to pin everyone down.",
        family_weights: { velocity_defender: 3, performance_carrier: 1 },
        reading_tone_flag: "motion_language",
        codex_framing_flag: "lead_with_future_truth",
      },
      {
        id: "q7_b",
        text: "That it would hurt someone I care about — and the relationship might not survive it.",
        family_weights: { warmth_protector: 2, silence_stabilizer: 2 },
        reading_tone_flag: "warmth_language",
        codex_framing_flag: "lead_with_safety_for_contact",
      },
      {
        id: "q7_c",
        text: "That I'd be exposed as not having it together — and the authority I carry would collapse.",
        family_weights: { power_holder: 3, performance_carrier: 1 },
        reading_tone_flag: null,
        codex_framing_flag: "lead_with_curiosity_not_exposure",
      },
      {
        id: "q7_d",
        text: "That no one would actually hear it — that the truth would land and nothing would change.",
        family_weights: { significance_seeker: 3, bandwidth_conserver: 1 },
        reading_tone_flag: "intensity_language",
        codex_framing_flag: "lead_with_curiosity_not_exposure",
      },
      {
        id: "q7_e",
        text: "That I'd say it wrong — imprecisely, unfairly — and create more damage than clarity.",
        family_weights: { standard_bearer: 3, map_maker: 1 },
        reading_tone_flag: "precision_language",
        codex_framing_flag: "lead_with_integrity",
      },
    ],
  },
];

// ─── 2 Adaptive Deepeners ────────────────────────────────────────────
// These only appear when the signal is ambiguous after the core 7.

export const MIRROR_ADAPTIVE_QUESTIONS: MirrorAdaptiveQuestion[] = [
  {
    id: "a1",
    text: "What quality would make your team or organization one you feel most proud of?",
    probe: "ideal_quality",
    trigger: "ambiguous_top_two",
    options: [
      {
        id: "a1_a",
        text: "Relentless execution — we say what we'll do and we do it, every time.",
        family_weights: { performance_carrier: 3 },
        reading_tone_flag: "future_language",
        codex_framing_flag: null,
      },
      {
        id: "a1_b",
        text: "Deep trust — people bring the real stuff, not the polished version.",
        family_weights: { warmth_protector: 2, silence_stabilizer: 2 },
        reading_tone_flag: "warmth_language",
        codex_framing_flag: null,
      },
      {
        id: "a1_c",
        text: "Uncompromising integrity — the standard is the standard, no matter the cost.",
        family_weights: { standard_bearer: 3 },
        reading_tone_flag: "precision_language",
        codex_framing_flag: null,
      },
      {
        id: "a1_d",
        text: "Creative fire — the kind of place where ideas are alive and nothing feels routine.",
        family_weights: { significance_seeker: 2, velocity_defender: 2 },
        reading_tone_flag: "intensity_language",
        codex_framing_flag: null,
      },
    ],
  },
  {
    id: "a2",
    text: "What does success feel like at its deepest level?",
    probe: "deep_success_definition",
    trigger: "tone_refinement",
    options: [
      {
        id: "a2_a",
        text: "Like I built something that outlasts me — a legacy that keeps working after I leave the room.",
        family_weights: { performance_carrier: 2, significance_seeker: 2 },
        reading_tone_flag: "future_language",
        codex_framing_flag: null,
      },
      {
        id: "a2_b",
        text: "Like the people around me are thriving — not performing, actually thriving.",
        family_weights: { warmth_protector: 3 },
        reading_tone_flag: "warmth_language",
        codex_framing_flag: null,
      },
      {
        id: "a2_c",
        text: "Like I can finally rest — not because I quit, but because the system holds without me gripping it.",
        family_weights: { bandwidth_conserver: 3, power_holder: 1 },
        reading_tone_flag: "stillness_language",
        codex_framing_flag: "lead_with_energy_protection",
      },
      {
        id: "a2_d",
        text: "Like the truth is finally on the table and we're all standing in it together.",
        family_weights: { standard_bearer: 2, silence_stabilizer: 2 },
        reading_tone_flag: "precision_language",
        codex_framing_flag: "lead_with_safety_for_contact",
      },
    ],
  },
];
