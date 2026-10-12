import express from "express";
import TestData from "../models/TestData.js";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const saved = await TestData.create(req.body);

    res.status(201).json({
      success: true,
      message: "Data saved successfully",
      data: saved,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/", async (_req, res, next) => {
  try {
    const data = await TestData.find().sort({ createdAt: -1 });
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

export default router;