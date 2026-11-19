import React from "react";

const AVAILABILITY = {
  "Ready to Move": { label: "Ready to Move", dot: "bg-blue-500" },
  Constructing: { label: "Under Construction", dot: "bg-amber-500" },
  Constructed: { label: "Constructed", dot: "bg-emerald-500" },
};

export function AvailabilityBadge({ value }) {
  const item = AVAILABILITY[value] || { label: value || "—", dot: "bg-gray-400" };
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-sm bg-[#e6ecf7] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wide text-[#3d4a66]">
      <span className={`h-1.5 w-1.5 rounded-full ${item.dot}`} />
      {item.label}
    </span>
  );
}

export function PublicationBadge({ value }) {
  const published = value === "Published";
  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-wide">
      <span className={`h-1.5 w-1.5 rounded-full ${published ? "bg-blue-500" : "bg-amber-500"}`} />
      <span className={published ? "text-blue-600" : "text-amber-600"}>
        {(value || "Draft").toUpperCase()}
      </span>
    </span>
  );
}