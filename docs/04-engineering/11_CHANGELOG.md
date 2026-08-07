# CHANGELOG

**Projeto:** NEXO Platform
**Documento:** 11_CHANGELOG.md
**Versão:** 1.0
**Status:** Approved
**Última atualização:** 03/08/2026

---

# 1. Objetivo

Este documento registra oficialmente todas as mudanças realizadas na plataforma NEXO.

Seu objetivo é fornecer um histórico confiável da evolução do produto, permitindo rastrear funcionalidades, correções, melhorias, alterações arquiteturais e mudanças na documentação.

Nenhuma alteração relevante deverá ocorrer sem registro neste documento.

---

# 2. Princípios

Toda alteração deverá ser:

- documentada;
- versionada;
- rastreável;
- datada;
- relacionada à documentação oficial.

O Changelog representa o histórico oficial do projeto.

---

# 3. Convenção

A NEXO utiliza Semantic Versioning.

```
MAJOR.MINOR.PATCH
```

Onde.

MAJOR

Mudanças incompatíveis.

↓

MINOR

Novas funcionalidades compatíveis.

↓

PATCH

Correções e melhorias sem alteração de comportamento.

---

# 4. Categorias

Toda alteração deverá pertencer a uma das categorias.

### Added

Novas funcionalidades.

---

### Changed

Mudanças em funcionalidades existentes.

---

### Fixed

Correções de bugs.

---

### Deprecated

Funcionalidades que serão removidas futuramente.

---

### Removed

Funcionalidades removidas.

---

### Security

Correções relacionadas à segurança.

---

### Documentation

Mudanças apenas na documentação.

---

### Performance

Melhorias de desempenho.

---

### Refactor

Melhorias internas sem alteração funcional.

---

# 5. Estrutura Oficial

Cada versão deverá seguir o modelo.

```markdown
## [Versão] - Data

### Added

-

### Changed

-

### Fixed

-

### Documentation

-

### Performance

-

### Security

-
```

---

# 6. Histórico

## [0.1.6] - 07/08/2026

### Added

- Sprint 1, PR 3: concluída a Fase de Design System de `07E_IMPLEMENTATION_GUIDE.md` — Tailwind CSS v4 (config CSS-first via `@theme inline`, sem `tailwind.config.js`) e shadcn/ui (style `base-nova`, `baseColor: "neutral"`) instalados e configurados via `components.json`, com aliases apontando para `src/shared/ui`, `src/shared/lib` e `src/shared/hooks`, conforme DEC-0004/DEC-0005.
- Theme Provider (`src/providers/theme-provider.tsx`), wrapper sobre `next-themes`, plugado em `src/app/layout.tsx` (`attribute="class"`, `defaultTheme="dark"`, `enableSystem={false}`, `suppressHydrationWarning`).
- Tokens de cor do tema escuro em `src/styles/globals.css` fiéis a `00D_BRAND_GUIDELINES.md` §15 (Paleta Oficial). Tema claro mantido com a paleta padrão gerada pelo shadcn/ui, explicitamente marcada como provisória/não documentada, a reavaliar quando o tema claro for priorizado no produto.
- Tipografia oficial (`Manrope` como fonte principal, `Inter` como secundária) aplicada via `next/font/google` em `src/app/layout.tsx`, conforme `00D_BRAND_GUIDELINES.md` §16.
- 11 componentes base do shadcn/ui instalados em `src/shared/ui/`: `badge`, `button`, `card`, `dialog`, `input`, `label`, `progress`, `select`, `separator`, `sonner`, `textarea` — cobrindo `Button`, `Card`, `Input`, `Progress Bar`, `Modal` e `Toast` da lista oficial de componentes de `07E_IMPLEMENTATION_GUIDE.md`, Fase 2.
- 4 componentes próprios, compostos sobre os primitivos do shadcn/ui, completando a lista oficial de `07E_IMPLEMENTATION_GUIDE.md`, Fase 2: `Container` (`src/shared/ui/container.tsx`, wrapper responsivo centralizado), `Loading` (`src/shared/ui/loading.tsx`, spinner indeterminado com `Loader2Icon` — nunca barra de progresso falsa, conforme `03_DESIGN_SYSTEM.md` §21.3), `QuestionCard` e `ResultCard` (`src/shared/ui/question-card.tsx`, `src/shared/ui/result-card.tsx`, composições sobre `Card` — puramente apresentacionais, sem lógica de negócio ou dados de Assessment, que só existirão a partir da Fase 3/4).
- `Toaster` (`src/shared/ui/sonner.tsx`) plugado em `src/app/layout.tsx`, dentro do `ThemeProvider`, para refletir o tema ativo nas notificações.
- `src/shared/lib/utils.ts`: utilitário `cn()` (`clsx` + `tailwind-merge`), padrão gerado pelo shadcn/ui.

