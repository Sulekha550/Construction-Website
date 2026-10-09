import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Building2,
  Handshake,
  Headphones,
  Home,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";

const WHATSAPP_NUMBER = "919999999999";

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

  const [submitted, setSubmitted] = useState(false);

  const active =
    inquiryTypes.find((item) => item.id === selected) ?? inquiryTypes[0];

  const openWhatsApp = () => {
    const message = encodeURIComponent(active.message);

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const whatsappMessage = `
Hello Vardha Builders,

I would like to get in touch regarding a project/inquiry.

Name: ${form.name}
Phone: ${form.phone}
Email: ${form.email || "Not provided"}
Inquiry Type: ${form.inquiry}

Message:
${form.message}

Thank you.
    `.trim();

    const encodedMessage = encodeURIComponent(whatsappMessage);

    setSubmitted(true);

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`,
      "_blank",
      "noopener,noreferrer"
    );
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
                    onClick={() => setSelected(item.id)}
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

              <span className="text-[11px] text-white/35">
                Selected:
              </span>

              <span className="text-[11px] font-medium text-white/75">
                {active.label}
              </span>
            </div>

            {/* WHATSAPP BUTTON */}
            <div className="mt-10 flex justify-center">
              <button
                onClick={openWhatsApp}
                className="group flex w-full max-w-md items-center justify-center gap-4 rounded-full bg-gradient-to-r from-[#20d66b] to-[#16a085] px-7 py-5 text-sm font-bold uppercase tracking-[.12em] text-white shadow-[0_0_45px_rgba(32,214,107,.2)] transition-all hover:-translate-y-1 hover:shadow-[0_0_65px_rgba(32,214,107,.3)]"
              >
                <MessageCircle
                  size={22}
                  fill="currentColor"
                  strokeWidth={1}
                />

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
          DROP US A MESSAGE
      ========================================================= */}
      <section className="relative overflow-hidden border-t border-white/10 bg-[#0b0c0c] px-5 py-24 md:px-8 lg:px-20 lg:py-32">
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
                Drop us a{" "}
                <span className="italic text-[#c7a15c]">
                  message.
                </span>
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

            {/* FORM */}
            <div className="border border-white/10 bg-[#121413] p-6 md:p-8 lg:p-10">
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Name + Phone */}
                <div className="grid gap-6 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-3 flex items-center gap-2 font-mono text-[8px] uppercase tracking-[.22em] text-white/35">
                      <User size={12} />
                      Your Name
                    </span>

                    <input
                      required
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="w-full border-b border-white/15 bg-transparent px-0 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-[#c7a15c]"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-3 flex items-center gap-2 font-mono text-[8px] uppercase tracking-[.22em] text-white/35">
                      <Phone size={12} />
                      Phone
                    </span>

                    <input
                      required
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      className="w-full border-b border-white/15 bg-transparent px-0 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-[#c7a15c]"
                    />
                  </label>
                </div>

                {/* Email + Inquiry */}
                <div className="grid gap-6 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-3 flex items-center gap-2 font-mono text-[8px] uppercase tracking-[.22em] text-white/35">
                      <Mail size={12} />
                      Email
                    </span>

                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Enter email address"
                      className="w-full border-b border-white/15 bg-transparent px-0 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-[#c7a15c]"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-3 font-mono text-[8px] uppercase tracking-[.22em] text-white/35">
                      Inquiry Type
                    </span>

                    <select
                      name="inquiry"
                      value={form.inquiry}
                      onChange={handleChange}
                      className="w-full border-b border-white/15 bg-transparent px-0 py-3 text-sm text-white outline-none transition-colors focus:border-[#c7a15c]"
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
                    Your Message
                  </span>

                  <textarea
                    required
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your requirement..."
                    rows={6}
                    className="w-full resize-none border-b border-white/15 bg-transparent px-0 py-3 text-sm leading-7 text-white outline-none transition-colors placeholder:text-white/20 focus:border-[#c7a15c]"
                  />
                </label>

                {/* SUBMIT */}
                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-3 bg-[#c7a15c] px-7 py-5 text-[10px] font-bold uppercase tracking-[.2em] text-[#0b0c0c] transition-all hover:bg-[#dfbb78] hover:-translate-y-0.5"
                >
                  <Send
                    size={15}
                    className="transition-transform group-hover:translate-x-1"
                  />

                  {submitted ? "Message Ready on WhatsApp" : "Send Message"}

                  <ArrowUpRight
                    size={15}
                    className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </button>

                <p className="text-center font-mono text-[8px] uppercase tracking-[.18em] text-white/25">
                  Your message will open directly in WhatsApp
                </p>
              </form>
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
            <span className="italic text-[#c7a15c]">
              something lasting.
            </span>
          </h3>

          <div className="mt-10 flex justify-center">
            <button
              onClick={openWhatsApp}
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