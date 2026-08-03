# AI PLAYBOOK

**Projeto:** NEXO Platform  
**Documento:** 08D_AI_PLAYBOOK.md  
**Versão:** 1.0  
**Status:** Approved  
**Última atualização:** 03/08/2026

---

# 1. Objetivo

Este documento reúne procedimentos operacionais (Playbooks) para utilização de Inteligências Artificiais durante o desenvolvimento da plataforma NEXO.

Cada Playbook representa um fluxo completo para executar uma tarefa recorrente.

Seu objetivo é garantir:

- consistência;
- previsibilidade;
- qualidade;
- alinhamento com a documentação oficial.

---

# 2. Como utilizar este documento

Cada Playbook possui sempre a mesma estrutura.

- Objetivo
- Quando utilizar
- Personas envolvidas
- Documentação obrigatória
- Entradas
- Processo
- Saídas esperadas
- Checklist
- Critérios de aceite

---

# PLAYBOOK 01 — Nova Funcionalidade

## Objetivo

Implementar uma funcionalidade completamente nova.

---

## Documentação obrigatória

- Vision
- Methodology
- PRD
- Business Rules
- Architecture
- Data Model

---

## Processo

```text
Solicitação

↓

Ler documentação

↓

Planejamento

↓

Arquitetura

↓

Implementação

↓

Testes

↓

Documentação

↓

Review

↓

Merge
```

---

## Checklist

✓ Existe requisito?

✓ Existe regra de negócio?

✓ Existe entidade?

✓ Existe contrato?

✓ Existe teste?

✓ Existe documentação?

---

# PLAYBOOK 02 — Nova Tela

## Objetivo

Criar uma nova página da aplicação.

---

## Processo

```text
PRD

↓

UX

↓

Componentes

↓

Integração

↓

Testes

↓

Review
```

---

## Regras

Nunca criar componentes específicos quando um componente reutilizável já existir.

---

# PLAYBOOK 03 — Novo Componente

## Objetivo

Criar componente reutilizável.

---

## Processo

```text
Necessidade

↓

Design System

↓

Implementação

↓

Story

↓

Teste

↓

Review
```

---

## Critérios

- reutilizável;
- acessível;
- tipado;
- documentado.

---

# PLAYBOOK 04 — Nova API

## Objetivo

Criar endpoint.

---

## Processo

```text
API Contract

↓

Implementação

↓

Validação

↓

Testes

↓

Review
```

---

## Nunca

Alterar contratos durante implementação.

---

# PLAYBOOK 05 — Alteração no Banco

## Processo

```text
Data Model

↓

Storage Model

↓

Prisma Mapping

↓

Migration

↓

Testes

↓

Review
```

---

## Regra

Migration nunca vem antes da documentação.

---

# PLAYBOOK 06 — Assessment Engine

## Objetivo

Implementar módulo da Engine.

---

## Processo

```text
Business Rules

↓

Assessment Engine

↓

Implementação

↓

Testes

↓

Review
```

---

## Regra

Cada módulo.

Input

↓

Processamento

↓

Output

---

# PLAYBOOK 07 — Correção de Bug

## Processo

```text
Bug

↓

Reprodução

↓

Hipóteses

↓

Causa Raiz

↓

Correção

↓

Teste

↓

Review
```

---

## Nunca

Corrigir sem identificar causa.

---

# PLAYBOOK 08 — Refatoração

## Objetivo

Melhorar qualidade.

---

## Processo

```text
Análise

↓

Plano

↓

Refatoração

↓

Testes

↓

Review
```

---

## Regra

Mesmo comportamento.

Melhor implementação.

---

# PLAYBOOK 09 — Revisão de Código

## Processo

```text
Código

↓

Arquitetura

↓

Domínio

↓

Performance

↓

Segurança

↓

Testes

↓

Review
```

---

## Checklist

✓ SOLID

✓ DDD

✓ Clean Architecture

✓ Performance

✓ Tipagem

---

# PLAYBOOK 10 — Atualização da Documentação

## Processo

```text
Mudança

↓

Documentos impactados

↓

Atualização

↓

Versionamento

↓

Review
```

---

## Nunca

Atualizar código sem atualizar documentação.

---

# PLAYBOOK 11 — Preparação para Release

## Processo

```text
Develop

↓

Build

↓

Lint

↓

Testes

↓

Performance

↓

Documentação

↓

Changelog

↓

Release

↓

Deploy
```

---

## Checklist

✓ Build

✓ Lint

✓ Testes

✓ Lighthouse

✓ Documentação

✓ Versionamento

---

# PLAYBOOK 12 — Desenvolvimento Assistido por IA

Fluxo recomendado.

```text
Entender problema

↓

Consultar documentação

↓

Planejar

↓

Explicar plano

↓

Implementar

↓

Executar testes

↓

Atualizar documentação

↓

Revisar

↓

Entregar
```

---

# 3. Templates

## Template de Planejamento

```text
Objetivo

Documentos consultados

Arquivos impactados

Plano

Riscos

Critérios de aceite
```

---

## Template de Implementação

```text
Objetivo

Arquivos criados

Arquivos alterados

Dependências

Testes necessários
```

---

## Template de Revisão

```text
Arquitetura

Domínio

Código

Testes

Performance

Segurança

Documentação

Resultado Final
```

---

# 4. Anti-Patterns

A IA nunca deverá.

✖ Criar funcionalidades sem documentação.

✖ Alterar contratos.

✖ Alterar Business Rules.

✖ Duplicar componentes.

✖ Criar código sem testes.

✖ Misturar UI com regras de negócio.

✖ Alterar arquitetura durante uma implementação.

---

# 5. Métricas

Cada Playbook deverá registrar.

- Tempo de execução.
- Personas envolvidas.
- Arquivos alterados.
- Testes executados.
- Documentos atualizados.
- Resultado.

---

# 6. Evolução

Novos Playbooks deverão seguir exatamente esta estrutura.

Nenhum Playbook poderá depender de conhecimento implícito.

---

# 7. Critérios de Aceite

Este documento será considerado concluído quando.

✓ Todos os fluxos recorrentes estiverem documentados.

✓ Os procedimentos forem reproduzíveis.

✓ Diferentes agentes de IA produzirem resultados consistentes.

✓ Os Playbooks permanecerem alinhados aos documentos 08, 08A, 08B e 08C.

---

# 8. Princípio Supremo

A Inteligência Artificial não substitui o processo de desenvolvimento.

Ela acelera a execução de um processo previamente definido, documentado e validado.

Todo desenvolvimento da NEXO deverá seguir os Playbooks oficiais antes de qualquer implementação.
