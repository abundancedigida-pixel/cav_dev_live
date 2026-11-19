
import Property from "../models/Property.js";

// Create Property
export const createPropertyRepo = async (data) => {
  return await Property.create(data);
};

// Get All Properties
export const getAllPropertiesRepo = async (filter = {}, skip = 0, limit = 10) => {
  return await Property.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();
};

// Get Property By ID
export const getPropertyByIdRepo = async (id) => {
  return await Property.findById(id);
};

// Get Property By Slug
export const getPropertyBySlugRepo = async (slug) => {
  return await Property.findOne({ slug });
};

// Get Property By Name
const escapeRegex = (value) => String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const getPropertyByNameRepo = async (propertyName) => {
  return await Property.findOne({
    propertyName: {
      $regex: `^${escapeRegex(propertyName)}$`,
      $options: "i",
    },
  });
};

// Update Property
export const updatePropertyRepo = async (id, data) => {
  return await Property.findByIdAndUpdate(
    id,
    { $set: data },
    {
      returnDocument: "after",
      runValidators: true,
    }
  );
};

// Delete Property
export const deletePropertyRepo = async (id) => {
  return await Property.findByIdAndDelete(id);
};

// Count Properties
export const countPropertiesRepo = async (filter = {}) => {
  return await Property.countDocuments(filter);
};
