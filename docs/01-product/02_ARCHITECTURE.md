# SYSTEM ARCHITECTURE

**Projeto:** NEXO Platform  
**Documento:** 02_ARCHITECTURE.md  
**Versão:** 2.1  
**Status:** Draft (Sprint 0 Review)  
**Última atualização:** 05/08/2026

---

# 1. Objetivo

Este documento define a arquitetura oficial da plataforma NEXO.

Seu objetivo é garantir que toda implementação siga uma estrutura consistente, escalável e independente de tecnologia específica.

Toda decisão arquitetural deverá respeitar este documento.

---

# 2. Filosofia

A arquitetura da NEXO foi projetada seguindo cinco princípios fundamentais.

## 1. Mobile First

Toda experiência será projetada inicialmente para smartphones.

Desktop representa apenas uma adaptação.

---

## 2. Content Driven

A lógica da plataforma deverá consumir conteúdos oficiais da Content Library.

Nenhum texto deverá ser criado diretamente na interface.

---

## 3. Engine Based

Toda regra de negócio deverá existir dentro das Engines.

A interface nunca deverá executar regras complexas.

---

## 4. Modularidade

Cada módulo deverá possuir uma única responsabilidade.

Nenhum módulo poderá assumir responsabilidades de outro.

---

## 5. Evolução Contínua

Toda arquitetura deverá permitir expansão futura sem reescrita estrutural.

---

# 3. Visão Geral

A NEXO é composta por cinco camadas principais.

Presentation Layer

↓

Application Layer

↓

Domain Layer

↓

Content Layer

↓

Infrastructure Layer

Cada camada possui responsabilidades específicas.

O mapeamento físico destas camadas para a estrutura de pastas de `src/` está definido em 07E_IMPLEMENTATION_GUIDE.md, Seção 5, e formalizado em 13_DECISION_LOG.md (DEC-0004).

---

# 4. Presentation Layer

Responsável pela interação com o usuário.

Componentes:

- Landing Page
- Assessment
- Resultado
- Plano de Evolução
- Relatório
- Componentes Visuais

Esta camada nunca deverá realizar cálculos.

---

# 5. Application Layer

Responsável pela orquestração da plataforma.

Fisicamente representada pela pasta `features/`.

Contém.

- Casos de uso (Feature Services).
- Server Actions.
- Orquestração das chamadas ao Domain Layer.
- Coordenação entre módulos.
- Estado e componentes específicos de cada funcionalidade.

A Application Layer nunca implementa regras de domínio.

Ela apenas invoca as Engines na ordem correta e adapta o resultado para a Presentation Layer.

---

# 6. Domain Layer

Representa as regras centrais da plataforma.

Fisicamente representada pela pasta `kernel/`.

Contém:

- Business Rules
- Data Model
- Algoritmos
- Critérios de Pontuação
- Regras de Evolução
- **NEXO Core** — os módulos que executam a Assessment: Assessment Engine, Validation Engine, Score Engine, Behavior Engine, Insight Engine, Evolution Engine, Report Engine, Result Builder.

Cada Engine possui responsabilidade única.

As Engines pertencem ao Domain Layer, não à Application Layer: são consumidas por múltiplas Features (assessment, insights, evolution, reports) e por isso nunca podem pertencer a uma Feature específica (ver 13_DECISION_LOG.md, DEC-0004).

O Domain Layer nunca depende de React, Next.js, Tailwind ou de qualquer Feature.

Nenhum componente visual poderá depender diretamente desta camada.

---

# 7. Content Layer

Representa o conhecimento oficial da plataforma.

Fisicamente representada pela pasta `kernel/content/`.

Contém:

- Perguntas
- Dimensões
- Indicadores
- Perfis
- Recomendações
- Exercícios
- Missões
- Relatórios
- Landing Content

Toda comunicação deverá ser originada desta camada.

---

# 8. Infrastructure Layer

Responsável por serviços externos.

Inclui:

- Vercel
- Geração de PDF
- Analytics
- Armazenamento
- APIs futuras

Esta camada nunca deverá conter regras de negócio.

---

# 9. NEXO Journey

Toda experiência da plataforma seguirá a jornada oficial.

Landing

↓

Assessment

↓

Behavior Analysis

↓

Insights

↓

Behavior Archetype

↓

Evolution Plan

↓

Personalized Report

↓

Mission

↓

Next Step

Cada etapa deverá entregar valor ao usuário.

---

# 10. Fluxo da Assessment

1. Usuário inicia a avaliação.

↓

2. Assessment Engine recebe as respostas.

↓

3. Validation Engine valida os dados.

↓

4. Score Engine calcula as pontuações.

↓

5. Behavior Engine interpreta os indicadores.

↓

6. Insight Engine gera observações.

↓

7. Evolution Engine seleciona o plano de evolução.

↓

8. Report Engine monta o relatório.

↓

9. Result Builder consolida todas as informações.

↓

10. Interface apresenta o resultado.

---

# 11. Engines Oficiais

## Assessment Engine

Orquestra todo o processo.

---

## Validation Engine

Valida perguntas, respostas e estrutura.

---

## Score Engine

Calcula pontuações.

Não conhece textos.

Não conhece componentes.

---

## Behavior Engine

Transforma pontuação em padrões comportamentais.

Retorna apenas dados.

---

## Insight Engine

Interpreta os resultados.

Gera:

- insights;
- observações;
- oportunidades de evolução.

Nunca altera pontuações.

---

## Evolution Engine

Seleciona:

- plano de evolução;
- hábitos;
- exercícios;
- checklist;
- recursos;
- missões.

