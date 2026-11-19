import slugify from "slugify";
import * as propertyRepo from "../repositories/propertyRepo.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../utils/cloudinaryUtil.js";
import { paginationHelper } from "../utils/paginationHelper.js";

// --------------------------------------------------
// CONSTANTS
// --------------------------------------------------

const FOLDERS = {
  featured: "cannon-avenue/properties/featured",
  gallery: "cannon-avenue/properties/gallery",
};

// Must match the multer limit (galleryImages maxCount) in uploadMiddleware.js
const MAX_GALLERY_IMAGES = 10;
const MAX_FLOORS = 100;
const MAX_UNITS = 400;
const MAX_PLACES = 20;

const DEVELOPMENT_STATUSES = ["Constructing", "Constructed", "Ready to Move"];
const PUBLICATION_STATUSES = ["Draft", "Published"];
const UNIT_STATUSES = ["Available", "Reserved", "Sold Out"];

// --------------------------------------------------
// HELPERS
// --------------------------------------------------

const escapeRegex = (value) => String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const isApartment = (type) => String(type || "").trim().toLowerCase() === "apartment";

// multipart text fields arrive as JSON strings
const parseStringArray = (raw) => {
  if (raw === undefined) return undefined;

  let list = raw;
  if (!Array.isArray(list)) {
    try {
      list = JSON.parse(raw);
    } catch {
      list = [];
    }
  }
  if (!Array.isArray(list)) return [];

  return [...new Set(list.map((item) => String(item).trim()).filter(Boolean))];
};

// JSON array of objects sent through multipart form-data
const parseObjectArray = (raw, label) => {
  if (raw === undefined) return undefined;

  let list = raw;
  if (!Array.isArray(list)) {
    try {
      list = JSON.parse(raw);
    } catch {
      throw new Error(`Invalid ${label} format`);
    }
  }
  if (!Array.isArray(list)) throw new Error(`Invalid ${label} format`);

  return list;
};

// undefined = not sent, null = cleared, number = value
const toNumber = (value, label, { required = false } = {}) => {
  if (value === undefined) return undefined;

  if (value === null || String(value).trim() === "") {
    if (required) throw new Error(`${label} is required`);
    return null;
  }

  const number = Number(value);
  if (!Number.isFinite(number) || number < 0) {
    throw new Error(`${label} must be a valid positive number`);
  }
  return number;
};

const toWholeNumber = (value, label, min, max) => {
  if (value === undefined) return undefined;
  if (value === null || String(value).trim() === "") return null;

  const number = Number(value);
  if (!Number.isInteger(number) || number < min || number > max) {
    throw new Error(`${label} must be a whole number between ${min} and ${max}`);
  }
  return number;
};

const toCoordinate = (value, label, min, max) => {
  if (value === undefined) return undefined;
  if (value === null || String(value).trim() === "") return null;

  const number = Number(value);
  if (!Number.isFinite(number) || number < min || number > max) {
    throw new Error(`${label} must be between ${min} and ${max}`);
  }
  return number;
};

const optionalNumber = (value, label, { integer = false } = {}) => {
  if (value === undefined || value === null || String(value).trim() === "") return null;

  const number = Number(value);
  if (!Number.isFinite(number) || number < 0 || (integer && !Number.isInteger(number))) {
    throw new Error(`${label} must be a valid ${integer ? "whole " : ""}positive number`);
  }
  return number;
};

const checkEnum = (value, allowed, label) => {
  if (value !== undefined && !allowed.includes(value)) {
    throw new Error(`Invalid ${label}`);
  }
};

const cleanFloorUnits = (list) => {
  if (list.length > MAX_UNITS) {
    throw new Error(`A maximum of ${MAX_UNITS} units is allowed`);
  }

  const seen = new Set();

  return list.map((item) => {
    const floor = Number(item?.floor);
    const unitName = String(item?.unitName ?? "").trim();
    const status = item?.status ?? "Available";

    if (!Number.isInteger(floor) || floor < 1 || floor > MAX_FLOORS) {
      throw new Error("Invalid floor number in the unit inventory");
    }
    if (!unitName || unitName.length > 60) {
      throw new Error("Each unit needs a name (maximum 60 characters)");
    }
    if (!UNIT_STATUSES.includes(status)) {
      throw new Error("Invalid unit status");
    }

    const key = `${floor}|${unitName.toLowerCase()}`;
    if (seen.has(key)) {
      throw new Error(`Duplicate unit on floor ${floor}: ${unitName}`);
    }
    seen.add(key);

    return { floor, unitName, status };
  });
};

