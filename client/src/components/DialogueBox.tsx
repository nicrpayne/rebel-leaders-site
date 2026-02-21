import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface DialogueBoxProps {
  speaker?: string;
  children: React.ReactNode;
  className?: string;
}

export default function DialogueBox({ speaker, children, className = "" }: DialogueBoxProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className={`dialogue-box ${className}`}
    >
      {speaker && (
        <div className="font-pixel text-[10px] text-gold mb-3 tracking-wider">
          {speaker}
        </div>
      )}
      <div className="font-display text-parchment text-lg md:text-xl leading-relaxed">
        {children}
      </div>
    </motion.div>
  );
}
