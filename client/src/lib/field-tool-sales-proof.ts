// Excerpts from current output builders with built-in fictional examples.
export const SALES_PROOF: Record<
  string,
  {
    name: string;
    title: string;
    context: string;
    sections: { title: string; body: string }[];
  }
> = {
  "deadline-reset": {
    name: "Deadline Reset",
    title: "Stakeholder Update",
    context:
      "A promised launch becomes an explicit scope choice, with evidence, an owner, and a decision deadline.",
    sections: [
      {
        title: "RECOMMENDATION / TRADEOFF",
        body: "Keep date / change scope\nProtect the event's customer outcome with the smaller workflow, subject to integration evidence. Ask the sponsor to reset reporting expectations.\nScope: Core customer workflow at the event; reporting sequenced afterward. Engineering checks feasibility at the integration review.\nDate alternative: Keep full scope; Engineering reassesses the range after Thursday's integration check. No replacement date is yet supported.\nCapacity: Current team, no assumed overtime. Sponsor protects integration-review and acceptance capacity.",
      },
      {
        title: "DECISION NEEDED / OWNER / BY",
        body: "Approve the smaller event scope or request a full-scope date reassessment.\nProduct sponsor — Wednesday, before the external update",
      },
      {
        title: "DECISION STATUS",
        body: "PROPOSAL — awaiting a decision",
      },
    ],
  },
  "priority-whiplash": {
    name: "Priority Whiplash",
    title: "Tradeoff Brief",
    context:
      "Ten available person-days, ten already committed, and a new two-day request: make the displacement visible before saying yes.",
    sections: [
      {
        title: "CAPACITY CHECK",
        body: "Planning window: The remaining shared planning window before Friday\nUsing entered person-days:\nAvailable: 10; existing work: 10; new request: 2.\nBefore displacement, demand: 12; demand beyond entered capacity: 2.\nThese are planning assumptions, not a delivery forecast. Basis: Fictional team estimates in person-days, including review and support. No assumed overtime; this is not a schedule calculation.",
      },
      {
        title: "RECOMMENDATION / DISPLACEMENT",
        body: "Narrow the request\nUse a narrow demo only with explicit reporting displacement. It meets the customer meeting need with less disruption than a production feature.\nWhat moves: Move 2 person-days of reporting work out of this planning window to create capacity for a narrow demo.\nConsequence: Reporting's stakeholder needs a revised sequence; Engineering must reassess the resulting delivery forecast.",
      },
      {
        title: "DECISION STATUS",
        body: "PROPOSAL — awaiting a decision",
      },
    ],
  },
  "mandate-reset": {
    name: "Mandate Reset",
    title: "Reset Request",
    context:
      "Several leaders can add scope; Product cannot displace it. A decision right names who can choose. Required approvals still protect security, spending, and acceptance.",
    sections: [
      {
        title: "AUTHORITY GAP / CONSEQUENCE",
        body: "Several executives can introduce work; Product cannot displace it. There is no agreed sponsor response rule before the plan changes.\nThe team receives conflicting additions while Product remains accountable for the original delivery date.",
      },
      {
        title: "REQUEST / OPERATING BOUNDARIES",
        body: "Every new scope request goes to one sponsor for an explicit displacement decision before the release plan changes.\nWithin the approved outcome and budget; required security and Engineering acceptance conditions remain intact.\nRequired agreement (A): Security/data approvals, spending limits, and Engineering acceptance remain with their accountable owners.",
      },
      {
        title: "DECISION STATUS",
        body: "PROPOSAL — awaiting a decision",
      },
    ],
  },
  "product-project-translator": {
    name: "Product / Project Translator",
    title: "Stakeholder Response",
    context:
      "A request for final requirements becomes a bounded funding decision, with a useful commitment while discovery continues.",
    sections: [
      {
        title: "MESSAGE / MEETING SCRIPT",
        body: "I understand you need a funding decision for next quarter. I can give you the outcome, investment boundary, and next decision now. We propose testing two workflows within a capped two-week phase, then bringing customer evidence and a delivery assessment before you commit to the full build. Can you approve that boundary by Thursday?",
      },
      {
        title: "DECISION NEEDED / OWNER / BY",
        body: "Approve or revise the capped discovery phase and confirm the funding decision owner.\nFinance sponsor — Thursday, before reserving discovery capacity",
      },
      {
        title: "DECISION STATUS",
        body: "PROPOSAL — awaiting a decision",
      },
    ],
  },
  "ai-stalemate-pm": {
    name: "AI Stalemate / PM",
    title: "Shared Next-Step Brief",
    context:
      "Bring the opportunity and the business assumptions into a conversation your lead can help shape.",
    sections: [
      {
        title: "CONVERSATION STATUS",
        body: "PROPOSED — NOT YET AGREED",
      },
      {
        title: "COUNTERPART'S CONCERN / NEED",
        body: "Unverified route permissions and review work that the current plan does not account for.",
      },
      {
        title: "PROPOSED OR AGREED NEXT MOVE",
        body: "PREPARE FIRST",
      },
      {
        title: "NEXT ACTION / OWNERS / REVIEW DATE",
        body: "PM validates business assumptions Thursday. Data/security owner agrees the access model Friday. Engineering manager leads pairing and verification. Both leaders review readiness next Tuesday.",
      },
    ],
  },
  "ai-stalemate-lead-dev": {
    name: "AI Stalemate / Lead Developer",
    title: "Shared Next-Step Brief",
    context:
      "Bring the delivery conditions into a conversation that also makes room for the opportunity your PM sees.",
    sections: [
      {
        title: "CONVERSATION STATUS",
        body: "PROPOSED — NOT YET AGREED",
      },
      {
        title: "COUNTERPART'S CONCERN / NEED",
        body: "Customers are waiting for an operational improvement; the sponsor expects us to find a responsible way to move faster.",
      },
      {
        title: "PROPOSED OR AGREED NEXT MOVE",
        body: "PREPARE FIRST",
      },
      {
        title: "NEXT ACTION / OWNERS / REVIEW DATE",
        body: "PM validates business assumptions Thursday. Data/security owner agrees the access model Friday. Engineering manager leads pairing and verification. Both leaders review readiness next Tuesday.",
      },
    ],
  },
};
