
import express from "express";
import mongoose from "mongoose";
import Project from "../models/Project.js";

const router = express.Router();

// Helper: validate required text
const hasText = (value) =>
  typeof value === "string" && value.trim().length > 0;

// Helper: prepare project data
const prepareProjectData = (body) => ({
  title: body.title?.trim(),
  name: body.name?.trim(),
  slug: body.slug?.trim().toLowerCase(),
  location: body.location?.trim(),
  category: body.category,
  status: body.status,
  year: body.year?.toString().trim(),
  description: body.description?.trim(),
  image: body.image?.trim(),
  gallery: Array.isArray(body.gallery) ? body.gallery : [],
  amenities: Array.isArray(body.amenities) ? body.amenities : [],
  stats: Array.isArray(body.stats) ? body.stats : [],
  tags: Array.isArray(body.tags) ? body.tags : [],
});

// GET /api/projects — Get all projects
router.get("/", async (_req, res, next) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/projects/:id — Get one project
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID",
      });
    }

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
});

// POST /api/projects — Create a project
router.post("/", async (req, res, next) => {
  try {
    const data = prepareProjectData(req.body);

    const requiredFields = [
      ["title", data.title],
      ["name", data.name],
      ["slug", data.slug],
      ["location", data.location],
      ["category", data.category],
      ["status", data.status],
      ["year", data.year],
      ["description", data.description],
      ["image", data.image],
    ];

    const missingFields = requiredFields
      .filter(([field, value]) => !hasText(value))
      .map(([field]) => field);

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Required fields missing: ${missingFields.join(", ")}`,
      });
    }

    const project = await Project.create(data);

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "A project with this slug already exists.",
      });
    }

    next(error);
  }
});

// PUT /api/projects/:id — Update a project
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID",
      });
    }

    const existingProject = await Project.findById(id);

    if (!existingProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Only accept fields supported by the Project model
    const allowedFields = [
      "title",
      "name",
      "slug",
      "location",
      "category",
      "status",
      "year",
      "description",
      "image",
      "gallery",
      "amenities",
      "stats",
      "tags",
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    // Normalize text fields
    for (const field of [
      "title",
      "name",
      "location",
      "description",
      "image",
    ]) {
      if (typeof updates[field] === "string") {
        updates[field] = updates[field].trim();
      }
    }

    if (typeof updates.slug === "string") {
      updates.slug = updates.slug.trim().toLowerCase();
    }

    if (updates.year !== undefined) {
      updates.year = String(updates.year).trim();
    }

    const project = await Project.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    return res.json({
      success: true,
      message: "Project updated successfully",
      data: project,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "A project with this slug already exists.",
      });
    }

    next(error);
  }
});

// DELETE /api/projects/:id — Delete a project
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID",
      });
    }

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.json({
      success: true,
      message: "Project deleted successfully",
      data: project,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
