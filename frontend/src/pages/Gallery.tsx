
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Building2,
  Check,
  Expand,
  MapPin,
  X,
} from "lucide-react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Category =
  | "All"
  | "Construction"
  | "Engineering"
  | "Architecture"
  | "Materials"
  | "Completed";

type GalleryImage = {
  id: number;
  number: string;
  title: string;
  description: string;
  category: Exclude<Category, "All">;
  location: string;
  image: string;
  size: "tall" | "wide" | "normal";
};

const galleryPhotos = {
  hero: "/images/Gallery/Gallery1.webp",
  constructionSite: "/images/Gallery/Gallery2.webp",
  structuralWork: "/images/Gallery/Gallery3.webp",
  engineering: "/images/Gallery/Gallery4.webp",
  workers: "/images/Gallery/Gallery5.webp",
  steelStructure: "/images/Gallery/Gallery6.webp",
  crane: "/images/Gallery/Gallery7.webp",
  buildingFrame: "/images/Gallery/Gallery5.webp",
  concrete: "/images/Gallery/Gallery8.webp",
  sitePlanning: "/images/Gallery/Gallery9.webp",
  materials: "/images/Gallery/Gallery10.webp",
  architecture: "/images/Gallery/Gallery11.webp",
  exterior: "/images/Gallery/Gallery8.webp",
  highRise: "/images/Gallery/Gallery12.webp",
  finishing: "/images/Gallery/Gallery13.webp",
  completed: "/images/Gallery/Gallery14.webp",
};

const categories: Category[] = [
  "All",
  "Construction",
  "Engineering",
  "Architecture",
  "Materials",
  "Completed",
];

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    number: "01",
    title: "The Building Process",
    description:
      "Every landmark begins with a vision, careful planning and a commitment to quality.",
    category: "Construction",
    location: "Gorakhpur, Uttar Pradesh",
    image: galleryPhotos.hero,
    size: "tall",
  },
  {
    id: 2,
    number: "02",
    title: "Structural Progress",
    description:
      "A closer look at the groundwork and structural stages behind every development.",
    category: "Construction",
    location: "Vardha Project Site",
    image: galleryPhotos.constructionSite,
    size: "normal",
  },
  {
    id: 3,
    number: "03",
    title: "Urban Engineering",
    description:
      "Thoughtful engineering that supports the form, function and longevity of a building.",
    category: "Engineering",
    location: "Uttar Pradesh",
    image: galleryPhotos.engineering,
    size: "normal",
  },
  {
    id: 4,
    number: "04",
    title: "Planning the Structure",
    description:
      "Coordinated planning brings technical requirements and architectural vision together.",
    category: "Engineering",
    location: "Design & Planning",
    image: galleryPhotos.structuralWork,
    size: "wide",
  },
  {
    id: 5,
    number: "05",
    title: "The People Behind the Build",
    description:
      "The skills, teamwork and dedication that turn drawings into real spaces.",
    category: "Construction",
    location: "Vardha Project Site",
    image: galleryPhotos.workers,
    size: "tall",
  },
  {
    id: 6,
    number: "06",
    title: "Steel & Structure",
    description:
      "Precision, strength and material selection are essential to structural performance.",
    category: "Materials",
    location: "Structural Works",
    image: galleryPhotos.steelStructure,
    size: "normal",
  },
  {
    id: 7,
    number: "07",
    title: "Working at Height",
    description:
      "Carefully coordinated site operations keep complex construction moving forward.",
    category: "Construction",
    location: "Construction Site",
    image: galleryPhotos.crane,
    size: "normal",
  },
  {
    id: 8,
    number: "08",
    title: "Rising Framework",
    description:
      "The framework gives shape to the spaces that will eventually become homes.",
    category: "Engineering",
    location: "Structural Development",
    image: galleryPhotos.buildingFrame,
    size: "wide",
  },
  {
    id: 9,
    number: "09",
    title: "Concrete & Craft",
    description:
      "Material quality and consistent workmanship form the foundation of lasting construction.",
    category: "Materials",
    location: "On-Site Execution",
    image: galleryPhotos.concrete,
    size: "normal",
  },
  {
    id: 10,
    number: "10",
    title: "Site Preparation",
    description:
      "Preparation and coordination establish the conditions for a well-managed build.",
    category: "Construction",
    location: "Project Site",
    image: galleryPhotos.sitePlanning,
    size: "normal",
  },
  {
    id: 11,
    number: "11",
    title: "Material Selection",
    description:
      "Choosing appropriate materials helps balance performance, finish and durability.",
    category: "Materials",
    location: "Materials & Finishes",
    image: galleryPhotos.materials,
    size: "normal",
  },
  {
    id: 12,
    number: "12",
    title: "Architectural Form",
    description:
      "Modern architectural language combines proportion, light and considered details.",
    category: "Architecture",
    location: "Architectural Design",
    image: galleryPhotos.architecture,
    size: "tall",
  },
  {
    id: 13,
    number: "13",
    title: "The Exterior Envelope",
    description:
      "The exterior creates the first impression while shaping the character of a building.",
    category: "Architecture",
    location: "Exterior Design",
    image: galleryPhotos.exterior,
    size: "normal",
  },
  {
    id: 14,
    number: "14",
    title: "The Urban Skyline",
    description:
      "Contemporary buildings contribute to the evolving character of urban spaces.",
    category: "Architecture",
    location: "Urban Development",
    image: galleryPhotos.highRise,
    size: "normal",
  },
  {
    id: 15,
    number: "15",
    title: "Finishing & Detail",
    description:
      "Finishing touches bring clarity, refinement and a sense of completion to a space.",
    category: "Completed",
    location: "Interior & Exterior",
    image: galleryPhotos.finishing,
    size: "wide",
  },
  {
    id: 16,
    number: "16",
    title: "A New Beginning",
    description:
      "A completed space becomes the setting for new experiences and everyday living.",
    category: "Completed",
    location: "Vardha Residences",
    image: galleryPhotos.completed,
    size: "tall",
  },
];

