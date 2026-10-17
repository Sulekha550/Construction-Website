
import ContactInquiry from "../models/ContactInquiry.js";
import { sendInquiryEmail } from "../services/email.service.js";

// CREATE CONTACT INQUIRY
export async function createContactInquiry(req, res) {
  try {
    const { name, email, phone, inquiry, message } = req.body;

    if (!name || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, phone and message are required.",
      });
    }

    // Save inquiry in MongoDB
    const newInquiry = await ContactInquiry.create({
      name: name.trim(),
      email: email?.trim() || "",
      phone: phone.trim(),
      inquiry: inquiry || "General Contact",
      message: message.trim(),
    });

    // Send email notification
    let emailSent = false;

    try {
      await sendInquiryEmail({
        name: newInquiry.name,
        email: newInquiry.email || "",
        phone: newInquiry.phone,
        inquiry: newInquiry.inquiry,
        message: newInquiry.message,
      });

      emailSent = true; 
    } catch (emailError) {
      console.error(
        "Inquiry saved, but email failed:",
        emailError.message
      );
    }

    return res.status(201).json({
      success: true,
      message: "Your inquiry has been submitted successfully.",
      emailSent,
      data: newInquiry,
    });
  } catch (error) {
    console.error("Create contact inquiry error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to submit your inquiry.",
    });
  }
}

// GET ALL CONTACT INQUIRIES
export async function getContactInquiries(req, res) {
  try {
    const inquiries = await ContactInquiry.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: inquiries.length,
      data: inquiries,
    });
  } catch (error) {
    console.error("Get contact inquiries error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch inquiries.",
    });
  }
}

// UPDATE CONTACT INQUIRY STATUS
export async function updateContactInquiryStatus(req, res) {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required.",
      });
    }

    const inquiryRecord = await ContactInquiry.findById(id);

    if (!inquiryRecord) {
      return res.status(404).json({
        success: false, 
        message: "Contact inquiry not found.",
      });
    }

    inquiryRecord.status = status;
    await inquiryRecord.save();

    return res.status(200).json({
      success: true,
      message: "Inquiry status updated successfully.",
      data: inquiryRecord,
    });
  } catch (error) {
    console.error("Update inquiry status error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid inquiry ID.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to update inquiry status.",
    });
  }
}
