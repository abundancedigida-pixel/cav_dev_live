
import * as enquiryService from "../services/enquiryService.js";

// Create Enquiry (Public)
export const createEnquiryController = async (req, res) => {
  try {
    const result = await enquiryService.createEnquiryService(req.body);

    return res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Enquiries (Includes Summary, Activities and Pagination)
export const getAllEnquiriesController = async (req, res) => {
  try {
    const result = await enquiryService.getAllEnquiriesService(req.query);

    return res.status(200).json({
      success: true,
      message: "Enquiries fetched successfully",
      data: result.enquiries,
      summary: result.summary,
      pagination: result.pagination,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Enquiry By ID
export const getEnquiryByIdController = async (req, res) => {
  try {
    const result = await enquiryService.getEnquiryByIdService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Enquiry fetched successfully",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Enquiry (Login Required)
// Service adds the activity automatically.
export const updateEnquiryController = async (req, res) => {
  try {
    const userId = req.user?.id;

    const result = await enquiryService.updateEnquiryService(
      req.params.id,
      req.body,
      userId
    );

    return res.status(200).json({
      success: true,
      message: "Enquiry updated successfully",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Enquiry Status (Login Required)
// Service adds the status-change activity automatically.
export const updateEnquiryStatusController = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { status } = req.body;

    const result = await enquiryService.updateEnquiryStatusService(
      req.params.id,
      status,
      userId
    );

    return res.status(200).json({
      success: true,
      message: "Enquiry status updated successfully",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Enquiry (Login Required)
// Permanent deletion; no activity is added.
export const deleteEnquiryController = async (req, res) => {
  try {
    const result = await enquiryService.deleteEnquiryService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Enquiry deleted successfully",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// Send Email to Customer (Login Required)
export const sendEnquiryEmailController = async (req, res) => {
  try {
    const userId = req.user?.id;

    const result = await enquiryService.sendEnquiryEmailService(
      req.params.id,
      req.body,
      userId
    );

    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};