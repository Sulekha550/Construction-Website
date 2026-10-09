import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { projects } from "../data/projects";

export default function ProjectDetails() {
  const { id } = useParams();

  const project = projects.find(
    (item) => item.id === id || item.slug === id
  );

  if (!project) {
    return (
      <main className="min-h-screen bg-[var(--bg)] px-6 pb-24 pt-40 text-[var(--text)]">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-[9px] uppercase tracking-[.3em] text-[#b58a43]">
            Vardha / Portfolio
          </p>
          <h1 className="mt-5 font-display text-6xl tracking-[-.05em]">
            Project not found
          </h1>
          <Link
            to="/portfolio"
            className="mt-8 inline-flex items-center gap-3 border-b border-black/20 pb-3 font-mono text-[9px] uppercase tracking-[.2em]"
          >
            <ArrowLeft size={14} />
            Back to Portfolio
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[var(--bg)] text-[var(--text)]">
      {/* HERO */}
      <section className="relative h-[76vh] min-h-[560px] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        <div className="absolute left-0 right-0 top-0 mx-auto max-w-7xl px-6 pt-32 lg:px-12">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-3 font-mono text-[8px] uppercase tracking-[.25em] text-white/60 transition hover:text-white"
          >
            <ArrowLeft size={13} />
            Back to Portfolio
          </Link>
        </div>

        <div className="absolute bottom-10 left-0 right-0 mx-auto max-w-7xl px-6 text-white lg:px-12">
          <div className="flex flex-wrap items-center gap-3 font-mono text-[8px] uppercase tracking-[.2em] text-[#d6b574]">
            <span>{project.category}</span>
            <span className="h-px w-6 bg-white/30" />
            <span>{project.status}</span>
            <span className="h-px w-6 bg-white/30" />
            <span>{project.year}</span>
          </div>

          <h1 className="mt-4 max-w-5xl font-display text-[clamp(3.5rem,8vw,8rem)] leading-[.82] tracking-[-.06em]">
            {project.title}
          </h1>

          <div className="mt-5 flex items-center gap-2 text-sm text-white/60">
            <MapPin size={14} />
            {project.location}
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="px-6 py-20 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1.15fr_.85fr]">
          <div>
            <p className="max-w-3xl text-base leading-8 text-black/60 dark:text-white/55 md:text-lg">
              {project.description}
            </p>

            <h2 className="mt-16 font-display text-4xl tracking-[-.04em]">
              Project details
            </h2>

            <div className="mt-7 grid grid-cols-2 border-y border-black/10 dark:border-white/10 md:grid-cols-3">
              {project.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="border-r border-black/10 px-5 py-6 last:border-r-0 dark:border-white/10"
                >
                  <div className="font-display text-2xl">{stat.value}</div>
                  <div className="mt-2 font-mono text-[8px] uppercase tracking-[.18em] opacity-40">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <h2 className="mt-16 font-display text-4xl tracking-[-.04em]">
              Amenities
            </h2>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.amenities.map((amenity) => (
                <span
                  key={amenity}
                  className="border border-black/10 px-4 py-2.5 text-xs dark:border-white/10"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          <aside className="h-fit border border-black/10 bg-[#e9e5dc] p-7 dark:border-white/10 dark:bg-[#171918] lg:sticky lg:top-28">
            <span className="font-mono text-[8px] uppercase tracking-[.25em] text-[#b58a43]">
              Next step
            </span>

            <h3 className="mt-5 font-display text-3xl leading-none">
              Experience the project in person.
            </h3>

            <p className="mt-5 text-sm leading-6 opacity-55">
              Connect with Vardha Builders to discuss availability, project
              information or a site visit.
            </p>

            <Link
              to="/contact"
              className="mt-8 flex items-center justify-between bg-[#171816] px-5 py-4 font-mono text-[9px] uppercase tracking-[.2em] text-white transition hover:bg-[#b58a43]"
            >
              Schedule a Site Visit
              <ArrowUpRight size={14} />
            </Link>

            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-vardha-whatsapp"))}
              className="mt-3 flex w-full items-center justify-between border border-black/15 px-5 py-4 font-mono text-[9px] uppercase tracking-[.2em] transition hover:border-[#20d66b] hover:text-[#20d66b] dark:border-white/15"
            >
              Chat on WhatsApp
              <MessageCircle size={14} />
            </button>
          </aside>
        </div>
      </section>

      {/* GALLERY */}
      {project.gallery.length > 0 && (
        <section className="border-t border-black/10 px-6 py-20 lg:px-12 lg:py-28 dark:border-white/10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10">
              <span className="font-mono text-[9px] uppercase tracking-[.3em] text-[#b58a43]">
                Visual Study
              </span>
              <h2 className="mt-4 font-display text-5xl tracking-[-.045em]">
                Gallery
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {project.gallery.map((image, index) => (
                <div
                  key={`${image}-${index}`}
                  className={`overflow-hidden ${
                    index === 0 ? "md:col-span-2 md:row-span-2" : ""
                  }`}
                >
                  <img
                    src={image}
                    alt={`${project.title} gallery ${index + 1}`}
                    className="h-full min-h-[260px] w-full object-cover transition duration-700 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
