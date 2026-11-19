import slugify from "slugify";

import * as projectRepo from "../repositories/projectRepo.js";

import {
  uploadToCloudinary,
  uploadPdfToCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinaryUtil.js";

import { paginationHelper } from "../utils/paginationHelper.js";

// -------------------------------------
// Helper: Parse array fields
// -------------------------------------
const parseArrayField = (value) => {
  if (value === undefined || value === null || value === "") {
    return [];
  }

  if (Array.isArray(value)) {
    return value
      .flatMap((item) => {
        if (typeof item === "string" && item.trim().startsWith("[")) {
          try {
            const parsed = JSON.parse(item);
            return Array.isArray(parsed) ? parsed : [item];
          } catch {
            return [item];
          }
        }

        return [item];
      })
      .map((item) => String(item).trim())
      .filter(Boolean);
  }

  if (typeof value === "string") {
    const trimmedValue = value.trim();

    try {
      const parsed = JSON.parse(trimmedValue);

      if (Array.isArray(parsed)) {
        return parsed.map((item) => String(item).trim()).filter(Boolean);
      }
    } catch {
      // Treat it as a single string value.
    }

    return [trimmedValue];
  }

  return [];
};

// -------------------------------------
// Helper: Generate Unique Slug
// -------------------------------------
const generateUniqueSlug = async (projectName, excludeId = null) => {
  const baseSlug = slugify(projectName, {
    lower: true,
    strict: true,
    trim: true,
  });

  if (!baseSlug) {
    throw new Error("Unable to generate slug from project name");
  }

  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existingProject = await projectRepo.getProjectBySlugRepo(slug);

    if (
      !existingProject ||
      (excludeId && existingProject._id.toString() === excludeId.toString())
    ) {
      return slug;
    }

    slug = `${baseSlug}-${counter}`;
    counter++;
  }
};

// -------------------------------------
// Helper: Upload Project Images
// -------------------------------------
const uploadProjectImage = async (file, folder) => {
  if (!file) return null;

  const uploaded = await uploadToCloudinary(file.buffer, folder, "image");

  return {
    url: uploaded.url,
    public_id: uploaded.publicId,
    originalFilename: file.originalname,
    uploadedAt: new Date(),
  };
};

// -------------------------------------
// Helper: Upload Project PDF
// -------------------------------------
const uploadProjectPdf = async (file) => {
  if (!file) return null;

  if (
    file.mimetype !== "application/pdf" &&
    !file.originalname.toLowerCase().endsWith(".pdf")
  ) {
    throw new Error("Only PDF files are allowed for architectural brochure");
  }

  const baseName = file.originalname.replace(/\.pdf$/i, "");
const safeName = slugify(baseName, { lower: true, strict: true }) || "brochure";

const uploaded = await uploadPdfToCloudinary(
  file.buffer,
  "cannon-avenue/projects/brochures",
  `${safeName}-${Date.now()}.pdf`
);

  return {
    url: uploaded.url,
    public_id: uploaded.publicId,
    originalFilename: file.originalname,
    uploadedAt: new Date(),
  };
};

// -------------------------------------
// Helper: Delete Cloudinary Resource
// -------------------------------------
const deleteCloudinaryResource = async (publicId, resourceType = "image") => {
  if (!publicId) return;

  try {
    await deleteFromCloudinary(publicId, resourceType);
  } catch (error) {
    console.error(
      `Cloudinary ${resourceType} deletion failed:`,
      publicId,
      error.message,
    );
  }
};

// -------------------------------------
// Create Project
// -------------------------------------
export const createProjectService = async (data, files = {}) => {
  const {
    projectName,
    category,
    developmentStatus,
    architecturalHighlights,
    ...otherData
  } = data;

  if (!projectName?.trim()) {
    throw new Error("Project name is required");
  }

  const existingProject = await projectRepo.getProjectByNameRepo(
    projectName.trim(),
  );

  if (existingProject) {
    throw new Error("Project with this name already exists");
  }

  const slug = await generateUniqueSlug(projectName);

  const projectData = {
    ...otherData,
    projectName: projectName.trim(),
    slug,
    category: parseArrayField(category),
    developmentStatus: parseArrayField(developmentStatus),
    architecturalHighlights: parseArrayField(architecturalHighlights),
  };

  const uploadedResources = [];

  try {
    // Featured image
    const featuredFile = files.featuredImage?.[0];

    if (featuredFile) {
      const featuredImage = await uploadProjectImage(
        featuredFile,
        "cannon-avenue/projects/featured",
      );

      projectData.featuredImage = featuredImage;
      uploadedResources.push({
        publicId: featuredImage.public_id,
        resourceType: "image",
      });
    }

    // Gallery images
    const galleryFiles = files.galleryImages || [];

    if (galleryFiles.length > 0) {
      projectData.galleryImages = [];

      for (const file of galleryFiles) {
        const galleryImage = await uploadProjectImage(
          file,
          "cannon-avenue/projects/gallery",
        );

        projectData.galleryImages.push(galleryImage);

        uploadedResources.push({
          publicId: galleryImage.public_id,
          resourceType: "image",
        });
      }
    }

    // Architectural brochure PDF
    const brochureFile = files.architecturalBrochure?.[0];

    if (brochureFile) {
      const brochure = await uploadProjectPdf(brochureFile);

      projectData.architecturalBrochure = brochure;

      uploadedResources.push({
        publicId: brochure.public_id,
        resourceType: "raw",
      });
    }

    return await projectRepo.createProjectRepo(projectData);
  } catch (error) {
    // Clean up files uploaded before a failed creation.
    await Promise.all(
      uploadedResources.map((resource) =>
        deleteCloudinaryResource(resource.publicId, resource.resourceType),
      ),
    );

    throw error;
  }
};

