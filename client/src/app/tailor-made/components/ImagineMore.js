"use client";
import Link from "next/link";
import Image from "next/image";
import { Flower2, Clapperboard, BookOpen, SlidersHorizontal } from "lucide-react";
import { Container, Reveal, WordReveal, Eyebrow, SERIF, SANS } from "@/components/ui/Animations";
import { cloudinary } from "@/assets/Cloudinary";
const GymImg = cloudinary.tailorMade.styleOne;
const PoolImg = cloudinary.tailorMade.styleTwo;

const signature = [
  {
    img: GymImg,
    alt: "Rooftop gym with mountain views",
    label: "Lifestyle Architecture · Wellness Pavilions",
    title: "Rooftop Gym and Wellness Spaces",
    text: "Create space for your daily routine with a rooftop fitness area, yoga deck, or personal wellness corner.",
  },
  {
    img: PoolImg,
    alt: "Private rooftop swimming pool",
    label: "Private Leisure · Water Sanctuaries",
    title: "Private Swimming Pool",
    text: "Explore the possibility of a private pool or a dedicated leisure area designed around your lifestyle and available space.",
  },
];

const features = [
  {
    Icon: Flower2,
    title: "Terrace Garden and Outdoor Lounge",
    text: "Bring outdoor living into your home with a terrace garden, a relaxing lounge, or a thoughtfully planned open-air retreat.",
  },
  {
    Icon: Clapperboard,
    title: "Home Theatre and Entertainment Room",
    text: "Consider a dedicated space for movie nights, entertainment, and spending time with family and friends.",
  },
  {
    Icon: BookOpen,
    title: "Personalised Work and Hobby Spaces",
    text: "Make room for the things you love, whether that means a quiet workspace, a personal library, or a dedicated creative corner.",
  },
  {
    Icon: SlidersHorizontal,
    title: "Custom Interiors and Smart Living",
    text: "Discuss interior finishes, storage solutions, lighting preferences, and potential smart-home features that suit your requirements.",
  },
];

const ImagineMore = () => {
  return (
    <section className={`${SANS} w-full min-w-0 overflow-hidden bg-white py-12 md:py-16`}>
      <Container>
        <Eyebrow className="!text-[9px] !font-semibold !tracking-[0.15em]">Designed around your lifestyle</Eyebrow>
        <h2 className={`${SERIF} mt-3 text-[#0B1F3A] text-3xl md:text-4xl lg:text-5xl leading-[1.12]`}>
          <WordReveal text="Imagine More. Make It Yours." />
        </h2>
        <Reveal delay={0.2} className="mt-4 max-w-xl">
          <p className="text-sm leading-relaxed text-[#44474D]">
            Your home can be more than a collection of rooms. Think about the spaces, features, and experiences
            that would make it feel uniquely yours. Share your ideas with Abundance Group and explore what may
            be possible for your home.
          </p>
        </Reveal>

        {/* Signature amenities */}
        <div className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {signature.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.12} y={50}>
              <div className="group h-full border border-[#C9A55C66] bg-[#0B1F3A] p-4 sm:p-5">
                <div className="relative h-[240px] sm:h-[280px] lg:h-[300px] overflow-hidden">
                  <Image
                    src={s.img}
                    alt={s.alt}
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A99] via-transparent to-transparent" />
                  <p className="absolute bottom-3 left-3 text-[8px] font-semibold uppercase tracking-[0.15em] text-white">
                    {s.label}
                  </p>
                </div>
                <p className="mt-4 text-[8px] font-semibold uppercase tracking-[0.15em] text-[#7FA6D1]">Signature Amenity</p>
                <h3 className={`${SERIF} mt-1.5 text-xl text-[#E8A33D]`}>{s.title}</h3>
                <p className="mt-2 max-w-md text-xs leading-relaxed text-white/85">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Feature cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map(({ Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.1} y={40}>
              <div className="group h-full border border-[#F0DFB9] bg-white p-5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-28px_rgba(11,31,58,0.35)]">
                <span className="flex h-9 w-9 items-center justify-center bg-[#0B1F3A] text-white">
                  <Icon size={16} />
                </span>
                <h3 className="mt-5 text-[15px] font-medium leading-snug text-[#171C22]">{title}</h3>
                <p className="mt-2 text-[11px] leading-relaxed text-[#44474D]">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal y={20} className="mt-5">
          <p className="bg-[#E8EDF6] px-4 py-3 text-center text-[11px] leading-relaxed text-[#44474D]">
            <strong className="font-semibold text-[#171C22]">Feasibility Note:</strong> Custom features and
            amenities are subject to plot size, structural requirements, technical feasibility, applicable
            approvals, project scope, and budget.
          </p>
        </Reveal>

        {/* Bespoke CTA */}
        <Reveal y={30} className="mt-6">
          <div className="flex flex-col gap-6 bg-[#F7F8FD] px-6 py-8 shadow-[0_6px_24px_-18px_rgba(11,31,58,0.3)] md:flex-row md:items-center md:justify-between md:px-12 md:py-10">
            <div className="max-w-xl">
              <p className="text-[8px] font-semibold uppercase tracking-[0.15em] text-[#336192]">Bespoke Vision</p>
              <h3 className={`${SERIF} mt-2 text-2xl md:text-[28px] text-[#0B1F3A]`}>Have Something Special in Mind?</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#44474D]">
                Perhaps it is a rooftop gym, a private pool, a peaceful terrace garden, or a feature you have
                always imagined. Tell us what matters to you, and let’s explore the possibilities for your home.
              </p>
            </div>
            <Link
              href="#enquiry"
              className="shrink-0 bg-[#0B1F3A] px-7 py-4 text-center text-[10px] font-semibold uppercase tracking-[0.1em] text-white transition-colors duration-300 hover:bg-[#1B4B7F]"
            >
              Discuss your home requirements
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};

export default ImagineMore;