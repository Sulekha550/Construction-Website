import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0b0b0b] text-white">
      <div className="relative mx-auto max-w-7xl px-6 py-10 lg:px-8">

        {/* Top */}
        <div className="mb-8 flex flex-col gap-5 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-white/40">
              Vardha Builders
            </p>

            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              BUILD BETTER.
            </h2>
          </div>

          <button
            onClick={() =>
              window.dispatchEvent(
                new CustomEvent("open-vardha-whatsapp")
              )
            }
            className="w-fit rounded-full border border-white/20 px-5 py-2.5 text-xs transition hover:bg-white hover:text-black"
          >
            Start a Conversation
          </button>
        </div>

        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <div className="mb-3 text-lg font-semibold tracking-[0.2em]">
              VARDHA
            </div>

            <p className="max-w-xs text-xs leading-5 text-white/45">
              Building thoughtful spaces with modern architecture,
              quality construction and timeless design.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-3 text-[10px] uppercase tracking-[0.25em] text-white/40">
              Navigation
            </h3>

            <div className="space-y-2 text-sm text-white/65">
              <Link to="/" className="block hover:text-white">
                Home
              </Link>

              <Link to="/about" className="block hover:text-white">
                About
              </Link>

              <Link to="/portfolio" className="block hover:text-white">
                Projects
              </Link>

              <Link to="/gallery" className="block hover:text-white">
                Gallery
              </Link>

              <Link to="/contact" className="block hover:text-white">
                Contact
              </Link>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="mb-3 text-[10px] uppercase tracking-[0.25em] text-white/40">
              Explore
            </h3>

            <div className="space-y-2 text-sm text-white/65">
              <Link to="/floor-plans" className="block hover:text-white">
                Floor Plans
              </Link>

              <Link to="/portfolio" className="block hover:text-white">
                Our Projects
              </Link>

              <button
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent("open-vardha-whatsapp")
                  )
                }
                className="block hover:text-white"
              >
                Book Site Visit
              </button>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-3 text-[10px] uppercase tracking-[0.25em] text-white/40">
              Contact
            </h3>

            <div className="space-y-2 text-sm text-white/65">
              <p>+91 XXXXX XXXXX</p>
              <p>hello@vardhabuilders.com</p>
              <p>Gorakhpur, Uttar Pradesh</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-5 text-[10px] text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Vardha Builders. All rights reserved.</p>

          <div className="flex gap-5">
            <a href="#" className="hover:text-white">
              Instagram
            </a>

            <a href="#" className="hover:text-white">
              Facebook
            </a>

            <a href="#" className="hover:text-white">
              LinkedIn
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
