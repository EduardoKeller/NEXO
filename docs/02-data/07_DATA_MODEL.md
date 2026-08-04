# DATA MODEL

**Projeto:** NEXO Platform  
**Documento:** 07_DATA_MODEL.md  
**Versão:** 2.1  
**Status:** Draft (Sprint 0 Review)  
**Última atualização:** 04/08/2026

---

# 1. Objetivo

Este documento define o Modelo de Domínio (Domain Model) da plataforma NEXO.

Seu objetivo é representar todas as entidades do sistema e seus relacionamentos, independentemente da tecnologia utilizada para armazenamento ou implementação.

Este documento é a fonte oficial para:

- Assessment Engine
- Business Rules
- Content Library
- Frontend
- Backend
- API
- Banco de Dados

---

# 2. Princípios

O Modelo de Dados deverá ser:

- Independente de banco de dados;
- Independente de framework;
- Orientado ao domínio;
- Escalável;
- Versionável;
- Compatível com futuras Assessments.

Nenhuma decisão de persistência deverá alterar este modelo.

---

# 3. Modelo Conceitual

A plataforma é organizada da seguinte forma:

Assessment

↓

Question

↓

Answer

↓

Indicator

↓

Dimension

↓

Behavior Index

↓

Behavior Archetype

↓

Insight

↓

Evolution Plan

↓

Mission

↓

Resource

↓

Report

↓

Assessment Result

---

# 4. Entidades Oficiais

O MVP utilizará as seguintes entidades.

| Entidade | Responsabilidade |
|----------|------------------|
| Assessment | Define uma Avaliação |
| Question | Representa uma pergunta |
| Alternative | Representa uma alternativa |
| Answer | Resposta do usuário |
| Dimension | Área comportamental |
| Indicator | Comportamento observado |
| BehaviorIndex | Resultado normalizado |
| BehaviorArchetype | Interpretação principal |
| Insight | Explicação personalizada |
| EvolutionPlan | Plano recomendado |
| Mission | Pequena ação prática |
| Resource | Conteúdo complementar |
| Report | Relatório gerado |
| AssessmentResult | Resultado final |

---

# 5. Assessment

Representa uma Avaliação oficial.

```typescript
interface Assessment {

id: string

slug: string

name: string

description: string

version: string

language: string

status: Status

estimatedTime: number

questions: Question[]

dimensions: Dimension[]

}
```

---

# 6. Question

Representa uma pergunta da Assessment.

```typescript
interface Question {

id: string

title: string

description?: string

dimensionId: string

primaryIndicatorId: string

secondaryIndicatorIds: string[]

weight: number

alternatives: Alternative[]

}
```

---

# 7. Alternative

Representa uma alternativa disponível para uma pergunta.

```typescript
interface Alternative {

id: string

label: string

description?: string

score: number

behaviorEvidence: string[]

}
```

---

# 8. Answer

Representa a resposta escolhida pelo usuário.

```typescript
interface Answer {

questionId: string

alternativeId: string

answeredAt: Date

}
```

---

# 9. Dimension

Representa uma área do comportamento.

```typescript
interface Dimension {

id: string

slug: string

name: string

description: string

weight: number

indicatorIds: string[]

}
```

---

# 10. Indicator

Representa um comportamento observável.

```typescript
interface Indicator {

id: string

slug: string

dimensionId: string

name: string

description: string

weight: number

}
```

---

# 11. BehaviorIndex

Representa o resultado calculado para uma Dimensão.

```typescript
interface BehaviorIndex {

id: string

dimensionId: string

rawScore: number

normalizedScore: number

confidence: number

}
```

Todos os índices serão normalizados entre 0 e 100.

---

# 12. BehaviorArchetype

Representa a interpretação predominante.

```typescript
interface BehaviorArchetype {

id: string

slug: string

name: string

summary: string

confidence: number

matchedIndicators: string[]

}
```

Arquétipos nunca representam personalidade.

Representam tendências comportamentais.

