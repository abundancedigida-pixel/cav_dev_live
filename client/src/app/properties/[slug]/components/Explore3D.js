// "use client";
// import { useState } from "react";
// import Image from "next/image";
// import { RotateCcw, ZoomIn, ZoomOut, Sun, Box } from "lucide-react";
// import { Container, Reveal, WordReveal, SANS } from "@/components/ui/Animations";
// import { cloudinary } from "@/assets/Cloudinary";

// const modes = ["3D Exterior Model", "Interactive Floor Plan", "360° Interior Walkthrough"];
// const towers = ["Tower A", "Tower B", "Tower C"];
// const floors = ["Fl 04", "Fl 08", "Fl 14", "Fl 18"];

// // percent positions of the numbered hotspots over the image
// const hotspots = [
//   { n: "01", left: "26%", top: "9%" },
//   { n: "02", left: "54%", top: "35%" },
//   { n: "03", left: "72%", top: "55%" },
//   { n: "04", left: "98%", top: "46%" },
// ];

// const Explore3D = () => {
//   const [mode, setMode] = useState(modes[0]);
//   const [tower, setTower] = useState(towers[0]);
//   const [floor, setFloor] = useState(floors[1]);
//   const [spot, setSpot] = useState("03");
//   const [zoom, setZoom] = useState(1);

//   return (
//     <section className={`${SANS} w-full min-w-0 overflow-hidden bg-[#0B1F3A] py-16`}>
//       <Container>
//         <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
//           <div>
//             <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E8C27A]">Digital Twin Engine</p>
//             <h2 className="mt-4 font-light text-white tracking-[-0.02em] leading-[1.1] text-3xl md:text-4xl lg:text-5xl">
//               <WordReveal text="Explore the Property in 3D" />
//             </h2>
//           </div>
//           <div className="flex flex-wrap gap-1 bg-[#13294A] p-1.5">
//             {modes.map((m) => (
//               <button
//                 key={m}
//                 type="button"
//                 onClick={() => setMode(m)}
//                 className={`px-4 py-2.5 text-[10px] font-medium uppercase tracking-wide transition-colors duration-300 ${
//                   mode === m ? "bg-white text-[#0B1F3A]" : "text-white"
//                 }`}
//               >
//                 {m}
//               </button>
//             ))}
//           </div>
//         </div>

//         <Reveal y={40} className="mt-8">
//           <div className="relative h-[420px] sm:h-[520px] lg:h-[680px] overflow-hidden bg-[#13294A] shadow-[0_24px_60px_-30px_rgba(0,0,0,0.6)]">
//             <div className="absolute inset-0" style={{ transform: `scale(${zoom})`, transition: "transform 0.4s" }}>
//               <Image
//                 src={cloudinary.properties.hero}
//                 alt="Three residential towers — digital twin view"
//                 fill
//                 sizes="100vw"
//                 className="object-cover"
//               />
//             </div>

//             {/* Toolbar */}
//             <div className="absolute left-4 top-6 flex flex-col bg-[#0B1F3AE5] p-3 sm:left-6">
//               <button type="button" aria-label="Reset view" onClick={() => setZoom(1)} className="p-2.5 text-white">
//                 <RotateCcw size={15} />
//               </button>
//               <button type="button" aria-label="Zoom in" onClick={() => setZoom((z) => Math.min(z + 0.15, 1.6))} className="p-2.5 text-white">
//                 <ZoomIn size={15} />
//               </button>
//               <button type="button" aria-label="Zoom out" onClick={() => setZoom((z) => Math.max(z - 0.15, 1))} className="p-2.5 text-white">
//                 <ZoomOut size={15} />
//               </button>
//               <span className="my-1 block h-px bg-white/20" />
//               <button type="button" aria-label="Lighting" className="p-2.5 text-white">
//                 <Sun size={15} />
//               </button>
//             </div>

//             {/* Hotspots */}
//             {hotspots.map((h) => (
//               <button
//                 key={h.n}
//                 type="button"
//                 onClick={() => setSpot(h.n)}
//                 style={{ left: h.left, top: h.top }}
//                 className={`absolute flex h-9 w-9 items-center justify-center rounded-full border-2 border-white/60 text-xs font-bold ${
//                   spot === h.n ? "bg-[#FFDEA9] text-[#0B1F3A]" : "bg-[#336192] text-white"
//                 }`}
//               >
//                 {h.n}
//               </button>
//             ))}

