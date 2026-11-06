export const DELIVERY_TOOLS = [
  {
    workspace: "slice",
    name: "First Release",
    icon: "first-release",
    link: "Shape a smaller first release",
    example: "Asked for a whole dashboard? Start with an overdue-renewals list and agree what to ship first and what can wait.",
  },
  {
    workspace: "workflow",
    name: "Experiment Planner and Time Comparison",
    icon: "experiment-planner",
    link: "Plan an experiment and compare timings",
    example: "If coding took two of 20 days, how much would faster coding save? Compare the timings and pick one change to test.",
  },
  {
    workspace: "access",
    name: "Access Request Builder",
    icon: "access-request",
    link: "Draft an access request",
    example: "The demo works. Now you need real data. Draft a request that tells the system owner who needs which records and what they’ll do with them.",
  },
] as const;

export const DELIVERY_TOOL_SUMMARY =
  "Includes three tools to scope a first release, plan an experiment and compare timings, or draft a request for access to real data.";
