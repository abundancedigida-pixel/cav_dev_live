import api from "@/lib/apiClient";
import SummaryApi from "@/constants/SummaryApi";

// Backend envelope: { success, message, data }

// "In_Progress" / "in progress" / "New Inquiry" -> consistent label
const cleanStatus = (value = "") => String(value).replace(/_/g, " ").trim();

export const formatWhen = (value) => {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return { day: "—", time: "" };

  const startOf = (x) => new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime();
  const diff = Math.round((startOf(new Date()) - startOf(d)) / 86400000);

  let day;
  if (diff <= 0) day = "Today";
  else if (diff === 1) day = "Yesterday";
  else if (diff < 7) day = `${diff} days ago`;
  else day = d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

  const time = d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
  return { day, time };
};

// -> { summary, recentEnquiries[], recentContent[] }
export const getDashboard = async () => {
  const { url, method } = SummaryApi.getDashboard;
  const res = await api({ url, method });
  const d = res.data.data || {};
  const s = d.summary || {};

  return {
    summary: {
      blogs: s.totalBlogs ?? 0,
      properties: s.activeProperties ?? 0,
      projects: s.activeProjects ?? 0,
      newEnquiries: s.newEnquiries ?? 0,
    },
    recentEnquiries: (d.recentEnquiries || []).map((e) => ({
      id: e._id,
      name: e.fullName || "Unknown",
      email: e.email || e.emailAddress || "",
      type: e.interestType || "General Enquiry",
      status: cleanStatus(e.status) || "New",
      date: e.createdAt,
    })),
    recentContent: (d.recentlyUpdatedContent || []).map((c) => ({
      id: c._id,
      title: c.title,
      type: c.type, // "Blog Article" | "Property Listing" | "Project Portfolio"
      status: cleanStatus(c.status),
      date: c.updatedAt,
    })),
  };
};