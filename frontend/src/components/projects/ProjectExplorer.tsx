import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../../data/projects";
import SectionHeading from "../common/SectionHeading";

export default function ProjectExplorer() {
  return (
    <section className="bg-vardha-cream px-5 py-24 text-vardha-black sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1440px]">
        <SectionHeading eyebrow="Selected Work" title="Spaces designed to endure." text="Explore a project-led presentation built for verified Vardha Builders developments." />
        <div className="mt-16 grid gap-5 lg:grid-cols-2">
          {projects.map((project, i) => (
            <Link key={project.slug} to={`/projects/${project.slug}`} className={`group relative overflow-hidden ${i === 0 ? "lg:mt-16" : ""}`}>
              <div className="aspect-[4/3] overflow-hidden bg-black">
                <img src={project.image} alt={project.name} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-6 pt-24 text-white">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.25em] text-vardha-gold">{project.category} · {project.status}</p>
                    <h3 className="mt-2 font-display text-4xl">{project.name}</h3>
                    <p className="mt-1 text-xs text-white/60">{project.location}</p>
                  </div>
                  <span className="rounded-full border border-white/30 p-3 transition group-hover:bg-vardha-gold group-hover:text-vardha-black"><ArrowUpRight size={18} /></span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  ); 
}