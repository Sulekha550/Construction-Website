import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    service: "Vardha Builders API",
    status: "operational"
  });
});

app.use("/api/projects", (await import("./routes/project.routes.js")).default);
app.use("/api/leads", (await import("./routes/lead.routes.js")).default);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ success: false, message: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Vardha API running on http://localhost:${PORT}`);
});