import api from "@/lib/apiClient";
import SummaryApi, { buildUrl } from "@/constants/SummaryApi";

// Backend envelope: { success, message, data: [], summary, pagination }

export const fmtAcreage = (n) => (n || n === 0 ? `${Number(n).toLocaleString("en-IN")} Acres` : "—");

export const fmtDate = (d) =>
  d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—";

// category / developmentStatus are arrays in the backend, the UI works with a single value
const first = (arr) => (Array.isArray(arr) && arr.length ? arr[0] : "");

const normalize = (p) => ({
  id: p._id,
  name: p.projectName,
  slug: p.slug,
  category: first(p.category),
  location: p.location,
  stage: first(p.developmentStatus),
  tagline: p.tagline || "",
  featuredImage: p.featuredImage?.url || "",
  // gallery images have no _id in the schema (_id: false), public_id is the identifier
  galleryImages: (p.galleryImages || []).map((img) => ({ id: img.public_id, url: img.url })),
  overview: p.projectOverview || "",
  highlights: p.architecturalHighlights || [],
  totalAcreage: p.totalAcreage ?? null,
  targetDelivery: p.targetDelivery || "",
  brochure: p.architecturalBrochure?.url
    ? { url: p.architecturalBrochure.url, name: p.architecturalBrochure.originalFilename }
    : null,
  status: p.publicationStatus, // "Draft" | "Published"
  updatedAt: p.updatedAt,
});

// -> { data, total, stats: { total, published, drafts } }
export const getProjects = async ({
  page = 1,
  limit = 10,
  search = "",
  category = "all",
  stage = "all",
  status = "all",
} = {}) => {
  const params = { page, limit };
  if (search.trim()) params.search = search.trim();
  if (category !== "all") params.category = category;
  if (stage !== "all") params.developmentStatus = stage;
  if (status !== "all") params.publicationStatus = status;

  const { url, method } = SummaryApi.getProjects;
  const res = await api({ url, method, params });

  const { data, summary, pagination } = res.data;
  return {
    data: (data || []).map(normalize),
    total: pagination.total,
    stats: {
      total: summary.totalProjects,
      published: summary.publishedProjects,
      drafts: summary.draftProjects,
    },
  };
};

// On update, clearable fields are sent as "" so they can be emptied.
const buildForm = (p, isUpdate) => {
  const fd = new FormData();

  const put = (key, value, clearable = false) => {
    const empty = value === undefined || value === null || value === "";
    if (empty && !(isUpdate && clearable)) return;
    fd.append(key, empty ? "" : value);
  };

  put("projectName", p.name);
  put("location", p.location);
  put("tagline", p.tagline, true);
  put("projectOverview", p.overview, true);
  put("totalAcreage", p.totalAcreage, true);
  put("targetDelivery", p.targetDelivery, true);
  put("publicationStatus", p.status);

  fd.append("category", JSON.stringify(p.category ? [p.category] : []));
  fd.append("developmentStatus", JSON.stringify(p.stage ? [p.stage] : []));
  fd.append("architecturalHighlights", JSON.stringify(p.highlights || []));

  // update: existing gallery images (public_id) that should stay
  if (isUpdate) fd.append("keepGalleryImages", JSON.stringify(p.keepGalleryIds || []));

  if (p.featuredFile) fd.append("featuredImage", p.featuredFile);
  (p.galleryFiles || []).forEach((f) => fd.append("galleryImages", f));
  if (p.brochureFile) fd.append("architecturalBrochure", p.brochureFile);

  return fd;
};

// payload: { name, category, location, stage, tagline, overview, highlights[], totalAcreage,
//            targetDelivery, status, featuredFile, galleryFiles[], keepGalleryIds[], brochureFile }
export const createProject = async (payload) => {
  const { url, method } = SummaryApi.createProject;
  const res = await api({
    url,
    method,
    data: buildForm(payload, false),
    headers: { "Content-Type": "multipart/form-data" },
  });
  return normalize(res.data.data);
};

export const updateProject = async (id, payload) => {
  const { url, method } = buildUrl(SummaryApi.updateProject, { id });
  const res = await api({
    url,
    method,
    data: buildForm(payload, true),
    headers: { "Content-Type": "multipart/form-data" },
  });
  return normalize(res.data.data);
};

export const deleteProject = async (id) => {
  const { url, method } = buildUrl(SummaryApi.deleteProject, { id });
  const res = await api({ url, method });
  return res.data;
};


export const getProjectById = async (id) => {
  const { url, method } = buildUrl(SummaryApi.getProjectById, { id });
  const res = await api({ url, method });
  return normalize(res.data.data);
};