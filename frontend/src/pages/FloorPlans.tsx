
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowDown,
  ArrowRight,
  BedDouble,
  ChevronLeft,
  ChevronRight,
  Home,
  Maximize2,
  Move3d,
  Ruler,
  Sparkles,
  X,
} from "lucide-react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   ARCHITECTURE IMAGES
========================================================= */

const images = {
  hero: "/images/floorplans/Floorplans1.webp",
  architecture: "/images/floorplans/Floorplans2.webp",
  construction1: "/images/floorplans/Floorplans3.webp",
  construction2: "/images/floorplans/Floorplans4.webp",
  construction3: "/images/floorplans/Floorplans5.webp",
  construction4: "/images/floorplans/Floorplans6.webp",
};

/* =========================================================
   EXACT 2D / 3D FLOOR PLAN PATHS
========================================================= */

const floorPlanImages = {
  twoBhk2D: "/images/floorplans/2bhkk 2d.webp",
  twoBhk3D: "/images/floorplans/2bhkk 3d.webp",

  threeBhk2D: "/images/floorplans/3bhkk2dform.webp",
  threeBhk3D: "/images/floorplans/3bhk3dform.webp",

  fourBhk2D: "/images/floorplans/4bhk2dform.webp",
  fourBhk3D: "/images/floorplans/4bhk3dform.webp",
};

/* =========================================================
   GALLERY
========================================================= */

const residenceGallery = [
  {
    image: "/images/floorplans/Floorplans7.webp",
    title: "Living Spaces",
    category: "Interiors",
  },
  {
    image: "/images/floorplans/Floorplans8.webp",
    title: "Kitchen",
    category: "Craft & Detail",
  },
  {
    image: "/images/floorplans/Floorplans9.webp",
    title: "Structure",
    category: "Construction",
  },
  {
    image: "/images/floorplans/Floorplans10.webp",
    title: "Private Residence",
    category: "Architecture",
  },
  {
    image: "/images/floorplans/Floorplans11.webp",
    title: "Material & Light",
    category: "Interiors",
  },
  {
    image: "/images/floorplans/Floorplans12.webp",
    title: "Everyday Luxury",
    category: "Lifestyle",
  },
];

/* =========================================================
   PLAN TYPE
========================================================= */

type Plan = {
  id: string;
  type: string;
  title: string;
  area: string;
  bedrooms: string;
  bathrooms: string;
  balconies: string;
  description: string;
  image2D: string;
  image3D: string;
  previewImage: string;
  accent: string;
  idealFor: string;
};

/* =========================================================
   RESIDENCE DATA
========================================================= */

const plans: Plan[] = [
  {
    id: "02",
    type: "2 BHK",
    title: "The Essential Residence",
    area: "1,120",
    bedrooms: "02",
    bathrooms: "02",
    balconies: "02",
    description:
      "A balanced family home with comfortable living areas, private bedrooms and carefully planned transitions between spaces.",
    image2D: floorPlanImages.twoBhk2D,
    image3D: floorPlanImages.twoBhk3D,
    previewImage: images.construction2,
    accent: "Balanced / Comfortable / Connected",
    idealFor: "Couples and growing families",
  },
  {
    id: "03",
    type: "3 BHK",
    title: "The Courtyard Residence",
    area: "1,680",
    bedrooms: "03",
    bathrooms: "03",
    balconies: "02",
    description:
      "A spacious family residence designed around privacy, natural light and generous common spaces for everyday gatherings.",
    image2D: floorPlanImages.threeBhk2D,
    image3D: floorPlanImages.threeBhk3D,
    previewImage: images.construction3,
    accent: "Family / Spacious / Natural",
    idealFor: "Growing and established families",
  },
  {
    id: "04",
    type: "4 BHK",
    title: "The Signature Residence",
    area: "2,240",
    bedrooms: "04",
    bathrooms: "04",
    balconies: "03",
    description:
      "An expansive residence created for families who value generous proportions, privacy and an elevated lifestyle.",
    image2D: floorPlanImages.fourBhk2D,
    image3D: floorPlanImages.fourBhk3D,
    previewImage: images.construction4,
    accent: "Signature / Generous / Private",
    idealFor: "Large families and luxury living",
  },
];

