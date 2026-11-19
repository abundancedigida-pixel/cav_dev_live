"use client";
import React, { useEffect, useState } from "react";
import { Search, ChevronDown, RotateCcw } from "lucide-react";
import { PROPERTY_TYPES, AVAILABILITY_OPTIONS } from "@/data/propertyOptions";

const Select = ({ value, onChange, children }) => (
  <div className="relative min-w-[140px] flex-1 sm:flex-none">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-10 w-full appearance-none rounded-md border border-line bg-surface pl-3 pr-7 text-xs text-[#444] outline-none focus:border-gold"
    >
      {children}
    </select>
    <ChevronDown size={13} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2" />
  </div>
);

export default function PropertyFilters({ filters, onSearch, onFilter, onReset }) {
  const [q, setQ] = useState(filters.search);

  // search 400ms after typing stops
  useEffect(() => {
    const t = setTimeout(() => {
      if (q !== filters.search) onSearch(q);
    }, 400);
    return () => clearTimeout(t);
  }, [q, filters.search, onSearch]);

  const isFiltered =
    q.trim() !== "" ||
    filters.propertyType !== "all" ||
    filters.availability !== "all" ||
    filters.status !== "all";

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border border-line bg-white p-3">
      <div className="flex h-10 w-full items-center gap-2 rounded-md border border-line bg-surface px-3 sm:min-w-[260px] sm:flex-1">
        <Search size={14} className="shrink-0 text-[#00000066]" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by property name or location..."
          className="min-w-0 flex-1 bg-transparent text-xs outline-none"
        />
      </div>

      <Select value={filters.propertyType} onChange={(v) => onFilter({ propertyType: v })}>
        <option value="all">All Types</option>
        {PROPERTY_TYPES.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </Select>

      <Select value={filters.availability} onChange={(v) => onFilter({ availability: v })}>
        <option value="all">All Availability</option>
        {AVAILABILITY_OPTIONS.map((a) => (
          <option key={a.value} value={a.value}>
            {a.label}
          </option>
        ))}
      </Select>

      <Select value={filters.status} onChange={(v) => onFilter({ status: v })}>
        <option value="all">All Statuses</option>
        <option value="Published">Published</option>
        <option value="Draft">Draft</option>
      </Select>

      <button
        onClick={onReset}
        disabled={!isFiltered}
        className="flex h-10 items-center gap-1.5 rounded-md px-3 text-[11px] font-semibold uppercase tracking-wider text-[#444] hover:bg-surface disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
      >
        <RotateCcw size={12} /> Reset
      </button>
    </div>
  );
}