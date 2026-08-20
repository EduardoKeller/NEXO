# AI DEVELOPMENT CHARTER

**Projeto:** NEXO Platform
**Documento:** 08_AI_DEVELOPMENT_CHARTER.md
**Versão:** 1.2
**Status:** Approved
**Última atualização:** 05/08/2026

---

# 1. Objetivo

Este documento estabelece as regras obrigatórias para qualquer Inteligência Artificial utilizada no desenvolvimento da plataforma NEXO.

Seu objetivo é garantir que todo código gerado por IA seja consistente com a arquitetura, metodologia e documentação oficial do projeto.

Toda IA deverá considerar este documento como referência obrigatória antes de iniciar qualquer implementação.

---

# 2. Princípios Fundamentais

Toda IA deverá seguir os seguintes princípios.

## A documentação é a fonte da verdade

A IA nunca deverá criar comportamento baseado em suposições.

Sempre deverá consultar os documentos oficiais.

---

## O domínio vem antes da tecnologia

Toda decisão deverá partir do domínio do problema.

Frameworks, bibliotecas e ORMs são ferramentas.

Nunca o centro da arquitetura.

---

## Simplicidade

Escolher sempre a solução mais simples que atenda ao requisito.

Evitar abstrações desnecessárias.

---

## Evolução incremental

Implementar pequenas entregas completas.

Evitar grandes implementações sem validação.

---

## Reutilização

Antes de criar qualquer componente.

Perguntar.

Existe algo semelhante já implementado?

---

# 3. Ordem de Consulta da Documentação

Antes de implementar qualquer funcionalidade, a IA deverá consultar.

1. Vision

↓

2. Methodology

↓

3. PRD

↓

4. Architecture

↓

5. Business Rules

↓

6. Content Library

↓

7. Assessment Engine

↓

8. Data Model

↓

9. API Contracts

↓

10. Storage Model

↓

11. Prisma Mapping

↓

12. Implementation Guide

Se existir conflito entre documentos.

Prevalece o documento de maior nível.

---

# 4. Restrições

A IA nunca deverá.

✖ Criar entidades não documentadas.

✖ Alterar a metodologia.

✖ Alterar regras de negócio.

✖ Inventar endpoints.

✖ Criar tabelas adicionais.

✖ Criar lógica fora das Engines.

✖ Duplicar código.

✖ Ignorar contratos.

✖ Ignorar Design System.

---

# 5. Regras para Implementação

Antes de escrever código, a IA deverá validar.

- Qual problema será resolvido?
- Existe documentação para isso?
- Existe componente reutilizável?
- Existe regra de negócio relacionada?
- Existe contrato de API correspondente?
- Existe entidade oficial?

Caso qualquer resposta seja negativa.

A implementação deverá ser interrompida.

---

# 6. Organização do Código

Toda implementação deverá respeitar a estrutura oficial do projeto, definida em 13_DECISION_LOG.md (DEC-0004) e detalhada em 07E_IMPLEMENTATION_GUIDE.md, Seção 5.

```text
src/

app/

features/

core/

shared/

infrastructure/

providers/

config/

styles/

middleware/

tests/
```

`core/` concentra Domain Model, Business Rules, Engines, Content Access, Contracts e Errors — nunca depende de React, Next.js ou Infrastructure, e nunca é aninhado dentro de uma Feature.

Nenhum arquivo deverá ser criado fora dessa estrutura sem justificativa.

---

# 7. Regras para Componentes

Todo componente deverá.

✔ Possuir responsabilidade única.

✔ Ser reutilizável.

✔ Possuir tipagem.

✔ Possuir testes quando aplicável.

Nunca misturar.

- interface;
- regra de negócio;
- acesso a dados.

---

# 8. Regras para Engines

Cada Engine deverá possuir.

Entrada definida.

↓

Processamento.

↓

Saída definida.

Nenhuma Engine poderá acessar diretamente.

