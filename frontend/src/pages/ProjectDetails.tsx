import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Compass,
  FileText,
  Home,
  Layers,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { projects } from "../data/projects";

export default function ProjectDetails() {
  const { id } = useParams();

  const normalizedId = id?.toLowerCase() ?? "";

  const project = projects.find(
    (item) =>
      item.id === normalizedId ||
      item.slug === normalizedId ||
      (normalizedId.includes("palm") && item.id === "palm-paradise") ||
      (normalizedId.includes("central") && item.id === "central-tower") ||
      (normalizedId.includes("adhvik") && item.id === "adhvik-skyline") ||
      (normalizedId === "project-one" && item.id === "palm-paradise") ||
      (normalizedId === "project-two" && item.id === "central-tower") ||
      (normalizedId === "project-three" && item.id === "adhvik-skyline")
  );

  if (!project) {
    return (
      <main className="min-h-screen bg-[var(--bg)] px-6 pb-24 pt-40 text-[var(--text)]">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-mono text-[9px] uppercase tracking-[.3em] text-[var(--gold)]">
            Vardha Builders · Portfolio
          </p>
          <h1 className="mt-4 font-display text-5xl tracking-[-.04em] sm:text-6xl">
            Project not found
          </h1>
          <p className="mt-4 text-sm text-[var(--text-soft)]">
            The requested project details could not be found. Please browse our active portfolio.
          </p>
          <Link
            to="/portfolio"
            className="mt-8 inline-flex items-center gap-3 border border-[var(--line-strong)] px-6 py-3 font-mono text-[10px] uppercase tracking-[.2em] transition hover:border-[var(--gold)] hover:text-[var(--gold)]"
          >
            <ArrowLeft size={14} />
            Back to All Projects
          </Link>
        </div>
      </main>
    );
  }

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Vardha Builders, I am interested in ${project.title} (${project.location}). Please share more details and floor plans.`
    );
    window.open(`https://wa.me/919999999999?text=${text}`, "_blank");
  };

  return (
    <main className="bg-[var(--bg)] text-[var(--text)] transition-colors duration-500">
      {/* HERO SECTION */}
      <section className="relative min-h-[75vh] w-full overflow-hidden bg-black lg:min-h-[82vh]">
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 h-full w-full object-cover opacity-85"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/70" />

        <div className="relative mx-auto flex min-h-[75vh] max-w-7xl flex-col justify-between px-6 pb-12 pt-28 sm:px-8 lg:min-h-[82vh] lg:px-12 lg:pb-16 lg:pt-36">
          <div>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-4 py-2 font-mono text-[9px] uppercase tracking-[.25em] text-white/80 backdrop-blur-md transition hover:border-white hover:text-white"
            >
              <ArrowLeft size={13} />
              Back to Portfolio
            </Link>
          </div>

          <div className="max-w-4xl text-white">
            <div className="flex flex-wrap items-center gap-3 font-mono text-[9px] uppercase tracking-[.2em]">
              <span className="rounded-md bg-[#059669] px-3 py-1 font-bold text-white shadow-sm">
                {project.badge}
              </span>
              <span className="text-[#e2c185]">{project.category}</span>
              <span className="h-3 w-px bg-white/30" />
              <span className="text-white/70">{project.type}</span>
              <span className="h-3 w-px bg-white/30" />
              <span className="text-white/70">{project.area}</span>
            </div>

            <h1 className="mt-4 font-display text-[2.8rem] font-medium leading-[0.95] tracking-[-0.035em] sm:text-[3.8rem] md:text-[4.6rem] lg:text-[5.4rem]">
              {project.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/75">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-[#d8b577]" />
                <span>{project.location}</span>
              </div>
              <span className="hidden h-3 w-px bg-white/20 sm:inline" />
              <div className="flex items-center gap-2 text-white/60">
                <Home size={15} />
                <span>{project.configuration}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK SPEC STRIP */}
      <section className="border-b border-[var(--line)] bg-[var(--surface)] py-6 shadow-sm">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-6 sm:grid-cols-4 lg:px-12">
          {project.stats.map((stat) => (
            <div key={stat.label} className="border-l-2 border-[var(--gold)] pl-4">
              <span className="block font-mono text-[8px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                {stat.label}
              </span>
              <span className="mt-1 block font-display text-lg font-semibold sm:text-xl">
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* MAIN CONTENT & INQUIRY SIDEBAR */}
      <section className="px-6 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
          {/* LEFT COLUMN: OVERVIEW & HIGHLIGHTS */}
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[var(--gold)]" />
              <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-[var(--gold)]">
                Project Overview
              </span>
            </div>

            <h2 className="mt-4 font-display text-3xl font-medium tracking-tight sm:text-4xl">
              Engineered with distinction, designed for permanence.
            </h2>

            <p className="mt-6 text-base leading-relaxed text-[var(--text-soft)] sm:text-lg">
              {project.description}
            </p>

            {/* KEY ARCHITECTURAL HIGHLIGHTS */}
            <div className="mt-12">
              <h3 className="font-display text-2xl font-medium tracking-tight">
                Key Highlights
              </h3>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {project.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="flex items-start gap-3 rounded-lg border border-[var(--line)] bg-[var(--surface)] p-4 transition-all hover:border-[var(--gold)]"
                  >
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#059669]" />
                    <span className="text-sm font-medium text-[var(--text)]">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* AMENITIES */}
            <div className="mt-12">
              <h3 className="font-display text-2xl font-medium tracking-tight">
                Premium Amenities & Facilities
              </h3>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {project.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="rounded-full border border-[var(--line-strong)] bg-[var(--surface-2)] px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-[var(--text)] transition hover:border-[var(--gold)]"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            {/* QUALITY SPECIFICATIONS */}
            <div className="mt-14 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <ShieldCheck size={22} className="text-[var(--gold)]" />
                <h4 className="font-display text-xl font-medium">
                  Vardha Construction Assurance
                </h4>
              </div>
              <div className="mt-5 grid gap-4 text-xs text-[var(--text-soft)] sm:grid-cols-3">
                <div>
                  <strong className="block text-[var(--text)]">RCC Structure</strong>
                  Seismic Zone compliant frame engineered for multi-generational durability.
                </div>
                <div>
                  <strong className="block text-[var(--text)]">Vastu Aligned</strong>
                  Optimal orientation prioritizing sunlight, ventilation and positive energy.
                </div>
                <div>
                  <strong className="block text-[var(--text)]">Legal & RERA</strong>
                  100% verified freehold clear titles and statutory approvals.
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: STICKY INQUIRY CARD */}
          <div>
            <aside className="sticky top-28 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 shadow-xl sm:p-8">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-[var(--gold)]">
                  Inquire Now
                </span>
                <span className="rounded-full bg-[#059669]/15 px-2.5 py-0.5 font-mono text-[9px] font-bold text-[#059669]">
                  {project.badge}
                </span>
              </div>

              <h3 className="mt-3 font-display text-2xl font-medium">
                Book a Site Visit or Request Pricing
              </h3>

              <p className="mt-2 text-xs leading-5 text-[var(--text-soft)]">
                Connect directly with the Vardha Builders executive desk for customized unit floorplans, site appointments, and pricing breakdown.
              </p>

              <div className="mt-6 space-y-3">
                <div className="rounded-lg bg-[var(--surface-2)] p-3 text-xs">
                  <span className="text-[var(--text-muted)]">Configuration: </span>
                  <strong className="text-[var(--text)]">{project.configuration}</strong>
                </div>
                <div className="rounded-lg bg-[var(--surface-2)] p-3 text-xs">
                  <span className="text-[var(--text-muted)]">Carpet / Super Area: </span>
                  <strong className="text-[var(--text)]">{project.area}</strong>
                </div>
                <div className="rounded-lg bg-[var(--surface-2)] p-3 text-xs">
                  <span className="text-[var(--text-muted)]">Location: </span>
                  <strong className="text-[var(--text)]">{project.location}</strong>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#059669] px-5 py-3.5 font-mono text-[10px] font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-[#047857]"
                >
                  <MessageCircle size={16} />
                  Chat on WhatsApp
                </button>

                <Link
                  to="/contact"
                  className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-[var(--line-strong)] bg-[var(--bg)] px-5 py-3.5 font-mono text-[10px] uppercase tracking-wider text-[var(--text)] transition hover:border-[var(--gold)] hover:text-[var(--gold)]"
                >
                  Schedule Site Visit
                  <ArrowUpRight size={14} />
                </Link>

                <Link
                  to="/floor-plans"
                  className="flex w-full items-center justify-center gap-2 rounded-xl py-2 font-mono text-[9px] uppercase tracking-widest text-[var(--text-muted)] transition hover:text-[var(--gold)]"
                >
                  <FileText size={13} />
                  View 2D / 3D Floor Plans
                </Link>
              </div>

              <div className="mt-6 border-t border-[var(--line)] pt-4 text-center">
                <span className="font-mono text-[8px] uppercase tracking-wider text-[var(--text-muted)]">
                  Direct Line: +91 99999 99999
                </span>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      {project.gallery.length > 0 && (
        <section className="border-t border-[var(--line)] bg-[var(--surface-2)] px-6 py-16 sm:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-[.3em] text-[var(--gold)]">
                  Visual Showcase
                </span>
                <h2 className="mt-2 font-display text-3xl font-medium tracking-tight sm:text-4xl">
                  {project.title} Architectural Gallery
                </h2>
              </div>
              <p className="max-w-md text-xs text-[var(--text-soft)]">
                Actual renders and photographic studies of materials, building elevations, and designed interiors.
              </p>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {project.gallery.map((imgSrc, idx) => (
                <div
                  key={`${imgSrc}-${idx}`}
                  className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-[var(--line)] bg-black shadow-md"
                >
                  <img
                    src={imgSrc}
                    alt={`${project.title} view ${idx + 1}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-3 left-3 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="font-mono text-[9px] uppercase tracking-wider">
                      {project.title} · View {idx + 1}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* OTHER PROJECTS FOOTER */}
      <section className="border-t border-[var(--line)] px-6 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[var(--gold)]">
              Explore More
            </span>
            <h3 className="mt-2 font-display text-3xl font-medium">
              Other Flagship Vardha Developments
            </h3>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects
              .filter((p) => p.id !== project.id)
              .map((other) => (
                <Link
                  key={other.id}
                  to={`/portfolio/${other.id}`}
                  className="group block overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] transition hover:shadow-lg"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-black">
                    <img
                      src={other.image}
                      alt={other.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute left-3 top-3">
                      <span className="rounded-md bg-[#059669] px-2.5 py-1 font-mono text-[9px] font-bold text-white">
                        {other.badge}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="font-display text-xl font-medium group-hover:text-[var(--gold)]">
                      {other.title}
                    </h4>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                      <MapPin size={12} />
                      {other.location}
                    </p>
                    <div className="mt-4 flex items-center justify-between border-t border-[var(--line)] pt-3 font-mono text-[9px] uppercase tracking-wider text-[var(--text-soft)]">
                      <span>{other.type}</span>
                      <span>{other.area}</span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}
