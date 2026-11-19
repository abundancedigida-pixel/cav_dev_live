// import React from "react";
// import InsightsHero from "./components/InsightsHero";
// import FeaturedEssay from "./components/FeaturedEssay";
// import InsightsGrid from "./components/InsightsGrid";
// import PrecastCta from "./components/PrecastCta";
// import NewsletterCta from "./components/NewsletterCta";
// import StartConversation from "@/components/common/StartConversation";

// const page = () => {
//   return (
//     <div>
//       <InsightsHero />
//       {/* <div className="w-full h-[80px] bg-white" /> */}
//       <FeaturedEssay />
//       <div
//         className="w-full bg-white"
//         style={{ height: "40px", minHeight: "40px", flexShrink: 0 }}
//       />
//       <InsightsGrid />
//       <PrecastCta />
//       <NewsletterCta />
//       <StartConversation
//         eyebrow="Begin Your Conversation"
//         title="Planning a Home of Your Own?"
//         description="Explore Abundance Group’s curated portfolio of architectural estates, turnkey precast developments, and tailor-made possibilities to discover the next step for your bespoke requirements."
//         primaryCTA={{
//           label: "Explore Properties",
//           href: "/properties",
//         }}
//         secondaryCTA={{
//           label: "Contact CAV Group",
//           href: "/contact-us",
//         }}
//         quickLinks={[
//           {
//             label: "Tailor-Made Homes",
//             href: "/tailor-made",
//           },
//           {
//             label: "Precast Homes Chapter",
//             href: "/pre-cast-homes",
//           },
//           {
//             label: "Unique 70 Enclave",
//             href: "/projects",
//           },
//         ]}
//       />
//     </div>
//   );
// };

// export default page;

"use client";
import React, { useEffect, useState, useMemo } from "react";

import InsightsHero from "./components/InsightsHero";
import FeaturedEssay from "./components/FeaturedEssay";
import InsightsGrid from "./components/InsightsGrid";
import PrecastCta from "./components/PrecastCta";
import NewsletterCta from "./components/NewsletterCta";
import StartConversation from "@/components/common/StartConversation";
import api from "@/common/apiClient";
import SummaryApi from "@/common/SummaryApi";

const Page = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  // Fetch blogs from backend
  useEffect(() => {
    let isMounted = true;

    const fetchBlogs = async () => {
      try {
        const res = await api({
          url: SummaryApi.getAllBlogs.url,
          method: SummaryApi.getAllBlogs.method,
          params: {
            status: "published",
            paginate: false,
          },
        });

        if (res.data?.success && res.data?.data) {
          const blogList = Array.isArray(res.data.data)
            ? res.data.data
            : res.data.data.blogs || [];

          const now = new Date();

          const availableBlogs = blogList.filter((blog) => {
            if (!blog.publishedAt) return false;
            return new Date(blog.publishedAt) <= now;
          });

          setBlogs(availableBlogs);
        }
      } catch (error) {
        if (isMounted) {
          console.error(
            "Error fetching blogs:",
            error?.response?.data || error.message,
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchBlogs();

    return () => {
      isMounted = false;
    };
  }, []);

  // isFeatured === true matum featured section-ku
  const featuredBlog = useMemo(() => {
    return blogs.find((b) => b.isFeatured === true) || null;
  }, [blogs]);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] w-full items-center justify-center bg-white">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#0B1F3A] border-r-transparent" />
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-[#0B1F3A]">
            Loading Insights...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <InsightsHero />
      {featuredBlog && <FeaturedEssay blog={featuredBlog} />}
      <div
        className="w-full bg-white"
        style={{ height: "40px", minHeight: "40px", flexShrink: 0 }}
      />
      <InsightsGrid blogs={blogs} />
      <PrecastCta />
      <NewsletterCta />
      <StartConversation
        eyebrow="Begin Your Conversation"
        title="Planning a Home of Your Own?"
        description="Explore Abundance Group’s curated portfolio of architectural estates, turnkey precast developments, and tailor-made possibilities to discover the next step for your bespoke requirements."
        primaryCTA={{
          label: "Explore Properties",
          href: "/properties",
        }}
        secondaryCTA={{
          label: "Contact CAV Group",
          href: "/contact-us",
        }}
        quickLinks={[
          {
            label: "Tailor-Made Homes",
            href: "/tailor-made",
          },
          {
            label: "Precast Homes Chapter",
            href: "/pre-cast-homes",
          },
          {
            label: "Unique 70 Enclave",
            href: "/projects",
          },
        ]}
      />
    </div>
  );
};

export default Page;
