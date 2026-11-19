"use client";
import React from "react";
import { ChevronDown } from "lucide-react";
import { toast } from "react-toastify";
import { INVENTORY_PRESETS, UNIT_STATUSES, LIMITS } from "@/data/propertyOptions";
import { generateUnits, floorLabel, countByStatus } from "@/utils/inventory";

const inputCls =
  "h-10 w-full rounded-md border border-line bg-surface px-3 text-xs outline-none focus:border-gold";

const Label = ({ children, required }) => (
  <label className="mb-1.5 mt-3 block text-[10px] font-semibold uppercase tracking-wider text-[#444]">
    {children} {required && <span className="text-red-500">*</span>}
  </label>
);

const statusOf = (value) => UNIT_STATUSES.find((s) => s.value === value) || UNIT_STATUSES[0];

export default function UnitInventory({ floors, preset, units, onFloors, onPreset, onUnits }) {
  const counts = countByStatus(units);
  const topFloor = units.length ? Math.max(...units.map((u) => u.floor)) : 0;
  const outOfSync = units.length > 0 && Number(floors) !== topFloor;

  const generate = () => {
    const total = Number(floors);

    if (!Number.isInteger(total) || total < 1 || total > LIMITS.floors) {
      return toast.error(`Enter total floors between 1 and ${LIMITS.floors}`);
    }
    if (!INVENTORY_PRESETS.some((p) => p.value === preset)) {
      return toast.error("Select an inventory stacking preset");
    }

    const next = generateUnits(total, preset, units);
    if (next.length > LIMITS.units) {
      return toast.error(`Too many units. The maximum is ${LIMITS.units}`);
    }

    onUnits(next);
    toast.success(`${next.length} units generated`);
  };

  const setStatus = (key, status) =>
    onUnits(units.map((u) => (u.key === key ? { ...u, status } : u)));

  return (
    <div className="rounded-lg border border-line bg-white p-3.5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-2.5">
        <h4 className="text-xs font-semibold text-[#1a1a1a]">
          <span className="mr-2 text-[10px] font-bold uppercase tracking-widest text-navy">Section A.1</span>
          Apartment Floor &amp; Unit Inventory
        </h4>
        <span className="rounded-sm bg-[#e6ecf7] px-2 py-1 text-[9px] font-semibold uppercase tracking-wide text-[#3d4a66]">
          Condominium &amp; High-rise
        </span>
      </div>

      <div className="grid grid-cols-1 gap-x-3 sm:grid-cols-2">
        <div>
          <Label required>Total Structure Floors</Label>
          <div className="relative">
            <input
              type="number"
              min="1"
              max={LIMITS.floors}
              step="1"
              value={floors}
              onChange={(e) => onFloors(e.target.value)}
              placeholder="14"
              className={`${inputCls} pr-28`}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-[#00000066]">
              LEVELS (G+{Number(floors) > 0 ? floors : 0})
            </span>
          </div>
        </div>

        <div>
          <Label>Inventory Stacking Preset</Label>
          <div className="relative">
            <select
              value={preset}
              onChange={(e) => onPreset(e.target.value)}
              className={`${inputCls} appearance-none pr-8`}
            >
              <option value="">Select preset</option>
              {INVENTORY_PRESETS.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.value}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#444]">
          Interactive Floor Status Matrix
        </p>
        <div className="flex flex-wrap items-center gap-3">
          {UNIT_STATUSES.map((s) => (
            <span
              key={s.value}
              className="flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wider text-[#00000099]"
            >
              <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
              {s.legend} ({counts[s.value]})
            </span>
          ))}
        </div>
      </div>

      {outOfSync && (
        <p className="mt-2 rounded-md border border-amber-200 bg-amber-50 px-2.5 py-1.5 text-[10px] text-amber-800">
          The floors changed. Generate units again to update the matrix.
        </p>
      )}

      {units.length === 0 ? (
        <p className="mt-3 rounded-md border border-dashed border-line bg-surface px-3 py-6 text-center text-[11px] text-[#00000080]">
          Set the total floors and a preset, then generate the units.
        </p>
      ) : (
        <div className="mt-2.5 grid max-h-[340px] grid-cols-2 gap-2 overflow-y-auto pr-0.5 sm:grid-cols-4">
          {units.map((u) => {
            const s = statusOf(u.status);
            return (
              <div key={u.key} className="rounded-md border border-line bg-surface p-2">
                <div className="flex items-start justify-between gap-1">
                  <p className="text-[10px] font-semibold leading-tight text-[#1a1a1a]">
                    {floorLabel(u.floor)} · {u.unitName}
                  </p>
                  <span className={`mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full ${s.dot}`} />
                </div>
                <select
                  value={u.status}
                  onChange={(e) => setStatus(u.key, e.target.value)}
                  aria-label={`Status of ${floorLabel(u.floor)} ${u.unitName}`}
                  className={`mt-1.5 h-7 w-full rounded border border-line bg-white px-1.5 text-[10px] font-medium outline-none focus:border-gold ${s.text}`}
                >
                  {UNIT_STATUSES.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-3 flex justify-end">
        <button
          type="button"
          onClick={generate}
          className="h-9 rounded-md bg-navy px-4 text-[10px] font-semibold uppercase tracking-wider text-white hover:opacity-90"
        >
          {units.length ? "Regenerate Units" : "Generate Units"}
        </button>
      </div>
    </div>
  );
}