"use client";
import Link from "next/link";
import { House, MapPin } from "lucide-react";
import { Container, Reveal, WordReveal, ParallaxImage, Eyebrow, SERIF, SANS } from "@/components/ui/Animations";

const HeroDynamic = ({ project }) => {
  const categoryStr = project.category?.join(" · ") || "Development";
  const statusStr = project.developmentStatus?.join(" · ") || "Active";

  return (
    <section className={`${SANS} w-full min-w-0 overflow-hidden bg-white pt-16 pb-16`}>
      <Container>
        {/* Breadcrumb row */}
        <Reveal y={12}>
          <nav aria-label="Breadcrumb" className="flex items-center justify-between gap-4 border-b border-[#E6E4DC] pb-4">
            <ol className="flex flex-wrap items-center gap-2 text-[10px] font-medium uppercase tracking-[0.12em] text-[#44474D]">
              <li><Link href="/" className="hover:text-[#0B1F3A]">Home</Link></li>
              <li>/</li>
              <li><Link href="/projects" className="hover:text-[#0B1F3A]">Projects</Link></li>
              <li>/</li>
              <li className="font-bold text-[#0B1F3A]">{project.projectName}</li>
            </ol>
            <span className="shrink-0 bg-[#E8EDF6] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-[#164A7A]">
              {statusStr}
            </span>
          </nav>
        </Reveal>

        {/* Title + Tagline */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div>
            <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
              <h1 className={`${SERIF} text-[#0B1F3A] text-4xl sm:text-5xl lg:text-6xl leading-[1.05]`}>
                <WordReveal text={project.projectName} />
              </h1>
              {project.location && (
                <span className="inline-flex items-center gap-1.5 border border-[#D5D9E4] bg-[#E8EDF6] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#171C22]">
                  <MapPin size={12} />
                  {project.location}
                </span>
              )}
            </div>

            {project.tagline && (
              <Eyebrow className="mt-4 !text-[11px] !font-medium !tracking-[0.12em]">
                {project.tagline}
              </Eyebrow>
            )}
          </div>

          <div className="max-w-[34rem] lg:justify-self-end">
            <p className="text-[15px] font-light leading-[1.75] text-[#44474D]">
              {project.projectOverview}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#enquiry"
                className="bg-[#0B1F3A] px-6 py-3.5 text-[11px] font-medium uppercase tracking-wide text-white transition-colors hover:bg-[#1B4B7F]"
              >
                Inquire on Development
              </a>
              {project.architecturalBrochure?.url && (
                <a
                  href={project.architecturalBrochure.url}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-[#C4C6CE] bg-white px-6 py-3.5 text-[11px] font-medium uppercase tracking-wide text-[#0B1F3A] transition-colors hover:border-[#0B1F3A]"
                >
                  Download Brochure
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {project.featuredImage?.url && (
          <Reveal y={40} delay={0.2} className="mt-10">
            <div className="relative shadow-[0_28px_60px_-30px_rgba(11,31,58,0.4)]">
              <ParallaxImage
                src={project.featuredImage.url}
                alt={project.projectName}
                className="h-[320px] sm:h-[420px] lg:h-[494px] w-full"
                strength={5}
                reveal={false}
                priority
                sizes="100vw"
              />
              <div className="absolute inset-x-3 bottom-3 sm:inset-x-6 sm:bottom-5 flex flex-wrap items-end justify-between gap-3">
                <p className="flex items-center gap-2 bg-[#0B1F3AE6] px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-white">
                  <House size={15} />
                  {categoryStr}
                </p>
              </div>
            </div>
          </Reveal>
        )}
      </Container>
    </section>
  );
};

export default HeroDynamic;