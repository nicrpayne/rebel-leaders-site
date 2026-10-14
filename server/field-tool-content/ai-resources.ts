// Curated sources, not a certification or a promise of continuously automatic updates.
export const AI_RESOURCE_REVIEW_DATE = "2026-10-12";
export type AIResource = {
  id: string;
  name: string;
  category: string;
  kind: string;
  url: string;
  why: string;
  pmQuestion: string;
  devQuestion: string;
  section?: string;
  secondaryUrl?: string;
};
export const AI_TOOLS: AIResource[] = [
  {
    id: "claude-code",
    name: "Claude Code",
    category: "Coding",
    kind: "Official documentation",
    url: "https://code.claude.com/docs/en/overview",
    why: "A coding assistant that works with the files in your project. Decide which files, commands, and systems it may use before trying it.",
    pmQuestion:
      "What small task could we try, what information may the tool use, and who will check its work?",
    devQuestion: "What commands, files, and environments may it access?",
  },
  {
    id: "cursor",
    name: "Cursor",
    category: "Coding",
    kind: "Official documentation",
    url: "https://cursor.com/docs",
    why: "An AI-assisted development environment. Evaluate a specific task and configuration, rather than the product name alone.",
    pmQuestion:
      "Which part of the work could this make easier, and what would we still need to check?",
    devQuestion:
      "What context, permissions, and review workflow suit this repository?",
  },
  {
    id: "coderabbit",
    name: "CodeRabbit",
    category: "Review",
    kind: "Official documentation",
    url: "https://docs.coderabbit.ai/",
    why: "Reviews proposed code changes automatically. A person still needs to check its findings and decide whether to accept the code.",
    pmQuestion:
      "Does this save the reviewer time while keeping the checks we need?",
    devQuestion:
      "Which findings are useful, noisy, missed, or incorrect in our codebase?",
  },
  {
    id: "copilot-review",
    name: "GitHub Copilot code review",
    category: "Review",
    kind: "Official documentation",
    url: "https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/copilot-code-review",
    why: "Adds another review of the code. Look at its findings alongside your tests and the person reviewing the change.",
    pmQuestion: "Who reviews the review, and how much time does that take?",
    devQuestion: "How will we handle false positives and defects it misses?",
  },
  {
    id: "codeql",
    name: "CodeQL",
    category: "Security",
    kind: "Official documentation",
    url: "https://docs.github.com/en/code-security/concepts/code-scanning/codeql/codeql-code-scanning",
    why: "Scans code for security problems it knows how to detect. You still need to test that each person can only see or change the data they are allowed to use.",
    pmQuestion:
      "What risks does our existing scanning cover, and what needs separate testing?",
    devQuestion:
      "Which languages and queries cover this repository, and where are the gaps?",
  },
  {
    id: "semgrep",
    name: "Semgrep",
    category: "Security",
    kind: "Official documentation",
    url: "https://docs.semgrep.dev/",
    why: "Checks code against rules for possible problems. Decide who chooses the rules and checks what it finds.",
    pmQuestion:
      "Can we use our existing security workflow for this experiment?",
    devQuestion:
      "Which rules apply, and how will we triage and verify findings?",
  },
  {
    id: "dependabot",
    name: "Dependabot",
    category: "Security",
    kind: "Official documentation",
    url: "https://docs.github.com/en/code-security/how-tos/secure-your-supply-chain",
    why: "Helps keep the software packages your app relies on up to date. Those updates still need testing and review.",
    pmQuestion:
      "Who updates the packages our app relies on, and do they have time to check those updates?",
    devQuestion: "How are updates tested, reviewed, and released?",
  },
  {
    id: "snyk",
    name: "Snyk",
    category: "Security",
    kind: "Official documentation",
    url: "https://docs.snyk.io/",
    why: "Tools for finding security problems. Check which problems your existing tools already look for, and what the product and plan you are considering would add.",
    pmQuestion: "What coverage do we need that we do not already have?",
    devQuestion: "Which product, integrations, and findings fit our stack?",
  },
  {
    id: "gitleaks",
    name: "Gitleaks",
    category: "Security",
    kind: "Official project documentation",
    url: "https://github.com/gitleaks/gitleaks",
    why: "Looks for passwords, access tokens, and other secrets in code. Decide who responds if one is exposed. Finding none does not prove the code contains none.",
    pmQuestion: "Who responds if a credential is exposed?",
    devQuestion:
      "Where should scanning run, and how are exposed credentials revoked?",
  },
  {
    id: "secret-scanning",
    name: "GitHub secret scanning",
    category: "Security",
    kind: "Official documentation",
    url: "https://docs.github.com/en/code-security/concepts/secret-security/secret-scanning",
    why: "Looks for passwords, access tokens, and other secrets it recognizes. Check whether it is available for your repositories and plan.",
    pmQuestion: "Is detection already enabled, and who receives the alerts?",
    devQuestion:
      "What patterns and repositories are covered, and what is the response process?",
  },
  {
    id: "playwright",
    name: "Playwright",
    category: "Testing",
    kind: "Official documentation",
    url: "https://playwright.dev/docs/intro",
    why: "Browser tests can exercise a real workflow. Permission tests need allowed and denied cases, including direct API requests.",
    pmQuestion:
      "What must a user be able to do, and what must the system prevent them from doing?",
    devQuestion:
      "What test data and assertions would reveal a broken role boundary?",
  },
  {
    id: "vitest",
    name: "Vitest",
    category: "Testing",
    kind: "Official documentation",
    url: "https://vitest.dev/guide/",
    why: "A test runner for supported JavaScript and TypeScript projects. Test quality depends on the behavior being checked.",
    pmQuestion: "What would a meaningful failing test tell us?",
    devQuestion:
      "Do tests challenge the behavior, or merely repeat the implementation?",
  },
  {
    id: "zap",
    name: "ZAP",
    category: "Testing",
    kind: "Official documentation",
    url: "https://www.zaproxy.org/docs/",
    why: "Web security testing for a permitted target and an appropriately trained operator. Plan scope and environment with the security owner.",
    pmQuestion: "Who can authorize and interpret this testing?",
    devQuestion:
      "What target, test scope, and remediation process are authorized?",
  },
  {
    id: "entra",
    name: "Microsoft identity platform / Entra",
    category: "Access",
    kind: "Official documentation",
    url: "https://learn.microsoft.com/en-us/entra/identity-platform/",
    why: "Authentication and access integrations need a defined application policy: who may do what to which data.",
    pmQuestion:
      "Who decides which people may see or change each type of record?",
    devQuestion:
      "Where are permissions enforced and how are membership changes handled?",
  },
  {
    id: "otel",
    name: "OpenTelemetry",
    category: "Delivery",
    kind: "Official documentation",
    url: "https://opentelemetry.io/docs/",
    why: "Collects information that helps you see what an app is doing while it runs. Decide what to collect and how to keep private information out of it.",
    pmQuestion:
      "What signals would tell us that the change is working or causing harm?",
    devQuestion:
      "Which traces, metrics, and logs are useful without exposing sensitive data?",
  },
  {
    id: "actions",
    name: "GitHub Actions",
    category: "Delivery",
    kind: "Official documentation",
    url: "https://docs.github.com/en/actions",
    why: "Automates workflow steps. Branch protection, credentials, deployment permission, and rollback remain design decisions.",
    pmQuestion:
      "What requires approval before an experiment reaches production?",
    devQuestion:
      "What can this workflow read, write, and deploy, and who can change it?",
  },
];
export const AI_STUDY: AIResource[] = [
  {
    id: "patterns",
    name: "Agentic Engineering Patterns",
    category: "Practice",
    kind: "Practitioner guide",
    url: "https://simonwillison.net/guides/agentic-engineering-patterns/",
    section: "Red/green TDD; First run the tests; Anti-patterns",
    why: "Simon Willison's practical patterns connect generated code to testing, understanding, and review.",
    pmQuestion:
      "What practices should we protect time for as part of the experiment?",
    devQuestion: "Which pattern would improve our next small change?",
  },
  {
    id: "lenny-simon",
    name: "Lenny × Simon Willison: an AI state of the union",
    category: "Practice",
    kind: "Practitioner interview · April 2026",
    url: "https://www.lennysnewsletter.com/p/an-ai-state-of-the-union",
    section:
      "10:42 vibe coding and agentic engineering; 1:08:21 TDD; 1:16:31 prompt injection",
    why: "A conversation about how the work is changing. Use the speakers’ experience to find ideas you could try with your own team.",
    pmQuestion:
      "Which claim would we like to check for ourselves? Who can help with the risks we are worried about?",
    devQuestion:
      "What practice or boundary would we adopt before trying the workflow?",
  },
  {
    id: "lenny-boris",
    name: "Lenny × Boris Cherny: what happens after coding?",
    category: "Practice",
    kind: "Vendor practitioner interview · February 2026",
    url: "https://www.lennysnewsletter.com/p/head-of-claude-code-what-happens",
    why: "A tool builder describes how development work is changing. Look for ideas to test, remembering that the speaker also makes the product being discussed.",
    pmQuestion:
      "Which of these ideas might help our team, and what would we need to check?",
    devQuestion:
      "What conditions would have to match for these practices to work here?",
  },
  {
    id: "accelerate",
    name: "Accelerate — Forsgren, Humble & Kim",
    category: "Capability",
    kind: "Book · purchase or library access",
    url: "https://www.oreilly.com/library/view/accelerate/9781457191435/05-content.xhtml",
    section:
      "Ch. 2 Measuring Performance; Ch. 4 Technical Practices; Ch. 5 Architecture; Ch. 6 Information Security",
    why: "Looks at how teams build and release software, beyond how quickly one person writes code. The link opens the contents page; the full book requires purchase or library access.",
    pmQuestion:
      "What would help our team get useful, reliable changes to customers sooner?",
    devQuestion:
      "Which part of building, checking, or releasing software is holding us up?",
  },
  {
    id: "shape-up",
    name: "Shape Up: Write the Pitch",
    category: "Bet",
    kind: "Framework · free chapter",
    url: "https://basecamp.com/shapeup/1.5-chapter-06",
    section: "Problem, appetite, solution, rabbit holes, no-gos",
    why: "A way to explain the problem, a possible solution, and how much time you are willing to spend. That limit is a choice about what the idea is worth, rather than an estimate of how long it will take.",
    pmQuestion:
      "How much time and money are we willing to spend before we reconsider?",
    devQuestion: "Which rabbit holes and boundaries should the pitch expose?",
  },
  {
    id: "owasp",
    name: "OWASP Authorization Cheat Sheet",
    category: "Access",
    kind: "Security guidance",
    url: "https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html",
    section:
      "Deny by default; validate permissions on every request; test authorization logic",
    why: "Concrete material for the access conversation: sign-in, hidden screens, and correct permission enforcement are different concerns.",
    pmQuestion:
      "Who decides who may access the data, and who checks that allowed access works and forbidden access fails?",
    devQuestion:
      "Which API and resource boundaries need explicit negative tests?",
  },
  {
    id: "dora",
    name: "DORA software delivery performance metrics",
    category: "Evidence",
    kind: "Research-informed guide",
    url: "https://dora.dev/guides/dora-metrics/",
    why: "Looks at how teams deliver software over time. Choose measures that answer your question; timing an AI-generated draft tells you only part of the story.",
    pmQuestion:
      "What do we want to improve for the team or customers, beyond writing a draft faster?",
    devQuestion:
      "What do we already measure that we could compare before and after the change?",
  },
  {
    id: "metr",
    name: "METR: reading AI productivity evidence carefully",
    category: "Evidence",
    kind: "Independent studies · 2025 and 2026",
    url: "https://metr.org/blog/2026-02-24-uplift-update/",
    secondaryUrl:
      "https://metr.org/Early_2025_AI_Experienced_OS_Devs_Study-paper.pdf",
    why: "Read the dated 2025 experiment alongside the 2026 update and its selection concerns. Context and study design matter; neither supplies a universal result for your team.",
    pmQuestion:
      "How do our task, team, tools, and checks differ from the study?",
    devQuestion:
      "How can we make the comparison fair and report results that disappoint us too?",
  },
  {
    id: "rapid",
    name: "Bain: RAPID decision roles",
    category: "Decisions",
    kind: "Framework · management tools guide",
    url: "https://www.bain.com/contentassets/0f8872dd5140443b84f35e9f1b460da7/bain_guide_management_tools_2015_executives_guide.pdf",
    section: "RAPID: Recommend, Agree, Perform, Input, Decide",
    why: "Work out who gives advice, whose approval is required, and who makes the final decision. Ask the people involved whether that matches their understanding.",
    pmQuestion:
      "Who can decide this investment and whose approval is formally required?",
    devQuestion: "Which decision is mine, and which needs another owner?",
  },
  {
    id: "minto",
    name: "Barbara Minto: the Pyramid Principle",
    category: "Communication",
    kind: "Author's framework / book",
    url: "https://www.barbaraminto.com/",
    section: "Situation, complication, question; then your proposed answer",
    why: "A way to organize a short update: explain what is happening, the problem, the question you need answered, and what you recommend.",
    pmQuestion:
      "What does this audience need to decide or do after reading my update?",
    devQuestion:
      "What context makes my technical recommendation understandable?",
  },
];
