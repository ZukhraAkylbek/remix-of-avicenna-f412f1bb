import { Phone } from "lucide-react";
import { CLINIC } from "@/lib/clinic";

const BASE = "inline-flex items-center gap-2 rounded-md border px-4 py-2.5 text-sm font-semibold transition-colors";

export function ContactButtons({ onDark = false }: { onDark?: boolean; only?: "whatsapp" | "phone" }) {
  const tel = onDark
    ? "border-brand-white/40 bg-transparent text-brand-white hover:bg-brand-white hover:text-about-ink"
    : "border-about-line bg-white text-about-ink hover:bg-brand-green hover:text-white";
  return (
    <a href={"tel:" + CLINIC.phones[0]} className={`${BASE} ${tel}`}>
      <Phone className="size-4 shrink-0" />
      +996 779 909 009
    </a>
  );
}
