"use client";
import { Container, Reveal, WordReveal, ParallaxImage, Eyebrow, SERIF, SANS } from "@/components/ui/Animations";
import Img from "@/assets/HomeImages/Mindset.webp";

const pillars = [
  {
    tag: "Solutions",
    title: "Quality Housing. Higher Standards.",
    text: "We believe everyone deserves a quality home built to high standards of safety, comfort, durability, and affordability.",
  },
  {
    tag: "Convenience",
    title: "Smart Designs. Simpler Living.",
    text: "We embrace simple, clever and practical designs that make everyday life easier.",
  },
  {
    tag: "Experience",
    title: "Better Living. Lasting Memories.",
    text: "We go beyond building houses to create meaningful living experiences that bring families, communities and generations together.",
  },
];

const MindsetCommunity = () => {
  return (
    <section className={`${SANS} w-full min-w-0 overflow-hidden bg-[#F3F1EB] py-16`}>
      <Container>
        <Eyebrow>Abundance Mindset Community</Eyebrow>
        <h2 className={`${SERIF} mt-4 text-[#0B1F3A] text-3xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.1]`}>
          <WordReveal text="Connect. Collaborate. Create. Grow." stagger={0.1} />
        </h2>
        <Reveal delay={0.2} className="mt-4">
          <p className="text-[15px] text-[#4F5963]">We bring people together through three essential pillars of better living.</p>
        </Reveal>

        <div className="mt-10 md:mt-12 grid grid-cols-1 lg:grid-cols-[minmax(0,560px)_1fr] gap-10 lg:gap-14">
          <div>
            <ParallaxImage
              src={Img}
              alt="Artisans crafting a carved wooden door in a courtyard home"
              className="h-[340px] sm:h-[440px] lg:h-[500px]"
              sizes="(min-width: 1024px) 560px, 100vw"
              reveal={false}
            />
            <Reveal delay={0.2} className="mt-8 md:mt-10">
              <p className="text-base font-semibold uppercase tracking-wide text-[#0B1F3A]">
                You belong. You are abundance.
              </p>
              <p className="mt-2 text-sm text-[#44474D]">Better Homes. Smarter Living. A Better Tomorrow.</p>
            </Reveal>
          </div>

          <div className="flex flex-col justify-start gap-8 md:gap-10 lg:pt-1">
            {pillars.map((p, i) => (
              <Reveal key={p.tag} delay={i * 0.15} x={30} y={20}>
                <div className="group border-l-2 border-transparent pl-0 transition-all duration-500 hover:border-[#E8C27A] hover:pl-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#336192]">{p.tag}</p>
                  <h3 className="mt-3 text-xl md:text-2xl font-medium text-[#171C22]">{p.title}</h3>
                  <p className="mt-3 text-sm md:text-[15px] leading-relaxed text-[#44474D] max-w-2xl">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default MindsetCommunity;