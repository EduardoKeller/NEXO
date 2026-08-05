# Decision Log

> Registro oficial das decisões arquiteturais e de produto da plataforma NEXO.

---

## Objetivo

Este documento registra todas as decisões relevantes tomadas durante o desenvolvimento da plataforma.

Cada decisão deve conter:

- contexto;
- problema;
- alternativas avaliadas;
- decisão adotada;
- justificativa;
- impacto técnico;
- data.

Este documento funciona como histórico oficial da evolução do projeto.

---

# Template

## DEC-XXXX

**Título**

### Data

AAAA-MM-DD

### Status

- Proposed
- Approved
- Deprecated
- Superseded

### Contexto

Descreva o problema que motivou a decisão.

### Alternativas consideradas

- Alternativa A
- Alternativa B
- Alternativa C

### Decisão

Descreva claramente a decisão tomada.

### Justificativa

Explique por que esta alternativa foi escolhida.

### Consequências

Liste impactos positivos e negativos.

### Documentos relacionados

- PRD
- Architecture
- Business Rules
- Assessment Engine

---

# Histórico de Decisões

## DEC-0001

### Título

Documentação como fonte única da verdade.

### Data

2026-08-03

### Status

Approved

### Contexto

Era necessário definir uma metodologia que garantisse consistência entre produto, arquitetura e implementação.

### Alternativas consideradas

- Documentação opcional
- Documentação após implementação
- Documentation First

### Decisão

Adotar a metodologia **Documentation First**, onde toda implementação deve ser precedida pela documentação correspondente.

### Justificativa

Reduz ambiguidades, melhora o uso de Inteligência Artificial e facilita manutenção.

### Consequências

Positivas:

- melhor rastreabilidade;
- menor retrabalho;
- documentação sempre atualizada.

Negativas:

- maior tempo inicial de planejamento.

### Documentos relacionados

- 00_VISION.md
- 00A_METHODOLOGY.md

---

## DEC-0002

### Título

Organização da documentação dentro da pasta `/docs`.

### Data

2026-08-03

### Status

Approved

### Contexto

Inicialmente a documentação estava distribuída na raiz do repositório.

### Decisão

Centralizar toda a documentação na pasta `/docs`, mantendo apenas os arquivos de entrada do projeto (`README.md`, `AGENTS.md` e `CLAUDE.md`) na raiz.

### Justificativa

Melhora a organização, facilita a navegação e mantém a estrutura preparada para crescimento.

### Documentos relacionados

- docs/README.md

---

## DEC-0003

### Título

Algoritmo oficial de classificação de Arquétipos Comportamentais.

### Data

2026-08-04

### Status

Approved

### Contexto

O Archetype Resolver (06_ASSESSMENT_ENGINE.md, Seção 9) definia apenas entrada e saída do módulo responsável por identificar o Arquétipo predominante, sem especificar o algoritmo de classificação. Além disso, 04_BUSINESS_RULES.md (Seção 16) e 06_ASSESSMENT_ENGINE.md (Seção 14) definiam critérios de desempate divergentes entre si, e o cálculo do Confidence Score nunca havia sido especificado em nenhum documento.

### Alternativas consideradas

- Distância Euclidiana (Ponderada)
- Score Ponderado
- Sistema Baseado em Regras
- Cosine Similarity

### Decisão

Adotar Distância Euclidiana Ponderada como algoritmo oficial de classificação de Arquétipos, comparando o vetor de Índices Comportamentais do usuário contra um `reference_profile` por Arquétipo (mantido na Content Library), utilizando os pesos oficiais por Dimensão já definidos na plataforma.

O Confidence Score é calculado pela margem relativa entre a menor e a segunda menor distância, normalizado na faixa 0–100.

Os critérios de desempate divergentes entre Business Rules e Assessment Engine foram unificados em uma única regra canônica, definida em 04_BUSINESS_RULES.md, Seção 16.

Os valores do `reference_profile` (80/50/20) representam uma calibração inicial (v1.0), não constantes imutáveis, sujeitas a validação e recalibração com dados reais de uso.

### Justificativa

Entre as quatro alternativas avaliadas, a Distância Euclidiana Ponderada foi a única que atende simultaneamente aos requisitos já documentados de determinismo e escalabilidade sem alteração estrutural (02_ARCHITECTURE.md, Seção 15; 06_ASSESSMENT_ENGINE.md, Seções 2 e 18), produz o Confidence Score de forma natural a partir da própria distância (sem heurística adicional) e mantém a separação entre dado (perfil de referência, na Content Library) e lógica (fórmula, na Assessment Engine).

Sistema Baseado em Regras foi rejeitado por violar o requisito de escalabilidade sem reestruturação (adicionar um Arquétipo exige revisar toda a árvore de regras) e por não produzir um Confidence Score contínuo nativamente.

