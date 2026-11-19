"use client";
import React from "react";
import { ArrowUp, ArrowDown, Trash2, Plus } from "lucide-react";
import ImageSlot from "@/components/common/ImageSlot";
import { BLOCK_TYPES, HEADING_LEVELS, LIMITS } from "@/data/blogOptions";
import { newBlock } from "@/utils/blogBlocks";

const inputCls =
  "h-10 w-full rounded-md border border-line bg-white px-3 text-xs outline-none focus:border-gold";
const areaCls =
  "w-full resize-y rounded-md border border-line bg-white p-3 text-xs leading-relaxed outline-none focus:border-gold";
const labelCls = "mb-1 mt-3 block text-[10px] font-semibold uppercase tracking-wider text-[#444]";
const cellCls =
  "h-9 w-full min-w-[130px] rounded border border-line bg-white px-2 text-xs outline-none focus:border-gold";

const typeLabel = (type) => BLOCK_TYPES.find((t) => t.value === type)?.label || type;

// Comparison table: headers[0] = criteria column, headers[1..] = the options being compared
function TableEditor({ block, set }) {
  const { headers, rows } = block;
  const cols = headers.length;

  const setHeader = (i, value) => set({ headers: headers.map((h, idx) => (idx === i ? value : h)) });

  const setCell = (r, c, value) =>
    set({
      rows: rows.map((row, ri) => (ri === r ? row.map((cell, ci) => (ci === c ? value : cell)) : row)),
    });

  const addColumn = () => {
    if (cols >= LIMITS.tableCols) return;
    set({
      headers: [...headers, `Option ${String.fromCharCode(64 + cols)}`],
      rows: rows.map((r) => [...r, ""]),
    });
  };

  const removeColumn = (i) => {
    if (cols <= 2 || i === 0) return;
    set({
      headers: headers.filter((_, idx) => idx !== i),
      rows: rows.map((r) => r.filter((_, idx) => idx !== i)),
    });
  };

  const addRow = () => {
    if (rows.length >= LIMITS.tableRows) return;
    set({ rows: [...rows, headers.map(() => "")] });
  };

  const removeRow = (i) => {
    if (rows.length <= 1) return;
    set({ rows: rows.filter((_, idx) => idx !== i) });
  };

  return (
    <>
      <label className={labelCls}>Caption</label>
      <input
        value={block.caption}
        onChange={(e) => set({ caption: e.target.value })}
        placeholder="e.g. Monolithic vs Conventional Construction"
        className={inputCls}
      />

      <p className="mb-1.5 mt-3 text-[10px] leading-relaxed text-[#00000099]">
        First column is the comparison criteria. The other column headers are the options being compared.
      </p>

      <div className="overflow-x-auto rounded-md border border-line bg-white">
        <table className="border-collapse">
          <thead>
            <tr>
              {headers.map((_, i) => (
                <th key={i} className="px-1.5 pt-1.5 text-right">
                  {i > 0 && cols > 2 && (
                    <button
                      type="button"
                      onClick={() => removeColumn(i)}
                      aria-label={`Remove column ${i + 1}`}
                      className="rounded p-1 text-red-500 hover:bg-red-50"
                    >
                      <Trash2 size={12} />
                    </button>
                  )}
                </th>
              ))}
              <th />
            </tr>
            <tr>
              {headers.map((h, i) => (
                <th key={i} className="px-1.5 pb-1.5">
                  <input
                    value={h}
                    onChange={(e) => setHeader(i, e.target.value)}
                    placeholder={i === 0 ? "Criteria" : `Option ${String.fromCharCode(64 + i)}`}
                    aria-label={i === 0 ? "Criteria column header" : `Column ${i + 1} header`}
                    className={`${cellCls} bg-[#eaf0fb] font-semibold`}
                  />
                </th>
              ))}
              <th />
            </tr>
          </thead>
          <tbody>
            {rows.map((row, r) => (
              <tr key={r}>
                {headers.map((_, c) => (
                  <td key={c} className="px-1.5 py-1">
                    <input
                      value={row[c] ?? ""}
                      onChange={(e) => setCell(r, c, e.target.value)}
                      aria-label={`Row ${r + 1}, column ${c + 1}`}
                      className={`${cellCls} ${c === 0 ? "font-medium" : ""}`}
                    />
                  </td>
                ))}
                <td className="px-1.5">
                  {rows.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRow(r)}
                      aria-label={`Remove row ${r + 1}`}
                      className="rounded p-1 text-red-500 hover:bg-red-50"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-2 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={addColumn}
          disabled={cols >= LIMITS.tableCols}
          className="flex items-center gap-1 rounded-md border border-line bg-white px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-navy hover:bg-[#eaf0fb] disabled:opacity-40"
        >
          <Plus size={11} /> Column
        </button>
        <button
          type="button"
          onClick={addRow}
          disabled={rows.length >= LIMITS.tableRows}
          className="flex items-center gap-1 rounded-md border border-line bg-white px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-navy hover:bg-[#eaf0fb] disabled:opacity-40"
        >
          <Plus size={11} /> Row
        </button>
        <span className="ml-auto self-center text-[10px] text-[#00000080]">
          {cols} columns · {rows.length} rows (max {LIMITS.tableCols} × {LIMITS.tableRows})
        </span>
      </div>
    </>
  );
}

function BlockFields({ block, set }) {
  switch (block.type) {
    case "heading":
      return (
        <>
          <label className={labelCls}>Level</label>
          <select value={block.level} onChange={(e) => set({ level: e.target.value })} className={inputCls}>
            {HEADING_LEVELS.map((l) => (
              <option key={l} value={l}>
                {l.toUpperCase()}
              </option>
            ))}
          </select>
          <label className={labelCls}>Heading text</label>
          <input value={block.text} onChange={(e) => set({ text: e.target.value })} className={inputCls} />
        </>
      );

    case "text":
    case "quote":
    case "proTip":
      return (
        <>
          <label className={labelCls}>{block.type === "text" ? "Paragraph" : "Text"}</label>
          <textarea
            rows={block.type === "text" ? 5 : 3}
            value={block.text}
            onChange={(e) => set({ text: e.target.value })}
            className={areaCls}
          />
        </>
      );

    case "code":
      return (
        <>
          <label className={labelCls}>Code</label>
          <textarea
            rows={5}
            value={block.text}
            onChange={(e) => set({ text: e.target.value })}
            className={`${areaCls} font-mono`}
          />
        </>
      );

    case "list":
      return (
        <>
          <label className={labelCls}>Style</label>
          <select value={block.style} onChange={(e) => set({ style: e.target.value })} className={inputCls}>
            <option value="bullet">Bullet</option>
            <option value="number">Numbered</option>
          </select>
          <label className={labelCls}>Items (one per line)</label>
          <textarea
            rows={4}
            value={block.itemsText}
            onChange={(e) => set({ itemsText: e.target.value })}
            className={areaCls}
          />
        </>
      );

    case "link":
    case "button":
      return (
        <>
          <label className={labelCls}>{block.type === "button" ? "Button label" : "Link text"}</label>
          <input value={block.text} onChange={(e) => set({ text: e.target.value })} className={inputCls} />
          <label className={labelCls}>URL</label>
          <input
            value={block.href}
            onChange={(e) => set({ href: e.target.value })}
            placeholder="https://"
            className={inputCls}
          />
          {block.type === "button" && (
            <>
              <label className={labelCls}>Open in</label>
              <select
                value={block.buttonTarget}
                onChange={(e) => set({ buttonTarget: e.target.value })}
                className={inputCls}
              >
                <option value="_self">Same tab</option>
                <option value="_blank">New tab</option>
              </select>
            </>
          )}
        </>
      );

    case "table":
      return <TableEditor block={block} set={set} />;

    case "image":
      return (
        <div className="mt-3">
          <ImageSlot
            value={block.image}
            onChange={(image) => set({ image })}
            maxMB={LIMITS.imageMB}
            title="Upload content image"
            hint={`PNG, JPG or WEBP up to ${LIMITS.imageMB}MB`}
          />
        </div>
      );

    default:
      return null;
  }
}

// value: editor blocks, onChange(nextBlocks)
export default function BlockEditor({ value, onChange }) {
  const update = (key, patch) => onChange(value.map((b) => (b.key === key ? { ...b, ...patch } : b)));
  const remove = (key) => onChange(value.filter((b) => b.key !== key));

  const move = (index, dir) => {
    const to = index + dir;
    if (to < 0 || to >= value.length) return;
    const next = [...value];
    [next[index], next[to]] = [next[to], next[index]];
    onChange(next);
  };

  return (
    <div>
      {value.length === 0 && (
        <p className="rounded-md border border-dashed border-line bg-surface px-3 py-6 text-center text-xs text-[#00000080]">
          No content yet. Add a block below.
        </p>
      )}

      <div className="space-y-3">
        {value.map((block, i) => (
          <div key={block.key} className="rounded-lg border border-line bg-surface p-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-navy">
                {i + 1}. {typeLabel(block.type)}
              </span>
              <div className="flex items-center gap-0.5">
                <button
                  type="button"
                  onClick={() => move(i, -1)}
                  disabled={i === 0}
                  aria-label="Move up"
                  className="rounded p-1 text-[#444] hover:bg-white disabled:opacity-30"
                >
                  <ArrowUp size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => move(i, 1)}
                  disabled={i === value.length - 1}
                  aria-label="Move down"
                  className="rounded p-1 text-[#444] hover:bg-white disabled:opacity-30"
                >
                  <ArrowDown size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => remove(block.key)}
                  aria-label="Remove block"
                  className="rounded p-1 text-red-500 hover:bg-red-50"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            <BlockFields block={block} set={(patch) => update(block.key, patch)} />
          </div>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {BLOCK_TYPES.map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => onChange([...value, newBlock(t.value)])}
            className="flex items-center gap-1 rounded-md border border-line bg-white px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-navy hover:bg-[#eaf0fb]"
          >
            <Plus size={11} /> {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}