type ViewMode = "2D" | "3D";

/* =========================================================
   INTERACTIVE FLOOR PLAN VIEWER

   Behaviour:
   1. Default view is 2D.
   2. Hovering over the floor plan changes 2D to 3D.
   3. Leaving the floor plan returns to 2D.
   4. The toggle button manually switches between 2D and 3D.
   5. On touch devices, the toggle button can be used instead.
========================================================= */

function FloorPlanViewer({
  plan,
  viewMode,
  onToggleView,
  onOpen,
}: {
  plan: Plan;
  viewMode: ViewMode;
  onToggleView: () => void;
  onOpen: () => void;
}) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // When the saved view is 2D, hovering temporarily displays 3D.
  // When the user manually selects 3D, it stays 3D.
  const displayedView: ViewMode =
    isHovered && viewMode === "2D" ? "3D" : viewMode;

  const currentImage =
    displayedView === "2D" ? plan.image2D : plan.image3D;

  useEffect(() => {
    setImageError(false);
  }, [currentImage]);

  // Prevent the hover preview from carrying over to another residence.
  useEffect(() => {
    setIsHovered(false);
  }, [plan.id]);

  const handleToggle = () => {
    // Clear the temporary hover preview before changing the saved view.
    setIsHovered(false);
    onToggleView();
  };

  return (
    <div className="overflow-hidden border border-white/10 bg-[#e8e5dc]">
      <div
        className="relative flex min-h-[360px] items-center justify-center overflow-hidden sm:min-h-[460px] md:min-h-[580px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* FLOOR PLAN IMAGE */}
        {!imageError ? (
          <img
            key={`${plan.id}-${displayedView}`}
            src={currentImage}
            alt={`${plan.type} ${displayedView} architectural floor plan`}
            onError={() => setImageError(true)}
            className="min-h-[360px] max-h-[620px] w-full object-contain p-4 transition-opacity duration-300 sm:p-8 md:p-12"
          />
        ) : (
          <div className="flex min-h-[360px] w-full flex-col items-center justify-center gap-3 px-6 text-center text-[#151613]">
            <Home size={30} />

            <p className="font-serif text-xl">
              {plan.type} {displayedView} Plan
            </p>

            <p className="max-w-md text-sm text-black/55">
              Image not found. Check the filename and path in
              public/images/floorplans.
            </p>

            <p className="break-all text-xs text-black/45">
              {currentImage}
            </p>
          </div>
        )}

        {/* RESIDENCE LABEL */}
        <div className="pointer-events-none absolute left-4 top-4 z-10 sm:left-6 sm:top-6">
          <div className="border border-black/10 bg-white/85 px-3 py-2.5 backdrop-blur-md">
            <p className="text-[8px] uppercase tracking-[0.2em] text-black/45">
              Residence {plan.id}
            </p>

            <p className="mt-1 font-serif text-lg text-black">
              {plan.type}
            </p>
          </div>
        </div>

        {/* CURRENT VIEW LABEL */}
        <div className="pointer-events-none absolute right-4 top-4 z-10 sm:right-6 sm:top-6">
          <div className="flex items-center gap-2 border border-black/10 bg-white/85 px-3 py-2.5 text-black/65 backdrop-blur-md">
            <Move3d size={13} />

            <span className="text-[8px] uppercase tracking-[0.15em]">
              {displayedView === "2D"
                ? "2D Architectural"
                : "3D Spatial View"}
            </span>
          </div>
        </div>

        {/* 2D / 3D TOGGLE + FULLSCREEN */}
        <div className="absolute bottom-4 right-4 z-10 flex flex-wrap gap-2 sm:bottom-6 sm:right-6">
          <button
            type="button"
            onClick={handleToggle}
            onMouseEnter={() => setIsHovered(false)}
            aria-label={
              viewMode === "2D"
                ? `Switch ${plan.type} to 3D`
                : `Switch ${plan.type} to 2D`
            }
            className="flex min-h-11 items-center justify-center gap-2 bg-[#151613] px-4 py-3 text-[9px] uppercase tracking-[0.15em] text-white transition duration-300 hover:bg-[#c5a46d] hover:text-black sm:px-5"
          >
            <Move3d size={15} />

            {viewMode === "2D" ? "View 3D Plan" : "View 2D Plan"}
          </button>

          <button
            type="button"
            onClick={onOpen}
            aria-label={`Open ${plan.type} plan fullscreen`}
            className="flex h-11 w-11 items-center justify-center border border-black/10 bg-white/90 text-black transition hover:bg-[#c5a46d]"
          >
            <Maximize2 size={16} />
          </button>
        </div>

        {/* 2D / 3D STATUS INDICATOR */}
        <div className="pointer-events-none absolute bottom-5 left-4 z-10 flex items-center gap-2 sm:bottom-7 sm:left-6">
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              displayedView === "2D"
                ? "bg-[#b18d4e]"
                : "bg-black/20"
            }`}
          />

          <span className="text-[8px] uppercase tracking-[0.15em] text-black/50">
            2D
          </span>

          <span className="h-px w-5 bg-black/20" />

          <span
            className={`h-1.5 w-1.5 rounded-full ${
              displayedView === "3D"
                ? "bg-[#b18d4e]"
                : "bg-black/20"
            }`}
          />

          <span className="text-[8px] uppercase tracking-[0.15em] text-black/50">
            3D
          </span>
        </div>
      </div>

      {/* PLAN DETAILS */}
      <div className="grid border-t border-white/10 bg-[#191a16] sm:grid-cols-4">
        <div className="border-b border-white/10 p-5 sm:border-b-0 sm:border-r sm:p-6">
          <p className="text-[8px] uppercase tracking-[0.2em] text-[#c5a46d]">
            Residence
          </p>

          <p className="mt-2 font-serif text-xl text-white">
            {plan.type}
          </p>
        </div>

        <div className="border-b border-white/10 p-5 sm:border-b-0 sm:border-r sm:p-6">
          <p className="text-[8px] uppercase tracking-[0.2em] text-white/35">
            Approx. Area
          </p>

          <p className="mt-2 font-serif text-xl text-white">
            {plan.area}
            <span className="ml-1 text-[9px] text-white/35">
              SQ.FT.
            </span>
          </p>
        </div>

        <div className="border-b border-white/10 p-5 sm:border-b-0 sm:border-r sm:p-6">
          <p className="text-[8px] uppercase tracking-[0.2em] text-white/35">
            Bedrooms
          </p>

          <p className="mt-2 flex items-center gap-2 font-serif text-xl text-white">
            <BedDouble size={16} className="text-[#c5a46d]" />
            {plan.bedrooms}
          </p>
        </div>

        <div className="p-5 sm:p-6">
          <p className="text-[8px] uppercase tracking-[0.2em] text-white/35">
            Bathrooms
          </p>

          <p className="mt-2 flex items-center gap-2 font-serif text-xl text-white">
            <Home size={15} className="text-[#c5a46d]" />
            {plan.bathrooms}
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   GALLERY CARD
========================================================= */

function ImageCard({
  item,
  index,
}: {
  item: (typeof residenceGallery)[number];
  index: number;
}) {
  return (
    <div
      className={`spatial-card group relative overflow-hidden ${
        index === 1 || index === 4 ? "md:mt-12" : ""
      }`}
    >
      <div className="relative overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="h-[300px] w-full object-cover transition duration-1000 group-hover:scale-110 md:h-[400px]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-70 transition duration-700 group-hover:opacity-100" />

        <div className="absolute left-5 top-5 border border-white/30 bg-black/30 px-3 py-2 text-[9px] uppercase tracking-[0.18em] text-white backdrop-blur-md">
          {item.category}
        </div>

        <div className="absolute bottom-5 left-5 right-5 text-white transition duration-500 group-hover:translate-y-[-3px]">
          <h3 className="font-serif text-xl md:text-2xl">
            {item.title}
          </h3>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   FULLSCREEN VIEWER
========================================================= */

function FullscreenPlan({
  plan,
  initialView,
  onClose,
  onNext,
  onPrevious,
}: {
  plan: Plan;
  initialView: ViewMode;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}) {
  const [viewMode, setViewMode] = useState<ViewMode>(initialView);
  const [imageError, setImageError] = useState(false);

  const currentImage =
    viewMode === "2D" ? plan.image2D : plan.image3D;

  useEffect(() => {
    setViewMode(initialView);
  }, [plan.id, initialView]);

  useEffect(() => {
    setImageError(false);
  }, [currentImage]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onNext();
      if (event.key === "ArrowLeft") onPrevious();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, onNext, onPrevious]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-[#11120f]/[0.98] text-white backdrop-blur-xl">
      {/* MODAL HEADER */}
      <header className="relative z-20 flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 md:px-8">
        <div>
          <p className="text-[8px] uppercase tracking-[0.25em] text-[#c5a46d]">
            Vardha Builders · Residence Plans
          </p>

          <h2 className="mt-1 font-serif text-lg md:text-xl">
            {plan.type} — {plan.title}
          </h2>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close fullscreen viewer"
          className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/20 transition hover:bg-white hover:text-black"
        >
          <X size={17} />
        </button>
      </header>

      {/* FULLSCREEN IMAGE */}
      <div className="flex min-h-0 flex-1 items-center justify-center overflow-hidden px-5 py-5 md:px-16">
        {!imageError ? (
          <img
            key={`${plan.id}-${viewMode}`}
            src={currentImage}
            alt={`${plan.type} ${viewMode} floor plan`}
            onError={() => setImageError(true)}
            className="max-h-full max-w-full object-contain"
          />
        ) : (
          <div className="flex flex-col items-center gap-3 text-center text-white/60">
            <Home size={32} />

            <p className="font-serif text-xl">
              {plan.type} {viewMode} Plan
            </p>

            <p className="text-sm">
              Image could not be loaded. Please check the image path.
            </p>

            <p className="break-all text-xs">{currentImage}</p>
          </div>
        )}
      </div>

      {/* MODAL FOOTER */}
      <footer className="relative z-20 flex flex-col justify-between gap-4 border-t border-white/10 px-5 py-4 sm:flex-row sm:items-center md:px-8">
        <div className="flex flex-wrap items-center gap-4 text-[9px] uppercase tracking-[0.12em] text-white/55">
          <span>{plan.area} SQ.FT.</span>
          <span>{plan.bedrooms} Bedrooms</span>
          <span>{plan.bathrooms} Bathrooms</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() =>
              setViewMode((previous) =>
                previous === "2D" ? "3D" : "2D"
              )
            }
            className="flex h-10 items-center gap-2 border border-white/20 px-4 text-[9px] uppercase tracking-[0.12em] transition hover:bg-[#c5a46d] hover:text-black"
          >
            <Move3d size={14} />

            View {viewMode === "2D" ? "3D" : "2D"}
          </button>

          <button
            type="button"
            onClick={onPrevious}
            aria-label="Previous plan"
            className="flex h-10 w-10 items-center justify-center border border-white/20 transition hover:bg-white hover:text-black"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            type="button"
            onClick={onNext}
            aria-label="Next plan"
            className="flex h-10 w-10 items-center justify-center border border-white/20 transition hover:bg-white hover:text-black"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </footer>
    </div>
  );
}

/* =========================================================
   MAIN FLOOR PLANS PAGE
========================================================= */

export default function FloorPlans() {
  const [activePlanId, setActivePlanId] = useState("02");

  const [viewModes, setViewModes] = useState<Record<string, ViewMode>>({
    "02": "2D",
    "03": "2D",
    "04": "2D",
  });

  const [viewerPlanId, setViewerPlanId] = useState<string | null>(null);

  const selectedPlan =
    plans.find((plan) => plan.id === activePlanId) ?? plans[0];

  const viewerPlan =
    plans.find((plan) => plan.id === viewerPlanId) ?? null;

  const selectedView = viewModes[selectedPlan.id] ?? "2D";

  const toggleView = useCallback((planId: string) => {
    setViewModes((previous) => ({
      ...previous,
      [planId]: previous[planId] === "2D" ? "3D" : "2D",
    }));
  }, []);

  const openViewer = useCallback((planId: string) => {
    setViewerPlanId(planId);
  }, []);

  const closeViewer = useCallback(() => {
    setViewerPlanId(null);
  }, []);

  const nextPlan = useCallback(() => {
    setViewerPlanId((currentId) => {
      const index = plans.findIndex((plan) => plan.id === currentId);

      return plans[(index + 1 + plans.length) % plans.length].id;
    });
  }, []);

  const previousPlan = useCallback(() => {
    setViewerPlanId((currentId) => {
      const index = plans.findIndex((plan) => plan.id === currentId);

      return plans[(index - 1 + plans.length) % plans.length].id;
    });
  }, []);

  /* =========================================================
     GSAP ANIMATIONS
  ========================================================= */

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.fromTo(
        ".floor-hero-content",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          delay: 0.15,
        }
      );

      gsap.fromTo(
        ".floor-hero-image",
        { scale: 1.08 },
        { scale: 1, duration: 1.7, ease: "power3.out" }
      );

      gsap.utils
        .toArray<HTMLElement>(".reveal-section")
        .forEach((section) => {
          gsap.fromTo(
            section,
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 86%",
                once: true,
              },
            }
          );
        });

      gsap.utils
        .toArray<HTMLElement>(".parallax-image")
        .forEach((image) => {
          gsap.to(image, {
            yPercent: -10,
            ease: "none",
            scrollTrigger: {
              trigger: image,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });

      gsap.utils
        .toArray<HTMLElement>(".spatial-card")
        .forEach((card, index) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              duration: 0.75,
              delay: index * 0.04,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                once: true,
              },
            }
          );
        });
    });

    return () => context.revert();
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[#eeece5] text-[#151614]">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative min-h-[88vh] overflow-hidden bg-[#10110f] text-[#f5f1e9] md:min-h-screen">
        <img
          src={images.hero}
          alt="Vardha Builders architectural floor plans"
          className="floor-hero-image absolute inset-0 h-full w-full object-cover opacity-65"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25" />

        <div className="absolute right-5 top-1/2 hidden -translate-y-1/2 rotate-90 text-[8px] uppercase tracking-[0.4em] text-white/50 lg:block">
          VARDHA / SPATIAL COLLECTION / 004
        </div>

        <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-[1500px] items-end px-6 pb-20 pt-32 md:min-h-screen md:px-12 md:pb-24 lg:px-20">
          <div className="floor-hero-content max-w-4xl">
            <div className="mb-6 flex items-center gap-3 text-[9px] uppercase tracking-[0.28em] text-[#c5a46d]">
              <span className="h-px w-9 bg-[#c5a46d]" />
              Vardha Builders · Floor Plans
            </div>

            <h1 className="max-w-4xl font-serif text-4xl leading-[0.98] tracking-[-0.025em] sm:text-5xl md:text-6xl lg:text-[72px]">
              Spaces
              <br />
              <span className="text-[#c5a46d]">Designed</span>
              <br />
              Around Life.
            </h1>

            <div className="mt-7 flex max-w-2xl flex-col justify-between gap-6 md:flex-row md:items-end">
              <p className="max-w-xl text-[13px] leading-6 text-white/65 md:text-sm">
                Thoughtfully planned residences where architecture,
                movement, natural light and everyday living come together.
              </p>

              <a
                href="#residences"
                className="group flex shrink-0 items-center gap-3 text-[9px] uppercase tracking-[0.2em]"
              >
                Explore Plans

                <span className="flex h-10 w-10 items-center justify-center border border-white/30 transition group-hover:bg-white group-hover:text-black">
                  <ArrowDown size={14} />
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/10">
          <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-4 text-[8px] uppercase tracking-[0.18em] text-white/40 md:px-12 lg:px-20">
            <span>01 — Residential Planning</span>

            <span className="hidden md:block">
              Architecture / Function / Light
            </span>

            <span>Scroll to explore</span>
          </div>
        </div>
      </section>

      {/* =====================================================
          INTRODUCTION
      ===================================================== */}

      <section className="reveal-section px-6 py-20 md:px-12 md:py-24 lg:px-20">
        <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-[9px] uppercase tracking-[0.25em] text-[#a58a59]">
              01 / Planning Philosophy
            </p>

            <div className="mt-7 h-px w-16 bg-[#c5a46d]" />
          </div>

          <div>
            <h2 className="max-w-5xl font-serif text-3xl leading-[1.1] tracking-[-0.02em] md:text-4xl lg:text-5xl">
              A floor plan is more than a drawing.
              <span className="text-black/35">
                {" "}It is the beginning of how a home will feel.
              </span>
            </h2>

            <div className="mt-8 grid gap-6 border-t border-black/10 pt-7 md:grid-cols-2">
              <p className="text-[13px] leading-6 text-black/55">
                Every Vardha residence is planned around the rhythm of
                everyday life, from morning light and family gatherings to
                private corners and quiet evenings.
              </p>

              <p className="text-[13px] leading-6 text-black/55">
                Proportion, circulation, ventilation and natural light are
                considered together to create spaces that feel intuitive,
                spacious and timeless.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          RESIDENCE COLLECTION
      ===================================================== */}

      <section
        id="residences"
        className="bg-[#151613] px-6 py-20 text-[#f4f0e7] md:px-12 md:py-24 lg:px-20"
      >
        <div className="mx-auto max-w-[1500px]">
          <div className="reveal-section mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-[9px] uppercase tracking-[0.25em] text-[#c5a46d]">
                02 / Residence Collection
              </p>

              <h2 className="mt-4 max-w-3xl font-serif text-3xl leading-[1.08] md:text-4xl lg:text-5xl">
                Three ways to
                <br />
                <span className="text-[#c5a46d]">live beautifully.</span>
              </h2>
            </div>

            <p className="max-w-sm text-[13px] leading-6 text-white/45">
              Choose your preferred residence, explore the 2D layout and
              switch to the 3D floor plan whenever you want.
            </p>
          </div>

          {/* 2 BHK / 3 BHK / 4 BHK SELECTOR */}
          <div className="mb-7 grid grid-cols-3 border-y border-white/10">
            {plans.map((plan) => {
              const isActive = activePlanId === plan.id;

              return (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => setActivePlanId(plan.id)}
                  aria-pressed={isActive}
                  className={`relative border-r border-white/10 px-3 py-4 text-left transition last:border-r-0 sm:px-6 sm:py-5 ${
                    isActive
                      ? "bg-white/[0.06] text-white"
                      : "text-white/40 hover:bg-white/[0.03] hover:text-white/80"
                  }`}
                >
                  <span className="block text-[8px] uppercase tracking-[0.15em]">
                    Residence {plan.id}
                  </span>

                  <span className="mt-1.5 block font-serif text-lg sm:text-2xl">
                    {plan.type}
                  </span>

                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c5a46d]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* SELECTED RESIDENCE DETAILS */}
          <div className="grid gap-7 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="reveal-section min-w-0">
              <FloorPlanViewer
                key={selectedPlan.id}
                plan={selectedPlan}
                viewMode={selectedView}
                onToggleView={() => toggleView(selectedPlan.id)}
                onOpen={() => openViewer(selectedPlan.id)}
              />
            </div>

            <div className="reveal-section flex flex-col justify-between border border-white/10 bg-[#1c1d19] p-6 md:p-8">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[8px] uppercase tracking-[0.22em] text-[#c5a46d]">
                    Residence {selectedPlan.id}
                  </span>

                  <span className="font-serif text-2xl text-white/15 sm:text-3xl">
                    {selectedPlan.type}
                  </span>
                </div>

                <h3 className="mt-8 font-serif text-3xl leading-tight md:text-4xl">
                  {selectedPlan.title}
                </h3>

                <p className="mt-5 text-[13px] leading-6 text-white/50">
                  {selectedPlan.description}
                </p>

                <p className="mt-5 text-[9px] uppercase leading-5 tracking-[0.13em] text-[#c5a46d]">
                  {selectedPlan.accent}
                </p>
              </div>

              <div className="mt-9">
                <p className="text-[8px] uppercase tracking-[0.22em] text-white/35">
                  Ideal For
                </p>

                <p className="mt-2 text-[13px] text-white/75">
                  {selectedPlan.idealFor}
                </p>

                <div className="mt-6 grid grid-cols-2 border-t border-white/10">
                  <div className="border-r border-white/10 py-5">
                    <p className="text-[8px] uppercase tracking-[0.16em] text-white/30">
                      Area
                    </p>

                    <p className="mt-2 font-serif text-xl">
                      {selectedPlan.area}
                      <span className="ml-1 text-[9px] text-white/35">
                        SQ.FT.
                      </span>
                    </p>
                  </div>

                  <div className="py-5 pl-5">
                    <p className="text-[8px] uppercase tracking-[0.16em] text-white/30">
                      Layout
                    </p>

                    <p className="mt-2 font-serif text-xl">
                      {selectedPlan.type}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => openViewer(selectedPlan.id)}
                  className="group mt-2 flex min-h-12 w-full items-center justify-between border border-white/15 px-5 py-3.5 text-[9px] uppercase tracking-[0.16em] transition hover:bg-[#c5a46d] hover:text-black"
                >
                  Open Fullscreen Plan

                  <Maximize2
                    size={15}
                    className="transition group-hover:scale-110"
                  />
                </button>

                <button
                  type="button"
                  onClick={() => toggleView(selectedPlan.id)}
                  className="group mt-3 flex min-h-12 w-full items-center justify-between bg-[#c5a46d] px-5 py-3.5 text-[9px] uppercase tracking-[0.16em] text-black transition hover:bg-[#d5b77f]"
                >
                  {selectedView === "2D" ? "Switch to 3D" : "Switch to 2D"}

                  <ArrowRight
                    size={15}
                    className="transition group-hover:translate-x-1"
                  />
                </button>
              </div>
            </div>
          </div>

          <p className="mt-4 text-[8px] uppercase tracking-[0.15em] text-white/30">
            Selected: {selectedPlan.type} · Current view: {selectedView}
          </p>
        </div>
      </section>

      {/* =====================================================
          NUMBERS
      ===================================================== */}

      <section className="bg-[#e7e4dc] px-6 py-14 md:px-12 lg:px-20">
        <div className="mx-auto grid max-w-[1500px] divide-y divide-black/10 border-y border-black/10 sm:grid-cols-2 sm:divide-y-0 md:grid-cols-4 md:divide-x">
          {[
            ["03", "Residence Types"],
            ["1,120", "2 BHK Area · SQ.FT."],
            ["1,680", "3 BHK Area · SQ.FT."],
            ["2,240", "4 BHK Area · SQ.FT."],
          ].map(([number, label]) => (
            <div key={label} className="px-5 py-7 md:px-6 md:py-9">
              <p className="font-serif text-3xl md:text-4xl">{number}</p>

              <p className="mt-2 text-[8px] uppercase tracking-[0.16em] text-black/45">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          SPATIAL JOURNAL
      ===================================================== */}

      <section className="px-6 py-20 md:px-12 md:py-24 lg:px-20">
        <div className="mx-auto max-w-[1500px]">
          <div className="reveal-section grid gap-7 md:grid-cols-[1fr_0.7fr] md:items-end">
            <div>
              <p className="text-[9px] uppercase tracking-[0.25em] text-[#a58a59]">
                03 / Spatial Journal
              </p>

              <h2 className="mt-4 font-serif text-3xl leading-tight md:text-4xl lg:text-5xl">
                Where plans become
                <br />
                <span className="text-black/35">places.</span>
              </h2>
            </div>

            <p className="text-[13px] leading-6 text-black/50">
              Explore the materials, interiors and architectural details
              that shape the Vardha residential experience.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {residenceGallery.map((item, index) => (
              <ImageCard key={item.title} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          ARCHITECTURE PARALLAX
      ===================================================== */}

      <section className="relative h-[65vh] min-h-[450px] overflow-hidden bg-black">
        <img
          src={images.architecture}
          alt="Vardha residential architecture"
          className="parallax-image absolute inset-0 h-[115%] w-full object-cover opacity-75"
        />

        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 flex h-full items-end px-6 pb-14 md:px-12 md:pb-18 lg:px-20">
          <div className="mx-auto w-full max-w-[1500px]">
            <div className="max-w-3xl">
              <p className="text-[9px] uppercase tracking-[0.25em] text-[#c5a46d]">
                Architecture / Material / Light
              </p>

              <h2 className="mt-5 font-serif text-3xl leading-tight text-white md:text-4xl lg:text-5xl">
                Designed for the way
                <br />
                <span className="text-white/50">
                  life actually happens.
                </span>
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          DESIGN PRINCIPLES
      ===================================================== */}

      <section className="bg-[#151613] px-6 py-20 text-white md:px-12 md:py-24 lg:px-20">
        <div className="mx-auto max-w-[1500px]">
          <div className="reveal-section grid gap-7 md:grid-cols-[0.5fr_1.5fr]">
            <div>
              <p className="text-[9px] uppercase tracking-[0.25em] text-[#c5a46d]">
                04 / Spatial Philosophy
              </p>
            </div>

            <h2 className="font-serif text-3xl leading-tight md:text-4xl lg:text-5xl">
              Four principles behind
              <br />
              <span className="text-[#c5a46d]">
                every Vardha plan.
              </span>
            </h2>
          </div>

          <div className="mt-12 border-t border-white/10">
            {[
              {
                number: "01",
                title: "Natural Light",
                text: "Spaces are positioned to invite daylight deeper into the home.",
              },
              {
                number: "02",
                title: "Intelligent Flow",
                text: "Circulation is planned to make everyday movement effortless.",
              },
              {
                number: "03",
                title: "Privacy",
                text: "Private rooms and shared spaces are carefully separated.",
              },
              {
                number: "04",
                title: "Human Scale",
                text: "Every proportion is considered around how people live.",
              },
            ].map((item) => (
              <div
                key={item.number}
                className="grid gap-3 border-b border-white/10 py-6 md:grid-cols-[70px_0.7fr_1fr] md:items-center md:gap-5"
              >
                <span className="font-serif text-xl text-white/25">
                  {item.number}
                </span>

                <h3 className="font-serif text-xl md:text-2xl">
                  {item.title}
                </h3>

                <p className="max-w-lg text-[13px] leading-6 text-white/45">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTACT CTA
      ===================================================== */}

      <section className="bg-[#c5a46d] px-6 py-20 md:px-12 md:py-24 lg:px-20">
        <div className="mx-auto grid max-w-[1500px] gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="text-[9px] uppercase tracking-[0.25em] text-black/50">
              05 / Begin Your Journey
            </p>

            <h2 className="mt-5 max-w-4xl font-serif text-4xl leading-[1.02] tracking-[-0.02em] md:text-5xl lg:text-6xl">
              Find the space
              <br />
              that feels like home.
            </h2>
          </div>

          <Link
            to="/contact"
            className="group flex min-h-14 items-center justify-between gap-8 border border-black/30 px-5 text-[9px] uppercase tracking-[0.16em] transition hover:bg-black hover:text-white"
          >
            Talk to Vardha

            <ArrowRight
              size={16}
              className="transition group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="bg-[#10110f] px-6 py-7 text-white md:px-12 lg:px-20">
        <div className="mx-auto flex max-w-[1500px] flex-col justify-between gap-3 text-[8px] uppercase tracking-[0.18em] text-white/35 md:flex-row">
          <span>© {new Date().getFullYear()} Vardha Builders</span>

          <span>Building Dreams. Creating Landmarks.</span>

          <Link to="/" className="transition hover:text-white">
            Back to Home
          </Link>
        </div>
      </footer>

      {/* =====================================================
          FULLSCREEN MODAL
      ===================================================== */}

      {viewerPlan && (
        <FullscreenPlan
          key={viewerPlan.id}
          plan={viewerPlan}
          initialView={viewModes[viewerPlan.id] ?? "2D"}
          onClose={closeViewer}
          onNext={nextPlan}
          onPrevious={previousPlan}
        />
      )}
    </main>
  );
}