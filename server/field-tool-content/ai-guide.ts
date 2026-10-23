import type { AIGuidePage } from "./leadership-guides.ts";
export const AI_STALEMATE_GUIDE_PAGES: AIGuidePage[] = [
  {
    eyebrow: "01 / START HERE",
    title: "You see different parts of the problem.",
    intro:
      "You’re looking at the same AI idea from different parts of the work. Let’s make space for both: what could get better, what needs checking, and what you could work out together.",
    sections: [
      {
        title: "What are you hoping to improve?",
        body: "Start with somebody’s actual work. Perhaps the support team copies the same repair request into two systems. An app could save them that trouble. AI is one possible way to help build it.",
      },
      {
        title: "What is your colleague worried about?",
        body: "Perhaps the app could let one customer see another customer’s records. Perhaps the person checking the code is already busy. Ask what the concern means for this piece of work.",
      },
      {
        title: "What have you assumed about each other?",
        body: "“They asked whether we could try another tool” describes what happened. “They don’t care about quality” adds a motive. So does “My lead just hates change.” Ask what is behind the request or hesitation.",
      },
      {
        title: "What could you work out together?",
        body: "You might agree to try something small. You might need permission, advice, or more information first. You might decide this use isn’t worth pursuing. All of those can be useful answers.",
      },
    ],
    callout:
      "The aim is to understand the opportunity and the concerns well enough to decide what to do next together.",
  },
  {
    eyebrow: "02 / WHAT COULD BE BETTER?",
    title: "Give them something they can picture.",
    intro:
      "Let’s start with something your colleague can picture. If this went well, whose work or experience would get better, and how?",
    sections: [
      {
        title: "Describe an ordinary day",
        body: "Our support team copies every repair request into two systems. Sometimes they miss one, and a customer has to call again. We want to stop making customers chase work they have already requested.",
      },
      {
        title: "Explain why you care",
        body: "The work keeps slipping while people keep doing it by hand. Explain what waiting means for customers, the business, and trust in the team. Ask which part of the delay comes from scope, decisions, handoffs, or building the software.",
      },
      {
        title: "Leave room for their answer",
        body: "Ask what they would add or change. Try not to get too attached to your own idea. A smaller change, a different process, or a tool you haven’t considered might help more.",
      },
      {
        title: "Think beyond this one task",
        body: "Make learning part of the reason to do this. What skills would people like to build for this job, their next role, or a side project? Ask them. Give that learning time and support, rather than treating it as something to squeeze in afterward.",
      },
    ],
    callout:
      "Try: ‘I’d like us to stop making the team copy these requests by hand. Could we look at where AI might help—and what you would need to be comfortable trying it?’",
  },
  {
    eyebrow: "03 / TALK ABOUT THE CONCERNS",
    title: "Are we willing to try a different way?",
    intro:
      "You may be talking about more than one AI tool. Reports of big gains elsewhere can make the current pace feel hard to accept. They give you a reason to investigate, not a promise about what your team will achieve.",
    sections: [
      {
        title: "Name the real ask",
        body: "“Are you willing to explore different tools or ways of working, to see whether we can deliver useful things sooner?” You are asking for a willingness to learn. The team should help choose what to try.",
      },
      {
        title: "Ask what the first objection leaves out",
        body: "“What worries you most about where this is going?” It might be review work, trust, job security, or losing a part of the craft they enjoy. Don’t decide that for them, and don’t dismiss a technical concern as an emotional one.",
      },
      {
        title: "Talk about what good work means",
        body: "A tool you expect to replace soon still needs to be safe and useful for its purpose. Ask what deserves lasting investment and what can stay simple. Engineering judgment matters in both; “good enough” needs a shared meaning.",
      },
      {
        title: "Make room for both people to move",
        body: "The PM may need to change the idea, scope, or deadline. The lead may see a process worth changing or a tool worth trying. Ask what would change each person’s mind, including what would make you stop.",
      },
      {
        title: "If the answer is no, understand the no",
        body: "Is it this tool, this task, the timing, or experimenting at all? What alternative would help the team improve? Name the tradeoff and who can decide if you still disagree. Don’t turn a conversation into a loyalty test.",
      },
    ],
    callout:
      "Try: “I’m excited about the possibility, but I don’t need my first idea to win. What would be worth exploring together?”",
  },
  {
    eyebrow: "04 / BEFORE YOU TALK",
    title: "Take a moment before you talk.",
    intro:
      "Take five or ten minutes before the conversation. You don’t need a perfect argument. You need to know what matters to you and what you still need to ask.",
    sections: [
      {
        title: "What happened?",
        body: "Describe what was said or done, using words the other person would recognize.",
      },
      {
        title: "What am I assuming?",
        body: "Notice the motive you have assigned to them. Depending on your history together and how you react under pressure, this can be hard. Write what you know, then what you need to ask.",
      },
      {
        title: "Why does this matter to me?",
        body: "Say what you hope to improve or what you would be responsible for if it went wrong.",
      },
      {
        title: "What have I actually seen?",
        body: "Separate something you observed from something you expect. Both can matter, but they are different kinds of information.",
      },
      {
        title: "What would change my mind?",
        body: "Name something that would make you reconsider. Be honest if you are attached to the tool or to the familiar way of working. Neither gets a free pass.",
      },
      {
        title: "What do I still need to ask?",
        body: "Write the question you haven’t answered by yourself. That’s a good place to start the conversation.",
      },
    ],
    callout:
      "Private notes stay only in this open tab. They aren’t saved or included in shared documents, and they disappear when you refresh or leave. You can also reflect without typing.",
  },
  {
    eyebrow: "05 / PLAN AN EXPERIMENT",
    title: "What would be worth finding out?",
    intro:
      "Plan an experiment only if you have a useful question you can’t answer from what you already know. Agree the plan together before anyone starts.",
    sections: [
      {
        title: "Choose a question worth answering",
        body: "Could a different tool or process help us get a small repair-request workflow in front of users sooner? Could we make review easier too? Choose one question, then a task that can answer it.",
      },
      {
        title: "Compare fairly",
        body: "Record how similar work gets done today, including waiting and rework. Try the new approach on a comparable slice. Note differences in scope, experience, and checks. A prototype and a production release aren’t like-for-like.",
      },
      {
        title: "Match the checks to the task",
        body: "Agree the tool, data, environment, and limits with the people responsible. An isolated prototype with made-up records needs a different plan from a change to live customer systems.",
      },
      {
        title: "Budget time, tools, and support",
        body: "Include product, design, engineering, review, and user feedback. Agree a token or usage budget, training or pairing time, and what work will wait. Nobody should have to learn it in their evenings.",
      },
      {
        title: "Decide what would make it worthwhile",
        body: "Agree what users should be able to do and what the team should learn. If saving time is the question, set a meaningful comparison. Choose stop conditions and a time to review what happened.",
      },
      {
        title: "Give the team a clear path",
        body: "Name who helps, who reviews, and who can accept the work. Let the people doing it shape the plan. Make the first step small enough to learn from and clear enough to start.",
      },
    ],
    callout:
      "Choose how much you are willing to invest before starting. Review the result together before spending more. An experiment that never started has no result.",
  },
  {
    eyebrow: "06 / VALUE AND EFFORT",
    title: "What value could each team hour create?",
    intro:
      "Start with the benefit people might get, then the whole team’s effort to deliver it. This fictional example uses estimated annual business value. It is a planning comparison, not measured savings or proof that AI caused an improvement.",
    sections: [
      {
        title: "Make the assumptions visible",
        body: "The hours include engineering, design, product, and review. Both options assume the same useful outcome. The 400 hours is a hypothesis to investigate. Check the value with its owner, including adoption, scope, and shared foundations.",
      },
      {
        title: "Price the experiment separately",
        body: "Twelve team hours at an assumed blended $150/hour, plus $100 for tools and tokens, gives a $1,900 budget. At that rate, freeing about 12.7 team hours would equal that investment in capacity. It is not cash payback.",
      },
      {
        title: "Then check what actually happened",
        body: "Did users use it? Did it help? Count checking, fixes, and later support as well as drafting. Record elapsed delivery time separately. The Lab’s minutes table can help compare one task; it cannot establish the product’s annual value.",
      },
    ],
    callout:
      "Keep estimated value, measured benefits, time freed, and cash savings separate. Include ongoing costs when deciding whether to continue. Never add overlapping benefits together.",
    table: [
      ["Illustrative estimate", "Current approach", "Possible approach"],
      ["Annual business value", "$180,000", "$180,000"],
      ["Total team hours", "600 hr", "400 hr"],
      ["Annual value / team hour", "$300 / hr", "$450 / hr"],
    ],
  },
  {
    eyebrow: "07 / DECIDE WHAT HAPPENS NEXT",
    title: "What did we learn, and what should we do next?",
    intro:
      "Let’s compare what happened with what you hoped to find. It’s useful to learn that this task needs a different approach, or that this use of AI isn’t worth continuing.",
    sections: [
      {
        title: "CONTINUE",
        body: "The result supports using AI for this task under the agreed conditions. Say where that permission ends and when you’ll check again.",
      },
      {
        title: "REVISE",
        body: "Something looks useful, but the task, instructions, or review needs to change. Describe the change before asking people to try again.",
      },
      {
        title: "STOP",
        body: "The result doesn’t justify this use, or an agreed limit was broken. Explain why you’re stopping and keep what you learned.",
      },
      {
        title: "PAUSE",
        body: "You’re missing permission, information, time, or a person who needs to be involved. Name what is missing, who will resolve it, and when you’ll return. You can choose this before an experiment.",
      },
    ],
    callout:
      "Write what you decided, why, who will do what next, and when. If you haven’t agreed, keep the record marked as a proposal and say what still needs deciding.",
  },
  {
    eyebrow: "08 / A WORKED EXAMPLE",
    title: "From a stalled debate to a useful proposal.",
    intro:
      "Fictional case: a repair-request workflow keeps slipping while support staff copy records between two systems. The PM wants to explore AI and different ways of working. The lead worries that faster drafts will become more review and support work.",
    sections: [
      {
        title: "What the PM brings",
        body: "“Support keeps asking when this will be ready. Here’s what waiting means for them. I’m interested in the gains other teams report, but I don’t know what we could achieve here. Are you willing to explore that with me?”",
      },
      {
        title: "What the lead brings",
        body: "“I’m open to trying. I don’t want us to call a demo finished and leave the team to pick up the pieces. Let’s choose a small workflow, make room for review, and get some help with the tools.”",
      },
      {
        title: "What they propose",
        body: "A one-week prototype using made-up repair requests. Reserve twelve total team hours, including user feedback and review, plus $100 for tools and tokens. The PM asks what other work can wait; the lead arranges an experienced partner.",
      },
      {
        title: "What they want to learn",
        body: "Can support staff complete the task without a second entry? What slows the team down, and can tooling or a different review process help? Ask each person what skill they want to practise. A prototype is not a release approval.",
      },
      {
        title: "What they tell leadership",
        body: "“Could we make room for this experiment? The proposal is twelve team hours plus $100 for tools. We’ll bring back user feedback, what the team learned, and a recommendation next Tuesday. We haven’t agreed the time or started yet.”",
      },
    ],
    callout:
      "PAUSE until the people and budget are agreed. The next move is specific and reviewable. They haven’t measured an AI productivity gain.",
  },
  {
    eyebrow: "09 / USE THE LAB",
    title: "Bring one real conversation.",
    intro:
      "Ready to try this with your own situation? The Lab helps you work through the questions and prepare something to talk over with your colleague. Start where it helps; you don’t need to fill every box.",
    sections: [
      {
        title: "1. Before you talk",
        body: "Write private notes, or think through the questions without typing. What matters to you, what are you assuming, and what do you still need to ask?",
      },
      {
        title: "2. Conversation",
        body: "Share what you want to improve and ask about the concerns. Choose what to do next. Preview Next Step Together, check it, then copy, download, or print it. Mark a proposal as a proposal.",
      },
      {
        title: "3. Experiment, if useful",
        body: "Agree the task, time, checks, permissions, people, and review date. Read through the Experiment Plan before starting. You can skip this step if your next move doesn’t involve an experiment.",
      },
      {
        title: "4. Results",
        body: "Return after the experiment. Enter all the time spent, the quality checks, and what happened. Preview the Results Record. Leave unknown values blank.",
      },
      {
        title: "5. Next step",
        body: "Write the decision and the reason. Name who will do what next and when you’ll check again. Preview the Decision Brief and review it before sharing.",
      },
    ],
    callout:
      "Shared drafts are saved in this browser on this device. Download work you need to keep before changing devices or clearing browser data. Private notes are never saved. Load Examples offers fictional answers; if the step contains work, it asks before replacing it.",
  },
];