const cleanNearbyPlaces = (list) => {
  if (list.length > MAX_PLACES) {
    throw new Error(`A maximum of ${MAX_PLACES} nearby places is allowed`);
  }

  return list.map((item) => {
    const name = String(item?.name ?? "").trim();
    const category = String(item?.category ?? "").trim() || "Other";

    if (!name || name.length > 120) {
      throw new Error("Each nearby place needs a name (maximum 120 characters)");
    }
    if (category.length > 60) {
      throw new Error("Nearby place category is too long");
    }

    return {
      category,
      name,
      distanceKm: optionalNumber(item?.distanceKm, "Distance"),
      travelMins: optionalNumber(item?.travelMins, "Travel time", { integer: true }),
    };
  });
};

// Accept only known fields from the request body
const pickPropertyFields = (data = {}) => {
  const fields = {};

  const textKeys = [
    "propertyName",
    "propertyType",
    "location",
    "tagline",
    "description",
    "architecturalHighlights",
  ];
  textKeys.forEach((key) => {
    if (data[key] !== undefined) fields[key] = String(data[key]).trim();
  });

  ["propertyName", "propertyType", "location"].forEach((key) => {
    if (fields[key] !== undefined && !fields[key]) {
      throw new Error(`${key} cannot be empty`);
    }
  });

  const plotArea = toNumber(data.plotArea, "Plot area");
  const builtUpArea = toNumber(data.builtUpArea, "Built-up area");
  const pricePerSqft = toNumber(data.pricePerSqft, "Price per sq.ft", { required: true });

  if (plotArea !== undefined) fields.plotArea = plotArea;
  if (builtUpArea !== undefined) fields.builtUpArea = builtUpArea;
  if (pricePerSqft !== undefined) fields.pricePerSqft = pricePerSqft;

  checkEnum(data.developmentStatus, DEVELOPMENT_STATUSES, "development status");
  checkEnum(data.publicationStatus, PUBLICATION_STATUSES, "publication status");
  if (data.developmentStatus !== undefined) fields.developmentStatus = data.developmentStatus;
  if (data.publicationStatus !== undefined) fields.publicationStatus = data.publicationStatus;

  const keyFeatures = parseStringArray(data.keyFeatures);
  if (keyFeatures !== undefined) fields.keyFeatures = keyFeatures;

  // Apartment inventory
  const totalFloors = toWholeNumber(data.totalFloors, "Total floors", 1, MAX_FLOORS);
  if (totalFloors !== undefined) fields.totalFloors = totalFloors;

  if (data.inventoryPreset !== undefined) {
    const preset = String(data.inventoryPreset).trim();
    if (preset.length > 80) throw new Error("Inventory preset is too long");
    fields.inventoryPreset = preset;
  }

  const floorUnits = parseObjectArray(data.floorUnits, "floor units");
  if (floorUnits !== undefined) fields.floorUnits = cleanFloorUnits(floorUnits);

  // Geospatial
  const latitude = toCoordinate(data.latitude, "Latitude", -90, 90);
  const longitude = toCoordinate(data.longitude, "Longitude", -180, 180);
  if (latitude !== undefined) fields.latitude = latitude;
  if (longitude !== undefined) fields.longitude = longitude;

  const nearbyPlaces = parseObjectArray(data.nearbyPlaces, "nearby places");
  if (nearbyPlaces !== undefined) fields.nearbyPlaces = cleanNearbyPlaces(nearbyPlaces);

  return fields;
};

// Apartment data only makes sense for the Apartment type, everything else is cleared
const normalizeApartmentFields = (fields, finalType) => {
  if (!isApartment(finalType)) {
    fields.totalFloors = null;
    fields.inventoryPreset = "";
    fields.floorUnits = [];
    return;
  }

  if (
    fields.totalFloors != null &&
    fields.floorUnits?.some((unit) => unit.floor > fields.totalFloors)
  ) {
    throw new Error("The unit inventory has floors above the total floors");
  }
};