const processStages = [
  {
    number: "01",
    title: "Planning",
    description:
      "Every successful project begins with a clear vision, considered planning and an understanding of the people who will use the space.",
    image: galleryPhotos.sitePlanning,
  },
  {
    number: "02",
    title: "Structure",
    description:
      "Engineering and coordinated execution give every project its strength, stability and architectural form.",
    image: galleryPhotos.buildingFrame,
  },
  {
    number: "03",
    title: "Craftsmanship",
    description:
      "Materials, details and finishing work come together to create spaces that feel complete and carefully considered.",
    image: galleryPhotos.materials,
  },
  {
    number: "04",
    title: "Completion",
    description:
      "The final result brings the original vision to life, creating a place ready for its next chapter.",
    image: galleryPhotos.completed,
  },
];

function GalleryPhoto({
  image,
  title,
  className = "",
  priority = false,
}: {
  image: string;
  title: string;
  className?: string;
  priority?: boolean;
}) {
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [image]);

  return (
    <div
      className={`relative h-full w-full overflow-hidden bg-[var(--gallery-card)] ${className}`}
    >
      {!imageFailed ? (
        <img
          src={image}
          alt={title}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          onError={() => setImageFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[var(--gallery-surface)] text-[var(--gallery-accent)]">
          <Building2 size={30} strokeWidth={1} />
          <span className="text-[9px] uppercase tracking-[0.2em] text-[var(--gallery-muted)]">
            Vardha Builders
          </span>
        </div>
      )}
    </div>
  );
}

