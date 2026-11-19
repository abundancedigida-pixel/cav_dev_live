import Blog from "../models/Blog.js";

// Create Blog
const create = async (data) => {
  return await Blog.create(data);
};

// Get All Blogs (limit 0 means no limit)
const findAll = async (filter = {}, skip = 0, limit = 0) => {
  return await Blog.find(filter)
    .populate("createdBy", "name email role")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
};

// Count Blogs
const count = async (filter = {}) => {
  return await Blog.countDocuments(filter);
};

// Get Blog By ID
const findById = async (id) => {
  return await Blog.findById(id).populate("createdBy", "name email role");
};

// Update Blog
const update = async (id, data) => {
  const blog = await Blog.findById(id);

  if (!blog) return null;

  Object.assign(blog, data);

  return await blog.save();
};

// Delete Blog
const deleteBlog = async (id) => {
  return await Blog.findByIdAndDelete(id);
};

export default {
  create,
  findAll,
  count,
  findById,
  update,
  deleteBlog,
};