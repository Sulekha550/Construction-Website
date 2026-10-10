import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
  type SyntheticEvent,
} from "react";

import { Link } from "react-router-dom";

import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  MapPin,
  MoveUpRight,
  SlidersHorizontal,
  X,
} from "lucide-react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import projects from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   FILTERS
========================================================= */

const filters = [
  "All",
  "Residential",
  "Commercial",
  "Villa",
  "Mixed Use",
];

/* =========================================================
   CONSTRUCTION / DEVELOPMENT IMAGES
========================================================= */

const constructionImages = [
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=90",
  "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2400&q=90",
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2400&q=90",
  "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=2400&q=90",
  "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=2400&q=90",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=90",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2400&q=90",
  "https://images.unsplash.com/photo-1590486803833-1c5f8c6a9c8f?auto=format&fit=crop&w=2400&q=90",
];

/* =========================================================
   LOCAL SHOWCASE IMAGES
   Add your actual image files in public/images/projects/.
   Empty third entry intentionally falls back to a category image.
========================================================= */

const projectImages = [
  "/images/projects/central-tower.webp",
  "/images/projects/palm-paradise.webp",
  "",
];

/* =========================================================
   IMAGE SYSTEM
========================================================= */

const getProjectImage = (
  project: (typeof projects)[number],
  index: number
) => {
  const category = String(project.category).toLowerCase();

  if (category === "commercial") {
    return constructionImages[(index + 1) % constructionImages.length];
  }

  if (category === "mixed use") {
    return constructionImages[(index + 3) % constructionImages.length];
  }

  if (category === "villa") {
    return constructionImages[(index + 5) % constructionImages.length];
  }

  if (category === "residential") {
    return constructionImages[(index + 4) % constructionImages.length];
  }

  return constructionImages[index % constructionImages.length];
};

const fallbackImage = constructionImages[0];

const handleImageError = (
  event: SyntheticEvent<HTMLImageElement>
) => {
  const image = event.currentTarget;

  if (image.dataset.fallbackApplied === "true") return;

  image.dataset.fallbackApplied = "true";
  image.src = fallbackImage;
};

/* =========================================================
   PORTFOLIO
========================================================= */

