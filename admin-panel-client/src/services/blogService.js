import api from "@/lib/apiClient";
import SummaryApi, { buildUrl } from "@/constants/SummaryApi";
import { fromApiBlock } from "@/utils/blogBlocks";

// Backend envelope: { success, data: [], summary: { totalBlogs, published, drafts }, pagination }
// Backend status values are lowercase ("draft" | "published"), the UI uses "Draft" | "Published".

const cap = (s = "") => s.charAt(0).toUpperCase() + s.slice(1);

export const fmtDateTime = (d) =>
  d
    ? new Date(d).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";

export const timeAgo = (d) => {
  if (!d) return "";
  const s = Math.max(0, (Date.now() - new Date(d).getTime()) / 1000);
  const units = [
    [31536000, "year"],
    [2592000, "month"],
    [604800, "week"],
    [86400, "day"],
    [3600, "hour"],
    [60, "minute"],
  ];
  for (const [sec, name] of units) {
    const n = Math.floor(s / sec);
    if (n >= 1) return `${n} ${name}${n > 1 ? "s" : ""} ago`;
  }
  return "just now";
};

// ISO date <-> value of <input type="datetime-local">
export const toLocalInput = (d) => {
  if (!d) return "";
  const date = new Date(d);
  if (Number.isNaN(date.getTime())) return "";
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 16);
};

export const fromLocalInput = (v) => {
  if (!v) return "";
  const date = new Date(v);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString();
};

// published blog with a future publish date
export const isScheduled = (b) =>
  b.status === "Published" && !!b.publishedAt && new Date(b.publishedAt).getTime() > Date.now();

const makeExcerpt = (content = []) => {
  const first = content.find((c) => c.type === "text" && c.text);
  if (!first) return "";
  return first.text.length > 140 ? `${first.text.slice(0, 140).trim()}...` : first.text;
};

const normalize = (b) => ({
  id: b._id,
  title: b.title,
  slug: b.slug,
  category: b.category,
  author: b.author,
  tags: b.tags || [],
  heroImage: b.heroimage?.url || "",
  blocks: (b.content || []).map(fromApiBlock),
  excerpt: b.excerpt || makeExcerpt(b.content),
  excerptText: b.excerpt || "", // the real saved excerpt (no fallback), used by the edit form
  status: cap(b.status), // "Draft" | "Published"
  publishedAt: b.publishedAt || null,
  isFeatured: !!b.isFeatured,
  seoTitle: b.seoTitle || "",
  seoDescription: b.seoDescription || "",
  createdAt: b.createdAt,
  updatedAt: b.updatedAt,
});

// -> { data, total, stats: { total, published, drafts } }
export const getBlogs = async ({
  page = 1,
  limit = 10,
  search = "",
  category = "all",
  status = "all",
} = {}) => {
  const params = { page, limit };
  if (search.trim()) params.search = search.trim();
  if (category !== "all") params.category = category;
  if (status !== "all") params.status = status.toLowerCase();

  const { url, method } = SummaryApi.getBlogs;
  const res = await api({ url, method, params });

  const { data, summary, pagination } = res.data;
  return {
    data: (data || []).map(normalize),
    total: pagination.total,
    stats: {
      total: summary.totalBlogs,
      published: summary.published,
      drafts: summary.drafts,
    },
  };
};

const buildForm = (p) => {
  const fd = new FormData();
  fd.append("title", p.title);
  fd.append("category", p.category);
  fd.append("author", p.author);
  fd.append("status", p.status.toLowerCase());
  fd.append("excerpt", p.excerpt || "");
  fd.append("isFeatured", p.isFeatured ? "true" : "false");
  fd.append("publishedAt", p.publishedAt || ""); // empty = backend decides (now when published)
  fd.append("seoTitle", p.seoTitle || "");
  fd.append("seoDescription", p.seoDescription || "");
  fd.append("tags", JSON.stringify(p.tags || []));
  fd.append("content", JSON.stringify(p.content || []));
  fd.append("imagePositions", JSON.stringify(p.imagePositions || []));

  if (p.heroFile) fd.append("heroImage", p.heroFile);
  (p.imageFiles || []).forEach((f) => fd.append("image", f));
  return fd;
};

// payload: { title, category, author, excerpt, tags[], status, isFeatured, publishedAt (ISO | ""),
//            seoTitle, seoDescription, content[], imageFiles[], imagePositions[], heroFile }
export const createBlog = async (payload) => {
  const { url, method } = SummaryApi.createBlog;
  const res = await api({
    url,
    method,
    data: buildForm(payload),
    headers: { "Content-Type": "multipart/form-data" },
  });
  return normalize(res.data.data);
};

export const updateBlog = async (id, payload) => {
  const { url, method } = buildUrl(SummaryApi.updateBlog, { id });
  const res = await api({
    url,
    method,
    data: buildForm(payload),
    headers: { "Content-Type": "multipart/form-data" },
  });
  return normalize(res.data.data);
};

export const deleteBlog = async (id) => {
  const { url, method } = buildUrl(SummaryApi.deleteBlog, { id });
  const res = await api({ url, method });
  return res.data;
};



export const getBlogById = async (id) => {
  const { url, method } = buildUrl(SummaryApi.getBlogById, { id });
  const res = await api({ url, method });
  return normalize(res.data.data);
};