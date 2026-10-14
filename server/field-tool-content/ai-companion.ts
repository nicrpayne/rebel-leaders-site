export function aiCompanionFor(audience: "pm" | "lead-dev") {
  const pm = audience === "pm";
  return [
    {
      after: 1,
      eyebrow: "VISION / MAKE THE FUTURE CONCRETE",
      title: pm
        ? "A future you can shape together."
        : "What would make this worth building?",
      intro: pm
        ? "Try saying the idea out loud before talking with your lead. Leave room for them to improve it."
        : "Ask your PM what they hope will be better. Say what you would find useful and what you would need to trust the result.",
      cards: [
        {
          title: pm ? "From a demand" : "Start with the problem",
          body: pm
            ? "We need the team using AI. Everyone else is doing it."
            : "Which part of the work is causing trouble? Could a simpler change solve it? You can explore the problem without agreeing to a particular tool.",
        },
        {
          title: pm ? "To an invitation" : "Make the work visible",
          body: pm
            ? "What if the support team could enter a repair request once and trust it had reached the right people? Could we look at how to make that happen, and where AI might help?"
            : "Who would review the code, check access, handle failures, and maintain it? What would need to wait? An encouraging demo does not answer those questions.",
        },
        {
          title: pm ? "Picture what changes" : "Say what would convince you",
          body: pm
            ? "What would people do differently in an ordinary week? What would be easier for customers? What could we learn that another team might use?"
            : "Name the evidence you would need and what would change your mind. Separate a risk you can investigate from a boundary you cannot approve changing.",
        },
        {
          title: pm ? "Keep it open" : "Offer a way forward",
          body: pm
            ? "Ask: which part would help you too? What have I missed? What would you change? Let their answers change the idea."
            : "You might recommend a smaller experiment, preparation, another approach, or stopping this use. Explain why and invite the people affected to help shape what happens next.",
        },
      ],
      takeaway:
        "Treat this as something to explore together. You’ll still need to find out whether AI helps, and keep possible career benefits separate from promises you can make.",
      step: 0,
    },
    {
      after: 6,
      eyebrow: "DISCUSSION GUIDE / USE TOGETHER",
      title: "Give the conversation somewhere to go.",
      intro:
        "Use these questions with your colleague. Skip what you already understand. You are trying to decide what to do next; you do not need to answer every question.",
      cards: [
        {
          title: "1 / What matters?",
          body: "Who are we trying to help, and how? What have you heard that I might not know?",
        },
        {
          title: "2 / What needs protecting?",
          body: "What worries you about this idea? Can you give me an example? What would you need to check or get help with?",
        },
        {
          title: "3 / What do we know?",
          body: "What have we seen happen? What are we still guessing? What would make either of us reconsider?",
        },
        {
          title: "4 / What is useful now?",
          body: "Do we need another conversation, help from someone else, preparation, or a small experiment? Could we decide from what we already know? Who will do what next, and when will we talk again?",
        },
      ],
      takeaway:
        "Before you finish, check what you’ve agreed and what’s still a proposal. If something is unanswered, say who will follow up and when. Silence doesn’t mean yes.",
      step: 1,
    },
    {
      after: 7,
      eyebrow: "EXAMPLE EXPERIMENT PLAN",
      title: "What will we try, and how much time will we spend?",
      intro:
        "Fictional proposal: use AI to help write permission tests for one part of the repair app. Check permission, review time, and who will do the work before starting.",
      cards: [
        {
          title: "What we expect",
          body: "We think the finished tests could take less work, including review and fixes. They must still prove that allowed access works and forbidden access fails. Compare with a similar task done without AI.",
        },
        {
          title: "Time we are willing to spend",
          body: "Propose four hours across everyone involved, including at most one hour of review. Start after permission and review arrangements are confirmed, and finish within a week. Stop when the agreed time is used up.",
        },
        {
          title: "What is allowed",
          body: "Use made-up records and approved code in a test environment. Do not connect to live systems or change who can access records. Name who confirms permission and who will check the result.",
        },
        {
          title: "What would count as useful",
          body: "Agree how much time you would need to save for this to be worth doing again. Keep the required checks. Stop if access is not approved, a permission check fails, or the agreed time runs out.",
        },
      ],
      takeaway:
        "Review the plan with the people doing and approving the work. Their agreement covers this experiment only.",
      step: 2,
    },
    {
      after: 9,
      eyebrow: "COMMUNICATION / DECISION / RETURN",
      title: "Make the result useful to other people.",
      intro: pm
        ? "Let’s help people understand where things stand. Tell leadership what you need from them, and tell the team what this means for their work."
        : "Explain your findings and recommendation in your own voice. Make clear what your team can take responsibility for, what remains uncertain, and whose decision is needed next.",
      cards: [
        {
          title: "For leadership or your sponsor",
          body: "Explain the problem, what you propose or have agreed, and what you know so far. Ask for a specific decision or help, name who can provide it, and say when you need an answer.",
        },
        {
          title: "For your team",
          body: "Tell the team why this matters, what work changes, and what stays the same. Name who will do what, what you still need to ask them, and when you will talk again.",
        },
        {
          title: "Quality evidence",
          body: "For each check, say what should happen, what actually happened, who checked it, and where the result can be seen. Mark it passed, failed, or not checked. Saving time does not show that the work is correct.",
        },
        {
          title: "Come back and see what helped",
          body: "Come back after the next action. Did it help? Do people need a different rule, more review time, training, or clearer permission? Decide who will do what next and when.",
        },
      ],
      takeaway:
        "Explain what happened, what it tells you, and what you still do not know. Say who can approve the next step.",
      step: 4,
    },
    {
      after: 11,
      eyebrow: "STUDY / PRACTICE / SHAPING",
      title: "What will you take into the next conversation?",
      intro:
        "After the immediate decision, take a moment to notice what changed. You may understand the problem, your colleague, or your own reaction differently now.",
      cards: [
        {
          title: "Identity / your judgment",
          body: "What did you change your mind about? What do you understand now that you did not understand before?",
        },
        {
          title: "Relationship / the conversation",
          body: "What did you learn about what matters to your colleague? What helped you both think more clearly?",
        },
        {
          title: "Vision / the worthwhile future",
          body: "What would you like to make possible together? Why does it matter, and what would help you get there?",
        },
        {
          title: "Culture / the conditions",
          body: "What could change in how the team works so other people have the help, permission, or time they need too?",
        },
      ],
      takeaway:
        "Choose one source below if it helps with a question you still have. Try an idea in your work, then return to see what you learned.",
      step: 4,
    },
  ];
}