### Changed

- `next.config.ts`: `agentRules: false`, desativando a geração/gestão automática de `AGENTS.md` pelo Next.js 16 para preservar o `AGENTS.md` próprio do projeto.
- `12C_TECH_STACK.md` atualizado (Seções 4 e 13) para refletir as dependências efetivamente instaladas pelo ecossistema oficial do shadcn/ui (`next-themes`, `@base-ui/react`, `tailwind-merge`, `tw-animate-css`, `sonner`) — atualização de inventário, sem decisão arquitetural associada.

### Documentation

- `12C_TECH_STACK.md` atualizado (versão 1.2).

---

## [0.1.5] - 06/08/2026

### Added

- Sprint 1, PR 2: concluída a Fase 1 (Fundação) de 07E_IMPLEMENTATION_GUIDE.md — Husky + lint-staged (pre-commit executa `eslint --fix` + `prettier --write` nos arquivos staged), `.env.example` (sem variáveis ainda; Sprint 1 não depende de nenhuma), Vitest configurado (`vitest.config.mts`, ambiente jsdom, cobertura via `@vitest/coverage-v8`, aliases `@/*` resolvidos nativamente pelo Vite) e Playwright configurado (`playwright.config.ts`, `tests/e2e/`, projeto Chromium, `webServer` apontando para `npm run dev`).
- `src/smoke.test.ts`: smoke test mínimo validando a infraestrutura do Vitest (execução de asserções e disponibilidade do ambiente jsdom). Não testa nenhuma regra de negócio, Feature ou Engine — nenhuma existe ainda. Mantém `npm test` verde sem alterar o comportamento padrão do Vitest (`--passWithNoTests` não foi usado).
- Scripts adicionados a `package.json`: `test`, `test:watch`, `test:coverage`, `test:e2e`.

### Changed

- `.gitignore` atualizado com artefatos do Playwright (`playwright-report/`, `test-results/`, `blob-report/`).

---

## [0.1.4] - 05/08/2026

### Added

- Sprint 1, PR 1: fundação do projeto Next.js criada (`create-next-app`, App Router, TypeScript strict, ESLint, Prettier, aliases `@/*`, estrutura oficial `app/ features/ core/ shared/ infrastructure/ styles/ middleware/`). Nenhuma Feature, componente, hook, Engine, regra de negócio ou persistência foi implementada nesta entrega.
- DEC-0006 em 13_DECISION_LOG.md, documentando a adoção de Next.js 16.3.0 (React 19.2.8) como versão estável mais recente, em substituição a "Next.js 15".

### Changed

- 12C_TECH_STACK.md atualizado: Framework passa de "Next.js" (implicitamente 15) para "Next.js 16", com referência a DEC-0006.

### Documentation

- 13_DECISION_LOG.md atualizado com DEC-0006.
- 12C_TECH_STACK.md atualizado (Seções 3 e 4).
- 07E_IMPLEMENTATION_GUIDE.md e 09A_IMPLEMENTATION_GUIDELINES.md: adicionada nota técnica esclarecendo que `middleware/` guarda módulos auxiliares e que o entrypoint reconhecido pelo Next.js é `src/middleware.ts` na raiz, nunca dentro da subpasta — a pasta sozinha não é executada pelo framework.

