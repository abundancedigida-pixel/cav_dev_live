import blogService from "../services/blogService.js";
import { uploadToCloudinary } from "../utils/cloudinaryUtil.js";

const BLOG_FOLDER = "cannon-avenue/blogs";

// memoryStorage: file.buffer -> Cloudinary
const uploadOne = async (file) => {
  const r = await uploadToCloudinary(file.buffer, BLOG_FOLDER);
  return { url: r.url, publicId: r.publicId };
};

/* Parse tags from multipart form-data */
const parseTags = (rawTags) => {
  if (!rawTags) return [];

  try {
    const parsed = JSON.parse(rawTags);
    return Array.isArray(parsed) ? parsed : [parsed];
  } catch {
    return String(rawTags)
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }
};

const parseJsonArray = (raw) => {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    throw new Error("Invalid content format");
  }
};

/* Multipart form-data sends everything as strings, so convert the new fields */
const applyReleaseFields = (body, data) => {
  if (body.isFeatured !== undefined) {
    data.isFeatured = body.isFeatured === "true" || body.isFeatured === true;
  }

  if (body.publishedAt !== undefined) {
    if (body.publishedAt) {
      const date = new Date(body.publishedAt);
      if (Number.isNaN(date.getTime())) {
        throw new Error("Invalid publish date");
      }
      data.publishedAt = date;
    } else {
      data.publishedAt = null;
    }
  }

  ["excerpt", "seoTitle", "seoDescription"].forEach((key) => {
    if (body[key] !== undefined) data[key] = String(body[key]).trim();
  });
};

/* Upload content images and merge into blocks */
const mergeImageBlocks = async (content, files, rawPositions) => {
  if (!files?.length) return content;

  let positions = [];
  try {
    const parsed = JSON.parse(rawPositions || "[]");
    if (Array.isArray(parsed)) positions = parsed;
  } catch {
    positions = [];
  }

  const merged = [...content];

  for (let i = 0; i < files.length; i++) {
    const imageData = { type: "image", imageurl: await uploadOne(files[i]) };
    const pos = positions[i];

    if (Number.isInteger(pos) && merged[pos]?.type === "image") {
      merged[pos] = { ...merged[pos], ...imageData };
    } else {
      merged.push(imageData);
    }
  }

  return merged;
};

/* Create Blog */
const create = async (req, res) => {
  try {
    const tags = parseTags(req.body.tags);

    let content = parseJsonArray(req.body.content);
    content = await mergeImageBlocks(
      content,
      req.files?.image,
      req.body.imagePositions
    );

    const data = { ...req.body, tags, content };
    delete data.imagePositions;
    applyReleaseFields(req.body, data);

    if (req.files?.heroImage?.[0]) {
      data.heroimage = await uploadOne(req.files.heroImage[0]);
    }

    const blog = await blogService.create(data, req.user);

    return res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: blog,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/* Get All Blogs (paginated, with summary) */
const getAll = async (req, res) => {
  try {
    const result = await blogService.getAll(req.query);

    return res.status(200).json({
      success: true,
      data: result.blogs,
      summary: result.summary,
      pagination: result.pagination,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/* Get Blog By ID */
const getById = async (req, res) => {
  try {
    const blog = await blogService.getById(req.params.id);
    return res.status(200).json({ success: true, data: blog });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/* Update Blog */
const update = async (req, res) => {
  try {
    const updateData = { ...req.body };
    delete updateData.imagePositions;
    applyReleaseFields(req.body, updateData);

    if (req.body.tags !== undefined) {
      updateData.tags = parseTags(req.body.tags);
    }

    if (req.files?.heroImage?.[0]) {
      updateData.heroimage = await uploadOne(req.files.heroImage[0]);
    }

    if (req.body.content !== undefined || req.files?.image?.length) {
      const base = parseJsonArray(req.body.content);
      updateData.content = await mergeImageBlocks(
        base,
        req.files?.image,
        req.body.imagePositions
      );
    }

    const blog = await blogService.update(req.params.id, updateData, req.user);

    return res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      data: blog,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/* Delete Blog */
const remove = async (req, res) => {
  try {
    await blogService.remove(req.params.id, req.user);
    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default { create, getAll, getById, update, remove };