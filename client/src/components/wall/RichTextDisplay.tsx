import DOMPurify from "dompurify";

interface RichTextDisplayProps {
  content: string;
  className?: string;
}

function normalizeContent(html: string): string {
  let result = html;
  result = result.replace(/<p>\s*<\/p>/g, "<br>");
  result = result.replace(/<p class="paragraph">\s*<\/p>/g, "<br>");
  result = result.replace(/(<br\s*\/?>\s*){3,}/g, "<br><br>");
  return result;
}

export default function RichTextDisplay({ content, className = "" }: RichTextDisplayProps) {
  const sanitized = DOMPurify.sanitize(normalizeContent(content), {
    ALLOWED_TAGS: ["p", "br", "strong", "em", "h1", "h2", "h3", "ul", "ol", "li", "blockquote", "a"],
    FORBID_ATTR: ["data-*"],
  });

  return (
    <div
      className={`prose prose-sm max-w-none text-parchment/80 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-4 [&_h1]:mt-6 [&_h1]:text-parchment [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mb-3 [&_h2]:mt-5 [&_h2]:text-parchment [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mb-2 [&_h3]:mt-4 [&_h3]:text-parchment [&_p]:leading-relaxed [&_p]:mb-3 [&_blockquote]:border-l-4 [&_blockquote]:border-gold/40 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-parchment/60 [&_blockquote]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-1 ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
}
