import { useCallback, useState, type ComponentType } from "react";
import { ArrowUpRight } from "lucide-react";
import { IntroSplash } from "@/components/IntroSplash";
import { NetworkBackground } from "@/components/NetworkBackground";

export type ItemLink = {
  titulo: string;
  sub: string;
  href: string;
  icone: ComponentType<{ className?: string }>;
  destaque?: boolean;
};

type Props = {
  /** Texto do círculo (ex.: "NLG") ou uma foto. */
  marca: string;
  foto?: string;
  nome: string;
  bio: string;
  links: ItemLink[];
  rodape: string;
  intro: { palavra: string; frase: string };
};

/** Página de multilinks com abertura animada, globo e rede ao fundo. */
export function MultiLinks({ marca, foto, nome, bio, links, rodape, intro }: Props) {
  const [pronto, setPronto] = useState(false);
  const concluir = useCallback(() => setPronto(true), []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-navy text-navy-foreground">
      <IntroSplash onDone={concluir} marca={marca} palavra={intro.palavra} frase={intro.frase} />
      <NetworkBackground />
      {/* key remonta o conteúdo para a entrada em cascata tocar depois da abertura */}
      <div key={pronto ? "pronto" : "intro"} className="relative mx-auto flex max-w-md flex-col items-center px-4 py-12">
        <div className="links-rise links-pulse flex h-24 w-24 items-center justify-center rounded-full border-2 border-gold bg-navy-foreground/5 overflow-hidden font-display text-2xl font-bold text-gold">
          {foto ? <img src={foto} alt={nome} className="h-full w-full object-cover" /> : marca}
        </div>
        <h1 style={{ animationDelay: "100ms" }} className="links-rise mt-4 font-display text-xl font-bold">{nome}</h1>
        <p style={{ animationDelay: "180ms" }} className="links-rise mt-1 text-center text-sm text-navy-foreground/70">
          {bio}
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

        <p className="mt-10 text-xs text-navy-foreground/40">© {rodape}</p>
      </div>
    </main>
  );
}
