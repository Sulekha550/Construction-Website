import { useEffect, useRef, useState, lazy, Suspense, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  Compass,
  Layers3,
  MapPin,
  Maximize2,
  RotateCcw,
  Ruler,
  Sparkles,
  X,
  MessageCircle,
} from "lucide-react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../data/projects";

// Dynamic import of 3D architectural scene for performance & resilience
const ArchitecturalScene = lazy(
  () => import("../components/three/ArchitecturalScene")
);

gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   VARDHA APPROVED REAL ESTATE IMAGERY
========================================================= */

const images = {
  hero: "/images/Home/Home1.webp",
  site: "/images/Home/Home2.webp",
  engineer: "/images/Home/Home3.webp",
  structure: "/images/Home/Home4.webp",
  residence: "/images/projects/palm-paradise.webp",
  interior: "/images/ai/ai-interior-hero.jpg",
  crane: "/images/Home/Home7.webp",
  detail: "/images/Home/Home8.webp",
};

/* =========================================================
   FINISHED INTERIOR VIEWS
========================================================= */

const interiorViews = [
  {
    title: "Grand Living Suite",
    desc: "Expansive double-height living spaces with natural light orientation, acoustic isolation, and architectural volume.",
    image: "/images/ai/ai-interior-hero.jpg",
    tag: "01 / 03 · Grand Lounge",
  },
  {
    title: "Designer Culinary Island",
    desc: "Bespoke modular kitchen layouts with natural stone counters, integrated cabinetry, and contemporary dining flow.",
    image: "/images/ai/ai-interior-kitchen.jpg",
    tag: "02 / 03 · Culinary Studio",
  },
  {
    title: "Panoramic Skyline Terrace",
    desc: "Floor-to-ceiling glass expanses providing scenic skyline vistas, seamless outdoor living, and private terrace access.",
    image: "/images/ai/ai-interior-living.jpg",
    tag: "03 / 03 · Panoramic Suite",
  },
];

/* =========================================================
   SERVICES
========================================================= */

const services = [
  {
    number: "01",
    icon: Compass,
    title: "Planning & Architecture",
    description:
      "Every project begins with careful planning, site understanding, and architectural thinking that creates a strong foundation for everything that follows.",
  },
  {
    number: "02",
    icon: Layers3,
    title: "Structural Construction",
    description:
      "From foundation and materials to engineering and execution, every stage is managed with precision, consistency, and attention to detail.",
  },
  {
    number: "03",
    icon: Ruler,
    title: "Engineering & Execution",
    description:
      "Our construction process brings design, engineering, and on-site execution together to create durable and carefully finished environments.",
  },
  {
    number: "04",
    icon: Sparkles,
    title: "Finishing & Experience",
    description:
      "The final layer of a project is where material, light, proportion, and detail come together to create spaces people can truly experience.",
  },
];

/* =========================================================
   CONSTRUCTION PROCESS STEPS (COHERENT TIMELINE)
========================================================= */

const processSteps = [
  {
    step: "01",
    title: "Site & Planning",
    desc: "Strategic land analysis, topography assessment, zoning compliance, and master layout planning.",
  },
  {
    step: "02",
    title: "Architectural Design",
    desc: "Spatial concept development, 3D daylight modeling, ventilation optimization, and elevation crafting.",
  },
  {
    step: "03",
    title: "Structural Engineering",
    desc: "High-grade RCC foundation, seismic safety engineering, structural load analysis, and quality auditing.",
  },
  {
    step: "04",
    title: "Precision Construction",
    desc: "Disciplined on-site project management, certified raw materials, and milestone-governed execution.",
  },
  {
    step: "05",
    title: "Finishing & Handover",
    desc: "Architectural detailing, acoustic insulation, landscape completion, and turnkey resident delivery.",
  },
];

/* =========================================================
   REVEAL COMPONENT
========================================================= */

function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`home-reveal ${className}`}>{children}</div>;
}

/* =========================================================
   HOME PAGE
========================================================= */

export default function Home() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [activeInteriorIndex, setActiveInteriorIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<{
    src: string;
    title: string;
    subtitle?: string;
  } | null>(null);

  /* LOCK SCROLL ON LIGHTBOX */
  useEffect(() => {
    if (lightboxImage) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setLightboxImage(null);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [lightboxImage]);

  /* GSAP ANIMATIONS */
  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      /* SECTION REVEALS */
      gsap.utils.toArray<HTMLElement>(".home-reveal").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
            },
          }
        );
      });

      /* HERO TEXT REVEAL */
      gsap.fromTo(
        ".hero-reveal",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.12,
          ease: "power3.out",
        }
      );

      /* HERO IMAGE PARALLAX */
      gsap.to(".hero-image", {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      /* SERVICE CARDS */
      gsap.utils.toArray<HTMLElement>(".service-card").forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              once: true,
            },
          }
        );
      });

      /* PROJECT CARDS */
      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            delay: index * 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              once: true,
            },
          }
        );
      });

      /* PROCESS ITEMS */
      gsap.utils.toArray<HTMLElement>(".process-step-card").forEach((item, index) => {
        gsap.fromTo(
          item,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: index * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
              once: true,
            },
          }
        );
      });

      /* STAT ITEMS */
      gsap.utils.toArray<HTMLElement>(".stat-item").forEach((stat, index) => {
        gsap.fromTo(
          stat,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: stat,
              start: "top 88%",
              once: true,
            },
          }
        );
      });

      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 300);

      return () => clearTimeout(timer);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={pageRef}
      className="bg-[var(--bg)] text-[var(--text)] transition-colors duration-500"
    >
      {/* =====================================================
          01 — HERO SECTION
          (Addresses Usability Issues #4, #5, #6, #7, #16)
      ====================================================== */}
      <section
        id="hero"
        aria-label="Vardha Builders Introduction"
        className="hero-section relative min-h-screen min-h-[100svh] overflow-hidden flex flex-col justify-between"
      >
        <img
          src={images.hero}
          alt="Modern architectural construction by Vardha Builders"
          fetchPriority="high"
          decoding="async"
          className="hero-image absolute inset-0 h-full w-full object-cover scale-105"
        />

        {/* Sophisticated Architectural Scrim & Atmospheric Lighting */}
        <div className="absolute inset-0 bg-[#0b0c0c]/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0c0c]/95 via-[#0b0c0c]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0c] via-transparent to-[#0b0c0c]/30" />
        <div className="arch-grid absolute inset-0 opacity-[0.06]" />

        {/* Hero Main Content */}
        <div className="relative z-10 flex flex-1 items-center px-4 pt-24 pb-14 sm:px-8 sm:pt-28 sm:pb-20 lg:px-16 xl:px-24">
          <div className="mx-auto w-full max-w-[1600px]">
            <div className="max-w-3xl">
              {/* Category Eyebrow */}
              <div className="hero-reveal mb-4 sm:mb-5 flex items-center gap-2.5 sm:gap-3">
                <span className="h-px w-8 sm:w-10 bg-[#c7a15c]" />
                <span className="font-mono text-[11px] sm:text-xs md:text-[13px] font-semibold uppercase tracking-[0.16em] sm:tracking-[0.22em] text-[#c7a15c] break-words">
                  Architecture · Engineering · Construction
                </span>
              </div>

              {/* Subtitle */}
              <p className="hero-reveal mb-3 sm:mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-white/70 sm:text-sm">
                Building dreams since 2014 · Gorakhpur, UP
              </p>

              {/* Main Headline */}
              <h1 className="hero-reveal font-display text-[clamp(2.7rem,7vw,6.8rem)] font-medium leading-[0.92] tracking-[-0.04em] text-white">
                We Build
                <br />
                <span className="italic text-[#c7a15c]">More.</span>
              </h1>

              {/* Hero Supporting Text */}
              <div className="hero-reveal mt-5 sm:mt-7 flex max-w-2xl items-start gap-3 sm:gap-4">
                <span className="mt-3 h-px w-7 shrink-0 bg-[#c7a15c] sm:w-14" />
                <p className="text-sm sm:text-lg md:text-xl font-normal leading-relaxed text-white/85">
                  Vardha Builders brings architecture, engineering, and
                  construction together to create iconic spaces designed for
                  people and built to endure for generations.
                </p>
              </div>

              {/* Primary & Secondary CTAs */}
              <div className="hero-reveal mt-8 sm:mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
                <Link
                  to="/portfolio"
                  className="btn-gold group text-xs sm:text-sm tracking-[0.14em]"
                >
                  Explore Projects
                  <ArrowRight
                    size={16}
                    strokeWidth={1.8}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  to="/about"
                  className="btn-outline-white text-xs sm:text-sm tracking-[0.14em]"
                >
                  Discover Vardha
                  <ArrowUpRight size={15} strokeWidth={1.8} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Bottom Bar & Center Scroll Indicator */}
        <div className="relative z-10 w-full px-4 pb-6 sm:px-8 sm:pb-8 lg:px-16 xl:px-24">
          <div className="mx-auto flex max-w-[1600px] items-end justify-between">
            {/* Left Location Indicator */}
            <div className="hidden items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-white/60 md:flex">
              <span className="h-px w-8 bg-[#c7a15c]" />
              <span>Gorakhpur · Uttar Pradesh</span>
            </div>

            {/* Bottom-Center Prominent Scroll Indicator */}
            <div className="mx-auto md:mx-0 md:absolute md:left-1/2 md:-translate-x-1/2">
              <a
                href="#intro"
                aria-label="Scroll to explore Vardha Builders"
                className="group flex flex-col items-center gap-1.5 sm:gap-2 rounded-full border border-white/20 bg-black/40 px-4 py-2 sm:px-5 sm:py-2.5 backdrop-blur-md transition-all duration-300 hover:border-[#c7a15c] hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c7a15c]"
              >
                <span className="font-mono text-[11px] sm:text-xs font-medium uppercase tracking-[0.2em] text-white/80 group-hover:text-[#c7a15c]">
                  Scroll to explore
                </span>
                <ArrowDown
                  size={14}
                  strokeWidth={1.8}
                  className="text-[#c7a15c] transition-transform duration-300 group-hover:translate-y-1 animate-bounce"
                />
              </a>
            </div>

            {/* Right Architectural Standard Indicator */}
            <div className="hidden items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[#c7a15c] lg:flex">
              <span>Established 2014</span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          02 — INTRODUCTION & PHILOSOPHY
          (Addresses Usability Issues #1, #2, #8)
      ====================================================== */}
      <section
        id="intro"
        aria-label="The Vardha Approach"
        className="section-padding bg-[var(--bg-soft)] transition-colors duration-500"
      >
        <div className="section-container">
          <div className="mb-10 flex items-center justify-between border-b border-[var(--line)] pb-5">
            <span className="font-mono text-xs sm:text-[13px] font-semibold uppercase tracking-[0.25em] text-[#c7a15c]">
              02 / THE VARDHA APPROACH
            </span>
            <Building2 size={20} strokeWidth={1.5} className="text-[#c7a15c]" />
          </div>

          <div className="grid gap-8 sm:gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 items-start">
            <Reveal>
              <span className="eyebrow-accent mb-4">
                Architecture · Engineering · Construction
              </span>
              <p className="font-display text-2xl sm:text-3xl font-light italic text-[var(--text-soft)]">
                Crafting landmark structures designed with purpose and built with absolute integrity.
              </p>
            </Reveal>

            <Reveal>
              <h2 className="font-display text-[clamp(2.1rem,4.5vw,4.5rem)] leading-[0.96] tracking-[-0.04em] text-[var(--text)]">
                From ground
                <br />
                <span className="text-[#c7a15c] italic">
                  to vision.
                </span>
              </h2>

              <p className="mt-5 sm:mt-7 text-sm sm:text-lg leading-relaxed text-[var(--text-soft)]">
                Construction is more than putting materials together. It is a
                disciplined orchestration of visionary planning, structural
                engineering, enduring craftsmanship, and uncompromising execution.
              </p>

              <p className="mt-4 sm:mt-5 text-sm sm:text-lg leading-relaxed text-[var(--text-soft)]">
                At Vardha Builders, every development moves seamlessly from an
                initial idea through architecture, structural precision, and
                turnkey construction to create spaces that are practical,
                distinctive, and built for decades to come.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =====================================================
          03 — CONSTRUCTION FEATURE ("BUILT FROM THE GROUND UP")
          (Addresses Usability Issues #9, #18)
      ====================================================== */}
      <section
        aria-label="Construction Execution"
        className="pb-16 sm:pb-28 bg-[var(--bg-soft)] transition-colors duration-500"
      >
        <div className="section-container">
          <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
            {/* Visual Stage with Enhanced Gradient Scrim for Guaranteed Contrast */}
            <div
              onClick={() =>
                setLightboxImage({
                  src: images.site,
                  title: "Built From The Ground Up",
                  subtitle: "Modern Construction Site & Structural Execution",
                })
              }
              role="button"
              tabIndex={0}
              aria-label="View full resolution construction site photo"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setLightboxImage({
                    src: images.site,
                    title: "Built From The Ground Up",
                    subtitle: "Modern Construction Site & Structural Execution",
                  });
                }
              }}
              className="group relative min-h-[420px] sm:min-h-[540px] lg:min-h-[600px] cursor-pointer overflow-hidden rounded-2xl border border-[var(--line)] shadow-2xl transition-all duration-500 hover:border-[#c7a15c]/60"
            >
              <img
                src={images.site}
                alt="Modern construction site structural engineering"
                loading="lazy"
                decoding="async"
                className="home-image absolute inset-0 h-full w-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
              />

              {/* Multi-tier contrast scrim protecting typography across all lighting conditions */}
              <div className="absolute inset-0 bg-[#0b0c0c]/40" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0c]/95 via-[#0b0c0c]/45 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 text-white md:bottom-12 md:left-12">
                {/* Construction Label */}
                <span className="inline-block font-mono text-[11px] sm:text-xs md:text-[13px] font-semibold tracking-wider text-white/85 bg-black/40 px-3 py-1 rounded-md border border-white/15 backdrop-blur-sm">
                  Construction / 01
                </span>

                <h3 className="mt-3 sm:mt-4 font-display text-[clamp(1.9rem,3.6vw,3.6rem)] font-medium leading-[0.95] text-white text-scrim">
                  Built from
                  <br />
                  the ground up.
                </h3>

                <p className="mt-2.5 sm:mt-3 max-w-lg text-xs sm:text-base text-white/80 leading-relaxed text-scrim">
                  Reinforced structural cores, premium-grade concrete execution, and meticulous safety governance at every floor.
                </p>
              </div>

              {/* Lightbox Expand Cue */}
              <div
                aria-hidden="true"
                className="absolute right-5 top-5 sm:right-6 sm:top-6 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-white/25 bg-black/60 text-white backdrop-blur-md opacity-80 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110 group-hover:border-[#c7a15c]"
              >
                <Maximize2 size={15} />
              </div>
            </div>

            {/* Philosophy Card Companion */}
            <div className="flex min-h-[380px] sm:min-h-[540px] lg:min-h-[600px] flex-col justify-between rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-10 lg:p-12 shadow-xl transition-colors duration-500">
              <div>
                <span className="font-mono text-xs sm:text-[13px] font-semibold uppercase tracking-[0.25em] text-[#c7a15c]">
                  VARDHA / CONSTRUCTION
                </span>
                <div className="mt-4 sm:mt-6 h-px w-full bg-[var(--line)]" />
              </div>

              <div className="py-6 sm:py-8">
                <p className="font-display text-[clamp(1.7rem,3vw,3rem)] font-light leading-[1.08] text-[var(--text)]">
                  Strong structures.
                  <br />
                  <span className="text-[#c7a15c] font-normal italic">
                    Thoughtful spaces.
                  </span>
                </p>

                <p className="mt-4 sm:mt-6 text-xs sm:text-base leading-relaxed text-[var(--text-soft)]">
                  Every pillar, slab, and beam is engineered to exceed standard building codes, creating a solid sanctuary for the generations who will call it home.
                </p>

                <div className="mt-6 sm:mt-8 flex items-center gap-3 sm:gap-4">
                  <span className="h-px w-8 sm:w-10 bg-[#c7a15c]" />
                  <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                    Vardha Engineering Standards
                  </span>
                </div>
              </div>

              <div>
                <Link
                  to="/portfolio"
                  className="btn-outline-gold w-full text-center text-xs sm:text-sm"
                >
                  View Structural Projects
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          04 — WHAT WE DO / SERVICES
          (Addresses Usability Issues #1, #2)
      ====================================================== */}
      <section
        aria-label="Vardha Construction Services"
        className="section-padding bg-[var(--surface)] transition-colors duration-500"
      >
        <div className="section-container">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
            <Reveal>
              <span className="font-mono text-xs sm:text-[13px] font-semibold uppercase tracking-[0.25em] text-[#c7a15c]">
                04 / WHAT WE DO
              </span>

              <h2 className="mt-4 sm:mt-6 font-display text-[clamp(2.1rem,4.5vw,4.5rem)] leading-[0.94] tracking-[-0.04em] text-[var(--text)]">
                How we
                <br />
                <span className="text-[#c7a15c] italic">build.</span>
              </h2>

              <p className="mt-4 sm:mt-6 max-w-md text-sm sm:text-lg leading-relaxed text-[var(--text-soft)]">
                Four cohesive disciplines work in continuous harmony to take your
                project seamlessly from blank ground to iconic completion.
              </p>
            </Reveal>

            <div>
              {services.map((service) => {
                const Icon = service.icon;

                return (
                  <div
                    key={service.number}
                    className="service-card group border-t border-[var(--line)] py-6 sm:py-9 transition-all duration-300 hover:px-2 sm:hover:px-4"
                  >
                    <div className="flex flex-col gap-3.5 sm:flex-row sm:items-start md:grid md:grid-cols-[56px_52px_1fr] md:items-start md:gap-6">
                      <div className="flex items-center justify-between sm:contents">
                        <span className="font-mono text-xs sm:text-sm font-semibold text-[#c7a15c]">
                          {service.number}
                        </span>

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--surface-2)] text-[var(--text)] transition-all duration-300 group-hover:border-[#c7a15c] group-hover:text-[#c7a15c] sm:h-12 sm:w-12">
                          <Icon size={20} strokeWidth={1.5} />
                        </div>
                      </div>

                      <div>
                        <h3 className="font-display text-xl sm:text-2xl md:text-3xl tracking-tight text-[var(--text)] transition-colors group-hover:text-[#c7a15c]">
                          {service.title}
                        </h3>

                        <p className="mt-2 sm:mt-3 max-w-xl text-xs sm:text-base leading-relaxed text-[var(--text-soft)]">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="border-t border-[var(--line)]" />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          05 — ENGINEERING & PRECISION SHOWCASE
      ====================================================== */}
      <section
        aria-label="Engineering Precision"
        onClick={() =>
          setLightboxImage({
            src: images.engineer,
            title: "Built With Structural Integrity",
            subtitle: "Architecture, Structure & Precision Engineering",
          })
        }
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setLightboxImage({
              src: images.engineer,
              title: "Built With Structural Integrity",
              subtitle: "Architecture, Structure & Precision Engineering",
            });
          }
        }}
        className="group relative min-h-[480px] sm:min-h-[580px] lg:min-h-[640px] cursor-pointer overflow-hidden border-y border-[var(--line)]"
      >
        <img
          src={images.engineer}
          alt="Architecture and structural engineering by Vardha Builders"
          loading="lazy"
          decoding="async"
          className="home-image absolute inset-0 h-full w-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-[#0b0c0c]/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0c]/95 via-[#0b0c0c]/40 to-transparent" />

        <div className="relative z-10 flex min-h-[480px] sm:min-h-[580px] lg:min-h-[640px] items-end px-5 pb-12 sm:px-12 sm:pb-20 lg:px-20">
          <div className="mx-auto w-full max-w-7xl">
            <Reveal className="max-w-2xl text-white">
              <span className="font-mono text-xs sm:text-[13px] font-semibold uppercase tracking-[0.25em] text-[#c7a15c]">
                05 / ENGINEERING & PRECISION
              </span>

              <h2 className="mt-4 sm:mt-5 font-display text-[clamp(2.1rem,4.5vw,4.5rem)] leading-[0.94] tracking-[-0.04em] text-scrim">
                Built with
                <br />
                <span className="italic text-[#dfbb78]">integrity.</span>
              </h2>

              <p className="mt-4 sm:mt-6 max-w-xl text-sm sm:text-lg leading-relaxed text-white/85 text-scrim">
                Behind every surface is structure. Behind every structure is
                rigorous engineering. We approach every phase with precision so that
                the result is solid, safe, and dependable for generations.
              </p>

              <div className="mt-6 sm:mt-8 flex items-center gap-3 font-mono text-[11px] sm:text-xs uppercase tracking-wider text-white/70">
                <span className="h-px w-6 sm:w-8 bg-[#c7a15c]" />
                <span>Click image to examine full architectural blueprint</span>
              </div>
            </Reveal>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="absolute right-8 top-8 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-md opacity-80 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110 group-hover:border-[#c7a15c]"
        >
          <Maximize2 size={16} />
        </div>
      </section>

      {/* =====================================================
          06 — INTERACTIVE 3D ARCHITECTURAL EXPERIENCE
          (Addresses Usability Issue #10 & Section 5.E)
      ====================================================== */}
      <section
        id="interactive-model"
        aria-label="Interactive 3D Architectural Experience"
        className="architecture-viewer-wrapper"
      >
        <div className="architecture-viewer relative text-white">
          {/* Ambient atmospheric backdrop */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(199,161,92,0.12),_transparent_65%)]" />

          {/* 3D Scene with Responsive Fallback */}
          <div className="absolute inset-0">
            <Suspense
              fallback={
                <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-[#0d0f0e] p-6 text-center">
                  <div className="h-12 w-12 rounded-full border-2 border-[#c7a15c] border-t-transparent animate-spin" />
                  <p className="font-mono text-xs uppercase tracking-widest text-[#c7a15c]">
                    Initializing 3D Architectural Model...
                  </p>
                </div>
              }
            >
              <ArchitecturalScene className="h-full w-full" showHud={false} />
            </Suspense>
          </div>

          {/* Informative Overlay HUD */}
          <div className="pointer-events-none relative z-10 flex h-full min-h-full flex-col justify-between p-3 sm:p-5 lg:p-12">
            {/* Top Header */}
            <div className="max-w-xl">
              {/* Interactive Architecture Label */}
              <div className="inline-flex items-center gap-1.5 sm:gap-3 rounded-full border border-white/20 bg-black/60 px-2.5 py-0.5 sm:px-4 sm:py-1.5 backdrop-blur-md">
                <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#c7a15c] animate-pulse" />
                <span className="font-mono text-[9px] sm:text-xs md:text-[13px] font-semibold uppercase tracking-[0.16em] sm:tracking-[0.22em] text-[#c7a15c]">
                  Interactive 3D Architecture
                </span>
              </div>

              <h2 className="mt-1 sm:mt-3 font-display text-lg xs:text-xl sm:text-3xl lg:text-[clamp(2.5rem,4.5vw,4.5rem)] leading-[0.95] tracking-[-0.03em] text-white text-scrim">
                Explore the{" "}
                <span className="italic text-[#dfbb78]">structure.</span>
              </h2>

              <p className="hidden md:block mt-2 sm:mt-3 text-xs sm:text-sm lg:text-base leading-relaxed text-white/80 text-scrim max-w-md">
                Orbit the building, discover key architectural zones, examine exterior
                proportions, and see how our structures come alive.
              </p>
            </div>

            {/* Bottom Controls Indicator */}
            <div className="flex items-end justify-between gap-2 sm:gap-4 w-full">
              <div className="rounded-lg sm:rounded-xl border border-white/15 bg-black/75 px-2.5 py-1.5 sm:p-4 backdrop-blur-md max-w-[220px] xs:max-w-xs sm:max-w-md">
                <p className="font-mono text-[9px] sm:text-xs uppercase tracking-wider text-[#c7a15c] font-semibold flex items-center gap-1.5">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#c7a15c]" />
                  Interactive Controls
                </p>
                <p className="mt-0.5 text-[10px] sm:text-xs text-white/80 leading-snug">
                  <span className="sm:hidden">Drag to rotate · Pinch to zoom</span>
                  <span className="hidden sm:inline">Drag to rotate · Scroll to zoom · Click hotspots to inspect</span>
                </p>
              </div>

              {/* Reset View Button: safe clearance on mobile to prevent overlapping floating WhatsApp button (bottom-6 right-6) */}
              <div className="pointer-events-auto pr-14 sm:pr-0">
                <button
                  type="button"
                  onClick={() => {
                    window.dispatchEvent(new Event("vardha-reset-camera"));
                  }}
                  aria-label="Reset 3D camera view"
                  className="btn-outline-white inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-1.5 rounded-lg border border-white/20 bg-black/70 px-3 py-2 sm:px-4 sm:py-2.5 text-[10px] sm:text-xs font-mono uppercase tracking-wider text-white backdrop-blur-md transition-all hover:border-[#c7a15c] hover:bg-white/10 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c7a15c]"
                >
                  <RotateCcw size={13} className="text-[#c7a15c]" />
                  <span className="hidden xs:inline">Reset View</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          07 — FEATURED PROJECTS SHOWCASE (REAL PROJECTS)
          (Addresses Prompt Section 5.F)
      ====================================================== */}
      <section
        id="projects"
        aria-label="Vardha Real Estate Developments"
        className="section-padding bg-[var(--bg)] transition-colors duration-500"
      >
        <div className="section-container">
          <div className="mb-10 sm:mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-[var(--line)] pb-8">
            <div>
              <span className="font-mono text-xs sm:text-[13px] font-semibold uppercase tracking-[0.25em] text-[#c7a15c]">
                07 / FEATURED DEVELOPMENTS
              </span>
              <h2 className="mt-3 sm:mt-4 font-display text-[clamp(2.1rem,4.5vw,4.5rem)] leading-[0.96] tracking-[-0.04em] text-[var(--text)]">
                Selected
                <br />
                <span className="text-[#c7a15c] italic">work.</span>
              </h2>
            </div>

            <div className="max-w-md">
              <p className="text-xs sm:text-base leading-relaxed text-[var(--text-soft)]">
                Explore our landmark residential flats, luxury private villas, and commercial retail suites across prime locations in Gorakhpur.
              </p>
              <div className="mt-3 sm:mt-4">
                <Link
                  to="/portfolio"
                  className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#c7a15c] hover:underline"
                >
                  View Full Portfolio ({projects.length} Projects) →
                </Link>
              </div>
            </div>
          </div>

          {/* Project Grid */}
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="project-card group flex flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] shadow-lg transition-all duration-500 hover:border-[#c7a15c]/60 hover:shadow-2xl"
              >
                {/* Image Stage */}
                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70" />

                  {/* Badges Container — Responsive flex-wrap to prevent collision */}
                  <div className="absolute inset-x-3.5 top-3.5 flex flex-wrap items-center justify-between gap-1.5 sm:inset-x-4 sm:top-4">
                    <span className="rounded-full border border-white/20 bg-black/60 px-2.5 py-1 sm:px-3 sm:py-1.5 font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                      {project.badge || project.status}
                    </span>
                    <span className="rounded-full border border-[#c7a15c]/40 bg-[#c7a15c]/20 px-2.5 py-0.5 sm:px-3 sm:py-1 font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#dfbb78] backdrop-blur-md">
                      {project.category}
                    </span>
                  </div>

                  {/* Location Tag */}
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-center gap-1.5 text-xs text-white/90 font-medium">
                    <MapPin size={13} className="text-[#c7a15c] shrink-0" />
                    <span className="truncate">{project.location}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-1 flex-col justify-between p-5 sm:p-7">
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl lg:text-[26px] font-semibold tracking-tight text-[var(--text)] group-hover:text-[#c7a15c] transition-colors">
                      {project.title}
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[var(--text-soft)] line-clamp-2">
                      {project.description}
                    </p>

                    {/* Specifications */}
                    <div className="mt-5 grid grid-cols-2 gap-3 border-y border-[var(--line)] py-3 text-xs">
                      <div>
                        <span className="text-[var(--text-muted)] font-mono uppercase text-[10px] tracking-wider block">
                          Configuration
                        </span>
                        <span className="font-medium text-[var(--text)] mt-0.5 block truncate">
                          {project.configuration}
                        </span>
                      </div>
                      <div>
                        <span className="text-[var(--text-muted)] font-mono uppercase text-[10px] tracking-wider block">
                          Carpet Area
                        </span>
                        <span className="font-medium text-[var(--text)] mt-0.5 block">
                          {project.area}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between pt-2">
                    <Link
                      to={`/portfolio`}
                      className="group/btn inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#c7a15c] hover:text-[#dfbb78]"
                    >
                      <span>Explore Project</span>
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-300 group-hover/btn:translate-x-1"
                      />
                    </Link>

                    <button
                      type="button"
                      onClick={() =>
                        setLightboxImage({
                          src: project.image,
                          title: project.title,
                          subtitle: `${project.configuration} · ${project.location}`,
                        })
                      }
                      aria-label={`View full image of ${project.title}`}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface-2)] text-[var(--text-soft)] hover:border-[#c7a15c] hover:text-[#c7a15c]"
                    >
                      <Maximize2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              to="/portfolio"
              className="btn-gold"
            >
              Discover All Vardha Projects
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          08 — VISION TO REALITY VISUAL STAGE
      ====================================================== */}
      <section
        aria-label="Vision To Reality"
        onClick={() =>
          setLightboxImage({
            src: images.crane,
            title: "Ideas Become Places",
            subtitle: "Planning, Engineering, Structure & Finishing",
          })
        }
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setLightboxImage({
              src: images.crane,
              title: "Ideas Become Places",
              subtitle: "Planning, Engineering, Structure & Finishing",
            });
          }
        }}
        className="group relative min-h-[480px] sm:min-h-[580px] lg:min-h-[640px] cursor-pointer overflow-hidden border-b border-[var(--line)]"
      >
        <img
          src={images.crane}
          alt="Architectural development and construction crane"
          loading="lazy"
          decoding="async"
          className="home-image absolute inset-0 h-full w-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        <div className="relative z-10 flex min-h-[480px] sm:min-h-[580px] lg:min-h-[640px] items-end px-5 pb-12 sm:px-12 sm:pb-20 lg:px-20">
          <div className="mx-auto w-full max-w-7xl">
            <Reveal className="max-w-2xl text-white">
              <span className="font-mono text-xs sm:text-[13px] font-semibold uppercase tracking-[0.25em] text-[#c7a15c]">
                08 / FROM VISION TO REALITY
              </span>

              <h2 className="mt-4 sm:mt-5 font-display text-[clamp(2.1rem,4.5vw,4.5rem)] leading-[0.92] tracking-[-0.04em] text-scrim">
                Ideas become
                <br />
                <span className="italic text-[#dfbb78]">places.</span>
              </h2>

              <p className="mt-4 sm:mt-6 max-w-xl text-sm sm:text-lg leading-relaxed text-white/85 text-scrim">
                Planning. Engineering. Structure. Construction. Finishing.
                Every phase is connected by one driving principle: creating a
                built environment that enriches life and stands the test of time.
              </p>
            </Reveal>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="absolute right-5 top-5 sm:right-8 sm:top-8 z-10 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-md opacity-80 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110 group-hover:border-[#c7a15c]"
        >
          <Maximize2 size={15} />
        </div>
      </section>

      {/* =====================================================
          09 — FINISHED SPACE / INTERIOR GALLERY
          (Addresses Usability Issues #11, #12, #14, #17)
      ====================================================== */}
      <section
        id="interior-gallery"
        aria-label="Finished Interior Architecture"
        className="section-padding bg-[var(--surface)] transition-colors duration-500"
      >
        <div className="section-container">
          <div className="grid items-center gap-10 sm:gap-14 lg:grid-cols-2 lg:gap-16">
            {/* Visual Stage & Interactive Controls */}
            <div className="relative">
              <div
                onClick={() =>
                  setLightboxImage({
                    src: interiorViews[activeInteriorIndex].image,
                    title: interiorViews[activeInteriorIndex].title,
                    subtitle: interiorViews[activeInteriorIndex].desc,
                  })
                }
                role="button"
                tabIndex={0}
                aria-label={`View full resolution ${interiorViews[activeInteriorIndex].title}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setLightboxImage({
                      src: interiorViews[activeInteriorIndex].image,
                      title: interiorViews[activeInteriorIndex].title,
                      subtitle: interiorViews[activeInteriorIndex].desc,
                    });
                  }
                }}
                className="group relative aspect-[4/3] min-h-[350px] sm:min-h-[420px] lg:min-h-0 cursor-pointer overflow-hidden rounded-2xl border border-[var(--line)] bg-black shadow-2xl transition-all duration-500 hover:border-[#c7a15c]"
              >
                <img
                  key={interiorViews[activeInteriorIndex].image}
                  src={interiorViews[activeInteriorIndex].image}
                  alt={interiorViews[activeInteriorIndex].title}
                  loading="lazy"
                  decoding="async"
                  className="home-image h-full w-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-85" />

                {/* Floating Tag Badge */}
                <div className="absolute left-4 top-4 sm:left-5 sm:top-5">
                  <span className="rounded-full border border-white/25 bg-black/60 px-3 py-1 sm:px-4 sm:py-1.5 font-mono text-[11px] sm:text-xs uppercase tracking-wider text-white backdrop-blur-md">
                    {interiorViews[activeInteriorIndex].tag}
                  </span>
                </div>

                {/* Expand Indicator */}
                <div
                  aria-hidden="true"
                  className="absolute right-4 top-4 sm:right-5 sm:top-5 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-md opacity-80 transition-all group-hover:opacity-100 group-hover:scale-110 group-hover:border-[#c7a15c]"
                >
                  <Maximize2 size={14} />
                </div>

                {/* Synchronized Caption */}
                <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6 text-white text-scrim">
                  <p className="font-mono text-xs sm:text-[13px] font-semibold uppercase tracking-[0.22em] text-[#c7a15c]">
                    Vardha Interior Experience
                  </p>
                  <h3 className="mt-1 font-display text-xl sm:text-2xl md:text-3xl font-semibold">
                    {interiorViews[activeInteriorIndex].title}
                  </h3>
                  <p className="mt-1.5 sm:mt-2 max-w-lg text-xs sm:text-base leading-relaxed text-white/80 line-clamp-2 sm:line-clamp-none">
                    {interiorViews[activeInteriorIndex].desc}
                  </p>
                </div>
              </div>

              {/* Interactive Tab Controls */}
              <div
                role="tablist"
                aria-label="Interior gallery views"
                className="mt-4 sm:mt-5 flex flex-wrap gap-2 sm:gap-2.5"
              >
                {interiorViews.map((item, idx) => (
                  <button
                    key={item.title}
                    type="button"
                    role="tab"
                    id={`gallery-tab-${idx}`}
                    aria-selected={activeInteriorIndex === idx}
                    aria-controls={`gallery-panel-${idx}`}
                    onClick={() => setActiveInteriorIndex(idx)}
                    className={`rounded-full px-3.5 py-2 sm:px-5 sm:py-2.5 font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.1em] sm:tracking-[0.14em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c7a15c] focus-visible:ring-offset-2 ${
                      activeInteriorIndex === idx
                        ? "bg-[#c7a15c] text-[#0b0c0c] shadow-[0_6px_20px_rgba(199,161,92,0.3)] font-bold scale-[1.02]"
                        : "border border-[var(--line)] bg-[var(--surface-2)] text-[var(--text-soft)] hover:border-[#c7a15c]/60 hover:text-[var(--text)] hover:scale-[1.01]"
                    }`}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Editorial Narrative & Standardized CTAs */}
            <Reveal>
              <span className="font-mono text-xs sm:text-[13px] font-semibold uppercase tracking-[0.25em] text-[#c7a15c]">
                09 / THE FINISHED SPACE
              </span>

              <h2 className="mt-4 sm:mt-6 font-display text-[clamp(2.1rem,4.5vw,4.5rem)] leading-[0.92] tracking-[-0.04em] text-[var(--text)]">
                Construction
                <br />
                becomes
                <br />
                <span className="text-[#c7a15c] italic">experience.</span>
              </h2>

              <p className="mt-5 sm:mt-7 text-sm sm:text-lg leading-relaxed text-[var(--text-soft)]">
                The ultimate test of any structure is how naturally and joyfully
                people inhabit it. High ceilings, expansive natural light, curated
                materials, and sound insulation come together to create homes that
                feel complete.
              </p>

              <div className="mt-6 sm:mt-8 grid grid-cols-2 gap-4 sm:gap-6 border-t border-[var(--line)] pt-5 sm:pt-6">
                <div>
                  <div className="font-display text-xl sm:text-2xl md:text-3xl font-medium text-[var(--text)]">
                    Structure
                  </div>
                  <p className="mt-1 text-xs sm:text-sm text-[var(--text-muted)] font-mono">
                    Engineered to endure
                  </p>
                </div>

                <div>
                  <div className="font-display text-xl sm:text-2xl md:text-3xl font-medium text-[var(--text)]">
                    Craft
                  </div>
                  <p className="mt-1 text-xs sm:text-sm text-[var(--text-muted)] font-mono">
                    Artisanal finishing
                  </p>
                </div>
              </div>

              {/* Standardized Primary & Secondary Action Group */}
              <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
                <Link
                  to="/about"
                  className="btn-gold text-xs sm:text-sm tracking-wider"
                >
                  Discover Our Philosophy
                  <ArrowRight size={15} />
                </Link>

                <button
                  type="button"
                  onClick={() =>
                    setLightboxImage({
                      src: interiorViews[activeInteriorIndex].image,
                      title: interiorViews[activeInteriorIndex].title,
                      subtitle: interiorViews[activeInteriorIndex].desc,
                    })
                  }
                  className="btn-outline-gold text-xs sm:text-sm"
                  aria-label={`View full resolution image of ${interiorViews[activeInteriorIndex].title}`}
                >
                  <Maximize2 size={14} />
                  <span>View Full Resolution</span>
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =====================================================
          10 — ARCHITECTURAL DETAIL
      ====================================================== */}
      <section
        aria-label="Architectural Craft & Detail"
        className="section-padding bg-[var(--bg-soft)] transition-colors duration-500"
      >
        <div className="section-container">
          <div className="grid gap-8 sm:gap-10 lg:grid-cols-[0.85fr_1.15fr] items-center">
            <Reveal>
              <span className="font-mono text-xs sm:text-[13px] font-semibold uppercase tracking-[0.25em] text-[#c7a15c]">
                10 / THE DETAILS MATTER
              </span>

              <h2 className="mt-4 sm:mt-6 font-display text-[clamp(2.1rem,4.5vw,4.5rem)] leading-[0.94] tracking-[-0.04em] text-[var(--text)]">
                Quality lives
                <br />
                <span className="text-[#c7a15c] italic">in the details.</span>
              </h2>

              <p className="mt-4 sm:mt-6 text-sm sm:text-lg leading-relaxed text-[var(--text-soft)]">
                From structural joint design to tactile material selection and
                seamless shadowlines, our obsession with precision transforms a
                simple building into a lasting work of art.
              </p>

              <div className="mt-6 sm:mt-8 flex items-center gap-3 sm:gap-4">
                <span className="h-px w-10 sm:w-12 bg-[#c7a15c]" />
                <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#c7a15c]">
                  Precision / Material / Craft
                </span>
              </div>
            </Reveal>

            <div
              onClick={() =>
                setLightboxImage({
                  src: images.detail,
                  title: "Built With Intention",
                  subtitle: "Architectural Interior Detail & Material Craftsmanship",
                })
              }
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setLightboxImage({
                    src: images.detail,
                    title: "Built With Intention",
                    subtitle: "Architectural Interior Detail & Material Craftsmanship",
                  });
                }
              }}
              className="group relative min-h-[420px] sm:min-h-[500px] lg:min-h-[580px] cursor-pointer overflow-hidden rounded-2xl border border-[var(--line)] shadow-xl transition-all duration-500 hover:border-[#c7a15c]"
            >
              <img
                src={images.detail}
                alt="Architectural interior detail by Vardha Builders"
                loading="lazy"
                decoding="async"
                className="home-image absolute inset-0 h-full w-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 text-white text-scrim">
                <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#c7a15c]">
                  VARDHA / DETAIL
                </span>
                <div className="mt-2 font-display text-xl sm:text-2xl md:text-3xl font-semibold">
                  Built with intention.
                </div>
              </div>

              <div
                aria-hidden="true"
                className="absolute right-5 top-5 sm:right-6 sm:top-6 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-md opacity-80 transition-all group-hover:opacity-100 group-hover:scale-110 group-hover:border-[#c7a15c]"
              >
                <Maximize2 size={15} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          11 — CONSTRUCTION PROCESS (COHERENT TIMELINE)
          (Addresses Usability Issue #15: Checkmark & Label Alignment)
      ====================================================== */}
      <section
        id="process"
        aria-label="Our Construction Process"
        className="section-padding bg-[var(--surface)] transition-colors duration-500"
      >
        <div className="section-container">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
            <Reveal>
              <span className="font-mono text-xs sm:text-[13px] font-semibold uppercase tracking-[0.25em] text-[#c7a15c]">
                11 / OUR PROCESS
              </span>

              <h2 className="mt-4 sm:mt-6 font-display text-[clamp(2.1rem,4.5vw,4.5rem)] leading-[0.94] tracking-[-0.04em] text-[var(--text)]">
                From vision
                <br />
                <span className="text-[#c7a15c] italic">
                  to reality.
                </span>
              </h2>

              <p className="mt-4 sm:mt-6 max-w-md text-sm sm:text-lg leading-relaxed text-[var(--text-soft)]">
                A connected, transparent construction lifecycle guarantees that every
                stage is clear, strictly coordinated, and focused on exceptional quality.
              </p>
            </Reveal>

            {/* Redesigned Process Timeline */}
            <div className="space-y-3.5 sm:space-y-4">
              {processSteps.map((step) => (
                <div
                  key={step.step}
                  className="process-step-card group relative overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface-2)] p-5 sm:p-6 transition-all duration-300 hover:border-[#c7a15c]/60 hover:shadow-lg"
                >
                  <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-[#c7a15c]/15 text-[#c7a15c] border border-[#c7a15c]/30">
                        <Check size={16} strokeWidth={2.2} />
                      </div>

                      <div className="flex items-baseline gap-2.5 sm:gap-3">
                        <span className="font-mono text-xs font-semibold text-[#c7a15c]">
                          {step.step}
                        </span>
                        <h3 className="font-display text-lg sm:text-xl md:text-2xl font-semibold text-[var(--text)] group-hover:text-[#c7a15c] transition-colors">
                          {step.title}
                        </h3>
                      </div>
                    </div>

                    <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[var(--text-muted)] sm:text-right">
                      Stage Verified
                    </span>
                  </div>

                  <p className="mt-3 pl-0 sm:pl-14 text-xs sm:text-base leading-relaxed text-[var(--text-soft)]">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          12 — NUMBERS AT A GLANCE
      ====================================================== */}
      <section
        aria-label="Vardha Achievements At A Glance"
        className="section-padding bg-[var(--bg-soft)] transition-colors duration-500"
      >
        <div className="section-container">
          <div className="mb-10 sm:mb-12 text-center">
            <span className="font-mono text-xs sm:text-[13px] font-semibold uppercase tracking-[0.25em] text-[#c7a15c]">
              12 / AT A GLANCE
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3.5 sm:gap-6 lg:grid-cols-4">
            {[
              ["2014", "Established in Gorakhpur"],
              ["10+", "Years of Vision"],
              ["25+", "Completed & Active Projects"],
              ["1000+", "Satisfied Resident Families"],
            ].map(([number, label]) => (
              <div
                key={label}
                className="stat-item flex flex-col items-center justify-center rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 sm:p-8 text-center transition-all duration-300 hover:border-[#c7a15c]/50 hover:shadow-xl"
              >
                <div className="font-display text-[clamp(2rem,4.2vw,4.2rem)] font-semibold tracking-[-0.04em] text-[var(--text)]">
                  {number}
                </div>

                <p className="mt-1.5 sm:mt-2 text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.12em] sm:tracking-[0.16em] text-[var(--text-soft)] font-medium">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          13 — FINAL HIGH-CONVERSION CTA
          (Addresses Prompt Section 5.I)
      ====================================================== */}
      <section
        aria-label="Start Your Real Estate Journey"
        className="relative overflow-hidden bg-[#0b0c0c] px-5 py-20 text-white sm:px-12 sm:py-32 lg:px-20 lg:py-36"
      >
        <div className="absolute inset-0 opacity-20">
          <img
            src={images.detail}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/70" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-10 sm:mb-12 h-px w-full bg-white/15" />

          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#c7a15c]" />
                <span className="font-mono text-xs sm:text-[13px] font-semibold uppercase tracking-[0.25em] text-[#c7a15c]">
                  Vardha Builders
                </span>
              </div>

              <h2 className="mt-4 sm:mt-6 max-w-4xl font-display text-[clamp(2.2rem,5vw,5.5rem)] font-medium leading-[0.92] tracking-[-0.04em] text-white">
                Let's build
                <br />
                <span className="italic text-[#dfbb78]">
                  something lasting.
                </span>
              </h2>

              <p className="mt-4 sm:mt-6 max-w-xl text-sm sm:text-lg leading-relaxed text-white/80">
                Whether you're looking for your dream residence flat, an independent
                luxury villa, or premium commercial space in Gorakhpur, our team is
                ready to guide your journey.
              </p>
            </Reveal>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                to="/contact"
                className="btn-gold text-xs sm:text-sm tracking-wider"
              >
                <span>Start a Project</span>
                <ArrowUpRight size={17} strokeWidth={1.8} />
              </Link>

              <a
                href="https://wa.me/919999999999?text=Hello%20Vardha%20Builders%2C%20I%20would%20like%20to%20inquire%20about%20your%20projects."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-white text-xs sm:text-sm tracking-wider"
              >
                <MessageCircle size={17} />
                <span>Direct WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          IN-PAGE FULL-SCREEN ACCESSIBLE LIGHTBOX
      ====================================================== */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl sm:p-8"
          onClick={() => setLightboxImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label={lightboxImage.title}
        >
          <div
            className="relative flex max-h-[95vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/20 bg-[#0d0e0f] text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              aria-label="Close image viewer"
              className="absolute right-4 top-4 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/70 text-white transition hover:bg-[#c7a15c] hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c7a15c]"
            >
              <X size={20} />
            </button>

            {/* Stage */}
            <div className="relative flex max-h-[75vh] min-h-[300px] items-center justify-center overflow-hidden bg-black p-2">
              <img
                src={lightboxImage.src}
                alt={lightboxImage.title}
                className="max-h-[72vh] w-auto max-w-full rounded-lg object-contain"
              />
            </div>

            {/* Caption Bar */}
            <div className="flex flex-col justify-between gap-2 border-t border-white/10 bg-[#121415] px-6 py-4 sm:flex-row sm:items-center">
              <div>
                <h4 className="font-display text-xl font-semibold text-white">
                  {lightboxImage.title}
                </h4>
                {lightboxImage.subtitle && (
                  <p className="mt-0.5 text-xs sm:text-sm text-white/70">
                    {lightboxImage.subtitle}
                  </p>
                )}
              </div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#c7a15c]">
                Vardha Builders · Architectural Showcase
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}