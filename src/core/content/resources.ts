import type { Resource } from "@/core/domain/resource";
import { ResourceType } from "@/core/types/enums";

/**
 * 05_CONTENT_LIBRARY.md, Seção 21 (Resource Library).
 * `description` não é preenchida no único exemplo documentado —
 * campo obrigatório em 07_DATA_MODEL.md sem conteúdo disponível,
 * mantido como string vazia (mesmo tratamento de `missions.ts`).
 */
export const resources: Resource[] = [
  {
    id: "article_small_steps",
    type: ResourceType.Article,
    title: "Como dividir grandes tarefas em pequenas ações.",
    description: "",
    estimatedTime: 6,
    tags: ["planejamento", "produtividade"],
  },
];
