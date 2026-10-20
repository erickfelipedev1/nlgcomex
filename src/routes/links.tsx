import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Youtube, Linkedin, Globe, ArrowUpRight } from "lucide-react";

const TITULO = "NLG Comex | Links";
const DESCRICAO = "Importação da China com assessoria completa. Fale com a NLG Comex.";

// TODO: ajustar números/URLs reais antes de publicar.
const WHATSAPP = "5500000000000";
const YOUTUBE = "https://www.youtube.com/@nowlogisticsgroup";
const LINKEDIN = "https://www.linkedin.com/company/now-logistics-group-company";
const SITE = "https://nlgcomex.com.br";

const links = [
  {
    titulo: "Fale com um especialista",
    sub: "Atendimento direto no WhatsApp",
    href: `https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Olá! Vim pelo Instagram e quero importar da China.")}`,
    icone: MessageCircle,
    destaque: true,
  },
  { titulo: "Site institucional", sub: "Conheça a NLG Comex", href: SITE, icone: Globe },
  { titulo: "YouTube", sub: "Vídeos sobre importação", href: YOUTUBE, icone: Youtube },
  { titulo: "LinkedIn", sub: "NLG Comex", href: LINKEDIN, icone: Linkedin },
];

export const Route = createFileRoute("/links")({
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESCRICAO },
      { property: "og:title", content: TITULO },
      { property: "og:description", content: DESCRICAO },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Links,
});

function Links() {
  return (
    <main className="min-h-screen bg-navy text-navy-foreground">
      <div className="mx-auto flex max-w-md flex-col items-center px-4 py-12">
        <div className="links-rise links-pulse flex h-24 w-24 items-center justify-center rounded-full border-2 border-gold bg-navy-foreground/5 font-display text-2xl font-bold text-gold">
          NLG
        </div>
        <h1 style={{ animationDelay: "100ms" }} className="links-rise mt-4 font-display text-xl font-bold">NLG Comex</h1>
        <p style={{ animationDelay: "180ms" }} className="links-rise mt-1 text-center text-sm text-navy-foreground/70">
          Importação da China com assessoria completa · 20 anos de experiência
        </p>

        <ul className="mt-8 w-full space-y-3">
          {links.map(({ titulo, sub, href, icone: Icone, destaque }, i) => {
            const externo = href.startsWith("http");
            return (
              <li key={titulo} style={{ animationDelay: `${280 + i * 90}ms` }} className="links-rise">
                <a
                  href={href}
                  {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={`group relative flex items-center overflow-hidden gap-3 rounded-2xl px-4 py-3.5 transition duration-200 hover:-translate-y-0.5 active:scale-[0.98] ${
                    destaque
                      ? "links-shine bg-gold text-gold-foreground shadow-lg"
                      : "border border-navy-foreground/15 bg-navy-foreground/5 hover:bg-navy-foreground/10"
                  }`}
                >
                  <Icone className={`h-5 w-5 shrink-0 ${destaque ? "" : "text-gold"}`} />
                  <span className="flex-1">
                    <span className="block font-semibold leading-tight">{titulo}</span>
                    <span className={`block text-xs ${destaque ? "opacity-75" : "text-navy-foreground/60"}`}>
                      {sub}
                    </span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 opacity-60 transition group-hover:opacity-100" />
                </a>
              </li>
            );
          })}
        </ul>

        <p className="mt-10 text-xs text-navy-foreground/40">© NLG Comex</p>
      </div>
    </main>
  );
}
