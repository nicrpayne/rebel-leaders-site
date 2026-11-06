import { BookOpen } from "lucide-react";
import type { Audience } from "@/lib/field-tool-paths";
import { aiProductInventory } from "@/lib/ai-product";
import { DELIVERY_TOOLS } from "@/lib/ai-lab-tools";
import AILabIcon from "./AILabIcon";
import "./ai-product-contents.css";

export default function AIProductContents({
  audience,
}: {
  audience: Audience;
}) {
  return (
    <section
      className="ai-product-contents"
      aria-label="Included in your edition"
    >
      <h2>
        Prepare the conversation.
        <br />
        Find a way forward.
      </h2>
      <p className="ai-contents-intro">
        Bring one real situation. Start with what’s helpful today.
      </p>
      <ul>
        {aiProductInventory(audience)
          .sort(
            (a, b) =>
              Number(a.destination === "guide") -
              Number(b.destination === "guide")
          )
          .map(item => (
            <li key={item.destination}>
              <span className="ai-contents-icon">
                {item.destination === "guide" ? (
                  <BookOpen size={21} aria-hidden="true" />
                ) : (
                  <AILabIcon
                    name={item.destination === "lab/delivery" ? "delivery-map" : "conversation-companion"}
                    size={32}
                  />
                )}
              </span>
              <div>
                <p className="ai-contents-label">{item.label}</p>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
                {item.destination === "lab/delivery" && (
                  <>
                    <p className="mt-3">Three tools inside the Delivery Map</p>
                    <ul className="ai-contents-tools">
                      {DELIVERY_TOOLS.map(tool => (
                        <li key={tool.workspace}>
                          <AILabIcon name={tool.icon} size={24} />
                          {tool.link}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </li>
          ))}
      </ul>
      <p className="ai-contents-note">
        Worked examples and editable notes are included. Copy or download what
        you want to take into the conversation.
      </p>
    </section>
  );
}
