export type DimensionId = "initiative" | "planning" | "pressure" | "distraction" | "consistency";

export interface QuestionAlternative {
  id: "A" | "B" | "C" | "D";
  label: string;
}

export interface Question {
  id: string;
  dimension: DimensionId;
  title: string;
  alternatives: QuestionAlternative[];
}

export interface Answer {
  questionId: string;
  alternativeId: QuestionAlternative["id"];
}

export interface BehaviorIndex {
  dimension: DimensionId;
  label: string;
  value: number;
}

export type InsightPriority = "Critical" | "High" | "Medium" | "Low";

export interface Insight {
  id: string;
  indicatorId: string;
  priority: InsightPriority;
  title: string;
  description: string;
  recommendation: string;
}

export type EvolutionDifficulty = "Easy" | "Medium" | "Hard";

export interface EvolutionMission {
  id: string;
  title: string;
  goal: string;
  difficulty: EvolutionDifficulty;
  estimatedTime: number;
}

export type EvolutionResourceType =
  "Article" | "Video" | "Podcast" | "Book" | "Checklist" | "Template" | "Exercise" | "Reflection";

export interface EvolutionResource {
  id: string;
  type: EvolutionResourceType;
  title: string;
  estimatedTime: number;
  url?: string;
}

export interface EvolutionPlan {
  firstStep: string;
  habits: string[];
  missions: EvolutionMission[];
  resources: EvolutionResource[];
  difficulty: EvolutionDifficulty;
  estimatedDuration: number;
}

export interface AssessmentResult {
  archetypeName: string;
  archetypeSummary: string;
  confidenceScore: number;
  behaviorIndexes: BehaviorIndex[];
  strengths: string[];
  attentionPoints: string[];
  insights: Insight[];
  evolutionPlan: EvolutionPlan;
}

export interface AssessmentSubmissionError {
  code: string;
  message: string;
}

export type SubmitAssessmentOutput =
  { valid: true; result: AssessmentResult } | { valid: false; errors: AssessmentSubmissionError[] };