//             {/* Selector panel */}
//             <div className="absolute right-3 top-3 w-[290px] max-w-[calc(100%-1.5rem)] bg-[#0B1F3AF2] p-3 sm:right-4 sm:top-4">
//               <p className="text-[9px] font-bold uppercase tracking-wide text-[#E8C27A]">Select Tower</p>
//               <div className="mt-2 grid grid-cols-3 gap-1">
//                 {towers.map((t) => (
//                   <button
//                     key={t}
//                     type="button"
//                     onClick={() => setTower(t)}
//                     className={`py-1.5 text-[11px] ${tower === t ? "bg-[#336192] text-white" : "bg-[#1B2E4B] text-white/80"}`}
//                   >
//                     {t}
//                   </button>
//                 ))}
//               </div>
//               <p className="mt-3 text-[9px] font-bold uppercase tracking-wide text-[#E8C27A]">Floor Elevation</p>
//               <div className="mt-2 grid grid-cols-4 gap-1">
//                 {floors.map((f) => (
//                   <button
//                     key={f}
//                     type="button"
//                     onClick={() => setFloor(f)}
//                     className={`py-1.5 text-[11px] ${floor === f ? "bg-[#336192] text-white" : "bg-[#1B2E4B] text-white/80"}`}
//                   >
//                     {f}
//                   </button>
//                 ))}
//               </div>
//               <p className="mt-3 text-[10px] leading-relaxed text-white/80">
//                 Coordinate: Lat 12.8715° N | Long 80.2268° E
//                 <br />
//                 Elevation: +62.5m AGL
//               </p>
//             </div>

//             {/* Bottom bar */}
//             <div className="absolute inset-x-3 bottom-3 flex flex-col gap-1 bg-[#0B1F3AD9] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:inset-x-4 sm:bottom-4">
//               <p className="flex items-center gap-2 text-xs text-white">
//                 <Box size={14} /> Drag cursor to pan. Scroll to zoom. Click numbers to inspect individual rooms.
//               </p>
//               <p className="text-[10px] font-bold uppercase tracking-wide text-[#E8C27A]">
//                 WebGL 2.0 • Ultra-Precision Mesh
//               </p>
//             </div>
//           </div>
//         </Reveal>
//       </Container>
//     </section>
//   );
// };

// export default Explore3D;












"use client";
import { useState } from "react";
import Image from "next/image";
import { RotateCcw, ZoomIn, ZoomOut, Sun, Box } from "lucide-react";
import { Container, Reveal, WordReveal, SANS } from "@/components/ui/Animations";
import { cloudinary } from "@/assets/Cloudinary";

const modes = ["3D Exterior Model", "Interactive Floor Plan", "360° Interior Walkthrough"];

const hotspots = [
  { n: "01", left: "26%", top: "9%" },
  { n: "02", left: "54%", top: "35%" },
  { n: "03", left: "72%", top: "55%" },
  { n: "04", left: "98%", top: "46%" },
];

