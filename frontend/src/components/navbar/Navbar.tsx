
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
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
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
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
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
          fixed inset-x-0 top-0 z-[100] w-full
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
            justify-between gap-2
            px-3 sm:px-6 lg:px-12
            transition-all duration-500
            ${scrolled ? "h-[68px] sm:h-[72px]" : "h-[76px] sm:h-[82px]"}
          `}
        >
          {/* LOGO */}
          <Link
            to="/"
            onClick={closeMenu}
            className="relative z-[102] flex min-w-0 shrink items-center"
            aria-label="Vardha Builders home"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <span className="font-display text-[19px] font-semibold tracking-[-0.05em] text-white sm:text-[25px]">
                  Vardha
                </span>

                <span className="font-display text-[19px] font-semibold tracking-[-0.05em] text-vardha-gold sm:text-[25px]">
                  Builders
                </span>
              </div>

              <div className="mt-1 flex items-center gap-2">
                <span className="h-px w-4 bg-vardha-gold/70 sm:w-5" />

                <span className="whitespace-nowrap text-[6px] font-medium uppercase tracking-[0.16em] text-white/50 sm:text-[7px] sm:tracking-[0.3em]">
                  Building Dreams Since 2014
                </span>
              </div>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-4 lg:flex xl:gap-7"
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                aria-current={
                  isActive(item.path) ? "page" : undefined
                }
                className="group relative py-2 text-[10px] font-medium uppercase tracking-[0.14em] xl:tracking-[0.18em]"
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

          {/* HEADER ACTIONS */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {/* DAY / NIGHT MODE */}
            <button
              type="button"
              onClick={handleNightMode}
              aria-label="Toggle day and night mode"
              className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 backdrop-blur-md transition hover:border-vardha-gold/60 hover:text-vardha-gold md:flex"
            >
              {nightMode ? (
                <Moon size={15} strokeWidth={1.5} />
              ) : (
                <Sun size={15} strokeWidth={1.5} />
              )}
            </button>

            {/* CONTACT BUTTON */}
            <Link
              to="/contact"
              onClick={closeMenu}
              className="hidden items-center gap-2 bg-vardha-gold px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.12em] text-black transition hover:bg-white md:flex xl:px-5"
            >
              Get In Touch
              <ArrowUpRight size={13} strokeWidth={1.8} />
            </Link>

            {/* HAMBURGER: MOBILE AND TABLET ONLY */}
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="vardha-navigation-panel"
              className="relative z-[102] flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-[#111]/95 text-white backdrop-blur-md transition hover:border-vardha-gold hover:text-vardha-gold sm:h-11 sm:w-11 lg:hidden"
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

      {/* MOBILE / TABLET MENU OVERLAY */}
      <div
        className={`fixed inset-0 z-[90] transition-[visibility] duration-500 ${
          menuOpen ? "visible" : "invisible delay-500"
        }`}
        aria-hidden={!menuOpen}
      >
        {/* BACKDROP */}
        <button
          type="button"
          tabIndex={menuOpen ? 0 : -1}
          aria-label="Close navigation menu"
          onClick={closeMenu}
          className={`absolute inset-0 cursor-default bg-black/60 backdrop-blur-[2px] transition-opacity duration-500 ${
            menuOpen
              ? "opacity-100"
              : "pointer-events-none opacity-0"
          }`}
        />

        {/* RIGHT-SIDE MENU PANEL */}
        <aside
          id="vardha-navigation-panel"
          aria-label="Mobile navigation"
          aria-hidden={!menuOpen}
          className={`
            absolute inset-y-0 right-0 z-[91]
            flex h-full
            w-[min(88%,360px)]
            flex-col
            overflow-x-hidden overflow-y-auto overscroll-contain
            border-l border-vardha-gold/30
            bg-[#090909]
            shadow-[-20px_0_80px_rgba(0,0,0,0.35)]
            transition-transform duration-700
            ease-[cubic-bezier(0.16,1,0.3,1)]
            ${menuOpen ? "translate-x-0" : "translate-x-full"}
          `}
        >
          {/* BACKGROUND GRID */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute inset-0 opacity-[0.045]
              [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)]
              [background-size:42px_42px]
              sm:[background-size:55px_55px]
            "
          />

          {/* GOLD GLOW */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 top-1/4 h-48 w-48 rounded-full bg-vardha-gold/[0.08] blur-[80px] sm:h-[300px] sm:w-[300px]"
          />

          {/* PANEL CONTENT */}
          <div className="relative mx-auto flex min-h-full w-full flex-1 flex-col px-4 pb-5 pt-[100px] sm:px-6 sm:pb-6 sm:pt-[110px]">
            {/* MENU INTRO */}
            <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-5 sm:pb-6">
              <div>
                <p className="text-[9px] uppercase tracking-[0.3em] text-vardha-gold">
                  Vardha Builders
                </p>

                <p className="mt-2 text-[9px] uppercase tracking-[0.16em] text-white/35">
                  Explore the experience
                </p>
              </div>

              <span className="h-px w-8 shrink-0 bg-vardha-gold/50" />
            </div>

            {/* NUMBERED NAVIGATION LINKS */}
            <nav
              aria-label="Mobile navigation links"
              className="flex flex-1 flex-col justify-center gap-2.5 py-6 sm:gap-3 sm:py-8"
            >
              {navItems.map((item, index) => {
                const active = isActive(item.path);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    tabIndex={menuOpen ? 0 : -1}
                    aria-current={active ? "page" : undefined}
                    onClick={closeMenu}
                    className="
                      group relative flex w-full min-w-0
                      items-center justify-between gap-2
                      overflow-hidden rounded-full
                      border border-white/15
                      bg-white/[0.025]
                      px-3 py-3.5 text-white
                      transition-all duration-500
                      hover:border-vardha-gold
                      sm:px-4 sm:py-4
                    "
                  >
                    {/* GOLD HOVER BACKGROUND */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 origin-left scale-x-0 bg-vardha-gold transition-transform duration-500 group-hover:scale-x-100"
                    />

                    {/* SHINE EFFECT */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-0 -left-full w-1/3 skew-x-[-20deg] bg-white/20 transition-all duration-700 group-hover:left-[120%]"
                    />

                    {/* NUMBER AND LABEL */}
                    <span className="relative z-10 flex min-w-0 items-center gap-3 sm:gap-4">
                      <span
                        className={`w-5 shrink-0 font-mono text-[8px] tracking-[0.15em] transition-colors duration-300 ${
                          active
                            ? "text-vardha-gold group-hover:text-black/60"
                            : "text-vardha-gold/65 group-hover:text-black/60"
                        }`}
                      >
                        0{index + 1}
                      </span>

                      <span
                        className={`min-w-0 break-words font-display text-[clamp(15px,4.2vw,21px)] leading-tight tracking-[-0.035em] transition-all duration-500 group-hover:translate-x-0.5 sm:text-[22px] ${
                          active
                            ? "text-vardha-gold group-hover:text-black"
                            : "text-white/85 group-hover:text-black"
                        }`}
                      >
                        {item.label}
                      </span>
                    </span>

                    {/* ARROW ICON */}
                    <span
                      className="
                        relative z-10 flex h-8 w-8 shrink-0
                        items-center justify-center rounded-full
                        border border-white/15
                        text-white/50
                        transition-all duration-500
                        group-hover:translate-x-0.5
                        group-hover:-translate-y-0.5
                        group-hover:border-black/20
                        group-hover:text-black
                      "
                    >
                      <ArrowUpRight size={15} strokeWidth={1.2} />
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* PANEL FOOTER */}
            <div className="border-t border-white/10 pt-5 sm:pt-6">
              <p className="text-[8px] uppercase tracking-[0.22em] text-white/35 sm:text-[9px] sm:tracking-[0.3em]">
                Building Dreams Since 2014
              </p>

              <p className="mt-2 text-[11px] leading-6 text-white/45">
                Premium residential &amp; commercial spaces.
              </p>

              <Link
                to="/contact"
                tabIndex={menuOpen ? 0 : -1}
                onClick={closeMenu}
                className="group mt-4 inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-vardha-gold transition-colors duration-300 hover:text-white sm:mt-5"
              >
                Book a site visit

                <ArrowUpRight
                  size={13}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}