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

export interface AssessmentResult {
  archetypeName: string;
  archetypeSummary: string;
  confidenceScore: number;
  behaviorIndexes: BehaviorIndex[];
  strengths: string[];
  attentionPoints: string[];
  firstStep: string;
}

export interface AssessmentSubmissionError {
  code: string;
  message: string;
}

export type SubmitAssessmentOutput =
  { valid: true; result: AssessmentResult } | { valid: false; errors: AssessmentSubmissionError[] };
