import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const WEBHOOK_URL =
  "https://functions-api.clint.digital/endpoints/integration/webhook/82a41510-0bbd-46eb-8990-910625e72b2c";

const leadSchema = z.object({
  contact_name: z.string().trim().min(1).max(100),
  contact_sobrenome: z.string().trim().min(1).max(100),
  contact_email: z.string().trim().email().max(255),
  contact_telefone: z.string().trim().min(8).max(30),
  contact_nome_empresa: z.string().trim().max(150).optional().default(""),
  contact_importou: z.string().trim().max(20),
  contact_quanto: z.string().trim().max(100),
  contact_qual: z.string().trim().min(1).max(200),
});

export const enviarLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => leadSchema.parse(input))
  .handler(async ({ data }) => {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error("Clint webhook failed", response.status, await response.text());
      return { ok: false as const };
    }

    return { ok: true as const };
  });
