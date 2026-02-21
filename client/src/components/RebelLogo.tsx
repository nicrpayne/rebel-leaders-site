/**
 * Rebel Leaders Logo — the rising sun / horizon icon
 * Exact match to the brand logo:
 * - Thick semicircle arch (filled, not stroked)
 * - Visible gap between arch bottom and horizon line
 * - Horizon line extends significantly wider than the arch on both sides
 * - Horizon line is thinner than the arch thickness
 * Rendered as inline SVG so it can be colored via currentColor.
 */

interface RebelLogoProps {
  size?: number;
  className?: string;
  withText?: boolean;
}

export default function RebelLogo({ size = 32, className = "", withText = false }: RebelLogoProps) {
  // The logo viewBox: 120 wide x 70 tall
  // Arch: outer radius 28, inner radius 16 → thickness ~12
  // Gap between arch bottom and horizon: ~5 units
  // Horizon: full width (120), height ~7
  const logoSvg = (
    <svg
      width={size}
      height={size * (70 / 120)}
      viewBox="0 0 120 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={withText ? "shrink-0" : className}
    >
      {/* Arch — thick filled semicircle (outer arc minus inner arc) */}
      <path
        d="M 32 45
           A 28 28 0 0 1 88 45
           L 78 45
           A 18 18 0 0 0 42 45
           Z"
        fill="currentColor"
      />
      {/* Horizon line — wider than arch, with gap below */}
      <rect x="16" y="51" width="88" height="7" fill="currentColor" />
    </svg>
  );

  if (withText) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {logoSvg}
        <span className="font-pixel text-[10px] md:text-xs tracking-wider">
          REBEL LEADERS
        </span>
      </div>
    );
  }

  return logoSvg;
}
