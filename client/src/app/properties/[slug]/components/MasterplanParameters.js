// "use client";
// import { Building2, CircleDot, Trees, Landmark, MoveVertical, Droplet, Zap, BadgeCheck } from "lucide-react";
// import { Container, Reveal, WordReveal, Eyebrow, SANS } from "@/components/ui/Animations";

// const params = [
//   { Icon: Building2, k: "Towers & Height", v: "3 Towers | 18 Floors", s: "Ground + 18 Upper Residential Storeys" },
//   { Icon: CircleDot, k: "Density Ratio", v: "144 Residences", s: "Low-density: Only 4 exclusive units per floor" },
//   { Icon: Trees, k: "Biophilic Coverage", v: "72% Green Space", s: "Landscaped courtyard gardens & water bodies" },
//   { Icon: Landmark, k: "Engineering", v: "RCC Shear Wall", s: "Monolithic German formwork seismic integrity" },
//   { Icon: MoveVertical, k: "Ceiling Volume", v: "10.5 ft. Clear Height", s: "Floor-to-soffit clearance across all rooms" },
//   { Icon: Droplet, k: "Water Infrastructure", v: "Dual RO + Municipal", s: "Continuous 24-hr pressure-regulated supply" },
//   { Icon: Zap, k: "Power Reliability", v: "100% DG Backup", s: "Automatic phase fail-over including AC points" },
//   { Icon: BadgeCheck, k: "Possession", v: "Ready to Move-In", s: "Occupancy Certificate (OC) received" },
// ];

// const MasterplanParameters = () => {
//   return (
//     <section className={`${SANS} w-full min-w-0 overflow-hidden bg-white py-16`}>
//       <Container>
//         <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
//           <div>
//             <Eyebrow className="!text-[10px]">Structural Vitality</Eyebrow>
//             <h2 className="mt-4 font-light text-[#171C22] tracking-[-0.02em] leading-[1.1] text-3xl md:text-4xl">
//               <WordReveal text="8 Verified Masterplan Parameters" />
//             </h2>
//           </div>
//           <Reveal delay={0.2} className="shrink-0">
//             <p className="max-w-sm text-xs leading-relaxed text-[#44474D]">
//               Strictly audited architectural specifications confirmed per statutory completion certificates and
//               structural engineering dossiers.
//             </p>
//           </Reveal>
//         </div>

//         <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           {params.map(({ Icon, k, v, s }, i) => (
//             <Reveal key={k} delay={(i % 4) * 0.08} y={30}>
//               <div className="h-full border border-[#F3ECDD] bg-white p-4 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-28px_rgba(11,31,58,0.35)]">
//                 <p className="flex items-center gap-2 text-[11px] font-bold tracking-wide text-[#1B4B7F]">
//                   <Icon size={16} /> {k}
//                 </p>
//                 <p className="mt-3 text-xl text-[#171C22]">{v}</p>
//                 <p className="mt-2 text-xs leading-relaxed text-[#44474D]">{s}</p>
//               </div>
//             </Reveal>
//           ))}
//         </div>
//       </Container>
//     </section>
//   );
// };

// export default MasterplanParameters;




"use client";
import { Building2, CircleDot, Trees, Landmark, MoveVertical, Droplet, Zap, BadgeCheck } from "lucide-react";
import { Container, Reveal, WordReveal, Eyebrow, SANS } from "@/components/ui/Animations";

const MasterplanParameters = ({ property }) => {
  const params = [
    {
      Icon: Building2,
      k: "Towers & Elevation",
      v: property?.totalFloors ? `${property.totalFloors} Residential Floors` : "Independent Structure",
      s: property?.inventoryPreset || "Configured Structure",
    },
    {
      Icon: CircleDot,
      k: "Built-up Extent",
      v: property?.builtUpArea ? `${property.builtUpArea.toLocaleString("en-IN")} sq.ft.` : "Spacious",
      s: "Clear Super Built-up area",
    },
    {
      Icon: Trees,
      k: "Plot Footprint",
      v: property?.plotArea ? `${property.plotArea.toLocaleString("en-IN")} sq.ft.` : "Exclusive Land",
      s: "Designated plot boundary",
    },
    {
      Icon: Landmark,
      k: "Valuation Specifier",
      v: `₹${property?.pricePerSqft?.toLocaleString("en-IN") || "0"} / sq.ft.`,
      s: "Transparent per-sq.ft. base rate",
    },
    {
      Icon: BadgeCheck,
      k: "Lifecycle & Possession",
      v: property?.developmentStatus || "Ready to Move",
      s: "Audited construction milestone",
    },
    {
      Icon: MoveVertical,
      k: "Typology",
      v: property?.propertyType || "Master Residence",
      s: "Approved architectural plan",
    },
    {
      Icon: Droplet,
      k: "Geographic Coordinates",
      v: property?.latitude && property?.longitude ? `${property.latitude}°, ${property.longitude}°` : property?.location,
      s: "Verified statutory mapping",
    },
    {
      Icon: Zap,
      k: "Power & Infrastructure",
      v: "100% Turnkey Backup",
      s: "Precast engineered standards",
    },
  ];

  return (
    <section className={`${SANS} w-full min-w-0 overflow-hidden bg-white py-16`}>
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <Eyebrow className="!text-[10px]">Structural Vitality</Eyebrow>
            <h2 className="mt-4 font-light text-[#171C22] tracking-[-0.02em] leading-[1.1] text-3xl md:text-4xl">
              <WordReveal text="8 Verified Masterplan Parameters" />
            </h2>
          </div>
          <Reveal delay={0.2} className="shrink-0">
            <p className="max-w-sm text-xs leading-relaxed text-[#44474D]">
              Strictly audited architectural specifications confirmed per statutory completion certificates and
              structural engineering dossiers for {property?.propertyName}.
            </p>
          </Reveal>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {params.map(({ Icon, k, v, s }, i) => (
            <Reveal key={k} delay={(i % 4) * 0.08} y={30}>
              <div className="h-full border border-[#F3ECDD] bg-white p-4 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-28px_rgba(11,31,58,0.35)]">
                <p className="flex items-center gap-2 text-[11px] font-bold tracking-wide text-[#1B4B7F]">
                  <Icon size={16} /> {k}
                </p>
                <p className="mt-3 text-xl text-[#171C22]">{v}</p>
                <p className="mt-2 text-xs leading-relaxed text-[#44474D]">{s}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default MasterplanParameters;