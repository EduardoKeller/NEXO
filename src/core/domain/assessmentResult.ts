import type { Assessment } from "@/core/domain/assessment";
import type { BehaviorArchetype } from "@/core/domain/behaviorArchetype";
import type { BehaviorIndex } from "@/core/domain/behaviorIndex";
import type { EvolutionPlan } from "@/core/domain/evolutionPlan";
import type { Insight } from "@/core/domain/insight";
import type { Mission } from "@/core/domain/mission";
import type { Report } from "@/core/domain/report";
import type { Resource } from "@/core/domain/resource";

/**
 * 07_DATA_MODEL.md, Seção 18. Segue estritamente esta interface —
 * sem `confidenceScore` de topo (DEC-0012).
 */
export interface AssessmentResult {
  assessment: Assessment;
  behaviorIndexes: BehaviorIndex[];
  behaviorArchetype: BehaviorArchetype;
  insights: Insight[];
  strengths: string[];
  attentionPoints: string[];
  evolutionPlan: EvolutionPlan;
  missions: Mission[];
  resources: Resource[];
  report: Report;
  generatedAt: Date;
}
