import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import paulaImg from "@/assets/paula.png";
import logoFoodSmart from "@/assets/logo-food-smart.png";
import logoAcademy from "@/assets/logo-academy.png";
import logoConsultoria from "@/assets/logo-consultoria.png";
import logoVerifica from "@/assets/logo-verifica.png";
import { TopNav } from "@/components/TopNav";


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
        className="absolute left-3 sm:left-4 top-2 w-[2px]"
        style={{
          backgroundColor: "rgba(45,210,227,0.15)",
          height: lineMaxPx != null ? `${Math.max(0, lineMaxPx - 8)}px` : undefined,
          bottom: lineMaxPx == null ? 8 : undefined,
        }}
      />
      <div
        aria-hidden
        className="absolute left-3 sm:left-4 top-2 w-[2px]"
        style={{
          backgroundColor: COLORS.cyan,
          height:
            lineMaxPx != null
              ? `${Math.max(0, (lineHeight / 100) * (lineMaxPx - 8))}px`
              : `calc(${lineHeight}% - 4px)`,
          maxHeight: lineMaxPx != null ? `${Math.max(0, lineMaxPx - 8)}px` : "calc(100% - 4px)",
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


function Index() {
  const rootRef = useReveal();

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
      <section className="relative w-full overflow-hidden" style={{ backgroundColor: COLORS.bg, minHeight: "100vh" }}>
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
      <section style={{ backgroundColor: COLORS.bgAlt }} className="px-6 py-20 sm:px-10 sm:py-24">
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
      <section id="a-pos" style={{ backgroundColor: COLORS.bg, scrollMarginTop: "5rem", borderTop: `3px solid ${COLORS.cyan}` }} className="px-6 py-20 sm:px-10 sm:py-24">

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
      <section style={{ backgroundColor: COLORS.bgAlt }} className="px-6 py-20 sm:px-10 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl" style={{ fontWeight: 900 }} data-reveal>
            Um mercado que <span style={{ color: COLORS.red }}>continua crescendo</span> e buscando profissionais
            especializados
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { n: "7 milhões", d: "profissionais empregados na indústria de alimentos no Brasil" },
              { n: "24%", d: "das vagas da indústria de transformação são na área de alimentos" },
              { n: "44.000+", d: "vagas com carteira assinada criadas no setor em um único ano" },
            ].map((c) => (
              <div
                key={c.n}
                className="rounded-2xl p-6"
                style={{ backgroundColor: COLORS.bg, borderTop: `4px solid ${COLORS.lime}` }}
                data-reveal
              >
                <div className="text-4xl sm:text-5xl" style={{ color: COLORS.lime, fontWeight: 900 }}>
                  {c.n}
                </div>
                <p className="mt-3 text-sm sm:text-base">{c.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 space-y-5 text-base sm:text-lg" data-reveal>
            <p>
              Empresas de alimentos precisam atender exigências sanitárias cada vez mais rigorosas. Indústrias,
              supermercados, restaurantes, açougues, padarias e diversos estabelecimentos dependem de profissionais
              capacitados para atuar com segurança técnica e orientação estratégica.
            </p>
            <p>Isso faz da RT e Consultoria de Alimentos uma área com amplo espaço para atuação profissional.</p>
            <p>
              A pós-graduação foi desenvolvida para preparar profissionais que desejam construir autoridade e ampliar
              suas possibilidades dentro desse mercado.
            </p>
          </div>
        </div>
      </section>

      {/* 5. MÓDULOS */}
      <section id="modulos" style={{ backgroundColor: COLORS.bg, scrollMarginTop: "5rem" }} className="px-6 py-20 sm:px-10 sm:py-24">
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
              "Metodologia Científica",
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

      {/* 6. DIFERENCIAIS */}
      <section style={{ backgroundColor: COLORS.bgAlt }} className="px-6 py-20 sm:px-10 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl" style={{ fontWeight: 900 }} data-reveal>
            O que torna essa formação <span style={{ color: COLORS.red }}>diferente</span>
          </h2>
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {[
              "Pós-graduação reconhecida pelo MEC",
              "Conteúdo voltado para aplicação prática",
              "Professores com atuação real no mercado",
              "Formação voltada para diferentes segmentos da área de alimentos",
              "Desenvolvimento técnico e profissional",
              "Aulas pensadas para aproximar teoria e prática",
              "Formação alinhada às demandas atuais do mercado",
            ].map((i) => (
              <li key={i} className="flex items-start gap-3 text-base sm:text-lg" data-reveal>
                <Check />
                <span>{i}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7. CERTIFICAÇÃO */}
      <section id="certificacao" style={{ backgroundColor: COLORS.bg, scrollMarginTop: "5rem" }} className="px-6 py-20 sm:px-10 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center" data-reveal>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke={COLORS.lime} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl" style={{ fontWeight: 900 }} data-reveal>
            Certificado <span style={{ color: COLORS.red }}>reconhecido pelo MEC</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg" data-reveal>
            A Pós-Graduação em RT & Consultoria de Alimentos é certificada pela Faculdade Unypública — instituição
            credenciada pelo Ministério da Educação conforme Portaria nº 615/2021. Um certificado de especialista que
            você pode apresentar com autoridade no mercado.
          </p>
          <div
            className="mx-auto mt-8 inline-block rounded-2xl border px-6 py-4 text-sm sm:text-base"
            style={{ backgroundColor: COLORS.bgAlt, borderColor: COLORS.cyan, color: COLORS.cyan }}
            data-reveal
          >
            Portaria MEC nº 615/2021 · Faculdade Unypública · e-MEC nº 22660
          </div>
        </div>
      </section>

      {/* 8. PROVA SOCIAL */}
      <section style={{ backgroundColor: COLORS.bgAlt }} className="px-6 py-20 sm:px-10 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl" style={{ fontWeight: 900 }} data-reveal>
            Profissionais de diferentes regiões do Brasil já fazem parte dessa formação
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl p-6 text-center"
                style={{ backgroundColor: COLORS.bg, borderTop: `4px solid ${COLORS.cyan}` }}
                data-reveal
              >
                <div
                  className="mx-auto h-20 w-20 rounded-full"
                  style={{ backgroundColor: COLORS.bgAlt, border: `2px solid ${COLORS.cyan}` }}
                />
                <div className="mt-4 text-base" style={{ fontWeight: 700 }}>
                  Nome do Aluno
                </div>
                <p className="mt-3 text-sm" style={{ opacity: 0.8 }}>
                  Depoimento em breve
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CORPO DOCENTE */}
      <section style={{ backgroundColor: COLORS.bg }} className="px-6 py-20 sm:px-10 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl" style={{ fontWeight: 900 }} data-reveal>
            Uma formação construída por quem conhece o mercado
          </h2>
          <p className="mt-6 text-base sm:text-lg" data-reveal>
            O corpo docente reúne profissionais com experiência prática em indústria, consultoria, responsabilidade
            técnica, auditorias, segurança dos alimentos e atuação estratégica no setor alimentício. Uma formação
            construída por quem conhece os desafios reais do mercado.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-2xl p-6 text-center"
                style={{ backgroundColor: COLORS.bgAlt }}
                data-reveal
              >
                <div
                  className="mx-auto h-24 w-24 rounded-full"
                  style={{ backgroundColor: COLORS.bg, border: `2px solid ${COLORS.cyan}` }}
                />
                <div className="mt-4 text-base" style={{ fontWeight: 700 }}>
                  Professor(a)
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. CTA FINAL */}
      <section
        id="pre-inscricao"
        style={{ backgroundColor: COLORS.bg, borderTop: `4px solid ${COLORS.lime}`, scrollMarginTop: "5rem" }}
        className="px-6 py-20 sm:px-10 sm:py-24"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl" style={{ fontWeight: 900 }} data-reveal>
            Entre para a lista de espera
          </h2>
          <p className="mt-6 text-base sm:text-lg" data-reveal>
            Receba em primeira mão as informações sobre a próxima turma da Pós-Graduação em RT e Consultoria de
            Alimentos.
          </p>
          <div className="mt-8 flex justify-center" data-reveal>
            <CTAButton>Fazer minha Pré-Inscrição</CTAButton>
          </div>
        </div>
      </section>

      {/* RODAPÉ */}
      <footer style={{ backgroundColor: COLORS.bgDarker }} className="px-6 py-12 text-center sm:px-10">
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
