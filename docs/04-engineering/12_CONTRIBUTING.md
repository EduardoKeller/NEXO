# CONTRIBUTING

**Projeto:** NEXO Platform
**Documento:** 12_CONTRIBUTING.md
**Versão:** 1.0
**Status:** Approved
**Última atualização:** 03/08/2026

---

# 1. Objetivo

Este documento define as diretrizes oficiais para contribuição na plataforma NEXO.

Seu objetivo é garantir que toda contribuição preserve a qualidade, consistência e arquitetura do projeto.

As regras aqui definidas aplicam-se a:

- Desenvolvedores
- Arquitetos
- Designers
- QA
- Product Owners
- Agentes de Inteligência Artificial

---

# 2. Filosofia

Toda contribuição deve melhorar a plataforma.

Antes de adicionar algo novo, pergunte.

- O problema realmente existe?
- Existe solução já implementada?
- A mudança respeita a arquitetura?
- O benefício justifica o custo de manutenção?

A simplicidade deve ser priorizada.

---

# 3. Código de Conduta

Toda colaboração deverá ser baseada em.

- Respeito
- Transparência
- Colaboração
- Comunicação clara
- Feedback construtivo
- Responsabilidade

Discussões técnicas deverão ser fundamentadas em documentação e evidências.

---

# 4. Antes de Contribuir

Todo colaborador deverá.

✓ Ler a documentação oficial.

✓ Compreender a arquitetura.

✓ Consultar as Business Rules.

✓ Verificar decisões registradas no Decision Log.

✓ Confirmar que a funcionalidade ainda não existe.

---

# 5. Fluxo de Contribuição

```text
Ideia

↓

Definition of Ready

↓

Planejamento

↓

Implementação

↓

Testes

↓

Documentação

↓

Pull Request

↓

Review

↓

Merge
```

Nenhuma etapa deverá ser ignorada.

---

# 6. Estrutura do Projeto

Toda contribuição deverá respeitar a estrutura oficial.

```text
docs/

src/

tests/

public/

prisma/
```

Novas pastas deverão ser justificadas e aprovadas.

---

# 7. Padrões de Código

Toda implementação deverá seguir.

- TypeScript Strict
- Clean Architecture
- SOLID
- DDD
- Design System
- API Contracts

Nunca.

✖ Duplicar lógica.

✖ Misturar interface e regra de negócio.

✖ Ignorar tipagem.

---

# 8. Padrões de Documentação

Sempre que uma mudança alterar comportamento oficial.

Atualizar.

- PRD
- Business Rules
- Data Model
- API Contracts
- Changelog
- Release Notes (quando aplicável)

Código e documentação deverão permanecer sincronizados.

---

# 9. Convenção de Branches

```text
main

develop

feature/*

fix/*

refactor/*

docs/*

release/*
```

Exemplos.

feature/assessment-engine

fix/report-generation

docs/business-rules

---

# 10. Convenção de Commits

Utilizar o padrão Conventional Commits.

Exemplos.

```text
feat: add assessment engine

fix: correct archetype calculation

docs: update business rules

refactor: simplify score engine

test: add assessment engine tests

chore: update dependencies
```

---

# 11. Pull Requests

Todo Pull Request deverá conter.

- Objetivo
- Motivação
- Arquivos alterados
- Documentação impactada
- Testes executados
- Critérios de aceite

---

# 12. Processo de Review

Toda revisão deverá verificar.

## Produto

- Requisito atendido.

## Arquitetura

- Estrutura respeitada.

## Código

- Legibilidade.
- Simplicidade.
- Reutilização.

## Testes

- Cobertura.
- Casos de erro.

## Documentação

- Atualizada.

---

# 13. Contribuições com IA

Contribuições geradas por IA deverão.

- seguir o AI Development Charter;
- utilizar os Context Packs corretos;
- respeitar os Workflows;
- informar quais documentos foram utilizados como contexto.

Toda saída gerada por IA deverá ser revisada antes do merge.

---

# 14. Resolução de Conflitos

Em caso de conflito.

Prevalece.

1. Vision
2. Methodology
3. PRD
4. Architecture
5. Business Rules
6. Decision Log
7. Código

O código nunca prevalece sobre a documentação oficial.

---

# 15. Critérios para Aprovação

Uma contribuição será aprovada quando.

✓ Atender ao Definition of Ready.

✓ Atender ao Definition of Done.

✓ Passar nos testes.

✓ Atualizar a documentação necessária.

✓ Ser aprovada na revisão.

---

# 16. Boas Práticas

Sempre.

- Preferir componentes reutilizáveis.
- Manter funções pequenas.
- Escrever nomes claros.
- Evitar otimizações prematuras.
- Explicar decisões complexas.

Nunca.

- Criar código sem documentação.
- Ignorar testes.
- Alterar contratos sem aprovação.
- Introduzir dependências desnecessárias.

---

# 17. Onboarding

Todo novo colaborador deverá seguir esta sequência.

1. Vision
2. Methodology
3. PRD
4. Architecture
5. Business Rules
6. Assessment Engine
7. Data Model
8. AI Charter
9. Definition of Ready
10. Definition of Done
11. Contributing

Somente após concluir essa leitura poderá iniciar implementações.

---

# 18. Critérios de Aceite

Este documento será considerado aprovado quando.

✓ O processo de contribuição estiver completamente documentado.

✓ As responsabilidades forem claras.

✓ O fluxo de revisão estiver definido.

✓ Desenvolvedores e agentes de IA conseguirem contribuir seguindo apenas esta documentação.

---

# 19. Princípio Supremo

Toda contribuição deverá tornar a NEXO mais consistente do que estava antes.

O objetivo não é apenas adicionar funcionalidades.

É preservar a qualidade, a arquitetura e a visão do produto durante toda a sua evolução.
