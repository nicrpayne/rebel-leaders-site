/**
 * Mirror Content Router — Reading Assembly Engine
 *
 * This is a CONTENT ROUTER, not a generative system.
 * It looks at: top_family + gravitas_combo + confidence_band
 * and retrieves the right pre-written reading block.
 *
 * v1 scope: 3 Gravitas combos × 4 families each × 3 confidence bands = 36 blocks.
 *
 * Key format: "${gravitas_combo}::${top_family}::${confidence_band}"
 *
 * When a precise key isn't found, the router falls back:
 *   1. Try exact key
 *   2. Try with "medium" confidence (broader language)
 *   3. Try with "high" confidence
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

// ═════════════════════════════════════════════════════════════════════
// COMBO 1: Compensation Orbit / Culture leak / Vision force
// ═════════════════════════════════════════════════════════════════════

// ─── Performance Carrier ─────────────────────────────────────────────

register({
  key: "COMPENSATION ORBIT::CULTURE::VISION::performance_carrier::high",
  opening_interpretation:
    "You are not merely leading this system toward a future. You are actively compensating for a present that cannot yet bear the story being told about it. The mission has become the emotional oxygen supply. Without your forward pull, much more of the cultural thinness would already be visible.",
  what_may_be_shaping_this:
    "You likely experience yourself as the one who must keep things from sagging. If you stop animating the future, if you stop translating the strain into purpose, the whole thing feels like it could flatten in real time. So you keep giving people something worthy to move toward. What is underneath that pattern is not vanity but responsibility fused with fear.",
  what_strength_may_cover:
    "Your strength is not generic ambition. It is the ability to make people feel that what they are doing matters. But that same power has become a way of sparing yourself and others from sustained contact with the present. The vision is not only guiding the work now. It is buffering everyone from what the culture feels like when the speech ends and the room goes quiet.",
  what_this_may_cost_others:
    "Others may feel pressure to match your conviction even when their body is telling them something is off. They may become less honest, not because they do not care, but because honesty feels like disloyalty to the momentum. Over time, the strongest people either overfunction alongside you or begin to detach in private. What you read as commitment may partly be adaptation.",
  what_kind_of_move:
    "The move is to let one part of the room stop being inspired long enough to become real. Ask where this place is asking people to perform health rather than inhabit it. Then do not translate the answer into strategy too quickly. Let the truth stand on its own legs first.",
  why_this_is_hard:
    "Because your leadership has been organized around the belief that if you can keep the future vivid enough, people can survive almost anything in the present. That belief has worked often enough to feel sacred. What you are being asked to discover now is whether the future you care about can only be served by inspiration, or whether it now requires exposure.",
  wisdom_thread:
    "There is an old warning about impressive structures built on insufficient ground. The point is not that the vision is false. It is that what is outwardly compelling cannot carry forever what only inward integrity can sustain.",
});

register({
  key: "COMPENSATION ORBIT::CULTURE::VISION::performance_carrier::medium",
  opening_interpretation:
    "The system is still moving because you know how to make the future feel vivid enough that people keep going. That is a real gift. But right now that gift is doing double duty: it is leading, and it is covering. The mission is carrying emotional weight the culture itself can no longer carry on its own.",
  what_may_be_shaping_this:
    "Somewhere along the way, you learned that one of the most loving things you can do is keep the energy high, the purpose clear, and the room oriented toward what matters. If the future stays bright enough, people do not have to sit too long in what the present costs. That instinct has probably made you effective for a long time. It has also made it hard to tell the truth about the present without feeling like you are betraying the very thing you are trying to protect.",
  what_strength_may_cover:
    "Your ability to call people into something meaningful is not fake and it is not small. People trust it because they can feel your conviction. But the stronger that pull becomes, the easier it is for everyone, including you, to live on borrowed atmosphere. The vision is supplying hope, coherence, and energy that the daily environment has stopped generating for itself.",
  what_this_may_cost_others:
    "People around you may feel both inspired and quietly tired. They still believe in what this could be, but they may also be learning that honesty lowers the temperature of the room in a way the system does not really welcome. Some have likely started performing belief more than inhabiting it. They carry the gap between the future being named and the present being lived, and they often carry it alone.",
  what_kind_of_move:
    "Not a better rally. Not a sharper articulation of the mission. The move is one specific moment where the present gets to be more true than the future is compelling. One honest question asked without rescuing the room too quickly can do more for this system than another burst of clarity.",
  why_this_is_hard:
    "Because a part of you does not yet trust that truth will strengthen this system more than performance has. If the energy drops, you fear the room will not just get honest — it will lose heart. What makes this difficult is not indifference. It is the fear that naming the gap will weaken the very mission you have been carrying for everyone.",
  wisdom_thread: null,
});

register({
  key: "COMPENSATION ORBIT::CULTURE::VISION::performance_carrier::low",
  opening_interpretation:
    "There is a real future here, and you may be one of the main reasons people can still feel it. But something in the present has grown thinner than the energy being projected around it. The result is a system where aspiration may be carrying more than it should.",
  what_may_be_shaping_this:
    "You may have learned to protect people by giving them meaning, direction, and something worth enduring for. That can be beautiful and necessary. It can also make it easier to keep moving than to stop and ask whether the environment itself is still earning the devotion being poured into it.",
  what_strength_may_cover:
    "Your strength may be the ability to create hope where others would create drift. But hope can start compensating for things it cannot heal by itself. The clearer the future becomes, the easier it is to miss what the present keeps asking to have named.",
  what_this_may_cost_others:
    "Others may stay loyal to the mission while quietly growing more tired, more careful, or less candid. They may feel grateful for the purpose and hungry for a more breathable environment at the same time. That mixed experience is often easy to miss from the center of the momentum.",
  what_kind_of_move:
    "A useful move here is not bigger force but truer contact. One conversation that asks what has become costly to say may reveal more than a week of alignment language. You do not need a full diagnosis first. You need one honest opening.",
  why_this_is_hard:
    "Because slowing the momentum can feel like risking the only thing that is still clearly alive. A part of you may worry that if the room stops reaching forward, it will have to face what has been quietly eroding underneath.",
  wisdom_thread: null,
});

// ─── Velocity Defender ───────────────────────────────────────────────

register({
  key: "COMPENSATION ORBIT::CULTURE::VISION::velocity_defender::high",
  opening_interpretation:
    "You are not just adding momentum to this system. You are preventing contact with what the system feels like when it has nowhere to go. The speed is not incidental now. It has become one of the main ways the culture avoids grief, fatigue, friction, and any truth that requires duration rather than action.",
  what_may_be_shaping_this:
    "You likely trust your capacity to move far more than your capacity to remain. When a room slows down enough for reality to become emotionally expensive, you feel the pressure to create possibility almost immediately. That pattern probably protected you long before it became a leadership style. But in this system it now means the culture keeps getting interrupted right before honesty deepens into reckoning.",
  what_strength_may_cover:
    "Your gift is not simply productivity. It is aliveness under pressure — the ability to create motion where others feel trapped. But that same aliveness is now being used to keep the present from becoming fully felt. The vision is arriving as speed, and the speed is sparing everyone from having to remain in what the culture has actually become.",
  what_this_may_cost_others:
    "The people around you may feel energized by you and unseen by the pace at the same time. They may stop bringing forward anything that cannot survive immediate translation into action. The strongest people often comply outwardly and detach inwardly. What looks like resilience in the system may partly be the learned suppression of weight.",
  what_kind_of_move:
    "Choose one unresolved thing and refuse to move the room past it too early. Let silence lengthen. Let discomfort stay unproductive for a minute. Let the conversation become heavier than your instinct prefers, and discover whether the field actually breaks when you stop rescuing it.",
  why_this_is_hard:
    "Because you do not merely dislike stillness. You associate it with being trapped inside something unmanageable. The resistance here is not abstract. Staying can feel more dangerous than spinning up the next possibility, even when the next possibility is exactly how the system avoids repair.",
  wisdom_thread: null,
});

register({
  key: "COMPENSATION ORBIT::CULTURE::VISION::velocity_defender::medium",
  opening_interpretation:
    "This system is still moving because you know how to generate movement when others would bog down. That is not trivial. But right now the motion is doing double duty: it is helping the work progress, and it is keeping the culture from having to sit still long enough for the truth to fully land. Every new direction relieves pressure that the room may actually need to feel.",
  what_may_be_shaping_this:
    "You do not seem afraid of hard things so much as allergic to stuckness. When a room gets heavy, static, or emotionally slow, something in you reaches for motion almost automatically. That reflex has probably rescued teams more than once. It may also have become a way of outrunning forms of truth that only surface when no one is allowed to pivot.",
  what_strength_may_cover:
    "Your ability to generate options, energy, and forward movement is real leadership capital. People feel less trapped around you because you can always see a next move. But that same gift can keep the system from reckoning with what has accumulated underneath it. The vision keeps turning into fresh motion before the culture has metabolized the last thing it absorbed.",
  what_this_may_cost_others:
    "Others may be learning that heaviness has no real place here unless it can be converted quickly into action. The people carrying disappointment, fatigue, or unresolved strain may stop bringing it forward because the room keeps moving before it can register. Some will look engaged while privately giving up on being fully honest. Some will eventually leave without having said the truest thing once.",
  what_kind_of_move:
    "The move is to stay in one heavy conversation past the point where you would normally create the exit. No new idea. No reframing. No fresh horizon. Just enough stillness for the thing under the motion to become undeniable.",
  why_this_is_hard:
    "Because staying with unresolved weight can feel like a kind of death to a system in you that has survived by generating energy. A part of you still believes movement is mercy. What makes this difficult is the fear that if you do not keep things moving, the room will fill with something you cannot lift.",
  wisdom_thread: null,
});

register({
  key: "COMPENSATION ORBIT::CULTURE::VISION::velocity_defender::low",
  opening_interpretation:
    "You may be one of the people keeping this place from freezing up. But the movement itself may now be doing more than moving the work forward. It may also be keeping the room from sitting with truths that do not reveal themselves at speed.",
  what_may_be_shaping_this:
    "You may trust action, possibility, and fresh direction more than long exposure to heaviness. That is often a strength. It can also become a habit of leaving the room just before something deeper has time to emerge.",
  what_strength_may_cover:
    "Your energy may genuinely be what keeps people from despair. But it may also make it harder to notice what everyone is learning not to bring forward. The faster the system regenerates momentum, the easier it is to miss what never got worked through.",
  what_this_may_cost_others:
    "Others may start editing themselves toward what can be handled quickly. They may keep the harder truths private, not because they are unwilling, but because the environment does not stay still long enough to hold them.",
  what_kind_of_move:
    "A useful move here is simple: do not solve the first hard thing too quickly. Let one difficult truth stay in the center of the room a little longer than usual. See what becomes visible when no one pivots.",
  why_this_is_hard:
    "Because motion likely feels generous, capable, and alive to you, while stillness feels loaded. A part of you may still believe that if things stop moving, they stop living.",
  wisdom_thread: null,
});

// ─── Significance Seeker ─────────────────────────────────────────────

register({
  key: "COMPENSATION ORBIT::CULTURE::VISION::significance_seeker::high",
  opening_interpretation:
    "You are not just protecting the future here. You are protecting aliveness itself. The vision has become a way of keeping the work emotionally charged enough that neither you nor the team has to fully face how thin the daily environment has become. In other words, the future is not only carrying direction. It is carrying atmosphere, meaning, and felt soul.",
  what_may_be_shaping_this:
    "You likely have a finely tuned aversion to anything that feels generic, flattened, or merely useful. You can feel when the room starts living below its own depth, and you instinctively push against it. That sensitivity is real discernment. But it can also create a hidden dependence on emotional intensity, where the charged future becomes easier to trust than the slow formation of an ordinary, truthful culture.",
  what_strength_may_cover:
    "Your strength is the ability to make the work feel unmistakably alive. People often follow you because they sense that you are not willing to settle for dead language or dead systems. But right now that same force may be helping everyone bypass the simpler question of whether this place is actually safe, honest, and breathable on a Tuesday afternoon. The vision is carrying the soul the culture has stopped embodying.",
  what_this_may_cost_others:
    "Others may feel moved by the meaning and starved by the environment. They may learn to mirror intensity rather than bring ordinary truth. The people who cannot live at that charge level may either disappear quietly or begin to feel like the problem. What gets lost is the kind of daily human ground that keeps meaning from becoming theater.",
  what_kind_of_move:
    "Ask a smaller question than your instincts want: what feels dead here in the most ordinary sense? Not what are we becoming. Not what matters most. What feels performative, tired, or emotionally expensive in the daily life of this place? Stay with answers that sound plain.",
  why_this_is_hard:
    "Because without significance, something in you fears disappearance. Plain truth can feel too small to trust. It can seem incapable of carrying the depth you know is needed, even though plain truth is often the only road back to real depth.",
  wisdom_thread: null,
});

register({
  key: "COMPENSATION ORBIT::CULTURE::VISION::significance_seeker::medium",
  opening_interpretation:
    "You may be helping this system feel alive by refusing to let it become flat, generic, or merely functional. That is a gift. But right now the search for what feels vivid and meaningful is doing double duty: it is leading, and it is covering. The mission is carrying a charge of aliveness that the culture itself is no longer generating in ordinary life.",
  what_may_be_shaping_this:
    "Something in you needs the work to feel real in a way that is more than efficient or correct. You can tolerate effort, conflict, even risk more easily than deadness. That instinct may come from a long history of protecting something irreducible in yourself from being flattened by expectation, utility, or banality. In leadership, that can become a pattern of intensifying the vision whenever the present starts to feel emotionally thin.",
  what_strength_may_cover:
    "Your gift is not just passion. It is the ability to sense when something has lost soul and to call people back toward what matters. But that same sensitivity can make it hard to remain inside ordinary, under-formed reality without trying to re-enchant it too quickly. The vision becomes a source of heat, texture, and significance that spares you from having to fully feel how performative the culture has become.",
  what_this_may_cost_others:
    "Others may feel pulled toward depth and still not feel able to live honestly inside the place itself. The room can become charged, poetic, even moving, while ordinary trust, repair, and breathable life stay thin. Some people will start performing resonance because they can feel how much deadness is unwelcome here. Others will quietly wonder why something that sounds so alive leaves them so tired.",
  what_kind_of_move:
    "The move is not to make the vision more beautiful. It is to let one ordinary, unimpressive truth stay ordinary without rescuing it into meaning too quickly. Let the room name what feels hollow, repetitive, performative, or emotionally costly in plain language. The next honest step may be smaller and less charged than your instincts prefer.",
  why_this_is_hard:
    "Because a part of you experiences flatness as disappearance. When the room becomes too ordinary, too procedural, too emotionally muted, you feel the urge to bring back intensity so something real can be felt again. What makes this difficult is the fear that if you stop generating charge, both you and the work will collapse into something forgettable.",
  wisdom_thread: null,
});

register({
  key: "COMPENSATION ORBIT::CULTURE::VISION::significance_seeker::low",
  opening_interpretation:
    "You may be one of the people keeping this system from becoming emotionally flat. But the need for what feels vivid and deeply meaningful may also be compensating for a present that has grown thin in more ordinary ways. The future can become a place to find aliveness that the environment itself no longer provides.",
  what_may_be_shaping_this:
    "You may have learned to resist flattening by reaching for what feels charged, distinct, and real. That can make you a powerful source of meaning. It can also make ordinary cultural repair feel too small, too procedural, or too lacking in soul to trust.",
  what_strength_may_cover:
    "Your gift may be the refusal to settle for deadness. But that refusal can also function as a way of bypassing the simpler work of naming where the daily environment has become performative or emotionally costly. The stronger the charge of the mission, the easier it is to miss the ordinary places where life has gone out of the room.",
  what_this_may_cost_others:
    "Others may feel invited into something meaningful while still lacking a culture that can hold ordinary humanity well. Some will rise to the charge. Some will quietly tire under it. Either way, it can become harder to tell the simple truth about what this place actually feels like day to day.",
  what_kind_of_move:
    "A helpful move here is to let plain language lead for once. Ask what has become hollow in the daily life of the system, and resist turning the answer into something more elevated too quickly. Let ordinary truth have enough dignity to stand on its own.",
  why_this_is_hard:
    "Because ordinary reality may not feel strong enough to trust. A part of you may still believe that if the room loses intensity, it loses meaning.",
  wisdom_thread: null,
});

// ─── Warmth Protector ────────────────────────────────────────────────

register({
  key: "COMPENSATION ORBIT::CULTURE::VISION::warmth_protector::high",
  opening_interpretation:
    "You have likely become part of the emotional glue holding this place together. People do not just trust the mission. They trust the warmth surrounding it, and much of that warmth comes through you. But that means your care is now compensating for a culture that should be able to hold more truth than it currently can. The result is a system that feels loving enough to remain in while staying too soft around what most needs naming.",
  what_may_be_shaping_this:
    "You probably experience other people's discouragement, exclusion, or disconnection as something that requires an immediate response from you. When the room gets tense, your instinct is to preserve relationship before anything fractures. That instinct is beautiful and costly. It can also make you into a buffer between people and reality, especially when the reality would ask the group to tolerate more discomfort than you currently trust it to bear.",
  what_strength_may_cover:
    "Your strength is the creation of belonging. You know how to make people feel wanted, remembered, and emotionally accompanied. But right now that same gift may be helping the system avoid a truth it would otherwise have to face: that warmth is not the same thing as honesty, and care is not the same thing as health. The vision adds further cover by making the togetherness feel purposeful enough that the thinness underneath stays difficult to challenge.",
  what_this_may_cost_others:
    "Others may become loyal to the feeling of being held while quietly losing the experience of being told the truth. The people most hungry for honesty may begin to feel guilty for wanting more than warmth. The people most conflict-averse may mistake comfort for health. What gets delayed is the kind of truth that would let the culture become trustworthy in deeper ways.",
  what_kind_of_move:
    "Say one true thing that risks making the room less comfortable but more real. Do it with the same warmth people know from you, but without softening it into reassurance too quickly. The point is not rupture. It is discovering that belonging can survive contact with truth.",
  why_this_is_hard:
    "Because losing unity feels more dangerous than living with the gap. You may trust love that holds more than love that sends, confronts, or exposes. The fear underneath is that if you stop protecting the relational field so carefully, the people you most want to care for will experience you as one more source of strain.",
  wisdom_thread:
    "There is a deep difference between love that keeps everyone comfortable and love that helps people become free. Sometimes the more faithful form of care is the one willing to let the room grow a little more uncomfortable so something truer can begin.",
});

register({
  key: "COMPENSATION ORBIT::CULTURE::VISION::warmth_protector::medium",
  opening_interpretation:
    "You may be one of the main reasons this system still feels human at all. People likely feel your care, and that matters more than you know. But right now that warmth is doing double duty: it is genuinely tending people, and it is softening over a culture that has grown too performative to confront directly. The mission is helping with that too, giving everyone something beautiful enough to gather around when the daily environment is harder to name honestly.",
  what_may_be_shaping_this:
    "You likely feel the relational temperature of a room almost immediately. When people start drifting, hardening, or losing heart, your instinct is to move toward them rather than sharpen the edge. That has probably made you a source of safety for many people. It can also make you protect belonging so faithfully that you start covering for conditions that belonging alone cannot heal.",
  what_strength_may_cover:
    "Your gift is not niceness. It is the ability to keep people from feeling abandoned while pressure rises. But that same gift can make it easier for the system to keep functioning without ever naming what is thin, false, or costly in the culture itself. Warmth and vision together can create enough felt goodness that the harder truth keeps getting postponed.",
  what_this_may_cost_others:
    "Others may feel cared for and still not fully free. They may sense that the room prefers reassurance to disruption, inclusion to candor, warmth to the harder honesty that might change something. Some will stay longer because the relationships feel real, even while they privately know the environment is not asking enough truth of anyone. Care becomes the thing that makes the gap easier to live inside.",
  what_kind_of_move:
    "The move is not to care less. It is to let care tell the truth. Name one thing in the environment that people have been adapting to because no one wants to make the room harder. Honest warmth is stronger than protective warmth, and the system needs the stronger version now.",
  why_this_is_hard:
    "Because a part of you still believes that if the truth lands too sharply, someone will feel left behind, exposed, or less safe in your presence. What makes this difficult is not weakness. It is the fear that honesty might undo the belonging you have spent so much energy protecting.",
  wisdom_thread: null,
});

register({
  key: "COMPENSATION ORBIT::CULTURE::VISION::warmth_protector::low",
  opening_interpretation:
    "You may be helping this system stay relationally intact even while something in the culture has grown thin. That care is real. But it may also be making the present easier to endure than it is to confront, especially when the mission provides an additional sense of shared goodness.",
  what_may_be_shaping_this:
    "You may have learned to protect people by softening edges, tending morale, and making sure no one gets emotionally stranded. That creates real safety. It can also make direct truth feel harsher than it is, especially when the room already seems tired or fragile.",
  what_strength_may_cover:
    "Your warmth may be holding people near each other in ways the culture itself is no longer strong enough to do. Add a meaningful mission to that, and it becomes even easier for everyone to stay inside the gap. Care and vision together can hide a surprising amount of thinness.",
  what_this_may_cost_others:
    "Others may feel supported while still adapting to patterns that are costing them. They may keep the harder truth to themselves because the room feels too precious to disturb. Over time, that can create belonging without enough honesty inside it.",
  what_kind_of_move:
    "A helpful move here is to name one strain you have been softening around. Not harshly. Not dramatically. Just plainly enough that care stops acting as cover. Let the truth become part of the belonging, not a threat to it.",
  why_this_is_hard:
    "Because a part of you may still believe that making the room harder is the opposite of love. What you may be discovering now is that some forms of care become truer when they stop protecting everyone from reality.",
  wisdom_thread: null,
});

// ═════════════════════════════════════════════════════════════════════
// COMBO 2: Friction Belt / Relationship leak / Identity force
// ═════════════════════════════════════════════════════════════════════

// ─── Silence Stabilizer ──────────────────────────────────────────────

register({
  key: "FRICTION BELT::RELATIONSHIP::IDENTITY::silence_stabilizer::high",
  opening_interpretation:
    "You are not silent because you have nothing to say. You are silent because you can already feel the cost of saying it in a room that does not know how to hold truth well. The friction in this system is being managed through restraint. Your private clarity is stabilizing the field, but it is also keeping the relationships from becoming more honest than they currently are.",
  what_may_be_shaping_this:
    "You likely register tension before other people admit it exists. You can sense when one sentence would change the temperature of the room, and some part of you has taken responsibility for not making things worse. That restraint may once have been wisdom. In this system it has become a way of carrying relational fragility without exposing it.",
  what_strength_may_cover:
    "Your strength is not detachment. It is interior steadiness — the ability to know what is true without immediately needing the room to confirm it. But that same steadiness is covering for a relational field that should be doing more of its own truth-bearing. Your groundedness is absorbing strain that the relationships themselves need to learn how to hold.",
  what_this_may_cost_others:
    "Others may trust your maturity and still feel shut out of the real conversation. They may sense that something important is being withheld in the name of timing, peace, or wisdom. The result is a system where tension stays managed rather than metabolized, and people become more careful with each other than connected.",
  what_kind_of_move:
    "Let one truth become shared before it feels fully controlled. Not the sharpest one. Not the most complete one. Just the next honest thing that would make the room more real if you stopped carrying it alone.",
  why_this_is_hard:
    "Because once the truth leaves your interior, you lose control of what it becomes in other people. It may be resisted, mishandled, or turned into heat. The resistance here is not fear of truth itself. It is fear of becoming the fuse in a room you have been trying to keep from catching.",
  wisdom_thread:
    "There is a difference between peace and the suspension of honesty. Some forms of calm are purchased by silence, and they hold only until the unpaid truth comes due.",
});

register({
  key: "FRICTION BELT::RELATIONSHIP::IDENTITY::silence_stabilizer::medium",
  opening_interpretation:
    "You often know what is true before you say it. The friction is not a lack of insight. It is that introducing truth into a strained relational field feels like adding weight to something already grinding. So you carry more privately than people realize, and the silence starts to look like steadiness.",
  what_may_be_shaping_this:
    "There is likely a part of you that learned early that not every truth helps when it enters the room too fast. If people are already tense, reactive, or brittle, speaking can feel less like honesty and more like detonation. So you hold it, refine it inwardly, and tell yourself you are protecting the whole from unnecessary rupture.",
  what_strength_may_cover:
    "Your inner compass is real. You often know where you stand, what matters, and what would be truer than the current atmosphere allows. But that same self-possession is doing double duty now. It is keeping you anchored, and it is also letting the relationship field stay thinner than it should by carrying conviction privately instead of risking encounter.",
  what_this_may_cost_others:
    "Other people may experience you as calm, thoughtful, and harder to locate than they expected. They may feel the weight in the room without knowing what you actually see. Over time, that creates a system where everyone senses more than they say, and the cost of contact gets distributed quietly across the team.",
  what_kind_of_move:
    "The move is not to unload everything at once. It is to let one true thing cross the distance between your private clarity and the shared field before it feels perfectly safe. One sentence that is honest without being total can begin to reduce the tax everyone is already paying.",
  why_this_is_hard:
    "Because a part of you still believes silence is the kinder burden. If you speak, you may not just disturb the room — you may become the one who disturbed it. What makes this hard is the fear that honesty will create more strain than the field can metabolize.",
  wisdom_thread: null,
});

register({
  key: "FRICTION BELT::RELATIONSHIP::IDENTITY::silence_stabilizer::low",
  opening_interpretation:
    "You may often sense more than you say. The challenge is not necessarily uncertainty. It is that speaking into a strained field can feel costly enough that restraint starts to feel wiser than contact.",
  what_may_be_shaping_this:
    "You may have learned that timing matters, that not every truth helps simply because it is true. That can produce real discernment. It can also become a habit of holding clarity inside long after the room has started paying for the silence.",
  what_strength_may_cover:
    "Your groundedness may be helping you stay clear in a relational environment that feels easily disturbed. But that same groundedness can let the system lean on your private restraint instead of growing its own capacity for honest exchange. What steadies you inwardly may be postponing what the relationships need outwardly.",
  what_this_may_cost_others:
    "Others may feel protected from conflict and still remain unsure where they actually stand with you. They may adapt by becoming more polite, more interpretive, or more guarded. Over time the field feels smoother than it is close.",
  what_kind_of_move:
    "A useful move here is to let one true sentence become relational sooner than usual. Not dramatic. Not exhaustive. Just enough to reduce the amount of reality the system is asking you to carry alone.",
  why_this_is_hard:
    "Because silence may still feel more merciful than disruption. A part of you may believe that once the truth enters the room, it will create consequences you can no longer contain.",
  wisdom_thread: null,
});

// ─── Bandwidth Conserver ─────────────────────────────────────────────

register({
  key: "FRICTION BELT::RELATIONSHIP::IDENTITY::bandwidth_conserver::high",
  opening_interpretation:
    "Your distance is not indifference. It is infrastructure. You are using boundaries, containment, and private self-regulation to survive a relational field that feels more demanding than trustworthy. The problem is that your internal steadiness is now doing the relational work the system itself should be learning to do.",
  what_may_be_shaping_this:
    "You likely know the feeling of being overreached, overaccessed, or pulled into exchanges that cost far more than they yield. So you have built a way of staying intact by keeping the deepest parts of yourself behind structure, pacing, and selective contact. That adaptation may be wise. But in this system it also means the relationships never have to prove they can hold more of the real you.",
  what_strength_may_cover:
    "Your strength is disciplined self-possession. You do not need to spill in order to feel real, and you do not need constant contact to know who you are. But that same strength is covering for a relationship field that has become dependent on your restraint. Your inner order is preserving you and simultaneously excusing the system from becoming more humane, more spacious, and more direct.",
  what_this_may_cost_others:
    "Others may experience you as competent, thoughtful, and difficult to truly reach. They may keep things cleaner around you than they really are. The people who most need honest connection may stop asking for it altogether, and the team slowly normalizes a version of relationship that is functional without being deeply mutual.",
  what_kind_of_move:
    "Offer one form of access that costs less than total openness but more than guarded professionalism. A regular conversation, a truer answer, a little less curation. The point is not to become endlessly available. It is to stop making distance the only safe form of contact.",
  why_this_is_hard:
    "Because what you are protecting is not just energy. It is integrity. You fear that once too many people are inside the boundary, you will spend more of your life recovering from contact than living it.",
  wisdom_thread:
    "There are shelters that preserve life and shelters that slowly become isolation. Wisdom is not the refusal of boundary. It is knowing when the boundary has stopped guarding life and started guarding you from being fully known.",
});

register({
  key: "FRICTION BELT::RELATIONSHIP::IDENTITY::bandwidth_conserver::medium",
  opening_interpretation:
    "You do not withdraw because you do not care. You withdraw because unstructured relational contact costs more than most people can see. The friction in this system is real, and your way of surviving it is to keep more of yourself behind a boundary than others may realize.",
  what_may_be_shaping_this:
    "There is likely a long history underneath this of learning that too much access to you becomes draining, muddying, or invasive. So you rely on internal clarity, private calibration, and some form of distance to stay intact. That self-protection is not false. It has probably kept you from disappearing into other people's noise more than once.",
  what_strength_may_cover:
    "Your identity force shows up here as self-containment. You can find your center without constant external reinforcement, and that is a real strength. But it is doing double duty now. It is preserving your reserves, and it is also allowing a relationally thin system to remain thin because your inner coherence is substituting for shared contact.",
  what_this_may_cost_others:
    "People around you may feel that you are present in principle and unavailable in practice. They may hesitate to bring you what is messy, unfinished, or emotionally expensive because they can sense the cost it places on you. The result is a team that becomes more efficient around you and less relationally honest with you.",
  what_kind_of_move:
    "The move is not to open the floodgates. It is to offer one kind of contact that is more direct than distance but more contained than enmeshment. A smaller doorway, used consistently, will do more here than a dramatic moment of overexposure.",
  why_this_is_hard:
    "Because a part of you still equates increased contact with depletion. If the boundary gets too porous, you fear you will lose not just energy but shape. What makes this difficult is the sense that closeness may ask more from you than the exchange can justify.",
  wisdom_thread: null,
});

register({
  key: "FRICTION BELT::RELATIONSHIP::IDENTITY::bandwidth_conserver::low",
  opening_interpretation:
    "You may rely on distance more than people realize, not because you are detached, but because too much unfiltered contact can feel costly. In a strained relational system, that distance can start to look like steadiness.",
  what_may_be_shaping_this:
    "You may have learned that access needs form. Without some boundary, pacing, or structure, relationships can quickly become draining or muddy. That can be wise. It can also mean you stay intact inwardly while the shared field stays thinner than it needs to.",
  what_strength_may_cover:
    "Your self-containment may be one of the things keeping you clear in a noisy environment. But it can also become the reason the system never develops more capacity for honest, lower-cost connection. What protects your reserves may be helping everyone settle for less mutuality than they actually need.",
  what_this_may_cost_others:
    "Others may become more careful, more efficient, or more edited around you. They may stop bringing the kinds of things that require relational patience rather than speed. Over time the team learns to work around the boundary instead of through deeper contact.",
  what_kind_of_move:
    "A helpful move here is to create one repeatable form of contact that does not overextend you but is truer than polite distance. Small, clear, sustainable access is enough.",
  why_this_is_hard:
    "Because a part of you may still expect closeness to become drain. Opening more can feel less like generosity and more like losing the conditions that keep you coherent.",
  wisdom_thread: null,
});

// ─── Standard-Bearer ─────────────────────────────────────────────────

register({
  key: "FRICTION BELT::RELATIONSHIP::IDENTITY::standard_bearer::high",
  opening_interpretation:
    "You are carrying a stronger standard than the room has agreed to out loud. You can feel where the line should be, what has become too loose, and what honesty would require if anyone were willing to say it plainly. But much of that conviction is staying private. Your interior integrity is keeping you personally upright while the relationships around you continue to operate below the level you can already see.",
  what_may_be_shaping_this:
    "You likely do not want to speak until the thing is exact. If you are going to name the standard, you want the line to be clean enough that it clarifies rather than merely agitates. That restraint may come from seriousness, not fear. But in this system it has become a way of carrying truth in solitude while the shared field remains underformed.",
  what_strength_may_cover:
    "Your identity force shows up as internal exactness. You can feel misalignment quickly, and you are not easily talked out of what you know to be true. But that strength is covering more than you think. It is preserving your own integrity while allowing the team to keep functioning without the sharper clarity it actually needs.",
  what_this_may_cost_others:
    "Others may feel the pressure of a standard they cannot fully see or access. They may sense your disappointment before they ever hear your guidance. The result is a system where people become more cautious but not necessarily more aligned, because the truth is being held above the field rather than brought into it.",
  what_kind_of_move:
    "Name the line before it is polished into immunity. Give the room a standard it can actually meet, not just one it can vaguely feel from you. Precision matters, but shared clarity matters more.",
  why_this_is_hard:
    "Because if you speak before the line is clean enough, you risk being unfair, muddy, or reactive — all things you do not want to be. The resistance here is not to honesty. It is to the possibility of misrepresenting the very thing you are trying to protect.",
  wisdom_thread:
    "There is a form of faithfulness that mistakes private purity for service. But truth that never leaves the interior may remain uncorrupted and still fail to become bread for anyone else.",
});

register({
  key: "FRICTION BELT::RELATIONSHIP::IDENTITY::standard_bearer::medium",
  opening_interpretation:
    "What you carry privately is not just opinion. It is a sense of what is right, what is clean, and what the room should be willing to name more clearly than it currently does. The friction is that your inner standard is real, but it often stays inside long enough that the relationships around you remain blurrier than your conscience.",
  what_may_be_shaping_this:
    "You may have learned that if you are going to disrupt a room, you should do it with precision. Not every frustration deserves expression, and not every intuition is ready to be trusted publicly. So you refine, edit, and wait until the truth feels clean enough to say. That can look wise. It can also become a way of letting relational vagueness persist while you perfect your clarity in private.",
  what_strength_may_cover:
    "Your strength is moral and internal coherence. You do not want to speak from noise, impulse, or self-protection. But that same coherence is doing double duty. It is keeping your own center aligned, and it is covering for a relational field that keeps waiting for someone to say clearly what the standard requires.",
  what_this_may_cost_others:
    "Others may sense that you are holding a stronger line than the room has named. They may feel evaluated without being guided, or corrected internally without being helped externally. Over time, people adapt to your reserve by lowering the level of candor, and the relationships grow more careful without becoming more trustworthy.",
  what_kind_of_move:
    "The move is not to speak prematurely. It is to let clean enough replace perfect. A truer line spoken sooner can serve the field more than a more polished line held too long.",
  why_this_is_hard:
    "Because once you speak, you may be associated with the disruption, the disappointment, or the correction that follows. And if what you say lands imprecisely, you fear you will have added disorder instead of restored integrity.",
  wisdom_thread: null,
});

register({
  key: "FRICTION BELT::RELATIONSHIP::IDENTITY::standard_bearer::low",
  opening_interpretation:
    "You may carry a clearer inner line than the room has named. The difficulty is not always knowing what matters, but deciding when it is ready to be spoken into a field that may not receive it cleanly.",
  what_may_be_shaping_this:
    "You may have learned to distrust premature speech. If you are going to bring correction, direction, or moral clarity, you want it to be warranted and well-formed. That instinct can protect against noise. It can also mean the relationships around you keep operating below a standard you already feel.",
  what_strength_may_cover:
    "Your inner coherence may be helping you stay upright in a system that feels relationally muddy. But that same coherence can let the room remain vaguer than it needs to by holding the standard inward instead of making it shared. What keeps you clean may be leaving others unclear.",
  what_this_may_cost_others:
    "Others may become more careful around you without becoming more aligned with you. They may feel that something important is being measured, but not yet named. That can create caution without real trust.",
  what_kind_of_move:
    "A useful move here is to say one thing at the level of practical clarity rather than ideal exactness. Let the room receive a truer line, even if it is not the final one.",
  why_this_is_hard:
    "Because you may fear that once the standard becomes public, it can be misunderstood, watered down, or used badly. A part of you would rather wait than misstate it.",
  wisdom_thread: null,
});

// ─── Significance Seeker (Combo 2) ───────────────────────────────────

register({
  key: "FRICTION BELT::RELATIONSHIP::IDENTITY::significance_seeker::high",
  opening_interpretation:
    "You are protecting something in yourself that feels too alive to hand over carelessly. The problem is that what you protect from flattening is also what the relational field most needs from you. Your depth stays private, your distinctness stays guarded, and the system keeps relating at a level too ordinary for the real thing to appear.",
  what_may_be_shaping_this:
    "You likely know the experience of being translated downward — of saying something living and watching it become manageable, generic, or merely useful. So you have become selective, withholding, and hard to access at the deepest level. That selectivity may have integrity in it. But in this system it is also helping the relational poverty remain intact.",
  what_strength_may_cover:
    "Your strength is that you do not let the most real parts of you get cheaply absorbed. You preserve depth where other people would over-explain or self-dilute. But that same strength is covering for a relationship field that desperately needs thicker contact. Your private intensity keeps you intact and simultaneously excuses the system from becoming a place where real encounter is possible.",
  what_this_may_cost_others:
    "Others may admire your depth and still experience you as elusive. They may feel that the truest version of you is always just beyond reach. Over time, they stop asking deeper questions, and the team learns to relate at a bandwidth that protects you but impoverishes connection.",
  what_kind_of_move:
    "Risk one act of translation without contempt for the simplicity it requires. Let the room meet something more real than your curation. The point is not to become easy to read. It is to stop making full protection the price of being known.",
  why_this_is_hard:
    "Because what you fear losing is not image. It is essence. You do not want what is most alive in you flattened into something common, and that fear can make privacy feel more faithful than participation.",
  wisdom_thread:
    "Some things do lose shape when handled carelessly. But some things are only completed in the giving. A word kept perfectly inside may remain pure and still never become communion.",
});

register({
  key: "FRICTION BELT::RELATIONSHIP::IDENTITY::significance_seeker::medium",
  opening_interpretation:
    "There is likely more depth in you than the room regularly gets to meet. The friction is not only that the relationships are thin. It is that ordinary contact can feel too flattened to carry what feels most real in you. So you keep more of your inner life untranslated, and the system ends up relating to a narrower version of you than the truth.",
  what_may_be_shaping_this:
    "You may have learned that when you speak too quickly or too plainly, the real thing gets reduced. Nuance becomes slogan. Depth becomes efficiency. So you protect what matters by holding it close until the conditions feel worthy of it. That adaptation preserves something important. It also means the relational field never gets stretched by your full presence.",
  what_strength_may_cover:
    "Your identity force shows up here as irreducible selfhood. You are not easily absorbed into borrowed language or group simplifications, and that is a genuine strength. But it is doing double duty now. It is protecting what is singular in you, and it is covering for a relational field that stays ordinary because you refuse to risk letting more of yourself enter it.",
  what_this_may_cost_others:
    "Others may feel drawn toward you and still unsure how to actually reach you. They may adapt by relating at the level you offer rather than risking a deeper ask — and over time the system learns to treat your curation as the full thing.",
  what_kind_of_move:
    "The move is to let one part of the real thing be spoken before the room has fully proven itself worthy of it. Not everything. Just enough to stop making translation the enemy of truth.",
  why_this_is_hard:
    "Because a part of you still believes that once something precious is said too plainly, it cannot be recovered from the flattening. The resistance here is not to people. It is to the loss of depth through premature exposure.",
  wisdom_thread: null,
});

register({
  key: "FRICTION BELT::RELATIONSHIP::IDENTITY::significance_seeker::low",
  opening_interpretation:
    "You may sometimes protect your depth by staying harder to reach than you actually want to be. In a relational field that already feels thin, that can make privacy feel safer than translation.",
  what_may_be_shaping_this:
    "You may have learned that saying the real thing too quickly often reduces it. What matters becomes overexplained, flattened, or made ordinary. So you keep some part of yourself back until the exchange feels able to hold more truth.",
  what_strength_may_cover:
    "Your refusal to self-flatten may be one of your deepest strengths. But it can also become the reason the room never receives enough of your real interior to grow more substantial. What protects your depth may be helping the relationships stay thinner than they need to be.",
  what_this_may_cost_others:
    "Others may feel that there is more of you than they are getting, and they are usually right. They may adapt by staying at the level you offer rather than risking a deeper ask. Over time that can create admiration without real mutuality.",
  what_kind_of_move:
    "A helpful move here is to let one truer sentence be spoken in simpler language than you would prefer. Give the room something real before it has fully earned everything.",
  why_this_is_hard:
    "Because plainness may feel like diminishment. A part of you may still believe that if the deeper thing is translated too directly, it will lose the very quality that made it worth sharing.",
  wisdom_thread: null,
});

// ═════════════════════════════════════════════════════════════════════
// COMBO 3: Friction Belt / Vision leak / Culture force
// ═════════════════════════════════════════════════════════════════════

// ─── Warmth Protector (Combo 3) ──────────────────────────────────────

register({
  key: "FRICTION BELT::VISION::CULTURE::warmth_protector::high",
  opening_interpretation:
    "You are helping hold this system together through warmth, and that warmth is real. But it has become one of the main reasons the drift has remained tolerable. The culture still feels good enough, humane enough, and bonded enough that the absence of clearer direction has not yet become urgent in the way it should.",
  what_may_be_shaping_this:
    "You likely feel the cost of exclusion more intensely than the cost of ambiguity. If a sharper direction risks making someone feel left out, outpaced, or less wanted, some part of you hesitates. So you keep tending the atmosphere, protecting the bond, and hoping the way forward will emerge without anyone having to feel abandoned by it.",
  what_strength_may_cover:
    "Your strength is not vague niceness. It is the creation of a genuinely livable environment. People stay softer, more generous, and more loyal because of what you tend. But that same strength is covering for a missing future. The culture has become warm enough to inhabit that no one is forced to ask where, exactly, it is supposed to be taking them.",
  what_this_may_cost_others:
    "Others may experience real belonging and still feel a quiet ache of aimlessness. The people who need clearer direction may begin to feel guilty for wanting more than care. The people who fear conflict may mistake the continued warmth for actual clarity. In that kind of system, drift gets baptized as patience.",
  what_kind_of_move:
    "Say where this is going in a way that risks disappointing someone. Not harshly. Not as a purge. But clearly enough that togetherness is no longer the only thing being preserved.",
  why_this_is_hard:
    "Because losing cohesion can feel more dangerous than losing direction. A part of you would rather move slowly in love than move clearly at the cost of someone feeling left behind.",
  wisdom_thread:
    "Love does not only gather. It also leads. There are moments when care becomes less faithful by keeping everyone comfortable together than by helping the group move toward what is true.",
});

register({
  key: "FRICTION BELT::VISION::CULTURE::warmth_protector::medium",
  opening_interpretation:
    "This place may feel more human than it would without you. People can probably feel the care, the atmosphere, the rituals of inclusion. But right now that warmth is doing double duty: it is sustaining real belonging, and it is making the lack of direction easier to live inside than it should be.",
  what_may_be_shaping_this:
    "You likely sense quickly when sharper direction would cost the room some of its cohesion. If naming the way forward threatens to leave people behind, harden the atmosphere, or fracture trust, you tend to preserve the bond first. That instinct may come from genuine love. It can also make togetherness feel safer than truth about where the drift is taking you.",
  what_strength_may_cover:
    "Your cultural gift is real. You can help a room feel held, remembered, and less brutal than many systems become under pressure. But that same gift is now covering for blurred direction. The environment feels rich enough in the present that no one has to face how fuzzy the future has become.",
  what_this_may_cost_others:
    "Others may feel cared for and quietly underled. They may love being here and still not know what this is for anymore. Some will accept the warmth as enough. Some will start carrying private restlessness because it feels disloyal to disturb a room that still feels good to belong to.",
  what_kind_of_move:
    "The move is not to make the room harsher. It is to let care become directional. Name one future-tense truth that the culture has been postponing in the name of keeping everyone together.",
  why_this_is_hard:
    "Because a part of you still believes that if direction becomes too sharp, belonging will become conditional. What makes this difficult is the fear that clearer movement will cost you some of the people you most want to keep with you.",
  wisdom_thread:
    "Care can gather people so well that no one notices they have stopped being led. Warmth is part of leadership, but when it only circles the present, it can keep the future waiting outside the room.",
});

register({
  key: "FRICTION BELT::VISION::CULTURE::warmth_protector::low",
  opening_interpretation:
    "You may help create a culture that feels warm enough, safe enough, and relationally rich enough that the lack of direction does not feel immediately alarming. That care is real. It may also be helping the drift remain unchallenged.",
  what_may_be_shaping_this:
    "You may instinctively preserve belonging when the alternative feels sharper, riskier, or more excluding. That can protect people from needless hardness. It can also make clearer direction feel more dangerous than ongoing ambiguity.",
  what_strength_may_cover:
    "Your care may be one of the reasons this place still feels worth staying in. But it can also become the reason no one names the absence of a stronger future. The culture feels good enough now, and that present-tense goodness can quietly replace the work of direction.",
  what_this_may_cost_others:
    "Others may stay loyal to the room while becoming less certain about the road. Some will feel held by that. Others will feel a quiet frustration they are reluctant to name because the relationships still matter so much.",
  what_kind_of_move:
    "A helpful move here is to name one future decision the culture has been delaying. Let care and direction stand in the same sentence.",
  why_this_is_hard:
    "Because sharper direction may still feel like a relational risk. A part of you may fear that clarity will cost more belonging than the system can afford.",
  wisdom_thread: null,
});

// ─── Standard-Bearer (Combo 3) ───────────────────────────────────────

register({
  key: "FRICTION BELT::VISION::CULTURE::standard_bearer::high",
  opening_interpretation:
    "You can feel that good culture is no substitute for clear direction. The room may be kind, cohesive, even admirable in how it treats people, and still be drifting. What makes this especially difficult is that the health of the environment keeps masking the seriousness of the directional fog. Everyone can still feel good together while losing the road.",
  what_may_be_shaping_this:
    "You likely do not confuse warmth with coherence. When the standard has not been named, or the future has been left too vague, your conscience does not relax just because the atmosphere is pleasant. That inner line is important. But in this system it may leave you carrying a sharper dissatisfaction than other people can yet understand.",
  what_strength_may_cover:
    "Your strength is fidelity to what the group should be serving, not just how the group should feel. But because you also contribute to holding the culture well, that strength has been covering for drift. The room stays livable enough that the directional problem never has to declare itself plainly.",
  what_this_may_cost_others:
    "Others may enjoy the environment and quietly resist your push for greater clarity. They can experience you as introducing unnecessary tension into a culture that still feels mostly healthy. Meanwhile, the people who also feel the drift may remain too relieved by the warmth to join you in naming it. So you can end up carrying the standard more alone than you should.",
  what_kind_of_move:
    "Name the direction in a way that shows why the culture itself needs it. Help people see that preserving a healthy environment without a clearer future eventually turns care into containment.",
  why_this_is_hard:
    "Because in a good culture, dissatisfaction can be misread as severity. You may fear becoming the person who seems incapable of appreciating what is already good simply because you can also see what is still missing.",
  wisdom_thread:
    "There is a difference between tending a fire and circling its warmth. A healthy center is meant to send people somewhere, not merely gather them around itself indefinitely.",
});

register({
  key: "FRICTION BELT::VISION::CULTURE::standard_bearer::medium",
  opening_interpretation:
    "The atmosphere here may be healthy enough that many people can ignore how fuzzy the direction has become. You usually cannot. Even when the culture is warm, generous, and well-held, something in you keeps feeling the strain of not naming where this is actually meant to go.",
  what_may_be_shaping_this:
    "You likely have an internal line for what coherence requires. Good culture matters, but it does not satisfy you on its own. If the rituals are strong but the future is vague, some part of you remains unsettled. The challenge is that in a healthy-feeling environment, your restlessness can seem harsher than it is.",
  what_strength_may_cover:
    "Your cultural strength may show up as reliability, seriousness, and care for how the room is held. But it is doing double duty now. It helps preserve the environment, and it also lets the system keep deferring the clearer standard or direction that would make the culture serve something beyond itself.",
  what_this_may_cost_others:
    "Others may experience you as the one who keeps asking more of a room that already feels pretty good. Some will quietly thank you for it. Others may experience your insistence as pressure because the culture itself has been making drift feel acceptable. The result is tension between comfort and clarity.",
  what_kind_of_move:
    "The move is to name the standard in future-facing terms, not just corrective ones. Help the room see what the culture is for, not only what it is currently missing.",
  why_this_is_hard:
    "Because when the atmosphere is healthy, pressing for clearer direction can make you look exacting, impatient, or harder to please than you actually are. The resistance here is partly to being cast as the problem in a room that still feels good.",
  wisdom_thread: null,
});

register({
  key: "FRICTION BELT::VISION::CULTURE::standard_bearer::low",
  opening_interpretation:
    "You may feel the lack of direction more strongly than others in a culture that still feels fairly good to inhabit. The environment has enough life in it that drift can hide in plain sight.",
  what_may_be_shaping_this:
    "You may have a stronger internal line for coherence than the room has articulated out loud. Good process, healthy norms, and decent relationships matter to you, but they do not answer the question of where this is actually going.",
  what_strength_may_cover:
    "Your steadiness and care for the culture may be helping the system remain livable. But that same contribution can make the directional problem easier for everyone to postpone. The room still functions well enough that clearer future standards never become urgent.",
  what_this_may_cost_others:
    "Others may resist your push for direction because the present still feels workable. That can leave the group with comfort but not enough aim, and leave you carrying more of the directional burden than people recognize.",
  what_kind_of_move:
    "A helpful move here is to connect one cultural practice to one future requirement. Show the room what this environment is meant to be preparing people for.",
  why_this_is_hard:
    "Because when things still feel mostly healthy, pushing for more clarity can make you seem harder to satisfy than you are. A part of you may not want to be cast as the one disrupting a room that still feels decent.",
  wisdom_thread: null,
});

// ─── Map-Maker ───────────────────────────────────────────────────────

register({
  key: "FRICTION BELT::VISION::CULTURE::map_maker::high",
  opening_interpretation:
    "You are helping this system understand itself with more nuance than most people around you can manage. That is not a small contribution. But right now the map is becoming a refuge. The culture is healthy enough, thoughtful enough, and relationally intact enough that explanation can keep expanding while the future remains undernamed.",
  what_may_be_shaping_this:
    "You likely distrust premature direction. If the system has not been understood well enough, a clear path can feel more dangerous than ambiguity because it may rest on a false read of reality. So you keep tracing patterns, deepening understanding, and waiting for the picture to become truer. In this system, that patience is also helping drift survive.",
  what_strength_may_cover:
    "Your strength is sense-making. You can often see the hidden structure underneath behavior, conflict, and surface confusion. But that same gift is covering for the lack of a clearer future. The culture stays rich enough to reward reflection, and reflection keeps delaying the more vulnerable act of saying where this should now go.",
  what_this_may_cost_others:
    "Others may feel helped by your insight and still remain uncertain about the road. They may come away with a better diagnosis and no stronger directive. Over time, the team can become subtly dependent on understanding without ever crossing into shared resolve.",
  what_kind_of_move:
    "Draw a line from what the pattern means to what it now requires. Do not stop at diagnosis. Give the room one directional consequence clear enough that it changes what people do next.",
  why_this_is_hard:
    "Because direction feels like a reduction of complexity, and you do not want to betray reality by naming too much too soon. The resistance here is to false closure — the fear that a clearer future statement will oversimplify what is still alive and unfinished.",
  wisdom_thread:
    "There is a moment when a map ceases to be guidance and becomes delay. Seeing clearly matters. But sight is not complete until it can also say, with some humility, this way.",
});

register({
  key: "FRICTION BELT::VISION::CULTURE::map_maker::medium",
  opening_interpretation:
    "You can tolerate ambiguity longer than most as long as it feels like the pattern is becoming clearer. The problem here is that the culture is healthy enough to make drift feel less urgent, even while the deeper map remains underdrawn. So the room keeps functioning, and the lack of clearer direction stays just tolerable enough.",
  what_may_be_shaping_this:
    "You likely orient by understanding. If the system can be named more accurately, traced more honestly, or seen at a deeper level, you can stay patient longer than other people. That capacity is real. But in a culture with genuine life, patience can slide into prolonged interpretation while the future remains blurred.",
  what_strength_may_cover:
    "Your cultural contribution may be thoughtfulness, pattern-attunement, and the ability to keep people from reacting too quickly. But that same strength is doing double duty. It helps the room stay humane and reflective, and it also allows drift to continue because understanding keeps taking the place of direction.",
  what_this_may_cost_others:
    "Others may feel intelligently held and still not clearly led. They may trust that you see the system better than most while quietly longing for a more concrete horizon. Over time, the group can become good at interpretation and weak at declaration.",
  what_kind_of_move:
    "The move is not to abandon thoughtfulness. It is to let the map end in a road. Name one directional consequence of what you already understand instead of remaining one layer upstream in explanation.",
  why_this_is_hard:
    "Because once you move from pattern to declaration, you risk being wrong at the level that affects real people. Understanding feels safer than direction because it preserves nuance. Direction always leaves some nuance behind.",
  wisdom_thread: null,
});

register({
  key: "FRICTION BELT::VISION::CULTURE::map_maker::low",
  opening_interpretation:
    "You may be one of the people helping the group make sense of itself, which can make ongoing ambiguity feel more tolerable than it really is. In a strong culture, that can keep drift from becoming urgent.",
  what_may_be_shaping_this:
    "You may trust understanding more than quick direction. If the system has not been seen accurately enough, forward movement can feel premature. That instinct can protect against shallow decisions. It can also mean explanation keeps expanding while the future stays fuzzy.",
  what_strength_may_cover:
    "Your capacity to notice patterns may be helping the culture remain thoughtful and humane. But it can also become the reason clearer direction keeps getting delayed. What helps people understand the system may be postponing what they most need to decide.",
  what_this_may_cost_others:
    "Others may appreciate your insight and still feel unsure what it means for the road ahead. That can create a team that is reflective without becoming decisive.",
  what_kind_of_move:
    "A helpful move here is to name one concrete implication of what you already see. Let understanding take one step into direction.",
  why_this_is_hard:
    "Because a part of you may fear that once you declare a path, you will have simplified a reality that deserved more care. Direction can feel like betrayal when nuance is what you trust most.",
  wisdom_thread: null,
});

// ─── Generic Low-Confidence Fallback ─────────────────────────────────

const GENERIC_LOW_CONFIDENCE: ReadingBlock = {
  key: "GENERIC::low",
  opening_interpretation:
    "The signal here is genuinely mixed. That does not mean it is empty. It may mean you draw on more than one strategy depending on context, and no single pattern has become dominant enough to name with confidence. What follows is broader than a precise reading, but it may still point toward something worth noticing.",
  what_may_be_shaping_this:
    "You may be someone who adapts fluidly to different kinds of strain. When the pressure shifts, your response shifts with it. That flexibility can be a real strength. It can also make it harder to see which pattern is doing the most work underneath, because none of them stays visible long enough to be fully felt.",
  what_strength_may_cover:
    "Your dominant Gravitas dimension is still doing double duty, even if the Mirror pattern underneath it is harder to pin down. The strength is real. But it may be covering for more than one kind of cost, and the cost may shift depending on the situation.",
  what_this_may_cost_others:
    "Others may experience you differently depending on the context, which can make it harder for them to know how to meet you consistently. The people around you may be adapting to whichever version of the pattern is most visible at the time, rather than to the whole of what you carry.",
  what_kind_of_move:
    "A useful move here is not to force a single pattern into focus, but to notice which one shows up most when the pressure is highest. That is usually the one doing the most compensatory work. Start there.",
  why_this_is_hard:
    "Because when the signal is blended, it can feel like there is no clear next step. The temptation is to wait for more clarity before acting. But sometimes the move is simply to pay closer attention to what you reach for first when things get hard.",
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
