"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { SlidersHorizontal, ChevronDown, BookOpen, Star } from "lucide-react";
import {
  Container,
  Reveal,
  WordReveal,
  Eyebrow,
  SERIF,
  SANS,
} from "@/components/ui/Animations";
import { cloudinary } from "@/assets/Cloudinary";

const PAGE_SIZE = 6;

const badgeCls = {
  "Home Design": "bg-[#0B1F3A]",
  "Precast Homes": "bg-[#336192]",
  "Sustainable Living": "bg-[#B08D4A]",
  Architecture: "bg-[#0B1F3A]",
  "Architecture & Design": "bg-[#0B1F3A]",
  "Construction Insights": "bg-[#164A7A]",
  "Homeowner Guides": "bg-[#336192]",
};

const InsightsGrid = ({ blogs = [] }) => {
  const [tab, setTab] = useState("All Articles");
  const [count, setCount] = useState(PAGE_SIZE);

  // Extract dynamic tabs from backend categories
  const tabs = useMemo(() => {
    const categories = [
      ...new Set(blogs.map((b) => b.category).filter(Boolean)),
    ];
    return ["All Articles", ...categories];
  }, [blogs]);

  // Filter based on selected tab
  const filtered = useMemo(() => {
    return tab === "All Articles"
      ? blogs
      : blogs.filter((a) => a.category === tab);
  }, [blogs, tab]);

  const visible = filtered.slice(0, count);

  const pick = (t) => {
    setTab(t);
    setCount(PAGE_SIZE);
  };

  return (
    <div className={`${SANS} w-full min-w-0`}>
      {/* Filter bar */}
      <div className="w-full bg-[#F1F0EB] py-3">
        <Container>
          <div className="flex items-center justify-between gap-4">
            <div className="flex gap-2 overflow-x-auto pb-1 lg:pb-0">
              {tabs.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => pick(t)}
                  aria-pressed={tab === t}
                  className={`shrink-0 px-5 py-2.5 text-[9px] font-medium uppercase tracking-[0.08em] transition-colors duration-300 ${
                    tab === t
                      ? "bg-[#0B1F3A] text-white"
                      : "border border-[#F0DFB9] bg-white text-[#171C22] hover:border-[#C5A46D]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <p className="hidden xl:flex shrink-0 items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.1em] text-[#171C22]">
              <SlidersHorizontal size={12} />
              Refined Editorial Filter
            </p>
          </div>
        </Container>
      </div>

      <section className="w-full min-w-0 overflow-hidden bg-white py-12 md:py-16">
        <Container>
          <Eyebrow className="!text-[9px] !font-medium !tracking-[0.15em]">
            Curated Essays &amp; Guides
          </Eyebrow>
          <h2
            className={`${SERIF} mt-3 text-[#171C22] text-3xl sm:text-4xl leading-[1.15]`}
          >
            <WordReveal text="Explore Our Latest Insights" />
          </h2>
          <Reveal delay={0.2} className="mt-3 max-w-md">
            <p className="text-sm leading-relaxed text-[#44474D]">
              Practical ideas and fresh perspectives for people planning,
              building, or improving their personal spaces and legacy
              properties.
            </p>
          </Reveal>

          {visible.length === 0 ? (
            <div className="mt-12 p-12 text-center border border-[#EDEBE4] bg-[#F9F8F6]">
              <p className="text-sm font-semibold uppercase tracking-wider text-[#164A7A]">
                No Articles Found
              </p>
              <p className="mt-2 text-xs text-[#44474D]">
                There are currently no articles in this category.
              </p>
            </div>
          ) : (
            <div className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visible.map((a, i) => {
                const img = a.heroimage?.url || cloudinary.blogImages.hero;
                const dateStr = a.publishedAt || a.createdAt;
                const formattedDate = dateStr
                  ? new Date(dateStr).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "";
                const meta = `${a.author ? `By ${a.author}` : "Editorial"} ${formattedDate ? `· ${formattedDate}` : ""}`;

                // Dynamic read time
                const wordCount = (
                  (a.excerpt || "") +
                  " " +
                  (a.content?.map((c) => c.text || "").join(" ") || "")
                )
                  .trim()
                  .split(/\s+/).length;
                const readTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

                return (
                  <Reveal
                    key={a.slug || a._id || i}
                    delay={(i % 3) * 0.1}
                    y={40}
                  >
                    <article className="group flex h-full flex-col border border-[#336192]/50 bg-white shadow-[0_2px_10px_-6px_rgba(11,31,58,0.2)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-28px_rgba(11,31,58,0.4)]">
                      <div className="relative h-[190px] sm:h-[210px] overflow-hidden">
                        <Image
                          src={img}
                          alt={a.title}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.05]"
                        />

                        {/* Left: Category Badge */}
                        <span
                          className={`absolute left-2.5 top-2.5 px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.12em] text-white ${badgeCls[a.category] || "bg-[#0B1F3A]"}`}
                        >
                          {a.category}
                        </span>

                        {a.isFeatured && (
                          <span
                            title="Featured Article"
                            className="absolute right-2.5 top-2.5 flex h-10 w-10 items-center justify-center rounded-full bg-[#0B1F3A]/85 text-[#E8C27A] shadow-md backdrop-blur-sm"
                          >
                            <Star size={24} className="fill-[#E8C27A]" />
                          </span>
                        )}

                        {/* Bottom-Right: Read Time */}
                        <span className="absolute bottom-2.5 right-2.5 bg-white px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.08em] text-[#171C22]">
                          {readTime}
                        </span>
                      </div>

                      <div className="flex flex-1 flex-col p-5">
                        <p className="text-[9px] font-medium uppercase tracking-[0.08em] text-[#44474D]">
                          {meta}
                        </p>
                        <h3
                          className={`${SERIF} mt-4 max-w-[16rem] text-xl leading-snug text-[#171C22]`}
                        >
                          {a.title}
                        </h3>
                        <p className="mt-3 text-xs leading-[1.7] text-[#44474D]">
                          {a.excerpt ||
                            "Practical considerations and spatial perspectives on everyday living."}
                        </p>

                        <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#EDEBE4] pt-4 mt-6">
                          <Link
                            href={`/blog/${a.slug}`}
                            className="text-[9px] font-semibold uppercase tracking-[0.1em] text-[#164A7A] transition-colors hover:text-[#0B1F3A]"
                          >
                            Read Article →
                          </Link>
                          <BookOpen size={13} className="text-[#44474D]" />
                        </div>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          )}

          {filtered.length > 0 && (
            <div className="mt-10 flex flex-col items-center gap-3">
              <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-[#44474D]">
                Showing {visible.length} of {filtered.length} Perspectives
              </p>

              <button
                type="button"
                disabled={count >= filtered.length}
                onClick={() => setCount((c) => c + PAGE_SIZE)}
                className={`inline-flex items-center gap-2 px-8 py-3.5 text-[10px] font-semibold uppercase tracking-wide transition-colors duration-300 ${
                  count < filtered.length
                    ? "bg-[#E8EDF6] text-[#0B1F3A] hover:bg-[#0B1F3A] hover:text-white cursor-pointer"
                    : "bg-[#E8EDF6] text-[#0B1F3A]/60 cursor-default"
                }`}
              >
                {count < filtered.length ? (
                  <>
                    Load more articles <ChevronDown size={13} />
                  </>
                ) : (
                  "All Articles Loaded"
                )}
              </button>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
};

export default InsightsGrid;
