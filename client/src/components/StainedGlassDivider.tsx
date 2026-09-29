import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface DividerProps {
  className?: string;
  variant?: "full" | "thin";
}

export default function StainedGlassDivider({ className = "", variant = "thin" }: DividerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const isFull = variant === "full";

  return (
    <div ref={ref} className={`w-full ${isFull ? "py-4" : "py-8"} ${className}`}>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: isFull ? 1.2 : 1, ease: [0.25, 0.1, 0.25, 1] }}
        className={`${isFull ? "max-w-4xl" : "max-w-md"} mx-auto h-px`}
        style={{
          background: "linear-gradient(90deg, transparent, oklch(0.78 0.12 75 / 0.6), transparent)",
        }}
      />
    </div>
  );
}
