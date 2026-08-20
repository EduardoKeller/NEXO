# STORAGE MODEL

**Projeto:** NEXO Platform
**Documento:** 07C_STORAGE_MODEL.md
**Versão:** 1.2
**Status:** Approved
**Última atualização:** 17/08/2026

---

# 1. Objetivo

Este documento define o modelo oficial de persistência da plataforma NEXO.

Ele descreve como as entidades do domínio serão armazenadas em um banco de dados relacional.

Este documento não depende de ORM específico.

Posteriormente poderá ser implementado utilizando Prisma ORM.

---

# 2. Princípios

O modelo de persistência deverá ser.

- Normalizado;
- Escalável;
- Versionável;
- Independente da aplicação;
- Compatível com PostgreSQL.

---

# 3. Convenções

## Nome das tabelas

snake_case

Exemplo.

assessment

behavior_index

evolution_plan

---

## Colunas

snake_case

---

## Chaves

Primary Key

UUID — exclusivamente nas tabelas operacionais (`assessment_session`, `assessment_answer`, `assessment_result`, `behavior_index`), geradas em runtime a cada execução. Nas tabelas de conteúdo estático (Seção 4), o Primary Key é o identificador (slug) já definido em `core/content/*` (ex.: `"initiative"`, `"Q001"`, `"executor_under_pressure"`), fornecido explicitamente pelo seed — nunca gerado (13_DECISION_LOG.md, DEC-0019).

Foreign Key

Mesmo tipo da coluna referenciada — UUID quando aponta para uma tabela operacional; slug quando aponta para uma tabela de conteúdo estático (DEC-0019).

---

## Datas

TIMESTAMP WITH TIME ZONE

Sempre UTC.

---

## Soft Delete

Não utilizar durante o MVP.

---

## Tipos Estruturados (JSON/JSONB)

Uso restrito. Aprovado exclusivamente para os campos de snapshot calculado de `assessment_result`: `matched_indicators`, `strengths`, `attention_points`, `evolution_plan_habits` (13_DECISION_LOG.md, DEC-0014) e `insights`, `missions`, `resources` (13_DECISION_LOG.md, DEC-0020).

Nenhuma outra tabela deste documento deverá adotar JSON/JSONB sem uma decisão própria registrada no Decision Log.

---

# 4. Tabelas

## assessment

Representa uma Avaliação.

Campos.

- id
- slug
- name
- description
- version
- language
- status
- estimated_time
- created_at
- updated_at

---

## question

- id
- assessment_id
- dimension_id
- primary_indicator_id
- title
- description
- weight
- order
- created_at
- updated_at

---

## alternative

- id
- question_id
- label
- score
- created_at

---

## dimension

- id
- slug
- name
- description
- weight

---

## indicator

- id
- dimension_id
- slug
- name
- description
- weight

---

## insight

- id
- indicator_id
- priority
- title
- description
- recommendation

---

## archetype

- id
- slug
- name
- summary
- description

---

## mission

- id
- title
- goal
- difficulty
- estimated_time

---

## resource

- id
- type
- title
- description
- url

---

## evolution_plan

Tabela reservada, sem uso operacional nesta Sprint — sem seed, sem relação com `mission`/`resource` (13_DECISION_LOG.md, DEC-0021). O `EvolutionPlan` de cada execução continua sendo produzido dinamicamente pela Evolution Engine, sem leitura desta tabela. `evolution_plan_habits` (JSONB em `assessment_result`, DEC-0014) permanece o único traço persistido de um plano de evolução.

- id
- archetype_id
- first_step
- estimated_duration
- difficulty

---

## report_template

- id
- language
- version

---

# 5. Tabelas Operacionais

Durante o MVP existirão poucas tabelas operacionais.

---

## assessment_session

Representa uma execução da Avaliação, de forma anônima (13_DECISION_LOG.md, DEC-0013). Não representa uma sessão de autenticação; não possui nenhuma relação com usuário, conta ou login. `started_at` e `finished_at` recebem o mesmo timestamp em toda execução da Sprint 2, por decisão de persistência em lote (13_DECISION_LOG.md, DEC-0015) — não é um erro de preenchimento.

Campos.

- id
- assessment_id
- anonymous_id
- started_at
- finished_at
- created_at (13_DECISION_LOG.md, DEC-0016)
- updated_at (13_DECISION_LOG.md, DEC-0016)

---

## assessment_answer