---

## [0.1.3] - 05/08/2026

### Changed

- Renomeado o diretório oficial do Domain Kernel de `kernel/` para `core/` em toda a documentação viva do projeto, mantendo integralmente as responsabilidades de camada, o padrão de Dependency Inversion e os fluxos de Dependências/Execução definidos em DEC-0004.

### Added

- DEC-0005 em 13_DECISION_LOG.md, documentando a renomeação, a reavaliação da alternativa `core/` (originalmente rejeitada em DEC-0004) e a justificativa de alinhamento com a nomenclatura usual de Clean Architecture/DDD/Onion Architecture.

### Documentation

- 02_ARCHITECTURE.md atualizado (todas as referências a `kernel/`).
- 07E_IMPLEMENTATION_GUIDE.md atualizado (Seção 5 e escopo por Sprint).
- 08_AI_DEVELOPMENT_CHARTER.md atualizado (Seção 6).
- 09A_IMPLEMENTATION_GUIDELINES.md atualizado (Estrutura do Projeto, seção Kernel → Core, Imports).
- 09B_CODE_STYLE.md atualizado (Imports, Barrel Files).
- 12A_DEVELOPMENT_STANDARDS.md atualizado (Seção 3).
- 13_DECISION_LOG.md atualizado: DEC-0004 marcado como parcialmente superseded (nomenclatura) com Nota de Superseding; DEC-0005 adicionado. Nenhum texto histórico de DEC-0004 foi alterado.

---

## [0.1.2] - 05/08/2026

### Changed

- Consolidada a arquitetura oficial da aplicação em uma única estrutura de pastas (`app/ features/ kernel/ shared/ infrastructure/ providers/ config/ styles/ middleware/`), eliminando três variações divergentes que existiam entre `09A_IMPLEMENTATION_GUIDELINES.md`, `07E_IMPLEMENTATION_GUIDE.md`/`12A_DEVELOPMENT_STANDARDS.md` e `08_AI_DEVELOPMENT_CHARTER.md`.
- Engines reposicionadas conceitualmente da Application Layer para a Domain Layer em `02_ARCHITECTURE.md` (Seções 5 e 6), alinhando o documento a `12B_ARCHITECTURE_PATTERNS.md`, que já as descrevia corretamente.
- Definido o fluxo técnico oficial da Sprint 1: React Component → Server Action → Feature Service → Kernel → Infrastructure → Database, com Route Handlers reservados para APIs públicas e Webhooks a partir da Sprint 3.
- Repositories deixam de pertencer à Feature e passam a viver em `infrastructure/repositories/`, implementando contratos definidos em `kernel/contracts/` (Dependency Inversion).

### Added

- DEC-0004 em 13_DECISION_LOG.md, documentando a arquitetura híbrida Feature-First + Domain Kernel, as alternativas consideradas e o fluxo oficial de dependências.

### Documentation

- 02_ARCHITECTURE.md atualizado (Seções 3, 5, 6, 7, 13).
- 07E_IMPLEMENTATION_GUIDE.md atualizado (Seção 5).
- 09A_IMPLEMENTATION_GUIDELINES.md atualizado (Estrutura do Projeto, Organização das Features, Shared, Repositories, API, Imports; novas seções Kernel e Infrastructure).
- 09B_CODE_STYLE.md atualizado (Imports, Barrel Files, Repositories).
- 12A_DEVELOPMENT_STANDARDS.md atualizado (Seção 3).
- 08_AI_DEVELOPMENT_CHARTER.md atualizado (Seção 6).
- 13_DECISION_LOG.md atualizado com DEC-0004.

---

## [0.1.1] - 04/08/2026

### Added

