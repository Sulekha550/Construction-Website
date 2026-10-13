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

      /* IMAGE SCALE ANIMATIONS */
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
              x: -30,
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
          01 — HERO (Always Dark Image Stage with Guaranteed Contrast)
      ===================================================== */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Background hero image */}
        <img
          src={images.hero}
          alt="Premium architectural building visualization"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Dark cinematic overlays */}
        <div className="absolute inset-0 bg-[#0b0c0c]/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0c0c]/70 via-black/30 to-[#0b0c0c]" />

        {/* Architectural grid */}
        <div className="arch-grid absolute inset-0 opacity-[0.07]" />

        {/* Hero container */}
        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-between px-5 pb-10 pt-28 sm:px-8 sm:pt-32 lg:px-12 lg:pt-36">
          <div className="about-reveal flex items-center gap-3">
            <span className="h-px w-8 bg-[#c7a15c]" />
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#c7a15c]">
              About Vardha Builders
            </span>
          </div>

          <div className="my-12 w-full max-w-4xl md:my-16">
            <p className="about-reveal mb-4 font-mono text-[9px] uppercase tracking-[0.3em] text-[#c7a15c] sm:text-[10px]">
              Building Dreams Since 2014
            </p>

            <h1 className="about-reveal font-display text-[clamp(2.8rem,6vw,6rem)] font-medium leading-[0.92] tracking-[-0.05em] text-white">
              We Build
              <br />
              <span className="ml-[3vw] inline-block italic text-[#c7a15c]">
                More.
              </span>
            </h1>

            <div className="about-reveal mt-7 flex max-w-xl items-start gap-4 text-xs leading-6 text-white/75 sm:text-sm sm:leading-7">
              <span className="mt-3 h-px w-8 shrink-0 bg-[#c7a15c]" />
              <p>
                Vardha Builders is built around a simple idea — architecture
                should do more than occupy land. It should create places,
                experiences and lasting value for generations.
              </p>
            </div>
          </div>

          <div className="about-reveal flex items-end justify-between text-white">
            <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/50">
              01 / 06 · Corporate Identity
            </div>

            <div className="flex flex-col items-center gap-2">
              <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-white/50">
                Scroll to explore
              </span>
              <ArrowDown
                size={14}
                strokeWidth={1.5}
                className="animate-bounce text-[#c7a15c]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          02 — OUR STORY (Adapts to Light / Dark Themes)
      ===================================================== */}
      <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.3em] text-[#c7a15c]">
              <span className="h-px w-8 bg-[#c7a15c]" />
              <span>02 / OUR STORY</span>
            </div>

            <Building2
              size={18}
              strokeWidth={1.5}
              className="text-[#c7a15c]"
            />
          </div>

          <div className="about-line mb-14 h-px w-full bg-[var(--line)]" />

          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.4fr] lg:gap-16">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#c7a15c] sm:text-[10px]">
                The Vardha Approach
              </p>
            </div> 

            <div className="about-section-title">
              <h2 className="font-display text-[clamp(2.2rem,4.5vw,4.5rem)] font-medium leading-[0.96] tracking-[-0.04em] text-[var(--text)]">
                Architecture that feels
                <span className="italic text-[#c7a15c]"> considered.</span>
              </h2>

              <p className="mt-7 max-w-3xl text-[13px] leading-7 text-[var(--text-soft)] sm:text-sm sm:leading-7">
                We believe meaningful development begins long before
                construction. It starts with understanding the site, the
                surroundings, the people and the way a space will be lived in.
              </p>

              <p className="mt-4 max-w-3xl text-[13px] leading-7 text-[var(--text-soft)] sm:text-sm sm:leading-7">
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
          03 — ARCHITECTURE VISUAL (Card Surface + Image Stage)
      ===================================================== */}
      <section className="px-5 pb-20 sm:px-8 sm:pb-28 lg:px-12 lg:pb-32">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="group relative min-h-[460px] overflow-hidden border border-[var(--line)] md:min-h-[580px]">
            <img
              src={images.architecture}
              alt="Contemporary architectural structure"
              className="about-image absolute inset-0 h-full w-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute bottom-6 left-6 text-white sm:bottom-8 sm:left-8">
              <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-[#c7a15c]">
                Architecture / 01
              </p>

              <h3 className="mt-2 font-display text-[clamp(1.8rem,3vw,3rem)] font-semibold leading-[1] text-white">
                Form follows
                <br />
                <span className="italic text-[#c7a15c]">experience.</span>
              </h3>
            </div>
          </div>

          <div className="flex min-h-[460px] flex-col justify-between border border-[var(--line)] bg-[var(--surface)] p-7 md:min-h-[580px] md:p-10 lg:p-12">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--text-muted)]">
                Vardha / Philosophy
              </span>

              <div className="mt-6 h-px bg-[var(--line)]" />
            </div>

            <div>
              <p className="font-display text-[clamp(1.8rem,3vw,3.2rem)] font-medium leading-[1.05] text-[var(--text)]">
                &ldquo;Good architecture is not simply seen.
                <span className="italic text-[#c7a15c]">
                  {" "}It is experienced.&rdquo;
                </span>
              </p>

              <div className="mt-8 flex items-center gap-3">
                <span className="h-px w-8 bg-[#c7a15c]" />
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  Vardha Builders Principle
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          04 — PRINCIPLES (Adaptive Background & Accessible Contrast)
      ===================================================== */}
      <section className="border-y border-[var(--line)] bg-[var(--bg-soft)] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-14">
            <div>
              <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.3em] text-[#c7a15c]">
                <span className="h-px w-8 bg-[#c7a15c]" />
                <span>03 / PRINCIPLES</span>
              </div>

              <h2 className="about-section-title mt-6 font-display text-[clamp(2.2rem,4vw,4.2rem)] font-medium leading-[0.96] tracking-[-0.04em] text-[var(--text)]">
                How
                <br />
                <span className="italic text-[#c7a15c]">we think.</span>
              </h2>

              <p className="mt-5 max-w-sm text-xs leading-6 text-[var(--text-soft)]">
                Core engineering and design values that govern every project
                from blueprint to occupancy.
              </p>
            </div>

            <div>
              {principles.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.number}
                    className="principle-item group border-t border-[var(--line)] py-7 transition-all duration-300 hover:px-2"
                  >
                    <div className="grid gap-5 md:grid-cols-[50px_1fr_2fr] md:items-start">
                      <span className="font-mono text-[10px] text-[#c7a15c]">
                        {item.number}
                      </span>

                      <div className="flex items-center gap-3">
                        <Icon
                          size={20}
                          strokeWidth={1.5}
                          className="text-[#c7a15c] transition-transform duration-300 group-hover:scale-110"
                        />
                        <h3 className="font-display text-lg font-semibold text-[var(--text)] md:text-xl">
                          {item.title}
                        </h3>
                      </div>

                      <div>
                        <p className="text-[13px] leading-6 text-[var(--text-soft)]">
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
      ===================================================== */}
      <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.3em] text-[#c7a15c]">
              <span className="h-px w-8 bg-[#c7a15c]" />
              <span>04 / AT A GLANCE</span>
            </div>
          </div>

          <div className="grid border-t border-[var(--line)] sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["2014", "Established Since"],
              ["10+", "Years of Excellence"],
              ["100%", "Quality Execution"],
              ["∞", "Architectural Possibilities"],
            ].map(([number, label]) => (
              <div
                key={label}
                className="about-number border-b border-[var(--line)] p-7 sm:border-r lg:border-b-0"
              >
                <div className="font-display text-[clamp(2.8rem,5vw,4.5rem)] font-semibold tracking-[-0.04em] text-[var(--text)]">
                  {number}
                </div>

                <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.2em] text-[#c7a15c]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          06 — CONSTRUCTION / VISION TO REALITY (Dark Cinematic Overlay)
      ===================================================== */}
      <section className="relative min-h-[580px] overflow-hidden md:min-h-[640px]">
        <img
          src={images.construction}
          alt="Architectural construction and development"
          className="about-image absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-[#0b0c0c]/70" />

        <div className="relative z-10 flex min-h-[580px] items-center px-5 py-16 sm:px-8 md:min-h-[640px] lg:px-12">
          <div className="mx-auto w-full max-w-7xl">
            <div className="about-section-title max-w-2xl text-white">
              <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.3em] text-[#c7a15c]">
                <span className="h-px w-8 bg-[#c7a15c]" />
                <span>05 / FROM VISION TO REALITY</span>
              </div>

              <h2 className="mt-6 font-display text-[clamp(2.4rem,4.5vw,4.8rem)] font-medium leading-[0.92] tracking-[-0.04em] text-white">
                Ideas become
                <br />
                <span className="italic text-[#c7a15c]">places.</span>
              </h2>

              <p className="mt-6 text-[13px] leading-7 text-white/75 sm:text-sm sm:leading-7">
                Planning. Design. Engineering. Construction. Finishing. Every
                stage is connected by one objective — creating a built
                environment that lasts.
              </p>

              <Link
                to="/portfolio"
                className="mt-8 inline-flex items-center gap-3 rounded-full border border-[#c7a15c]/50 bg-[#c7a15c]/10 px-6 py-3.5 font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-[#dfbb78] transition-all hover:bg-[#c7a15c] hover:text-[#0b0c0c]"
              >
                Explore Our Projects
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          07 — LIFESTYLE / THE EXPERIENCE (Adaptive Light / Dark Text)
      ===================================================== */}
      <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="relative overflow-hidden border border-[var(--line)]">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={images.interior}
                  alt="Premium architectural interior"
                  className="about-image h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="about-section-title">
              <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.3em] text-[#c7a15c]">
                <span className="h-px w-8 bg-[#c7a15c]" />
                <span>06 / THE EXPERIENCE</span>
              </div>

              <h2 className="mt-6 font-display text-[clamp(2.2rem,4.5vw,4.5rem)] font-medium leading-[0.94] tracking-[-0.04em] text-[var(--text)]">
                Spaces
                <br />
                designed for
                <br />
                <span className="italic text-[#c7a15c]">life.</span>
              </h2>

              <p className="mt-6 text-[13px] leading-7 text-[var(--text-soft)] sm:text-sm sm:leading-7">
                The final measure of architecture is not the drawing or the
                render. It is how naturally people inhabit the finished space.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-6 border-t border-[var(--line)] pt-6">
                <div>
                  <div className="font-display text-2xl font-semibold text-[var(--text)] md:text-3xl">
                    Light
                  </div>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                    Natural environments
                  </p>
                </div>

                <div>
                  <div className="font-display text-2xl font-semibold text-[var(--text)] md:text-3xl">
                    Space
                  </div>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                    Thoughtful planning
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          08 — FINAL CTA (Dedicated Dark Luxury Footer Card)
      ===================================================== */}
      <section className="border-t border-[var(--line)] bg-[#0b0c0c] px-5 py-20 text-white sm:px-8 sm:py-28 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <div>
              <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.3em] text-[#c7a15c]">
                <span className="h-px w-8 bg-[#c7a15c]" />
                <span>Vardha Builders</span>
              </div>

              <h2 className="mt-6 max-w-3xl font-display text-[clamp(2.6rem,5.5vw,5.5rem)] font-medium leading-[0.92] tracking-[-0.05em] text-white">
                Let&apos;s build
                <br />
                <span className="italic text-[#c7a15c]">
                  something lasting.
                </span>
              </h2>
            </div>

            <Link
              to="/contact"
              className="group inline-flex w-fit items-center gap-4 rounded-full bg-[#c7a15c] px-7 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#0b0c0c] transition-all hover:bg-[#dfbb78] hover:-translate-y-0.5"
            >
              Start a Conversation
              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
