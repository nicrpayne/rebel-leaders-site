import { useEffect, useState } from "react";
import { Link } from "wouter";
import { useFieldToolContent } from "@/components/field-tools/FieldToolGate";
import { fieldToolBase } from "@/lib/field-tool-paths";
import FieldToolsNav from "@/components/field-tools/FieldToolsNav";
import FieldToolsFooter from "@/components/field-tools/FieldToolsFooter";
import "@/components/field-tools/ai-library.css";

export default function AIResources() {
  const content = useFieldToolContent();
  const base = fieldToolBase("ai-stalemate", content.audience);
  const library = content.resources;
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"study" | "tools">("study");
  const [jump, setJump] = useState<string | null>(null);
  useEffect(() => {
    if (jump) {
      document
        .getElementById(`resource-${jump}`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
      setJump(null);
    }
  }, [jump]);
  if (!library) return null;
  const items = library[view];
  const categories = [
    "All",
    ...Array.from(new Set(items.map(r => r.category))),
  ];
  const filtered = items.filter(
    r =>
      (category === "All" || r.category === category) &&
      `${r.name} ${r.why} ${r.section ?? ""} ${r.category}`
        .toLowerCase()
        .includes(search.toLowerCase())
  );
  return (
    <main className="font-ui min-h-screen bg-[var(--ft-paper)] text-[var(--ft-ink)]">
      <FieldToolsNav />
      <header className="bg-[var(--ft-paper)] px-6 pb-12 pt-28 text-[var(--ft-ink)]">
        <div className="mx-auto max-w-6xl">
          <Link href={`${base}/access`} className="text-xs underline">
            ← Your Field Tool
          </Link>
          <p className="ai-eyebrow mt-8">
            AI STALEMATE / {content.audience === "pm" ? "PM" : "LEAD DEVELOPER"}{" "}
            LIBRARY
          </p>
          <h1 className="mt-4 font-display text-5xl md:text-7xl">
            Bring better questions.
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--ft-muted)]">
            Pick the question you need to answer. Read or watch one relevant
            source, then bring something concrete back to{" "}
            {content.audience === "pm" ? "your lead" : "your PM"}. You do not
            need to work through this entire library.
          </p>
        </div>
      </header>
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Understand the approach",
              body: "Start with Simon Willison’s patterns or the Lenny conversation. Which practice would change your next piece of work?",
              id: "patterns",
            },
            {
              title: "Check who can access the data",
              body: "Start with OWASP if you need to work out who may see or change particular records. Ask who makes those rules and who checks that the software follows them.",
              id: "owasp",
            },
            {
              title: "Set a limit on the experiment",
              body: "Start with Shape Up’s pitch. Decide how much time and money to spend before trying the idea.",
              id: "shape-up",
            },
          ].map(x => (
            <a
              className="ai-library-card"
              key={x.id}
              href={`#resource-${x.id}`}
              onClick={() => {
                setView("study");
                setCategory("All");
                setSearch("");
                setJump(x.id);
              }}
            >
              <h2 className="font-display text-2xl">{x.title}</h2>
              <p className="mt-3">{x.body}</p>
            </a>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3" aria-label="Library view">
          {(["study", "tools"] as const).map(v => (
            <button
              key={v}
              aria-pressed={view === v}
              onClick={() => {
                setView(v);
                setCategory("All");
              }}
              className={`border px-5 py-3 text-sm ${view === v ? "bg-[var(--ft-tint)] text-[var(--ft-ink)]" : "border-[var(--ft-line)]"}`}
            >
              {v === "study" ? "Study & frameworks" : "Tool map"}
            </button>
          ))}
        </div>
        {view === "tools" && (
          <p className="ft-action-primary mt-5 max-w-3xl text-sm leading-7 text-[var(--ft-muted)]">
            These tools do different jobs. Some help write code; others help
            review or test it.{" "}
            {content.audience === "pm"
              ? "Ask your engineering lead what you already use, what each tool would check, what it would miss, and what it would cost."
              : "Start with what your team already uses. Check what each tool would catch, what it would miss, and the work and cost it would add."}
          </p>
        )}
        <div className="my-6 flex flex-wrap gap-4">
          <label className="flex-1 min-w-48 text-xs">
            Find a resource
            <input
              aria-label="Find a resource"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="mt-2 w-full border border-[var(--ft-line)] bg-white p-3 text-sm"
              placeholder="Try permissions, testing, or evidence"
            />
          </label>
          <label className="text-xs">
            Topic
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="mt-2 block border border-[var(--ft-line)] bg-white p-3 text-sm"
            >
              {categories.map(c => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
        </div>
        <p className="mb-5 text-xs text-[var(--ft-muted)]">
          {filtered.length} resources · sources reviewed {library.reviewed}
        </p>
        <div className="grid gap-5 md:grid-cols-2">
          {filtered.map(r => (
            <article
              id={`resource-${r.id}`}
              key={r.id}
              className="ai-library-card scroll-mt-24"
            >
              <p className="ai-eyebrow">
                {r.category} / {r.kind}
              </p>
              <h3 className="mt-3">{r.name}</h3>
              <p className="mt-3">{r.why}</p>
              {r.section && (
                <p className="mt-3">
                  <strong>Look for:</strong> {r.section}
                </p>
              )}
              <div className="mt-4 border-l-2 border-[var(--ft-accent)] pl-4">
                <p>
                  <strong>Bring back this question</strong>
                  <br />
                  {content.audience === "pm" ? r.pmQuestion : r.devQuestion}
                </p>
              </div>
              <a
                className="mt-5 inline-block text-sm underline underline-offset-4"
                href={r.url}
                target="_blank"
                rel="noreferrer"
              >
                Open the source ↗
              </a>
              {r.secondaryUrl && (
                <a
                  className="ml-4 text-xs underline"
                  href={r.secondaryUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Read the earlier study ↗
                </a>
              )}
            </article>
          ))}
        </div>
        {!filtered.length && (
          <p role="status" className="py-10">
            No matching resources. Try another topic or search.
          </p>
        )}
        <aside className="mt-10 border-t border-[var(--ft-line)] pt-7">
          <h2 className="font-display text-3xl">
            Keep the question close to the work.
          </h2>
          <p className="mt-3 text-sm leading-7">
            Write down what you learned in Next Step Together or your Experiment
            Plan. Tools and prices change, so check the current documentation
            before choosing one.
          </p>
          <Link
            className="ft-button ft-button-gold mt-5"
            href={`${base}/lab?step=1`}
          >
            Bring it back to the conversation →
          </Link>
          <p className="mt-8 text-xs leading-7">
            More from Nic:{" "}
            <a
              className="underline"
              href="https://substack.com/@leaderrebellion"
              target="_blank"
              rel="noreferrer"
            >
              Rebel Leaders writing ↗
            </a>{" "}
            ·{" "}
            <a
              className="underline"
              href="https://www.youtube.com/@LeaderRebellion"
              target="_blank"
              rel="noreferrer"
            >
              Rebel Leaders videos ↗
            </a>
          </p>
        </aside>
      </section>
      <FieldToolsFooter />
    </main>
  );
}
