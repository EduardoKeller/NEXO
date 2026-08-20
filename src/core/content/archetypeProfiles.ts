import type { ArchetypeProfile } from "@/core/domain/archetypeProfile";

/**
 * 05_CONTENT_LIBRARY.md, Seção 17 (Archetype Library).
 * 100% oficial — summary/description/strengths/attention_points já
 * documentados para os 4 Arquétipos, sem conteúdo inventado (DEC-0012).
 */
export const archetypeProfiles: ArchetypeProfile[] = [
  {
    archetypeId: "executor_under_pressure",
    summary:
      "Você tende a produzir melhor quando existe um prazo definido ou uma sensação de urgência.",
    description:
      "Seu comportamento demonstra facilidade para agir rapidamente quando percebe consequências claras ou prazos próximos. Entretanto, tarefas sem urgência podem acabar sendo adiadas.",
    strengths: ["Agilidade.", "Boa resposta em momentos críticos.", "Capacidade de adaptação."],
    attentionPoints: ["Dependência de urgência.", "Acúmulo de tarefas.", "Estresse frequente."],
  },
  {
    archetypeId: "strategic_refiner",
    summary: "Você valoriza qualidade e preparação antes de agir.",
    description:
      "Sua tendência é dedicar bastante tempo ao planejamento e à busca pela melhor solução possível. Isso aumenta a qualidade das entregas, mas pode retardar o início das tarefas.",
    strengths: ["Organização.", "Qualidade.", "Visão estratégica."],
    attentionPoints: ["Excesso de planejamento.", "Perfeccionismo.", "Dificuldade para iniciar."],
  },
  {
    archetypeId: "analytical_explorer",
    summary: "Você procura compreender profundamente antes de agir.",
    description:
      "Sua principal característica é a curiosidade e a busca por informações. Em alguns contextos, isso pode gerar excesso de análise e atrasar decisões.",
    strengths: ["Aprendizado rápido.", "Pensamento crítico.", "Boa capacidade analítica."],
    attentionPoints: ["Excesso de pesquisa.", "Indecisão.", "Lentidão para iniciar."],
  },
  {
    archetypeId: "priority_accumulator",
    summary: "Você tende a assumir muitas responsabilidades simultaneamente.",
    description:
      "Seu comportamento demonstra disposição para realizar diversas atividades, mas o excesso de demandas reduz foco e consistência.",
    strengths: ["Energia.", "Proatividade.", "Disponibilidade."],
    attentionPoints: ["Sobrecarga.", "Falta de priorização.", "Baixa conclusão."],
  },
];
