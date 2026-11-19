// "use client";
// import { DoorOpen, Wind, Layers, VolumeX, PanelTop, Bot, Zap, Fingerprint } from "lucide-react";
// import { Container, Reveal, WordReveal, Eyebrow, SANS } from "@/components/ui/Animations";

// const features = [
//   { Icon: DoorOpen, title: "Double-Height Private Foyer", text: "Private vestibule landing with biometric entry vestibules separating core elevators from private home chambers." },
//   { Icon: Wind, title: "3-Sided Open Ventilation", text: "Zero wall sharing between master bedrooms. Exceptional acoustic isolation and continuous thermal comfort year-round." },
//   { Icon: Layers, title: "Italian Marble Living Floors", text: "Book-matched imported Statuario and Botticino marble laid across formal foyers, living halls, and dining galleries." },
//   { Icon: VolumeX, title: "Soundproof Acoustic Glazing", text: "Floor-to-ceiling heavy-duty double glazed Saint-Gobain acoustic glass attenuates exterior noise below 32 decibels." },
//   { Icon: PanelTop, title: "Expansive Cantilevered Decks", text: "Deep 6-foot projecting sun decks equipped with natural teak-finish composite timber and toughened glass railings." },
//   { Icon: Bot, title: "Pre-Wired Home Automation", text: "KNX protocol infrastructure pre-installed for automated lighting, motorized drapery, and HVAC zone temperature regulation." },
//   { Icon: Zap, title: "Dedicated EV Fast Charging", text: "7.4 kW individual metering provision allocated directly to each apartment's two reserved basement parking slots." },
//   { Icon: Fingerprint, title: "Multi-Tier Biometrics & CCTV", text: "Continuous 24/7 command center perimeter surveillance, automated license plate recognition, and video door telephony." },
// ];

// const ArchitecturalVision = () => {
//   return (
//     <section className={`${SANS} w-full min-w-0 overflow-hidden bg-[#F1F0EB] py-16`}>
//       <Container>
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
//           {/* Left */}
//           <div>
//             <Eyebrow className="!text-[10px]">The Architectural Vision</Eyebrow>
//             <h2 className="mt-5 max-w-md font-light text-[#171C22] tracking-[-0.02em] leading-[1.1] text-4xl lg:text-5xl">
//               <WordReveal text="Designed for the Way You Live." />
//             </h2>
//             <span className="mt-6 block h-1 w-16 bg-[#0B1F3A]" />
//             <Reveal delay={0.2} className="mt-6 max-w-xl">
//               <p className="text-lg leading-relaxed text-[#171C22]">
//                 Designed around light, natural ventilation, and everyday ease, Aurelia Residences brings
//                 together generous living proportions, thoughtful floor layouts, lush biophilic landscaping, and
//                 direct arterial access to Chennai’s premier IT and educational corridors.
//               </p>
//               <p className="mt-6 text-[15px] leading-[1.75] text-[#44474D]">
//                 Every apartment is engineered with a strict adherence to privacy: master suites share zero
//                 partition walls with neighboring residences. Oversized balconies serve as true extensions of
//                 the interior living space, cantilevered outward to welcome prevailing Bay of Bengal breezes
//                 while shielding interior glass from direct afternoon thermal load.
//               </p>
//             </Reveal>
//             <Reveal delay={0.3} y={24} className="mt-8 max-w-xl">
//               <div className="bg-[#E3E8F2] p-5">
//                 <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#44474D]">Principal Lead Architect</p>
//                 <p className="mt-2 text-xl font-medium text-[#171C22]">Studio Arch-Urban Consortium</p>
//                 <p className="mt-2 max-w-md text-xs italic leading-relaxed text-[#44474D]">
//                   &quot;A tribute to coastal modernist proportion where cross-ventilation dictates the structural
//                   grid.&quot;
//                 </p>
//               </div>
//             </Reveal>
//           </div>

