import { AI_DEV_COMPANION } from "./ai-dev-guide.ts";
export function aiCompanionFor(audience: "pm" | "lead-dev") {
  if (audience === "lead-dev") return structuredClone(AI_DEV_COMPANION);
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
            ? "Are you willing to explore some different tools or ways of working with me? I’d like us to get useful work to people sooner and help the team build skills it wants."
            : "Explain where time goes today: decisions, building, review, fixes, or support. Ask which tools or process changes might help. A useful demo can teach you something without answering every production question.",
        },
        {
          title: pm ? "Picture what changes" : "Say what would convince you",
          body: pm
            ? "What would be easier for users? What does each person want to learn for this job or the next one? What time, tools, token budget, and help would make that possible?"
            : "Name the evidence you would need and what would change your mind. Separate a risk you can investigate from a boundary you cannot approve changing.",
        },
        {
          title: pm ? "Keep it open" : "Offer a way forward",
          body: pm
            ? "Ask: what have I missed? What would you change? Try not to get too attached to your idea. There might be a better one. Let your lead help choose what to explore."
            : "You might recommend a smaller experiment, preparation, another approach, or stopping this use. Explain why and invite the people affected to help shape what happens next.",
        },
      ],
      takeaway:
        "Stay open to a better approach. Make learning part of the purpose and fund it properly. The question is what helps users and the team, not whose first idea wins.",
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
          body: "What worries you most about this change? Is it this task, the workload, what happens to the craft, or something else? Ask rather than assume. Take the technical concerns seriously too.",
        },
        {
          title: "3 / What do we know?",
          body: "What have we seen here, and what have we only heard about elsewhere? What would change either person’s mind? What does each teammate want to learn?",
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
        "Fictional proposal: explore one repair-request workflow with made-up records. Agree the people, time, tools, and review approach before starting. This is a learning prototype, not a live release.",
      cards: [
        {
          title: "What we expect",
          body: "Could a different tool and review approach get useful feedback sooner? Ask Support to complete the task. Compare with a similar recent prototype, and note differences in scope, experience, and checks.",
        },
        {
          title: "Time and money we could invest",
          body: "Twelve total team hours, including up to three for review, over one week. At an assumed $150/hour plus $100 for tools and tokens, that is $1,900. Agree what other work waits.",
        },
        {
          title: "What is allowed",
          body: "Use made-up records in an approved, isolated environment. Choose the tool and review help with the lead. No live records, connections, or release. Name who checks the work and who can accept it.",
        },
        {
          title: "What would count as useful",
          body: "Users can complete the task, the agreed checks pass, and the team can explain what it learned. Stay within the time and usage caps. Decide together whether the learning justifies another step.",
        },
      ],
      takeaway:
        "The next chapter connects estimated business value with total team effort. Review this plan with the people doing and approving the work; agreement covers this experiment only.",
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
