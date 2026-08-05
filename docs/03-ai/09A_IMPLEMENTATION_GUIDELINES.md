# IMPLEMENTATION GUIDELINES

> Guia oficial de implementação da plataforma NEXO.

**Projeto:** NEXO Platform  
**Documento:** 09A_IMPLEMENTATION_GUIDELINES.md  
**Versão:** 1.0  
**Status:** Approved  
**Última atualização:** 04/08/2026

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

Toda implementação deverá respeitar a organização oficial.

```text
src/

app/

features/

shared/

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
services/
repositories/
api/
schemas/
types/
utils/
constants/
actions/
store/
index.ts
```

Uma Feature nunca deverá acessar arquivos internos de outra Feature.

Toda comunicação entre Features deverá ocorrer através de contratos públicos.

---

# Shared

A pasta shared contém apenas recursos reutilizáveis.

Exemplos:

- UI
- Hooks
- Helpers
- Validators
- Types
- Utils
- Services

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

Nunca acessar Prisma diretamente fora deles.

No futuro:

```text
Feature

↓

Repository

↓

Prisma

↓

Database
```

---

# API

Rotas da API devem:

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
@/shared
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