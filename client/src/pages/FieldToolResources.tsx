import { useState } from "react";
import { Link } from "wouter";
import { Fingerprint, UsersRound, Telescope, Orbit } from "lucide-react";
import FieldToolsNav from "@/components/field-tools/FieldToolsNav";
import FieldToolsFooter from "@/components/field-tools/FieldToolsFooter";
import { teachingSources } from "@/components/field-tools/TeachingNote";
import { fieldToolBase } from "@/lib/field-tool-paths";

type ProductCase = {
  slug: string;
  name: string;
  chapter: number;
  situation: string;
  recurring: string;
  move: string;
  rows: [string, string, string][];
};

const productCases: ProductCase[] = [
  {
    slug: "ai-stalemate",
    name: "AI Stalemate",
    chapter: 6,
    situation:
      "The PM thinks AI could help customers get a useful change sooner. The lead developer expects extra checking, fixes and maintenance. Both have something worth understanding.",
    recurring:
      "If concerns are dismissed as resistance, the next concern is more likely to stay private. If every idea is dismissed before it can be explored, people stop bringing possibilities.",
    move: "Let each person explain what they see. Shape the next step together, including what would make you change your mind.",
    rows: [
      [
        "Spiritual",
        "The team must look as though it is adopting AI, whether or not the work helps anyone.",
        "Name who the change should help and how. Let that purpose determine whether the idea is worth pursuing.",
      ],
      [
        "Emotional",
        "A concern is treated as negativity; enthusiasm is treated as naïveté.",
        "Ask what the other person has seen. Check that you have understood before defending your position.",
      ],
      [
        "Leading",
        "Someone is expected to own the experiment but cannot approve the time or stop the work.",
        "Agree who can approve it, who carries the work and who can stop it when a limit is reached.",
      ],
      [
        "Technical",
        "Fast drafting is counted; review, fixes, testing and maintenance disappear from the calculation.",
        "Include the whole job. Agree the checks before you start and record the extra work as well as any time saved.",
      ],
      [
        "Physical",
        "The experiment is added to an already full week and spills into evenings.",
        "Give the experiment a time budget and choose which other work waits. Count the reviewer’s time too.",
      ],
    ],
  },
  {
    slug: "deadline-reset",
    name: "Deadline Reset",
    chapter: 3,
    situation:
      "Customers have been promised online repair booking and service reports by November 1. The team has not checked whether the booking page puts appointments into the repair calendar. Asking for a more confident answer will not resolve that unknown.",
    recurring:
      "When bad news is punished, people learn to delay it. A more elaborate progress report will not change that lesson by itself.",
    move: "Make it possible to name the unknown early. Decide what to check, what can change and who needs to revisit the promise.",
    rows: [
      [
        "Spiritual",
        "Looking certain matters more than giving the customer an honest answer.",
        "Name the useful result you want to protect. Say which parts of the promise you can and cannot support yet.",
      ],
      [
        "Emotional",
        "Saying “I don’t know yet” is treated as incompetence.",
        "Ask what needs checking and what would make the answer firmer. Thank the person for raising it early.",
      ],
      [
        "Leading",
        "The team must meet a promise it had no part in making and has no permission to change.",
        "Bring workable choices to the person who owns the promise. Ask them to choose what can move.",
      ],
      [
        "Technical",
        "Planning skips the investigation needed to understand the difficult part.",
        "Make time to check that part. Use the result to update what is possible and how confident you are.",
      ],
      [
        "Physical",
        "Nights and weekends quietly become the missing time in the plan.",
        "Plan with the hours people actually have. Reduce or move work when the plan does not fit.",
      ],
    ],
  },
  {
    slug: "priority-whiplash",
    name: "Priority Whiplash",
    chapter: 3,
    situation:
      "The team is fixing broken invitations for new accounts, checking who can see customer records, and correcting the wrong totals in a monthly report. Now the sales director wants a demonstration for Friday’s customer meeting.",
    recurring:
      "If every new request is accepted and nobody names what moves, the team learns that a priority list does not protect its time.",
    move: "Find out what the customer needs to see. Show what each workable choice would delay, and get the decision from someone who can make it.",
    rows: [
      [
        "Spiritual",
        "The loudest request wins, even when another customer need matters more.",
        "Explain who each piece of work helps and what happens if it waits. Compare the actual needs.",
      ],
      [
        "Emotional",
        "Saying something must move makes the team sound unhelpful.",
        "Treat the limit as useful information. Ask what can wait without blaming the person who raised it.",
      ],
      [
        "Leading",
        "Several people can add work; nobody will choose between their requests.",
        "Name the person who can decide. Put the competing choices in front of them together.",
      ],
      [
        "Technical",
        "A vague request for a demonstration becomes a commitment to build the whole feature.",
        "Ask what the customer needs to understand. A smaller example may meet that need with much less work.",
      ],
      [
        "Physical",
        "Support, interruptions and recovery time are left out, so the week looks emptier than it is.",
        "Include the work people are already doing. Make the tradeoff before committing their remaining time.",
      ],
    ],
  },
  {
    slug: "mandate-reset",
    name: "Mandate Reset",
    chapter: 3,
    situation:
      "You are responsible for launching online repair booking. Three directors keep adding features, and you cannot refuse or change the launch date. The team needs someone to decide what belongs in this release.",
    recurring:
      "If people are held responsible for results they cannot affect, they may learn to avoid ownership or hide blocked decisions.",
    move: "Name the exact decision you need. Agree who will make it, what limits apply and when you can expect an answer.",
    rows: [
      [
        "Spiritual",
        "A person is judged on a result without regard for what they could actually change.",
        "Discuss responsibility alongside permission, support and the choices available. Make the expectation fair.",
      ],
      [
        "Emotional",
        "Naming the blocked decision is treated as making excuses.",
        "Describe the specific situation and its consequence. Invite correction without assigning motives.",
      ],
      [
        "Leading",
        "“You own it” means carrying the blame while someone else keeps every decision.",
        "Ask for a particular decision you can make within agreed limits, or a clear response from the person who holds it.",
      ],
      [
        "Technical",
        "The person approving the work lacks the information needed to judge it.",
        "Provide the options, relevant evidence and important unknowns. Ask what else they need to decide.",
      ],
      [
        "Physical",
        "Chasing an answer creates extra meetings, repeated messages and work after hours.",
        "Agree one place for the request, a response time and what happens if the decision remains blocked.",
      ],
    ],
  },
  {
    slug: "product-project-translator",
    name: "Product / Project Translator",
    chapter: 5,
    situation:
      "Finance asks for final requirements by Thursday so it can decide what to fund. The team has two possible designs for online booking and still needs to find out whether customers can use them.",
    recurring:
      "If confident answers are rewarded more than honest ones, people learn to hide uncertainty. If every request gets a lecture, people stop asking Product for help.",
    move: "Find the need behind the words. Give an answer the person can use, including what is known, what needs checking and when you will know more.",
    rows: [
      [
        "Spiritual",
        "Winning an argument about “product versus project” takes over from helping the customer.",
        "Name the customer or business need you both want to serve. Keep the answer tied to that need.",
      ],
      [
        "Emotional",
        "A familiar phrase triggers an eye-roll or a lecture.",
        "Ask what they need to do with the answer. Listen before translating the request.",
      ],
      [
        "Leading",
        "A guess becomes a customer promise without anyone explicitly agreeing to it.",
        "Separate what you recommend from what has been approved. Name who can make the commitment.",
      ],
      [
        "Technical",
        "“We’re still learning” gives the other person nothing they can plan around.",
        "Name the specific question, how you will check it and when you can share what you found.",
      ],
      [
        "Physical",
        "A reassuring checkpoint is promised without making time for the work behind it.",
        "Check the team’s workload before offering the next date. Say what must wait if the check takes priority.",
      ],
    ],
  },
];

