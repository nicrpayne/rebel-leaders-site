import { useEffect, useRef, useCallback } from "react";

interface CodexWelcomeProps {
  onEnter: () => void;
}

export function CodexWelcome({ onEnter }: CodexWelcomeProps) {
  const enterRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    enterRef.current?.focus();
  }, []);

  const handleEnter = useCallback(() => {
    onEnter();
  }, [onEnter]);

  return (
    <>
      <style>{`
        @keyframes codex-fade-in {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes codex-scan-line {
          0%   { opacity: 0.05; }
          50%  { opacity: 0.12; }
          100% { opacity: 0.05; }
        }
      `}</style>
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center"
        style={{
          backdropFilter: "blur(8px)",
          background: "rgba(0,0,0,0.82)",
          animation: "codex-fade-in 0.5s ease forwards",
        }}
        aria-modal="true"
        role="dialog"
        aria-labelledby="codex-welcome-title"
      >
        {/* Card */}
        <div
          className="relative flex flex-col w-[480px] max-w-[92vw] overflow-hidden"
          style={{
            background: "#0c0a07",
            border: "1px solid #3d2e14",
            borderRadius: "3px",
            boxShadow:
              "0 0 0 1px rgba(196,148,60,0.08), 0 24px 64px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.02)",
          }}
        >
          {/* Subtle scan-line texture overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
              animation: "codex-scan-line 4s ease-in-out infinite",
            }}
          />

          {/* Header bar */}
          <div
            className="relative flex items-center justify-between px-4 py-2"
            style={{
              background: "#0f0c08",
              borderBottom: "1px solid #2a1f0a",
              borderRadius: "3px 3px 0 0",
            }}
          >
            <div className="flex items-center gap-2">
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{ background: "#c4943c", boxShadow: "0 0 6px #c4943c88" }}
              />
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{ background: "#5a4a2a", boxShadow: "0 0 3px #5a4a2a66" }}
              />
            </div>
            <span
              className="text-[9px] tracking-[0.22em] uppercase"
              style={{ color: "#3d2e14", fontFamily: "var(--font-pixel)" }}
            >
              CODEX ● ARCHIVE ACCESS
            </span>
          </div>

          {/* Body */}
          <div className="relative flex flex-col items-center px-8 pt-8 pb-7 gap-0">
            {/* Header label */}
            <h2
              id="codex-welcome-title"
              className="text-[10px] tracking-[0.3em] uppercase mb-1"
              style={{
                color: "#c4943c",
                fontFamily: "var(--font-pixel)",
                textShadow: "0 0 14px rgba(196,148,60,0.35)",
              }}
            >
              ARCHIVE ACCESS GRANTED
            </h2>

            {/* Dot divider */}
            <div className="flex gap-[6px] mb-6 mt-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className="inline-block w-[3px] h-[3px] rounded-full"
                  style={{ background: "#2a1f0a" }}
                />
              ))}
            </div>

            {/* Copy */}
            <p
              className="text-center leading-[1.8] mb-3"
              style={{
                color: "#b8a07a",
                fontFamily: "var(--font-display)",
                fontSize: "19px",
                maxWidth: "360px",
                letterSpacing: "0.015em",
              }}
            >
              This is the Codex — a library of 27 field-tested leadership protocols.
            </p>
            <p
              className="text-center leading-[1.8] mb-7"
              style={{
                color: "#7a6a4a",
                fontFamily: "var(--font-display)",
                fontSize: "17px",
                maxWidth: "360px",
                letterSpacing: "0.015em",
              }}
            >
              If you arrived from a Gravitas scan, your recommended cartridge is already loaded. Otherwise, browse the archive and load what fits your situation.
            </p>

            {/* Readout strip */}
            <div
              className="w-full flex justify-around py-2 mb-6"
              style={{
                background: "#0a0805",
                border: "1px solid #2a1f0a",
                borderRadius: "2px",
              }}
            >
              {[
                { label: "VAULT", value: "OPEN", valueColor: "#c4943c" },
                { label: "ENTRIES", value: "27", valueColor: "#8a7040" },
                { label: "SIGNAL", value: "STANDING BY", valueColor: "#5a4a2a" },
              ].map(({ label, value, valueColor }) => (
                <div key={label} className="flex flex-col items-center gap-[3px]">
                  <span
                    className="text-[7px] tracking-[0.2em] uppercase"
                    style={{ color: "#3d2e14", fontFamily: "var(--font-pixel)" }}
                  >
                    {label}
                  </span>
                  <span
                    className="text-[8px] tracking-[0.15em] uppercase"
                    style={{ color: valueColor, fontFamily: "var(--font-pixel)" }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {/* Enter Archive button */}
            <button
              ref={enterRef}
              onClick={handleEnter}
              className="w-full py-[11px] text-[10px] tracking-[0.28em] uppercase transition-all duration-150"
              style={{
                background: "#1a1005",
                border: "1px solid #c4943c",
                borderRadius: "2px",
                color: "#c4943c",
                fontFamily: "var(--font-pixel)",
                boxShadow: "0 0 12px rgba(196,148,60,0.08)",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#221507";
                e.currentTarget.style.boxShadow = "0 0 22px rgba(196,148,60,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#1a1005";
                e.currentTarget.style.boxShadow = "0 0 12px rgba(196,148,60,0.08)";
              }}
            >
              ENTER ARCHIVE ›
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
