import api from "@/lib/apiClient";
import SummaryApi, { buildUrl } from "@/constants/SummaryApi";

// Backend envelope: { success, data: [], summary: { totalInbound, newEnquiries, inProgress, responded }, pagination }

const displayId = (e) =>
  `ENQ-${new Date(e.createdAt).getFullYear()}-${String(e._id).slice(-5).toUpperCase()}`;

const hasValue = (v) => v || v === 0;

// readable detail rows for the selected interest type
const detailsOf = (e) => {
  if (e.interestType === "Independent Homes") {
    return [{ label: "Preferred Layout", value: e.independentHomes?.preferredHomeLayout || "" }];
  }

  const d = e.interestType === "Tailor Made" ? e.tailorMade : e.precast;

  return [
    { label: "Preferred Location", value: d?.preferredLocation || "" },
    {
      label: "Approx. Plot Area",
      value: hasValue(d?.approximatePlotArea)
        ? `${Number(d.approximatePlotArea).toLocaleString("en-IN")} sq.ft`
        : "",
    },
    { label: "Preferred Home Type", value: d?.preferredHomeType || "" },
  ];
};

const summaryOf = (e) => {
  if (e.interestType === "Independent Homes") return e.independentHomes?.preferredHomeLayout || "—";
  const d = e.interestType === "Tailor Made" ? e.tailorMade : e.precast;
  return [d?.preferredHomeType, d?.preferredLocation].filter(Boolean).join(" • ") || "—";
};

export const normalize = (e) => ({
  id: e._id,
  displayId: displayId(e),
  name: e.fullName,
  email: e.email,
  phone: e.phoneNumber,
  type: e.interestType,
  details: detailsOf(e),
  summary: summaryOf(e),
  message: e.message,
  status: e.status || "New",
  internalNotes: e.internalNotes || "",
  followUpAt: e.followUpAt || null,
  activities: (e.activities || []).map((a) => ({
    id: a._id,
    action: a.action,
    description: a.description || "",
    by: a.updatedBy?.username || a.createdBy?.username || "Admin",
    at: a.createdAt,
  })),
  createdAt: e.createdAt,
  updatedAt: e.updatedAt,
});

// -> { data, total, stats: { total, newCount, inProgress, responded } }
export const getEnquiries = async ({
  page = 1,
  limit = 10,
  search = "",
  interestType = "all",
  status = "all",
} = {}) => {
  const params = { page, limit };
  if (search.trim()) params.search = search.trim();
  if (interestType !== "all") params.interestType = interestType;
  if (status !== "all") params.status = status;

  const { url, method } = SummaryApi.getEnquiries;
  const res = await api({ url, method, params });

  const { data, summary, pagination } = res.data;
  return {
    data: (data || []).map(normalize),
    total: pagination.total,
    stats: {
      total: summary.totalInbound,
      newCount: summary.newEnquiries,
      inProgress: summary.inProgress,
      responded: summary.responded,
    },
  };
};

export const getEnquiryById = async (id) => {
  const { url, method } = buildUrl(SummaryApi.getEnquiryById, { id });
  const res = await api({ url, method });
  return normalize(res.data.data);
};

// payload: { internalNotes, followUpAt (ISO | "") }
export const updateEnquiry = async (id, payload) => {
  const { url, method } = buildUrl(SummaryApi.updateEnquiry, { id });
  const res = await api({ url, method, data: payload });
  return normalize(res.data.data);
};

export const updateEnquiryStatus = async (id, status) => {
  const { url, method } = buildUrl(SummaryApi.updateEnquiryStatus, { id });
  const res = await api({ url, method, data: { status } });
  return normalize(res.data.data);
};

// payload: { subject, message, markResponded }
export const sendEnquiryEmail = async (id, payload) => {
  const { url, method } = buildUrl(SummaryApi.replyEnquiry, { id });
  const res = await api({ url, method, data: payload });
  return res.data.data;
};

export const deleteEnquiry = async (id) => {
  const { url, method } = buildUrl(SummaryApi.deleteEnquiry, { id });
  const res = await api({ url, method });
  return res.data;
};