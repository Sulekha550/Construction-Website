export default function Preloader() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-vardha-black text-white">
      <div className="w-[min(420px,80vw)] text-center">
        <div className="mb-6 text-[10px] uppercase tracking-[0.45em] text-vardha-gold">V</div>
        <div className="font-display text-4xl tracking-wide">Vardha Builders</div>
        <p className="mt-3 text-[10px] uppercase tracking-[0.35em] text-white/50">Building Dreams Since 2014</p>
        <div className="mt-10 h-px overflow-hidden bg-white/10">
          <div className="h-full w-1/2 animate-[load_1s_ease-in-out_infinite] bg-vardha-gold" />
        </div>
      </div>
    </div>
  );
}