# DOMAIN DIAGRAMS

**Projeto:** NEXO Platform  
**Documento:** 07A_DOMAIN_DIAGRAMS.md  
**Versão:** 1.0  
**Status:** Draft (Sprint 0 Review)  
**Última atualização:** 03/08/2026

---

# 1. Objetivo

Este documento reúne todos os diagramas oficiais do domínio da plataforma NEXO.

Seu objetivo é representar visualmente a arquitetura conceitual do sistema.

Todos os diagramas presentes neste documento deverão permanecer alinhados aos seguintes documentos.

- 00A_METHODOLOGY.md
- 01_PRD.md
- 02_ARCHITECTURE.md
- 04_BUSINESS_RULES.md
- 06_ASSESSMENT_ENGINE.md
- 07_DATA_MODEL.md

Em caso de conflito, os documentos de origem prevalecem.

---

# 2. NEXO Journey

Representa a jornada oficial do usuário.

```text
Landing
    │
    ▼
Avaliação
    │
    ▼
Análise
    │
    ▼
Índices Comportamentais
    │
    ▼
Arquétipo
    │
    ▼
Insights
    │
    ▼
Plano de Evolução
    │
    ▼
Missão Inicial
    │
    ▼
Recursos
    │
    ▼
Relatório
```

---

# 3. Assessment Pipeline

Representa o fluxo interno da Assessment Engine.

```text
Assessment
      │
      ▼
Validation Engine
      │
      ▼
Score Engine
      │
      ▼
Behavior Engine
      │
      ▼
Behavior Indexes
      │
      ▼
Archetype Resolver
      │
      ▼
Insight Engine
      │
      ▼
Evolution Engine
      │
      ▼
Report Engine
      │
      ▼
Result Builder
      │
      ▼
Assessment Result
```

---

# 4. Knowledge Flow

Representa como o conhecimento percorre a plataforma.

```text
Content Library
        │
        ▼
Assessment Library
        │
        ▼
Question Library
        │
        ▼
Assessment Engine
        │
        ▼
Behavior Analysis
        │
        ▼
Insight Library
        │
        ▼
Evolution Library
        │
        ▼
Mission Library
        │
        ▼
Report Library
```

---

# 5. Domain Model

Representa os principais objetos do domínio.

```text
Assessment
      │
      ▼
Question
      │
      ▼
Alternative
      │
      ▼
Answer
      │
      ▼
Indicator
      │
      ▼
Dimension
      │
      ▼
Behavior Index
      │
      ▼
Behavior Archetype
      │
      ▼
Insight
      │
      ▼
Evolution Plan
      │
      ├───────────────┐
      ▼               ▼
Mission          Resource
      │               │
      └───────┬───────┘
              ▼
           Report
              │
              ▼
     Assessment Result
```

---

# 6. Entity Relationship Diagram

```text
Assessment
    │ 1
    │
    ├─────────────── N Question
    │                    │
    │                    ├────────── N Alternative
    │                    │
    │                    └────────── 1 Indicator
    │
    └─────────────── N Dimension
                         │
                         └────────── N Indicator

Indicator
      │
      ▼
Behavior Index
      │
      ▼
Behavior Archetype
      │
      ▼
Insight
      │
      ▼
Evolution Plan
      │
      ├────────── N Mission
      │
      └────────── N Resource

Assessment Result
      │
      ├────────── Behavior Archetype
      ├────────── Behavior Indexes
      ├────────── Insights
      ├────────── Evolution Plan
      └────────── Report
```

---

# 7. Assessment Lifecycle

```text
Draft
   │
   ▼
Review
   │
   ▼
Approved
   │
   ▼
Published
   │
   ▼
Deprecated
   │
   ▼
Archived
```

---

# 8. Content Lifecycle

```text
Create
   │
   ▼
Review
   │
   ▼
Approve
   │
   ▼
Version
   │
   ▼
Publish
   │
   ▼
Maintain
```

---

# 9. Result Composition

O resultado oficial da plataforma é composto pelos seguintes elementos.

```text
Assessment Result

├── Assessment

├── Behavior Indexes

├── Behavior Archetype

├── Insights

├── Strengths

├── Attention Points

├── Evolution Plan

├── Missions

├── Resources

└── Report
```

---

# 10. Architecture Overview

```text
                USER

                  │

                  ▼

             Frontend

                  │

                  ▼

        Assessment Engine

                  │

                  ▼

          Content Library

                  │

                  ▼

            Data Model

                  │

                  ▼

             Report Engine

                  │

                  ▼

              PDF / UI
```

---

# 11. Evolução Futura

A arquitetura deverá suportar a inclusão de novos módulos sem alterar os fluxos existentes.

Exemplos.

```text
Assessment
        │
        ▼
AI Coach

Assessment
        │
        ▼
History

Assessment
        │
        ▼
Dashboard

Assessment
        │
        ▼
Community
```

---

# 12. Critérios de Aceite

Os diagramas serão considerados válidos quando.

✓ Representarem corretamente o domínio.

✓ Estiverem alinhados ao Data Model.

✓ Estiverem alinhados à Assessment Engine.

✓ Refletirem a metodologia oficial da NEXO.

✓ Servirem como referência visual para toda a equipe.

---

# 13. Princípio Supremo

Todo diagrama deste documento possui caráter explicativo.

A documentação textual continua sendo a fonte oficial das regras de negócio.

Os diagramas existem para facilitar compreensão, comunicação e implementação da plataforma.
