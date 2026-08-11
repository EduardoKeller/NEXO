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

Approved — nomenclatura do diretório de domínio (`kernel/`) parcialmente superseded por DEC-0005 (renomeado para `core/`). Todo o restante desta decisão (responsabilidades de camada, Dependency Inversion, Fluxo de Dependências e Fluxo de Execução) permanece integralmente válido.

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

### Nota de Superseding (2026-08-05)

O nome do diretório `kernel/` referenciado em toda esta decisão foi renomeado para `core/` por DEC-0005. Esta seção é mantida sem alteração de texto, incluindo os trechos que argumentavam a favor de `kernel/` sobre `core/`, para preservar o registro histórico exato do que foi decidido e por quê em 2026-08-05. A partir de DEC-0005, toda a documentação viva (não histórica) do projeto usa `core/`. Nenhuma responsabilidade de camada, regra de Dependency Inversion ou fluxo definido nesta decisão foi alterado — apenas o nome do diretório.

---

## DEC-0005

### Título

Renomeação do Domain Kernel — `kernel/` para `core/`.

### Data

2026-08-05

### Status

Approved

### Contexto

Após DEC-0004 ter sido aprovada em princípio, a equipe reavaliou o nome oficial do diretório de domínio antes do início da implementação (nenhuma linha de código havia sido escrita). DEC-0004 já havia identificado `core/` como alternativa e a rejeitado explicitamente, adotando `kernel/` com a justificativa de evitar confusão com bibliotecas externas de mesmo nome.

A reavaliação concluiu que esse risco é secundário frente ao ganho de familiaridade: `core/` é o nome convencionalmente usado em Clean Architecture, DDD e Onion Architecture para o mesmo conceito (o núcleo de domínio, livre de frameworks), e é mais reconhecível para novos desenvolvedores que ingressarem no projeto.

### Alternativas consideradas

- **Manter `kernel/`** (decisão original de DEC-0004). Rejeitada nesta reavaliação: nome menos convencional no ecossistema de Clean Architecture/DDD, aumenta a curva de familiarização de novos desenvolvedores sem benefício compensatório, já que o risco de colisão com bibliotecas externas chamadas "core" é baixo dentro de `src/core/` (namespace do projeto, não um pacote publicado).
- **Renomear para `core/`** (adotada). Mantém exatamente o mesmo conceito arquitetural do Domain Kernel definido em DEC-0004.

### Decisão

O diretório oficial do domínio passa de `kernel/` para `core/`.

Nenhuma responsabilidade de camada é alterada. Todas as regras estabelecidas em DEC-0004 permanecem idênticas, apenas com o nome do diretório trocado:

- `core/` (nunca `kernel/`) concentra Domain Model, Business Rules, Engines, Value Objects, Content Access, Contracts e Errors.
- `core/` nunca depende de React, Next.js, Tailwind, Infrastructure ou de qualquer Feature.
- Features importam `core/`; `core/` nunca importa Features.
- A ligação entre `core/` e `infrastructure/` continua ocorrendo exclusivamente por Dependency Inversion via `core/contracts/`, conforme o padrão já descrito em `12B_ARCHITECTURE_PATTERNS.md`, Seção 8 — inalterado por esta decisão.
- O Fluxo de Dependências (`App → Features → Core`, `Infrastructure → Core`) e o Fluxo de Execução (`React Component → Server Action → Feature Service → Core → Infrastructure → Database`) permanecem exatamente os mesmos definidos em DEC-0004, apenas com "Kernel" substituído por "Core" em toda a nomenclatura.

Esta renomeação foi propagada integralmente para toda a documentação viva do projeto: `02_ARCHITECTURE.md`, `07E_IMPLEMENTATION_GUIDE.md`, `08_AI_DEVELOPMENT_CHARTER.md`, `09A_IMPLEMENTATION_GUIDELINES.md`, `09B_CODE_STYLE.md`, `12A_DEVELOPMENT_STANDARDS.md`. O texto de DEC-0004 no Decision Log não foi alterado, apenas marcado como parcialmente superseded (ver Nota de Superseding acima), preservando o histórico de por que `kernel/` havia sido escolhido originalmente.

### Justificativa

"Core" é o termo amplamente utilizado em Clean Architecture, DDD e Onion Architecture para o mesmo conceito de núcleo de domínio independente de frameworks — a mudança reduz a fricção de onboarding sem exigir nenhuma alteração estrutural, de responsabilidade ou de regra arquitetural, já que nenhuma implementação existente precisa ser migrada (Sprint 1 ainda não iniciada).

