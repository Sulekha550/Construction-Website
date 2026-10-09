import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  location: String,
  category: String,
  status: String,
  description: String,
  heroImage: String,
  amenities: [String],
  progress: [{ stage: String, percentage: Number }]
}, { timestamps: true });

export default mongoose.model("Project", projectSchema);
