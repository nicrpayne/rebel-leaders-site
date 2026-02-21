import RebelLogo from "./RebelLogo";

interface PixelDividerProps {
  showIcon?: boolean;
  className?: string;
}

export default function PixelDivider({ showIcon = true, className = "" }: PixelDividerProps) {
  return (
    <div className={`relative flex items-center justify-center py-4 ${className}`}>
      {/* Left line */}
      <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-wood/30 to-wood/40" />

      {showIcon && (
        <div className="mx-4 text-gold/40">
          <RebelLogo size={20} />
        </div>
      )}

      {/* Right line */}
      <div className="flex-1 h-[2px] bg-gradient-to-l from-transparent via-wood/30 to-wood/40" />
    </div>
  );
}
