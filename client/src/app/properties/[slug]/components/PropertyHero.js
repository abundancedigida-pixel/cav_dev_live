// "use client";
// import { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import {
//   Calendar,
//   Download,
//   PlusSquare,
//   Maximize,
//   Camera,
//   Rotate3d,
//   ArrowLeft,
//   ArrowRight,
// } from "lucide-react";
// import { Container, Reveal, SERIF, SANS } from "@/components/ui/Animations";
// import { cloudinary } from "@/assets/Cloudinary";

// const specs = [
//   { k: "Typology", v: "3 & 4 BHK", s: "Panoramic Terraces" },
//   { k: "Built-up Area", v: "1,850 – 2,450", s: "sq.ft. Super Area" },
//   { k: "Sanitary Suites", v: "3 to 4 En-Suite", s: "Kohler / Grohe Fit" },
//   { k: "Covered Parking", v: "2 Reserved Bays", s: "EV Charger Ready" },
//   { k: "Orientation", v: "East & North", s: "100% Vaastu Clear" },
// ];

// // TODO: replace captions with your final copy; `category` must match a tab label
// const gallery = [
//   { category: "Exterior & Facade", img: cloudinary.properties.hero, label: "Main Facade (Tower A)", tag: "Architectural Render 8K", title: "Monolithic Facade Composition", text: "Cantilevered volumes and deep verandas shaped around prevailing coastal breezes." },
//   { category: "Living & Dining", img: cloudinary.properties.hero, label: "Living & Dining Hall", tag: "Interior Render 8K", title: "Italian Marble Living Hall", text: "Book-matched marble floors with double-height volumes and continuous daylight." },
//   { category: "Private Balconies", img: cloudinary.properties.hero, label: "Sunset Terrace View (Tower A)", tag: "Architectural Render 8K", title: "Panoramic Double-Height Balconies", text: "Overlooking protected green belts and the Buckingham water corridor with acoustic tempered triple laminated glazing." },
//   { category: "Gourmet Kitchen", img: cloudinary.properties.hero, label: "Gourmet Kitchen", tag: "Interior Render 8K", title: "Granite & Steel Kitchen", text: "Piped gas, dedicated utility shafts and concealed storage." },
//   { category: "Clubhouse Amenities", img: cloudinary.properties.hero, label: "Lap Pool & Solarium", tag: "Amenity Render 8K", title: "25m Temperature-Regulated Pool", text: "Resort-grade leisure within the residential campus." },
//   { category: "Master Bedroom", img: cloudinary.properties.hero, label: "Master Bedroom Suite", tag: "Interior Render 8K", title: "Master Suite with Walk-In Wardrobe", text: "Acoustic isolation and private balcony access." },
//   { category: "Night Architecture", img: cloudinary.properties.hero, label: "Night Elevation", tag: "Architectural Render 8K", title: "Night Architecture", text: "Layered cove lighting across the tower elevation." },
//   { category: "Floor Plans", img: cloudinary.properties.hero, label: "Typical Floor Plan", tag: "CAD Scheme", title: "Typical Floor Plan", text: "Verified clear carpet measurements." },
// ];

// const categories = [
//   "Exterior & Facade",
//   "Living & Dining",
//   "Master Bedroom",
//   "Gourmet Kitchen",
//   "Private Balconies",
//   "Clubhouse Amenities",
//   "Night Architecture",
//   "Floor Plans",
// ];

// const PropertyHero = () => {
//   const [cat, setCat] = useState("All");
//   const [idx, setIdx] = useState(0);

//   const list = cat === "All" ? gallery : gallery.filter((g) => g.category === cat);
//   const current = list[idx] || list[0];

//   const go = (d) => setIdx((i) => (i + d + list.length) % list.length);
//   const pick = (c) => {
//     setCat(c);
//     setIdx(0);
//   };

