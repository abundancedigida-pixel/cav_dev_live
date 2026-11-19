"use client";
import React from "react";

const pageList = (page, totalPages) => {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
  const nums = [...new Set([1, totalPages, page - 1, page, page + 1])]
    .filter((n) => n >= 1 && n <= totalPages)
    .sort((a, b) => a - b);
  const out = [];
  nums.forEach((n, i) => {
    if (i && n - nums[i - 1] > 1) out.push("…");
    out.push(n);
  });
  return out;
};

export default function Pagination({ page, total, limit, onChange }) {
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const from = total === 0 ? 0 : (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  return (
    <div className="flex flex-col gap-3 bg-[#eaf0fb] px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#00000099]">
        Showing {from} to {to} of {total} results
      </p>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onChange(page - 1)}
          disabled={page <= 1}
          className="px-2 text-[10px] font-semibold uppercase tracking-wider text-[#444] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>

        {pageList(page, totalPages).map((n, i) =>
          n === "…" ? (
            <span key={`gap-${i}`} className="px-1 text-xs text-[#00000066]">
              …
            </span>
          ) : (
            <button
              key={n}
              onClick={() => onChange(n)}
              aria-current={n === page ? "page" : undefined}
              className={`h-7 min-w-7 rounded-sm px-2 text-[11px] font-semibold ${
                n === page ? "bg-[#111] text-white" : "text-[#444] hover:bg-white"
              }`}
            >
              {n}
            </button>
          )
        )}

        <button
          onClick={() => onChange(page + 1)}
          disabled={page >= totalPages}
          className="px-2 text-[10px] font-semibold uppercase tracking-wider text-[#444] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}