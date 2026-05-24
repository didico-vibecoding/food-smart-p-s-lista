import { createFileRoute } from "@tanstack/react-router";
import paulaImg from "@/assets/paula.png";

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
        content:
          "Entre para a lista de espera da Pós-Graduação reconhecida pelo MEC da Food Smart.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: "#1D223B",
        color: "#FFFFFF",
        minHeight: "100vh",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center gap-10 px-6 py-10 sm:px-10 sm:py-14 lg:flex-row lg:items-end lg:gap-12 lg:py-0">
        {/* Mobile: image on top. Desktop: text left */}
        <div className="order-2 flex w-full flex-col items-start gap-6 lg:order-1 lg:w-1/2 lg:py-20">
          <span
            className="inline-block rounded-full border px-4 py-1.5 text-xs font-medium sm:text-sm"
            style={{ borderColor: "#BFF60C", color: "#BFF60C" }}
          >
            Pós-Graduação reconhecida pelo MEC
          </span>

          <h1
            className="text-4xl leading-tight sm:text-5xl lg:text-6xl"
            style={{ fontWeight: 900, color: "#FFFFFF" }}
          >
            Pós-Graduação em RT e{" "}
            <span style={{ color: "#EE3C30" }}>Consultoria de Alimentos</span>
          </h1>

          <p
            className="text-lg sm:text-xl"
            style={{ fontWeight: 400, color: "#FFFFFF" }}
          >
            Transforme conhecimento técnico em uma carreira sólida, valorizada e
            com possibilidades reais de crescimento no mercado de alimentos.
          </p>

          <p
            className="text-sm sm:text-base"
            style={{ color: "#FFFFFF", opacity: 0.75 }}
          >
            Uma pós-graduação reconhecida pelo MEC, criada para profissionais
            que desejam atuar com mais segurança, autoridade e visão prática na
            área de Responsabilidade Técnica e Consultoria de Alimentos.
          </p>

          <a
            href="#lista-espera"
            className="mt-2 inline-block rounded-full px-8 py-4 text-base shadow-lg transition-transform hover:scale-[1.02] sm:text-lg"
            style={{
              backgroundColor: "#BFF60C",
              color: "#1D223B",
              fontWeight: 700,
            }}
          >
            Entrar para a lista de espera
          </a>
        </div>

        {/* Image column - aligned to bottom, full height */}
        <div className="order-1 flex w-full justify-center self-end lg:order-2 lg:h-screen lg:w-1/2 lg:justify-end">
          <img
            src={paulaImg}
            alt="Paula Eloize, professora da Pós-Graduação em RT e Consultoria de Alimentos da Food Smart"
            className="block h-auto max-h-[55vh] w-auto object-contain object-bottom lg:max-h-screen lg:h-full"
          />
        </div>
      </div>
    </section>
  );
}
