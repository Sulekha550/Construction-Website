import mongoose from "mongoose";
import ContactInquiry, {
  ALLOWED_INQUIRY_TYPES,
  ALLOWED_STATUSES,
} from "../models/ContactInquiry.js";

/**
 * POST /api/contact
 * Public endpoint to submit a contact inquiry.
 */
export async function createContactInquiry(req, res) {
  try {
    const { name, phone, email, inquiry, message } = req.body || {};

    const errors = [];

    // 1. Validate Name
    const trimmedName = typeof name === "string" ? name.trim() : "";
    if (!trimmedName) {
      errors.push("Name is required.");
    } else if (trimmedName.length < 2) {
      errors.push("Name must be at least 2 characters.");
    } else if (trimmedName.length > 100) {
      errors.push("Name cannot exceed 100 characters.");
    }

    // 2. Validate Phone
    const trimmedPhone = typeof phone === "string" ? phone.trim() : "";
    const phoneDigits = trimmedPhone.replace(/\D/g, "");
    if (!trimmedPhone) {
      errors.push("Phone number is required.");
    } else if (phoneDigits.length < 7 || phoneDigits.length > 16) {
      errors.push("Please provide a valid phone number with 7 to 16 digits.");
    } else if (!/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]+$/.test(trimmedPhone)) {
      errors.push("Phone number contains invalid characters.");
    }

    // 3. Validate Email (Optional)
    let sanitizedEmail = undefined;
    if (email !== undefined && email !== null && String(email).trim() !== "") {
      const trimmedEmail = String(email).trim().toLowerCase();
      if (trimmedEmail.length > 150) {
        errors.push("Email cannot exceed 150 characters.");
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
        errors.push("Please provide a valid email address.");
      } else {
        sanitizedEmail = trimmedEmail;
      }
    }

    // 4. Validate Inquiry Category
    const trimmedInquiry = typeof inquiry === "string" ? inquiry.trim() : "";
    if (!trimmedInquiry) {
      errors.push("Inquiry category is required.");
    } else if (!ALLOWED_INQUIRY_TYPES.includes(trimmedInquiry)) {
      errors.push(
        `Invalid inquiry category. Supported categories: ${ALLOWED_INQUIRY_TYPES.join(
          ", "
        )}.`
      );
    }

    // 5. Validate Message
    const trimmedMessage = typeof message === "string" ? message.trim() : "";
    if (!trimmedMessage) {
      errors.push("Message is required.");
    } else if (trimmedMessage.length < 5) {
      errors.push("Message must be at least 5 characters.");
    } else if (trimmedMessage.length > 3000) {
      errors.push("Message cannot exceed 3000 characters.");
    }

    // If validation fails, return 400 Bad Request
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: errors[0],
        errors,
      });
    }

    // Verify MongoDB connection state before attempting write
    // mongoose.connection.readyState: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    if (mongoose.connection.readyState !== 1) {
      console.error(
        "[ContactController] MongoDB is not connected. readyState:",
        mongoose.connection.readyState
      );
      return res.status(503).json({
        success: false,
        message:
          "Database service is currently unavailable. Please try again shortly.",
      });
    }

    // Save inquiry to MongoDB and await operation confirmation
    const newInquiry = await ContactInquiry.create({
      name: trimmedName,
      phone: trimmedPhone,
      email: sanitizedEmail,
      inquiry: trimmedInquiry,
      message: trimmedMessage,
      status: "new",
    });

    // Return HTTP 201 Created only after confirmed storage
    return res.status(201).json({
      success: true,
      message: "Your inquiry has been received and saved successfully.",
      data: {
        id: newInquiry._id,
        name: newInquiry.name,
        phone: newInquiry.phone,
        email: newInquiry.email || null,
        inquiry: newInquiry.inquiry,
        message: newInquiry.message,
        status: newInquiry.status,
        createdAt: newInquiry.createdAt,
      },
    });
  } catch (error) {
    console.error("[ContactController] Failed to save inquiry:", error.message);

    // Mongoose schema validation failure fallback
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors || {}).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: messages[0] || "Validation failed.",
        errors: messages,
      });
    }

    // Generic server or database error - safe message without leaking internal details
    return res.status(500).json({
      success: false,
      message:
        "Unable to process your inquiry at this time. Please try again later.",
    });
  }
}

/**
 * GET /api/contact
 * Protected Admin Endpoint to view all contact inquiries.
 * Requires admin authentication middleware.
 */
export async function getContactInquiries(req, res) {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 20));
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.status && ALLOWED_STATUSES.includes(req.query.status)) {
      filter.status = req.query.status;
    }
    if (req.query.inquiry && ALLOWED_INQUIRY_TYPES.includes(req.query.inquiry)) {
      filter.inquiry = req.query.inquiry;
    }

    const [inquiries, total] = await Promise.all([
      ContactInquiry.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      ContactInquiry.countDocuments(filter),
    ]);

    return res.json({
      success: true,
      data: inquiries,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("[ContactController] Failed to fetch inquiries:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error fetching inquiries.",
    });
  }
}

/**
 * PATCH /api/contact/:id/status
 * Protected Admin Endpoint to update an inquiry status.
 */
export async function updateContactInquiryStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body || {};

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid inquiry ID.",
      });
    }

    if (!status || !ALLOWED_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${ALLOWED_STATUSES.join(", ")}.`,
      });
    }

    const updated = await ContactInquiry.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found.",
      });
    }

    return res.json({
      success: true,
      message: "Inquiry status updated successfully.",
      data: updated,
    });
  } catch (error) {
    console.error("[ContactController] Update status failed:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error updating inquiry status.",
    });
  }
}
