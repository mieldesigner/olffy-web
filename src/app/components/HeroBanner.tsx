import { useState, useEffect, useCallback } from "react";
import OlffyLogoNav from "../../imports/Frame75/index";
import { ChevronLeft, ChevronRight } from "lucide-react";
import imgBag from "figma:asset/431950b796fb1b4fdcf97b59b582366a89a58f05.png";
import imgSection from "figma:asset/9ff0aa4b09b454cd6e6e270ce351ff323baadbdc.png";

const C = { orange: "#e94300", purple: "#5957b0", yellow: "#fab405", cream: "#fff5d9" };

const piepie = "'PiepieW01-Regular', sans-serif";
const ivy = "'IvyPresto Text', 'IvyPresto_Text', Georgia, serif";
const poppins = "'Poppins', sans-serif";

const SLIDES = [
  {
    id: 1, bg: "#f2e0cc", img: imgSection, imgSide: "right" as const,
    eyebrow: "Nueva temporada", titleSerif: "Bienvenidos a", titleDisplay: "Olffy",
    subtitle: "Papelería ilustrada para organizar, crear y regalar con magia.",
    cta: "Explorar tienda", ctaBg: C.purple, ctaText: "#fff", dark: true, fullBleed: true,
  },
  {
    id: 2, bg: C.purple, img: null, imgSide: "right" as const,
    eyebrow: "Recién llegados", titleSerif: "Nuevos", titleDisplay: "Lanzamientos",
    subtitle: "Agendas, planners y cuadernos que te van a enamorar 🧡",
    cta: "Ver novedades", ctaBg: C.yellow, ctaText: "#000", dark: false,
  },
  {
    id: 3, bg: C.orange, img: null, imgSide: "right" as const,
    eyebrow: "¿Buscas el regalo perfecto?", titleSerif: "Kits de", titleDisplay: "Papelería",
    subtitle: "Regalos únicos para amigas, estudiantes y amantes del diseño.",
    cta: "Ver regalos", ctaBg: "#fff", ctaText: C.orange, dark: false,
  },
];

export function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  const goTo = useCallback((idx: number) => {
    if (fading) return;
    setFading(true);
    setTimeout(() => { setCurrent(((idx % SLIDES.length) + SLIDES.length) % SLIDES.length); setFading(false); }, 350);
  }, [fading]);

  useEffect(() => { const t = setInterval(() => goTo(current + 1), 5500); return () => clearInterval(t); }, [current, goTo]);

  const s = SLIDES[current];
  const textColor = s.dark ? "rgba(0,0,0,0.85)" : "#fff";
  const mutedColor = s.dark ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.7)";

  return (
    <div className="relative w-full overflow-hidden" style={{ background: s.bg, minHeight: 560, transition: "background 0.5s ease" }}>
      <div className="relative w-full h-full transition-opacity duration-350" style={{ opacity: fading ? 0 : 1, minHeight: 560 }}>
        {s.img && (s as any).fullBleed ? (
          <>
            <img src={s.img} alt="" className="absolute inset-0 w-full h-full object-cover object-center" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(242,224,204,0.92) 0%, rgba(242,224,204,0.75) 50%, rgba(242,224,204,0.1) 100%)" }} />
          </>
        ) : s.img ? (
          <div className="absolute right-0 top-0 w-1/2 h-full"><img src={s.img} alt="" className="w-full h-full object-cover object-right" /></div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center opacity-10" style={{ fontFamily: piepie, fontSize: 120, color: "#fff" }}>olffy</div>
        )}
        <div className="relative flex flex-col justify-center px-16 py-16 h-full max-w-[580px]" style={{ minHeight: 560 }}>
          <p className="mb-4 text-[13px] tracking-[0.2em] uppercase" style={{ fontFamily: poppins, color: mutedColor }}>{s.eyebrow}</p>
          <h1 className="leading-[1.05] mb-1" style={{ fontFamily: ivy, fontWeight: 300, fontSize: (s as any).fullBleed ? "52.695px" : "clamp(42px, 4.5vw, 72px)", fontStyle: "italic", color: textColor }}>{s.titleSerif}</h1>
          <div className="mb-6" style={{ width: 280, height: 86, position: "relative", ["--logo-color" as any]: current === 1 ? "#FAB405" : undefined }}><OlffyLogoNav /></div>
          <p className="mb-8 leading-relaxed max-w-[380px]" style={{ fontFamily: poppins, fontSize: 16, color: mutedColor }}>{s.subtitle}</p>
          <button className="self-start rounded-full transition-transform hover:scale-105 active:scale-95" style={{ fontFamily: poppins, fontWeight: 500, fontSize: 15, background: s.ctaBg, color: s.ctaText, height: (s as any).fullBleed ? 50.5 : undefined, width: (s as any).fullBleed ? 196 : undefined, padding: (s as any).fullBleed ? undefined : "14px 28px" }}>{s.cta} →</button>
        </div>
      </div>
      <button onClick={() => goTo(current - 1)} className="absolute left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(0,0,0,0.18)", color: "#fff" }} aria-label="Anterior"><ChevronLeft size={20} /></button>
      <button onClick={() => goTo(current + 1)} className="absolute right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(0,0,0,0.18)", color: "#fff" }} aria-label="Siguiente"><ChevronRight size={20} /></button>
      <div className="absolute bottom-6 left-16 flex gap-2 items-center">
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`} className="rounded-full transition-all duration-400" style={{ height: 7, width: i === current ? 28 : 7, background: i === current ? (s.dark ? C.orange : "#fff") : (s.dark ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.35)") }} />
        ))}
      </div>
    </div>
  );
}