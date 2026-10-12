export const FIELD_TOOL_PUBLIC_SAMPLES: Record<string, string> = {
  "ai-stalemate":
    "AI STALEMATE — TRIAL CARD\n\nWORK OUTCOME\nReduce the full effort of producing accepted unit tests.\n\nSHARED AMBITION / WHY THIS MATTERS\nBuild a responsible test-writing practice the team can trust, giving people more time for judgment and helping other teams learn from our evidence.\n\nBOUNDED TASK / OUT OF SCOPE\nOne isolated unit-test task. Production code and customer data are out of scope.\n\nCOMPARATOR / WHY IT IS COMPARABLE\nA recent unit-test task of similar size, using the same author, reviewer, and acceptance checks.\n\nAI TOOL / VERSION\nTeam-approved AI tool. Synthetic fixtures only; engineering lead confirms approval before starting.\nVersion: Record the team's approved model/version before running the trial.\n\nALLOWED INPUTS / APPROVAL OWNER\nSynthetic fixtures only; no production code or customer data.\nApproval owner: Engineering lead\n\nQUALITY BAR / ACCEPTANCE OWNER\nExisting test review and CI checks stay intact. Engineering lead owns acceptance.\n\nPROTECTED CAPACITY / DISPLACED WORK\nOne author and one reviewer; time is reserved before work starts.\n\nSUCCESS BAR\nLower total effort than the comparator, without lowering the quality bar or moving extra work to the reviewer.\n\nSTOP RULE\nStop for unapproved inputs, a missed quality check, or reviewer effort beyond the agreed limit.\n\nTASK / REVIEWER / DECISION OWNERS / REVIEW DATE\nAuthor: developer. Reviewer and decision owner: engineering lead. Review: Friday.\n\nRecord these shared conditions before the trial. Private preparation is excluded.\n\n\nAI STALEMATE — EVIDENCE RECORD\n\nTESTED TASK\nOne isolated unit-test task. Production code and customer data are out of scope.\n\nCOMPARATOR / COMPARABILITY LIMITS\nA recent unit-test task of similar size, using the same author, reviewer, and acceptance checks.\nOne matched local task. First-use learning may affect the result; these are illustrative person-minutes.\n\nRECORDED PERSON-MINUTES\nSetup, context, and prompting\n  Without AI: 10 min\n  With AI: 15 min\n\nDrafting / implementation\n  Without AI: 45 min\n  With AI: 12 min\n\nAuthor verification and tests\n  Without AI: 15 min\n  With AI: 25 min\n\nReviewer checking\n  Without AI: 15 min\n  With AI: 30 min\n\nRework and fixes\n  Without AI: 5 min\n  With AI: 15 min\n\nFollow-up work\n  Without AI: 0 min\n  With AI: 0 min\n\nTOTAL RECORDED EFFORT\nWithout AI: 90 min\nWith AI: 97 min\nRecorded effort difference: 7 min (with AI minus without AI).\n\nAUTHOR / COMPARATOR NOTES\nUse the comparable recent test task as the baseline; record author, review, and rework effort.\nDrafting is faster; verification and reviewer effort are higher.\n\nQUALITY CHECKS / DEFECTS / REVIEWER EXPERIENCE\nQuality bar passed after rework. The agreed total-effort bar was missed.\n\nELAPSED TIME / TOOL COST / LEARNING EFFECTS\nTool cost and elapsed time recorded separately. This example does not calculate ROI.\n\nLATER DEFECT CHECK / OWNER / DATE\nEngineering lead checks for follow-up defects one week later.\n\nThese totals describe recorded effort for this task. They do not establish quality, causation, or a universal productivity result.\n\n\nAI STALEMATE — DECISION BRIEF\n\nWORK OUTCOME / TESTED TASK\nReduce the full effort of producing accepted unit tests.\nOne isolated unit-test task. Production code and customer data are out of scope.\n\nSHARED AMBITION\nBuild a responsible test-writing practice the team can trust, giving people more time for judgment and helping other teams learn from our evidence.\n\nCONDITIONS / COMPARATOR\nTeam-approved AI tool. Synthetic fixtures only; engineering lead confirms approval before starting. — Record the team's approved model/version before running the trial.\nA recent unit-test task of similar size, using the same author, reviewer, and acceptance checks.\n\nEVIDENCE\n90 person-minutes without AI; 97 with AI.\nQuality bar passed after rework. The agreed total-effort bar was missed.\n\nDECISION\nREVISE\n\nWHY / UNRESOLVED DISAGREEMENT\nThe current workflow transfers too much effort to review.\n\nLIMITS OF THIS EVIDENCE\nOne local task does not establish a universal AI productivity gain or loss.\n\nNEXT ACTION / ACCOUNTABLE OWNER / DATE\nEngineering lead narrows the task and review workflow before approving another trial.\n\nUPDATE TO LEADERSHIP\nThe first test passed quality after rework but used 97 person-minutes versus 90 without AI; we are revising the review workflow before testing again.",
  "deadline-reset":
    "DEADLINE RESET — STAKEHOLDER UPDATE\n\nCURRENT COMMITMENT\nThe communicated date is November 1.\nThe current promise is: The full launch, communicated by the sponsor before discovery finished.\n\nWHAT IS ACTUALLY FIXED\nThe customer event on November 1.\n\nWHAT IS STILL ASSUMED / UNKNOWN\nAssumptions: All requested features ship together.\nUnknowns: An integration dependency is not yet confirmed.\n\nTRADEOFF\nTo protect the date, the responsible scope/capacity move is:\nScope / sequence: Ship the core customer workflow first; sequence reporting after the event.\nCapacity: Keep the current team; no assumed overtime.\n\nIF NOTHING CHANGES\nKeeping full scope leaves the date at low confidence.\n\nGUARDRAILS WE WILL NOT TRADE\nSecurity review and acceptance checks remain required.\n\nCURRENT CONFIDENCE\nMedium\n\nWHAT CHANGES CONFIDENCE NEXT\nIntegration review with the dependency owner to check confidence in the smaller scope.\n\nDECISION NEEDED NOW\nApprove the smaller launch scope or revise the date.\n\nNEXT CHECKPOINT / OWNER\nNext Thursday — Product sponsor",
  "priority-whiplash":
    "PRIORITY WHIPLASH — TRADEOFF BRIEF\n\nCURRENT PRIORITIES\n1. Finish the customer onboarding fix\n2. Complete the security review\n3. Ship the reporting update\n\nNEW REQUEST\nAn executive demo requested mid-sprint.\n\nWHY NOW\nA customer meeting was added for Friday.\n\nIF THIS ENTERS, WHAT MOVES\nPause the reporting update for one week.\n\nCONSEQUENCE\nThe reporting customer receives a revised date.\n\nWHAT STAYS PROTECTED\nSecurity review and the onboarding fix.\n\nRECOMMENDATION\nAccept the demo only with an explicit reporting displacement.\n\nDECISION OWNER / DATE\nProduct sponsor — Today\n\nFINAL DECISION\nSponsor accepts the displacement and owns the customer update.",
  "mandate-reset":
    "MANDATE RESET — DECISION RIGHTS BRIEF\n\nOUTCOME I AM ACCOUNTABLE FOR\nDeliver the agreed roadmap outcome.\n\nDECISION I CANNOT CURRENTLY MAKE\nRemove or sequence newly requested scope.\n\nCURRENT DECISION PATH\nRecommend: Product manager\nApprove / decide: Executive sponsor\nExecute: Product and Engineering\nCan block: Requesting executives\nHeld accountable: Product manager\n\nTHE AUTHORITY GAP\nSeveral executives can add work; the PM accountable for delivery cannot displace it.\n\nCONSEQUENCE IF UNRESOLVED\nThe date slips while Product remains accountable.\n\nREQUESTED RESET\nGive the sponsor a single decision rule: every new request names the displaced commitment.\n\nIF THAT CANNOT CHANGE\nEscalate new requests to the sponsor within one working day before changing the plan.\n\nACTION OWNER / DATE\nExecutive sponsor — Before the next planning session",
  "product-project-translator":
    'PRODUCT / PROJECT TRANSLATOR\n\nORIGINAL REQUEST\n"Give me the final requirements."\n\nWHO IS ASKING\nFinance sponsor\n\nWHAT THEY LIKELY NEED\nBudget / staffing\nContext: They need to reserve next-quarter funding.\n\nPROJECT ASSUMPTION TO TRANSLATE\nAll useful requirements can be fixed before testing the customer workflow.\n\nPRODUCT REALITY\nKnown now: The target customer outcome and initial budget boundary.\nStill unknown: Which workflow solves the customer problem with acceptable effort.\nWe can responsibly commit to: Test the two candidate workflows within the agreed discovery budget.\nNext evidence / checkpoint: Review customer evidence and delivery range in two weeks.\n\nRESPONSIBLE RESPONSE\nI can give you the outcome, budget boundary, and the next funding decision now. We\'ll use the two-week evidence review to narrow scope before committing to the full build.',
};
export const FIELD_TOOL_PUBLIC_GUIDE_EXCERPTS: Record<
  string,
  { reframe: string; rules: string[] }
