# STORAGE MODEL

**Projeto:** NEXO Platform
**Documento:** 07C_STORAGE_MODEL.md
**Versão:** 1.0
**Status:** Draft (Sprint 0 Review)
**Última atualização:** 03/08/2026

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

UUID

Foreign Key

UUID

---

## Datas

TIMESTAMP WITH TIME ZONE

Sempre UTC.

---

## Soft Delete

Não utilizar durante o MVP.

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

Representa uma execução da Avaliação.

Campos.

- id
- assessment_id
- started_at
- finished_at

---

## assessment_answer

- id
- session_id
- question_id
- alternative_id

---

## assessment_result

- id
- session_id
- archetype_id
- report_id
- generated_at

---

## behavior_index

- id
- result_id
- dimension_id
- raw_score
- normalized_score
- confidence

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
