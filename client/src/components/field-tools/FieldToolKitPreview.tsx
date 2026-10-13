import { useId, useLayoutEffect, useRef, useState } from "react";
import type { Audience } from "@/lib/field-tool-paths";
import { FIELD_TOOL_KIT_SCENES } from "./field-tool-kit-scenes";
import "./field-tool-kit-preview.css";

const asset = (file: string) => "/assets/field-tools/" + file;
// Rounded display and camera notch, in the 390 × 1000 mobile capture plane.
const mobileClip =
  "path('M42 0 H94 V13 Q94 35 116 35 H279 Q300 35 300 13 V0 H348 Q390 0 390 42 V958 Q390 1000 348 1000 H42 Q0 1000 0 958 V42 Q0 0 42 0 Z')";

export default function FieldToolKitPreview({
  slug,
  audience = "pm",
}: {
  slug: string;
  audience?: Audience;
}) {
  const kit =
    FIELD_TOOL_KIT_SCENES[
      slug === "ai-stalemate" ? slug + "-" + audience : slug
    ];
  const container = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const foregroundId = "kit-foreground-" + useId().replace(/:/g, "");
  useLayoutEffect(() => {
    const element = container.current;
    if (!element) return;
    const resize = () => setScale(element.getBoundingClientRect().width / 1536);
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  if (!kit) return null;
  const scene = asset(kit.scene);
  const phone = (
    <img
      className="field-tool-photo-kit-display"
      src={asset(kit.mobileImage)}
      alt=""
      width={390}
      height={1000}
      style={{
        width: 390,
        height: 1000,
        transform: kit.mobileTransform,
        clipPath: kit.mobileSceneClip ? undefined : mobileClip,
      }}
    />
  );
  return (
    <div
      ref={container}
      className="field-tool-photo-kit"
      role="img"
      aria-label={
        kit.title +
        " Field Guide beside the actual interactive Lab on a laptop and phone"
      }
    >
      <img
        className="field-tool-photo-kit-background"
        src={scene}
        alt=""
        width={1536}
        height={1024}
      />
      <div
        className="field-tool-photo-kit-plane"
        aria-hidden="true"
        style={{ transform: "scale(" + scale + ")" }}
      >
        <svg viewBox="0 0 1536 1024" className="field-tool-photo-kit-layer">
          <polygon points={kit.erase} fill="#080a09" />
        </svg>
        <img
          className="field-tool-photo-kit-display"
          src={asset(kit.desktopImage)}
          alt=""
          width={1347}
          height={850}
          style={{ transform: kit.desktopTransform }}
        />
        <svg viewBox="0 0 1536 1024" className="field-tool-photo-kit-layer">
          <defs>
            <clipPath id={foregroundId}>
              <polygon points={kit.book} />
              <path d={kit.phone} />
            </clipPath>
          </defs>
          <image
            href={scene}
            width={1536}
            height={1024}
            clipPath={"url(#" + foregroundId + ")"}
          />
        </svg>
        {kit.mobileErase && (
          <svg viewBox="0 0 1536 1024" className="field-tool-photo-kit-layer">
            <path
              d={kit.mobileErase}
              fill="#080a09"
              clipPath={"url(#" + foregroundId + ")"}
            />
          </svg>
        )}
        {kit.mobileSceneClip ? (
          <div
            className="field-tool-photo-kit-layer"
            style={{ clipPath: "path('" + kit.mobileSceneClip + "')" }}
          >
            {phone}
          </div>
        ) : (
          phone
        )}
      </div>
    </div>
  );
}
