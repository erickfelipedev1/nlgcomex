import { useEffect, useState } from "react";

const DURACAO = 3200; // ms até começar a sair
const SAIDA = 700; // ms da transição de saída

type IntroProps = { onDone: () => void; marca: string; palavra: string; frase: string };

/** Abertura animada em tela cheia, a cada carregamento. Toque para pular. */
export function IntroSplash({ onDone, marca, palavra, frase }: IntroProps) {
  const [fase, setFase] = useState<"on" | "saindo" | "off">("on");

  useEffect(() => {
    const t = setTimeout(() => setFase("saindo"), DURACAO);
    // Voltar pelo histórico restaura a página do cache sem a intro: recarrega para tocar de novo.
    const aoMostrar = (e: PageTransitionEvent) => {
      if (e.persisted) window.location.reload();
    };
    window.addEventListener("pageshow", aoMostrar);
    return () => {
      clearTimeout(t);
      window.removeEventListener("pageshow", aoMostrar);
    };
  }, []);

  useEffect(() => {
    if (fase !== "saindo") return;
    onDone();
    const t = setTimeout(() => setFase("off"), SAIDA);
    return () => clearTimeout(t);
  }, [fase, onDone]);

  if (fase === "off") return null;

  return (
    <div
      role="presentation"
      onClick={() => setFase((f) => (f === "on" ? "saindo" : f))}
      className={`intro fixed inset-0 z-50 flex cursor-pointer flex-col items-center justify-center bg-navy text-navy-foreground ${
        fase === "saindo" ? "intro-out" : ""
      }`}
    >
      <div className="intro-glow absolute inset-0" />

      <div className="relative flex h-36 w-36 items-center justify-center">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-90">
          <circle cx="50" cy="50" r="47" fill="none" stroke="rgb(245 180 40 / 0.15)" strokeWidth="1" />
          <circle className="intro-ring" cx="50" cy="50" r="47" fill="none" stroke="rgb(245 180 40)" strokeWidth="1.6" strokeLinecap="round" pathLength="100" />
        </svg>
        <span className="intro-logo font-display text-4xl font-bold text-gold">{marca}</span>
      </div>

      <p className="intro-word relative mt-6 font-display text-lg font-semibold uppercase">{palavra}</p>
      <span className="intro-line relative mt-3 block h-px w-40 bg-gradient-to-r from-transparent via-gold to-transparent" />
      <p className="intro-tag relative mt-4 px-6 text-center text-xs uppercase tracking-[0.3em] text-gold">
        {frase}
      </p>

      <span className="intro-skip absolute bottom-8 text-[11px] text-navy-foreground/40">toque para pular</span>
    </div>
  );
}
