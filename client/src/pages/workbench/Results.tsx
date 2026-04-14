import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "wouter";
import GravitasShell from "@/components/workbench/GravitasShell";
import { ScoringResult } from "@/lib/workbench/scoring";
import { cn } from "@/lib/utils";
import { useGame } from "@/contexts/GameContext";
import DesktopOnly from "@/components/workbench/DesktopOnly";
import SaveReadingPrompt from "@/components/SaveReadingPrompt";
import { useSession } from "@/contexts/SessionContext";
import { trpc } from "@/lib/trpc";

// ─── Gravitas Profile Library ────────────────────────────────────────
// Keyed by "ARCHETYPE::LEAK". Only Compensation Orbit profiles have
// written content for Phase 2. All other combinations return null
// and render a placeholder state.

interface GravitasProfile {
  compensationPattern: string;
  costsOthers: string;
  costsYou: string;
  whatThisProtects: string;
  primaryInvitation: string;
  codexRationale: string;
}

function getGravitasProfile(archetype: string, leak: string): GravitasProfile | null {
  const key = `${archetype}::${leak}`;
  return GRAVITAS_PROFILES[key] ?? null;
}

const GRAVITAS_PROFILES: Record<string, GravitasProfile> = {

  // ── COMPENSATION ORBIT / CULTURE LEAK (Theater) ──────────────────
  "COMPENSATION ORBIT::CULTURE": {
    compensationPattern: `Your force is holding something real. But here is what the scan is seeing underneath it: the strength that keeps this system alive is also the reason no one has named what's dying.

When a leader carries more than their share — and carries it well — the people around them learn to match the performance. Not consciously. Not out of deception. But because the culture takes its cues from the top, and the top has been signaling that what matters is appearing capable, appearing aligned, appearing fine.

You have become the scaffolding. And now no one can tell what is structure and what is you.

You can feel that something is wrong. That knowledge has probably been sitting in you for a while without language. And because busy still looks like life, you have been answering a problem you cannot name with the only response that has ever worked: more. More urgency. More clarity. More leadership. More push.

That is not weakness. That is what Compensation Orbit does. A real strength compensating for a real weakness, until the leader mistakes heroic over-functioning for leadership itself. The crack isn't in you. The crack is in what the system has learned to do while you weren't looking.`,

    costsOthers: `People learn to perform competence while privately panicking, and eventually they stop bringing their real problems because the culture has taught them that looking stable matters more than being honest. That is more than inefficiency. That is formation. The culture is training people to present stability before they feel safe, clear, or alive.

The ones who eventually leave will not leave loudly. They will leave having never told you the real reason.`,

    costsYou: `You know something is wrong. You have known for a while. But the knowing has no language yet, so it comes out as pressure — on yourself, on your pace, on the next initiative. Pushing harder has become the only response your system knows how to make to a problem it cannot name. And every time the push produces results, it delays the reckoning by another quarter.

The cost to you is not burnout, though that may be coming. The cost is that you are increasingly alone in a room full of people.`,

    whatThisProtects: `The performance is protecting something real: the distance between how broken this system actually is and what you have the capacity to fix alone.

If the culture stopped performing — if the meetings became honest, if the real state of things surfaced — it would require more than you currently have to respond to it. The performance isn't dishonesty. It is a load-bearing wall that went up because the alternative was a collapse no one was ready for.

In many cases it is also protecting something more personal: a version of this organization that may no longer actually exist. The mission is still spoken. The language is still alive. But the thing you first believed you were building — the environment that would make the work worth doing — that may have quietly changed shape. The performance lets you keep going without having to grieve that yet.

What this protects is your ability to keep going. And what it costs is everyone else's ability to tell you the truth.`,

    primaryInvitation: `Not a protocol. Not a tactic. Something prior to those.

The invitation here is to stop performing strength long enough to find out who you are when you're not carrying everything.

That probably sounds like a threat. It isn't. It's the only move that actually changes the culture — because culture doesn't change through initiatives. It changes when the person at the top changes what they model. Right now you are modeling that the way to respond to a broken system is to work harder inside it. Your people are watching. They are learning.

And here is the downstream truth that follows from all of this: the system would be healthier if you let some things fail. Not everything. Not recklessly. But the things that are only surviving because you are personally preventing their failure — those are the places where the real structure needs to be tested, and right now your heroism is preventing that test.

The invitation is to be the first one in the room to say this isn't working — not as a failure, but as an act of leadership that the performance has been making impossible. You don't have to have the answer when you say it. You just have to say it first.`,

    codexRationale: `Your scan identified Culture as the dimension where your system is losing the most energy. Not because your team lacks talent or commitment — but because the rituals and norms that should be generating genuine momentum have quietly shifted into maintaining appearances.

The cartridge Codex loaded addresses this directly. It is not the most dramatic move available. It is the most honest one for where you are — which is: a system that needs someone to tell the truth before it can do anything else.

Your force gives you the credibility to do that. Your pattern has been preventing you from using it this way. That's the opening.`,
  },

  // ── COMPENSATION ORBIT / RELATIONSHIP LEAK (The Silence Tax) ─────
  "COMPENSATION ORBIT::RELATIONSHIP": {
    compensationPattern: `Your force is real. It is probably what people respect most about you — the clarity, the capability, the forward momentum. But here is what the scan is seeing underneath it: the same quality that keeps this system moving has made it quietly dangerous to slow it down.

You haven't made it unsafe to disagree with you through intimidation or threat. You've done it through competence. Through always having an answer. Through solving problems so well and so fast that the people around you have gradually stopped naming them before you get there. The leader solves so quickly and carries so much that people begin withholding truth rather than risking the disruption of naming what is actually wrong.

That is the shadow side of genuine strength. Not weakness in the people around you. A rational adaptation to a field you have trained — without knowing it — to protect your ability to keep moving.

And now the silence is compounding. Every unvoiced truth is a withdrawal from the trust reserve. Every meeting that ends in alignment that nobody quite believed in costs something. The pace looks like momentum. But underneath it, the relational bandwidth that makes honest teams possible is quietly running out.`,

    costsOthers: `People begin to burn out not only from the work itself, but from the weight of what they cannot say. And over time, they start disappearing — bringing less of themselves each week because honesty has become too expensive.

That is a specific and serious distinction. Workload fatigue recovers. The fatigue of chronic self-censorship — of knowing something true and deciding again and again that this is not the moment, this will not land — that fatigue hollows something out.

Over time it does something worse: people stop trusting their own read on reality because what they see never matches the official version. They begin to doubt the accuracy of their own perception. They carry two versions of the world — the one in the room and the one they discuss somewhere else — and the gap between them slowly erodes their confidence in both.`,

    costsYou: `You are leading on incomplete information and you don't know it. The data you're making decisions from has been filtered through people who have learned, without being told, what you want to hear. You are not getting the full picture. And because the system keeps moving, there is no obvious signal that something is wrong with what's coming in.

The cost to you is not relational — it's navigational. You are steering by a map that your own momentum has quietly corrupted.`,

    whatThisProtects: `The silence is protecting the pace first, and the relationship second.

Telling the truth would require a slowdown the system feels it cannot afford. Some of the things not being said would require revisiting decisions already made, repairing trust already spent, or sitting with uncertainty instead of resolving it immediately. In a system held together by compensating force, all of that feels dangerous — so the system has made an unspoken collective decision to keep moving instead.

But underneath the pace there is a second protection: people fear that once the real strain is named, what little trust remains may not survive the reckoning. So they hold the silence not only to protect momentum but to protect the relationship itself — what's left of it — from a conversation that might not have a clean ending.

That is the quiet bargain your pace has asked of them. Most of them made it willingly. That is exactly what makes it dangerous.`,

    primaryInvitation: `Not a protocol. Not a tactic. Something prior to those.

The invitation here is to stop long enough to hear what the movement has been drowning out.

Not a retreat. Not a restructure. Just one moment — probably one conversation — where you signal unmistakably that the pace is not more important than the truth. Where slowing down is not a failure of leadership but the most courageous act available to you right now.

You will not be able to manufacture that moment. It has to be real. The people around you are sophisticated enough to know the difference between a leader who creates space for honesty and a leader who performs openness while remaining fundamentally unavailable to what honesty would require of them.

The invitation is to become genuinely available to a truth that might cost you something — a timeline, a decision, a version of the mission you've been carrying. Until that availability is real, the silence will continue. Not because people are afraid of you, but because they are protecting something they care about from a conversation that the pace has never made safe.

The system will not tell you the truth until it believes the truth can land somewhere.`,

    codexRationale: `Your scan identified Relationship as the dimension where your system is losing the most energy. Not because the people around you lack commitment — the commitment is real. But the relational infrastructure that makes honest teams possible — the trust bandwidth, the safety to name hard things, the confidence that reality is welcome here — that infrastructure is running a deficit.

The cartridge Codex loaded works specifically on that deficit. It is not a communication technique. It is a structural intervention designed to reopen the channel between what people know and what gets said.

Your force gives you the credibility to create that opening. Your pace has been the reason it hasn't existed. That's the one thing that needs to change before anything else can.`,
  },

  // ── COMPENSATION ORBIT / IDENTITY LEAK (Role Fog) ────────────────
  "COMPENSATION ORBIT::IDENTITY": {
    compensationPattern: `Your force is carrying something real. But here is what the scan is seeing underneath it: at some point — gradually, without a clear moment you could point to — you stopped being a person who leads this organization and became the organization itself.

It didn't happen through weakness. It happened through devotion. The leader's identity quietly merges with the organization's identity, and because carrying the system has become synonymous with being themselves, they slowly stop tending to their own formation outside the role. You gave so much, for so long, that the boundary between what you believe and what the role requires, between who you are and what you carry — that boundary quietly dissolved.

And now when someone asks you what you think, what comes out is what the role thinks. When you make a decision, it's the organization making it through you.

This is the specific fog of a Compensation Orbit leader. Not the fog of someone who never knew themselves. The fog of someone who knew themselves well, then gave that self over to something larger, and kept giving until there was no clear line left.`,

    costsOthers: `People do not ultimately follow roles. They follow people. They can sense the difference between a leader who is present as a human being and one who is functioning as a load-bearing system.

When the person disappears behind the function, something in the followership changes. People remain loyal to what you carry. But they stop being formed by who you are. That is a serious loss — not for the org chart, but for the people who needed a real human being to show them what it looks like to lead from the inside out. That is what they came for. And the fog is slowly making it unavailable to them.`,

    costsYou: `The decisions still get made. The system still moves. But you begin making decisions from the role rather than from yourself — and over time those decisions start to feel hollow. Outwardly confident, inwardly disconnected from the real person who is supposed to be carrying them.

That is not a performance problem. It is a presence problem. The cost is not that you are doing less — it is that you are slowly losing access to the person who has genuine convictions, genuine doubts, genuine fire. The role is crowding him out. And decisions made without that person in them will keep landing technically correct but no longer fully alive.`,

    whatThisProtects: `The fog is protecting them from having to choose between what they actually believe and what the role now requires — and beneath that, from grieving how far they may have drifted from the person they were before carrying this much became their identity.

If that fog lifted — if the boundary between self and role became clear — it would force a reckoning most Compensation Orbit leaders feel they cannot afford. What do I actually believe now? What part of me is still freely choosing this? Where does genuine conviction end and obligation begin? In a system that depends on you the way this one does, those questions feel dangerous to ask. So the fog persists. Not as weakness. As a rational response to the cost of clarity.

There is also a system-level function. If you stepped back from the merger — if you began to separate what you believe from what the role requires — things that depend on you would wobble. People would notice. The certainty the system runs on would become visibly provisional.

The cost is that the person underneath the role is getting harder to find.`,

    primaryInvitation: `Not a protocol. Not a tactic. Something prior to those.

The invitation here is to find the edge — the place where you end and the organization begins — and stand there long enough to feel the difference.

This is not a call to step back from what you carry. It is a call to carry it as yourself rather than as a function of it. There is a version of this leadership that is genuinely yours — that comes from your actual convictions, your actual doubts, your actual fire — and there is the version that is the role executing itself through your body. The system needs the first one. It is currently getting the second.

The recovery is not dramatic. It does not require a crisis or a sabbatical or a resignation. It requires small, repeated acts of interiority — moments where you ask not what the leader would do here, but what you actually believe. What you actually see. What you would say if the role were not listening.

Those moments are the beginning of coming back. And when you do, the people around you get a real person back. Not a more effective leader. A more present human being. That is what changes culture in ways that no initiative ever could.`,

    codexRationale: `Your scan identified Identity as the dimension where your system is losing the most energy. Not because your people lack capability or direction — but because the source of genuine agency, ownership, and authentic leadership presence has gone foggy.

The cartridge Codex loaded works at that level. It is not a strategy tool. It is an intervention designed to help a leader recover their own voice — the one that was there before the role got loud enough to drown it out.

Your force gives you the platform to do this work visibly. When a leader who has been carrying everything begins to lead from the inside out again, the whole system feels it. Not as a disruption. As a homecoming. That is what this cartridge is for.`,
  },

  // ── COMPENSATION ORBIT / VISION LEAK (Drift) ─────────────────────
  "COMPENSATION ORBIT::VISION": {
    compensationPattern: `Your force is still moving the system. But here is what the scan is seeing underneath it: the vision is still spoken, but it stopped being felt a long time ago. The language remains, the motion remains — but the leader has quietly stopped believing the destination still justifies the pace.

What remains is not direction. It is vocabulary. The words that used to ignite something now function as the shared idiom of a system that has learned to speak them fluently without being moved by them. The culture knows the mission. It can repeat it, reference it, build presentations around it. But the living pull of it — the thing that used to make the hard days feel worth it — has gone quiet.

This is the particular drift of a Compensation Orbit leader. Not the drift of someone who never had a vision. The drift of someone whose vision was real, whose force carried it faithfully, and who at some point — without a clear moment of departure — crossed from chasing something true into maintaining something familiar.

The system kept moving because you kept carrying it. And somewhere in that momentum, the felt sense of where this is all going went cold. A system running on the memory of a vision it can no longer feel is working much harder than it knows for much less than it deserves.`,

    costsOthers: `People can feel the difference between a leader chasing something alive and a leader maintaining something established. They may not have language for it. But they feel it in the energy in the room, in the way decisions land, in the gap between what gets said about the mission and what the mission actually seems to demand of anyone.

They are working hard. They are capable. But they cannot feel where it's going — and that absence is quietly draining the discretionary energy that great work requires. People can endure almost anything if they believe it is building toward something worth building. What they cannot sustain is hard work in a direction that has stopped feeling true.`,

    costsYou: `Decisions keep getting made, but nothing feels like it is building toward something anymore. Over time the leader keeps making the next move without being able to say why it still matters — not out loud, and not fully to themselves either.

That is a specific kind of exhaustion. Not the exhaustion of overwork. The exhaustion of competent motion in a direction you can no longer fully justify to yourself. The leader who has lost the felt sense of the vision doesn't stop working. They keep working — harder, often — but the work has lost the quality of building. It has become maintenance. And maintenance, however excellent, does not sustain the soul the way creation does.`,

    whatThisProtects: `The drift is protecting the momentum first. If the destination is seriously questioned, the pace loses its justification. And in a Compensation Orbit system, pace is one of the few things still holding the structure together. So the drift persists — not because anyone has decided to be dishonest, but because the cost of the question feels higher than the cost of the silence. The language keeps moving. The work keeps moving. And the question stays unasked because the system has decided, collectively and without discussion, that the answer might be too costly to hear.

Beneath that, the drift may also be protecting the leader from grieving a vision that has quietly thinned, completed, or died without ever being formally named. The original vision was real. What it has become — the institutional version, the repeated language, the maintained momentum — may be a different thing entirely. Naming that gap would require grief. And grief, in a system that depends on your force, feels like a luxury no one can afford right now.

The protection is real. The cost is that the system is spending itself on a heading no one has verified in a long time.`,

    primaryInvitation: `Not a protocol. Not a tactic. Something prior to those.

The invitation here is to stop speaking the vision long enough to find out if you still believe it.

Not to abandon it. Not to blow up what has been built. But to get quiet enough — honest enough — to feel whether the thing you have been carrying still has fire in it, or whether you have been faithfully maintaining the form of something whose substance has changed.

That is one of the most courageous things a leader can do. Because the answer might require grief. It might require revision. It might require admitting to the people who have organized their work around this vision that the vision needs to be re-examined — not discarded, but returned to its source and asked again whether it still burns.

And here is what becomes possible on the other side of that honesty: a vision that has been tested and reclaimed carries more weight than one that has simply never been questioned. The people around you do not need certainty. They need to follow someone who is genuinely oriented — someone for whom the direction is not just spoken but felt, not just inherited but chosen again.

That re-choosing is what this moment is asking of you.`,

    codexRationale: `Your scan identified Vision as the dimension where your system is losing the most energy. Not because the direction is wrong, and not because the work isn't real — but because the animating force behind the direction has gone quiet, and the system is running on momentum rather than meaning.

The cartridge Codex loaded works at that level. It is not a strategic planning tool. It is an intervention designed to help a leader return to the source of their vision and find out what is still alive in it — and what needs to be grieved, revised, or reclaimed.

Your force has kept this system moving through the drift. That is not nothing. But force without direction eventually becomes its own kind of exhaustion. What this cartridge offers is the beginning of re-orientation — not a new mission, but a genuine return to the one that was always yours. That is what the next move is for.`,
  },

};

