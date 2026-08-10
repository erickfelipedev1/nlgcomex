import { createFileRoute } from "@tanstack/react-router";
import {
  Ship,
  Boxes,
  Cpu,
  Clock,
  Truck,
  Compass,
  Users,
  Award,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LeadForm } from "@/components/LeadForm";
import heroProdutos from "@/assets/hero-produtos.png";
import portoChina from "@/assets/porto-china.jpg";

const TITULO = "Importação da China para empresas | NLG Comex";
const DESCRICAO =
  "Aumente a lucratividade da sua empresa importando da China com assessoria completa: estudo de viabilidade, fornecedores qualificados e logística integrada.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESCRICAO },
      { property: "og:title", content: TITULO },
      { property: "og:description", content: DESCRICAO },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const beneficios = [
  { icone: Ship, texto: "Redução de custos" },
  { icone: Boxes, texto: "Variedade de produtos" },
  { icone: Cpu, texto: "Tecnologia e inovação" },
  { icone: Clock, texto: "Otimização do tempo" },
  { icone: Truck, texto: "Logística integrada e inteligente" },
  { icone: Compass, texto: "Orientação em cada etapa" },
  { icone: Users, texto: "Equipe com base na China" },
  { icone: Award, texto: "20 anos de experiência no mercado" },
];

const segmentos = [
  "Eletrônicos e áudio",
  "Casa e cozinha",
  "Energia solar",
  "Pet shop",
  "Beleza e cosméticos",
  "Ferramentas",
  "Fitness e esporte",
];

const faq = [
  {
    pergunta: "Qual o melhor produto para se importar?",
    resposta:
      "O melhor produto para se importar é aquele que você já possui expertise e conhecimento. Se você quer se tornar um importador mas ainda não sabe exatamente que produto escolher, nossos especialistas em importação podem te ajudar com sugestões durante nossa consultoria de importação personalizada.",
  },
  {
    pergunta: "Posso importar produtos de marca?",
    resposta:
      "NÃO! Você não pode importar da China qualquer produto de marcas famosas como Nike, Adidas, Apple, Xiaomi ou JBL. Ou seja, nada de importar camisas de time, celulares, perfumes, jogos de video game, etc.",
  },
  {
    pergunta: "Qual o valor mínimo para fazer a minha importação?",
    resposta:
      "Não existe um valor mínimo para que você faça a sua importação. Tudo depende do produto escolhido e da quantidade que você vai trazer. Para chegar nesse valor é preciso realizar uma estimativa de custos, que vai te mostrar cada centavo que será gasto no processo de importação.",
  },
  {
    pergunta: "É preciso mesmo pagar para saber quanto vai custar o meu produto?",
    resposta:
      "Sim, é necessário pagar pela estimativa de custos! Este é um processo muito importante, que tem muitas etapas, mobiliza diversos setores e demanda diversos dias de trabalho.",
  },
  {
    pergunta: "E se o meu produto não der preço?",
    resposta:
      "Caso o valor da sua estimativa seja maior que a sua expectativa, faremos tudo que estiver ao alcance da nossa equipe e uma nova cotação para chegar a um preço mais próximo do que você precisa, para que seu produto chegue ao mercado nacional de forma competitiva.",
  },
  {
    pergunta: "Em quanto tempo meus produtos vão chegar ao Brasil?",
    resposta:
      "Normalmente em uma importação formal as cargas são trazidas via modal marítimo. Este processo tem uma previsão de 90 dias entre a fabricação do seu produto e a chegada dele em território nacional. Feriados no Brasil e na China podem ocasionar atrasos, e qualquer mudança de data é informada pela nossa equipe.",
  },
  {
    pergunta: "O que é necessário para começar a importar?",
    resposta:
      "Para se tornar um importador você precisa de um CNPJ ativo, o Radar SISCOMEX habilitado e seu produto de interesse selecionado. Se você não tiver algum desses itens, nossa equipe de especialistas vai te auxiliar no processo.",
  },
];

