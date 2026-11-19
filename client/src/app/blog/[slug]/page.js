"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import ArticleHero from "./components/ArticleHero";
import ArticleBody from "./components/ArticleBody";
import ArticleActions from "./components/ArticleActions";
import StartConversation from "@/components/common/StartConversation";
import api from "@/common/apiClient";
import SummaryApi from "@/common/SummaryApi";

const Page = () => {
  const params = useParams();
  const slug = params?.slug;

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchBlogData = async () => {
      try {
        setLoading(true);

        let foundBlog = null;

        // 1. If slug is a 24-character MongoDB ObjectId, try getById first
        const isObjectId = /^[0-9a-fA-F]{24}$/.test(slug);
        if (isObjectId) {
          try {
            const res = await api({
              url: `${SummaryApi.getBlogById.url}/${slug}`,
              method: SummaryApi.getBlogById.method,
            });
            if (res.data?.success && res.data?.data) {
              foundBlog = res.data.data;
            }
          } catch {
            // fallback to slug match from all blogs
          }
        }

        // 2. If not found by ID or slug is a text slug, fetch from view-all
        if (!foundBlog) {
          const res = await api({
            url: SummaryApi.getAllBlogs.url,
            method: SummaryApi.getAllBlogs.method,
            params: { status: "published", paginate: false },
          });

          if (res.data?.success && res.data?.data) {
            const list = Array.isArray(res.data.data)
              ? res.data.data
              : res.data.data.blogs || [];

            foundBlog = list.find((b) => b.slug === slug || b._id === slug) || null;
          }
        }

        setBlog(foundBlog);
      } catch (error) {
        console.error("Error fetching article:", error?.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] w-full items-center justify-center bg-white">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#0B1F3A] border-r-transparent" />
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-[#0B1F3A]">
            Loading Monograph...
          </p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex min-h-[70vh] w-full items-center justify-center bg-white px-6">
        <div className="text-center">
          <h2 className="text-2xl font-light text-[#171C22]">Article Not Found</h2>
          <p className="mt-2 text-xs text-[#44474D]">
            The requested perspective could not be found or has not been published yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ArticleHero blog={blog} />
      <ArticleBody blog={blog} />
      <ArticleActions />
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