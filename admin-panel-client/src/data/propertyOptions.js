// propertyType is free text in the backend. These are only suggestions.
export const PROPERTY_TYPES = ["Villa", "Independent Home", "Apartment", "Duplex", "Penthouse", "Plot"];

// The unit inventory (Section A.1) is only shown for this type
export const isApartmentType = (type = "") => type.trim().toLowerCase() === "apartment";

// Backend enum: developmentStatus
export const AVAILABILITY_OPTIONS = [
  { value: "Constructing", label: "Under Construction" },
  { value: "Constructed", label: "Constructed" },
  { value: "Ready to Move", label: "Ready to Move" },
];

// Backend enum: floorUnits[].status
export const UNIT_STATUSES = [
  { value: "Available", label: "Available", legend: "Available", dot: "bg-blue-500", text: "text-blue-600" },
  { value: "Reserved", label: "Reserved", legend: "Reserved", dot: "bg-amber-500", text: "text-amber-600" },
  { value: "Sold Out", label: "Sold Out", legend: "Sold", dot: "bg-gray-400", text: "text-[#00000099]" },
];

// How units are created for each floor. unitsFor returns the unit names of one floor.
export const INVENTORY_PRESETS = [
  { value: "One Unit per Floor", unitsFor: () => ["Residence"] },
  {
    value: "Penthouse on Top Floor",
    unitsFor: (floor, total) => [floor === total ? "Penthouse" : "Residence"],
  },
  { value: "Two Units per Floor", unitsFor: () => ["Unit A", "Unit B"] },
  { value: "Four Units per Floor", unitsFor: () => ["Unit A", "Unit B", "Unit C", "Unit D"] },
];

// Suggestions only, the category is free text in the backend
export const PLACE_CATEGORIES = [
  "Transit / Metro",
  "Healthcare",
  "Education",
  "Retail / Mall",
  "Airport",
  "Lifestyle",
];

// Must match the backend limits
export const LIMITS = {
  gallery: 10,
  imageMB: 5,
  floors: 100,
  units: 400,
  places: 20,
};