Score Ponderado foi rejeitado por exigir calibração de pesos com sinal (positivo/negativo) por Arquétipo × Dimensão, com risco de resultados degenerados (perfil uniformemente alto vencendo todos os Arquétipos) caso mal calibrado.

Cosine Similarity foi rejeitado por ignorar a magnitude dos Índices Comportamentais (considera apenas a proporção relativa entre eles), o que contradiz o conceito de intensidade comportamental definido em 00A_METHODOLOGY.md, Seção 9.

### Consequências

Positivas:

- Algoritmo de classificação determinístico, documentado e testável.
- Confidence Score bem definido, com faixa oficial e correspondência ao enum `ConfidenceLevel`.
- Regra de desempate única, elimina a contradição entre Business Rules e Assessment Engine.
- Novos Arquétipos podem ser adicionados apenas com um novo `reference_profile`, sem alterar a fórmula.

Negativas:

- Os valores de calibração inicial (`reference_profile`) foram derivados manualmente das descrições textuais de cada Arquétipo, não de dados reais — exigem validação futura.
- Introduz dependência entre Content Library (dado) e Assessment Engine (lógica) que deve ser mantida sincronizada a cada recalibração.

### Documentos relacionados

- 04_BUSINESS_RULES.md
- 05_CONTENT_LIBRARY.md
- 06_ASSESSMENT_ENGINE.md
- 07_DATA_MODEL.md
- 07B_API_CONTRACTS.md
- 00A_METHODOLOGY.md

---

## DEC-0004

### Título

Arquitetura Oficial da Aplicação — Estrutura de Pastas, Domain Kernel e Fluxo de Server Actions.

### Data

2026-08-05

### Status

Approved

### Contexto

A revisão arquitetural da Sprint 1 identificou que a estrutura de pastas de `src/` não possuía uma definição única: três documentos "oficiais" descreviam árvores fisicamente incompatíveis.

- `09A_IMPLEMENTATION_GUIDELINES.md` definia uma estrutura Feature-First pura (`app/ features/ shared/ providers/ config/ styles/ middleware/`), com cada Feature carregando seus próprios `components/hooks/services/repositories/api`.
- `07E_IMPLEMENTATION_GUIDE.md` (Seção 5) e `12A_DEVELOPMENT_STANDARDS.md` (Seção 3) definiam uma estrutura Layer-First (`components/ features/ domain/ engines/ services/ hooks/ lib/ types/ styles/ tests/`), na qual Engines, Domain e Components eram pastas de topo irmãs de `features/`, sem papel claro para esta última.
- `08_AI_DEVELOPMENT_CHARTER.md` (Seção 6) descrevia uma terceira variação, subconjunto da segunda, sem `shared/`, `providers/`, `config/`, `styles/` ou `middleware/` — embora `07E_IMPLEMENTATION_GUIDE.md` (Fase 2) exigisse explicitamente um Theme Provider.

Adicionalmente, `02_ARCHITECTURE.md` (Seção 5) descrevia as Engines como parte da **Application Layer**, enquanto `12B_ARCHITECTURE_PATTERNS.md` (Seção 6) já as descrevia corretamente como parte da **Domain Layer** — uma contradição conceitual entre os dois documentos que fundamentam a arquitetura.

Por fim, `07A_DOMAIN_DIAGRAMS.md` (Seção 3) e `07E_IMPLEMENTATION_GUIDE.md` (Seção 4) mostram que o Assessment Pipeline (Validation → Score → Behavior → Archetype → Insight → Evolution → Report) é consumido por múltiplas Features (`assessment`, `insights`, `evolution`, `reports`). Isso é incompatível com a regra de isolamento de Features definida em `09A_IMPLEMENTATION_GUIDELINES.md` ("uma Feature nunca deverá acessar arquivos internos de outra Feature") caso as Engines estivessem aninhadas dentro da Feature `assessment`, como o Feature-First puro sugeriria.

Nenhuma linha de código da plataforma havia sido escrita até este ponto, tornando esta a última oportunidade de resolver o conflito antes do início da Fase 1 de `07E_IMPLEMENTATION_GUIDE.md`.

### Alternativas consideradas

- **Feature-First puro** (adotar integralmente `09A_IMPLEMENTATION_GUIDELINES.md`). Rejeitada: não define onde vivem as Engines compartilhadas entre múltiplas Features sem violar o isolamento de Features.
- **Layer-First puro** (adotar integralmente `07E_IMPLEMENTATION_GUIDE.md` / `12A_DEVELOPMENT_STANDARDS.md`). Rejeitada: fragmenta uma mesma funcionalidade de produto (ex.: Assessment) em até quatro pastas de topo diferentes (`components/assessment`, `features/assessment`, `domain/assessment`, `engines/{validation,scoring}`), prejudicando descoberta e DX — exatamente o problema que Feature-First existe para resolver.
- **Domain Kernel + Feature-First híbrido** (adotada). Aplica Feature-First à Presentation/Application Layer (`features/`) e Layer-First/Clean Architecture ao núcleo de domínio (`kernel/`), que é fisicamente único e nunca pertence a uma Feature.

