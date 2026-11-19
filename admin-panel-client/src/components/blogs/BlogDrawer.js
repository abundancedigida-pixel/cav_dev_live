"use client";
import React, { useState } from "react";
import { X, Loader2, ChevronDown, Eye } from "lucide-react";
import { toast } from "react-toastify";
import ImageSlot from "@/components/common/ImageSlot";
import BlockEditor from "./BlockEditor";
import BlogArticle from "./BlogArticle";
import { useUnsavedGuard } from "@/components/common/UnsavedChangesGuard";
import { BLOG_CATEGORIES, LIMITS } from "@/data/blogOptions";
import {
  createBlog,
  updateBlog,
  toLocalInput,
  fromLocalInput,
  fmtDateTime,
} from "@/services/blogService";
import { buildContent, newBlock, validateBlocks } from "@/utils/blogBlocks";
import { slugify } from "@/utils/slugify";
import { getErrorMessage } from "@/utils/apiError";
import ComboBox from "../common/ComboBox";

const inputCls =
  "h-10 w-full rounded-md border border-line bg-surface px-3 text-xs outline-none focus:border-gold";
const areaCls =
  "w-full resize-none rounded-md border border-line bg-surface p-3 text-xs leading-relaxed outline-none focus:border-gold";

const Section = ({ number, title, children }) => (
  <section className="mt-7">
    <div className="border-b border-line pb-2">
      <h3 className="text-[10px] font-bold uppercase tracking-widest text-navy">
        {number} / {title}
      </h3>
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

// default author for a new blog = logged-in username
const defaultAuthor = () => {
  if (typeof window === "undefined") return "";
  try {
    const u = JSON.parse(localStorage.getItem("user") || "null");
    const name = u?.username || "";
    return name ? name.charAt(0).toUpperCase() + name.slice(1) : "";
  } catch {
    return "";
  }
};

const fileSig = (f) => (f?.file ? `new:${f.file.name}:${f.file.size}` : f?.url ?? "");

// used to detect unsaved changes
const snapshot = (s) =>
  JSON.stringify({
    title: s.title,
    category: s.category,
    author: s.author,
    excerpt: s.excerpt,
    tags: s.tags,
    status: s.status,
    publishAt: s.publishAt,
    featured: s.featured,
    seoTitle: s.seoTitle,
    seoDescription: s.seoDescription,
    hero: fileSig(s.hero),
    blocks: s.blocks.map(({ key, image, ...rest }) => ({ ...rest, image: fileSig(image) })), // eslint-disable-line no-unused-vars
  });

export default function BlogDrawer({ blog, onClose, onSaved }) {
  const isEdit = !!blog;

  const [initial] = useState(() => ({
    title: blog?.title ?? "",
    category: blog?.category ?? "",
    author: blog?.author ?? defaultAuthor(),
    excerpt: blog?.excerptText ?? "",
    tags: blog?.tags ?? [],
    hero: blog?.heroImage ? { url: blog.heroImage, name: "Hero image" } : null,
    blocks: blog ? blog.blocks : [newBlock("text")],
    status: blog?.status ?? "Published",
    publishAt: toLocalInput(blog?.publishedAt),
    featured: !!blog?.isFeatured,
    seoTitle: blog?.seoTitle ?? "",
    seoDescription: blog?.seoDescription ?? "",
  }));

  const [title, setTitle] = useState(initial.title);
  const [category, setCategory] = useState(initial.category);
  const [author, setAuthor] = useState(initial.author);
  const [excerpt, setExcerpt] = useState(initial.excerpt);
  const [tags, setTags] = useState(initial.tags);
  const [tagInput, setTagInput] = useState("");
  const [hero, setHero] = useState(initial.hero);
  const [blocks, setBlocks] = useState(initial.blocks);
  const [status, setStatus] = useState(initial.status);
  const [publishAt, setPublishAt] = useState(initial.publishAt);
  const [featured, setFeatured] = useState(initial.featured);
  const [seoTitle, setSeoTitle] = useState(initial.seoTitle);
  const [seoDescription, setSeoDescription] = useState(initial.seoDescription);

  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(null); // null | "draft" | "main"

  const slugPreview = isEdit ? blog.slug : slugify(title);

  const current = {
    title,
    category,
    author,
    excerpt,
    tags,
    status,
    publishAt,
    featured,
    seoTitle,
    seoDescription,
    hero,
    blocks,
  };
  const dirty = snapshot(current) !== snapshot(initial) || tagInput.trim() !== "";

  const { requestClose, guardDialog } = useUnsavedGuard(dirty, onClose, { escape: true });

  const canSaveDraft = !isEdit || dirty || blog.status !== "Draft";
  const canSaveMain = !isEdit || dirty;

  const addTag = (value) => {
    const v = value.trim().replace(/^#/, "");
    if (!v || tags.includes(v)) return;
    setTags((t) => [...t, v]);
    setTagInput("");
  };

  const save = async (button, nextStatus) => {
    if (!title.trim()) return setError("Article headline is required");
    if (!category.trim()) return setError("Category is required");
    if (!author.trim()) return setError("Author is required");
    if (nextStatus === "Published" && !excerpt.trim()) return setError("Summary excerpt is required to publish");

    const blockError = validateBlocks(blocks);
    if (blockError) return setError(blockError);

    const { content, imageFiles, imagePositions } = buildContent(blocks);

    if (imageFiles.length > LIMITS.contentImages) {
      return setError(`You can upload up to ${LIMITS.contentImages} new content images at a time`);
    }
    if (nextStatus === "Published" && content.length === 0) {
      return setError("Add some content before publishing");
    }

    setBusy(button);
    setError("");
    try {
      const pending = tagInput.trim().replace(/^#/, "");
      const finalTags = pending && !tags.includes(pending) ? [...tags, pending] : tags;

      const payload = {
        title: title.trim(),
        category: category.trim(),
        author: author.trim(),
        excerpt: excerpt.trim(),
        tags: finalTags,
        status: nextStatus,
        isFeatured: featured,
        publishedAt: fromLocalInput(publishAt),
        seoTitle: seoTitle.trim(),
        seoDescription: seoDescription.trim(),
        content,
        imageFiles,
        imagePositions,
        heroFile: hero?.file ?? null,
      };

      if (isEdit) await updateBlog(blog.id, payload);
      else await createBlog(payload);

      toast.success(isEdit ? "Blog updated" : nextStatus === "Published" ? "Blog published" : "Draft saved");
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

  const mainLabel = status === "Published" ? "Save & Publish" : isEdit ? "Save Changes" : "Create Draft";

  const previewDate = publishAt
    ? fmtDateTime(fromLocalInput(publishAt))
    : status === "Published"
    ? "Publishes on save"
    : "Draft";

  return (
    <>
      <div onClick={requestClose} className="fixed inset-0 z-[60] bg-black/40" />

      {/* Live preview: beside the drawer on large screens, full screen on small screens */}
      {showPreview && (
        <div className="fixed inset-0 z-[80] flex flex-col bg-[#f4f6fb] xl:inset-y-0 xl:left-0 xl:right-[620px] xl:z-[65]">
          <div className="flex shrink-0 items-center justify-between border-b border-line bg-white px-5 py-3">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-widest text-navy">Live Preview</p>
              <p className="text-[11px] text-[#00000099]">Updates as you type. Nothing is saved yet.</p>
            </div>
            <button
              type="button"
              onClick={() => setShowPreview(false)}
              className="rounded-md border border-line px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#444] hover:bg-surface xl:hidden"
            >
              Back to editor
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 sm:p-8">
            <div className="mx-auto max-w-[760px] rounded-xl border border-line bg-white p-5 shadow-sm sm:p-8">
              <BlogArticle
                title={title}
                category={category}
                author={author}
                tags={tags}
                excerpt={excerpt}
                heroUrl={hero?.url || ""}
                blocks={blocks}
                dateText={previewDate}
              />
            </div>
          </div>
        </div>
      )}

      <aside className="fixed right-0 top-0 z-[70] flex h-dvh w-full max-w-[620px] flex-col bg-white shadow-2xl">
        <div className="flex shrink-0 items-start justify-between border-b border-line bg-[#eaf0fb] px-5 py-4">
          <div className="min-w-0">
            <p className="text-[9px] font-semibold uppercase tracking-widest text-navy">Manuscript Console</p>
            <h2 className="truncate font-serif text-lg font-semibold text-[#1a1a1a]">
              {isEdit ? "Edit Blog Article" : "Add Blog Article"}
            </h2>
            <p className="mt-0.5 text-[11px] text-[#00000099]">
              Configure metadata, content blocks, and publication settings.
            </p>
          </div>
          <div className="ml-3 flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={() => setShowPreview((v) => !v)}
              aria-pressed={showPreview}
              className={`flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider ${
                showPreview
                  ? "border-navy bg-navy text-white"
                  : "border-line bg-white text-navy hover:bg-surface"
              }`}
            >
              <Eye size={13} /> Preview
            </button>
            <button
              onClick={requestClose}
              aria-label="Close"
              className="rounded p-1 text-[#00000066] hover:bg-white"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-8">
          {error && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
              {error}
            </div>
          )}

          <Section number="01" title="Essential Metadata">
            <Label required>Article Headline</Label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Designing Homes Around Everyday Life"
              className={inputCls}
            />

            <Label>Permalink URL Slug</Label>
            <input
              value={`/journal/${slugPreview || "article-headline"}`}
              readOnly
              className={`${inputCls} cursor-not-allowed text-[#00000099]`}
            />

            <div className="grid grid-cols-1 gap-x-3 sm:grid-cols-2">
              <div>
                <Label required>Category</Label>
              <ComboBox
  value={category}
  onChange={setCategory}
  options={BLOG_CATEGORIES}
  placeholder="Architecture & Design"
  ariaLabel="Category"
  className={inputCls}
/>
              </div>
              <div>
                <Label required>Author / Contributor</Label>
                <input
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. Ar. S. Edward"
                  className={inputCls}
                />
              </div>
            </div>

            <Label required aside={`${excerpt.length} / ${LIMITS.excerpt}`}>
              Summary Excerpt
            </Label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              maxLength={LIMITS.excerpt}
              rows={3}
              placeholder="A short summary shown in the blog list and at the top of the article..."
              className={areaCls}
            />

            <Label>Keywords &amp; Tags</Label>
            <div className="flex flex-wrap gap-1.5 rounded-md border border-line bg-surface p-2">
              {tags.map((t) => (
                <span
                  key={t}
                  className="flex items-center gap-1 rounded-sm bg-navy/10 px-2.5 py-1 text-[11px] font-medium text-navy"
                >
                  #{t}
                  <button
                    type="button"
                    onClick={() => setTags((list) => list.filter((x) => x !== t))}
                    aria-label={`Remove ${t}`}
                  >
                    <X size={11} />
                  </button>
                </span>
              ))}
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === ",") {
                    e.preventDefault();
                    addTag(tagInput);
                  }
                }}
                placeholder="+ Add tag"
                className="min-w-[110px] flex-1 bg-transparent px-1 py-1 text-xs outline-none"
              />
            </div>
          </Section>

          <Section number="02" title="Hero Feature Visual">
            <Label aside="16:9 aspect recommended">Hero Image</Label>
            <ImageSlot
              value={hero}
              onChange={setHero}
              maxMB={LIMITS.imageMB}
              title="Upload hero image"
              hint={`PNG, JPG or WEBP up to ${LIMITS.imageMB}MB`}
              caption="Shown at the top of the article and in the blog list."
            />
          </Section>

          <Section number="03" title="Article Narrative Content">
            <BlockEditor value={blocks} onChange={setBlocks} />
          </Section>

          <Section number="04" title="Release Controls">
            <div className="grid grid-cols-1 gap-x-3 sm:grid-cols-2">
              <div>
                <Label>Lifecycle Status</Label>
                <div className="relative">
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className={`${inputCls} appearance-none pr-8`}
                  >
                    <option value="Published">Published (Public)</option>
                    <option value="Draft">Draft (Hidden)</option>
                  </select>
                  <ChevronDown
                    size={14}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
                  />
                </div>
              </div>
              <div>
                <Label>Publish Date &amp; Time</Label>
                <input
                  type="datetime-local"
                  value={publishAt}
                  onChange={(e) => setPublishAt(e.target.value)}
                  className={inputCls}
                />
              </div>
            </div>
            <p className="mt-1.5 text-[10px] leading-relaxed text-[#00000080]">
              Leave the date empty to publish immediately when saved.
            </p>

            <label className="mt-4 flex cursor-pointer items-center gap-2.5 text-xs text-[#1a1a1a]">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="h-4 w-4 accent-navy"
              />
              Feature as prominent story on the Insights homepage
            </label>
          </Section>

          <Section number="05" title="Search Indexing & SEO">
            <Label aside={`${seoTitle.length} / ${LIMITS.seoTitle}`}>Meta Title</Label>
            <input
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              maxLength={LIMITS.seoTitle}
              placeholder={title || "Meta title shown in search results"}
              className={inputCls}
            />

            <Label aside={`${seoDescription.length} / ${LIMITS.seoDescription}`}>Meta Description</Label>
            <textarea
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value)}
              maxLength={LIMITS.seoDescription}
              rows={3}
              placeholder="Short description shown in search results..."
              className={areaCls}
            />
          </Section>
        </div>

        <div className="flex shrink-0 items-center gap-3 border-t border-line bg-white px-5 py-4">
          <button
            onClick={requestClose}
            disabled={!!busy}
            className="h-11 px-2 text-[11px] font-semibold uppercase tracking-wider text-[#444] hover:underline disabled:opacity-50"
          >
            Discard
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
            onClick={() => save("main", status)}
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