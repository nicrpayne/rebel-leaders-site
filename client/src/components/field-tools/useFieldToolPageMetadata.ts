import { useLayoutEffect } from "react";
import {
  DEFAULT_PAGE_DESCRIPTION,
  DEFAULT_PAGE_TITLE,
  fieldToolMetaTags,
  fieldToolPageMetadata,
} from "@shared/field-tool-page-metadata";

export function useFieldToolPageMetadata(path: string) {
  useLayoutEffect(() => {
    // Match the server-rendered head when moving between pages without a reload.
    document.head
      .querySelectorAll("[data-field-tool-metadata]")
      .forEach(node => node.remove());
    document.head.querySelector('meta[name="description"]')?.remove();
    const page = fieldToolPageMetadata(path);
    document.title = page?.title ?? DEFAULT_PAGE_TITLE;
    const tags = page
      ? fieldToolMetaTags(page)
      : [{ name: "description", content: DEFAULT_PAGE_DESCRIPTION }];
    tags.forEach(tag => {
      const element = document.createElement("meta");
      element.setAttribute("data-field-tool-metadata", "");
      Object.entries(tag).forEach(([key, value]) =>
        element.setAttribute(key, value)
      );
      document.head.append(element);
    });
    if (page) {
      const canonical = document.createElement("link");
      canonical.setAttribute("data-field-tool-metadata", "");
      canonical.rel = "canonical";
      canonical.href = page.canonical;
      document.head.append(canonical);
    }
  }, [path]);
}
