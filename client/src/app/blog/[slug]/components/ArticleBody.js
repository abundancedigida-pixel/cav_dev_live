"use client";
import Image from "next/image";
import Link from "next/link";
import { Quote } from "lucide-react";
import { Container, Reveal, SERIF, SANS } from "@/components/ui/Animations";

const bodyCls = "text-[15px] leading-[1.85] text-[#44474D]";

const ArticleBody = ({ blog }) => {
  const content = blog?.content || [];

  return (
    <section
      className={`${SANS} w-full min-w-0 overflow-hidden bg-white pt-4 py-8`}
    >
      <Container>
        {/* If no content blocks exist, render excerpt */}
        {content.length === 0 && blog?.excerpt && (
          <Reveal y={24}>
            <p className={bodyCls}>{blog.excerpt}</p>
          </Reveal>
        )}

        {/* Render Dynamic Content Blocks */}
        <div className="space-y-8">
          {content.map((block, idx) => {
            switch (block.type) {
              case "heading": {
                return (
                  <Reveal key={idx} y={24} className="mt-10 mb-4">
                    <h2
                      className={`${SERIF} text-[#171C22] text-2xl sm:text-3xl leading-[1.2]`}
                    >
                      {block.text}
                    </h2>
                  </Reveal>
                );
              }

              case "text": {
                return (
                  <Reveal key={idx} y={20}>
                    <p className={bodyCls}>{block.text}</p>
                  </Reveal>
                );
              }

              case "quote": {
                return (
                  <Reveal key={idx} y={30} className="my-10">
                    <div className="bg-[#0B1F3A] px-6 py-8 sm:px-10 sm:py-10">
                      <Quote size={22} className="text-[#E8C27A]" />
                      <blockquote
                        className={`${SERIF} mt-4 max-w-4xl text-white text-xl sm:text-2xl leading-[1.5]`}
                      >
                        &ldquo;{block.text}&rdquo;
                      </blockquote>
                      <p className="mt-5 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#E8C27A]">
                        &mdash; {blog?.author || "Editorial Perspective"}
                      </p>
                    </div>
                  </Reveal>
                );
              }

              case "list": {
                const isNumbered = block.style === "number";
                return (
                  <Reveal key={idx} y={20} className="my-6">
                    <div className="bg-white p-5 sm:p-7 shadow-[0_2px_12px_-6px_rgba(11,31,58,0.15)]">
                      <div className="space-y-4">
                        {block.items?.map((item, itemIdx) => (
                          <div key={itemIdx} className="flex items-start gap-4">
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center bg-[#0B1F3A] text-[10px] font-semibold text-white">
                              {isNumbered
                                ? String(itemIdx + 1).padStart(2, "0")
                                : "•"}
                            </span>
                            <p className="mt-1 text-[13px] leading-[1.75] text-[#44474D]">
                              {item}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                );
              }

              case "image": {
                const imgUrl = block.imageurl?.url;
                if (!imgUrl) return null;
                return (
                  <Reveal key={idx} y={30} className="my-8">
                    <div className="group">
                      <div
                        style={{ minHeight: 280 }}
                        className="relative h-[300px] sm:h-[380px] lg:h-[480px] overflow-hidden shadow-[0_10px_40px_-24px_rgba(11,31,58,0.35)]"
                      >
                        <Image
                          src={imgUrl}
                          alt="Article illustration"
                          fill
                          sizes="(min-width: 1024px) 70vw, 100vw"
                          className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.03]"
                        />
                      </div>
                    </div>
                  </Reveal>
                );
              }

              case "button": {
                return (
                  <Reveal key={idx} y={20} className="my-6">
                    <a
                      href={block.href || "#"}
                      target={block.buttonTarget || "_self"}
                      rel={
                        block.buttonTarget === "_blank"
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="inline-block bg-[#0B1F3A] px-7 py-4 text-[10px] font-bold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-[#164A7A]"
                    >
                      {block.text || "Explore Link"} →
                    </a>
                  </Reveal>
                );
              }

              case "table": {
                const headers = block.tableHeaders || [];
                const rows = block.tableRows || [];
                return (
                  <Reveal key={idx} y={30} className="my-8">
                    <div className="overflow-x-auto bg-white shadow-[0_10px_40px_-24px_rgba(11,31,58,0.35)]">
                      {block.tableCaption && (
                        <div className="bg-[#EEF3FC] px-5 py-3">
                          <p className="text-[11px] font-bold uppercase tracking-wide text-[#1B4B7F]">
                            {block.tableCaption}
                          </p>
                        </div>
                      )}
                      <table className="w-full min-w-[640px] text-left">
                        {headers.length > 0 && (
                          <thead>
                            <tr className="bg-[#000615]">
                              {headers.map((h, hIdx) => (
                                <th
                                  key={hIdx}
                                  className="px-5 py-4 text-[9px] font-bold uppercase tracking-[0.12em] text-white"
                                >
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                        )}
                        <tbody>
                          {rows.map((row, rIdx) => (
                            <tr
                              key={rIdx}
                              className="border-b border-[#EDEBE4]"
                            >
                              {row.map((cell, cIdx) => (
                                <td
                                  key={cIdx}
                                  className={`px-5 py-4 text-sm ${
                                    cIdx === 0
                                      ? "font-semibold text-[#171C22]"
                                      : "text-[#44474D]"
                                  }`}
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Reveal>
                );
              }

              case "link": {
                return (
                  <Reveal key={idx} y={16}>
                    <p className={bodyCls}>
                      <Link
                        href={block.href || "#"}
                        className="font-medium text-[#164A7A] underline transition-colors hover:text-[#0B1F3A]"
                      >
                        {block.text || block.href}
                      </Link>
                    </p>
                  </Reveal>
                );
              }

              default:
                return null;
            }
          })}
        </div>
      </Container>
    </section>
  );
};

export default ArticleBody;
