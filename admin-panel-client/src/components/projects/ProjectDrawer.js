"use client";
import React, { useState } from "react";
import { X, Loader2, ChevronDown } from "lucide-react";
import { toast } from "react-toastify";
import ImageSlot from "@/components/common/ImageSlot";
import MultiImageSlot from "@/components/common/MultiImageSlot";
import PdfSlot from "@/components/common/PdfSlot";
import { useUnsavedGuard } from "@/components/common/UnsavedChangesGuard";
import { PROJECT_CATEGORIES, PROJECT_STAGES } from "@/data/projectOptions";
import { createProject, updateProject } from "@/services/projectService";
import { slugify } from "@/utils/slugify";
import { getErrorMessage } from "@/utils/apiError";
import ComboBox from "../common/ComboBox";

const MAX_GALLERY = 10;
const MAX_IMAGE_MB = 5; // backend multer limit

const inputCls =
  "h-10 w-full rounded-md border border-line bg-surface px-3 text-xs outline-none focus:border-gold";

const Section = ({ letter, title, aside, children }) => (
  <section className="mt-7">
    <div className="flex items-center justify-between border-b border-line pb-2">
      <span className="text-[10px] font-bold uppercase tracking-widest text-navy">Section {letter}</span>
      <h3 className="text-[10px] font-semibold uppercase tracking-wider text-[#00000080]">{aside || title}</h3>
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

export default function ProjectDrawer({ project, onClose, onSaved }) {
  const isEdit = !!project;
  const original = project?.galleryImages ?? [];

  const [name, setName] = useState(project?.name ?? "");
  const [category, setCategory] = useState(project?.category ?? "");
  const [location, setLocation] = useState(project?.location ?? "");
  const [stage, setStage] = useState(project?.stage ?? PROJECT_STAGES[0].value);
  const [tagline, setTagline] = useState(project?.tagline ?? "");
  const [featured, setFeatured] = useState(
    project?.featuredImage ? { url: project.featuredImage, name: "Featured image" } : null
  );
  const [gallery, setGallery] = useState(original.map((g) => ({ key: g.id, id: g.id, url: g.url })));
  const [overview, setOverview] = useState(project?.overview ?? "");
  const [highlights, setHighlights] = useState(project?.highlights ?? []);
  const [highlightInput, setHighlightInput] = useState("");
  const [totalAcreage, setTotalAcreage] = useState(project?.totalAcreage ?? "");
  const [targetDelivery, setTargetDelivery] = useState(project?.targetDelivery ?? "");
  const [brochure, setBrochure] = useState(project?.brochure ?? null);
  const [publication, setPublication] = useState(project?.status ?? "Published");

  const [error, setError] = useState("");
  const [busy, setBusy] = useState(null); // null | "draft" | "main"

  const slugPreview = isEdit ? project.slug : slugify(name);

  // existing gallery images the admin kept (public_id)
  const keepGalleryIds = original.filter((o) => gallery.some((g) => g.id === o.id)).map((o) => o.id);
  const removedCount = original.length - keepGalleryIds.length;

  const dirty =
    name !== (project?.name ?? "") ||
    category !== (project?.category ?? "") ||
    location !== (project?.location ?? "") ||
    stage !== (project?.stage ?? PROJECT_STAGES[0].value) ||
    tagline !== (project?.tagline ?? "") ||
    !!featured?.file ||
    gallery.some((g) => g.file) ||
    removedCount > 0 ||
    overview !== (project?.overview ?? "") ||
    highlights.join("|") !== (project?.highlights ?? []).join("|") ||
    highlightInput.trim() !== "" ||
    String(totalAcreage) !== String(project?.totalAcreage ?? "") ||
    targetDelivery !== (project?.targetDelivery ?? "") ||
    !!brochure?.file ||
    publication !== (project?.status ?? "Published");

  const { requestClose, guardDialog } = useUnsavedGuard(dirty, onClose, { escape: true });

  const canSaveDraft = !isEdit || dirty || project.status !== "Draft";
  const canSaveMain = !isEdit || dirty;

  const addHighlight = (value) => {
    const v = value.trim();
    if (!v || highlights.includes(v)) return;
    setHighlights((h) => [...h, v]);
    setHighlightInput("");
  };

  const save = async (button, status) => {
    if (!name.trim()) return setError("Project name is required");
    if (!category.trim()) return setError("Category is required");
    if (!location.trim()) return setError("Location is required");
    if (status === "Published" && !featured) return setError("A masthead image is required to publish");

    setBusy(button);
    setError("");
    try {
      const pending = highlightInput.trim();
      const finalHighlights =
        pending && !highlights.includes(pending) ? [...highlights, pending] : highlights;

      const payload = {
        name: name.trim(),
        category: category.trim(),
        location: location.trim(),
        stage,
        tagline: tagline.trim(),
        overview: overview.trim(),
        highlights: finalHighlights,
        totalAcreage,
        targetDelivery: targetDelivery.trim(),
        status,
        featuredFile: featured?.file ?? null,
        galleryFiles: gallery.filter((g) => g.file).map((g) => g.file),
        keepGalleryIds,
        brochureFile: brochure?.file ?? null,
      };

      if (isEdit) await updateProject(project.id, payload);
      else await createProject(payload);

      toast.success(isEdit ? "Project updated" : status === "Published" ? "Project published" : "Draft saved");
      onSaved();
      onClose(); // direct close, guard not needed after save
    } catch (err) {
      const msg = getErrorMessage(err);
      setError(msg);
      toast.error(msg);
    } finally {
      setBusy(null);
    }
  };

  const published = publication === "Published";
  const mainLabel = published ? "Save & Publish" : isEdit ? "Save Changes" : "Create Draft";

  return (
    <>
      <div onClick={requestClose} className="fixed inset-0 z-[60] bg-black/40" />
      <aside className="fixed right-0 top-0 z-[70] flex h-dvh w-full max-w-[520px] flex-col bg-white shadow-2xl">
        <div className="flex shrink-0 items-start justify-between border-b border-line px-5 py-4">
          <div className="min-w-0">
            <p className="text-[9px] font-semibold uppercase tracking-widest text-[#00000080]">
              Project Asset Editor
            </p>
            <h2 className="truncate font-serif text-lg font-semibold text-[#1a1a1a]">
              {isEdit ? `Edit Project — ${project.name}` : "Add Project"}
            </h2>
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

          <Section letter="A" title="Basic Identity" aside="Basic Identity">
            <Label required>Project Name</Label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. UNIQUE 70"
              className={inputCls}
            />

            <div className="grid grid-cols-1 gap-x-3 sm:grid-cols-2">
              <div>
                <Label>Project Slug (URL URI)</Label>
                <input
                  value={slugPreview || "project-name"}
                  readOnly
                  className={`${inputCls} cursor-not-allowed text-[#00000099]`}
                />
              </div>
              <div>
                <Label required>Category</Label>
             <ComboBox
  value={category}
  onChange={setCategory}
  options={PROJECT_CATEGORIES}
  placeholder="Residential"
  ariaLabel="Category"
  className={inputCls}
/>
              </div>
              <div>
                <Label required>Geographic Location</Label>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Ranipet Corridor, TN"
                  className={inputCls}
                />
              </div>
              <div>
                <Label>Development Stage</Label>
                <div className="relative">
                  <select
                    value={stage}
                    onChange={(e) => setStage(e.target.value)}
                    className={`${inputCls} appearance-none pr-8`}
                  >
                    {PROJECT_STAGES.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>

            <Label>Editorial Tagline</Label>
            <input
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="e.g. India's Founding Elite Homes"
              className={inputCls}
            />
          </Section>

          <Section letter="B" title="Media & Blueprints" aside="Media & Blueprints">
            <Label aside={`PNG, JPG or WEBP up to ${MAX_IMAGE_MB}MB`}>Primary Masthead Image</Label>
            <ImageSlot
              value={featured}
              onChange={setFeatured}
              maxMB={MAX_IMAGE_MB}
              title="Upload masthead image"
              hint={`PNG, JPG or WEBP up to ${MAX_IMAGE_MB}MB`}
              caption="Shown as the primary project hero."
            />

            <Label>Gallery &amp; Technical Assets (up to {MAX_GALLERY})</Label>
            <MultiImageSlot value={gallery} onChange={setGallery} maxCount={MAX_GALLERY} maxMB={MAX_IMAGE_MB} />
          </Section>

          <Section letter="C" title="Narrative & Highlights" aside="Narrative & Highlights">
            <Label>Project Overview &amp; Editorial Dossier</Label>
            <textarea
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              rows={5}
              placeholder="An unprecedented masterplanned residential enclave..."
              className="w-full resize-none rounded-md border border-line bg-surface p-3 text-xs leading-relaxed outline-none focus:border-gold"
            />

            <Label>Key Architectural Highlights</Label>
            <div className="flex flex-wrap gap-1.5 rounded-md border border-line bg-surface p-2">
              {highlights.map((h) => (
                <span
                  key={h}
                  className="flex items-center gap-1 rounded-sm bg-navy/10 px-2.5 py-1 text-[11px] font-medium text-navy"
                >
                  {h}
                  <button
                    type="button"
                    onClick={() => setHighlights((list) => list.filter((x) => x !== h))}
                    aria-label={`Remove ${h}`}
                  >
                    <X size={11} />
                  </button>
                </span>
              ))}
              <input
                value={highlightInput}
                onChange={(e) => setHighlightInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === ",") {
                    e.preventDefault();
                    addHighlight(highlightInput);
                  }
                }}
                placeholder="+ Add tag"
                className="min-w-[110px] flex-1 bg-transparent px-1 py-1 text-xs outline-none"
              />
            </div>
          </Section>

          <Section letter="D" title="Master Plan Specs" aside="Master Plan Specs">
            <div className="grid grid-cols-1 gap-x-3 sm:grid-cols-2">
              <div>
                <Label>Total Acreage</Label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={totalAcreage}
                    onChange={(e) => setTotalAcreage(e.target.value)}
                    placeholder="42"
                    className={`${inputCls} pr-16`}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-[#00000066]">
                    ACRES
                  </span>
                </div>
              </div>
              <div>
                <Label>Target Delivery Milestone</Label>
                <input
                  value={targetDelivery}
                  onChange={(e) => setTargetDelivery(e.target.value)}
                  placeholder="Phase 1 - Q4 2025"
                  className={inputCls}
                />
              </div>
            </div>

            <Label>Downloadable Architectural Brochure (PDF)</Label>
            <PdfSlot
              value={brochure}
              onChange={setBrochure}
              maxMB={MAX_IMAGE_MB}
              title="Upload brochure"
              hint={`PDF up to ${MAX_IMAGE_MB}MB`}
            />
          </Section>

          <Section letter="E" title="Website Publication" aside="Website Publication">
            <div className="flex items-center justify-between gap-3 rounded-lg border border-line bg-surface p-3">
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[#1a1a1a]">Website Publication State</p>
                <p className="mt-0.5 text-[10px] text-[#00000080]">
                  {published ? "Live on the public website" : "Hidden from the public website"}
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={published}
                onClick={() => setPublication(published ? "Draft" : "Published")}
                className="flex shrink-0 items-center gap-2"
              >
                <span
                  className={`relative h-5 w-9 rounded-full transition-colors ${published ? "bg-navy" : "bg-[#00000033]"}`}
                >
                  <span
                    className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${
                      published ? "left-[18px]" : "left-0.5"
                    }`}
                  />
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-navy">
                  {published ? "Published" : "Draft"}
                </span>
              </button>
            </div>
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