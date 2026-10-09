import { useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  User,
} from "lucide-react";

const WHATSAPP_NUMBER = "919999999999";

type Status = "idle" | "loading" | "success" | "error";

export default function SiteVisit() {
  const [status, setStatus] = useState<Status>("idle");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    project: "",
    date: "",
    time: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStatus("loading");

    const whatsappMessage = `
Hello Vardha Builders,

I would like to schedule a site visit.

Name: ${form.name}
Phone: ${form.phone}
Email: ${form.email || "Not provided"}
Project: ${form.project || "Not specified"}
Preferred Date: ${form.date || "Flexible"}
Preferred Time: ${form.time || "Flexible"}

Message:
${form.message || "No additional message."}

Thank you.
    `.trim();

    const encodedMessage =
      encodeURIComponent(whatsappMessage);

    window.setTimeout(() => {
      try {
        window.open(
          `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`,
          "_blank",
          "noopener,noreferrer"
        );

        setStatus("success");
      } catch {
        setStatus("error");
      }
    }, 500);
  };

  return (
    <section className="relative overflow-hidden bg-[#0b0c0c] px-5 py-24 text-white sm:px-8 lg:px-12 lg:py-36">
      {/* Architectural grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Gold glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c7a15c]/[0.035] blur-[130px]" />

      <div className="relative mx-auto max-w-[1440px]">
        {/* Section label */}
        <div className="mb-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/30">
              06
            </span>

            <span className="h-px w-8 bg-[#c7a15c]" />

            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/40">
              Private Viewing
            </span>
          </div>

          <span className="hidden font-mono text-[9px] uppercase tracking-[0.25em] text-white/20 sm:block">
            Vardha / Site Visit
          </span>
        </div>

        <div className="h-px w-full bg-white/10" />

        <div className="mt-16 grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          {/* =====================================================
              LEFT CONTENT
          ===================================================== */}
          <div className="lg:pt-5">
            <div className="flex h-14 w-14 items-center justify-center border border-[#c7a15c]/40 bg-[#c7a15c]/[0.06] text-[#c7a15c]">
              <MapPin size={23} strokeWidth={1.2} />
            </div>

            <p className="mt-10 font-mono text-[9px] uppercase tracking-[0.35em] text-[#c7a15c]">
              Private Viewing
            </p>

            <h2 className="mt-5 font-display text-5xl leading-[0.9] tracking-[-0.045em] md:text-7xl">
              Schedule a
              <br />
              <span className="text-[#c7a15c]">
                site visit.
              </span>
            </h2>

            <p className="mt-8 max-w-md text-sm leading-7 text-white/40 md:text-base">
              Tell us what you are looking for and the Vardha team
              can follow up with the relevant project information and
              help arrange a private viewing.
            </p>

            {/* Information */}
            <div className="mt-12 border-t border-white/10 pt-8">
              <div className="flex items-start gap-4">
                <CalendarDays
                  size={17}
                  strokeWidth={1.2}
                  className="mt-0.5 text-[#c7a15c]"
                />

                <div>
                  <div className="font-mono text-[8px] uppercase tracking-[0.25em] text-white/25">
                    Choose your preferred date
                  </div>

                  <p className="mt-2 text-xs leading-6 text-white/40">
                    Select a convenient date and time and our team
                    will coordinate with you.
                  </p>
                </div>
              </div>

              <div className="mt-7 flex items-start gap-4">
                <MessageCircle
                  size={17}
                  strokeWidth={1.2}
                  className="mt-0.5 text-[#c7a15c]"
                />

                <div>
                  <div className="font-mono text-[8px] uppercase tracking-[0.25em] text-white/25">
                    Direct confirmation
                  </div>

                  <p className="mt-2 text-xs leading-6 text-white/40">
                    Your request will open directly in WhatsApp for
                    quick confirmation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* =====================================================
              FORM
          ===================================================== */}
          <form
            onSubmit={submit}
            className="border border-white/10 bg-[#111311] p-6 md:p-10"
          >
            {/* Form header */}
            <div className="mb-10 flex items-center justify-between border-b border-white/10 pb-6">
              <div>
                <div className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/25">
                  Private appointment
                </div>

                <div className="mt-2 text-sm text-white/70">
                  Request a site visit
                </div>
              </div>

              <Send
                size={17}
                strokeWidth={1.2}
                className="text-[#c7a15c]"
              />
            </div>

            {/* Name / Phone */}
            <div className="grid gap-7 md:grid-cols-2">
              <div>
                <label className="mb-3 flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.25em] text-white/35">
                  <User size={11} />
                  Name
                </label>

                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="field w-full border-b border-white/15 bg-transparent px-0 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-[#c7a15c]"
                />
              </div>

              <div>
                <label className="mb-3 flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.25em] text-white/35">
                  <Phone size={11} />
                  Phone
                </label>

                <input
                  required
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91"
                  className="field w-full border-b border-white/15 bg-transparent px-0 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-[#c7a15c]"
                />
              </div>
            </div>

            {/* Email / Project */}
            <div className="mt-8 grid gap-7 md:grid-cols-2">
              <div>
                <label className="mb-3 flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.25em] text-white/35">
                  <Mail size={11} />
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="field w-full border-b border-white/15 bg-transparent px-0 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-[#c7a15c]"
                />
              </div>

              <div>
                <label className="mb-3 flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.25em] text-white/35">
                  <MapPin size={11} />
                  Project
                </label>

                <input
                  name="project"
                  value={form.project}
                  onChange={handleChange}
                  placeholder="Project name"
                  className="field w-full border-b border-white/15 bg-transparent px-0 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-[#c7a15c]"
                />
              </div>
            </div>

            {/* Date / Time */}
            <div className="mt-8 grid gap-7 md:grid-cols-2">
              <div>
                <label className="mb-3 flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.25em] text-white/35">
                  <CalendarDays size={11} />
                  Preferred Date
                </label>

                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="field w-full border-b border-white/15 bg-transparent px-0 py-3 text-sm text-white outline-none transition-colors focus:border-[#c7a15c] [color-scheme:dark]"
                />
              </div>

              <div>
                <label className="mb-3 flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.25em] text-white/35">
                  <Clock3 size={11} />
                  Preferred Time
                </label>

                <input
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  className="field w-full border-b border-white/15 bg-transparent px-0 py-3 text-sm text-white outline-none transition-colors focus:border-[#c7a15c] [color-scheme:dark]"
                />
              </div>
            </div>

            {/* Message */}
            <div className="mt-8">
              <label className="mb-3 block font-mono text-[8px] uppercase tracking-[0.25em] text-white/35">
                Message
              </label>

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us anything we should know..."
                rows={5}
                className="field min-h-32 w-full resize-none border border-white/10 bg-[#0c0e0c] px-4 py-4 text-sm leading-7 text-white outline-none transition-colors placeholder:text-white/20 focus:border-[#c7a15c]"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="group mt-8 flex w-full items-center justify-center gap-4 border border-[#c7a15c]/50 bg-[#c7a15c]/10 px-6 py-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#e2bf79] transition-all duration-300 hover:border-[#c7a15c] hover:bg-[#c7a15c] hover:text-[#101110] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === "success" ? (
                <>
                  <MessageCircle size={17} />
                  Request Prepared
                </>
              ) : status === "loading" ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border border-[#c7a15c] border-t-transparent" />
                  Preparing Request...
                </>
              ) : (
                <>
                  Request a Site Visit
                  <Send
                    size={15}
                    strokeWidth={1.4}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </>
              )}
            </button>

            {/* Privacy */}
            <div className="mt-5 flex items-center justify-center gap-2">
              <ShieldCheck
                size={12}
                className="text-white/20"
              />

              <span className="font-mono text-[7px] uppercase tracking-[0.22em] text-white/20">
                Private enquiry · Direct WhatsApp confirmation
              </span>
            </div>

            {status === "error" && (
              <p className="mt-5 text-center text-xs text-red-400">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>

        {/* Bottom line */}
        <div className="mt-20 h-px w-full bg-white/10" />

        <div className="mt-6 flex items-center justify-between">
          <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-white/20">
            Vardha Builders
          </span>

          <span className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.25em] text-white/20">
            Private Viewing
            <ArrowUpRight size={11} />
          </span>
        </div>
      </div>
    </section>
  );
}