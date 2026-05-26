import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import paulaImg from "@/assets/paula.png";
import logoFoodSmart from "@/assets/logo-food-smart.png";
import logoAcademy from "@/assets/logo-academy.png";
import logoConsultoria from "@/assets/logo-consultoria.png";
import logoVerifica from "@/assets/logo-verifica.png";
import logoUnypublica from "@/assets/logo-unypublica.png";
import qrCodeEmec from "@/assets/qr-code-emec.png";
import alunaAlice from "@/assets/aluna-alice.jpeg";
import alunaLivia from "@/assets/aluna-livia.png";
import alunaLunearane from "@/assets/aluna-lunearane.jpg";
import professoraPaulaEloize from "@/assets/professora-paula-eloize.png";
import professorGregoriFagundes from "@/assets/professor-gregori-fagundes.png";
import professoraFabianaLeal from "@/assets/professora-fabiana-leal.png";
import professoraGabrielaAuth from "@/assets/professora-gabriela-auth.png";
import { TopNav } from "@/components/TopNav";
import newsPoder360 from "@/assets/news-poder360.png";
import newsExame from "@/assets/news-exame.png";
import newsFolha from "@/assets/news-folha.png";
import newsGloboRural from "@/assets/news-globorural.png";
import newsFiesc from "@/assets/news-fiesc.png";
import newsValor from "@/assets/news-valor.png";
import newsPegn from "@/assets/news-pegn.png";



export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pós-Graduação em RT e Consultoria de Alimentos — Food Smart" },
      {
        name: "description",
        content:
          "Lista de espera para a Pós-Graduação em RT e Consultoria de Alimentos da Food Smart. Reconhecida pelo MEC.",
      },
      { property: "og:title", content: "Pós-Graduação em RT e Consultoria de Alimentos — Food Smart" },
      {
        property: "og:description",
        content: "Entre para a lista de espera da Pós-Graduação reconhecida pelo MEC da Food Smart.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap",
      },
    ],
  }),
  component: Index,
});

const WAITLIST_URL = "#"; // [LINK DO YAYFORMS]
const WHATSAPP_URL = "#"; // [LINK DO WHATSAPP]

const COLORS = {
  bg: "#1D223B",
  bgAlt: "#252A45",
  bgDarker: "#0F1220",
  text: "#FFFFFF",
  red: "#EE3C30",
  lime: "#BFF60C",
  cyan: "#2DD2E3",
};

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>("[data-reveal]");
    items.forEach((i) => {
      i.style.opacity = "0";
      i.style.transform = "translateY(24px)";
      i.style.transition = "opacity 700ms ease-out, transform 700ms ease-out";
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.opacity = "1";
            (e.target as HTMLElement).style.transform = "translateY(0)";
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    items.forEach((i) => io.observe(i));
    return () => io.disconnect();
  }, []);
  return ref;
}

function CTAButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <a
      href={WAITLIST_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block rounded-full px-8 py-4 text-base sm:text-lg shadow-lg transition-transform hover:scale-[1.03] ${className}`}
      style={{ backgroundColor: COLORS.lime, color: COLORS.bg, fontWeight: 900 }}
    >
      {children}
    </a>
  );
}

function Check({ color }: { color?: string }) {
  const c = color ?? COLORS.lime;
  return (
    <span
      className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
      style={{ backgroundColor: `${c}1F`, color: c }}
      aria-hidden
    >
      ✔
    </span>
  );
}

function FadeInCard({
  delay,
  className = "",
  style,
  children,
}: {
  delay: number;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transition = `opacity 600ms ease-out ${delay}ms`;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.style.opacity = "1";
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}

function useCountUp(target: number, start: boolean, duration = 1500) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);
  return value;
}

function StatCard({
  prefix,
  target,
  label,
  delay,
}: {
  prefix?: string;
  target: number;
  label: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            window.setTimeout(() => setStarted(true), delay);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  const count = useCountUp(target, started, 1500);
  const display = `${prefix ?? ""}${count.toLocaleString("pt-BR")}`;

  return (
    <div
      ref={ref}
      className="group relative text-center flex flex-col items-center justify-center overflow-hidden"
      style={{
        backgroundColor: COLORS.bgAlt,
        borderRadius: 16,
        padding: 40,
        border: "1px solid rgba(45,210,227,0.15)",
        boxShadow: "0 8px 24px -12px rgba(0,0,0,0.4)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: `opacity 600ms ease-out ${delay}ms, transform 600ms ease-out ${delay}ms, border-color 300ms ease, box-shadow 300ms ease`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(45,210,227,0.5)";
        e.currentTarget.style.boxShadow =
          "0 16px 40px -16px rgba(45,210,227,0.35), 0 0 0 1px rgba(45,210,227,0.2)";
        e.currentTarget.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(45,210,227,0.15)";
        e.currentTarget.style.boxShadow = "0 8px 24px -12px rgba(0,0,0,0.4)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-8 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(45,210,227,0.6), transparent)",
        }}
      />
      <span
        className="block text-5xl sm:text-6xl leading-none"
        style={{
          color: COLORS.cyan,
          fontWeight: 900,
          textShadow: "0 0 24px rgba(45,210,227,0.35)",
        }}
      >
        {display}
      </span>
      <p className="mt-4 text-base sm:text-lg" style={{ color: COLORS.text }}>
        {label}
      </p>
    </div>
  );
}

function ImpactStats() {
  const cards = [
    { prefix: "+", target: 5000, label: "Alunos transformados" },
    { prefix: "+", target: 200, label: "Clientes atendidos" },
    { target: 8, label: "Anos de operação" },
    { target: 4, label: "Países alcançados" },
  ];

  return (
    <div className="mt-20">
      <div className="relative mx-auto w-full max-w-[1200px]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 50%, rgba(45,210,227,0.10), transparent 70%)",
            filter: "blur(20px)",
          }}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {cards.map((c, i) => (
            <StatCard
              key={c.label}
              prefix={c.prefix}
              target={c.target}
              label={c.label}
              delay={i * 100}
            />
          ))}
        </div>
      </div>
    </div>
  );
}


const JOURNEY_ITEMS = [
  "Responsabilidade Técnica na prática",
  "Consultoria para empresas de alimentos",
  "Legislação e órgãos fiscalizadores",
  "Boas Práticas de Fabricação",
  "Auditorias e visitas técnicas",
  "Rotulagem e registro de produtos",
  "Indústria, supermercados e serviços de alimentação",
  "Precificação, contratos e posicionamento profissional",
  "Estratégias para conquistar clientes e fortalecer sua autoridade",
];

function JourneyTimeline() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [lineHeight, setLineHeight] = useState(0);
  const [lineMaxPx, setLineMaxPx] = useState<number | null>(null);
  const [lineMinPx, setLineMinPx] = useState<number | null>(null);
  const [visible, setVisible] = useState<boolean[]>(() => JOURNEY_ITEMS.map(() => false));
  const [active, setActive] = useState<boolean[]>(() => JOURNEY_ITEMS.map(() => false));
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height;
      const start = rect.top - vh * 0.85;
      const end = rect.top + total - vh * 0.5;
      const range = end - start;
      const p = Math.min(1, Math.max(0, -start / range));
      setLineHeight(p * 100);

      // Sincroniza estado ativo dos marcadores com a frente da linha
      const lineFrontPx = (p * total * 100) / 100; // px a partir do top do container
      const containerTop = rect.top;
      const lastNode = itemRefs.current[itemRefs.current.length - 1];
      if (lastNode) {
        const lr = lastNode.getBoundingClientRect();
        const lastCenter = lr.top - containerTop + lr.height / 2;
        setLineMaxPx((prev) => (prev === lastCenter ? prev : lastCenter));
      }
      const firstNode = itemRefs.current[0];
      if (firstNode) {
        const fr = firstNode.getBoundingClientRect();
        const firstCenter = fr.top - containerTop + fr.height / 2;
        setLineMinPx((prev) => (prev === firstCenter ? prev : firstCenter));
      }
      setActive((prev) => {
        let changed = false;
        const next = prev.slice();
        itemRefs.current.forEach((node, idx) => {
          if (!node) return;
          const r = node.getBoundingClientRect();
          const itemCenter = r.top - containerTop + r.height / 2;
          const isActive = lineFrontPx >= itemCenter;
          if (isActive !== next[idx]) {
            next[idx] = isActive;
            changed = true;
          }
        });
        return changed ? next : prev;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    itemRefs.current.forEach((node, idx) => {
      if (!node) return;
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              setTimeout(() => {
                setVisible((prev) => {
                  if (prev[idx]) return prev;
                  const next = [...prev];
                  next[idx] = true;
                  return next;
                });
              }, idx * 80);
              io.disconnect();
            }
          });
        },
        { threshold: 0.3 },
      );
      io.observe(node);
      observers.push(io);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div ref={containerRef} className="relative mx-auto mt-10 w-full max-w-[900px] pl-10 sm:pl-12">
      <style>{`
        @keyframes journeyFinalPulse {
          0%, 100% { box-shadow: 0 0 0 4px rgba(191,246,12,0.25), 0 0 16px rgba(191,246,12,0.55); }
          50% { box-shadow: 0 0 0 8px rgba(191,246,12,0), 0 0 24px rgba(191,246,12,0.65); }
        }
      `}</style>
      <div
        aria-hidden
        className="absolute left-3 sm:left-4 w-[2px]"
        style={{
          backgroundColor: "rgba(45,210,227,0.15)",
          top: lineMinPx != null ? `${lineMinPx}px` : 8,
          height: lineMaxPx != null && lineMinPx != null ? `${Math.max(0, lineMaxPx - lineMinPx)}px` : undefined,
          bottom: lineMaxPx == null ? 8 : undefined,
        }}
      />
      <div
        aria-hidden
        className="absolute left-3 sm:left-4 w-[2px]"
        style={{
          backgroundColor: COLORS.cyan,
          top: lineMinPx != null ? `${lineMinPx}px` : 8,
          height:
            lineMaxPx != null && lineMinPx != null
              ? `${Math.max(0, (lineHeight / 100) * (lineMaxPx - lineMinPx))}px`
              : `calc(${lineHeight}% - 4px)`,
          maxHeight:
            lineMaxPx != null && lineMinPx != null
              ? `${Math.max(0, lineMaxPx - lineMinPx)}px`
              : "calc(100% - 4px)",
          transition: `height 200ms ${EASE}`,
        }}
      />
      <ul className="flex flex-col" style={{ gap: 40 }}>
        {JOURNEY_ITEMS.map((text, idx) => {
          const isLast = idx === JOURNEY_ITEMS.length - 1;
          const size = isLast ? 20 : 12;
          const isActive = active[idx];
          return (
            <li
              key={text}
              ref={(el) => {
                itemRefs.current[idx] = el;
              }}
              className="relative flex items-center"
              style={{
                opacity: visible[idx] ? 1 : 0.35,
                transform: visible[idx] ? "translateX(0)" : "translateX(-8px)",
                transition: `opacity 600ms ${EASE}, transform 600ms ${EASE}`,
              }}
            >
              <span
                aria-hidden
                className="absolute left-[-27px] sm:left-[-31px] rounded-full"
                style={{
                  marginLeft: -size / 2,
                  width: size,
                  height: size,
                  backgroundColor: isActive ? COLORS.lime : "rgba(191,246,12,0.25)",
                  transform: isActive ? "scale(1)" : "scale(0.9)",
                  transition: `background-color 300ms ${EASE}, transform 300ms ${EASE}, box-shadow 300ms ${EASE}`,
                  boxShadow:
                    isLast && isActive
                      ? "0 0 0 4px rgba(191,246,12,0.25), 0 0 16px rgba(191,246,12,0.55)"
                      : undefined,
                  animation: isLast && isActive ? "journeyFinalPulse 2s ease-in-out infinite" : undefined,
                }}
              />
              <span
                className="text-lg sm:text-xl"
                style={{ color: isLast ? COLORS.lime : "#FFFFFF", fontWeight: 600 }}
              >
                {text}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const NEWS_IMAGES = [
  { src: newsPoder360, alt: "Poder360 - Por que a indústria de alimentos não para de contratar" },
  { src: newsExame, alt: "Exame - Brasil amplia liderança no agronegócio global" },
  { src: newsFolha, alt: "Folha de S.Paulo - Commodities fortalecem indústria e Brasil vira supermercado do mundo" },
  { src: newsGloboRural, alt: "Globo Rural - A importância do médico-veterinário e do zootecnista" },
  { src: newsFiesc, alt: "FIESC - Setor alimentício liderou crescimento na produção industrial" },
  { src: newsValor, alt: "Valor Econômico - Indústria de alimentos fatura mais de R$ 1 trilhão em 2022" },
  { src: newsPegn, alt: "Pequenas Empresas & Grandes Negócios - Faturamento cresceu 16,6% em 2022" },
];

function NewsCarousel() {
  const [index, setIndex] = useState(0);
  const total = NEWS_IMAGES.length;
  const [touchStart, setTouchStart] = useState<number | null>(null);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % total), 4000);
    return () => clearInterval(id);
  }, [total]);

  const go = (i: number) => setIndex(((i % total) + total) % total);

  return (
    <div className="relative mx-auto w-full max-w-4xl">
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{ backgroundColor: COLORS.bg, aspectRatio: "1138 / 760" }}
        onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchStart === null) return;
          const diff = touchStart - e.changedTouches[0].clientX;
          if (Math.abs(diff) > 40) go(index + (diff > 0 ? 1 : -1));
          setTouchStart(null);
        }}
      >
        {NEWS_IMAGES.map((img, i) => (
          <img
            key={img.src}
            src={img.src}
            alt={img.alt}
            className="absolute inset-0 h-full w-full object-contain transition-opacity duration-700"
            style={{ opacity: i === index ? 1 : 0 }}
            loading={i === 0 ? "eager" : "lazy"}
          />
        ))}
      </div>




      <div className="mt-6 flex justify-center gap-2">
        {NEWS_IMAGES.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Ir para slide ${i + 1}`}
            onClick={() => go(i)}
            className="h-2.5 w-2.5 rounded-full transition-colors"
            style={{ backgroundColor: i === index ? "#BFF60C" : "#252A45" }}
          />
        ))}
      </div>
    </div>
  );
}