//   return (
//     <section className={`${SANS} w-full min-w-0 overflow-hidden bg-white pt-16 pb-8`}>
//       <Container>
//         <p className="text-[9px] font-medium uppercase tracking-[0.15em] text-[#44474D]">
//           <Link href="/">Home</Link> &gt; <Link href="/properties">Properties</Link> &gt; Luxury Apartments &gt;{" "}
//           <span className="font-bold text-[#171C22]">The Aurelia Residences</span>
//         </p>

//         <div className="mt-6 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
//           <div>
//             <div className="flex flex-col items-start gap-2">
//               <span className="bg-[#0B1F3A] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-wide text-white">
//                 • Ready to Move (Immediate Handover)
//               </span>
//               <span className="bg-[#E8EEF6] px-3 py-1.5 text-[9px] font-medium tracking-wide text-[#44474D]">
//                 RERA Reg: TN/29/Building/0342/2021
//               </span>
//             </div>
//             <h1 className={`${SERIF} mt-3 text-[#171C22] text-3xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.1]`}>
//               Abundance Independence Home
//             </h1>
//             <p className="mt-3 max-w-xs text-lg text-[#1B4B7F]">Luxury 3 &amp; 4 BHK Apartments | OMR, Chennai</p>
//           </div>

//           <div className="flex flex-wrap gap-2">
//             <Link
//               href="#consultation"
//               className="inline-flex items-center gap-2 bg-[#0B1F3A] px-5 py-3.5 text-[10px] font-bold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-[#164A7A]"
//             >
//               <Calendar size={13} /> Schedule a Site Visit
//             </Link>
//             <button
//               type="button"
//               className="inline-flex items-center gap-2 bg-[#E8EEF6] px-5 py-3.5 text-[10px] font-bold uppercase tracking-wide text-[#0B1F3A]"
//             >
//               <Download size={13} /> Request Detailed Brochure (PDF)
//             </button>
//             <button
//               type="button"
//               className="inline-flex items-center gap-2 bg-[#EEF3FC] px-5 py-3.5 text-[10px] font-bold uppercase tracking-wide text-[#44474D]"
//             >
//               <PlusSquare size={13} /> Add to Compare
//             </button>
//           </div>
//         </div>

//         {/* Spec cards */}
//         <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
//           {specs.map((s, i) => (
//             <Reveal key={s.k} delay={i * 0.06} y={24}>
//               <div className="h-full bg-[#EEF3FC] p-4">
//                 <p className="text-[9px] font-semibold uppercase tracking-wide text-[#44474D]">{s.k}</p>
//                 <p className="mt-2 text-lg font-bold text-[#171C22]">{s.v}</p>
//                 <p className="mt-1 text-xs text-[#44474D]">{s.s}</p>
//               </div>
//             </Reveal>
//           ))}
//           <Reveal delay={0.36} y={24}>
//             <div className="h-full bg-[#0B1F3A] p-4">
//               <p className="text-[9px] font-semibold uppercase tracking-wide text-[#E8C27A]">Strict Carpet Rate</p>
//               <p className="mt-2 text-lg font-bold text-white">
//                 ₹8,500 <span className="text-xs font-normal">sq.ft.</span>
//               </p>
//               <p className="mt-1 text-xs text-white/80">All-inclusive Base Rate</p>
//             </div>
//           </Reveal>
//         </div>

//         {/* Gallery tabs */}
//         <div className="mt-8 flex gap-1 overflow-x-auto pb-1">
//           {["All", ...categories].map((c) => (
//             <button
//               key={c}
//               type="button"
//               onClick={() => pick(c)}
//               className={`shrink-0 px-5 py-2.5 text-[9px] font-medium uppercase tracking-wide transition-colors duration-300 ${
//                 cat === c ? "bg-[#0B1F3A] text-white" : "bg-white text-[#44474D]"
//               }`}
//             >
//               {c === "All" ? `All (${gallery.length})` : c}
//             </button>
//           ))}
//         </div>

