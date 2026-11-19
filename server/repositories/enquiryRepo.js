
import Enquiry from "../models/Enquiry.js";

// -------------------------------------
// Create Enquiry
// -------------------------------------
export const createEnquiryRepo = async (data) => {
  return await Enquiry.create(data);
};

// -------------------------------------
// Get All Enquiries
// -------------------------------------
export const getAllEnquiriesRepo = async (
  filter = {},
  skip = 0,
  limit = 10
) => {
  return await Enquiry.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("activities.createdBy", "username")
    .populate("activities.updatedBy", "username")
    .lean();
};

// -------------------------------------
// Get Enquiry By ID
// -------------------------------------
export const getEnquiryByIdRepo = async (id) => {
  return await Enquiry.findById(id)
    .populate("activities.createdBy", "username")
    .populate("activities.updatedBy", "username");
};

// -------------------------------------
// Get Enquiry By Email
// -------------------------------------
export const getEnquiryByEmailRepo = async (email) => {
  return await Enquiry.findOne({
    email: email.toLowerCase().trim(),
  });
};

// -------------------------------------
// Update Enquiry
// -------------------------------------
export const updateEnquiryRepo = async (id, data, unsetFields = []) => {
  const update = {};

  if (Object.keys(data).length > 0) {
    update.$set = data;
  }

  // remove nested objects that no longer match the selected interest type
  if (unsetFields.length > 0) {
    update.$unset = Object.fromEntries(unsetFields.map((field) => [field, ""]));
  }

  return await Enquiry.findByIdAndUpdate(id, update, {
    new: true,
    runValidators: true,
  });
};

// -------------------------------------
// Update Enquiry Status
// -------------------------------------
export const updateEnquiryStatusRepo = async (
  id,
  status,
  activity
) => {
  return await Enquiry.findByIdAndUpdate(
    id,
    {
      $set: { status },
      $push: { activities: activity },
    },
    {
      new: true,
      runValidators: true,
    }
  )
    .populate("activities.createdBy", "username")
    .populate("activities.updatedBy", "username");
};

// -------------------------------------
// Add Activity
// -------------------------------------
export const addEnquiryActivityRepo = async (id, activity) => {
  return await Enquiry.findByIdAndUpdate(
    id,
    {
      $push: { activities: activity },
    },
    {
      new: true,
      runValidators: true,
    }
  )
    .populate("activities.createdBy", "username")
    .populate("activities.updatedBy", "username");
};

// -------------------------------------
// Delete Enquiry
// -------------------------------------
export const deleteEnquiryRepo = async (id) => {
  return await Enquiry.findByIdAndDelete(id);
};

// -------------------------------------
// Count Enquiries
// -------------------------------------
export const countEnquiriesRepo = async (filter = {}) => {
  return await Enquiry.countDocuments(filter);
};

// -------------------------------------
// Dashboard Counts
// -------------------------------------
export const getEnquiryDashboardCountsRepo = async () => {
  const [totalInbound, statusCounts] = await Promise.all([
    Enquiry.countDocuments(),

    Enquiry.aggregate([
      {
        $group: {
          _id: {
            $ifNull: ["$status", "New"],
          },
          count: { $sum: 1 },
        },
      },
    ]),
  ]);

  const counts = {
    New: 0,
    "In Progress": 0,
    Responded: 0,
  };

  statusCounts.forEach((item) => {
    if (Object.hasOwn(counts, item._id)) {
      counts[item._id] = item.count;
    }
  });

  return {
    totalInbound,
    newEnquiries: counts.New,
    inProgress: counts["In Progress"],
    responded: counts.Responded,
  };
};