`confidence` utiliza a faixa oficial 0–100, calculada pelo Archetype Resolver (06_ASSESSMENT_ENGINE.md, Seção 9) a partir da Distância Euclidiana Ponderada. Corresponde a `ConfidenceLevel` (Seção 27): 0–20 VeryLow · 21–40 Low · 41–60 Medium · 61–80 High · 81–100 VeryHigh.

`matchedIndicators` lista os Indicadores predominantes, utilizados como critério de desempate (04_BUSINESS_RULES.md, Seção 16).

---

# 13. Insight

Representa uma interpretação personalizada.

```typescript
interface Insight {

id: string

indicatorId: string

priority: Priority

title: string

description: string

recommendation: string

}
```

---

# 14. EvolutionPlan

Representa o Plano de Evolução.

```typescript
interface EvolutionPlan {

id: string

firstStep: string

habits: string[]

missions: string[]

resources: string[]

estimatedDuration: number

difficulty: Difficulty

}
```

---

# 15. Mission

Representa uma pequena ação prática.

```typescript
interface Mission {

id: string

title: string

description: string

goal: string

difficulty: Difficulty

estimatedTime: number

steps: string[]

expectedOutcome: string

}
```

---

# 16. Resource

Representa um conteúdo complementar.

```typescript
interface Resource {

id: string

type: ResourceType

title: string

description: string

estimatedTime: number

url?: string

tags: string[]

}
```

---

# 17. Report

Representa o relatório gerado.

```typescript
interface Report {

id: string

template: string

language: string

generatedAt: Date

downloadUrl?: string

}
```

---

# 18. AssessmentResult

Representa o objeto final retornado pela Assessment Engine.

```typescript
interface AssessmentResult {

assessment: Assessment

behaviorIndexes: BehaviorIndex[]

behaviorArchetype: BehaviorArchetype

insights: Insight[]

strengths: string[]

attentionPoints: string[]

evolutionPlan: EvolutionPlan

missions: Mission[]

resources: Resource[]

report: Report

generatedAt: Date

}
```

Este objeto representa a saída oficial da plataforma.

---

# 19. Value Objects

Os seguintes objetos não possuem identidade própria.

- Score
- Weight
- Confidence
- Priority
- Difficulty
- Duration
- Version
- Status
- Language

Eles existem apenas para representar valores.

---

# 20. Relacionamentos

Assessment

↓

Questions

↓

Alternatives

↓

Answers

↓

Indicators

↓

Dimensions

↓

Behavior Indexes

↓

Behavior Archetype

↓

Insights

↓

Evolution Plan

↓

Missions

↓

Resources

↓

Report

↓

Assessment Result

---

# 21. Estados

Todas as entidades deverão possuir um Status.

Draft

↓

Review

↓

Approved

↓

Deprecated

↓

Archived

Nenhuma entidade deverá ser removida permanentemente.

---

# 22. Versionamento

Toda entidade deverá possuir:

- id imutável;
- version;
- createdAt;
- updatedAt.

Alterações incompatíveis deverão gerar uma nova versão.

---

# 23. Escalabilidade

O modelo deverá suportar:

- múltiplas Assessments;
- múltiplos idiomas;
- novos Arquétipos;
- novos Indicadores;
- novas Dimensões;
- novos Relatórios;
- IA;
- API pública;
- aplicativo mobile.

Sem necessidade de alterar sua estrutura fundamental.

---

# 24. Critérios de Aceite

O Modelo de Dados será considerado aprovado quando:

✓ Representar todas as entidades do domínio.

✓ Estiver alinhado ao PRD.

✓ Estiver alinhado à Methodology.

✓ Estiver alinhado às Business Rules.

✓ Estiver alinhado à Assessment Engine.

✓ Não depender de tecnologia específica.

✓ Permitir crescimento da plataforma.

---

# 25. Princípio Supremo

O Modelo de Dados representa a estrutura oficial do domínio da NEXO.

