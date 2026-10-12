
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import projectRoutes from "./routes/project.routes.js";
import leadRoutes from "./routes/lead.routes.js";
import testDataRoutes from "./routes/testdata.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
); 

app.use(express.json({ limit: "1mb" }));
app.use("/api/testdata", testDataRoutes);
// Health check
app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    service: "Vardha Builders API",
    status: "operational",
  });
});

// API routes
app.use("/api/projects", projectRoutes);
app.use("/api/leads", leadRoutes);


// 404 handler
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

// Error handler
app.use((err, _req, res, _next) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// Connect to MongoDB before starting the server
async function startServer() {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(PORT, () => {
      console.log(`Vardha API running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

startServer();
