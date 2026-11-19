import React from "react";
import { ENQUIRY_STATUSES } from "@/data/enquiryOptions";

export function StatusBadge({ value }) {
  const item = ENQUIRY_STATUSES.find((s) => s.value === value) || {
    label: value || "—",
    dot: "bg-gray-400",
    cls: "bg-gray-100 text-gray-600",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-sm px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wide ${item.cls}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${item.dot}`} />
      {item.label}
    </span>
  );
}

export function TypePill({ value }) {
  if (!value) return <span>—</span>;
  return (
    <span className="inline-block rounded-sm bg-[#e6ecf7] px-2 py-1 text-[9px] font-semibold uppercase tracking-wide text-[#3d4a66]">
      {value}
    </span>
  );
}