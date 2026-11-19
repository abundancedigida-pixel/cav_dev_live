"use client";
/* eslint-disable @next/next/no-img-element */
import React from "react";
import ViewDrawer, { ViewSection, Field, Pill } from "@/components/common/ViewDrawer";
import { PublicationBadge } from "@/components/properties/StatusBadges";
import { BlogBlocks } from "./BlogArticle";
import { fmtDateTime, isScheduled } from "@/services/blogService";

export default function BlogViewDrawer({ blog: b, onClose, onEdit }) {
  const published = b.status === "Published";

  return (
    <ViewDrawer eyebrow="Blog Article" title={b.title} onClose={onClose} onEdit={onEdit}>
      {b.heroImage ? (
        <div className="mt-5 aspect-[16/9] w-full overflow-hidden rounded-lg bg-surface">
          <img src={b.heroImage} alt={b.title} className="h-full w-full object-cover" />
        </div>
      ) : (
        <div className="mt-5 flex aspect-[16/9] w-full items-center justify-center rounded-lg bg-surface text-xs text-[#00000066]">
          No hero image
        </div>
      )}

      <div className="mt-5">
        <h3 className="font-serif text-xl font-semibold text-[#1a1a1a]">{b.title}</h3>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <PublicationBadge value={b.status} />
          {b.isFeatured && <Pill>Featured</Pill>}
          {isScheduled(b) && <Pill>Scheduled</Pill>}
        </div>
        {b.excerpt && <p className="mt-3 text-[13px] italic leading-relaxed text-[#444]">{b.excerpt}</p>}
      </div>

      <ViewSection title="Metadata">
        <div className="grid grid-cols-2 gap-x-4 gap-y-4">
          <Field label="Category">{b.category}</Field>
          <Field label="Author">{b.author}</Field>
          <Field label="URL Slug">/journal/{b.slug}</Field>
          <Field label="Publish Date">{published ? fmtDateTime(b.publishedAt || b.createdAt) : "Unpublished"}</Field>
          <Field label="Created">{fmtDateTime(b.createdAt)}</Field>
          <Field label="Last Updated">{fmtDateTime(b.updatedAt)}</Field>
        </div>
      </ViewSection>

      {b.tags.length > 0 && (
        <ViewSection title="Tags">
          <div className="flex flex-wrap gap-1.5">
            {b.tags.map((t) => (
              <Pill key={t}>#{t}</Pill>
            ))}
          </div>
        </ViewSection>
      )}

      <ViewSection title="Article Content">
        <BlogBlocks blocks={b.blocks} />
      </ViewSection>

      <ViewSection title="Search Indexing & SEO">
        <div className="grid grid-cols-1 gap-y-4">
          <Field label="Meta Title">{b.seoTitle}</Field>
          <Field label="Meta Description">{b.seoDescription}</Field>
        </div>
      </ViewSection>
    </ViewDrawer>
  );
}