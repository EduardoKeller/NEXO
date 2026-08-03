# PRISMA MAPPING

**Projeto:** NEXO Platform
**Documento:** 07D_PRISMA_MAPPING.md
**Versão:** 1.0
**Status:** Draft (Sprint 0 Review)
**Última atualização:** 03/08/2026

---

# 1. Objetivo

Este documento define como o Modelo de Domínio será convertido para o Prisma ORM.

Ele funciona como uma camada intermediária entre.

07_DATA_MODEL.md

↓

07C_STORAGE_MODEL.md

↓

schema.prisma

Seu objetivo é evitar que decisões do ORM alterem o domínio da plataforma.

---

# 2. Arquitetura

A camada de persistência deverá seguir obrigatoriamente.

```text
Domain Model

↓

Storage Model

↓

Prisma Mapping

↓

schema.prisma

↓

PostgreSQL
```

Cada camada possui uma responsabilidade única.

---

# 3. Convenções

## Models

PascalCase

Exemplo.

Assessment

BehaviorIndex

EvolutionPlan

---

## Campos

camelCase

Exemplo.

createdAt

updatedAt

primaryIndicatorId

---

## Banco

snake_case

Exemplo.

assessment

behavior_index

created_at

---

## Chaves

UUID

---

## Datas

DateTime

UTC

---

# 4. Mapeamento Oficial

| Domain | Storage | Prisma Model |
|---------|----------|--------------|
| Assessment | assessment | Assessment |
| Question | question | Question |
| Alternative | alternative | Alternative |
| Answer | assessment_answer | AssessmentAnswer |
| Dimension | dimension | Dimension |
| Indicator | indicator | Indicator |
| BehaviorIndex | behavior_index | BehaviorIndex |
| BehaviorArchetype | archetype | Archetype |
| Insight | insight | Insight |
| EvolutionPlan | evolution_plan | EvolutionPlan |
| Mission | mission | Mission |
| Resource | resource | Resource |
| Report | report_template | ReportTemplate |
| AssessmentResult | assessment_result | AssessmentResult |

---

# 5. Relacionamentos

## Assessment

Possui muitas Questions.

```text
Assessment

↓

Question[]
```

---

## Question

Possui muitas Alternatives.

```text
Question

↓

Alternative[]
```

---

## Dimension

Possui muitos Indicators.

```text
Dimension

↓

Indicator[]
```

---

## Indicator

Possui muitos Insights.

```text
Indicator

↓

Insight[]
```

---

## AssessmentSession

Possui muitas Answers.

```text
AssessmentSession

↓

AssessmentAnswer[]
```

---

## AssessmentResult

Possui muitos BehaviorIndexes.

```text
AssessmentResult

↓

BehaviorIndex[]
```

---

## EvolutionPlan

Possui.

Mission[]

Resource[]

---

# 6. Constraints

Todos os IDs deverão utilizar UUID.

Slug deverá ser único.

Version deverá ser obrigatória.

Language deverá ser obrigatória.

Status deverá ser obrigatório.

Nenhuma Foreign Key poderá aceitar registros inexistentes.

---

# 7. Índices

Criar índices para.

Assessment.slug

Question.assessmentId

Indicator.dimensionId

Insight.indicatorId

BehaviorIndex.resultId

AssessmentAnswer.sessionId

AssessmentResult.sessionId

---

# 8. Convenções Prisma

Todos os Models deverão possuir.

```text
id

createdAt

updatedAt
```

Sempre.

---

Campos opcionais deverão utilizar.

```text
?
```

Relacionamentos deverão utilizar.

```text
@relation()
```

Enums deverão ser compartilhados.

---

# 9. Enum Mapping

## Status

Domain

↓

Status

↓

Prisma Enum

↓

PostgreSQL ENUM

---

## Difficulty

↓

Difficulty

↓

ENUM

---

## Priority

↓

Priority

↓

ENUM

---

## ResourceType

↓

ResourceType

↓

ENUM

---

# 10. Versionamento

Toda alteração incompatível deverá gerar nova Migration.

Nunca editar migrations antigas.

Sempre criar novas.

---

# 11. Fluxo de Geração

A criação do banco deverá seguir.

```text
07_DATA_MODEL

↓

07C_STORAGE_MODEL

↓

07D_PRISMA_MAPPING

↓

schema.prisma

↓

Migration

↓

Banco
```

Nunca gerar o schema diretamente do domínio.

---

# 12. Checklist

Antes de gerar o schema.

✓ Todos os Models existem.

✓ Todos os relacionamentos existem.

✓ Todas as Foreign Keys estão documentadas.

✓ Todos os índices estão definidos.

✓ Todos os Enums existem.

✓ Todos os nomes seguem convenção.

---

# 13. Critérios de Aceite

O Prisma Mapping será considerado concluído quando.

✓ O schema.prisma puder ser implementado apenas utilizando este documento.

✓ Nenhuma decisão de domínio depender do Prisma.

✓ O Storage Model permanecer independente.

✓ Todos os relacionamentos estiverem documentados.

---

# 14. Princípio Supremo

O Prisma é apenas uma ferramenta de persistência.

Ele nunca deverá influenciar o Modelo de Domínio.

A arquitetura da NEXO pertence ao domínio.

Não ao ORM.
