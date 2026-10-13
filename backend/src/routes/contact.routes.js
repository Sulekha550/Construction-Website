import { Router } from "express";
import {
  createContactInquiry,
  getContactInquiries,
  updateContactInquiryStatus,
} from "../controllers/contact.controller.js";
import { contactRateLimiter } from "../middleware/rateLimiter.js";
import auth from "../middleware/auth.js";

const router = Router();

/**
 * Public route to submit an inquiry.
 * Protected with rate limiting (max 10 requests per 15 minutes per IP).
 */
router.post("/", contactRateLimiter(10, 15 * 60 * 1000), createContactInquiry);

/**
 * Protected administrative route to view inquiries.
 * Requires valid JWT Bearer token with admin role.
 * Public access is strictly forbidden to protect customer privacy.
 */
router.get("/", auth, getContactInquiries);

/**
 * Protected administrative route to update inquiry status.
 */
router.patch("/:id/status", auth, updateContactInquiryStatus);

export default router;
