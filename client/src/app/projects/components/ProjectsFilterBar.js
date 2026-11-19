"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { Container, SANS } from "@/components/ui/Animations";

const defaultCategories = ["All Projects"];
const defaultLocations = ["All Locations"];
const defaultStatuses = ["All Statuses"];

const selectCls =
  "bg-white px-4 py-3.5 text-[11px] font-medium uppercase tracking-wide text-[#0B1F3A]";

/**
 * @param {{
 *  categories?: string[], locations?: string[], statuses?: string[],
 *  total?: number,
 *  onChange?: (f: { category: string, location: string, status: string }) => void
 * }} props
 */
const ProjectsFilterBar = ({
  categories = defaultCategories,
  locations = defaultLocations,
  statuses = defaultStatuses,
  total = 6,
  onChange,
}) => {
  const initial = {
    category: categories[0],
    location: locations[0],
    status: statuses[0],
  };
  const [f, setF] = useState(initial);

  const update = (patch) => {
    const next = { ...f, ...patch };
    setF(next);
    onChange?.(next);
  };
  const clear = () => {
    setF(initial);
    onChange?.(initial);
  };

  return (
    <div className={`${SANS} w-full min-w-0 bg-[#EEF3FC]`}>
      <Container className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 py-4">
        {/* Category chips */}
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => update({ category: c })}
              className={`px-5 py-3.5 text-[11px] font-medium uppercase tracking-wide transition-colors duration-300 ${
                f.category === c
                  ? "bg-[#0B1F3A] text-white"
                  : "bg-white text-[#0B1F3A]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Selects + clear + count */}
        <div className="flex flex-wrap items-center gap-3">
          <select
            aria-label="Location"
            value={f.location}
            onChange={(e) => update({ location: e.target.value })}
            className={selectCls}
          >
            {locations.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          <select
            aria-label="Status"
            value={f.status}
            onChange={(e) => update({ status: e.target.value })}
            className={selectCls}
          >
            {statuses.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={clear}
            className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-[#0B1F3A]"
          >
            <X size={13} /> Clear
          </button>
          <p className="text-[11px] font-semibold text-[#44474D]">
            Showing {total} Developments
          </p>
        </div>
      </Container>
    </div>
  );
};

export default ProjectsFilterBar;
