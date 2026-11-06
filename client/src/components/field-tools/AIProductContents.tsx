import { BookOpen, MessageCircle, Route } from "lucide-react";
import type { Audience } from "@/lib/field-tool-paths";
import { aiProductInventory } from "@/lib/ai-product";
import "./ai-product-contents.css";

const icons = {
  guide: BookOpen,
  "lab/conversation": MessageCircle,
  "lab/delivery": Route,
};

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
          .map(item => {
            const Icon = icons[item.destination];
            return (
              <li key={item.destination}>
                <span className="ai-contents-icon">
                  <Icon size={21} aria-hidden="true" />
                </span>
                <div>
                  <p className="ai-contents-label">
                    {item.label}
                  </p>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
              </li>
            );
          })}
      </ul>
      <p className="ai-contents-note">
        Worked examples and editable notes are included. Copy or download what
        you want to take into the conversation.
      </p>
    </section>
  );
}
