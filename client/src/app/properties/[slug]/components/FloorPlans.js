// "use client";
// import { useState } from "react";
// import Image from "next/image";
// import { FileDown } from "lucide-react";
// import { Container, Reveal, WordReveal, Eyebrow, SANS } from "@/components/ui/Animations";
// import { cloudinary } from "@/assets/Cloudinary";

// // TODO: add per-plan images (cloudinary.property.planB etc.) and room dimensions for B, C, D
// const plans = [
//   {
//     tab: "3 BHK - Type A (1,850 sq.ft.)",
//     name: "3 BHK - Type A",
//     scheme: "CAD Scheme: Type 3A-E",
//     img: cloudinary.properties.hero,
//     summary: "Carpet Area: 1,420 sq.ft. | Super Area: 1,850 sq.ft. (76.7% Efficiency)",
//     rooms: [
//       { k: "Private Foyer", v: `6'0" x 8'6"` },
//       { k: "Living & Dining Hall", v: `24'0" x 16'6"` },
//       { k: "Master Bedroom Suite", note: `With walk-in wardrobe (8'0" x 7'6")`, v: `15'0" x 18'0"` },
//       { k: "Bedroom 2 (Guest Suite)", v: `13'6" x 14'0"` },
//       { k: "Bedroom 3 (Kids Suite)", v: `12'0" x 13'0"` },
//       { k: "Cantilevered Sun Deck", v: `18'0" x 6'0"` },
//       { k: "Kitchen & Dry Utility", v: `12'0" x 10'0" + 8'0" x 5'0"` },
//     ],
//   },
//   { tab: "3 BHK - Type B (2,050 sq.ft.)", name: "3 BHK - Type B", scheme: "CAD Scheme: Type 3B", img: cloudinary.properties.hero, summary: "Super Area: 2,050 sq.ft.", rooms: [] },
//   { tab: "4 BHK Signature (2,450 sq.ft.)", name: "4 BHK Signature", scheme: "CAD Scheme: Type 4S", img: cloudinary.properties.hero, summary: "Super Area: 2,450 sq.ft.", rooms: [] },
//   { tab: "4 BHK Penthouse (3,200 sq.ft.)", name: "4 BHK Penthouse", scheme: "CAD Scheme: Type 4P", img: cloudinary.properties.hero, summary: "Super Area: 3,200 sq.ft.", rooms: [] },
// ];

// const FloorPlans = () => {
//   const [active, setActive] = useState(0);
//   const p = plans[active];

//   return (
//     <section className={`${SANS} w-full min-w-0 overflow-hidden bg-white py-16`}>
//       <Container>
//         <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
//           <div>
//             <Eyebrow className="!text-[10px]">Precision Schematics</Eyebrow>
//             <h2 className="mt-4 font-light text-[#171C22] tracking-[-0.02em] leading-[1.1] text-3xl md:text-4xl lg:text-5xl">
//               <WordReveal text="Architectural Floor Plans & Layouts" />
//             </h2>
//           </div>
//           <Reveal delay={0.2} className="shrink-0">
//             <p className="max-w-xs text-xs leading-relaxed text-[#44474D]">
//               Crafted to optimize natural illumination and airflow corridors. All dimensions are verified clear
//               carpet measurements.
//             </p>
//           </Reveal>
//         </div>

//         <div className="mt-6 flex flex-wrap gap-1">
//           {plans.map((pl, i) => (
//             <button
//               key={pl.tab}
//               type="button"
//               onClick={() => setActive(i)}
//               className={`px-5 py-3 text-[10px] font-medium uppercase tracking-wide transition-colors duration-300 ${
//                 active === i ? "bg-[#000615] text-white" : "bg-[#E8EEF6] text-[#44474D]"
//               }`}
//             >
//               {pl.tab}
//             </button>
//           ))}
//         </div>

//         <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-8 lg:gap-12 items-start">
//           <Reveal y={40}>
//             <div className="bg-white p-3 shadow-[0_10px_40px_-24px_rgba(11,31,58,0.35)]">
//               <div className="relative h-[320px] sm:h-[460px] lg:h-[540px] overflow-hidden">
//                 <Image
//                   key={p.name}
//                   src={p.img}
//                   alt={`${p.name} floor plan`}
//                   fill
//                   sizes="(min-width: 1024px) 58vw, 100vw"
//                   className="object-cover"
//                 />
//                 <span className="absolute left-3 top-3 bg-[#000615] px-3 py-2 text-[10px] font-medium uppercase tracking-wide text-white">
//                   {p.scheme}
//                 </span>
//                 <span className="absolute bottom-3 right-3 text-[11px] text-[#44474D]">Scale 1:100 @ A3 Metric</span>
//               </div>
//             </div>
//           </Reveal>

//           <Reveal y={40} delay={0.12}>
//             <div className="lg:pt-10">
//               <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#1B4B7F]">Selected Layout Metrics</p>
//               <h3 className="mt-3 text-2xl text-[#171C22]">{p.name}</h3>
//               <p className="mt-1 border-b border-[#EDEBE4] pb-4 text-xs text-[#44474D]">{p.summary}</p>

//               {p.rooms.length ? (
//                 <div>
//                   {p.rooms.map((r) => (
//                     <div key={r.k} className="flex items-center justify-between gap-4 border-b border-[#EDEBE4] py-3.5">
//                       <div>
//                         <p className="text-sm text-[#171C22]">{r.k}</p>
//                         {r.note && <p className="mt-0.5 text-[11px] text-[#44474D]">{r.note}</p>}
//                       </div>
//                       <p className="text-right text-sm font-bold text-[#171C22]">{r.v}</p>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="py-6 text-sm text-[#44474D]">Detailed room dimensions are available on request.</p>
//               )}