### Consequências

Positivas:

- Nome mais reconhecível para desenvolvedores familiarizados com Clean Architecture/DDD/Onion Architecture.
- Custo de migração é zero: a renomeação ocorre inteiramente em documentação, antes de qualquer scaffold de código.
- Toda a arquitetura, contratos e fluxos aprovados em DEC-0004 permanecem intactos — risco de regressão arquitetural nulo.

Negativas:

- Reintroduz o risco que DEC-0004 havia identificado e rejeitado (confusão com bibliotecas/pacotes externos chamados "core"); aceito conscientemente nesta decisão.
- Caso o projeto já tivesse código implementado sob `kernel/`, este seria um rename de maior custo — não é o caso aqui.

### Documentos relacionados

- 13_DECISION_LOG.md (DEC-0004, parcialmente superseded)
- 02_ARCHITECTURE.md
- 07E_IMPLEMENTATION_GUIDE.md
- 08_AI_DEVELOPMENT_CHARTER.md
- 09A_IMPLEMENTATION_GUIDELINES.md
- 09B_CODE_STYLE.md
- 12A_DEVELOPMENT_STANDARDS.md

---

## DEC-0006

### Título

Adoção de Next.js 16 (e React 19.2) como versão oficial, substituindo Next.js 15 em `12C_TECH_STACK.md`.

### Data

2026-08-05

### Status

Approved

### Contexto

O início do bootstrap da Sprint 1 (PR 1) exigia criar o projeto Next.js "utilizando a versão estável mais recente". Ao rodar `create-next-app@latest`, a versão resolvida foi Next.js 16.3.0 com React 19.2.8, enquanto `12C_TECH_STACK.md` (Approved) especifica explicitamente "Next.js 15" como versão oficial. Next.js 15 já não é a versão estável mais recente da série ativa no momento do bootstrap.

A questão foi levada ao responsável pelo produto antes de mesclar o scaffold no repositório, dado que `12C_TECH_STACK.md` §17 exige que toda nova tecnologia (e, por extensão, mudança de versão principal já documentada) seja registrada no Decision Log antes de ser adotada.

### Alternativas consideradas

- **Fixar em Next.js 15.x**, mantendo consistência estrita com o texto atual de `12C_TECH_STACK.md` sem atualizá-lo. Rejeitada: instalaria uma versão que não é mais a mais recente estável, contrariando a instrução explícita desta tarefa e adiando uma atualização que seria necessária de qualquer forma.
- **Usar Next.js 16.3.0 e atualizar `12C_TECH_STACK.md`** (adotada). Mantém o princípio do próprio Tech Stack (Seção 2: "priorizar... performance... manutenção de longo prazo"; Seção 18: "sempre utilizar versões LTS ou estáveis") usando a versão estável real mais recente, com o documento normativo corrigido para refletir a realidade instalada.

### Decisão

Adotar Next.js 16.3.0 e React 19.2.8 como versões oficiais da plataforma, substituindo a referência a "Next.js 15" em `12C_TECH_STACK.md`, Seção 4. Nenhuma outra tecnologia da Seção 4 (TypeScript, Tailwind, shadcn/ui, Lucide React, React Hook Form, Zod) é afetada por esta decisão.

### Justificativa

Next.js 16 mantém integralmente as razões documentadas para a escolha do framework (App Router, Server Components, Performance, Ecossistema, Longo suporte) e é a versão estável recomendada pelo próprio time do Next.js no momento da criação do projeto. Adiar a adoção fixando a versão 15 criaria dívida técnica imediata — o projeto nasceria em uma versão que a comunidade já considera anterior, incorrendo em custo de upgrade futuro sem benefício correspondente, contrariando `12C_TECH_STACK.md`, Seção 2 ("manutenção de longo prazo").

### Consequências

Positivas:

- Projeto inicia na versão estável mais recente, com Turbopack já como bundler padrão de build (`12C_TECH_STACK.md`, Seção 9, que já previa "Turbopack quando estável para produção").
- `12C_TECH_STACK.md` deixa de divergir do que foi efetivamente instalado.

Negativas:

- Nenhuma decisão anterior do Decision Log referenciava uma versão específica do Next.js além do Tech Stack, portanto não há outras decisões a reconciliar.
- Diferenças de comportamento entre Next.js 15 e 16 (ainda não auditadas em detalhe) poderão exigir ajustes ao longo da Sprint 1 caso a documentação de Engines/Server Actions tenha sido escrita com Next 15 em mente; nenhuma incompatibilidade foi identificada durante o bootstrap (build, lint e type-check passaram sem erros).

