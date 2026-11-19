"use client";
import Link from "next/link";
import { SquareArrowDown } from "lucide-react";
import { Container, Reveal, SANS } from "@/components/ui/Animations";

const BelongCTA = () => {
  return (
    <section className={`${SANS} w-full min-w-0 overflow-hidden bg-white py-8`}>
      <Container>
        <Reveal y={30}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 bg-[#E8EEF6] px-6 py-6 md:px-8">
            <div className="flex items-start gap-4">
              <SquareArrowDown size={18} className="mt-1 shrink-0 text-[#164A7A]" />
              <div>
                <p className="text-lg font-bold uppercase text-[#171C22]">You belong. You are abundance.</p>
                <p className="mt-1 text-sm leading-relaxed text-[#44474D]">
                  We believe a quality home is more than a structure.
                  <br />
                  It is a place for families to connect, grow and create lasting memories.
                </p>
              </div>
            </div>
            <Link
              href="/contact-us"
              className="shrink-0 bg-[#164A7A] px-6 py-3.5 text-center text-xs font-bold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-[#0B1F3A]"
            >
              Request a Call
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};

export default BelongCTA;