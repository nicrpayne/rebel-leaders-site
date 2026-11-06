import PageLayout from "@/components/PageLayout";

export default function Privacy() {
  return (
    <PageLayout>
      <article className="mx-auto max-w-3xl px-5 py-12 md:px-10 md:py-16">
        <h1 className="font-display text-4xl font-semibold md:text-5xl">Rebel Leaders privacy policy</h1>
        <p className="mt-4 font-ui text-base leading-7 text-parchment-dim">
          This policy covers rebel-leader.com and the Field Tools at tools.rebel-leader.com. What we keep depends on what you do here. Workbench readings can be saved to your account. The notes you write in a paid Field Tool Lab stay in the browser where you write them.
        </p>
        <h2 className="mt-10 font-display text-3xl font-semibold text-parchment">Sign in and use the Workbench</h2>
        <p className="mt-4 font-ui text-base leading-7 text-parchment-dim">
          We use your email to send sign-in links and a cookie to keep you signed in. The main site also stores a browser ID to remember activity between visits. When you sign in, we can connect earlier activity from that browser to your account.
        </p>
        <p className="mt-4 font-ui text-base leading-7 text-parchment-dim">
          The Workbench can save your assessment answers, scores, readings, selected practices, and reflections so you can return to them. Some tools also email you a copy of your reading. If you submit a photo to a community Wall, we store it for review. Visitors to that Wall can see approved photos.
        </p>
        <h2 className="mt-10 font-display text-3xl font-semibold text-parchment">Buy or give a Field Tool</h2>
        <p className="mt-4 font-ui text-base leading-7 text-parchment-dim">
          Lemon Squeezy handles payment and sends your receipt. We receive your checkout email, order number, edition, and payment or refund status so we can provide access and help with orders. If you buy a gift, we use the names, recipient email, and optional note you enter to deliver it. The recipient’s Lab work stays with them. <a className="underline underline-offset-4" href="https://www.lemonsqueezy.com/privacy">Lemon Squeezy privacy policy</a>
        </p>
        <p className="mt-4 font-ui text-base leading-7 text-parchment-dim">
          Lab drafts save on your device. Clearing site data can erase them, so download anything you want to keep. Fields marked as private reflections stay in the open Lab tab and clear when you refresh or leave. If you separately ask us to email a Pressure Test result, we save your email, result, and score summary to send it.
        </p>
        <h2 className="mt-10 font-display text-3xl font-semibold text-parchment">Site analytics and browser settings</h2>
        <p className="mt-4 font-ui text-base leading-7 text-parchment-dim">
          On the main site, we use PostHog to count page visits and selected actions, such as starting a Gravitas scan. It receives browser and device details, the name of the page, and some tool results. When you sign in, we use an account ID to connect those events. We keep session replay off and exclude what you type from analytics. The main site’s analytics can run even when Do Not Track is on.
        </p>
        <p className="mt-4 font-ui text-base leading-7 text-parchment-dim">
          Field Tools uses PostHog only on selected public sales pages. We count visits, selected clicks, scrolling, and time on the page without analytics cookies. We skip these measurements when your browser sends Do Not Track or Global Privacy Control. We exclude Guides, Labs, and sign-in pages from these measurements and from session replay.
        </p>
        <h2 className="mt-10 font-display text-3xl font-semibold text-parchment">Email and outside services</h2>
        <p className="mt-4 font-ui text-base leading-7 text-parchment-dim">
          We use hosting, storage, and email providers to run the sites, store saved work, and deliver messages. They process information such as IP addresses, browser details, or email addresses as needed for those tasks. If you email us, we use your address and what you send to reply.
        </p>
        <p className="mt-4 font-ui text-base leading-7 text-parchment-dim">
          The newsletter is a separate signup through Substack. You can unsubscribe in any newsletter email. Some pages also display a Substack signup or a YouTube video. When one loads, the provider receives information from your browser and may recognize it across sites. <a className="underline underline-offset-4" href="https://substack.com/privacy">Substack privacy policy</a> · <a className="underline underline-offset-4" href="https://policies.google.com/privacy">Google and YouTube privacy policy</a>
        </p>
        <h2 className="mt-10 font-display text-3xl font-semibold text-parchment">Questions and changes</h2>
        <p className="mt-4 font-ui text-base leading-7 text-parchment-dim">
          To ask what we hold about you, request a correction, or ask us to delete it, email <a className="underline underline-offset-4" href="mailto:hello@rebel-leader.com">hello@rebel-leader.com</a> from the address you used here. We may need to verify the request and keep records needed for purchases or legal obligations. You can remove locally saved Lab drafts by clearing site data in the browser where you used the tool.
        </p>
        <p className="mt-4 font-ui text-base leading-7 text-parchment-dim">
          We’ll describe material changes on this page and update the effective date.
        </p>
        <p className="mt-4 font-ui text-base leading-7 text-parchment-dim">
          Effective November 6, 2026
        </p>
      </article>
    </PageLayout>
  );
}
