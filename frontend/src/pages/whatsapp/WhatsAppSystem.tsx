import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  MessageCircle,
  Send,
  X,
} from "lucide-react";

type WhatsAppSystemProps = {
  phoneNumber?: string;
  projectName?: string;
};

const DEFAULT_PHONE = "919999999999";

const quickActions = [
  {
    id: "projects",
    label: "Explore Projects",
    message: "Hi Vardha Builders, I want to explore your projects.",
  },
  {
    id: "floorplans",
    label: "View Floor Plans",
    message: "Hi Vardha Builders, I want to know about your available floor plans.",
  },
  {
    id: "price",
    label: "Price Enquiry",
    message: "Hi Vardha Builders, I want to enquire about property pricing.",
  },
  {
    id: "visit",
    label: "Book Site Visit",
    message: "Hi Vardha Builders, I would like to book a site visit.",
  },
];

export default function WhatsAppSystem({
  phoneNumber = DEFAULT_PHONE,
  projectName = "Vardha Builders",
}: WhatsAppSystemProps) {
  const [open, setOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [sent, setSent] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    requirement: "Project Enquiry",
    message: "",
  });

  const cleanPhone = phoneNumber.replace(/\D/g, "");

  const openWhatsApp = (message: string) => {
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleQuickAction = (message: string) => {
    openWhatsApp(message);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const message = `
Hi ${projectName},

I am interested in your property.

Name: ${form.name}
Phone: ${form.phone}
Requirement: ${form.requirement}

Message:
${form.message || "I would like to know more about your project."}
    `.trim();

    openWhatsApp(message);

    setSent(true);

    window.setTimeout(() => {
      setSent(false);
      setShowForm(false);
    }, 2200);
  };

  useEffect(() => {
    const handleOpen = () => {
      setOpen(true);
    };

    window.addEventListener("open-vardha-whatsapp", handleOpen);

    return () => {
      window.removeEventListener("open-vardha-whatsapp", handleOpen);
    };
  }, []);

  return (
    <>
      {/* =====================================================
          FLOATING WHATSAPP BUTTON
      ====================================================== */}

      <div className="fixed bottom-5 right-5 z-[999] md:bottom-7 md:right-7">
        {open && (
          <div className="mb-4 w-[calc(100vw-40px)] max-w-[370px] overflow-hidden border border-white/15 bg-[#171918]/95 shadow-2xl backdrop-blur-2xl">
            {/* Header */}
            <div className="relative overflow-hidden border-b border-white/10 px-5 py-5">
              <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-[#c5a064]/10 blur-2xl" />

              <div className="relative flex items-start justify-between">
                <div>
                  <div className="mb-2 text-[9px] tracking-[0.28em] text-[#d2af70]">
                    VARDHA / CONNECT
                  </div>

                  <div className="text-lg font-semibold tracking-tight text-white">
                    How can we help?
                  </div>

                  <div className="mt-1 text-xs leading-5 text-white/50">
                    Talk directly with our property team on WhatsApp.
                  </div>
                </div>

                <button
                  onClick={() => setOpen(false)}
                  className="flex h-8 w-8 items-center justify-center border border-white/10 text-white/50 transition hover:border-[#c5a064]/50 hover:text-white"
                  aria-label="Close WhatsApp"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Quick actions */}
            <div className="p-3">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => handleQuickAction(action.message)}
                  className="group flex w-full items-center justify-between border-b border-white/[0.07] px-3 py-3.5 text-left last:border-0 hover:bg-white/[0.035]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center border border-[#c5a064]/25 text-[#d2af70]">
                      {action.id === "visit" ? (
                        <CalendarDays size={14} />
                      ) : (
                        <MessageCircle size={14} />
                      )}
                    </div>

                    <span className="text-xs tracking-wide text-white/75">
                      {action.label}
                    </span>
                  </div>

                  <ArrowRight
                    size={14}
                    className="text-white/25 transition group-hover:translate-x-1 group-hover:text-[#d2af70]"
                  />
                </button>
              ))}

              {/* Custom enquiry */}
              <button
                onClick={() => setShowForm(true)}
                className="mt-2 flex w-full items-center justify-center gap-2 border border-[#c5a064]/40 bg-[#c5a064] px-4 py-3.5 text-[10px] font-semibold tracking-[0.18em] text-[#171918] transition hover:bg-[#d6b879]"
              >
                SEND CUSTOM ENQUIRY
                <Send size={13} />
              </button>
            </div>

            <div className="border-t border-white/[0.07] px-5 py-3">
              <div className="flex items-center gap-2 text-[9px] tracking-[0.14em] text-white/35">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,.6)]" />
                WHATSAPP ENQUIRY
              </div>
            </div>
          </div>
        )}

        {/* Floating button */}
        <button
          onClick={() => setOpen((value) => !value)}
          className="group relative ml-auto flex h-[58px] w-[58px] items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_40px_rgba(37,211,102,.28)] transition duration-300 hover:scale-105"
          aria-label="Open WhatsApp"
        >
          {!open && (
            <span className="absolute inset-0 rounded-full border border-[#25D366]/60 animate-ping" />
          )}

          {open ? <X size={24} /> : <MessageCircle size={27} />}

          {!open && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#d5b06a] px-1 text-[8px] font-bold text-[#171918]">
              1
            </span>
          )}
        </button>
      </div>

      {/* =====================================================
          CUSTOM ENQUIRY MODAL
      ====================================================== */}

      {showForm && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 p-5 backdrop-blur-md">
          <div className="relative w-full max-w-xl overflow-hidden border border-white/15 bg-[#f3f0e9] text-[#191a18] shadow-2xl">
            {/* Decorative grid */}
            <div
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(25,26,24,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(25,26,24,.08) 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            />

            <div className="relative p-6 md:p-8">
              <div className="flex items-start justify-between">
                <div>
                  <div className="mb-2 text-[9px] tracking-[0.28em] text-[#a98245]">
                    VARDHA / ENQUIRY
                  </div>

                  <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
                    Start a conversation.
                  </h3>

                  <p className="mt-2 max-w-md text-xs leading-5 text-black/50">
                    Fill in your details and continue the conversation
                    directly on WhatsApp.
                  </p>
                </div>

                <button
                  onClick={() => setShowForm(false)}
                  className="flex h-9 w-9 items-center justify-center border border-black/10 text-black/40 transition hover:border-black/30 hover:text-black"
                >
                  <X size={16} />
                </button>
              </div>

              {sent ? (
                <div className="flex min-h-[330px] flex-col items-center justify-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white">
                    <Check size={28} />
                  </div>

                  <div className="mt-5 text-xl font-semibold">
                    WhatsApp opened.
                  </div>

                  <p className="mt-2 max-w-xs text-xs leading-5 text-black/50">
                    Your enquiry has been prepared. Continue the conversation
                    with the Vardha team.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="relative mt-7 space-y-5"
                >
                  <div className="grid gap-5 md:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-[9px] tracking-[0.18em] text-black/45">
                        YOUR NAME
                      </span>

                      <input
                        required
                        value={form.name}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            name: e.target.value,
                          })
                        }
                        placeholder="Enter your name"
                        className="w-full border border-black/10 bg-white/60 px-4 py-3 text-sm outline-none transition placeholder:text-black/25 focus:border-[#a98245]"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-[9px] tracking-[0.18em] text-black/45">
                        PHONE NUMBER
                      </span>

                      <input
                        required
                        type="tel"
                        value={form.phone}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            phone: e.target.value,
                          })
                        }
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full border border-black/10 bg-white/60 px-4 py-3 text-sm outline-none transition placeholder:text-black/25 focus:border-[#a98245]"
                      />
                    </label>
                  </div>

                  <label className="block">
                    <span className="mb-2 block text-[9px] tracking-[0.18em] text-black/45">
                      I AM INTERESTED IN
                    </span>

                    <div className="relative">
                      <select
                        value={form.requirement}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            requirement: e.target.value,
                          })
                        }
                        className="w-full appearance-none border border-black/10 bg-white/60 px-4 py-3 text-sm outline-none focus:border-[#a98245]"
                      >
                        <option>Project Enquiry</option>
                        <option>2 BHK</option>
                        <option>3 BHK</option>
                        <option>4 BHK</option>
                        <option>Commercial Property</option>
                        <option>Floor Plans</option>
                        <option>Site Visit</option>
                        <option>Investment</option>
                        <option>General Enquiry</option>
                      </select>

                      <ChevronDown
                        size={15}
                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-black/40"
                      />
                    </div>
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-[9px] tracking-[0.18em] text-black/45">
                      MESSAGE
                    </span>

                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          message: e.target.value,
                        })
                      }
                      placeholder="Tell us what you are looking for..."
                      className="w-full resize-none border border-black/10 bg-white/60 px-4 py-3 text-sm outline-none placeholder:text-black/25 focus:border-[#a98245]"
                    />
                  </label>

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-3 bg-[#25D366] px-5 py-4 text-xs font-bold tracking-[0.12em] text-white transition hover:bg-[#1fb95a]"
                  >
                    CONTINUE ON WHATSAPP
                    <MessageCircle size={16} />
                  </button>

                  <p className="text-center text-[9px] leading-4 text-black/35">
                    Your enquiry will open in WhatsApp. No account or
                    additional website form is required.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}