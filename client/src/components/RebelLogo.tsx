/**
 * Rebel Leaders Logo — the rising sun / horizon icon
 * An arch (half-circle) sitting on a horizontal line.
 * Rendered as inline SVG so it can be colored via currentColor.
 */

interface RebelLogoProps {
  size?: number;
  className?: string;
  withText?: boolean;
}

export default function RebelLogo({ size = 32, className = "", withText = false }: RebelLogoProps) {
  if (withText) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0"
        >
          {/* Arch */}
          <path
            d="M20 52 A30 30 0 0 1 80 52"
            stroke="currentColor"
            strokeWidth="10"
            fill="none"
            strokeLinecap="butt"
          />
          {/* Horizontal line */}
          <rect x="8" y="52" width="84" height="8" rx="0" fill="currentColor" />
        </svg>
        <span className="font-pixel text-[10px] md:text-xs tracking-wider">
          REBEL LEADERS
        </span>
      </div>
    );
  }

  return (
    <svg
      width={size}
      height={size * 0.8}
      viewBox="0 0 100 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Arch */}
      <path
        d="M20 52 A30 30 0 0 1 80 52"
        stroke="currentColor"
        strokeWidth="10"
        fill="none"
        strokeLinecap="butt"
      />
      {/* Horizontal line */}
      <rect x="8" y="52" width="84" height="8" rx="0" fill="currentColor" />
    </svg>
  );
}