Toda entidade utilizada pela plataforma deverá estar definida neste documento.

Nenhum conceito de negócio poderá existir apenas no código.

---

# 26. Entity Relationship Model (ERM)

O Modelo de Dados da NEXO é organizado em torno da Assessment e do Assessment Result.

O relacionamento conceitual é apresentado abaixo.

```text
                          Assessment
                               │
                 ┌─────────────┴─────────────┐
                 │                           │
           Question                    Dimension
                 │                           │
                 │                     Indicator
                 │                           │
            Alternative                     │
                 │                           │
                 └─────────────┬─────────────┘
                               │
                            Answer
                               │
                               ▼
                       Assessment Engine
                               │
                               ▼
                        Behavior Index
                               │
                               ▼
                     Behavior Archetype
                               │
               ┌───────────────┼───────────────┐
               │               │               │
           Insight       Evolution Plan     Report
               │               │
               │               │
          Resource         Mission
               │               │
               └───────────────┴───────────────┐
                                               │
                                               ▼
                                      Assessment Result
```

## Relacionamentos

| Origem | Destino | Cardinalidade |
|---------|----------|--------------|
| Assessment | Question | 1:N |
| Assessment | Dimension | 1:N |
| Question | Alternative | 1:N |
| Question | Indicator | N:1 |
| Indicator | Dimension | N:1 |
| Answer | Question | N:1 |
| BehaviorIndex | Dimension | N:1 |
| BehaviorArchetype | BehaviorIndex | N:N (conceitual) |
| Insight | Indicator | N:1 |
| EvolutionPlan | Mission | 1:N |
| EvolutionPlan | Resource | 1:N |
| AssessmentResult | Insight | 1:N |
| AssessmentResult | BehaviorIndex | 1:N |
| AssessmentResult | Report | 1:1 |

O relacionamento acima representa o domínio da plataforma.

A implementação física poderá variar conforme a tecnologia utilizada.

---

# 27. Official Enumerations

Para garantir consistência entre Frontend, Backend, API e Assessment Engine, a plataforma utilizará os seguintes tipos enumerados.

## Status

```typescript
enum Status {
  Draft,
  Review,
 Approved,
  Deprecated,
  Archived
}
```

Representa o ciclo de vida de qualquer entidade.

---

## Difficulty

```typescript
enum Difficulty {
  Easy,
  Medium,
  Hard
}
```

Utilizado em:

- Mission
- Evolution Plan
- Resource

---

## Priority

```typescript
enum Priority {
  Critical,
  High,
  Medium,
  Low
}
```

Utilizado principalmente pelos Insights.

---

## ResourceType

```typescript
enum ResourceType {
  Article,
  Video,
 Podcast,
  Book,
  Checklist,
  Template,
  Exercise,
  Reflection
}
```

Define a categoria de um Recurso.

---

## Language

```typescript
enum Language {
  ptBR,
  enUS,
  esES
}
```

Preparado para internacionalização.

---

## AssessmentStatus

```typescript
enum AssessmentStatus {
  Draft,
  Active,
  Deprecated,
  Archived
}
```

Representa o estado de uma Assessment.

---

## ConfidenceLevel

```typescript
enum ConfidenceLevel {
  VeryLow,
  Low,
  Medium,
  High,
  VeryHigh
}
```

Representa a confiabilidade da interpretação realizada pela Assessment Engine.

---

## ArchetypeType

```typescript
enum ArchetypeType {
  ExecutorUnderPressure,
  StrategicRefiner,
  AnalyticalExplorer,
  PriorityAccumulator
}
```

Representa os Arquétipos oficiais do MVP.

---

## DimensionType

```typescript
enum DimensionType {
  Initiative,
  Planning,
  PressureManagement,
  DistractionManagement,
  Consistency
}
```

Representa as Dimensões oficiais do MVP.

---

## VersionType

A plataforma utilizará Semantic Versioning.

Exemplo.

```
1.0.0
```

Onde.

Major

↓

Minor

↓

Patch
