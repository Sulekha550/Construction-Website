import { useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertCircle,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  Handshake,
  Headphones,
  Home,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  RefreshCw,
  Send,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";
import {
  submitContactInquiry,
  type ContactInquiryRecord,
} from "../services/contact.service";

// Default WhatsApp Business Number (Replace via VITE_WHATSAPP_NUMBER in frontend/.env)
const DEFAULT_WHATSAPP_NUMBER = "919999999999";
const RAW_WHATSAPP_NUMBER =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_WHATSAPP_NUMBER) ||
  DEFAULT_WHATSAPP_NUMBER;
// Sanitize: remove any non-digits for standard wa.me URL format
const WHATSAPP_NUMBER = RAW_WHATSAPP_NUMBER.replace(/\D/g, "");

const inquiryTypes = [
  {
    id: "business",
    label: "Business Inquiry",
    icon: Building2,
    message:
      "Hello Vardha Builders, I would like to discuss a business inquiry.",
  },
  {
    id: "partnership",
    label: "Partnership",
    icon: Handshake,
    message:
      "Hello Vardha Builders, I am interested in discussing a partnership opportunity.",
  },
  {
    id: "quote",
    label: "Get a Quote",
    icon: MessageCircle,
    message:
      "Hello Vardha Builders, I would like to get a quote for a project.",
  },
  {
    id: "real-estate",
    label: "Real Estate",
    icon: Home,
    message:
      "Hello Vardha Builders, I am interested in your real estate projects.",
  },
  {
    id: "site-visit",
    label: "Site Visit",
    icon: MapPin,
    message:
      "Hello Vardha Builders, I would like to schedule a site visit.",
  },
  {
    id: "support",
    label: "Support",
    icon: Headphones,
    message:
      "Hello Vardha Builders, I need assistance with an existing inquiry.",
  },
];

