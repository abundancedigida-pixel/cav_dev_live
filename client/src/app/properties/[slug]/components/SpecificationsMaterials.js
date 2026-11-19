// "use client";
// import { Building2, LayoutGrid, ShowerHead, DoorOpen, CookingPot, PlugZap } from "lucide-react";
// import { Container, Reveal, WordReveal, Eyebrow, SANS } from "@/components/ui/Animations";

// const specs = [
//   {
//     Icon: Building2,
//     title: "Structural Framework",
//     text: "RCC Framed shear-wall monolithic structure designed strictly compliant with Seismic Zone III provisions. High-grade Fe 550D TMT reinforcement with ready-mix concrete manufactured under strict laboratory testing.",
//   },
//   {
//     Icon: LayoutGrid,
//     title: "Flooring Finishes",
//     text: "Living, Dining, and Foyer finished with imported Italian marble. Bedrooms utilize premium 800x1600mm Glazed Vitrified Tiles (GVT). Master Bedroom suites feature German engineered hardwood timber planks with acoustic underlayment.",
//   },
//   {
//     Icon: ShowerHead,
//     title: "Sanitary & CP Fittings",
//     text: "Concealed thermostatic diverters and rain showers by Kohler / Grohe. Wall-hung rimless water closets with soft-close seats and Geberit concealed cisterns. Toughened glass partition cubicles in all en-suite baths.",
//   },
//   {
//     Icon: DoorOpen,
//     title: "Doors & Windows",
//     text: "Main entrance door stands 8ft high with a solid seasoned Burma teakwood frame and designer shutter with Yale biometric lock. Windows utilize Fenesta heavy-duty multi-chambered acoustic UPVC frames with 8mm tempered low-E glass.",
//   },
//   {
//     Icon: CookingPot,
//     title: "Kitchen & Utility",
//     text: "Black Galaxy 20mm granite counter platform with bevelled edging. Franke satin finish stainless steel double sink with pull-out vegetable spray. Centralized piped gas connectivity and dedicated washing machine and dishwater utility shafts.",
//   },
//   {
//     Icon: PlugZap,
//     title: "Electrical & EV Provisions",
//     text: "Schneider Electric modular switchboards with flame-retardant low-smoke (FRLS) copper wiring. Three-phase power supply with separate digital energy sub-metering. Dedicated EV charging high-load cabling pre-run to both car bays.",
//   },
// ];

// const SpecificationsMaterials = () => {
//   return (
//     <section className={`${SANS} w-full min-w-0 overflow-hidden bg-white py-14 pt-6`}>
//       <Container>
//         <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
//           <div>
//             <Eyebrow className="!text-[10px]">Uncompromising Craftsmanship</Eyebrow>
//             <h2 className="mt-4 font-light text-[#171C22] tracking-[-0.02em] leading-[1.1] text-3xl md:text-4xl lg:text-5xl">
//               <WordReveal text="Specifications & Material Quality" />
//             </h2>
//           </div>
//           <Reveal delay={0.2} className="shrink-0">
//             <p className="max-w-xs text-[11px] leading-relaxed text-[#44474D]">
//               We partner exclusively with globally recognized Grade-A manufacturers to guarantee zero degradation
//               over generations.
//             </p>
//           </Reveal>
//         </div>

//         <div className="mt-8 border-t border-[#EDEBE4]">
//           {specs.map(({ Icon, title, text }, i) => (
//             <Reveal key={title} delay={i * 0.06} y={24}>
//               <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-8 border-b border-[#EDEBE4] py-5">
//                 <h3 className="flex items-center gap-2 text-base font-semibold text-[#336192] lg:col-span-1">
//                   <Icon size={15} /> {title}
//                 </h3>
//                 <p className="max-w-3xl text-xs leading-[1.8] text-[#44474D] lg:col-span-2">{text}</p>
//               </div>
//             </Reveal>
//           ))}
//         </div>
//       </Container>
//     </section>
//   );
// };

// export default SpecificationsMaterials;





"use client";
import { Building2, LayoutGrid, ShowerHead, DoorOpen, CookingPot, PlugZap } from "lucide-react";
import { Container, Reveal, WordReveal, Eyebrow, SANS } from "@/components/ui/Animations";

const specs = [
  {
    Icon: Building2,
    title: "Structural Framework",
    text: "Monolithic precast and RCC shear-wall structure designed compliant with Seismic Zone standards. High-grade Fe 550D TMT reinforcement manufactured under strict quality audits.",
  },
  {
    Icon: LayoutGrid,
    title: "Flooring Finishes",
    text: "Formal foyers, living and dining areas finished with premium imported marble and high-end vitrified tiles. Bedrooms feature engineered timber planks with acoustic underlayment.",
  },
  {
    Icon: ShowerHead,
    title: "Sanitary & CP Fittings",
    text: "Concealed thermostatic diverters and rain showers by Kohler / Grohe. Wall-hung rimless water closets with soft-close seats and concealed cisterns across all master suites.",
  },
  {
    Icon: DoorOpen,
    title: "Doors & Windows",
    text: "Solid seasoned teakwood main entrance door with smart biometric Yale access. Heavy-duty multi-chambered acoustic UPVC frames with tempered low-E glass windows.",
  },
  {
    Icon: CookingPot,
    title: "Kitchen & Utility",
    text: "Granite counter platform with bevelled edging and Franke stainless steel double sink. Centralized utility lines and dedicated washing machine and dishwater shafts.",
  },
  {
    Icon: PlugZap,
    title: "Electrical & EV Provisions",
    text: "Schneider Electric modular switches with flame-retardant low-smoke copper wiring. Three-phase power supply with separate digital sub-metering and pre-wired EV charging points.",
  },
];

const SpecificationsMaterials = ({ property }) => {
  return (
    <section className={`${SANS} w-full min-w-0 overflow-hidden bg-white py-14 pt-6`}>
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <Eyebrow className="!text-[10px]">Uncompromising Craftsmanship</Eyebrow>
            <h2 className="mt-4 font-light text-[#171C22] tracking-[-0.02em] leading-[1.1] text-3xl md:text-4xl lg:text-5xl">
              <WordReveal text="Specifications & Material Quality" />
            </h2>
          </div>
          <Reveal delay={0.2} className="shrink-0">
            <p className="max-w-xs text-[11px] leading-relaxed text-[#44474D]">
              We partner exclusively with globally recognized Grade-A manufacturers to guarantee zero degradation
              across {property?.propertyName}.
            </p>
          </Reveal>
        </div>

        <div className="mt-8 border-t border-[#EDEBE4]">
          {specs.map(({ Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.06} y={24}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-8 border-b border-[#EDEBE4] py-5">
                <h3 className="flex items-center gap-2 text-base font-semibold text-[#336192] lg:col-span-1">
                  <Icon size={15} /> {title}
                </h3>
                <p className="max-w-3xl text-xs leading-[1.8] text-[#44474D] lg:col-span-2">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default SpecificationsMaterials;