// -------------------------------------
// Get All Projects + Pagination + Summary
// -------------------------------------
export const getAllProjectsService = async (query = {}) => {
  const {
    page,
    limit,
    paginate,
    publicationStatus,
    category,
    developmentStatus,
    search,
  } = query;

  const pagination = paginationHelper({
    page,
    limit,
    paginate,
  });

  const filter = {};

  if (publicationStatus) {
    filter.publicationStatus = publicationStatus;
  }

  if (category) {
    filter.category = {
      $in: parseArrayField(category),
    };
  }

  if (developmentStatus) {
    filter.developmentStatus = {
      $in: parseArrayField(developmentStatus),
    };
  }

  if (search?.trim()) {
    filter.$or = [
      { projectName: { $regex: search.trim(), $options: "i" } },
      { location: { $regex: search.trim(), $options: "i" } },
    ];
  }

  const [
  projects,
  filteredTotal,
  allProjects,
  publishedProjects,
  draftProjects,
] = await Promise.all([
  projectRepo.getAllProjectsRepo(
    filter,
    pagination.skip,
    pagination.paginate ? pagination.limit : 0
  ),
  projectRepo.countProjectsRepo(filter), // filtered, pagination ku
  projectRepo.countProjectsRepo({}),     // overall, stats card ku
  projectRepo.countPublishedProjectsRepo(),
  projectRepo.countDraftProjectsRepo(),
]);

return {
  projects,
  summary: {
    totalProjects: allProjects,
    publishedProjects,
    draftProjects,
  },
  pagination: {
    total: filteredTotal,
    page: pagination.page,
    limit: pagination.paginate ? pagination.limit : filteredTotal,
    totalPages: pagination.paginate
      ? Math.ceil(filteredTotal / pagination.limit)
      : filteredTotal > 0 ? 1 : 0,
    hasNextPage: pagination.paginate
      ? pagination.page < Math.ceil(filteredTotal / pagination.limit)
      : false,
    hasPrevPage: pagination.paginate
      ? pagination.page > 1
      : false,
  },
};
};

// -------------------------------------
// Get Project By ID
// -------------------------------------
export const getProjectByIdService = async (id) => {
  const project = await projectRepo.getProjectByIdRepo(id);

  if (!project) {
    throw new Error("Project not found");
  }

  return project;
};

