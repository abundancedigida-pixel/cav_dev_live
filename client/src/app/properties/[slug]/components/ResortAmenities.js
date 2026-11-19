// "use client";
// import Image from "next/image";
// import {
//   Waves, Dumbbell, Flower2, Droplets,
//   Martini, PartyPopper, Trophy, Clapperboard,
//   Baby, Footprints, PawPrint, Sprout,
//   SunMedium, CloudRain, ShieldCheck, Flame,
// } from "lucide-react";
// import { Container, Reveal, WordReveal, Eyebrow, SANS } from "@/components/ui/Animations";
// import { cloudinary } from "@/assets/Cloudinary";

// const categories = [
//   {
//     n: "01",
//     img: cloudinary.properties.hero,
//     title: "Lifestyle & Wellness",
//     text: "Holistic health sanctuaries dedicated to restorative physical and mental equilibrium.",
//     items: [
//       { Icon: Waves, t: "25m Temperature-Regulated Lap Pool & Solarium" },
//       { Icon: Dumbbell, t: "Technogym® Biostrength Equipped Fitness Suite" },
//       { Icon: Flower2, t: "Acoustically Treated Zen Yoga & Pilates Studio" },
//       { Icon: Droplets, t: "Private Hydrotherapy Spa & Herbal Steam Pavilions" },
//     ],
//   },
//   {
//     n: "02",
//     img: cloudinary.properties.hero,
//     title: "Community & Leisure",
//     text: "Cultivated spaces for intimate gatherings, celebrations, and recreational competition.",
//     items: [
//       { Icon: Martini, t: "Panoramic Aurelia Sky Lounge at 18th Floor" },
//       { Icon: PartyPopper, t: "Double-Height Grand Banquet Hall with Pre-Function Lawn" },
//       { Icon: Trophy, t: "Hardwood Indoor Squash Court (WSF Specification)" },
//       { Icon: Clapperboard, t: "Dolby Atmos Private Screening Cinema (16 Velvet Loungers)" },
//     ],
//   },
//   {
//     n: "03",
//     img: cloudinary.properties.hero,
//     title: "Family & Multi-Gen Living",
//     text: "Safe and engaging dedicated zones designed for toddlers, elders, and domestic pets.",
//     items: [
//       { Icon: Baby, t: "Montessori-Inspired Indoor Learning & Play Zone" },
//       { Icon: Footprints, t: "Senior Citizens' Shaded Reflexology Path & Pergola" },
//       { Icon: PawPrint, t: "Enclosed Pet Agility Green & Grooming Station" },
//       { Icon: Sprout, t: "Zero-Depth Aerated Splash Park for Toddlers" },
//     ],
//   },
//   {
//     n: "04",
//     img: cloudinary.properties.hero,
//     title: "Security & Green Utilities",
//     text: "High-reliability civic systems operating sustainably and uninterrupted 365 days a year.",
//     items: [
//       { Icon: SunMedium, t: "100% Solar-Powered Common Area Lighting Array" },
//       { Icon: CloudRain, t: "Multi-Stage Rainwater Harvesting & Greywater Recycling" },
//       { Icon: ShieldCheck, t: "3-Tier RFID Boom Barriers & Integrated ANPR Entry" },
//       { Icon: Flame, t: "NFPA Compliant Automated Sprinklers & Smoke Exhaust Shafts" },
//     ],
//   },
// ];

// const ResortAmenities = () => {
//   return (
//     <section className={`${SANS} w-full min-w-0 overflow-hidden bg-white py-16`}>
//       <Container>
//         <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
//           <Eyebrow className="!text-[10px]">Curated Living Environment</Eyebrow>
//           <h2 className="mt-3 font-light text-[#171C22] tracking-[-0.02em] leading-[1.1] text-3xl md:text-4xl lg:text-5xl">
//             <WordReveal text="Resort-Grade Amenities" />
//           </h2>
//           <Reveal delay={0.2} className="mt-3">
//             <p className="text-xs leading-relaxed text-[#44474D]">
//               Engineered for serenity and connection. Over 30,000 sq.ft. of indoor and outdoor facilities
//               programmed for multi-generational recreation.
//             </p>
//           </Reveal>
//         </div>

//         <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
//           {categories.map((c, i) => (
//             <Reveal key={c.title} delay={(i % 2) * 0.1} y={40}>
//               <div className="group h-full bg-[#EEF3FC]">
//                 <div className="relative h-[240px] sm:h-[280px] overflow-hidden">
//                   <Image
//                     src={c.img}
//                     alt={c.title}
//                     fill
//                     sizes="(min-width: 768px) 50vw, 100vw"
//                     className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.05]"
//                   />
//                   <span className="absolute left-4 top-4 bg-[#000615] px-3 py-1.5 text-[9px] font-medium uppercase tracking-wide text-white">
//                     Category {c.n}
//                   </span>
//                 </div>
//                 <div className="p-5 md:p-6">
//                   <h3 className="text-xl font-light text-[#171C22]">{c.title}</h3>
//                   <p className="mt-2 text-[11px] text-[#44474D]">{c.text}</p>
//                   <ul className="mt-5 space-y-2.5">
//                     {c.items.map(({ Icon, t }) => (
//                       <li key={t} className="flex items-center gap-3 text-xs text-[#171C22]">
//                         <Icon size={13} className="shrink-0 text-[#336192]" />
//                         {t}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             </Reveal>
//           ))}
//         </div>
//       </Container>
//     </section>
//   );
// };

