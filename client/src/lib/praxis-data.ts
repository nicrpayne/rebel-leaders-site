// Praxis: return loop and trajectory layer data.
// Delta field notes interpret what changed between scans.
// First-move context, rep schedules, and cartridge mappings drive the active season.

// ─────────────────────────────────────────────────
// Delta Field Notes (indexed 0–18)
// Lookup via getDeltaNoteIndex — do not access by condition name.
// ─────────────────────────────────────────────────

export const DELTA_FIELD_NOTES: string[] = [
  // 0
  "The field found direction, but not everyone is traveling with it yet. This often happens when clarity is gained faster than trust is repaired — when a sharper aim exposes strain that vaguer seasons were hiding. The next season is probably repair, not more direction.",
  // 1
  "The field found direction, but not everyone is traveling with it yet. This often happens when clarity is gained faster than trust is repaired — when a sharper aim exposes strain that vaguer seasons were hiding. The next season is probably repair, not more direction.",
  // 2
  "Something in the field is becoming more humanly livable. Trust, candor, or repair may be returning, even if the deeper self-understanding of the system has not yet shifted much. Sometimes the soil softens before the roots change shape.",
  // 3
  "Something has settled. The field is reading a clearer inner compass — less performance, more presence. When Identity strengthens, the other dimensions often gain mass because the system is less divided against itself.",
  // 4
  "The gravity problem is still a gravity problem. Whatever is being practiced in this field hasn't yet altered the shared atmosphere enough to change how people move inside it. Culture is downstream of Identity, Relationship, and Vision. Look upstream.",
  // 5
  "The field is gaining mass across all four conditions — slowly, evenly, without drama. This is what formation looks like from the inside. It rarely feels like progress when it's happening. Trust the pattern.",
  // 6
  "The strongest current in your field is no longer where it was. That usually means the system is reorganizing — either maturing into a new center of strength or compensating for pressure elsewhere. A force shift is worth watching closely.",
  // 7
  "Direction is clearer but you've lost some ground in yourself. The field may be gaining aim while losing contact with its center. This sometimes appears when the vision becomes louder than the person holding it. The next season probably needs to tend the roots, not the direction.",
  // 8
  "The field is being held together by one thing: a clear sense of self. That's a real force, but it's not a system. Identity cannot generate lasting gravity alone — it needs Relationship to deepen and Vision to give it direction.",
  // 9
  "Direction and the field expression are moving together. When Vision and Culture rise together, the work often starts to feel less forced. Watch whether Relationship is keeping pace — these two can reinforce each other while the relational layer quietly strains.",
  // 10
  "The field looks much as it did before. That doesn't always mean nothing happened — formation often runs ahead of what's measurable. But ask honestly: what's actually different about how you showed up?",
  // 11
  "The field read as weaker this time. Before interpreting this as failure, ask what changed in the season. It can also mean the second reading is simply more honest than the first. Either way, the map is asking for seriousness, not shame.",
  // 12
  "One breach stopped dictating the field and another has become visible. This is the system getting more honest, not more broken. Development doesn't produce a leak-free field — it produces a field that keeps revealing what needs tending.",
  // 13
  "A single part of the field moved with force while the rest remained where it was. That can mark a real breakthrough or signal overdevelopment in one area without enough integration elsewhere. Watch what the jump cost.",
  // 14
  "The room may feel better than it used to but the deeper question of where the field is going remains unsettled. Better gravity helps, but it cannot substitute for aim.",
  // 15
  "The inner life of the field and the quality of contact within it are strengthening together. When Identity and Relationship rise together, Vision tends to follow — not because you chase it but because it emerges from the depth of the connection.",
  // 16
  "The field is asking for different work now. A changed first move is not inconsistency — it's the instrument reading a different condition, which is exactly what it's supposed to do.",
  // 17
  "The field moved. The gravity is stronger than it was. A band shift upward usually means the system has crossed a threshold where its strengths are doing more governing than its leaks. It means a different level of responsibility now fits the reading.",
  // 18
  "The field is under more strain than it was — or it's reading with less borrowed coherence than before. A downward shift can mark accumulated fatigue, deferred repair, or simply a truer reading after a more flattering first pass. The map is less impressed now, and probably more useful.",
];

// Archetype ordinals for delta direction comparison
const ARCHETYPE_ORDINAL: Record<string, number> = {
  "DEAD ORBIT":          0,
  "FRICTION BELT":       1,
  "COMPENSATION ORBIT":  2,
  "EMERGING GRAVITY":    3,
  "FULL ORBIT":          4,
};