export default function Gallery() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLElement>(null);

  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [activeImage, setActiveImage] = useState<GalleryImage | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTopButton, setShowTopButton] = useState(false);

  const filteredImages = useMemo(() => {
    if (activeCategory === "All") return galleryImages;

    return galleryImages.filter(
      (image) => image.category === activeCategory,
    );
  }, [activeCategory]);

  const activeImageIndex = activeImage
    ? filteredImages.findIndex((image) => image.id === activeImage.id)
    : -1;

  useEffect(() => {
    const updateScroll = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      setScrollProgress(
        scrollableHeight > 0
          ? Math.min(100, (window.scrollY / scrollableHeight) * 100)
          : 0,
      );

      setShowTopButton(window.scrollY > 650);
    };

    updateScroll();

    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll);

    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, []);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const context = gsap.context(() => {
      const heroTimeline = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      heroTimeline
        .from(".gallery-hero-eyebrow", {
          y: 14,
          opacity: 0,
          duration: 0.6,
        })
        .from(
          ".gallery-hero-title-line",
          {
            yPercent: 105,
            opacity: 0,
            duration: 0.85,
            stagger: 0.12,
          },
          "-=0.25",
        )
        .from(
          ".gallery-hero-description",
          {
            y: 15,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.3",
        )
        .from(
          ".gallery-hero-meta",
          {
            y: 12,
            opacity: 0,
            duration: 0.5,
          },
          "-=0.3",
        );

      gsap.utils
        .toArray<HTMLElement>(".gallery-reveal")
        .forEach((element) => {
          gsap.fromTo(
            element,
            { y: 25, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 90%",
                once: true,
              },
            },
          );
        });

      gsap.utils
        .toArray<HTMLElement>(".gallery-grid-card")
        .forEach((element, index) => {
          gsap.fromTo(
            element,
            { y: 22, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              delay: (index % 3) * 0.05,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 94%",
                once: true,
              },
            },
          );
        });

      if (heroRef.current) {
        gsap.to(".gallery-hero-image", {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, page);

    return () => context.revert();
  }, [activeCategory]);

  useEffect(() => {
    if (!activeImage) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveImage(null);
      }

      if (event.key === "ArrowRight" && filteredImages.length > 0) {
        setActiveImage((current) => {
          if (!current) return null;

          const index = filteredImages.findIndex(
            (image) => image.id === current.id,
          );

          if (index < 0) return current;

          return filteredImages[(index + 1) % filteredImages.length];
        });
      }

      if (event.key === "ArrowLeft" && filteredImages.length > 0) {
        setActiveImage((current) => {
          if (!current) return null;

          const index = filteredImages.findIndex(
            (image) => image.id === current.id,
          );

          if (index < 0) return current;

          return filteredImages[
            (index - 1 + filteredImages.length) % filteredImages.length
          ];
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeImage, filteredImages]);

  const navigateImage = (direction: "next" | "previous") => {
    if (filteredImages.length === 0 || activeImageIndex < 0) return;

    const nextIndex =
      direction === "next"
        ? (activeImageIndex + 1) % filteredImages.length
        : (activeImageIndex - 1 + filteredImages.length) %
          filteredImages.length;

    setActiveImage(filteredImages[nextIndex]);
  };

  const scrollToGallery = () => {
    galleryRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      ref={pageRef}
      className="gallery-page min-h-screen overflow-hidden selection:bg-[var(--gallery-accent)] selection:text-white"
    >
      {/* Scroll progress */}
      <div className="fixed left-0 right-0 top-0 z-[100] h-[2px] bg-black/10">
        <div
          className="h-full bg-[var(--gallery-accent)] transition-[width] duration-100"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Full-screen hero */}
      <section
        ref={heroRef}
        className="relative flex min-h-[100svh] w-full items-end overflow-hidden bg-[#0d0e0d]"
      >
        {/* Full-screen background */}
        <div className="gallery-hero-image absolute inset-0 scale-[1.03]">
          <GalleryPhoto
            image={galleryPhotos.hero}
            title="Construction at Vardha Builders"
            className="opacity-80"
            priority
          />
        </div>

        {/* Readability overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e0d] via-[#0d0e0d]/40 to-[#0d0e0d]/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0e0d]/75 via-[#0d0e0d]/25 to-transparent" />

        {/* Hero content */}
        <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1800px] flex-col justify-end px-5 pb-7 pt-28 sm:px-7 sm:pb-9 sm:pt-32 md:px-10 md:pb-12 lg:px-16 lg:pb-14 xl:px-20">
          <div className="max-w-[900px]">
            <div className="gallery-hero-eyebrow mb-5 flex items-center gap-3 sm:mb-6">
              <span className="h-px w-8 bg-[var(--gallery-accent)]" />

              <span className="text-[9px] uppercase tracking-[0.2em] text-[#ded1b8] sm:text-[10px] sm:tracking-[0.24em]">
                Vardha Builders · Project Gallery
              </span>
            </div>

            <h1 className="font-display text-[clamp(3rem,8vw,7.5rem)] font-medium leading-[0.9] tracking-[-0.06em] text-white">
              <span className="block overflow-hidden pb-1">
                <span className="gallery-hero-title-line block">
                  The Art of
                </span>
              </span>

              <span className="block overflow-hidden pb-1">
                <span className="gallery-hero-title-line block text-[var(--gallery-accent)]">
                  Building.
                </span>
              </span>
            </h1>

            <p className="gallery-hero-description mt-5 max-w-[470px] text-[12px] leading-6 text-white/80 sm:mt-6 sm:text-[13px] sm:leading-7 md:text-[14px]">
              A closer look at the process, people and precision behind
              creating spaces designed for the way we live.
            </p>

            <div className="gallery-hero-meta mt-6 flex flex-wrap items-center gap-x-6 gap-y-4 sm:mt-8 sm:gap-x-8">
              <button
                type="button"
                onClick={scrollToGallery}
                className="group inline-flex min-h-12 items-center gap-4 border border-[var(--gallery-accent)] px-5 py-3 text-[9px] uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-[var(--gallery-accent)] hover:text-[#171816] sm:px-6 sm:text-[10px]"
              >
                Explore Gallery

                <ArrowDown
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-y-1"
                />
              </button>

              <span className="text-[9px] tracking-[0.12em] text-white/70 sm:text-[10px]">
                01 — 16 / Selected Moments
              </span>
            </div>
          </div>

          {/* Bottom information */}
          <div className="mt-10 flex items-end justify-between border-t border-white/30 pt-4 sm:mt-12 sm:pt-5 lg:mt-14">
            <span className="text-[8px] uppercase tracking-[0.16em] text-white/70 sm:text-[9px] sm:tracking-[0.2em]">
              Built with intention
            </span>

            <span className="text-right text-[8px] uppercase tracking-[0.16em] text-white/70 sm:text-[9px] sm:tracking-[0.2em]">
              Gorakhpur · India
            </span>
          </div>
        </div>

        {/* Vertical side label */}
        <div className="absolute right-7 top-1/2 hidden -translate-y-1/2 [writing-mode:vertical-rl] lg:block xl:right-10">
          <span className="text-[9px] uppercase tracking-[0.24em] text-white/70">
            Architecture in Motion · Vardha
          </span>
        </div>

        {/* Scroll indicator */}
        <button
          type="button"
          onClick={scrollToGallery}
          aria-label="Scroll to gallery"
          className="absolute bottom-[115px] right-7 hidden h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white/80 transition-all duration-300 hover:border-[var(--gallery-accent)] hover:text-[var(--gallery-accent)] lg:flex xl:right-10"
        >
          <ArrowDown size={15} />
        </button>
      </section>

      {/* Introduction */}
      <section className="bg-[var(--gallery-bg)] px-5 py-14 text-[var(--gallery-text)] sm:px-7 sm:py-16 md:px-10 md:py-20 lg:px-16 lg:py-24 xl:px-20">
        <div className="mx-auto grid max-w-[1450px] gap-7 md:grid-cols-12 md:gap-9 lg:gap-12">
          <div className="gallery-reveal md:col-span-4">
            <span className="flex items-center gap-3 text-[9px] uppercase tracking-[0.2em] text-[var(--gallery-accent)]">
              <span className="h-px w-6 bg-[var(--gallery-accent)]" />
              A visual journal
            </span>

            <p className="mt-4 max-w-[280px] text-[11px] leading-6 text-[var(--gallery-muted)] sm:mt-5 sm:text-[12px]">
              From the first stages of planning to the final finishing
              touches, every detail contributes to the finished space.
            </p>
          </div>

          <div className="gallery-reveal md:col-span-8">
            <h2 className="font-display text-[clamp(1.8rem,4vw,3.65rem)] leading-[1.04] tracking-[-0.04em]">
              More than structures.
              <span className="block text-[var(--gallery-accent)]">
                A process shaped by purpose.
              </span>
            </h2>

            <p className="mt-5 max-w-[570px] text-[12px] leading-6 text-[var(--gallery-muted)] sm:mt-6 sm:text-[13px] sm:leading-7">
              Every project has a story. It begins with an idea, grows through
              planning and engineering, and takes shape through the people who
              bring it to life. Our gallery brings these moments together in
              one place.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery collection */}
      <section
        ref={galleryRef}
        id="gallery"
        className="scroll-mt-16 bg-[var(--gallery-bg)] px-5 pb-16 text-[var(--gallery-text)] sm:px-7 sm:pb-20 md:px-10 md:pb-24 lg:px-16 lg:pb-24 xl:px-20"
      >
        <div className="mx-auto max-w-[1600px]">
          <div className="gallery-reveal mb-7 flex flex-col justify-between gap-4 border-b border-[var(--gallery-border)] pb-6 sm:mb-8 md:flex-row md:items-end md:gap-6 md:pb-7">
            <div>
              <span className="mb-3 flex items-center gap-3 text-[9px] uppercase tracking-[0.2em] text-[var(--gallery-accent)] sm:mb-4">
                <span className="h-px w-6 bg-[var(--gallery-accent)]" />
                The collection
              </span>

              <h2 className="font-display text-[clamp(1.9rem,4vw,3.65rem)] leading-[0.98] tracking-[-0.04em]">
                Inside the process.
              </h2>
            </div>

            <p className="max-w-[320px] text-[11px] leading-6 text-[var(--gallery-muted)] sm:text-[12px]">
              Explore construction, engineering, architecture and the details
              that make every project distinct.
            </p>
          </div>

          {/* Category filters */}
          <div className="gallery-reveal mb-6 flex flex-wrap items-center gap-2 sm:mb-8 md:gap-2.5">
            {categories.map((category) => {
              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={isActive}
                  className={`min-h-9 border px-3 py-2 text-[8px] uppercase tracking-[0.1em] transition-all duration-300 sm:px-3.5 sm:text-[9px] sm:tracking-[0.12em] ${
                    isActive
                      ? "border-[var(--gallery-accent)] bg-[var(--gallery-accent)] text-white"
                      : "border-[var(--gallery-border)] text-[var(--gallery-muted)] hover:border-[var(--gallery-accent)] hover:text-[var(--gallery-accent)]"
                  }`}
                >
                  {category}
                </button>
              );
            })}

            <span className="ml-auto self-center text-[8px] uppercase tracking-[0.1em] text-[var(--gallery-muted)] sm:text-[9px] sm:tracking-[0.12em]">
              {String(filteredImages.length).padStart(2, "0")} Images
            </span>
          </div>

          {/* Gallery grid */}
          {filteredImages.length > 0 ? (
            <div className="columns-1 gap-3.5 sm:columns-2 sm:gap-4 lg:columns-3 xl:columns-4">
              {filteredImages.map((image) => (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => setActiveImage(image)}
                  aria-label={`Open image: ${image.title}`}
                  className={`gallery-grid-card group mb-3.5 block w-full break-inside-avoid text-left sm:mb-4 ${
                    image.size === "tall"
                      ? "h-[340px] sm:h-[370px] lg:h-[400px]"
                      : image.size === "wide"
                        ? "h-[245px] sm:h-[265px] lg:h-[285px]"
                        : "h-[260px] sm:h-[280px] lg:h-[300px]"
                  }`}
                >
                  <div className="relative h-full w-full overflow-hidden bg-[var(--gallery-card)]">
                    <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                      <GalleryPhoto image={image.image} title={image.title} />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-black/10 opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

                    <div className="absolute left-3 top-3 flex items-center gap-2 sm:left-4 sm:top-4">
                      <span className="border border-white/30 bg-black/20 px-2 py-1 text-[8px] tracking-[0.1em] text-white/90 backdrop-blur-sm">
                        {image.number}
                      </span>

                      <span className="bg-black/70 px-2 py-1 text-[7px] uppercase tracking-[0.1em] text-[#e1c99e] backdrop-blur-sm sm:text-[8px] sm:tracking-[0.12em]">
                        {image.category}
                      </span>
                    </div>

                    <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center border border-white/35 bg-black/20 text-white opacity-100 backdrop-blur-sm transition-all duration-300 sm:right-4 sm:top-4 sm:opacity-0 sm:group-hover:opacity-100">
                      <Expand size={12} strokeWidth={1.5} />
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4 lg:p-5">
                      <div className="mb-2 flex items-center gap-1.5 text-[8px] uppercase tracking-[0.1em] text-white/70">
                        <MapPin size={10} />
                        {image.location}
                      </div>

                      <h3 className="font-display text-[clamp(1.05rem,1.5vw,1.4rem)] leading-[1.08] tracking-[-0.03em] text-white">
                        {image.title}
                      </h3>

                      <p className="mt-2 max-w-[320px] text-[10px] leading-[1.6] text-white/75 sm:text-[11px]">
                        {image.description}
                      </p>

                      <div className="mt-3 flex items-center justify-between border-t border-white/25 pt-2.5">
                        <span className="text-[7px] uppercase tracking-[0.13em] text-white/70 sm:text-[8px] sm:tracking-[0.15em]">
                          View photograph
                        </span>

                        <ArrowUpRight
                          size={13}
                          className="text-[#d2b47c] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                        />
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex min-h-[220px] flex-col items-center justify-center border border-[var(--gallery-border)] text-center">
              <Building2 size={26} className="text-[var(--gallery-accent)]" />

              <p className="mt-4 text-[12px] text-[var(--gallery-muted)]">
                No photographs found in this category.
              </p>

              <button
                type="button"
                onClick={() => setActiveCategory("All")}
                className="mt-3 text-[9px] uppercase tracking-[0.17em] text-[var(--gallery-accent)] underline underline-offset-4"
              >
                View all photographs
              </button>
            </div>
          )}

          <div className="gallery-reveal mt-7 flex items-center justify-between border-t border-[var(--gallery-border)] pt-4 sm:mt-8">
            <span className="text-[8px] uppercase tracking-[0.12em] text-[var(--gallery-muted)] sm:text-[9px] sm:tracking-[0.15em]">
              Vardha Builders · Visual archive
            </span>

            <span className="text-[8px] uppercase tracking-[0.12em] text-[var(--gallery-muted)] sm:text-[9px] sm:tracking-[0.15em]">
              {String(filteredImages.length).padStart(2, "0")} selected
            </span>
          </div>
        </div>
      </section>

      {/* Construction stages */}
      <section className="bg-[var(--gallery-surface)] px-5 py-14 text-[var(--gallery-text)] sm:px-7 sm:py-16 md:px-10 md:py-20 lg:px-16 lg:py-24 xl:px-20">
        <div className="mx-auto max-w-[1500px]">
          <div className="gallery-reveal mb-8 grid gap-5 sm:mb-10 md:grid-cols-12 md:items-end md:gap-7 lg:mb-12">
            <div className="md:col-span-8">
              <span className="mb-3 flex items-center gap-3 text-[9px] uppercase tracking-[0.2em] text-[var(--gallery-accent)] sm:mb-4">
                <span className="h-px w-6 bg-[var(--gallery-accent)]" />
                From vision to reality
              </span>

              <h2 className="font-display text-[clamp(2rem,4vw,3.8rem)] leading-[0.98] tracking-[-0.04em]">
                Every stage
                <span className="block text-[var(--gallery-accent)]">
                  has a purpose.
                </span>
              </h2>
            </div>

            <p className="text-[11px] leading-6 text-[var(--gallery-muted)] sm:text-[12px] md:col-span-4">
              Building is a sequence of connected decisions. Each stage helps
              shape the quality and character of the final result.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-4 lg:gap-5">
            {processStages.map((stage) => (
              <article key={stage.number} className="gallery-reveal group">
                <div className="relative h-[245px] overflow-hidden bg-[var(--gallery-card)] sm:h-[265px] lg:h-[280px]">
                  <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.04]">
                    <GalleryPhoto image={stage.image} title={stage.title} />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />

                  <span className="absolute left-3 top-3 text-[9px] tracking-[0.12em] text-white/90">
                    {stage.number} / 04
                  </span>

                  <div className="absolute bottom-3 left-3 flex items-center gap-2 text-[8px] uppercase tracking-[0.13em] text-[#e2c99a]">
                    <Check size={11} />
                    The building journey
                  </div>
                </div>

                <div className="border-b border-[var(--gallery-border)] py-4">
                  <h3 className="font-display text-[clamp(1.25rem,1.8vw,1.6rem)] leading-none tracking-[-0.03em]">
                    {stage.title}
                  </h3>

                  <p className="mt-3 text-[11px] leading-6 text-[var(--gallery-muted)] sm:text-[12px]">
                    {stage.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="bg-[var(--gallery-bg)] px-5 py-14 text-[var(--gallery-text)] sm:px-7 sm:py-16 md:px-10 md:py-20 lg:px-16 lg:py-24 xl:px-20">
        <div className="mx-auto grid max-w-[1500px] gap-8 sm:gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          <div className="gallery-reveal">
            <span className="mb-3 flex items-center gap-3 text-[9px] uppercase tracking-[0.2em] text-[var(--gallery-accent)] sm:mb-4">
              <span className="h-px w-6 bg-[var(--gallery-accent)]" />
              Our approach
            </span>

            <h2 className="font-display text-[clamp(2rem,4vw,3.8rem)] leading-[0.98] tracking-[-0.04em]">
              Designed with
              <span className="block text-[var(--gallery-accent)]">
                intention.
              </span>
              Built with care.
            </h2>

            <p className="mt-5 max-w-[480px] text-[12px] leading-6 text-[var(--gallery-muted)] sm:mt-6 sm:text-[13px] sm:leading-7">
              We believe the value of a building lies in more than its
              appearance. Planning, material choices, craftsmanship and
              attention to detail all contribute to spaces people can enjoy
              for years to come.
            </p>

            <Link
              to="/about"
              className="group mt-6 inline-flex min-h-10 items-center gap-3 border-b border-[var(--gallery-accent)] pb-2 text-[9px] uppercase tracking-[0.16em] text-[var(--gallery-accent)] transition-colors hover:opacity-75 sm:mt-7 sm:tracking-[0.17em]"
            >
              Discover Vardha

              <ArrowRight
                size={13}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="gallery-reveal relative mt-1 sm:mt-2 lg:mt-0">
            <div className="relative h-[320px] overflow-hidden sm:h-[400px] lg:h-[460px] xl:h-[490px]">
              <GalleryPhoto
                image={galleryPhotos.architecture}
                title="Modern architectural design"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between border-t border-white/40 pt-3 text-white sm:bottom-6 sm:left-6 sm:right-6">
                <div>
                  <span className="text-[8px] uppercase tracking-[0.15em] text-white/80 sm:tracking-[0.17em]">
                    The Vardha perspective
                  </span>

                  <p className="mt-1.5 font-display text-xl tracking-[-0.03em] sm:text-2xl">
                    Form follows purpose.
                  </p>
                </div>

                <span className="text-[9px] tracking-[0.12em] text-white/80">
                  01 — 04
                </span>
              </div>
            </div>

            <div className="absolute -bottom-4 left-3 hidden border border-[var(--gallery-accent)] bg-[var(--gallery-surface)] px-4 py-3 sm:block md:left-5 md:px-5 md:py-4">
              <span className="block text-[8px] uppercase tracking-[0.17em] text-[var(--gallery-muted)]">
                Our guiding principle
              </span>

              <span className="mt-1.5 block font-display text-lg tracking-[-0.03em] md:text-xl">
                Quality in every detail.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-[var(--gallery-border)] bg-[var(--gallery-surface)] px-5 py-12 text-[var(--gallery-text)] sm:px-7 sm:py-14 md:px-10 md:py-16 lg:px-16 xl:px-20">
        <div className="mx-auto grid max-w-[1500px] grid-cols-2 gap-x-5 gap-y-7 sm:gap-y-8 md:grid-cols-4 md:gap-7">
          {[
            { value: "01", label: "Vision", detail: "A clear purpose" },
            { value: "02", label: "Precision", detail: "Considered planning" },
            { value: "03", label: "Craft", detail: "Attention to detail" },
            { value: "04", label: "Delivery", detail: "A completed vision" },
          ].map((item) => (
            <div key={item.value} className="gallery-reveal">
              <span className="font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-none tracking-[-0.04em] text-[var(--gallery-accent)]">
                {item.value}
              </span>

              <h3 className="mt-3 text-[9px] font-medium uppercase tracking-[0.14em] sm:text-[10px]">
                {item.label}
              </h3>

              <p className="mt-1.5 text-[10px] leading-5 text-[var(--gallery-muted)] sm:text-[11px]">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-[var(--gallery-bg)] px-5 py-16 text-[var(--gallery-text)] sm:px-7 sm:py-20 md:px-10 md:py-24 lg:px-16 lg:py-28 xl:px-20">
        <div className="pointer-events-none absolute right-[-18%] top-1/2 h-[240px] w-[240px] -translate-y-1/2 rounded-full border border-[var(--gallery-accent)]/20 sm:right-[-10%] sm:h-[340px] sm:w-[340px] md:h-[420px] md:w-[420px]" />

        <div className="pointer-events-none absolute right-[-9%] top-1/2 h-[170px] w-[170px] -translate-y-1/2 rounded-full border border-[var(--gallery-accent)]/20 sm:right-[-4%] sm:h-[250px] sm:w-[250px] md:h-[310px] md:w-[310px]" />

        <div className="gallery-reveal relative z-10 mx-auto max-w-[1500px]">
          <span className="mb-4 flex items-center gap-3 text-[9px] uppercase tracking-[0.2em] text-[var(--gallery-accent)] sm:mb-5">
            <span className="h-px w-6 bg-[var(--gallery-accent)]" />
            Your next chapter
          </span>

          <h2 className="max-w-[850px] font-display text-[clamp(2.4rem,5.2vw,4.8rem)] leading-[0.95] tracking-[-0.05em]">
            Have a vision?
            <span className="block text-[var(--gallery-accent)]">
              Let's build it.
            </span>
          </h2>

          <div className="mt-6 flex flex-col gap-5 sm:mt-7 md:flex-row md:items-end md:justify-between md:gap-7">
            <p className="max-w-[390px] text-[12px] leading-6 text-[var(--gallery-muted)] sm:text-[13px] sm:leading-7">
              Explore our projects or get in touch to discuss your requirements
              with Vardha Builders.
            </p>

            <div className="flex flex-wrap gap-2.5">
              <Link
                to="/portfolio"
                className="group inline-flex min-h-11 items-center gap-3 border border-[var(--gallery-accent)] bg-[var(--gallery-accent)] px-4 py-3 text-[8px] uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:bg-transparent hover:text-[var(--gallery-accent)] sm:gap-4 sm:px-5 sm:text-[9px] sm:tracking-[0.14em]"
              >
                Explore Projects

                <ArrowUpRight
                  size={13}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>

              <Link
                to="/contact"
                className="group inline-flex min-h-11 items-center gap-3 border border-[var(--gallery-border)] px-4 py-3 text-[8px] uppercase tracking-[0.12em] text-[var(--gallery-text)] transition-colors duration-300 hover:border-[var(--gallery-accent)] hover:text-[var(--gallery-accent)] sm:gap-4 sm:px-5 sm:text-[9px] sm:tracking-[0.14em]"
              >
                Contact Us

                <ArrowRight
                  size={13}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-between border-t border-[var(--gallery-border)] pt-4 sm:mt-12 md:mt-14">
            <span className="text-[8px] uppercase tracking-[0.15em] text-[var(--gallery-muted)] sm:text-[9px] sm:tracking-[0.17em]">
              Vardha Builders
            </span>

            <span className="text-right text-[8px] uppercase tracking-[0.15em] text-[var(--gallery-muted)] sm:text-[9px] sm:tracking-[0.17em]">
              Built with intention.
            </span>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {activeImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Viewing ${activeImage.title}`}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#080908]/95 p-3 backdrop-blur-md sm:p-4 md:p-7"
          onClick={() => setActiveImage(null)}
        >
          <button
            type="button"
            onClick={() => setActiveImage(null)}
            aria-label="Close gallery preview"
            className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center border border-white/20 bg-black/30 text-white transition-colors hover:border-[#c5a46d] hover:text-[#c5a46d] sm:right-5 sm:top-5 md:right-7 md:top-7"
          >
            <X size={17} />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              navigateImage("previous");
            }}
            aria-label="Previous image"
            className="absolute left-1 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center border border-white/20 bg-black/30 text-white transition-colors hover:border-[#c5a46d] hover:text-[#c5a46d] sm:left-3 md:left-6 md:h-11 md:w-11"
          >
            <ArrowLeft size={16} />
          </button>

          <div
            className="relative flex max-h-[88svh] w-full max-w-[1150px] flex-col"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative min-h-0 flex-1 overflow-hidden bg-[#171816]">
              <img
                src={activeImage.image}
                alt={activeImage.title}
                className="mx-auto max-h-[56svh] min-h-[200px] w-full object-contain sm:max-h-[64svh] md:max-h-[70svh]"
              />
            </div>

            <div className="flex flex-col justify-between gap-3 border-t border-white/20 bg-[#10110f] px-3 py-3 text-white sm:px-4 sm:py-4 md:flex-row md:items-end md:gap-5 md:px-5 md:py-5">
              <div className="min-w-0">
                <div className="mb-2 flex items-center gap-3">
                  <span className="text-[8px] tracking-[0.14em] text-[#c5a46d]">
                    {activeImage.number}
                  </span>

                  <span className="h-px w-4 bg-white/30" />

                  <span className="text-[8px] uppercase tracking-[0.15em] text-white/65">
                    {activeImage.category}
                  </span>
                </div>

                <h3 className="font-display text-[clamp(1.25rem,2.5vw,2.3rem)] leading-tight tracking-[-0.04em]">
                  {activeImage.title}
                </h3>

                <p className="mt-2 max-w-[560px] text-[11px] leading-5 text-white/65 sm:text-[12px] sm:leading-6">
                  {activeImage.description}
                </p>

                <div className="mt-2 flex items-center gap-2 text-[9px] text-white/55">
                  <MapPin size={11} className="shrink-0 text-[#c5a46d]" />
                  {activeImage.location}
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                <span className="mr-1 text-[9px] tracking-[0.12em] text-white/65">
                  {String(Math.max(activeImageIndex + 1, 1)).padStart(2, "0")} /{" "}
                  {String(filteredImages.length).padStart(2, "0")}
                </span>

                <button
                  type="button"
                  onClick={() => navigateImage("previous")}
                  aria-label="Previous photograph"
                  className="flex h-9 w-9 items-center justify-center border border-white/20 text-white transition-colors hover:border-[#c5a46d] hover:text-[#c5a46d]"
                >
                  <ArrowLeft size={14} />
                </button>

                <button
                  type="button"
                  onClick={() => navigateImage("next")}
                  aria-label="Next photograph"
                  className="flex h-9 w-9 items-center justify-center border border-white/20 text-white transition-colors hover:border-[#c5a46d] hover:text-[#c5a46d]"
                >
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              navigateImage("next");
            }}
            aria-label="Next image"
            className="absolute right-1 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center border border-white/20 bg-black/30 text-white transition-colors hover:border-[#c5a46d] hover:text-[#c5a46d] sm:right-3 md:right-6 md:h-11 md:w-11"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* Back to top */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`fixed bottom-4 right-4 z-[90] flex h-10 w-10 items-center justify-center border border-[var(--gallery-accent)] bg-[var(--gallery-surface)] text-[var(--gallery-accent)] transition-all duration-300 hover:bg-[var(--gallery-accent)] hover:text-white sm:bottom-5 sm:right-5 md:bottom-7 md:right-7 ${
          showTopButton
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <ArrowUp size={14} />
      </button>
    </div>
  );
}
