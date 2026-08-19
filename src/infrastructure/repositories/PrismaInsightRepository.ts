import type { InsightRepository } from "@/core/contracts/insightRepository";
import type { Insight } from "@/core/domain/insight";
import { prisma } from "@/infrastructure/database/prismaClient";

/**
 * Correspondência Domain ↔ Prisma 1:1 (id, indicatorId, priority, title,
 * description, recommendation) — auditada, sem lacuna.
 */
export class PrismaInsightRepository implements InsightRepository {
  async findAll(): Promise<Insight[]> {
    const rows = await prisma.insight.findMany({ orderBy: { id: "asc" } });

    return rows.map((row) => ({
      id: row.id,
      indicatorId: row.indicatorId,
      priority: row.priority,
      title: row.title,
      description: row.description,
      recommendation: row.recommendation,
    }));
  }
}
