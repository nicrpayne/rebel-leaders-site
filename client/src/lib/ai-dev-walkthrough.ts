import { buildDevConversation, buildDevDecision } from "./ai-dev-trial";
import { buildTrialCard, buildEvidenceRecord } from "./ai-trial";
export function devWalkthrough(sample: Record<string, string>) {
  return [
    {
      title: "The request",
      move: "Your PM wants the team to use agents to build a restricted-data app after an executive demo. You see two problems: the access setup does not exist, and the team still needs help reviewing ordinary changes. You want to understand what was promised before recommending how to proceed.",
      question:
        "Is the immediate need this app, a faster delivery process, or both?",
    },
    {
      title: "Your position",
      move: "You ask what users need and explain your concerns. You recommend involving the data owner and Platform, checking review capacity, and comparing a smaller approach. Your PM is still asking whether there is a quicker option. These notes are a proposal to discuss.",
      question:
        "What do you know, what are you predicting, and what do you recommend?",
      record: buildDevConversation(sample),
    },
    {
      title: "An optional spike",
      move: "If you can reserve an experienced reviewer, you might explore one small sandbox task with invented records. Proposed cap: twelve total team hours and $100 in tool use. The real app’s access design remains separate. No one has approved or run this spike.",
      question:
        "What would this teach you that existing evidence or specialist advice cannot?",
      record: buildTrialCard(sample),
    },
    {
      title: "What you would check",
      move: "Look at whether the engineer can explain and debug the change, the quality checks, and all the review and correction work. A sandbox result would not prove production access is ready or that the whole team should use the workflow. There are no measured results in this example.",
      question:
        "Could the team own the work with the support actually available?",
      record: buildEvidenceRecord(sample),
    },
    {
      title: "Your recommendation",
      move: "Prepare first. Ask the PM to arrange the data-owner and Platform conversation; check reviewer capacity and alternatives yourself. Return Friday. If you still disagree, bring both positions and the decision needed to the responsible engineering leader. Do not turn the proposal into a commitment to ship.",
      question:
        "What will happen next, who owns it, and what should the team do while waiting?",
      record: buildDevDecision(sample),
    },
  ];
}
