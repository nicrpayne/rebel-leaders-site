import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  ArrowDownToLine,
  BookOpen,
  Check,
  Play,
  Gift,
  LogOut,
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { fieldToolBase, fieldToolForPath } from "@/lib/field-tool-paths";
import { fieldToolWelcome } from "@/lib/field-tool-welcome";
import { useFieldToolContent } from "./FieldToolGate";
import FieldToolsNav from "./FieldToolsNav";
import FieldToolsFooter from "./FieldToolsFooter";
import "./field-tool-welcome.css";

export default function FieldToolWelcome({
  slug,
  extras = [],
}: {
  slug: string;
  extras?: Array<{ title: string; detail: string; href: string }>;
}) {
  const content = useFieldToolContent();
  const portrait = useRef<HTMLImageElement>(null);
  const [portraitReady, setPortraitReady] = useState(false);
  useEffect(() => {
    if (portrait.current?.complete) setPortraitReady(true);
  }, []);
  const base = fieldToolBase(slug, content.audience);
  const tool = fieldToolForPath(slug, content.audience);
  const copy = fieldToolWelcome(slug, content.audience);
  const signOut = trpc.fieldTools.signOut.useMutation({
    onSuccess: () => window.location.reload(),
  });
  if (!tool || !copy)
    return (
      <main className="p-10">
        Field Tool not found. <Link href="/field-tools">Browse the tools</Link>
      </main>
    );
  const pdf = `/api/field-tools/${slug}/pdf?audience=${content.audience}`;
  return (
    <main className="ft-welcome">
      <FieldToolsNav tone="light" />
      <section className="ft-welcome-hero" aria-labelledby="welcome-title">
        <div className="ft-welcome-copy">
          <p className="ft-welcome-eyebrow">
            <span aria-hidden="true" /> {tool.name}
            {slug === "ai-stalemate"
              ? ` · ${content.audience === "pm" ? "PM edition" : "Lead Developer edition"}`
              : ""}
          </p>
          <h1 id="welcome-title">{copy.heading}</h1>
          <p className="ft-welcome-intro">{copy.intro}</p>
          <Link href={`${base}/lab`} className="ft-welcome-primary">
            Open my Lab <ArrowRight size={18} aria-hidden="true" />
          </Link>
          {slug === "ai-stalemate" && (
            <p className="mt-4 font-ui text-xs leading-6 text-[var(--ft-muted)]">
              Start with a few sentences. You don’t need to read the whole Guide
              first.
            </p>
          )}
        </div>
        <figure className="ft-welcome-portrait" data-ready={portraitReady}>
          <img
            ref={portrait}
            onLoad={() => setPortraitReady(true)}
            onError={() => setPortraitReady(true)}
            src="/assets/field-tools/when-the-team-goes-quiet-hero-v2.webp"
            alt="Nic Payne smiling in his study"
            width={1672}
            height={941}
            fetchPriority="high"
          />
          <figcaption>Glad you’re here.</figcaption>
        </figure>
      </section>

      <div className="ft-welcome-inner">
        <section
          className="ft-welcome-outcomes"
          aria-labelledby="outcomes-title"
        >
          <h2 id="outcomes-title">What this helps with</h2>
          <ul>
            {copy.outcomes.map(outcome => (
              <li key={outcome}>
                <Check size={19} aria-hidden="true" />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="ft-welcome-kit" aria-labelledby="kit-title">
          <div className="ft-welcome-section-heading">
            <h2 id="kit-title">Your Guide and resources</h2>
          </div>
          <div className="ft-welcome-kit-grid">
            <Link href={`${base}/guide`} className="ft-welcome-resource">
              <BookOpen size={24} aria-hidden="true" />
              <div>
                <h3>
                  {slug === "ai-stalemate"
                    ? "Use the Field Guide when you need it"
                    : "Read the Field Guide first"}
                </h3>
                <p>
                  See an example and get a feel for the questions before you try
                  your own situation.
                </p>
                <span>
                  Open the Guide <ArrowRight size={16} aria-hidden="true" />
                </span>
              </div>
            </Link>
            <a href={pdf} className="ft-welcome-resource">
              <ArrowDownToLine size={24} aria-hidden="true" />
              <div>
                <h3>Keep a copy</h3>
                <p>
                  Download the Guide to read away from the screen, make notes,
                  or print.
                </p>
                <span>
                  Download the PDF <ArrowRight size={16} aria-hidden="true" />
                </span>
              </div>
            </a>
            {extras.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="ft-welcome-resource"
              >
                <BookOpen size={24} aria-hidden="true" />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                  <span>
                    Take a look <ArrowRight size={16} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
            {content.walkthroughUrl && (
              <a
                href={content.walkthroughUrl}
                target="_blank"
                rel="noreferrer"
                className="ft-welcome-resource"
              >
                <Play size={24} aria-hidden="true" />
                <div>
                  <h3>Work through an example with Nic</h3>
                  <p>
                    See how the questions come together before you try your own
                    situation.
                  </p>
                  <span>Watch the walkthrough ↗</span>
                </div>
              </a>
            )}
          </div>
        </section>

        <section className="ft-welcome-help" aria-labelledby="help-title">
          <h2 id="help-title">Using your tool</h2>
          <details>
            <summary>Will my work be saved?</summary>
            <p>
              Your Lab answers save in this browser on this device. They won’t
              appear automatically on another device, so download anything you
              want to keep before switching or clearing your browser. Questions
              marked “Private reflection” stay only in the open tab; they aren’t
              saved or included in anything you export.
            </p>
          </details>
          <details>
            <summary>How do I come back?</summary>
            <p>
              Bookmark this page. If you need to sign in again, use the email
              you bought with—or the email your gift was sent to. We’ll send you
              a fresh sign-in link.
            </p>
          </details>
          <details>
            <summary>Can I share what I make?</summary>
            <p>
              Yes. The Lab helps you turn your answers into documents you can
              copy, download, or print. Read them over, make them your own, then
              share them with the people you want to talk to. Your private
              reflection stays out of those documents.
            </p>
          </details>
          <details>
            <summary>Where does the thinking behind this come from?</summary>
            <p>
              These tools draw on my Holistic Shaping work—how work shapes who
              we become, and what we can do about it.
            </p>
            <a
              href="https://rebel-leader.com"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block underline underline-offset-4"
            >
              Explore Rebel Leaders →
            </a>
          </details>
        </section>
        <div className="ft-welcome-bottom">
          <Link href={`${base}/buy?gift=1`}>
            <Gift size={17} aria-hidden="true" /> Gift this
          </Link>
          <button onClick={() => signOut.mutate()} disabled={signOut.isPending}>
            <LogOut size={15} aria-hidden="true" />
            {signOut.isPending ? "Signing out…" : "Sign out"}
          </button>
          {signOut.error && (
            <p role="alert">We couldn’t sign you out. Please try again.</p>
          )}
        </div>
      </div>
      <FieldToolsFooter />
    </main>
  );
}
