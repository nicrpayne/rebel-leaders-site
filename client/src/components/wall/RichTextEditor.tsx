import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
}

export default function RichTextEditor({
  content,
  onChange,
  placeholder = "Start typing...",
  className = "",
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: { HTMLAttributes: { class: "paragraph" } },
        hardBreak: { HTMLAttributes: { class: "hard-break" } },
        heading: { levels: [1, 2, 3], HTMLAttributes: { class: "heading" } },
        blockquote: { HTMLAttributes: { class: "blockquote" } },
        bulletList: { keepMarks: true, keepAttributes: false, HTMLAttributes: { class: "list-disc list-inside" } },
        orderedList: { keepMarks: true, keepAttributes: false, HTMLAttributes: { class: "list-decimal list-inside" } },
      }),
      Placeholder.configure({ placeholder }),
      TextStyle,
      Color,
    ],
    content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const processed = html
        .replace(/<p><\/p>/g, "<br>")
        .replace(/<p>\s*<\/p>/g, "<br>")
        .replace(/<p class="paragraph"><\/p>/g, "<br>")
        .replace(/<p class="paragraph">\s*<\/p>/g, "<br>");
      onChange(processed);
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none focus:outline-none p-3 overflow-y-auto text-white [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-4 [&_h1]:mt-6 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mb-3 [&_h2]:mt-5 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mb-2 [&_h3]:mt-4 [&_blockquote]:border-l-4 [&_blockquote]:border-gray-400 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-600 [&_blockquote]:my-4 [&_br]:block [&_br]:my-2",
      },
    },
    immediatelyRender: false,
  });

  if (!editor) return null;

  const btnBase = "px-2 py-1 text-xs font-mono border border-gray-300 hover:border-gray-700 transition-colors";
  const btnActive = "bg-gray-900 text-white border-gray-900";
  const btnInactive = "bg-transparent text-gray-600";

  return (
    <div className={`border border-gray-300 flex flex-col ${className}`}>
      <div className="border-b border-gray-300 p-2 flex flex-wrap gap-1">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`${btnBase} ${editor.isActive("bold") ? btnActive : btnInactive}`}>B</button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`${btnBase} italic ${editor.isActive("italic") ? btnActive : btnInactive}`}>I</button>
        <div className="w-px h-5 bg-gray-300 mx-1 self-center" />
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={`${btnBase} ${editor.isActive("heading", { level: 1 }) ? btnActive : btnInactive}`}>H1</button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`${btnBase} ${editor.isActive("heading", { level: 2 }) ? btnActive : btnInactive}`}>H2</button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={`${btnBase} ${editor.isActive("heading", { level: 3 }) ? btnActive : btnInactive}`}>H3</button>
        <div className="w-px h-5 bg-gray-300 mx-1 self-center" />
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={`${btnBase} ${editor.isActive("bulletList") ? btnActive : btnInactive}`}>UL</button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`${btnBase} ${editor.isActive("orderedList") ? btnActive : btnInactive}`}>OL</button>
        <div className="w-px h-5 bg-gray-300 mx-1 self-center" />
        <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={`${btnBase} ${editor.isActive("blockquote") ? btnActive : btnInactive}`}>"</button>
      </div>
      <div className="flex-1 overflow-hidden min-h-[120px]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
