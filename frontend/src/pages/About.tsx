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
   ======================================================== */

const images = {
  hero: "/images/About/About1.webp",
  architecture: "/images/About/About2.webp",
  interior: "/images/Gallery/Gallery2.webp",
  construction: "/images/About/About4.webp",
};

const principles = [
  {
    number: "01",
    icon: Compass,
    title: "Purposeful Design",
    text: "Every space begins with a clear understanding of how people move, live, and experience architecture.",
  },
  {
    number: "02",
    icon: Layers3,
    title: "Built With Precision",
    text: "From structural decisions to the smallest finishing detail, we focus on consistency, proportion, and execution.",
  },
  {
    number: "03",
    icon: Ruler,
    title: "Human Scale",
    text: "We design environments that feel comfortable, functional, and deeply connected to the people who use them.",
  },
  {
    number: "04",
    icon: Sparkles,
    title: "Future Focused",
    text: "Our approach combines timeless architectural principles with modern engineering and evolving lifestyles.",
  },
];

export default function About() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pageRef.current) return;

    // Respect users who request reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-reveal",
        {
          y: 45,
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

      /* IMAGE SCALE ANIMATIONS */
      gsap.utils.toArray<HTMLElement>(".about-image").forEach((image) => {
        gsap.fromTo(
          image,
          {
            scale: 1.12,
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

      /* HORIZONTAL LINES */
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

      /* SECTION TITLES */
      gsap.utils
        .toArray<HTMLElement>(".about-section-title")
        .forEach((title) => {
          gsap.fromTo(
            title,
            {
              y: 40,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: title,
                start: "top 88%",
                once: true,
              },
            }
          );
        });

      /* PRINCIPLE ITEMS */
      gsap.utils
        .toArray<HTMLElement>(".principle-item")
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

      /* NUMBERS */
      gsap.utils
        .toArray<HTMLElement>(".about-number")
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
    <div
      ref={pageRef}
      className="bg-[var(--bg)] text-[var(--text)] transition-colors duration-500"
    >
      {/* =====================================================
          01 — HERO (Always Dark Image Stage with Guaranteed Contrast)
          (Addresses Issue 1, 2, 12)
      ===================================================== */}
      <section
        aria-label="About Vardha Builders Hero"
        className="relative min-h-screen overflow-hidden flex flex-col justify-between"
      >
        {/* Background hero image */}
        <img
          src={images.hero}
          alt="Premium architectural building visualization by Vardha Builders"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Dark cinematic overlays */}
        <div className="absolute inset-0 bg-[#0b0c0c]/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0c0c]/70 via-black/35 to-[#0b0c0c]" />
        <div className="arch-grid absolute inset-0 opacity-[0.06]" />

        {/* Hero container */}
        <div className="relative z-10 mx-auto flex flex-1 w-full max-w-7xl flex-col justify-center px-6 pt-28 pb-12 sm:px-10 lg:px-12 lg:pt-36">
          <div className="about-reveal flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-[#c7a15c]" />
            <span className="font-mono text-xs sm:text-[13px] font-semibold uppercase tracking-[0.22em] text-[#c7a15c]">
              About Vardha Builders
            </span>
          </div>

          <div className="w-full max-w-4xl">
            <p className="about-reveal mb-4 font-mono text-xs uppercase tracking-[0.2em] text-white/70 sm:text-sm">
              Building Dreams Since 2014 · Gorakhpur, UP
            </p>

            <h1 className="about-reveal font-display text-[clamp(3.2rem,6.5vw,6.5rem)] font-medium leading-[0.9] tracking-[-0.05em] text-white">
              We Build
              <br />
              <span className="italic text-[#c7a15c]">
                More.
              </span>
            </h1>

            <div className="about-reveal mt-7 flex max-w-2xl items-start gap-4">
              <span className="mt-3.5 h-px w-10 shrink-0 bg-[#c7a15c]" />
              <p className="text-base sm:text-lg md:text-xl font-normal leading-relaxed text-white/85">
                Vardha Builders is built around a simple idea — architecture
                should do more than occupy land. It should create places,
                experiences, and lasting value for generations.
              </p>
            </div>
          </div>
        </div>

        {/* Hero Bottom Bar & Centered Scroll Indicator (Issue 12: Repositioned to Center) */}
        <div className="relative z-10 w-full px-6 pb-8 sm:px-10 lg:px-12">
          <div className="mx-auto flex max-w-7xl items-end justify-between">
            {/* Left Corporate Tag */}
            <div className="hidden sm:flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-white/70">
              <span className="h-px w-6 bg-[#c7a15c]" />
              <span>01 / 06 · Corporate Identity</span>
            </div>

            {/* Centered Scroll Indicator (Issue 12: Bottom-Center Positioning) */}
            <div className="mx-auto sm:mx-0 sm:absolute sm:left-1/2 sm:-translate-x-1/2">
              <a
                href="#story"
                aria-label="Scroll down to Our Story section"
                className="group flex flex-col items-center gap-2 rounded-full border border-white/20 bg-black/40 px-5 py-2.5 backdrop-blur-md transition-all duration-300 hover:border-[#c7a15c] hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c7a15c]"
              >
                <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-white/80 group-hover:text-[#c7a15c]">
                  Scroll to explore
                </span>
                <ArrowDown
                  size={15}
                  strokeWidth={2}
                  className="text-[#c7a15c] transition-transform duration-300 group-hover:translate-y-1 motion-safe:animate-bounce"
                  aria-hidden="true"
                />
              </a>
            </div>

            {/* Right Location Tag */}
            <div className="hidden lg:flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#c7a15c]">
              <span>Gorakhpur · Uttar Pradesh</span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          02 — OUR STORY (Adapts to Light / Dark Themes)
          (Addresses Issue 1, 2)
      ===================================================== */}
      <section
        id="story"
        aria-label="Our Story"
        className="section-padding bg-[var(--bg)] transition-colors duration-500"
      >
        <div className="section-container">
          <div className="mb-8 flex items-center justify-between border-b border-[var(--line)] pb-5">
            <span className="font-mono text-xs sm:text-[13px] font-semibold uppercase tracking-[0.25em] text-[#c7a15c]">
              02 / OUR STORY
            </span>

            <Building2
              size={20}
              strokeWidth={1.5}
              className="text-[#c7a15c]"
            />
          </div>

          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 items-start">
            <div>
              <span className="eyebrow-accent mb-4">
                The Vardha Approach
              </span>
              <p className="font-display text-2xl sm:text-3xl font-light italic text-[var(--text-soft)]">
                Creating environments that balance striking architecture with everyday functionality.
              </p>
            </div>

            <div className="about-section-title">
              <h2 className="font-display text-[clamp(2.4rem,4.5vw,4.5rem)] leading-[0.96] tracking-[-0.04em] text-[var(--text)]">
                Architecture that feels
                <span className="italic text-[#c7a15c]"> considered.</span>
              </h2>

              <p className="mt-7 text-base sm:text-lg leading-relaxed text-[var(--text-soft)]">
                We believe meaningful development begins long before construction.
                It starts with understanding the site, the surroundings, the
                community, and the way every single space will be experienced by
                families and visitors.
              </p>

              <p className="mt-5 text-base sm:text-lg leading-relaxed text-[var(--text-soft)]">
                Our work brings together architecture, structural engineering,
                premium materials, modern technology, and precise on-site execution
                to create environments that are visually distinctive while remaining
                practical and comfortable for everyday life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          03 — ARCHITECTURE VISUAL (Card Surface + Image Stage)
          (Addresses Issue 4: Restrained Editorial Label)
      ===================================================== */}
      <section
        aria-label="Architecture Philosophy"
        className="pb-24 sm:pb-28 bg-[var(--bg)] transition-colors duration-500"
      >
        <div className="section-container">
          <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
            {/* Visual Stage */}
            <div className="group relative min-h-[480px] sm:min-h-[580px] overflow-hidden rounded-2xl border border-[var(--line)] shadow-xl">
              <img
                src={images.architecture}
                alt="Contemporary architectural structure by Vardha Builders"
                loading="lazy"
                decoding="async"
                className="about-image absolute inset-0 h-full w-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-[#0b0c0c]/40" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0c]/90 via-[#0b0c0c]/30 to-transparent" />

              <div className="absolute bottom-8 left-8 right-8 text-white sm:bottom-10 sm:left-10 text-scrim">
                {/* Architecture Label (Issue 4: Restrained uppercase & tracking) */}
                <span className="inline-block font-mono text-xs sm:text-[13px] font-semibold tracking-wider text-white/85 bg-black/40 px-3 py-1 rounded-md border border-white/15 backdrop-blur-sm">
                  Architecture / 01
                </span>

                <h3 className="mt-4 font-display text-[clamp(2rem,3.4vw,3.4rem)] font-medium leading-[1] text-white">
                  Form follows
                  <br />
                  <span className="italic text-[#dfbb78]">experience.</span>
                </h3>
              </div>
            </div>

            {/* Philosophy Card */}
            <div className="flex min-h-[480px] sm:min-h-[580px] flex-col justify-between rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-8 sm:p-12 shadow-xl transition-colors duration-500">
              <div>
                <span className="font-mono text-xs sm:text-[13px] font-semibold uppercase tracking-[0.25em] text-[#c7a15c]">
                  Vardha / Philosophy
                </span>

                <div className="mt-6 h-px w-full bg-[var(--line)]" />
              </div>

              <div className="py-8">
                <p className="font-display text-[clamp(1.8rem,3vw,3.2rem)] font-light leading-[1.08] text-[var(--text)]">
                  &ldquo;Good architecture is not simply seen.
                  <span className="italic text-[#c7a15c] font-normal">
                    {" "}It is experienced.&rdquo;
                  </span>
                </p>

                <div className="mt-8 flex items-center gap-3">
                  <span className="h-px w-8 bg-[#c7a15c]" />
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                    Vardha Builders Principle
                  </span>
                </div>
              </div>

              <div>
                <Link
                  to="/portfolio"
                  className="btn-outline-gold w-full text-center"
                >
                  Explore Our Work
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          04 — PRINCIPLES (Adaptive Background & Accessible Contrast)
          (Addresses Issue 1, 2)
      ===================================================== */}
      <section
        aria-label="Core Engineering Principles"
        className="section-padding border-y border-[var(--line)] bg-[var(--surface)] transition-colors duration-500"
      >
        <div className="section-container">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <span className="font-mono text-xs sm:text-[13px] font-semibold uppercase tracking-[0.25em] text-[#c7a15c]">
                03 / PRINCIPLES
              </span>

              <h2 className="about-section-title mt-6 font-display text-[clamp(2.4rem,4.5vw,4.5rem)] leading-[0.94] tracking-[-0.04em] text-[var(--text)]">
                How
                <br />
                <span className="italic text-[#c7a15c]">we think.</span>
              </h2>

              <p className="mt-6 max-w-sm text-base leading-relaxed text-[var(--text-soft)]">
                Core engineering and architectural values that govern every
                development from initial site analysis to final handover.
              </p>
            </div>

            <div>
              {principles.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.number}
                    className="principle-item group border-t border-[var(--line)] py-8 transition-all duration-300 hover:px-3"
                  >
                    <div className="grid gap-6 md:grid-cols-[56px_1fr_2fr] md:items-start">
                      <span className="font-mono text-sm font-semibold text-[#c7a15c]">
                        {item.number}
                      </span>

                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--surface-2)] text-[#c7a15c] transition-all group-hover:border-[#c7a15c]">
                          <Icon size={20} strokeWidth={1.5} />
                        </div>
                        <h3 className="font-display text-xl sm:text-2xl font-semibold text-[var(--text)]">
                          {item.title}
                        </h3>
                      </div>

                      <div>
                        <p className="text-sm sm:text-base leading-relaxed text-[var(--text-soft)]">
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
          05 — NUMBERS / AT A GLANCE (Fully Adaptive Contrast)
          (Addresses Issue 1, 2)
      ===================================================== */}
      <section
        aria-label="At a Glance Metrics"
        className="section-padding bg-[var(--bg-soft)] transition-colors duration-500"
      >
        <div className="section-container">
          <div className="mb-12 text-center">
            <span className="font-mono text-xs sm:text-[13px] font-semibold uppercase tracking-[0.25em] text-[#c7a15c]">
              04 / AT A GLANCE
            </span>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["2014", "Established in Gorakhpur"],
              ["10+", "Years of Vision"],
              ["25+", "Landmark Projects"],
              ["1000+", "Satisfied Resident Families"],
            ].map(([number, label]) => (
              <div
                key={label}
                className="about-number flex flex-col items-center justify-center rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-8 text-center transition-all duration-300 hover:border-[#c7a15c]/50 hover:shadow-xl"
              >
                <div className="font-display text-[clamp(2.5rem,4.2vw,4.2rem)] font-semibold tracking-[-0.04em] text-[var(--text)]">
                  {number}
                </div>

                <p className="mt-2 text-xs sm:text-sm uppercase tracking-[0.16em] text-[var(--text-soft)] font-medium">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          06 — CONSTRUCTION / VISION TO REALITY (Dark Cinematic Overlay)
          (Addresses Issue 1, 2, 8)
      ===================================================== */}
      <section
        aria-label="Vision To Reality"
        className="relative min-h-[580px] overflow-hidden md:min-h-[640px] border-y border-[var(--line)]"
      >
        <img
          src={images.construction}
          alt="Architectural construction and development execution"
          loading="lazy"
          decoding="async"
          className="about-image absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-[#0b0c0c]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0c0c]/90 via-[#0b0c0c]/40 to-[#0b0c0c]/20" />

        <div className="relative z-10 flex min-h-[580px] items-center px-6 py-16 sm:px-10 md:min-h-[640px] lg:px-16">
          <div className="mx-auto w-full max-w-7xl">
            <div className="about-section-title max-w-2xl rounded-2xl border border-white/10 bg-[#0b0c0c]/40 p-6 sm:p-10 text-white backdrop-blur-md">
              <div className="flex items-center gap-3 font-mono text-xs sm:text-[13px] font-semibold uppercase tracking-[0.22em] text-[#c7a15c]">
                <span className="h-px w-8 bg-[#c7a15c]" />
                <span>05 / FROM VISION TO REALITY</span>
              </div>

              <h2 className="mt-6 font-display text-[clamp(2.4rem,4.5vw,4.5rem)] font-medium leading-[0.92] tracking-[-0.04em] text-white">
                Ideas become
                <br />
                <span className="italic text-[#dfbb78]">places.</span>
              </h2>

              <p className="mt-6 text-base sm:text-lg leading-relaxed text-white/85">
                Planning. Design. Engineering. Construction. Finishing. Every
                stage is connected by one objective — creating a built
                environment that lasts.
              </p>

              <div className="mt-8">
                <Link
                  to="/portfolio"
                  className="btn-gold text-xs sm:text-sm tracking-wider"
                >
                  <span>Explore Our Projects</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          07 — LIFESTYLE / THE EXPERIENCE (Adaptive Light / Dark Text)
          (Addresses Issue 10: "Light" & "Space" Natural Proximity)
      ===================================================== */}
      <section
        aria-label="Architectural Experience"
        className="section-padding bg-[var(--surface)] transition-colors duration-500"
      >
        <div className="section-container">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="relative overflow-hidden rounded-2xl border border-[var(--line)] shadow-xl">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={images.interior}
                  alt="Premium architectural interior by Vardha Builders"
                  loading="lazy"
                  decoding="async"
                  className="about-image h-full w-full object-cover transition-transform duration-[1.5s] hover:scale-105"
                />
              </div>
            </div>

            <div className="about-section-title">
              <div className="flex items-center gap-3 font-mono text-xs sm:text-[13px] font-semibold uppercase tracking-[0.22em] text-[#c7a15c]">
                <span className="h-px w-8 bg-[#c7a15c]" />
                <span>06 / THE EXPERIENCE</span>
              </div>

              <h2 className="mt-6 font-display text-[clamp(2.4rem,4.5vw,4.5rem)] leading-[0.94] tracking-[-0.04em] text-[var(--text)]">
                Spaces
                <br />
                designed for
                <br />
                <span className="italic text-[#c7a15c]">life.</span>
              </h2>

              <p className="mt-6 text-base sm:text-lg leading-relaxed text-[var(--text-soft)]">
                The final measure of architecture is not the blueprint or the
                render. It is how comfortably, safely, and joyfully people inhabit
                the finished space.
              </p>

              {/* Grouped Features (Issue 10: Natural proximity between Light & Space) */}
              <div className="mt-8 flex flex-wrap items-center gap-10 sm:gap-14 border-t border-[var(--line)] pt-6">
                <div>
                  <div className="font-display text-2xl sm:text-3xl font-semibold text-[var(--text)]">
                    Light
                  </div>
                  <p className="mt-1 font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
                    Natural environments
                  </p>
                </div>

                <div className="h-10 w-px bg-[var(--line)] hidden sm:block" />

                <div>
                  <div className="font-display text-2xl sm:text-3xl font-semibold text-[var(--text)]">
                    Space
                  </div>
                  <p className="mt-1 font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
                    Thoughtful planning
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Note: Redundant Section 08 ("Let's build something lasting" banner) has been consolidated 
          into the shared Footer closing callout ("BUILD BETTER. TOGETHER." with primary action "Start a Conversation"),
          resolving Issue 8 and Issue 9 by eliminating consecutive duplicate CTA banners. */}
    </div>
  );
}