const checkCoordinatePair = (latitude, longitude) => {
  if ((latitude == null) !== (longitude == null)) {
    throw new Error("Both latitude and longitude are required");
  }
};

const generateUniqueSlug = async (propertyName, excludeId = null) => {
  const baseSlug =
    slugify(propertyName, { lower: true, strict: true, trim: true }) || "property";

  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await propertyRepo.getPropertyBySlugRepo(slug);

    if (!existing || (excludeId && existing._id.toString() === excludeId.toString())) {
      break;
    }

    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
};

const uploadPropertyImage = async (file, folder) => {
  const uploaded = await uploadToCloudinary(file.buffer, folder, "image");

  return {
    url: uploaded.url,
    public_id: uploaded.publicId,
    originalFilename: file.originalname,
    uploadedAt: new Date(),
  };
};

// Best-effort cleanup, never throws
const deleteImages = async (publicIds = []) => {
  await Promise.all(
    publicIds.filter(Boolean).map((publicId) =>
      deleteFromCloudinary(publicId).catch((error) =>
        console.error("Property image cleanup failed:", publicId, error.message)
      )
    )
  );
};

// --------------------------------------------------
// CREATE
// --------------------------------------------------

export const createPropertyService = async (data, files = {}) => {
  const fields = pickPropertyFields(data);

  ["propertyName", "propertyType", "location"].forEach((key) => {
    if (!fields[key]) throw new Error(`${key} is required`);
  });
  if (fields.pricePerSqft === undefined) throw new Error("Price per sq.ft is required");

  normalizeApartmentFields(fields, fields.propertyType);
  checkCoordinatePair(fields.latitude, fields.longitude);

  const featuredFile = files.featuredImage?.[0];
  const galleryFiles = files.galleryImages || [];

  if (fields.publicationStatus === "Published" && !featuredFile) {
    throw new Error("A featured image is required to publish");
  }

  if (galleryFiles.length > MAX_GALLERY_IMAGES) {
    throw new Error(`A maximum of ${MAX_GALLERY_IMAGES} gallery images is allowed`);
  }

  const existing = await propertyRepo.getPropertyByNameRepo(fields.propertyName);
  if (existing) throw new Error("Property name already exists");

  const slug = await generateUniqueSlug(fields.propertyName);
  const propertyData = { ...fields, slug };

  const uploadedIds = [];

  try {
    if (featuredFile) {
      propertyData.featuredImage = await uploadPropertyImage(featuredFile, FOLDERS.featured);
      uploadedIds.push(propertyData.featuredImage.public_id);
    }

    if (galleryFiles.length) {
      propertyData.galleryImages = await Promise.all(
        galleryFiles.map((file) => uploadPropertyImage(file, FOLDERS.gallery))
      );
      propertyData.galleryImages.forEach((img) => uploadedIds.push(img.public_id));
    }

    return await propertyRepo.createPropertyRepo(propertyData);
  } catch (error) {
    await deleteImages(uploadedIds);
    throw error;
  }
};

// --------------------------------------------------
// LIST (with dashboard counts)
// --------------------------------------------------

export const getAllPropertyService = async (query = {}) => {
  const { page, limit, paginate, skip } = paginationHelper(query);

  const filter = {};

  if (query.search?.trim()) {
    const searchRegex = new RegExp(escapeRegex(query.search.trim()), "i");
    filter.$or = [{ propertyName: searchRegex }, { location: searchRegex }];
  }

  if (query.propertyType) filter.propertyType = query.propertyType;
  if (query.developmentStatus) filter.developmentStatus = query.developmentStatus;
  if (query.publicationStatus) filter.publicationStatus = query.publicationStatus;

  const [properties, filteredTotal, totalProperties, published, draftsAndReview] =
    await Promise.all([
      propertyRepo.getAllPropertiesRepo(filter, skip, paginate ? limit : 0),
      propertyRepo.countPropertiesRepo(filter),
      propertyRepo.countPropertiesRepo(),
      propertyRepo.countPropertiesRepo({ publicationStatus: "Published" }),
      propertyRepo.countPropertiesRepo({ publicationStatus: "Draft" }),
    ]);

  const totalPages = paginate ? Math.ceil(filteredTotal / limit) : 1;

  return {
    summary: { totalProperties, published, draftsAndReview },
    properties,
    pagination: {
      total: filteredTotal,
      page,
      limit: paginate ? limit : filteredTotal,
      totalPages,
      hasNextPage: paginate && page < totalPages,
      hasPreviousPage: paginate && page > 1,
    },
  };
};

