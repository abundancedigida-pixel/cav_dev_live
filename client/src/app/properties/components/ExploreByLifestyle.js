"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, KeyRound } from "lucide-react";
import { Container, Reveal, WordReveal, Eyebrow, SERIF, SANS } from "@/components/ui/Animations";
import { cloudinary } from "@/assets/Cloudinary";

const cards = [
  {
    tag: "Apartments",
    title: "Apartments",
    text: "Modern residences designed for connected urban living.",
    img: cloudinary.properties.apartment,
    href: "#offerings",
  },
  {
    tag: "Abundance Villas",
    title: "Abundance Villas",
    text: "Thoughtfully designed residences with space, privacy and comfort.",
    img: cloudinary.properties.villa,
    href: "#offerings",
  },
  {
    tag: "Independent Homes",
    title: "Independent Homes",
    text: "Fully furnished homes designed around everyday family living.",
    img: cloudinary.properties.home,
    href: "#offerings",
  },
];

const ExploreByLifestyle = () => {
  return (
    <section className={`${SANS} w-full min-w-0 overflow-hidden bg-white py-16`}>
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <Eyebrow className="!text-[10px]">Explore by Lifestyle</Eyebrow>
            <h2 className={`${SERIF} mt-4 text-[#171C22] text-3xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.1]`}>
              <WordReveal text="Explore By Lifestyle." />
            </h2>
          </div>
          <Reveal delay={0.2} className="shrink-0">
            <p className="max-w-sm text-[15px] leading-relaxed text-[#44474D]">
              From everyday family living to private retreats, Abundance homes are designed around thoughtful
              planning, comfort and long-term living.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.1} y={40}>
              <Link href={c.href} className="group relative block h-[420px] overflow-hidden bg-[#0B1F3A] lg:h-[440px]">
                <Image
                  src={c.img}
                  alt={c.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, 100vw"
                  className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3AE6] via-[#0B1F3A66] to-[#0B1F3A33]" />
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-white">{c.tag}</p>
                  <h3 className={`${SERIF} mt-2 text-2xl text-white`}>{c.title}</h3>
                  <p className="mt-2 max-w-[14rem] text-[13px] leading-relaxed text-white/80">{c.text}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-wide text-white">
                    Sample Listing
                    <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}

          <Reveal delay={0.3} y={40}>
            <div className="flex h-[420px] flex-col items-center justify-center bg-[#0B1F3A] px-6 text-center lg:h-[440px]">
              <span className="flex h-16 w-16 items-center justify-center bg-white/10 text-white">
                <KeyRound size={26} />
              </span>
              <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.15em] text-white">Ready to Move</p>
              <h3 className={`${SERIF} mt-2 text-2xl text-white`}>Ready to Move</h3>
              <p className="mt-3 max-w-[16rem] text-[13px] leading-relaxed text-white/80">
                Fully prepared homes designed to move into with confidence.
              </p>
              <Link
                href="#offerings"
                className="mt-5 bg-white px-6 py-3 text-[11px] font-medium uppercase tracking-wide text-[#0B1F3A] transition-colors duration-300 hover:bg-[#E8C27A]"
              >
                Sample Listing
              </Link>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
};

export default ExploreByLifestyle;