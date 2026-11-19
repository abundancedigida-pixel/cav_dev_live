"use client";
import React, { useEffect, useRef } from "react";

const TOOLS = [
  { id: "bold", label: "B", title: "Bold", cls: "font-bold" },
  { id: "italic", label: "I", title: "Italic", cls: "italic" },
  { id: "h2", label: "H2", title: "Heading", cls: "font-semibold" },
  { id: "quote", label: "Quote", title: "Quote", cls: "" },
];

export default function RichTextEditor({ initialHtml = "", onChange, placeholder = "Write here..." }) {
  const editorRef = useRef(null);

  // set the initial content once on mount
  useEffect(() => {
    if (editorRef.current) editorRef.current.innerHTML = initialHtml;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const emit = () => {
    const el = editorRef.current;
    if (!el) return;
    onChange(el.textContent.trim() ? el.innerHTML : "");
  };

  const toggleBlock = (tag) => {
    const current = document.queryCommandValue("formatBlock").toLowerCase();
    document.execCommand("formatBlock", false, current === tag ? "p" : tag);
  };

  const run = (id) => {
    const el = editorRef.current;
    if (!el) return;
    el.focus();
    if (id === "bold") document.execCommand("bold");
    if (id === "italic") document.execCommand("italic");
    if (id === "h2") toggleBlock("h2");
    if (id === "quote") toggleBlock("blockquote");
    emit();
  };

  return (
    <div className="overflow-hidden rounded-md border border-line">
      <div className="flex items-center gap-1 border-b border-line bg-surface px-2 py-1.5">
        {TOOLS.map((t) => (
          <button
            key={t.id}
            type="button"
            title={t.title}
            aria-label={t.title}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => run(t.id)}
            className={`min-w-7 rounded px-2 py-1 text-xs text-[#222] hover:bg-white ${t.cls}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        data-placeholder={placeholder}
        onInput={emit}
        onPaste={(e) => {
          e.preventDefault();
          document.execCommand("insertText", false, e.clipboardData.getData("text/plain"));
        }}
        className="min-h-[140px] bg-surface px-3 py-3 text-[13px] leading-relaxed text-[#222] outline-none empty:before:text-[#00000066] empty:before:content-[attr(data-placeholder)] [&_blockquote]:my-2 [&_blockquote]:border-l-2 [&_blockquote]:border-navy/40 [&_blockquote]:pl-3 [&_blockquote]:italic [&_h2]:my-2 [&_h2]:text-base [&_h2]:font-semibold"
      />
    </div>
  );
}