export interface DeltaInput {
  identityDelta: number;
  relationshipDelta: number;
  visionDelta: number;
  cultureDelta: number;
  archetypeShift: boolean;
  leakShift: boolean;
  previousArchetype: string;
  currentArchetype: string;
}

export function getDeltaNoteIndex(delta: DeltaInput): number {
  const { identityDelta, relationshipDelta, visionDelta, cultureDelta,
          archetypeShift, leakShift, previousArchetype, currentArchetype } = delta;

  const total = identityDelta + relationshipDelta + visionDelta + cultureDelta;
  const allFlat = [identityDelta, relationshipDelta, visionDelta, cultureDelta]
    .every(d => Math.abs(d) < 0.1);

  const prevOrd = ARCHETYPE_ORDINAL[previousArchetype] ?? 2;
  const currOrd = ARCHETYPE_ORDINAL[currentArchetype] ?? 2;

  if (archetypeShift && currOrd > prevOrd) return 17;
  if (archetypeShift && currOrd < prevOrd) return 18;
  if (leakShift && total > 0) return 12;
  if (visionDelta > 0.3 && relationshipDelta < -0.3) return 0;
  if (identityDelta > 0 && relationshipDelta > 0) return 15;
  if (identityDelta < -0.2 && visionDelta > 0.2) return 7;
  if (allFlat) return 10;
  if (total < -0.3) return 11;
  if (visionDelta > 0.3 && cultureDelta > 0.3) return 9;
  if (cultureDelta > 0.3 && visionDelta < -0.1) return 14;
  if (total > 0) return 5;
  return 5;
}

// ─────────────────────────────────────────────────
// First Move: Season Context
// ─────────────────────────────────────────────────

export interface FirstMoveContext {
  firstMove: string;
  seasonSummary: string;
  intent: string;
}

export const FIRST_MOVE_CONTEXT: FirstMoveContext[] = [
  {
    firstMove: "THE OXYGEN PROTOCOL",
    seasonSummary: "Stabilize before building.",
    intent: "This season is about lowering the demand on the field so people can come back online. Nothing else can happen until the system can breathe. Don't accelerate — reduce.",
  },
  {
    firstMove: "THE ALIGNMENT RITUAL",
    seasonSummary: "Name the competing realities.",
    intent: "This season is about making the real conversation visible before trying to resolve it. The cost of false consensus is always higher than the cost of an honest reckoning.",
  },
  {
    firstMove: "THE WEIGHT REDISTRIBUTION",
    seasonSummary: "Name what is being carried.",
    intent: "This season is about honest load assessment. What is being carried — and by whom — needs to be named before it can be shifted. Heroics are not a strategy.",
  },
  {
    firstMove: "THE HORIZON CAST",
    seasonSummary: "Anchor a direction worth running toward.",
    intent: "This season is about making direction real. Not as strategy — as meaning. A horizon that doesn't pull people through the dark isn't a horizon. It's a placeholder.",
  },
  {
    firstMove: "THE LEGACY CODEX",
    seasonSummary: "Name what made this possible.",
    intent: "This season is about codifying the conditions beneath the results. Before you can protect what you've built, you have to know what actually built it.",
  },
];

// ─────────────────────────────────────────────────
// Rep Sequences: keyed by cartridge ID
// Each entry: day1 / day7 / day14 prompts + rootNote + primaryKey
// Covers all 27 cartridges. Populate from Deliverable 1.
// ─────────────────────────────────────────────────

export interface PraxisRep {
  day1: string;
  day7: string;
  day14: string;
  rootNote: string;
  primaryKey: string;
}