// --------------------------------------------------
// READ ONE
// --------------------------------------------------

export const getPropertyByIdService = async (id) => {
  const property = await propertyRepo.getPropertyByIdRepo(id);
  if (!property) throw new Error("Property not found");
  return property;
};

export const getPropertyBySlugService = async (slug) => {
  const property = await propertyRepo.getPropertyBySlugRepo(slug);
  if (!property) throw new Error("Property not found");
  return property;
};

// --------------------------------------------------
// UPDATE
// --------------------------------------------------

export const updatePropertyService = async (id, data, files = {}) => {
  const property = await propertyRepo.getPropertyByIdRepo(id);
  if (!property) throw new Error("Property not found");

  const updateData = pickPropertyFields(data);

  normalizeApartmentFields(updateData, updateData.propertyType ?? property.propertyType);
  checkCoordinatePair(
    updateData.latitude !== undefined ? updateData.latitude : property.latitude,
    updateData.longitude !== undefined ? updateData.longitude : property.longitude
  );

  const featuredFile = files.featuredImage?.[0];
  const galleryFiles = files.galleryImages || [];

  // Publishing needs a featured image (existing or newly uploaded)
  const finalStatus = updateData.publicationStatus ?? property.publicationStatus;
  if (finalStatus === "Published" && !featuredFile && !property.featuredImage?.url) {
    throw new Error("A featured image is required to publish");
  }

  // Slug follows the name
  if (updateData.propertyName && updateData.propertyName !== property.propertyName) {
    const existing = await propertyRepo.getPropertyByNameRepo(updateData.propertyName);

    if (existing && existing._id.toString() !== id.toString()) {
      throw new Error("Property name already exists");
    }

    updateData.slug = await generateUniqueSlug(updateData.propertyName, id);
  }

  // Gallery: remove the selected images, append the new ones
  const removeIds = parseStringArray(data.removeGalleryImageIds) || [];
  const removedImages = property.galleryImages.filter((img) => removeIds.includes(img.public_id));
  const keptImages = property.galleryImages
    .filter((img) => !removeIds.includes(img.public_id))
    .map((img) => img.toObject());

  if (keptImages.length + galleryFiles.length > MAX_GALLERY_IMAGES) {
    throw new Error(`A maximum of ${MAX_GALLERY_IMAGES} gallery images is allowed`);
  }

  const uploadedIds = [];

  try {
    let newGalleryImages = [];
    if (galleryFiles.length) {
      newGalleryImages = await Promise.all(
        galleryFiles.map((file) => uploadPropertyImage(file, FOLDERS.gallery))
      );
      newGalleryImages.forEach((img) => uploadedIds.push(img.public_id));
    }

    if (removedImages.length || newGalleryImages.length) {
      updateData.galleryImages = [...keptImages, ...newGalleryImages];
    }

    // Featured image: replace
    let oldFeaturedId = null;
    if (featuredFile) {
      updateData.featuredImage = await uploadPropertyImage(featuredFile, FOLDERS.featured);
      uploadedIds.push(updateData.featuredImage.public_id);
      oldFeaturedId = property.featuredImage?.public_id || null;
    }

    const updated = await propertyRepo.updatePropertyRepo(id, updateData);
    if (!updated) throw new Error("Property update failed");

    // Old files are removed only after the DB update succeeded
    await deleteImages([...removedImages.map((img) => img.public_id), oldFeaturedId]);

    return updated;
  } catch (error) {
    // The update failed, so remove what was just uploaded
    await deleteImages(uploadedIds);
    throw error;
  }
};

// --------------------------------------------------
// DELETE
// --------------------------------------------------

export const deletePropertyService = async (id) => {
  const property = await propertyRepo.getPropertyByIdRepo(id);
  if (!property) throw new Error("Property not found");

  await propertyRepo.deletePropertyRepo(id);

  await deleteImages([
    property.featuredImage?.public_id,
    ...(property.galleryImages || []).map((img) => img.public_id),
  ]);

  return {
    message: "Property deleted successfully",
    deletedProperty: property,
  };
};