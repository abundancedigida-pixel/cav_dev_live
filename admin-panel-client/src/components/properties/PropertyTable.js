"use client";
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Pagination from "@/components/common/Pagination";
import { AvailabilityBadge, PublicationBadge } from "./StatusBadges";
import { fmtArea, fmtRate } from "@/services/propertyService";

const Area = ({ value }) => (
  <div className="leading-tight">
    <span>{fmtArea(value)}</span>
    {value || value === 0 ? <span className="block text-[10px] text-[#00000066]">sq.ft</span> : null}
  </div>
);

const Rate = ({ value }) => (
  <div className="leading-tight">
    <span className="font-semibold text-[#1a1a1a]">{value || value === 0 ? `₹ ${fmtRate(value)}` : "—"}</span>
    {value || value === 0 ? <span className="block text-[10px] text-[#00000066]">/ sq.ft</span> : null}
  </div>
);

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

export default function PropertyTable({
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
        <table className="w-full min-w-[960px] text-left">
          <thead>
            <tr className="bg-[#eaf0fb] text-[10px] font-semibold uppercase tracking-wider text-[#00000099]">
              <th className="px-5 py-3.5">Property</th>
              <th className="px-3 py-3.5">Type</th>
              <th className="px-3 py-3.5">Location</th>
              <th className="px-3 py-3.5">Land Area</th>
              <th className="px-3 py-3.5">Built Area</th>
              <th className="px-3 py-3.5">Rate / sq.ft</th>
              <th className="px-3 py-3.5">Availability</th>
              <th className="px-3 py-3.5">Status</th>
              <th className="px-5 py-3.5 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading &&
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td colSpan={9} className="px-5 py-3">
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
                        {p.tagline && (
                          <p className="truncate text-[9px] font-semibold uppercase tracking-wider text-[#00000066]">
                            {p.tagline}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3.5">{p.type}</td>
                  <td className="max-w-[160px] px-3 py-3.5">{p.location}</td>
                  <td className="px-3 py-3.5">
                    <Area value={p.plotArea} />
                  </td>
                  <td className="px-3 py-3.5">
                    <Area value={p.builtUpArea} />
                  </td>
                  <td className="px-3 py-3.5">
                    <Rate value={p.pricePerSqft} />
                  </td>
                  <td className="px-3 py-3.5">
                    <AvailabilityBadge value={p.availability} />
                  </td>
                  <td className="px-3 py-3.5">
                    <PublicationBadge value={p.status} />
                  </td>
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
                    {p.type} • {p.location}
                  </p>
                  <p className="mt-0.5 text-[11px] font-semibold text-[#1a1a1a]">
                    {p.pricePerSqft || p.pricePerSqft === 0 ? `₹ ${fmtRate(p.pricePerSqft)} / sq.ft` : "—"}
                  </p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-2">
                    <AvailabilityBadge value={p.availability} />
                    <PublicationBadge value={p.status} />
                  </div>
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
          <p className="text-sm text-[#00000099]">Unable to load properties. Please try again.</p>
          <button
            onClick={onRetry}
            className="mt-4 rounded-md bg-navy px-5 py-2 text-xs font-medium text-white hover:opacity-90"
          >
            Retry
          </button>
        </div>
      )}

      {empty && <p className="px-4 py-14 text-center text-sm text-[#00000099]">No properties found.</p>}

      {!error && <Pagination page={page} total={total} limit={limit} onChange={onPageChange} />}
    </div>
  );
}