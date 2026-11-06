export default function FieldToolArtifact({
  text,
  toolName,
  title,
}: {
  text: string;
  toolName: string;
  title: string;
}) {
  const blocks = text.split(/\n\n+/);
  return (
    <article
      className="ft-lab-output min-w-0 border border-[var(--ft-line)] bg-[var(--ft-white)] px-6 py-8 text-[var(--ft-ink)] shadow-none md:px-10 md:py-10"
      aria-label={`${title} document`}
    >
      <header className="border-b border-[var(--ft-line)] pb-6">
        <p className="font-ui text-[10px] tracking-[.18em] text-[var(--ft-muted)]">
          REBEL LEADERS / {toolName.toUpperCase()}
        </p>
        <h3 className="mt-4 font-display text-4xl font-semibold tracking-[-.025em]">
          {title}
        </h3>
        <p className="mt-3 font-ui text-xs text-[var(--ft-muted)]">
          Working record · Review before sharing
        </p>
      </header>
      <div className="mt-7 space-y-6">
        {(title === "Full working record" ? blocks : blocks.slice(1)).map(
          (block, index) => {
            const [heading, ...body] = block.split("\n");
            const isHeading =
              /^[A-Z0-9 /—–:().&'-]+$/.test(heading) && heading.length < 100;
            return (
              <section
                key={index}
                className="break-inside-avoid border-b border-[var(--ft-line)] pb-5 last:border-0"
              >
                {isHeading && (
                  <h4 className="mb-2 font-ui text-[10px] font-semibold tracking-[.1em] text-[var(--ft-muted)]">
                    {heading}
                  </h4>
                )}
                <p className="whitespace-pre-wrap break-words font-ui text-sm leading-7 text-[var(--ft-ink)]">
                  {isHeading ? body.join("\n") : block}
                </p>
              </section>
            );
          }
        )}
      </div>
    </article>
  );
}
