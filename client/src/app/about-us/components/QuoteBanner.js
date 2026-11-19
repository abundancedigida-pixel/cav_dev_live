"use client";
import { Container, ParallaxImage, WordReveal, SANS } from "@/components/ui/Animations";
import { cloudinary } from "@/assets/Cloudinary";
const IMG = cloudinary.about.ctaBanner;

const QuoteBanner = () => {
  return (
    <section
      className={`${SANS} relative isolate w-full min-w-0 overflow-hidden bg-[#0B1F3A] flex items-center min-h-[320px] md:min-h-[400px]`}
    >
      <div className="absolute inset-0 -z-10">
        <ParallaxImage
          src={IMG}
          alt="Modern living room with panoramic windows at dusk"
          className="h-full w-full"
          strength={10}
          reveal={false}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#061525B8] via-[#06152566] to-[#06152514]" />
      </div>

      <Container className="relative py-16 md:py-20">
        <h2 className="max-w-[16ch] sm:max-w-[18ch] md:max-w-[20ch] font-light text-white tracking-[-0.03em] leading-[1.1] text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
          <WordReveal text="Architecture becomes meaningful when people make it their own." stagger={0.08} />
        </h2>
      </Container>
    </section>
  );
};

export default QuoteBanner;