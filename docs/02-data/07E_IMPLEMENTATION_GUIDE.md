# IMPLEMENTATION GUIDE

**Projeto:** NEXO Platform
**Documento:** 07E_IMPLEMENTATION_GUIDE.md
**Versão:** 1.0
**Status:** Approved
**Última atualização:** 03/08/2026

---

# 1. Objetivo

Este documento define a ordem oficial de implementação da plataforma NEXO.

Seu objetivo é garantir que qualquer desenvolvedor ou agente de IA implemente o sistema de forma consistente, incremental e alinhada à documentação oficial.

Nenhuma funcionalidade deverá ser implementada antes de suas dependências.

---

# 2. Princípios

Toda implementação deverá respeitar os seguintes princípios.

- Mobile First
- Componentização
- Clean Architecture
- Single Responsibility
- Domain Driven Design (DDD)
- TypeScript Strict Mode
- Testabilidade
- Reutilização
- Documentação como fonte da verdade

---

# 3. Ordem Oficial de Desenvolvimento

A implementação deverá seguir exatamente esta sequência.

## Fase 1 — Fundação

- Inicializar projeto Next.js
- Configurar TypeScript
- Configurar ESLint
- Configurar Prettier
- Configurar Tailwind CSS
- Configurar Husky + lint-staged
- Configurar estrutura de diretórios
- Configurar variáveis de ambiente
- Configurar testes (Vitest + Playwright)

**Critério de saída**

✓ Projeto inicia sem erros.

---

## Fase 2 — Design System

Implementar.

- Colors
- Typography
- Spacing
- Radius
- Shadows
- Animations
- Theme Provider

Depois criar componentes.

- Button
- Card
- Container
- Input
- Progress Bar
- Question Card
- Result Card
- Loading
- Modal
- Toast

**Critério de saída**

✓ Todos os componentes reutilizáveis.

---

## Fase 3 — Assessment

Implementar.

- Assessment Loader
- Question Flow
- Navigation
- Progress
- Validation
- Local State

Ainda não calcular resultados.

---

## Fase 4 — Assessment Engine

Implementar.

- Validation Engine
- Score Engine
- Behavior Engine
- Archetype Resolver
- Insight Engine
- Evolution Engine
- Result Builder

Nesta fase o sistema passa a produzir resultados.

---

## Fase 5 — Report Engine

Implementar.

- HTML Report
- PDF Generation
- Download

---

## Fase 6 — Content Library

Integrar.

- Questions
- Insights
- Archetypes
- Missions
- Resources

Todo conteúdo deverá vir da Knowledge Base.

---

## Fase 7 — Persistência

Implementar.

- Prisma
- PostgreSQL
- Migrations
- Seeds

---

## Fase 8 — API

Implementar.

- Assessment API
- Report API
- Health Check

Seguindo os contratos definidos em:

07B_API_CONTRACTS.md

---

## Fase 9 — Observabilidade

Adicionar.

- Logging
- Error Tracking
- Analytics
- Performance Metrics

---

## Fase 10 — Deploy

Realizar.

- Build
- Testes finais
- Deploy Vercel
- Lighthouse
- Produção

---

# 4. Dependências

Nenhum módulo poderá ser iniciado antes de suas dependências.

| Módulo | Depende de |
|---------|------------|
| Assessment Engine | Content Library |
| Insight Engine | Behavior Engine |
| Evolution Engine | Insight Engine |
| Report Engine | Evolution Engine |
| API | Assessment Engine |
| Frontend | Design System |

---

# 5. Estrutura Oficial de Pastas

```text
src/

app/

components/
  ui/
  assessment/
  result/
  layout/

features/
  assessment/
  insights/
  evolution/
  reports/

domain/
  assessment/
  behavior/
  insights/
  evolution/

engines/
  validation/
  scoring/
  behavior/
  archetype/
  insight/
  evolution/
  report/

lib/
  content/
  utils/
  constants/

services/

hooks/

types/

styles/

tests/
```

---

# 6. Convenções de Código

## Arquivos

PascalCase para componentes.

camelCase para funções.

snake_case apenas no banco.

---

## Componentes

Sempre pequenos.

Máximo recomendado.

200 linhas.

---

## Hooks

Um hook.

Uma responsabilidade.

---

## Engines

Cada Engine deverá possuir.

- Input
- Processamento
- Output

Nunca acessar interface.

---

# 7. Estratégia de Testes

## Unitários

Todos os Engines.

Objetivo.

Cobertura ≥90%.

---

## Integração

Assessment completa.

---

## E2E

Fluxo.

Landing

↓

Assessment

↓

Resultado

↓

Download PDF

---

# 8. Performance

Objetivos.

Primeira renderização

<2 segundos

Processamento

<300 ms

Lighthouse

Performance ≥95

Accessibility ≥95

SEO ≥95

Best Practices ≥95

---

# 9. Definition of Ready

Uma tarefa poderá iniciar quando.

✓ Possuir documentação.

✓ Possuir critérios de aceite.

✓ Possuir dependências concluídas.

✓ Não possuir dúvidas abertas.

---

# 10. Definition of Done

Uma funcionalidade será considerada concluída quando.

✓ Código implementado.

✓ Testes aprovados.

✓ Documentação atualizada.

✓ Revisão concluída.

✓ Build aprovado.

✓ Lighthouse aprovado.

✓ Deploy funcional.

---

# 11. Convenções para IA

Toda IA deverá.

✔ Consultar a documentação antes de implementar.

✔ Seguir a estrutura oficial.

✔ Reutilizar componentes.

✔ Não duplicar lógica.

✔ Não criar regras fora dos documentos oficiais.

Nunca.

✖ Alterar arquitetura.

✖ Alterar metodologia.

✖ Criar novas entidades.

✖ Ignorar contratos.

---

# 12. Fluxo Oficial

```text
Vision

↓

Methodology

↓

PRD

↓

Architecture

↓

Business Rules

↓

Content Library

↓

Assessment Engine

↓

Data Model

↓

API Contracts

↓

Storage Model

↓

Prisma Mapping

↓

Implementation Guide

↓

Código
```

Nenhuma etapa deverá ser ignorada.

---

# 13. Checklist Antes de Cada Commit

- O código segue a arquitetura?
- Existe duplicação?
- Os componentes são reutilizáveis?
- Os testes passaram?
- O lint passou?
- O build passou?
- A documentação continua válida?
- O comportamento está alinhado à metodologia?

---

# 14. Gestão de Branches

Estratégia oficial.

```text
main
│
├── develop
│
├── feature/*
│
├── fix/*
│
├── refactor/*
│
└── release/*
```

Fluxo.

Feature

↓

Pull Request

↓

Review

↓

Develop

↓

Release

↓

Main

---

# 15. Critérios de Aceite

Este guia será considerado concluído quando.

✓ Toda a ordem de implementação estiver documentada.

✓ Nenhuma etapa depender de conhecimento implícito.

✓ Um novo desenvolvedor conseguir iniciar o projeto apenas utilizando esta documentação.

✓ Um agente de IA conseguir implementar a plataforma sem criar arquitetura paralela.

---

# 16. Princípio Supremo

Toda implementação da NEXO deverá ser uma tradução fiel da documentação oficial.

O código nunca define o produto.

A documentação define o produto.

O código apenas o implementa.
