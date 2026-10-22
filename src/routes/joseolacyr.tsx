import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Ship, Compass, Briefcase, MonitorSmartphone, AtSign } from "lucide-react";

import { MultiLinks, type ItemLink } from "@/components/MultiLinks";

const TITULO = "José Olacyr | Links";
const DESCRICAO = "Sócio fundador do Grupo Now. Links da Jornada 4S, Now Logistics Group, JOG Corp e Now Digital Lab.";

// TODO: confirmar URLs e trocar a sigla pela foto (prop `foto`) antes de divulgar.
const links: ItemLink[] = [
  {
    titulo: "Blog NLG Comex",
    sub: "Conteúdos sobre comércio exterior",
    href: "https://nlgcomex.com.br/blog",
    icone: BookOpen,
    destaque: true,
  },
  {
    titulo: "Now Logistics Group",
    sub: "Logística e comércio exterior",
    href: "https://www.instagram.com/nowlogisticsgroup",
    icone: Ship,
  },
  {
    titulo: "Jornada 4S",
    sub: "Conheça a jornada",
    href: "https://jornada4s.gruponow.com.br",
    icone: Compass,
  },
  {
    titulo: "JOG Corp",
    sub: "@jogcorp",
    href: "https://www.instagram.com/jogcorp",
    icone: Briefcase,
  },
  {
    titulo: "Now Digital Lab",
    sub: "Marketing e tecnologia",
    href: "https://nowdigitallab.com.br",
    icone: MonitorSmartphone,
  },
  {
    titulo: "Threads",
    sub: "@joseolacyr",
    href: "https://www.threads.net/@joseolacyr",
    icone: AtSign,
  },
];

export const Route = createFileRoute("/joseolacyr")({
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESCRICAO },
      { property: "og:title", content: TITULO },
      { property: "og:description", content: DESCRICAO },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: JoseOlacyr,
});

function JoseOlacyr() {
  return (
    <MultiLinks
      marca="JO"
      nome="José Olacyr Dos Santos"
      bio="Sócio fundador do Grupo Now · diretor executivo da Jornada 4S, Now Logistics Group, JOG Corp e Now Digital Lab"
      links={links}
      rodape="Grupo Now"
      intro={{ palavra: "Olacyr", frase: "Grupo Now" }}
    />
  );
}