const Explore3D = ({ property }) => {
  const [mode, setMode] = useState(modes[0]);
  const [spot, setSpot] = useState("03");
  const [zoom, setZoom] = useState(1);

  // Dynamic floors based on property.totalFloors
  const maxFloor = property?.totalFloors || 4;
  const floors = [
    `Fl 01`,
    `Fl 0${Math.max(2, Math.floor(maxFloor / 3))}`,
    `Fl 0${Math.max(3, Math.floor((maxFloor * 2) / 3))}`,
    `Fl ${String(maxFloor).padStart(2, "0")}`,
  ];
  const [floor, setFloor] = useState(floors[0]);

  const mainImg = property?.galleryImages?.[0]?.url || property?.featuredImage?.url || cloudinary.properties.hero;

  return (
    <section className={`${SANS} w-full min-w-0 overflow-hidden bg-[#0B1F3A] py-16`}>
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E8C27A]">Digital Twin Engine</p>
            <h2 className="mt-4 font-light text-white tracking-[-0.02em] leading-[1.1] text-3xl md:text-4xl lg:text-5xl">
              <WordReveal text="Explore the Property in 3D" />
            </h2>
          </div>
          <div className="flex flex-wrap gap-1 bg-[#13294A] p-1.5">
            {modes.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`px-4 py-2.5 text-[10px] font-medium uppercase tracking-wide transition-colors duration-300 ${
                  mode === m ? "bg-white text-[#0B1F3A]" : "text-white"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <Reveal y={40} className="mt-8">
          <div className="relative h-[420px] sm:h-[520px] lg:h-[680px] overflow-hidden bg-[#13294A] shadow-[0_24px_60px_-30px_rgba(0,0,0,0.6)]">
            <div className="absolute inset-0" style={{ transform: `scale(${zoom})`, transition: "transform 0.4s" }}>
              <Image
                src={mainImg}
                alt={`${property?.propertyName} digital twin`}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>

            {/* Toolbar */}
            <div className="absolute left-4 top-6 flex flex-col bg-[#0B1F3AE5] p-3 sm:left-6">
              <button type="button" aria-label="Reset view" onClick={() => setZoom(1)} className="p-2.5 text-white">
                <RotateCcw size={15} />
              </button>
              <button type="button" aria-label="Zoom in" onClick={() => setZoom((z) => Math.min(z + 0.15, 1.6))} className="p-2.5 text-white">
                <ZoomIn size={15} />
              </button>
              <button type="button" aria-label="Zoom out" onClick={() => setZoom((z) => Math.max(z - 0.15, 1))} className="p-2.5 text-white">
                <ZoomOut size={15} />
              </button>
              <span className="my-1 block h-px bg-white/20" />
              <button type="button" aria-label="Lighting" className="p-2.5 text-white">
                <Sun size={15} />
              </button>
            </div>

            {/* Hotspots */}
            {hotspots.map((h) => (
              <button
                key={h.n}
                type="button"
                onClick={() => setSpot(h.n)}
                style={{ left: h.left, top: h.top }}
                className={`absolute flex h-9 w-9 items-center justify-center rounded-full border-2 border-white/60 text-xs font-bold ${
                  spot === h.n ? "bg-[#FFDEA9] text-[#0B1F3A]" : "bg-[#336192] text-white"
                }`}
              >
                {h.n}
              </button>
            ))}

            {/* Selector panel */}
            <div className="absolute right-3 top-3 w-[290px] max-w-[calc(100%-1.5rem)] bg-[#0B1F3AF2] p-3 sm:right-4 sm:top-4">
              <p className="text-[9px] font-bold uppercase tracking-wide text-[#E8C27A]">Property Overview</p>
              <p className="mt-1 text-sm font-semibold text-white">{property?.propertyName}</p>
              <p className="text-xs text-white/80">{property?.propertyType} • {property?.developmentStatus}</p>

              <p className="mt-3 text-[9px] font-bold uppercase tracking-wide text-[#E8C27A]">Floor Elevation</p>
              <div className="mt-2 grid grid-cols-4 gap-1">
                {floors.map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFloor(f)}
                    className={`py-1.5 text-[11px] ${floor === f ? "bg-[#336192] text-white" : "bg-[#1B2E4B] text-white/80"}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-[10px] leading-relaxed text-white/80">
                {property?.latitude && property?.longitude ? (
                  <>Coordinate: Lat {property.latitude}° N | Long {property.longitude}° E</>
                ) : (
                  <>Location: {property?.location}</>
                )}
                <br />
                Total Floors: {property?.totalFloors ? `${property.totalFloors} Storeys` : "Independent"}
              </p>
            </div>

            {/* Bottom bar */}
            <div className="absolute inset-x-3 bottom-3 flex flex-col gap-1 bg-[#0B1F3AD9] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:inset-x-4 sm:bottom-4">
              <p className="flex items-center gap-2 text-xs text-white">
                <Box size={14} /> Drag cursor to pan. Scroll to zoom. Click numbers to inspect individual rooms.
              </p>
              <p className="text-[10px] font-bold uppercase tracking-wide text-[#E8C27A]">
                WebGL 2.0 • Ultra-Precision Mesh
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};

export default Explore3D;