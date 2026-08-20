import type {
  ResultBuilder,
  ResultBuilderInput,
  ResultBuilderOutput,
} from "@/core/contracts/resultBuilder";
import type { AssessmentResult } from "@/core/domain/assessmentResult";
import type { BehaviorArchetype } from "@/core/domain/behaviorArchetype";
import type { Report } from "@/core/domain/report";

/** 07_DATA_MODEL.md, Seção 17 — sem Report Library documentada, stub (DEC-0012). */
const REPORT_TEMPLATE = "assessment-default-v1";

/**
 * Result Builder (06_ASSESSMENT_ENGINE.md, Seção 13).
 * Escopo e regras: DEC-0012.
 *
 * Puro Factory/aggregator: monta `AssessmentResult` a partir dos
 * outputs já calculados pelas Engines anteriores, sem recriar nenhuma
 * fórmula. `matchedIndicators` reaproveita `predominantIndicatorIds`
 * (Insight Engine, DEC-0010) sem recálculo, resolvendo a pendência de
 * DEC-0009. `missions`/`resources` resolvem os IDs já filtrados pela
 * Evolution Engine contra as Libraries; IDs que não existem nas
 * Libraries fornecidas são ignorados defensivamente, sem erro.
 */
export const buildAssessmentResult: ResultBuilder = ({
  assessment,
  behaviorIndexes,
  archetypeResolverOutput,
  archetypeReferenceProfiles,
  archetypeProfiles,
  insights,
  predominantIndicatorIds,
  evolutionPlan,
  missionLibrary,
  resourceLibrary,
}: ResultBuilderInput): ResultBuilderOutput => {
  const referenceProfile = archetypeReferenceProfiles.find(
    (item) => item.id === archetypeResolverOutput.archetypeId,
  );
  const profile = archetypeProfiles.find(
    (item) => item.archetypeId === archetypeResolverOutput.archetypeId,
  );

  const behaviorArchetype: BehaviorArchetype = {
    id: archetypeResolverOutput.archetypeId,
    slug: referenceProfile?.slug ?? "",
    name: referenceProfile?.name ?? "",
    summary: profile?.summary ?? "",
    confidence: archetypeResolverOutput.confidence,
    matchedIndicators: predominantIndicatorIds,
  };

  const evolutionPlanMissionIds = new Set(evolutionPlan.missions);
  const evolutionPlanResourceIds = new Set(evolutionPlan.resources);
  const missions = missionLibrary.filter((mission) => evolutionPlanMissionIds.has(mission.id));
  const resources = resourceLibrary.filter((resource) => evolutionPlanResourceIds.has(resource.id));

  const generatedAt = new Date();

  const report: Report = {
    id: `report_${archetypeResolverOutput.archetypeId}`,
    template: REPORT_TEMPLATE,
    language: assessment.language,
    generatedAt,
  };

  const assessmentResult: AssessmentResult = {
    assessment,
    behaviorIndexes,
    behaviorArchetype,
    insights,
    strengths: profile?.strengths ?? [],
    attentionPoints: profile?.attentionPoints ?? [],
    evolutionPlan,
    missions,
    resources,
    report,
    generatedAt,
  };

  return { assessmentResult };
};
