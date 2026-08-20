import type { DimensionRepository } from "@/core/contracts/dimensionRepository";
import type { Dimension } from "@/core/domain/dimension";
import { prisma } from "@/infrastructure/database/prismaClient";

/**
 * `indicatorIds` é reconstruído exclusivamente a partir da relação real
 * `Dimension.indicators` (FK `Indicator.dimensionId`) — nenhum ID é
 * inventado. `orderBy: { id: "asc" }` só garante determinismo da
 * consulta; não recupera (nem pretende recuperar) a ordem original da
 * Content Library, que não é persistida no Storage Model.
 */
export class PrismaDimensionRepository implements DimensionRepository {
  async findAll(): Promise<Dimension[]> {
    const rows = await prisma.dimension.findMany({
      include: {
        indicators: {
          select: { id: true },
          orderBy: { id: "asc" },
        },
      },
      orderBy: { id: "asc" },
    });

    return rows.map((row) => ({
      id: row.id,
      slug: row.slug,
      name: row.name,
      description: row.description,
      weight: row.weight,
      indicatorIds: row.indicators.map((indicator) => indicator.id),
    }));
  }
}
