import type { AIGuidePage } from "./leadership-guides.ts";
export const AI_STALEMATE_GUIDE_PAGES: AIGuidePage[] = [
  {
    eyebrow: "01 / START HERE",
    title: "You see different parts of the problem.",
    intro:
      "You have talked about AI twice already. One of you thinks it could save time. The other thinks checking its work could take longer. Another argument about AI in general is unlikely to settle that.",
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
        body: "‘They asked me to try it by Friday’ describes what happened. ‘They don’t care about quality’ adds a motive. You may have good reasons to be frustrated. You still need to ask.",
      },
      {
        title: "What could you work out together?",
        body: "You might agree to try something small. You might need permission, advice, or more information first. You might decide this use is not worth pursuing. All of those can be useful answers.",
      },
    ],
    callout:
      "The aim is to understand the opportunity and the concerns well enough to decide what to do next.",
  },
  {
    eyebrow: "02 / WHAT COULD BE BETTER?",
    title: "Give them something they can picture.",
    intro:
      "‘We need to use AI’ gives your colleague very little to work with. What would be better for someone if this went well? Start there.",
    sections: [
      {
        title: "Describe an ordinary day",
        body: "Our support team copies every repair request into two systems. Sometimes they miss one, and a customer has to call again. We want to stop making customers chase work they have already requested.",
      },
      {
        title: "Explain why you care",
        body: "Saving time matters because people could use it for something else: helping a customer, investigating a difficult fault, or finishing work that keeps being postponed. Say what you hope that time would make possible.",
      },
      {
        title: "Leave room for their answer",
        body: "Ask what they would change about your idea. They may see a simpler way to solve the problem, or a part you have missed. If their answer cannot change the proposal, it is not much of an invitation.",
      },
      {
        title: "Think beyond this one task",
        body: "You might learn a way of working the team can trust and teach to others. That could give people more confidence and room to grow. Treat it as a possibility to explore together, not a reward you can promise.",
      },
    ],
    callout:
      "Try: ‘I’d like us to stop making the team copy these requests by hand. Could we look at where AI might help—and what you would need to be comfortable trying it?’",
  },
  {
    eyebrow: "03 / TALK ABOUT THE CONCERNS",
    title: "What would need to change?",
    intro:
      "A concern is easier to work with when you know what it refers to. Ask for an example. Sometimes you can change the plan. Sometimes the answer is no, and you need to understand why.",
    sections: [
      {
        title: "‘The code is not good enough.’",
        body: "Which checks does it fail? Would a smaller task, a good example, or clearer instructions help? Keep the checks you normally require before accepting work.",
      },
      {
        title: "‘Reviewing it takes longer.’",
        body: "Ask where the extra work appears. Count the author’s checking, someone else’s review, and the fixes. A faster first draft can still take more work to finish.",
      },
      {
        title: "‘We cannot put that data in the tool.’",
        body: "Find out which data and which tool are involved. Ask the person responsible for permission. A test with made-up records may be possible, but check before starting.",
      },
      {
        title: "‘It does not know our code.’",
        body: "Ask what it is missing. A small task with a relevant example may be worth trying. If it needs access you cannot give it, change the task or stop.",
      },
      {
        title: "‘We do not have time.’",
        body: "Who would do the work and who would review it? What would they put off? Get that choice agreed. Quietly adding an experiment to someone’s evening is not a plan.",
      },
      {
        title: "‘We tried this already.’",
        body: "Ask what they tried and what happened. Use what they learned. Another experiment needs a reason: what is different, and what do you still need to find out?",
      },
    ],
    callout:
      "Try: ‘Can you show me where it goes wrong? I want to understand whether we can change the idea or should leave this use alone.’",
    sources: [
      {
        name: "GitHub: Copilot best practices",
        url: "https://docs.github.com/en/copilot/get-started/best-practices",
      },
      {
        name: "Thoughtworks: reducing AI development friction",
        url: "https://martinfowler.com/articles/reduce-friction-ai/",
      },
    ],
  },
  {
    eyebrow: "04 / BEFORE YOU TALK",
    title: "Get your own thoughts straight.",
    intro:
      "Take five or ten minutes before the conversation. You do not need a perfect argument. You need to know what matters to you and what you still need to ask.",
    sections: [
      {
        title: "What happened?",
        body: "Describe what was said or done, using words the other person would recognize.",
      },
      {
        title: "What am I assuming?",
        body: "Notice the motive you have assigned to them. Ask about it rather than presenting it as a fact.",
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
        body: "Name a result or explanation that would make you reconsider. Leave room for a better idea.",
      },
      {
        title: "What do I still need to ask?",
        body: "Write the question you have not answered by yourself. That is a good place to start the conversation.",
      },
    ],
    callout:
      "Private notes stay only in this open tab. They are not saved or included in shared documents, and they disappear when you refresh or leave. You can also reflect without typing.",
  },
  {
    eyebrow: "05 / PLAN AN EXPERIMENT",
    title: "What would be worth finding out?",
    intro:
      "Plan an experiment only if you have a useful question you cannot answer from what you already know. Agree the plan together before anyone starts.",
    sections: [
      {
        title: "Say what you expect and why",
        body: "For example: we think AI could help write permission tests faster because many of them are similar. That is a prediction. We have not shown it yet.",
      },
      {
        title: "Choose the task and the comparison",
        body: "Name exactly what you will try and what you will leave out. Choose similar work done without AI so the comparison is useful. Note differences in task size, experience, or required checks.",
      },
      {
        title: "Check permission",
        body: "Record the approved tool and version, the code and data it may use, and who confirmed permission. Permission for this experiment does not cover live customer systems or wider use.",
      },
      {
        title: "Agree the time and checks",
        body: "Include time to prepare, write, check, review, and fix the work. Decide what must pass before you accept it. Agree what other work will wait and who can approve that change.",
      },
      {
        title: "Decide what would count as useful",
        body: "Write your prediction separately from the smallest improvement that would make another use worthwhile. Agree when to stop—for example, if a permission check fails or you use up the review time.",
      },
      {
        title: "Give the plan to the people doing it",
        body: "Name the author, reviewer, person who can approve the result, and review date. Confirm they have agreed. If something is missing, pause and name who will resolve it.",
      },
    ],
    callout:
      "The idea of choosing how much time to invest draws on Ryan Singer’s Shape Up (basecamp.com/shapeup). An experiment that never started has no result.",
  },
  {
    eyebrow: "06 / COUNT ALL THE WORK",
    title: "Did the faster draft save any time?",
    intro:
      "Count everyone’s working minutes, including checking and fixes. Two people working for 30 minutes use 60 person-minutes. That is different from how long the task took on the clock.",
    sections: [
      {
        title: "A separate fictional example",
        body: "These numbers describe one small task writing software tests. The finished tests passed the required checks after fixes. This is separate from the preparation example in the Lab.",
      },
      {
        title: "What happened?",
        body: "AI cut drafting by 33 minutes. Checking, review, and fixes used 40 more. The whole task therefore took seven extra minutes. The reviewer spent 30 minutes, twice the agreed 15-minute limit; that limit was exceeded and needs to be addressed before another experiment.",
      },
      {
        title: "What else do you need to know?",
        body: "Record failed checks, later defects, tool costs, and anything that makes the tasks hard to compare. Ask the author and reviewer how the work felt. One task cannot tell you what will happen everywhere.",
      },
    ],
    callout:
      "Enter 0 when no time was spent. Leave a box blank when you do not know. A partial total cannot show a saving.",
    table: [
      ["Work", "Without AI", "With AI"],
      ["Preparation", "10 min", "15 min"],
      ["Writing the first version", "45 min", "12 min"],
      ["Author checking and testing", "15 min", "25 min"],
      ["Someone else reviewing", "15 min", "30 min"],
      ["Fixes", "5 min", "15 min"],
      ["Later follow-up", "0 min", "0 min"],
      ["Total working minutes", "90 min", "97 min"],
    ],
  },
  {
    eyebrow: "07 / DECIDE WHAT HAPPENS NEXT",
    title: "You do not have to make the experiment a success.",
    intro:
      "Look at what happened against what you agreed beforehand. The result may change your mind. That is part of the point.",
    sections: [
      {
        title: "CONTINUE",
        body: "The result supports using AI for this task under the agreed conditions. Say where that permission ends and when you will check again.",
      },
      {
        title: "REVISE",
        body: "Something looks useful, but the task, instructions, or review needs to change. Describe the change before asking people to try again.",
      },
      {
        title: "STOP",
        body: "The result does not justify this use, or an agreed limit was broken. Explain why you are stopping and keep what you learned.",
      },
      {
        title: "PAUSE",
        body: "You are missing permission, information, time, or a person who needs to be involved. Name what is missing, who will resolve it, and when you will return. You can choose this before an experiment.",
      },
    ],
    callout:
      "Write what you decided, why, who will do what next, and when. If you have not agreed, keep the record marked as a proposal and say what still needs deciding.",
  },
  {
    eyebrow: "08 / A WORKED EXAMPLE",
    title: "The next step is preparation.",
    intro:
      "Fictional case: support staff copy repair requests between two systems. The PM thinks an AI-assisted app could help. The lead wants to check who can see the records and whether the team can safely check and release the code.",
    sections: [
      {
        title: "What the PM knows",
        body: "The sales director says reducing the delay could create $500,000 of value a week. Nobody has checked the calculation. The PM will ask Finance what the figure includes before treating it as a fact.",
      },
      {
        title: "What the lead needs to check",
        body: "Staff should see only the customer records their jobs require. The team needs tests that prove forbidden access is blocked, including direct requests to the app’s API—the connection other software uses.",
      },
      {
        title: "What they propose",
        body: "Prepare first. The data owner will decide who may see which records. The engineering manager will pair developers with an experienced reviewer to practise checking, releasing, and undoing a change.",
      },
      {
        title: "What they record",
        body: "PAUSE this use for now. Check progress next Tuesday. No experiment or connection to live customer data is approved. A later test with made-up records would need its own permission.",
      },
      {
        title: "What they tell leadership",
        body: "‘We can see why this could help. Before we try it, we need to agree who can see the customer records and check that the team can release a change safely. Can we make time for that preparation? We’ll review it next Tuesday.’",
      },
    ],
    callout:
      "They have a proposal someone can answer, with specific work and people responsible. They have not measured an AI productivity gain.",
  },
  {
    eyebrow: "09 / USE THE LAB",
    title: "Bring one real conversation.",
    intro:
      "The Guide explains the questions. The Lab gives you somewhere to answer them and prepare a document you can share. You can start where you are; you do not need to fill in every box.",
    sections: [
      {
        title: "1. Before you talk",
        body: "Write private notes, or think through the questions without typing. What matters to you, what are you assuming, and what do you still need to ask?",
      },
      {
        title: "2. Conversation",
        body: "Share what you want to improve and ask about the concerns. Choose what to do next. Build Next Step Together, check it, then copy, download, or print it. Mark a proposal as a proposal.",
      },
      {
        title: "3. Experiment, if useful",
        body: "Agree the task, time, checks, permissions, people, and review date. Build and review the Experiment Plan before starting. You can skip this step if your next move does not involve an experiment.",
      },
      {
        title: "4. Results",
        body: "Return after the experiment. Enter all the time spent, the quality checks, and what happened. Build the Results Record. Leave unknown values blank.",
      },
      {
        title: "5. Next step",
        body: "Write the decision and the reason. Name who will do what next and when you will check again. Build the Decision Brief and review it before sharing.",
      },
    ],
    callout:
      "Shared drafts are saved in this browser on this device. Download work you need to keep before changing devices or clearing browser data. Private notes are never saved. Load Examples offers fictional answers; if the step contains work, it asks before replacing it.",
  },
];