//           {/* Right */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             {features.map(({ Icon, title, text }, i) => (
//               <Reveal key={title} delay={(i % 2) * 0.1} y={30}>
//                 <div className="h-full bg-white p-5 shadow-[0_2px_10px_-6px_rgba(11,31,58,0.2)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-28px_rgba(11,31,58,0.4)]">
//                   <Icon size={20} className="text-[#336192]" />
//                   <h3 className="mt-3 text-lg font-medium leading-snug text-[#171C22]">{title}</h3>
//                   <p className="mt-2 text-xs leading-relaxed text-[#44474D]">{text}</p>
//                 </div>
//               </Reveal>
//             ))}
//           </div>
//         </div>
//       </Container>
//     </section>
//   );
// };

// export default ArchitecturalVision;






"use client";
import { DoorOpen, Wind, Layers, VolumeX, PanelTop, Bot, Zap, Fingerprint } from "lucide-react";
import { Container, Reveal, WordReveal, Eyebrow, SANS } from "@/components/ui/Animations";

const defaultIcons = [DoorOpen, Wind, Layers, VolumeX, PanelTop, Bot, Zap, Fingerprint];

const ArchitecturalVision = ({ property }) => {
  // Use property.keyFeatures if available from backend
  const features =
    property?.keyFeatures && property.keyFeatures.length > 0
      ? property.keyFeatures.map((feat, i) => {
          const Icon = defaultIcons[i % defaultIcons.length];
          return {
            Icon,
            title: feat,
            text: `High-standard engineering specification implemented in ${property?.propertyName}.`,
          };
        })
      : [
          { Icon: DoorOpen, title: property?.propertyType, text: "Curated residential layout tailored for privacy and space." },
          { Icon: Wind, title: property?.developmentStatus, text: "Monitored execution adhering to precision timelines." },
          { Icon: Layers, title: `${property?.builtUpArea || 0} sq.ft. Built Area`, text: "Generous living proportions with continuous ventilation." },
          { Icon: VolumeX, title: `${property?.plotArea || 0} sq.ft. Plot Extent`, text: "Clear independent demarcated property footprint." },
        ];

  return (
    <section className={`${SANS} w-full min-w-0 overflow-hidden bg-[#F1F0EB] py-16`}>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Left */}
          <div>
            <Eyebrow className="!text-[10px]">The Architectural Vision</Eyebrow>
            <h2 className="mt-5 max-w-md font-light text-[#171C22] tracking-[-0.02em] leading-[1.1] text-4xl lg:text-5xl">
              <WordReveal text="Designed for the Way You Live." />
            </h2>
            <span className="mt-6 block h-1 w-16 bg-[#0B1F3A]" />
            <Reveal delay={0.2} className="mt-6 max-w-xl">
              <p className="text-lg leading-relaxed text-[#171C22]">
                Designed around light, natural ventilation, and everyday ease, {property?.propertyName} brings
                together generous living proportions, thoughtful floor layouts, and direct arterial access across {property?.location}.
              </p>
              <p className="mt-6 text-[15px] leading-[1.75] text-[#44474D]">
                {property?.description ||
                  "Every residence is engineered with strict adherence to privacy: oversized spaces serve as true extensions of the interior living space, welcoming prevailing coastal breezes."}
              </p>
            </Reveal>

            {/* Architectural Highlights from backend */}
            <Reveal delay={0.3} y={24} className="mt-8 max-w-xl">
              <div className="bg-[#E3E8F2] p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#44474D]">
                  Architectural Highlights
                </p>
                <div
                  className="mt-2 text-sm text-[#171C22] prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: property?.architecturalHighlights || property?.tagline || "Engineered with precision precast integrity and modern proportion.",
                  }}
                />
              </div>
            </Reveal>
          </div>

          {/* Right */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map(({ Icon, title, text }, i) => (
              <Reveal key={`${title}-${i}`} delay={(i % 2) * 0.1} y={30}>
                <div className="h-full bg-white p-5 shadow-[0_2px_10px_-6px_rgba(11,31,58,0.2)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-28px_rgba(11,31,58,0.4)]">
                  <Icon size={20} className="text-[#336192]" />
                  <h3 className="mt-3 text-lg font-medium leading-snug text-[#171C22] capitalize">{title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#44474D]">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ArchitecturalVision;