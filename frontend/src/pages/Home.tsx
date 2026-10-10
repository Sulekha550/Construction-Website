import { useEffect, useRef, useState, type ReactNode } from "react";
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
  MoveRight,
  Ruler,
  Sparkles,
  X,
} from "lucide-react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   VARDHA IMAGE SYSTEM
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
   FINISHED INTERIOR VIEWS (SECTION 09)
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
      "Every project begins with careful planning, site understanding and architectural thinking that creates a strong foundation for everything that follows.",
  },
  {
    number: "02",
    icon: Layers3,
    title: "Construction",
    description:
      "From structure and materials to engineering and execution, every stage is managed with precision, consistency and attention to detail.",
  },
  {
    number: "03",
    icon: Ruler,
    title: "Engineering & Execution",
    description:
      "Our construction process brings design, engineering and on-site execution together to create durable and carefully finished environments.",
  },
  {
    number: "04",
    icon: Sparkles,
    title: "Finishing & Experience",
    description:
      "The final layer of a project is where material, light, proportion and detail come together to create spaces people can truly experience.",
  },
];

/* =========================================================
   CONSTRUCTION PROCESS
========================================================= */

const process = [
  "Site & Planning",
  "Architecture",
  "Structural Engineering",
  "Construction",
  "Finishing",
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

  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      /* SECTION REVEALS */

      gsap.utils
        .toArray<HTMLElement>(".home-reveal")
        .forEach((element) => {
          gsap.fromTo(
            element,
            {
              y: 40,
              opacity: 0,
            },
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

      /* HERO TEXT */

      gsap.fromTo(
        ".hero-reveal",
        {
          y: 45,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.1,
          ease: "power3.out",
        }
      );

      /* HERO IMAGE */

      gsap.fromTo(
        ".hero-image",
        {
          scale: 1.1,
        },
        {
          scale: 1,
          duration: 2,
          ease: "power3.out",
        }
      );

      /* HERO PARALLAX */

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

      /* IMAGE REVEALS */

      gsap.utils
        .toArray<HTMLElement>(".home-image")
        .forEach((image) => {
          gsap.fromTo(
            image,
            {
              scale: 1.08,
            },
            {
              scale: 1,
              duration: 1.5,
              ease: "power3.out",
              scrollTrigger: {
                trigger: image,
                start: "top 88%",
                once: true,
              },
            }
          );
        });

      /* ARCHITECTURAL LINES */

      gsap.utils
        .toArray<HTMLElement>(".home-line")
        .forEach((line) => {
          gsap.fromTo(
            line,
            {
              scaleX: 0,
              transformOrigin: "left center",
            },
            {
              scaleX: 1,
              duration: 1,
              ease: "power3.inOut",
              scrollTrigger: {
                trigger: line,
                start: "top 90%",
                once: true,
              },
            }
          );
        });

      /* SERVICE CARDS */

      gsap.utils
        .toArray<HTMLElement>(".service-card")
        .forEach((card, index) => {
          gsap.fromTo(
            card,
            {
              y: 30,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: index * 0.1,
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

      gsap.utils
        .toArray<HTMLElement>(".project-card")
        .forEach((card, index) => {
          gsap.fromTo(
            card,
            {
              y: 35,
              opacity: 0,
            },
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

      gsap.utils
        .toArray<HTMLElement>(".process-item")
        .forEach((item, index) => {
          gsap.fromTo(
            item,
            {
              x: -25,
              opacity: 0,
            },
            {
              x: 0,
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

      gsap.utils
        .toArray<HTMLElement>(".stat-item")
        .forEach((stat, index) => {
          gsap.fromTo(
            stat,
            {
              y: 25,
              opacity: 0,
            },
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
    <main
      ref={pageRef}
      className="bg-[var(--bg)] text-[var(--text)] transition-colors duration-500"
    >
      {/* =====================================================
          01 — HERO
      ====================================================== */}

      <section
        id="hero"
        className="hero-section relative min-h-screen overflow-hidden"
      >
        <img
          src={images.hero}
          alt="Modern architectural construction"
          fetchPriority="high"
          decoding="async"
          className="hero-image absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-[#05080d]/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#05080d]/90 via-[#05080d]/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05080d]/90 via-transparent to-[#05080d]/15" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/45 to-transparent" />
        <div className="arch-grid absolute inset-0 opacity-[0.07]" />

        <div className="relative z-10 flex min-h-screen items-center px-6 pb-20 pt-[100px] md:px-12 lg:px-20">
          <div className="mx-auto w-full max-w-[1600px]">
            <div className="max-w-[720px]">
              <div className="hero-reveal mb-6 flex items-center gap-3">
                <span className="h-px w-10 bg-[#d2a155]" />
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#d2a155]">
                  Architecture · Engineering · Construction
                </span>
              </div>

              <p className="hero-reveal mb-5 text-[9px] uppercase tracking-[0.35em] text-white/55 md:text-[10px]">
                Building dreams since 2014
              </p>

              <h1 className="hero-reveal font-display text-[clamp(3.2rem,6.5vw,6.5rem)] font-medium leading-[0.88] tracking-[-0.06em] text-white">
                We Build
                <br />
                <span className="italic text-[#d2a155]">More.</span>
              </h1>

              <div className="hero-reveal mt-8 flex max-w-[580px] items-start gap-4">
                <span className="mt-3 h-px w-10 shrink-0 bg-[#c7944a] md:w-14" />
                <p className="text-[13px] leading-7 text-white/65 md:text-[14px] md:leading-8">
                  Vardha Builders brings architecture, engineering and
                  construction together to create places designed for
                  people and built to last.
                </p>
              </div>

              <div className="hero-reveal mt-9 flex flex-wrap items-center gap-3">
                <Link
                  to="/portfolio"
                  className="group flex items-center gap-4 bg-[#c7944a] px-6 py-3.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#d2a155]"
                >
                  Explore Projects
                  <ArrowRight
                    size={15}
                    strokeWidth={1.5}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  to="/about"
                  className="flex items-center gap-3 border border-white/25 bg-white/5 px-5 py-3.5 text-[9px] font-medium uppercase tracking-[0.18em] text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
                >
                  Discover Vardha
                  <ArrowUpRight size={14} strokeWidth={1.4} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-7 left-0 right-0 z-10 px-6 md:px-12 lg:px-20">
          <div className="mx-auto flex max-w-[1600px] items-end justify-between">
            <div className="hidden items-center gap-3 text-[8px] uppercase tracking-[0.28em] text-white/40 sm:flex">
              <span className="h-px w-10 bg-[#d2a155]" />
              Gorakhpur · Uttar Pradesh
            </div>

            <a
              href="#intro"
              className="group ml-auto flex flex-col items-center gap-2 text-white/60"
            >
              <span className="text-[8px] uppercase tracking-[0.28em]">
                Scroll to explore
              </span>
              <ArrowDown
                size={14}
                strokeWidth={1}
                className="transition-transform duration-300 group-hover:translate-y-1"
              />
            </a>
          </div>
        </div>
      </section>

      {/* =====================================================
          02 — INTRODUCTION
      ====================================================== */}

      <section
        id="intro"
        className="bg-[#f5f6f7] px-6 py-20 transition-colors duration-500 dark:bg-[#111312] md:px-12 md:py-28 lg:px-20"
      >
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-10 flex items-center justify-between">
            <span className="font-mono text-[9px] tracking-[0.3em] text-[#7b8490] dark:text-[#8e8b83]">
              02 / THE VARDHA APPROACH
            </span>
            <Building2 size={18} strokeWidth={1} className="text-[#b08a4a]" />
          </div>

          <div className="home-line mb-14 h-px w-full bg-[#dfe4e8] dark:bg-white/10" />

          <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
            <Reveal>
              <p className="text-[9px] uppercase tracking-[0.3em] text-[#b08a4a]">
                Architecture · Engineering · Construction
              </p>
            </Reveal>

            <Reveal>
              <h2 className="font-display text-[clamp(2.4rem,4.2vw,4.5rem)] leading-[0.98] tracking-[-0.045em] text-[#172033] dark:text-[#f4f0e7]">
                From ground
                <br />
                <span className="text-[#9ba3ac] dark:text-[#7a7872]">
                  to vision.
                </span>
              </h2>

              <p className="mt-7 max-w-3xl text-[13px] leading-7 text-[#626b77] dark:text-[#a8a59d] md:text-[14px] md:leading-8">
                Construction is more than putting materials together. It is
                a process of planning, engineering, craftsmanship and
                careful execution.
              </p>

              <p className="mt-5 max-w-3xl text-[13px] leading-7 text-[#626b77] dark:text-[#a8a59d] md:text-[14px] md:leading-8">
                At Vardha Builders, every project moves from an idea through
                architecture, structure and construction to create spaces
                that are practical, distinctive and built for the future.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =====================================================
          03 — CONSTRUCTION FEATURE
      ====================================================== */}

      <section className="bg-[#f5f6f7] px-6 pb-24 transition-colors duration-500 dark:bg-[#111312] md:px-12 md:pb-32 lg:px-20">
        <div className="mx-auto grid max-w-[1500px] gap-5 lg:grid-cols-[1.35fr_0.65fr]">
          <div
            onClick={() =>
              setLightboxImage({
                src: images.site,
                title: "Built From The Ground Up",
                subtitle: "Modern Construction Site & Structural Execution",
              })
            }
            className="group relative min-h-[500px] cursor-pointer overflow-hidden rounded-2xl md:min-h-[650px]"
          >
            <img
              src={images.site}
              alt="Modern construction site"
              loading="lazy"
              decoding="async"
              className="home-image absolute inset-0 h-full w-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

            <div className="absolute bottom-8 left-8 text-white md:bottom-10 md:left-10">
              <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/60">
                Construction / 01
              </p>
              <h3 className="mt-3 font-display text-[clamp(1.8rem,2.8vw,3rem)] leading-[0.95]">
                Built from
                <br />
                the ground up.
              </h3>
            </div>

            <div className="absolute right-6 top-6 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md opacity-0 transition-opacity group-hover:opacity-100">
              <Maximize2 size={14} />
            </div>
          </div>

          <div className="flex min-h-[500px] flex-col justify-between rounded-2xl border border-[var(--line)] bg-white p-8 transition-colors duration-500 dark:bg-[#181a19] md:min-h-[650px] md:p-11 lg:p-12">
            <div>
              <span className="font-mono text-[9px] tracking-[0.3em] text-[#7b8490] dark:text-[#8e8b83]">
                VARDHA / CONSTRUCTION
              </span>
              <div className="mt-7 h-px bg-[#e0e4e8] dark:bg-white/10" />
            </div>

            <div>
              <p className="font-display text-[clamp(1.7rem,2.8vw,2.8rem)] leading-[1.05] text-[#172033] dark:text-[#f4f0e7]">
                Strong structures.
                <span className="text-[#b08a4a]"> Thoughtful spaces.</span>
              </p>

              <div className="mt-8 flex items-center gap-4">
                <span className="h-px w-10 bg-[#b08a4a]" />
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#7b8490] dark:text-[#8e8b83]">
                  Vardha Builders
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          04 — WHAT WE DO
      ====================================================== */}

      <section className="bg-white px-6 py-24 transition-colors duration-500 dark:bg-[#161817] md:px-12 md:py-32 lg:px-20">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-12 lg:grid-cols-[0.65fr_1.35fr] lg:gap-14">
            <Reveal>
              <span className="font-mono text-[9px] tracking-[0.3em] text-[#7b8490] dark:text-[#8e8b83]">
                04 / WHAT WE DO
              </span>

              <h2 className="mt-7 font-display text-[clamp(2.4rem,4.2vw,4.5rem)] leading-[0.92] tracking-[-0.045em] text-[#172033] dark:text-[#f4f0e7]">
                How we
                <br />
                <span className="text-[#9ba3ac] dark:text-[#7a7872]">build.</span>
              </h2>
            </Reveal>

            <div>
              {services.map((service) => {
                const Icon = service.icon;

                return (
                  <div
                    key={service.number}
                    className="service-card group border-t border-[#dfe4e8] py-8 transition-all duration-500 hover:px-3 dark:border-white/10"
                  >
                    <div className="grid gap-5 md:grid-cols-[60px_55px_1fr] md:items-start">
                      <span className="font-mono text-[10px] text-[#b08a4a]">
                        {service.number}
                      </span>

                      <Icon
                        size={22}
                        strokeWidth={1}
                        className="text-[#172033] transition-colors duration-300 group-hover:text-[#b08a4a] dark:text-[#f4f0e7]"
                      />

                      <div>
                        <h3 className="font-display text-[20px] tracking-[-0.03em] text-[#172033] transition-colors group-hover:text-[#b08a4a] dark:text-[#f4f0e7] md:text-[21px]">
                          {service.title}
                        </h3>

                        <p className="mt-3 max-w-xl text-[12px] leading-6 text-[#707985] dark:text-[#a8a59d] md:text-[13px] md:leading-7">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="border-t border-[#dfe4e8] dark:border-white/10" />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          05 — ENGINEERING
      ====================================================== */}

      <section
        onClick={() =>
          setLightboxImage({
            src: images.engineer,
            title: "Built With Structural Integrity",
            subtitle: "Architecture, Structure & Precision Engineering",
          })
        }
        className="group relative min-h-[650px] cursor-pointer overflow-hidden"
      >
        <img
          src={images.engineer}
          alt="Architecture and engineering"
          loading="lazy"
          decoding="async"
          className="home-image absolute inset-0 h-full w-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-[#071122]/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071122]/90 via-[#071122]/20 to-transparent" />

        <div className="relative z-10 flex min-h-[650px] items-end px-6 pb-16 md:px-12 md:pb-20 lg:px-20">
          <div className="mx-auto w-full max-w-[1500px]">
            <Reveal className="max-w-[680px] text-white">
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#d2b477]">
                05 / ENGINEERING & PRECISION
              </span>

              <h2 className="mt-7 font-display text-[clamp(2.4rem,4.2vw,4.5rem)] leading-[0.92] tracking-[-0.045em]">
                Built with
                <br />
                <span className="italic text-white/60">integrity.</span>
              </h2>

              <p className="mt-7 max-w-xl text-[13px] leading-7 text-white/65 md:text-[14px] md:leading-8">
                Behind every surface is structure. Behind every structure is
                engineering. We approach every phase with precision so that
                the result is solid, safe and dependable.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="absolute right-8 top-8 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md opacity-0 transition-opacity group-hover:opacity-100">
          <Maximize2 size={15} />
        </div>
      </section>



      {/* =====================================================
          07 — ARCHITECTURAL EXPERIENCE
      ====================================================== */}

      <section className="relative min-h-[720px] overflow-hidden bg-[#080f1c]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(199,148,74,0.15),_transparent_55%)]" />

        <div className="absolute inset-0">
          <div className="absolute left-[15%] top-[20%] h-[300px] w-[300px] rotate-45 border border-white/10" />
          <div className="absolute bottom-[15%] right-[15%] h-[250px] w-[250px] border border-[#c7944a]/20" />
        </div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#071122]/95 via-[#071122]/65 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071122]/80 via-transparent to-transparent" />

        <div className="relative z-10 flex min-h-[720px] items-center px-6 py-24 md:px-12 lg:px-20">
          <div className="mx-auto w-full max-w-[1500px]">
            <Reveal className="max-w-[650px] text-white">
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#d2b477]">
                07 / ARCHITECTURAL EXPERIENCE
              </span>

              <h2 className="mt-7 font-display text-[clamp(2.4rem,4.2vw,4.5rem)] leading-[0.88] tracking-[-0.045em]">
                See the
                <br />
                <span className="italic text-white/55">structure.</span>
              </h2>

              <p className="mt-8 max-w-xl text-[13px] leading-7 text-white/60 md:text-[14px] md:leading-8">
                Explore architectural form, structure, volume and proportion
                through an interactive architectural experience.
              </p>

              <div className="mt-9 flex items-center gap-4">
                <span className="h-px w-12 bg-[#c7944a]" />
                <span className="text-[8px] uppercase tracking-[0.25em] text-white/45">
                  Interactive architecture
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =====================================================
          08 — VISION TO REALITY
      ====================================================== */}

      <section
        onClick={() =>
          setLightboxImage({
            src: images.crane,
            title: "Ideas Become Places",
            subtitle: "Planning, Engineering, Structure & Finishing",
          })
        }
        className="group relative min-h-[650px] cursor-pointer overflow-hidden"
      >
        <img
          src={images.crane}
          alt="Architectural development"
          loading="lazy"
          decoding="async"
          className="home-image absolute inset-0 h-full w-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

        <div className="relative z-10 flex min-h-[650px] items-end px-6 pb-16 md:px-12 md:pb-20 lg:px-20">
          <div className="mx-auto w-full max-w-[1500px]">
            <Reveal className="max-w-[680px] text-white">
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#d2b477]">
                08 / FROM VISION TO REALITY
              </span>

              <h2 className="mt-7 font-display text-[clamp(2.4rem,4.2vw,4.5rem)] leading-[0.9] tracking-[-0.045em]">
                Ideas become
                <br />
                <span className="italic text-white/60">places.</span>
              </h2>

              <p className="mt-7 max-w-xl text-[13px] leading-7 text-white/65 md:text-[14px] md:leading-8">
                Planning. Engineering. Structure. Construction. Finishing.
                Every stage is connected by one objective: creating a built
                environment that lasts.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="absolute right-8 top-8 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md opacity-0 transition-opacity group-hover:opacity-100">
          <Maximize2 size={15} />
        </div>
      </section>

      {/* =====================================================
          09 — THE FINISHED SPACE (CLICK OPENS IN-PAGE LIGHTBOX)
      ====================================================== */}

      <section className="bg-white px-6 py-24 transition-colors duration-500 dark:bg-[#161817] md:px-12 md:py-32 lg:px-20">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
            {/* LEFT: LUXURY ARCHITECTURAL VISUAL STAGE */}
            <div className="relative">
              <div
                onClick={() =>
                  setLightboxImage({
                    src: interiorViews[activeInteriorIndex].image,
                    title: interiorViews[activeInteriorIndex].title,
                    subtitle: interiorViews[activeInteriorIndex].desc,
                  })
                }
                className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-2xl border border-[var(--line)] bg-black shadow-2xl transition-all duration-700 hover:border-[#c7944a]"
              >
                <img
                  key={interiorViews[activeInteriorIndex].image}
                  src={interiorViews[activeInteriorIndex].image}
                  alt={interiorViews[activeInteriorIndex].title}
                  loading="lazy"
                  decoding="async"
                  className="home-image h-full w-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-75" />

                {/* TOP LEFT FLOATING STATUS BADGE */}
                <div className="absolute left-5 top-5">
                  <span className="rounded-full border border-white/25 bg-black/40 px-3.5 py-1.5 font-mono text-[8px] uppercase tracking-[0.22em] text-white backdrop-blur-md">
                    {interiorViews[activeInteriorIndex].tag}
                  </span>
                </div>

                {/* TOP RIGHT EXPAND ICON */}
                <div className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md opacity-0 transition-opacity group-hover:opacity-100">
                  <Maximize2 size={14} />
                </div>

                {/* BOTTOM CAPTION */}
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <p className="font-mono text-[8px] uppercase tracking-[0.25em] text-[#d2a155]">
                    Vardha Interior Experience
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-semibold">
                    {interiorViews[activeInteriorIndex].title}
                  </h3>
                  <p className="mt-1.5 max-w-md text-xs leading-5 text-white/70">
                    {interiorViews[activeInteriorIndex].desc}
                  </p>
                </div>
              </div>

              {/* INTERACTIVE MULTI-VIEW SELECTOR BUTTONS */}
              <div className="mt-4 flex flex-wrap gap-2">
                {interiorViews.map((item, idx) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setActiveInteriorIndex(idx)}
                    className={`rounded-full px-4 py-2 font-mono text-[8px] uppercase tracking-wider transition-all ${
                      activeInteriorIndex === idx
                        ? "bg-[#c7944a] text-black font-bold shadow-md"
                        : "border border-[var(--line)] bg-[var(--surface-2)] text-[var(--text-soft)] hover:border-[#c7944a]"
                    }`}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT: EDITORIAL PHILOSOPHY & STATS */}
            <Reveal>
              <span className="font-mono text-[9px] tracking-[0.3em] text-[#7b8490] dark:text-[#8e8b83]">
                09 / THE FINISHED SPACE
              </span>

              <h2 className="mt-6 font-display text-[clamp(2.4rem,4.2vw,4.5rem)] leading-[0.9] tracking-[-0.045em] text-[#172033] dark:text-[#f4f0e7]">
                Construction
                <br />
                becomes
                <br />
                <span className="text-[#b08a4a]">experience.</span>
              </h2>

              <p className="mt-7 max-w-xl text-[13px] leading-7 text-[#68727d] dark:text-[#a8a59d] md:text-[14px] md:leading-8">
                The final measure of construction is how naturally people
                inhabit the space. Materials, light, proportion and planning
                come together to create environments that feel complete.
              </p>

              <div className="mt-9 grid grid-cols-2 gap-6 border-t border-[#e0e4e8] pt-6 dark:border-white/10">
                <div>
                  <div className="font-display text-xl text-[#172033] dark:text-[#f4f0e7] md:text-2xl">
                    Structure
                  </div>
                  <p className="mt-2 text-[10px] text-[#7b8490] dark:text-[#8e8b83]">
                    Built to last
                  </p>
                </div>

                <div>
                  <div className="font-display text-xl text-[#172033] dark:text-[#f4f0e7] md:text-2xl">
                    Detail
                  </div>
                  <p className="mt-2 text-[10px] text-[#7b8490] dark:text-[#8e8b83]">
                    Carefully finished
                  </p>
                </div>
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  to="/about"
                  className="group inline-flex items-center gap-3 rounded-full bg-[var(--dark)] px-6 py-3 font-mono text-[9px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#c7944a] hover:text-black dark:bg-white dark:text-black dark:hover:bg-[#c7944a]"
                >
                  Discover our philosophy
                  <ArrowRight
                    size={14}
                    strokeWidth={1.3}
                    className="transition-transform group-hover:translate-x-1"
                  />
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
                  className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-[#b08a4a] hover:underline"
                >
                  View Full Resolution
                  <Maximize2 size={13} />
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =====================================================
          10 — CONSTRUCTION DETAIL
      ====================================================== */}

      <section className="bg-[#f5f6f7] px-6 py-24 transition-colors duration-500 dark:bg-[#111312] md:px-12 md:py-32 lg:px-20">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal className="flex flex-col justify-center">
              <span className="font-mono text-[9px] tracking-[0.3em] text-[#7b8490] dark:text-[#8e8b83]">
                10 / THE DETAILS MATTER
              </span>

              <h2 className="mt-7 font-display text-[clamp(2.4rem,4.2vw,4.5rem)] leading-[0.9] tracking-[-0.045em] text-[#172033] dark:text-[#f4f0e7]">
                Quality lives
                <br />
                <span className="text-[#b08a4a]">in the details.</span>
              </h2>

              <p className="mt-7 max-w-xl text-[13px] leading-7 text-[#68727d] dark:text-[#a8a59d] md:text-[14px] md:leading-8">
                From structural decisions to material selection and
                finishing, the smallest details shape the quality,
                character and longevity of a building.
              </p>

              <div className="mt-9 flex items-center gap-4">
                <span className="h-px w-12 bg-[#b08a4a]" />
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#7b8490] dark:text-[#8e8b83]">
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
              className="group relative min-h-[500px] cursor-pointer overflow-hidden rounded-2xl border border-[var(--line)] md:min-h-[620px]"
            >
              <img
                src={images.detail}
                alt="Architectural interior detail"
                loading="lazy"
                decoding="async"
                className="home-image absolute inset-0 h-full w-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              <div className="absolute bottom-7 left-7 text-white md:bottom-10 md:left-10">
                <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/60">
                  VARDHA / DETAIL
                </span>
                <div className="mt-3 font-display text-2xl md:text-3xl">
                  Built with intention.
                </div>
              </div>

              <div className="absolute right-6 top-6 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md opacity-0 transition-opacity group-hover:opacity-100">
                <Maximize2 size={14} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          11 — PROCESS
      ====================================================== */}

      <section className="bg-[#f5f6f7] px-6 py-24 transition-colors duration-500 dark:bg-[#111312] md:px-12 md:py-32 lg:px-20">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <Reveal>
              <span className="font-mono text-[9px] tracking-[0.3em] text-[#7b8490] dark:text-[#8e8b83]">
                11 / OUR PROCESS
              </span>

              <h2 className="mt-7 font-display text-[clamp(2.4rem,4.2vw,4.5rem)] leading-[0.9] tracking-[-0.045em] text-[#172033] dark:text-[#f4f0e7]">
                From vision
                <br />
                <span className="text-[#9aa3ad] dark:text-[#7a7872]">
                  to reality.
                </span>
              </h2>

              <p className="mt-7 max-w-md text-[13px] leading-7 text-[#68727d] dark:text-[#a8a59d]">
                A connected construction process keeps every stage clear,
                coordinated and focused on quality.
              </p>
            </Reveal>

            <div>
              {process.map((step, index) => (
                <div
                  key={step}
                  className="process-item group flex items-center justify-between border-t border-[#dfe4e8] py-7 transition-all duration-300 hover:px-3 dark:border-white/10"
                >
                  <div className="flex items-center gap-6">
                    <span className="font-mono text-[9px] text-[#c7944a]">
                      0{index + 1}
                    </span>

                    <span className="font-display text-xl text-[#172033] transition-colors group-hover:text-[#c7944a] dark:text-[#f4f0e7] md:text-2xl">
                      {step}
                    </span>
                  </div>

                  <Check
                    size={17}
                    strokeWidth={1.3}
                    className="text-[#b3bbc3] transition-colors group-hover:text-[#c7944a] dark:text-[#6c6962]"
                  />
                </div>
              ))}

              <div className="border-t border-[#dfe4e8] dark:border-white/10" />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          12 — NUMBERS
      ====================================================== */}

      <section className="bg-white px-6 py-24 transition-colors duration-500 dark:bg-[#161817] md:px-12 md:py-32 lg:px-20">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-12 text-center">
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#7b8490] dark:text-[#8e8b83]">
              12 / AT A GLANCE
            </span>
          </div>

          <div className="home-line mx-auto h-px w-full bg-[#dfe4e8] dark:bg-white/10" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["2014", "Established"],
              ["10+", "Years of Vision"],
              ["25+", "Projects"],
              ["1000+", "Families"],
            ].map(([number, label], index) => (
              <div
                key={label}
                className={`stat-item flex flex-col items-center justify-center border-b border-[#dfe4e8] p-8 text-center transition-colors dark:border-white/10 sm:border-r ${
                  index === 3 ? "lg:border-r-0" : ""
                } lg:border-b-0`}
              >
                <div className="font-display text-[clamp(2.5rem,4.2vw,4.2rem)] font-semibold tracking-[-0.045em] text-[#172033] dark:text-[#f4f0e7]">
                  {number}
                </div>

                <p className="mt-3 text-[9px] uppercase tracking-[0.25em] text-[#7b8490] dark:text-[#8e8b83]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          13 — FINAL CTA
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#0b0c0c] px-6 py-28 text-white md:px-12 md:py-36 lg:px-20">
        <div className="absolute inset-0 opacity-25">
          <img
            src={images.detail}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-black/80" />

        <div className="relative z-10 mx-auto max-w-[1500px]">
          <div className="home-line mb-14 h-px w-full bg-white/15" />

          <div className="flex flex-col justify-between gap-14 lg:flex-row lg:items-end">
            <Reveal>
              <span className="font-mono text-[9px] tracking-[0.3em] text-[#d2b477]">
                VARDHA BUILDERS
              </span>

              <h2 className="mt-7 max-w-5xl font-display text-[clamp(2.6rem,4.8vw,5.2rem)] leading-[0.88] tracking-[-0.05em]">
                Let's build
                <br />
                <span className="italic text-white/55">
                  something lasting.
                </span>
              </h2>
            </Reveal>

            <Link
              to="/contact"
              className="group flex h-14 w-fit items-center gap-5 rounded-full bg-[#c7944a] px-8 text-[9px] uppercase tracking-[0.25em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#d2a155]"
            >
              Start a Project
              <ArrowUpRight
                size={17}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          FULL-SCREEN IN-PAGE IMAGE LIGHTBOX
          (User stays on the Home page, NO navigation to any other page)
      ====================================================== */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl sm:p-8"
          onClick={() => setLightboxImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          <div
            className="relative flex max-h-[95vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/20 bg-[#0d0e0f] text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE BUTTON */}
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              aria-label="Close image viewer"
              className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/60 text-white transition hover:bg-[#c7944a] hover:text-black"
            >
              <X size={18} />
            </button>

            {/* FULL RESOLUTION IMAGE STAGE */}
            <div className="relative flex max-h-[75vh] min-h-[300px] items-center justify-center overflow-hidden bg-black p-2">
              <img
                src={lightboxImage.src}
                alt={lightboxImage.title}
                className="max-h-[72vh] w-auto max-w-full rounded-lg object-contain"
              />
            </div>

            {/* CAPTION BAR */}
            <div className="flex flex-col justify-between gap-2 border-t border-white/10 bg-[#121415] px-6 py-4 sm:flex-row sm:items-center">
              <div>
                <h4 className="font-display text-xl font-semibold text-white">
                  {lightboxImage.title}
                </h4>
                {lightboxImage.subtitle && (
                  <p className="mt-0.5 text-xs text-white/60">
                    {lightboxImage.subtitle}
                  </p>
                )}
              </div>
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#c7944a]">
                Vardha Builders · Architectural Showcase
              </span>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}