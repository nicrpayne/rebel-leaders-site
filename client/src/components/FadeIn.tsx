import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  className = "",
  once = true,
}: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration,
        delay,
        ease: [0.33, 0, 0.67, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
