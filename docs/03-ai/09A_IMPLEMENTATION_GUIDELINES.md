# IMPLEMENTATION GUIDELINES

> Guia oficial de implementação da plataforma NEXO.

**Projeto:** NEXO Platform  
**Documento:** 09A_IMPLEMENTATION_GUIDELINES.md  
**Versão:** 1.1  
**Status:** Approved  
**Última atualização:** 05/08/2026

---

# Objetivo

Este documento define como qualquer Inteligência Artificial ou Desenvolvedor deverá implementar código na plataforma NEXO.

O objetivo é garantir consistência arquitetural, previsibilidade e alta qualidade do código ao longo da evolução do projeto.

Este documento complementa:

- AI Development Charter
- AI Playbook
- Engineering Standards
- Architecture Patterns

Em caso de conflito, prevalece a documentação oficial do projeto.

---

# Filosofia

Toda implementação deverá seguir os princípios:

- Documentation First
- Feature First
- Clean Architecture
- Domain Driven Design
- SOLID
- KISS
- DRY
- Composition over Inheritance

A documentação define o comportamento.

O código apenas implementa a documentação.

---

# Estrutura do Projeto

Toda implementação deverá respeitar a organização oficial, definida em 13_DECISION_LOG.md (DEC-0004).

```text
src/

app/

features/

kernel/

shared/

infrastructure/

providers/

config/

styles/

middleware/
```

Jamais criar novas estruturas sem justificativa arquitetural.

---

# Organização das Features

Cada Feature deve ser autocontida.

```text
feature/

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
```

Uma Feature nunca deverá acessar arquivos internos de outra Feature.

Toda comunicação entre Features deverá ocorrer através de contratos públicos.

Uma Feature nunca contém Repositories. Acesso a dados vive em `infrastructure/repositories/` (ver seção Infrastructure abaixo).

---

# Kernel

O Kernel representa o domínio da plataforma: Business Rules, Data Model, Value Objects, Engines, Content Access, Contracts e Errors.

```text
kernel/

domain/
engines/
content/
contracts/
errors/
types/
```

O Kernel:

- nunca depende de React;
- nunca depende de Next.js;
- nunca depende de Tailwind;
- nunca depende de Infrastructure;
- nunca depende de nenhuma Feature.

Features podem importar o Kernel livremente. O Kernel nunca importa Features.

As Engines (Validation, Score, Behavior, Archetype, Insight, Evolution, Report) vivem em `kernel/engines/` porque são consumidas por mais de uma Feature — nunca pertencem a uma Feature específica.

Quando uma Engine precisar de acesso a dados persistidos, ela dependerá apenas de uma interface definida em `kernel/contracts/`. A implementação concreta dessa interface fica em `infrastructure/`, nunca dentro do Kernel (Dependency Inversion — ver 12B_ARCHITECTURE_PATTERNS.md, Seção 8).

---

# Infrastructure

Responsável exclusivamente por Prisma, banco de dados, Repositories, APIs externas, cache e storage.

```text
infrastructure/

database/
repositories/
external/
```

Nunca conter regra de negócio.

Toda Repository implementa um contrato definido em `kernel/contracts/` — o import segue de Infrastructure para Kernel, nunca o inverso. O Kernel nunca importa Infrastructure.

Durante a Sprint 1 esta pasta permanece sem implementação: persistência só é introduzida na Sprint 2 (10_ROADMAP.md).

---

# Shared

A pasta shared contém apenas recursos reutilizáveis.

```text
shared/

ui/
hooks/
lib/
utils/
validators/
constants/
```

Nunca mover lógica de negócio para shared.

---

# Componentes React

Priorizar:

- Server Components

Utilizar Client Components apenas quando necessário.

Sempre justificar o uso de:

```tsx
"use client"
```

Evitar renderizações desnecessárias.

---

# Componentes

Cada componente deve possuir responsabilidade única.

Evitar componentes com centenas de linhas.

Preferir composição.

---

# Hooks

Hooks deverão:

- possuir responsabilidade única;
- não acessar banco;
- não conter regras de negócio complexas;
- retornar interfaces simples.

---

# Services

Services implementam casos de uso.

Não devem conhecer detalhes da interface.

---

# Repositories

Repositories isolam acesso a dados.

Vivem em `infrastructure/repositories/`, nunca dentro de uma Feature ou do Kernel.

Nunca acessar Prisma diretamente fora deles.

Fluxo de Execução em runtime, a partir da Sprint 2, quando a persistência for introduzida (não representa imports — ver Fluxo de Dependências vs. Fluxo de Execução em 02_ARCHITECTURE.md, Seção 13):

```text
Feature Service
  chama →
Kernel (Contract)
  chama →
Repository (Infrastructure)
  chama →
Prisma
  chama →
Database
```

O import segue direção inversa entre Kernel e Infrastructure: a Repository (Infrastructure) importa e implementa o contrato definido em `kernel/contracts/`. O Kernel nunca importa Infrastructure.

---

# API

Durante a Sprint 1, a comunicação entre Presentation e Application ocorre exclusivamente através de Server Actions dentro da Feature correspondente. Não existe API HTTP no MVP.

Route Handlers (`app/api/`) ficam reservados para APIs públicas, Webhooks e integrações externas, a partir da Sprint 3 (10_ROADMAP.md).

Quando existirem, as rotas da API devem:

- validar entrada;
- chamar Services;
- retornar DTOs.

Nunca implementar regra de negócio diretamente nas rotas.

---

# Validação

Utilizar Zod para validação.

Toda entrada externa deve ser validada.

---

# Tipagem

Nunca utilizar:

```ts
any
```

Preferir:

- interfaces;
- types;
- generics.

TypeScript Strict é obrigatório.

---

# Imports

Utilizar aliases.

```ts
@/features
@/kernel
@/shared
@/infrastructure
@/config
```

Evitar imports relativos longos.

---

# Tratamento de Erros

Não utilizar:

```ts
console.log()
```

para controle de erros.

Criar tratamento centralizado.

---

# Logging

Logs deverão possuir níveis.

Exemplo:

- debug
- info
- warn
- error

---

# Estilo

Seguir:

- ESLint
- Prettier

Nunca desabilitar regras sem justificativa.

---

# Performance

Evitar:

- re-renderizações;
- consultas duplicadas;
- lógica pesada em componentes.

Preferir memoização apenas quando necessária.

---

# Código

Todo código deverá ser:

- pequeno;
- legível;
- previsível;
- testável.

---

# Inteligência Artificial

A IA deverá:

- ler a documentação antes de implementar;
- justificar mudanças arquiteturais;
- nunca alterar regras de negócio sem aprovação;
- nunca remover documentação;
- nunca fazer commits automaticamente;
- sempre apresentar resumo das alterações.

---

# Checklist antes de implementar

Antes de qualquer alteração, confirmar:

- documentação lida;
- arquitetura compreendida;
- impacto conhecido;
- testes afetados;
- arquivos modificados.

---

# Checklist antes de finalizar

Confirmar:

- código compila;
- lint sem erros;
- tipagem correta;
- documentação atualizada;
- nenhuma regra de negócio foi alterada sem aprovação.

---

# Objetivo Final

Toda implementação da NEXO deve parecer escrita pela mesma equipe, independentemente de ter sido produzida por um desenvolvedor humano ou por Inteligência Artificial.