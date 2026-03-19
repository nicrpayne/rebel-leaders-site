/*
 * DesktopOnly — Mobile gate for Workbench plugin pages.
 * Shows a branded "designed for desktop" message on screens < 768px.
 * On desktop, renders children transparently.
 */

import { useState, useEffect, type ReactNode } from "react";
import { Link } from "wouter";

interface DesktopOnlyProps {
  children: ReactNode;
  toolName?: string; // e.g. "Gravitas", "The Codex"
}

export default function DesktopOnly({ children, toolName = "This tool" }: DesktopOnlyProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768);
      setChecked(true);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Don't render anything until we've checked (prevents flash)
  if (!checked) return null;

  if (!isMobile) return <>{children}</>;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12 text-center"
      style={{ backgroundColor: "#0d1a12" }}
    >
      {/* Pixel art monitor icon */}
      <div
        className="font-pixel text-6xl mb-6"
        style={{ color: "#d4a843" }}
        aria-hidden="true"
      >
        ⌨️
      </div>

      <h1
        className="font-pixel text-lg mb-4 leading-relaxed"
        style={{ color: "#d4a843" }}
      >
        DESKTOP REQUIRED
      </h1>

      <p
        className="text-base leading-relaxed mb-2 max-w-sm"
        style={{
          color: "#f0e6d0",
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.125rem",
        }}
      >
        {toolName} is a hands-on leadership tool designed for a full-size screen.
        Grab a laptop or desktop for the complete experience.
      </p>

      <p
        className="text-sm mb-8 max-w-sm"
        style={{
          color: "#f0e6d0",
          opacity: 0.5,
          fontFamily: "'Cormorant Garamond', serif",
        }}
      >
        These aren't quick reads — they're workshop-grade instruments
        built for focused work.
      </p>

      {/* Pixel divider */}
      <div
        className="w-24 h-px mb-8"
        style={{ backgroundColor: "#d4a843", opacity: 0.3 }}
      />

      <div className="flex flex-col gap-3">
        <Link
          href="/workbench"
          className="font-pixel text-xs px-6 py-3 border transition-colors"
          style={{
            color: "#d4a843",
            borderColor: "#d4a843",
            backgroundColor: "transparent",
          }}
        >
          ← BACK TO WORKBENCH
        </Link>

        <Link
          href="/"
          className="font-pixel text-xs px-6 py-3 transition-colors"
          style={{
            color: "#f0e6d0",
            opacity: 0.5,
          }}
        >
          HOME
        </Link>
      </div>
    </div>
  );
}
