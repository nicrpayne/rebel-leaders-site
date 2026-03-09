/**
 * Hidden Assets Gallery — /hidden-assets
 * Not linked in navigation. A utility page for browsing, downloading,
 * and referencing every generated image asset used in the project.
 */

import { useState, useMemo } from "react";
import { Download, Search, Copy, Check, ExternalLink } from "lucide-react";
import { toast } from "sonner";

/* ─── Asset Registry ─── */
interface Asset {
  id: string;
  name: string;
  description: string;
  category: "scene" | "sprite" | "texture" | "ui" | "standalone";
  url: string;
  usedIn: string[];
}

const ASSETS: Asset[] = [
  // ── Scenes ──
  {
    id: "rpg-office",
    name: "RPG Office / Study",
    description: "Isometric pixel art of Nic's study — desk, guitar, bookshelves, lamp. The primary hero scene.",
    category: "scene",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/zlNQJQinSxaqyYjB.png",
    usedIn: ["Home", "Mirror", "Residency", "StartHere"],
  },
  {
    id: "rpg-bookshelf",
    name: "RPG Bookshelf Close-up",
    description: "Pixel art close-up of the bookshelf wall with framed art and collectibles.",
    category: "scene",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/ytcCyobGtInvqMUp.png",
    usedIn: ["Home"],
  },
  {
    id: "rpg-banner",
    name: "RPG Banner / Landscape",
    description: "Wide pixel art banner scene used for Archives and Game pages.",
    category: "scene",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/NOhnYtwgYOzpzngc.png",
    usedIn: ["Archives", "Game"],
  },
  {
    id: "bookshelf-shelf",
    name: "Bookshelf (The Shelf)",
    description: "Straight-on bookshelf photograph/art for The Shelf page header.",
    category: "scene",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/fHPXctuxSsjvwkhg.png",
    usedIn: ["Shelf"],
  },
  {
    id: "bookshelf-about",
    name: "Bookshelf (About / Armory)",
    description: "Bookshelf scene used on About and Armory pages.",
    category: "scene",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/yIOHdhgRJwHhvBLy.png",
    usedIn: ["About", "Armory"],
  },
  {
    id: "scroll-map",
    name: "Scroll / Map",
    description: "Parchment scroll or map image used on Book and Manifesto pages.",
    category: "scene",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/LJSaRbdurtjnmgoI.png",
    usedIn: ["Book", "Manifesto"],
  },
  {
    id: "tavern",
    name: "Tavern / Gathering",
    description: "Pixel art tavern scene for the Community (coming soon) page.",
    category: "scene",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/ZrwcxbsbnbgzlVax.png",
    usedIn: ["Community"],
  },
  // ── Character Art ──
  {
    id: "nic-portrait",
    name: "Nic Pixel Portrait",
    description: "Pixel art portrait of Nic — transparent background, used as character sprite on About and StartHere.",
    category: "sprite",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/oCdVePFazaeRgvNO.png",
    usedIn: ["About", "StartHere"],
  },
  // ── Game Sprites ──
  {
    id: "nic-run",
    name: "Nic Run Sprite Sheet",
    description: "4-frame running animation sprite sheet — Nic with lightsaber.",
    category: "sprite",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/UpbgmXKMNsNjpnpu.png",
    usedIn: ["ManifestoRunner"],
  },
  {
    id: "nic-jump",
    name: "Nic Jump Sprite Sheet",
    description: "Jump animation sprite sheet for the side-scroller game.",
    category: "sprite",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/XLuyIUSYWidBHSap.png",
    usedIn: ["ManifestoRunner"],
  },
  {
    id: "nic-idle",
    name: "Nic Idle Sprite Sheet",
    description: "Idle stance sprite sheet for the side-scroller game.",
    category: "sprite",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/WHwqHpqvQUlZmkTM.png",
    usedIn: ["ManifestoRunner"],
  },
  {
    id: "nic-victory",
    name: "Nic Victory Pose",
    description: "Victory celebration sprite for end-of-level in the side-scroller.",
    category: "sprite",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/gEUSBozlhzsCUQVp.png",
    usedIn: ["ManifestoRunner"],
  },
  {
    id: "goomba",
    name: "Quick Meeting Goomba",
    description: "Enemy sprite — the 'Quick Meeting' goomba that walks toward you.",
    category: "sprite",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/nBERaIlYpCEOiWnP.png",
    usedIn: ["ManifestoRunner"],
  },
  {
    id: "bat",
    name: "Slack Ping Bat",
    description: "Enemy sprite — the 'Slack Ping' bat that flies overhead.",
    category: "sprite",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/SYHEtkMnhFfFNKbp.png",
    usedIn: ["ManifestoRunner"],
  },
  {
    id: "turtle",
    name: "Policy Turtle",
    description: "Enemy sprite — the 'Policy Turtle' that blocks your path.",
    category: "sprite",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/tAUdctTTtbAZnbfH.png",
    usedIn: ["ManifestoRunner"],
  },
  {
    id: "brick",
    name: "Buzzword Brick",
    description: "Block sprite — breakable 'Buzzword Brick' blocks in the side-scroller.",
    category: "sprite",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/CZIKNFXWjzlvpjEI.png",
    usedIn: ["ManifestoRunner"],
  },
  {
    id: "flag",
    name: "Victory Flag",
    description: "End-of-level victory flag sprite.",
    category: "sprite",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/XErroFrcgEbnlBdi.png",
    usedIn: ["ManifestoRunner"],
  },
  // ── Textures & Decorative ──
  {
    id: "hope-rebellious",
    name: "Hope Is Rebellious (8-bit)",
    description: "Pixel art 'Hope Is Rebellious' banner image used in the Manifesto.",
    category: "texture",
    url: "https://private-us-east-1.manuscdn.com/sessionFile/xhIF6cqEZNRR3ezVrvcq6V/sandbox/XEp7JhlUZSYOHCylU47BD6-img-1_1771697605000_na1fn_aG9wZS1pcy1yZWJlbGxpb3VzLThiaXQ.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUveGhJRjZjcUVaTlJSM2V6VnJ2Y3E2Vi9zYW5kYm94L1hFcDdKaGxVWlNZT0hDeWxVNDdCRDYtaW1nLTFfMTc3MTY5NzYwNTAwMF9uYTFmbl9hRzl3WlMxcGN5MXlaV0psYkd4cGIzVnpMVGhpYVhRLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=lH4pj8IuTDz9V4l5t11urTdwZmR9CfGvggQo5mmZXCFAeXukFYnVCXDtB4E7K1CWCC76~MxTT5rGi0NzR7ufrH9pxayb0hJp6zip4w2dBiiNoT5Zc3F~dCOlXbHLzZcg6UpUdhlhNStkT~5xZPi2lMfh0QDdG~9ZVio6KKd4GFHhm-GVgFyVBQ6LpN6cMQhseN72xgKBnWS-6nCfL0CXECfXkRqAPDxZXb2LZA7YAbEs7ng06wDxJ6MpWHXoz6spI1XkCUXDObZftbQgOrl2AJ6BaG2zIdpRZcaH-4h4rLFjrwRz97YZucLplxgPuYjRipSt0cB3oZkzSWpTDJKIoA__",
    usedIn: ["Manifesto"],
  },
  {
    id: "ember-texture",
    name: "Ember Section Texture",
    description: "Warm ember/fire texture used as section background on the Home page.",
    category: "texture",
    url: "https://private-us-east-1.manuscdn.com/sessionFile/xhIF6cqEZNRR3ezVrvcq6V/sandbox/cLlPwzBL30WhHHj2soLbdt-img-2_1771637252000_na1fn_c2VjdGlvbi1lbWJlci10ZXh0dXJl.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUveGhJRjZjcUVaTlJSM2V6VnJ2Y3E2Vi9zYW5kYm94L2NMbFB3ekJMMzBXaEhIajJzb0xiZHQtaW1nLTJfMTc3MTYzNzI1MjAwMF9uYTFmbl9jMlZqZEdsdmJpMWxiV0psY2kxMFpYaDBkWEpsLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=M4WZy1Lubw4lUZg-xkYa~3KnlMQoGJlZcqOujMhLv-HZHaL3oWFqAgMHgwZFQS~uvVL-uAX4opiGGBzwFXqZlaKDMyYmbKfbzwZy9X4UiX-LIZy~ymHGGhW8mAFRQk1zNs-ROgt8ftpo~5yP~DVqQFXqN3tM7pjR6ZKorjnOj61QGAhF-El0hjRIRFC30KZW1f7X7TQPADPpcb5PtstkU4yxTflVp1wZci9ho0t5UQL90u~yfcpxBV-6H9wJaYbxrs2YRRgAiCQ7bCEZVJ6e~4SE7Zl5Tx2J5q6pjLM4H62p~4CEX8T-47eqdNCVuNUsleO8w~IpN-axBxa09K12YQ__",
    usedIn: ["Home"],
  },
  {
    id: "stained-glass",
    name: "Stained Glass Divider",
    description: "Decorative stained glass section divider element.",
    category: "texture",
    url: "https://private-us-east-1.manuscdn.com/sessionFile/xhIF6cqEZNRR3ezVrvcq6V/sandbox/cLlPwzBL30WhHHj2soLbdt-img-4_1771637262000_na1fn_c3RhaW5lZC1nbGFzcy1kaXZpZGVy.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUveGhJRjZjcUVaTlJSM2V6VnJ2Y3E2Vi9zYW5kYm94L2NMbFB3ekJMMzBXaEhIajJzb0xiZHQtaW1nLTRfMTc3MTYzNzI2MjAwMF9uYTFmbl9jM1JoYVc1bFpDMW5iR0Z6Y3kxa2FYWnBaR1Z5LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=PSUTSPgRrwSLsgxvNGnLDiFx60fCFrFXZB8zX29uLck28Q7jxlKFlePatFsMu8PPAc8-sSJYHnWowvNj9vly9gxAcxqAX7II9tNFVBzE6tQgQsQXSRP2YorHp7q-~hBoQ17ntfxgiSHdcy89sQiTs0Vye26wlpRxnVdI7SwtLkBy6FTlHOW-XBiEmQkxWlgdZciiPpdWvUlbsxK84c-aG0AWi02MYDCV5XhZ75LOUQ-hwEnSjP7AlJkzz3KZR08CEUsjMVgqAWyLvROu95fvaVI2n3k9jhclKPCNwYuNzJv~VSWK0TeqO0GLw5332fVQNhCQUE8WkQeSj1mZCJU0nw__",
    usedIn: ["StainedGlassDivider"],
  },
  // ── Standalone / Not Yet In Site ──
  {
    id: "collectible-sword",
    name: "Collectible Sword on Stand",
    description: "16-bit pixel art of a glowing golden lightsaber on a V-shaped display stand. 'Solar Blade' collectible.",
    category: "standalone",
    url: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/7WRWMpfknMabtFgkWWC7KJ/collectible-sword-shelf-TT6s5y6jYZVDCSiQYzjaok.png",
    usedIn: [],
  },
];

