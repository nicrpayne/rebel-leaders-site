import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface DividerProps {
  className?: string;
  variant?: "full" | "thin";
}

export default function StainedGlassDivider({ className = "", variant = "thin" }: DividerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  if (variant === "full") {
    return (
      <div ref={ref} className={`w-full overflow-hidden py-4 ${className}`}>
        <motion.div
          initial={{ opacity: 0, scaleX: 0.3 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-4xl mx-auto"
        >
          <img
            src="/assets/stained-glass-divider.png"
            alt=""
            className="w-full h-auto opacity-70"
            loading="lazy"
          />
        </motion.div>
      </div>
    );
  }

  return (
    <div ref={ref} className={`w-full py-8 ${className}`}>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        className="max-w-md mx-auto h-px"
        style={{
          background: "linear-gradient(90deg, transparent, oklch(0.78 0.12 75 / 0.6), transparent)",
        }}
      />
    </div>
  );
}