export const PRAXIS_REPS: Record<string, PraxisRep> = {
  MOVE_TRUTH_WEATHER: {
    day1: "At the start of one real meeting this week, name your actual weather in plain words and one sentence about how it is affecting your leadership.",
    day7: "Ask each person in one key conversation to give their weather in a sentence before you touch the agenda.",
    day14: "Interrupt a room that is pretending to be fine and name the actual weather shaping the work before one more false yes gets spoken.",
    rootNote: "This season tends truth oxygen in the field so emotion stops running the room from underground.",
    primaryKey: "Emotional",
  },
  MOVE_REPAIR_48H: {
    day1: "Within 48 hours of one strained exchange, send a short note asking for 15 minutes to repair it instead of letting it calcify.",
    day7: "In the repair conversation, name your part first and ask what landed on them before you explain anything.",
    day14: "Go back to someone you have avoided repairing with because it will cost more now than it would have two days after the rupture.",
    rootNote: "This season tends trust density by teaching the field that rupture will be met, not buried.",
    primaryKey: "Emotional",
  },
  MOVE_NAME_THE_COST: {
    day1: "In one live conversation, say the truth you have been carrying and name the price the team is already paying for not saying it.",
    day7: "Bring that truth into the room where the avoidance is maintained, not just the room where it is discussed afterward.",
    day14: "Name the truth that puts something of yours at risk — approval, ease, image, or position — and stay in the room after you say it.",
    rootNote: "This season tends integrity at the root by teaching the soul of the work to prize what is real over what is comfortable.",
    primaryKey: "Spiritual",
  },
  MOVE_DECISION_RIGHTS_MAP: {
    day1: "Take one stalled decision and write down who decides, who gives input, who executes, and who only needs to know.",
    day7: "Put that map in front of everyone involved and correct it until there is no fog left about ownership.",
    day14: "Use the map in a live moment of drift by naming the actual decision owner and letting them make the call.",
    rootNote: "This season tends technical clarity so power stops hiding in ambiguity.",
    primaryKey: "Technical",
  },
  MOVE_MEETING_REWRITE: {
    day1: "Rewrite one recurring meeting agenda under three headings only — decision, problem, owner — and run it that way once.",
    day7: "Open the meeting by saying what will be decided, what will not be decided, and what each person is there to move.",
    day14: "End the meeting early by cutting anything that does not move the work and pushing unresolved items back to named owners.",
    rootNote: "This season tends shared attention so meetings become instruments of movement instead of fog machines.",
    primaryKey: "Technical",
  },
  MOVE_STOP_LIST: {
    day1: "Write down three active commitments that are draining force without moving the mission and stop one of them this week.",
    day7: "Tell the affected people exactly what is stopping, what remains protected, and what you are making room for instead.",
    day14: "Remove one normalized but dead obligation from the calendar even though somebody will be disappointed by its absence.",
    rootNote: "This season tends capacity at the root by cutting false load so living work can breathe again.",
    primaryKey: "Physical",
  },
  MOVE_MINORITY_REPORT: {
    day1: "In your next decision meeting, ask one person who sees it differently to speak before the room locks into agreement.",
    day7: "Before finalizing a call, assign someone to write the strongest case against the plan and read it aloud.",
    day14: "Let a credible minority concern materially change a decision you were already mentally finished with.",
    rootNote: "This season tends truth and courage by lowering the cost of dissent before conformity hardens into blindness.",
    primaryKey: "Emotional",
  },
  MOVE_FRIDGE_RIGHTS_AUDIT: {
    day1: "Walk one shared workflow and note the things only insiders seem allowed to touch, change, or question.",
    day7: "Ask three people at different levels what feels not yours to move even though it affects their work every week.",
    day14: "Publicly hand one piece of informal gatekept control to the people closest to the work and let them run it.",
    rootNote: "This season tends belonging and agency by exposing where permission has been hoarded instead of shared.",
    primaryKey: "Emotional",
  },
  MOVE_DISAGREE_AND_COMMIT: {
    day1: "In one live decision, state your dissent in one sentence and then say exactly what you will support once the call is made.",
    day7: "After a decision you would not have chosen, do your part without side commentary, eye-rolling, or slow sabotage.",
    day14: "Publicly back a decision you argued against and shut down one backchannel conversation trying to reopen it without responsibility.",
    rootNote: "This season tends relational integrity by joining honest disagreement with actual unity.",
    primaryKey: "Leading",
  },
  MOVE_THE_ONE_THING: {
    day1: "Choose the single outcome that would make this week count and put it at the top of every agenda, note, and work list.",
    day7: "Cut or defer one meaningful task that competes with that outcome and tell the team what just lost priority.",
    day14: "Reorder your calendar or someone else's work around that one thing even though something visible will now move later.",
    rootNote: "This season tends vision coherence by training attention to serve what matters most.",
    primaryKey: "Vision",
  },
  MOVE_THE_MIRROR: {
    day1: "In one tense conversation, describe the pattern you see without reading motives, using plain language the room can test against reality.",
    day7: "Use the mirror on yourself first by naming one way your own behavior has helped train the pattern you want to change.",
    day14: "Hold the mirror up to the room's most protected habit while the people benefiting from it are present.",
    rootNote: "This season tends self-awareness and shared reality so the system can see itself clearly enough to change.",
    primaryKey: "Emotional",
  },
  MOVE_TRUST_MICRO_DEPOSIT: {
    day1: "Make one small promise you can keep by tomorrow and keep it exactly as spoken.",
    day7: "Close one open loop someone else has been carrying and tell them it is done before they have to chase you.",
    day14: "Follow through on a commitment when it is inconvenient, unglamorous, and easy to rationalize away.",
    rootNote: "This season tends trust density by proving reliability in small things before asking for faith in big ones.",
    primaryKey: "Leading",
  },
  MOVE_CLARITY_CONTRACT: {
    day1: "With one key person, write down the next deliverable, owner, deadline, and definition of done in one shared message.",
    day7: "Add what happens if it slips, how risk gets raised early, and who needs to know before the miss becomes a surprise.",
    day14: "Use the contract to confront a drifting commitment instead of rescuing it with vagueness and private compensation.",
    rootNote: "This season tends clean agreements so hidden assumptions stop eating trust.",
    primaryKey: "Technical",
  },
  MOVE_COACHING_3_QUESTIONS: {
    day1: "In one conversation, spend ten minutes asking only three questions — what are you trying to move, what is in the way, and what is your next step — without solving it for them.",
    day7: "Use the three questions with someone who usually comes to you for answers and let the silence do some of the work.",
    day14: "Coach someone through a live problem you could fix faster yourself and do not take it back unless it is truly yours.",
    rootNote: "This season tends agency in others by building leaders instead of dependency.",
    primaryKey: "Leading",
  },
  MOVE_FEEDBACK_SBI: {
    day1: "Give one piece of feedback this week using Situation, Behavior, and Impact only, then stop talking.",
    day7: "Deliver feedback to someone you like and want to protect without softening it into haze.",
    day14: "Give feedback to someone with more power or more defensiveness than you prefer while keeping their dignity intact.",
    rootNote: "This season tends truth with dignity so correction strengthens the field instead of shaming people out of it.",
    primaryKey: "Emotional",
  },
  MOVE_FEEDFORWARD: {
    day1: "Ask one trusted person what would make you more useful in the next round and write down the answer without defending yourself.",
    day7: "Trade that same ask with a peer and each choose one specific behavior to try before your next check-in.",
    day14: "Ask for feedforward from someone you recently frustrated and practice their suggestion in the next live setting.",
    rootNote: "This season tends humility and forward movement by turning critique into usable change.",
    primaryKey: "Leading",
  },
  MOVE_ACCOUNTABILITY_WITH_CARE: {
    day1: "Tell one person clearly what commitment is at risk and ask what support they need to meet it.",
    day7: "Return on the agreed date and name the gap directly without sarcasm, rescuing, or evasive kindness.",
    day14: "Hold a real consequence line on a missed commitment while making it unmistakable that the person is not disposable.",
    rootNote: "This season tends mature leadership by proving that standards and care do not have to live in separate rooms.",
    primaryKey: "Leading",
  },
  MOVE_BOUNDARY_NO_WITH_YES: {
    day1: "Decline one request you cannot carry and name the thing you are protecting by saying no.",
    day7: "Give a clean no before resentment builds, without overexplaining, apologizing into confusion, or offering a fake maybe.",
    day14: "Say no to something flattering or politically useful because saying yes would fracture your real yes.",
    rootNote: "This season tends embodied integrity by teaching the body, calendar, and mission to tell the same truth.",
    primaryKey: "Leading",
  },
  MOVE_RECOVER_AFTER_MISS: {
    day1: "Within 24 hours of one miss, name it plainly to the affected person instead of hiding inside delay or spin.",
    day7: "State what you should have done, what you will do now, and when they can expect the repair.",
    day14: "Make a repair move that costs you convenience, image, or leverage rather than settling for an apology that changes nothing.",
    rootNote: "This season tends repairable integrity by teaching the field that failure will be met with ownership, not disguise.",
    primaryKey: "Emotional",
  },
  MOVE_NORTH_STAR_SENTENCE: {
    day1: "Write one sentence that names what this team exists to make true and read it aloud in your next meeting.",
    day7: "Use that sentence to cut one agenda item, project, or debate that does not serve it.",
    day14: "In a live tradeoff, choose in favor of the north star even when a louder short-term win is on the table.",
    rootNote: "This season tends identity and direction by giving the work a sentence sturdy enough to steer by.",
    primaryKey: "Vision",
  },
  MOVE_KILL_THE_GHOST_GOAL: {
    day1: "Name one goal your team still serves out of habit, guilt, or old approval and say out loud that it is no longer living.",
    day7: "Remove the ghost goal from one deck, tracker, or recurring meeting so the system stops pretending it matters.",
    day14: "Tell the person or group most invested in that ghost goal that you are withdrawing energy from it and why.",
    rootNote: "This season tends spiritual clarity by breaking allegiance to dead purposes that still drain living strength.",
    primaryKey: "Spiritual",
  },
  MOVE_WIN_CONDITION: {
    day1: "For one active project, define in one sentence what winning actually looks like and who gets to say it has happened.",
    day7: "Put that win condition in front of everyone doing the work and rewrite one task that does not clearly point toward it.",
    day14: "Stop a stream of productive-looking motion that is not moving the win condition even though it has momentum and defenders.",
    rootNote: "This season tends technical honesty by aligning effort with actual outcome.",
    primaryKey: "Technical",
  },
  MOVE_TRADEOFF_TALK: {
    day1: "In the next prioritization conversation, say explicitly what you are choosing and what you are not choosing.",
    day7: "Put the real tradeoff on the table — speed for quality, growth for margin, harmony for truth — and make the room stay with it long enough to decide.",
    day14: "Tell stakeholders what this decision will cost them before they discover the cost downstream and call it betrayal.",
    rootNote: "This season tends adult vision by marrying every yes to its consequence.",
    primaryKey: "Vision",
  },
  MOVE_PERMISSION_SLIP: {
    day1: "Tell one capable person they do not need your permission for this move and if they act, just loop you in.",
    day7: "Remove yourself from one approval step and leave the decision with the person closest to the work.",
    day14: "Publicly back someone's good-faith move made without you even though you would have done it differently.",
    rootNote: "This season tends distributed ownership by turning borrowed confidence into real agency.",
    primaryKey: "Leading",
  },
  MOVE_SHADOW_NORMS: {
    day1: "Name one unwritten rule shaping the team — like we do not challenge this person in the room — in a meeting where it usually stays invisible.",
    day7: "Ask the group to choose one shadow norm they are done serving and write the replacement behavior into the next working rhythm.",
    day14: "Break that shadow norm yourself in public so the room can feel that the old script has actually lost power.",
    rootNote: "This season tends hidden culture at the root by surfacing the liturgies that have been forming people without consent.",
    primaryKey: "Spiritual",
  },
  MOVE_ENERGY_LEAK_CHECK: {
    day1: "Track one full workday and circle every meeting, task, or handoff that drains energy without moving real work.",
    day7: "Close or redesign one leak by shortening it, killing it, automating it, or assigning it to its proper owner.",
    day14: "Remove a recurring drain that has been normalized as just how we do it even though it inconveniences someone senior.",
    rootNote: "This season tends physical and technical stewardship by stopping the slow bleed that makes good work impossible to sustain.",
    primaryKey: "Physical",
  },
  MOVE_SAFE_TO_SAY: {
    day1: "In your next team conversation, ask for one thing people think but usually do not say here and thank the first honest answer without fixing it.",
    day7: "Share a truth yourself that lowers the cost of honesty in the room, especially one that makes you less defended.",
    day14: "Protect someone who tells the risky truth by making sure they are not mocked, isolated, or quietly punished after the meeting.",
    rootNote: "This season tends relational safety by proving that truth can survive contact with the group.",
    primaryKey: "Emotional",
  },
};

// ─────────────────────────────────────────────────
// First Move → Primary Cartridge
// ─────────────────────────────────────────────────

export const FIRST_MOVE_TO_CARTRIDGE: Record<string, string> = {
  "THE OXYGEN PROTOCOL":      "MOVE_TRUTH_WEATHER",
  "THE ALIGNMENT RITUAL":     "MOVE_DECISION_RIGHTS_MAP",
  "THE WEIGHT REDISTRIBUTION": "MOVE_STOP_LIST",
  "THE HORIZON CAST":         "MOVE_NORTH_STAR_SENTENCE",
  "THE LEGACY CODEX":         "MOVE_SHADOW_NORMS",
};