const healthAreas = [
  {
    name: "Spiritual",
    question: "What matters here?",
    description:
      "Meaning, conscience and connection. What gives the work purpose, and what are people being asked to protect or betray? This does not require a religious belief.",
  },
  {
    name: "Emotional",
    question: "What can we be honest about?",
    description:
      "How people notice and work through fear, frustration, disappointment and hope. Whether someone can ask for help or disagree matters as much as how pleasant a meeting feels.",
  },
  {
    name: "Leading",
    question: "How do we carry responsibility?",
    description:
      "How we notice what is happening, use our judgment and take responsibility with others. People need chances to practise those abilities, with boundaries and support, whether or not they manage a team.",
  },
  {
    name: "Technical",
    question: "Can we do the work well?",
    description:
      "Craft, knowledge, tools and working arrangements. People need room to learn, reliable ways to check their work and the support to use their skills.",
  },
  {
    name: "Physical",
    question: "What is the work asking of our bodies?",
    description:
      "Hours, sleep, pace, stress, energy and recovery. A plan that only fits when people give up their evenings has a human cost.",
  },
];

const elements = [
  [
    "Identity",
    "Who am I becoming here?",
    "What does this workplace teach me about my worth, my voice and who I am allowed to be?",
  ],
  [
    "Relationship",
    "What happens between us?",
    "When we disagree, need help or make a mistake, do we become more guarded or more able to meet each other honestly?",
  ],
  [
    "Vision",
    "What could we imagine together?",
    "A possible future grows between people: ‘Wouldn’t it be cool if…?’ Other people can change what it becomes.",
  ],
  [
    "Culture",
    "What starts to feel normal?",
    "The pull that grows from Identity, Relationship and Vision, then shapes those same things in return. In the orbital metaphor, this is gravity.",
  ],
];

const practices = [
  {
    name: "1:1s",
    harm: "Every meeting is a status check, and a concern is treated as an attitude problem.",
    change:
      "Make room for what is getting in the way. Listen to a real example and agree what each of you will change.",
    roots:
      "Emotional, Leading, Spiritual — and Technical or Physical when the conversation reveals missing skills or an impossible workload.",
  },
  {
    name: "Peer-to-peer coaching",
    harm: "A colleague immediately supplies the answer or uses someone’s uncertainty against them later.",
    change:
      "Ask what they are trying to do and what help they want. Agree what can be shared before discussing sensitive work.",
    roots:
      "Emotional, Technical, Leading and Spiritual: learning together can change both competence and how people see each other.",
  },
  {
    name: "Strategy discovery",
    harm: "People are invited to help discover an answer after the answer has already been fixed.",
    change:
      "Name what is decided and what is genuinely open. Let the people doing and receiving the work shape the possibilities.",
    roots:
      "All five: purpose, honesty, participation, knowledge and time affect what people can discover together.",
  },
  {
    name: "Performance reviews",
    harm: "People are rated on results they could not control, while hidden overtime earns praise.",
    change:
      "Discuss specific work, the conditions around it, what the person could decide and what support was missing. Agree changes on both sides.",
    roots:
      "All five: reviews can shape worth, trust, agency, learning and the pace people believe they must sustain.",
  },
];

