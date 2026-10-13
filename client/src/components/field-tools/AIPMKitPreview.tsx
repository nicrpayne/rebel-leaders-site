import { useId, useLayoutEffect, useRef, useState } from "react";
import "./ai-pm-kit-preview.css";

const scene = "/assets/field-tools/ai-stalemate-pm-kit-v2.webp";
const screenshot = "/assets/field-tools/ai-stalemate-pm-lab-preview.webp";

// Map the 1347 × 850 screenshot onto the display's four corners in the
// 1536 × 1024 photograph: (584,142), (1401,124), (1382,703), (550,674).
// One projective transform keeps the header, body, rules and text on one plane.
const screenTransform =
  "matrix3d(0.523138974227,-0.020744087987,0,-0.000059524670, -0.052850506474,0.610134641371,0,-0.000023364557, 0,0,1,0, 584,142,0,1)";

export default function AIPMKitPreview() {
  const container = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const foregroundId = `kit-foreground-${useId().replace(/:/g, "")}`;

  useLayoutEffect(() => {
    const element = container.current;
    if (!element) return;
    const resize = () => setScale(element.getBoundingClientRect().width / 1536);
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={container}
      className="ai-pm-photo-kit"
      role="img"
      aria-label="AI Stalemate PM Field Guide beside the actual interactive Lab on a laptop and phone"
    >
      <img className="ai-pm-photo-kit-background" src={scene} alt="" width={1536} height={1024} />
      <div className="ai-pm-photo-kit-plane" aria-hidden="true" style={{ transform: `scale(${scale})` }}>
        <svg viewBox="0 0 1536 1024" className="ai-pm-photo-kit-layer">
          {/* Erase the old, bent screen insert while retaining the outer housing. */}
          <polygon points="572,128 1415,110 1399,720 539,689" fill="#080a09" />
        </svg>
        <img
          className="ai-pm-photo-kit-display"
          src={screenshot}
          alt=""
          width={1347}
          height={850}
          style={{ transform: screenTransform }}
        />
        <svg viewBox="0 0 1536 1024" className="ai-pm-photo-kit-layer">
          <defs>
            <clipPath id={foregroundId}>
              {/* Restore the original objects in front of the new display. */}
              <polygon points="39,142 530,129 593,870 81,914" />
              <path d="M1333 395 L1471 395 Q1509 395 1511 432 L1498 873 Q1496 918 1467 920 L1310 905 Q1274 902 1274 867 L1296 434 Q1296 398 1333 395 Z" />
            </clipPath>
          </defs>
          <image href={scene} width={1536} height={1024} clipPath={`url(#${foregroundId})`} />
        </svg>
      </div>
    </div>
  );
}
