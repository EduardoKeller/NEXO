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
