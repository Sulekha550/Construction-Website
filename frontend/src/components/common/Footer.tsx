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
            <div className="mb-3 flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[#c7a15c]">
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
            className="btn-gold group text-xs sm:text-sm tracking-[0.14em]"
          >
            <span>Start a Conversation</span>
            <ArrowUpRight
              size={15}
              strokeWidth={2}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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

            <div className="font-mono text-xs uppercase tracking-wider text-white/50">
              Gorakhpur, Uttar Pradesh
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#c7a15c]">
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
            <h3 className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#c7a15c]">
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
            <h3 className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#c7a15c]">
              Direct Contact
            </h3>

            <div className="space-y-3 text-sm text-white/70">
              <p className="font-medium text-white/90">Vardha Builders Corporate Office</p>
              <p className="text-xs text-white/60">Gorakhpur, Uttar Pradesh, India</p>
              <div className="pt-1">
                <a
                  href="https://wa.me/919999999999?text=Hello%20Vardha%20Builders%2C%20I%20would%20like%20to%20know%20more%20about%20your%20projects."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-2 text-xs font-medium text-emerald-300 transition-all hover:border-emerald-400 hover:bg-emerald-500/20"
                >
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Direct WhatsApp Inquiries</span>
                  <span className="font-mono text-[11px] text-emerald-400/80">→</span>
                </a>
              </div>
              <div>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#c7a15c] underline underline-offset-4 transition-colors hover:text-[#dfbb78]"
                >
                  Submit an Online Inquiry →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits (Issues 6 & 7: Readable Text & Contrast) */}
        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 font-mono text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Vardha Builders. Building Dreams Since 2014.</p>

          <div className="flex items-center gap-6">
            <span className="font-medium text-[#c7a15c]/90">
              Architectural Excellence
            </span>
            <span className="text-white/40">All Rights Reserved</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
