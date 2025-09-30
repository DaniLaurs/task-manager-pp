import { z } from 'zod';

const envSchema = z.object({
  VITE_API_BASE_URL: z.string().min(1, "VITE_API_BASE_URL não pode estar vazia"),
});

const parsed = envSchema.safeParse(import.meta.env);

if (!parsed.success) {
  console.error("❌ Erro ao carregar variáveis de ambiente:");
  console.table(parsed.error.flatten().fieldErrors);
  throw new Error("Variáveis de ambiente inválidas.");
}

export const env = parsed.data;