const readingByProduct: Record<string, { intro: string; ids: string[] }> = {
  "ai-stalemate": {
    intro:
      "When you are deciding what to try, how to check it and what the result can tell you.",
    ids: [
      "singer-pitch",
      "metr-evidence-pair",
      "metr-2025",
      "owasp-authorization",
      "willison-red-green",
      "willison-lenny-podcast",
    ],
  },
  "deadline-reset": {
    intro:
      "When the date matters and you need to find a smaller useful result.",
    ids: ["singer-boundaries"],
  },
  "priority-whiplash": {
    intro:
      "When the work already under way is harder to see than the new request.",
    ids: ["dora-wip"],
  },
  "mandate-reset": {
    intro:
      "When you need to separate giving advice, approving a decision and doing the work.",
    ids: ["bain-rapid", "marquet-competence-clarity"],
  },
  "product-project-translator": {
    intro:
      "When you need a specific next check before you can offer a firmer answer.",
    ids: ["torres-assumptions"],
  },
};

const linkStyle =
  "underline decoration-[#89967e] underline-offset-4 hover:decoration-current focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#997727]";
const paragraphStyle = "font-ui text-base leading-8 text-[#4e6254]";

function SourceCard({
  id,
  compact = false,
}: {
  id: string;
  compact?: boolean;
}) {
  const source = teachingSources[id];
  if (!source) return null;
  const url =
    id === "willison-lenny-podcast" ? `${source.url}&t=4101s` : source.url;
  return (
    <article
      className={`${compact ? "p-5" : "p-6 md:p-7"} border border-[#ccd3c2] bg-[#fbf9f3]`}
    >
      <p className="font-ui text-xs leading-5 text-[#67775f]">
        {source.author} · {source.kind}
      </p>
      <h3 className="mt-3 font-display text-2xl leading-tight">
        <a className={linkStyle} href={url} target="_blank" rel="noreferrer">
          {source.title} ↗
        </a>
      </h3>
      <p className="mt-3 font-ui text-sm leading-7 text-[#536659]">
        {source.summary}
      </p>
      {id === "willison-lenny-podcast" && (
        <p className="mt-3 font-ui text-xs leading-6 text-[#63705f]">
          The link starts at 1:08:21, the publisher’s chapter on testing. The
          chapter time was checked against the episode notes. The full written
          transcript may require a subscription.
        </p>
      )}
    </article>
  );
}

function ProductLinks({
  product,
  chapter = product.chapter,
}: {
  product: ProductCase;
  chapter?: number;
}) {
  const base = fieldToolBase(product.slug);
  return (
    <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 font-ui text-sm leading-6">
      <Link href={base} className={linkStyle}>
        Explore {product.name} →
      </Link>
      <a href={`${base}/guide#guide-${chapter}`} className={linkStyle}>
        Open the relevant Guide chapter →
      </a>
      {product.slug === "ai-stalemate" && (
        <a
          href={`/field-tools/ai-stalemate/lead-dev/guide#guide-${chapter}`}
          className={linkStyle}
        >
          Lead developer Guide →
        </a>
      )}
    </div>
  );
}

function BaseElements() {
  const icons = [Fingerprint, UsersRound, Telescope, Orbit];
  return (
    <div className="mt-9 grid gap-x-8 gap-y-10 border-y border-[#c8d1bf] py-9 sm:grid-cols-2 lg:grid-cols-4">
      {elements.map(([name, question, body], index) => {
        const Icon = icons[index];
        return (
          <article key={name} className="text-center">
            <Icon
              size={38}
              strokeWidth={1.3}
              className="mx-auto mb-5 text-[#8c783b]"
              aria-hidden="true"
            />
            <p className="font-ui text-[10px] tracking-[.1em] text-[#62705b]">
              {name === "Culture"
                ? "THE FIELD PEOPLE FEEL"
                : "WHERE CULTURE TAKES SHAPE"}
            </p>
            <h3 className="mt-3 font-display text-3xl">{name}</h3>
            <p className="mt-3 font-ui text-sm font-semibold leading-6">
              {question}
            </p>
            <p className="mt-2 font-ui text-sm leading-7 text-[#536659]">
              {body}
            </p>
          </article>
        );
      })}
    </div>
  );
}

