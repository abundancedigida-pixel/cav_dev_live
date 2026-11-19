"use client";
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Eye, Pencil, Trash2, MapPin } from "lucide-react";
import Pagination from "@/components/common/Pagination";
import { PublicationBadge } from "@/components/properties/StatusBadges";
import { StageBadge, CategoryPill } from "./ProjectBadges";
import { fmtDate } from "@/services/projectService";

const Actions = ({ p, onView, onEdit, onDelete }) => (
  <div className="flex items-center justify-center gap-1">
    <button onClick={() => onView(p)} aria-label="Preview" className="rounded p-1.5 text-[#444] hover:bg-surface">
      <Eye size={15} />
    </button>
    <button onClick={() => onEdit(p)} aria-label="Edit" className="rounded p-1.5 text-[#444] hover:bg-surface">
      <Pencil size={14} />
    </button>
    <button onClick={() => onDelete(p)} aria-label="Delete" className="rounded p-1.5 text-red-500 hover:bg-red-50">
      <Trash2 size={14} />
    </button>
  </div>
);

export default function ProjectTable({
  rows,
  loading,
  error,
  onRetry,
  page,
  total,
  limit,
  onPageChange,
  onView,
  onEdit,
  onDelete,
}) {
  const empty = !loading && !error && rows.length === 0;

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-white">
      {/* Desktop table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[900px] text-left">
          <thead>
            <tr className="bg-[#eaf0fb] text-[10px] font-semibold uppercase tracking-wider text-[#00000099]">
              <th className="px-5 py-3.5">Project &amp; Identity</th>
              <th className="px-3 py-3.5">Category</th>
              <th className="px-3 py-3.5">Location</th>
              <th className="px-3 py-3.5">Development</th>
              <th className="px-3 py-3.5">Publication</th>
              <th className="px-3 py-3.5">Last Updated</th>
              <th className="px-5 py-3.5 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading &&
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td colSpan={7} className="px-5 py-3">
                    <div className="h-12 rounded bg-surface" />
                  </td>
                </tr>
              ))}

            {!loading &&
              !error &&
              rows.map((p) => (
                <tr key={p.id} className="border-b border-line text-[13px] text-[#333] hover:bg-surface/60">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-14 shrink-0 overflow-hidden rounded-sm bg-surface">
                        {p.featuredImage && (
                          <img src={p.featuredImage} alt={p.name} className="h-full w-full object-cover" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-serif text-[15px] font-semibold text-[#1a1a1a]">{p.name}</p>
                        {p.tagline && <p className="truncate text-[11px] text-[#00000099]">{p.tagline}</p>}
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3.5">
                    <CategoryPill value={p.category} />
                  </td>
                  <td className="max-w-[180px] px-3 py-3.5">
                    <span className="flex items-center gap-1">
                      <MapPin size={12} className="shrink-0 text-[#00000066]" />
                      <span className="truncate">{p.location}</span>
                    </span>
                  </td>
                  <td className="px-3 py-3.5">
                    <StageBadge value={p.stage} />
                  </td>
                  <td className="px-3 py-3.5">
                    <PublicationBadge value={p.status} />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3.5 text-xs text-[#00000099]">{fmtDate(p.updatedAt)}</td>
                  <td className="px-5 py-3.5">
                    <Actions p={p} onView={onView} onEdit={onEdit} onDelete={onDelete} />
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
          rows.map((p) => (
            <li key={p.id} className="px-4 py-3.5">
              <div className="flex gap-3">
                <div className="h-14 w-16 shrink-0 overflow-hidden rounded-sm bg-surface">
                  {p.featuredImage && <img src={p.featuredImage} alt={p.name} className="h-full w-full object-cover" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-serif text-sm font-semibold text-[#1a1a1a]">{p.name}</p>
                  <p className="truncate text-[11px] text-[#00000099]">
                    {[p.category, p.location].filter(Boolean).join(" • ")}
                  </p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-2">
                    <StageBadge value={p.stage} />
                    <PublicationBadge value={p.status} />
                  </div>
                  <p className="mt-1 text-[10px] text-[#00000066]">Updated {fmtDate(p.updatedAt)}</p>
                </div>
              </div>
              <div className="mt-2 flex justify-end">
                <Actions p={p} onView={onView} onEdit={onEdit} onDelete={onDelete} />
              </div>
            </li>
          ))}
      </ul>

      {error && (
        <div className="px-4 py-14 text-center">
          <p className="text-sm text-[#00000099]">Unable to load projects. Please try again.</p>
          <button
            onClick={onRetry}
            className="mt-4 rounded-md bg-navy px-5 py-2 text-xs font-medium text-white hover:opacity-90"
          >
            Retry
          </button>
        </div>
      )}

      {empty && <p className="px-4 py-14 text-center text-sm text-[#00000099]">No projects found.</p>}

      {!error && <Pagination page={page} total={total} limit={limit} onChange={onPageChange} />}
    </div>
  );
}