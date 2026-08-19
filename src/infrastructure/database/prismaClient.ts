import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "@/generated/prisma/client";

/**
 * Singleton do PrismaClient (12B_ARCHITECTURE_PATTERNS.md, Seção 7 —
 * Infrastructure). Usa `globalThis` para sobreviver ao hot reload do
 * Next.js em desenvolvimento, evitando esgotar conexões a cada reload.
 * `DATABASE_URL` já é carregada pelo próprio Next.js (`.env`/`.env.local`)
 * antes de qualquer código de aplicação rodar — nenhum carregador
 * adicional é necessário aqui (diferente de `prisma/seed.ts`, que roda
 * fora do bundler).
 */

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL não está definida no ambiente.");
}

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ adapter: new PrismaPg(connectionString) });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
