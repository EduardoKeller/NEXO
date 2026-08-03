# DEFINITION OF DONE

**Projeto:** NEXO Platform  
**Documento:** 09_DEFINITION_OF_DONE.md  
**Versão:** 1.0  
**Status:** Approved  
**Última atualização:** 03/08/2026

---

# 1. Objetivo

Este documento define os critérios oficiais para considerar uma tarefa, funcionalidade ou entrega como concluída na plataforma NEXO.

Seu objetivo é garantir que toda entrega possua qualidade consistente, seja verificável e esteja alinhada à arquitetura, metodologia e documentação do projeto.

Nenhuma atividade poderá ser considerada concluída sem atender aos critérios deste documento.

---

# 2. Princípios

Toda entrega deverá ser.

- Completa
- Testada
- Documentada
- Revisada
- Reproduzível
- Alinhada à arquitetura

Não existe conceito de "quase pronta".

---

# 3. Definition of Ready (DoR)

Antes de iniciar qualquer tarefa, deverá existir.

✓ Objetivo claro.

✓ Critérios de aceite definidos.

✓ Documentação relacionada disponível.

✓ Dependências concluídas.

✓ Escopo compreendido.

Caso algum item esteja ausente.

A tarefa não deverá iniciar.

---

# 4. Definition of Done (DoD)

Uma tarefa será considerada concluída apenas quando atender TODOS os critérios abaixo.

---

## 4.1 Implementação

✓ Código implementado.

✓ Segue a arquitetura oficial.

✓ Não existe duplicação desnecessária.

✓ Componentes reutilizados sempre que possível.

✓ Tipagem completa (TypeScript Strict).

✓ Nenhum TODO crítico pendente.

---

## 4.2 Qualidade do Código

✓ Código legível.

✓ Responsabilidade única.

✓ Nomes claros.

✓ Funções pequenas.

✓ Componentes desacoplados.

✓ Sem lógica de negócio na interface.

---

## 4.3 Arquitetura

✓ Respeita Clean Architecture.

✓ Respeita DDD.

✓ Respeita SOLID.

✓ Respeita Assessment Engine.

✓ Respeita API Contracts.

✓ Respeita Business Rules.

---

## 4.4 Testes

✓ Testes unitários criados.

✓ Casos de erro testados.

✓ Casos limite testados.

✓ Fluxo principal validado.

✓ Cobertura adequada.

---

## 4.5 Build

✓ Projeto compila.

✓ Lint aprovado.

✓ Type Check aprovado.

✓ Build aprovado.

---

## 4.6 Performance

✓ Não introduziu regressões.

✓ Não adicionou processamento desnecessário.

✓ Componentes renderizam corretamente.

✓ Lighthouse permanece dentro das metas.

---

## 4.7 Segurança

✓ Entradas validadas.

✓ Nenhuma informação sensível exposta.

✓ APIs protegidas.

✓ Dependências verificadas.

✓ Sem vulnerabilidades conhecidas.

---

## 4.8 Documentação

✓ Documentação atualizada.

✓ Changelog atualizado (quando aplicável).

✓ Diagramas revisados (quando aplicável).

✓ Contratos atualizados (quando aplicável).

✓ Comentários relevantes adicionados.

---

## 4.9 Revisão

✓ Revisão técnica concluída.

✓ AI Reviewer aprovou.

✓ Critérios de aceite atendidos.

---

# 5. Checklist Oficial

Antes de concluir qualquer tarefa.

## Produto

- O requisito foi atendido?
- O comportamento segue o PRD?
- As Business Rules foram respeitadas?

---

## Código

- Existe duplicação?
- O código pode ser simplificado?
- Os nomes são claros?
- A tipagem está completa?

---

## Arquitetura

- Segue a estrutura oficial?
- Respeita o Domain Model?
- Respeita os contratos?

---

## Testes

- Todos passaram?
- Os casos críticos estão cobertos?

---

## Documentação

- Está sincronizada com o código?
- Existe algum documento que precisa ser atualizado?

---

# 6. Critérios por Tipo de Entrega

## Nova Funcionalidade

Obrigatório.

- Código
- Testes
- Documentação
- Review

---

## Correção de Bug

Obrigatório.

- Causa raiz identificada.
- Correção implementada.
- Teste de regressão.

---

## Refatoração

Obrigatório.

- Mesmo comportamento.
- Melhor estrutura.
- Todos os testes aprovados.

---

## Banco de Dados

Obrigatório.

- Migration.
- Validação.
- Documentação.
- Revisão.

---

## API

Obrigatório.

- Contratos respeitados.
- Testes.
- Documentação.

---

## Design System

Obrigatório.

- Componente reutilizável.
- Acessibilidade.
- Responsividade.

---

# 7. Critérios Automáticos

Antes de qualquer merge deverão ser aprovados automaticamente.

✓ Lint

✓ Type Check

✓ Build

✓ Testes

Caso qualquer um falhe.

O merge deverá ser bloqueado.

---

# 8. Critérios Humanos

Antes da aprovação final.

✓ Revisão arquitetural.

✓ Revisão funcional.

✓ Revisão documental.

---

# 9. Não é considerado "Done"

Uma tarefa NÃO poderá ser marcada como concluída quando.

✖ Existem testes falhando.

✖ Existe documentação desatualizada.

✖ Existem regras não documentadas.

✖ Existem erros conhecidos sem registro.

✖ Existe código comentado sem justificativa.

✖ Existem decisões arquiteturais pendentes.

---

# 10. Métricas

Toda entrega deverá registrar.

- Tempo de desenvolvimento.
- Arquivos alterados.
- Documentos impactados.
- Cobertura de testes.
- Tipo de alteração.

Essas métricas servirão para melhoria contínua do processo.

---

# 11. Fluxo Oficial

```text
Definition of Ready

↓

Planejamento

↓

Implementação

↓

Testes

↓

Documentação

↓

Review

↓

Validação

↓

Definition of Done

↓

Merge

↓

Deploy
```

---

# 12. Critérios de Aceite

Este documento será considerado aprovado quando.

✓ Todos os tipos de entrega possuírem critérios claros.

✓ Não existirem ambiguidades sobre o conceito de "concluído".

✓ O processo puder ser seguido por desenvolvedores e agentes de IA.

---

# 13. Princípio Supremo

Uma funcionalidade só está pronta quando entrega valor ao usuário, atende aos requisitos do produto, respeita a arquitetura da NEXO e pode ser mantida com segurança no futuro.

Código funcionando não significa código concluído.