// ─────────────────────────────────────────────────────────────────────

// Audio Context for sound effects
const audioCtx =
  typeof window !== "undefined"
    ? new (window.AudioContext || (window as any).webkitAudioContext)()
    : null;

const playRevealSound = () => {
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  // Deep resonant tone — like a signal locking
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(120, now);
  osc.frequency.exponentialRampToValueAtTime(60, now + 1.5);
  gain.gain.setValueAtTime(0.15, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(now + 1.5);

  // High harmonic ping
  const osc2 = audioCtx.createOscillator();
  const gain2 = audioCtx.createGain();
  osc2.type = "sine";
  osc2.frequency.setValueAtTime(880, now + 0.3);
  gain2.gain.setValueAtTime(0.06, now + 0.3);
  gain2.gain.exponentialRampToValueAtTime(0.001, now + 1.0);
  osc2.connect(gain2);
  gain2.connect(audioCtx.destination);
  osc2.start(now + 0.3);
  osc2.stop(now + 1.0);
};

const playTransmitSound = () => {
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  [800, 1200, 800, 1400, 600].forEach((freq, i) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(freq, now + i * 0.08);
    gain.gain.setValueAtTime(0.06, now + i * 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.06);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now + i * 0.08);
    osc.stop(now + i * 0.08 + 0.06);
  });
};

