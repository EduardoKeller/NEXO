# CODE STYLE

> Guia oficial de estilo de código da plataforma NEXO.

**Projeto:** NEXO Platform  
**Documento:** 09B_CODE_STYLE.md  
**Versão:** 1.2  
**Status:** Approved  
**Última atualização:** 05/08/2026

---

# Objetivo

Este documento padroniza toda a escrita de código da plataforma NEXO.

Seu objetivo é garantir consistência entre implementações produzidas por desenvolvedores humanos e Inteligências Artificiais.

Toda implementação deverá seguir este documento.

Em caso de conflito, prevalece a documentação oficial do projeto.

---

# Filosofia

O código da NEXO deve ser:

- simples;
- previsível;
- explícito;
- consistente;
- testável;
- fácil de evoluir.

Escrevemos código para pessoas.

Computadores apenas executam.

---

# Convenções Gerais

## Idioma

Todo código deverá utilizar inglês.

Exemplos:

```ts
AssessmentService
BehaviorDimension
calculateConfidence
```

Nunca utilizar português.

---

## Comentários

Evitar comentários.

Código deve ser autoexplicativo.

Comentários são aceitos apenas para:

- decisões arquiteturais;
- algoritmos complexos;
- limitações técnicas.

Nunca comentar o óbvio.

---

# Arquivos

## Componentes

Sempre utilizar:

```text
PascalCase.tsx
```

Exemplo

```text
AssessmentCard.tsx
```

---

## Hooks

Sempre iniciar com:

```text
use
```

Exemplo

```text
useAssessment.ts
```

---

## Services

Sempre terminar com:

```text
Service
```

Exemplo

```text
AssessmentService.ts
```

---

## Repositories

Sempre terminar com:

```text
Repository
```

Exemplo

```text
AssessmentRepository.ts
```

---

## Schemas

Sempre terminar com:

```text
Schema
```

Exemplo

```text
AssessmentSchema.ts
```

---

## Validators

Sempre terminar com:

```text
Validator
```

---

## DTOs

Sempre utilizar:

```text
CreateAssessmentDto

UpdateAssessmentDto

AssessmentResponseDto
```

---

# Imports

Utilizar aliases.

```ts
@/features

@/core

@/shared

@/infrastructure

@/config

@/providers
```

Evitar:

```ts
../../../../../
```

---

# Componentes React

Priorizar:

Server Components.

Utilizar Client Components somente quando necessário.

Todo:

```tsx
"use client"
```

deverá possuir justificativa técnica.

---

# Props

Sempre utilizar interfaces.

```ts
interface AssessmentCardProps {

}
```

Nunca utilizar:

```ts
type Props
```

para componentes.

---

# Interfaces

Prefixo proibido.

Nunca utilizar:

```ts
IAssessment
```

Utilizar:

```ts
Assessment
```

ou

```ts
AssessmentDto
```

---

# Types

Utilizar:

type

apenas para:

- unions;
- mapped types;
- utility types.

Interfaces representam contratos.

---

# Enums

Preferir:

```ts
export const
```

+

```ts
as const
```

ao invés de enum quando possível.

---

# Funções

Devem possuir apenas uma responsabilidade.

Evitar funções acima de:

50 linhas.

---

# Componentes

Evitar componentes acima de:

200 linhas.

Caso ultrapasse:

Refatorar.

---

# Hooks

Evitar hooks acima de:

150 linhas.

---

# Services

Devem implementar apenas casos de uso.

Nunca acessar UI.

Nunca acessar componentes.

---

# Repositories

Vivem em `infrastructure/repositories/`.

Devem acessar:

- Prisma
- APIs externas

Nunca conter regra de negócio.

---

# API

Routes devem apenas:

- validar;
- chamar Services;
- retornar resposta.

Nunca implementar regra de negócio.

---

# Server Actions

Devem ficar dentro da Feature correspondente.

Nunca em shared.

---

# Estado

Quando necessário.

Priorizar:

React State

↓

Context

↓

Zustand

↓

Redux (somente se realmente necessário)

---

# Formulários

Utilizar:

React Hook Form

+

Zod

---

# Validação

Toda entrada externa deverá possuir:

Zod.

Nunca confiar em dados do cliente.

---

# Tratamento de Erros

Criar erros específicos.

Exemplo

```ts
AssessmentNotFoundError
```

Evitar:

```ts
throw new Error()
```

genérico.

---

# Async

Sempre utilizar:

async/await.

Evitar:

.then()

---

# Null

Nunca assumir existência.

Utilizar:

```ts
optional chaining

??

early return
```

---

# Logging

Nunca utilizar:

```ts
console.log()
```

Utilizar serviço centralizado.

---

# CSS

Utilizar:

Tailwind CSS.

Evitar CSS Modules.

Evitar Styled Components.

---

# Responsividade

Mobile First obrigatório.

---

# Organização

Cada Feature deverá exportar apenas:

```ts
index.ts
```

Todo acesso externo deverá ocorrer pelo barrel file.

---

# Barrel Files

Permitidos apenas:

- Feature
- Core
- Shared

Nunca criar barrel file em toda pasta.

---

# Testes

Nome:

```text
AssessmentService.test.ts

AssessmentCard.test.tsx
```

---

# Commits

Conventional Commits obrigatórios.

Exemplos

```text
feat:

fix:

refactor:

docs:

test:

build:

ci:

chore:
```

---

# Branches

Padrão:

```text
feature/

fix/

hotfix/

release/

docs/

refactor/
```

---

# Pull Requests

Todo PR deverá:

- compilar;
- passar lint;
- atualizar documentação;
- possuir descrição.

---

# Inteligência Artificial

Toda IA deverá:

- ler a documentação antes de implementar;
- nunca criar arquitetura paralela;
- nunca alterar regras de negócio sem aprovação;
- justificar mudanças estruturais;
- evitar duplicação de código;
- respeitar este documento integralmente.

---

# Checklist

Antes de finalizar qualquer implementação:

- Código compila
- TypeScript sem erros
- ESLint limpo
- Imports organizados
- Sem código morto
- Sem comentários desnecessários
- Sem console.log
- Sem any
- Documentação atualizada
- Estrutura respeitada

---

# Objetivo Final

Todo código da NEXO deverá parecer escrito por uma única equipe, independentemente do autor.

Consistência é mais importante do que preferência individual.

O padrão definido neste documento é obrigatório para toda contribuição futura.