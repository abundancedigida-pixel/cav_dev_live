import imageCompression from "browser-image-compression";

// Compresses only large images. Small images are returned unchanged.
export const compressImage = async (
  file,
  { maxSizeMB = 4.5, maxWidthOrHeight = 2000, initialQuality = 0.9 } = {}
) => {
  if (file.size <= maxSizeMB * 1048576) return file;

  const blob = await imageCompression(file, {
    maxSizeMB,
    maxWidthOrHeight,
    useWebWorker: true,
    fileType: "image/webp",
    initialQuality,
  });

  const name = file.name.replace(/\.[^.]+$/, "") + ".webp";
  return new File([blob], name, { type: "image/webp" });
};