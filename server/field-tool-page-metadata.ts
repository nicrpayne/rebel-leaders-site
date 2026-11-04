import {
  fieldToolMetaTags,
  fieldToolPageMetadata,
} from "../shared/field-tool-page-metadata";

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    char =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ]!
  );
}

export function withFieldToolMetadata(template: string, requestPath: string) {
  const page = fieldToolPageMetadata(requestPath);
  if (!page) return template;
  const tags = fieldToolMetaTags(page).map(tag => {
    const identity = tag.name
      ? `name="${tag.name}"`
      : `property="${tag.property}"`;
    return `<meta data-field-tool-metadata ${identity} content="${escapeHtml(tag.content)}" />`;
  });
  tags.push(
    `<link data-field-tool-metadata rel="canonical" href="${escapeHtml(page.canonical)}" />`
  );
  return template
    .replace(
      /<title>[\s\S]*?<\/title>/i,
      `<title>${escapeHtml(page.title)}</title>`
    )
    .replace(/<meta\b[^>]*\bname=["']description["'][^>]*>/gi, "")
    .replace("</head>", `${tags.join("\n    ")}\n  </head>`);
}
