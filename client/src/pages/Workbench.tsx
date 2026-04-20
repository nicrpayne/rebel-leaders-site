/*
 * THE WORKBENCH — /workbench
 * The Rebel OS plugin hub. Browse, filter, and launch leadership tools.
 */
import { useState, useEffect } from "react";
import { Link } from "wouter";
import PageLayout from "@/components/PageLayout";
import FadeIn from "@/components/FadeIn";
import PixelDivider from "@/components/PixelDivider";
import DialogueBox from "@/components/DialogueBox";
import { usePageTracker } from "@/hooks/usePageTracker";
import { useGame } from "@/contexts/GameContext";
import { events } from "@/lib/analytics";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/7WRWMpfknMabtFgkWWC7KJ/workbench-hero-desk_30c9a78e.png";

/* ─── Plugin Data ─── */
type PluginStatus = "ACTIVE" | "LOCKED" | "SIGNAL_DEPENDENT";
type PluginCategory = "MIRROR" | "MAP" | "MOVE" | "SIGNAL" | "COMMONS";

interface Plugin {
  id: string;
  title: string;
  category: PluginCategory;
  desc: string;
  status: PluginStatus;
  link: string;
  image: string | null;
  imageDormant?: string | null;
  imageRevealed?: string | null;
  version: string;
}

const PLUGINS: Plugin[] = [
  {
    id: "the-wall",
    title: "The Wall",
    category: "COMMONS",
    desc: "A reflection commons. Share your voice. See you are not alone.",
    status: "SIGNAL_DEPENDENT",
    link: "/workbench/wall",
    image: null,
    imageDormant: "https://pub-26b8c09d5ff84d568bb62f776d03c004.r2.dev/workbench-cards/the-wall-dormant-v4.png",
    imageRevealed: "https://pub-26b8c09d5ff84d568bb62f776d03c004.r2.dev/workbench-cards/the-wall-inhabited-v5-2.png",
    version: "V.1.0.0",
  },
  {
    id: "gravity-check",
    title: "GRAVITAS",
    category: "MIRROR",
    desc: "15 questions. 3 minutes. Reveal the hidden forces shaping your team's orbit.",
    status: "ACTIVE",
    link: "/workbench/gravitas",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/6XMovZHp9ctGFaj4XUiVdL/gravity_check_field_cover-hq3AnpZqCJZFJU9Wrxiwic.webp",
    version: "V.1.0.4",
  },
  {
    id: "mirror",
    title: "Mirror",
    category: "SIGNAL",
    desc: "Hidden until discovered.",
    status: "SIGNAL_DEPENDENT",
    link: "/workbench/mirror",
    image: null,
    imageDormant: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/5e5kxa7Hxu2DiYaSmWbPxb/mirror-cover-dormant-AbLZh9Kevt6HfMAgTuECyw.webp",
    imageRevealed: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/5e5kxa7Hxu2DiYaSmWbPxb/mirror-cover-revealed-Fyp6UxnGXZmTbrZBVjBb6Y.webp",
    version: "V.1.0.0",
  },
  {
    id: "codex",
    title: "The Codex",
    category: "MOVE",
    desc: "A library of high-leverage leadership scripts and protocols.",
    status: "ACTIVE",
    link: "/workbench/codex",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/6XMovZHp9ctGFaj4XUiVdL/codex_cover-GFY7usmeN4FzNRmJ64c5wD.webp",
    version: "V.1.0.4",
  },
  {
    id: "laas",
    title: "LaaS Calibrator",
    category: "MAP",
    desc: "Leadership As A Service. Measure your team's dependency ratio.",
    status: "LOCKED",
    link: "#",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/6XMovZHp9ctGFaj4XUiVdL/laas_calibrator_cover-YcDCAQRmWtFr53Pcpd8CL5.webp",
    version: "V.1.0.4",
  },
  {
    id: "hid-scan",
    title: "HID Scan",
    category: "MIRROR",
    desc: "Depth analysis. Measures if work is touching roots or just symptoms.",
    status: "LOCKED",
    link: "#",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/7WRWMpfknMabtFgkWWC7KJ/hid_scan_cover_a8e27ebf.webp",
    version: "V.1.0.4",
  },
  {
    id: "terrain",
    title: "The Terrain",
    category: "MAP",
    desc: "Mythic cartography. Organizations are landscapes, not flat charts.",
    status: "LOCKED",
    link: "#",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/7WRWMpfknMabtFgkWWC7KJ/terrain_cover_1e056580.jpg",
    version: "—",
  },
  {
    id: "underground",
    title: "Underground",
    category: "MAP",
    desc: "Leadership culture analysis. Map the root system beneath your team's surface.",
    status: "LOCKED",
    link: "#",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/7WRWMpfknMabtFgkWWC7KJ/underground_cover_31183985.jpg",
    version: "—",
  },
  {
    id: "astrolabe",
    title: "Astrolabe",
    category: "MIRROR",
    desc: "Vocational bearing. Find true north when everything around you is spinning.",
    status: "LOCKED",
    link: "#",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/7WRWMpfknMabtFgkWWC7KJ/astrolabe_cover_95fbbeb7.jpg",
    version: "—",
  },
  {
    id: "drift",
    title: "Drift",
    category: "MAP",
    desc: "Orbital alignment. Declared center vs. actual center. See where the system is really pulling.",
    status: "LOCKED",
    link: "#",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/7WRWMpfknMabtFgkWWC7KJ/drift_cover_dc876c35.jpg",
    version: "—",
  },
  {
    id: "leak-finder",
    title: "Leak Finder",
    category: "SIGNAL",
    desc: "Fault detection. Where the system is bleeding trust, clarity, or energy.",
    status: "LOCKED",
    link: "#",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/7WRWMpfknMabtFgkWWC7KJ/leak_finder_cover_v2_5efb7e41.jpg",
    version: "—",
  },
  {
    id: "eye",
    title: "EYE",
    category: "MIRROR",
    desc: "Inner climate scan. Read the pressure system moving through you before it moves through your team.",
    status: "LOCKED",
    link: "#",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/7WRWMpfknMabtFgkWWC7KJ/eye_cover_v2_c9db526c.jpg",
    version: "—",
  },
  {
    id: "prism",
    title: "Prism",
    category: "SIGNAL",
    desc: "Conflict refraction. See what's really hiding inside the signal before you react.",
    status: "LOCKED",
    link: "#",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/7WRWMpfknMabtFgkWWC7KJ/prism_cover_v2_7264cb05.jpg",
    version: "—",
  },
  {
    id: "signal-decoder",
    title: "Signal Decoder",
    category: "SIGNAL",
    desc: "Signal analysis. Translating recurring tensions into truth.",
    status: "LOCKED",
    link: "#",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/7WRWMpfknMabtFgkWWC7KJ/signal_decoder_cover_v1_e83fe0fa.jpg",
    version: "—",
  },
  {
    id: "move-matcher",
    title: "Move Matcher",
    category: "MOVE",
    desc: "Tactical routing. Fitting the right move to the actual rupture.",
    status: "LOCKED",
    link: "#",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/7WRWMpfknMabtFgkWWC7KJ/move_matcher_cover_v2_4efd9f3f.jpg",
    version: "—",
  },
  {
    id: "field-notes",
    title: "Field Notes",
    category: "SIGNAL",
    desc: "Expedition log. Reflection as formation.",
    status: "LOCKED",
    link: "#",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/7WRWMpfknMabtFgkWWC7KJ/field_notes_cover_v3_8603f66f.jpg",
    version: "—",
  },
  {
    id: "praxis-builder",
    title: "Praxis Builder",
    category: "MOVE",
    desc: "Action sequencer. Transformation through repeated embodied practice.",
    status: "LIVE",
    link: "/workbench/praxis",
    image: "https://pub-26b8c09d5ff84d568bb62f776d03c004.r2.dev/workbench-cards/Praxis%20workbench%20card.png",
    version: "—",
  },
];

