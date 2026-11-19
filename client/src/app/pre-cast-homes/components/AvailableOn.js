"use client";
import Link from "next/link";
import Image from "next/image";
import { Store, ExternalLink, Truck, ShieldCheck, BadgeCheck, Headset } from "lucide-react";
import { Container, Reveal, SERIF, SANS } from "@/components/ui/Animations";
// Add your official logo files here (brand-supplied assets)
import AmazonLogo from "@/assets/PreCast/AmazonLogo.svg";
import FlipkartLogo from "@/assets/PreCast/FlipkartLogo.svg";

const stores = [
  {
    name: "Amazon",
    logo: AmazonLogo,
    href: "#", // TODO: official Amazon storefront URL
    text: "Order pre-engineered precast models directly through Amazon Marketplace India.",
  },
  {
    name: "Flipkart",
    logo: FlipkartLogo,
    href: "#", // TODO: official Flipkart storefront URL
    text: "Access certified precast building modules on Flipkart B2B & Commerce Network.",
  },
];

const perks = [
  { Icon: Truck, title: "Fast Delivery", sub: "Pan-India Flatbed Logistics" },
  { Icon: ShieldCheck, title: "Secure Payment", sub: "Escrow & Milestone Protocol" },
  { Icon: BadgeCheck, title: "Trusted Quality", sub: "ISO & Precast Standards" },
  { Icon: Headset, title: "Reliable Service", sub: "Dedicated Civil Support" },
];

const AvailableOn = () => {
  return (
    <section className={`${SANS} w-full min-w-0 overflow-hidden bg-[#0B1F3A] py-12 md:py-16`}>
      <Container>
        <Reveal y={40}>
          <div className="border border-white/40">
            {/* Header */}
            <div className="flex flex-col gap-3 bg-[#0B1F3A] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div className="flex items-center gap-3">
                <Store size={22} className="text-[#E8A33D]" />
                <div>
                  <h2 className={`${SERIF} text-2xl uppercase tracking-[0.14em] text-[#C9942F]`}>Available On</h2>
                  <p className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.08em] text-white">
                    Pan-India marketplace booking &amp; verified delivery
                  </p>
                </div>
              </div>
              <span className="inline-flex w-fit items-center gap-2 border border-white/30 bg-white/5 px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.12em] text-[#FFDEA9]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E8A33D]" /> Official brand storefronts
              </span>
            </div>

            {/* Body */}
            <div className="bg-white px-5 py-8 sm:px-10">
              <div className="grid grid-cols-1 md:grid-cols-2 md:divide-x md:divide-[#EDEBE4]">
                {stores.map((s) => (
                  <div key={s.name} className="flex flex-col items-center px-4 py-6 text-center">
                    <div className="relative h-16 w-44">
                      <Image src={s.logo} alt={`${s.name} logo`} fill className="object-contain" />
                    </div>
                    <Link
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-6 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-wide text-[#164A7A] hover:text-[#0B1F3A]"
                    >
                      Explore official storefront
                      <ExternalLink size={12} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                    <p className="mt-4 max-w-[19rem] text-[13px] leading-relaxed text-[#44474D]">{s.text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-y-6 border-t border-[#EDEBE4] pt-6 lg:grid-cols-4 lg:divide-x lg:divide-[#EDEBE4]">
                {perks.map(({ Icon, title, sub }) => (
                  <div key={title} className="flex flex-col items-center px-2 text-center">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0B1F3A] text-[#FFDEA9]">
                      <Icon size={16} />
                    </span>
                    <p className="mt-3 text-base font-medium text-[#0B1F3A]">{title}</p>
                    <p className="mt-1 text-[8px] font-medium uppercase tracking-[0.08em] text-[#44474D]">{sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};

export default AvailableOn;