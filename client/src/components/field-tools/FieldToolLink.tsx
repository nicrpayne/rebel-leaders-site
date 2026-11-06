import type { ComponentProps } from "react";

export default function FieldToolLink({
  href,
  download,
  rel,
  ...props
}: ComponentProps<"a">) {
  if (!href || href.startsWith("#") || download || download === "") {
    return <a {...props} href={href} download={download} rel={rel} />;
  }

  const current = window.location;
  const destination = new URL(href, current.href);
  if (destination.protocol !== "http:" && destination.protocol !== "https:") {
    return <a {...props} href={href} rel={rel} />;
  }

  // Carry only the explicit QA flag into new Field Tools tabs.
  const sameOrigin = destination.origin === current.origin;
  if (
    sameOrigin &&
    /^\/field-tools(?:\/|$)/.test(destination.pathname) &&
    new URLSearchParams(current.search).get("analytics_test") === "1"
  ) {
    destination.searchParams.set("analytics_test", "1");
    href = destination.pathname + destination.search + destination.hash;
  }

  const samePageSection =
    sameOrigin &&
    destination.hash &&
    destination.pathname === current.pathname &&
    destination.search === current.search;
  return (
    <a
      {...props}
      href={href}
      target={samePageSection ? undefined : "_blank"}
      rel={rel ?? "noopener"}
    />
  );
}
