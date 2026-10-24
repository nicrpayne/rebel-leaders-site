// Keep stored choices stable so existing drafts and decision routing still work.
const labels: Record<string, Record<string, string>> = {
  readinessDecision: {
    "READY FOR A BOUNDED TEST": "Ready for a small experiment",
    "CLARIFY THE CONVERSATION": "Talk it through some more",
    "USE EXISTING EVIDENCE": "Use what we already know",
  },
  chosenOption: {
    "Keep date / change scope": "Keep the date; deliver less first",
    "Keep scope / revisit date": "Deliver all the work; change the date",
    "Change capacity after feasibility review":
      "Add help if the team says it would work",
    "Pause commitment / resolve unknowns":
      "Wait to promise until we have checked more",
  },
  priorityChoice: {
    "Accept / displace named work": "Do it and agree what will wait",
    "Defer to a named checkpoint": "Postpone it and agree when to reconsider",
  },
  need: {
    Confidence: "They need to know how sure we are",
    "Budget / staffing": "They need to plan spending or people",
    Sequencing: "They need to know what happens first",
    "Customer communication": "They need an answer for a customer",
    Accountability: "They need to know who is responsible",
    "Risk management": "They need to understand what could go wrong",
  },
};
export function fieldToolChoiceLabel(field: string, value: string): string {
  return labels[field]?.[value] ?? value;
}