### Documentos relacionados

- 12C_TECH_STACK.md
- 02_ARCHITECTURE.md

---

## DEC-0007

### Título

Calibração provisória v0.1 de `Alternative.score`, `Question.weight` (Q002–Q010) e `Indicator.weight` — não representa calibração definitiva de negócio.

### Data

2026-08-10

### Status

Approved — a *adoção do mecanismo* de calibração provisória está aprovada; os *valores numéricos* específicos abaixo são explicitamente provisórios e não representam uma decisão de negócio definitiva (ver Contexto e Consequências).

### Contexto

A Fase 4 de `07E_IMPLEMENTATION_GUIDE.md` (Assessment Engine — Validation, Score, Behavior, Archetype Resolver, Insight, Evolution Engines e Result Builder) depende de dados numéricos da Content Library que nunca foram oficialmente definidos: `05_CONTENT_LIBRARY.md` documenta a fórmula de score (`04_BUSINESS_RULES.md`, Seção 9: `Pontuação da Alternativa × Peso da Pergunta × Peso da Dimensão`), mas nenhuma das 40 alternativas (10 perguntas × 4 alternativas) possui um valor de `score` preenchido, apenas 1 das 10 perguntas (Q001) possui `weight` explícito, e nenhum dos 10 Indicadores possui `weight` preenchido. `Dimension.weight` é a única das quatro grandezas de peso já 100% documentada (5/5 dimensões).

Sem esses valores, o Score Engine e o Behavior Engine não têm o que calcular — a Fase 4 fica bloqueada. Aguardar validação comercial/de produto antes de atribuir esses valores adiaria indefinidamente o desenvolvimento, sem necessidade real: a arquitetura já isola completamente dado (Content Library / `core/content/`) de lógica (Engines), então valores provisórios podem ser substituídos depois sem qualquer alteração de código nas Engines.

### Alternativas consideradas

- **Aguardar validação de produto antes de iniciar a Fase 4.** Rejeitada: bloqueia indefinidamente o desenvolvimento por uma dependência (validação comercial) que não existe ainda e não tem previsão.
- **Atribuir valores arbitrários sem documentar a origem ou a natureza provisória.** Rejeitada: esconderia a suposição, arriscando que os valores fossem tratados como oficiais por engano em decisões futuras (produto, conteúdo, ou uma eventual auditoria).
- **Calibração provisória v0.1, documentada, versionada e explicitamente não-definitiva** (adotada). Destrava a Fase 4 imediatamente, mantém rastreabilidade total da suposição adotada e da regra usada para derivá-la, e deixa o caminho de substituição trivial (apenas dado, nunca lógica).

### Decisão

Adotar a seguinte calibração provisória v0.1, aplicada apenas onde a Content Library não possuía valor oficial:

**`Alternative.score`** (as 40 alternativas de Q001–Q010) — regra: a ordem de autoria das alternativas (A→D) já reflete, em todas as 10 perguntas, intensidade decrescente de expressão do Indicador Principal (A = expressão mais proativa/adaptativa, D = mais evitativa/problemática, confirmado por leitura de todas as 10 perguntas). Aplicada uma escala Likert uniforme de 4 pontos, igualmente espaçada, para todas as perguntas:

| Alternativa | Score |
|---|---|
| A | 100 |
| B | 67 |
| C | 33 |
| D | 0 |

**`Question.weight`** — Q001 mantém `1.0`, valor já oficialmente documentado antes desta decisão (não é calibração v0.1). Para Q002–Q010, na ausência de qualquer sinal de peso diferenciado entre perguntas de uma mesma dimensão, adotado `1.0` uniforme (calibração v0.1) para não introduzir hierarquia não documentada.

**`Indicator.weight`** — os 10 indicadores (2 por dimensão) recebem `1.0` uniforme (calibração v0.1), pela mesma ausência de sinal de diferenciação entre os 2 indicadores de uma mesma dimensão.

**`Dimension.weight`** — inalterado, permanece 100% oficial (initiative 1.0 · planning 1.0 · pressure 1.0 · distraction 1.0 · consistency 1.2), não faz parte desta calibração.

Todos os valores desta calibração são marcados com o metadado `calibrationVersion: "v0.1"` exclusivamente nos dados de `core/content/` (nunca em `core/engines/`), e anotados inline em `05_CONTENT_LIBRARY.md` com a marca "Calibração v0.1 (provisória) — DEC-0007", distinguindo-os dos valores já oficialmente documentados (`Dimension.weight` e `Q001.weight`).

