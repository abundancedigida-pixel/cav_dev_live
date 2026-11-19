"use client";
import Image from "next/image";
import { Clock, Map, Phone, Mail } from "lucide-react";
import {
  Container,
  Reveal,
  WordReveal,
  Eyebrow,
  SERIF,
  SANS,
} from "@/components/ui/Animations";
import { cloudinary } from "@/assets/Cloudinary";
const MapImg = cloudinary.contactUs.hero;
import EnquiryForm from "@/components/common/EnquiryForm";

const offices = [
  {
    name: "Vellore Regional Office",
    tag: "Heritage Hub",
    address: "Heritage Pavilion, 14 Anna Salai, Vellore, Tamil Nadu 632001",
    tel: "+91 416 222 4890",
    email: "vellore@abundancegroup.in",
    hours: "Mon – Sat: 09:30 AM – 06:30 PM IST",
  },
  {
    name: "Chennai Advisory Desk",
    tag: "Metro Bureau",
    address: "Kothari Towers, Nungambakkam High Rd, Chennai, Tamil Nadu 600034",
    tel: "+91 44 4850 1200",
    email: "chennai@abundancegroup.in",
    hours: "Mon – Sat: 10:00 AM – 07:00 PM IST",
  },
  {
    name: "Bengaluru Chapter",
    tag: "Tech & Design Lab",
    address:
      "Prestige Sanctuary Enclave, Vittal Mallya Rd, Bengaluru, Karnataka 560001",
    tel: "+91 80 4120 7700",
    email: "bangalore@abundancegroup.in",
    hours: "Mon – Sat: 10:00 AM – 06:30 PM IST",
  },
];

const telHref = (t) => `tel:${t.replace(/[^+\d]/g, "")}`;

const AdvisoryDirectory = () => {
  return (
    <section
      className={`${SANS} w-full min-w-0 overflow-hidden bg-white pt-8 pb-16`}
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-10 lg:gap-12 items-start">
          {/* Left: directory */}
          <div>
            <Eyebrow className="!text-[9px] !font-semibold !tracking-[0.15em]">
              Advisory Directory
            </Eyebrow>
            <h2
              className={`${SERIF} mt-2 text-[#0B1F3A] text-3xl md:text-4xl leading-[1.12]`}
            >
              <WordReveal text="We’re Here to Help." />
            </h2>
            <Reveal delay={0.2} className="mt-3">
              <p className="max-w-sm text-sm leading-relaxed text-[#44474D]">
                Our regional advisory and civil engineering teams are available
                to assist with residential plots, tailor-made residences,
                precast solutions, and institutional consultations.
              </p>
            </Reveal>

            <div className="mt-7 space-y-3">
              {offices.map((o, i) => (
                <Reveal key={o.name} delay={i * 0.1} y={30}>
                  <div className="bg-white p-5 shadow-[0_2px_14px_-8px_rgba(11,31,58,0.25)] transition-shadow duration-500 hover:shadow-[0_18px_40px_-24px_rgba(11,31,58,0.4)]">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-base font-medium text-[#171C22]">
                        {o.name}
                      </h3>
                      <span className="shrink-0 bg-[#E8EEF6] px-2 py-1 text-[8px] font-bold uppercase tracking-[0.08em] text-[#1B4B7F]">
                        {o.tag}
                      </span>
                    </div>
                    <p className="mt-2 max-w-sm text-xs leading-relaxed text-[#44474D]">
                      {o.address}
                    </p>

                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <p className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#44474D]">
                          Direct Tel
                        </p>
                        <a
                          href={telHref(o.tel)}
                          className="mt-1 block text-xs text-[#1B4B7F] hover:underline"
                        >
                          {o.tel}
                        </a>
                      </div>
                      <div>
                        <p className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#44474D]">
                          Desk Email
                        </p>
                        <a
                          href={`mailto:${o.email}`}
                          className="mt-1 block break-all text-xs text-[#1B4B7F] hover:underline"
                        >
                          {o.email}
                        </a>
                      </div>
                    </div>

                    <p className="mt-3 flex items-center gap-1.5 text-[11px] text-[#44474D]">
                      <Clock size={12} className="text-[#1B4B7F]" />
                      {o.hours}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Map card */}
            <Reveal y={40} delay={0.1} className="mt-6">
              <div className="bg-[#0B1F3A]">
                <div className="flex items-center justify-between px-3 py-2.5 text-[9px] font-semibold uppercase tracking-[0.08em]">
                  <span className="inline-flex items-center gap-1.5 text-[#E8A33D]">
                    <Map size={12} /> Southern Corridor Map
                  </span>
                  <span className="text-white">3 Regional Studios</span>
                </div>
                <div className="group relative mx-3 h-[170px] sm:h-[190px] overflow-hidden bg-[#13294A]">
                  <Image
                    src={MapImg}
                    alt="Map of the Tamil Nadu and Karnataka studio corridor"
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.05]"
                  />
                  <div className="absolute left-1/2 top-1/2 w-[75%] -translate-x-1/2 -translate-y-1/2 bg-white/95 px-3 py-2 text-center shadow-lg">
                    <p className="text-[8px] font-bold uppercase tracking-[0.08em] text-[#171C22]">
                      Interactive Location Viewer
                    </p>
                    <p className="mt-0.5 text-[10px] text-[#44474D]">
                      Connecting Tamil Nadu &amp; Karnataka Corridors
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-2 px-3 py-3 text-[8px] sm:text-[9px] text-white">
                  <span>• Vellore Anna Salai</span>
                  <span>• Nungambakkam High Rd</span>
                  <span>• Vittal Mallya Rd</span>
                </div>
              </div>
            </Reveal>

            <Reveal y={20} delay={0.1} className="mt-4 grid grid-cols-2 gap-3">
              <a
                href="tel:+914448501200"
                className="flex items-center justify-center gap-2 bg-[#E8EDF6] py-3 text-[9px] font-semibold uppercase tracking-[0.1em] text-[#171C22] transition-colors hover:bg-[#0B1F3A] hover:text-white"
              >
                <Phone size={12} /> Call Advisory
              </a>
              <a
                href="mailto:chennai@abundancegroup.in"
                className="flex items-center justify-center gap-2 bg-[#E8EDF6] py-3 text-[9px] font-semibold uppercase tracking-[0.1em] text-[#171C22] transition-colors hover:bg-[#0B1F3A] hover:text-white"
              >
                <Mail size={12} /> Email the Team
              </a>
            </Reveal>
          </div>

          {/* Right: enquiry form (separate file) */}
          <Reveal y={40} delay={0.15} className="lg:sticky lg:top-24">
            <EnquiryForm
              eyebrow="Tailored Response"
              heading="How Can We Help You?"
              description="Tell us a little about your requirements, and we’ll direct your enquiry to the right studio lead."
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
};

export default AdvisoryDirectory;
