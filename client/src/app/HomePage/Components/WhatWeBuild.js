"use client";
import Link from "next/link";
import Image from "next/image";
import { Container, Reveal, WordReveal, Eyebrow, SERIF, SANS } from "@/components/ui/Animations";
import BuildOne from "@/assets/HomeImages/Build1.webp";
import BuildTwo from "@/assets/HomeImages/Build2.webp";
import BuildThree from "@/assets/HomeImages/Build3.webp";
import BuildFour from "@/assets/HomeImages/Build4.webp";
import BuildFive from "@/assets/HomeImages/Build5.webp";
import BuildSix from "@/assets/HomeImages/Build6.webp";

const cards = [
  {
    title: "Individual Homes",
    text: "Personal homes planned for privacy, comfort and longevity.",
    href: "/properties",
    img: BuildOne,
    cls: "min-h-[380px] md:col-span-2 lg:col-span-1 lg:row-span-2 lg:col-start-1 lg:row-start-1",
    big: true,
  },
  {
    title: "Luxury Villas",
    text: "Low-density living with indoor-outdoor connections.",
    href: "/projects",
    img: BuildTwo,
    cls: "lg:col-start-2 lg:row-start-1",
  },
  {
    title: "Apartments",
    text: "Connected urban residences with considered amenities.",
    href: "/projects",
    img: BuildThree,
    cls: "lg:col-start-3 lg:row-start-1",
  },
  {
    title: "IT Parks & Commercial",
    text: "Efficient, future-ready workplaces and business environments.",
    href: "/projects",
    img: BuildFour,
    cls: "md:col-span-2 lg:col-span-2 lg:col-start-2 lg:row-start-2",
  },
  {
    title: "Tailor-Made Homes",
    text: "A complete design-and-build journey for your land.",
    href: "/tailor-made",
    img: BuildFive,
    cls: "lg:col-start-1 lg:row-start-3",
  },
  {
    title: "Pre-cast Homes",
    text: "Efficient, future-ready Houses",
    href: "/pre-cast-homes",
    img: BuildSix,
    cls: "lg:col-span-2 lg:col-start-2 lg:row-start-3",
  },
];

const WhatWeBuild = () => {
  return (
    <section className={`${SANS} w-full min-w-0 overflow-hidden bg-[#F3F1EB] py-16`}>
      <Container>
        <Eyebrow>What we build</Eyebrow>
        <h2
          className={`${SERIF} mt-4 text-[#0B1F3A] text-3xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.08] tracking-[-0.01em]`}
        >
          <WordReveal text="One Vision. Many Ways to Live and Work." />
        </h2>
        <Reveal delay={0.2} className="mt-5 max-w-[34rem]">
          <p className="text-[15px] leading-relaxed text-[#4F5963]">
            From private homes to large-scale business environments, every development begins with
            how people will use it.
          </p>
        </Reveal>

        <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr] lg:grid-rows-[320px_310px_330px] gap-4">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={(i % 3) * 0.1} y={50} className={`${c.cls} min-h-[300px] lg:min-h-0`}>
              <Link href={c.href} className="group relative block h-full min-h-[inherit] overflow-hidden bg-[#0B1F3A]">
                <Image
                  src={c.img}
                  alt={c.title}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#051324E0] to-[#05132400] transition-opacity duration-500 group-hover:opacity-90" />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-7 translate-y-0 transition-transform duration-500 group-hover:-translate-y-1">
                  <h3
                    className={`${SERIF} font-semibold text-white leading-tight ${
                      c.big ? "text-[28px] md:text-[30px]" : "text-2xl md:text-[28px]"
                    }`}
                  >
                    {c.title}
                  </h3>
                  <p className="mt-2 text-[13px] text-white max-w-md">{c.text}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#E2CFAE]">
                    Explore
                    <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default WhatWeBuild;