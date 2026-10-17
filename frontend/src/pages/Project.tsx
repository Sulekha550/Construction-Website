
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

import staticProjects, { type Project } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/+$/, "");

const filters = [
  { id: "all", label: "All Projects" },
  { id: "flats", label: "Flats & Apartments" },
  { id: "villas", label: "Luxury Villas" },
  { id: "ready", label: "Ready to Move" },
];

type ApiProject = {
  _id?: string;
  id?: string;
  slug?: string;
  title?: string;
  name?: string;
  badge?: string;
  location?: string;
  category?: string;
  type?: string;
  area?: string;
  status?: string;
  year?: string | number;
  configuration?: string;
  highlights?: string[];
  description?: string;
  image?: string;
  gallery?: string[];
  amenities?: string[];
  stats?: { label: string; value: string }[];
  tags?: string[];
  price?: string;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function normalizeProject(item: ApiProject): Project {
  const title = String(item.title || item.name || "Untitled Project");
  const slug = String(item.slug || slugify(title));
  const category = String(item.category || "Residential");
  const status = String(item.status || "Ongoing");

  const gallery = Array.isArray(item.gallery)
    ? item.gallery.filter(
        (image): image is string => typeof image === "string" && !!image.trim()
      )
    : [];

  const image = String(item.image || gallery[0] || "");

  const type =
    item.type ||
    (category.toLowerCase().includes("villa") ? "Villas" : "Flats");

  return {
    id: String(item._id || item.id || slug),
    slug,
    title,
    name: String(item.name || title),
    badge:
      item.badge ||
      (status.toLowerCase().includes("ready")
        ? "READY TO MOVE"
        : status.toUpperCase()),
    location: String(item.location || "Gorakhpur, Uttar Pradesh"),
    category,
    type: String(type),
    area: String(item.area || "Contact for details"),
    status,
    year: String(item.year || new Date().getFullYear()), 
    configuration: String(
      item.configuration || "Contact for configuration"
    ),
    highlights: Array.isArray(item.highlights)
      ? item.highlights
      : Array.isArray(item.tags)
        ? item.tags
        : [],
    description: String(item.description || ""),
    image,
    gallery: gallery.length ? gallery : image ? [image] : [],
    amenities: Array.isArray(item.amenities) ? item.amenities : [],
    stats: Array.isArray(item.stats) ? item.stats : [],
    tags: Array.isArray(item.tags) ? item.tags : [],
    ...(item.price ? { price: String(item.price) } : {}),
  };
}
 

function combineProjects(
  apiProjects: Project[],
  fallbackProjects: Project[]
): Project[] {
  const combined = [...apiProjects, ...fallbackProjects];
  const seen = new Set<string>();

  return combined.filter((project) => {
    const title = (project.title || project.name || "")
      .toLowerCase()
      .trim();

    const slug = (project.slug || "").toLowerCase().trim();
    const id = (project.id || "").toLowerCase().trim();

    // Remove Green Valley Homes from API and static projects
    const isGreenValley =
      title.includes("green valley") ||
      slug.includes("green-valley") ||
      slug.includes("green valley") ||
      id.includes("green-valley") ||
      id.includes("green valley");

    if (isGreenValley) return false;

    // Prevent duplicate projects
    const key = slug || id || title;

    if (seen.has(key)) return false;

    seen.add(key);
    return true;
  });
}

export default function Portfolio() {
  const { id } = useParams();
  const navigate = useNavigate();

  const pageRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLImageElement>(null);

  const [projects, setProjects] = useState<Project[]>(staticProjects);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projectsError, setProjectsError] = useState("");

  const [activeFilter, setActiveFilter] = useState("all");
  const [fullScreenProject, setFullScreenProject] =
    useState<Project | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTopButton, setShowTopButton] = useState(false);
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState(0);

  /* LOAD PROJECTS FROM MONGODB API */

  useEffect(() => {
    const controller = new AbortController();

    async function loadProjects() {
      try {
        setProjectsError("");

        const response = await fetch(`${API_URL}/projects`, {
          signal: controller.signal,
        });

        const result = await response.json();

        if (!response.ok || result.success === false) {
          throw new Error(result.message || "Unable to load projects.");
        }

        const records: ApiProject[] = Array.isArray(result)
          ? result
          : Array.isArray(result.data)
            ? result.data
            : Array.isArray(result.projects)
              ? result.projects
              : Array.isArray(result.data?.projects)
                ? result.data.projects  
                : [];

        const apiProjects = records.map(normalizeProject);

        // Use API records first, then retain old static projects not present in API.
        setProjects(combineProjects(apiProjects, staticProjects));
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        console.error("Portfolio API error:", error);
        setProjects(combineProjects([], staticProjects)); 
        setProjectsError(
          "Showing saved portfolio projects because the server could not be reached."
        );
      } finally { 
        if (!controller.signal.aborted) {
          setProjectsLoading(false);
        }
      }
    }

    void loadProjects();

    return () => controller.abort();
  }, []);

  /* SYNC URL PARAM WITH PROJECT */

  useEffect(() => {
    if (!id || projects.length === 0) return;

    const normalized = id.toLowerCase();

    const match = projects.find(
      (project) =>
        project.id.toLowerCase() === normalized ||
        project.slug.toLowerCase() === normalized ||
        (normalized.includes("palm") &&
          project.slug.toLowerCase().includes("palm")) ||
        (normalized.includes("central") &&
          project.slug.toLowerCase().includes("central")) ||
        (normalized.includes("adhvik") &&
          project.slug.toLowerCase().includes("adhvik"))
    );

    if (match) {
      setFullScreenProject(match);
      setSelectedGalleryIndex(0);
    }
  }, [id, projects]);

  /* FILTER LOGIC */

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projects;

    if (activeFilter === "flats") {
      return projects.filter((project) => {
        const type = project.type.toLowerCase();
        const category = project.category.toLowerCase();
        const configuration = project.configuration.toLowerCase();

        return (
          type.includes("flat") ||
          type.includes("apartment") ||
          category.includes("residential") ||
          configuration.includes("bhk")
        );
      });
    }

    if (activeFilter === "villas") {
      return projects.filter(
        (project) =>
          project.type.toLowerCase().includes("villa") ||
          project.category.toLowerCase().includes("villa") ||
          project.configuration.toLowerCase().includes("villa")
      );
    }

    if (activeFilter === "ready") {
      return projects.filter(
        (project) =>
          project.status.toLowerCase().includes("ready") ||
          project.badge.toLowerCase().includes("ready")
      );
    }

    return projects;
  }, [activeFilter, projects]);

  /* SCROLL PROGRESS */

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const height =
        document.documentElement.scrollHeight - window.innerHeight;

      setScrollProgress(height > 0 ? (scrollTop / height) * 100 : 0);
      setShowTopButton(scrollTop > 600);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* LOCK SCROLL ON FULL SCREEN */

  useEffect(() => {
    document.body.style.overflow = fullScreenProject ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [fullScreenProject]);

  /* CLOSE PROJECT AND KEYBOARD NAVIGATION */

  const closeFullScreen = () => {
    setFullScreenProject(null);
    navigate("/portfolio", { replace: true });
  };

  useEffect(() => {
    if (!fullScreenProject || projects.length === 0) return;

    const currentIndex = projects.findIndex(
      (project) => project.id === fullScreenProject.id
    );

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeFullScreen();
      }

      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        if (currentIndex < 0) return;

        const direction = event.key === "ArrowRight" ? 1 : -1;
        const nextIndex =
          (currentIndex + direction + projects.length) % projects.length;

        const nextProject = projects[nextIndex];

        setFullScreenProject(nextProject);
        setSelectedGalleryIndex(0);
        navigate(`/portfolio/${nextProject.slug}`, { replace: true });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [fullScreenProject, projects, navigate]);

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
        .forEach((card, index) => {
          gsap.fromTo(
            card,
            { y: reduceMotion ? 0 : 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: reduceMotion ? 0 : 0.7,
              delay: reduceMotion ? 0 : index * 0.1,
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

  /* OPEN PROJECT */

  const openFullScreen = (project: Project) => {
    setFullScreenProject(project);
    setSelectedGalleryIndex(0);
    navigate(`/portfolio/${project.slug}`, { replace: true });
  };

  /* WHATSAPP */

  const handleWhatsApp = (project: Project, event?: MouseEvent) => {
    event?.stopPropagation();

    const text = encodeURIComponent(
      `Hello Vardha Builders, I am inquiring about ${project.title} (${project.location}). Please share availability and floor plans.`
    );

    window.open(`https://wa.me/919999999999?text=${text}`, "_blank", "noopener,noreferrer");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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

      {/* HERO */}

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

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-24 sm:px-8 sm:pt-28 lg:px-12 lg:pt-32">
          <div className="project-hero-reveal flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[var(--gold)]" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--gold)]">
                Vardha Builders · Portfolio
              </span>
            </div>

            <span className="hidden font-mono text-xs uppercase tracking-[0.15em] text-white/70 md:inline">
              Gorakhpur, Uttar Pradesh
            </span>
          </div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-8 sm:px-8 sm:py-10 lg:px-12">
          <div className="max-w-5xl">
            <p className="project-hero-reveal font-mono text-xs uppercase tracking-[0.2em] text-[var(--gold)]">
              Signature Developments · 2026
            </p>

            <h1 className="project-hero-reveal mt-3 font-display text-[clamp(2.8rem,6.2vw,6.2rem)] font-medium leading-[0.92] tracking-[-0.06em]">
              Architectural Eminence &
              <br />
              <span className="italic text-white/70">
                Premium Living Spaces.
              </span>
            </h1>

            <p className="project-hero-reveal mt-6 max-w-2xl text-sm leading-6 text-white/75 sm:text-base">
              Discover a curated portfolio of luxury high-rise apartments,
              iconic commercial towers, and exclusive private villas
              engineered with structural permanence and aesthetic refinement.
            </p>

            <div className="project-hero-reveal mt-7 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="#projects-showcase"
                className="inline-flex items-center gap-2.5 rounded-full bg-[var(--gold)] px-6 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-[#0a0b0b] transition hover:bg-[var(--gold-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
              >
                <span>Explore Projects</span>
                <ArrowDown size={14} />
              </a>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-6 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm transition hover:border-[var(--gold)] hover:text-[var(--gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
              >
                <span>Schedule Site Visit</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-6 sm:px-8 sm:pb-8 lg:px-12">
          <div className="project-hero-reveal grid grid-cols-2 gap-x-4 gap-y-5 border-t border-white/10 pt-5 sm:grid-cols-4 sm:gap-5">
            <div>
              <span className="block font-display text-2xl font-semibold text-white sm:text-3xl">
                {String(projects.length).padStart(2, "0")}
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-white/70">
                Portfolio Projects
              </span>
            </div>

            <div>
              <span className="block font-display text-2xl font-semibold text-[var(--gold)] sm:text-3xl">
                BY ALS
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-white/70">
                Architectural Design
              </span>
            </div>

            <div>
              <span className="block font-display text-2xl font-semibold text-white sm:text-3xl">
                100%
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-white/70">
                Design Focus
              </span>
            </div>

            <div>
              <span className="block font-display text-xl font-semibold text-white sm:text-3xl">
                Gorakhpur
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-white/70">
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
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
              PROJECTS
            </span>

            <h2 className="mt-3 font-display text-[clamp(2rem,4.5vw,3.75rem)] font-medium tracking-tight text-[var(--text)]">
              Premium Living Spaces
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[var(--text-soft)] sm:text-base">
              Explore our portfolio of luxury residential projects designed
              for modern lifestyles. Click any project to open in full screen.
            </p>

            {projectsError && (
              <p className="mx-auto mt-4 max-w-xl text-xs text-[var(--text-soft)]">
                {projectsError}
              </p>
            )}
          </div>

          {/* FILTER PILLS */}

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:mt-10">
            {filters.map((filter) => {
              const active = activeFilter === filter.id;

              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  className={`flex items-center gap-2 rounded-full px-5 py-2.5 font-mono text-xs uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] sm:px-6 ${
                    active
                      ? "bg-[#171918] font-semibold text-white shadow-md dark:bg-white dark:text-black"
                      : "border border-[var(--line)] bg-[var(--surface)] text-[var(--text-soft)] hover:border-[var(--gold)] hover:text-[var(--text)]"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      active ? "bg-[#10b981]" : "bg-[var(--line-strong)]"
                    }`}
                  />
                  {filter.label}
                </button>
              );
            })}
          </div>

          {projectsLoading && (
            <p className="mt-8 text-center text-xs text-[var(--text-soft)]">
              Checking latest projects…
            </p>
          )}

          {/* PROJECT CARDS */}

          <div className="mt-10 grid gap-6 sm:mt-12 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => {
              const isReadyToMove =
                project.badge.toLowerCase().includes("ready") ||
                project.status.toLowerCase().includes("ready");

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
                      src={project.image || "/images/projects/central-tower.webp"}
                      alt={project.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-40" />

                    <div className="absolute left-4 top-4 z-10">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-md ${
                          isReadyToMove ? "bg-emerald-600" : "bg-[#10b981]"
                        }`}
                      >
                        {project.badge}
                      </span>
                    </div>

                    <div className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/40 text-white backdrop-blur-md transition-all group-hover:bg-[var(--gold)] group-hover:text-black">
                      <Maximize2 size={14} />
                    </div>

                    <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[var(--gold)] transition-all duration-500 group-hover:w-full" />
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                    <div>
                      <h3 className="font-display text-xl font-bold tracking-tight text-[var(--text)] transition-colors group-hover:text-[var(--gold)] sm:text-2xl">
                        {project.title}
                      </h3>

                      <div className="mt-2 flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                        <MapPin size={13} className="shrink-0 text-[var(--gold)]" />
                        <span>{project.location}</span>
                      </div>

                      <div className="mt-3">
                        <span className="inline-block rounded-md bg-[var(--surface-2)] px-2.5 py-1 font-mono text-xs uppercase tracking-wider text-[var(--text-soft)]">
                          {project.configuration}
                        </span>
                      </div>

                      <p className="mt-3 line-clamp-2 text-xs leading-5 text-[var(--text-soft)] sm:text-sm">
                        {project.description}
                      </p>
                    </div>

                    <div className="mt-6 border-t border-[var(--line)] pt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="block font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
                            TYPE
                          </span>
                          <span className="mt-1 block font-display text-base font-semibold text-[var(--text)]">
                            {project.type}
                          </span>
                        </div>

                        <div>
                          <span className="block font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
                            AREA
                          </span>
                          <span className="mt-1 block font-display text-base font-semibold text-[var(--text)]">
                            {project.area}
                          </span>
                        </div>
                      </div>

                      <div className="mt-5 flex flex-col gap-2.5 border-t border-[var(--line)] pt-4 sm:flex-row sm:items-center">
                        <button
                          type="button"
                          onClick={(event) => handleWhatsApp(project, event)}
                          aria-label={`Enquire on WhatsApp about ${project.title}`}
                          className="inline-flex min-h-[42px] flex-1 items-center justify-center gap-2 rounded-xl bg-[#10b981] px-4 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition hover:bg-[#059669] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981]"
                        >
                          <MessageCircle size={15} />
                          <span>Enquire on WhatsApp</span>
                        </button>

                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            openFullScreen(project);
                          }}
                          aria-label={`Open full screen view for ${project.title}`}
                          className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-xl border border-[var(--line)] bg-[var(--surface-2)] px-3.5 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text)] transition hover:border-[var(--gold)] hover:text-[var(--gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
                        >
                          <Maximize2 size={13} />
                          <span>Full Screen</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {!projectsLoading && filteredProjects.length === 0 && (
            <div className="mt-10 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-8 text-center">
              <p className="text-sm text-[var(--text-soft)]">
                No projects match this filter.
              </p>
              <button
                type="button"
                onClick={() => setActiveFilter("all")}
                className="mt-4 rounded-full bg-[var(--gold)] px-6 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-black transition hover:bg-[var(--gold-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
              >
                View All Projects
              </button>
            </div>
          )}
        </div>
      </section>

      {/* PROJECT COMPARISON */}

      <section className="border-y border-[var(--line)] bg-[var(--surface)] px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-px w-6 bg-[var(--gold)]" />
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--gold)]">
                  Portfolio Comparison
                </span>
              </div>

              <h2 className="mt-2 font-display text-3xl font-medium tracking-tight sm:text-4xl">
                Compare Developments at a Glance
              </h2>
            </div>

            <p className="max-w-md text-xs leading-5 text-[var(--text-soft)] sm:text-sm sm:leading-6">
              Evaluate carpet dimensions, architectural typologies, and
              location advantages across Vardha Builders flagship offerings.
            </p>
          </div>

          <div className="mt-8 overflow-x-auto rounded-xl border border-[var(--line)] sm:mt-10">
            <table className="w-full min-w-[700px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[var(--line-strong)] bg-[var(--surface-2)]/60">
                  <th className="py-5 px-5 font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-soft)]">
                    Specification
                  </th>

                  {projects.map((project) => (
                    <th
                      key={project.id}
                      className="py-5 px-5 font-display text-lg font-semibold text-[var(--text)]"
                    >
                      <span>{project.title}</span>
                      <span className="ml-2.5 inline-block rounded bg-emerald-500/15 px-2 py-0.5 font-mono text-xs font-semibold text-emerald-400">
                        {project.badge}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-[var(--line)]">
                <tr className="transition-colors hover:bg-white/[0.02]">
                  <td className="py-5 px-5 font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-soft)]">
                    Typology
                  </td>
                  {projects.map((project) => (
                    <td key={project.id} className="py-5 px-5 text-sm font-medium text-[var(--text)]">
                      {project.configuration}
                    </td>
                  ))}
                </tr>

                <tr className="transition-colors hover:bg-white/[0.02]">
                  <td className="py-5 px-5 font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-soft)]">
                    Super / Carpet Area
                  </td>
                  {projects.map((project) => (
                    <td key={project.id} className="py-5 px-5 text-sm font-semibold text-[var(--gold)]">
                      {project.area}
                    </td>
                  ))}
                </tr>

                <tr className="transition-colors hover:bg-white/[0.02]">
                  <td className="py-5 px-5 font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-soft)]">
                    Prime Location
                  </td>
                  {projects.map((project) => (
                    <td key={project.id} className="py-5 px-5 text-sm text-[var(--text-soft)]">
                      {project.location}
                    </td>
                  ))}
                </tr>

                <tr className="transition-colors hover:bg-white/[0.02]">
                  <td className="py-5 px-5 font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-soft)]">
                    Development Status
                  </td>
                  {projects.map((project) => (
                    <td key={project.id} className="py-5 px-5">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                        <CheckCircle2 size={14} />
                        {project.status}
                      </span>
                    </td>
                  ))}
                </tr>

                <tr className="transition-colors hover:bg-white/[0.02]">
                  <td className="py-5 px-5 font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-soft)]">
                    Design Partner
                  </td>
                  {projects.map((project) => (
                    <td key={project.id} className="py-5 px-5 font-mono text-xs text-[var(--text)]">
                      By ALS
                    </td>
                  ))}
                </tr>

                <tr className="transition-colors hover:bg-white/[0.02]">
                  <td className="py-5 px-5 font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-soft)]">
                    Action
                  </td>
                  {projects.map((project) => (
                    <td key={project.id} className="py-5 px-5">
                      <button
                        type="button"
                        onClick={() => openFullScreen(project)}
                        aria-label={`Open full screen view for ${project.title}`}
                        className="inline-flex items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--surface-2)] px-3.5 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text)] transition hover:border-[var(--gold)] hover:text-[var(--gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
                      >
                        <Maximize2 size={13} />
                        <span>Open Full Screen</span>
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
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--gold)]">
              Engineering Principles
            </span>

            <h2 className="mt-3 font-display text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl">
              Structures engineered for generations.
            </h2>

            <p className="mt-4 text-sm leading-6 text-[var(--text-soft)] sm:text-base sm:leading-7">
              From foundation soil compaction to precision exterior cladding,
              every Vardha Builders development adheres to rigorous structural
              integrity and environmental design standards.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:mt-14 lg:grid-cols-4 lg:gap-8">
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 transition-all hover:border-[var(--gold)] sm:p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--gold)]/30 bg-[var(--gold)]/10 text-[var(--gold)] shadow-sm">
                <ShieldCheck size={24} strokeWidth={1.8} aria-hidden="true" />
              </div>
              <h3 className="mt-5 font-display text-xl font-medium text-[var(--text)]">
                Seismic RCC Frames
              </h3>
              <p className="mt-2 text-xs leading-5 text-[var(--text-soft)] sm:text-sm sm:leading-6">
                Engineered with high-grade Fe550 steel and M30+ concrete mixes
                to endure seismic stress and heavy wind shear.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 transition-all hover:border-[var(--gold)] sm:p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--gold)]/30 bg-[var(--gold)]/10 text-[var(--gold)] shadow-sm">
                <Compass size={24} strokeWidth={1.8} aria-hidden="true" />
              </div>
              <h3 className="mt-5 font-display text-xl font-medium text-[var(--text)]">
                100% Vastu Orientation
              </h3>
              <p className="mt-2 text-xs leading-5 text-[var(--text-soft)] sm:text-sm sm:leading-6">
                Layouts optimized for cross ventilation, natural sunlight
                corridors, and positive spatial energy flow.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 transition-all hover:border-[var(--gold)] sm:p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--gold)]/30 bg-[var(--gold)]/10 text-[var(--gold)] shadow-sm">
                <Layers size={24} strokeWidth={1.8} aria-hidden="true" />
              </div>
              <h3 className="mt-5 font-display text-xl font-medium text-[var(--text)]">
                Bespoke Finishes
              </h3>
              <p className="mt-2 text-xs leading-5 text-[var(--text-soft)] sm:text-sm sm:leading-6">
                Imported porcelain tiling, high-acoustic double glazed
                windows, and precision plumbing infrastructure.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 transition-all hover:border-[var(--gold)] sm:p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--gold)]/30 bg-[var(--gold)]/10 text-[var(--gold)] shadow-sm">
                <Sparkles size={24} strokeWidth={1.8} aria-hidden="true" />
              </div>
              <h3 className="mt-5 font-display text-xl font-medium text-[var(--text)]">
                By ALS Partnership
              </h3>
              <p className="mt-2 text-xs leading-5 text-[var(--text-soft)] sm:text-sm sm:leading-6">
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
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--gold)]">
                Private Walkthrough & Consultation
              </span>

              <h2 className="mt-4 font-display text-3xl font-medium leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl">
                Ready to experience Vardha living spaces in person?
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-6 text-white/75 sm:text-base">
                Schedule an exclusive site visit to our residential and
                commercial developments. Our project specialists will guide
                you through layouts and availability.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-4">
                {projects[0] && (
                  <button
                    type="button"
                    onClick={() => handleWhatsApp(projects[0])}
                    className="inline-flex items-center gap-2.5 rounded-full bg-[#10b981] px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-lg transition hover:bg-[#059669] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981]"
                  >
                    <MessageCircle size={16} />
                    Inquire on WhatsApp
                  </button>
                )}

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 font-mono text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm transition hover:border-[var(--gold)] hover:text-[var(--gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
                >
                  <span>Book Private Site Visit</span>
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md sm:p-8">
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--gold)]">
                Sales & Site Office
              </span>

              <h3 className="mt-2 font-display text-2xl font-medium text-white">
                Vardha Builders Desk
              </h3>

              <p className="mt-2 text-xs leading-5 text-white/70 sm:text-sm">
                Golghar & Prime Gorakhpur Locations, Uttar Pradesh
              </p>

              <div className="mt-6 space-y-3 border-t border-white/10 pt-4 text-xs text-white/85 sm:text-sm">
                <div className="flex items-center gap-2.5">
                  <Phone size={15} className="text-[var(--gold)]" />
                  <span>Call Us: +91 99999 99999</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <MapPin size={15} className="text-[var(--gold)]" />
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
          <header className="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-white/10 bg-[#090a0a]/95 px-3 backdrop-blur-md sm:px-8">
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              <span className="h-px w-5 shrink-0 bg-[var(--gold)] sm:w-6" />

              <span className="whitespace-nowrap font-mono text-xs uppercase tracking-wider text-[var(--gold)]">
                Vardha Builders
              </span>

              <span className="hidden text-white/30 sm:inline">/</span>

              <span className="hidden truncate font-display text-sm font-semibold sm:inline">
                {fullScreenProject.title}
              </span>

              <span className="hidden rounded-md bg-emerald-600 px-2.5 py-0.5 font-mono text-xs font-bold uppercase tracking-wider text-white sm:inline-block">
                {fullScreenProject.badge}
              </span>
            </div>

            <div className="hidden items-center gap-2 md:flex">
              {projects.map((project) => {
                const isSelected = project.id === fullScreenProject.id;

                return (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => {
                      setFullScreenProject(project);
                      setSelectedGalleryIndex(0);
                      navigate(`/portfolio/${project.slug}`, { replace: true });
                    }}
                    className={`rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-wider transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] ${
                      isSelected
                        ? "bg-[var(--gold)] font-bold text-black"
                        : "border border-white/15 text-white/70 hover:border-white hover:text-white"
                    }`}
                  >
                    {project.title}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={closeFullScreen}
              aria-label="Close full screen project"
              className="flex shrink-0 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-white transition hover:border-[var(--gold)] hover:bg-[var(--gold)] hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] sm:px-4"
            >
              <span>Close</span>
              <X size={15} />
              <span className="hidden text-xs opacity-60 sm:inline">[ESC]</span>
            </button>
          </header>

          <div className="grid min-h-0 flex-1 grid-cols-1 overflow-y-auto lg:grid-cols-[1.35fr_0.65fr] lg:overflow-hidden">
            {/* IMAGE GALLERY */}

            <div className="relative flex min-h-[45vh] flex-col justify-between overflow-hidden bg-black p-3 sm:p-5 lg:min-h-0 lg:p-8">
              <div className="relative flex min-h-[35vh] flex-1 items-center justify-center overflow-hidden rounded-xl sm:min-h-[45vh] lg:min-h-0">
                <img
                  src={
                    fullScreenProject.gallery[selectedGalleryIndex] ||
                    fullScreenProject.image ||
                    "/images/projects/central-tower.webp"
                  }
                  alt={fullScreenProject.title}
                  className="absolute inset-0 h-full w-full object-cover transition-all duration-500"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30" />

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 text-white/90">
                  <div className="flex min-w-0 items-center gap-2 font-mono text-xs uppercase tracking-wider">
                    <MapPin size={13} className="shrink-0 text-[var(--gold)]" />
                    <span className="truncate">{fullScreenProject.location}</span>
                  </div>

                  <span className="shrink-0 font-mono text-xs uppercase tracking-wider text-white/70">
                    Photo {selectedGalleryIndex + 1} of{" "}
                    {Math.max(fullScreenProject.gallery.length, 1)}
                  </span>
                </div>

                {fullScreenProject.gallery.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedGalleryIndex(
                          (previous) =>
                            (previous - 1 + fullScreenProject.gallery.length) %
                            fullScreenProject.gallery.length
                        )
                      }
                      aria-label="Previous image"
                      className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition hover:bg-[var(--gold)] hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
                    >
                      <ChevronLeft size={20} />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedGalleryIndex(
                          (previous) =>
                            (previous + 1) % fullScreenProject.gallery.length
                        )
                      }
                      aria-label="Next image"
                      className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition hover:bg-[var(--gold)] hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
              </div>

              {fullScreenProject.gallery.length > 1 && (
                <div className="mt-3 flex gap-3 overflow-x-auto pb-1 sm:mt-4">
                  {fullScreenProject.gallery.map((image, index) => (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      onClick={() => setSelectedGalleryIndex(index)}
                      className={`relative h-12 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] sm:h-14 sm:w-20 ${
                        selectedGalleryIndex === index
                          ? "scale-105 border-[var(--gold)]"
                          : "border-white/20 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={image} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* PROJECT DETAILS */}

            <aside className="flex min-h-0 flex-col justify-between overflow-y-auto border-t border-white/10 bg-[#0e1010] p-5 sm:p-7 lg:border-l lg:border-t-0 lg:p-10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--gold)]">
                    {fullScreenProject.category} · By ALS
                  </span>
                </div>

                <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {fullScreenProject.title}
                </h2>

                <div className="mt-2 flex items-center gap-2 text-xs text-white/70">
                  <MapPin size={13} className="text-[var(--gold)]" />
                  <span>{fullScreenProject.location}</span>
                </div>

                <p className="mt-4 text-xs leading-6 text-white/75 sm:text-sm">
                  {fullScreenProject.description}
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3 border-y border-white/10 py-4 sm:mt-6 sm:py-5">
                  <div className="rounded-lg bg-white/5 p-3">
                    <span className="block font-mono text-xs uppercase tracking-wider text-white/50">
                      TYPE
                    </span>
                    <span className="font-display text-lg font-semibold text-white">
                      {fullScreenProject.type}
                    </span>
                  </div>

                  <div className="rounded-lg bg-white/5 p-3">
                    <span className="block font-mono text-xs uppercase tracking-wider text-white/50">
                      AREA
                    </span>
                    <span className="font-display text-lg font-semibold text-[var(--gold)]">
                      {fullScreenProject.area}
                    </span>
                  </div>

                  <div className="rounded-lg bg-white/5 p-3">
                    <span className="block font-mono text-xs uppercase tracking-wider text-white/50">
                      CONFIGURATION
                    </span>
                    <span className="text-xs font-medium text-white/90 sm:text-sm">
                      {fullScreenProject.configuration}
                    </span>
                  </div>

                  <div className="rounded-lg bg-white/5 p-3">
                    <span className="block font-mono text-xs uppercase tracking-wider text-white/50">
                      STATUS
                    </span>
                    <span className="text-xs font-semibold text-emerald-400 sm:text-sm">
                      {fullScreenProject.status}
                    </span>
                  </div>
                </div>

                <div className="mt-5">
                  <span className="block font-mono text-xs uppercase tracking-wider text-white/50">
                    Architectural Highlights
                  </span>

                  <div className="mt-3 space-y-2">
                    {fullScreenProject.highlights.map((highlight) => (
                      <div
                        key={highlight}
                        className="flex items-center gap-2 text-xs text-white/85 sm:text-sm"
                      >
                        <CheckCircle2 size={14} className="shrink-0 text-emerald-400" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5">
                  <span className="block font-mono text-xs uppercase tracking-wider text-white/50">
                    Amenities & Facilities
                  </span>

                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {fullScreenProject.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-xs uppercase tracking-wider text-white/85"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-7 space-y-3 border-t border-white/10 pt-5 sm:mt-8">
                <button
                  type="button"
                  onClick={(event) => handleWhatsApp(fullScreenProject, event)}
                  className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#10b981] px-4 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-lg transition hover:bg-[#059669] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981] sm:px-5"
                >
                  <MessageCircle size={16} />
                  Chat on WhatsApp for Availability
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/contact"
                    onClick={closeFullScreen}
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-3 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-white transition hover:border-[var(--gold)] hover:text-[var(--gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
                  >
                    <span>Schedule Visit</span>
                    <ArrowUpRight size={14} />
                  </Link>

                  <Link
                    to="/floor-plans"
                    onClick={closeFullScreen}
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-3 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-white transition hover:border-[var(--gold)] hover:text-[var(--gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
                  >
                    <FileText size={14} />
                    <span>Floor Plans</span>
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
        className={`fixed bottom-24 right-6 z-[90] flex h-12 w-12 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--text)] shadow-xl transition-all duration-300 hover:border-[var(--gold)] hover:text-[var(--gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] sm:bottom-24 sm:right-6 ${
          showTopButton
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <ArrowUpRight size={18} className="-rotate-45" />
      </button>
    </main>
  );
}
