# DEFINITION OF READY

**Projeto:** NEXO Platform
**Documento:** 09A_DEFINITION_OF_READY.md
**Versão:** 1.0
**Status:** Approved
**Última atualização:** 03/08/2026

---

# 1. Objetivo

Este documento define os critérios oficiais para que uma demanda possa iniciar seu desenvolvimento na plataforma NEXO.

Seu objetivo é garantir que nenhuma implementação seja iniciada sem informações suficientes, reduzindo retrabalho, inconsistências e decisões baseadas em suposições.

Toda tarefa deverá estar "Ready" antes de ser iniciada.

---

# 2. Princípios

Uma tarefa somente poderá iniciar quando.

- possuir objetivo claro;
- possuir escopo definido;
- possuir documentação suficiente;
- possuir critérios de aceite;
- possuir dependências resolvidas.

Nenhuma implementação deverá iniciar baseada apenas em uma ideia.

---

# 3. Conceito de Ready

Uma tarefa é considerada "Ready" quando todas as informações necessárias para sua implementação estão disponíveis.

Isso inclui.

- entendimento do problema;
- comportamento esperado;
- documentação relacionada;
- regras de negócio;
- critérios de validação.

---

# 4. Critérios Obrigatórios

## 4.1 Objetivo

Toda tarefa deverá responder.

- Qual problema será resolvido?
- Qual valor será entregue?
- Quem será impactado?

---

## 4.2 Escopo

O escopo deverá estar claramente definido.

Deve informar.

- o que será implementado;
- o que não será implementado.

Evitar escopos abertos.

---

## 4.3 Documentação

Toda documentação necessária deverá existir.

Exemplos.

- Vision
- Methodology
- PRD
- Business Rules
- Assessment Engine
- Data Model
- API Contracts

Caso algum documento esteja ausente.

A tarefa não poderá iniciar.

---

## 4.4 Critérios de Aceite

Toda tarefa deverá possuir critérios verificáveis.

Exemplo.

✓ O usuário consegue concluir a avaliação.

✓ O relatório é gerado corretamente.

Evitar critérios subjetivos.

---

## 4.5 Dependências

Todas as dependências deverão estar concluídas.

Exemplo.

Assessment Engine depende de.

- Business Rules.
- Content Library.
- Data Model.

---

## 4.6 Arquitetura

Toda implementação deverá possuir direção arquitetural clara.

A tarefa deverá informar.

- módulos envolvidos;
- componentes impactados;
- entidades utilizadas.

---

## 4.7 Dados

Sempre identificar.

- entidades utilizadas;
- contratos;
- persistência;
- integrações.

---

## 4.8 Riscos

Toda tarefa deverá identificar possíveis riscos.

Exemplos.

- mudança estrutural;
- impacto em APIs;
- alteração de contratos;
- impacto em performance.

---

# 5. Checklist Oficial

Antes de iniciar qualquer implementação.

## Produto

✓ Existe requisito?

✓ Existe objetivo?

✓ Existe escopo?

---

## Arquitetura

✓ Existe documentação?

✓ Existe entidade?

✓ Existe fluxo definido?

---

## Dados

✓ Existe contrato?

✓ Existe modelo de dados?

✓ Existe regra de negócio?

---

## Desenvolvimento

✓ Dependências concluídas?

✓ Critérios de aceite definidos?

✓ Não existem dúvidas abertas?

---

# 6. Critérios por Tipo de Trabalho

## Nova Funcionalidade

Obrigatório.

- PRD
- Business Rules
- Critérios de Aceite

---

## Bug

Obrigatório.

- reprodução;
- impacto;
- hipótese inicial.

---

## Refatoração

Obrigatório.

- justificativa;
- comportamento preservado.

---

## Banco de Dados

Obrigatório.

- Data Model;
- Storage Model;
- Prisma Mapping.

---

## API

Obrigatório.

- API Contracts;
- regras de negócio.

---

## Documentação

Obrigatório.

- documentos impactados;
- versão;
- motivo da alteração.

---

# 7. Matriz de Responsabilidades

| Item | Responsável |
|-------|-------------|
| Objetivo | Product Engineer |
| Arquitetura | Software Architect |
| Dados | Data Engineer |
| API | Backend Engineer |
| Interface | Frontend Engineer |
| Testes | QA Engineer |
| Documentação | Technical Writer |
| Validação Final | AI Reviewer |

---

# 8. Fluxo Oficial

```text
Ideia

↓

Análise

↓

Documentação

↓

Escopo

↓

Critérios de Aceite

↓

Validação Arquitetural

↓

Ready

↓

Implementação
```

Nenhuma etapa poderá ser ignorada.

---

# 9. Situações que Bloqueiam o Início

Uma tarefa NÃO poderá iniciar quando.

✖ O requisito estiver incompleto.

✖ Existirem dúvidas de negócio.

✖ A documentação estiver desatualizada.

✖ Os contratos não estiverem definidos.

✖ As dependências não estiverem concluídas.

✖ Não existirem critérios de aceite.

---

# 10. Métricas

Registrar para cada tarefa.

- data de criação;
- data em que ficou Ready;
- tempo até implementação;
- documentos utilizados;
- dependências;
- riscos identificados.

Essas métricas permitirão melhorar o processo continuamente.

---

# 11. Integração com IA

Antes de qualquer implementação, a IA deverá validar.

✓ O Context Pack correto foi carregado.

✓ A documentação está atualizada.

✓ Todos os documentos obrigatórios foram consultados.

✓ Não existem conflitos entre documentos.

Caso qualquer item falhe.

A implementação deverá ser interrompida.

---

# 12. Critérios de Aceite

Uma tarefa será considerada "Ready" quando.

✓ Objetivo definido.

✓ Escopo fechado.

✓ Documentação completa.

✓ Dependências concluídas.

✓ Critérios de aceite definidos.

✓ Arquitetura validada.

✓ Não existirem dúvidas abertas.

---

# 13. Princípio Supremo

Nenhuma funcionalidade deverá iniciar sem contexto suficiente.

Investir tempo preparando uma tarefa reduz retrabalho, aumenta a qualidade da implementação e garante que o código seja uma representação fiel da documentação oficial da NEXO.
