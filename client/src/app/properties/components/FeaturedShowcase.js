"use client";
import Link from "next/link";
import Image from "next/image";
import { Compass, BadgeCheck, Armchair, Building2, Shield, Users } from "lucide-react";
import { Container, Reveal, WordReveal, SANS } from "@/components/ui/Animations";
import { cloudinary } from "@/assets/Cloudinary";

const defaultIcons = [Armchair, Building2, Shield, Users];

const FeaturedShowcase = ({ property }) => {
  if (!property) return null;

  const imgSrc = property.featuredImage?.url || cloudinary.properties.hero;
  const viewUrl = property.slug ? `/properties/${property.slug}` : "/contact-us";

  const specs = [
    {
      k: "Price / Sq.Ft.",
      v: property.pricePerSqft ? `₹${property.pricePerSqft.toLocaleString("en-IN")}` : "On Request",
      unit: property.pricePerSqft ? "/ sq.ft." : "",
    },
    {
      k: "Built-up Area",
      v: property.builtUpArea ? property.builtUpArea.toLocaleString("en-IN") : "N/A",
      unit: property.builtUpArea ? "sq.ft." : "",
    },
    {
      k: "Plot Area",
      v: property.plotArea ? property.plotArea.toLocaleString("en-IN") : "N/A",
      unit: property.plotArea ? "sq.ft." : "",
    },
    {
      k: "Availability",
      v: property.developmentStatus || "Ready to Move",
      blue: true,
    },
  ];

  // Dynamic Key Features or fallback to property attributes
  const displayAttributes =
    property.keyFeatures && property.keyFeatures.length > 0
      ? property.keyFeatures.map((feat, idx) => ({
          label: feat,
          Icon: defaultIcons[idx % defaultIcons.length],
        }))
      : [
          { label: property.propertyType, Icon: Building2 },
          { label: property.developmentStatus, Icon: Shield },
          { label: `${property.builtUpArea || 0} sq.ft. Built-up`, Icon: Armchair },
          { label: `${property.plotArea || 0} sq.ft. Plot`, Icon: Users },
        ];

  return (
    <section className={`${SANS} w-full min-w-0 overflow-hidden bg-[#F1F0EB] py-16`}>
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-4">
            <p className="text-[11px] font-bold uppercase tracking-wide text-[#1B4B7F]">01 // Featured Showcase</p>
            <span className="h-px w-16 bg-[#D9DCD9]" />
            <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#171C22]">
              {property.propertyName}
            </p>
          </div>
          <p className="text-[11px] font-semibold tracking-[0.15em] text-[#1B4B7F]">
            {property.tagline || property.propertyType}
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] bg-white shadow-[0_24px_60px_-30px_rgba(11,31,58,0.35)]">
          {/* Image */}
          <Reveal y={40}>
            <div className="group relative h-[380px] sm:h-[460px] lg:h-full lg:min-h-[750px] overflow-hidden">
              <Image
                src={imgSrc}
                alt={`${property.propertyName} — Abundance Homes`}
                fill
                priority
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-[1.05]"
              />
              <div className="absolute inset-x-0 top-0 p-4 sm:p-6">
                <div className="flex flex-wrap">
                  <span className="bg-white px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-[#0B1F3A]">
                    {property.developmentStatus}
                  </span>
                  <span className="bg-[#0B1F3AE5] px-3 py-2 text-[11px] font-medium uppercase tracking-wide text-white">
                    Featured Residence
                  </span>
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 bg-[#0B1F3AE5] px-4 py-4 backdrop-blur-sm sm:flex-row sm:items-end sm:justify-between sm:px-6">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#E8C27A]">
                    {property.propertyType}
                  </p>
                  <p className="mt-1 text-base sm:text-xl font-medium text-white">
                    {property.propertyName} — {property.tagline || property.propertyType}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs text-white">
                  <span className="inline-flex items-center gap-1.5"><Compass size={13} /> Verified Inventory</span>
                  <span className="inline-flex items-center gap-1.5"><BadgeCheck size={13} /> Precast Construction</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Details */}
          <Reveal y={40} delay={0.15}>
            <div className="p-6 md:p-8 lg:p-10">
              <p className="text-[11px] font-bold uppercase tracking-wide text-[#1B4B7F]">
                {property.location}
              </p>
              <h2 className={`font-light mt-4 text-4xl md:text-5xl leading-[1.1] text-[#171C22]`}>
                <WordReveal text={property.propertyName} />
              </h2>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#44474D]">
                {property.description}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-6 bg-[#EEF3FC] p-5 md:p-6">
                {specs.map((s) => (
                  <div key={s.k}>
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#171C22]">{s.k}</p>
                    <p className={`mt-2 text-xl ${s.blue ? "font-medium text-[#336192]" : "text-[#171C22]"}`}>
                      {s.v}
                      {s.unit && <span className="ml-1.5 text-[11px] text-[#44474D]">{s.unit}</span>}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.15em] text-[#171C22]">
                Property Attributes
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {displayAttributes.map(({ label, Icon }) => (
                  <li key={label} className="inline-flex items-center gap-2 bg-[#E8EEF6] px-3 py-2 text-[13px] text-[#171C22]">
                    <Icon size={13} className="text-[#1B4B7F]" /> {label}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={viewUrl}
                  className="flex-1 bg-[#0B1F3A] px-6 py-4 text-center text-[11px] font-medium uppercase tracking-wide text-white transition-colors duration-300 hover:bg-[#164A7A]"
                >
                  View Home →
                </Link>
                <Link
                  href="/contact-us"
                  className="bg-[#E8EEF6] px-6 py-4 text-center text-[11px] font-medium uppercase tracking-wide text-[#0B1F3A] transition-colors duration-300 hover:bg-[#D6E3FF]"
                >
                  Get Property Details
                </Link>
              </div>

              <label className="mt-5 flex items-center gap-3 text-xs text-[#171C22]">
                <input type="checkbox" defaultChecked className="h-4 w-4" />
                Selected for direct consultation
              </label>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedShowcase;