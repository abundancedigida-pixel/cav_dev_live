"use client";
import React from "react";
import { X, MapPin, Plus } from "lucide-react";
import { toast } from "react-toastify";
import PlaceIcon from "./PlaceIcon";
import { PLACE_CATEGORIES, LIMITS } from "@/data/propertyOptions";
import ComboBox from "../common/ComboBox";

const inputCls =
  "h-10 w-full rounded-md border border-line bg-white px-3 text-xs outline-none focus:border-gold";

export const EMPTY_PLACE = { category: PLACE_CATEGORIES[0], name: "", distanceKm: "", travelMins: "" };

// Validates the draft row and returns { place } or { error }
export const buildPlace = (draft, existing) => {
  const name = draft.name.trim();
  if (!name) return { error: "Enter the landmark name" };

  const category = draft.category.trim() || "Other";

  const distanceKm = draft.distanceKm === "" ? null : Number(draft.distanceKm);
  if (distanceKm !== null && (!Number.isFinite(distanceKm) || distanceKm < 0)) {
    return { error: "Distance must be a positive number" };
  }

  const travelMins = draft.travelMins === "" ? null : Number(draft.travelMins);
  if (travelMins !== null && (!Number.isInteger(travelMins) || travelMins < 0)) {
    return { error: "Travel time must be whole minutes" };
  }

  if (existing.length >= LIMITS.places) {
    return { error: `You can add up to ${LIMITS.places} landmarks` };
  }

  const duplicate = existing.some(
    (p) => p.name.toLowerCase() === name.toLowerCase() && p.category.toLowerCase() === category.toLowerCase()
  );
  if (duplicate) return { error: "This landmark is already added" };

  return {
    place: {
      key: `p-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      category,
      name,
      distanceKm,
      travelMins,
    },
  };
};

const metaText = (p) =>
  [
    p.distanceKm !== null && p.distanceKm !== undefined ? `${p.distanceKm} km` : "",
    p.travelMins !== null && p.travelMins !== undefined ? `${p.travelMins} mins` : "",
  ]
    .filter(Boolean)
    .join(" · ");

const validCoords = (lat, lng) => {
  if (String(lat).trim() === "" || String(lng).trim() === "") return false;
  const la = Number(lat);
  const lo = Number(lng);
  return Number.isFinite(la) && Number.isFinite(lo) && Math.abs(la) <= 90 && Math.abs(lo) <= 180;
};

const Unit = ({ children }) => (
  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-[#00000066]">
    {children}
  </span>
);

const Label = ({ children }) => (
  <label className="mb-1.5 mt-3.5 block text-[10px] font-semibold uppercase tracking-wider text-[#444]">
    {children}
  </label>
);

export default function GeoSection({
  latitude,
  longitude,
  onLatitude,
  onLongitude,
  places,
  onPlaces,
  draft,
  onDraft,
}) {
  const canPin = validCoords(latitude, longitude);

  const addPlace = () => {
    const result = buildPlace(draft, places);
    if (result.error) return toast.error(result.error);

    onPlaces([...places, result.place]);
    onDraft({ ...EMPTY_PLACE, category: draft.category });
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-x-3 sm:grid-cols-2">
        <div>
          <Label>Latitude</Label>
          <div className="relative">
            <input
              type="number"
              step="any"
              min="-90"
              max="90"
              value={latitude}
              onChange={(e) => onLatitude(e.target.value)}
              placeholder="12.9815"
              className={`${inputCls} pr-14`}
            />
            <Unit>LAT</Unit>
          </div>
        </div>
        <div>
          <Label>Longitude</Label>
          <div className="relative">
            <input
              type="number"
              step="any"
              min="-180"
              max="180"
              value={longitude}
              onChange={(e) => onLongitude(e.target.value)}
              placeholder="80.2180"
              className={`${inputCls} pr-14`}
            />
            <Unit>LNG</Unit>
          </div>
        </div>
      </div>

      <div className="mt-2.5">
        {canPin ? (
          <a
            href={`https://www.google.com/maps?q=${Number(latitude)},${Number(longitude)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center gap-1.5 rounded-md border border-line bg-surface px-3 text-[10px] font-semibold uppercase tracking-wider text-navy hover:bg-[#eaf0fb]"
          >
            <MapPin size={12} /> Pin on map / verify coordinates
          </a>
        ) : (
          <span className="inline-flex h-9 cursor-not-allowed items-center gap-1.5 rounded-md border border-line bg-surface px-3 text-[10px] font-semibold uppercase tracking-wider text-[#00000066]">
            <MapPin size={12} /> Pin on map / verify coordinates
          </span>
        )}
      </div>

      <Label>Nearby Amenities &amp; Key Landmarks</Label>
      <div className="rounded-md border border-line bg-surface p-2.5">
        {places.length > 0 && (
          <div className="mb-2.5 flex flex-wrap gap-1.5">
            {places.map((p) => (
              <span
                key={p.key}
                className="flex items-center gap-1.5 rounded-md border border-line bg-white px-2.5 py-1.5 text-[11px] font-medium text-[#1a1a1a]"
              >
                <PlaceIcon category={p.category} size={12} className="shrink-0 text-navy" />
                {p.name}
                {metaText(p) && (
                  <span className="rounded-sm bg-surface px-1.5 py-0.5 text-[9px] font-semibold text-[#00000099]">
                    {metaText(p)}
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => onPlaces(places.filter((x) => x.key !== p.key))}
                  aria-label={`Remove ${p.name}`}
                  className="text-[#00000066] hover:text-red-500"
                >
                  <X size={11} />
                </button>
              </span>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 gap-2">
         <ComboBox
  value={draft.category}
  onChange={(category) => onDraft({ ...draft, category })}
  options={PLACE_CATEGORIES}
  placeholder="Category"
  ariaLabel="Landmark category"
  className={inputCls}
/>

          <input
            value={draft.name}
            onChange={(e) => onDraft({ ...draft, name: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addPlace();
              }
            }}
            placeholder="Landmark name"
            aria-label="Landmark name"
            className={inputCls}
          />

          <input
            type="number"
            min="0"
            step="any"
            value={draft.distanceKm}
            onChange={(e) => onDraft({ ...draft, distanceKm: e.target.value })}
            placeholder="Distance (km)"
            aria-label="Distance in km"
            className={inputCls}
          />

          <input
            type="number"
            min="0"
            step="1"
            value={draft.travelMins}
            onChange={(e) => onDraft({ ...draft, travelMins: e.target.value })}
            placeholder="Travel time (mins)"
            aria-label="Travel time in minutes"
            className={inputCls}
          />
        </div>

        <button
          type="button"
          onClick={addPlace}
          className="mt-2 flex h-9 w-full items-center justify-center gap-1.5 rounded-md bg-navy text-[10px] font-semibold uppercase tracking-wider text-white hover:opacity-90"
        >
          <Plus size={12} /> Add Place
        </button>
      </div>
    </>
  );
}