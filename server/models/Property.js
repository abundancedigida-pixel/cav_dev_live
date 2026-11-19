import mongoose from "mongoose";

const propertyImageSchema = new mongoose.Schema(
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

// One sellable unit in an apartment building
const floorUnitSchema = new mongoose.Schema(
  {
    floor: {
      type: Number,
      required: true,
      min: 1,
      max: 100,
    },
    unitName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 60,
    },
    status: {
      type: String,
      enum: ["Available", "Reserved", "Sold Out"],
      default: "Available",
    },
  },
  { _id: false }
);

// Nearby landmark shown on the public catalog
const nearbyPlaceSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      trim: true,
      maxlength: 60,
      default: "Other",
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    distanceKm: {
      type: Number,
      min: 0,
      default: null,
    },
    travelMins: {
      type: Number,
      min: 0,
      default: null,
    },
  },
  { _id: false }
);

const propertySchema = new mongoose.Schema(
  {
    // Section A: Basic Information
    propertyName: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
    },

    propertyType: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    tagline: {
      type: String,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    // Section A.1: Apartment Floor & Unit Inventory (Apartment type only)
    totalFloors: {
      type: Number,
      min: 1,
      max: 100,
      default: null,
    },

    inventoryPreset: {
      type: String,
      trim: true,
      maxlength: 80,
      default: "",
    },

    floorUnits: {
      type: [floorUnitSchema],
      default: [],
    },

    // Section B: Architectural Imagery
    featuredImage: {
      type: propertyImageSchema,
      default: null,
    },

    galleryImages: {
      type: [propertyImageSchema],
      default: [],
    },

    // Section C: Spatial Specs & Valuation
    plotArea: {
      type: Number,
      min: 0,
    },

    builtUpArea: {
      type: Number,
      min: 0,
    },

    pricePerSqft: {
      type: Number,
      required: true,
      min: 0,
    },

    // Section C.1: Geospatial Coordinates & Vicinity Landmarks
    latitude: {
      type: Number,
      min: -90,
      max: 90,
      default: null,
    },

    longitude: {
      type: Number,
      min: -180,
      max: 180,
      default: null,
    },

    nearbyPlaces: {
      type: [nearbyPlaceSchema],
      default: [],
    },

    // Section D: Availability & Lifecycle
    developmentStatus: {
      type: String,
      enum: ["Constructing", "Constructed", "Ready to Move"],
      default: "Constructing",
    },

    publicationStatus: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Draft",
    },

    // Section E: Architectural Highlights
    keyFeatures: {
      type: [String],
      default: [],
    },

    architecturalHighlights: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Property = mongoose.model("Property", propertySchema);

export default Property;