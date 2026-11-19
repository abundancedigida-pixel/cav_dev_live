"use client";
import { Container, Reveal, WordReveal, ParallaxImage, SERIF, SANS } from "@/components/ui/Animations";
import { cloudinary } from "@/assets/Cloudinary";
const IMG = cloudinary.contactUs.hero;

const ContactHero = () => {
  return (
    <section className={`${SANS} w-full min-w-0 overflow-hidden bg-white pt-10 pb-12 md:pt-12 md:pb-16`}>
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div className="max-w-2xl">
            <Reveal y={16}>
              <span className="inline-flex items-center gap-1.5 bg-[#E8EEF6] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#0B1F3A]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#1B4B7F]" />
                Get in touch
              </span>
            </Reveal>
            <h1 className={`${SERIF} mt-4 text-[#0B1F3A] text-3xl sm:text-4xl md:text-5xl leading-[1.12]`}>
              <WordReveal text="Let’s Talk About What You’re Looking For." />
            </h1>
            <Reveal delay={0.3} className="mt-5">
              <p className="max-w-xl text-[15px] leading-[1.75] text-[#44474D]">
                Whether you’re exploring a signature estate, commissioning a tailor-made family residence,
                or considering our precision precast solutions, our partners and senior directors are at
                your service.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.4} y={30} className="lg:mb-2 shrink-0">
            <div className="w-full sm:w-[300px] bg-[#171C22] px-5 py-5">
              <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-white">Direct Advisory Line</p>
              <a
                href="tel:+914448501200"
                className="mt-2 block text-xl font-medium text-[#E8A33D] transition-colors hover:text-[#FFDEA9]"
              >
                +91 44 4850 1200
              </a>
              <p className="mt-2 text-[13px] text-white">Mon–Sat, 09:30 – 19:00 IST</p>
            </div>
          </Reveal>
        </div>

        <div className="relative mt-10 md:mt-12">
          <ParallaxImage
            src={IMG}
            alt="Private courtyard with plunge pool and landscaped garden"
            className="h-[240px] sm:h-[300px] lg:h-[320px] w-full"
            strength={7}
            sizes="100vw"
            reveal={false}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B1F3ACC] via-[#0B1F3A00] to-[#0B1F3A00]" />
          <Reveal delay={0.5} y={20} className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6">
            <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-white">Private Sanctuary Enclave</p>
            <p className={`${SERIF} mt-1.5 text-lg sm:text-2xl text-white`}>
              Bespoke Architecture Engineered for Centuries.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
};

export default ContactHero;