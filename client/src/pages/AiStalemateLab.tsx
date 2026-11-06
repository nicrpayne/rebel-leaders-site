import FieldToolLink from "@/components/field-tools/FieldToolLink";
import { ArrowRight, BookOpen } from "lucide-react";
import AILabIcon from "@/components/field-tools/AILabIcon";
import { DELIVERY_TOOL_SUMMARY } from "@/lib/ai-lab-tools";
import FieldToolsNav from "@/components/field-tools/FieldToolsNav";
import { fieldToolBase, type Audience } from "@/lib/field-tool-paths";
import "@/components/field-tools/ai-stalemate-lab.css";

export default function AiStalemateLab({ audience }: { audience: Audience }) {
  const base = fieldToolBase("ai-stalemate", audience);
  const counterpart = audience === "pm" ? "lead developer" : "PM";
  return (
    <>
      <FieldToolsNav />
      <main className="ai-lab-hub">
        <div className="ai-lab-hub-inner">
          <header>
            <p className="ai-lab-eyebrow">
              AI STALEMATE / {audience === "pm" ? "PM" : "LEAD DEVELOPER"}{" "}
              EDITION / LABS
            </p>
            <h1>
              What would help you <em>move forward?</em>
            </h1>
            <p>
              Choose a Lab for the situation you’re in. Use the Conversation Companion
              to prepare for a discussion or the Delivery Map to follow a piece of work.
            </p>
          </header>
          <section className="ai-lab-paths" aria-label="Choose a Lab">
            <article>
              <AILabIcon name="conversation-companion" size={48} />
              <p className="ai-lab-eyebrow">CONVERSATION COMPANION</p>
              <h2>Prepare your conversation</h2>
              <p>
                {audience === "pm"
                  ? "You think AI could help. You want your lead involved, and the conversation keeps getting stuck."
                  : "Your PM wants the team to build differently. You have questions about security, quality, and what the team can take on."}
              </p>
              <p>
                Work through your own situation with the Guide's questions.
                Prepare what you want to ask, explain, and discuss with your{" "}
                {counterpart}.
              </p>
              <p className="ai-lab-takeaway">
                <strong>Leave with</strong> conversation notes and a proposed
                next step to agree together.
              </p>
              <FieldToolLink href={`${base}/lab/conversation`}>
                Open the Conversation Companion <ArrowRight size={17} />
              </FieldToolLink>
            </article>
            <article className="ai-lab-delivery-card">
              <AILabIcon name="delivery-map" size={48} />
              <p className="ai-lab-eyebrow">DELIVERY MAP</p>
              <h2>Find where work gets stuck</h2>
              <p className="ai-lab-frustration">
                “We're all busy. Why does everything still take so long?”
              </p>
              <p>
                Follow one piece of work from idea to use. Explore what keeps it
                stuck, what's already been tried, and who can help you move it.
              </p>
              <p>{DELIVERY_TOOL_SUMMARY}</p>
              <p className="ai-lab-takeaway">
                <strong>Leave with</strong> a question to investigate, a
                conversation to arrange, or a small change to try.
              </p>
              <FieldToolLink href={`${base}/lab/delivery`}>
                Explore the Delivery Map <ArrowRight size={17} />
              </FieldToolLink>
            </article>
          </section>
          <section className="ai-lab-guide" aria-label="Your Field Guide">
            <BookOpen size={25} aria-hidden="true" />
            <div>
              <h2>Your Field Guide is here when you need it.</h2>
              <p>
                Read the perspective and worked examples, then bring your own
                situation to either Lab. You don't have to finish the Guide
                before starting.
              </p>
            </div>
            <FieldToolLink href={`${base}/guide`}>
              Read the Guide <ArrowRight size={16} />
            </FieldToolLink>
          </section>
          <p className="ai-lab-saving">
            Your drafts save in this browser. Copy or download what you want to
            discuss or take to another device.
          </p>
          <FieldToolLink className="ai-lab-home" href={`${base}/access`}>
            Back to your welcome page
          </FieldToolLink>
        </div>
      </main>
    </>
  );
}
