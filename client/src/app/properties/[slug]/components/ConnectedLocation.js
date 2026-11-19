// "use client";
// import Link from "next/link";
// import Image from "next/image";
// import { Navigation, GraduationCap, PlusSquare, Briefcase, TrainFront, Waves, Plane } from "lucide-react";
// import { Container, Reveal, WordReveal, Eyebrow, SANS } from "@/components/ui/Animations";
// import { cloudinary } from "@/assets/Cloudinary";

// const places = [
//   { Icon: GraduationCap, t: "American International School", s: "Top-tier IB curriculum accreditation", m: "4 mins" },
//   { Icon: PlusSquare, t: "Apollo Speciality Hospital", s: "24/7 Multi-speciality trauma & surgical center", m: "7 mins" },
//   { Icon: Briefcase, t: "World Trade Center & Tidel Park", s: "Chennai's high-tech executive business hubs", m: "8 mins" },
//   { Icon: TrainFront, t: "OMR Phase-II Metro Station", s: "Direct rapid transit to Chennai Central & Airport", m: "12 mins" },
//   { Icon: Waves, t: "ECR Beach & Lifestyle Boulevard", s: "Fine dining, coastal cafes & surf clubs", m: "20 mins" },
//   { Icon: Plane, t: "Chennai International Airport", s: "Seamless radial corridor via Pallavaram link", m: "35 mins" },
// ];

// const ConnectedLocation = () => {
//   return (
//     <section className={`${SANS} w-full min-w-0 overflow-hidden bg-white py-8`}>
//       <Container>
//         <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
//           <div>
//             <Eyebrow className="!text-[10px]">The Geographic Advantage</Eyebrow>
//             <h2 className="mt-4 max-w-xl font-light text-[#171C22] tracking-[-0.02em] leading-[1.1] text-3xl md:text-4xl lg:text-5xl">
//               <WordReveal text="Connected to What Matters | OMR Expressway" />
//             </h2>
//           </div>
//           <Reveal delay={0.2} className="shrink-0">
//             <Link
//               href="https://maps.google.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-flex items-center gap-2 bg-[#E8EEF6] px-5 py-3 text-[9px] font-bold uppercase tracking-wide text-[#171C22] transition-colors duration-300 hover:bg-[#D6E3FF]"
//             >
//               <Navigation size={12} /> Open in Google Maps / Get Driving Directions
//             </Link>
//           </Reveal>
//         </div>

//         <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6 items-start">
//           <Reveal y={40}>
//             <div className="relative h-[340px] sm:h-[420px] lg:h-[480px] overflow-hidden shadow-[0_10px_40px_-24px_rgba(11,31,58,0.35)]">
//               <Image
//                 src={cloudinary.properties.hero}
//                 alt="Map showing The Aurelia Residences on OMR Expressway, Chennai"
//                 fill
//                 sizes="(min-width: 1024px) 58vw, 100vw"
//                 className="object-cover"
//               />
//               <div className="absolute bottom-0 left-0 max-w-sm bg-white/95 p-4 sm:left-4 sm:bottom-4">
//                 <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#1B4B7F]">Geographic Anchor</p>
//                 <p className="mt-1 text-base font-medium text-[#171C22]">The Aurelia Residences</p>
//                 <p className="mt-1 text-[11px] leading-relaxed text-[#44474D]">
//                   Rajiv Gandhi Salai (OMR Expressway), Sholinganallur Junction Corridor, Chennai 600119
//                 </p>
//               </div>
//             </div>
//           </Reveal>

//           <div className="space-y-2.5">
//             {places.map(({ Icon, t, s, m }, i) => (
//               <Reveal key={t} delay={i * 0.06} y={20}>
//                 <div className="flex items-center justify-between gap-3 border border-[#F3ECDD] bg-white px-4 py-3">
//                   <div className="flex items-center gap-3">
//                     <Icon size={16} className="shrink-0 text-[#336192]" />
//                     <div>
//                       <p className="text-sm font-medium text-[#171C22]">{t}</p>
//                       <p className="mt-0.5 text-[10px] text-[#44474D]">{s}</p>
//                     </div>
//                   </div>
//                   <span className="shrink-0 bg-[#E8C27A] px-3 py-1.5 text-xs font-semibold text-[#171C22]">{m}</span>
//                 </div>
//               </Reveal>
//             ))}
//           </div>
//         </div>
//       </Container>
//     </section>
//   );
// };

// export default ConnectedLocation;

"use client";
import Link from "next/link";
// import Image from "next/image";
import {
  Navigation,
  GraduationCap,
  PlusSquare,
  Briefcase,
  TrainFront,
  Waves,
  Plane,
  MapPin,
} from "lucide-react";
import {
  Container,
  Reveal,
  WordReveal,
  Eyebrow,
  SANS,
} from "@/components/ui/Animations";
// import { cloudinary } from "@/assets/Cloudinary";

