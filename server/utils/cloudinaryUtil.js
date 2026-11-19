
import cloudinary from "../config/cloudinary.js";
import { compressImage } from "../middlewares/uploadMiddleware.js";

export const uploadToCloudinary = async (
  fileBuffer,
  folder,
  resourceType = "auto"
) => {
  if (!fileBuffer) {
    throw new Error("File is required for upload");
  }

  // Compress image before uploading
  const compressedBuffer = await compressImage(fileBuffer);



  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        format: "webp",
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve({
          url: result.secure_url,
          publicId: result.public_id,
          resourceType: result.resource_type,
        });
      }
    );

    uploadStream.end(compressedBuffer);
  });
};


// PDF Upload
export const uploadPdfToCloudinary = async (fileBuffer, folder, filename) => {
  if (!fileBuffer) throw new Error("PDF file is required");

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "raw",
        public_id: filename,
        use_filename: false,
        unique_filename: true,
      },
      (error, result) => {
        if (error) return reject(error);

        resolve({
          url: result.secure_url,
          publicId: result.public_id,
          resourceType: result.resource_type,
        });
      }
    );

    uploadStream.end(fileBuffer);
  });
};

export const deleteFromCloudinary = async (
  publicId,
  resourceType = "image"
) => {
  if (!publicId) {
    throw new Error("Cloudinary public ID is required");
  }

  return await cloudinary.uploader.destroy(publicId, {
    resource_type: resourceType,
  });
};
