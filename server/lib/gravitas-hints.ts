// Server-side lookup tables for Gravitas email content.
// Root hint strings are copied verbatim from client/src/lib/workbench/scoring.ts.
// Plain-language translations are email-specific — warmer, less instrument-speak.

const ARCHETYPE_HINTS: Record<string, { hint: string; translation: string }> = {
  "DEAD ORBIT": {
    hint: "The failure here is not only strategic. It is physiological, emotional, and spiritual. People cannot attach to a field that no longer feels safe, meaningful, or alive.",
    translation: "The field has lost its pull. People are showing up but nothing is cohering — no shared meaning, no real momentum, no genuine belonging. Before anything else, the system needs to feel safe enough to be honest.",
  },
  "FRICTION BELT": {
    hint: "Friction this persistent usually means the roots are carrying competing realities: emotional strain, leadership ambiguity, technical drag, or a loss of shared meaning.",
    translation: "There's real effort here, but the field is working against itself. Competing priorities, unresolved tension, and structural drag are turning energy into heat instead of movement. Something needs to be named before more can be built.",
  },
  "COMPENSATION ORBIT": {
    hint: "When a system survives through heroics, it is usually borrowing from the roots: someone's body, someone's emotional bandwidth, someone's conscience, someone's leadership capacity.",
    translation: "The system is running on the reserves of a few people. From the outside it looks functional. From the inside, the people carrying it are aware of a cost that isn't being acknowledged. This is sustainable until it isn't.",
  },
  "EMERGING GRAVITY": {
    hint: "This phase requires protecting the roots, not just accelerating the output. What is forming here can still be distorted by overload, drift, or performative growth.",
    translation: "Something real is forming here. The field is starting to pull — people are orienting around something that matters. This phase is fragile. The work is to protect what's forming, not to accelerate it.",
  },
  "FULL ORBIT": {
    hint: "A healthy field is never self-sustaining by accident. It stays alive because the underlying roots remain tended: meaning, truth, stewardship, clarity, and embodied sustainability.",
    translation: "The field has genuine pull. Trust, direction, and culture are reinforcing each other. The work now is to tend what made this possible — not just to sustain the output, but to keep the roots healthy.",
  },
};

const LEAK_HINTS: Record<string, { hint: string; translation: string }> = {
  IDENTITY: {
    hint: "When Identity is the leak, the root stress is often Spiritual or Emotional: people no longer know who they are, what they serve, or how to stay grounded under pressure.",
    translation: "People aren't sure who they are in this system — what they stand for, what they're actually building, whether it matters. When identity is the leak, the field loses coherence from the inside out.",
  },
  RELATIONSHIP: {
    hint: "When Relationship is the leak, the root stress is often Emotional or Leading: truth has become too costly, and the field is being managed through restraint instead of contact.",
    translation: "Something true isn't being said. Trust has a cost attached to it right now — people are managing impressions instead of making contact. When relationship is the leak, everything else runs on performance instead of presence.",
  },
  VISION: {
    hint: "When Vision is the leak, the root stress is often Spiritual or Technical: shared meaning is fading, or the structure cannot hold the direction it claims to want.",
    translation: "The direction isn't landing. People are working hard but the horizon keeps shifting — or there isn't one. When vision is the leak, effort fragments. Speed without a heading is just expensive wandering.",
  },
  CULTURE: {
    hint: "When Culture is the leak, the root stress is often Leading, Physical, or Technical: the rituals remain, but the life beneath them is being drained by ambiguity, overload, or false signaling.",
    translation: "The rituals are happening but the life has gone out of them. Meetings, updates, the way decisions get made — they look right from the outside but feel hollow from the inside. When culture is the leak, the field runs on appearance instead of reality.",
  },
};

const FORCE_HINTS: Record<string, { hint: string; translation: string }> = {
  IDENTITY: {
    hint: "This force is often carried by stronger Spiritual and Emotional roots: people with an inner compass can steady the field when external certainty is low.",
    translation: "The strongest current in your field right now is a clear sense of self — people know who they are and why they're here. That clarity is holding the field together even where other things are strained.",
  },
  RELATIONSHIP: {
    hint: "This force is often carried by stronger Emotional and Leading roots: trust deep enough to survive tension and stewardship strong enough to protect it.",
    translation: "The strongest current in your field is the quality of the connections — real trust, real contact between people. That relational depth is what's keeping things in orbit.",
  },
  VISION: {
    hint: "This force is often carried by Spiritual and Technical strength together: meaning clear enough to matter and structure clear enough to move.",
    translation: "The strongest current in your field is direction — people know what they're moving toward and why it matters. That shared north star is generating pull even where other conditions are weaker.",
  },
  CULTURE: {
    hint: "This force is often carried by Leading, Physical, and Technical health: a field whose rituals create energy because they are sustainable, honest, and well-formed.",
    translation: "The strongest current in your field is what's become normal — the rituals, the rhythms, the unspoken standards that hold people together. Culture is carrying the system right now.",
  },
};

const FIRST_MOVE_TRANSLATIONS: Record<string, string> = {
  "THE OXYGEN PROTOCOL": "Before anything public, lower the temperature. The first move is to reduce demand, name the strain, and make it easier for people to come back online. You cannot build on depletion.",
  "THE ALIGNMENT RITUAL": "Before asking the system to move, ask where people are actually standing. The first move is to surface the competing realities before trying to resolve them.",
  "THE WEIGHT REDISTRIBUTION": "Before redistributing the load, name it honestly. The first move is to acknowledge what's being carried — and by whom — without pretending it isn't happening.",
  "THE HORIZON CAST": "Before naming the future, reconnect to why it matters. The first move is to anchor direction in meaning, not just strategy.",
  "THE LEGACY CODEX": "Before preserving what you've built, identify what made it possible. The first move is to name the root conditions — so you protect the life beneath the rituals, not just the rituals themselves.",
};

function formatReturnDate(daysFromNow: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export interface GravitasEmailContent {
  archetypeHint: string;
  archetypeTranslation: string;
  leakHint: string;
  leakTranslation: string;
  forceHint: string;
  forceTranslation: string;
  firstMoveTranslation: string;
  returnDate: string;
}

export function getGravitasEmailContent(
  archetype: string,
  leak: string,
  force: string,
  firstMove: string,
): GravitasEmailContent {
  const a = ARCHETYPE_HINTS[archetype] ?? { hint: "", translation: "" };
  const l = LEAK_HINTS[leak] ?? { hint: "", translation: "" };
  const f = FORCE_HINTS[force] ?? { hint: "", translation: "" };

  return {
    archetypeHint: a.hint,
    archetypeTranslation: a.translation,
    leakHint: l.hint,
    leakTranslation: l.translation,
    forceHint: f.hint,
    forceTranslation: f.translation,
    firstMoveTranslation: FIRST_MOVE_TRANSLATIONS[firstMove] ?? "",
    returnDate: formatReturnDate(28),
  };
}
