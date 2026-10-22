import { useCallback, useState, type ComponentType } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, AtSign, Instagram, Linkedin, Mail } from "lucide-react";

import { IntroSplash } from "@/components/IntroSplash";
import { NetworkBackground } from "@/components/NetworkBackground";
import { LogoOlacyr } from "@/components/jose/LogoOlacyr";
import fotoPalco from "@/assets/jose/olacyr-palco.jpg";

const TITULO = "José Olacyr | Diretor Executivo · Grupo Now";
const DESCRICAO =
  "Sócio fundador do Grupo Now. Jornada 4S, Now Logistics Group, JOG Corp e Now D.gital.";

// Paleta do manual: creme #f5e4d0 e ardósia #81939f sobre navy #081e36.
const CREME = "245, 228, 208";
const ARDOSIA = "129, 147, 159";

type Icone = ComponentType<{ className?: string }>;

const redes: { nome: string; href: string; icone: Icone }[] = [
  { nome: "Instagram", href: "https://www.instagram.com/joseolacyr", icone: Instagram },
  { nome: "LinkedIn", href: "https://www.linkedin.com/in/jos%C3%A9-olacyr-044400a1", icone: Linkedin },
  { nome: "Threads", href: "https://www.threads.net/@joseolacyr", icone: AtSign },
  { nome: "E-mail", href: "mailto:olacyr@gruponow.com.br", icone: Mail },
];

// TODO: confirmar descrições e URLs (NLG e JOG Corp apontam para o Instagram).
const empresas: { nome: string; sobre: string; href: string }[] = [
  { nome: "Now Logistics Group", sobre: "Comércio exterior e logística", href: "https://www.instagram.com/nowlogisticsgroup" },
  { nome: "Jornada 4S", sobre: "Imersão para empresários", href: "https://jornada4s.gruponow.com.br" },
  { nome: "JOG Corp", sobre: "@jogcorp", href: "https://www.instagram.com/jogcorp" },
  { nome: "Now D.gital", sobre: "Solução digital de marca e performance", href: "https://now-dgital.vercel.app" },
];

const externo = { target: "_blank", rel: "noopener noreferrer" } as const;
const atraso = (ms: number) => ({ animationDelay: `${ms}ms` });

export const Route = createFileRoute("/joseolacyr")({
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESCRICAO },
      { property: "og:title", content: TITULO },
      { property: "og:description", content: DESCRICAO },
      { name: "theme-color", content: "#081e36" },
      { name: "robots", content: "noindex" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Syne:wght@400;500;600&display=swap",
      },
    ],
  }),
  component: JoseOlacyr,
});

/** Seta dentro de pílula, como nos posts do manual. */
function Seta({ className = "" }: { className?: string }) {
  return (
    <span className={`flex h-7 w-11 shrink-0 items-center justify-center rounded-full border ${className}`}>
      <ArrowRight className="h-3.5 w-3.5" />
    </span>
  );
}

function JoseOlacyr() {
  const [pronto, setPronto] = useState(false);
  const concluir = useCallback(() => setPronto(true), []);

  return (
    <main className="jose relative min-h-screen overflow-hidden">
      <IntroSplash
        onDone={concluir}
        className="jose"
        conteudo={
          <div className="relative flex flex-col items-center">
            <LogoOlacyr className="jose-wipe w-60 text-[var(--jo-creme)]" />
            <span className="intro-line mt-8 block h-px w-32 bg-gradient-to-r from-transparent via-[var(--jo-ardosia)] to-transparent" />
            <span className="intro-tag mt-4 text-[11px] uppercase tracking-[0.4em] text-[var(--jo-ardosia)]">Grupo Now</span>
          </div>
        }
      />
      <NetworkBackground destaque={CREME} base={ARDOSIA} globo={false} />

      <div key={pronto ? "pronto" : "intro"} className="relative mx-auto max-w-md pb-12">
        {/* Foto com canto arredondado assimétrico (elemento do manual) e logo sobreposto */}
        <header className="links-rise relative h-[min(68vh,560px)] overflow-hidden rounded-b-[56px]">
          <img
            src={fotoPalco}
            alt="José Olacyr palestrando"
            className="jose-ken absolute inset-0 h-full w-full object-cover object-[70%_20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--jo-navy)]/10 via-[var(--jo-navy)]/20 to-[var(--jo-navy)]" />
          <LogoOlacyr className="jose-wipe absolute bottom-8 left-6 w-52 text-[var(--jo-creme)]" />
        </header>

        <div className="px-5">
          <p style={atraso(500)} className="links-rise mt-6 text-sm leading-relaxed text-[var(--jo-ardosia)]">
            Sócio fundador do <span className="text-[var(--jo-creme)]">Grupo Now</span> e sócio executivo de mais de
            10 frentes de negócios, do comércio exterior ao marketing digital.
          </p>

          <ul style={atraso(600)} className="links-rise mt-5 flex gap-2.5">
            {redes.map(({ nome, href, icone: I }) => (
              <li key={nome}>
                <a
                  href={href}
                  {...(href.startsWith("http") ? externo : {})}
                  aria-label={nome}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--jo-ardosia)]/40 text-[var(--jo-creme)] transition hover:-translate-y-0.5 hover:border-[var(--jo-creme)]"
                >
                  <I className="h-[18px] w-[18px]" />
                </a>
              </li>
            ))}
          </ul>


          <h2 style={atraso(800)} className="links-rise mt-12 text-[11px] uppercase tracking-[0.4em] text-[var(--jo-ardosia)]">
            Empresas
          </h2>
          <ul className="mt-2">
            {empresas.map(({ nome, sobre, href }, i) => (
              <li key={nome} style={atraso(880 + i * 90)} className="links-rise border-b border-[var(--jo-ardosia)]/25">
                <a href={href} {...externo} className="group flex items-center gap-4 py-5">
                  <span className="flex-1">
                    <span className="jose-serif block text-[1.4rem] leading-tight transition group-hover:translate-x-1">
                      {nome}
                    </span>
                    <span className="mt-1 block text-xs text-[var(--jo-ardosia)]">{sobre}</span>
                  </span>
                  <Seta className="border-[var(--jo-ardosia)]/50 text-[var(--jo-creme)] transition group-hover:border-[var(--jo-creme)] group-hover:bg-[var(--jo-creme)] group-hover:text-[var(--jo-navy)]" />
                </a>
              </li>
            ))}
          </ul>

          <footer style={atraso(1300)} className="links-rise mt-14 flex flex-col items-center gap-2">
            <span className="jose-serif text-xl">José Olacyr</span>
            <span className="text-[10px] uppercase tracking-[0.4em] text-[var(--jo-ardosia)]">Grupo Now</span>
          </footer>
        </div>
      </div>
    </main>
  );
}
