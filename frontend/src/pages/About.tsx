import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import {
  ArrowDown,
  ArrowRight,
  Building2,
  Compass,
  Layers3,
  Ruler,
  Sparkles,
} from "lucide-react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ========================================================
   VARDHA — ARCHITECTURAL / CONSTRUCTION VISUALS
   ========================================================= */

const images = {
  // Dramatic architectural exterior / building visualization
  hero:
    "/images/About/About1.webp",

  // Architectural / structural perspective
  architecture:
    "/images/About/About2.webp",

  // Premium finished interior / architectural visualization feel
  interior:
    "/images/About/About3.webp",

  // Construction / large-scale development
  construction:
    "/images/About/About4.webp",
};

const principles = [
  {
    number: "01",
    icon: Compass,
    title: "Purposeful Design",
    text: "Every space begins with a clear understanding of how people move, live and experience architecture.",
  },
  {
    number: "02",
    icon: Layers3,
    title: "Built With Precision",
    text: "From structural decisions to the smallest finishing detail, we focus on consistency, proportion and execution.",
  },
  {
    number: "03",
    icon: Ruler,
    title: "Human Scale",
    text: "We design environments that feel comfortable, functional and connected to the people who use them.",
  },
  {
    number: "04",
    icon: Sparkles,
    title: "Future Focused",
    text: "Our approach combines timeless architectural principles with modern technology and evolving lifestyles.",
  },
];

