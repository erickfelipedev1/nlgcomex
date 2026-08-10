import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { enviarLead } from "@/lib/lead.functions";
import formIlustracao from "@/assets/form-ilustracao.png";

export function LeadForm() {
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const submitLead = useServerFn(enviarLead);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      contact_name: String(formData.get("nome") ?? ""),
      contact_sobrenome: String(formData.get("sobrenome") ?? ""),
      contact_email: String(formData.get("email") ?? ""),
      contact_telefone: String(formData.get("celular") ?? ""),
      contact_nome_empresa: String(formData.get("empresa") ?? ""),
      contact_importou: String(formData.get("jaImportou") ?? ""),
      contact_quanto: String(formData.get("investimento") ?? ""),
      contact_qual: String(formData.get("produto") ?? ""),
    };

    setEnviando(true);
    try {
      const result = await submitLead({ data: payload });
      if (!result.ok) throw new Error("webhook");
      setEnviado(true);
      toast.success("Recebemos seus dados!", {
        description: "Nosso time de especialistas entra em contato em breve.",
      });
    } catch {
      toast.error("Não conseguimos enviar seus dados", {
        description: "Tente novamente em alguns instantes.",
      });
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div
      id="formulario"
      className="rounded-2xl bg-surface p-6 shadow-soft-card sm:p-8 lg:p-10"
    >
      <img
        src={formIlustracao}
        alt="Especialistas da NLG Comex atendendo importadores"
        width={1024}
        height={704}
        className="mx-auto w-full max-w-sm"
      />

      <h2 className="mt-4 text-center text-2xl font-light uppercase leading-tight text-foreground sm:text-3xl">
        Fale com nosso time de <span className="font-bold text-navy">especialistas</span>
      </h2>
      <p className="mx-auto mt-3 max-w-sm text-center text-sm text-muted-foreground">
        <strong className="text-foreground">Preencha o formulário</strong> e vamos entrar em contato
        para te atender da melhor forma possível, queremos te ajudar!
      </p>

      {enviado ? (
        <div className="mt-8 rounded-xl border border-gold/40 bg-background p-6 text-center">
          <p className="font-display text-lg font-semibold text-navy">Formulário enviado!</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Um especialista em importação vai falar com você em até 1 dia útil.
          </p>
        </div>
      ) : (
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome*</Label>
              <Input id="nome" name="nome" required maxLength={100} className="bg-background" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sobrenome">Sobrenome*</Label>
              <Input
                id="sobrenome"
                name="sobrenome"
                required
                maxLength={100}
                className="bg-background"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email*</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              maxLength={255}
              className="bg-background"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="celular">Celular*</Label>
            <Input
              id="celular"
              name="celular"
              type="tel"
              required
              maxLength={30}
              placeholder="(00) 00000-0000"
              className="bg-background"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="empresa">Qual o nome da sua empresa?</Label>
            <Input id="empresa" name="empresa" maxLength={150} className="bg-background" />
          </div>

          <fieldset className="space-y-3">
            <legend className="text-sm font-medium">Já importou alguma vez?*</legend>
            <RadioGroup name="jaImportou" required className="gap-2">
              {["Sim", "Não"].map((opcao) => (
                <div key={opcao} className="flex items-center gap-2">
                  <RadioGroupItem value={opcao} id={`importou-${opcao}`} />
                  <Label htmlFor={`importou-${opcao}`} className="font-normal">
                    {opcao}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </fieldset>

          <fieldset className="space-y-3">
            <legend className="text-sm font-medium">
              Quanto você ou sua empresa podem investir em uma importação da China?*
            </legend>
            <RadioGroup name="investimento" required className="gap-2">
              {[
                "De R$ 30.000 a R$ 50.000",
                "De R$ 50.000 a R$ 75.000",
                "Acima de R$ 75.000",
              ].map((faixa) => (
                <div key={faixa} className="flex items-center gap-2">
                  <RadioGroupItem value={faixa} id={faixa} />
                  <Label htmlFor={faixa} className="font-normal">
                    {faixa}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </fieldset>

          <div className="space-y-2">
            <Label htmlFor="produto">Qual produto pretende importar?*</Label>
            <Input id="produto" name="produto" required maxLength={200} className="bg-background" />
          </div>

          <Button type="submit" variant="gold" size="xl" className="w-full" disabled={enviando}>
            {enviando ? "Enviando..." : "Fale com a gente!"}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            Não importamos para pessoa física. É necessário CNPJ ativo.
          </p>
        </form>
      )}
    </div>
  );
}
