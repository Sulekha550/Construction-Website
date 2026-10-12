
import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: ["Residential", "Commercial", "Villa", "Mixed Use"],
    },

    status: {
      type: String,
      required: true,
      enum: ["Upcoming", "Ongoing", "Completed"],
    },

    year: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      required: true,
    },

    gallery: {
      type: [String],
      default: [],
    },

    amenities: {
      type: [String],
      default: [],
    },

    stats: [
      {
        label: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],

    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
