/**
 * Seed do conteúdo estático da NEXO Platform (Sprint 2 — Persistência).
 *
 * Fonte exclusiva: src/core/content/*. Nenhum conteúdo é inventado aqui —
 * este script apenas traduz o que já existe na Content Library para
 * chamadas idempotentes (upsert) no schema já aplicado (migration
 * 20260818150348_init).
 *
 * Ordem de inserção respeita as dependências de Foreign Key:
 * Dimension, Archetype, Mission, Resource (raízes) → Indicator (depende
 * de Dimension) → Assessment (raiz, mas precede Question) → Question
 * (depende de Assessment/Dimension/Indicator) → Alternative (depende de
 * Question, chave composta questionId+id) → Insight (depende de
 * Indicator).
 *
 * EvolutionPlan e ReportTemplate permanecem vazios nesta Sprint
 * (13_DECISION_LOG.md, DEC-0021 e DEC-0018) — nenhum registro é criado
 * para eles. `Archetype.strengths`/`attentionPoints` não são persistidos
 * (permanecem runtime-only, DEC-0014/DEC-0020) — só `summary`/
 * `description` vão para a coluna de `archetype`.
 */

import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { PrismaPg } from "@prisma/adapter-pg";

import { Prisma, PrismaClient } from "../src/generated/prisma/client";

import { archetypeProfiles } from "../src/core/content/archetypeProfiles";
import { archetypeReferenceProfiles } from "../src/core/content/archetypeReferenceProfiles";
import { assessment } from "../src/core/content/assessment";
import { dimensions } from "../src/core/content/dimensions";
import { indicators } from "../src/core/content/indicators";
import { insights } from "../src/core/content/insights";
import { missions } from "../src/core/content/missions";
import { resources } from "../src/core/content/resources";

/**
 * `node prisma/seed.ts` não carrega `.env` automaticamente (diferente de
 * `prisma.config.ts`, que usa o pacote `dotenv`). Como nenhuma dependência
 * além de `@prisma/adapter-pg`/`pg` foi autorizada nesta etapa, este
 * carregador mínimo evita adicionar `dotenv` como dependência nova.
 * Nunca imprime o conteúdo do arquivo nem de nenhuma variável.
 */