function OrbitalDiagram() {
  const [enlarged, setEnlarged] = useState(false);
  return (
    <figure className="my-9 overflow-hidden border border-[#b2c1a6] bg-[#10271b] p-3 text-[#f3efe4] sm:p-8">
      <button
        type="button"
        aria-pressed={enlarged}
        onClick={() => setEnlarged(value => !value)}
        className="mb-4 border border-[#809575] px-3 py-2 font-ui text-sm sm:hidden"
      >
        {enlarged ? "Fit diagram to screen" : "Enlarge diagram"}
      </button>
      {enlarged && (
        <p className="mb-3 font-ui text-xs sm:hidden">
          Swipe across to explore the enlarged diagram.
        </p>
      )}
      <div className="overflow-x-auto">
        <svg
          style={{ minWidth: enlarged ? 760 : undefined }}
          viewBox="0 0 760 580"
          role="img"
          aria-labelledby="orbital-title orbital-description"
          className="mx-auto w-full max-w-[780px]"
        >
          <title id="orbital-title">
            Identity, Relationship and Vision give rise to Culture, which shapes
            them in return.
          </title>
          <desc id="orbital-description">
            Three connected elements sit inside the field of Culture. Curved
            arrows run both ways between the elements and between the field and
            its sources. A dashed outer boundary represents leadership as
            attention to the whole system.
          </desc>
          <defs>
            <radialGradient id="culture-field">
              <stop offset="0" stopColor="#314f34" />
              <stop offset=".75" stopColor="#24442e" />
              <stop offset="1" stopColor="#153220" />
            </radialGradient>
            <marker
              id="orbital-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#d4b35e" />
            </marker>
          </defs>
          <ellipse
            cx="380"
            cy="304"
            rx="354"
            ry="247"
            fill="none"
            stroke="#a4b496"
            strokeWidth="1.5"
            strokeDasharray="7 9"
          />
          <text
            x="380"
            y="30"
            textAnchor="middle"
            fill="#d4b35e"
            fontSize="18"
            className="font-ui"
          >
            Leadership: attention to the whole
          </text>
          <ellipse
            cx="380"
            cy="315"
            rx="315"
            ry="207"
            fill="url(#culture-field)"
            stroke="#6d8767"
          />
          <text
            x="380"
            y="145"
            textAnchor="middle"
            fill="#f3efe4"
            fontSize="29"
            className="font-display"
          >
            Culture
          </text>
          <text
            x="380"
            y="172"
            textAnchor="middle"
            fill="#cad5bf"
            fontSize="16"
            className="font-ui"
          >
            The field that grows between and around us
          </text>
          <path
            d="M 281 341 Q 380 399 479 341"
            stroke="#d4b35e"
            strokeWidth="2"
            fill="none"
            markerStart="url(#orbital-arrow)"
            markerEnd="url(#orbital-arrow)"
          />
          <path
            d="M 269 302 Q 292 241 335 239"
            stroke="#d4b35e"
            strokeWidth="2"
            fill="none"
            markerStart="url(#orbital-arrow)"
            markerEnd="url(#orbital-arrow)"
          />
          <path
            d="M 425 239 Q 474 243 492 300"
            stroke="#d4b35e"
            strokeWidth="2"
            fill="none"
            markerStart="url(#orbital-arrow)"
            markerEnd="url(#orbital-arrow)"
          />
          <path
            d="M 279 364 Q 231 454 337 471"
            stroke="#93ae83"
            strokeWidth="2"
            fill="none"
            markerStart="url(#orbital-arrow)"
            markerEnd="url(#orbital-arrow)"
          />
          <path
            d="M 481 364 Q 530 454 423 471"
            stroke="#93ae83"
            strokeWidth="2"
            fill="none"
            markerStart="url(#orbital-arrow)"
            markerEnd="url(#orbital-arrow)"
          />
          <g className="font-display" textAnchor="middle" fontSize="25">
            <rect
              x="282"
              y="194"
              width="196"
              height="70"
              rx="35"
              fill="#f2eedf"
            />
            <text x="380" y="238" fill="#193025">
              Vision
            </text>
            <rect
              x="104"
              y="298"
              width="186"
              height="70"
              rx="35"
              fill="#f2eedf"
            />
            <text x="197" y="342" fill="#193025">
              Identity
            </text>
            <rect
              x="470"
              y="298"
              width="220"
              height="70"
              rx="35"
              fill="#f2eedf"
            />
            <text x="580" y="342" fill="#193025">
              Relationship
            </text>
          </g>
          <text
            x="380"
            y="444"
            textAnchor="middle"
            fill="#e4e9da"
            fontSize="17"
            className="font-ui"
          >
            What grows here shapes us in return.
          </text>
        </svg>
      </div>
      <figcaption className="mx-auto max-w-xl font-ui text-xs leading-6 text-[#c5d1bd]">
        A simplified reading of Nic’s orbital model. The arrows show mutual
        influence. Culture is the surrounding field; leadership tends the
        conditions and is shaped by them too. This is a way of seeing human
        relationships, not a physical measurement.
      </figcaption>
    </figure>
  );
}

