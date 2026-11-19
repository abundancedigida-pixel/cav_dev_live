"use client";
import React from "react";
import { Trash2 } from "lucide-react";
import Pagination from "@/components/common/Pagination";
import { StatusBadge, TypePill } from "./EnquiryBadges";
import { fmtDateTime, timeAgo } from "@/utils/dateFormat";

const Actions = ({ e, onView, onReply, onDelete }) => (
  <div className="flex items-center justify-end gap-1.5">
    <button
      onClick={() => onView(e)}
      className="h-8 rounded-sm border border-line bg-white px-2.5 text-[10px] font-semibold uppercase tracking-wider text-[#444] hover:bg-surface"
    >
      View
    </button>
    <button
      onClick={() => onReply(e)}
      className="h-8 rounded-sm bg-navy px-3 text-[10px] font-semibold uppercase tracking-wider text-white hover:opacity-90"
    >
      Reply
    </button>
    <button
      onClick={() => onDelete(e)}
      aria-label="Delete"
      className="rounded p-1.5 text-red-500 hover:bg-red-50"
    >
      <Trash2 size={14} />
    </button>
  </div>
);

export default function EnquiryTable({
  rows,
  loading,
  error,
  onRetry,
  page,
  total,
  limit,
  onPageChange,
  onView,
  onReply,
  onDelete,
}) {
  const empty = !loading && !error && rows.length === 0;

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-white">
      {/* Desktop table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[980px] text-left">
          <thead>
            <tr className="bg-[#eaf0fb] text-[10px] font-semibold uppercase tracking-wider text-[#00000099]">
              <th className="px-5 py-3.5">Enquiry ID</th>
              <th className="px-3 py-3.5">Customer &amp; Contact</th>
              <th className="px-3 py-3.5">Stream Type</th>
              <th className="px-3 py-3.5">Preference</th>
              <th className="px-3 py-3.5">Received</th>
              <th className="px-3 py-3.5">Status</th>
              <th className="px-3 py-3.5">Last Updated</th>
              <th className="px-5 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading &&
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td colSpan={8} className="px-5 py-3">
                    <div className="h-12 rounded bg-surface" />
                  </td>
                </tr>
              ))}

            {!loading &&
              !error &&
              rows.map((e) => (
                <tr key={e.id} className="border-b border-line text-[13px] text-[#333] hover:bg-surface/60">
                  <td
                    className={`whitespace-nowrap border-l-[3px] px-5 py-3.5 text-xs font-medium ${
                      e.status === "New" ? "border-l-navy" : "border-l-transparent"
                    }`}
                  >
                    {e.displayId}
                  </td>
                  <td className="max-w-[240px] px-3 py-3.5">
                    <p className="truncate font-semibold text-[#1a1a1a]">{e.name}</p>
                    <p className="truncate text-[11px] text-[#00000099]">{e.email}</p>
                    <p className="truncate text-[11px] text-[#00000099]">{e.phone}</p>
                  </td>
                  <td className="px-3 py-3.5">
                    <TypePill value={e.type} />
                  </td>
                  <td className="max-w-[200px] px-3 py-3.5 text-xs">
                    <span className="line-clamp-2">{e.summary}</span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3.5 text-xs text-[#00000099]">
                    {fmtDateTime(e.createdAt)}
                  </td>
                  <td className="px-3 py-3.5">
                    <StatusBadge value={e.status} />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3.5 text-xs text-[#00000099]">
                    {timeAgo(e.updatedAt)}
                  </td>
                  <td className="px-5 py-3.5">
                    <Actions e={e} onView={onView} onReply={onReply} onDelete={onDelete} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <ul className="divide-y divide-line md:hidden">
        {loading &&
          Array.from({ length: 4 }).map((_, i) => (
            <li key={i} className="animate-pulse px-4 py-4">
              <div className="h-16 rounded bg-surface" />
            </li>
          ))}

        {!loading &&
          !error &&
          rows.map((e) => (
            <li key={e.id} className="px-4 py-3.5">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[#1a1a1a]">{e.name}</p>
                  <p className="truncate text-[11px] text-[#00000099]">{e.email}</p>
                  <p className="truncate text-[11px] text-[#00000099]">{e.phone}</p>
                </div>
                <StatusBadge value={e.status} />
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <TypePill value={e.type} />
                <span className="text-[11px] text-[#00000099]">{e.summary}</span>
              </div>
              <p className="mt-1 text-[10px] text-[#00000066]">
                {e.displayId} • Received {timeAgo(e.createdAt)}
              </p>
              <div className="mt-2">
                <Actions e={e} onView={onView} onReply={onReply} onDelete={onDelete} />
              </div>
            </li>
          ))}
      </ul>

      {error && (
        <div className="px-4 py-14 text-center">
          <p className="text-sm text-[#00000099]">Unable to load enquiries. Please try again.</p>
          <button
            onClick={onRetry}
            className="mt-4 rounded-md bg-navy px-5 py-2 text-xs font-medium text-white hover:opacity-90"
          >
            Retry
          </button>
        </div>
      )}

      {empty && <p className="px-4 py-14 text-center text-sm text-[#00000099]">No enquiries found.</p>}

      {!error && <Pagination page={page} total={total} limit={limit} onChange={onPageChange} />}
    </div>
  );
}