//         {/* Main image */}
//         <div className="border-t-2 border-[#0B1F3A]">
//           <div className="relative h-[340px] sm:h-[460px] lg:h-[560px] overflow-hidden bg-[#0B1F3A]">
//             {current && (
//               <Image
//                 key={current.img}
//                 src={current.img}
//                 alt={current.title}
//                 fill
//                 priority
//                 sizes="100vw"
//                 className="object-cover"
//               />
//             )}
//             <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3AE6] via-[#0B1F3A00] to-[#0B1F3A00]" />

//             {current && (
//               <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4 sm:p-5">
//                 <div className="flex flex-wrap">
//                   <span className="bg-[#0B1F3AE5] px-3 py-2 text-[9px] font-medium uppercase tracking-wide text-white">
//                     {String(idx + 1).padStart(2, "0")} / {gallery.length}: {current.label}
//                   </span>
//                   <span className="inline-flex items-center gap-1.5 bg-[#E8EEF6] px-3 py-2 text-[9px] font-medium uppercase tracking-wide text-[#171C22]">
//                     <Camera size={12} /> {current.tag}
//                   </span>
//                 </div>
//                 <div className="flex">
//                   <button type="button" aria-label="Fullscreen" className="bg-white p-3 text-[#0B1F3A]">
//                     <Maximize size={14} />
//                   </button>
//                   <button
//                     type="button"
//                     className="inline-flex items-center gap-2 bg-[#0B1F3A] px-4 py-3 text-[9px] font-bold uppercase tracking-wide text-white"
//                   >
//                     <Rotate3d size={13} /> 360° Virtual Tour
//                   </button>
//                 </div>
//               </div>
//             )}

//             <button
//               type="button"
//               aria-label="Previous"
//               onClick={() => go(-1)}
//               className="absolute left-4 bottom-1/2 bg-white/80 p-3 text-[#0B1F3A] transition-colors hover:bg-white"
//             >
//               <ArrowLeft size={16} />
//             </button>
//             <button
//               type="button"
//               aria-label="Next"
//               onClick={() => go(1)}
//               className="absolute right-4 bottom-1/2 bg-white/80 p-3 text-[#0B1F3A] transition-colors hover:bg-white"
//             >
//               <ArrowRight size={16} />
//             </button>

//             {current && (
//               <div className="absolute bottom-4 left-4 right-4 sm:left-5">
//                 <p className="text-xl text-white">{current.title}</p>
//                 <p className="mt-1 max-w-2xl text-xs text-white/80">{current.text}</p>
//               </div>
//             )}
//           </div>

//           {/* Thumbnails */}
//           <div className="mt-1 flex gap-1 overflow-x-auto">
//             {list.map((g, i) => (
//               <button
//                 key={g.img + i}
//                 type="button"
//                 onClick={() => setIdx(i)}
//                 aria-label={g.title}
//                 className={`relative h-16 w-36 shrink-0 overflow-hidden ${
//                   i === idx ? "border-2 border-[#0B1F3A]" : "opacity-80"
//                 }`}
//               >
//                 <Image src={g.img} alt={g.title} fill sizes="144px" className="object-cover" />
//               </button>
//             ))}
//           </div>
//         </div>
//       </Container>
//     </section>
//   );
// };

// export default PropertyHero;






"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Download,
  PlusSquare,
  Maximize,
  Camera,
  Rotate3d,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { Container, Reveal, SERIF, SANS } from "@/components/ui/Animations";
import { cloudinary } from "@/assets/Cloudinary";