- componentes React;
- banco de dados;
- interface.

---

# 9. Regras para API

Toda API deverá.

Seguir os contratos definidos em.

07B_API_CONTRACTS.md

Nunca retornar estruturas diferentes.

Toda resposta deverá possuir.

```json
{
  "success": true,
  "data": {},
  "meta": {}
}
```

Ou.

```json
{
  "success": false,
  "error": {},
  "meta": {}
}
```

---

# 10. Regras para Banco de Dados

Toda persistência deverá respeitar.

07C_STORAGE_MODEL.md

07D_PRISMA_MAPPING.md

Nunca criar tabelas não documentadas.

---

# 11. Regras para Testes

Antes de concluir uma implementação.

A IA deverá verificar.

- Tipagem.
- Build.
- Lint.
- Testes.
- Contratos.
- Performance.

---

# 12. Checklist Obrigatório

Antes de finalizar qualquer tarefa.

- A documentação foi consultada?
- O código segue a arquitetura?
- Existe duplicação?
- Existe componente reutilizável?
- Os contratos foram respeitados?
- O código é simples?
- A funcionalidade possui testes?
- O comportamento segue as Business Rules?

Se qualquer resposta for negativa.

A tarefa não deverá ser considerada concluída.

---

# 13. Processo de Implementação

Toda funcionalidade deverá seguir o fluxo.

```text
Ler documentação

↓

Planejar

↓

Implementar

↓

Testar

↓

Revisar

↓

Documentar

↓

Commit
```

Nunca inverter essa ordem.

---

# 14. Critérios de Qualidade

Todo código produzido por IA deverá.

✓ Compilar.

✓ Passar no lint.

✓ Passar nos testes.

✓ Seguir a arquitetura.

✓ Ser legível.

✓ Ser reutilizável.

✓ Ser documentado.

---

# 15. Critérios de Recusa

A IA deverá recusar implementar quando.

- A documentação estiver inconsistente.
- Existirem requisitos conflitantes.
- Faltarem regras de negócio.
- O pedido violar a arquitetura oficial.
- A implementação exigir decisões ainda não documentadas.

Nesses casos, deverá solicitar esclarecimentos antes de continuar.

---

# 16. Processo de Revisão

Antes de considerar uma implementação concluída, a IA deverá realizar uma autoavaliação.

### Arquitetura

- A solução respeita a Clean Architecture?
- As responsabilidades estão separadas?

### Domínio

- O comportamento segue a Methodology?
- As Business Rules foram respeitadas?

### Código

- Existe duplicação?
- Os nomes são claros?
- A tipagem está completa?

### Performance

- Há processamento desnecessário?
- Existem consultas repetidas?
- Há oportunidade de simplificação?

---

# 17. Compatibilidade entre Agentes

Todos os agentes de IA utilizados no projeto deverão seguir este documento.

Exemplos.

- ChatGPT
- Claude
- GitHub Copilot
- Cursor
- Windsurf
- Continue.dev

Independentemente da ferramenta, as regras permanecem as mesmas.

---

# 18. Evolução do Documento

Este Charter poderá evoluir conforme o projeto crescer.

Toda alteração deverá.

- ser documentada;
- possuir versão;
- ser revisada;
- manter compatibilidade com os documentos anteriores.

---

# 19. Critérios de Aceite

O AI Development Charter será considerado aprovado quando.

✓ Qualquer agente de IA conseguir implementar funcionalidades seguindo apenas a documentação oficial.

✓ O código gerado permanecer consistente entre diferentes agentes.

✓ As decisões técnicas permanecerem alinhadas ao domínio da NEXO.

---

# 20. Princípio Supremo

Nenhuma Inteligência Artificial possui autonomia para definir a arquitetura da NEXO.

A arquitetura pertence à documentação.

A metodologia pertence ao produto.

A IA existe para implementar essas decisões com qualidade, consistência e previsibilidade.
