
import { Router } from "express";

const router = Router();

router.post("/", (req, res) => {
  const { name, phone } = req.body;

  if (!name || !phone) {
    return res.status(400).json({
      success: false,
      message: "Name and phone are required.",
    });
  }

  return res.status(201).json({
    success: true,
    message: "Lead received successfully.",
    data: { name, phone },
  });
});

export default router;