export default function Contact() {
  const [selected, setSelected] = useState("business");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    inquiry: "Business Inquiry",
    message: "",
  });

  // Submission state tracking
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [savedInquiry, setSavedInquiry] = useState<ContactInquiryRecord | null>(
    null
  );

  const active =
    inquiryTypes.find((item) => item.id === selected) ?? inquiryTypes[0];

  // Handler for quick category selection in the Hero section
  const handleSelectInquiry = (id: string, label: string) => {
    setSelected(id);
    setForm((prev) => ({
      ...prev,
      inquiry: label,
    }));
  };

  // Direct WhatsApp chat from hero greeting button (User-initiated only)
  const openHeroWhatsApp = () => {
    const message = encodeURIComponent(active.message);
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  // Form field change handler
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // If changing the inquiry select dropdown, also sync the hero category button
    if (name === "inquiry") {
      const match = inquiryTypes.find((item) => item.label === value);
      if (match) {
        setSelected(match.id);
      }
    }

    // Clear error message when user starts typing again
    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  // Client-side validation before dispatching to API
  const validateForm = (): string | null => {
    if (!form.name.trim() || form.name.trim().length < 2) {
      return "Please enter your name (at least 2 characters).";
    }

    const phoneDigits = form.phone.replace(/\D/g, "");
    if (!form.phone.trim() || phoneDigits.length < 7) {
      return "Please enter a valid phone number (at least 7 digits).";
    }

    if (form.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email.trim())) {
        return "Please enter a valid email address.";
      }
    }

    if (!form.message.trim() || form.message.trim().length < 5) {
      return "Please enter your message (at least 5 characters).";
    }

    return null;
  };

  // Handle Form Submission -> Save to MongoDB via backend API
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prevent duplicate submission while in progress
    if (isSubmitting) return;

    // Client-side input validation
    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      // 1. Send form data to the backend API and wait for MongoDB confirmation
      const response = await submitContactInquiry(form);

      // 2. Only after confirmed storage, set saved record and show success
      // CRITICAL: We DO NOT automatically open WhatsApp here.
      if (response.data) {
        setSavedInquiry(response.data);
      } else {
        // Fallback representation if data object is partial
        setSavedInquiry({
          id: "",
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim() || null,
          inquiry: form.inquiry.trim(),
          message: form.message.trim(),
          status: "new",
          createdAt: new Date().toISOString(),
        });
      }
    } catch (err: any) {
      // 3. Display user-friendly error message, preserve form inputs for retry
      console.error("Contact form submission error:", err);
      setErrorMessage(
        err.message ||
          "Failed to submit your inquiry. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Explicit user click handler to open WhatsApp with saved inquiry details
  const handleOpenWhatsApp = () => {
    if (!savedInquiry) return;

    const whatsappMessage = `
Hello Vardha Builders,

I have submitted an inquiry on your website:

Name: ${savedInquiry.name}
Phone: ${savedInquiry.phone}
Email: ${savedInquiry.email || "Not provided"}
Inquiry Type: ${savedInquiry.inquiry}

Message:
${savedInquiry.message}

Thank you.
    `.trim();

    const encodedMessage = encodeURIComponent(whatsappMessage);

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  // Reset form to submit another inquiry
  const handleResetForm = () => {
    setSavedInquiry(null);
    setErrorMessage(null);
    setForm({
      name: "",
      phone: "",
      email: "",
      inquiry: "Business Inquiry",
      message: "",
    });
    setSelected("business");
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#101110] text-[#f2eee7]">
      {/* =========================================================
          HERO / WHATSAPP CONTACT
      ========================================================= */}
      <section className="relative min-h-[calc(100vh-82px)] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[.055]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        <div className="absolute left-1/2 top-1/3 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-[#c7a15c]/[.04] blur-[120px]" />

        <div className="absolute right-0 top-0 hidden h-full w-[4px] bg-[#c7a15c] md:block" />

        <div className="relative mx-auto max-w-6xl px-5 py-16 md:px-8 lg:py-24">
          <div className="mb-12 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#c7a15c]" />

              <span className="font-mono text-[8px] uppercase tracking-[.3em] text-white/35">
                Vardha / Contact
              </span>
            </div>

            <span className="font-mono text-[8px] uppercase tracking-[.25em] text-white/25">
              Direct Connection
            </span>
          </div>

          <div className="mx-auto max-w-4xl border border-white/10 bg-[#151715]/95 px-6 py-12 shadow-2xl backdrop-blur-xl md:px-12 md:py-16 lg:px-16">
            <div className="text-center">
              <div className="mb-8 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-[-14px] rounded-full border border-[#20d66b]/20" />

                  <div className="absolute inset-[-25px] rounded-full border border-[#20d66b]/10" />

                  <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#20d66b]/50 bg-[#20d66b]/10 text-[#20d66b] shadow-[0_0_50px_rgba(32,214,107,.16)]">
                    <MessageCircle size={38} strokeWidth={1.7} />
                  </div>

                  <span className="absolute -right-1 -top-1 h-3 w-3 animate-pulse rounded-full bg-[#20d66b]" />
                </div>
              </div>

              <div className="font-mono text-[8px] uppercase tracking-[.3em] text-[#c7a15c]">
                Let's connect
              </div>

              <h1 className="mt-5 font-sans text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-[.95] tracking-[-.045em]">
                Let's Build Something
              </h1>

              <h2 className="mt-3 font-display text-[clamp(2.7rem,5vw,4.8rem)] italic leading-none text-[#c7a15c]">
                Great Together
              </h2>

              <p className="mx-auto mt-7 max-w-xl text-[13px] leading-7 text-white/45 md:text-sm">
                Select an inquiry type to automatically prepare your WhatsApp
                message, or start a direct conversation with Vardha Builders.
              </p>
            </div>

            {/* INQUIRY BUTTONS */}
            <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-3">
              {inquiryTypes.map((item) => {
                const Icon = item.icon;
                const activeItem = selected === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectInquiry(item.id, item.label)}
                    className={`flex items-center gap-2 rounded-full border px-4 py-3 font-mono text-[8px] font-semibold uppercase tracking-[.16em] transition-all md:px-5 ${
                      activeItem
                        ? "border-[#c7a15c] bg-[#c7a15c]/10 text-[#e2bf79]"
                        : "border-white/15 text-white/45 hover:border-[#c7a15c]/60 hover:text-[#e2bf79]"
                    }`}
                  >
                    <Icon size={12} />
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex items-center justify-center gap-3 text-center">
              <Sparkles size={13} className="text-[#c7a15c]" />

              <span className="text-[11px] text-white/35">Selected:</span>

              <span className="text-[11px] font-medium text-white/75">
                {active.label}
              </span>
            </div>

            {/* WHATSAPP DIRECT CHAT BUTTON */}
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={openHeroWhatsApp}
                className="group flex w-full max-w-md items-center justify-center gap-4 rounded-full bg-gradient-to-r from-[#20d66b] to-[#16a085] px-7 py-5 text-sm font-bold uppercase tracking-[.12em] text-white shadow-[0_0_45px_rgba(32,214,107,.2)] transition-all hover:-translate-y-1 hover:shadow-[0_0_65px_rgba(32,214,107,.3)]"
              >
                <MessageCircle size={22} fill="currentColor" strokeWidth={1} />
                Chat with Vardha Builders
                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-white/70" />
              </button>
            </div>

            <div className="mt-7 flex items-center justify-center gap-2">
              <ShieldCheck size={13} className="text-white/30" />

              <span className="font-mono text-[8px] uppercase tracking-[.24em] text-white/30">
                Secure · Private · Instant Reply
              </span>
            </div>

            {/* QUICK LINKS */}
            <div className="mt-12 grid border-t border-white/10 pt-8 md:grid-cols-3">
              <div className="border-b border-white/10 px-4 py-5 text-center md:border-b-0 md:border-r">
                <Building2 size={16} className="mx-auto text-[#c7a15c]" />

                <div className="mt-3 font-mono text-[8px] uppercase tracking-[.18em] text-white/30">
                  Portfolio
                </div>

                <Link
                  to="/portfolio"
                  className="mt-2 inline-flex items-center gap-2 text-xs text-white/65 hover:text-[#c7a15c]"
                >
                  Explore Projects
                  <ArrowUpRight size={12} />
                </Link>
              </div>

              <div className="border-b border-white/10 px-4 py-5 text-center md:border-b-0 md:border-r">
                <MapPin size={16} className="mx-auto text-[#c7a15c]" />

                <div className="mt-3 font-mono text-[8px] uppercase tracking-[.18em] text-white/30">
                  Visit
                </div>

                <div className="mt-2 text-xs text-white/65">
                  Schedule a Site Visit
                </div>
              </div>

              <div className="px-4 py-5 text-center">
                <MessageCircle size={16} className="mx-auto text-[#c7a15c]" />

                <div className="mt-3 font-mono text-[8px] uppercase tracking-[.18em] text-white/30">
                  Direct
                </div>

                <div className="mt-2 text-xs text-white/65">
                  WhatsApp Conversation
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          DROP US A MESSAGE (CONTACT FORM WITH MONGODB INTEGRATION)
      ========================================================= */}
      <section
        id="contact-form-section"
        className="relative overflow-hidden border-t border-white/10 bg-[#0b0c0c] px-5 py-24 md:px-8 lg:px-20 lg:py-32"
      >
        {/* Architectural grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[.035]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)
            `,
            backgroundSize: "90px 90px",
          }}
        />

        <div className="relative mx-auto max-w-7xl">
          {/* HEADER */}
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-[#c7a15c]" />

                <span className="font-mono text-[9px] uppercase tracking-[.35em] text-[#c7a15c]">
                  Direct Enquiry
                </span>
              </div>

              <h2 className="mt-7 max-w-xl font-display text-5xl leading-[.95] tracking-[-.03em] text-white md:text-6xl lg:text-7xl">
                Drop us a <span className="italic text-[#c7a15c]">message.</span>
              </h2>

              <p className="mt-7 max-w-md text-sm leading-7 text-white/45 md:text-base">
                Tell us what you are looking for. Share your requirements,
                project interest, or any question and our team will connect
                with you directly.
              </p>

              <div className="mt-10 space-y-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center border border-white/10 text-[#c7a15c]">
                    <Phone size={16} />
                  </div>

                  <div>
                    <div className="font-mono text-[8px] uppercase tracking-[.2em] text-white/25">
                      Phone
                    </div>

                    <div className="mt-1 text-sm text-white/70">
                      Contact Vardha Builders
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center border border-white/10 text-[#c7a15c]">
                    <Mail size={16} />
                  </div>

                  <div>
                    <div className="font-mono text-[8px] uppercase tracking-[.2em] text-white/25">
                      Email
                    </div>

                    <div className="mt-1 text-sm text-white/70">
                      Send us your requirements
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center border border-white/10 text-[#c7a15c]">
                    <ShieldCheck size={16} />
                  </div>

                  <div>
                    <div className="font-mono text-[8px] uppercase tracking-[.2em] text-white/25">
                      Private Enquiry
                    </div>

                    <div className="mt-1 text-sm text-white/70">
                      Your details stay with our team
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FORM CONTAINER */}
            <div className="border border-white/10 bg-[#121413] p-6 md:p-8 lg:p-10">
              {savedInquiry ? (
                /* =========================================================
                    POST-SAVE CONFIRMATION VIEW
                    Displays ONLY after MongoDB confirms successful storage.
                    WhatsApp button is explicit and user-triggered only.
                ========================================================= */
                <div className="space-y-6">
                  {/* Luxury Success Card */}
                  <div className="border border-[#c7a15c]/40 bg-[#171a17] p-6 md:p-8">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#20d66b]/40 bg-[#20d66b]/10 text-[#20d66b]">
                        <CheckCircle2 size={26} />
                      </div>

                      <div className="space-y-1">
                        <span className="font-mono text-[9px] uppercase tracking-[.25em] text-[#c7a15c]">
                          Inquiry Successfully Saved
                        </span>
                        <h3 className="text-xl font-semibold text-white">
                          Thank you, {savedInquiry.name}
                        </h3>
                        <p className="text-xs leading-5 text-white/60">
                          Your inquiry has been safely recorded in our database.
                          Our executive team will review your requirements and
                          reach out shortly.
                        </p>
                      </div>
                    </div>

                    {/* Inquiry Details Summary */}
                    <div className="mt-6 border-t border-white/10 pt-4">
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="font-mono text-[8px] uppercase tracking-[.2em] text-white/35">
                            Category
                          </span>
                          <p className="font-medium text-[#e2bf79]">
                            {savedInquiry.inquiry}
                          </p>
                        </div>
                        <div>
                          <span className="font-mono text-[8px] uppercase tracking-[.2em] text-white/35">
                            Phone
                          </span>
                          <p className="font-medium text-white/80">
                            {savedInquiry.phone}
                          </p>
                        </div>
                        {savedInquiry.email && (
                          <div className="col-span-2">
                            <span className="font-mono text-[8px] uppercase tracking-[.2em] text-white/35">
                              Email
                            </span>
                            <p className="font-medium text-white/80">
                              {savedInquiry.email}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Explicit User-Initiated Open WhatsApp Button */}
                  <div className="space-y-3">
                    <button
                      type="button"
                      id="open-whatsapp-button"
                      onClick={handleOpenWhatsApp}
                      className="group flex w-full items-center justify-center gap-3 rounded-none bg-gradient-to-r from-[#20d66b] to-[#16a085] px-7 py-5 text-xs font-bold uppercase tracking-[.18em] text-white shadow-[0_0_35px_rgba(32,214,107,.2)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_50px_rgba(32,214,107,.35)]"
                    >
                      <MessageCircle size={18} fill="currentColor" />
                      Open WhatsApp
                      <ArrowUpRight
                        size={16}
                        className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5"
                      />
                    </button>

                    <p className="text-center font-mono text-[8px] uppercase tracking-[.18em] text-white/35">
                      Optional: Continue this discussion immediately on WhatsApp
                    </p>
                  </div>

                  {/* Submit Another Inquiry Action */}
                  <div className="border-t border-white/10 pt-4 text-center">
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[.2em] text-white/45 transition-colors hover:text-[#c7a15c]"
                    >
                      <RefreshCw size={11} />
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                /* =========================================================
                    ACTIVE CONTACT FORM
                ========================================================= */
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Error Notification Alert */}
                  {errorMessage && (
                    <div
                      role="alert"
                      className="flex items-start gap-3 border border-red-500/40 bg-red-950/30 p-4 text-xs text-red-200"
                    >
                      <AlertCircle
                        size={16}
                        className="mt-0.5 shrink-0 text-red-400"
                      />
                      <div className="flex-1">
                        <span className="font-semibold">
                          Submission Failed:
                        </span>{" "}
                        {errorMessage}
                      </div>
                    </div>
                  )}

                  {/* Name + Phone */}
                  <div className="grid gap-6 md:grid-cols-2">
                    <label className="block">
                      <span className="mb-3 flex items-center gap-2 font-mono text-[8px] uppercase tracking-[.22em] text-white/35">
                        <User size={12} />
                        Your Name <span className="text-[#c7a15c]">*</span>
                      </span>

                      <input
                        required
                        disabled={isSubmitting}
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className="w-full border-b border-white/15 bg-transparent px-0 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-[#c7a15c] disabled:opacity-50"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-3 flex items-center gap-2 font-mono text-[8px] uppercase tracking-[.22em] text-white/35">
                        <Phone size={12} />
                        Phone <span className="text-[#c7a15c]">*</span>
                      </span>

                      <input
                        required
                        disabled={isSubmitting}
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                        className="w-full border-b border-white/15 bg-transparent px-0 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-[#c7a15c] disabled:opacity-50"
                      />
                    </label>
                  </div>

                  {/* Email + Inquiry */}
                  <div className="grid gap-6 md:grid-cols-2">
                    <label className="block">
                      <span className="mb-3 flex items-center gap-2 font-mono text-[8px] uppercase tracking-[.22em] text-white/35">
                        <Mail size={12} />
                        Email (Optional)
                      </span>

                      <input
                        disabled={isSubmitting}
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Enter email address"
                        className="w-full border-b border-white/15 bg-transparent px-0 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-[#c7a15c] disabled:opacity-50"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-3 font-mono text-[8px] uppercase tracking-[.22em] text-white/35">
                        Inquiry Type <span className="text-[#c7a15c]">*</span>
                      </span>

                      <select
                        disabled={isSubmitting}
                        name="inquiry"
                        value={form.inquiry}
                        onChange={handleChange}
                        className="w-full border-b border-white/15 bg-transparent px-0 py-3 text-sm text-white outline-none transition-colors focus:border-[#c7a15c] disabled:opacity-50"
                      >
                        {inquiryTypes.map((item) => (
                          <option
                            key={item.id}
                            value={item.label}
                            className="bg-[#121413] text-white"
                          >
                            {item.label}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  {/* MESSAGE */}
                  <label className="block">
                    <span className="mb-3 flex items-center gap-2 font-mono text-[8px] uppercase tracking-[.22em] text-white/35">
                      <MessageCircle size={12} />
                      Your Message <span className="text-[#c7a15c]">*</span>
                    </span>

                    <textarea
                      required
                      disabled={isSubmitting}
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your requirement..."
                      rows={6}
                      className="w-full resize-none border-b border-white/15 bg-transparent px-0 py-3 text-sm leading-7 text-white outline-none transition-colors placeholder:text-white/20 focus:border-[#c7a15c] disabled:opacity-50"
                    />
                  </label>

                  {/* SUBMIT BUTTON */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group flex w-full items-center justify-center gap-3 bg-[#c7a15c] px-7 py-5 text-[10px] font-bold uppercase tracking-[.2em] text-[#0b0c0c] transition-all hover:bg-[#dfbb78] hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={15} className="animate-spin" />
                        <span>Saving Inquiry to Database...</span>
                      </>
                    ) : (
                      <>
                        <Send
                          size={15}
                          className="transition-transform group-hover:translate-x-1"
                        />
                        <span>Send Message</span>
                        <ArrowUpRight
                          size={15}
                          className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                      </>
                    )}
                  </button>

                  <p className="text-center font-mono text-[8px] uppercase tracking-[.18em] text-white/25">
                    Your inquiry will be securely saved before opening WhatsApp
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="border-t border-white/10 bg-[#101110] px-5 py-24 text-center md:px-8 lg:py-32">
        <div className="mx-auto max-w-4xl">
          <div className="font-mono text-[9px] uppercase tracking-[.35em] text-[#c7a15c]">
            Vardha Builders
          </div>

          <h3 className="mt-6 font-display text-5xl leading-none md:text-7xl lg:text-8xl">
            Let&apos;s create
            <br />
            <span className="italic text-[#c7a15c]">something lasting.</span>
          </h3>

          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={openHeroWhatsApp}
              className="flex items-center gap-3 border border-[#c7a15c]/50 px-7 py-4 text-[10px] uppercase tracking-[.2em] text-[#c7a15c] transition-all hover:bg-[#c7a15c] hover:text-[#0b0c0c]"
            >
              Start a Conversation
              <ArrowUpRight size={15} />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}