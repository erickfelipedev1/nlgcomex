import { LOGO_OLACYR_PATHS, LOGO_OLACYR_VIEWBOX } from "./logo-paths";

/** Logotipo empilhado "José Olacyr · Diretor Executivo"; herda a cor do texto. */
export function LogoOlacyr({ className }: { className?: string }) {
  return (
    <svg
      viewBox={LOGO_OLACYR_VIEWBOX}
      role="img"
      aria-label="José Olacyr, Diretor Executivo"
      className={className}
      fill="currentColor"
    >
      {/* vetor estático extraído do manual de marca */}
      <g dangerouslySetInnerHTML={{ __html: LOGO_OLACYR_PATHS }} />
    </svg>
  );
}