type Teacher = { name: string; role?: string; photo?: string | null };

const TEACHERS: Teacher[] = [
  { name: "Paula Eloize", role: "", photo: professoraPaulaEloize },
  { name: "Grégori Fagundes", role: "", photo: professorGregoriFagundes },
  { name: "Fabiana Leal", role: "", photo: professoraFabianaLeal },
  { name: "Gabriela Auth", role: "", photo: professoraGabrielaAuth },
];

function TeachersCarousel() {
  const [perPage, setPerPage] = useState(4);
  const [index, setIndex] = useState(0);
  const touchStart = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setPerPage(w < 768 ? 1 : w < 1024 ? 2 : 4);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, TEACHERS.length - perPage);

  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    if (maxIndex === 0) return;
    const id = setInterval(() => {
      setIndex((i) => (i >= maxIndex ? 0 : i + 1));
    }, 3000);
    return () => clearInterval(id);
  }, [maxIndex]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(dx) > 40) {
      setIndex((i) => {
        const next = dx < 0 ? i + 1 : i - 1;
        return Math.max(0, Math.min(maxIndex, next));
      });
    }
    touchStart.current = null;
  };

  return (
    <div data-reveal>
      <div
        className="overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * (100 / perPage)}%)` }}
        >
          {TEACHERS.map((t, i) => (
            <div
              key={i}
              className="shrink-0 px-3"
              style={{ width: `${100 / perPage}%` }}
            >
              <div
                className="rounded-2xl p-6 text-center"
                style={{ backgroundColor: COLORS.bgAlt }}
              >
                <div
                  className="mx-auto h-24 w-24 overflow-hidden rounded-full"
                  style={{ backgroundColor: COLORS.bg, border: `2px solid ${COLORS.cyan}` }}
                >
                  {t.photo && (
                    <img
                      src={t.photo}
                      alt={t.name}
                      className="h-full w-full"
                      style={{ objectFit: "cover", objectPosition: "top center" }}
                    />
                  )}
                </div>
                <div className="mt-4 text-base" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, color: COLORS.text }}>
                  {t.name}
                </div>
                {t.role ? (
                  <div className="mt-1 text-sm" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, color: COLORS.cyan }}>
                    {t.role}
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 flex justify-center gap-2">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Ir para slide ${i + 1}`}
            className="h-2.5 w-2.5 rounded-full transition-colors"
            style={{ backgroundColor: index === i ? COLORS.lime : COLORS.bgAlt }}
          />
        ))}
      </div>
    </div>
  );
}