### Justificativa

A escala uniforme 100/67/33/0 é a opção menos arbitrária disponível: qualquer distribuição não-uniforme exigiria uma justificativa qualitativa por pergunta que a documentação nunca forneceu, enquanto uma escala igualmente espaçada não introduz nenhum viés além da ordenação A→D já presente na redação original das perguntas. O mesmo raciocínio se aplica aos pesos uniformes de Pergunta e Indicador: no MVP, a única diferenciação de peso já documentada e intencional é entre Dimensões (Consistência = 1.2), não dentro delas.

### Consequências

Positivas:

- Destrava integralmente a Fase 4 (`07E_IMPLEMENTATION_GUIDE.md`) sem esperar por um processo de validação de produto que ainda não existe.
- Rastreabilidade total: todo valor provisório é identificável (`calibrationVersion: "v0.1"` no dado, anotação inline na documentação, referência a esta decisão).
- Substituição futura é apenas uma alteração de dado em `core/content/` — nenhuma Engine precisa ser alterada.

Negativas:

- **Os valores numéricos adotados aqui não são uma calibração definitiva de negócio.** Eles não foram validados com usuários reais, especialistas de produto, ou dados de uso, e não deverão ser citados como tal em nenhum contexto (relatório, documentação de produto, comunicação externa).
- Resultados de Assessment gerados enquanto a calibração v0.1 estiver em vigor (Behavior Indexes, Arquétipo, Confidence Score) refletem essa suposição provisória, não um modelo de negócio validado — qualquer uso desses resultados fora do desenvolvimento/QA interno deve deixar isso explícito.
- Esta calibração deverá ser revisada e provavelmente substituída (nova versão, ex. v1.0) assim que houver dados reais de uso ou validação comercial, seguindo o processo de Content Governance (`05_CONTENT_LIBRARY.md`, Seção 29). Essa substituição futura não é, por si só, uma nova decisão arquitetural — é a continuação natural desta.

### Documentos relacionados

- 05_CONTENT_LIBRARY.md (Indicator Library, Question Library)
- 07_DATA_MODEL.md (Alternative, Question, Indicator, Dimension)
- 04_BUSINESS_RULES.md (Seção 9 — Pontuação)
- 06_ASSESSMENT_ENGINE.md (Seção 6 — Score Engine, Seção 7 — Behavior Engine)
- 07E_IMPLEMENTATION_GUIDE.md (Fase 4 — Assessment Engine)
- 13_DECISION_LOG.md (DEC-0003 — mesmo padrão de calibração provisória, já aplicado ao `reference_profile` dos Arquétipos)

---

## DEC-0008

### Título

Algoritmo oficial do Behavior Engine — agregação de indicadores em Dimensão, normalização 0–100 e placeholder provisório de `BehaviorIndex.confidence`.

### Data

2026-08-11

### Status

Approved — a *fórmula de agregação e normalização* é adotada como algoritmo oficial (mesma natureza de DEC-0003). O valor constante de `BehaviorIndex.confidence` é explicitamente um *placeholder provisório*, não uma fórmula de negócio definitiva (ver Consequências).

### Contexto

A Fase 4 (`07E_IMPLEMENTATION_GUIDE.md`) exigia implementar o Behavior Engine (`06_ASSESSMENT_ENGINE.md`, Seção 7–8), mas nenhuma fórmula estava documentada para: (1) combinar os 2 `IndicatorScore` de uma Dimensão em um score bruto único; (2) normalizar esse score bruto — que já carrega `Dimension.weight` embutido desde a Score Engine (`04_BUSINESS_RULES.md`, Seção 9), podendo chegar a 120 para Consistência — para a faixa oficial 0–100; (3) calcular `BehaviorIndex.confidence` (`07_DATA_MODEL.md`, Seção 11), campo que nunca foi definido em nenhum documento, diferente de `BehaviorArchetype.confidence`, já formulado via DEC-0003. Adicionalmente, `07B_API_CONTRACTS.md` (Seção 8) define `BehaviorIndex` com campos `score`/sem `id`, divergindo de `07_DATA_MODEL.md` (Seção 11), que usa `rawScore`/com `id` — resolvido a favor de `07_DATA_MODEL.md`, por ser o documento normativo do domínio (não é decisão de negócio, é correção de nomenclatura, mesmo tratamento dado a `AssessmentStatus`).

### Alternativas consideradas

