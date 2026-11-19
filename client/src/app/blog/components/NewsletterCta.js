"use client";
import React from "react";
import { MailCheck } from "lucide-react";
import { Container, Reveal, WordReveal, SERIF, SANS } from "@/components/ui/Animations";

const NewsletterCta = () => {

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setStatus("sending");
  //   try {
  //     // TODO: connect your newsletter API here (SummaryApi.subscribe etc.)
  //     toast.success("Thank you! You have been subscribed to our updates.");
  //     setEmail("");
  //   } catch (err) {
  //     toast.error("Something went wrong. Please try again.");
  //   } finally {
  //     setStatus("idle");
  //   }
  // };

  return (
    <section className={`${SANS} w-full min-w-0 overflow-hidden bg-white py-12 md:py-16`}>
      <Container>
        <Reveal y={40}>
          <div className="mx-auto max-w-[1176px] bg-[#E8EDF6] px-5 py-12 text-center sm:px-10 md:py-16">
            <MailCheck size={30} className="mx-auto text-[#336192]" />
            <h2 className={`${SERIF} mt-3 text-[#171C22] text-3xl sm:text-4xl leading-[1.15]`}>
              <WordReveal text="Ideas Worth Coming Back To." />
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[15px] leading-[1.7] text-[#44474D]">
              Discover useful perspectives on home design, precast engineering, structural
              sustainability, and considered living delivered thoughtfully to your inbox.
            </p>

            {/* <form
              onSubmit={handleSubmit}
              className="mx-auto mt-8 flex max-w-[44rem] flex-col gap-4 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                aria-label="Email address"
                className="w-full flex-1 bg-white px-4 py-4 text-[15px] text-[#171C22] placeholder:text-[#8A94A3] outline-none transition-shadow focus:shadow-[0_0_0_3px_rgba(51,97,146,0.18)]"
              />
              <button
                type="submit"
                disabled={status === "sending"}
                className="bg-[#0B1F3A] px-8 py-4 text-[11px] font-medium uppercase tracking-wide text-white transition-colors duration-300 hover:bg-[#1B4B7F] disabled:opacity-60"
              >
                {status === "sending" ? "Sending..." : "Receive Updates"}
              </button>
            </form> */}

            <p className="mx-auto mt-4 max-w-xl text-[11px] leading-relaxed text-[#44474D]">
              Updates are shared periodically with strict respect for privacy. No promotional clutter,
              strictly architectural thought leadership.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};

export default NewsletterCta;
