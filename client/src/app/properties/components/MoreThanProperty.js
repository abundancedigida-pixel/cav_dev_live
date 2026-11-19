"use client";
import { ClipboardList, Ruler, Truck, Banknote, Headset, Plane } from "lucide-react";
import { Container, Reveal, WordReveal, Eyebrow, SERIF, SANS } from "@/components/ui/Animations";

const features = [
  { Icon: ClipboardList, title: "Fully Furnished", text: "Move-in-ready homes designed for important family moments." },
  { Icon: Ruler, title: "Quality Precast", text: "Precision. Quality. Faster Execution. Consistent Standards." },
  { Icon: Truck, title: "Transparent Documentation", text: "Clear property and project documentation." },
  { Icon: Banknote, title: "Professional Support", text: "Guidance from property selection through handover." },
  { Icon: Headset, title: "Post-Handover Support", text: "Continued assistance after you receive your home." },
  { Icon: Plane, title: "Family-Focused Living", text: "Designed around comfort, convenience and long-term living." },
];

const MoreThanProperty = () => {
  return (
    <section className={`${SANS} w-full min-w-0 overflow-hidden bg-white py-16`}>
      <Container>
        <Eyebrow className="!text-[10px]">Built with quality precast construction.</Eyebrow>
        <h2 className={`${SERIF} mt-4 max-w-xl text-[#171C22] text-3xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.1]`}>
          <WordReveal text="More Than a Property. A Home Ready for Life." />
        </h2>
        <Reveal delay={0.2} className="mt-4 max-w-xl">
          <p className="text-[15px] leading-relaxed text-[#44474D]">
            Quality precast construction delivers precision, consistency and efficient execution, with high
            standards of durability and finish.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ Icon, title, text }, i) => (
            <Reveal key={title} delay={(i % 3) * 0.1} y={40}>
              <div className="group h-full min-h-[170px] border border-[#EDEBE4] bg-white p-5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-28px_rgba(11,31,58,0.35)]">
                <span className="flex h-9 w-9 items-center justify-center bg-[#C5A46D] text-white">
                  <Icon size={16} />
                </span>
                <h3 className="mt-5 text-lg font-medium text-[#171C22]">{title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-[#44474D]">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default MoreThanProperty;