**Agregação indicador → Dimensão:**
- **Média ponderada por `Indicator.weight`** (adotada): `rawScore = Σ(indicatorScore × weight) / Σ(weight)`. Consistente com a decisão já tomada na Score Engine de que `Indicator.weight` é de uso exclusivo do Behavior Engine.
- Soma ponderada sem dividir. Rejeitada: dobra a escala sem referência de máximo clara, dificultando a normalização seguinte.

**Normalização 0–100:**
- **Dividir por `Dimension.weight`** (adotada): `normalizedScore = rawScore / Dimension.weight`. Cancela o efeito de `Dimension.weight` nesta etapa (já aplicado no score por pergunta), produzindo um Índice comparável entre as 5 Dimensões independentemente do peso. `Dimension.weight` volta a ser usado no Archetype Resolver (DEC-0003), em uma etapa distinta do pipeline.
- Clamp simples em 100. Rejeitada: comprime artificialmente toda a faixa 100–120 de Consistência em um único valor (100), perdendo capacidade de diferenciação dentro dessa Dimensão.

**`BehaviorIndex.confidence`:**
- **Constante 100, documentada como placeholder** (adotada): a Validation Engine já garante que as 10 perguntas foram respondidas antes de qualquer cálculo (`04_BUSINESS_RULES.md`, Seção 18) — não existe cenário de dado parcial no MVP, tornando uma constante honesta sobre a ausência de fórmula oficial, sem inventar uma métrica.
- Omitir o campo. Rejeitada: `BehaviorIndex.confidence` é campo não-opcional em `07_DATA_MODEL.md`, Seção 11.

### Decisão

O Behavior Engine (`core/engines/behavior/`) calcula, para cada uma das 5 Dimensões:

```
rawScore(dimensão) = Σ(IndicatorScore × Indicator.weight) / Σ(Indicator.weight)
                      para os indicadores dessa Dimensão

normalizedScore(dimensão) = rawScore(dimensão) / Dimension.weight

confidence(dimensão) = 100  (placeholder provisório)
```

`BehaviorIndex` usa exatamente os campos de `07_DATA_MODEL.md`, Seção 11 (`id`, `dimensionId`, `rawScore`, `normalizedScore`, `confidence`), não os de `07B_API_CONTRACTS.md`, Seção 8.

### Justificativa

A média ponderada e a normalização por `Dimension.weight` são as únicas fórmulas consistentes com decisões já aprovadas (Score Engine, DEC-0003) sem introduzir dupla contagem do peso de Dimensão nem comprimir informação. O placeholder de `confidence` evita inventar uma métrica sem base documental, seguindo o mesmo espírito de transparência de DEC-0007.

### Consequências

Positivas:

- Desbloqueia o Behavior Engine sem inventar regras de negócio ocultas — toda a fórmula está documentada e é publicamente rastreável a esta decisão.
- `BehaviorIndex.confidence = 100` é trivialmente substituível por uma fórmula real no futuro (constante isolada, nenhuma Engine downstream depende do seu valor específico ainda).

Negativas:

- **`BehaviorIndex.confidence` não representa uma métrica de confiança real.** É um placeholder até que uma fórmula oficial seja definida (ex.: baseada em variância entre indicadores de uma Dimensão, ou outro critério a determinar pelo time de produto).
- A fórmula de agregação/normalização, embora consistente com o restante do pipeline, nunca foi validada com dados reais de uso — mesma ressalva já aplicada à calibração v0.1 (DEC-0007).

### Documentos relacionados

- 06_ASSESSMENT_ENGINE.md (Seção 7 — Behavior Engine, Seção 8 — Behavior Indexes)
- 04_BUSINESS_RULES.md (Seção 9 — Pontuação)
- 07_DATA_MODEL.md (Seção 11 — BehaviorIndex)
- 07B_API_CONTRACTS.md (Seção 8 — Behavior Index, divergência de nomenclatura resolvida)
- 13_DECISION_LOG.md (DEC-0003 — mesmo padrão de decisão algorítmica; DEC-0007 — mesmo padrão de placeholder provisório)

---

## Próximas decisões

As próximas decisões deverão receber numeração sequencial:

- DEC-0009
- DEC-0010
- DEC-0011
- ...
## Regras

Toda decisão aprovada deve:

- possuir identificador único;
- nunca ser removida;
- ser marcada como **Deprecated** ou **Superseded** caso deixe de valer;
- possuir referências aos documentos afetados;
- ser atualizada antes da implementação correspondente.