> = {
  "ai-stalemate": {
    reframe:
      "The AI argument is often not really about whether AI is good. Product may be carrying the cost of missed opportunity while Engineering carries the cost of verification, maintainability, security, and owning what ships.",
    rules: [
      "No villain. Assume both people may be protecting something legitimate.",
      "Observation before motive. Describe what happened before diagnosing why.",
      "The proposal is allowed to change.",
      "Count the full workflow cost, not only drafting speed.",
      "STOP is a legitimate experimental outcome.",
    ],
  },
  "deadline-reset": {
    reframe:
      "The problem is not that stakeholders want dates. They need coordination. The failure begins when a forecast, a scope hypothesis, and a promise are treated as the same thing.",
    rules: [
      "Separate the communicated promise from current delivery reality.",
      "Name what is genuinely fixed and what is only assumed.",
      "If the date cannot move, something else must.",
      "Do not trade away quality or safety without naming the consequence.",
      "Update confidence when evidence changes; that is learning, not failure.",
    ],
  },
  "priority-whiplash": {
    reframe:
      "Teams do not have a prioritization problem when they have too few labels. They have one when new work enters without an explicit decision about what loses time, scope, or attention.",
    rules: [
      "Put competing work on the same surface.",
      "Every new yes names a displaced no.",
      "Do not let the team quietly make strategy through overtime.",
      "Protect work in progress from endless reshuffling.",
      "Record the choice, owner, consequence, and date.",
    ],
  },
  "mandate-reset": {
    reframe:
      "If you are responsible for an outcome but cannot move the lever that determines it, the problem may not be confidence or influence. It may be an authority gap in the operating system.",
    rules: [
      "Name the outcome before mapping authority.",
      "Recommendation, approval, execution, veto, and accountability are different roles.",
      "Ask for a specific decision right, not vague empowerment.",
      "Do not compensate indefinitely for unclear governance.",
      "If authority cannot move, define an escalation path and operating rule.",
    ],
  },
  "product-project-translator": {
    reframe:
      "Most project-style requests are not irrational. Stakeholders are usually asking for confidence, sequencing, budget protection, customer communication, or accountability. Product leadership should answer that need without inventing certainty.",
    rules: [
      "Do not shame stakeholders for wanting coordination.",
      "Decode the need beneath the request.",
      "Translate false certainty into evidence, ranges, tradeoffs, and checkpoints.",
      "Always offer a useful alternative — not just 'we can't know.'",
      "Treat changing plans as new information becoming visible.",
    ],
  },
};
