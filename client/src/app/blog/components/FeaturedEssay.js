"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Bookmark, CircleCheck } from "lucide-react";
import { Container, Reveal, WordReveal, SERIF, SANS } from "@/components/ui/Animations";
import { cloudinary } from "@/assets/Cloudinary";

const FeaturedEssay = ({ blog }) => {
  if (!blog) return null;

  const heroImg = blog.heroimage?.url || cloudinary.blogImages.hero;
  const linkHref = blog.slug ? `/blog/${blog.slug}` : "#";

  // Calculate read time dynamically
  const wordCount = (
    (blog.excerpt || "") +
    " " +
    (blog.content?.map((c) => c.text || "").join(" ") || "")
  ).trim().split(/\s+/).length;
  const readTime = `${Math.max(1, Math.ceil(wordCount / 200))} Min Read`;

  // Display tags dynamically in the bullet points box
  const points = blog.tags && blog.tags.length > 0 ? blog.tags : [];

  return (
    <section className={`${SANS} w-full min-w-0 overflow-hidden bg-[#EFF3FC] py-12 md:py-16`}>
      <Container>
        <div className="flex items-center justify-between gap-4">
          <p className="flex items-center gap-2.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#336192]">
            <span className="h-2.5 w-2.5 bg-[#336192]" />
            Featured Lead Essay
          </p>
          <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-[#171C22]">
            Editorial Desk Pick
          </p>
        </div>

        <Reveal y={50} className="mt-5">
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] bg-white shadow-[0_8px_40px_-20px_rgba(11,31,58,0.35)]">
            {/* Image */}
            <div className="group relative h-[300px] sm:h-[420px] lg:h-auto lg:min-h-[540px] overflow-hidden">
              <Image
                src={heroImg}
                alt={blog.title || "Featured Blog Image"}
                fill
                priority
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.05]"
              />
              <span className="absolute left-4 top-4 bg-[#0B1F3A] px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.1em] text-white">
                {blog.category || "Featured"}
              </span>
            </div>

            {/* Content */}
            <div className="flex flex-col p-6 sm:p-10">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[9px] font-semibold uppercase tracking-[0.1em]">
                <span className="text-[#B08D4A]">{blog.category || "Design Series"}</span>
                <span className="text-[#171C22]">•</span>
                <span className="text-[#171C22]">{readTime}</span>
                <span className="text-[#171C22]">•</span>
                <span className="text-[#171C22]">Editorial Essay</span>
              </div>

              <h2 className={`${SERIF} mt-5 max-w-sm text-[#171C22] text-3xl sm:text-4xl leading-[1.2]`}>
                <WordReveal text={blog.title || "Thoughtfully Designed Living"} />
              </h2>

              <Reveal delay={0.2} className="mt-5 max-w-sm">
                <p className="text-[15px] leading-[1.75] text-[#44474D]">
                  {blog.excerpt || "Explore considered living environments, spatial design, and quality execution."}
                </p>
              </Reveal>

              {points.length > 0 && (
                <Reveal delay={0.3} y={24} className="mt-6">
                  <ul className="space-y-3 bg-[#E8EDF6] p-5">
                    {points.map((p) => (
                      <li key={p} className="flex max-w-xs items-start gap-3 text-[13px] leading-relaxed text-[#44474D]">
                        <CircleCheck size={16} className="mt-0.5 shrink-0 text-[#164A7A]" />
                        <span className="capitalize">{p}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}

              <div className="mt-auto flex items-center justify-between gap-4 border-t border-[#EDEBE4] pt-6 mt-8">
                <Link
                  href={linkHref}
                  className="group/btn inline-flex items-center gap-2.5 bg-[#0B1F3A] px-6 py-4 text-[11px] font-medium uppercase tracking-wide text-white transition-colors duration-300 hover:bg-[#1B4B7F]"
                >
                  Read Full Article
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Link>
                <button type="button" aria-label="Save article" className="p-2 text-[#171C22] transition-colors hover:text-[#336192]">
                  <Bookmark size={16} />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};

export default FeaturedEssay;