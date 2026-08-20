# ARCHITECTURE PATTERNS

**Projeto:** NEXO Platform
**Documento:** 12B_ARCHITECTURE_PATTERNS.md
**Versão:** 1.0
**Status:** Approved
**Última atualização:** 03/08/2026

---

# 1. Objetivo

Este documento define os padrões arquiteturais oficiais da plataforma NEXO.

Seu objetivo é garantir que toda solução implementada siga os mesmos princípios arquiteturais, reduzindo acoplamento, aumentando reutilização e facilitando a evolução da plataforma.

Este documento complementa.

- 02_ARCHITECTURE.md
- 06_ASSESSMENT_ENGINE.md
- 07_DATA_MODEL.md
- 07E_IMPLEMENTATION_GUIDE.md
- 12A_DEVELOPMENT_STANDARDS.md

---

# 2. Princípios

Toda solução deverá.

- possuir responsabilidade única;
- ser desacoplada;
- ser testável;
- ser reutilizável;
- ser orientada ao domínio;
- minimizar dependências.

Arquitetura sempre possui prioridade sobre conveniência.

---

# 3. Arquitetura Oficial

A plataforma utiliza uma arquitetura baseada em camadas.

```text
Presentation

↓

Application

↓

Domain

↓

Infrastructure
```

Cada camada possui responsabilidades bem definidas.

---

# 4. Camada Presentation

Responsável por.

- Interface do usuário.
- Componentes React.
- Navegação.
- Estado visual.

Nunca deverá conter.

- regras de negócio;
- acesso direto ao banco;
- algoritmos da Assessment Engine.

---

# 5. Camada Application

Responsável por.

- Casos de uso.
- Orquestração.
- Fluxos.
- Coordenação entre módulos.

Pode consumir.

- Domain.
- Infrastructure.

Nunca deverá conhecer detalhes da interface.

---

# 6. Camada Domain

Representa o núcleo da NEXO.

Contém.

- Entidades.
- Value Objects.
- Engines.
- Regras de domínio.
- Contratos.

O domínio nunca dependerá de frameworks.

---

# 7. Camada Infrastructure

Responsável por.

- Prisma.
- PostgreSQL.
- APIs externas.
- Armazenamento.
- Logging.
- Arquivos.

Nunca deverá conter regras de negócio.

---

# 8. Padrões Obrigatórios

## Single Responsibility Principle

Cada módulo deverá resolver apenas um problema.

---

## Dependency Inversion

Componentes dependerão de abstrações.

Nunca de implementações concretas.

---

## Composition over Inheritance

Sempre preferir composição.

---

## Imutabilidade

Sempre que possível utilizar objetos imutáveis.

---

## Pure Functions

A Assessment Engine deverá utilizar funções puras.

---

# 9. Padrões Recomendados

## Strategy Pattern

Utilizar quando existirem múltiplos algoritmos para o mesmo objetivo.

Exemplos.

- Cálculo de Score.
- Seleção de Arquétipos.
- Geração de Relatórios.

---

## Factory Pattern

Utilizar para criação de objetos complexos.

Exemplos.

- AssessmentResult.
- Reports.
- EvolutionPlan.

---

## Adapter Pattern

Utilizar para integrar serviços externos.

Exemplos.

- APIs.
- IA.
- Serviços de PDF.

---

## Repository Pattern

Utilizar para acesso ao banco de dados.

A camada de domínio nunca acessará o ORM diretamente.

---

## Mapper Pattern

Converter entre.

- Domain Model.
- Storage Model.
- API Contracts.

---

# 10. Padrões Opcionais

Podem ser utilizados quando houver justificativa.

- Builder Pattern.
- Facade.
- Command.
- Mediator.
- Observer (para eventos internos).

Toda adoção deverá ser registrada no Decision Log.

---

# 11. Padrões Proibidos

Nunca utilizar.

- God Objects.
- Classes gigantes.
- Services com múltiplas responsabilidades.
- Dependências circulares.
- Singleton global para regras de negócio.
- Lógica duplicada.
- Acoplamento direto entre UI e banco.

---

# 12. Engines

Toda Engine deverá seguir.

```text
Input

↓

Validation

↓

Processing

↓

Output
```

Uma Engine nunca chamará outra diretamente sem uma camada de orquestração.

---

# 13. Services

Services deverão apenas.

- orquestrar;
- integrar;
- coordenar.

Nunca implementar regras de domínio.

---

# 14. Repositories

Todo acesso ao banco deverá ocorrer através de Repositories.

Exemplo.

```text
AssessmentRepository

QuestionRepository

ResultRepository
```

Nenhuma Engine acessará Prisma diretamente.

---

# 15. Mappers

Todo dado deverá passar por Mappers quando mudar de camada.

```text
Prisma

↓

Storage Model

↓

Domain Model

↓

API Contract

↓

Frontend
```

Nunca expor entidades de persistência diretamente.

---

# 16. Casos de Uso (Use Cases)

Toda funcionalidade deverá possuir um caso de uso explícito.

Exemplos.

- StartAssessment
- SubmitAssessment
- GenerateReport
- GetAssessmentHistory

Os casos de uso representam a entrada da camada de aplicação.

---

# 17. Eventos de Domínio

Eventos de domínio poderão ser utilizados para desacoplar processos internos.

Exemplos.

- AssessmentCompleted
- ReportGenerated
- EvolutionPlanCreated

Eventos nunca deverão conter lógica de negócio.

---

# 18. Escalabilidade

Toda solução deverá permitir.

- novos tipos de Assessment;
- novos Arquétipos;
- novos Relatórios;
- novos idiomas;
- novos algoritmos.

Sem alterações estruturais.

---

# 19. Anti-Patterns

Evitar.

✖ Lógica duplicada.

✖ Condições excessivas.

✖ Objetos anêmicos.

✖ Dependências implícitas.

✖ Acoplamento entre módulos.

✖ Frameworks dentro do domínio.

---

# 20. Checklist Arquitetural

Antes de concluir uma implementação.

✓ Existe responsabilidade única?

✓ Existe baixo acoplamento?

✓ Existe alta coesão?

✓ O domínio permanece independente?

✓ Os padrões oficiais foram respeitados?

✓ O código é testável?

✓ Existe reutilização?

---

# 21. Critérios de Aceite

Este documento será considerado aprovado quando.

✓ Os padrões arquiteturais estiverem claramente definidos.

✓ Os limites entre camadas forem respeitados.

✓ O domínio permanecer independente de tecnologias.

✓ As implementações seguirem uma arquitetura consistente.

---

# 22. Princípio Supremo

A arquitetura da NEXO deverá evoluir por extensão e não por modificação.

Novas funcionalidades deverão integrar-se aos padrões existentes, preservando a simplicidade, a previsibilidade e a sustentabilidade da plataforma ao longo do tempo.
