
import mongoose from "mongoose";

// Image Schema
const projectMediaSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
      required: true,
    },
    originalFilename: {
      type: String,
      required: true,
      trim: true,
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

// PDF Document Schema
const projectDocumentSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
      required: true,
    },
    originalFilename: {
      type: String,
      required: true,
      trim: true,
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    // Section A - Basic Details
    projectName: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },

category: {
  type: [String],
  default: [],
},

    location: {
      type: String,
      required: true,
      trim: true,
    },

  developmentStatus: {
  type: [String],
  default: [],
},

    tagline: {
      type: String,
      trim: true,
    },

    // Section B - Media & Blueprints
    featuredImage: {
      type: projectMediaSchema,
      default: null,
    },

    galleryImages: {
      type: [projectMediaSchema],
      default: [],
    },

    // Section C - Narrative & Highlights
    projectOverview: {
      type: String,
      trim: true,
    },

    architecturalHighlights: {
      type: [String],
      default: [],
    },

    // Section D - Material Specs
    totalAcreage: {
      type: Number,
      min: 0,
    },

    targetDelivery: {
      type: String,
      trim: true,
    },

    architecturalBrochure: {
      type: projectDocumentSchema,
      default: null,
    },

    // Section E - Website Publication
    publicationStatus: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Draft",
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
