import { INVENTORY_PRESETS, UNIT_STATUSES } from "@/data/propertyOptions";

export const unitKey = (floor, unitName) => `${floor}|${unitName}`;

// 14 -> "L14", 9 -> "L09"
export const floorLabel = (floor) => `L${String(floor).padStart(2, "0")}`;

// Builds the unit list from the floors and the preset, top floor first.
// Units that already exist keep their status.
export const generateUnits = (totalFloors, presetValue, existing = []) => {
  const preset = INVENTORY_PRESETS.find((p) => p.value === presetValue);
  if (!preset) return [];

  const statusByKey = new Map(existing.map((u) => [unitKey(u.floor, u.unitName), u.status]));
  const units = [];

  for (let floor = totalFloors; floor >= 1; floor--) {
    for (const unitName of preset.unitsFor(floor, totalFloors)) {
      const key = unitKey(floor, unitName);
      units.push({ key, floor, unitName, status: statusByKey.get(key) || "Available" });
    }
  }

  return units;
};

// -> { Available: n, Reserved: n, "Sold Out": n }
export const countByStatus = (units) => {
  const counts = Object.fromEntries(UNIT_STATUSES.map((s) => [s.value, 0]));
  units.forEach((u) => {
    if (u.status in counts) counts[u.status] += 1;
  });
  return counts;
};