const CATEGORY_LABELS: Record<Asset["category"], string> = {
  scene: "Scenes & Backgrounds",
  sprite: "Character & Game Sprites",
  texture: "Textures & Decorative",
  ui: "UI Elements",
  standalone: "Standalone / Unused",
};

const CATEGORY_ORDER: Asset["category"][] = ["scene", "sprite", "texture", "ui", "standalone"];

export default function HiddenAssets() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Asset["category"] | "all">("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return ASSETS.filter((a) => {
      const matchesSearch =
        !search ||
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.description.toLowerCase().includes(search.toLowerCase()) ||
        a.usedIn.some((u) => u.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory = activeCategory === "all" || a.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  const grouped = useMemo(() => {
    const groups: Record<string, Asset[]> = {};
    for (const a of filtered) {
      if (!groups[a.category]) groups[a.category] = [];
      groups[a.category].push(a);
    }
    return groups;
  }, [filtered]);

  const copyUrl = (asset: Asset) => {
    navigator.clipboard.writeText(asset.url);
    setCopiedId(asset.id);
    toast.success("URL copied to clipboard");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const downloadAsset = (asset: Asset) => {
    const link = document.createElement("a");
    link.href = asset.url;
    link.download = `${asset.id}.png`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const usedCategories = CATEGORY_ORDER.filter((c) =>
    ASSETS.some((a) => a.category === c)
  );

  return (
    <div className="min-h-screen bg-forest-deep text-parchment-dim">
      {/* Header */}
      <div className="border-b border-gold/20 bg-forest/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
            <div className="flex items-center gap-3">
              <h1
                className="text-gold text-xs sm:text-sm tracking-[0.2em] uppercase"
                style={{ fontFamily: "var(--font-pixel)" }}
              >
                Asset Vault
              </h1>
              <span
                className="text-gold-dim text-[10px] border border-gold/30 px-2 py-0.5 rounded"
                style={{ fontFamily: "var(--font-pixel)" }}
              >
                {ASSETS.length} items
              </span>
            </div>
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-dim" />
              <input
                type="text"
                placeholder="Search assets..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-forest-deep/60 border border-gold/20 rounded-md pl-10 pr-4 py-2 text-sm text-parchment placeholder:text-parchment-dim/40 focus:outline-none focus:border-gold/50 transition-colors"
                style={{ fontFamily: "var(--font-ui)" }}
              />
            </div>
          </div>
          {/* Category Tabs */}
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-3 py-1.5 text-[10px] sm:text-xs tracking-wider uppercase whitespace-nowrap border transition-all ${
                activeCategory === "all"
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-gold/20 text-parchment-dim/60 hover:border-gold/40 hover:text-parchment-dim"
              }`}
              style={{ fontFamily: "var(--font-pixel)" }}
            >
              All ({ASSETS.length})
            </button>
            {usedCategories.map((cat) => {
              const count = ASSETS.filter((a) => a.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 text-[10px] sm:text-xs tracking-wider uppercase whitespace-nowrap border transition-all ${
                    activeCategory === cat
                      ? "border-gold bg-gold/10 text-gold"
                      : "border-gold/20 text-parchment-dim/60 hover:border-gold/40 hover:text-parchment-dim"
                  }`}
                  style={{ fontFamily: "var(--font-pixel)" }}
                >
                  {CATEGORY_LABELS[cat].split(" ")[0]} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p
              className="text-parchment-dim/40 text-xs"
              style={{ fontFamily: "var(--font-pixel)" }}
            >
              No assets found
            </p>
          </div>
        ) : (
          CATEGORY_ORDER.filter((cat) => grouped[cat]).map((cat) => (
            <div key={cat} className="mb-12">
              <h2
                className="text-gold-dim text-[10px] sm:text-xs tracking-[0.3em] uppercase mb-6 border-b border-gold/10 pb-2"
                style={{ fontFamily: "var(--font-pixel)" }}
              >
                {CATEGORY_LABELS[cat]}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {grouped[cat].map((asset) => (
                  <div
                    key={asset.id}
                    className="group border border-gold/15 bg-forest/40 rounded-lg overflow-hidden hover:border-gold/40 transition-all"
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-video bg-forest-deep overflow-hidden">
                      <img
                        src={asset.url}
                        alt={asset.name}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                      {/* Overlay actions on hover */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <button
                          onClick={() => downloadAsset(asset)}
                          className="p-2.5 bg-gold/20 border border-gold/40 rounded-md hover:bg-gold/30 transition-colors"
                          title="Download original"
                        >
                          <Download className="w-5 h-5 text-gold" />
                        </button>
                        <button
                          onClick={() => copyUrl(asset)}
                          className="p-2.5 bg-gold/20 border border-gold/40 rounded-md hover:bg-gold/30 transition-colors"
                          title="Copy URL"
                        >
                          {copiedId === asset.id ? (
                            <Check className="w-5 h-5 text-green-400" />
                          ) : (
                            <Copy className="w-5 h-5 text-gold" />
                          )}
                        </button>
                        <a
                          href={asset.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 bg-gold/20 border border-gold/40 rounded-md hover:bg-gold/30 transition-colors"
                          title="Open in new tab (full quality)"
                        >
                          <ExternalLink className="w-5 h-5 text-gold" />
                        </a>
                      </div>
                    </div>
                    {/* Info */}
                    <div className="p-3">
                      <h3
                        className="text-parchment text-sm font-semibold mb-1"
                        style={{ fontFamily: "var(--font-ui)" }}
                      >
                        {asset.name}
                      </h3>
                      <p
                        className="text-parchment-dim/60 text-xs leading-relaxed mb-2"
                        style={{ fontFamily: "var(--font-ui)" }}
                      >
                        {asset.description}
                      </p>
                      {asset.usedIn.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {asset.usedIn.map((page) => (
                            <span
                              key={page}
                              className="text-[9px] px-1.5 py-0.5 bg-gold/10 border border-gold/20 text-gold-dim rounded"
                              style={{ fontFamily: "var(--font-pixel)" }}
                            >
                              {page}
                            </span>
                          ))}
                        </div>
                      )}
                      {asset.usedIn.length === 0 && (
                        <span
                          className="text-[9px] px-1.5 py-0.5 bg-leather/20 border border-leather/30 text-parchment-dim/50 rounded"
                          style={{ fontFamily: "var(--font-pixel)" }}
                        >
                          Not yet used
                        </span>
                      )}
                    </div>
                    {/* Mobile action row */}
                    <div className="flex border-t border-gold/10 sm:hidden">
                      <button
                        onClick={() => downloadAsset(asset)}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 text-gold-dim text-xs hover:bg-gold/10 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Download
                      </button>
                      <div className="w-px bg-gold/10" />
                      <button
                        onClick={() => copyUrl(asset)}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 text-gold-dim text-xs hover:bg-gold/10 transition-colors"
                      >
                        {copiedId === asset.id ? (
                          <><Check className="w-3.5 h-3.5 text-green-400" /> Copied</>
                        ) : (
                          <><Copy className="w-3.5 h-3.5" /> Copy URL</>
                        )}
                      </button>
                      <div className="w-px bg-gold/10" />
                      <a
                        href={asset.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 text-gold-dim text-xs hover:bg-gold/10 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Open
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}

        {/* Footer note */}
        <div className="mt-16 mb-8 text-center border-t border-gold/10 pt-8">
          <p
            className="text-parchment-dim/30 text-[10px] tracking-wider"
            style={{ fontFamily: "var(--font-pixel)" }}
          >
            All images link to original full-quality files. Right-click or use
            Download to save at full resolution.
          </p>
        </div>
      </div>
    </div>
  );
}