// Helper to assign appropriate Icon based on category
const getCategoryIcon = (category = "") => {
  const cat = category.toLowerCase();
  if (cat.includes("metro") || cat.includes("transit") || cat.includes("train"))
    return TrainFront;
  if (cat.includes("airport") || cat.includes("flight")) return Plane;
  if (cat.includes("hospital") || cat.includes("health")) return PlusSquare;
  if (
    cat.includes("school") ||
    cat.includes("college") ||
    cat.includes("education")
  )
    return GraduationCap;
  if (cat.includes("beach") || cat.includes("coast")) return Waves;
  if (cat.includes("it") || cat.includes("business") || cat.includes("park"))
    return Briefcase;
  return MapPin;
};

const ConnectedLocation = ({ property }) => {
  // const mapImg = property?.featuredImage?.url || cloudinary.properties.hero;

  // Google Maps link with exact latitude & longitude or location string
  const mapsUrl =
    property?.latitude && property?.longitude
      ? `https://www.google.com/maps/search/?api=1&query=${property.latitude},${property.longitude}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property?.location || "Chennai")}`;

  const nearbyPlaces = property?.nearbyPlaces || [];

  return (
    <section className={`${SANS} w-full min-w-0 overflow-hidden bg-white py-8`}>
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <Eyebrow className="!text-[10px]">The Geographic Advantage</Eyebrow>
            <h2 className="mt-4 max-w-xl font-light text-[#171C22] tracking-[-0.02em] leading-[1.1] text-3xl md:text-4xl lg:text-5xl">
              <WordReveal
                text={`Connected to What Matters | ${property?.location || "Strategic Corridor"}`}
              />
            </h2>
          </div>
          <Reveal delay={0.2} className="shrink-0">
            <Link
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#E8EEF6] px-5 py-3 text-[9px] font-bold uppercase tracking-wide text-[#171C22] transition-colors duration-300 hover:bg-[#D6E3FF]"
            >
              <Navigation size={12} /> Open in Google Maps / Get Driving
              Directions
            </Link>
          </Reveal>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6 items-start">
          <Reveal y={40}>
            <div className="relative h-[340px] sm:h-[420px] lg:h-[480px] overflow-hidden shadow-[0_10px_40px_-24px_rgba(11,31,58,0.35)] bg-[#E8EEF6]">
              <iframe
                title={`Map location for ${property?.propertyName}`}
                src={
                  property?.latitude && property?.longitude
                    ? `https://maps.google.com/maps?q=${property.latitude},${property.longitude}&hl=en&z=15&output=embed`
                    : `https://maps.google.com/maps?q=${encodeURIComponent(property?.location || "Chennai")}&hl=en&z=15&output=embed`
                }
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />

              <div className="absolute bottom-0 left-0 max-w-sm bg-white/95 p-4 sm:left-4 sm:bottom-4 pointer-events-auto shadow-md backdrop-blur-sm z-10">
                <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#1B4B7F]">
                  Geographic Anchor
                </p>
                <p className="mt-1 text-base font-medium text-[#171C22]">
                  {property?.propertyName}
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-[#44474D]">
                  {property?.location}
                </p>
                {property?.latitude && property?.longitude && (
                  <p className="mt-1 text-[9px] font-semibold text-[#1B4B7F]">
                    Coordinates: {property.latitude}° N, {property.longitude}° E
                  </p>
                )}
              </div>
            </div>
          </Reveal>

          <div className="space-y-2.5">
            {nearbyPlaces.length === 0 ? (
              <div className="border border-[#F3ECDD] bg-white p-5 text-center">
                <p className="text-sm font-medium text-[#171C22]">
                  Vicinity Landmarks
                </p>
                <p className="mt-1 text-xs text-[#44474D]">
                  Prime arterial connectivity across {property?.location}.
                </p>
              </div>
            ) : (
              nearbyPlaces.map((place, i) => {
                const Icon = getCategoryIcon(place.category);
                const timeText = place.travelMins
                  ? `${place.travelMins} mins`
                  : `${place.distanceKm || 0} km`;

                return (
                  <Reveal key={`${place.name}-${i}`} delay={i * 0.06} y={20}>
                    <div className="flex items-center justify-between gap-3 border border-[#F3ECDD] bg-white px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Icon size={16} className="shrink-0 text-[#336192]" />
                        <div>
                          <p className="text-sm font-medium text-[#171C22] capitalize">
                            {place.name}
                          </p>
                          <p className="mt-0.5 text-[10px] text-[#44474D]">
                            {place.category}{" "}
                            {place.distanceKm ? `• ${place.distanceKm} km` : ""}
                          </p>
                        </div>
                      </div>
                      <span className="shrink-0 bg-[#E8C27A] px-3 py-1.5 text-xs font-semibold text-[#171C22]">
                        {timeText}
                      </span>
                    </div>
                  </Reveal>
                );
              })
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ConnectedLocation;
