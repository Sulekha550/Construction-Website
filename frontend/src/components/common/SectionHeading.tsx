import type { ReactNode } from "react";

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string | ReactNode;
  text?: string | ReactNode;
  subtitle?: string | ReactNode;
  align?: "left" | "center";
  className?: string;
  badge?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  text,
  subtitle,
  align = "left",
  className = "",
  badge,
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const desc = text || subtitle;

  return (
    <div
      className={`max-w-3xl ${
        isCenter ? "mx-auto text-center" : ""
      } ${className}`}
    >
      {eyebrow && (
        <div
          className={`mb-4 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.3em] text-[#c7a15c] ${
            isCenter ? "justify-center" : ""
          }`}
        >
          <span className="h-px w-8 bg-[#c7a15c]" />
          <span>{eyebrow}</span>
          {isCenter && <span className="h-px w-8 bg-[#c7a15c]" />}
        </div>
      )}

      {badge && (
        <span className="mb-3 inline-block font-mono text-[8px] uppercase tracking-[0.25em] text-white/40">
          {badge}
        </span>
      )}

      <h2 className="font-display text-[clamp(2.2rem,4.5vw,4.5rem)] font-medium leading-[0.96] tracking-[-0.04em] text-white">
        {title}
      </h2>

      {desc && (
        <p className="mt-5 text-[13px] leading-7 text-white/65 sm:text-sm sm:leading-7">
          {desc}
        </p>
      )}
    </div>
  );
}