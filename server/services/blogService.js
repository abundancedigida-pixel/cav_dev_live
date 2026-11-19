import blogRepository from "../repositories/blogRepo.js";

import { deleteFromCloudinary } from "../utils/cloudinaryUtil.js";

import { paginationHelper } from "../utils/paginationHelper.js";

const ELEVATED_ROLES = ["superAdmin", "admin", "owner"];

const create = async (data, user) => {
  const payload = { ...data };

  // publishing without a date means "publish now"
  if (payload.status === "published" && !payload.publishedAt) {
    payload.publishedAt = new Date();
  }

  const blog = await blogRepository.create({
    ...payload,
    createdBy: user.id,
  });

  return blog;
};

// Returns { blogs, summary, pagination }
const getAll = async (query = {}) => {
  const { page, limit, paginate, status, category, search } = query;
  const pagination = paginationHelper({ page, limit, paginate });

  const filter = {};
  if (status) filter.status = status;
  if (category) filter.category = category;

  if (search?.trim()) {
    // escape regex special characters so the search stays literal
    const escaped = search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    filter.$or = [
      { title: { $regex: escaped, $options: "i" } },
      { author: { $regex: escaped, $options: "i" } },
      { excerpt: { $regex: escaped, $options: "i" } },
      { tags: { $regex: escaped, $options: "i" } },
    ];
  }

  const [blogs, filteredTotal, allBlogs, published, drafts] = await Promise.all([
    blogRepository.findAll(
      filter,
      pagination.skip,
      pagination.paginate ? pagination.limit : 0
    ),
    blogRepository.count(filter), // filtered count, used for pagination
    blogRepository.count({}), // overall count, used for the stats card
    blogRepository.count({ status: "published" }),
    blogRepository.count({ status: "draft" }),
  ]);

  return {
    blogs,
    summary: {
      totalBlogs: allBlogs,
      published,
      drafts,
    },
    pagination: {
      total: filteredTotal,
      page: pagination.page,
      limit: pagination.paginate ? pagination.limit : filteredTotal,
      totalPages: pagination.paginate
        ? Math.ceil(filteredTotal / pagination.limit)
        : filteredTotal > 0
        ? 1
        : 0,
    },
  };
};

const getById = async (id) => {
  const blog = await blogRepository.findById(id);

  if (!blog) {
    throw new Error("Blog not found");
  }

  return blog;
};

// Resolve createdBy ID
const resolveCreatedById = (createdBy) => {
  if (!createdBy) return null;

  return (createdBy._id || createdBy).toString();
};

const update = async (id, data, user) => {
  const blog = await blogRepository.findById(id);

  if (!blog) {
    throw new Error("Blog not found");
  }

  const userId = (user.id || user._id)?.toString();
  const createdById = resolveCreatedById(blog.createdBy);

  const isOwner = createdById === userId;
  const isElevated = ELEVATED_ROLES.includes(user.role);

  if (!isOwner && !isElevated) {
    throw new Error("Not authorized to update");
  }

  const payload = { ...data };

  if (typeof payload.tags === "string") {
    payload.tags = JSON.parse(payload.tags || "[]");
  }

  if (typeof payload.content === "string") {
    payload.content = JSON.parse(payload.content || "[]");
  }

  // a published blog always needs a publish date
  const nextStatus = payload.status ?? blog.status;
  if (nextStatus === "published") {
    const nextPublishedAt =
      payload.publishedAt !== undefined ? payload.publishedAt : blog.publishedAt;
    if (!nextPublishedAt) payload.publishedAt = new Date();
  }

  // Cloudinary ids before the update
  const oldHeroId = blog.heroimage?.publicId;
  const oldImageIds = (blog.content || [])
    .filter((c) => c.type === "image" && c.imageurl?.publicId)
    .map((c) => c.imageurl.publicId);

  const updated = await blogRepository.update(id, payload);

  // Delete old files only after the DB update succeeds
  const toDelete = [];

  if (
    oldHeroId &&
    payload.heroimage?.publicId &&
    payload.heroimage.publicId !== oldHeroId
  ) {
    toDelete.push(oldHeroId);
  }

  if (Array.isArray(payload.content)) {
    const keep = new Set(
      payload.content
        .filter((c) => c.type === "image" && c.imageurl?.publicId)
        .map((c) => c.imageurl.publicId)
    );
    oldImageIds.forEach((pid) => {
      if (!keep.has(pid)) toDelete.push(pid);
    });
  }

  for (const pid of toDelete) {
    try {
      await deleteFromCloudinary(pid);
    } catch (err) {
      console.error("Blog image cleanup failed:", pid, err.message);
    }
  }

  return updated;
};

const remove = async (id, user) => {
  const blog = await blogRepository.findById(id);

  if (!blog) {
    throw new Error("Blog not found");
  }

  const userId = (user.id || user._id)?.toString();
  const createdById = resolveCreatedById(blog.createdBy);

  const isOwner = createdById === userId;
  const isElevated = ELEVATED_ROLES.includes(user.role);

  if (!isOwner && !isElevated) {
    throw new Error("Not authorized to delete");
  }

  await blogRepository.deleteBlog(id);

  // Cloudinary cleanup after the DB delete; a failure here must not break the request
  const publicIds = [
    blog.heroimage?.publicId,
    ...(blog.content || [])
      .filter((b) => b.type === "image" && b.imageurl?.publicId)
      .map((b) => b.imageurl.publicId),
  ].filter(Boolean);

  for (const pid of publicIds) {
    try {
      await deleteFromCloudinary(pid);
    } catch (err) {
      console.error("Blog image cleanup failed:", pid, err.message);
    }
  }

  return true;
};

export default {
  create,
  getAll,
  getById,
  update,
  remove,
};