const PropertyHero = ({ property }) => {
  const [cat, setCat] = useState("All");
  const [idx, setIdx] = useState(0);

  // Combine featuredImage and galleryImages from backend
  const allImages = [];
  if (property?.featuredImage?.url) {
    allImages.push({
      category: "Exterior & Facade",
      img: property.featuredImage.url,
      label: property.propertyName,
      tag: "Main View",
      title: property.propertyName,
      text: property.tagline || property.description,
    });
  }

  if (property?.galleryImages?.length > 0) {
    property.galleryImages.forEach((imgObj, i) => {
      allImages.push({
        category: `Gallery 0${i + 1}`,
        img: imgObj.url,
        label: `${property.propertyName} - View 0${i + 1}`,
        tag: "Architectural View",
        title: `${property.propertyName} Gallery`,
        text: property.description || "Designed for spacious everyday family living.",
      });
    });
  }

  if (allImages.length === 0) {
    allImages.push({
      category: "Exterior & Facade",
      img: cloudinary.properties.hero,
      label: property?.propertyName || "Main Elevation",
      tag: "Render",
      title: property?.propertyName || "Property Elevation",
      text: property?.description || "Crafted for luxurious family living.",
    });
  }

  const categories = ["All", ...new Set(allImages.map((img) => img.category))];
  const list = cat === "All" ? allImages : allImages.filter((g) => g.category === cat);
  const current = list[idx] || list[0] || allImages[0];

  const go = (d) => setIdx((i) => (i + d + list.length) % list.length);
  const pick = (c) => {
    setCat(c);
    setIdx(0);
  };

  const specs = [
    { k: "Typology", v: property?.propertyType || "Luxury Home", s: "Master Planned" },
    {
      k: "Built-up Area",
      v: property?.builtUpArea ? `${property.builtUpArea.toLocaleString("en-IN")}` : "N/A",
      s: "sq.ft. Super Area",
    },
    {
      k: "Plot Area",
      v: property?.plotArea ? `${property.plotArea.toLocaleString("en-IN")}` : "N/A",
      s: "sq.ft. Plot Extent",
    },
    {
      k: "Total Floors",
      v: property?.totalFloors ? `${property.totalFloors} Floors` : "Independent",
      s: property?.inventoryPreset || "Private Layout",
    },
    { k: "Development", v: property?.developmentStatus || "Ready to Move", s: "Certified Quality" },
  ];

  return (
    <section className={`${SANS} w-full min-w-0 overflow-hidden bg-white pt-16 pb-8`}>
      <Container>
        <p className="text-[9px] font-medium uppercase tracking-[0.15em] text-[#44474D]">
          <Link href="/">Home</Link> &gt; <Link href="/properties">Properties</Link> &gt;{" "}
          {property?.propertyType} &gt;{" "}
          <span className="font-bold text-[#171C22]">{property?.propertyName}</span>
        </p>

        <div className="mt-6 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <div className="flex flex-col items-start gap-2">
              <span className="bg-[#0B1F3A] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-wide text-white">
                • {property?.developmentStatus}
              </span>
              <span className="bg-[#E8EEF6] px-3 py-1.5 text-[9px] font-medium tracking-wide text-[#44474D]">
                Verified Development: {property?.location}
              </span>
            </div>
            <h1 className={`${SERIF} mt-3 text-[#171C22] text-3xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.1]`}>
              {property?.propertyName}
            </h1>
            <p className="mt-3 max-w-lg text-lg text-[#1B4B7F]">
              {property?.tagline || property?.propertyType} | {property?.location}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href="#consultation"
              className="inline-flex items-center gap-2 bg-[#0B1F3A] px-5 py-3.5 text-[10px] font-bold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-[#164A7A]"
            >
              <Calendar size={13} /> Schedule a Site Visit
            </Link>
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 bg-[#E8EEF6] px-5 py-3.5 text-[10px] font-bold uppercase tracking-wide text-[#0B1F3A]"
            >
              <Download size={13} /> Request Brochure
            </Link>
            <button
              type="button"
              className="inline-flex items-center gap-2 bg-[#EEF3FC] px-5 py-3.5 text-[10px] font-bold uppercase tracking-wide text-[#44474D]"
            >
              <PlusSquare size={13} /> Compare
            </button>
          </div>
        </div>

        {/* Spec cards */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {specs.map((s, i) => (
            <Reveal key={s.k} delay={i * 0.06} y={24}>
              <div className="h-full bg-[#EEF3FC] p-4">
                <p className="text-[9px] font-semibold uppercase tracking-wide text-[#44474D]">{s.k}</p>
                <p className="mt-2 text-lg font-bold text-[#171C22]">{s.v}</p>
                <p className="mt-1 text-xs text-[#44474D]">{s.s}</p>
              </div>
            </Reveal>
          ))}
          <Reveal delay={0.36} y={24}>
            <div className="h-full bg-[#0B1F3A] p-4">
              <p className="text-[9px] font-semibold uppercase tracking-wide text-[#E8C27A]">Price / Sq.Ft.</p>
              <p className="mt-2 text-lg font-bold text-white">
                ₹{property?.pricePerSqft ? property.pricePerSqft.toLocaleString("en-IN") : "0"}{" "}
                <span className="text-xs font-normal">/ sq.ft.</span>
              </p>
              <p className="mt-1 text-xs text-white/80">Base Valuation</p>
            </div>
          </Reveal>
        </div>

        {/* Gallery tabs */}
        <div className="mt-8 flex gap-1 overflow-x-auto pb-1">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => pick(c)}
              className={`shrink-0 px-5 py-2.5 text-[9px] font-medium uppercase tracking-wide transition-colors duration-300 ${
                cat === c ? "bg-[#0B1F3A] text-white" : "bg-white text-[#44474D]"
              }`}
            >
              {c === "All" ? `All (${allImages.length})` : c}
            </button>
          ))}
        </div>

        {/* Main image */}
        <div className="border-t-2 border-[#0B1F3A]">
          <div className="relative h-[340px] sm:h-[460px] lg:h-[560px] overflow-hidden bg-[#0B1F3A]">
            {current && (
              <Image
                key={current.img}
                src={current.img}
                alt={current.title}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3AE6] via-[#0B1F3A00] to-[#0B1F3A00]" />

            {current && (
              <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4 sm:p-5">
                <div className="flex flex-wrap">
                  <span className="bg-[#0B1F3AE5] px-3 py-2 text-[9px] font-medium uppercase tracking-wide text-white">
                    {String(idx + 1).padStart(2, "0")} / {list.length}: {current.label}
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-[#E8EEF6] px-3 py-2 text-[9px] font-medium uppercase tracking-wide text-[#171C22]">
                    <Camera size={12} /> {current.tag}
                  </span>
                </div>
                <div className="flex">
                  <button type="button" aria-label="Fullscreen" className="bg-white p-3 text-[#0B1F3A]">
                    <Maximize size={14} />
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 bg-[#0B1F3A] px-4 py-3 text-[9px] font-bold uppercase tracking-wide text-white"
                  >
                    <Rotate3d size={13} /> 360° Virtual Tour
                  </button>
                </div>
              </div>
            )}

            <button
              type="button"
              aria-label="Previous"
              onClick={() => go(-1)}
              className="absolute left-4 bottom-1/2 bg-white/80 p-3 text-[#0B1F3A] transition-colors hover:bg-white"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => go(1)}
              className="absolute right-4 bottom-1/2 bg-white/80 p-3 text-[#0B1F3A] transition-colors hover:bg-white"
            >
              <ArrowRight size={16} />
            </button>

            {current && (
              <div className="absolute bottom-4 left-4 right-4 sm:left-5">
                <p className="text-xl text-white">{current.title}</p>
                <p className="mt-1 max-w-2xl text-xs text-white/80">{current.text}</p>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          <div className="mt-1 flex gap-1 overflow-x-auto">
            {list.map((g, i) => (
              <button
                key={g.img + i}
                type="button"
                onClick={() => setIdx(i)}
                aria-label={g.title}
                className={`relative h-16 w-36 shrink-0 overflow-hidden ${
                  i === idx ? "border-2 border-[#0B1F3A]" : "opacity-80"
                }`}
              >
                <Image src={g.img} alt={g.title} fill sizes="144px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default PropertyHero;