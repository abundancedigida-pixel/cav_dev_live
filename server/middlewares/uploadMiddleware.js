
import multer from "multer";
import sharp from "sharp";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const storage = multer.memoryStorage();

// -------------------------------------
// Property Image File Filter
// -------------------------------------
const fileFilter = (req, file, cb) => {
  const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];

  const extension = file.originalname
    .toLowerCase()
    .slice(file.originalname.lastIndexOf("."));

  if (
    !allowedExtensions.includes(extension) ||
    !allowedMimeTypes.includes(file.mimetype)
  ) {
    return cb(
      new Error("Only JPG, JPEG, PNG, and WEBP images are allowed"),
      false
    );
  }

  cb(null, true);
};

const upload = multer({
  storage,
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: 11,
  },
  fileFilter,
});

// -------------------------------------
// Image Compression
// -------------------------------------
export const compressImage = async (fileBuffer) => {
  if (!fileBuffer) {
    throw new Error("Image file is required");
  }

  const metadata = await sharp(fileBuffer).metadata();

  const allowedFormats = ["jpeg", "png", "webp"];

  if (!allowedFormats.includes(metadata.format)) {
    throw new Error("Invalid image. Only JPG, PNG, and WEBP are allowed");
  }

  return await sharp(fileBuffer)
    .rotate()
    .resize({
      width: 2000,
      height: 2000,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({
      quality: 85,
      effort: 5,
    })
    .toBuffer();
};

// -------------------------------------
// Property Image Upload
// -------------------------------------
export const uploadPropertyImages = upload.fields([
  { name: "featuredImage", maxCount: 1 },
  { name: "galleryImages", maxCount: 10 },
]);

// -------------------------------------
// Project File Filter
// Supports Images + PDF
// -------------------------------------
const projectFileFilter = (req, file, cb) => {
  const extension = file.originalname
    .toLowerCase()
    .slice(file.originalname.lastIndexOf("."));

  const imageExtensions = [".jpg", ".jpeg", ".png", ".webp"];

  const imageMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  // Featured Image and Gallery Images
  if (
    file.fieldname === "featuredImage" ||
    file.fieldname === "galleryImages"
  ) {
    if (
      !imageExtensions.includes(extension) ||
      !imageMimeTypes.includes(file.mimetype)
    ) {
      return cb(
        new Error("Only JPG, JPEG, PNG, and WEBP images are allowed"),
        false
      );
    }

    return cb(null, true);
  }

  // Architectural Brochure PDF
  if (file.fieldname === "architecturalBrochure") {
    if (
      extension !== ".pdf" ||
      file.mimetype !== "application/pdf"
    ) {
      return cb(
        new Error("Only PDF files are allowed for architectural brochure"),
        false
      );
    }

    return cb(null, true);
  }

  return cb(new Error("Unexpected file field"), false);
};

// -------------------------------------
// Project Upload Configuration
// -------------------------------------
const projectUpload = multer({
  storage,
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: 12,
  },
  fileFilter: projectFileFilter,
});

// -------------------------------------
// Project Images + PDF Upload
// -------------------------------------
export const uploadProjectFiles = projectUpload.fields([
  { name: "featuredImage", maxCount: 1 },
  { name: "galleryImages", maxCount: 10 },
  { name: "architecturalBrochure", maxCount: 1 },
]);


const blogUpload = multer({
  storage,
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: 25,
  },
  fileFilter,
});

export const uploadBlogImages = blogUpload.fields([
  { name: "heroImage", maxCount: 1 },
  { name: "image", maxCount: 20 },
]);

export default upload;
