import type { AIResource } from "./ai-resources.ts";
const resource = (
  id: string,
  name: string,
  category: string,
  kind: string,
  url: string,
  why: string,
  devQuestion: string
): AIResource => ({
  id,
  name,
  category,
  kind,
  url,
  why,
  devQuestion,
  pmQuestion: devQuestion,
});
export const AI_DEV_RESOURCE_REVIEW_DATE = "2026-10-23";
export const AI_DEV_STUDY: AIResource[] = [
  resource(
    "agent-tasks",
    "Choosing work for a coding agent",
    "Development workflow",
    "Official guidance",
    "https://docs.github.com/en/copilot/using-github-copilot/using-copilot-coding-agent-to-work-on-tasks/best-practices-for-using-copilot-to-work-on-tasks",
    "GitHub’s guidance distinguishes small, well-defined tasks from complex or security-sensitive work. Apply it to the specific agent, permissions, and repository you would use.",
    "Which part of this request could we safely bound, and which needs an experienced engineer?"
  ),
  resource(
    "skills",
    "AI assistance and learning coding skills",
    "Team readiness",
    "Primary research",
    "https://www.anthropic.com/research/AI-assistance-coding-skills",
    "A randomized study of 52 developers learning an unfamiliar Python library found a 17-percentage-point gap in immediate quiz scores with AI assistance. The time difference was not statistically significant. This narrow task does not establish long-term effects on your team.",
    "How will we check understanding and debugging, as well as completion, and provide help learning?"
  ),
  resource(
    "app-access",
    "App Service: authentication and authorization",
    "Access and infrastructure",
    "Microsoft documentation",
    "https://learn.microsoft.com/en-us/azure/app-service/overview-authentication-authorization",
    "Use this to separate signing in from permission to access particular data. The right application checks and configuration depend on your architecture.",
    "Who decides which users may access which records, and where will we enforce that?"
  ),
  resource(
    "app-roles",
    "App roles and access decisions",
    "Access and infrastructure",
    "Microsoft documentation",
    "https://learn.microsoft.com/en-us/entra/identity-platform/howto-add-app-roles-in-apps",
    "Describes defining roles and assigning users or groups. App roles can support an access design; the application still needs to interpret and enforce the relevant permissions.",
    "What belongs in identity configuration, and what needs to be checked in the application?"
  ),
  resource(
    "owasp",
    "Authorization checks",
    "Security",
    "OWASP guidance",
    "https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html",
    "Practical guidance on least privilege, denying access by default, and checking authorization on each request. Use it with your security and platform owners.",
    "What allowed and denied requests will we test, including direct requests that bypass the interface?"
  ),
  resource(
    "agent-permissions",
    "Responsible use of coding agents",
    "Development workflow",
    "GitHub documentation",
    "https://docs.github.com/en/copilot/responsible-use/agents",
    "Agent modes can have different environments and permissions. Read the controls for the mode you would actually use and decide who reviews and approves its work.",
    "What can this tool read, execute, change, and release, and where must a person decide?"
  ),
];
export const AI_DEV_TOOLS: AIResource[] = [
  resource(
    "jev",
    "Jev / TypeSafe System One",
    "Classification and decisions",
    "Official product introduction",
    "https://typesafe.ai/blog/introducing-system-one-models-and-jev",
    "TypeSafe describes Jev as a model for structured decisions such as categories and scores, rather than conversational output. Treat its performance claims as vendor claims and evaluate your own examples. A valid output type does not guarantee a correct decision.",
    "Does this job need categorization, and how would we compare errors, costs, and data handling against rules or another model?"
  ),
  resource(
    "copilot-agent",
    "GitHub Copilot agents",
    "Development workflow",
    "Official documentation",
    "https://docs.github.com/en/copilot/responsible-use/agents",
    "An example to evaluate when the question concerns changing the development workflow. Choose a bounded task and permitted environment before choosing the extent of automation.",
    "What could our team confidently review and support with this tool today?"
  ),
];
