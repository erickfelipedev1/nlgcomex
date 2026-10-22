import { createFileRoute } from "@tanstack/react-router";
import { MultiLinks, type ItemLink } from "@/components/MultiLinks";
import { MessageCircle, Youtube, Linkedin, Globe } from "lucide-react";

const TITULO = "NLG Comex | Links";
const DESCRICAO = "Importação da China com assessoria completa. Fale com a NLG Comex.";

// TODO: ajustar números/URLs reais antes de publicar.
const WHATSAPP = "5513997454361";
const YOUTUBE = "https://www.youtube.com/@nowlogisticsgroup";
const LINKEDIN = "https://www.linkedin.com/company/now-logistics-group-company";
const SITE = "https://nlgcomex.com.br";

const links: ItemLink[] = [
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
    <MultiLinks
      marca="NLG"
      nome="NLG Comex"
      bio="Importação da China com assessoria completa · 20 anos de experiência"
      links={links}
      rodape="NLG Comex"
      intro={{ palavra: "Comex", frase: "Comércio exterior para o mundo" }}
    />
  );
}
