import mongoose from "mongoose";

export const ALLOWED_INQUIRY_TYPES = [
  "Business Inquiry",
  "Partnership",
  "Get a Quote",
  "Real Estate",
  "Site Visit",
  "Support",
];

export const ALLOWED_STATUSES = [
  "new",
  "in_progress",
  "contacted",
  "closed",
  "archived",
];

const contactInquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
      trim: true,
      minlength: [2, "Name must be at least 2 characters."],
      maxlength: [100, "Name cannot exceed 100 characters."],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required."],
      trim: true,
      minlength: [7, "Phone number must be at least 7 characters."],
      maxlength: [20, "Phone number cannot exceed 20 characters."],
      validate: {
        validator: function (v) {
          // Allows optional leading +, digits, hyphens, spaces, and parentheses. Must have at least 7 digits.
          const digitsOnly = v.replace(/\D/g, "");
          return (
            digitsOnly.length >= 7 &&
            digitsOnly.length <= 16 &&
            /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]+$/.test(v)
          );
        },
        message: "Please provide a valid phone number.",
      },
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      maxlength: [150, "Email cannot exceed 150 characters."],
      validate: {
        validator: function (v) {
          if (!v || v.trim() === "") return true; // Optional field
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: "Please provide a valid email address.",
      },
    },
    inquiry: {
      type: String,
      required: [true, "Inquiry category is required."],
      enum: {
        values: ALLOWED_INQUIRY_TYPES,
        message: "{VALUE} is not a supported inquiry type.",
      },
    },
    message: {
      type: String,
      required: [true, "Message is required."],
      trim: true,
      minlength: [5, "Message must be at least 5 characters."],
      maxlength: [3000, "Message cannot exceed 3000 characters."],
    },
    status: {
      type: String,
      enum: {
        values: ALLOWED_STATUSES,
        message: "{VALUE} is not a valid inquiry status.",
      },
      default: "new",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for fast chronological lookups and filtering
contactInquirySchema.index({ createdAt: -1 });
contactInquirySchema.index({ inquiry: 1, status: 1 });

const ContactInquiry = mongoose.model("ContactInquiry", contactInquirySchema);

export default ContactInquiry;