---

## Report Engine

Constrói o relatório personalizado.

---

## Result Builder

Agrupa todos os resultados em um único objeto.

---

# 12. Fluxo de Dados

Presentation Layer

↓

Assessment Engine

↓

Validation Engine

↓

Score Engine

↓

Behavior Engine

↓

Insight Engine

↓

Evolution Engine

↓

Report Engine

↓

Result Builder

↓

Presentation Layer

---

# 13. Dependências

As Engines dependem apenas de:

- Business Rules
- Data Model
- Content Library

Nunca deverão depender de:

- React
- Next.js
- Tailwind
- Componentes Visuais
- Infrastructure
- Features

---

## Mapeamento Físico e Fluxo Técnico

Esta seção resume, em nível de sistema, a decisão registrada em 13_DECISION_LOG.md (DEC-0004). A estrutura completa de pastas está em 07E_IMPLEMENTATION_GUIDE.md, Seção 5.

### Mapeamento de camadas

| Camada Conceitual | Pasta Física |
|---|---|
| Presentation Layer | `app/`, `features/*/components/` |
| Application Layer | `features/` |
| Domain Layer | `kernel/domain/`, `kernel/engines/` |
| Content Layer | `kernel/content/` |
| Infrastructure Layer | `infrastructure/` |

### Dois fluxos distintos

Os dois diagramas abaixo representam conceitos independentes e não deverão ser sobrepostos ou lidos como um único fluxo.

- **Fluxo de Dependências** — direção permitida de `import` entre pastas. Verificável em tempo de compilação/lint. Responde: "quem pode importar quem?".
- **Fluxo de Execução** — ordem em que o código é chamado durante uma requisição real, em tempo de execução. Responde: "o que acontece quando o usuário interage?".

Uma seta no Fluxo de Execução significa "chama em runtime". Nunca significa "importa".

### Fluxo de Dependências (imports — compile-time)

```text
App
  ↓ importa
Features
  ↓ importa
Kernel
```

```text
Infrastructure
  ↓ importa e implementa
Kernel (kernel/contracts/)
```

O Kernel nunca importa Features. O Kernel nunca importa Infrastructure. Não existe nenhuma seta de import partindo do Kernel em direção à Infrastructure em nenhum diagrama deste documento.

A única relação entre Kernel e Infrastructure é a Infrastructure implementando uma interface (`kernel/contracts/`) definida pelo Kernel — por isso o import aponta de Infrastructure para Kernel, nunca o inverso (Dependency Inversion, ver 12B_ARCHITECTURE_PATTERNS.md, Seção 8).

A composição entre um contrato do Kernel e sua implementação concreta em Infrastructure acontece na Application Layer (Feature Service ou Server Action) — o único ponto do sistema que conhece ambos simultaneamente. O Kernel em si nunca conhece Infrastructure.

### Fluxo de Execução (runtime — uma requisição real)

```text
React Component (Client)
  chama →
Server Action
  chama →
Feature Service
  chama →
Kernel (Engines / Contracts)
  chama →
Infrastructure (Repository, já resolvida via contrato)
  chama →
Database
```

Este diagrama descreve chamadas em tempo de execução, não imports. A seta entre Kernel e Infrastructure representa a Feature Service invocando, através do contrato do Kernel, uma implementação de Infrastructure que ela mesma compôs — o Kernel não invoca Infrastructure diretamente nem a importa.

Durante a Sprint 1, sem persistência, o fluxo termina no Kernel: a Server Action invoca as Engines em processo e devolve o `AssessmentResult` diretamente para a Presentation Layer.

Route Handlers (`app/api/`) ficam reservados para APIs públicas, Webhooks e integrações externas, a partir da Sprint 3 (10_ROADMAP.md).

---

# 14. Princípios Técnicos

Toda implementação deverá seguir:

- SOLID
- Clean Architecture
- Separation of Concerns
- Dependency Inversion
- Single Responsibility
- Composition over Inheritance

---

# 15. Escalabilidade

A arquitetura deverá permitir:

- novas avaliações;
- novos algoritmos;
- novos idiomas;
- novos perfis;
- novos relatórios;
- novos módulos;
- novas integrações.

Sem alterar a estrutura principal.

---

# 16. Segurança

Toda entrada deverá ser validada.

Nenhuma regra de negócio poderá ser executada exclusivamente no frontend.

Dados sensíveis nunca deverão ser expostos.

---

# 17. Performance

Objetivos mínimos.

Primeira renderização:

< 2 segundos

Processamento da Assessment:

< 300 ms

Geração do resultado:

< 500 ms

PDF:

< 2 segundos

---

# 18. Observabilidade

Registrar eventos técnicos.

Exemplos:

- Assessment iniciada
- Assessment concluída
- Erro de validação
- PDF gerado

Nunca registrar respostas pessoais em logs.

---

# 19. Preparação para Evolução

A arquitetura já deverá suportar futuramente:

- IA personalizada;
- múltiplas Assessments;
- gamificação;
- histórico de evolução;
- comunidade;
- API pública;
- aplicativo móvel;
- White Label.

Nenhuma dessas funcionalidades deverá exigir alteração estrutural.

---

# 20. Critérios de Aceite

A arquitetura será considerada aprovada quando:

✓ Todas as responsabilidades estiverem separadas.

✓ Toda regra de negócio estiver nas Engines.

✓ Toda comunicação vier da Content Library.

✓ O frontend apenas consumir resultados.

✓ O sistema permitir expansão sem refatoração estrutural.

✓ Toda documentação estiver consistente com este documento.
