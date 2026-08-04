# API CONTRACTS

**Projeto:** NEXO Platform
**Documento:** 07B_API_CONTRACTS.md
**Versão:** 1.1
**Status:** Draft (Sprint 0 Review)
**Última atualização:** 04/08/2026

---

# 1. Objetivo

Este documento define os contratos oficiais de comunicação da plataforma NEXO.

Os contratos representam a estrutura dos dados trocados entre:

- Frontend
- Backend
- Assessment Engine
- Report Engine
- APIs futuras

Este documento não define tecnologia.

Define apenas o formato dos objetos.

---

# 2. Princípios

Todos os contratos deverão ser:

- determinísticos;
- versionáveis;
- independentes de framework;
- independentes de banco de dados;
- compatíveis com JSON.

---

# 3. Convenções

## Idioma

Código:

Inglês.

Interface:

Português.

---

## Datas

Formato ISO 8601.

Exemplo.

2026-08-03T12:00:00Z

---

## Identificadores

UUID v4.

---

## Versionamento

Semantic Versioning.

---

# 4. Assessment Request

```typescript
interface AssessmentRequest {

assessmentId: string

version: string

answers: AnswerRequest[]

}
```

---

# Answer Request

```typescript
interface AnswerRequest {

questionId: string

alternativeId: string

}
```

---

# 5. Assessment Response

```typescript
interface AssessmentResponse {

success: boolean

data: AssessmentResult

meta: ResponseMetadata

}
```

---

# 6. Response Metadata

```typescript
interface ResponseMetadata {

requestId: string

version: string

processingTime: number

generatedAt: string

}
```

---

# 7. Assessment Result

```typescript
interface AssessmentResult {

assessmentId: string

behaviorIndexes: BehaviorIndex[]

behaviorArchetype: BehaviorArchetype

insights: Insight[]

strengths: string[]

attentionPoints: string[]

evolutionPlan: EvolutionPlan

missions: Mission[]

resources: Resource[]

report: Report

}
```

---

# 8. Behavior Index

```typescript
interface BehaviorIndex {

dimensionId: string

score: number

normalizedScore: number

confidence: number

}
```

---

# 9. Behavior Archetype

```typescript
interface BehaviorArchetype {

id: string

name: string

summary: string

confidence: number

}
```

`confidence` utiliza a faixa oficial 0–100, conforme 07_DATA_MODEL.md, Seção 12.

---

# 10. Insight

```typescript
interface Insight {

id: string

title: string

description: string

recommendation: string

priority: Priority

}
```

---

# 11. Evolution Plan

```typescript
interface EvolutionPlan {

firstStep: string

habits: string[]

missions: string[]

resources: string[]

estimatedDuration: number

difficulty: Difficulty

}
```

---

# 12. Mission

```typescript
interface Mission {

id: string

title: string

goal: string

difficulty: Difficulty

estimatedTime: number

steps: string[]

expectedOutcome: string

}
```

---

# 13. Resource

```typescript
interface Resource {

id: string

type: ResourceType

title: string

description: string

url?: string

}
```

---

# 14. Report

```typescript
interface Report {

id: string

downloadUrl?: string

generatedAt: string

}
```

---

# 15. Engine Contracts

Assessment Engine

↓

AssessmentResult

↓

Report Engine

↓

Report

↓

Frontend

Todos os módulos deverão utilizar exatamente os mesmos contratos.

---

# 16. Error Response

```typescript
interface ErrorResponse {

success: false

error: {

code: string

message: string

details?: string

}

meta: ResponseMetadata

}
```

---

# 17. Error Codes

VALIDATION_ERROR

INVALID_ASSESSMENT

INVALID_ANSWER

ENGINE_ERROR

REPORT_ERROR

SYSTEM_ERROR

UNKNOWN_ERROR

---

# 18. Versionamento

Toda alteração incompatível deverá gerar uma nova versão do contrato.

Nunca alterar contratos já publicados.

---

# 19. Compatibilidade

O Frontend nunca deverá depender de propriedades não documentadas.

A Assessment Engine nunca deverá retornar campos não definidos neste documento.

---

# 20. Critérios de Aceite

Os contratos serão considerados aprovados quando.

✓ Todos os módulos utilizarem os mesmos objetos.

✓ O Frontend puder consumir qualquer resposta sem transformação.

✓ A documentação permanecer alinhada ao Data Model.

✓ A Assessment Engine respeitar integralmente estes contratos.

---

# 21. Princípio Supremo

Os contratos representam o acordo oficial entre todos os componentes da plataforma.

Nenhum módulo poderá trocar informações utilizando estruturas diferentes das definidas neste documento.
