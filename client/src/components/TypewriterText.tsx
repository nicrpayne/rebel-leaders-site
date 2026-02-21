import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  showCursor?: boolean;
  onComplete?: () => void;
}

export default function TypewriterText({
  text,
  speed = 40,
  delay = 0,
  className = "",
  showCursor = true,
  onComplete,
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [started, setStarted] = useState(false);
  const [complete, setComplete] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!isInView) return;
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [isInView, delay]);

  useEffect(() => {
    if (!started) return;
    if (displayText.length >= text.length) {
      setComplete(true);
      onComplete?.();
      return;
    }
    const timer = setTimeout(() => {
      setDisplayText(text.slice(0, displayText.length + 1));
    }, speed);
    return () => clearTimeout(timer);
  }, [started, displayText, text, speed, onComplete]);

  return (
    <span ref={ref} className={className}>
      {displayText}
      {showCursor && !complete && (
        <span className="cursor-blink inline-block w-[0.6em] h-[1em] bg-gold ml-0.5 align-middle" />
      )}
    </span>
  );
}
