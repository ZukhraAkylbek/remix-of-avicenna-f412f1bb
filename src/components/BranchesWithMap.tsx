import { useEffect, useRef, useState } from "react";
import { MapPin, Navigation, Phone } from "lucide-react";

import { ScrollArrow } from "@/components/ScrollArrows";
import "leaflet/dist/leaflet.css";

import { CLINIC, doubleGisSearchUrl, googleMapsDirectionsUrl } from "@/lib/clinic";

const pinSvg = (active: boolean) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${active ? 38 : 32}" height="${active ? 49 : 42}" viewBox="0 0 40 52">
      <path d="M20 1C10.6 1 3 8.6 3 18c0 12 17 33 17 33s17-21 17-33C37 8.6 29.4 1 20 1z" fill="${active ? "#0f7a37" : "#16a34a"}" stroke="#ffffff" stroke-width="${active ? 3 : 2.5}"/>
      <circle cx="20" cy="18" r="6.5" fill="${active ? "#bbf7d0" : "#ffffff"}"/>
    </svg>`;

const escapeHtml = (s: string) => s.replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);

/** Карта филиалов с зелёными интерактивными метками (Leaflet + OpenStreetMap, без API-ключей). */
export function BranchesWithMap() {
  const [active, setActive] = useState(0);
  const [failed, setFailed] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const leafletRef = useRef<any>(null);

  const switchBranch = (direction: "left" | "right") => {
    const list = listRef.current;
    const next = direction === "left"
      ? (active === 0 ? branches.length - 1 : active - 1)
      : (active === branches.length - 1 ? 0 : active + 1);

    setActive(next);
    if (!list) return;
    const card = list.children.item(next) as HTMLElement | null;
    if (!card) return;
    list.scrollTo({ left: card.offsetLeft - list.offsetLeft, behavior: "smooth" });
  };

  const branches = CLINIC.branches;
  const branch = branches[active] ?? branches[0]!;
  const phone = CLINIC.phones[0] ?? "";

  useEffect(() => {
    let cancelled = false;
    import("leaflet")
      .then((mod) => {
        const L = (mod as any).default ?? mod;
        if (cancelled || !containerRef.current || mapRef.current) return;
        leafletRef.current = L;

        const map = L.map(containerRef.current, {
          scrollWheelZoom: false,
          attributionControl: true,
        }).setView([branches[0]!.latitude, branches[0]!.longitude], 12);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: "&copy; OpenStreetMap",
        }).addTo(map);

        mapRef.current = map;

        markersRef.current = branches.map((b, i) => {
          const marker = L.marker([b.latitude, b.longitude], {
            title: b.street,
            icon: L.divIcon({
              html: pinSvg(false),
              className: "avicenna-pin",
              iconSize: [32, 42],
              iconAnchor: [16, 42],
              popupAnchor: [0, -38],
            }),
          }).addTo(map);
          marker.bindPopup(
            `<div style="font-family:inherit;max-width:220px">
               <div style="font-weight:700;font-size:14px;color:#111">${escapeHtml(b.street)}</div>
               <div style="font-size:12px;color:#16a34a;font-weight:600;margin-top:2px">${escapeHtml(b.subtitle)}</div>
               <div style="font-size:12px;color:#555;margin-top:2px">${escapeHtml(b.city)}, Кыргызстан</div>
               <div style="display:flex;gap:10px;margin-top:8px">
                 <a href="${googleMapsDirectionsUrl(b.latitude, b.longitude, `${b.street}, ${b.city}`)}" target="_blank" rel="noopener noreferrer"
                    style="font-size:12px;font-weight:700;color:#16a34a">Маршрут →</a>
                 <a href="${doubleGisSearchUrl(b.street)}" target="_blank" rel="noopener noreferrer"
                    style="font-size:12px;font-weight:700;color:#16a34a">2ГИС</a>
               </div>
             </div>`,
          );
          marker.on("click", () => setActive(i));
          return marker;
        });

        map.fitBounds(
          branches.map((b) => [b.latitude, b.longitude]) as any,
          { padding: [40, 40] },
        );
        setTimeout(() => map.invalidateSize(), 200);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markersRef.current = [];
      }
    };
  }, [branches]);

  // Подсветка активной метки, центрирование и подсказка с адресом
  useEffect(() => {
    const L = leafletRef.current;
    if (!L || !mapRef.current || markersRef.current.length === 0) return;
    markersRef.current.forEach((marker, i) => {
      const isActive = i === active;
      marker.setIcon(
        L.divIcon({
          html: pinSvg(isActive),
          className: "avicenna-pin",
          iconSize: isActive ? [38, 49] : [32, 42],
          iconAnchor: isActive ? [19, 49] : [16, 42],
          popupAnchor: [0, isActive ? -45 : -38],
        }),
      );
      marker.setZIndexOffset(isActive ? 1000 : 0);
    });
    const b = branches[active];
    const marker = markersRef.current[active];
    if (b && marker) {
      mapRef.current.panTo([b.latitude, b.longitude]);
      marker.openPopup();
    }
  }, [active, branches]);

  // Выбор филиала из ссылки вида /?filial=N#filialy (например, из подвала)
  useEffect(() => {
    const raw = new URLSearchParams(window.location.search).get("filial");
    if (raw === null) return;
    const n = Number(raw);
    if (!Number.isInteger(n) || n < 0 || n >= CLINIC.branches.length) return;
    setActive(n);
    const list = listRef.current;
    if (list) {
      const card = list.children.item(n) as HTMLElement | null;
      if (card) list.scrollTo({ left: card.offsetLeft - list.offsetLeft, behavior: "smooth" });
    }
    document.getElementById("filialy")?.scrollIntoView({ behavior: "smooth" });
  }, []);





  return (
    <section id="filialy" className="border-border border-t py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <span className="eyebrow">Наши филиалы</span>
        <h2 className="text-foreground mt-2 text-xl font-extrabold tracking-tight sm:text-2xl lg:text-3xl">
          {branches.length} филиалов в Бишкеке
        </h2>
        <p className="text-muted-foreground mt-2 max-w-2xl text-[15px] sm:text-base">
          Нажмите на адрес или зелёную метку — карта покажет нужный филиал.
        </p>

        <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
          {/* Список адресов: горизонтальный скролл на мобильном */}
          <div className="min-w-0">
            <div className="mb-3 flex items-center justify-between lg:hidden">
              <span className="text-muted-foreground text-xs">Листайте адреса</span>
              <div className="flex gap-2">
                <ScrollArrow
                  dir={-1}
                  label="Прокрутить филиалы влево"
                  onClick={() => switchBranch("left")}
                  className="relative"
                />
                <ScrollArrow
                  dir={1}
                  label="Прокрутить филиалы вправо"
                  onClick={() => switchBranch("right")}
                  className="relative"
                />
              </div>
            </div>

            <ul
              ref={listRef}
              className="no-scrollbar flex snap-x gap-2 overflow-x-auto pb-1 lg:grid lg:gap-2 lg:overflow-visible"
            >
              {branches.map((b, i) => {
                const isActive = i === active;
                return (
                  <li key={b.name} className="w-[220px] shrink-0 snap-start lg:w-auto">
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      aria-pressed={isActive}
                      className={`flex h-full w-full flex-col rounded-xl border p-3 text-left transition-colors ${
                        isActive
                          ? "border-brand-green bg-surface-green"
                          : "border-border bg-card hover:border-brand-green/40"
                      }`}
                    >
                      <p className="text-foreground flex items-start gap-2 text-[14px] leading-snug font-bold">
                        <MapPin className="text-brand-green mt-0.5 size-4 shrink-0" />
                        <span className="min-w-0">{b.street}</span>
                      </p>
                      <div className="mt-auto flex items-end justify-between gap-2 pt-2 pl-6">
                        <span className="text-brand-green text-[12px] font-semibold">
                          {b.subtitle}
                        </span>
                        <a
                          href={doubleGisSearchUrl(b.street)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-brand-green hover:text-brand-green-dark shrink-0 text-[11px] font-extrabold tracking-wide uppercase"
                          aria-label={`Открыть ${b.street} в 2ГИС`}
                        >
                          2ГИС
                        </a>
                      </div>
                    </button>

                  </li>
                );
              })}
            </ul>
          </div>

          <div className="border-border relative isolate z-0 overflow-hidden rounded-2xl border">
            {failed ? (
              <iframe
                title={`Карта: ${branch.name}`}
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${branch.longitude - 0.02}%2C${branch.latitude - 0.02}%2C${branch.longitude + 0.02}%2C${branch.latitude + 0.02}&layer=mapnik&marker=${branch.latitude}%2C${branch.longitude}`}
                loading="lazy"
                className="h-[240px] w-full border-0 sm:h-[300px] lg:h-[360px]"
              />
            ) : (
              <div
                ref={containerRef}
                role="application"
                aria-label="Карта филиалов клиники «Авиценна»"
                className="bg-surface-soft h-[240px] w-full sm:h-[300px] lg:h-[360px]"
              />
            )}
            <div className="bg-card flex flex-wrap items-center gap-2 p-3">
              <a
                href={googleMapsDirectionsUrl(
                  branch.latitude,
                  branch.longitude,
                  `${branch.street}, ${branch.city}`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-green text-brand-white hover:bg-brand-green-dark inline-flex items-center gap-2 rounded-xl px-4 py-2 text-[13px] font-bold transition-colors"
              >
                <Navigation className="size-4" /> Маршрут — {branch.street}
              </a>

              <a
                href={doubleGisSearchUrl(branch.street)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground ring-border hover:bg-surface-green inline-flex items-center rounded-xl px-4 py-2 text-[13px] font-bold ring-1 ring-inset transition-colors"
              >
                2ГИС
              </a>
              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="text-foreground ring-border hover:bg-surface-green inline-flex items-center gap-2 rounded-xl px-4 py-2 text-[13px] font-bold ring-1 ring-inset transition-colors"
                >
                  <Phone className="size-4" /> Позвонить
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
