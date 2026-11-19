import api from "@/lib/apiClient";
import SummaryApi, { buildUrl } from "@/constants/SummaryApi";

// Backend envelope: { success, message, data }

export const fmtArea = (n) => (n || n === 0 ? Number(n).toLocaleString("en-IN") : "—");
export const fmtRate = (n) => (n || n === 0 ? Number(n).toLocaleString("en-IN") : "—");

// backend property -> frontend shape
const normalize = (p) => ({
  id: p._id,
  name: p.propertyName,
  slug: p.slug,
  type: p.propertyType,
  location: p.location,
  tagline: p.tagline || "",
  description: p.description || "",
  featuredImage: p.featuredImage?.url || "",
  // gallery images have no _id in the backend schema, so public_id is the identifier
  galleryImages: (p.galleryImages || []).map((img) => ({ id: img.public_id, url: img.url })),
  plotArea: p.plotArea ?? null,
  builtUpArea: p.builtUpArea ?? null,
  pricePerSqft: p.pricePerSqft ?? null,
  availability: p.developmentStatus, // "Constructing" | "Constructed" | "Ready to Move"
  status: p.publicationStatus, // "Draft" | "Published"
  keyFeatures: p.keyFeatures || [],
  highlights: p.architecturalHighlights || "",

  // apartment inventory
  totalFloors: p.totalFloors ?? null,
  inventoryPreset: p.inventoryPreset || "",
  floorUnits: (p.floorUnits || []).map((u) => ({
    key: `${u.floor}|${u.unitName}`,
    floor: u.floor,
    unitName: u.unitName,
    status: u.status,
  })),

  // geospatial
  latitude: p.latitude ?? null,
  longitude: p.longitude ?? null,
  nearbyPlaces: (p.nearbyPlaces || []).map((n, i) => ({
    key: `${i}|${n.category}|${n.name}`,
    category: n.category || "Other",
    name: n.name,
    distanceKm: n.distanceKm ?? null,
    travelMins: n.travelMins ?? null,
  })),

  date: p.createdAt,
});

// -> { data, total, stats: { total, published, drafts } }
export const getProperties = async ({
  page = 1,
  limit = 10,
  search = "",
  propertyType = "all",
  availability = "all",
  status = "all",
} = {}) => {
  const params = { page, limit };
  if (search.trim()) params.search = search.trim();
  if (propertyType !== "all") params.propertyType = propertyType;
  if (availability !== "all") params.developmentStatus = availability;
  if (status !== "all") params.publicationStatus = status;

  const { url, method } = SummaryApi.getProperties;
  const res = await api({ url, method, params });

  const { summary, properties, pagination } = res.data.data;
  return {
    data: properties.map(normalize),
    total: pagination.total,
    stats: {
      total: summary.totalProperties,
      published: summary.published,
      drafts: summary.draftsAndReview,
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

  put("propertyName", p.name);
  put("propertyType", p.type);
  put("location", p.location);
  put("tagline", p.tagline, true);
  put("description", p.description, true);
  put("plotArea", p.plotArea, true);
  put("builtUpArea", p.builtUpArea, true);
  put("pricePerSqft", p.pricePerSqft);
  put("developmentStatus", p.availability);
  put("publicationStatus", p.status);
  put("architecturalHighlights", p.highlights, true);
  fd.append("keyFeatures", JSON.stringify(p.keyFeatures || []));

  // apartment inventory (empty values clear the data on update)
  put("totalFloors", p.totalFloors, true);
  put("inventoryPreset", p.inventoryPreset, true);
  fd.append("floorUnits", JSON.stringify(p.floorUnits || []));

  // geospatial
  put("latitude", p.latitude, true);
  put("longitude", p.longitude, true);
  fd.append("nearbyPlaces", JSON.stringify(p.nearbyPlaces || []));

  if (isUpdate && p.removeGalleryImageIds?.length) {
    fd.append("removeGalleryImageIds", JSON.stringify(p.removeGalleryImageIds));
  }

  if (p.featuredFile) fd.append("featuredImage", p.featuredFile);
  (p.galleryFiles || []).forEach((f) => fd.append("galleryImages", f));

  return fd;
};

// payload: { name, type, location, tagline, description, plotArea, builtUpArea, pricePerSqft,
//            availability, status, keyFeatures[], highlights, totalFloors, inventoryPreset,
//            floorUnits[{ floor, unitName, status }], latitude, longitude,
//            nearbyPlaces[{ category, name, distanceKm, travelMins }],
//            featuredFile, galleryFiles[], removeGalleryImageIds[] }
export const createProperty = async (payload) => {
  const { url, method } = SummaryApi.createProperty;
  const res = await api({
    url,
    method,
    data: buildForm(payload, false),
    headers: { "Content-Type": "multipart/form-data" },
  });
  return normalize(res.data.data);
};

export const updateProperty = async (id, payload) => {
  const { url, method } = buildUrl(SummaryApi.updateProperty, { id });
  const res = await api({
    url,
    method,
    data: buildForm(payload, true),
    headers: { "Content-Type": "multipart/form-data" },
  });
  return normalize(res.data.data);
};

export const deleteProperty = async (id) => {
  const { url, method } = buildUrl(SummaryApi.deleteProperty, { id });
  const res = await api({ url, method });
  return res.data;
};

export const getPropertyById = async (id) => {
  const { url, method } = buildUrl(SummaryApi.getPropertyById, { id });
  const res = await api({ url, method });
  return normalize(res.data.data);
};