- Algoritmo oficial de classificação de Arquétipos (Distância Euclidiana Ponderada).
- Fórmula oficial de cálculo do Confidence Score.
- Campo `reference_profile` na Archetype Library (Content Library), com calibração inicial v1.0.
- DEC-0003 em 13_DECISION_LOG.md, documentando a decisão do algoritmo e as alternativas consideradas.

### Fixed

- Removida contradição entre os critérios de desempate de Arquétipos definidos em Business Rules e Assessment Engine — unificados em uma única regra canônica (04_BUSINESS_RULES.md, Seção 16).
- Removida ambiguidade em Business Rules Seção 9 sobre pontuação sendo atribuída diretamente a um "perfil" em vez de Indicador/Dimensão.
- Removido campo `profile_mapping` não utilizado do schema de Alternative (Content Library), inconsistente com o pipeline oficial baseado em Índices.

### Documentation

- 04_BUSINESS_RULES.md atualizado (Seções 9, 11, 16).
- 06_ASSESSMENT_ENGINE.md atualizado (Seções 9, 14).
- 05_CONTENT_LIBRARY.md atualizado (Archetype Library, Question Library).
- 07_DATA_MODEL.md atualizado (BehaviorArchetype).
- 07B_API_CONTRACTS.md atualizado (Behavior Archetype).
- 00A_METHODOLOGY.md atualizado (Seção 10).
- 13_DECISION_LOG.md atualizado com DEC-0003.
- 04-engineering/README atualizado (inclusão de 13_DECISION_LOG.md na ordem de leitura).

---

## [0.1.0] - 03/08/2026

### Added

- Estrutura inicial do projeto.
- Documentação da Sprint 0.
- Vision.
- Methodology.
- Product Requirements.
- Architecture.
- Design System.
- Business Rules.
- Content Library.
- Assessment Engine.
- Data Model.
- AI Development Charter.
- AI Prompts.
- AI Personas.
- AI Workflows.
- AI Playbook.
- AI Context Packs.
- Definition of Done.
- Definition of Ready.
- Roadmap.

### Documentation

- Organização inicial da documentação.
- Estrutura oficial dos documentos.
- Padronização das convenções.

---

# 7. Processo de Atualização

Sempre que ocorrer.

- nova funcionalidade;
- correção;
- alteração arquitetural;
- mudança metodológica;
- atualização relevante da documentação.

O Changelog deverá ser atualizado.

---

# 8. Integração com Releases

Toda Release deverá possuir.

- versão;
- data;
- resumo;
- link para documentação relacionada;
- impacto esperado.

---

# 9. Integração com o Roadmap

Cada versão deverá estar vinculada ao Roadmap.

Exemplo.

| Versão | Sprint | Objetivo |
|---------|--------|----------|
| 0.1.0 | Sprint 0 | Fundação |
| 0.2.0 | Sprint 1 | MVP |
| 0.3.0 | Sprint 2 | Persistência |
| 0.4.0 | Sprint 3 | APIs |
| 0.5.0 | Sprint 4 | Dashboard |
| 0.6.0 | Sprint 5 | IA |
| 1.0.0 | Release Oficial | Plataforma Estável |

---

# 10. Boas Práticas

Sempre.

✓ Descrever mudanças de forma objetiva.

✓ Registrar impacto.

✓ Referenciar documentação quando necessário.

✓ Agrupar alterações por versão.

Nunca.

✖ Misturar versões.

✖ Omitir alterações importantes.

✖ Alterar histórico já publicado.

---

# 11. Critérios de Aceite

Este documento será considerado válido quando.

✓ Todas as versões estiverem registradas.

✓ Toda alteração relevante possuir histórico.

✓ O versionamento seguir Semantic Versioning.

✓ O histórico permanecer cronológico e auditável.

---

# 12. Princípio Supremo

O Changelog representa a memória oficial da evolução da plataforma NEXO.

Toda mudança relevante deverá ser registrada antes de ser considerada oficialmente entregue.
