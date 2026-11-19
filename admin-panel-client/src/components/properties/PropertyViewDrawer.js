"use client";
import React from "react";
import { MapPin, ExternalLink } from "lucide-react";
import ViewDrawer, { ViewSection, Field, Pill } from "@/components/common/ViewDrawer";
import ImageGallery from "@/components/common/ImageGallery";
import PlaceIcon from "./PlaceIcon";
import { AvailabilityBadge, PublicationBadge } from "./StatusBadges";
import { UNIT_STATUSES } from "@/data/propertyOptions";
import { countByStatus, floorLabel } from "@/utils/inventory";
import { fmtArea, fmtRate } from "@/services/propertyService";

const fmtDate = (d) =>
  d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—";

const hasValue = (v) => v || v === 0;

const placeMeta = (p) =>
  [
    hasValue(p.distanceKm) ? `${p.distanceKm} km` : "",
    hasValue(p.travelMins) ? `${p.travelMins} mins` : "",
  ]
    .filter(Boolean)
    .join(" · ");

export default function PropertyViewDrawer({ property: p, onClose, onEdit }) {
  const images = [
    ...(p.featuredImage ? [{ url: p.featuredImage }] : []),
    ...p.galleryImages.map((g) => ({ url: g.url })),
  ];

  const counts = countByStatus(p.floorUnits);
  const hasCoords = hasValue(p.latitude) && hasValue(p.longitude);

  return (
    <ViewDrawer eyebrow="Property Details" title={p.name} onClose={onClose} onEdit={onEdit}>
      <ImageGallery images={images} alt={p.name} />

      <div className="mt-5">
        <h3 className="font-serif text-xl font-semibold text-[#1a1a1a]">{p.name}</h3>
        {p.tagline && (
          <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-[#00000080]">{p.tagline}</p>
        )}
        <p className="mt-2 flex items-center gap-1 text-xs text-[#00000099]">
          <MapPin size={13} className="shrink-0" /> {p.location}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <AvailabilityBadge value={p.availability} />
          <PublicationBadge value={p.status} />
        </div>
      </div>

      <ViewSection title="Specs & Valuation">
        <div className="grid grid-cols-2 gap-x-4 gap-y-4">
          <Field label="Property Type">{p.type}</Field>
          <Field label="Rate / sq.ft">{hasValue(p.pricePerSqft) ? `₹ ${fmtRate(p.pricePerSqft)}` : null}</Field>
          <Field label="Plot / Land Extent">{hasValue(p.plotArea) ? `${fmtArea(p.plotArea)} sq.ft` : null}</Field>
          <Field label="Built / Carpet Area">
            {hasValue(p.builtUpArea) ? `${fmtArea(p.builtUpArea)} sq.ft` : null}
          </Field>
          {hasValue(p.totalFloors) && <Field label="Total Floors">{p.totalFloors} levels</Field>}
          {p.inventoryPreset && <Field label="Stacking Preset">{p.inventoryPreset}</Field>}
          <Field label="URL Slug">/properties/{p.slug}</Field>
          <Field label="Created">{fmtDate(p.date)}</Field>
        </div>
      </ViewSection>

      {p.floorUnits.length > 0 && (
        <ViewSection title="Floor & Unit Inventory">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
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

          <div className="mt-3 grid max-h-[320px] grid-cols-2 gap-2 overflow-y-auto sm:grid-cols-3">
            {p.floorUnits.map((u) => {
              const s = UNIT_STATUSES.find((x) => x.value === u.status) || UNIT_STATUSES[0];
              return (
                <div key={u.key} className="rounded-md border border-line bg-surface px-2.5 py-2">
                  <p className="text-[11px] font-semibold text-[#1a1a1a]">
                    {floorLabel(u.floor)} · {u.unitName}
                  </p>
                  <p className={`mt-1 flex items-center gap-1 text-[10px] font-medium ${s.text}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
                    {s.label}
                  </p>
                </div>
              );
            })}
          </div>
        </ViewSection>
      )}

      {(hasCoords || p.nearbyPlaces.length > 0) && (
        <ViewSection title="Location & Vicinity">
          {hasCoords && (
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div className="grid grid-cols-2 gap-x-6">
                <Field label="Latitude">{p.latitude}</Field>
                <Field label="Longitude">{p.longitude}</Field>
              </div>
              <a
                href={`https://www.google.com/maps?q=${p.latitude},${p.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-8 items-center gap-1.5 rounded-md border border-line bg-surface px-3 text-[10px] font-semibold uppercase tracking-wider text-navy hover:bg-[#eaf0fb]"
              >
                <ExternalLink size={12} /> Open in Maps
              </a>
            </div>
          )}

          {p.nearbyPlaces.length > 0 && (
            <ul className={`space-y-1.5 ${hasCoords ? "mt-4" : ""}`}>
              {p.nearbyPlaces.map((n) => (
                <li
                  key={n.key}
                  className="flex items-center gap-2.5 rounded-md border border-line bg-surface px-3 py-2"
                >
                  <PlaceIcon category={n.category} size={14} className="shrink-0 text-navy" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium text-[#1a1a1a]">{n.name}</p>
                    <p className="text-[10px] text-[#00000080]">{n.category}</p>
                  </div>
                  {placeMeta(n) && (
                    <span className="shrink-0 text-[10px] font-semibold text-[#00000099]">{placeMeta(n)}</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </ViewSection>
      )}

      {p.description && (
        <ViewSection title="Short Summary">
          <p className="whitespace-pre-line text-[13px] leading-relaxed text-[#333]">{p.description}</p>
        </ViewSection>
      )}

      {p.keyFeatures.length > 0 && (
        <ViewSection title="Key Features">
          <div className="flex flex-wrap gap-1.5">
            {p.keyFeatures.map((f) => (
              <Pill key={f}>{f}</Pill>
            ))}
          </div>
        </ViewSection>
      )}

      {p.highlights && (
        <ViewSection title="Architectural Statement">
          <div
            className="text-[13px] leading-relaxed text-[#333] [&_blockquote]:my-2 [&_blockquote]:border-l-2 [&_blockquote]:border-navy/40 [&_blockquote]:pl-3 [&_blockquote]:italic [&_h2]:my-2 [&_h2]:text-base [&_h2]:font-semibold [&_p]:my-1.5"
            dangerouslySetInnerHTML={{ __html: p.highlights }}
          />
        </ViewSection>
      )}
    </ViewDrawer>
  );
}