const CATEGORIES = ["ALL", "MIRROR", "SIGNAL", "MAP", "MOVE", "COMMONS"] as const;
const STATUSES = ["ALL", "ACTIVE", "LOCKED"] as const;

export default function Workbench() {
  usePageTracker("workbench");
  const { awardAchievement } = useGame();

  useEffect(() => {
    awardAchievement("toolsmith");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [activeStatus, setActiveStatus] = useState<string>("ALL");

  const hasGravitasSignal =
    typeof window !== "undefined" &&
    !!localStorage.getItem("gravityCheckResults");

  const hasSubmittedToWall =
    typeof window !== "undefined" &&
    Object.keys(localStorage).some((key) => key.startsWith("wall_submitted_"));

  const isPluginActive = (p: Plugin) => {
    if (p.status === "ACTIVE") return true;
    if (p.status === "SIGNAL_DEPENDENT") {
      if (p.id === "the-wall") return hasSubmittedToWall;
      return hasGravitasSignal;
    }
    return false;
  };

  const filtered = PLUGINS.filter((p) => {
    const catMatch = activeCategory === "ALL" || p.category === activeCategory;
    const effectiveStatus = isPluginActive(p) ? "ACTIVE" : "LOCKED";
    const statMatch = activeStatus === "ALL" || effectiveStatus === activeStatus;
    return catMatch && statMatch;
  });

  const activeCount = PLUGINS.filter(isPluginActive).length;
  const lockedCount = PLUGINS.filter((p) => !isPluginActive(p)).length;

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0 opacity-50">
          <img src={HERO_IMG} alt="" className="w-full h-full object-cover pixel-render" loading="lazy" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/55 to-background" />
        <div className="relative z-10 container text-center">
          <FadeIn>
            <p className="font-pixel text-[9px] tracking-[0.3em] text-gold/60 mb-4">THE WORKBENCH</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <h1 className="font-display text-4xl md:text-6xl font-semibold text-parchment mb-4 leading-tight">
              Tools for the
              <br />
              <span className="italic font-normal text-parchment-dim">working rebel.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="font-display text-lg md:text-xl text-parchment-dim/70 max-w-2xl mx-auto leading-relaxed">
              Diagnostic instruments, protocol libraries, and field equipment.
              <br className="hidden md:block" />
              Each one built to surface what most leadership tools avoid.
            </p>
          </FadeIn>
        </div>
      </section>

      <PixelDivider />

      {/* Dialogue Box */}
      <section className="container py-8">
        <FadeIn>
          <DialogueBox speaker="THE QUARTERMASTER">
            These aren't productivity hacks. They're instruments of clarity. Gravitas will show you where your team is leaking energy. The Codex will hand you the protocol to fix it. The rest? They're being forged. Subscribe to know when new tools drop.
          </DialogueBox>
        </FadeIn>
      </section>

      {/* Filter + Cards */}
      <section className="container pb-24">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Sidebar */}
          <FadeIn>
            <aside className="md:w-48 shrink-0">
              <div className="mb-8">
                <p className="font-pixel text-[8px] tracking-[0.3em] text-gold/80 mb-3">CATEGORIES</p>
                <div className="space-y-1 border-l border-gold/20 pl-4">
                  {CATEGORIES.map((cat) => (
                    <div
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`font-display text-lg py-1 cursor-pointer transition-all duration-200 relative ${
                        activeCategory === cat
                          ? "text-gold font-semibold"
                          : "text-parchment-dim/50 hover:text-parchment-dim"
                      }`}
                    >
                      {activeCategory === cat && (
                        <span className="absolute -left-[19px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-gold rounded-full" />
                      )}
                      {cat}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-pixel text-[8px] tracking-[0.3em] text-gold/80 mb-3">STATUS</p>
                <div className="space-y-1 border-l border-gold/20 pl-4">
                  {STATUSES.map((stat) => {
                    const count = stat === "ALL" ? PLUGINS.length : stat === "ACTIVE" ? activeCount : lockedCount;
                    return (
                      <div
                        key={stat}
                        onClick={() => setActiveStatus(stat)}
                        className={`font-display text-lg py-1 cursor-pointer transition-all duration-200 relative ${
                          activeStatus === stat
                            ? "text-gold font-semibold"
                            : "text-parchment-dim/50 hover:text-parchment-dim"
                        }`}
                      >
                        {activeStatus === stat && (
                          <span className="absolute -left-[19px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-gold rounded-full" />
                        )}
                        {stat}
                        <span className="text-parchment-dim/30 text-sm ml-2">({count})</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </aside>
          </FadeIn>

          {/* Grid */}
          <div className="flex-1">
            {(() => {
              const personalPlugins = filtered.filter((p) => p.category !== "COMMONS");
              const communalPlugins = filtered.filter((p) => p.category === "COMMONS");
              const showCommons = communalPlugins.length > 0 && (activeCategory === "ALL" || activeCategory === "COMMONS");

              return (
                <>
                  {showCommons && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {communalPlugins.map((plugin, i) => (
                        <FadeIn key={plugin.id} delay={i * 0.05}>
                          <PluginCard plugin={plugin} hasGravitasSignal={hasGravitasSignal} hasSubmittedToWall={hasSubmittedToWall} />
                        </FadeIn>
                      ))}
                    </div>
                  )}

                  {showCommons && personalPlugins.length > 0 && (
                    <div className="my-6">
                      <div className="w-full h-px bg-gold/10" />
                    </div>
                  )}

                  {personalPlugins.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {personalPlugins.map((plugin, i) => (
                        <FadeIn key={plugin.id} delay={i * 0.05}>
                          <PluginCard plugin={plugin} hasGravitasSignal={hasGravitasSignal} hasSubmittedToWall={hasSubmittedToWall} />
                        </FadeIn>
                      ))}
                    </div>
                  )}

                  {filtered.length === 0 && (
                    <div className="text-center py-16">
                      <p className="font-pixel text-[9px] tracking-[0.2em] text-parchment-dim/40">
                        NO PLUGINS MATCH CURRENT FILTERS
                      </p>
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

/* ─── Plugin Card ─── */
function PluginCard({ plugin, hasGravitasSignal, hasSubmittedToWall }: {
  plugin: Plugin;
  hasGravitasSignal: boolean;
  hasSubmittedToWall: boolean;
}) {
  const isMirror = plugin.id === "mirror";
  const mirrorRevealed = isMirror && hasGravitasSignal;
  const mirrorDormant = isMirror && !hasGravitasSignal;

  const isWall = plugin.id === "the-wall";
  const wallRevealed = isWall && hasSubmittedToWall;
  const wallDormant = isWall && !hasSubmittedToWall;

  const isActive = plugin.status === "ACTIVE" || mirrorRevealed || wallRevealed;
  const isDormant = mirrorDormant || wallDormant;
  const hasImage = !!(plugin.image || ((isMirror || isWall) && (plugin.imageDormant || plugin.imageRevealed)));

  const effectiveImage = isMirror
    ? mirrorRevealed ? plugin.imageRevealed : plugin.imageDormant
    : isWall
    ? wallRevealed ? plugin.imageRevealed : plugin.imageDormant
    : plugin.image;

  const badgeText = mirrorRevealed || wallRevealed
    ? "SIGNAL RECEIVED"
    : mirrorDormant
    ? "AWAITING SIGNAL"
    : wallDormant
    ? "AWAITING FIRST VOICE"
    : plugin.status;

  const footerHint = mirrorDormant
    ? "RUN GRAVITAS TO UNLOCK"
    : wallDormant
    ? "CONTRIBUTE TO UNLOCK"
    : null;

  const cardContent = (
    <div
      onClick={!isActive && !isWall ? () => events.workbenchLockedClicked(plugin.id) : undefined}
      className={`group relative bg-card border transition-all duration-500 flex flex-col h-full ${
        mirrorRevealed || wallRevealed
          ? "border-gold/50 cursor-pointer hover:-translate-y-1 hover:shadow-[0_0_40px_-8px_rgba(197,160,89,0.35)] hover:border-gold"
          : isDormant
          ? "border-gold/10 cursor-default opacity-80 animate-pulse"
          : isActive
          ? "border-gold/20 cursor-pointer hover:-translate-y-1 hover:shadow-[0_0_30px_-10px_rgba(197,160,89,0.2)] hover:border-gold/50"
          : hasImage
          ? "border-gold/20 opacity-95 grayscale-[0.08] cursor-default hover:opacity-100 hover:grayscale-0"
          : "border-gold/20 opacity-65 grayscale-[0.3] cursor-default"
      }`}
    >
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-gold/40 group-hover:border-gold/80 transition-colors" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-gold/40 group-hover:border-gold/80 transition-colors" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-gold/40 group-hover:border-gold/80 transition-colors" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-gold/40 group-hover:border-gold/80 transition-colors" />

      {/* Cover */}
      <div className="relative aspect-[4/3] overflow-hidden bg-forest-deep">
        {effectiveImage ? (
          <img
            src={effectiveImage}
            alt={plugin.title}
            className={`w-full h-full object-cover transition-all duration-700 ${
              isDormant
                ? "opacity-60 grayscale-[0.2]"
                : "group-hover:scale-105"
            }`}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-forest-deep to-forest">
            <div className="text-center">
              <div className="font-pixel text-[8px] text-gold/20 tracking-[0.3em] mb-2">INCOMING</div>
              <div className="w-8 h-[1px] bg-gold/10 mx-auto" />
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-display text-xl text-parchment font-semibold tracking-wide">
            {plugin.title}
          </h3>
          <span
            className={`font-pixel text-[7px] tracking-[0.2em] px-2 py-1 shrink-0 ml-2 -mt-1 -mr-1 border ${
              mirrorRevealed || wallRevealed
                ? "bg-gold/15 text-gold border-gold/40"
                : isDormant
                ? "bg-card text-gold/30 border-gold/15"
                : isActive
                ? "bg-gold/15 text-gold border-gold/30"
                : "bg-red-900/20 text-red-400/80 border-red-500/30"
            }`}
          >
            {badgeText}
          </span>
        </div>
        <p className="font-pixel text-[7px] tracking-[0.15em] text-gold-dim/60 mb-3">
          {plugin.category} &nbsp;// &nbsp;{plugin.version}
        </p>
        <p className={`font-display text-sm leading-relaxed flex-1 ${
          isActive ? "text-parchment-dim/60" : hasImage ? "text-parchment-dim/70" : "text-parchment-dim/50"
        }`}>
          {plugin.desc}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gold/10">
          <span className="font-pixel text-[7px] tracking-[0.2em] text-parchment-dim/30">REBEL OS</span>
          {footerHint ? (
            <span className="font-pixel text-[7px] tracking-[0.15em] text-gold/30">
              {footerHint}
            </span>
          ) : isActive ? (
            <span className="font-pixel text-[8px] tracking-[0.2em] text-gold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              LAUNCH &rarr;
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );

  if (isActive || isWall) {
    return <Link href={plugin.link}>{cardContent}</Link>;
  }
  return cardContent;
}

