
import { useState, type ChangeEvent, type FormEvent } from "react";
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

const DEFAULT_WHATSAPP_NUMBER = "919999999999";

const RAW_WHATSAPP_NUMBER =
  import.meta.env.VITE_WHATSAPP_NUMBER || DEFAULT_WHATSAPP_NUMBER;

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

const initialForm = {
  name: "",
  phone: "",
  email: "",
  inquiry: "Business Inquiry",
  message: "",
};

export default function Contact() {
  const [selected, setSelected] = useState<string>("business");
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [savedInquiry, setSavedInquiry] =
    useState<ContactInquiryRecord | null>(null);

  const active =
    inquiryTypes.find((item) => item.id === selected) ?? inquiryTypes[0];

  const handleSelectInquiry = (id: string, label: string) => {
    setSelected(id);
    setForm((prev) => ({ ...prev, inquiry: label }));
    setErrorMessage(null);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "inquiry") {
      const match = inquiryTypes.find((item) => item.label === value);
      if (match) setSelected(match.id);
    }

    setErrorMessage(null);
  };

  const openWhatsApp = (message: string) => {
    if (!WHATSAPP_NUMBER) {
      setErrorMessage("Please configure your WhatsApp business number.");
      return;
    }

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const openHeroWhatsApp = () => openWhatsApp(active.message);

  const validateForm = (): string | null => {
    if (form.name.trim().length < 2) {
      return "Please enter your name (at least 2 characters).";
    }

    if (form.phone.replace(/\D/g, "").length < 7) {
      return "Please enter a valid phone number (at least 7 digits).";
    }

    if (form.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email.trim())) {
        return "Please enter a valid email address.";
      }
    }

    if (form.message.trim().length < 5) {
      return "Please enter your message (at least 5 characters).";
    }

    return null;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await submitContactInquiry({
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        inquiry: form.inquiry,
        message: form.message.trim(),
      });

      if (response.data) {
        setSavedInquiry(response.data);
      } else {
        setSavedInquiry({
          id: "",
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim() || null,
          inquiry: form.inquiry,
          message: form.message.trim(),
          status: "new",
          createdAt: new Date().toISOString(),
        });
      }
    } catch (err: unknown) {
      console.error("Contact form submission error:", err);
      setErrorMessage(
        err instanceof Error 
          ? err.message
          : "Failed to submit your inquiry. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenWhatsApp = () => {
    if (!savedInquiry) return;

    const message = `
Hello Vardha Builders,

I have submitted an inquiry on your website.

Name: ${savedInquiry.name}
Phone: ${savedInquiry.phone}
Email: ${savedInquiry.email || "Not provided"}
Inquiry Type: ${savedInquiry.inquiry}

Message:
${savedInquiry.message}

Thank you.
    `.trim();

    openWhatsApp(message);
  };

  const handleResetForm = () => {
    setSavedInquiry(null);
    setErrorMessage(null);
    setForm({ ...initialForm });
    setSelected("business");
  };

  return (
    <div className="contact-page min-h-screen overflow-hidden">
      {/* HERO */}
      <section className="contact-hero relative min-h-[calc(100vh-82px)] overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-[.055]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(128,128,128,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(128,128,128,.7) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-[#c7a15c]/[.06] blur-[120px]" />
        <div className="absolute right-0 top-0 hidden h-full w-[4px] bg-[#c7a15c] md:block" />

        <div className="relative mx-auto max-w-6xl px-5 py-16 md:px-8 lg:py-24">
          <div className="mb-12 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#c7a15c]" />
              <span className="font-mono text-[8px] uppercase tracking-[.3em] text-[var(--contact-muted)]">
                Vardha / Contact
              </span>
            </div>
            <span className="font-mono text-[8px] uppercase tracking-[.25em] text-[var(--contact-muted)]">
              Direct Connection
            </span>
          </div>

          <div className="contact-panel mx-auto max-w-4xl border px-6 py-12 shadow-2xl backdrop-blur-xl md:px-12 md:py-16 lg:px-16">
            <div className="text-center">
              <div className="mb-8 flex justify-center">
                <div className="relative">
                  <div className="pointer-events-none absolute inset-[-14px] rounded-full border border-[#20d66b]/20" />
                  <div className="pointer-events-none absolute inset-[-25px] rounded-full border border-[#20d66b]/10" />
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#20d66b]/50 bg-[#20d66b]/10 text-[#20d66b] shadow-[0_0_50px_rgba(32,214,107,.16)]">
                    <MessageCircle size={38} strokeWidth={1.7} />
                  </div>
                  <span className="absolute -right-1 -top-1 h-3 w-3 animate-pulse rounded-full bg-[#20d66b]" />
                </div>
              </div>

              <div className="font-mono text-[8px] uppercase tracking-[.3em] text-[#c7a15c]">
                Let&apos;s connect
              </div>

              <h1 className="contact-heading mt-5 font-sans text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-[.95] tracking-[-.045em]">
                Let&apos;s Build Something
              </h1>

              <h2 className="mt-3 font-display text-[clamp(2.7rem,5vw,4.8rem)] italic leading-none text-[#c7a15c]">
                Great Together
              </h2>

              <p className="mx-auto mt-7 max-w-xl text-[13px] leading-7 text-[var(--contact-muted)] md:text-sm">
                Select an inquiry type to prepare your WhatsApp message, or
                start a direct conversation with Vardha Builders.
              </p>
            </div>

            <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-3">
              {inquiryTypes.map((item) => {
                const Icon = item.icon;
                const isActive = selected === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => handleSelectInquiry(item.id, item.label)}
                    className={`flex cursor-pointer items-center gap-2 rounded-full border px-4 py-3 font-mono text-[9px] font-semibold uppercase tracking-[.16em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c7a15c] md:px-5 ${
                      isActive
                        ? "border-[#c7a15c] bg-[#c7a15c]/20 text-[#a77a26] shadow-[0_0_24px_rgba(199,161,92,0.15)] dark:text-[#e2bf79]"
                        : "contact-category border-[var(--contact-border)] bg-transparent text-[var(--contact-text)] hover:border-[#c7a15c]"
                    }`}
                  > 
                    <Icon size={14} />
                    <span>{item.label}</span>
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="ml-1 h-1.5 w-1.5 rounded-full bg-[#c7a15c]"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex items-center justify-center gap-3 text-center">
              <Sparkles size={13} className="text-[#c7a15c]" />
              <span className="text-[11px] text-[var(--contact-muted)]">
                Selected:
              </span>
              <span className="text-[11px] font-medium text-[var(--contact-text)]">
                {active.label}
              </span>
            </div>

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
              <ShieldCheck size={13} className="text-[var(--contact-muted)]" />
              <span className="font-mono text-[8px] uppercase tracking-[.24em] text-[var(--contact-muted)]">
                Secure · Private · Instant Reply
              </span>
            </div>

            <div className="mt-12 grid border-t border-[var(--contact-border)] pt-8 md:grid-cols-3">
              <div className="border-b border-[var(--contact-border)] px-4 py-5 text-center md:border-b-0 md:border-r">
                <Building2 size={16} className="mx-auto text-[#c7a15c]" />
                <div className="mt-3 font-mono text-[8px] uppercase tracking-[.18em] text-[var(--contact-muted)]">
                  Portfolio
                </div>
                <Link
                  to="/portfolio"
                  className="mt-2 inline-flex items-center gap-2 text-xs text-[var(--contact-text)] hover:text-[#c7a15c]"
                >
                  Explore Projects <ArrowUpRight size={12} />
                </Link>
              </div>

              <div className="border-b border-[var(--contact-border)] px-4 py-5 text-center md:border-b-0 md:border-r">
                <MapPin size={16} className="mx-auto text-[#c7a15c]" />
                <div className="mt-3 font-mono text-[8px] uppercase tracking-[.18em] text-[var(--contact-muted)]">
                  Visit
                </div>
                <button
                  type="button"
                  onClick={() =>
                    document
                      .getElementById("contact-form-section")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="mt-2 text-xs text-[var(--contact-text)] transition-colors hover:text-[#c7a15c]"
                >
                  Schedule a Site Visit
                </button>
              </div>

              <div className="px-4 py-5 text-center">
                <MessageCircle size={16} className="mx-auto text-[#c7a15c]" />
                <div className="mt-3 font-mono text-[8px] uppercase tracking-[.18em] text-[var(--contact-muted)]">
                  Direct
                </div>
                <button
                  type="button"
                  onClick={openHeroWhatsApp}
                  className="mt-2 text-xs text-[var(--contact-text)] transition-colors hover:text-[#c7a15c]"
                >
                  WhatsApp Conversation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section
        id="contact-form-section"
        className="contact-form-section relative overflow-hidden border-t px-5 py-24 md:px-8 lg:px-20 lg:py-32"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(128,128,128,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(128,128,128,.8) 1px, transparent 1px)",
            backgroundSize: "90px 90px",
          }}
        />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-[#c7a15c]" />
                <span className="font-mono text-[9px] uppercase tracking-[.35em] text-[#c7a15c]">
                  Direct Enquiry
                </span>
              </div>

              <h2 className="contact-heading mt-7 max-w-xl font-display text-5xl leading-[.95] tracking-[-.03em] md:text-6xl lg:text-7xl">
                Drop us a <span className="italic text-[#c7a15c]">message.</span>
              </h2>

              <p className="mt-7 max-w-md text-sm leading-7 text-[var(--contact-muted)] md:text-base">
                Tell us what you are looking for. Share your requirements,
                project interest, or any question and our team will connect
                with you directly.
              </p>

              <div className="mt-10 space-y-5">
                {[
                  { Icon: Phone, label: "Phone", text: "Contact Vardha Builders" },
                  { Icon: Mail, label: "Email", text: "Send us your requirements" },
                  { Icon: ShieldCheck, label: "Private Enquiry", text: "Your details stay with our team" },
                ].map(({ Icon, label, text }) => (
                  <div key={label} className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center border border-[var(--contact-border)] text-[#c7a15c]">
                      <Icon size={16} />
                    </div>
                    <div>
                      <div className="font-mono text-[8px] uppercase tracking-[.2em] text-[var(--contact-muted)]">
                        {label}
                      </div>
                      <div className="mt-1 text-sm text-[var(--contact-text)]">
                        {text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="contact-panel border p-6 md:p-8 lg:p-10">
              {savedInquiry ? (
                <div className="space-y-6">
                  <div className="contact-success-panel border border-[#c7a15c]/40 p-6 md:p-8">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#20d66b]/40 bg-[#20d66b]/10 text-[#20d66b]">
                        <CheckCircle2 size={26} />
                      </div>
                      <div className="space-y-1">
                        <span className="font-mono text-[9px] uppercase tracking-[.25em] text-[#c7a15c]">
                          Inquiry Successfully Saved
                        </span>
                        <h3 className="contact-heading text-xl font-semibold">
                          Thank you, {savedInquiry.name}
                        </h3>
                        <p className="text-xs leading-5 text-[var(--contact-muted)]">
                          Your inquiry has been recorded. Our team will review
                          your requirements and reach out shortly.
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 border-t border-[var(--contact-border)] pt-4">
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="font-mono text-[8px] uppercase tracking-[.2em] text-[var(--contact-muted)]">
                            Category
                          </span>
                          <p className="font-medium text-[#c7a15c]">
                            {savedInquiry.inquiry}
                          </p>
                        </div>
                        <div>
                          <span className="font-mono text-[8px] uppercase tracking-[.2em] text-[var(--contact-muted)]">
                            Phone
                          </span>
                          <p className="font-medium text-[var(--contact-text)]">
                            {savedInquiry.phone}
                          </p>
                        </div>
                        {savedInquiry.email && (
                          <div className="col-span-2">
                            <span className="font-mono text-[8px] uppercase tracking-[.2em] text-[var(--contact-muted)]">
                              Email
                            </span>
                            <p className="font-medium text-[var(--contact-text)]">
                              {savedInquiry.email}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleOpenWhatsApp}
                    className="group flex w-full items-center justify-center gap-3 bg-gradient-to-r from-[#20d66b] to-[#16a085] px-7 py-5 text-xs font-bold uppercase tracking-[.18em] text-white transition-all hover:-translate-y-0.5"
                  >
                    <MessageCircle size={18} fill="currentColor" />
                    Open WhatsApp
                    <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                  </button>

                  <div className="border-t border-[var(--contact-border)] pt-4 text-center">
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[.2em] text-[var(--contact-muted)] transition-colors hover:text-[#c7a15c]"
                    >
                      <RefreshCw size={11} />
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errorMessage && (
                    <div
                      role="alert"
                      className="flex items-start gap-3 border border-red-500/40 bg-red-500/10 p-4 text-xs text-red-700 dark:text-red-200"
                    >
                      <AlertCircle size={16} className="mt-0.5 shrink-0 text-red-500" />
                      <div className="flex-1">{errorMessage}</div>
                    </div>
                  )}

                  <div className="grid gap-6 md:grid-cols-2">
                    <label className="block">
                      <span className="contact-label mb-3 flex items-center gap-2 font-mono text-[8px] uppercase tracking-[.22em]">
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
                        autoComplete="name"
                        className="contact-input w-full border-b px-0 py-3 text-sm outline-none transition-colors focus:border-[#c7a15c] disabled:opacity-50"
                      />
                    </label>

                    <label className="block">
                      <span className="contact-label mb-3 flex items-center gap-2 font-mono text-[8px] uppercase tracking-[.22em]">
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
                        autoComplete="tel"
                        className="contact-input w-full border-b px-0 py-3 text-sm outline-none transition-colors focus:border-[#c7a15c] disabled:opacity-50"
                      />
                    </label>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <label className="block">
                      <span className="contact-label mb-3 flex items-center gap-2 font-mono text-[8px] uppercase tracking-[.22em]">
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
                        autoComplete="email"
                        className="contact-input w-full border-b px-0 py-3 text-sm outline-none transition-colors focus:border-[#c7a15c] disabled:opacity-50"
                      />
                    </label>

                    <label className="block">
                      <span className="contact-label mb-3 flex items-center gap-2 font-mono text-[8px] uppercase tracking-[.22em]">
                        Inquiry Type <span className="text-[#c7a15c]">*</span>
                      </span>
                      <select
                        disabled={isSubmitting}
                        name="inquiry"
                        value={form.inquiry}
                        onChange={handleChange}
                        className="contact-input w-full border-b px-0 py-3 text-sm outline-none transition-colors focus:border-[#c7a15c] disabled:opacity-50"
                      >
                        {inquiryTypes.map((item) => (
                          <option key={item.id} value={item.label}>
                            {item.label}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <label className="block">
                    <span className="contact-label mb-3 flex items-center gap-2 font-mono text-[8px] uppercase tracking-[.22em]">
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
                      className="contact-input w-full resize-none border-b px-0 py-3 text-sm leading-7 outline-none transition-colors focus:border-[#c7a15c] disabled:opacity-50"
                    />
                  </label>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group flex w-full items-center justify-center gap-3 bg-[#c7a15c] px-7 py-5 text-[10px] font-bold uppercase tracking-[.2em] text-[#0b0c0c] transition-all hover:-translate-y-0.5 hover:bg-[#dfbb78] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={15} className="animate-spin" />
                        <span>Saving Inquiry to Database...</span>
                      </>
                    ) : (
                      <>
                        <Send size={15} className="transition-transform group-hover:translate-x-1" />
                        <span>Send Message</span>
                        <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </>
                    )}
                  </button>

                  <p className="text-center font-mono text-[8px] uppercase tracking-[.18em] text-[var(--contact-muted)]">
                    Your inquiry will be saved before opening WhatsApp
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="contact-cta border-t px-5 py-24 text-center md:px-8 lg:py-32">
        <div className="mx-auto max-w-4xl">
          <div className="font-mono text-[9px] uppercase tracking-[.35em] text-[#c7a15c]">
            Vardha Builders
          </div>

          <h3 className="contact-heading mt-6 font-display text-5xl leading-none md:text-7xl lg:text-8xl">
            Let&apos;s create
            <br />
            <span className="italic text-[#c7a15c]">something lasting.</span>
          </h3>

          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={openHeroWhatsApp}
              className="flex items-center gap-3 border border-[#c7a15c]/50 px-7 py-4 text-[10px] uppercase tracking-[.2em] text-[#a77a26] transition-all hover:bg-[#c7a15c] hover:text-[#0b0c0c] dark:text-[#c7a15c]"
            >
              Start a Conversation
              <ArrowUpRight size={15} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
 