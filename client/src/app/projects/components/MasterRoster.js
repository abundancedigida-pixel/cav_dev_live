"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Building2 } from "lucide-react";
import {
  Container,
  Reveal,
  WordReveal,
  Eyebrow,
  SERIF,
  SANS,
} from "@/components/ui/Animations";
// import { cloudinary } from "@/assets/Cloudinary";

// const tabs = [
//   "All Developments",
//   "Residential Living",
//   "Commercial Development",
//   "Healthcare Development",
//   "Sports & Recreation",
//   "Community Initiative",
// ];

// // category must match one of the tab labels above
// const projects = [
//   {
//     category: "Residential Living",
//     eyebrow: "Sanctuary Enclaves",
//     title: "Abundance Villas",
//     text: "Explore the vision for thoughtfully designed residential living, shaped around comfort, functionality, and everyday experiences. Crafted with inner courtyards and elemental stone masonry.",
//     foot: "Courtyard Living",
//     Icon: House,
//     cta: "Explore Project",
//     href: "/projects",
//     img: cloudinary.projects.hero,
//   },
//   {
//     category: "Commercial Development",
//     eyebrow: "Institutional Hub",
//     title: "Abundance Tech Park",
//     text: "A development initiative focused on spaces for technology-driven work, business activity, and future opportunities. Integrated smart-grid infrastructure for next-generation enterprises.",
//     foot: "Grade-A Enterprise",
//     Icon: Building2,
//     cta: "Explore Project",
//     href: "/projects",
//     img: cloudinary.projects.hero,
//   },
//   {
//     category: "Healthcare Development",
//     eyebrow: "Wellness Infrastructure",
//     title: "Abundance Medi Park",
//     text: "A specialised development initiative associated with healthcare environments and the spaces that support clinical precision and holistic patient recovery.",
//     foot: "Biophilic Design",
//     cta: "Explore",
//     href: "/projects",
//     img: cloudinary.projects.hero,
//   },
//   {
//     category: "Sports & Recreation",
//     eyebrow: "Civic Athletics",
//     title: "Abundance Sports Park",
//     text: "A development initiative centred on sports, activity, recreation, and spaces that bring people together through energetic movement and community wellness.",
//     foot: "Active Grounds",
//     cta: "Explore",
//     href: "/projects",
//     img: cloudinary.projects.hero,
//   },
//   {
//     category: "Community Initiative",
//     eyebrow: "Human Network",
//     title: "Abundance Mindset Community",
//     text: "An initiative built around connection, collaboration, personal growth, and shared experiences—empowering an ecosystem beyond traditional physical real estate.",
//     foot: "Ecosystem Forum",
//     cta: "Discover More",
//     href: "/projects",
//     img: cloudinary.projects.hero,
//     tint: true,
//   },
// ];

const Card = ({ p, big, index }) => {
  const categoryLabel = p.category?.[0] || "Development";
  const imageUrl = p.featuredImage?.url || cloudinary.projects.hero;
  const footText = p.developmentStatus?.[0] || p.location || "Featured";

  return (
    <Reveal delay={(index % 3) * 0.1} y={40} className="h-full">
      <Link
        href={`/projects/${p._id}`}
        className="group flex h-full flex-col border border-[#EDEBE4] bg-white"
      >
        <div
          className={`relative overflow-hidden ${big ? "h-[300px]" : "h-[190px] md:h-[200px]"}`}
        >
          <Image
            src={imageUrl}
            alt={p.projectName}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.06]"
          />
          <div className="absolute inset-x-0 top-0 p-4">
            <span className="inline-block bg-[#0B1F3A] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-white">
              {categoryLabel}
            </span>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-6 md:p-8">
          <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#A0824E]">
            {p.tagline || p.location}
          </p>
          <h3 className={`${SERIF} mt-3 text-2xl leading-snug text-[#0B1F3A]`}>
            {p.projectName}
          </h3>
          <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-[#44474D] line-clamp-3">
            {p.projectOverview}
          </p>
          <div className="mt-auto pt-5">
            <div className="flex items-center justify-between border-t border-[#C4C6CE26] pt-4 text-[11px] tracking-wide text-[#171C22]">
              <span className="inline-flex items-center gap-1.5 text-[#44474D]">
                <Building2 size={12} />
                {footText}
              </span>
              <span className="inline-flex items-center gap-2 font-semibold uppercase">
                Explore Project
                <ArrowRight
                  size={16}
                  className="text-[#336192] transition-transform duration-300 group-hover:translate-x-1.5"
                />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </Reveal>
  );
};

const MasterRoster = ({ projects = [], loading = false }) => {
  const featured = projects.slice(0, 2);
  const rest = projects.slice(2);

  return (
    <section
      id="developments"
      className={`${SANS} w-full min-w-0 overflow-hidden bg-white py-16`}
    >
      <Container>
        <div>
          <Eyebrow className="!text-[10px]">The Master Roster</Eyebrow>
          <h2
            className={`${SERIF} mt-4 max-w-3xl text-[#0B1F3A] text-3xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.1]`}
          >
            <WordReveal text="Active Developments & Initiatives" />
          </h2>
        </div>

        {loading ? (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-[360px] animate-pulse bg-[#F1F0EB]" />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <p className="mt-10 border border-[#EDEBE4] bg-[#FAF9F6] p-8 text-center text-sm text-[#44474D]">
            No published developments match the selected filters.
          </p>
        ) : (
          <>
            {featured.length > 0 && (
              <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {featured.map((p, i) => (
                  <Card key={p._id} p={p} big index={i} />
                ))}
              </div>
            )}

            {rest.length > 0 && (
              <div
                className={`${featured.length ? "mt-6" : "mt-10"} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`}
              >
                {rest.map((p, i) => (
                  <Card key={p._id} p={p} index={i} />
                ))}
              </div>
            )}
          </>
        )}
      </Container>
    </section>
  );
};

export default MasterRoster;
