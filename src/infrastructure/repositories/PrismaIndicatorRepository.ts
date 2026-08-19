import type { IndicatorRepository } from "@/core/contracts/indicatorRepository";
import type { Indicator } from "@/core/domain/indicator";
import { prisma } from "@/infrastructure/database/prismaClient";

/**
 * Correspondência Domain ↔ Prisma 1:1 (id, dimensionId, slug, name,
 * description, weight) — auditada, sem lacuna.
 */
export class PrismaIndicatorRepository implements IndicatorRepository {
  async findAll(): Promise<Indicator[]> {
    const rows = await prisma.indicator.findMany({ orderBy: { id: "asc" } });

    return rows.map((row) => ({
      id: row.id,
      dimensionId: row.dimensionId,
      slug: row.slug,
      name: row.name,
      description: row.description,
      weight: row.weight,
    }));
  }
}
