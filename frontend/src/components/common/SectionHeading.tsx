type Props = { eyebrow: string; title: string; text?: string };

export default function SectionHeading({ eyebrow, title, text }: Props) {
  return (
    <div className="max-w-3xl">
      <p className="mb-4 text-[10px] uppercase tracking-[0.4em] text-vardha-gold">{eyebrow}</p>
      <h2 className="font-display text-5xl leading-none sm:text-6xl lg:text-7xl">{title}</h2>
      {text && <p className="mt-6 max-w-2xl text-sm leading-7 text-black/55">{text}</p>}
    </div>
  );
}