- id
- session_id
- question_id
- alternative_id
- answered_at
- created_at (13_DECISION_LOG.md, DEC-0016)
- updated_at (13_DECISION_LOG.md, DEC-0016)

`answered_at` é idêntico entre todas as respostas de uma mesma sessão na Sprint 2, por decisão de persistência em lote (13_DECISION_LOG.md, DEC-0015) — não é um erro de preenchimento.

---

## assessment_result

Representa o resultado calculado para uma `assessment_session` — snapshot imutável da execução (13_DECISION_LOG.md, DEC-0014). `archetype_confidence`, `matched_indicators`, `strengths`, `attention_points`, `evolution_plan_habits`, `report_template`, `report_language`, `report_download_url`, `insights`, `missions` e `resources` são gravados uma única vez, no momento da geração, e nunca recalculados nem resolvidos novamente a partir da Content Library. Nenhum desses campos possui Foreign Key para `indicator`, `archetype`, `report_template`, `insight`, `mission`, `resource` ou qualquer outra tabela de conteúdo (13_DECISION_LOG.md, DEC-0018, DEC-0020). `generated_at` também representa `Report.generatedAt` — os dois valores são sempre idênticos, não existe coluna separada para o timestamp do Report.

Campos.

- id
- session_id (único — cardinalidade 1:1 com `assessment_session`)
- archetype_id
- archetype_confidence
- matched_indicators (JSONB — snapshot, sem Foreign Key)
- strengths (JSONB — snapshot, sem Foreign Key)
- attention_points (JSONB — snapshot, sem Foreign Key)
- evolution_plan_habits (JSONB — snapshot, sem Foreign Key)
- insights (JSONB — snapshot, sem Foreign Key — DEC-0020)
- missions (JSONB — snapshot, sem Foreign Key — DEC-0020)
- resources (JSONB — snapshot, sem Foreign Key — DEC-0020)
- report_template (escalar, snapshot, sem Foreign Key — DEC-0018; sempre "assessment-default-v1" nesta Sprint)
- report_language (escalar, snapshot, sem Foreign Key — DEC-0018)
- report_download_url (escalar, nullable, snapshot, sem Foreign Key — DEC-0018; sempre null nesta Sprint)
- generated_at
- created_at (13_DECISION_LOG.md, DEC-0016)
- updated_at (13_DECISION_LOG.md, DEC-0016)

---

## behavior_index

- id
- result_id
- dimension_id
- raw_score
- normalized_score
- confidence
- created_at (13_DECISION_LOG.md, DEC-0016)
- updated_at (13_DECISION_LOG.md, DEC-0016)

---

# 6. Relacionamentos

```text
assessment
     │
     ├──────── question
     │              │
     │              └────── alternative
     │
     └──────── dimension
                     │
                     └────── indicator
                               │
                               └────── insight

archetype
      │
      └──────── evolution_plan
                     │
                     ├──────── mission
                     └──────── resource

assessment_session
      │
      ├──────── assessment_answer
      │
      └──────── assessment_result
                     │
                     └──────── behavior_index
```

---

# 7. Índices

Criar índices para.

assessment.slug

question.assessment_id

indicator.dimension_id

behavior_index.result_id

assessment_answer.session_id

assessment_result.session_id

assessment_session.anonymous_id

---

# 8. Auditoria

Toda tabela deverá possuir.

created_at

updated_at

Versões futuras poderão adicionar.

created_by

updated_by

---

# 9. Performance

Objetivos.

Busca de Assessment

<50 ms

↓

Resultado

<100 ms

↓

Relatório

<500 ms

---

# 10. Migrações

Todas as alterações deverão ocorrer através de migrações versionadas.

Nunca alterar estrutura manualmente em produção.

---

# 11. Compatibilidade

O Storage Model deverá permanecer alinhado.

07_DATA_MODEL.md

07A_DOMAIN_DIAGRAMS.md

07B_API_CONTRACTS.md

---

# 12. Critérios de Aceite

O modelo será considerado aprovado quando.

✓ Todas as entidades do domínio estiverem representadas.

✓ Os relacionamentos forem consistentes.

✓ O modelo suportar futuras evoluções.

✓ O Prisma Schema puder ser gerado diretamente deste documento.

---

# 13. Princípio Supremo

O banco de dados existe para persistir o domínio.

Ele nunca deverá definir as regras de negócio da plataforma.

As regras pertencem à Metodologia, Business Rules e Assessment Engine.
