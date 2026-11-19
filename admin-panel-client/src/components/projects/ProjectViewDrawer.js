"use client";
import React from "react";
import { MapPin, FileText, ExternalLink } from "lucide-react";
import ViewDrawer, { ViewSection, Field, Pill } from "@/components/common/ViewDrawer";
import ImageGallery from "@/components/common/ImageGallery";
import { PublicationBadge } from "@/components/properties/StatusBadges";
import { StageBadge, CategoryPill } from "./ProjectBadges";
import { fmtAcreage, fmtDate } from "@/services/projectService";

export default function ProjectViewDrawer({ project: p, onClose, onEdit }) {
  const images = [
    ...(p.featuredImage ? [{ url: p.featuredImage }] : []),
    ...p.galleryImages.map((g) => ({ url: g.url })),
  ];

  return (
    <ViewDrawer eyebrow="Project Details" title={p.name} onClose={onClose} onEdit={onEdit}>
      <ImageGallery images={images} alt={p.name} />

      <div className="mt-5">
        <h3 className="font-serif text-xl font-semibold text-[#1a1a1a]">{p.name}</h3>
        {p.tagline && <p className="mt-1 text-xs text-[#00000099]">{p.tagline}</p>}
        <p className="mt-2 flex items-center gap-1 text-xs text-[#00000099]">
          <MapPin size={13} className="shrink-0" /> {p.location}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <CategoryPill value={p.category} />
          <StageBadge value={p.stage} />
          <PublicationBadge value={p.status} />
        </div>
      </div>

      <ViewSection title="Master Plan Specs">
        <div className="grid grid-cols-2 gap-x-4 gap-y-4">
          <Field label="Total Acreage">{p.totalAcreage || p.totalAcreage === 0 ? fmtAcreage(p.totalAcreage) : null}</Field>
          <Field label="Target Delivery">{p.targetDelivery}</Field>
          <Field label="URL Slug">/projects/{p.slug}</Field>
          <Field label="Last Updated">{fmtDate(p.updatedAt)}</Field>
        </div>
      </ViewSection>

      {p.overview && (
        <ViewSection title="Project Overview">
          <p className="whitespace-pre-line text-[13px] leading-relaxed text-[#333]">{p.overview}</p>
        </ViewSection>
      )}

      {p.highlights.length > 0 && (
        <ViewSection title="Key Architectural Highlights">
          <div className="flex flex-wrap gap-1.5">
            {p.highlights.map((h) => (
              <Pill key={h}>{h}</Pill>
            ))}
          </div>
        </ViewSection>
      )}

      <ViewSection title="Architectural Brochure">
        {p.brochure ? (
          <a
            href={p.brochure.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-md border border-line bg-surface px-3 py-2.5 hover:bg-[#eaf0fb]"
          >
            <FileText size={18} className="shrink-0 text-navy" />
            <span className="min-w-0 flex-1 truncate text-xs font-medium text-[#1a1a1a]">{p.brochure.name}</span>
            <ExternalLink size={14} className="shrink-0 text-[#00000066]" />
          </a>
        ) : (
          <p className="text-xs text-[#00000080]">No brochure uploaded</p>
        )}
      </ViewSection>
    </ViewDrawer>
  );
}