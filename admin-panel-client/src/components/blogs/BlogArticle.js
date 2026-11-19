"use client";
/* eslint-disable @next/next/no-img-element */
import React from "react";

// only allow safe link targets
const safeHref = (h = "") => (/^(https?:\/\/|mailto:|\/|#)/i.test(h) ? h : "#");

const HEADING_TAGS = ["h1", "h2", "h3", "h4"];
const HEADING_CLS = {
  h1: "text-2xl font-semibold",
  h2: "text-xl font-semibold",
  h3: "text-lg font-semibold",
  h4: "text-base font-semibold",
};

const isEmpty = (b) => {
  switch (b.type) {
    case "list":
      return !b.itemsText.trim();
    case "image":
      return !b.image?.url;
    case "table":
      return !b.headers.some((h) => h.trim()) && !b.rows.some((r) => r.some((c) => c.trim()));
    default:
      return !b.text.trim();
  }
};

function Block({ b }) {
  switch (b.type) {
    case "heading": {
      const Tag = HEADING_TAGS.includes(b.level) ? b.level : "h2";
      return <Tag className={`mt-6 font-serif text-[#1a1a1a] ${HEADING_CLS[Tag]}`}>{b.text}</Tag>;
    }
    case "text":
      return <p className="mt-3 whitespace-pre-line text-[14px] leading-relaxed text-[#333]">{b.text}</p>;
    case "quote":
      return (
        <blockquote className="mt-4 border-l-2 border-navy/40 pl-4 font-serif text-[15px] italic text-[#333]">
          {b.text}
        </blockquote>
      );
    case "proTip":
      return (
        <div className="mt-4 rounded-md border border-amber-200 bg-amber-50 px-3 py-2.5 text-[13px] text-amber-900">
          <span className="mr-2 text-[10px] font-bold uppercase tracking-wider">Pro tip</span>
          {b.text}
        </div>
      );
    case "code":
      return (
        <pre className="mt-4 overflow-x-auto rounded-md bg-[#0f1a2e] p-3 text-[11px] leading-relaxed text-white">
          <code>{b.text}</code>
        </pre>
      );
    case "list": {
      const items = b.itemsText.split("\n").filter((l) => l.trim());
      const Tag = b.style === "number" ? "ol" : "ul";
      return (
        <Tag
          className={`mt-3 space-y-1 pl-5 text-[14px] text-[#333] ${
            b.style === "number" ? "list-decimal" : "list-disc"
          }`}
        >
          {items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </Tag>
      );
    }
    case "link":
      return (
        <a
          href={safeHref(b.href)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-[14px] font-medium text-navy underline"
        >
          {b.text}
        </a>
      );
    case "button":
      return (
        <div className="mt-4">
          <a
            href={safeHref(b.href)}
            target={b.buttonTarget}
            rel="noopener noreferrer"
            className="inline-block rounded-sm bg-navy px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-white"
          >
            {b.text}
          </a>
        </div>
      );
    case "image":
      return <img src={b.image.url} alt="" className="mt-4 w-full rounded-md object-cover" />;
    case "table": {
      const hasHeaders = b.headers.some((h) => h.trim());
      const rows = b.rows.filter((r) => r.some((c) => c.trim()));
      return (
        <div className="mt-4 overflow-x-auto rounded-md border border-line">
          {b.caption && (
            <p className="border-b border-line bg-white px-3 py-2 text-[11px] font-semibold text-[#00000099]">
              {b.caption}
            </p>
          )}
          <table className="w-full min-w-[420px] border-collapse text-left text-xs">
            {hasHeaders && (
              <thead className="bg-[#eaf0fb]">
                <tr>
                  {b.headers.map((h, i) => (
                    <th key={i} className="px-3 py-2.5 font-semibold text-[#1a1a1a]">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-t border-line even:bg-surface/60">
                  {r.map((c, j) =>
                    j === 0 ? (
                      <th key={j} scope="row" className="px-3 py-2 font-semibold text-[#1a1a1a]">
                        {c}
                      </th>
                    ) : (
                      <td key={j} className="px-3 py-2 text-[#333]">
                        {c}
                      </td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    default:
      return null;
  }
}

export function BlogBlocks({ blocks }) {
  const visible = blocks.filter((b) => !isEmpty(b));
  if (visible.length === 0) return <p className="mt-4 text-xs text-[#00000080]">No content added yet</p>;
  return visible.map((b) => <Block key={b.key} b={b} />);
}

// Full article layout, used by the live preview in the editor
export default function BlogArticle({ title, category, author, tags, excerpt, heroUrl, blocks, dateText }) {
  return (
    <article>
      {category && <p className="text-[10px] font-bold uppercase tracking-widest text-navy">{category}</p>}
      <h1 className="mt-2 font-serif text-2xl font-semibold leading-tight text-[#1a1a1a] sm:text-3xl">
        {title.trim() || "Untitled article"}
      </h1>
      <p className="mt-2 text-xs text-[#00000099]">{[author, dateText].filter(Boolean).join("  •  ")}</p>

      {excerpt.trim() && (
        <p className="mt-4 border-l-2 border-gold pl-3 text-sm italic leading-relaxed text-[#444]">{excerpt}</p>
      )}

      {heroUrl && (
        <div className="mt-5 aspect-[16/9] w-full overflow-hidden rounded-lg bg-surface">
          <img src={heroUrl} alt={title} className="h-full w-full object-cover" />
        </div>
      )}

      <div className="mt-2">
        <BlogBlocks blocks={blocks} />
      </div>

      {tags.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-1.5 border-t border-line pt-4">
          {tags.map((t) => (
            <span key={t} className="rounded-full bg-navy/10 px-2.5 py-1 text-[11px] font-medium text-navy">
              #{t}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}