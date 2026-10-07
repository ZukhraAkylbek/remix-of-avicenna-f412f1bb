import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(
        window.scrollY + window.innerHeight >=
          document.documentElement.scrollHeight - 400
      );
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Наверх"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed right-4 bottom-[92px] z-40 grid size-12 place-items-center rounded-full bg-brand-green text-brand-white shadow-lg transition-opacity lg:bottom-6"
    >
      <ArrowUp size={24} />
    </button>
  );
}