function Index() {
  const rootRef = useReveal();
  const [openTestimonial, setOpenTestimonial] = useState<number | null>(null);

  return (
    <div
      ref={rootRef}
      style={{
        backgroundColor: COLORS.bg,
        color: COLORS.text,
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <TopNav />
      {/* 1. HERO */}
      <section className="relative w-full overflow-hidden" style={{ backgroundColor: COLORS.bg, minHeight: "100vh", borderTop: `3px solid ${COLORS.lime}` }}>
        {/* Camadas de atmosfera */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-[5%] -top-[10%] h-[500px] w-[500px] animate-pulse rounded-full blur-[120px]"
          style={{ backgroundColor: "rgba(45,210,227,0.15)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-[5%] right-[10%] h-[400px] w-[400px] rounded-full blur-[150px]"
          style={{ backgroundColor: "rgba(238,60,48,0.10)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: 0.03,
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: `linear-gradient(to bottom, transparent, ${COLORS.bg})` }}
        />

        <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 py-10 sm:px-10 sm:py-14 md:grid-cols-12 md:gap-10 lg:gap-14 lg:py-20">

          {/* Texto - esquerda no desktop, topo no mobile */}
          <div
            className="order-1 flex flex-col justify-center gap-6 text-left md:col-span-7"
            data-reveal
          >
            <img
              src={logoFoodSmart}
              alt="Food Smart"
              className="h-12 w-auto self-start sm:h-14"
            />
            <h1 className="text-4xl leading-tight sm:text-5xl lg:text-6xl" style={{ fontWeight: 900 }}>
              Pós-graduação em RT e{" "}
              <span style={{ color: COLORS.red, filter: "drop-shadow(0 0 25px rgba(238,60,48,0.4))" }}>
                Consultoria de Alimentos
              </span>
            </h1>


            <p className="text-lg sm:text-xl" style={{ fontWeight: 400 }}>
              Transforme conhecimento técnico em uma carreira sólida, valorizada e com possibilidades reais de
              crescimento no mercado de alimentos.
            </p>
            <p className="text-sm sm:text-base" style={{ opacity: 0.75 }}>
              Uma pós-graduação reconhecida pelo MEC, criada para profissionais que desejam atuar com mais segurança,
              autoridade e visão prática na área de Responsabilidade Técnica e Consultoria de Alimentos.
            </p>
          </div>

          {/* Foto da Paula - direita no desktop, abaixo do texto no mobile, com CTA logo abaixo */}
          <div className="relative order-2 flex flex-col items-center justify-center md:col-span-5" data-reveal>
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[90px]"
              style={{ backgroundColor: "rgba(191,246,12,0.10)" }}
            />
            <div className="relative flex w-full justify-center">

              <img
                src={paulaImg}
                alt="Paula Eloize, professora da Pós-Graduação em RT e Consultoria de Alimentos da Food Smart"
                className="mb-0 block h-auto w-auto max-w-full object-contain drop-shadow-2xl max-h-[480px] lg:max-h-[560px]"
                loading="eager"
              />
            </div>
            <div className="flex w-full justify-center">
              <CTAButton>Fazer minha Pré-Inscrição</CTAButton>
            </div>
          </div>
        </div>

      </section>


      {/* 2. INSTITUCIONAL */}
      <section style={{ backgroundColor: COLORS.bgAlt, borderTop: `3px solid ${COLORS.lime}` }} className="px-6 py-20 sm:px-10 sm:py-24">

        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl" style={{ fontWeight: 900 }} data-reveal>
            Somos o <span style={{ color: COLORS.red }}>maior ecossistema</span> da área de alimentos
          </h2>
          <p className="mt-6 text-base sm:text-lg" data-reveal>
            A Food Smart é um ecossistema criado para transformar a Segurança dos Alimentos no Brasil, formar os
            profissionais que estarão à frente dessa revolução e capacitar negócios para liderar o mercado com
            excelência. Acreditamos que a segurança dos alimentos é a base de um mercado mais forte, de consumidores
            protegidos e de profissionais preparados para liderar.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { t: "Food Smart Academy", d: "Nossa plataforma de treinamento e especialização para profissionais de alimentos.", img: logoAcademy, scale: 1.7 },
              { t: "Food Smart Consultoria", d: "Regularizamos empresas de alimentos em todo Brasil.", img: logoConsultoria, scale: 1 },
              { t: "VerificaSmart", d: "Aplicativo completo para otimizar as suas auditorias.", img: logoVerifica, scale: 1 },
            ].map((c) => (
              <div
                key={c.t}
                className="rounded-2xl p-6"
                style={{ backgroundColor: COLORS.bg, borderTop: `4px solid ${COLORS.lime}` }}
                data-reveal
              >
                <div className="mb-5 flex h-32 items-center justify-center px-4">
                  <img src={c.img} alt={`Logo ${c.t}`} className="max-h-full max-w-full object-contain" style={{ transform: `scale(${c.scale})` }} />
                </div>
                <h3 className="text-xl" style={{ color: COLORS.lime, fontWeight: 700 }}>
                  {c.t}
                </h3>
                <p className="mt-3 text-sm sm:text-base">{c.d}</p>
              </div>
            ))}
          </div>

          <ImpactStats />

        </div>
      </section>

      {/* 3. TRANSFORMAÇÃO */}
      <section id="a-pos" style={{ backgroundColor: COLORS.bg, scrollMarginTop: "5rem", borderTop: `3px solid ${COLORS.lime}` }} className="px-6 py-20 sm:px-10 sm:py-24">

        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl" style={{ fontWeight: 900 }} data-reveal>
            Mais do que uma pós-graduação.
            <br />
            <span style={{ color: COLORS.red }}>Uma nova possibilidade profissional.</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg" data-reveal>
            Ao longo da formação, você terá acesso a conteúdos que ajudam não apenas na parte técnica, mas também na
            construção da sua atuação profissional.
          </p>
          <JourneyTimeline />

        </div>
      </section>

      {/* 4. CARREIRA */}
      <section style={{ backgroundColor: COLORS.bgAlt, borderTop: `3px solid ${COLORS.lime}` }} className="px-6 py-20 sm:px-10 sm:py-24">

        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl" style={{ fontWeight: 900 }} data-reveal>
            Um mercado que <span style={{ color: COLORS.red }}>continua crescendo</span> e buscando profissionais
            especializados
          </h2>
          <div className="mt-12" data-reveal>
            <NewsCarousel />
          </div>

          <div className="mt-12 space-y-5 text-base sm:text-lg" data-reveal>
            <p>Isso faz da RT e Consultoria de Alimentos uma área com amplo espaço para atuação profissional.</p>
            <p>
              A pós-graduação foi desenvolvida para preparar profissionais que desejam construir autoridade e ampliar
              suas possibilidades dentro desse mercado.
            </p>
          </div>
        </div>
      </section>

      {/* 4.5 PARA QUEM É */}
      <section style={{ backgroundColor: COLORS.bg, borderTop: `3px solid ${COLORS.lime}` }} className="px-6 py-12 sm:px-10 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-[800px]">
          <h2 className="text-left text-3xl sm:text-4xl lg:text-5xl text-white" style={{ fontWeight: 900 }} data-reveal>
            Para quem é essa formação?
          </h2>
          <p className="mt-6 text-left text-base sm:text-lg text-white/80" data-reveal>
            Se você se reconhece em algum desses perfis, essa pós-graduação foi pensada para você.
          </p>
          <ul className="mt-10 space-y-5 text-left text-white text-base sm:text-lg" data-reveal>
            {[
              "Graduados ou estudantes* de Medicina Veterinária, Zootecnia, Nutrição, Engenharia de Alimentos ou Tecnologia de Alimentos que querem atuar com autoridade na área de alimentos",
              "Profissionais que já atuam no mercado e querem dar um salto técnico — saindo da execução operacional para uma posição de referência e consultoria",
              "Profissionais que desejam comprovar sua qualificação com um certificado reconhecido pelo MEC e ganhar credibilidade perante clientes e empresas",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mt-1 shrink-0" aria-hidden="true">
                  <path d="M5 12.5l4.5 4.5L19 7.5" stroke={COLORS.lime} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-left text-sm text-white/60" data-reveal>
            *Ainda na graduação? Fale com nosso time para saber se você já pode começar.
          </p>
          <div className="mt-8 flex justify-center" data-reveal>
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full px-8 py-4 text-base transition-transform hover:scale-105"
              style={{ backgroundColor: COLORS.lime, color: COLORS.bg, fontWeight: 900 }}
            >
              Falar com um Consultor Smart
            </a>
          </div>
          </div>
        </div>
      </section>




      {/* 5. MÓDULOS */}
      <section id="modulos" style={{ backgroundColor: COLORS.bg, scrollMarginTop: "5rem", borderTop: `3px solid ${COLORS.lime}` }} className="px-6 py-20 sm:px-10 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl" style={{ fontWeight: 900 }} data-reveal>
            Conheça a estrutura da formação
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Órgãos Fiscalizadores e Legislação",
              "Boas Práticas de Fabricação de Alimentos",
              "Responsabilidade Técnica de Alimentos",
              "Treinamento, Auditoria e Visita Técnica",
              "Documentação Obrigatória",
              "Indústria de Alimentos",
              "Supermercado & Serviços de Alimentação",
              "Rotulagem e Registro de Produtos",
              "Projeto & Obra em Empresas de Alimentos",
              "Consultoria, Empreendedorismo e Gestão",
            ].map((title, idx) => (
              <div
                key={title}
                className="rounded-xl p-5"
                style={{ backgroundColor: COLORS.bgAlt, borderLeft: `4px solid ${COLORS.cyan}` }}
                data-reveal
              >
                <div className="text-sm" style={{ color: COLORS.lime, fontWeight: 700 }}>
                  Módulo {String(idx + 1).padStart(2, "0")}
                </div>
                <div className="mt-1 text-base sm:text-lg" style={{ fontWeight: 400 }}>
                  {title}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 flex justify-center" data-reveal>
            <CTAButton>Fazer minha Pré-Inscrição</CTAButton>
          </div>
        </div>
      </section>


      {/* 7. CERTIFICAÇÃO */}
      <section id="certificacao" style={{ backgroundColor: COLORS.bg, scrollMarginTop: "5rem", borderTop: `3px solid ${COLORS.lime}` }} className="px-6 py-20 sm:px-10 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl" style={{ fontWeight: 900 }} data-reveal>
            Certificado <span style={{ color: COLORS.red }}>reconhecido pelo MEC</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg" data-reveal>
            A Pós-Graduação em RT & Consultoria de Alimentos é certificada pela <strong>Faculdade Unypublica</strong> — instituição
            credenciada pelo Ministério da Educação conforme <strong>Portaria nº 615/2021</strong>. Um certificado de especialista que
            você pode apresentar com autoridade no mercado.
          </p>
          <div
            className="mx-auto mt-8 flex flex-col items-center justify-center gap-6 sm:flex-row sm:items-stretch sm:gap-8"
            style={{ maxWidth: "600px" }}
            data-reveal
          >
            <div className="flex flex-col items-center">
              <a
                href="https://emec.mec.gov.br/emec/consulta-cadastro/detalhamento/d96957f455f6405d14c6542552b0f6eb/MjI2NjA=/93916316abe23148507bd4c260e4b878/MzMxOTQ3"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-white"
                style={{ borderRadius: "16px", padding: "16px", height: "180px", width: "180px", boxShadow: "0 20px 60px -10px rgba(45,210,227,0.35)" }}
              >
                <img src={qrCodeEmec} alt="QR Code e-MEC" style={{ width: "100%", height: "100%", display: "block" }} />
              </a>
              <span
                className="mt-3"
                style={{ color: COLORS.cyan, fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: "0.875rem" }}
              >
                Verifique no e-MEC
              </span>
            </div>
            <div
              className="flex flex-1 items-center justify-center bg-white"
              style={{ borderRadius: "16px", padding: "24px", height: "180px", boxShadow: "0 20px 60px -10px rgba(45,210,227,0.35)" }}
            >
              <img src={logoUnypublica} alt="Faculdade Unypublica" style={{ maxWidth: "100%", maxHeight: "100%", width: "auto", height: "auto" }} />
            </div>
          </div>
        </div>
      </section>

      {/* 8. PROVA SOCIAL */}
      <section style={{ backgroundColor: COLORS.bgAlt, borderTop: `3px solid ${COLORS.lime}` }} className="px-6 py-20 sm:px-10 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl" style={{ fontWeight: 900 }} data-reveal>
            Profissionais de diferentes regiões do Brasil já fazem parte dessa formação
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Alice",
                photo: alunaAlice,
                quote:
                  "O diferencial desse método é que ele vai além da base teórica, ensinando não apenas o conhecimento técnico, mas também como se posicionar e se portar profissionalmente. Os módulos abordam aspectos como posicionamento nas redes sociais, postura diante do cliente e elaboração de contratos. Esses ensinamentos se tornaram o grande diferencial para mim.",
              },
              {
                name: "Livia",
                photo: alunaLivia,
                quote:
                  "Eu era refém de clínica e em menos de um ano já consegui atingir o que eu nem imaginava: abri a minha própria empresa, trabalho para mim mesma e faço os meus próprios horários. O meu maior medo era não dar conta, mas após aplicar o método eu conquistei confiança e consegui me estabilizar. Agora, me sinto segura e totalmente realizada pessoal e financeiramente.",
              },
              {
                name: "Lunearane",
                photo: alunaLunearane,
                quote:
                  "Sempre tive um pouco de receio de conversar com as pessoas, interagir e expressar minha opinião. Graças aos conteúdos do curso, desenvolvi habilidades de comunicação e aprimorei minha capacidade de interagir de forma assertiva. O método também me abriu os olhos para outros campos em que podemos atuar, por isso pude expandir meus negócios e, além da RT, ofereço consultoria de alimentos para supermercados.",
              },
            ].map((t, idx) => {
              const isOpen = openTestimonial === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setOpenTestimonial(isOpen ? null : idx)}
                  className="relative rounded-2xl p-6 transition-all duration-300 cursor-pointer text-left"
                  style={{ backgroundColor: COLORS.bg, borderTop: `4px solid ${COLORS.cyan}`, color: COLORS.text }}
                  data-reveal
                >
                  <div
                    className="mx-auto h-20 w-20 overflow-hidden rounded-full"
                    style={{ backgroundColor: COLORS.bgAlt, border: `2px solid ${COLORS.cyan}` }}
                  >
                    {t.photo && (
                      <img src={t.photo} alt={t.name} className="h-full w-full object-cover" />
                    )}
                  </div>
                  <div className="mt-4 text-center text-base" style={{ fontWeight: 700 }}>
                    {t.name}
                  </div>
                  <div
                    className="grid overflow-hidden transition-all duration-300 ease-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <p
                      className="min-h-0 text-center text-sm"
                      style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, opacity: 0.9, paddingTop: isOpen ? "0.75rem" : 0 }}
                    >
                      {t.quote}
                    </p>
                  </div>
                  <span
                    className="absolute bottom-3 right-4 text-2xl leading-none"
                    style={{ color: COLORS.lime, fontWeight: 700 }}
                    aria-hidden="true"
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. CORPO DOCENTE */}
      <section style={{ backgroundColor: COLORS.bg, borderTop: `3px solid ${COLORS.lime}` }} className="px-6 py-20 sm:px-10 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl" style={{ fontWeight: 900 }} data-reveal>
            Uma formação construída por quem conhece o mercado
          </h2>
          <p className="mt-6 text-base sm:text-lg" style={{ color: "#FFFFFF" }} data-reveal>
            O corpo docente reúne profissionais com{" "}
            <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700 }}>experiência prática</span>{" "}
            em indústria, consultoria, responsabilidade técnica, auditorias, segurança dos alimentos e atuação
            estratégica no setor alimentício. Uma formação construída por quem conhece os{" "}
            <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700 }}>desafios reais do mercado</span>.
          </p>
          <div className="mt-10">
            <TeachersCarousel />
          </div>

        </div>
      </section>

      {/* 10. CTA FINAL */}
      <section
        id="pre-inscricao"
        style={{ backgroundColor: COLORS.bg, borderTop: `3px solid ${COLORS.lime}`, scrollMarginTop: "5rem" }}
        className="px-6 py-20 sm:px-10 sm:py-24"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl" style={{ fontWeight: 900 }} data-reveal>
            <span className="block">Faça sua</span>
            <span className="block">Pré-inscrição!</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg" style={{ color: "#FFFFFF" }} data-reveal>
            Receba em{" "}
            <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700 }}>primeira mão</span>{" "}
            as informações sobre a{" "}
            <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700 }}>próxima turma</span>{" "}
            da{" "}
            <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700 }}>
              Pós-Graduação em RT e Consultoria de Alimentos
            </span>
            .
          </p>
          <div className="mt-8 flex justify-center" data-reveal>
            <CTAButton>Fazer minha Pré-Inscrição</CTAButton>
          </div>
        </div>
      </section>

      {/* RODAPÉ */}
      <footer style={{ backgroundColor: COLORS.bgDarker, borderTop: `3px solid ${COLORS.lime}` }} className="px-6 py-12 text-center sm:px-10">
        <div className="mx-auto max-w-4xl">
          <div className="text-2xl" style={{ fontWeight: 900, color: COLORS.lime }}>
            Food Smart
          </div>
          <p className="mt-4 text-sm" style={{ opacity: 0.7 }}>
            © 2026 Food Smart. Todos os direitos reservados.
          </p>
          <p className="mt-2 text-sm" style={{ opacity: 0.7 }}>
            CNPJ: 37.976.335/0001-50
          </p>
          <p className="mt-1 text-sm" style={{ opacity: 0.7 }}>
            E-mail: suporte@foodsmart.com.br
          </p>
        </div>
      </footer>

      {/* WHATSAPP FLOAT */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale conosco no WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-xl transition-transform hover:scale-110"
        style={{ backgroundColor: "#25D366" }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#FFFFFF">
          <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      </a>
    </div>
  );
}