//               <button
//                 type="button"
//                 className="mt-6 flex w-full items-center justify-center gap-2 bg-[#0B1F3A] px-6 py-4 text-[10px] font-bold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-[#164A7A]"
//               >
//                 <FileDown size={14} /> Download Architectural CAD / PDF Floor Plan
//               </button>
//             </div>
//           </Reveal>
//         </div>
//       </Container>
//     </section>
//   );
// };

// export default FloorPlans;










"use client";
import { useState } from "react";
import Image from "next/image";
import { FileDown } from "lucide-react";
import { Container, Reveal, WordReveal, Eyebrow, SANS } from "@/components/ui/Animations";
import { cloudinary } from "@/assets/Cloudinary";

const FloorPlans = ({ property }) => {
  const [active, setActive] = useState(0);

  const planImg = property?.galleryImages?.[1]?.url || property?.featuredImage?.url || cloudinary.properties.hero;
  const builtUp = property?.builtUpArea ? `${property.builtUpArea.toLocaleString("en-IN")} sq.ft.` : "Spacious Layout";
  const pType = property?.propertyType || "Master Residence";

  const plans = [
    {
      tab: `${pType} (${builtUp})`,
      name: `${property?.propertyName} — Layout Schematic`,
      scheme: `CAD Scheme: Type 1A`,
      img: planImg,
      summary: `Super Built-up Area: ${builtUp} | Plot Extent: ${property?.plotArea ? property.plotArea.toLocaleString("en-IN") + " sq.ft." : "N/A"}`,
      rooms: [
        { k: "Living & Formal Lounge", v: `Spacious Open Plan` },
        { k: "Master Bedroom Suite", note: `Integrated wardrobe clearance`, v: `Master Proportions` },
        { k: "Bedrooms & Guest Chambers", v: `Well-Ventilated Suites` },
        { k: "Kitchen & Utility Gallery", v: `Modern Plumbing Shafts` },
        { k: "Balcony / Deck Corridor", v: `Deep Verandas` },
      ],
    },
    {
      tab: `Upper Floor Orientation`,
      name: `${property?.propertyName} — Upper Elevation`,
      scheme: `CAD Scheme: Type 2B`,
      img: planImg,
      summary: `Configured Area: ${builtUp}`,
      rooms: [],
    },
  ];

  const p = plans[active] || plans[0];

  return (
    <section className={`${SANS} w-full min-w-0 overflow-hidden bg-white py-16`}>
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <Eyebrow className="!text-[10px]">Precision Schematics</Eyebrow>
            <h2 className="mt-4 font-light text-[#171C22] tracking-[-0.02em] leading-[1.1] text-3xl md:text-4xl lg:text-5xl">
              <WordReveal text="Architectural Floor Plans & Layouts" />
            </h2>
          </div>
          <Reveal delay={0.2} className="shrink-0">
            <p className="max-w-xs text-xs leading-relaxed text-[#44474D]">
              Crafted to optimize natural illumination and airflow corridors for {property?.propertyName}.
            </p>
          </Reveal>
        </div>

        <div className="mt-6 flex flex-wrap gap-1">
          {plans.map((pl, i) => (
            <button
              key={pl.tab}
              type="button"
              onClick={() => setActive(i)}
              className={`px-5 py-3 text-[10px] font-medium uppercase tracking-wide transition-colors duration-300 ${
                active === i ? "bg-[#000615] text-white" : "bg-[#E8EEF6] text-[#44474D]"
              }`}
            >
              {pl.tab}
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-8 lg:gap-12 items-start">
          <Reveal y={40}>
            <div className="bg-white p-3 shadow-[0_10px_40px_-24px_rgba(11,31,58,0.35)]">
              <div className="relative h-[320px] sm:h-[460px] lg:h-[540px] overflow-hidden">
                <Image
                  key={p.name}
                  src={p.img}
                  alt={`${p.name} floor plan`}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover"
                />
                <span className="absolute left-3 top-3 bg-[#000615] px-3 py-2 text-[10px] font-medium uppercase tracking-wide text-white">
                  {p.scheme}
                </span>
                <span className="absolute bottom-3 right-3 text-[11px] text-[#44474D]">Scale 1:100 Metric</span>
              </div>
            </div>
          </Reveal>

          <Reveal y={40} delay={0.12}>
            <div className="lg:pt-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#1B4B7F]">Selected Layout Metrics</p>
              <h3 className="mt-3 text-2xl text-[#171C22]">{p.name}</h3>
              <p className="mt-1 border-b border-[#EDEBE4] pb-4 text-xs text-[#44474D]">{p.summary}</p>

              {p.rooms.length ? (
                <div>
                  {p.rooms.map((r) => (
                    <div key={r.k} className="flex items-center justify-between gap-4 border-b border-[#EDEBE4] py-3.5">
                      <div>
                        <p className="text-sm text-[#171C22]">{r.k}</p>
                        {r.note && <p className="mt-0.5 text-[11px] text-[#44474D]">{r.note}</p>}
                      </div>
                      <p className="text-right text-sm font-bold text-[#171C22]">{r.v}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="py-6 text-sm text-[#44474D]">Detailed room dimensions are available on consultation request.</p>
              )}

              <button
                type="button"
                className="mt-6 flex w-full items-center justify-center gap-2 bg-[#0B1F3A] px-6 py-4 text-[10px] font-bold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-[#164A7A]"
              >
                <FileDown size={14} /> Download Architectural CAD / PDF Floor Plan
              </button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
};

export default FloorPlans;