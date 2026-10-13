export function aiCompanionFor(audience: "pm" | "lead-dev") {
  const pm = audience === "pm";
  return [
    { after: 1, eyebrow: "VISION / MAKE THE FUTURE CONCRETE", title: "A future you can shape together.", intro: pm ? "Try the language privately before you invite your lead into it. Make room for their version of the future." : "Ask your PM for the future they are trying to create. Add what would make that future worth building and trustworthy to operate.", cards: [
      { title: "From a demand", body: "We need the team using AI. Everyone else is doing it." },
      { title: "To an invitation", body: "What if six months from now we could deliver reliable improvements sooner, explain and verify the work, and help shape the company's standards? What would make that worthwhile for you?" },
      { title: "Picture what changes", body: "Team: capability and protected review time. Product: a concrete improvement for users. Company: a trustworthy practice others could learn from." },
      { title: "Keep it open", body: "Which part do you want too? What would you change? What would need to be true? A compelling future invites contribution and examination." },
    ], takeaway: "An aspiration is a possibility to shape together. It is not evidence of a productivity gain or a promise of career advancement.", step: 0 },
    { after: 6, eyebrow: "DISCUSSION GUIDE / USE TOGETHER", title: "Give the conversation somewhere to go.", intro: "Use this shared page with your counterpart. Skip what you already understand. The aim is a clearer picture and one useful next move, not completion of every question.", cards: [
      { title: "1 / What matters?", body: "What outcome are we trying to improve? Who benefits? What context has one of us heard that the other has not?" },
      { title: "2 / What needs protecting?", body: "What concern can we make concrete? Which data, permissions, quality, capacity, or capability needs an owner or verification?" },
      { title: "3 / What do we know?", body: "What have we observed? What is a prediction or reported estimate? What would change either person's mind?" },
      { title: "4 / What is useful now?", body: "Clarify, ask a specialist, prepare, review existing evidence, propose a Bet, or stop this use. Who needs to decide or act, and when do we return?" },
    ], takeaway: "Close by stating: this is our proposal, this is what we agree, this is still unresolved. Do not infer agreement from silence.", step: 1 },
    { after: 7, eyebrow: "ANNOTATED BET / GOVERN THE EXPERIMENT", title: "A small investment with a clear learning question.", intro: "Illustrative proposal: AI-assisted drafting of authorization tests for one isolated route. Resolve readiness and confirm the owners before accepting this Bet.", cards: [
      { title: "Hypothesis & evidence", body: "We predict less total accepted-work effort, with the same allowed/denied-access quality bar. A matched without-AI task provides a comparator. The prediction is not a result." },
      { title: "Appetite & timebox", body: "Proposal: four total person-hours, including no more than one reviewer hour; a one-week window after prerequisites are verified. The budget is what we are willing to spend, not an estimate of how long all work will take." },
      { title: "Scope & permission", body: "Synthetic fixtures and approved non-production code only. No live data, production connection, role redesign, or deployment. Confirm tool, input, access-policy, and acceptance owners." },
      { title: "Success & stop", body: "Agree a minimum worthwhile full-effort improvement and unchanged acceptance checks. Stop for unapproved access, failed permission checks, or exhausted effort budget. Review the evidence before expansion." },
    ], takeaway: "The Bet is both a communication tool and the governing agreement for this experiment. Acceptance grants only its stated scope.", step: 2 },
    { after: 9, eyebrow: "COMMUNICATION / DECISION / RETURN", title: "Make the result useful to other people.", intro: pm ? "Leadership needs a status and a decision or support request. Your team needs to understand what changes in the work." : "Give your PM a technical recommendation they can communicate responsibly. Give the team clear conditions and expectations.", cards: [
      { title: "Up / leadership or sponsor", body: "Situation and outcome. What complicates it. Current proposal or agreement. Evidence and limits. The specific decision or investment needed, its owner, and a response date." },
      { title: "Down / the team", body: "Why this matters. What we are doing and why. What changes in scope, capacity, review, or permissions. Who owns the next action. What input we need and when we return." },
      { title: "Quality evidence", body: "Name the check, expected result, observed result, evidence reference, and verifier. PASSED, FAILED, and NOT CHECKED tell different stories. Effort saved does not establish quality." },
      { title: "Return / improve the conditions", body: "What happened after the action? What did we learn? Should we change a decision rule, protect reviewer time, strengthen training, or clarify a boundary? Record the next owner and date." },
    ], takeaway: "A defensible decision says what the evidence supports, what it does not establish, and who may authorize the next step.", step: 4 },
    { after: 11, eyebrow: "STUDY / PRACTICE / SHAPING", title: "Leave with a move. Return with better judgment.", intro: "This situation can develop more than one decision. Notice what changes in you, between people, in your shared future, and in the way the team works.", cards: [
      { title: "Identity / your judgment", body: "What belief did you examine? What can you now distinguish or explain that you could not before?" },
      { title: "Relationship / the conversation", body: "What did you learn about what matters to your counterpart? What helped both of you think more clearly?" },
      { title: "Vision / the worthwhile future", body: "What can you now describe together? What makes it worthwhile, and what would need to be true?" },
      { title: "Culture / the conditions", body: "Which practice, permission, decision right, or protected capacity would help other people do good work too?" },
    ], takeaway: "Choose one relevant source, bring its question into the work, and return after the next action. Explore the wider Rebel Leaders world when it helps your next question.", step: 4 },
  ];
}