// Dimension bar component
function DimensionBar({
  label,
  value,
  color,
  delay,
}: {
  label: string;
  value: number;
  color: string;
  delay: number;
}) {
  const [animatedWidth, setAnimatedWidth] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedWidth((value / 5) * 100);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <div className="flex items-center gap-3">
      <span className="text-[7px] tracking-[0.2em] text-[#5a5a66] uppercase w-[80px] text-right shrink-0">
        {label}
      </span>
      <div className="flex-1 h-[6px] bg-[#0a0a0e] border border-[#1a1a22] rounded-[1px] overflow-hidden shadow-inner">
        <div
          className="h-full rounded-[1px] transition-all duration-1000 ease-out"
          style={{
            width: `${animatedWidth}%`,
            background: color,
            boxShadow: `0 0 8px ${color}40`,
          }}
        />
      </div>
      <span
        className="text-[9px] tracking-[0.15em] w-[28px] text-right shrink-0"
        style={{ color, textShadow: `0 0 4px ${color}40` }}
      >
        {value.toFixed(1)}
      </span>
    </div>
  );
}

export default function Results() {
  const [, setLocation] = useLocation();
  const [results, setResults] = useState<ScoringResult | null>(null);
  const [phase, setPhase] = useState<"loading" | "reveal" | "complete">("loading");
  const [isTransmitting, setIsTransmitting] = useState(false);
  const { awardAchievement } = useGame();
  const { sessionId } = useSession();
  const { data: currentUser } = trpc.auth.me.useQuery();
  const saveAssessment = trpc.auth.saveGravitasAssessment.useMutation();

  // Auto-save for authenticated users once results are loaded
  useEffect(() => {
    if (!currentUser || !results) return;
    saveAssessment.mutate({
      sessionId,
      scanType: results.scanMode === "DEEP_SCAN" ? "deep" : "quick",
      dimensionScores: {
        identity: results.identity,
        relationship: results.relationship,
        vision: results.vision,
        culture: results.culture,
      },
      archetype: results.archetype,
      leak: results.leak,
      force: results.force,
      firstMove: results.firstMove,
      rawAnswers: {},
    });
  }, [currentUser, results]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const stored =
      localStorage.getItem("gravityCheckResults") ||
      localStorage.getItem("gravity_check_results");
    if (stored) {
      setResults(JSON.parse(stored));
      // Award "Field Operative" achievement for completing a Gravitas scan
      awardAchievement("field-operative");
      // Staged reveal
      setTimeout(() => {
        playRevealSound();
        setPhase("reveal");
      }, 800);
      setTimeout(() => setPhase("complete"), 2500);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSideChain = () => {
    setIsTransmitting(true);
    playTransmitSound();
    setTimeout(() => {
      let bottleneck = "CULTURE";
      if (results) {
        const scores = [
          { id: "IDENTITY", val: results.identity },
          { id: "RELATIONSHIP", val: results.relationship },
          { id: "VISION", val: results.vision },
          { id: "CULTURE", val: results.culture },
        ];
        scores.sort((a, b) => a.val - b.val);
        bottleneck = scores[0].id;
      }
      const firstMove = results?.firstMove ? encodeURIComponent(results.firstMove) : "";
      setLocation(`/workbench/codex?signal=received&bottleneck=${bottleneck}&firstMove=${firstMove}`);
    }, 1500);
  };

  // Loading state
  if (!results || phase === "loading") {
    return (
      <GravitasShell
        status="PROCESSING FIELD DATA..."
        statusColor="text-amber-400 animate-pulse"
        signalCategory="IDENTITY"
        progress={1}
        totalQuestions={20}
      >
        <div className="flex flex-col items-center justify-center h-full gap-4 relative z-10">
          <div className="relative w-16 h-16">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="absolute inset-0 rounded-full border border-green-400/20"
                style={{
                  animation: `gravitas-scan-ring 2s ease-in-out infinite ${i * 0.5}s`,
                }}
              />
            ))}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_12px_rgba(74,222,128,0.5)] animate-pulse" />
            </div>
          </div>
          <div
            className="text-[9px] tracking-[0.3em] text-green-400/60 uppercase"
            style={{ textShadow: "0 0 4px rgba(74,222,128,0.2)" }}
          >
            COMPUTING GRAVITATIONAL FIELD...
          </div>
        </div>
        <style>{`
          @keyframes gravitas-scan-ring {
            0% { transform: scale(0.5); opacity: 0.8; }
            100% { transform: scale(2); opacity: 0; }
          }
        `}</style>
      </GravitasShell>
    );
  }

  // Determine colors
  const getArchetypeColor = () => {
    if (results.total < 2.0) return "#ef4444"; // red
    if (results.total < 2.8) return "#f97316"; // orange
    if (results.total < 3.5) return "#eab308"; // yellow
    if (results.total < 4.2) return "#4ade80"; // green
    return "#22d3ee"; // cyan
  };

  const archetypeColor = getArchetypeColor();

  const footerControls = (
    <div className="flex items-center gap-2">
      {/* Path 1: Side-chain to Codex — "Get a Move" */}
      <button
        onClick={handleSideChain}
        disabled={isTransmitting}
        className={cn(
          "group flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-b from-[#1a1a20] to-[#141418] border rounded-[2px] transition-all duration-150",
          isTransmitting
            ? "border-amber-500/40 shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
            : "hover:border-[rgba(197,160,89,0.3)] hover:shadow-[0_0_12px_rgba(197,160,89,0.08)] active:translate-y-[1px] active:shadow-none",
          !isTransmitting && "sidechain-glow"
        )}
      >
        <span
          className={cn(
            "text-[8px] tracking-[0.2em] uppercase transition-colors",
            isTransmitting
              ? "text-amber-400 animate-pulse"
              : "sidechain-glow-text group-hover:text-[#c5a059]"
          )}
        >
          {isTransmitting ? "TRANSMITTING..." : "GET A MOVE"}
        </span>
      </button>
      {/* Path 2: Go Deeper — Mirror */}
      <Link href="/workbench/mirror">
        <span className="group flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-b from-[#1a1a20] to-[#141418] border border-[#1a1a22] rounded-[2px] transition-all duration-150 hover:border-[rgba(167,139,250,0.3)] hover:shadow-[0_0_12px_rgba(167,139,250,0.08)] active:translate-y-[1px] active:shadow-none cursor-pointer">
          <span className="text-[8px] tracking-[0.2em] uppercase text-[#5a5a66] group-hover:text-[#a78bfa] transition-colors">
            GO DEEPER
          </span>
        </span>
      </Link>
      <Link href="/workbench/gravitas">
        <span className="text-[7px] tracking-[0.15em] text-[#5a5a66] hover:text-[#7a7a8a] cursor-pointer uppercase transition-colors">
          RE-SCAN
        </span>
      </Link>
    </div>
  );

  return (
    <DesktopOnly toolName="Gravitas Results">
    <GravitasShell
      results
      footerControls={footerControls}
      status="FIELD ANALYSIS COMPLETE"
      statusColor="text-green-400"
      signalCategory={results.force}
      progress={1}
      totalQuestions={20}
      hideCalStamp
    >
      {/* Results Layout — scrollable within instrument area */}
      <div className="h-full overflow-y-auto overflow-x-hidden custom-scrollbar relative z-10 pr-1">
        <div className="flex flex-col gap-4 py-2">

          {/* ROW 1: Archetype + Dimension Bars */}
          <div className="grid grid-cols-[1fr_1fr] gap-4">
            {/* Archetype Card */}
            <div className="bg-gradient-to-b from-[#0e0e12] to-[#0a0a0d] border border-[#1a1a22] rounded p-3 relative overflow-hidden">
              {/* Glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at center, ${archetypeColor}08 0%, transparent 70%)`,
                }}
              />
              <div className="relative z-10">
                <div className="text-[6px] tracking-[0.3em] text-[#5a5a66] uppercase mb-1">
                  DETECTED ORBIT
                </div>
                <div
                  className={cn(
                    "text-[14px] tracking-[0.2em] uppercase font-bold mb-2 transition-all duration-1000",
                    phase === "reveal" || phase === "complete"
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2"
                  )}
                  style={{
                    color: archetypeColor,
                    textShadow: `0 0 12px ${archetypeColor}60, 0 0 30px ${archetypeColor}20`,
                  }}
                >
                  {results.archetype}
                </div>
                <div className="text-[8px] leading-[1.9] text-[#8a8a96] tracking-[0.05em]">
                  {results.description}
                </div>
                {/* Total Score */}
                <div className="mt-2 pt-2 border-t border-white/[0.03] flex items-center gap-2">
                  <span className="text-[6px] tracking-[0.2em] text-[#5a5a66] uppercase">
                    FIELD STRENGTH
                  </span>
                  <span
                    className="text-[12px] tracking-[0.1em] font-bold"
                    style={{
                      color: archetypeColor,
                      textShadow: `0 0 6px ${archetypeColor}40`,
                    }}
                  >
                    {results.total}
                  </span>
                  <span className="text-[6px] text-[#5a5a66]">/ 5.0</span>
                </div>
              </div>
            </div>

            {/* Dimension Bars */}
            <div className="bg-gradient-to-b from-[#0e0e12] to-[#0a0a0d] border border-[#1a1a22] rounded p-3 flex flex-col justify-center gap-2.5">
              <div className="text-[6px] tracking-[0.3em] text-[#5a5a66] uppercase mb-1">
                DIMENSIONAL FIELD MAP
              </div>
              <DimensionBar
                label="IDENTITY"
                value={results.identity}
                color="#4ade80"
                delay={400}
              />
              <DimensionBar
                label="RELATIONSHIP"
                value={results.relationship}
                color="#22d3ee"
                delay={600}
              />
              <DimensionBar
                label="VISION"
                value={results.vision}
                color="#c5a059"
                delay={800}
              />
              <DimensionBar
                label="CULTURE"
                value={results.culture}
                color="#a78bfa"
                delay={1000}
              />
            </div>
          </div>

          {/* ROW 2: Leak + Force */}
          <div className="grid grid-cols-[1fr_1fr] gap-4">
            {/* Leak */}
            <div className="bg-gradient-to-b from-[#0e0e12] to-[#0a0a0d] border border-[#1a1a22] rounded p-3 relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none" style={{
                background: "radial-gradient(ellipse at center, rgba(239,68,68,0.03) 0%, transparent 70%)",
              }} />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.5)] animate-pulse" />
                  <span className="text-[6px] tracking-[0.3em] text-red-400/60 uppercase">
                    PRIMARY LEAK DETECTED
                  </span>
                </div>
                <div className="text-[8px] leading-[1.9] text-[#8a8a96] tracking-[0.05em]">
                  {results.leakDescription}
                </div>
              </div>
            </div>

            {/* Force */}
            <div className="bg-gradient-to-b from-[#0e0e12] to-[#0a0a0d] border border-[#1a1a22] rounded p-3 relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none" style={{
                background: "radial-gradient(ellipse at center, rgba(74,222,128,0.03) 0%, transparent 70%)",
              }} />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.5)]" />
                  <span className="text-[6px] tracking-[0.3em] text-green-400/60 uppercase">
                    DOMINANT FORCE
                  </span>
                </div>
                <div className="text-[8px] leading-[1.9] text-[#8a8a96] tracking-[0.05em]">
                  {results.forceDescription}
                </div>
              </div>
            </div>
          </div>

          {/* ROW 3: First Move */}
          <div className="bg-gradient-to-b from-[#0e0e12] to-[#0a0a0d] border border-[#1a1a22] rounded p-3 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none" style={{
              background: "radial-gradient(ellipse at center, rgba(197,160,89,0.03) 0%, transparent 70%)",
            }} />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#c5a059] shadow-[0_0_6px_rgba(197,160,89,0.5)]" />
                <span className="text-[6px] tracking-[0.3em] text-[#c5a059]/60 uppercase">
                  PRESCRIBED FIRST MOVE
                </span>
              </div>
              <div
                className="text-[10px] tracking-[0.15em] text-[#c5a059] uppercase mb-1.5 font-bold"
                style={{ textShadow: "0 0 6px rgba(197,160,89,0.3)" }}
              >
                {results.firstMove}
              </div>
              <div className="text-[8px] leading-[1.9] text-[#8a8a96] tracking-[0.05em]">
                {results.firstMoveDescription}
              </div>
            </div>
          </div>

          {/* Save Reading Prompt */}
          {/* SECTIONS 6–10: Interpretive Reading */}
          {(() => {
            const profile = results.scanMode === "DEEP_SCAN" ? getGravitasProfile(results.archetype, results.leak) : null;
            if (!profile) {
              return (
                <div className="bg-gradient-to-b from-[#0e0e12] to-[#0a0a0d] border border-[#1a1a22] rounded p-3 relative overflow-hidden">
                  <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(197,160,89,0.03) 0%, transparent 70%)" }} />
                  <div className="relative z-10 flex flex-col items-center gap-2 py-1">
                    <p className="text-[8px] leading-[1.9] text-[#5a5a66] tracking-[0.05em] italic text-center">
                      The full reading is available with the Deep Scan — 52 questions, ~12 min.
                    </p>
                    <Link href="/workbench/gravitas?continue=true">
                      <span className="text-[7px] tracking-[0.2em] uppercase text-[#c5a059]/60 hover:text-[#c5a059] cursor-pointer transition-colors border border-[#c5a059]/20 hover:border-[#c5a059]/40 px-2.5 py-1 rounded-[2px]">
                        CONTINUE TO DEEP SCAN →
                      </span>
                    </Link>
                  </div>
                </div>
              );
            }
            return (
              <>
                {/* Section 6 — The Compensation Pattern */}
                <div className="bg-gradient-to-b from-[#0e0e12] to-[#0a0a0d] border border-[#1a1a22] rounded p-3 relative overflow-hidden">
                  <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(197,160,89,0.04) 0%, transparent 70%)" }} />
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#c5a059] shadow-[0_0_6px_rgba(197,160,89,0.5)]" />
                      <span className="text-[6px] tracking-[0.3em] text-[#c5a059]/60 uppercase">The Compensation Pattern</span>
                    </div>
                    <div className="text-[8px] leading-[1.9] text-[#8a8a96] tracking-[0.05em] space-y-2">
                      {profile.compensationPattern.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
                    </div>
                  </div>
                </div>

                {/* Section 7 — What This Costs */}
                <div className="bg-gradient-to-b from-[#0e0e12] to-[#0a0a0d] border border-[#1a1a22] rounded p-3 relative overflow-hidden">
                  <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(239,68,68,0.03) 0%, transparent 70%)" }} />
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.5)]" />
                      <span className="text-[6px] tracking-[0.3em] text-red-400/60 uppercase">What This Costs</span>
                    </div>
                    <div className="mb-2">
                      <p className="text-[6px] tracking-[0.2em] text-red-400/40 uppercase mb-1">What it costs the people around you</p>
                      <div className="text-[8px] leading-[1.9] text-[#8a8a96] tracking-[0.05em] space-y-2">
                        {profile.costsOthers.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
                      </div>
                    </div>
                    <div className="pt-2 border-t border-white/[0.03]">
                      <p className="text-[6px] tracking-[0.2em] text-red-400/40 uppercase mb-1">What it costs you</p>
                      <div className="text-[8px] leading-[1.9] text-[#8a8a96] tracking-[0.05em] space-y-2">
                        {profile.costsYou.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 8 — What This Protects */}
                <div className="bg-gradient-to-b from-[#0e0e12] to-[#0a0a0d] border border-[#1a1a22] rounded p-3 relative overflow-hidden">
                  <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(167,139,250,0.03) 0%, transparent 70%)" }} />
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#a78bfa] shadow-[0_0_6px_rgba(167,139,250,0.5)]" />
                      <span className="text-[6px] tracking-[0.3em] text-[#a78bfa]/60 uppercase">What This Protects</span>
                    </div>
                    <div className="text-[8px] leading-[1.9] text-[#8a8a96] tracking-[0.05em] space-y-2">
                      {profile.whatThisProtects.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
                    </div>
                  </div>
                </div>

                {/* Section 9 — The Primary Invitation */}
                <div className="bg-gradient-to-b from-[#0e0e12] to-[#0a0a0d] border border-[#1a1a22] rounded p-3 relative overflow-hidden">
                  <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(34,211,238,0.03) 0%, transparent 70%)" }} />
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.5)]" />
                      <span className="text-[6px] tracking-[0.3em] text-cyan-400/60 uppercase">The Primary Invitation</span>
                    </div>
                    <div className="text-[8px] leading-[1.9] text-[#8a8a96] tracking-[0.05em] space-y-2">
                      {profile.primaryInvitation.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
                    </div>
                  </div>
                </div>

                {/* Section 10 — Why Codex Recommended This */}
                <div className="bg-gradient-to-b from-[#0e0e12] to-[#0a0a0d] border border-[#1a1a22] rounded p-3 relative overflow-hidden">
                  <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(74,222,128,0.03) 0%, transparent 70%)" }} />
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.5)]" />
                      <span className="text-[6px] tracking-[0.3em] text-green-400/60 uppercase">Why Codex Recommended This</span>
                    </div>
                    <div className="text-[8px] leading-[1.9] text-[#8a8a96] tracking-[0.05em] space-y-2">
                      {profile.codexRationale.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
                    </div>
                  </div>
                </div>
              </>
            );
          })()}

          {/* Save Reading Prompt */}
          {!currentUser ? (
            <SaveReadingPrompt
              gravitasResult={{
                scanType: results.scanMode === "DEEP_SCAN" ? "deep" : "quick",
                dimensionScores: {
                  identity: results.identity,
                  relationship: results.relationship,
                  vision: results.vision,
                  culture: results.culture,
                },
                archetype: results.archetype,
                leak: results.leak,
                force: results.force,
                firstMove: results.firstMove,
                rawAnswers: {},
              }}
            />
          ) : (
            <div className="border border-[rgba(197,160,89,0.12)] bg-[#0a0a0e] rounded-[2px] px-4 py-3 text-center">
              <p className="text-[9px] tracking-[0.2em] text-[rgba(197,160,89,0.5)]" style={{ fontFamily: "var(--font-pixel, monospace)", margin: 0 }}>
                READING SAVED TO YOUR RECORD
              </p>
            </div>
          )}

          {/* Return link */}
          <div className="text-center pt-1 pb-2">
            <Link href="/workbench">
              <span className="text-[6px] tracking-[0.2em] text-[#4a4a55] hover:text-[#5a5a66] cursor-pointer uppercase transition-colors">
                RETURN TO WORKBENCH
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Custom scrollbar + sidechain glow styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0a0a0e;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1a1a22;
          border-radius: 1px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #2a2a32;
        }
        @keyframes sidechain-pulse {
          0%, 100% {
            border-color: rgba(197,160,89,0.15);
            box-shadow: 0 0 6px rgba(197,160,89,0.06), 0 2px 4px rgba(0,0,0,0.4);
          }
          50% {
            border-color: rgba(197,160,89,0.45);
            box-shadow: 0 0 18px rgba(197,160,89,0.15), 0 0 40px rgba(197,160,89,0.06), 0 2px 4px rgba(0,0,0,0.4);
          }
        }
        .sidechain-glow {
          animation: sidechain-pulse 2.5s ease-in-out infinite;
        }
        @keyframes sidechain-text-pulse {
          0%, 100% {
            color: #5a5a66;
            text-shadow: none;
          }
          50% {
            color: #c5a059;
            text-shadow: 0 0 8px rgba(197,160,89,0.3);
          }
        }
        .sidechain-glow-text {
          animation: sidechain-text-pulse 2.5s ease-in-out infinite;
        }
      `}</style>
    </GravitasShell>
    </DesktopOnly>
  );
}