### Decisão

A arquitetura oficial da aplicação passa a ser:

```text
src/

app/
  (marketing)/
  (application)/
  api/

features/
  assessment/
    components/
    hooks/
    actions/
    services/
    api/
    schemas/
    types/
    utils/
    constants/
    store/
    index.ts
  auth/
  dashboard/
  onboarding/
  profile/
  reports/

kernel/
  domain/
  engines/
    validation/
    scoring/
    behavior/
    archetype/
    insight/
    evolution/
    report/
  content/
  contracts/
  errors/
  types/

shared/
  ui/
  hooks/
  lib/
  utils/
  validators/
  constants/

infrastructure/
  database/
  repositories/
  external/

providers/

config/

styles/

middleware/

tests/
```

**Responsabilidades:**

- `app/` — apenas roteamento (App Router). Nunca contém regra de negócio, acesso a banco ou lógica compartilhada.
- `features/` — cada Feature representa uma funcionalidade de produto e é autocontida (components, hooks, actions, services, api, schemas, types, utils, constants, store). Nunca contém Repositories. Uma Feature nunca acessa arquivos internos de outra Feature; toda comunicação ocorre por contratos públicos (`index.ts`).
- `kernel/` (nome oficial — nunca `core/`) — Domain Model, Business Rules, Engines, Value Objects, Content Access, Contracts e Errors. Nunca depende de React, Next.js, Tailwind, Infrastructure ou de qualquer Feature. Features importam o Kernel; o Kernel nunca importa Features.
- `shared/` — UI genérica, hooks, lib, utils, validators e constants reutilizáveis entre Features. Nunca contém regra de negócio.
- `infrastructure/` — exclusivamente Prisma, banco, Repositories, APIs externas, cache e storage. Nunca contém regra de negócio. Toda Repository implementa um contrato definido em `kernel/contracts/` (Dependency Inversion).
- `providers/`, `config/`, `styles/`, `middleware/` — infraestrutura transversal do Next.js (Theme, Analytics, configuração, Tailwind/fonts, middleware de rotas), sem regra de negócio.

**Estes são dois conceitos independentes e não devem ser sobrepostos:** Fluxo de Dependências (direção de `import`, compile-time) e Fluxo de Execução (ordem de chamadas em runtime).

**Fluxo de Dependências (imports):**

```text
App → Features → Kernel
```

```text
Infrastructure → Kernel (kernel/contracts/)
```

Nunca no sentido inverso. O Kernel não importa Features. O Kernel não importa Infrastructure — nenhum diagrama desta decisão contém uma seta de import partindo do Kernel em direção à Infrastructure. A única relação entre os dois é a Infrastructure implementando uma interface definida em `kernel/contracts/`, o que faz o import apontar de Infrastructure para Kernel, nunca o inverso (Dependency Inversion, mantendo o padrão já descrito em `12B_ARCHITECTURE_PATTERNS.md`, Seção 8). A composição entre contrato e implementação concreta acontece na Application Layer (Feature Service ou Server Action) — nunca dentro do Kernel, que nunca conhece Infrastructure.

Esta separação corrige o enunciado inicial da tarefa que originou esta decisão, que descrevia um único fluxo `App → Features → Kernel → Infrastructure`; lido como fluxo de dependências, isso contradiria a regra, também estabelecida na mesma tarefa, de que "o Kernel nunca depende de infraestrutura". A leitura correta é: esse enunciado descreve o Fluxo de Execução (abaixo), não o Fluxo de Dependências.

**Fluxo de Execução (runtime, uma requisição real):**

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

Uma seta neste diagrama significa "chama em runtime", nunca "importa". A chamada entre Kernel e Infrastructure é, na prática, a Feature Service invocando — através do contrato do Kernel — uma implementação de Infrastructure que ela mesma compôs; o Kernel não invoca nem importa Infrastructure diretamente.

Durante a Sprint 1 (sem persistência), o fluxo termina no Kernel: a Server Action invoca as Engines em processo e devolve o resultado diretamente à Presentation Layer.

Route Handlers (`app/api/`) ficam reservados exclusivamente para APIs públicas, Webhooks e integrações externas, a partir da Sprint 3 (10_ROADMAP.md). Durante a Sprint 1, utilizar exclusivamente Server Actions.

