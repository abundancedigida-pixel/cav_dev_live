"use client";
import Link from "next/link";
import { Archive, BookOpen, Clock, Share2 } from "lucide-react";
import { toast } from "react-toastify";
import {
  Container,
  Reveal,
  WordReveal,
  ParallaxImage,
  SERIF,
  SANS,
} from "@/components/ui/Animations";
import { cloudinary } from "@/assets/Cloudinary";

const ArticleHero = ({ blog }) => {
  const title = blog?.title || "Thoughtfully Designed Living";
  const heroImg = blog?.heroimage?.url || cloudinary.blogImages.hero;
  const category = blog?.category || "Architecture & Design";

  // Calculate dynamic reading time
  const wordCount = (
    (blog?.excerpt || "") +
    " " +
    (blog?.content?.map((c) => c.text || "").join(" ") || "")
  )
    .trim()
    .split(/\s+/).length;
  const readTime = `${Math.max(1, Math.ceil(wordCount / 200))} Min Read`;

  // Format date
  const dateStr = blog?.publishedAt || blog?.createdAt;
  const formattedDate = dateStr
    ? new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard.");
      }
    } catch {
      /* share dialog dismissed */
    }
  };

  return (
    <section
      className={`${SANS} w-full min-w-0 overflow-hidden bg-white py-16`}
    >
      <Container>
        {/* Breadcrumb row */}
        <Reveal y={12}>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E6E4DC] pb-4">
            <p className="text-[10px] font-medium tracking-[0.06em] text-[#44474D]">
              <Link href="/" className="transition-colors hover:text-[#0B1F3A]">
                Home
              </Link>
              <span className="mx-1.5">/</span>
              <Link
                href="/insights"
                className="transition-colors hover:text-[#0B1F3A]"
              >
                Editorial Perspectives
              </Link>
              <span className="mx-1.5">/</span>
              <span className="text-[#171C22]">{title}</span>
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 border border-[#E6E4DC] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-[#171C22] transition-colors hover:border-[#0B1F3A]"
              >
                <Share2 size={11} /> Share
              </button>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 border border-[#E6E4DC] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-[#171C22] transition-colors hover:border-[#0B1F3A]"
              >
                <Archive size={11} /> Archive
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Tag */}
        <Reveal
          y={16}
          delay={0.1}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <span className="bg-[#E8C27A] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-[#171C22]">
            {category}
          </span>
          {blog?.tags?.[0] && (
            <span className="text-[9px] font-semibold uppercase tracking-[0.1em] text-[#171C22]">
              <span className="mr-2 text-[#B08D4A]">◆</span>
              {blog.tags[0]}
            </span>
          )}
        </Reveal>

        {/* Title */}
        <h1
          className={`${SERIF} mt-5 max-w-2xl text-[#171C22] text-3xl sm:text-4xl lg:text-5xl leading-[1.15]`}
        >
          <WordReveal text={title} />
        </h1>

        {/* Lead / Excerpt */}
        {blog?.excerpt && (
          <Reveal delay={0.25} y={24} className="mt-6">
            <div className="border-l-4 border-[#C5A46D] bg-[#F7F8FD] px-5 py-5 sm:px-7">
              <p className="max-w-xl text-[15px] leading-[1.75] text-[#44474D]">
                {blog.excerpt}
              </p>
            </div>
          </Reveal>
        )}

        {/* Meta bar */}
        <Reveal delay={0.3} y={16} className="mt-4">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 bg-[#EEF3FC] px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.1em] text-[#171C22]">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <span className="inline-flex items-center gap-2">
                <Clock size={12} className="text-[#336192]" /> {readTime}
              </span>
              <span className="inline-flex items-center gap-2">
                <BookOpen size={12} className="text-[#336192]" /> By{" "}
                {blog?.author || "Abundance Advisory"}{" "}
                {formattedDate ? `· ${formattedDate}` : ""}
              </span>
            </div>
            <span className="text-[#44474D]">Abundance Editorial Bureau</span>
          </div>
        </Reveal>

        {/* Hero image */}
        <Reveal y={50} delay={0.1} className="mt-8">
          <div className="relative shadow-[0_28px_60px_-30px_rgba(11,31,58,0.4)]">
            <ParallaxImage
              src={heroImg}
              alt={title}
              className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[680px] 2xl:h-[760px] w-full"
              strength={6}
              reveal={false}
              priority
              sizes="100vw"
            />
            <span className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-[#0B1F3AE6] px-3 py-2 text-[8px] sm:text-[9px] font-semibold uppercase tracking-[0.12em] text-white">
              {category}
            </span>
          </div>
          <p className="mt-3 text-center text-xs italic leading-relaxed text-[#44474D]">
            {title} &mdash; Architectural Perspective
          </p>
        </Reveal>
      </Container>
    </section>
  );
};

export default ArticleHero;
