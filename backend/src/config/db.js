import mongoose from "mongoose";

export async function connectDB(uri) {
  if (!uri) {
    console.warn("MONGO_URI not configured — running without database.");
    return;
  }
  await mongoose.connect(uri);
  console.log("MongoDB connected");
}