function loadEnvFile(path: string): void {
  if (!existsSync(path)) return;

  const content = readFileSync(path, "utf-8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) continue;

    const key = trimmed.slice(0, separatorIndex).trim();
    let value = trimmed.slice(separatorIndex + 1).trim();
    const isQuoted =
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"));
    if (isQuoted) {
      value = value.slice(1, -1);
    }

    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

const currentDir = dirname(fileURLToPath(import.meta.url));
loadEnvFile(resolve(currentDir, "..", ".env"));

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL não está definida no ambiente.");
}

const adapter = new PrismaPg(connectionString);
const prisma = new PrismaClient({ adapter });

async function seedDimensions(tx: Prisma.TransactionClient): Promise<void> {
  for (const dimension of dimensions) {
    const data = {
      slug: dimension.slug,
      name: dimension.name,
      description: dimension.description,
      weight: dimension.weight,
    };
    await tx.dimension.upsert({
      where: { id: dimension.id },
      update: data,
      create: { id: dimension.id, ...data },
    });
  }
}

async function seedArchetypes(tx: Prisma.TransactionClient): Promise<void> {
  for (const referenceProfile of archetypeReferenceProfiles) {
    const profile = archetypeProfiles.find((item) => item.archetypeId === referenceProfile.id);
    if (!profile) {
      throw new Error(
        `Nenhum ArchetypeProfile encontrado para archetypeId "${referenceProfile.id}" — conteúdo inconsistente entre archetypeReferenceProfiles.ts e archetypeProfiles.ts.`,
      );
    }

    const data = {
      slug: referenceProfile.slug,
      name: referenceProfile.name,
      summary: profile.summary,
      description: profile.description,
    };
    await tx.archetype.upsert({
      where: { id: referenceProfile.id },
      update: data,
      create: { id: referenceProfile.id, ...data },
    });
  }
}

async function seedMissions(tx: Prisma.TransactionClient): Promise<void> {
  for (const mission of missions) {
    const data = {
      title: mission.title,
      goal: mission.goal,
      difficulty: mission.difficulty,
      estimatedTime: mission.estimatedTime,
    };
    await tx.mission.upsert({
      where: { id: mission.id },
      update: data,
      create: { id: mission.id, ...data },
    });
  }
}

async function seedResources(tx: Prisma.TransactionClient): Promise<void> {
  for (const resource of resources) {
    const data = {
      type: resource.type,
      title: resource.title,
      description: resource.description,
      ...(resource.url !== undefined ? { url: resource.url } : {}),
    };
    await tx.resource.upsert({
      where: { id: resource.id },
      update: data,
      create: { id: resource.id, ...data },
    });
  }
}

async function seedIndicators(tx: Prisma.TransactionClient): Promise<void> {
  for (const indicator of indicators) {
    const data = {
      dimensionId: indicator.dimensionId,
      slug: indicator.slug,
      name: indicator.name,
      description: indicator.description,
      weight: indicator.weight,
    };
    await tx.indicator.upsert({
      where: { id: indicator.id },
      update: data,
      create: { id: indicator.id, ...data },
    });
  }
}

async function seedAssessment(tx: Prisma.TransactionClient): Promise<void> {
  const data = {
    slug: assessment.slug,
    name: assessment.name,
    description: assessment.description,
    version: assessment.version,
    language: assessment.language,
    status: assessment.status,
    estimatedTime: assessment.estimatedTime,
  };
  await tx.assessment.upsert({
    where: { id: assessment.id },
    update: data,
    create: { id: assessment.id, ...data },
  });
}

async function seedQuestionsAndAlternatives(tx: Prisma.TransactionClient): Promise<void> {
  for (const [order, question] of assessment.questions.entries()) {
    const questionData = {
      assessmentId: assessment.id,
      dimensionId: question.dimensionId,
      primaryIndicatorId: question.primaryIndicatorId,
      title: question.title,
      weight: question.weight,
      order,
      ...(question.description !== undefined ? { description: question.description } : {}),
    };
    await tx.question.upsert({
      where: { id: question.id },
      update: questionData,
      create: { id: question.id, ...questionData },
    });

    for (const alternative of question.alternatives) {
      const alternativeData = {
        label: alternative.label,
        score: alternative.score,
      };
      await tx.alternative.upsert({
        where: { questionId_id: { questionId: question.id, id: alternative.id } },
        update: alternativeData,
        create: { id: alternative.id, questionId: question.id, ...alternativeData },
      });
    }

    // Sincroniza QuestionSecondaryIndicator escopado a esta Question: remove
    // relações que não estão mais em `secondaryIndicatorIds` e insere as
    // atuais. Nunca um DELETE global — `deleteMany` sempre filtra por
    // `questionId: question.id`. Idempotente: reexecutar produz o mesmo
    // estado (deleteMany não encontra nada a remover, upsert não altera
    // linhas já existentes).
    await tx.questionSecondaryIndicator.deleteMany({
      where: {
        questionId: question.id,
        indicatorId: { notIn: question.secondaryIndicatorIds },
      },
    });

    for (const indicatorId of question.secondaryIndicatorIds) {
      await tx.questionSecondaryIndicator.upsert({
        where: { questionId_indicatorId: { questionId: question.id, indicatorId } },
        update: {},
        create: { questionId: question.id, indicatorId },
      });
    }
  }
}

async function seedInsights(tx: Prisma.TransactionClient): Promise<void> {
  for (const insight of insights) {
    const data = {
      indicatorId: insight.indicatorId,
      priority: insight.priority,
      title: insight.title,
      description: insight.description,
      recommendation: insight.recommendation,
    };
    await tx.insight.upsert({
      where: { id: insight.id },
      update: data,
      create: { id: insight.id, ...data },
    });
  }
}

/**
 * Todos os 77 upserts rodam dentro de uma única transação interativa —
 * ou grava tudo, ou nada é gravado (Prisma 7 + @prisma/adapter-pg
 * suportam $transaction/startTransaction, confirmado em auditoria).
 * `timeout: 30000` substitui o padrão do Prisma (5000ms): 77 operações
 * sequenciais contra um Postgres remoto (Neon), somadas a um possível
 * cold start do compute, podem razoavelmente exceder 5s (auditoria de
 * transação). `maxWait` (2000ms, tempo para iniciar a transação, não
 * para executá-la) permanece no padrão — sem justificativa técnica
 * para alterá-lo.
 */
async function main(): Promise<void> {
  await prisma.$transaction(
    async (tx) => {
      await seedDimensions(tx);
      await seedArchetypes(tx);
      await seedMissions(tx);
      await seedResources(tx);
      await seedIndicators(tx);
      await seedAssessment(tx);
      await seedQuestionsAndAlternatives(tx);
      await seedInsights(tx);
    },
    { timeout: 30000 },
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error: unknown) => {
    console.error("Falha ao executar o seed:", error);
    await prisma.$disconnect();
    process.exitCode = 1;
  });
