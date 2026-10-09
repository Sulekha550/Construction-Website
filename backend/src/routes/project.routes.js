import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    success: true,
    data: [],
    message: "Connect Projects model/database when verified project data is available."
  });
});

export default router;