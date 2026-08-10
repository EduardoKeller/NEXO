/**
 * 07_DATA_MODEL.md, Seção 27 (Official Enumerations).
 * Padrão `const + as const` em vez de `enum`, conforme 09B_CODE_STYLE.md.
 */

export const Status = {
  Draft: "Draft",
  Review: "Review",
  Approved: "Approved",
  Deprecated: "Deprecated",
  Archived: "Archived",
} as const;
export type Status = (typeof Status)[keyof typeof Status];

export const Difficulty = {
  Easy: "Easy",
  Medium: "Medium",
  Hard: "Hard",
} as const;
export type Difficulty = (typeof Difficulty)[keyof typeof Difficulty];

export const Priority = {
  Critical: "Critical",
  High: "High",
  Medium: "Medium",
  Low: "Low",
} as const;
export type Priority = (typeof Priority)[keyof typeof Priority];

export const ResourceType = {
  Article: "Article",
  Video: "Video",
  Podcast: "Podcast",
  Book: "Book",
  Checklist: "Checklist",
  Template: "Template",
  Exercise: "Exercise",
  Reflection: "Reflection",
} as const;
export type ResourceType = (typeof ResourceType)[keyof typeof ResourceType];

export const Language = {
  ptBR: "pt-BR",
  enUS: "en-US",
  esES: "es-ES",
} as const;
export type Language = (typeof Language)[keyof typeof Language];

/**
 * Representa o estado de uma Assessment (07_DATA_MODEL.md, Seção 27).
 * Distinto do `Status` genérico — é este enum, não `Status`, que
 * corresponde ao dado real da Content Library (`status: Active`,
 * 05_CONTENT_LIBRARY.md, Seção 13).
 */
export const AssessmentStatus = {
  Draft: "Draft",
  Active: "Active",
  Deprecated: "Deprecated",
  Archived: "Archived",
} as const;
export type AssessmentStatus = (typeof AssessmentStatus)[keyof typeof AssessmentStatus];

export const ConfidenceLevel = {
  VeryLow: "VeryLow",
  Low: "Low",
  Medium: "Medium",
  High: "High",
  VeryHigh: "VeryHigh",
} as const;
export type ConfidenceLevel = (typeof ConfidenceLevel)[keyof typeof ConfidenceLevel];

export const ArchetypeType = {
  ExecutorUnderPressure: "ExecutorUnderPressure",
  StrategicRefiner: "StrategicRefiner",
  AnalyticalExplorer: "AnalyticalExplorer",
  PriorityAccumulator: "PriorityAccumulator",
} as const;
export type ArchetypeType = (typeof ArchetypeType)[keyof typeof ArchetypeType];

export const DimensionType = {
  Initiative: "Initiative",
  Planning: "Planning",
  PressureManagement: "PressureManagement",
  DistractionManagement: "DistractionManagement",
  Consistency: "Consistency",
} as const;
export type DimensionType = (typeof DimensionType)[keyof typeof DimensionType];
