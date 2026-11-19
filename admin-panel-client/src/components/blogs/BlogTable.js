"use client";
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Eye, Pencil, Trash2, Star } from "lucide-react";
import Pagination from "@/components/common/Pagination";
import { PublicationBadge } from "@/components/properties/StatusBadges";
import { fmtDateTime, timeAgo, isScheduled } from "@/services/blogService";

const CategoryPill = ({ value }) =>
  value ? (
    <span className="inline-block rounded-sm bg-[#e6ecf7] px-2 py-1 text-[9px] font-semibold tracking-wide text-[#3d4a66]">
      {value}
    </span>
  ) : (
    <span>—</span>
  );

const Actions = ({ b, onView, onEdit, onDelete }) => (
  <div className="flex items-center justify-center gap-1">
    <button onClick={() => onView(b)} aria-label="View" className="rounded p-1.5 text-[#444] hover:bg-surface">
      <Eye size={15} />
    </button>
    <button onClick={() => onEdit(b)} aria-label="Edit" className="rounded p-1.5 text-[#444] hover:bg-surface">
      <Pencil size={14} />
    </button>
    <button onClick={() => onDelete(b)} aria-label="Delete" className="rounded p-1.5 text-red-500 hover:bg-red-50">
      <Trash2 size={14} />
    </button>
  </div>
);

const Thumb = ({ src, alt, className }) => (
  <div className={`shrink-0 overflow-hidden rounded-sm bg-surface ${className}`}>
    {src && <img src={src} alt={alt} className="h-full w-full object-cover" />}
  </div>
);

const FeaturedMark = () => (
  <span title="Featured on homepage" className="shrink-0 text-amber-500">
    <Star size={12} fill="currentColor" />
  </span>
);

const PublicationCell = ({ b }) => {
  if (b.status !== "Published") return <span className="italic">Unpublished</span>;
  return (
    <>
      {fmtDateTime(b.publishedAt || b.createdAt)}
      {isScheduled(b) && (
        <span className="mt-0.5 block text-[9px] font-semibold uppercase tracking-wider text-amber-600">
          Scheduled
        </span>
      )}
    </>
  );
};

export default function BlogTable({
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
              <th className="px-5 py-3.5">Article &amp; Synopsis</th>
              <th className="px-3 py-3.5">Classification</th>
              <th className="px-3 py-3.5">Author</th>
              <th className="px-3 py-3.5">Publication</th>
              <th className="px-3 py-3.5">Status</th>
              <th className="px-5 py-3.5 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading &&
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td colSpan={6} className="px-5 py-3">
                    <div className="h-14 rounded bg-surface" />
                  </td>
                </tr>
              ))}

            {!loading &&
              !error &&
              rows.map((b) => (
                <tr key={b.id} className="border-b border-line text-[13px] text-[#333] hover:bg-surface/60">
                  <td className="max-w-[340px] px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <Thumb src={b.heroImage} alt={b.title} className="h-12 w-16" />
                      <div className="min-w-0">
                        <p className="flex items-center gap-1.5">
                          <span className="truncate font-serif text-[15px] font-semibold text-[#1a1a1a]">
                            {b.title}
                          </span>
                          {b.isFeatured && <FeaturedMark />}
                        </p>
                        {b.excerpt && <p className="line-clamp-2 text-[11px] text-[#00000099]">{b.excerpt}</p>}
                        <p className="mt-0.5 text-[9px] text-[#00000066]">Updated {timeAgo(b.updatedAt)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3.5">
                    <CategoryPill value={b.category} />
                  </td>
                  <td className="px-3 py-3.5 text-[13px] font-medium">{b.author}</td>
                  <td className="whitespace-nowrap px-3 py-3.5 text-xs text-[#00000099]">
                    <PublicationCell b={b} />
                  </td>
                  <td className="px-3 py-3.5">
                    <PublicationBadge value={b.status} />
                  </td>
                  <td className="px-5 py-3.5">
                    <Actions b={b} onView={onView} onEdit={onEdit} onDelete={onDelete} />
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
          rows.map((b) => (
            <li key={b.id} className="px-4 py-3.5">
              <div className="flex gap-3">
                <Thumb src={b.heroImage} alt={b.title} className="h-14 w-16" />
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-1.5">
                    <span className="truncate font-serif text-sm font-semibold text-[#1a1a1a]">{b.title}</span>
                    {b.isFeatured && <FeaturedMark />}
                  </p>
                  <p className="truncate text-[11px] text-[#00000099]">
                    {[b.category, b.author].filter(Boolean).join(" • ")}
                  </p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-2">
                    <PublicationBadge value={b.status} />
                    {isScheduled(b) && (
                      <span className="text-[9px] font-semibold uppercase tracking-wider text-amber-600">
                        Scheduled
                      </span>
                    )}
                    <span className="text-[10px] text-[#00000066]">Updated {timeAgo(b.updatedAt)}</span>
                  </div>
                </div>
              </div>
              <div className="mt-2 flex justify-end">
                <Actions b={b} onView={onView} onEdit={onEdit} onDelete={onDelete} />
              </div>
            </li>
          ))}
      </ul>

      {error && (
        <div className="px-4 py-14 text-center">
          <p className="text-sm text-[#00000099]">Unable to load blogs. Please try again.</p>
          <button
            onClick={onRetry}
            className="mt-4 rounded-md bg-navy px-5 py-2 text-xs font-medium text-white hover:opacity-90"
          >
            Retry
          </button>
        </div>
      )}

      {empty && <p className="px-4 py-14 text-center text-sm text-[#00000099]">No blogs found.</p>}

      {!error && <Pagination page={page} total={total} limit={limit} onChange={onPageChange} />}
    </div>
  );
}