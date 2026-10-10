
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowDown,
  ArrowUpRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Compass,
  FileText,
  Layers,
  MapPin,
  Maximize2,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import projects, { type Project } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

const filters = [
  { id: "all", label: "All Projects" },
  { id: "flats", label: "Flats & Apartments" },
  { id: "villas", label: "Luxury Villas" },
  { id: "ready", label: "Ready to Move" },
];

export default function Portfolio() {
  const { id } = useParams();
  const navigate = useNavigate();

  const pageRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLImageElement>(null);

  const [activeFilter, setActiveFilter] = useState("all");
  const [fullScreenProject, setFullScreenProject] =
    useState<Project | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTopButton, setShowTopButton] = useState(false);
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState(0);

  /* SYNC URL PARAM :id WITH FULL-SCREEN PROJECT */

  useEffect(() => {
    if (id) {
      const normalized = id.toLowerCase();
      const match = projects.find(
        (p) =>
          p.id === normalized ||
          p.slug === normalized ||
          (normalized.includes("palm") && p.id === "palm-paradise") ||
          (normalized.includes("central") && p.id === "central-tower") ||
          (normalized.includes("adhvik") && p.id === "adhvik-skyline")
      );

      if (match) {
        setFullScreenProject(match);
        setSelectedGalleryIndex(0);
      }
    }
  }, [id]);

  /* FILTER LOGIC */

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projects;

    if (activeFilter === "flats") {
      return projects.filter((p) =>
        p.type.toLowerCase().includes("flat")
      );
    }

    if (activeFilter === "villas") {
      return projects.filter(
        (p) =>
          p.type.toLowerCase().includes("villa") ||
          p.category.toLowerCase().includes("villa")
      );
    }

    if (activeFilter === "ready") {
      return projects.filter((p) =>
        p.status.toLowerCase().includes("ready")
      );
    }

    return projects;
  }, [activeFilter]);

  /* SCROLL PROGRESS TRACKER */

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const height =
        document.documentElement.scrollHeight - window.innerHeight;

      setScrollProgress(height > 0 ? (scrollTop / height) * 100 : 0);
      setShowTopButton(scrollTop > 600);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* LOCK SCROLL ON FULL-SCREEN */

  useEffect(() => {
    document.body.style.overflow = fullScreenProject ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [fullScreenProject]);

  /* KEYBOARD NAVIGATION FOR FULL-SCREEN */

  useEffect(() => {
    if (!fullScreenProject) return;

    const currentIndex = projects.findIndex(
      (p) => p.id === fullScreenProject.id
    );

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeFullScreen();
      } else if (e.key === "ArrowRight") {
        const next = (currentIndex + 1) % projects.length;

        setFullScreenProject(projects[next]);
        setSelectedGalleryIndex(0);

        window.history.replaceState(
          null,
          "",
          `/portfolio/${projects[next].id}`
        );
      } else if (e.key === "ArrowLeft") {
        const prev =
          (currentIndex - 1 + projects.length) % projects.length;

        setFullScreenProject(projects[prev]);
        setSelectedGalleryIndex(0);

        window.history.replaceState(
          null,
          "",
          `/portfolio/${projects[prev].id}`
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [fullScreenProject]);

  /* GSAP ENTRANCE ANIMATIONS */

  useEffect(() => {
    if (!pageRef.current) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-hero-reveal",
        { y: reduceMotion ? 0 : 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: reduceMotion ? 0 : 0.8,
          stagger: reduceMotion ? 0 : 0.08,
          ease: "power3.out",
        }
      );

      gsap.utils
        .toArray<HTMLElement>(".project-card-anim")
        .forEach((card, idx) => {
          gsap.fromTo(
            card,
            { y: reduceMotion ? 0 : 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: reduceMotion ? 0 : 0.7,
              delay: reduceMotion ? 0 : idx * 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                once: true,
              },
            }
          );
        });
    }, pageRef);

    return () => ctx.revert();
  }, [filteredProjects]);

  /* CARD MOUSE TILT */

  const handleCardMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return;

    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

    card.style.transform = `perspective(1200px) rotateX(${y * -1.5}deg) rotateY(${x * 1.5}deg) translateY(-4px)`;
  };

  const handleCardMouseLeave = (event: MouseEvent<HTMLDivElement>) => {
    event.currentTarget.style.transform = "";
  };

  /* OPEN PROJECT IN FULL SCREEN */

  const openFullScreen = (project: Project) => {
    setFullScreenProject(project);
    setSelectedGalleryIndex(0);

    window.history.replaceState(null, "", `/portfolio/${project.id}`);
  };

  /* CLOSE FULL SCREEN */

  const closeFullScreen = () => {
    setFullScreenProject(null);
    window.history.replaceState(null, "", "/portfolio");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleWhatsApp = (project: Project, e?: MouseEvent) => {
    if (e) e.stopPropagation();

    const text = encodeURIComponent(
      `Hello Vardha Builders, I am inquiring about ${project.title} (${project.location}). Please share availability and floor plans.`
    );

    window.open(`https://wa.me/919999999999?text=${text}`, "_blank");
  };

  return (
    <main
      ref={pageRef}
      className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors duration-500"
    >
      {/* SCROLL PROGRESS BAR */}

      <div className="fixed left-0 top-0 z-[110] h-[2px] w-full bg-black/10">
        <div
          className="h-full bg-[var(--gold)] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* HERO SECTION */}

      <section className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden bg-[#0a0b0b] text-white">
        <div className="absolute inset-0">
          <img
            ref={heroImageRef}
            src="/images/projects/central-tower.webp"
            alt="Vardha Builders Architecture"
            className="h-full w-full scale-105 object-cover opacity-45 mix-blend-luminosity transition-transform duration-1000"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0b0b]/90 via-[#0a0b0b]/60 to-[#0a0b0b]" />
          <div className="arch-grid absolute inset-0 opacity-[0.06]" />
        </div>

        {/* HERO TOP BAR */}

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-24 sm:px-8 sm:pt-28 lg:px-12 lg:pt-32">
          <div className="project-hero-reveal flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#c9a66b]" />

              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#d4b57b]">
                Vardha Builders · Portfolio
              </span>
            </div>

            <span className="hidden font-mono text-[8px] uppercase tracking-[0.25em] text-white/40 md:inline">
              Gorakhpur, Uttar Pradesh
            </span>
          </div>
        </div>

        {/* HERO CENTER CONTENT */}

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-8 sm:px-8 sm:py-10 lg:px-12">
          <div className="max-w-5xl">
            <p className="project-hero-reveal font-mono text-[10px] uppercase tracking-[0.3em] text-[#c9a66b]">
              Signature Developments · 2026
            </p>

            <h1 className="project-hero-reveal mt-3 font-display text-[clamp(2.8rem,6.2vw,6.2rem)] font-medium leading-[0.92] tracking-[-0.06em]">
              Architectural Eminence &
              <br />
              <span className="italic text-white/60">
                Premium Living Spaces.
              </span>
            </h1>

            <p className="project-hero-reveal mt-6 max-w-2xl text-xs leading-5 text-white/65 sm:text-sm sm:leading-6">
              Discover a curated portfolio of luxury high-rise apartments,
              iconic commercial towers, and exclusive private villas
              engineered with structural permanence and aesthetic refinement.
            </p>

            <div className="project-hero-reveal mt-7 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="#projects-showcase"
                className="inline-flex items-center gap-3 rounded-full bg-[#c9a66b] px-5 py-3 font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-[#0a0b0b] transition hover:bg-[#e0c28d] sm:px-6"
              >
                Explore Projects
                <ArrowDown size={14} />
              </a>

              <Link
                to="/contact"
                className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-5 py-3 font-mono text-[9px] uppercase tracking-[0.2em] text-white backdrop-blur-sm transition hover:border-[#c9a66b] hover:text-[#c9a66b] sm:px-6"
              >
                Schedule Site Visit
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* HERO BOTTOM TRUST STATS */}

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-6 sm:px-8 sm:pb-8 lg:px-12">
          <div className="project-hero-reveal grid grid-cols-2 gap-x-4 gap-y-5 border-t border-white/10 pt-5 sm:grid-cols-4 sm:gap-5">
            <div>
              <span className="block font-display text-2xl font-semibold text-white sm:text-3xl">
                03
              </span>
              <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/45">
                Flagship Landmarks
              </span>
            </div>

            <div>
              <span className="block font-display text-2xl font-semibold text-[#c9a66b] sm:text-3xl">
                BY ALS
              </span>
              <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/45">
                Architectural Design
              </span>
            </div>

            <div>
              <span className="block font-display text-2xl font-semibold text-white sm:text-3xl">
                100%
              </span>
              <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/45">
                RERA & Vastu Aligned
              </span>
            </div>

            <div>
              <span className="block font-display text-xl font-semibold text-white sm:text-3xl">
                Gorakhpur
              </span>
              <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/45">
                Prime Growth Corridors
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECT SHOWCASE */}

      <section
        id="projects-showcase"
        className="relative scroll-mt-10 px-6 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-[#b08a4a]">
              PROJECTS
            </span>

            <h2 className="mt-3 font-display text-[clamp(2rem,4.5vw,3.75rem)] font-medium tracking-tight text-[var(--text)]">
              Premium Living Spaces
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[var(--text-soft)] sm:text-base">
              Explore our portfolio of luxury residential projects designed
              for modern lifestyles. Click any project to open in full screen.
            </p>
          </div>

          {/* FILTER PILLS */}

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:mt-10">
            {filters.map((f) => {
              const active = activeFilter === f.id;

              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setActiveFilter(f.id)}
                  className={`flex items-center gap-2 rounded-full px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.18em] transition-all sm:px-5 ${
                    active
                      ? "bg-[#171918] text-white shadow-md dark:bg-white dark:text-black"
                      : "border border-[var(--line)] bg-[var(--surface)] text-[var(--text-soft)] hover:border-[var(--gold)] hover:text-[var(--text)]"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      active ? "bg-[#10b981]" : "bg-[var(--line-strong)]"
                    }`}
                  />
                  {f.label}
                </button>
              );
            })}
          </div>

          {/* PROJECT CARDS */}

          <div className="mt-10 grid gap-6 sm:mt-12 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => {
              const isReadyToMove = project.badge
                .toLowerCase()
                .includes("ready");

              return (
                <article
                  key={project.id}
                  onClick={() => openFullScreen(project)}
                  className="project-card-anim group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] shadow-[0_15px_40px_rgba(0,0,0,0.04)] transition-all duration-500 hover:border-[var(--gold)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.14)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.4)]"
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  style={{
                    transition:
                      "transform 0.4s ease-out, box-shadow 0.4s ease-out, border-color 0.3s ease",
                  }}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-40" />

                    <div className="absolute left-4 top-4 z-10">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-white shadow-md ${
                          isReadyToMove ? "bg-[#059669]" : "bg-[#10b981]"
                        }`}
                      >
                        {project.badge}
                      </span>
                    </div>

                    <div className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/40 text-white backdrop-blur-md transition-all group-hover:bg-[#c9a66b] group-hover:text-black">
                      <Maximize2 size={14} />
                    </div>

                    <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[var(--gold)] transition-all duration-500 group-hover:w-full" />
                  </div>

                  {/* CARD CONTENT */}

                  <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                    <div>
                      <h3 className="font-display text-xl font-bold tracking-tight text-[var(--text)] transition-colors group-hover:text-[var(--gold)] sm:text-2xl">
                        {project.title}
                      </h3>

                      <div className="mt-2 flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                        <MapPin
                          size={13}
                          className="shrink-0 text-[#b08a4a]"
                        />
                        <span>{project.location}</span>
                      </div>

                      <div className="mt-3">
                        <span className="inline-block rounded-md bg-[var(--surface-2)] px-2.5 py-1 font-mono text-[8px] uppercase tracking-wider text-[var(--text-soft)]">
                          {project.configuration}
                        </span>
                      </div>

                      <p className="mt-3 line-clamp-2 text-xs leading-5 text-[var(--text-soft)]">
                        {project.description}
                      </p>
                    </div>

                    <div className="mt-6 border-t border-[var(--line)] pt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="block font-mono text-[8px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                            TYPE
                          </span>
                          <span className="mt-1 block font-display text-base font-semibold text-[var(--text)]">
                            {project.type}
                          </span>
                        </div>

                        <div>
                          <span className="block font-mono text-[8px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                            AREA
                          </span>
                          <span className="mt-1 block font-display text-base font-semibold text-[var(--text)]">
                            {project.area}
                          </span>
                        </div>
                      </div>

                      <div className="mt-5 flex items-center gap-2 border-t border-[var(--line)] pt-4">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            openFullScreen(project);
                          }}
                          className="flex min-w-0 flex-1 items-center justify-center gap-2 rounded-xl bg-[var(--dark)] px-3 py-2.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-white transition hover:bg-[var(--gold)] hover:text-black dark:bg-[var(--surface-2)] dark:text-white dark:hover:bg-[var(--gold)] dark:hover:text-black sm:px-4"
                        >
                          Open Full Screen
                          <Maximize2 size={12} />
                        </button>

                        <button
                          type="button"
                          onClick={(e) => handleWhatsApp(project, e)}
                          aria-label={`Chat on WhatsApp about ${project.title}`}
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--surface-2)] text-[#10b981] transition hover:border-[#10b981] hover:bg-[#10b981] hover:text-white"
                        >
                          <MessageCircle size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROJECT COMPARISON */}

      <section className="border-y border-[var(--line)] bg-[var(--surface)] px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-px w-6 bg-[var(--gold)]" />
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[var(--gold)]">
                  Portfolio Comparison
                </span>
              </div>

              <h2 className="mt-2 font-display text-3xl font-medium tracking-tight sm:text-4xl">
                Compare Developments at a Glance
              </h2>
            </div>

            <p className="max-w-md text-xs leading-5 text-[var(--text-soft)]">
              Evaluate carpet dimensions, architectural typologies, and
              location advantages across Vardha Builders flagship offerings.
            </p>
          </div>

          <div className="mt-8 overflow-x-auto sm:mt-10">
            <table className="w-full min-w-[700px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[var(--line-strong)]">
                  <th className="py-4 font-mono text-[9px] uppercase tracking-wider text-[var(--text-muted)]">
                    Specification
                  </th>

                  {projects.map((p) => (
                    <th
                      key={p.id}
                      className="py-4 font-display text-lg font-semibold text-[var(--text)]"
                    >
                      {p.title}
                      <span className="ml-2 rounded bg-[#059669]/15 px-2 py-0.5 font-mono text-[8px] font-bold text-[#059669]">
                        {p.badge}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-[var(--line)] text-sm">
                <tr>
                  <td className="py-4 font-mono text-[9px] uppercase tracking-wider text-[var(--text-muted)]">
                    Typology
                  </td>
                  {projects.map((p) => (
                    <td
                      key={p.id}
                      className="py-4 font-medium text-[var(--text)]"
                    >
                      {p.configuration}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="py-4 font-mono text-[9px] uppercase tracking-wider text-[var(--text-muted)]">
                    Super / Carpet Area
                  </td>
                  {projects.map((p) => (
                    <td
                      key={p.id}
                      className="py-4 font-semibold text-[var(--gold)]"
                    >
                      {p.area}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="py-4 font-mono text-[9px] uppercase tracking-wider text-[var(--text-muted)]">
                    Prime Location
                  </td>
                  {projects.map((p) => (
                    <td key={p.id} className="py-4 text-[var(--text-soft)]">
                      {p.location}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="py-4 font-mono text-[9px] uppercase tracking-wider text-[var(--text-muted)]">
                    Development Status
                  </td>
                  {projects.map((p) => (
                    <td key={p.id} className="py-4">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#059669]">
                        <CheckCircle2 size={13} />
                        {p.status}
                      </span>
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="py-4 font-mono text-[9px] uppercase tracking-wider text-[var(--text-muted)]">
                    Design Partner
                  </td>
                  {projects.map((p) => (
                    <td
                      key={p.id}
                      className="py-4 font-mono text-xs text-[var(--text)]"
                    >
                      By ALS
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="py-4 font-mono text-[9px] uppercase tracking-wider text-[var(--text-muted)]">
                    Action
                  </td>
                  {projects.map((p) => (
                    <td key={p.id} className="py-4">
                      <button
                        type="button"
                        onClick={() => openFullScreen(p)}
                        className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-[var(--gold)] hover:underline"
                      >
                        Open Full Screen
                        <Maximize2 size={11} />
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ARCHITECTURAL PRINCIPLES */}

      <section className="px-6 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-[var(--gold)]">
              Engineering Principles
            </span>

            <h2 className="mt-3 font-display text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl">
              Structures engineered for generations.
            </h2>

            <p className="mt-4 text-sm leading-6 text-[var(--text-soft)]">
              From foundation soil compaction to precision exterior cladding,
              every Vardha Builders development adheres to rigorous structural
              integrity and environmental design standards.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:mt-14 lg:grid-cols-4 lg:gap-8">
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 transition-all hover:border-[var(--gold)] sm:p-6">
              <ShieldCheck size={26} className="text-[#059669]" />
              <h3 className="mt-4 font-display text-xl font-medium">
                Seismic RCC Frames
              </h3>
              <p className="mt-2 text-xs leading-5 text-[var(--text-soft)]">
                Engineered with high-grade Fe550 steel and M30+ concrete mixes
                to endure seismic stress and heavy wind shear.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 transition-all hover:border-[var(--gold)] sm:p-6">
              <Compass size={26} className="text-[var(--gold)]" />
              <h3 className="mt-4 font-display text-xl font-medium">
                100% Vastu Orientation
              </h3>
              <p className="mt-2 text-xs leading-5 text-[var(--text-soft)]">
                Layouts optimized for cross ventilation, natural sunlight
                corridors, and positive spatial energy flow.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 transition-all hover:border-[var(--gold)] sm:p-6">
              <Layers size={26} className="text-[var(--gold)]" />
              <h3 className="mt-4 font-display text-xl font-medium">
                Bespoke Finishes
              </h3>
              <p className="mt-2 text-xs leading-5 text-[var(--text-soft)]">
                Imported porcelain tiling, high-acoustic double glazed
                windows, and precision plumbing infrastructure.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 transition-all hover:border-[var(--gold)] sm:p-6">
              <Sparkles size={26} className="text-[#059669]" />
              <h3 className="mt-4 font-display text-xl font-medium">
                By ALS Partnership
              </h3>
              <p className="mt-2 text-xs leading-5 text-[var(--text-soft)]">
                Signature contemporary facade designs that become prominent
                architectural landmarks in Gorakhpur.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SITE VISIT CTA */}

      <section className="relative overflow-hidden bg-[#0c0d0d] px-6 py-20 text-white sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <div className="arch-grid absolute inset-0 opacity-[0.05]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-10">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#c9a66b]">
                Private Walkthrough & Consultation
              </span>

              <h2 className="mt-4 font-display text-3xl font-medium leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl">
                Ready to experience Vardha living spaces in person?
              </h2>

              <p className="mt-5 max-w-xl text-xs leading-6 text-white/65 sm:text-sm">
                Schedule an exclusive site visit to Paalm Paradise, Central
                Tower, or Adhvik Skyline. Our project specialists will guide
                you through sample units, layout schematics, and payment
                schedules.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-4">
                <button
                  type="button"
                  onClick={() => handleWhatsApp(projects[0])}
                  className="inline-flex items-center gap-2.5 rounded-full bg-[#059669] px-5 py-3.5 font-mono text-[10px] font-bold uppercase tracking-wider text-white shadow-lg transition hover:bg-[#047857] sm:px-6"
                >
                  <MessageCircle size={16} />
                  Inquire on WhatsApp
                </button>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-5 py-3.5 font-mono text-[10px] uppercase tracking-wider text-white backdrop-blur-sm transition hover:border-[#c9a66b] hover:text-[#c9a66b] sm:px-6"
                >
                  Book Private Site Visit
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md sm:p-8">
              <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#c9a66b]">
                Sales & Site Office
              </span>

              <h3 className="mt-2 font-display text-2xl font-medium text-white">
                Vardha Builders Desk
              </h3>

              <p className="mt-2 text-xs leading-5 text-white/60">
                Golghar & Prime Gorakhpur Locations, Uttar Pradesh
              </p>

              <div className="mt-6 space-y-3 border-t border-white/10 pt-4 text-xs text-white/80">
                <div className="flex items-center gap-2.5">
                  <Phone size={14} className="text-[#c9a66b]" />
                  <span>Call Us: +91 99999 99999</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <MapPin size={14} className="text-[#c9a66b]" />
                  <span>Gorakhpur, Uttar Pradesh, India</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FULL-SCREEN PROJECT EXPERIENCE */}

      {fullScreenProject && (
        <div
          className="fixed inset-0 z-[200] flex h-[100dvh] w-screen flex-col overflow-hidden bg-[#090a0a] text-white"
          role="dialog"
          aria-modal="true"
          aria-label={`${fullScreenProject.title} full screen view`}
        >
          {/* HEADER */}

          <header className="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-white/10 bg-[#090a0a]/95 px-3 backdrop-blur-md sm:px-8">
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              <span className="h-px w-5 shrink-0 bg-[#c9a66b] sm:w-6" />

              <span className="whitespace-nowrap font-mono text-[8px] uppercase tracking-[0.2em] text-[#c9a66b] sm:text-[9px] sm:tracking-[0.25em]">
                Vardha Builders
              </span>

              <span className="hidden text-white/30 sm:inline">/</span>

              <span className="hidden truncate font-display text-sm font-semibold sm:inline">
                {fullScreenProject.title}
              </span>

              <span className="hidden rounded-md bg-[#059669] px-2.5 py-0.5 font-mono text-[8px] font-bold uppercase tracking-wider text-white sm:inline-block">
                {fullScreenProject.badge}
              </span>
            </div>

            {/* PROJECT SWITCHER */}

            <div className="hidden items-center gap-2 md:flex">
              {projects.map((p) => {
                const isSelected = p.id === fullScreenProject.id;

                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setFullScreenProject(p);
                      setSelectedGalleryIndex(0);

                      window.history.replaceState(
                        null,
                        "",
                        `/portfolio/${p.id}`
                      );
                    }}
                    className={`rounded-full px-4 py-1.5 font-mono text-[9px] uppercase tracking-wider transition ${
                      isSelected
                        ? "bg-[#c9a66b] font-bold text-black"
                        : "border border-white/15 text-white/70 hover:border-white hover:text-white"
                    }`}
                  >
                    {p.title}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={closeFullScreen}
              aria-label="Close full screen project"
              className="flex shrink-0 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 font-mono text-[9px] font-semibold uppercase tracking-wider text-white transition hover:border-[#c9a66b] hover:bg-[#c9a66b] hover:text-black sm:px-4"
            >
              <span>Close</span>
              <X size={15} />
              <span className="hidden text-[8px] opacity-60 sm:inline">
                [ESC]
              </span>
            </button>
          </header>

          {/* MAIN SPLIT VIEW */}

          <div className="grid min-h-0 flex-1 grid-cols-1 overflow-y-auto lg:grid-cols-[1.35fr_0.65fr] lg:overflow-hidden">
            {/* IMAGE GALLERY */}

            <div className="relative flex min-h-[45vh] flex-col justify-between overflow-hidden bg-black p-3 sm:p-5 lg:min-h-0 lg:p-8">
              <div className="relative flex min-h-[35vh] flex-1 items-center justify-center overflow-hidden rounded-xl sm:min-h-[45vh] lg:min-h-0">
                <img
                  src={
                    fullScreenProject.gallery[selectedGalleryIndex] ||
                    fullScreenProject.image
                  }
                  alt={fullScreenProject.title}
                  className="absolute inset-0 h-full w-full object-cover transition-all duration-500"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30" />

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 text-white/90">
                  <div className="flex min-w-0 items-center gap-2 font-mono text-[9px] uppercase tracking-wider">
                    <MapPin size={12} className="shrink-0 text-[#c9a66b]" />
                    <span className="truncate">{fullScreenProject.location}</span>
                  </div>

                  <span className="shrink-0 font-mono text-[9px] uppercase tracking-wider text-white/70">
                    Photo {selectedGalleryIndex + 1} of{" "}
                    {fullScreenProject.gallery.length}
                  </span>
                </div>

                {fullScreenProject.gallery.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedGalleryIndex(
                          (prev) =>
                            (prev - 1 + fullScreenProject.gallery.length) %
                            fullScreenProject.gallery.length
                        )
                      }
                      aria-label="Previous image"
                      className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition hover:bg-[#c9a66b] hover:text-black"
                    >
                      <ChevronLeft size={20} />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedGalleryIndex(
                          (prev) =>
                            (prev + 1) % fullScreenProject.gallery.length
                        )
                      }
                      aria-label="Next image"
                      className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition hover:bg-[#c9a66b] hover:text-black"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
              </div>

              {/* THUMBNAILS */}

              {fullScreenProject.gallery.length > 1 && (
                <div className="mt-3 flex gap-3 overflow-x-auto pb-1 sm:mt-4">
                  {fullScreenProject.gallery.map((img, idx) => (
                    <button
                      key={`${img}-${idx}`}
                      type="button"
                      onClick={() => setSelectedGalleryIndex(idx)}
                      className={`relative h-12 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition sm:h-14 sm:w-20 ${
                        selectedGalleryIndex === idx
                          ? "scale-105 border-[#c9a66b]"
                          : "border-white/20 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={img}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* PROJECT DETAILS */}

            <aside className="flex min-h-0 flex-col justify-between overflow-y-auto border-t border-white/10 bg-[#0e1010] p-5 sm:p-7 lg:border-l lg:border-t-0 lg:p-10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#c9a66b]">
                    {fullScreenProject.category} · By ALS
                  </span>
                </div>

                <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {fullScreenProject.title}
                </h2>

                <div className="mt-2 flex items-center gap-2 text-xs text-white/60">
                  <MapPin size={13} className="text-[#c9a66b]" />
                  <span>{fullScreenProject.location}</span>
                </div>

                <p className="mt-4 text-xs leading-6 text-white/70">
                  {fullScreenProject.description}
                </p>

                {/* SPECS */}

                <div className="mt-5 grid grid-cols-2 gap-3 border-y border-white/10 py-4 sm:mt-6 sm:py-5">
                  <div className="rounded-lg bg-white/5 p-3">
                    <span className="block font-mono text-[8px] uppercase tracking-wider text-white/40">
                      TYPE
                    </span>
                    <span className="font-display text-lg font-semibold text-white">
                      {fullScreenProject.type}
                    </span>
                  </div>

                  <div className="rounded-lg bg-white/5 p-3">
                    <span className="block font-mono text-[8px] uppercase tracking-wider text-white/40">
                      AREA
                    </span>
                    <span className="font-display text-lg font-semibold text-[#c9a66b]">
                      {fullScreenProject.area}
                    </span>
                  </div>

                  <div className="rounded-lg bg-white/5 p-3">
                    <span className="block font-mono text-[8px] uppercase tracking-wider text-white/40">
                      CONFIGURATION
                    </span>
                    <span className="text-xs font-medium text-white/90">
                      {fullScreenProject.configuration}
                    </span>
                  </div>

                  <div className="rounded-lg bg-white/5 p-3">
                    <span className="block font-mono text-[8px] uppercase tracking-wider text-white/40">
                      STATUS
                    </span>
                    <span className="text-xs font-semibold text-[#059669]">
                      {fullScreenProject.status}
                    </span>
                  </div>
                </div>

                {/* HIGHLIGHTS */}

                <div className="mt-5">
                  <span className="block font-mono text-[8px] uppercase tracking-wider text-white/40">
                    Architectural Highlights
                  </span>

                  <div className="mt-3 space-y-2">
                    {fullScreenProject.highlights.map((h) => (
                      <div
                        key={h}
                        className="flex items-center gap-2 text-xs text-white/85"
                      >
                        <CheckCircle2
                          size={14}
                          className="shrink-0 text-[#059669]"
                        />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AMENITIES */}

                <div className="mt-5">
                  <span className="block font-mono text-[8px] uppercase tracking-wider text-white/40">
                    Amenities & Facilities
                  </span>

                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {fullScreenProject.amenities.map((a) => (
                      <span
                        key={a}
                        className="rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-[8px] uppercase tracking-wider text-white/80"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* ACTION BUTTONS */}

              <div className="mt-7 space-y-3 border-t border-white/10 pt-5 sm:mt-8">
                <button
                  type="button"
                  onClick={(e) => handleWhatsApp(fullScreenProject, e)}
                  className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#059669] px-4 py-3.5 font-mono text-[10px] font-bold uppercase tracking-wider text-white shadow-lg transition hover:bg-[#047857] sm:px-5"
                >
                  <MessageCircle size={16} />
                  Chat on WhatsApp for Availability
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/contact"
                    onClick={closeFullScreen}
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-3 py-3 font-mono text-[9px] uppercase tracking-wider text-white transition hover:border-[#c9a66b] hover:text-[#c9a66b]"
                  >
                    Schedule Visit
                    <ArrowUpRight size={13} />
                  </Link>

                  <Link
                    to="/floor-plans"
                    onClick={closeFullScreen}
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-3 py-3 font-mono text-[9px] uppercase tracking-wider text-white transition hover:border-[#c9a66b] hover:text-[#c9a66b]"
                  >
                    <FileText size={13} />
                    Floor Plans
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      )}

      {/* BACK TO TOP */}

      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`fixed bottom-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--text)] shadow-xl transition-all duration-300 sm:bottom-6 sm:right-6 ${
          showTopButton
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <ArrowUpRight size={16} className="-rotate-45" />
      </button>
    </main>
  );
}