export default function Portfolio() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLImageElement>(null);
  const featuredImageRef = useRef<HTMLImageElement>(null);

  const [activeFilter, setActiveFilter] = useState("All");
  const [previewProject, setPreviewProject] =
    useState<(typeof projects)[number] | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTopButton, setShowTopButton] = useState(false);

  /* FILTERED PROJECTS */

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;

    return projects.filter(
      (project) => project.category === activeFilter
    );
  }, [activeFilter]);

  const featuredProject = filteredProjects[0];
  const remainingProjects = filteredProjects.slice(1);
  const showcaseProjects = filteredProjects.slice(0, 3);

  const categoryCounts = useMemo(() => {
    return filters.reduce<Record<string, number>>((acc, filter) => {
      acc[filter] =
        filter === "All"
          ? projects.length
          : projects.filter((project) => project.category === filter)
              .length;

      return acc;
    }, {});
  }, []);

  /* IMAGE USED BY SHOWCASE CARDS AND THEIR PREVIEWS */

  const getShowcaseImage = (
    project: (typeof projects)[number]
  ) => {
    const index = showcaseProjects.findIndex(
      (item) => item.id === project.id
    );

    if (index >= 0 && projectImages[index]) {
      return projectImages[index];
    }

    const projectIndex = filteredProjects.findIndex(
      (item) => item.id === project.id
    );

    return getProjectImage(project, Math.max(projectIndex, 0));
  };

  const openPreview = (project: (typeof projects)[number]) => {
    setPreviewProject(project);
  };

  /* SCROLL PROGRESS */

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const height =
        document.documentElement.scrollHeight - window.innerHeight;

      setScrollProgress(height > 0 ? (scrollTop / height) * 100 : 0);
      setShowTopButton(scrollTop > 700);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });

    return () => window.removeEventListener("scroll", update);
  }, []);

  /* LOCK BODY WHEN PREVIEW IS OPEN */

  useEffect(() => {
    if (previewProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [previewProject]);

  /* KEYBOARD NAVIGATION */

  useEffect(() => {
    if (!previewProject) return;

    const currentIndex = filteredProjects.findIndex(
      (project) => project.id === previewProject.id
    );

    const handleKeyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPreviewProject(null);
      }

      if (
        event.key === "ArrowRight" &&
        currentIndex >= 0 &&
        currentIndex < filteredProjects.length - 1
      ) {
        setPreviewProject(filteredProjects[currentIndex + 1]);
      }

      if (event.key === "ArrowLeft" && currentIndex > 0) {
        setPreviewProject(filteredProjects[currentIndex - 1]);
      }
    };

    window.addEventListener("keydown", handleKeyboard);
    return () => window.removeEventListener("keydown", handleKeyboard);
  }, [previewProject, filteredProjects]);

  /* GSAP ANIMATIONS */

  useEffect(() => {
    if (!pageRef.current) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".portfolio-reveal",
        { y: reduceMotion ? 0 : 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: reduceMotion ? 0 : 0.75,
          stagger: reduceMotion ? 0 : 0.05,
          ease: "power3.out",
        }
      );

      if (!reduceMotion && heroImageRef.current) {
        gsap.to(heroImageRef.current, {
          yPercent: 6,
          scale: 1.035,
          ease: "none",
          scrollTrigger: {
            trigger: ".portfolio-hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      if (!reduceMotion) {
        gsap.to(".portfolio-hero-content", {
          y: 32,
          opacity: 0.45,
          ease: "none",
          scrollTrigger: {
            trigger: ".portfolio-hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      gsap.utils.toArray<HTMLElement>(".portfolio-image").forEach((image) => {
        gsap.fromTo(
          image,
          { scale: reduceMotion ? 1 : 1.045 },
          {
            scale: 1,
            duration: reduceMotion ? 0 : 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: image,
              start: "top 92%",
              once: true,
            },
          }
        );
      });

      gsap.utils
        .toArray<HTMLElement>(".portfolio-section-title")
        .forEach((title) => {
          gsap.fromTo(
            title,
            { y: reduceMotion ? 0 : 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: reduceMotion ? 0 : 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: title,
                start: "top 90%",
                once: true,
              },
            }
          );
        });

      gsap.utils.toArray<HTMLElement>(".portfolio-card").forEach(
        (card, index) => {
          gsap.fromTo(
            card,
            { y: reduceMotion ? 0 : 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: reduceMotion ? 0 : 0.65,
              delay: reduceMotion ? 0 : index * 0.04,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 94%",
                once: true,
              },
            }
          );
        }
      );

      if (!reduceMotion && featuredImageRef.current) {
        gsap.to(featuredImageRef.current, {
          yPercent: 3,
          ease: "none",
          scrollTrigger: {
            trigger: ".featured-project",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      gsap.utils.toArray<HTMLElement>(".gold-line").forEach((line) => {
        gsap.fromTo(
          line,
          { scaleX: 0, transformOrigin: "left" },
          {
            scaleX: 1,
            duration: reduceMotion ? 0 : 0.75,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: line,
              start: "top 92%",
              once: true,
            },
          }
        );
      });

      const timer = window.setTimeout(() => ScrollTrigger.refresh(), 250);
      return () => window.clearTimeout(timer);
    }, pageRef);

    return () => ctx.revert();
  }, [filteredProjects]);

  /* CARD TILT */

  const handleCardMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 900) return;

    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

    card.style.transform = `
      perspective(1200px)
      rotateX(${y * -1.2}deg)
      rotateY(${x * 1.2}deg)
      translateY(-3px)
    `;
  };

  const handleCardMouseLeave = (event: MouseEvent<HTMLDivElement>) => {
    event.currentTarget.style.transform = "";
  };

  /* PREVIEW NAVIGATION */

  const navigatePreview = (direction: "next" | "prev") => {
    if (!previewProject) return;

    const currentIndex = filteredProjects.findIndex(
      (project) => project.id === previewProject.id
    );

    const nextIndex =
      direction === "next" ? currentIndex + 1 : currentIndex - 1;

    if (nextIndex >= 0 && nextIndex < filteredProjects.length) {
      setPreviewProject(filteredProjects[nextIndex]);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const previewIndex = previewProject
    ? filteredProjects.findIndex(
        (project) => project.id === previewProject.id
      )
    : -1;

  const previewImage = previewProject
    ? getShowcaseImage(previewProject)
    : fallbackImage;

  /* RENDER */

  return (
    <main
      ref={pageRef}
      className="min-h-screen overflow-hidden bg-[var(--bg)] text-[var(--text)]"
    >
      {/* PROGRESS */}

      <div className="fixed left-0 top-0 z-[100] h-[2px] w-full">
        <div
          className="h-full bg-[#b89458]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* HERO */}

      <section className="portfolio-hero relative min-h-[88vh] w-full overflow-hidden bg-[#090a0a] md:min-h-screen">
        {featuredProject && (
          <img
            ref={heroImageRef}
            src={getProjectImage(featuredProject, 0)}
            alt={`${featuredProject.title} construction and development`}
            onError={handleImageError}
            className="absolute inset-0 h-[105%] w-full object-cover"
          />
        )}

        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/95" />
        <div className="arch-grid absolute inset-0 opacity-[0.06]" />

        <div className="portfolio-hero-content relative z-10 flex min-h-[88vh] flex-col justify-between px-6 pb-8 pt-24 sm:px-8 md:min-h-screen md:px-12 md:pb-10 lg:px-16 xl:px-20">
          <div className="portfolio-reveal flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="h-px w-7 bg-[#c9a66b]" />
              <span className="font-mono text-[8px] uppercase tracking-[0.28em] text-white/60">
                Vardha Builders
              </span>
            </div>
            <span className="hidden font-mono text-[8px] uppercase tracking-[0.25em] text-white/30 md:block">
              Portfolio / 2026
            </span>
          </div>

          <div className="max-w-[760px]">
            <p className="portfolio-reveal mb-4 font-mono text-[8px] uppercase tracking-[0.3em] text-[#d0b078]">
              Built Environment / Selected Work
            </p>
            <h1 className="portfolio-reveal font-display text-[clamp(2.2rem,4.5vw,4.5rem)] font-medium leading-[0.98] tracking-[-0.04em] text-white">
              Spaces with
              <br />
              <span className="italic text-white/55">permanence.</span>
            </h1>
            <div className="portfolio-reveal mt-6 flex max-w-md items-start gap-4">
              <span className="mt-2 h-px w-8 shrink-0 bg-[#c9a66b]" />
              <p className="text-[13px] leading-7 text-white/65 md:text-[14px] md:leading-8">
                A collection of residential, commercial and mixed-use
                developments shaped through construction, architecture,
                engineering and purpose.
              </p>
            </div>
          </div>

          <div className="portfolio-reveal flex items-end justify-between">
            <div>
              <div className="font-mono text-[8px] uppercase tracking-[0.25em] text-white/35">
                {String(filteredProjects.length).padStart(2, "0")} Selected
                Projects
              </div>
              <div className="mt-3 h-px w-16 bg-white/20">
                <div
                  className="h-full bg-[#c9a66b]"
                  style={{
                    width: `${Math.min(filteredProjects.length * 10, 100)}%`,
                  }}
                />
              </div>
            </div>
            <div className="flex items-center gap-3 text-white/45">
              <span className="font-mono text-[7px] uppercase tracking-[0.25em]">
                Scroll
              </span>
              <ArrowDown size={12} strokeWidth={1} />
            </div>
          </div>
        </div>
      </section>

      {/* INTRO / FILTER */}

      <section className="relative w-full px-6 py-16 sm:px-8 md:px-12 md:py-20 lg:px-16 xl:px-20">
        <div className="w-full">
          <div className="grid gap-10 lg:grid-cols-[0.55fr_1.45fr]">
            <div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[8px] uppercase tracking-[0.28em] text-[var(--text-muted)]">
                  01
                </span>
                <span className="h-px w-7 bg-[#b08a4a]" />
                <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-[var(--text-muted)]">
                  Portfolio
                </span>
              </div>
              <div className="mt-8 border-l border-[var(--line)] pl-4">
                <p className="font-mono text-[7px] uppercase tracking-[0.25em] text-[#b08a4a]">
                  Our approach
                </p>
                <p className="mt-3 max-w-[220px] text-[12px] leading-6 text-[var(--text-muted)] md:text-[13px] md:leading-7">
                  We don't simply build structures. We create environments
                  that gain character with time.
                </p>
              </div>
            </div>

            <div className="portfolio-section-title">
              <h2 className="max-w-2xl font-display text-[clamp(1.8rem,3.5vw,3rem)] leading-[1.02] tracking-[-0.04em]">
                Architecture that
                <br />
                <span className="text-[var(--text-muted)]">
                  becomes part of life.
                </span>
              </h2>
              <p className="mt-5 max-w-xl text-[13px] leading-7 text-[var(--text-soft)] md:text-[14px] md:leading-8">
                Every development begins with its context — the site,
                structure, landscape, light and people who will inhabit it.
              </p>
            </div>
          </div>

          <div className="mt-12 border-y border-[var(--line)]">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3 py-4">
                <SlidersHorizontal
                  size={12}
                  strokeWidth={1}
                  className="text-[#b08a4a]"
                />
                <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-[var(--text-muted)]">
                  Filter projects
                </span>
              </div>
              <div className="flex flex-wrap gap-1 pb-4 md:pb-0">
                {filters.map((filter) => {
                  const active = activeFilter === filter;
                  return (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setActiveFilter(filter)}
                      className={`group flex items-center gap-2 px-2 py-2 font-mono text-[8px] uppercase tracking-[0.15em] transition-all ${
                        active
                          ? "text-[#a47d40]"
                          : "text-[var(--text-muted)] hover:text-[var(--text)]"
                      }`}
                    >
                      <span
                        className={`h-[5px] w-[5px] rounded-full border transition-all ${
                          active
                            ? "border-[#b08a4a] bg-[#b08a4a]"
                            : "border-[var(--line-strong)]"
                        }`}
                      />
                      {filter}
                      <span className="text-[7px] opacity-45">
                        {String(categoryCounts[filter] ?? 0).padStart(2, "0")}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECT */}

      {featuredProject && (
        <section className="featured-project w-full px-6 pb-20 sm:px-8 md:px-12 md:pb-24 lg:px-16 xl:px-20">
          <div className="w-full">
            <div className="mb-5 flex items-center justify-between">
              <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-[var(--text-muted)]">
                02 / Featured Development
              </span>
              <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                001
              </span>
            </div>
            <Link to={`/portfolio/${featuredProject.id}`} className="group block">
              <div className="relative overflow-hidden bg-black">
                <div className="aspect-[16/8.5] md:aspect-[2.25/1]">
                  <img
                    ref={featuredImageRef}
                    src={getProjectImage(featuredProject, 0)}
                    alt={`${featuredProject.title} construction project`}
                    onError={handleImageError}
                    className="portfolio-image h-full w-full object-cover transition-transform duration-[1.5s] group-hover:scale-[1.025]"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                <div className="absolute left-4 right-4 top-4 flex justify-between md:left-6 md:right-6 md:top-6">
                  <div className="border border-white/20 bg-black/20 px-3 py-2 backdrop-blur-sm">
                    <span className="font-mono text-[7px] uppercase tracking-[0.2em] text-white/65">
                      Featured Development
                    </span>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center border border-white/20 text-white transition-all duration-500 group-hover:border-[#c9a66b] group-hover:bg-[#c9a66b]">
                    <ArrowUpRight size={13} strokeWidth={1.2} />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                  <div className="mb-2 flex flex-wrap items-center gap-3 text-white/50">
                    <MapPin size={10} />
                    <span className="font-mono text-[7px] uppercase tracking-[0.18em]">
                      {featuredProject.location}
                    </span>
                    <span className="h-3 w-px bg-white/20" />
                    <span className="font-mono text-[7px] uppercase tracking-[0.18em]">
                      {featuredProject.category}
                    </span>
                    <span className="h-3 w-px bg-white/20" />
                    <span className="font-mono text-[7px] uppercase tracking-[0.18em]">
                      {featuredProject.status}
                    </span>
                  </div>
                  <h2 className="font-display text-[clamp(1.5rem,2.8vw,2.4rem)] leading-[1.02] tracking-[-0.035em] text-white">
                    {featuredProject.title}
                  </h2>
                </div>
              </div>
              <div className="grid border-b border-[var(--line)] md:grid-cols-[1.5fr_1fr]">
                <div className="py-4 md:pr-10">
                  <p className="max-w-xl text-[13px] leading-7 text-[var(--text-soft)] md:text-[14px] md:leading-8">
                    {featuredProject.description}
                  </p>
                </div>
                <div className="grid grid-cols-3 border-t border-[var(--line)] md:border-l md:border-t-0">
                  {featuredProject.stats.slice(0, 3).map((stat, index) => (
                    <div
                      key={stat.label}
                      className={`py-4 pl-3 ${
                        index !== 2 ? "border-r border-[var(--line)]" : ""
                      }`}
                    >
                      <div className="font-display text-[16px] md:text-[17px]">
                        {stat.value}
                      </div>
                      <div className="mt-1 text-[7px] uppercase tracking-[0.15em] text-[var(--text-muted)]">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* THREE PROJECT SHOWCASE — CARD CLICK OPENS FULL-SCREEN PREVIEW */}

      {showcaseProjects.length > 0 && (
        <section className="w-full bg-[var(--bg)] px-6 pb-20 sm:px-8 md:px-12 md:pb-24 lg:px-16 xl:px-20">
          <div className="w-full">
            <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-[var(--text-muted)]">
                    03
                  </span>
                  <span className="h-px w-7 bg-[#b08a4a]" />
                  <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-[var(--text-muted)]">
                    Featured Projects
                  </span>
                </div>
                <h2 className="portfolio-section-title mt-6 font-display text-[clamp(1.8rem,3.5vw,3rem)] leading-[1.02] tracking-[-0.04em]">
                  Three ways to build.
                </h2>
                <p className="mt-4 max-w-xl text-[13px] leading-7 text-[var(--text-soft)] md:text-[14px] md:leading-8">
                  Explore selected Vardha developments, each shaped around a
                  different architectural identity, purpose and lifestyle.
                </p>
              </div>
              <span className="hidden font-mono text-[8px] uppercase tracking-[0.2em] text-[var(--text-muted)] md:block">
                03 Selected Works
              </span>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {showcaseProjects.map((project, index) => {
                const image = getShowcaseImage(project);

                return (
                  <article
                    key={`showcase-${project.id}`}
                    role="button"
                    tabIndex={0}
                    aria-label={`Open preview for ${project.title}`}
                    onClick={() => openPreview(project)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        openPreview(project);
                      }
                    }}
                    className="portfolio-card group cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-[#c9a66b]"
                    onMouseMove={handleCardMouseMove}
                    onMouseLeave={handleCardMouseLeave}
                    style={{ transition: "transform .35s ease-out" }}
                  >
                    <div className="h-full overflow-hidden border border-[var(--line)] bg-[var(--bg-soft)]">
                      <div className="relative aspect-[4/3] overflow-hidden bg-black">
                        <img
                          src={image}
                          alt={`${project.title} project`}
                          loading="lazy"
                          onError={handleImageError}
                          className="portfolio-image h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-[1.045]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                        <div className="absolute left-4 top-4">
                          <span className="font-mono text-[8px] text-white/70">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <div className="absolute right-4 top-4 border border-white/20 bg-black/30 px-2.5 py-1.5 backdrop-blur-sm">
                          <span className="font-mono text-[7px] uppercase tracking-[0.18em] text-white/75">
                            {project.status}
                          </span>
                        </div>
                        <div className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center border border-white/25 bg-black/30 text-white backdrop-blur-md transition-all duration-300 group-hover:border-[#c9a66b] group-hover:bg-[#c9a66b]">
                          <Maximize2 size={13} strokeWidth={1.2} />
                        </div>
                        <div className="absolute bottom-4 left-4">
                          <span className="font-mono text-[7px] uppercase tracking-[0.18em] text-white/60">
                            Vardha Builders
                          </span>
                        </div>
                      </div>

                      <div className="p-5">
                        <div className="mb-3 flex items-center gap-3">
                          <span className="font-mono text-[7px] uppercase tracking-[0.2em] text-[#b08a4a]">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="h-px w-5 bg-[var(--line-strong)]" />
                          <span className="font-mono text-[7px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                            {project.category}
                          </span>
                        </div>

                        <h3 className="font-display text-[1.25rem] leading-[1.08] tracking-[-0.025em] transition-colors duration-300 group-hover:text-[#a77f43] md:text-[1.5rem]">
                          {project.title}
                        </h3>

                        <div className="mt-3 flex items-center gap-2 text-[var(--text-muted)]">
                          <MapPin size={10} strokeWidth={1} />
                          <span className="font-mono text-[7px] uppercase tracking-[0.17em]">
                            {project.location}
                          </span>
                        </div>

                        <p className="mt-4 text-[13px] leading-7 text-[var(--text-soft)] md:text-[14px] md:leading-8">
                          {project.description}
                        </p>

                        <div className="mt-5 grid grid-cols-3 border-y border-[var(--line)]">
                          {project.stats.slice(0, 3).map((stat, statIndex) => (
                            <div
                              key={stat.label}
                              className={`py-3 ${
                                statIndex !== 2
                                  ? "border-r border-[var(--line)]"
                                  : ""
                              }`}
                            >
                              <div className="font-display text-[15px] md:text-[16px]">
                                {stat.value}
                              </div>
                              <div className="mt-1 text-[7px] uppercase tracking-[0.15em] text-[var(--text-muted)]">
                                {stat.label}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="group/link mt-5 flex w-fit items-center gap-3 border-b border-[var(--line-strong)] pb-2 font-mono text-[7px] uppercase tracking-[0.22em] transition-colors group-hover:border-[#b08a4a] group-hover:text-[#b08a4a]">
                          Explore project
                          <ArrowUpRight
                            size={11}
                            strokeWidth={1.2}
                            className="transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1"
                          />
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* EDITORIAL PROJECTS */}

      {remainingProjects.length > 0 && (
        <section className="w-full bg-[var(--bg-soft)] px-6 py-20 sm:px-8 md:px-12 md:py-24 lg:px-16 xl:px-20">
          <div className="w-full">
            <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-[var(--text-muted)]">
                    04
                  </span>
                  <span className="h-px w-7 bg-[#b08a4a]" />
                  <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-[var(--text-muted)]">
                    Selected developments
                  </span>
                </div>
                <h2 className="portfolio-section-title mt-6 font-display text-[clamp(1.8rem,3.5vw,3rem)] leading-[1.02] tracking-[-0.04em]">
                  The collection
                </h2>
              </div>
              <p className="max-w-sm text-[13px] leading-7 text-[var(--text-soft)] md:text-[14px] md:leading-8">
                From foundations and structural systems to completed
                buildings, explore the developments that define Vardha.
              </p>
            </div>

            <div className="space-y-16">
              {remainingProjects.map((project, index) => {
                const isLarge = index % 3 === 0;
                const projectImage = getProjectImage(project, index + 1);

                return (
                  <div
                    key={project.id}
                    className="portfolio-card group"
                    onMouseMove={handleCardMouseMove}
                    onMouseLeave={handleCardMouseLeave}
                    style={{ transition: "transform .35s ease-out" }}
                  >
                    <article
                      className={`grid gap-7 ${
                        isLarge
                          ? "lg:grid-cols-[1.35fr_.65fr]"
                          : "lg:grid-cols-[.65fr_1.35fr]"
                      }`}
                    >
                      <div
                        className={`relative overflow-hidden bg-black ${
                          !isLarge ? "lg:order-2" : ""
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => openPreview(project)}
                          aria-label={`Preview ${project.title}`}
                          className="group/image relative block w-full text-left"
                        >
                          <div className="aspect-[4/3]">
                            <img
                              src={projectImage}
                              alt={`${project.title} construction and architecture`}
                              loading="lazy"
                              onError={handleImageError}
                              className="portfolio-image h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-[1.035]"
                            />
                          </div>
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                          <div className="pointer-events-none absolute left-4 top-4">
                            <span className="font-mono text-[8px] text-white/60">
                              {String(index + 4).padStart(2, "0")}
                            </span>
                          </div>
                          <div className="pointer-events-none absolute right-4 top-4 border border-white/20 bg-black/25 px-2.5 py-1.5 backdrop-blur-sm">
                            <span className="font-mono text-[7px] uppercase tracking-[0.18em] text-white/70">
                              {project.status}
                            </span>
                          </div>
                          <span className="absolute bottom-4 right-4 flex h-8 w-8 items-center justify-center border border-white/25 bg-black/25 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover/image:opacity-100 group-hover/image:border-[#c9a66b] group-hover/image:bg-[#c9a66b]">
                            <Maximize2 size={12} strokeWidth={1.2} />
                          </span>
                        </button>
                      </div>

                      <div
                        className={`flex flex-col justify-center ${
                          !isLarge ? "lg:order-1" : ""
                        }`}
                      >
                        <div className="mb-4 flex items-center gap-3">
                          <span className="font-mono text-[7px] uppercase tracking-[0.2em] text-[#b08a4a]">
                            {String(index + 4).padStart(2, "0")}
                          </span>
                          <span className="h-px w-6 bg-[var(--line-strong)]" />
                          <span className="font-mono text-[7px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                            {project.category}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => openPreview(project)}
                          className="w-fit text-left"
                        >
                          <h3 className="max-w-lg font-display text-[1.25rem] leading-[1.08] tracking-[-0.025em] transition-colors duration-300 group-hover:text-[#a77f43] md:text-[1.5rem]">
                            {project.title}
                          </h3>
                        </button>

                        <div className="mt-3 flex items-center gap-2 text-[var(--text-muted)]">
                          <MapPin size={10} strokeWidth={1} />
                          <span className="font-mono text-[7px] uppercase tracking-[0.17em]">
                            {project.location}
                          </span>
                        </div>

                        <p className="mt-4 max-w-md text-[13px] leading-7 text-[var(--text-soft)] md:text-[14px] md:leading-8">
                          {project.description}
                        </p>

                        <div className="mt-6 grid max-w-md grid-cols-3 border-y border-[var(--line)]">
                          {project.stats.slice(0, 3).map((stat, statIndex) => (
                            <div
                              key={stat.label}
                              className={`py-3 ${
                                statIndex !== 2
                                  ? "border-r border-[var(--line)]"
                                  : ""
                              }`}
                            >
                              <div className="font-display text-[15px] md:text-[16px]">
                                {stat.value}
                              </div>
                              <div className="mt-1 text-[7px] uppercase tracking-[0.15em] text-[var(--text-muted)]">
                                {stat.label}
                              </div>
                            </div>
                          ))}
                        </div>

                        <button
                          type="button"
                          onClick={() => openPreview(project)}
                          className="group/link mt-6 flex w-fit items-center gap-3 border-b border-[var(--line-strong)] pb-2 font-mono text-[7px] uppercase tracking-[0.22em] transition-colors hover:border-[#b08a4a] hover:text-[#b08a4a]"
                        >
                          Explore project
                          <ArrowUpRight
                            size={11}
                            strokeWidth={1.2}
                            className="transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1"
                          />
                        </button>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* DESIGN PHILOSOPHY */}

      <section className="relative w-full overflow-hidden px-6 py-20 sm:px-8 md:px-12 md:py-24 lg:px-16 xl:px-20">
        <div className="arch-grid absolute inset-0 opacity-[0.3]" />
        <div className="relative w-full">
          <div className="grid gap-10 lg:grid-cols-[.6fr_1.4fr]">
            <div>
              <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-[var(--text-muted)]">
                05 / Philosophy
              </span>
              <div className="mt-7 h-px w-10 bg-[#b08a4a]" />
            </div>
            <div>
              <p className="font-display text-[clamp(1.4rem,2.5vw,2rem)] leading-[1.08] tracking-[-0.03em]">
                “Good architecture does not demand attention. It earns
                appreciation over time.”
              </p>
              <div className="mt-7 flex items-center gap-3">
                <span className="h-px w-7 bg-[#b08a4a]" />
                <span className="font-mono text-[7px] uppercase tracking-[0.25em] text-[var(--text-muted)]">
                  Vardha Builders
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}

      <section className="w-full overflow-hidden border-y border-[var(--line)] bg-[var(--bg)]">
        <div className="vardha-marquee-track flex items-center gap-7 px-6 py-5">
          {Array.from({ length: 3 }).map((_, groupIndex) => (
            <div key={groupIndex} className="flex items-center gap-7">
              {[
                "Construction",
                "Architecture",
                "Structure",
                "Material",
                "Development",
              ].map((item) => (
                <div key={item} className="flex items-center gap-7">
                  <span className="font-display text-[16px] md:text-[17px] italic text-[var(--text-muted)] md:text-[21px]">
                    {item}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-[#c9a66b]" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}

      <section className="relative min-h-[62vh] w-full overflow-hidden bg-[#0b0c0c] px-6 py-20 text-white sm:px-8 md:min-h-[66vh] md:px-12 md:py-24 lg:px-16 xl:px-20">
        <div className="absolute inset-0 arch-grid opacity-[0.05]" />
        <div className="relative w-full">
          <div className="grid min-h-[40vh] gap-10 lg:grid-cols-[1fr_.42fr] lg:items-end">
            <div>
              <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-[#d2b477]">
                Vardha Builders
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-[clamp(1.8rem,3.5vw,3rem)] leading-[1.02] tracking-[-0.04em]">
                Your next place
                <br />
                <span className="italic text-white/45">starts here.</span>
              </h2>
              <p className="mt-5 max-w-md text-[13px] leading-7 text-white/60 md:text-[14px] md:leading-8">
                Speak with our team about an upcoming development, investment
                opportunity or private site visit.
              </p>
            </div>
            <Link
              to="/contact"
              className="group flex w-fit items-center gap-4 border-b border-white/20 pb-3 font-mono text-[8px] uppercase tracking-[0.24em] transition-colors hover:border-[#d2b477] hover:text-[#d2b477]"
            >
              Start a conversation
              <ArrowRight
                size={13}
                strokeWidth={1.2}
                className="transition-transform group-hover:translate-x-1.5"
              />
            </Link>
          </div>

          <div className="mt-20 border-t border-white/10 pt-8">
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-px w-7 bg-[#c9a66b]" />
                  <span className="font-mono text-[7px] uppercase tracking-[0.28em] text-white/30">
                    Vardha Builders
                  </span>
                </div>
                <p className="mt-4 max-w-md font-display text-[1.15rem] leading-[1.2] text-white/70 sm:text-[1.3rem]">
                  Built for today.
                  <br />
                  Designed for what remains.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-x-10 gap-y-5 sm:grid-cols-3 md:text-right">
                <div>
                  <span className="block font-mono text-[7px] uppercase tracking-[0.22em] text-white/25">
                    Company
                  </span>
                  <Link
                    to="/about"
                    className="mt-2 block text-[9px] text-white/55 transition-colors hover:text-[#d2b477]"
                  >
                    About Vardha
                  </Link>
                </div>
                <div>
                  <span className="block font-mono text-[7px] uppercase tracking-[0.22em] text-white/25">
                    Explore
                  </span>
                  <Link
                    to="/portfolio"
                    className="mt-2 block text-[9px] text-white/55 transition-colors hover:text-[#d2b477]"
                  >
                    Portfolio
                  </Link>
                </div>
                <div>
                  <span className="block font-mono text-[7px] uppercase tracking-[0.22em] text-white/25">
                    Contact
                  </span>
                  <Link
                    to="/contact"
                    className="mt-2 block text-[9px] text-white/55 transition-colors hover:text-[#d2b477]"
                  >
                    Start a conversation
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="font-mono text-[7px] uppercase tracking-[0.25em] text-white/20">
                © {new Date().getFullYear()} Vardha Builders
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-[7px] uppercase tracking-[0.25em] text-white/20">
                  Architecture
                </span>
                <span className="h-[3px] w-[3px] rounded-full bg-[#c9a66b]" />
                <span className="font-mono text-[7px] uppercase tracking-[0.25em] text-white/20">
                  Construction
                </span>
                <span className="h-[3px] w-[3px] rounded-full bg-[#c9a66b]" />
                <span className="font-mono text-[7px] uppercase tracking-[0.25em] text-white/20">
                  Development
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BACK TO TOP */}

      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center border border-[var(--line)] bg-[var(--bg)] text-[var(--text)] shadow-xl transition-all duration-500 ${
          showTopButton
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <ArrowUpRight
          size={15}
          strokeWidth={1.2}
          className="-rotate-45"
        />
      </button>

      {/* FULL-SCREEN PROJECT PREVIEW MODAL */}

      {previewProject && (
        <div
          className="fixed inset-0 z-[200] h-[100dvh] w-full overflow-y-auto bg-[#080909] text-white"
          role="dialog"
          aria-modal="true"
          aria-label={`${previewProject.title} project preview`}
        >
          {/* TOP BAR */}

          <div className="sticky top-0 z-30 flex min-h-16 items-center justify-between border-b border-white/10 bg-[#080909]/90 px-4 backdrop-blur-xl sm:px-6 lg:px-9">
            <div className="flex items-center gap-3">
              <span className="h-px w-6 bg-[#c9a66b]" />
              <span className="font-mono text-[8px] uppercase tracking-[0.24em] text-white/55 sm:text-[9px]">
                Vardha Builders
              </span>
              <span className="hidden text-white/20 sm:inline">/</span>
              <span className="hidden font-mono text-[8px] uppercase tracking-[0.18em] text-white/35 sm:inline">
                Project Preview
              </span>
            </div>

            <button
              type="button"
              onClick={() => setPreviewProject(null)}
              aria-label="Close project preview"
              className="flex h-10 w-10 items-center justify-center border border-white/15 transition-colors hover:border-[#c9a66b] hover:bg-[#c9a66b] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c9a66b]"
            >
              <X size={16} strokeWidth={1.2} />
            </button>
          </div>

          <div className="grid min-h-[calc(100dvh-4rem)] lg:grid-cols-[minmax(0,1.45fr)_minmax(350px,.75fr)]">
            {/* LARGE IMAGE PANEL */}

            <div className="relative min-h-[42vh] overflow-hidden bg-black sm:min-h-[52vh] lg:min-h-[calc(100dvh-4rem)]">
              <img
                key={`${previewProject.id}-${previewImage}`}
                src={previewImage}
                alt={`${previewProject.title} project`}
                onError={handleImageError}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
              <div className="absolute left-5 top-5 flex items-center gap-3 sm:left-8 sm:top-8">
                <span className="border border-white/20 bg-black/25 px-3 py-2 font-mono text-[7px] uppercase tracking-[0.2em] text-white/65 backdrop-blur-md">
                  {previewProject.status}
                </span>
                <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/50">
                  {String(Math.max(previewIndex + 1, 1)).padStart(2, "0")} /{" "}
                  {String(filteredProjects.length).padStart(2, "0")}
                </span>
              </div>

              <div className="absolute bottom-6 left-5 right-5 sm:bottom-9 sm:left-8 sm:right-8 lg:bottom-12 lg:left-12 lg:right-12">
                <div className="mb-3 flex items-center gap-3 text-white/55">
                  <MapPin size={12} strokeWidth={1.2} />
                  <span className="font-mono text-[8px] uppercase tracking-[0.2em]">
                    {previewProject.location}
                  </span>
                  <span className="h-3 w-px bg-white/25" />
                  <span className="font-mono text-[8px] uppercase tracking-[0.2em]">
                    {previewProject.category}
                  </span>
                </div>
                <h2 className="max-w-3xl font-display text-[clamp(1.8rem,3.5vw,3rem)] leading-[1.02] tracking-[-0.04em]">
                  {previewProject.title}
                </h2>
                <p className="mt-4 max-w-xl text-[13px] leading-7 text-white/65 md:text-[14px] md:leading-8">
                  {previewProject.description}
                </p>
              </div>
            </div>

            {/* DETAILS PANEL */}

            <aside className="flex min-h-full flex-col justify-between border-t border-white/10 bg-[#0d0e0e] p-5 sm:p-7 lg:border-l lg:border-t-0 lg:p-9 xl:p-11">
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-px w-7 bg-[#c9a66b]" />
                  <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-[#d2b477]">
                    Project Overview
                  </span>
                </div>

                <h3 className="mt-6 font-display text-[clamp(1.3rem,2.5vw,1.8rem)] leading-tight">
                  Built with purpose.
                </h3>

                <p className="mt-3 text-[13px] leading-7 text-white/60 md:text-[14px] md:leading-8">
                  Discover the key details of this Vardha development, from
                  its location and category to its defining project
                  specifications.
                </p>

                <div className="mt-7 border-t border-white/10">
                  {[
                    ["Project", previewProject.title],
                    ["Location", previewProject.location],
                    ["Category", previewProject.category],
                    ["Status", previewProject.status],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-start justify-between gap-5 border-b border-white/10 py-4"
                    >
                      <span className="shrink-0 font-mono text-[7px] uppercase tracking-[0.18em] text-white/30 sm:text-[8px]">
                        {label}
                      </span>
                      <span className="text-right text-[10px] text-white/75 sm:text-[11px]">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-7">
                  <span className="font-mono text-[8px] uppercase tracking-[0.22em] text-white/35">
                    Project Highlights
                  </span>
                  <div className="mt-3 grid grid-cols-3 border-y border-white/10">
                    {previewProject.stats.slice(0, 3).map((stat, index) => (
                      <div
                        key={stat.label}
                        className={`min-w-0 px-2 py-4 sm:px-3 ${
                          index !== 2 ? "border-r border-white/10" : ""
                        }`}
                      >
                        <div className="break-words font-display text-[1.2rem] sm:text-[1.45rem]">
                          {stat.value}
                        </div>
                        <div className="mt-2 break-words text-[7px] uppercase leading-4 tracking-[0.12em] text-white/35 sm:text-[8px]">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-9">
                {/* PREVIOUS / NEXT */}

                <div className="mb-5 flex items-center justify-between">
                  <span className="font-mono text-[7px] uppercase tracking-[0.2em] text-white/30 sm:text-[8px]">
                    Project {String(Math.max(previewIndex + 1, 1)).padStart(2, "0")}{" "}
                    / {String(filteredProjects.length).padStart(2, "0")}
                  </span>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => navigatePreview("prev")}
                      disabled={previewIndex <= 0}
                      aria-label="Previous project"
                      className="flex h-10 w-10 items-center justify-center border border-white/15 transition-colors hover:border-[#c9a66b] hover:text-[#c9a66b] disabled:cursor-not-allowed disabled:opacity-25"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => navigatePreview("next")}
                      disabled={previewIndex < 0 || previewIndex >= filteredProjects.length - 1}
                      aria-label="Next project"
                      className="flex h-10 w-10 items-center justify-center border border-white/15 transition-colors hover:border-[#c9a66b] hover:text-[#c9a66b] disabled:cursor-not-allowed disabled:opacity-25"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

                <Link
                  to={`/portfolio/${previewProject.id}`}
                  onClick={() => setPreviewProject(null)}
                  className="group flex items-center justify-between border-b border-white/25 pb-4 font-mono text-[8px] uppercase tracking-[0.2em] transition-colors hover:border-[#c9a66b] hover:text-[#d2b477] sm:text-[9px]"
                >
                  View complete project
                  <MoveUpRight
                    size={15}
                    strokeWidth={1.2}
                    className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </Link>

                <div className="mt-5 flex items-center justify-between">
                  <span className="font-mono text-[7px] uppercase tracking-[0.16em] text-white/20 sm:text-[8px]">
                    ESC to close
                  </span>
                  <span className="font-mono text-[7px] uppercase tracking-[0.16em] text-white/20 sm:text-[8px]">
                    ← → Navigate
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      )}
    </main>
  );
}
