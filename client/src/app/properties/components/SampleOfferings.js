"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  Container,
  Reveal,
  WordReveal,
  SERIF,
  SANS,
} from "@/components/ui/Animations";
import { cloudinary } from "@/assets/Cloudinary";

const Chips = ({ chips }) => (
  <div className="absolute inset-x-0 top-0 p-4">
    <div className="flex flex-wrap">
      <span className="bg-[#0B1F3A] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-wide text-white">
        {chips[0]}
      </span>
      {chips[1] && (
        <span className="bg-white px-3 py-1.5 text-[9px] font-medium uppercase tracking-wide text-[#171C22]">
          {chips[1]}
        </span>
      )}
    </div>
  </div>
);

const SampleOfferings = ({ properties = [] }) => {
  // If there are no remaining properties, don't show blank/dummy cards
  if (!properties || properties.length === 0) {
    return null;
  }

  // The first 2 of the remaining properties display as large featured pairs
  const featured = properties.slice(0, 2);
  // Any further properties display in the 3-column grid
  const small = properties.slice(2);

  return (
    <section
      id="offerings"
      className={`${SANS} w-full min-w-0 overflow-hidden bg-white py-16`}
    >
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#164A7A]">
              <span className="h-2 w-2 bg-[#164A7A]" /> Residential Offerings
            </p>
            <h2
              className={`${SERIF} mt-3 text-[#171C22] text-3xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.1]`}
            >
              <WordReveal text="All Residential Offerings" />
            </h2>
          </div>
          <Reveal delay={0.2} className="shrink-0">
            <p className="max-w-sm text-[13px] leading-relaxed text-[#44474D]">
              Carefully designed residences showcasing thoughtful planning,
              precision precast construction, and long-term comfort.
            </p>
          </Reveal>
        </div>

        {/* Featured pair */}
        {featured.length > 0 && (
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featured.map((f, i) => {
              const imgSrc = f.featuredImage?.url || cloudinary.properties.hero;
              const href = f.slug ? `/properties/${f.slug}` : "/contact-us";

              return (
                <Reveal key={f._id || i} delay={i * 0.12} y={40}>
                  <div className="group flex h-full flex-col border border-[#EDEBE4] bg-white">
                    <div className="relative h-[260px] sm:h-[300px] overflow-hidden">
                      <Image
                        src={imgSrc}
                        alt={f.propertyName}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.05]"
                      />
                      <Chips chips={[f.propertyType, f.developmentStatus]} />
                      <span className="absolute bottom-0 right-0 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#171C22]">
                        {f.pricePerSqft ? `₹${f.pricePerSqft.toLocaleString("en-IN")}/sq.ft.` : "Abundance"}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5 md:p-6">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-[10px] font-bold uppercase tracking-wide text-[#1B4B7F]">
                          {f.location}
                        </p>
                        <p className="text-[11px] text-[#44474D]">{f.tagline || f.propertyType}</p>
                      </div>
                      <h3 className="mt-3 text-2xl font-light text-[#171C22]">
                        {f.propertyName}
                      </h3>
                      <p className="mt-2 max-w-md text-[13px] leading-relaxed text-[#44474D]">
                        {f.description}
                      </p>
                      <div className="mt-auto pt-5">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#EEF3FC] px-4 py-4">
                          <div className="grid grid-cols-2 gap-4 sm:flex sm:gap-8">
                            <div className="min-w-0">
                              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#44474D]">
                                Built-up Area
                              </p>
                              <p className="mt-1 text-[13px] font-medium text-[#171C22]">
                                {f.builtUpArea ? `${f.builtUpArea.toLocaleString("en-IN")} sq.ft.` : "N/A"}
                              </p>
                            </div>
                            <div className="min-w-0">
                              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#44474D]">
                                Status
                              </p>
                              <p className="mt-1 text-[13px] font-medium text-[#336192]">
                                {f.developmentStatus}
                              </p>
                            </div>
                          </div>

                          <Link
                            href={href}
                            className="inline-flex w-fit shrink-0 items-center gap-1.5 whitespace-nowrap text-[10px] font-bold uppercase tracking-wide text-[#1B4B7F] hover:text-[#0B1F3A]"
                          >
                            Explore Property
                            <ArrowUpRight size={12} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        )}

        {/* Small cards grid */}
        {small.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {small.map((s, i) => {
              const imgSrc = s.featuredImage?.url || cloudinary.properties.hero;
              const href = s.slug ? `/properties/${s.slug}` : "/contact-us";

              return (
                <Reveal key={s._id || i} delay={(i % 3) * 0.1} y={40}>
                  <div className="group flex h-full flex-col border border-[#EDEBE4] bg-white">
                    <div className="relative h-[200px] md:h-[220px] overflow-hidden">
                      <Image
                        src={imgSrc}
                        alt={s.propertyName}
                        fill
                        sizes="(min-width: 1024px) 33vw, 100vw"
                        className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.06]"
                      />
                      <Chips chips={[s.propertyType, s.developmentStatus]} />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <p className="text-[10px] font-bold uppercase tracking-wide text-[#1B4B7F]">
                        {s.location}
                      </p>
                      <h3 className="mt-3 text-xl font-light text-[#171C22]">
                        {s.propertyName}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-[#44474D]">
                        {s.description}
                      </p>
                      <div className="mt-auto pt-5">
                        <div className="flex items-center justify-between gap-3 bg-[#EEF3FC] px-4 py-3 text-xs text-[#44474D]">
                          <span>
                            {s.builtUpArea ? `Built-up: ${s.builtUpArea.toLocaleString("en-IN")} sq.ft.` : "Area on Request"}
                          </span>
                          <Link
                            href={href}
                            className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-[#1B4B7F]"
                          >
                            View Details <ArrowRight size={11} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        )}
      </Container>
    </section>
  );
};

export default SampleOfferings;