**Escopo por Sprint:** a árvore acima representa a plataforma completa (10_ROADMAP.md, Sprints 1–6), não o escopo do MVP. `features/auth/`, `features/dashboard/`, `features/onboarding/`, `features/profile/` e `infrastructure/` permanecem sem implementação até suas Sprints correspondentes — login, cadastro, histórico e dashboard estão explicitamente fora do escopo do MVP (01_PRD.md, Seção 8). Apenas `features/assessment/`, `kernel/` completo, e `app/(marketing)` + `app/(application)/assessment` são implementados na Sprint 1.

### Justificativa

O híbrido é a única alternativa consistente simultaneamente com os princípios já documentados e aprovados da plataforma:

- **Engine-Based** (`02_ARCHITECTURE.md`, Seção 2.3): "toda regra de negócio deverá existir dentro das Engines" e "uma Engine nunca chamará outra diretamente sem uma camada de orquestração" — isso exige que as Engines sejam um módulo único e compartilhado, não fragmentos dentro de uma Feature.
- **Dependency Inversion** e **Repository Pattern** (`12B_ARCHITECTURE_PATTERNS.md`, Seções 8 e 14): "componentes dependerão de abstrações, nunca de implementações concretas" e "a camada de domínio nunca acessará o ORM diretamente" — resolvidos por `kernel/contracts/` + `infrastructure/repositories/`.
- **Feature-First** como filosofia declarada (`09A_IMPLEMENTATION_GUIDELINES.md`, Seção Filosofia) é preservado onde ele efetivamente melhora DX: na Presentation/Application Layer, onde componentes, hooks e ações de uma mesma funcionalidade de produto ficam colocalizados.
- **Escalabilidade sem reescrita estrutural** (`02_ARCHITECTURE.md`, Seção 15; `04_BUSINESS_RULES.md`, Seção 22): novas Assessments, Arquétipos ou Dimensões exigem apenas alterações dentro de `kernel/`, sem tocar em `features/`; novas funcionalidades de produto exigem apenas uma nova pasta em `features/`, sem tocar em `kernel/`.

### Consequências

Positivas:

- Existe agora uma única árvore de pastas oficial, referenciada de forma idêntica por `02_ARCHITECTURE.md`, `07E_IMPLEMENTATION_GUIDE.md`, `09A_IMPLEMENTATION_GUIDELINES.md`, `09B_CODE_STYLE.md`, `12A_DEVELOPMENT_STANDARDS.md` e `08_AI_DEVELOPMENT_CHARTER.md`.
- As Engines deixam de estar mal posicionadas conceitualmente entre Application e Domain Layer — passam a pertencer inequivocamente ao Domain, fisicamente em `kernel/engines/`.
- A fronteira Cliente↔Servidor da Sprint 1, antes indefinida, fica resolvida: Server Actions dentro da Feature, sem API HTTP formal até a Sprint 3.
- O Kernel, sendo livre de frameworks, permanece trivialmente testável de forma unitária (alinhado à meta de cobertura ≥90% das Engines em `07E_IMPLEMENTATION_GUIDE.md`, Seção 7).

Negativas:

- `features/auth/`, `dashboard/`, `onboarding/`, `profile/` e `infrastructure/` existem como estrutura prevista mas ficam vazios até Sprints futuras — risco de serem criados prematuramente se a Fase 1 não observar a seção "Escopo por Sprint".
- Nomenclatura `kernel/` (em vez de `core/`, termo mais comum no mercado) exige atenção em revisões e onboarding para não ser confundida com bibliotecas externas de mesmo nome.
- Cinco documentos precisaram de alteração coordenada; qualquer decisão futura que volte a alterar a estrutura de pastas deverá atualizar os mesmos cinco documentos para não reabrir a divergência que esta decisão elimina.

### Documentos relacionados

- 02_ARCHITECTURE.md
- 07E_IMPLEMENTATION_GUIDE.md
- 07A_DOMAIN_DIAGRAMS.md
- 09A_IMPLEMENTATION_GUIDELINES.md
- 09B_CODE_STYLE.md
- 12A_DEVELOPMENT_STANDARDS.md
- 12B_ARCHITECTURE_PATTERNS.md
- 08_AI_DEVELOPMENT_CHARTER.md
- 01_PRD.md
- 10_ROADMAP.md

---

## Próximas decisões

As próximas decisões deverão receber numeração sequencial:

- DEC-0005
- DEC-0006
- DEC-0007
- ...
## Regras

Toda decisão aprovada deve:

- possuir identificador único;
- nunca ser removida;
- ser marcada como **Deprecated** ou **Superseded** caso deixe de valer;
- possuir referências aos documentos afetados;
- ser atualizada antes da implementação correspondente.