export default function About() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      

      gsap.fromTo(
        ".about-reveal",
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.12,
          ease: "power3.out",
        }
      );

      /* ---------------------------------------------
         IMAGE SCALE / 3D VISUAL FEEL
      --------------------------------------------- */

      gsap.utils.toArray<HTMLElement>(".about-image").forEach((image) => {
        gsap.fromTo(
          image,
          {
            scale: 1.15,
          },
          {
            scale: 1,
            duration: 1.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: image,
              start: "top 85%",
              once: true,
            },
          }
        );
      });

      /* ---------------------------------------------
         HORIZONTAL LINES
      --------------------------------------------- */

      gsap.utils.toArray<HTMLElement>(".about-line").forEach((line) => {
        gsap.fromTo(
          line,
          {
            scaleX: 0,
            transformOrigin: "left center",
          },
          {
            scaleX: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: line,
              start: "top 90%",
              once: true,
            },
          }
        );
      });

      /* ---------------------------------------------
         SECTION TITLES
      --------------------------------------------- */

      gsap.utils
        .toArray<HTMLElement>(".about-section-title")
        .forEach((title) => {
          gsap.fromTo(
            title,
            {
              y: 45,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: title,
                start: "top 82%",
                once: true,
              },
            }
          );
        });

      /* ---------------------------------------------
         PRINCIPLES
      --------------------------------------------- */

      gsap.utils
        .toArray<HTMLElement>(".principle-item")
        .forEach((item, index) => {
          gsap.fromTo(
            item,
            {
              y: 35,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
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

      /* ---------------------------------------------
         NUMBERS
      --------------------------------------------- */

      gsap.utils
        .toArray<HTMLElement>(".about-number")
        .forEach((item, index) => {
          gsap.fromTo(
            item,
            {
              y: 40,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: index * 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 88%",
                once: true,
              },
            }
          );
        });
    }, pageRef);

    const refreshTimer = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    return () => {
      window.clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  return (
    <main
      ref={pageRef}
      className="bg-[var(--bg)] text-[var(--text)] transition-colors duration-500"
    >
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative min-h-screen overflow-hidden">
        <img
          src={images.hero}
          alt="Premium architectural building visualization"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Dark cinematic overlay */}
        <div className="absolute inset-0 bg-black/45" />

        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/20 to-black/80" />

        {/* Architectural grid */}
        <div className="absolute inset-0 opacity-25 arch-grid" />

        <div className="relative z-10 flex min-h-screen flex-col justify-between px-6 pb-10 pt-32 md:px-12 lg:px-20">
          <div className="about-reveal flex items-center gap-4 text-[9px] uppercase tracking-[0.35em] text-white/70">
            <span className="h-px w-12 bg-[#c9a66b]" />

            About Vardha Builders
          </div>

          <div className="max-w-6xl">
            <p className="about-reveal mb-6 text-[9px] uppercase tracking-[0.35em] text-[#d2b477] md:text-[10px]">
              Building Dreams Since 2014
            </p>

            <h1 className="about-reveal font-display text-[clamp(3.2rem,6.5vw,6.8rem)] font-medium leading-[0.82] tracking-[-0.065em] text-white">
              We Build
              <br />

              <span className="ml-[5vw] italic text-white/80">
                More.
              </span>
            </h1>

            <div className="about-reveal mt-8 flex max-w-xl items-start gap-4 text-[12px] leading-6 text-white/70 md:mt-10 md:text-[13px] lg:text-[14px] lg:leading-7">
              <span className="mt-3 h-px w-12 shrink-0 bg-[#c9a66b] md:w-16" />

              <p>
                Vardha Builders is built around a simple idea — architecture
                should do more than occupy land. It should create places,
                experiences and lasting value.
              </p>
            </div>
          </div>

          <div className="about-reveal flex items-end justify-between text-white">
            <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/50">
              01 / 06
            </div>

            <div className="flex flex-col items-center gap-3">
              <span className="text-[8px] uppercase tracking-[0.3em] text-white/60">
                Scroll to explore
              </span>

              <ArrowDown
                size={15}
                strokeWidth={1}
                className="animate-bounce"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          INTRO / STORY
      ===================================================== */}

      <section className="px-6 py-24 md:px-12 md:py-32 lg:px-20 lg:py-36">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-10 flex items-center justify-between">
            <span className="font-mono text-[9px] tracking-[0.3em] text-[var(--text-muted)]">
              02 / OUR STORY
            </span>

            <Building2
              size={18}
              strokeWidth={1}
              className="text-[#b08a4a]"
            />
          </div>

          <div className="about-line mb-14 h-px w-full bg-[var(--line)]" />

          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.4fr] lg:gap-16">
            <div>
              <p className="text-[9px] uppercase tracking-[0.3em] text-[#b08a4a] md:text-[10px]">
                The Vardha Approach
              </p>
            </div>

            <div className="about-section-title">
              <h2 className="font-display text-[clamp(2.2rem,4.5vw,5rem)] leading-[1.05] tracking-[-0.035em]">
                Architecture that feels
                <span className="text-[var(--text-muted)]">
                  {" "}
                  considered.
                </span>
              </h2>

              <p className="mt-8 max-w-3xl text-[13px] leading-7 text-[var(--text-soft)] md:text-[14px] md:leading-8">
                We believe meaningful development begins long before
                construction. It starts with understanding the site, the
                surroundings, the people and the way a space will be lived in.
              </p>

              <p className="mt-5 max-w-3xl text-[13px] leading-7 text-[var(--text-soft)] md:text-[14px] md:leading-8">
                Our work brings together architecture, planning, materials,
                technology and execution to create environments that are
                visually distinctive while remaining practical for everyday
                life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          ARCHITECTURE VISUAL
      ===================================================== */}

      <section className="px-6 pb-24 md:px-12 md:pb-32 lg:px-20 lg:pb-36">
        <div className="mx-auto grid max-w-[1500px] gap-5 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="group relative min-h-[480px] overflow-hidden md:min-h-[650px]">
            <img
              src={images.architecture}
              alt="Contemporary architectural structure"
              className="about-image absolute inset-0 h-full w-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

            <div className="absolute bottom-7 left-7 text-white md:bottom-10 md:left-10">
              <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/60 md:text-[9px]">
                Architecture / 01
              </p>

              <h3 className="mt-3 font-display text-[clamp(1.8rem,3vw,3.2rem)] leading-[1]">
                Form follows
                <br />
                experience.
              </h3>
            </div>
          </div>

          <div className="flex min-h-[480px] flex-col justify-between bg-[var(--surface)] p-7 md:min-h-[650px] md:p-10 lg:p-12">
            <div>
              <span className="font-mono text-[9px] tracking-[0.3em] text-[var(--text-muted)]">
                VARDHA / PHILOSOPHY
              </span>

              <div className="mt-7 h-px bg-[var(--line)]" />
            </div>

            <div>
              <p className="font-display text-[clamp(1.9rem,3.2vw,3.4rem)] leading-[1.05]">
                "Good architecture is not simply seen.
                <span className="text-[#b08a4a]">
                  {" "}
                  It is experienced."
                </span>
              </p>

              <div className="mt-8 flex items-center gap-4">
                <span className="h-px w-10 bg-[#b08a4a]" />

                <span className="text-[9px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  Vardha Builders
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PRINCIPLES
      ===================================================== */}

      <section className="bg-[var(--bg-soft)] px-6 py-24 md:px-12 md:py-32 lg:px-20 lg:py-36">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-12 lg:grid-cols-[0.65fr_1.35fr] lg:gap-14">
            <div>
              <span className="font-mono text-[9px] tracking-[0.3em] text-[var(--text-muted)]">
                03 / PRINCIPLES
              </span>

              <h2 className="about-section-title mt-7 font-display text-[clamp(2.4rem,4vw,4.5rem)] leading-[0.95] tracking-[-0.04em]">
                How
                <br />
                we think.
              </h2>
            </div>

            <div>
              {principles.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.number}
                    className="principle-item group border-t border-[var(--line)] py-8 transition-all duration-500 hover:px-3"
                  >
                    <div className="grid gap-5 md:grid-cols-[60px_1fr_2fr] md:items-start">
                      <span className="font-mono text-[10px] text-[#b08a4a]">
                        {item.number}
                      </span>

                      <Icon
                        size={22}
                        strokeWidth={1}
                        className="text-[var(--text)] transition-colors duration-300 group-hover:text-[#b08a4a]"
                      />

                      <div>
                        <h3 className="text-lg font-medium md:text-xl">
                          {item.title}
                        </h3>

                        <p className="mt-3 max-w-xl text-[12px] leading-6 text-[var(--text-soft)] md:text-[13px] md:leading-7">
                          {item.text}
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
          NUMBERS
      ===================================================== */}

      <section className="px-6 py-24 md:px-12 md:py-32 lg:px-20 lg:py-36">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-14">
            <span className="font-mono text-[9px] tracking-[0.3em] text-[var(--text-muted)]">
              04 / AT A GLANCE
            </span>
          </div>

          <div className="grid border-t border-[var(--line)] sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["2014", "Since"],
              ["10+", "Years of Vision"],
              ["100%", "Attention to Detail"],
              ["∞", "Possibilities"],
            ].map(([number, label]) => (
              <div
                key={label}
                className="about-number border-b border-[var(--line)] p-7 sm:border-r lg:border-b-0"
              >
                <div className="font-display text-[clamp(2.8rem,5vw,4.8rem)] tracking-[-0.04em]">
                  {number}
                </div>

                <p className="mt-4 text-[9px] uppercase tracking-[0.25em] text-[var(--text-muted)]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          CONSTRUCTION / VISION TO REALITY
      ===================================================== */}

      <section className="relative min-h-[650px] overflow-hidden md:min-h-[700px]">
        <img
          src={images.construction}
          alt="Architectural construction and development"
          className="about-image absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 flex min-h-[650px] items-center px-6 md:min-h-[700px] md:px-12 lg:px-20">
          <div className="mx-auto w-full max-w-[1500px]">
            <div className="about-section-title max-w-3xl text-white">
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#d2b477]">
                05 / FROM VISION TO REALITY
              </span>

              <h2 className="mt-7 font-display text-[clamp(2.5rem,5vw,5.5rem)] leading-[0.92] tracking-[-0.04em]">
                Ideas become
                <br />

                <span className="italic text-white/70">
                  places.
                </span>
              </h2>

              <p className="mt-8 max-w-xl text-[12px] leading-6 text-white/65 md:text-[13px] md:leading-7">
                Planning. Design. Engineering. Construction. Finishing.
                Every stage is connected by one objective — creating a built
                environment that lasts.
              </p>

              <Link
                to="/projects"
                className="mt-9 inline-flex items-center gap-4 border-b border-white/40 pb-3 text-[9px] uppercase tracking-[0.2em] transition-colors hover:border-[#d2b477] hover:text-[#d2b477]"
              >
                Explore Our Projects

                <ArrowRight
                  size={15}
                  strokeWidth={1.5}
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          LIFESTYLE / INTERIOR
      ===================================================== */}

      <section className="px-6 py-24 md:px-12 md:py-32 lg:px-20 lg:py-36">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={images.interior}
                  alt="Premium architectural interior"
                  className="about-image h-full w-full object-cover"
                />
              </div>

              <div className="absolute -bottom-7 -right-4 hidden bg-[var(--surface)] p-6 shadow-2xl md:block lg:-right-7">
                <div className="font-mono text-[8px] uppercase tracking-[0.25em] text-[var(--text-muted)]">
                  Detail
                </div>

                <div className="mt-2 font-display text-2xl md:text-3xl">
                  01 / 04
                </div>
              </div>
            </div>

            <div className="about-section-title">
              <span className="font-mono text-[9px] tracking-[0.3em] text-[var(--text-muted)]">
                06 / THE EXPERIENCE
              </span>

              <h2 className="mt-7 font-display text-[clamp(2.5rem,4.8vw,5.2rem)] leading-[0.94] tracking-[-0.04em]">
                Spaces
                <br />
                designed for
                <br />

                <span className="text-[#b08a4a]">
                  life.
                </span>
              </h2>

              <p className="mt-8 max-w-xl text-[13px] leading-7 text-[var(--text-soft)] md:text-[14px] md:leading-8">
                The final measure of architecture is not the drawing or the
                render. It is how naturally people inhabit the finished space.
              </p>

              <div className="mt-9 grid grid-cols-2 gap-6 border-t border-[var(--line)] pt-6">
                <div>
                  <div className="font-display text-2xl md:text-3xl">
                    Light
                  </div>

                  <p className="mt-2 text-[10px] text-[var(--text-muted)]">
                    Natural environments
                  </p>
                </div>

                <div>
                  <div className="font-display text-2xl md:text-3xl">
                    Space
                  </div>

                  <p className="mt-2 text-[10px] text-[var(--text-muted)]">
                    Thoughtful planning
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="bg-[#0b0c0c] px-6 py-28 text-white md:px-12 md:py-36 lg:px-20">
        <div className="mx-auto max-w-[1500px]">
          <div className="flex flex-col justify-between gap-14 lg:flex-row lg:items-end">
            <div>
              <span className="font-mono text-[9px] tracking-[0.3em] text-[#d2b477]">
                VARDHA BUILDERS
              </span>

              <h2 className="mt-7 max-w-5xl font-display text-[clamp(3rem,6.2vw,6.8rem)] leading-[0.9] tracking-[-0.055em]">
                Let’s build
                <br />

                <span className="italic text-white/55">
                  something lasting.
                </span>
              </h2>
            </div>

            <Link
              to="/contact"
              className="group inline-flex w-fit items-center gap-5 border-b border-white/30 pb-4 text-[9px] uppercase tracking-[0.25em] transition-colors hover:border-[#d2b477] hover:text-[#d2b477]"
            >
              Start a Conversation

              <ArrowRight
                size={17}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:translate-x-2"
              />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}