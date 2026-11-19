"use client";
import Link from "next/link";
import { ArrowLeft, Download, Printer } from "lucide-react";
import { Container, Reveal, SANS } from "@/components/ui/Animations";

const ArticleActions = () => {
  return (
    <section className={`${SANS} w-full min-w-0 overflow-hidden bg-white pb-12`}>
      <Container>
        <Reveal y={20}>
          <div className="flex flex-col gap-4 border border-[#FFC66B] bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#171C22] transition-colors hover:text-[#336192]"
            >
              <ArrowLeft size={13} className="transition-transform duration-300 group-hover:-translate-x-1" />
              Back to all perspectives
            </Link>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <button
                type="button"
                onClick={() => typeof window !== "undefined" && window.print()}
                className="inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.1em] text-[#171C22] transition-colors hover:text-[#336192]"
              >
                <Download size={12} /> Save Monograph: PDF
              </button>
              <button
                type="button"
                onClick={() => typeof window !== "undefined" && window.print()}
                className="inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.1em] text-[#171C22] transition-colors hover:text-[#336192]"
              >
                <Printer size={12} /> Print
              </button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};

export default ArticleActions;