
import mongoose from "mongoose";

// -------------------------------------
// Independent Homes Schema
// -------------------------------------
const independentHomesSchema = new mongoose.Schema(
  {
    preferredHomeLayout: {
      type: String,
      enum: ["2BHK", "3BHK", "Not Sure Yet"],
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const homeDetailsSchema = new mongoose.Schema(
  {
    preferredLocation: {
      type: String,
      required: true,
      trim: true,
    },
    approximatePlotArea: {
      type: Number,
      required: true,
      min: 0,
    },
    preferredHomeType: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);


const enquiryActivitySchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);
// -------------------------------------
// Main Enquiry Schema
// -------------------------------------
const enquirySchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },

    // Selected enquiry type
    interestType: {
      type: String,
      enum: ["Independent Homes", "Tailor Made", "Precast"],
      required: true,
      trim: true,
    },

    // Independent Homes details
    independentHomes: {
      type: independentHomesSchema,
      default: undefined,
      required: function () {
        return this.interestType === "Independent Homes";
      },
    },

    // Tailor Made details
    tailorMade: {
      type: homeDetailsSchema,
      default: undefined,
      required: function () {
        return this.interestType === "Tailor Made";
      },
    },

    // Precast details
    precast: {
      type:homeDetailsSchema,
      default: undefined,
      required: function () {
        return this.interestType === "Precast";
      },
    },

    // Enquiry status
status: {
  type: String,
  enum: ["New", "In Progress", "Responded"],
  default: "New",
},

// Enquiry activities
activities: {
  type: [enquiryActivitySchema],
  default: [],
},

    message: {
      type: String,
      required: true,
      trim: true,
    },

    internalNotes: {
      type: String,
      trim: true,
      default: "",
      maxlength: 2000,
    },

    // Next follow-up date and time
    followUpAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// -------------------------------------
// Remove Unselected Enquiry Data
// -------------------------------------
enquirySchema.pre("validate", function () {
  if (this.interestType !== "Independent Homes") {
    this.independentHomes = undefined;
  }

  if (this.interestType !== "Tailor Made") {
    this.tailorMade = undefined;
  }

  if (this.interestType !== "Precast") {
    this.precast = undefined;
  }
});

const Enquiry = mongoose.model("Enquiry", enquirySchema);

export default Enquiry;
