import { useLayoutEffect } from "react";

// These pages are lazy-loaded, so the browser may look for the anchor before
// the sales content exists. Preserve direct links to the public example/offer.
export function useSalesPageAnchor() {
  useLayoutEffect(() => {
    const id = window.location.hash.slice(1);
    if (["delivery-example", "collection-editions", "purchase"].includes(id)) {
      document.getElementById(id)?.scrollIntoView({ block: "start" });
    }
  }, []);
}
