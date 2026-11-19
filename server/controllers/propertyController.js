
import * as propertyService from "../services/propertyService.js";

// Create Property
export const createPropertyController = async (req, res) => {
  try {
    const property = await propertyService.createPropertyService(
      req.body,
      req.files
    );

    return res.status(201).json({
      success: true,
      message: "Property created successfully",
      data: property,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Properties
export const getAllPropertiesController = async (req, res) => {
  try {
    const result = await propertyService.getAllPropertyService(req.query);

    return res.status(200).json({
      success: true,
      message: "Properties fetched successfully",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Property By ID
export const getPropertyByIdController = async (req, res) => {
  try {
    const property = await propertyService.getPropertyByIdService(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "Property fetched successfully",
      data: property,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Property By Slug
export const getPropertyBySlugController = async (req, res) => {
  try {
    const property = await propertyService.getPropertyBySlugService(
      req.params.slug
    );

    return res.status(200).json({
      success: true,
      message: "Property fetched successfully",
      data: property,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Property
export const updatePropertyController = async (req, res) => {
  try {
    const property = await propertyService.updatePropertyService(
      req.params.id,
      req.body,
      req.files
    );

    return res.status(200).json({
      success: true,
      message: "Property updated successfully",
      data: property,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Property
export const deletePropertyController = async (req, res) => {
  try {
    const result = await propertyService.deletePropertyService(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.deletedProperty,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
