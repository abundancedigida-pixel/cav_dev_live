"use client";
import React, { useState } from "react";
import { X, Loader2, ChevronDown } from "lucide-react";
import { toast } from "react-toastify";
import ImageSlot from "@/components/common/ImageSlot";
import MultiImageSlot from "@/components/common/MultiImageSlot";
import RichTextEditor from "@/components/common/RichTextEditor";
import { useUnsavedGuard } from "@/components/common/UnsavedChangesGuard";
import UnitInventory from "./UnitInventory";
import GeoSection, { EMPTY_PLACE, buildPlace } from "./GeoSection";
import ComboBox from "@/components/common/ComboBox";
import {
  PROPERTY_TYPES,
  AVAILABILITY_OPTIONS,
  INVENTORY_PRESETS,
  LIMITS,
  isApartmentType,
} from "@/data/propertyOptions";
import { createProperty, updateProperty } from "@/services/propertyService";
import { slugify } from "@/utils/slugify";
import { getErrorMessage } from "@/utils/apiError";

const inputCls =
  "h-10 w-full rounded-md border border-line bg-surface px-3 text-xs outline-none focus:border-gold";

const Section = ({ letter, title, children }) => (
  <section className="mt-7">
    <div className="flex items-center justify-between border-b border-line pb-2">
      <span className="text-[10px] font-bold uppercase tracking-widest text-navy">Section {letter}</span>
      <h3 className="font-serif text-sm font-semibold text-[#1a1a1a]">{title}</h3>
    </div>
    <div className="mt-3">{children}</div>
  </section>
);

const Label = ({ children, required, aside }) => (
  <div className="mb-1.5 mt-3.5 flex items-center justify-between gap-2">
    <label className="text-[10px] font-semibold uppercase tracking-wider text-[#444]">
      {children} {required && <span className="text-red-500">*</span>}
    </label>
    {aside && <span className="text-[10px] text-[#00000080]">{aside}</span>}
  </div>
);

