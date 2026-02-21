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
            src="https://private-us-east-1.manuscdn.com/sessionFile/xhIF6cqEZNRR3ezVrvcq6V/sandbox/cLlPwzBL30WhHHj2soLbdt-img-4_1771637262000_na1fn_c3RhaW5lZC1nbGFzcy1kaXZpZGVy.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUveGhJRjZjcUVaTlJSM2V6VnJ2Y3E2Vi9zYW5kYm94L2NMbFB3ekJMMzBXaEhIajJzb0xiZHQtaW1nLTRfMTc3MTYzNzI2MjAwMF9uYTFmbl9jM1JoYVc1bFpDMW5iR0Z6Y3kxa2FYWnBaR1Z5LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=PSUTSPgRrwSLsgxvNGnLDiFx60fCFrFXZB8zX29uLck28Q7jxlKFlePatFsMu8PPAc8-sSJYHnWowvNj9vly9gxAcxqAX7II9tNFVBzE6tQgQsQXSRP2YorHp7q-~hBoQ17ntfxgiSHdcy89sQiTs0Vye26wlpRxnVdI7SwtLkBy6FTlHOW-XBiEmQkxWlgdZciiPpdWvUlbsxK84c-aG0AWi02MYDCV5XhZ75LOUQ-hwEnSjP7AlJkzz3KZR08CEUsjMVgqAWyLvROu95fvaVI2n3k9jhclKPCNwYuNzJv~VSWK0TeqO0GLw5332fVQNhCQUE8WkQeSj1mZCJU0nw__"
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