function Index() {
  return (
    <main className="overflow-x-hidden">
      {/* HERO */}
      <section className="relative grid lg:grid-cols-2">
        <div className="bg-ink-gradient px-6 py-16 sm:px-10 lg:px-14 lg:py-24">
          <div className="mx-auto max-w-xl">
            <div className="font-display text-3xl font-extrabold tracking-tight text-ink-foreground">
              NLG
              <span className="ml-2 align-middle text-[10px] font-medium uppercase leading-3 tracking-[0.2em] text-ink-foreground/70">
                Now
                <br />
                Logistics
                <br />
                Group
              </span>
            </div>

            <h1 className="mt-10 font-display text-4xl leading-[1.1] text-ink-foreground sm:text-5xl lg:text-6xl">
              <span className="font-bold">Aumente</span> a Lucratividade da sua{" "}
              <span className="font-bold">empresa</span> com a{" "}
              <span className="font-bold text-gold">Importação da China</span>
            </h1>

            <img
              src={heroProdutos}
              alt="Produtos importados da China: eletrônicos, utensílios, energia solar e pet"
              width={1024}
              height={1024}
              className="mt-8 w-full drop-shadow-2xl"
            />
          </div>
        </div>

        <div className="bg-surface px-4 py-14 sm:px-8 lg:px-12 lg:py-20">
          <div className="mx-auto max-w-lg">
            <LeadForm />
          </div>
        </div>
      </section>

      {/* OPORTUNIDADE + BENEFÍCIOS */}
      <section className="bg-background px-6 py-20 lg:px-14">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-navy">
              A oportunidade ideal
            </p>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Essa é a oportunidade ideal para pequenos e médios empreendedores investirem no
              próprio crescimento, ampliarem suas possibilidades de expansão e utilizarem a
              importação como estratégia para aumentar margem, competitividade e escala.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Tudo isso com o suporte, a segurança e o acompanhamento de uma empresa com mais de{" "}
              <strong className="text-foreground">20 anos de experiência no mercado</strong>,
              preparada para ajudar você a iniciar sua jornada da forma mais estratégica e segura
              possível.
            </p>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2">
            {beneficios.map(({ icone: Icone, texto }) => (
              <li
                key={texto}
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 font-semibold text-foreground"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <Icone />
                </span>
                {texto}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SE TORNE UM IMPORTADOR */}
      <section className="relative isolate overflow-hidden px-6 py-24 lg:px-14">
        <img
          src={portoChina}
          alt="Navio cargueiro em porto na China"
          width={1600}
          height={912}
          loading="lazy"
          className="absolute inset-0 -z-10 size-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-ink/85" />
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-4xl text-ink-foreground sm:text-5xl">
            <span className="font-bold">Se torne um</span>{" "}
            <span className="font-bold text-gold">importador!</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-foreground/80">
            Com ajuda da NLG, você terá a assessoria necessária para começar do zero. Com um{" "}
            <strong className="text-gold">estudo de viabilidade</strong> você entenderá todos os
            investimentos e encontrará os fornecedores qualificados da sua mercadoria.
          </p>
          <Button variant="gold" size="xl" className="mt-10" asChild>
            <a href="#formulario">
              Comece sua jornada agora! <ArrowRight />
            </a>
          </Button>
        </div>
      </section>

      {/* SEGMENTOS */}
      <section className="bg-surface px-6 py-20 lg:px-14">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Exemplos de segmentos de
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-foreground sm:text-4xl">
            produtos que você pode importar
          </h2>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {segmentos.map((segmento) => (
              <div
                key={segmento}
                className="rounded-xl border border-border bg-card px-5 py-8 font-display text-lg font-semibold text-navy transition-colors hover:border-gold"
              >
                {segmento}
              </div>
            ))}
          </div>

          <Button variant="navy" size="xl" className="mt-12" asChild>
            <a href="#formulario">Não importamos para pessoa física!</a>
          </Button>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-background px-6 py-20 lg:px-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center font-display text-3xl font-bold text-foreground sm:text-4xl">
            FAQ: Dúvidas frequentes
          </h2>
          <Accordion type="single" collapsible className="mt-10">
            {faq.map((item) => (
              <AccordionItem key={item.pergunta} value={item.pergunta}>
                <AccordionTrigger className="text-left font-display text-base font-semibold text-navy">
                  {item.pergunta}
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                  {item.resposta}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-ink-gradient px-6 py-24 lg:px-14">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-4xl text-ink-foreground sm:text-5xl">
            Transforme o futuro da sua empresa{" "}
            <em className="font-bold not-italic text-gold">agora mesmo!</em>
          </h2>
          <p className="mt-6 text-lg text-ink-foreground/80">
            Conte com nossa ajuda para alavancar os números do seu negócio e atingir novos
            patamares!
          </p>
          <Button variant="gold" size="xl" className="mt-10" asChild>
            <a href="#formulario">Se torne um importador de verdade!</a>
          </Button>
        </div>
      </section>

      <footer className="bg-ink px-6 py-8 text-center text-sm text-ink-foreground/60">
        2024. NLG Comex — Todos os direitos reservados ©
      </footer>
    </main>
  );
}
