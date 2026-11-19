// "use client";
// import Link from "next/link";
// import Image from "next/image";
// import { Container, Reveal, WordReveal, Eyebrow, SANS } from "@/components/ui/Animations";
// import { cloudinary } from "@/assets/Cloudinary";

// const items = [
//   {
//     tag: "Coastal Villas",
//     tagCls: "bg-[#000615]",
//     img: cloudinary.properties.hero,
//     location: "ECR, Chennai",
//     title: "Verde Signature Villas",
//     text: "4 & 5 BHK Private Sea-Facing Estated Homes with Plunge Pools.",
//     rate: "₹11,200",
//     area: "4,100 – 5,800 sq.ft.",
//   },
//   {
//     tag: "Under Construction",
//     tagCls: "bg-[#336192]",
//     img: cloudinary.properties.hero,
//     location: "OMR Cyber Corridor, Chennai",
//     title: "Cascades IT Residences",
//     text: "2 & 3 BHK Intelligent Modular Residences for Tech Executives.",
//     rate: "₹7,800",
//     area: "1,250 – 1,750 sq.ft.",
//   },
//   {
//     tag: "Exclusive Boutique",
//     tagCls: "bg-[#000615]",
//     img: cloudinary.properties.hero,
//     location: "Anna Nagar West, Chennai",
//     title: "Sereno Manor",
//     text: "Ultra-Luxury 4 BHK Floor-Only Residences with Private Keycard Lift.",
//     rate: "₹13,800",
//     area: "3,200 – 3,600 sq.ft.",
//   },
// ];

// const SimilarDevelopments = () => {
//   return (
//     <section className={`${SANS} w-full min-w-0 overflow-hidden bg-white py-16`}>
//       <Container>
//         <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
//           <div>
//             <Eyebrow className="!text-[10px]">Curated Portfolio</Eyebrow>
//             <h2 className="mt-4 font-light text-[#171C22] tracking-[-0.02em] leading-[1.1] text-3xl md:text-4xl lg:text-5xl">
//               <WordReveal text="Similar Signature Developments" />
//             </h2>
//           </div>
//           <Link
//             href="/properties"
//             className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#1B4B7F] transition-colors hover:text-[#0B1F3A]"
//           >
//             Explore Complete Collection →
//           </Link>
//         </div>

//         <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {items.map((it, i) => (
//             <Reveal key={it.title} delay={i * 0.1} y={40}>
//               <div className="group flex h-full flex-col border border-[#F1F0EB] bg-white">
//                 <div className="relative h-[220px] overflow-hidden">
//                   <Image
//                     src={it.img}
//                     alt={it.title}
//                     fill
//                     sizes="(min-width: 1024px) 33vw, 100vw"
//                     className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.05]"
//                   />
//                   <div className="absolute inset-x-0 top-0 p-3">
//                     <span className={`inline-block px-3 py-2 text-[11px] uppercase tracking-wide text-white ${it.tagCls}`}>
//                       {it.tag}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="flex flex-1 flex-col p-4">
//                   <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#1B4B7F]">{it.location}</p>
//                   <h3 className="mt-3 text-2xl font-light text-[#171C22]">{it.title}</h3>
//                   <p className="mt-2 max-w-xs border-b border-[#EDEBE4] pb-3 text-xs leading-relaxed text-[#44474D]">{it.text}</p>
//                   <div className="mt-3 flex items-end justify-between gap-3">
//                     <div>
//                       <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#44474D]">Rate Specifier</p>
//                       <p className="mt-1 text-xl font-bold text-[#171C22]">
//                         {it.rate} <span className="text-[11px] font-normal text-[#44474D]">sq.ft.</span>
//                       </p>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#44474D]">Built Area</p>
//                       <p className="mt-1 text-sm font-bold text-[#171C22]">{it.area}</p>
//                     </div>
//                   </div>
//                   <Link
//                     href="/properties"
//                     className="mt-4 block bg-[#E3E8F2] px-4 py-3 text-center text-[10px] font-medium uppercase tracking-wide text-[#171C22] transition-colors duration-300 hover:bg-[#0B1F3A] hover:text-white"
//                   >
//                     View Property
//                   </Link>
//                 </div>
//               </div>
//             </Reveal>
//           ))}
//         </div>
//       </Container>
//     </section>
//   );
// };

// export default SimilarDevelopments;





"use client";
import Link from "next/link";
import Image from "next/image";
import { Container, Reveal, WordReveal, Eyebrow, SANS } from "@/components/ui/Animations";
import { cloudinary } from "@/assets/Cloudinary";

const SimilarDevelopments = ({ properties = [] }) => {
  if (!properties || properties.length === 0) {
    return null;
  }

  return (
    <section className={`${SANS} w-full min-w-0 overflow-hidden bg-white py-16`}>
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
          <div>
            <Eyebrow className="!text-[10px]">Curated Portfolio</Eyebrow>
            <h2 className="mt-4 font-light text-[#171C22] tracking-[-0.02em] leading-[1.1] text-3xl md:text-4xl lg:text-5xl">
              <WordReveal text="Similar Signature Developments" />
            </h2>
          </div>
          <Link
            href="/properties"
            className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#1B4B7F] transition-colors hover:text-[#0B1F3A]"
          >
            Explore Complete Collection →
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((it, i) => {
            const imgSrc = it.featuredImage?.url || cloudinary.properties.hero;
            const href = `/properties/${it.slug}`;

            return (
              <Reveal key={it._id || i} delay={i * 0.1} y={40}>
                <div className="group flex h-full flex-col border border-[#F1F0EB] bg-white">
                  <div className="relative h-[220px] overflow-hidden">
                    <Image
                      src={imgSrc}
                      alt={it.propertyName}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-x-0 top-0 p-3">
                      <span className="inline-block bg-[#000615] px-3 py-2 text-[11px] uppercase tracking-wide text-white">
                        {it.developmentStatus}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#1B4B7F]">{it.location}</p>
                    <h3 className="mt-3 text-2xl font-light text-[#171C22]">{it.propertyName}</h3>
                    <p className="mt-2 max-w-xs border-b border-[#EDEBE4] pb-3 text-xs leading-relaxed text-[#44474D]">
                      {it.tagline || it.description}
                    </p>
                    <div className="mt-3 flex items-end justify-between gap-3">
                      <div>
                        <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#44474D]">Rate Specifier</p>
                        <p className="mt-1 text-xl font-bold text-[#171C22]">
                          ₹{it.pricePerSqft?.toLocaleString("en-IN") || "0"}{" "}
                          <span className="text-[11px] font-normal text-[#44474D]">/ sq.ft.</span>
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#44474D]">Built Area</p>
                        <p className="mt-1 text-sm font-bold text-[#171C22]">
                          {it.builtUpArea ? `${it.builtUpArea.toLocaleString("en-IN")} sq.ft.` : "N/A"}
                        </p>
                      </div>
                    </div>
                    <Link
                      href={href}
                      className="mt-4 block bg-[#E3E8F2] px-4 py-3 text-center text-[10px] font-medium uppercase tracking-wide text-[#171C22] transition-colors duration-300 hover:bg-[#0B1F3A] hover:text-white"
                    >
                      View Property
                    </Link>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default SimilarDevelopments;