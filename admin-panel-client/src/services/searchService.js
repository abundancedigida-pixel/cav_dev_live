import { getBlogs } from "@/services/blogService";
import { getProperties } from "@/services/propertyService";
import { getProjects } from "@/services/projectService";
import { getEnquiries } from "@/services/enquiryService";

const LIMIT = 4;

// One failing module must not break the whole search
const safe = async (request, map) => {
  try {
    const res = await request;
    return res.data.map(map);
  } catch {
    return [];
  }
};

// -> { blogs[], properties[], projects[], enquiries[] }, each item: { id, title, sub, href }
export const searchAll = async (term) => {
  const params = { page: 1, limit: LIMIT, search: term };

  const [blogs, properties, projects, enquiries] = await Promise.all([
    safe(getBlogs(params), (b) => ({
      id: b.id,
      title: b.title,
      sub: [b.category, b.status].filter(Boolean).join(" • "),
      href: `/admin/blogs?edit=${b.id}`,
    })),
    safe(getProperties(params), (p) => ({
      id: p.id,
      title: p.name,
      sub: [p.type, p.location].filter(Boolean).join(" • "),
      href: `/admin/properties?edit=${p.id}`,
    })),
    safe(getProjects(params), (p) => ({
      id: p.id,
      title: p.name,
      sub: [p.category, p.location].filter(Boolean).join(" • "),
      href: `/admin/projects?edit=${p.id}`,
    })),
    safe(getEnquiries(params), (e) => ({
      id: e.id,
      title: e.name || "Unknown",
      sub: e.email || e.displayId,
      href: `/admin/enquiries?view=${e.id}`,
    })),
  ]);

  return { blogs, properties, projects, enquiries };
};