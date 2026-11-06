import { Maximize2 } from "lucide-react";
import { FIELD_TOOL_KIT_SCENES } from "./field-tool-kit-scenes";
import "./field-tool-screen-preview.css";

// Keep all current captures in the kit scene map, including close-ups of real mobile fields.
export default function FieldToolScreenPreview({
  productKey,
  device = "laptop",
}: {
  productKey: string;
  device?: "laptop" | "phone";
}) {
  const scene = FIELD_TOOL_KIT_SCENES[productKey];
  if (!scene) return null;
  const phone = device === "phone";
  const src = `/assets/field-tools/${phone ? (scene.mobileDetailImage ?? scene.mobileImage) : scene.desktopImage}`;
  return (
    <figure className={`ft-screen-preview ft-screen-preview--${device}`}>
      <a
        href={src}
        target="_blank"
        rel="noreferrer"
        className="ft-screen-link"
        aria-label={`Enlarge ${scene.title} Lab ${phone ? "phone" : "computer"} preview (opens in a new tab)`}
      >
        <div className="ft-screen-shell">
          <span className="ft-screen-camera" aria-hidden="true" />
          <div className="ft-screen-display">
            <img
              src={src}
              alt={`${scene.title} Lab with the fictional example loaded`}
              width={phone ? 390 : 1347}
              height={phone ? (scene.mobileDetailImage ? 810 : 1000) : 850}
              loading="lazy"
            />
          </div>
          <span className="ft-screen-enlarge" aria-hidden="true">
            <Maximize2 size={16} />
          </span>
        </div>
        {!phone && <div className="ft-screen-base" aria-hidden="true" />}
      </a>
    </figure>
  );
}
