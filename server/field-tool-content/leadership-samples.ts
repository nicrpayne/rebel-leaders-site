export const LEADERSHIP_SAMPLES: Record<string, Record<string, string>> = {
  "deadline-reset": {
    outcome: "Give customers a reliable core workflow at the November 1 event.",
    date: "November 1",
    promise:
      "Fictional case: sponsor communicated a full launch before integration discovery finished.",
    fixed: "The customer event is booked for November 1.",
    constraintBasis:
      "Sponsor confirmed the event booking. Full launch scope is not a contractual requirement in this fictional case.",
    assumed:
      "All requested reporting features ship at the event; integration works without additional changes.",
    unknown:
      "Integration behavior and the remaining acceptance effort are unverified.",
    scopeMove:
      "Core customer workflow at the event; reporting sequenced afterward. Engineering checks feasibility at the integration review.",
    dateMove:
      "Keep full scope; Engineering reassesses the range after Thursday's integration check. No replacement date is yet supported.",
    capacityMove:
      "Current team, no assumed overtime. Sponsor protects integration-review and acceptance capacity.",
    qualityGuardrails:
      "Security review, permission checks, and customer acceptance remain required.",
    consequence:
      "Full scope plus unresolved integration makes the current promise low confidence.",
    chosenOption: "Keep date / change scope",
    recommendation:
      "Protect the event's customer outcome with the smaller workflow, subject to integration evidence. Ask the sponsor to reset reporting expectations.",
    confidence: "Medium",
    confidenceScope:
      "Core workflow by November 1, conditional on Thursday's integration check.",
    forecastBasis:
      "Engineering assessed the core workflow from completed work; the integration remains the principal open condition. This is qualitative judgment, not a computed probability.",
    evidenceNext:
      "Engineering lead tests the integration and confirms the remaining acceptance work on Thursday.",
    checkpoint: "Thursday, after integration review",
    decisionNeeded:
      "Approve the smaller event scope or request a full-scope date reassessment.",
    owner: "Product sponsor",
    decisionBy: "Wednesday, before the external update",
    decisionStatus: "PROPOSAL — awaiting a decision",
    finalDecision: "Sponsor response is not yet recorded.",
    communication:
      "Sponsor owns the customer update; PM updates the release plan after agreement.",
    privateReaction: "I'm frustrated that discovery was treated as finished.",
    privateAssumption:
      "I may be assuming the sponsor doesn't care about delivery quality. Ask what the event needs to achieve.",
  },
  "priority-whiplash": {
    outcome:
      "Finish a usable onboarding improvement while maintaining required security checks.",
    p1: "Customer onboarding fix — current customer commitment",
    p2: "Security review — required release condition",
    p3: "Reporting update — customer expects the agreed sequence",
    otherWork:
      "Support and reviewer time are already included in the entered 10-person-day existing load.",
    newAsk:
      "Fictional case: an executive requests a demo for Friday's customer meeting.",
    whyNow: "A customer meeting has been added for Friday.",
    urgencyBasis:
      "Sponsor confirmed the meeting. Need is to demonstrate the core idea; a new production feature is not required.",
    priorityChoice: "Narrow the request",
    moves:
      "Move 2 person-days of reporting work out of this planning window to create capacity for a narrow demo.",
    impact:
      "Reporting's stakeholder needs a revised sequence; Engineering must reassess the resulting delivery forecast.",
    protected:
      "Onboarding outcome, security review, and the team's agreed acceptance checks.",
    alternative:
      "Keep reporting in place and use the existing prototype Friday; it supports feedback but does not demonstrate a finished production workflow.",
    availableCapacity: "10",
    existingLoad: "10",
    requestLoad: "2",
    capacityWindow: "The remaining shared planning window before Friday",
    capacityBasis:
      "Fictional team estimates in person-days, including review and support. No assumed overtime; this is not a schedule calculation.",
    recommendation:
      "Use a narrow demo only with explicit reporting displacement. It meets the customer meeting need with less disruption than a production feature.",
    decisionOwner: "Product sponsor",
    decisionDate: "Wednesday afternoon",
    decisionStatus: "PROPOSAL — awaiting a decision",
    finalDecision: "Sponsor response is not yet recorded.",
    communication:
      "PM updates the team plan and reporting stakeholder after sponsor agreement, by Thursday morning.",
    reviewDate: "Friday, after the customer meeting",
    privateReaction: "I feel like the current plan is being ignored.",
    privateAssumption:
      "I may be assuming the request is a vanity demo. Ask what the customer needs to learn.",
  },
  "mandate-reset": {
    outcome: "Deliver a coherent roadmap outcome with one agreed release plan.",
    blockedDecision:
      "Sequence or displace newly requested scope before it changes the release plan.",
    consequence:
      "The team receives conflicting additions while Product remains accountable for the original delivery date.",
    recommend: "Product manager",
    approve: "Executive sponsor",
    execute: "Product and Engineering",
    block:
      "Requesting executives introduce conflicting scope demands; security owner retains required approval.",
    accountable:
      "Product manager for the roadmap outcome; specialist owners for their approvals.",
    rightsEvidence:
      "Observed scope additions and sponsor approvals support the map. Sponsor must still confirm the operating rule with affected executives.",
    requiredApprovals:
      "Security/data approvals, spending limits, and Engineering acceptance remain with their accountable owners.",
    gap: "Several executives can introduce work; Product cannot displace it. There is no agreed sponsor response rule before the plan changes.",
    request:
      "Every new scope request goes to one sponsor for an explicit displacement decision before the release plan changes.",
    boundaries:
      "Within the approved outcome and budget; required security and Engineering acceptance conditions remain intact.",
    fallback:
      "If disputed, PM escalates to sponsor within one working day. Current agreed plan remains in place while awaiting the sponsor's response.",
    owner: "Executive sponsor",
    date: "Before Monday's planning session",
    decisionStatus: "PROPOSAL — awaiting a decision",
    finalDecision: "Sponsor has not yet agreed to the reset.",
    interimAction:
      "PM prepares scope options and gathers affected-owner input within current authority; no new authority is assumed.",
    reviewDate:
      "After the next two requests: verify one sponsor decision, explicit displacement, and one updated team plan.",
    privateReaction: "I feel judged on a lever I cannot move.",
    privateAssumption:
      "I may be assuming executives are avoiding responsibility. Check what decision right they believe I have.",
  },
  "product-project-translator": {
    request:
      "Fictional case: Give me the final requirements before we reserve next-quarter funding.",
    stakeholder: "Finance sponsor",
    context:
      "Finance needs an investment decision before its funding window closes.",
    need: "Budget / staffing",
    needEvidence:
      "Finance confirmed that the immediate need is a bounded funding decision, rather than every interaction being finalized.",
    assumption:
      "The final customer workflow can be specified before either candidate workflow is tested.",
    outcome: "Choose a customer workflow worth funding for the full build.",
    known:
      "The target customer outcome and an initial discovery budget boundary; final workflow is not yet tested.",
    unknown:
      "Which of two candidate workflows serves the customer at acceptable delivery effort.",
    commit:
      "Test two candidate workflows within a capped two-week discovery phase; PM owns customer evidence and Engineering owns the delivery assessment.",
    commitmentBounds:
      "Agreed discovery budget and two-week timebox. No production release or full-build funding commitment is made by this phase.",
    checkpoint:
      "PM and Engineering bring customer findings and a delivery assessment at the two-week funding review. Review is scheduled after phase approval.",
    response:
      "I understand you need a funding decision for next quarter. I can give you the outcome, investment boundary, and next decision now. We propose testing two workflows within a capped two-week phase, then bringing customer evidence and a delivery assessment before you commit to the full build. Can you approve that boundary by Thursday?",
    decisionNeeded:
      "Approve or revise the capped discovery phase and confirm the funding decision owner.",
    owner: "Finance sponsor",
    decisionDate: "Thursday, before reserving discovery capacity",
    decisionStatus: "PROPOSAL — awaiting a decision",
    finalDecision: "Finance response is not yet recorded.",
    nextAction:
      "PM presents the Commitment Card Thursday; schedules the two-week evidence review after agreement.",
    privateReaction: "I feel misunderstood as the PM.",
    privateAssumption:
      "I may be treating Finance's planning need as hostility to Product. Ask which decision they actually need to make.",
  },
};

LEADERSHIP_SAMPLES["deadline-reset"].checkpointFallback =
  "If Thursday's integration check fails, propose a demo-only event scope to the sponsor that day. The sponsor owns changing the external promise; update affected customers by Friday.";
LEADERSHIP_SAMPLES["mandate-reset"].consult =
  "Product, Engineering, and the customer-facing lead give input before the sponsor decides. Security approval remains a required release condition, not an optional consultation.";
LEADERSHIP_SAMPLES["product-project-translator"].spokenResponse =
  "I understand you need to reserve next quarter's funding. We can commit to a capped two-week discovery phase now. We will bring customer evidence and an Engineering assessment to the review so you can choose the next investment.";
for (const sample of Object.values(LEADERSHIP_SAMPLES)) {
  sample.unresolvedPlan =
    "If no decision is reached, ask the named owner to confirm who can decide. Continue only work within the existing mandate and revisit at the recorded decision checkpoint. Do not treat silence as agreement.";
}
