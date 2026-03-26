/**
 * MirrorShell — The Mirror instrument chassis.
 *
 * The close-up basin image IS the instrument. The dark water surface
 * is where all content lives. The brass rim frames everything naturally.
 *
 * This shell provides:
 *   - Full-bleed basin background
 *   - Vignette overlay for depth
 *   - Content slot positioned over the dark water ellipse
 *   - Footer slot below the basin
 *   - Nic sticker
 *
 * Design: warm amber/gold text on dark glass, quieter than Gravitas.
 */

import { type ReactNode } from "react";

interface MirrorShellProps {
  children: ReactNode;
  /** Optional footer content (progress dots, nav) */
  footer?: ReactNode;
}

const BASIN_CLOSE_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/5e5kxa7Hxu2DiYaSmWbPxb/mirror-basin-close_697b33ca.png";

export default function MirrorShell({ children, footer }: MirrorShellProps) {
  return (
    <div className="min-h-screen w-full relative overflow-hidden flex flex-col items-center justify-center">
      {/* Basin background — full bleed, slightly zoomed for more dark water area */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${BASIN_CLOSE_URL})`,
          transform: "scale(1.18)",
          transformOrigin: "center center",
        }}
      />

      {/* Subtle vignette overlay for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 48%, transparent 30%, rgba(0,0,0,0.4) 100%)",
        }}
      />

      {/* Content area — positioned over the dark water ellipse of the basin */}
      <div
        className="relative z-10 flex flex-col items-center justify-center"
        style={{
          width: "62%",
          minHeight: "55vh",
          maxHeight: "70vh",
          marginTop: "-2vh",
        }}
      >
        {/* Dark water readability overlay — elliptical to match basin shape */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            borderRadius: "50%",
            background: "radial-gradient(ellipse 92% 88% at 50% 46%, rgba(5,8,15,0.72) 0%, rgba(5,8,15,0.5) 52%, rgba(5,8,15,0.15) 72%, transparent 88%)",
          }}
        />

        {/* Children render here — directly on the basin surface */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
          {children}
        </div>
      </div>

      {/* Footer — positioned below the basin */}
      {footer && (
        <div className="relative z-10 mt-4 mb-6">
          {footer}
        </div>
      )}

      {/* Global keyframes for Mirror animations */}
      <style>{`
        @keyframes mirrorFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes mirrorPulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes mirrorGlow {
          0%, 100% { text-shadow: 0 0 8px rgba(197,160,89,0.3); }
          50% { text-shadow: 0 0 16px rgba(197,160,89,0.5); }
        }
      `}</style>
    </div>
  );
}
