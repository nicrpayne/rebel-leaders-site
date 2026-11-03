import { BookOpen, MessageCircle, Route } from "lucide-react";
import type { Audience } from "@/lib/field-tool-paths";
import { aiProductInventory } from "@/lib/ai-product";
import "./ai-product-contents.css";

const icons = [BookOpen, MessageCircle, Route];

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
      <h2>One Guide. Two ways to use the Lab.</h2>
      <p className="ai-contents-intro">
        Start with the situation you're in. You don't have to finish the Guide
        or use every tool.
      </p>
      <ul>
        {aiProductInventory(audience).map((item, index) => {
          const Icon = icons[index];
          return (
            <li key={item.destination}>
              <span className="ai-contents-icon">
                <Icon size={21} aria-hidden="true" />
              </span>
              <div>
                <p className="ai-contents-label">
                  {index === 0 ? "READ AS NEEDED" : "IN THE LAB"}
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
