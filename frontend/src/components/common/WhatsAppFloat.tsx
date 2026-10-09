import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "919999999999";

export default function WhatsAppFloat() {
  const message = encodeURIComponent(
    "Hello Vardha Builders, I would like to know more about your projects."
  );

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Vardha Builders on WhatsApp"
      className="fixed bottom-6 right-6 z-[100] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_35px_rgba(0,0,0,0.2)] transition-all duration-300 hover:scale-110 hover:shadow-[0_15px_40px_rgba(0,0,0,0.28)]"
    >
      <MessageCircle size={25} strokeWidth={1.8} />

      <span className="pointer-events-none absolute right-0 top-0 h-3 w-3 rounded-full border-2 border-white bg-[#b58a43]" />
    </a>
  );
}