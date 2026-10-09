import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  email: { type: String, trim: true },
  project: String,
  preferredDate: String,
  preferredTime: String,
  message: String
}, { timestamps: true });

export default mongoose.model("Lead", leadSchema);