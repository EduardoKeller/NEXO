# SYSTEM ARCHITECTURE

**Projeto:** NEXO Platform  
**Documento:** 02_ARCHITECTURE.md  
**Versão:** 2.0  
**Status:** Draft (Sprint 0 Review)  
**Última atualização:** 01/08/2026

---

# 1. Objetivo

Este documento define a arquitetura oficial da plataforma NEXO.

Seu objetivo é garantir que toda implementação siga uma estrutura consistente, escalável e independente de tecnologia específica.

Toda decisão arquitetural deverá respeitar este documento.

---

# 2. Filosofia

A arquitetura da NEXO foi projetada seguindo cinco princípios fundamentais.

## 1. Mobile First

Toda experiência será projetada inicialmente para smartphones.

Desktop representa apenas uma adaptação.

---

## 2. Content Driven

A lógica da plataforma deverá consumir conteúdos oficiais da Content Library.

Nenhum texto deverá ser criado diretamente na interface.

---

## 3. Engine Based

Toda regra de negócio deverá existir dentro das Engines.

A interface nunca deverá executar regras complexas.

---

## 4. Modularidade

Cada módulo deverá possuir uma única responsabilidade.

Nenhum módulo poderá assumir responsabilidades de outro.

---

## 5. Evolução Contínua

Toda arquitetura deverá permitir expansão futura sem reescrita estrutural.

---

# 3. Visão Geral

A NEXO é composta por cinco camadas principais.

Presentation Layer

↓

Application Layer

↓

Domain Layer

↓

Content Layer

↓

Infrastructure Layer

Cada camada possui responsabilidades específicas.

---

# 4. Presentation Layer

Responsável pela interação com o usuário.

Componentes:

- Landing Page
- Assessment
- Resultado
- Plano de Evolução
- Relatório
- Componentes Visuais

Esta camada nunca deverá realizar cálculos.

---

# 5. Application Layer

Responsável pela orquestração da plataforma.

Ela contém o **NEXO Core**.

O NEXO Core é composto pelos seguintes módulos.

- Assessment Engine
- Validation Engine
- Score Engine
- Behavior Engine
- Insight Engine
- Evolution Engine
- Report Engine
- Result Builder

Cada módulo possui responsabilidade única.

---

# 6. Domain Layer

Representa as regras centrais da plataforma.

Contém:

- Business Rules
- Data Model
- Algoritmos
- Critérios de Pontuação
- Regras de Evolução

Nenhum componente visual poderá depender diretamente desta camada.

---

# 7. Content Layer

Representa o conhecimento oficial da plataforma.

Contém:

- Perguntas
- Dimensões
- Indicadores
- Perfis
- Recomendações
- Exercícios
- Missões
- Relatórios
- Landing Content

Toda comunicação deverá ser originada desta camada.

---

# 8. Infrastructure Layer

Responsável por serviços externos.

Inclui:

- Vercel
- Geração de PDF
- Analytics
- Armazenamento
- APIs futuras

Esta camada nunca deverá conter regras de negócio.

---

# 9. NEXO Journey

Toda experiência da plataforma seguirá a jornada oficial.

Landing

↓

Assessment

↓

Behavior Analysis

↓

Insights

↓

Behavior Archetype

↓

Evolution Plan

↓

Personalized Report

↓

Mission

↓

Next Step

Cada etapa deverá entregar valor ao usuário.

---

# 10. Fluxo da Assessment

1. Usuário inicia a avaliação.

↓

2. Assessment Engine recebe as respostas.

↓

3. Validation Engine valida os dados.

↓

4. Score Engine calcula as pontuações.

↓

5. Behavior Engine interpreta os indicadores.

↓

6. Insight Engine gera observações.

↓

7. Evolution Engine seleciona o plano de evolução.

↓

8. Report Engine monta o relatório.

↓

9. Result Builder consolida todas as informações.

↓

10. Interface apresenta o resultado.

---

# 11. Engines Oficiais

## Assessment Engine

Orquestra todo o processo.

---

## Validation Engine

Valida perguntas, respostas e estrutura.

---

## Score Engine

Calcula pontuações.

Não conhece textos.

Não conhece componentes.

---

## Behavior Engine

Transforma pontuação em padrões comportamentais.

Retorna apenas dados.

---

## Insight Engine

Interpreta os resultados.

Gera:

- insights;
- observações;
- oportunidades de evolução.

Nunca altera pontuações.

---

## Evolution Engine

Seleciona:

- plano de evolução;
- hábitos;
- exercícios;
- checklist;
- recursos;
- missões.

---

## Report Engine

Constrói o relatório personalizado.

---

## Result Builder

Agrupa todos os resultados em um único objeto.

---

# 12. Fluxo de Dados

Presentation Layer

↓

Assessment Engine

↓

Validation Engine

↓

Score Engine

↓

Behavior Engine

↓

Insight Engine

↓

Evolution Engine

↓

Report Engine

↓

Result Builder

↓

Presentation Layer

---

# 13. Dependências

As Engines dependem apenas de:

- Business Rules
- Data Model
- Content Library

Nunca deverão depender de:

- React
- Next.js
- Tailwind
- Componentes Visuais

---

# 14. Princípios Técnicos

Toda implementação deverá seguir:

- SOLID
- Clean Architecture
- Separation of Concerns
- Dependency Inversion
- Single Responsibility
- Composition over Inheritance

---

# 15. Escalabilidade

A arquitetura deverá permitir:

- novas avaliações;
- novos algoritmos;
- novos idiomas;
- novos perfis;
- novos relatórios;
- novos módulos;
- novas integrações.

Sem alterar a estrutura principal.

---

# 16. Segurança

Toda entrada deverá ser validada.

Nenhuma regra de negócio poderá ser executada exclusivamente no frontend.

Dados sensíveis nunca deverão ser expostos.

---

# 17. Performance

Objetivos mínimos.

Primeira renderização:

< 2 segundos

Processamento da Assessment:

< 300 ms

Geração do resultado:

< 500 ms

PDF:

< 2 segundos

---

# 18. Observabilidade

Registrar eventos técnicos.

Exemplos:

- Assessment iniciada
- Assessment concluída
- Erro de validação
- PDF gerado

Nunca registrar respostas pessoais em logs.

---

# 19. Preparação para Evolução

A arquitetura já deverá suportar futuramente:

- IA personalizada;
- múltiplas Assessments;
- gamificação;
- histórico de evolução;
- comunidade;
- API pública;
- aplicativo móvel;
- White Label.

Nenhuma dessas funcionalidades deverá exigir alteração estrutural.

---

# 20. Critérios de Aceite

A arquitetura será considerada aprovada quando:

✓ Todas as responsabilidades estiverem separadas.

✓ Toda regra de negócio estiver nas Engines.

✓ Toda comunicação vier da Content Library.

✓ O frontend apenas consumir resultados.

✓ O sistema permitir expansão sem refatoração estrutural.

✓ Toda documentação estiver consistente com este documento.
