import { useEffect, useMemo, useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import logoFoodSmart from "@/assets/logo-food-smart.png";
import { useUtmParams } from "@/hooks/use-utm-params";
import { buildWaitlistUrl, getWaitlistUrlNow } from "@/lib/waitlist-url";

const COLORS = {
  bg: "#1D223B",
  bgDarker: "#0F1220",
  text: "#FFFFFF",
  red: "#EE3C30",
  lime: "#BFF60C",
  cyan: "#2DD2E3",
};

const SECTIONS = [
  { id: "a-pos", label: "A Pós" },
  { id: "modulos", label: "Módulos" },
  { id: "certificacao", label: "Certificação" },
  { id: "pre-inscricao", label: "Pré-Inscrição" },
];



export function TopNav() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const utms = useUtmParams();
  const WAITLIST_URL = useMemo(() => buildWaitlistUrl(utms), [utms]);

  useEffect(() => {
    const onScroll = () => {
      const threshold = window.innerHeight * 0.8;
      setVisible(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => !!el,
    );
    if (els.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visibles = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visibles[0]) setActive(visibles[0].target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      style={{
        backgroundColor: "rgba(15,18,32,0.85)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderBottom: `1px solid rgba(255,255,255,0.06)`,
        transform: visible ? "translateY(0)" : "translateY(-100%)",
        opacity: visible ? 1 : 0,
        transition: "transform 320ms ease, opacity 320ms ease",
        fontFamily: "'Poppins', sans-serif",
      }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center"
          aria-label="Food Smart - topo"
        >
          <img src={logoFoodSmart} alt="Food Smart" className="h-7 w-auto sm:h-8" />
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {SECTIONS.map((s) => {
            const isActive = active === s.id;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={(e) => handleClick(e, s.id)}
                className="relative text-sm transition-colors"
                style={{
                  color: isActive ? COLORS.cyan : COLORS.text,
                  fontWeight: isActive ? 700 : 500,
                  opacity: isActive ? 1 : 0.85,
                }}
              >
                {s.label}
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: -6,
                    height: 2,
                    backgroundColor: COLORS.cyan,
                    transform: isActive ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "left",
                    transition: "transform 220ms ease",
                  }}
                />
              </a>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <a
          href={WAITLIST_URL}
          target="_blank"
          rel="noopener noreferrer"
          onPointerDown={(e) => { e.currentTarget.href = getWaitlistUrlNow(); }}
          onFocus={(e) => { e.currentTarget.href = getWaitlistUrlNow(); }}
          onMouseEnter={(e) => { e.currentTarget.href = getWaitlistUrlNow(); }}
          className="hidden rounded-full px-5 py-2.5 text-sm shadow-md transition-transform hover:scale-[1.03] md:inline-block"
          style={{ backgroundColor: COLORS.red, color: COLORS.text, fontWeight: 700 }}
        >
          Fazer minha Pré-Inscrição
        </a>

        {/* Mobile menu */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Abrir menu"
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{ color: COLORS.text, backgroundColor: "rgba(255,255,255,0.06)" }}
              >
                <Menu size={20} />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              style={{
                backgroundColor: COLORS.bg,
                color: COLORS.text,
                borderColor: "rgba(255,255,255,0.08)",
                fontFamily: "'Poppins', sans-serif",
              }}
              className="border-l"
            >
              <SheetTitle className="sr-only">Navegação</SheetTitle>
              <div className="mt-6 flex flex-col gap-1">
                {SECTIONS.map((s) => {
                  const isActive = active === s.id;
                  return (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      onClick={(e) => handleClick(e, s.id)}
                      className="rounded-lg px-4 py-3 text-base transition-colors"
                      style={{
                        color: isActive ? COLORS.cyan : COLORS.text,
                        backgroundColor: isActive ? "rgba(45,210,227,0.08)" : "transparent",
                        fontWeight: isActive ? 700 : 500,
                      }}
                    >
                      {s.label}
                    </a>
                  );
                })}
              </div>
              <a
                href={WAITLIST_URL}
                target="_blank"
                rel="noopener noreferrer"
                onPointerDown={(e) => { e.currentTarget.href = getWaitlistUrlNow(); }}
                onClick={() => setOpen(false)}
                className="mt-8 block rounded-full px-5 py-3 text-center text-base shadow-md"
                style={{ backgroundColor: COLORS.red, color: COLORS.text, fontWeight: 700 }}
              >
                Fazer minha Pré-Inscrição
              </a>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