// -------------------------------------
// Update Project
// -------------------------------------
export const updateProjectService = async (id, data, files = {}) => {
  const existingProject = await projectRepo.getProjectByIdRepo(id);

  if (!existingProject) {
    throw new Error("Project not found");
  }

  const {
    projectName,
    category,
    developmentStatus,
    architecturalHighlights,
    keepGalleryImages,
    ...otherData
  } = data;

  const updateData = { ...otherData };
  const resourcesToDelete = [];
  const uploadedResources = [];

  try {
    // Update project name and slug
    if (projectName !== undefined) {
      const trimmedName = projectName.trim();

      if (!trimmedName) {
        throw new Error("Project name cannot be empty");
      }

      const duplicateProject =
        await projectRepo.getProjectByNameRepo(trimmedName);

      if (
        duplicateProject &&
        duplicateProject._id.toString() !== existingProject._id.toString()
      ) {
        throw new Error("Another project with this name already exists");
      }

      updateData.projectName = trimmedName;

      if (trimmedName !== existingProject.projectName) {
        updateData.slug = await generateUniqueSlug(
          trimmedName,
          existingProject._id.toString(),
        );
      }
    }

    // Update array fields only when provided
    if (category !== undefined) {
      updateData.category = parseArrayField(category);
    }

    if (developmentStatus !== undefined) {
      updateData.developmentStatus = parseArrayField(developmentStatus);
    }

    if (architecturalHighlights !== undefined) {
      updateData.architecturalHighlights = parseArrayField(
        architecturalHighlights,
      );
    }

    // Replace featured image
    const featuredFile = files.featuredImage?.[0];

    if (featuredFile) {
      const newFeaturedImage = await uploadProjectImage(
        featuredFile,
        "cannon-avenue/projects/featured",
      );

      uploadedResources.push({
        publicId: newFeaturedImage.public_id,
        resourceType: "image",
      });

      updateData.featuredImage = newFeaturedImage;

      if (existingProject.featuredImage?.public_id) {
        resourcesToDelete.push({
          publicId: existingProject.featuredImage.public_id,
          resourceType: "image",
        });
      }
    }

    // Keep/remove existing gallery images.
    // Send keepGalleryImages as an array of existing image IDs.
    let currentGallery = [...(existingProject.galleryImages || [])];

    if (keepGalleryImages !== undefined) {
      const keepIds = parseArrayField(keepGalleryImages);
      const existingIds = currentGallery.map((image) => image.public_id);

      const invalidIds = keepIds.filter(
        (imageId) => !existingIds.includes(imageId),
      );

      if (invalidIds.length > 0) {
        throw new Error("Invalid gallery image ID supplied");
      }

      const keptImages = currentGallery.filter((image) =>
        keepIds.includes(image.public_id),
      );

      const removedImages = currentGallery.filter(
        (image) => !keepIds.includes(image.public_id),
      );

      removedImages.forEach((image) => {
        if (image.public_id) {
          resourcesToDelete.push({
            publicId: image.public_id,
            resourceType: "image",
          });
        }
      });

      currentGallery = keptImages;
    }

    // Add new gallery images
    const newGalleryFiles = files.galleryImages || [];

    if (newGalleryFiles.length > 0) {
      for (const file of newGalleryFiles) {
        const galleryImage = await uploadProjectImage(
          file,
          "cannon-avenue/projects/gallery",
        );

        currentGallery.push(galleryImage);

        uploadedResources.push({
          publicId: galleryImage.public_id,
          resourceType: "image",
        });
      }
    }

    if (keepGalleryImages !== undefined || newGalleryFiles.length > 0) {
      updateData.galleryImages = currentGallery;
    }

    // Replace architectural brochure PDF
    const brochureFile = files.architecturalBrochure?.[0];

    if (brochureFile) {
      const newBrochure = await uploadProjectPdf(brochureFile);

      uploadedResources.push({
        publicId: newBrochure.public_id,
        resourceType: "raw",
      });

      updateData.architecturalBrochure = newBrochure;

      if (existingProject.architecturalBrochure?.public_id) {
        resourcesToDelete.push({
          publicId: existingProject.architecturalBrochure.public_id,
          resourceType: "raw",
        });
      }
    }

    const updatedProject = await projectRepo.updateProjectRepo(id, updateData);

    if (!updatedProject) {
      throw new Error("Project update failed");
    }

    // Delete old Cloudinary files after the database update succeeds.
    await Promise.all(
      resourcesToDelete.map((resource) =>
        deleteCloudinaryResource(resource.publicId, resource.resourceType),
      ),
    );

    return updatedProject;
  } catch (error) {
    // Delete newly uploaded files if the update failed.
    await Promise.all(
      uploadedResources.map((resource) =>
        deleteCloudinaryResource(resource.publicId, resource.resourceType),
      ),
    );

    throw error;
  }
};

// -------------------------------------
// Delete Project
// -------------------------------------
export const deleteProjectService = async (id) => {
  const existingProject = await projectRepo.getProjectByIdRepo(id);

  if (!existingProject) {
    throw new Error("Project not found");
  }

  const deletedProject = await projectRepo.deleteProjectRepo(id);

  if (!deletedProject) {
    throw new Error("Project deletion failed");
  }

  const resourcesToDelete = [];

  if (existingProject.featuredImage?.public_id) {
    resourcesToDelete.push({
      publicId: existingProject.featuredImage.public_id,
      resourceType: "image",
    });
  }

  (existingProject.galleryImages || []).forEach((image) => {
    if (image.public_id) {
      resourcesToDelete.push({
        publicId: image.public_id,
        resourceType: "image",
      });
    }
  });

  if (existingProject.architecturalBrochure?.public_id) {
    resourcesToDelete.push({
      publicId: existingProject.architecturalBrochure.public_id,
      resourceType: "raw",
    });
  }

  await Promise.all(
    resourcesToDelete.map((resource) =>
      deleteCloudinaryResource(resource.publicId, resource.resourceType),
    ),
  );

  return deletedProject;
};
