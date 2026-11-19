import React from "react";
import { PROJECT_STAGES } from "@/data/projectOptions";

export function StageBadge({ value }) {
  const item = PROJECT_STAGES.find((s) => s.value === value) || {
    label: value || "—",
    dot: "bg-gray-400",
  };
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-sm bg-[#e6ecf7] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wide text-[#3d4a66]">
      <span className={`h-1.5 w-1.5 rounded-full ${item.dot}`} />
      {item.label}
    </span>
  );
}

export function CategoryPill({ value }) {
  if (!value) return <span>—</span>;
  return (
    <span className="inline-block rounded-sm bg-[#e6ecf7] px-2 py-1 text-[9px] font-semibold uppercase tracking-wide text-[#3d4a66]">
      {value}
    </span>
  );
}