const Unit = ({ children }) => (
  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-[#00000066]">
    {children}
  </span>
);

// used to detect unsaved changes
const unitsSig = (list) => list.map((u) => `${u.floor}|${u.unitName}|${u.status}`).join(",");
const placesSig = (list) =>
  list.map((p) => `${p.category}|${p.name}|${p.distanceKm ?? ""}|${p.travelMins ?? ""}`).join(",");

export default function PropertyDrawer({ property, onClose, onSaved }) {
  const isEdit = !!property;
  const original = property?.galleryImages ?? [];
  const initialPreset = property ? property.inventoryPreset : INVENTORY_PRESETS[0].value;

  const [name, setName] = useState(property?.name ?? "");
  const [tagline, setTagline] = useState(property?.tagline ?? "");
  const [type, setType] = useState(property?.type ?? "");
  const [location, setLocation] = useState(property?.location ?? "");
  const [description, setDescription] = useState(property?.description ?? "");

  // Section A.1 (Apartment only)
  const [floors, setFloors] = useState(property?.totalFloors ?? "");
  const [preset, setPreset] = useState(initialPreset);
  const [units, setUnits] = useState(property?.floorUnits ?? []);

  const [featured, setFeatured] = useState(
    property?.featuredImage ? { url: property.featuredImage, name: "Featured image" } : null
  );
  const [gallery, setGallery] = useState(original.map((g) => ({ key: g.id, id: g.id, url: g.url })));
  const [plotArea, setPlotArea] = useState(property?.plotArea ?? "");
  const [builtUpArea, setBuiltUpArea] = useState(property?.builtUpArea ?? "");
  const [pricePerSqft, setPricePerSqft] = useState(property?.pricePerSqft ?? "");

  // Section C.1
  const [latitude, setLatitude] = useState(property?.latitude ?? "");
  const [longitude, setLongitude] = useState(property?.longitude ?? "");
  const [places, setPlaces] = useState(property?.nearbyPlaces ?? []);
  const [placeDraft, setPlaceDraft] = useState(EMPTY_PLACE);

  const [availability, setAvailability] = useState(property?.availability ?? "Constructing");
  const [publication, setPublication] = useState(property?.status ?? "Published");
  const [keyFeatures, setKeyFeatures] = useState(property?.keyFeatures ?? []);
  const [featureInput, setFeatureInput] = useState("");
  const [highlights, setHighlights] = useState(property?.highlights ?? "");

  const [error, setError] = useState("");
  const [busy, setBusy] = useState(null); // null | "draft" | "main"

  const isApartment = isApartmentType(type);
  const slugPreview = isEdit ? property.slug : slugify(name);

  // existing gallery images that the user removed
  const removeGalleryImageIds = original
    .filter((o) => !gallery.some((g) => g.id === o.id))
    .map((o) => o.id);

  const inventoryDirty =
    isApartment &&
    (String(floors) !== String(property?.totalFloors ?? "") ||
      preset !== initialPreset ||
      unitsSig(units) !== unitsSig(property?.floorUnits ?? []));

  const geoDirty =
    String(latitude) !== String(property?.latitude ?? "") ||
    String(longitude) !== String(property?.longitude ?? "") ||
    placesSig(places) !== placesSig(property?.nearbyPlaces ?? []) ||
    placeDraft.name.trim() !== "";

  // unsaved changes (compared directly with the original values)
  const dirty =
    name !== (property?.name ?? "") ||
    tagline !== (property?.tagline ?? "") ||
    type !== (property?.type ?? "") ||
    location !== (property?.location ?? "") ||
    description !== (property?.description ?? "") ||
    inventoryDirty ||
    geoDirty ||
    !!featured?.file ||
    gallery.some((g) => g.file) ||
    removeGalleryImageIds.length > 0 ||
    String(plotArea) !== String(property?.plotArea ?? "") ||
    String(builtUpArea) !== String(property?.builtUpArea ?? "") ||
    String(pricePerSqft) !== String(property?.pricePerSqft ?? "") ||
    availability !== (property?.availability ?? "Constructing") ||
    publication !== (property?.status ?? "Published") ||
    keyFeatures.join("|") !== (property?.keyFeatures ?? []).join("|") ||
    featureInput.trim() !== "" ||
    highlights !== (property?.highlights ?? "");

  const { requestClose, guardDialog } = useUnsavedGuard(dirty, onClose, { escape: true });

  // in edit mode a button is active only when something changed or the status would change
  const canSaveDraft = !isEdit || dirty || property.status !== "Draft";
  const canSaveMain = !isEdit || dirty;

  const addFeature = (value) => {
    const v = value.trim();
    if (!v || keyFeatures.includes(v)) return;
    setKeyFeatures((f) => [...f, v]);
    setFeatureInput("");
  };

  const save = async (button, status) => {
    if (!name.trim()) return setError("Property name is required");
    if (!type.trim()) return setError("Property type is required");
    if (!location.trim()) return setError("Location is required");
    if (String(pricePerSqft).trim() === "") return setError("Price per sq.ft is required");
    if (status === "Published" && !featured) return setError("A featured image is required to publish");

    // Section A.1
    if (isApartment) {
      const total = Number(floors);
      if (String(floors).trim() === "" || !Number.isInteger(total) || total < 1 || total > LIMITS.floors) {
        return setError(`Total floors must be a whole number between 1 and ${LIMITS.floors}`);
      }
      if (units.some((u) => u.floor > total)) {
        return setError("Some units are above the total floors. Generate the units again");
      }
    }

    // Section C.1
    const latFilled = String(latitude).trim() !== "";
    const lngFilled = String(longitude).trim() !== "";
    if (latFilled !== lngFilled) return setError("Enter both latitude and longitude");
    if (latFilled) {
      const la = Number(latitude);
      const lo = Number(longitude);
      if (!Number.isFinite(la) || la < -90 || la > 90) return setError("Latitude must be between -90 and 90");
      if (!Number.isFinite(lo) || lo < -180 || lo > 180) {
        return setError("Longitude must be between -180 and 180");
      }
    }

    // a landmark that was typed but not added yet is included automatically
    let finalPlaces = places;
    if (placeDraft.name.trim()) {
      const result = buildPlace(placeDraft, places);
      if (result.error) return setError(result.error);
      finalPlaces = [...places, result.place];
    }

    setBusy(button);
    setError("");
    try {
      const pendingFeature = featureInput.trim();
      const finalFeatures =
        pendingFeature && !keyFeatures.includes(pendingFeature)
          ? [...keyFeatures, pendingFeature]
          : keyFeatures;

      const payload = {
        name: name.trim(),
        type: type.trim(),
        location: location.trim(),
        tagline: tagline.trim(),
        description: description.trim(),
        totalFloors: isApartment ? floors : "",
        inventoryPreset: isApartment ? preset : "",
        floorUnits: isApartment
          ? units.map(({ floor, unitName, status: unitStatus }) => ({ floor, unitName, status: unitStatus }))
          : [],
        plotArea,
        builtUpArea,
        pricePerSqft,
        latitude,
        longitude,
        nearbyPlaces: finalPlaces.map(({ category, name: placeName, distanceKm, travelMins }) => ({
          category,
          name: placeName,
          distanceKm,
          travelMins,
        })),
        availability,
        status,
        keyFeatures: finalFeatures,
        highlights,
        featuredFile: featured?.file ?? null,
        galleryFiles: gallery.filter((g) => g.file).map((g) => g.file),
        removeGalleryImageIds,
      };

      if (isEdit) await updateProperty(property.id, payload);
      else await createProperty(payload);

      toast.success(
        isEdit ? "Property updated" : status === "Published" ? "Property published" : "Draft saved"
      );
      onSaved();
      onClose(); // direct close, the guard is not needed after a save
    } catch (err) {
      const msg = getErrorMessage(err);
      setError(msg);
      toast.error(msg);
    } finally {
      setBusy(null);
    }
  };

  const mainLabel =
    publication === "Published"
      ? isEdit
        ? "Update & Publish"
        : "Publish Property"
      : isEdit
      ? "Save Changes"
      : "Create Draft";

  return (
    <>
      <div onClick={requestClose} className="fixed inset-0 z-[60] bg-black/40" />
      <aside className="fixed right-0 top-0 z-[70] flex h-dvh w-full max-w-[520px] flex-col bg-white shadow-2xl">
        <div className="flex shrink-0 items-start justify-between border-b border-line px-5 py-4">
          <div className="min-w-0">
            <h2 className="font-serif text-lg font-semibold text-[#1a1a1a]">
              {isEdit ? "Edit Property" : "Add Property"}
            </h2>
            <p className="mt-0.5 text-[11px] text-[#00000099]">Enter details for the public estate directory</p>
          </div>
          <button
            onClick={requestClose}
            aria-label="Close"
            className="ml-3 shrink-0 rounded p-1 text-[#00000066] hover:bg-surface"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-8">
          {error && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
              {error}
            </div>
          )}

          <Section letter="A" title="Basic Information">
            <Label required>Property Name</Label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Serene Courtyard Villa"
              className={inputCls}
            />

            <Label>Tagline</Label>
            <input
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="e.g. Private Luxury Residence"
              className={inputCls}
            />

            <div className="grid grid-cols-1 gap-x-3 sm:grid-cols-2">
              <div>
                <Label required>Property Type</Label>
                {/* <input
                  list="property-types"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  placeholder="Villa"
                  className={inputCls}
                />
                <datalist id="property-types">
                  {PROPERTY_TYPES.map((t) => (
                    <option key={t} value={t} />
                  ))}
                </datalist> */}
                <ComboBox
  value={type}
  onChange={setType}
  options={PROPERTY_TYPES}
  placeholder="Villa"
  ariaLabel="Property type"
  className={inputCls}
/>
              </div>
              <div>
                <Label required>Location Context</Label>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. East Coast Road, Chennai"
                  className={inputCls}
                />
              </div>
            </div>

            <Label>Property URL Slug</Label>
            <input
              value={`/properties/${slugPreview || "property-name"}`}
              readOnly
              className={`${inputCls} cursor-not-allowed text-[#00000099]`}
            />

            <Label>Curated Short Summary</Label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="A monolithic bespoke courtyard villa celebrating vernacular materials and tectonic clarity..."
              className="w-full resize-none rounded-md border border-line bg-surface p-3 text-xs outline-none focus:border-gold"
            />

            {isApartment && (
              <div className="mt-5">
                <UnitInventory
                  floors={floors}
                  preset={preset}
                  units={units}
                  onFloors={setFloors}
                  onPreset={setPreset}
                  onUnits={setUnits}
                />
              </div>
            )}
          </Section>

          <Section letter="B" title="Architectural Imagery">
            <Label aside="Aspect 16:9 or 4:3 (1600×1050px recommended)">Featured Cover Elevation</Label>
            <ImageSlot
              value={featured}
              onChange={setFeatured}
              maxMB={LIMITS.imageMB}
              title="Upload featured image"
              hint={`PNG, JPG or WEBP up to ${LIMITS.imageMB}MB`}
              caption="Shown in primary portfolio hero positions."
            />

            <Label>Gallery Plates (up to {LIMITS.gallery})</Label>
            <MultiImageSlot
              value={gallery}
              onChange={setGallery}
              maxCount={LIMITS.gallery}
              maxMB={LIMITS.imageMB}
            />
          </Section>

          <Section letter="C" title="Spatial Specs & Valuation">
            <div className="grid grid-cols-1 gap-x-3 sm:grid-cols-2">
              <div>
                <Label>Plot / Land Extent</Label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    value={plotArea}
                    onChange={(e) => setPlotArea(e.target.value)}
                    placeholder="4200"
                    className={`${inputCls} pr-14`}
                  />
                  <Unit>SQ.FT</Unit>
                </div>
              </div>
              <div>
                <Label>Built / Carpet Area</Label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    value={builtUpArea}
                    onChange={(e) => setBuiltUpArea(e.target.value)}
                    placeholder="3650"
                    className={`${inputCls} pr-14`}
                  />
                  <Unit>SQ.FT</Unit>
                </div>
              </div>
            </div>

            <Label required>Price per sq.ft (INR)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#00000066]">₹</span>
              <input
                type="number"
                min="0"
                value={pricePerSqft}
                onChange={(e) => setPricePerSqft(e.target.value)}
                placeholder="9200"
                className={`${inputCls} pl-7 pr-16`}
              />
              <Unit>/SQ.FT</Unit>
            </div>
            <p className="mt-1.5 text-[10px] leading-relaxed text-[#00000080]">
              Displayed on the public website catalog as the verified base rate per sq.ft. Total cost is calculated
              dynamically during private consultation.
            </p>
          </Section>

          <Section letter="C.1" title="Geospatial Coordinates & Vicinity Landmarks">
            <GeoSection
              latitude={latitude}
              longitude={longitude}
              onLatitude={setLatitude}
              onLongitude={setLongitude}
              places={places}
              onPlaces={setPlaces}
              draft={placeDraft}
              onDraft={setPlaceDraft}
            />
          </Section>

          <Section letter="D" title="Availability & Lifecycle">
            <Label>Development Status</Label>
            <div className="relative">
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className={`${inputCls} appearance-none pr-8`}
              >
                {AVAILABILITY_OPTIONS.map((a) => (
                  <option key={a.value} value={a.value}>
                    {a.label}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
            </div>

            <Label>Publication Channel</Label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: "Published", title: "Published", hint: "Live on estate catalog" },
                { value: "Draft", title: "Draft Archive", hint: "Hidden from clients" },
              ].map((o) => {
                const on = publication === o.value;
                return (
                  <button
                    key={o.value}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => setPublication(o.value)}
                    className={`flex items-start gap-2.5 rounded-lg border p-3 text-left transition-colors ${
                      on ? "border-navy bg-navy/5" : "border-line bg-white hover:bg-surface"
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                        on ? "border-navy" : "border-[#00000044]"
                      }`}
                    >
                      {on && <span className="h-2 w-2 rounded-full bg-navy" />}
                    </span>
                    <span>
                      <span className="block text-xs font-semibold text-[#1a1a1a]">{o.title}</span>
                      <span className="mt-0.5 block text-[10px] text-[#00000080]">{o.hint}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </Section>

          <Section letter="E" title="Bespoke Architectural Highlights">
            <Label>Key Features (pill tags)</Label>
            <div className="flex flex-wrap gap-1.5 rounded-md border border-line bg-surface p-2">
              {keyFeatures.map((f) => (
                <span
                  key={f}
                  className="flex items-center gap-1 rounded-full bg-navy/10 px-2.5 py-1 text-[11px] font-medium text-navy"
                >
                  {f}
                  <button
                    type="button"
                    onClick={() => setKeyFeatures((list) => list.filter((x) => x !== f))}
                    aria-label={`Remove ${f}`}
                  >
                    <X size={11} />
                  </button>
                </span>
              ))}
              <input
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === ",") {
                    e.preventDefault();
                    addFeature(featureInput);
                  }
                }}
                placeholder="+ Add amenity"
                className="min-w-[110px] flex-1 bg-transparent px-1 py-1 text-xs outline-none"
              />
            </div>

            <Label>Editorial Architectural Statement</Label>
            <RichTextEditor
              initialHtml={highlights}
              onChange={setHighlights}
              placeholder="Crafted with monumental local stone and expansive veranda cantilevers..."
            />
          </Section>
        </div>

        <div className="flex shrink-0 items-center gap-3 border-t border-line bg-white px-5 py-4">
          <button
            onClick={requestClose}
            disabled={!!busy}
            className="h-11 px-2 text-[11px] font-semibold uppercase tracking-wider text-[#444] hover:underline disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={() => save("draft", "Draft")}
            disabled={!!busy || !canSaveDraft}
            className="flex h-11 flex-1 items-center justify-center gap-2 rounded-md border border-line bg-surface text-[11px] font-semibold uppercase tracking-wider text-[#222] hover:bg-[#eaf0fb] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {busy === "draft" && <Loader2 size={14} className="animate-spin" />}
            Save Draft
          </button>
          <button
            onClick={() => save("main", publication)}
            disabled={!!busy || !canSaveMain}
            className="flex h-11 flex-[1.4] items-center justify-center gap-2 rounded-md bg-navy text-[11px] font-semibold uppercase tracking-wider text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {busy === "main" && <Loader2 size={14} className="animate-spin" />}
            {mainLabel}
          </button>
        </div>
      </aside>

      {guardDialog}
    </>
  );
}