function HidContent() {
  return (
    <>
      <section aria-labelledby="hid-start" className="max-w-3xl">
        <h2
          id="hid-start"
          className="scroll-mt-24 font-display text-4xl leading-tight"
        >
          Start with something you already do.
        </h2>
        <p className={`mt-5 ${paragraphStyle}`}>
          A 1:1. A performance review. The meeting where next week’s work gets
          chosen. These practices do more than organize work. They can teach
          people whether their voice matters, whether they can admit a mistake
          and what it takes to belong.
        </p>
        <p className={`mt-4 ${paragraphStyle}`}>
          Holistic Impact Depth helps you look at that shaping. Use the base
          elements to ask what is happening to people and their relationships.
          Then look across the five areas of health to see how a particular
          practice might nourish them or wear them down.
        </p>
      </section>
      <figure className="my-9 border border-[#d0d5c8] bg-white p-3 sm:p-6">
        <a
          href="/assets/field-tools/hid-tree.png"
          target="_blank"
          rel="noreferrer"
          aria-label="Open Nic’s original Holistic Impact Depth tree at full size"
        >
          <img
            src="/assets/field-tools/hid-tree.png"
            alt="Nic Payne’s original Holistic Impact Depth tree: five health roots beneath Identity, Relationship, Vision and Culture, with organizational practices affecting the tree."
            loading="lazy"
            className="mx-auto max-h-[760px] w-full object-contain"
          />
        </a>
        <figcaption className="mt-5 font-ui text-sm leading-7 text-[#536659]">
          Nic’s original working diagram. The accompanying page names 1:1s,
          peer-to-peer coaching, strategy discovery and performance reviews. The
          examples below explore how their design matters.{" "}
          <a
            href="/assets/field-tools/holistic-impact-depth-source.pdf"
            download
            className={linkStyle}
          >
            Download both original pages (PDF) ↓
          </a>
        </figcaption>
      </figure>
      <section aria-labelledby="hid-elements">
        <h2 id="hid-elements" className="scroll-mt-24 font-display text-4xl">
          What is being shaped?
        </h2>
        <p className={`mt-4 max-w-3xl ${paragraphStyle}`}>
          HID uses the same base elements as the orbital model. Identity,
          Relationship and Vision give rise to Culture. Culture then shapes
          people in return. The five health areas sit beneath this whole
          picture; they are not five separate outcomes to score.
        </p>
        <BaseElements />
      </section>
      <section aria-labelledby="hid-roots" className="mt-14">
        <h2 id="hid-roots" className="scroll-mt-24 font-display text-4xl">
          Five areas of health. One person.
        </h2>
        <p className={`mt-4 max-w-3xl ${paragraphStyle}`}>
          The same meeting can affect several areas at once. You do not need to
          rate anyone or ask them to disclose private information. Notice the
          conditions you can see and the choices you can change.
        </p>
        <div className="mt-7 divide-y divide-[#cbd3bf] border-y border-[#cbd3bf]">
          {healthAreas.map(area => (
            <article
              key={area.name}
              className="grid gap-3 py-6 md:grid-cols-[180px_1fr]"
            >
              <h3 className="font-display text-3xl">{area.name}</h3>
              <div>
                <p className="font-ui font-semibold leading-7">
                  {area.question}
                </p>
                <p className="mt-2 font-ui text-sm leading-7 text-[#536659]">
                  {area.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section aria-labelledby="hid-practices" className="mt-14">
        <h2 id="hid-practices" className="scroll-mt-24 font-display text-4xl">
          Look at the arrangement, not just the name.
        </h2>
        <p className={`mt-4 max-w-3xl ${paragraphStyle}`}>
          A performance review can drain people. It can also help someone learn,
          be heard and get support. Calling something “coaching” does not make
          it helpful by itself. Look at what happens in the room and what
          happens afterward.
        </p>
        <p className="mt-4 font-ui text-xs leading-6 text-[#657460]">
          These are illustrative applications of the four activities in Nic’s
          drawing, not quotations or claims about every workplace.
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {practices.map(practice => (
            <article
              key={practice.name}
              className="border border-[#ccd3c2] bg-[#fbf9f3] p-6"
            >
              <h3 className="font-display text-3xl">{practice.name}</h3>
              <p className="mt-4 font-ui text-sm leading-7 text-[#536659]">
                <strong className="text-[#193025]">Notice: </strong>
                {practice.harm}
              </p>
              <p className="mt-3 font-ui text-sm leading-7 text-[#536659]">
                <strong className="text-[#193025]">Try: </strong>
                {practice.change}
              </p>
              <p className="mt-4 border-t border-[#d9dece] pt-4 font-ui text-xs leading-6 text-[#657460]">
                {practice.roots}
              </p>
            </article>
          ))}
        </div>
      </section>
      <section aria-labelledby="hid-products" className="mt-14">
        <h2 id="hid-products" className="scroll-mt-24 font-display text-4xl">
          Try it with the situation in front of you.
        </h2>
        <p className={`mt-4 max-w-3xl ${paragraphStyle}`}>
          Choose an example. Each looks across all five health areas. Use the
          questions to notice a practice worth changing; you do not need to fix
          everything at once.
        </p>
        <p className="mt-3 font-ui text-xs leading-6 text-[#657460]">
          The situations and suggested practices are new illustrative
          applications of Nic’s teaching, not reported case studies.
        </p>
        <div className="mt-6 space-y-4">
          {productCases.map(product => (
            <details
              key={product.slug}
              id={product.slug}
              className="group border border-[#bbc8b1] bg-[#fbf9f3] open:bg-[#f8f6ee]"
            >
              <summary className="cursor-pointer px-5 py-5 font-display text-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#997727] sm:px-7">
                {product.name}
                <span className="ml-3 font-ui text-xs text-[#66795c]">
                  Explore the five areas
                </span>
              </summary>
              <div className="px-5 pb-7 sm:px-7">
                <p className={paragraphStyle}>{product.situation}</p>
                <div className="mt-6 space-y-5">
                  {product.rows.map(([health, harm, change]) => (
                    <section
                      key={health}
                      className="border-t border-[#d3dacb] pt-5"
                    >
                      <h3 className="font-display text-2xl">{health}</h3>
                      <div className="mt-3 grid gap-4 md:grid-cols-2">
                        <div className="border-l-2 border-[#b8a88b] pl-4">
                          <p className="font-ui text-xs font-semibold text-[#665b43]">
                            What may wear people down
                          </p>
                          <p className="mt-2 font-ui text-sm leading-7 text-[#536659]">
                            {harm}
                          </p>
                        </div>
                        <div className="border-l-2 border-[#7b9769] pl-4">
                          <p className="font-ui text-xs font-semibold text-[#49613c]">
                            A practice that could help
                          </p>
                          <p className="mt-2 font-ui text-sm leading-7 text-[#536659]">
                            {change}
                          </p>
                        </div>
                      </div>
                    </section>
                  ))}
                </div>
                <p className="mt-6 border-t border-[#d3dacb] pt-5 font-ui text-sm leading-7">
                  <strong>Watch what happens over time. </strong>
                  {product.recurring}
                </p>
                <ProductLinks product={product} />
              </div>
            </details>
          ))}
        </div>
      </section>
      <section className="mt-14 border border-[#a9baa0] bg-[#e6eadb] p-6 sm:p-8">
        <h2 className="font-display text-3xl">
          Choose one change you can actually make.
        </h2>
        <p className={`mt-4 ${paragraphStyle}`}>
          Name the practice. Describe what it is doing to people. Ask those
          involved what they see. Agree one change, including any permission or
          support it needs. Come back and notice what changed, including what
          did not.
        </p>
        <p className={`mt-3 ${paragraphStyle}`}>
          A better form or meeting cannot guarantee trust or transformation.
          What matters is how people are treated as they use it, and whether
          their answers can change what happens next.
        </p>
      </section>
      <SourceSection noteId="note-c-216911020" />
    </>
  );
}

function OrbitalContent() {
  return (
    <>
      <section aria-labelledby="orbital-start" className="max-w-3xl">
        <h2
          id="orbital-start"
          className="scroll-mt-24 font-display text-4xl leading-tight"
        >
          You changed the process. The same problem came back.
        </h2>
        <p className={`mt-5 ${paragraphStyle}`}>
          Perhaps every urgent request still wins. People still keep bad news to
          themselves. Every decision still finds its way back to one exhausted
          person. A new meeting or a values poster has not changed what people
          have learned to expect.
        </p>
        <p className={`mt-4 ${paragraphStyle}`}>
          Nic’s orbital model asks you to look at what keeps that pattern in
          place. Identity, Relationship and Vision give the system its mass.
          Culture is the gravity they generate: the pull people feel toward what
          has become normal.
        </p>
      </section>
      <OrbitalDiagram />
      <section aria-labelledby="orbital-elements">
        <h2
          id="orbital-elements"
          className="scroll-mt-24 font-display text-4xl"
        >
          Three sources. A field that shapes them back.
        </h2>
        <p className={`mt-4 max-w-3xl ${paragraphStyle}`}>
          These are living relationships, not steps to complete in order. People
          shape one another’s identity. What they imagine together changes their
          relationships. The culture that grows around them teaches newcomers
          what is possible here.
        </p>
        <BaseElements />
        <p className={`mt-6 max-w-3xl ${paragraphStyle}`}>
          That distinction changes where you begin. If you want people to speak
          honestly, look at what happens when someone does. If you want shared
          vision, give people room to change the future you are proposing.
          Attend to the conditions that make a different experience possible.
        </p>
      </section>
      <section
        aria-labelledby="orbital-leadership"
        className="mt-14 border border-[#a9baa0] bg-[#e6eadb] p-6 sm:p-8"
      >
        <h2 id="orbital-leadership" className="font-display text-3xl">
          Where does leadership fit?
        </h2>
        <p className={`mt-4 ${paragraphStyle}`}>
          Leadership is the quality of attention that tends these conditions. It
          can show up in a manager, a colleague or anyone who notices what is
          happening and helps people meet it honestly. The person offering that
          attention is also being shaped by the same relationships and culture.
        </p>
        <p className={`mt-4 ${paragraphStyle}`}>
          In Nic’s bowl, water and current metaphor, the bowl is attention,
          intention and awareness. The water is the inner life each person
          brings. The current is the encounter between whole people, rather than
          treating someone as an object to manage. A shared vision can emerge
          from that encounter.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <SourceCard id="bowl" compact />
          <SourceCard id="bowl-synthesis" compact />
        </div>
      </section>
      <section aria-labelledby="orbital-products" className="mt-14">
        <h2
          id="orbital-products"
          className="scroll-mt-24 font-display text-4xl"
        >
          What keeps happening in your team?
        </h2>
        <p className={`mt-4 max-w-3xl ${paragraphStyle}`}>
          The immediate decision still matters. These examples add a second
          question: what will repeating this way of working teach people?
        </p>
        <p className="mt-3 font-ui text-xs leading-6 text-[#657460]">
          Illustrative applications of Nic’s model, not reported case studies.
        </p>
        <div className="mt-6 space-y-4">
          {productCases.map(product => (
            <details
              key={product.slug}
              className="border border-[#bbc8b1] bg-[#fbf9f3]"
            >
              <summary className="cursor-pointer px-6 py-5 font-display text-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#997727]">
                {product.name}
              </summary>
              <div className="px-6 pb-6">
                <p className={paragraphStyle}>{product.recurring}</p>
                <p className={`mt-4 ${paragraphStyle}`}>
                  <strong className="text-[#193025]">A place to begin: </strong>
                  {product.move}
                </p>
                <ProductLinks
                  product={product}
                  chapter={product.slug === "ai-stalemate" ? 9 : 8}
                />
              </div>
            </details>
          ))}
        </div>
      </section>
      <section className="mt-14 max-w-3xl">
        <h2 className="scroll-mt-24 font-display text-4xl">
          Look beneath the repeated pattern.
        </h2>
        <p className={`mt-4 ${paragraphStyle}`}>
          Holistic Impact Depth adds the five areas of health and asks how
          everyday practices affect them. Use it when you can see the pattern
          but need to look more closely at the meeting, review or working
          arrangement that keeps shaping people.
        </p>
        <Link
          className={`mt-5 inline-block font-ui text-sm ${linkStyle}`}
          href="/field-tools/resources/holistic-impact-depth"
        >
          Explore Holistic Impact Depth →
        </Link>
      </section>
      <SourceSection noteId="note-c-199735328" />
    </>
  );
}

function SourceSection({ noteId }: { noteId: string }) {
  return (
    <section
      aria-labelledby="framework-sources"
      className="mt-14 border-t border-[#c8d1bc] pt-8"
    >
      <h2 id="framework-sources" className="font-display text-3xl">
        The teaching behind this page
      </h2>
      <p className="mt-4 max-w-3xl font-ui text-sm leading-7 text-[#536659]">
        These explanations follow Nic Payne’s Holistic Shaping definitions:
        Identity, Relationship and Vision give rise to Culture; Culture is the
        field people experience and is part of what shapes them in return. The
        HID tree is Nic’s supplied original. The working examples on these pages
        are illustrations written for the Field Tools.
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <SourceCard id="you-have-a-culture-problem" />
        <SourceCard id="culture-vulture" />
        <SourceCard id={noteId} />
      </div>
      <Link
        className={`mt-6 inline-block font-ui text-sm ${linkStyle}`}
        href="/field-tools/resources"
      >
        All teaching, reading and listening →
      </Link>
    </section>
  );
}

function LibraryContent() {
  const articles = Object.entries(teachingSources).filter(
    ([, source]) => source.author === "Nic Payne" && source.kind === "Article"
  );
  const notes = Object.entries(teachingSources).filter(
    ([, source]) => source.kind === "Substack Note"
  );
  return (
    <>
      <blockquote className="mb-12 max-w-3xl border-l-2 border-[#b79542] pl-6">
        <p className="font-display text-2xl leading-relaxed">
          “Leadership is shaping the conditions where humans become whole
          together, and where good work emerges as fruit, not extraction.”
        </p>
        <cite className="mt-4 block font-ui text-sm not-italic text-[#536659]">
          Nic Payne ·{" "}
          <a
            href={teachingSources["the-lie-weve-normalized-leadership"].url}
            target="_blank"
            rel="noreferrer"
            className={linkStyle}
          >
            The Lie We’ve Normalized ↗
          </a>
        </cite>
      </blockquote>
      <nav
        aria-label="On this page"
        className="mb-12 flex flex-wrap gap-3 border-y border-[#c8d1bf] py-5 font-ui text-sm"
      >
        {[
          ["frameworks", "The two maps"],
          ["watch", "Watch"],
          ["articles", "Articles"],
          ["notes", "Shorter thoughts"],
          ["practices", "Practices"],
          ["explore", "More from Nic"],
          ["others", "Other voices"],
        ].map(([id, label]) => (
          <a
            key={id}
            href={`#library-${id}`}
            className={`${linkStyle} rounded border border-[#c8d1bf] px-3 py-2`}
          >
            {label}
          </a>
        ))}
      </nav>
      <section aria-labelledby="library-frameworks">
        <h2
          id="library-frameworks"
          className="scroll-mt-24 font-display text-4xl"
        >
          The two maps behind the tools.
        </h2>
        <p className={`mt-4 max-w-3xl ${paragraphStyle}`}>
          Use these when you want to understand why a problem keeps returning,
          or what a way of working is doing to the people involved.
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <SourceCard id="orbital" />
          <SourceCard id="hid" />
        </div>
      </section>
      <section aria-labelledby="library-watch" className="mt-14">
        <h2 id="library-watch" className="scroll-mt-24 font-display text-4xl">
          Watch Nic explain leadership.
        </h2>
        <p className={`mt-4 max-w-3xl ${paragraphStyle}`}>
          One video, two useful starting points. Hear the metaphor, then return
          to the synthesis when you want to bring it into a conversation.
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <SourceCard id="bowl" />
          <SourceCard id="bowl-synthesis" />
        </div>
      </section>
      <section aria-labelledby="library-articles" className="mt-14">
        <h2
          id="library-articles"
          className="scroll-mt-24 font-display text-4xl"
        >
          Read more from Nic.
        </h2>
        <p className={`mt-4 max-w-3xl ${paragraphStyle}`}>
          The wider teaching that informs these tools, from the earlier essays
          to the more recent writing. Choose a question that stays with you;
          this is not a reading assignment.
        </p>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {articles.map(([id]) => (
            <SourceCard key={id} id={id} />
          ))}
        </div>
      </section>
      <section aria-labelledby="library-notes" className="mt-14">
        <h2 id="library-notes" className="scroll-mt-24 font-display text-4xl">
          A few shorter thoughts.
        </h2>
        <p className={`mt-4 max-w-3xl ${paragraphStyle}`}>
          Selected Substack Notes on the words we use, the futures we imagine
          and the people we become. The labels below describe each Note so you
          can choose what to open.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {notes.map(([id]) => (
            <SourceCard key={id} id={id} compact />
          ))}
        </div>
      </section>
      <section aria-labelledby="library-practices" className="mt-14">
        <h2
          id="library-practices"
          className="scroll-mt-24 font-display text-4xl"
        >
          Practices from Nic’s Codex.
        </h2>
        <p className={`mt-4 max-w-3xl ${paragraphStyle}`}>
          For a conversation you want to try differently, or a pattern that
          keeps coming back. Open the practice and choose Read.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            "codex-mirror",
            "codex-clarity",
            "codex-recover",
            "codex-ghost",
          ].map(id => (
            <SourceCard key={id} id={id} compact />
          ))}
        </div>
      </section>
      <section aria-labelledby="library-explore" className="mt-14">
        <h2 id="library-explore" className="scroll-mt-24 font-display text-4xl">
          Keep exploring.
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {["site-start", "site-shelf", "site-archives"].map(id => (
            <SourceCard key={id} id={id} compact />
          ))}
        </div>
      </section>
      <section
        aria-labelledby="library-others"
        className="mt-16 border-t border-[#bfcab3] pt-10"
      >
        <h2 id="library-others" className="scroll-mt-24 font-display text-4xl">
          Other voices, where they can help.
        </h2>
        <p className={`mt-4 max-w-3xl ${paragraphStyle}`}>
          These authors and researchers offer useful detail at particular
          moments. Their work supports the practical task; their frameworks and
          findings are their own.
        </p>
        <div className="mt-7 space-y-5">
          {productCases.map(product => {
            const group = readingByProduct[product.slug];
            return (
              <details
                key={product.slug}
                className="border border-[#bbc8b1] bg-[#ecefdf]"
              >
                <summary className="cursor-pointer px-6 py-5 font-display text-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#997727]">
                  {product.name}
                  <span className="ml-3 font-ui text-xs text-[#66795c]">
                    {group.ids.length}{" "}
                    {group.ids.length === 1 ? "resource" : "resources"}
                  </span>
                </summary>
                <div className="px-5 pb-6 sm:px-6">
                  <p className="font-ui text-sm leading-7 text-[#536659]">
                    {group.intro}
                  </p>
                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    {group.ids.map(id => (
                      <SourceCard key={id} id={id} compact />
                    ))}
                  </div>
                  <ProductLinks product={product} />
                </div>
              </details>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default function FieldToolResources({
  resource,
}: {
  resource?: string;
}) {
  const hid = resource === "holistic-impact-depth";
  const orbital = resource === "cultural-orbital-mechanics";
  const unknown = Boolean(resource && !hid && !orbital);
  const title = hid
    ? "Holistic Impact Depth"
    : orbital
      ? "Cultural Orbital Mechanics"
      : unknown
        ? "That resource isn’t here."
        : "The thinking behind the work.";
  const deck = hid
    ? "What is this way of working doing to people?"
    : orbital
      ? "Why does the same problem keep coming back?"
      : unknown
        ? "The teaching library is a good place to start."
        : "Nic’s teaching, with useful reading and listening for the situation in front of you.";
  return (
    <main className="min-h-screen bg-[#f3efe4] text-[#193025]">
      <FieldToolsNav />
      <header className="bg-[#07130f] px-5 pb-12 pt-32 text-[#f3efe4] md:px-10 md:pb-16">
        <div className="mx-auto max-w-5xl">
          <p className="font-ui text-[11px] tracking-[.2em] text-[#d1b866]">
            REBEL LEADERS / HOLISTIC SHAPING
          </p>
          <h1 className="mt-5 max-w-4xl font-display text-5xl font-semibold leading-[1.05] tracking-[-.035em] md:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl font-display text-2xl leading-snug text-[#e4bc59] md:text-3xl">
            {deck}
          </p>
          <p className="mt-5 max-w-2xl font-ui text-sm leading-7 text-[#bacbb8]">
            Go deeper when it helps. Your Field Tool works on its own, and you
            can come back to these resources whenever you want.
          </p>
          <nav
            aria-label="Resource pages"
            className="mt-7 flex flex-wrap gap-x-6 gap-y-3 font-ui text-sm text-[#d8e2ce]"
          >
            <Link href="/field-tools" className={linkStyle}>
              Field Tools
            </Link>
            <Link
              href="/field-tools/resources"
              aria-current={!resource ? "page" : undefined}
              className={linkStyle}
            >
              All resources
            </Link>
            <Link
              href="/field-tools/resources/holistic-impact-depth"
              aria-current={hid ? "page" : undefined}
              className={linkStyle}
            >
              HID
            </Link>
            <Link
              href="/field-tools/resources/cultural-orbital-mechanics"
              aria-current={orbital ? "page" : undefined}
              className={linkStyle}
            >
              Cultural Orbital Mechanics
            </Link>
          </nav>
        </div>
      </header>
      <div className="mx-auto max-w-5xl px-5 py-12 md:px-10 md:py-16">
        {unknown ? (
          <Link
            href="/field-tools/resources"
            className={`font-ui ${linkStyle}`}
          >
            Browse the resource library →
          </Link>
        ) : hid ? (
          <HidContent />
        ) : orbital ? (
          <OrbitalContent />
        ) : (
          <LibraryContent />
        )}
      </div>
      <FieldToolsFooter />
    </main>
  );
}
