import mongoose from "mongoose";
import * as enquiryRepo from "../repositories/enquiryRepo.js";
import { paginationHelper } from "../utils/paginationHelper.js";
import { sendEnquiryReplyEmail } from "../utils/emailUtil.js";
import { createNotificationService } from "./notificationService.js";

// -------------------------------------
// Constants
// -------------------------------------

const ALLOWED_STATUSES = ["New", "In Progress", "Responded"];

const ALLOWED_INTEREST_TYPES = ["Independent Homes", "Tailor Made", "Precast"];

const FIELD_LABELS = {
  fullName: "Full name",
  email: "Email",
  phoneNumber: "Phone number",
  message: "Message",
  interestType: "Enquiry type",
  independentHomes: "Home layout",
  tailorMade: "Tailor made details",
  precast: "Precast details",
  internalNotes: "Internal notes",
  followUpAt: "Follow-up target",
};

// -------------------------------------
// Helper Functions
// -------------------------------------

const validateObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid enquiry ID");
  }
};

const validateUserId = (userId) => {
  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Valid logged-in user ID is required");
  }
};

const escapeRegex = (value) => {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

const validateHomeDetails = (details, type) => {
  if (!details) {
    throw new Error(`${type} details are required`);
  }

  if (
    typeof details.preferredLocation !== "string" ||
    !details.preferredLocation.trim() ||
    details.approximatePlotArea === undefined ||
    details.approximatePlotArea === null ||
    details.approximatePlotArea === "" ||
    !Number.isFinite(Number(details.approximatePlotArea)) ||
    Number(details.approximatePlotArea) < 0 ||
    typeof details.preferredHomeType !== "string" ||
    !details.preferredHomeType.trim()
  ) {
    throw new Error(`Please provide valid ${type} details`);
  }
};

const getActiveEnquiry = async (id) => {
  validateObjectId(id);

  const enquiry = await enquiryRepo.getEnquiryByIdRepo(id);

  if (!enquiry) {
    throw new Error("Enquiry not found");
  }

  return enquiry;
};

// -------------------------------------
// Create Enquiry
// Public API - No login required
// -------------------------------------

export const createEnquiryService = async (data) => {
  const {
    fullName,
    email,
    phoneNumber,
    interestType,
    independentHomes,
    tailorMade,
    precast,
    message,
  } = data;

  if (
    typeof fullName !== "string" ||
    !fullName.trim() ||
    typeof email !== "string" ||
    !email.trim() ||
    typeof phoneNumber !== "string" ||
    !phoneNumber.trim() ||
    !interestType ||
    typeof message !== "string" ||
    !message.trim()
  ) {
    throw new Error("Please provide all required enquiry fields");
  }

  if (!ALLOWED_INTEREST_TYPES.includes(interestType)) {
    throw new Error("Invalid enquiry interest type");
  }

  const enquiryData = {
    fullName: fullName.trim(),
    email: email.trim().toLowerCase(),
    phoneNumber: phoneNumber.trim(),
    interestType,
    message: message.trim(),
    status: "New",
  };

  // Independent Homes
  if (interestType === "Independent Homes") {
    const layout = independentHomes?.preferredHomeLayout;

    if (!["2BHK", "3BHK", "Not Sure Yet"].includes(layout)) {
      throw new Error("Please select a valid preferred home layout");
    }

    enquiryData.independentHomes = {
      preferredHomeLayout: layout,
    };
  }

  // Tailor Made
  if (interestType === "Tailor Made") {
    validateHomeDetails(tailorMade, "Tailor Made");

    enquiryData.tailorMade = {
      preferredLocation: tailorMade.preferredLocation.trim(),
      approximatePlotArea: Number(tailorMade.approximatePlotArea),
      preferredHomeType: tailorMade.preferredHomeType.trim(),
    };
  }

  // Precast
  if (interestType === "Precast") {
    validateHomeDetails(precast, "Precast");

    enquiryData.precast = {
      preferredLocation: precast.preferredLocation.trim(),
      approximatePlotArea: Number(precast.approximatePlotArea),
      preferredHomeType: precast.preferredHomeType.trim(),
    };
  }

  // Public submission: no admin activity or createdBy
  const enquiry = await enquiryRepo.createEnquiryRepo(enquiryData);

  // Notify the admin panel. A failure here must never fail the customer's submission.
  try {
    await createNotificationService({
      type: "enquiry",
      title: "New enquiry received",
      message: `${enquiry.fullName} enquired about ${enquiry.interestType}.`,
      entityId: enquiry._id,
    });
  } catch (error) {
    console.error("Enquiry notification failed:", error.message);
  }

  return enquiry;
};

// -------------------------------------
// Get All Enquiries
// Pagination + Search + Filters + Summary
// -------------------------------------

export const getAllEnquiriesService = async (query = {}) => {
  const { page, limit, paginate, skip } = paginationHelper(query);

  const filter = {};

  if (query.status) {
    if (!ALLOWED_STATUSES.includes(query.status)) {
      throw new Error("Invalid enquiry status");
    }

    filter.status = query.status;
  }

  if (query.interestType) {
    if (!ALLOWED_INTEREST_TYPES.includes(query.interestType)) {
      throw new Error("Invalid enquiry interest type");
    }

    filter.interestType = query.interestType;
  }

  if (query.search?.trim()) {
    const search = escapeRegex(query.search.trim());

    filter.$or = [
      { fullName: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { phoneNumber: { $regex: search, $options: "i" } },
    ];
  }

  const [enquiries, total, summary] = await Promise.all([
    enquiryRepo.getAllEnquiriesRepo(filter, skip, paginate ? limit : 0),

    enquiryRepo.countEnquiriesRepo(filter),

    enquiryRepo.getEnquiryDashboardCountsRepo(),
  ]);

  return {
    enquiries,
    summary,
    pagination: {
      total,
      page,
      limit: paginate ? limit : total,
      totalPages: paginate ? Math.ceil(total / limit) : total > 0 ? 1 : 0,
      hasNextPage: paginate ? page * limit < total : false,
      hasPrevPage: paginate ? page > 1 : false,
    },
  };
};

// -------------------------------------
// Get Enquiry By ID
// -------------------------------------

export const getEnquiryByIdService = async (id) => {
  return await getActiveEnquiry(id);
};

// -------------------------------------
// Update Enquiry
// Login required
// Add activity
// -------------------------------------

export const updateEnquiryService = async (id, data, userId) => {
  validateUserId(userId);

  const existingEnquiry = await getActiveEnquiry(id);

  const {
    fullName,
    email,
    phoneNumber,
    interestType,
    independentHomes,
    tailorMade,
    precast,
    message,
    internalNotes,
    followUpAt,
  } = data;

  const updateData = {};
  const unsetFields = [];

  if (fullName !== undefined) {
    if (typeof fullName !== "string" || !fullName.trim()) {
      throw new Error("Full name is required");
    }

    updateData.fullName = fullName.trim();
  }

  if (email !== undefined) {
    if (typeof email !== "string" || !email.trim()) {
      throw new Error("Email is required");
    }

    updateData.email = email.trim().toLowerCase();
  }

  if (phoneNumber !== undefined) {
    if (typeof phoneNumber !== "string" || !phoneNumber.trim()) {
      throw new Error("Phone number is required");
    }

    updateData.phoneNumber = phoneNumber.trim();
  }

  if (message !== undefined) {
    if (typeof message !== "string" || !message.trim()) {
      throw new Error("Message is required");
    }

    updateData.message = message.trim();
  }

  // Internal admin notes
  if (internalNotes !== undefined) {
    if (typeof internalNotes !== "string") {
      throw new Error("Internal notes must be text");
    }

    if (internalNotes.trim().length > 2000) {
      throw new Error("Internal notes cannot exceed 2000 characters");
    }

    updateData.internalNotes = internalNotes.trim();
  }

  // Follow-up target (empty value clears it)
  if (followUpAt !== undefined) {
    if (followUpAt === "" || followUpAt === null) {
      updateData.followUpAt = null;
    } else {
      const date = new Date(followUpAt);

      if (Number.isNaN(date.getTime())) {
        throw new Error("Invalid follow-up date");
      }

      updateData.followUpAt = date;
    }
  }

  const nextInterestType = interestType ?? existingEnquiry.interestType;

  if (!ALLOWED_INTEREST_TYPES.includes(nextInterestType)) {
    throw new Error("Invalid enquiry interest type");
  }

  const interestTypeChanged = nextInterestType !== existingEnquiry.interestType;

  if (interestType !== undefined) {
    updateData.interestType = nextInterestType;
  }

  // Remove unselected nested objects when changing interest type
  if (interestTypeChanged) {
    const selectedField =
      nextInterestType === "Independent Homes"
        ? "independentHomes"
        : nextInterestType === "Tailor Made"
          ? "tailorMade"
          : "precast";

    for (const field of ["independentHomes", "tailorMade", "precast"]) {
      if (field !== selectedField) {
        unsetFields.push(field);
      }
    }
  }

  // Independent Homes details
  if (nextInterestType === "Independent Homes") {
    const details = independentHomes ?? existingEnquiry.independentHomes;

    const layout = details?.preferredHomeLayout;

    if (!["2BHK", "3BHK", "Not Sure Yet"].includes(layout)) {
      throw new Error("Please select a valid preferred home layout");
    }

    if (independentHomes !== undefined || interestTypeChanged) {
      updateData.independentHomes = {
        preferredHomeLayout: layout,
      };
    }
  }

  // Tailor Made details
  if (nextInterestType === "Tailor Made") {
    const existingDetails =
      existingEnquiry.tailorMade?.toObject?.() ?? existingEnquiry.tailorMade;

    const details = interestTypeChanged
      ? tailorMade
      : { ...existingDetails, ...tailorMade };

    if (interestTypeChanged || tailorMade !== undefined) {
      validateHomeDetails(details, "Tailor Made");

      updateData.tailorMade = {
        preferredLocation: details.preferredLocation.trim(),
        approximatePlotArea: Number(details.approximatePlotArea),
        preferredHomeType: details.preferredHomeType.trim(),
      };
    }
  }

  // Precast details
  if (nextInterestType === "Precast") {
    const existingDetails =
      existingEnquiry.precast?.toObject?.() ?? existingEnquiry.precast;

    const details = interestTypeChanged
      ? precast
      : { ...existingDetails, ...precast };

    if (interestTypeChanged || precast !== undefined) {
      validateHomeDetails(details, "Precast");

      updateData.precast = {
        preferredLocation: details.preferredLocation.trim(),
        approximatePlotArea: Number(details.approximatePlotArea),
        preferredHomeType: details.preferredHomeType.trim(),
      };
    }
  }

  if (Object.keys(updateData).length === 0 && unsetFields.length === 0) {
    throw new Error("No changes provided for enquiry update");
  }

  const updatedEnquiry = await enquiryRepo.updateEnquiryRepo(
    id,
    updateData,
    unsetFields
  );

  if (!updatedEnquiry) {
    throw new Error("Unable to update enquiry");
  }

  const changedLabels = Object.keys(updateData).map(
    (key) => FIELD_LABELS[key] || key
  );

  // Append activity for admin update
  await enquiryRepo.addEnquiryActivityRepo(id, {
    action: "Enquiry Updated",
    description: `Updated: ${changedLabels.join(", ")}.`,
    createdBy: userId,
    updatedBy: userId,
  });

  return await enquiryRepo.getEnquiryByIdRepo(id);
};

// -------------------------------------
// Update Enquiry Status
// Login required
// Add activity
// -------------------------------------

export const updateEnquiryStatusService = async (id, status, userId) => {
  validateUserId(userId);

  const existingEnquiry = await getActiveEnquiry(id);

  if (!ALLOWED_STATUSES.includes(status)) {
    throw new Error("Invalid enquiry status");
  }

  if (existingEnquiry.status === status) {
    throw new Error("Enquiry already has this status");
  }

  const activity = {
    action: "Status Changed",
    description: `Status changed from ${existingEnquiry.status} to ${status}.`,
    createdBy: userId,
    updatedBy: userId,
  };

  const updatedEnquiry = await enquiryRepo.updateEnquiryStatusRepo(
    id,
    status,
    activity
  );

  if (!updatedEnquiry) {
    throw new Error("Unable to update enquiry status");
  }

  return updatedEnquiry;
};

// -------------------------------------
// Delete Enquiry
// Permanent delete
// No activity
// -------------------------------------

export const deleteEnquiryService = async (id) => {
  validateObjectId(id);

  const existingEnquiry = await enquiryRepo.getEnquiryByIdRepo(id);

  if (!existingEnquiry) {
    throw new Error("Enquiry not found");
  }

  const deletedEnquiry = await enquiryRepo.deleteEnquiryRepo(id);

  if (!deletedEnquiry) {
    throw new Error("Unable to delete enquiry");
  }

  return {
    message: "Enquiry deleted successfully",
  };
};

// -------------------------------------
// Send Email to Customer
// markResponded (optional): moves the status to "Responded" after the email is sent
// -------------------------------------

export const sendEnquiryEmailService = async (id, data = {}, userId) => {
  validateUserId(userId);

  const existingEnquiry = await getActiveEnquiry(id);

  const { subject, message } = data;
  const markResponded = data.markResponded === true || data.markResponded === "true";

  if (typeof subject !== "string" || !subject.trim()) {
    throw new Error("Email subject is required");
  }

  if (typeof message !== "string" || !message.trim()) {
    throw new Error("Email message is required");
  }

  if (!existingEnquiry.email) {
    throw new Error("Customer email address not found");
  }

  // Send email to customer
  const emailResult = await sendEnquiryReplyEmail({
    email: existingEnquiry.email,
    fullName: existingEnquiry.fullName,
    subject: subject.trim(),
    message: message.trim(),
  });

  // Add activity only after successful email sending
  await enquiryRepo.addEnquiryActivityRepo(id, {
    action: "Email Sent",
    description: `Email sent to ${existingEnquiry.email}. Subject: ${subject.trim()}`,
    createdBy: userId,
    updatedBy: userId,
  });

  let finalStatus = existingEnquiry.status;

  if (markResponded && existingEnquiry.status !== "Responded") {
    await enquiryRepo.updateEnquiryStatusRepo(id, "Responded", {
      action: "Status Changed",
      description: `Status changed from ${existingEnquiry.status} to Responded.`,
      createdBy: userId,
      updatedBy: userId,
    });

    finalStatus = "Responded";
  }

  return {
    email: existingEnquiry.email,
    subject: subject.trim(),
    messageId: emailResult.messageId,
    status: finalStatus,
  };
};