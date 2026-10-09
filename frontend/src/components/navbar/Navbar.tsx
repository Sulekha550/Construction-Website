
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Portfolio", path: "/portfolio" },
  { label: "Floor Plans", path: "/floor-plans" },
  { label: "Gallery", path: "/gallery" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [nightMode, setNightMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);

    handleScroll();
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const isActive = (path: string) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);

  const handleNightMode = () => {
    const nextMode = !nightMode;

    setNightMode(nextMode);

    document.documentElement.classList.toggle(
      "vardha-night",
      nextMode
    );
  };

  return (
    <>
      {/* HEADER */}
      <header
        className={`
          fixed left-0 top-0 z-[80] w-full
          transition-all duration-500
          ${
            scrolled || menuOpen
              ? "bg-[#0b0b0b]/95 shadow-[0_10px_50px_rgba(0,0,0,.25)] backdrop-blur-xl"
              : "bg-transparent"
          }
        `}
      >
        <div
          className={`
            mx-auto flex max-w-[1600px] items-center
            justify-between px-3 sm:px-8 lg:px-12
            transition-all duration-500
            ${scrolled ? "h-[72px]" : "h-[82px]"}
          `}
        >
          {/* LOGO */}
          <Link
            to="/"
            onClick={closeMenu}
            className="relative z-[100] flex min-w-0 shrink items-center"
          >
            <div>
              <div className="flex items-center gap-1">
                <span className="font-display text-[20px] font-semibold tracking-[-0.04em] text-white sm:text-[25px]">
                  Vardha
                </span>

                <span className="font-display text-[20px] font-semibold tracking-[-0.04em] text-vardha-gold sm:text-[25px]">
                  Builders
                </span>
              </div>

              <div className="mt-0.5 flex items-center gap-2">
                <span className="h-px w-5 bg-vardha-gold/70" />

                <span className="text-[6px] font-medium uppercase tracking-[0.2em] text-white/50 sm:text-[7px] sm:tracking-[0.35em]">
                  Building Dreams Since 2014
                </span>
              </div>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden items-center gap-5 lg:flex xl:gap-7">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="group relative py-2 text-[10px] font-medium uppercase tracking-[0.15em] xl:tracking-[0.18em]"
              >
                <span
                  className={`transition-colors duration-300 ${
                    isActive(item.path)
                      ? "text-vardha-gold"
                      : "text-white/65 group-hover:text-white"
                  }`}
                >
                  {item.label}
                </span>

                <span
                  className={`absolute bottom-0 left-0 h-px bg-vardha-gold transition-all duration-300 ${
                    isActive(item.path)
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* HEADER CONTROLS */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={handleNightMode}
              aria-label="Toggle day and night mode"
              className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 backdrop-blur-md transition-all duration-300 hover:border-vardha-gold/60 hover:text-vardha-gold md:flex"
            >
              {nightMode ? (
                <Moon size={15} strokeWidth={1.5} />
              ) : (
                <Sun size={15} strokeWidth={1.5} />
              )}
            </button>

            <Link
              to="/contact"
              onClick={closeMenu}
              className="hidden items-center gap-2 bg-vardha-gold px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.15em] text-black transition-all duration-300 hover:bg-white md:flex xl:gap-3 xl:px-5"
            >
              Get In Touch
              <ArrowUpRight size={13} strokeWidth={1.8} />
            </Link>

            {/* MENU BUTTON */}
            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="vardha-navigation-panel"
              className="relative z-[100] flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-[#111]/90 text-white backdrop-blur-md transition-all duration-300 hover:border-vardha-gold/60 hover:text-vardha-gold sm:h-11 sm:w-11"
            >
              {menuOpen ? (
                <X size={19} strokeWidth={1.5} />
              ) : (
                <Menu size={19} strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* MENU OVERLAY */}
      <div
        className={`fixed inset-0 z-[70] ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
      >
        {/* LEFT 30%: ORIGINAL WEBSITE VISIBLE */}
        <button
          type="button"
          aria-label="Close navigation menu"
          tabIndex={menuOpen ? 0 : -1}
          onClick={closeMenu}
          className={`
            absolute inset-y-0 left-0
            w-[30%] bg-transparent
            ${
              menuOpen
                ? "pointer-events-auto"
                : "pointer-events-none"
            }
          `}
        />

        {/* RIGHT 70%: MENU PANEL */}
        <div
          id="vardha-navigation-panel"
          className={`
            absolute inset-y-0 right-0
            flex h-full w-[70%] flex-col
            overflow-x-hidden overflow-y-auto overscroll-contain
            border-l border-vardha-gold/30
            bg-[#090909]
            transition-transform duration-700
            ease-[cubic-bezier(0.16,1,0.3,1)]
            ${
              menuOpen
                ? "translate-x-0"
                : "translate-x-full"
            }
          `}
        >
          {/* BACKGROUND GRID */}
          <div
            className="
              pointer-events-none absolute inset-0 opacity-[0.045]
              [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)]
              [background-size:45px_45px]
              sm:[background-size:65px_65px]
            "
          />

          {/* GOLD GLOW */}
          <div className="pointer-events-none absolute -right-24 top-1/4 h-48 w-48 rounded-full bg-vardha-gold/[0.08] blur-[80px] sm:h-[350px] sm:w-[350px]" />

          {/* PANEL CONTENT */}
          <div className="relative mx-auto flex min-h-full w-full flex-1 flex-col px-2.5 pb-4 pt-[100px] sm:px-6 sm:pb-6 sm:pt-[120px] md:px-8 lg:px-10 xl:px-14">
            {/* MENU HEADER */}
            <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-4 sm:pb-6">
              <div className="min-w-0">
                <p className="text-[7px] uppercase tracking-[0.2em] text-vardha-gold sm:text-[9px] sm:tracking-[0.4em]">
                  Vardha Builders
                </p>

                <p className="mt-2 text-[7px] uppercase tracking-[0.12em] text-white/35 sm:text-[9px] sm:tracking-[0.2em]">
                  Explore The Experience
                </p>
              </div>

              <span className="hidden h-px w-6 shrink-0 bg-vardha-gold/50 sm:block" />
            </div>

            {/* NAVIGATION LINKS */}
            <nav className="flex flex-1 flex-col justify-center gap-2 py-5 sm:gap-3 sm:py-8">
              {navItems.map((item, index) => (
                <Link
                  key={item.path}
                  to={item.path}
                  tabIndex={menuOpen ? 0 : -1}
                  onClick={closeMenu}
                  className="
                    group relative flex w-full min-w-0
                    items-center justify-between gap-1
                    overflow-hidden rounded-full
                    border border-white/15 bg-white/[0.025]
                    px-2 py-3 text-white
                    transition-all duration-500
                    hover:border-vardha-gold
                    sm:px-4 sm:py-4
                    md:px-5 md:py-5
                  "
                >
                  {/* GOLD HOVER FILL */}
                  <span className="absolute inset-0 origin-left scale-x-0 bg-vardha-gold transition-transform duration-500 group-hover:scale-x-100" />

                  {/* SHINE */}
                  <span className="absolute inset-y-0 -left-full w-1/3 skew-x-[-20deg] bg-white/20 transition-all duration-700 group-hover:left-[120%]" />

                  {/* NUMBER + LABEL */}
                  <div className="relative z-10 flex min-w-0 items-center gap-1.5 sm:gap-3 md:gap-4">
                    <span
                      className={`w-4 shrink-0 font-mono text-[6px] tracking-[0.1em] sm:w-5 sm:text-[8px] sm:tracking-[0.2em] ${
                        isActive(item.path)
                          ? "text-vardha-gold group-hover:text-black/60"
                          : "text-vardha-gold/70 group-hover:text-black/55"
                      }`}
                    >
                      0{index + 1}
                    </span>

                    <span
                      className={`min-w-0 break-words font-display text-[clamp(11px,3.3vw,17px)] leading-tight tracking-[-0.035em] transition-all duration-500 group-hover:translate-x-0.5 sm:text-[1.5rem] md:text-[1.8rem] lg:text-[2.1rem] ${
                        isActive(item.path)
                          ? "text-vardha-gold group-hover:text-black"
                          : "text-white/85 group-hover:text-black"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>

                  {/* ARROW */}
                  <span className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/45 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:border-black/20 group-hover:text-black sm:h-8 sm:w-8 md:h-9 md:w-9">
                    <ArrowUpRight size={13} strokeWidth={1.1} />
                  </span>
                </Link>
              ))}
            </nav>

            {/* FOOTER */}
            <div className="border-t border-white/10 pt-4 sm:pt-6">
              <p className="text-[7px] uppercase tracking-[0.15em] text-white/35 sm:text-[8px] sm:tracking-[0.3em]">
                Building Dreams Since 2014
              </p>

              <p className="mt-2 text-[8px] leading-relaxed text-white/45 sm:text-[10px]">
                Premium residential &amp; commercial spaces.
              </p>

              <Link
                to="/contact"
                tabIndex={menuOpen ? 0 : -1}
                onClick={closeMenu}
                className="group mt-4 inline-flex items-center gap-1.5 text-[7px] uppercase tracking-[0.12em] text-vardha-gold transition-colors duration-300 hover:text-white sm:mt-5 sm:gap-3 sm:text-[9px] sm:tracking-[0.25em]"
              >
                Book A Site Visit

                <ArrowUpRight
                  size={12}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}