// export default ResortAmenities;









"use client";
import Image from "next/image";
import {
  Waves, Dumbbell, Flower2, Droplets,
  Martini, PartyPopper, Trophy, Clapperboard,
  Baby, Footprints, PawPrint, Sprout,
  SunMedium, CloudRain, ShieldCheck, Flame,
} from "lucide-react";
import { Container, Reveal, WordReveal, Eyebrow, SANS } from "@/components/ui/Animations";
import { cloudinary } from "@/assets/Cloudinary";

const categories = [
  {
    n: "01",
    img: cloudinary.properties.hero,
    title: "Lifestyle & Wellness",
    text: "Holistic health sanctuaries dedicated to restorative physical and mental equilibrium.",
    items: [
      { Icon: Waves, t: "Temperature-Regulated Lap Pool & Solarium" },
      { Icon: Dumbbell, t: "Biostrength Equipped Fitness Suite" },
      { Icon: Flower2, t: "Acoustically Treated Zen Yoga & Pilates Studio" },
      { Icon: Droplets, t: "Private Hydrotherapy Spa & Steam Pavilions" },
    ],
  },
  {
    n: "02",
    img: cloudinary.properties.hero,
    title: "Community & Leisure",
    text: "Cultivated spaces for intimate gatherings, celebrations, and recreational competition.",
    items: [
      { Icon: Martini, t: "Panoramic Sky Lounge & Social Terrace" },
      { Icon: PartyPopper, t: "Double-Height Grand Banquet Hall & Lawns" },
      { Icon: Trophy, t: "Hardwood Indoor Sports & Badminton Court" },
      { Icon: Clapperboard, t: "Private Screening Cinema with Luxury Loungers" },
    ],
  },
  {
    n: "03",
    img: cloudinary.properties.hero,
    title: "Family & Multi-Gen Living",
    text: "Safe and engaging dedicated zones designed for toddlers, elders, and domestic pets.",
    items: [
      { Icon: Baby, t: "Montessori-Inspired Indoor Learning & Play Zone" },
      { Icon: Footprints, t: "Senior Citizens' Shaded Reflexology Path & Pergola" },
      { Icon: PawPrint, t: "Enclosed Pet Agility Green & Walking Track" },
      { Icon: Sprout, t: "Zero-Depth Splash Park for Toddlers" },
    ],
  },
  {
    n: "04",
    img: cloudinary.properties.hero,
    title: "Security & Green Utilities",
    text: "High-reliability civic systems operating sustainably and uninterrupted 365 days a year.",
    items: [
      { Icon: SunMedium, t: "100% Solar-Powered Common Area Lighting Array" },
      { Icon: CloudRain, t: "Multi-Stage Rainwater Harvesting & Greywater Recycling" },
      { Icon: ShieldCheck, t: "3-Tier RFID Barriers & Integrated ANPR Security" },
      { Icon: Flame, t: "Automated Fire Sprinklers & Modern Exhaust Shafts" },
    ],
  },
];

const ResortAmenities = ({ property }) => {
  return (
    <section className={`${SANS} w-full min-w-0 overflow-hidden bg-white py-16`}>
      <Container>
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <Eyebrow className="!text-[10px]">Curated Living Environment</Eyebrow>
          <h2 className="mt-3 font-light text-[#171C22] tracking-[-0.02em] leading-[1.1] text-3xl md:text-4xl lg:text-5xl">
            <WordReveal text="Resort-Grade Amenities" />
          </h2>
          <Reveal delay={0.2} className="mt-3">
            <p className="text-xs leading-relaxed text-[#44474D]">
              Engineered for serenity and connection at {property?.propertyName}. Over generous indoor and outdoor facilities
              programmed for multi-generational recreation.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((c, i) => (
            <Reveal key={c.title} delay={(i % 2) * 0.1} y={40}>
              <div className="group h-full bg-[#EEF3FC]">
                <div className="relative h-[240px] sm:h-[280px] overflow-hidden">
                  <Image
                    src={property?.galleryImages?.[i % (property?.galleryImages?.length || 1)]?.url || c.img}
                    alt={c.title}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.05]"
                  />
                  <span className="absolute left-4 top-4 bg-[#000615] px-3 py-1.5 text-[9px] font-medium uppercase tracking-wide text-white">
                    Category {c.n}
                  </span>
                </div>
                <div className="p-5 md:p-6">
                  <h3 className="text-xl font-light text-[#171C22]">{c.title}</h3>
                  <p className="mt-2 text-[11px] text-[#44474D]">{c.text}</p>
                  <ul className="mt-5 space-y-2.5">
                    {c.items.map(({ Icon, t }) => (
                      <li key={t} className="flex items-center gap-3 text-xs text-[#171C22]">
                        <Icon size={13} className="shrink-0 text-[#336192]" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ResortAmenities;