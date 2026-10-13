import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#0b0c0c] text-[#f2eee7]">
      {/* Subtle architectural grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        {/* Top Callout */}
        <div className="mb-12 flex flex-col gap-6 border-b border-white/10 pb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.3em] text-[#c7a15c]">
              <span className="h-px w-8 bg-[#c7a15c]" />
              <span>Vardha Builders</span>
            </div>

            <h2 className="font-display text-4xl font-semibold leading-none tracking-tight text-white md:text-5xl lg:text-6xl">
              BUILD BETTER.{" "}
              <span className="italic text-[#c7a15c]">TOGETHER.</span>
            </h2>
          </div>

          <Link
            to="/contact"
            className="group inline-flex w-fit items-center gap-3 rounded-full border border-[#c7a15c]/40 bg-[#c7a15c]/5 px-6 py-3.5 font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-[#c7a15c] transition-all hover:border-[#c7a15c] hover:bg-[#c7a15c] hover:text-[#0b0c0c]"
          >
            Start a Conversation
            <ArrowUpRight
              size={13}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        {/* Links Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-1.5 font-display text-xl font-bold tracking-tight text-white">
              <span>Vardha</span>
              <span className="text-[#c7a15c]">Builders</span>
            </div>

            <p className="max-w-xs text-xs leading-6 text-white/50">
              Building thoughtful residential and commercial spaces with modern
              architecture, structural engineering, and timeless craftsmanship.
            </p>

            <div className="font-mono text-[8px] uppercase tracking-[0.25em] text-white/30">
              Gorakhpur, Uttar Pradesh
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-4 font-mono text-[9px] uppercase tracking-[0.25em] text-[#c7a15c]">
              Navigation
            </h3>

            <div className="space-y-2.5 text-xs text-white/60">
              <Link
                to="/"
                className="block transition-colors hover:text-[#c7a15c]"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="block transition-colors hover:text-[#c7a15c]"
              >
                About Us
              </Link>
              <Link
                to="/portfolio"
                className="block transition-colors hover:text-[#c7a15c]"
              >
                Projects Portfolio
              </Link>
              <Link
                to="/gallery"
                className="block transition-colors hover:text-[#c7a15c]"
              >
                Construction Gallery
              </Link>
              <Link
                to="/contact"
                className="block transition-colors hover:text-[#c7a15c]"
              >
                Contact & Inquiries
              </Link>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="mb-4 font-mono text-[9px] uppercase tracking-[0.25em] text-[#c7a15c]">
              Explore
            </h3>

            <div className="space-y-2.5 text-xs text-white/60">
              <Link
                to="/floor-plans"
                className="block transition-colors hover:text-[#c7a15c]"
              >
                Residence Floor Plans
              </Link>
              <Link
                to="/portfolio"
                className="block transition-colors hover:text-[#c7a15c]"
              >
                Featured Developments
              </Link>
              <Link
                to="/contact"
                className="block transition-colors hover:text-[#c7a15c]"
              >
                Book a Site Visit
              </Link>
              <Link
                to="/contact"
                className="block transition-colors hover:text-[#c7a15c]"
              >
                Request a Quote
              </Link>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="mb-4 font-mono text-[9px] uppercase tracking-[0.25em] text-[#c7a15c]">
              Direct Contact
            </h3>

            <div className="space-y-2.5 text-xs text-white/60">
              <p className="text-white/80">Vardha Builders Corporate Office</p>
              <p>Gorakhpur, Uttar Pradesh, India</p>
              <p className="font-mono text-[11px] text-white/50">
                Direct WhatsApp Inquiries
              </p>
              <Link
                to="/contact"
                className="inline-block text-[#c7a15c] underline underline-offset-4 transition-colors hover:text-[#dfbb78]"
              >
                Submit an Online Inquiry →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 font-mono text-[9px] uppercase tracking-[0.16em] text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Vardha Builders. Building Dreams Since 2014.</p>

          <div className="flex gap-6">
            <span className="text-white/20">Architectural Excellence</span>
            <span>All Rights Reserved</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
