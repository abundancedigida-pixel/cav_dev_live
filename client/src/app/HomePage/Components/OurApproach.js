"use client";
import Link from "next/link";
import {
  Container,
  Reveal,
  WordReveal,
  ParallaxImage,
  Eyebrow,
  SERIF,
  SANS,
} from "@/components/ui/Animations";
import Img from "@/assets/HomeImages/OurApproch.webp";

const OurApproach = () => {
  return (
    <section
      className={`${SANS} w-full min-w-0 overflow-hidden bg-white py-16`}
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <Eyebrow>Our Approach</Eyebrow>
            <h2 className="mt-5 text-[#0B1F3A] font-light tracking-[-0.03em] leading-[1.08] text-3xl sm:text-3xl md:text-4xl lg:text-5xl">
              <WordReveal text="Spaces with Purpose. Architecture with Perspective." />
            </h2>

            <Reveal delay={0.2} className="mt-7 max-w-xl space-y-6">
              <p className="text-[15px] leading-[1.75] text-[#4F5963]">
                We believe great development is more than construction. It is
                the thoughtful relationship between location, architecture,
                functionality, materials, and the people who experience the
                space.
              </p>
              <p className="text-[15px] leading-[1.75] text-[#4F5963]">
                At Abundance Group, we believe every great space begins with a
                dream and grows through desire, discipline, direction, and
                determination. Our purpose is to create thoughtful spaces that
                bring people together, simplify everyday living, and build a
                better tomorrow.
              </p>
            </Reveal>

            <Reveal delay={0.35} className="mt-8">
              <Link
                href="/about-us"
                className="group relative inline-block pb-1.5 text-[13px] font-bold text-[#164A7A]"
              >
                Our story and standards{" "}
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
                <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#C5A46D]" />
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#164A7A] transition-all duration-500 group-hover:w-full" />
              </Link>
            </Reveal>
          </div>

          <div className="relative pb-10 lg:pb-12">
            <ParallaxImage
              src={Img}
              alt="Warm modern living space with panoramic windows"
              className="h-[320px] sm:h-[420px] lg:h-[480px] w-full lg:w-[92%]"
              strength={7}
              reveal={false}
            />
            <Reveal
              delay={0.5}
              y={30}
              className="absolute bottom-0 right-0 sm:right-4 lg:-right-2 xl:-right-6"
            >
              <div className="w-[230px] sm:w-[260px] bg-[#0B1F3A] p-6 sm:p-7 shadow-2xl">
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#B9CDE0]">
                  Design Principle 01
                </p>
                <p
                  className={`${SERIF} mt-3 text-xl sm:text-2xl font-semibold leading-snug text-white`}
                >
                  Liveability before spectacle.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default OurApproach;
