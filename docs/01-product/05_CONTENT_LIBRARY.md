# CONTENT LIBRARY
## Official Knowledge Base

**Projeto:** NEXO Platform
**Documento:** 05_CONTENT_LIBRARY.md
**Versão:** 2.1
**Status:** Draft (Sprint 0 Review)
**Última atualização:** 04/08/2026

---

# 1. Objetivo

A Content Library representa a Base Oficial de Conhecimento (Official Knowledge Base) da plataforma NEXO.

Todo conteúdo apresentado ao usuário deverá possuir origem nesta biblioteca.

A plataforma nunca deverá conter textos, interpretações ou recomendações fixas diretamente na interface ou no código.

Todo conhecimento deverá ser centralizado, versionado e reutilizável.

Esta biblioteca alimenta:

- Landing Pages;
- Avaliações;
- Assessment Engine;
- Behavior Engine;
- Insight Engine;
- Evolution Engine;
- Missões;
- Recursos;
- Relatórios;
- Inteligência Artificial;
- APIs futuras.

Ela representa a única fonte oficial de conhecimento da plataforma.

---

# 2. Filosofia Editorial

Toda informação produzida pela NEXO deverá respeitar os princípios definidos na Vision, na Methodology e nas Brand Guidelines.

A comunicação deverá ser educativa, clara e orientada para evolução.

Nunca deverá:

- julgar pessoas;
- rotular usuários;
- utilizar linguagem clínica;
- prometer resultados imediatos;
- utilizar gatilhos de medo ou culpa.

O conhecimento existe para gerar compreensão.

A compreensão existe para gerar ação.

A ação existe para gerar evolução.

---

# 3. Princípios da Base de Conhecimento

Toda informação cadastrada deverá seguir estes princípios.

## Clareza

O usuário deve compreender qualquer conteúdo sem conhecimento técnico.

---

## Neutralidade

Nenhum comportamento é considerado melhor ou pior.

Todo padrão possui vantagens e limitações.

---

## Consistência

A mesma informação deverá possuir exatamente o mesmo significado em toda a plataforma.

Não poderão existir versões diferentes do mesmo conceito.

---

## Reutilização

Todo conteúdo deverá ser reutilizável.

Um Insight poderá ser utilizado:

- na página de resultado;
- no relatório;
- em futuras notificações;
- em futuras conversas com IA.

---

## Evolução

Todo conteúdo deverá incentivar uma ação prática.

Nunca apenas informar.

---

# 4. Brand Voice

Toda comunicação deverá transmitir.

- Clareza
- Inteligência
- Calma
- Confiança
- Respeito
- Objetividade

Nunca deverá transmitir.

- culpa;
- urgência artificial;
- exagero;
- superioridade;
- julgamento.

---

# 5. UX Writing

Toda mensagem deverá responder pelo menos uma das perguntas abaixo.

O que aconteceu?

O que isso significa?

O que posso fazer agora?

Caso nenhuma dessas perguntas seja respondida, o conteúdo deverá ser revisado.

---

## Exemplos

❌ Você procrastina muito.

✔ Seus resultados indicam uma tendência a adiar determinadas tarefas em alguns contextos.

---

❌ Você está errado.

✔ Existem oportunidades para fortalecer esse comportamento.

---

❌ Você precisa mudar.

✔ Pequenas mudanças consistentes costumam gerar melhores resultados.

---

Toda comunicação deverá transmitir segurança.

Nunca culpa.

---

# 6. Knowledge Architecture

Todo conhecimento da plataforma deverá seguir esta estrutura.

Knowledge Base

↓

Assessments

↓

Dimensions

↓

Indicators

↓

Questions

↓

Answers

↓

Scores

↓

Behavior Analysis

↓

Behavior Indexes

↓

Behavior Archetypes

↓

Insights

↓

Evolution Plans

↓

Missions

↓

Resources

↓

Reports

Cada nível possui uma responsabilidade específica.

Nenhuma camada deverá assumir responsabilidades pertencentes a outra.

---

# 7. Organização da Base de Conhecimento

A Knowledge Base será organizada pelos seguintes domínios.

## Assessment Library

Define todas as Avaliações disponíveis.

---

## Dimension Library

Define as dimensões comportamentais.

---

## Indicator Library

Define os indicadores observáveis.

---

## Question Library

Define todas as perguntas oficiais.

---

## Archetype Library

Define todos os Arquétipos Comportamentais.

---

## Insight Library

Define todos os Insights disponíveis.

---

## Evolution Library

Define os Planos de Evolução.

---

## Mission Library

Define todas as Missões.

---

## Resource Library

Define artigos, vídeos, livros, podcasts e demais recursos gratuitos.

---

## Recommendation Library

Define como recursos, missões e exercícios serão recomendados.

---

## Report Library

Define a estrutura oficial dos relatórios.

---

## Landing Library

Define os blocos reutilizáveis das Landing Pages.

---

## CTA Library

Define chamadas para ação.

---

## FAQ Library

Define perguntas frequentes.

---

## System Messages

Define todas as mensagens exibidas pela plataforma.

---

# 8. Regras Gerais

Todo conteúdo deverá possuir.

- identificador único;
- título;
- descrição;
- versão;
- idioma;
- status;
- data de atualização.

Nenhum conteúdo deverá existir sem identificação.

---

# 9. Versionamento

Toda alteração deverá incrementar a versão do conteúdo.

Nunca substituir informações sem histórico.

O objetivo é permitir rastreabilidade completa da evolução da plataforma.

---

# 10. Internacionalização

Toda estrutura da Knowledge Base deverá ser independente de idioma.

O conteúdo poderá existir em múltiplos idiomas utilizando o mesmo identificador.

Exemplo.

assessment.procrastination.v1

pt-BR

en-US

es-ES

Sem duplicar regras de negócio.

---

# 11. Critérios de Qualidade

Todo conteúdo deverá ser.

✔ Claro.

✔ Objetivo.

✔ Consistente.

✔ Reutilizável.

✔ Escalável.

✔ Versionado.

✔ Alinhado à metodologia.

---

# 12. Princípio Supremo

A Content Library representa o patrimônio intelectual da NEXO.

Todo conhecimento produzido pela plataforma deverá nascer aqui.

Nenhuma informação deverá existir apenas no código ou na interface.

A documentação é a fonte oficial da verdade.

# PARTE 2 — Assessment Library, Dimension Library e Indicator Library

---

# 13. Assessment Library

A Assessment Library define todas as Avaliações disponíveis na plataforma.

Cada Assessment representa um instrumento estruturado para observar comportamentos específicos.

Uma Assessment nunca deverá conter regras de cálculo.

Ela apenas descreve:

- objetivo;
- público;
- dimensões;
- indicadores;
- perguntas;
- versão.

---

## Estrutura Oficial

Cada Assessment deverá possuir.

```yaml
id:
slug:
name:
description:
version:
language:
status:
estimated_time:
question_count:
dimensions:
indicators:
target_audience:
created_at:
updated_at:
```

---

## Assessment Oficial do MVP

```yaml
id: assessment_procrastination_v1

slug: procrastination-assessment

name: Avaliação de Padrões de Produtividade

description: >
Avaliação destinada a identificar padrões comportamentais relacionados
à execução, organização, planejamento e consistência.

version: 1.0

status: Active

estimated_time: 3 minutos

question_count: 10

dimensions:
- initiative
- planning
- pressure
- distraction
- consistency
```

---

# Regras

Uma Assessment deverá possuir.

✔ Pelo menos uma Dimensão.

✔ Pelo menos um Indicador.

✔ Perguntas suficientes para gerar resultados confiáveis.

✔ Versionamento.

Nunca alterar uma Assessment já publicada.

Sempre criar uma nova versão.

---

# 14. Dimension Library

As Dimensões representam grandes áreas do comportamento humano.

Cada Dimensão agrupa diversos Indicadores.

As Dimensões nunca deverão medir múltiplos objetivos ao mesmo tempo.

---

## Estrutura Oficial

```yaml
id:
slug:
name:
description:
goal:
indicators:
weight:
version:
status:
```

---

## Dimensão 01

```yaml
id: initiative

slug: initiative

name: Iniciativa

goal: Avaliar a tendência de iniciar tarefas espontaneamente.

weight: 1.0
```

---

## Dimensão 02

```yaml
id: planning

slug: planning

name: Planejamento

goal: Avaliar organização e preparação antes da execução.

weight: 1.0
```

---

## Dimensão 03

```yaml
id: pressure

slug: pressure

name: Gestão da Pressão

goal: Avaliar comportamento diante de prazos e urgências.

weight: 1.0
```

---

## Dimensão 04

```yaml
id: distraction

slug: distraction

name: Gestão da Distração

goal: Avaliar capacidade de manter foco.

weight: 1.0
```

---

## Dimensão 05

```yaml
id: consistency

slug: consistency

name: Consistência

goal: Avaliar manutenção de hábitos e execução contínua.

weight: 1.2
```

---

# Regras

Cada Indicador pertence a apenas uma Dimensão.

Cada Pergunta mede prioritariamente um Indicador.

Dimensões podem possuir pesos diferentes.

---

# 15. Indicator Library

Indicadores representam comportamentos específicos observáveis.

Eles são o verdadeiro objeto medido pela plataforma.

Perguntas poderão mudar.

Indicadores permanecem.

---

## Estrutura Oficial

```yaml
id:
slug:
dimension:
name:
description:
weight:
version:
status:
```

---

# Indicadores da Dimensão Iniciativa

```yaml
- id: initiative_start

  name: Início Espontâneo

  description:
  Mede a facilidade para iniciar tarefas sem pressão externa.
```

```yaml
- id: initiative_decision

  name: Tomada de Decisão

  description:
  Mede a velocidade para decidir iniciar uma atividade.
```

---

# Indicadores da Dimensão Planejamento

```yaml
- id: planning_prioritization

  name: Priorização

  description:
  Mede capacidade de organizar prioridades.
```

```yaml
- id: planning_preparation

  name: Preparação

  description:
  Mede planejamento antes da execução.
```

---

# Indicadores da Dimensão Gestão da Pressão

```yaml
- id: pressure_deadlines

  name: Resposta a Prazos

  description:
  Mede comportamento diante de urgências.
```

```yaml
- id: pressure_stress

  name: Resiliência

  description:
  Mede estabilidade durante pressão.
```

---

# Indicadores da Dimensão Gestão da Distração

```yaml
- id: distraction_focus

  name: Foco

  description:
  Mede capacidade de permanecer concentrado.
```

```yaml
- id: distraction_interruptions

  name: Resistência a Interrupções

  description:
  Mede facilidade para retornar à tarefa principal.
```

---

# Indicadores da Dimensão Consistência

```yaml
- id: consistency_routine

  name: Rotina

  description:
  Mede capacidade de manter hábitos.
```

```yaml
- id: consistency_completion

  name: Conclusão

  description:
  Mede frequência de finalização das tarefas iniciadas.
```

---

# Regras Gerais

Cada Indicador.

✔ Pertence a uma única Dimensão.

✔ Pode possuir diversas Perguntas.

✔ Possui peso próprio.

✔ Pode gerar múltiplos Insights.

✔ Pode influenciar diversos Arquétipos.

---

# Relacionamento

Knowledge Base

↓

Assessment

↓

Dimensions

↓

Indicators

↓

Questions

↓

Answers

↓

Scores

↓

Behavior Indexes

↓

Behavior Archetypes

↓

Insights

↓

Evolution Plans

---

# Critérios de Qualidade

Uma Assessment será considerada válida quando.

✓ Medir comportamentos observáveis.

✓ Utilizar Dimensões oficiais.

✓ Utilizar Indicadores oficiais.

✓ Permitir cálculo dos Índices Comportamentais.

✓ Ser compatível com a Assessment Engine.

---

# Princípio Supremo

A plataforma não mede perguntas.

A plataforma mede Indicadores.

Perguntas existem apenas para coletar evidências sobre esses Indicadores.

Essa separação garante que a metodologia possa evoluir continuamente sem alterar sua estrutura fundamental.

# PARTE 3 — Question Library

---

# 16. Question Library

A Question Library representa o conjunto oficial de perguntas da plataforma NEXO.

As perguntas existem exclusivamente para coletar evidências sobre comportamentos observáveis.

Elas não representam conhecimento permanente.

Podem ser alteradas entre versões sem modificar a metodologia.

---

# Estrutura Oficial

Toda pergunta deverá possuir.

```yaml
id:
version:
status:
dimension:
primary_indicator:
secondary_indicators:
weight:
estimated_time:
title:
description:
alternatives:
created_at:
updated_at:
```

---

# Regras Gerais

Toda pergunta deverá.

✔ Medir um Indicador Principal.

✔ Possuir até dois Indicadores Secundários (opcional).

✔ Possuir exatamente quatro alternativas.

✔ Utilizar linguagem simples.

✔ Não induzir respostas.

✔ Não revelar qual resposta representa determinado comportamento.

✔ Poder ser reutilizada em futuras Assessments.

---

# Alternativas

Cada alternativa deverá possuir.

```yaml
id:
label:
behavior:
score:
```

O mapeamento entre uma alternativa e um Arquétipo nunca é direto. A pontuação de uma alternativa flui apenas para o Indicador e a Dimensão correspondentes; o Arquétipo é determinado posteriormente pelo Archetype Resolver (06_ASSESSMENT_ENGINE.md, Seção 9).

---

# Pergunta 01

```yaml
id: Q001

dimension: Initiative

primary_indicator: initiative_start

secondary_indicators:
- consistency_completion

weight: 1.0

title:
Quando você recebe uma tarefa importante, qual costuma ser sua primeira reação?

alternatives:

A:
Começo o quanto antes.

B:
Planejo bastante antes de iniciar.

C:
Espero sentir mais urgência.

D:
Acabo iniciando outras tarefas antes.
```

---

# Pergunta 02

```yaml
id: Q002

dimension: Planning

primary_indicator: planning_prioritization

title:
Quando possui várias tarefas, normalmente você...

A:
Defino prioridades e sigo uma ordem.

B:
Vou resolvendo conforme aparecem.

C:
Começo pela mais simples.

D:
Tenho dificuldade para decidir por onde começar.
```

---

# Pergunta 03

```yaml
id: Q003

dimension: Pressure

primary_indicator: pressure_deadlines

title:
Como você reage quando o prazo está próximo?

A:
Meu desempenho melhora.

B:
Fico mais ansioso.

C:
Procuro reorganizar tudo.

D:
Acabo adiando ainda mais.
```

---

# Pergunta 04

```yaml
id: Q004

dimension: Distraction

primary_indicator: distraction_focus

title:
Enquanto trabalha ou estuda...

A:
Consigo manter foco facilmente.

B:
Interrupções desviam minha atenção.

C:
Alterno frequentemente entre tarefas.

D:
Preciso de muito esforço para voltar ao foco.
```

---

# Pergunta 05

```yaml
id: Q005

dimension: Consistency

primary_indicator: consistency_routine

title:
Quando cria um novo hábito...

A:
Costumo mantê-lo.

B:
Perco a constância após alguns dias.

C:
Esqueço rapidamente.

D:
Dependo muito da motivação.
```

---

# Pergunta 06

```yaml
id: Q006

dimension: Initiative

primary_indicator: initiative_decision

title:
Ao enfrentar uma tarefa desconhecida...

A:
Começo experimentando.

B:
Pesquiso bastante antes.

C:
Espero mais informações.

D:
Evito iniciar.
```

---

# Pergunta 07

```yaml
id: Q007

dimension: Planning

primary_indicator: planning_preparation

title:
Antes de executar uma atividade importante...

A:
Faço um plano simples.

B:
Planejo detalhadamente.

C:
Improviso durante a execução.

D:
Inicio sem planejamento.
```

---

# Pergunta 08

```yaml
id: Q008

dimension: Pressure

primary_indicator: pressure_stress

title:
Quando surgem mudanças inesperadas...

A:
Adapto-me rapidamente.

B:
Preciso reorganizar tudo.

C:
Fico sobrecarregado.

D:
Demoro para reagir.
```

---

# Pergunta 09

```yaml
id: Q009

dimension: Distraction

primary_indicator: distraction_interruptions

title:
Ao ser interrompido...

A:
Retorno facilmente.

B:
Levo algum tempo para voltar.

C:
Acabo iniciando outra atividade.

D:
Perco completamente o ritmo.
```

---

# Pergunta 10

```yaml
id: Q010

dimension: Consistency

primary_indicator: consistency_completion

title:
Quando inicia um projeto...

A:
Costumo concluí-lo.

B:
Concluo apenas quando existe cobrança.

C:
Abandono alguns projetos.

D:
Começo muitos ao mesmo tempo.
```

---

# Distribuição Oficial

| Dimensão | Perguntas |
|----------|-----------|
| Iniciativa | Q001 • Q006 |
| Planejamento | Q002 • Q007 |
| Gestão da Pressão | Q003 • Q008 |
| Gestão da Distração | Q004 • Q009 |
| Consistência | Q005 • Q010 |

Cada dimensão possui exatamente duas perguntas.

---

# Critérios de Qualidade

Uma pergunta será considerada válida quando.

✓ Medir um comportamento observável.

✓ Não induzir respostas.

✓ Ser compreendida em menos de 10 segundos.

✓ Possuir alternativas equilibradas.

✓ Estar vinculada a um Indicador Oficial.

✓ Permitir reutilização em futuras versões.

---

# Versionamento

Perguntas nunca deverão ser editadas diretamente.

Sempre criar uma nova versão.

Exemplo.

Q001_v1

↓

Q001_v2

↓

Q001_v3

O histórico deverá ser preservado.

---

# Princípio Supremo

Perguntas existem apenas para gerar evidências.

O conhecimento da NEXO está nos Indicadores, Índices Comportamentais e Arquétipos.

As perguntas são instrumentos de observação.

# PARTE 4 — Archetype Library & Insight Library

---

# 17. Archetype Library

A Archetype Library define todos os Arquétipos Comportamentais oficiais da plataforma NEXO.

Os arquétipos representam interpretações dos Índices Comportamentais.

Eles não representam personalidade.

Eles não representam identidade.

Eles representam tendências predominantes observadas durante uma Avaliação.

---

## Estrutura Oficial

Todo Arquétipo deverá possuir.

```yaml
id:
slug:
name:
summary:
description:
strengths:
attention_points:
reference_profile:
ideal_environment:
common_challenges:
first_step:
recommended_habits:
recommended_missions:
recommended_resources:
version:
status:
```

---

## Perfis de Referência (Calibração v1.0)

Cada Arquétipo possui um `reference_profile`, representando o padrão esperado de Índices Comportamentais (0–100) para esse Arquétipo, em cada uma das 5 Dimensões oficiais (initiative, planning, pressure, distraction, consistency).

Os valores abaixo (80 = tendência alta, 50 = neutro / não evidenciado explicitamente na descrição oficial, 20 = tendência baixa) representam uma **calibração inicial (v1.0)**, derivada das descrições, strengths e attention_points já publicados de cada Arquétipo nesta biblioteca.

Estes valores **não são constantes imutáveis**. Deverão ser validados e recalibrados conforme dados reais de uso da plataforma forem coletados, seguindo o processo de Content Governance (Seção 29). Qualquer recalibração deverá incrementar a versão do Arquétipo correspondente, sem exigir alteração da fórmula do Archetype Resolver (06_ASSESSMENT_ENGINE.md, Seção 9).

Ver 13_DECISION_LOG.md (DEC-0003) para a justificativa completa desta decisão.

---

# Arquétipo 01

```yaml
id: executor_under_pressure

slug: executor-under-pressure

name: Executor Sob Pressão

summary:
Você tende a produzir melhor quando existe um prazo definido ou uma sensação de urgência.

description:
Seu comportamento demonstra facilidade para agir rapidamente quando percebe consequências claras ou prazos próximos. Entretanto, tarefas sem urgência podem acabar sendo adiadas.

strengths:
- Agilidade.
- Boa resposta em momentos críticos.
- Capacidade de adaptação.

attention_points:
- Dependência de urgência.
- Acúmulo de tarefas.
- Estresse frequente.

reference_profile:
  initiative: 20
  planning: 50
  pressure: 80
  distraction: 50
  consistency: 20

first_step:
Criar prazos intermediários para tarefas importantes.

recommended_habits:
- Planejamento diário.
- Revisão semanal.

recommended_missions:
- mission_deadline

recommended_resources:
- article_deadlines
```

---

# Arquétipo 02

```yaml
id: strategic_refiner

name: Refinador Estratégico

summary:
Você valoriza qualidade e preparação antes de agir.

description:
Sua tendência é dedicar bastante tempo ao planejamento e à busca pela melhor solução possível. Isso aumenta a qualidade das entregas, mas pode retardar o início das tarefas.

strengths:
- Organização.
- Qualidade.
- Visão estratégica.

attention_points:
- Excesso de planejamento.
- Perfeccionismo.
- Dificuldade para iniciar.

reference_profile:
  initiative: 20
  planning: 80
  pressure: 50
  distraction: 50
  consistency: 50

first_step:
Definir um limite de tempo para o planejamento antes de começar a execução.
```

---

# Arquétipo 03

```yaml
id: analytical_explorer

name: Explorador Analítico

summary:
Você procura compreender profundamente antes de agir.

description:
Sua principal característica é a curiosidade e a busca por informações. Em alguns contextos, isso pode gerar excesso de análise e atrasar decisões.

strengths:
- Aprendizado rápido.
- Pensamento crítico.
- Boa capacidade analítica.

attention_points:
- Excesso de pesquisa.
- Indecisão.
- Lentidão para iniciar.

reference_profile:
  initiative: 20
  planning: 50
  pressure: 50
  distraction: 20
  consistency: 50

first_step:
Tomar pequenas decisões com tempo limitado.
```

---

# Arquétipo 04

```yaml
id: priority_accumulator

name: Acumulador de Prioridades

summary:
Você tende a assumir muitas responsabilidades simultaneamente.

description:
Seu comportamento demonstra disposição para realizar diversas atividades, mas o excesso de demandas reduz foco e consistência.

strengths:
- Energia.
- Proatividade.
- Disponibilidade.

attention_points:
- Sobrecarga.
- Falta de priorização.
- Baixa conclusão.

reference_profile:
  initiative: 80
  planning: 20
  pressure: 50
  distraction: 20
  consistency: 20

first_step:
Eliminar uma prioridade antes de adicionar outra.
```

---

# Regras

Todo Arquétipo deverá possuir.

✔ Resumo.

✔ Descrição.

✔ Pontos fortes.

✔ Pontos de atenção.

✔ Primeiro passo.

✔ Recursos.

✔ Missões.

✔ Hábitos recomendados.

---

# 18. Insight Library

Insights representam interpretações dos comportamentos observados.

Eles transformam dados em compreensão.

Todo Insight deverá responder.

O que foi observado?

↓

Por que isso acontece?

↓

Como evoluir?

---

## Estrutura Oficial

```yaml
id:
slug:
dimension:
indicator:
priority:
title:
description:
recommendation:
related_resources:
related_missions:
version:
status:
```

---

# Exemplo 01

```yaml
id: insight_starting

dimension: Initiative

indicator: initiative_start

priority: High

title:
Você inicia melhor quando existe clareza.

description:
Os resultados indicam que tarefas bem definidas são iniciadas com mais facilidade do que atividades vagas ou muito abertas.

recommendation:
Divida grandes tarefas em pequenas ações executáveis.

related_resources:
- article_small_steps

related_missions:
- mission_first_step
```

---

# Exemplo 02

```yaml
id: insight_focus

dimension: Distraction

indicator: distraction_focus

priority: Medium

title:
Seu foco diminui quando existem muitas interrupções.

description:
Você demonstra melhor desempenho em ambientes organizados e com poucas distrações.

recommendation:
Reserve blocos de tempo sem notificações para atividades importantes.
```

---

# Exemplo 03

```yaml
id: insight_consistency

dimension: Consistency

indicator: consistency_completion

priority: High

title:
Você inicia mais tarefas do que conclui.

description:
Existe uma tendência de abandonar atividades antes da conclusão quando surgem novas prioridades.

recommendation:
Antes de iniciar uma nova tarefa, conclua pelo menos uma atividade pendente.
```

---

# Priorização dos Insights

Todo Insight deverá possuir um nível de prioridade.

```text
Critical

High

Medium

Low
```

A página de resultado deverá exibir primeiro os Insights de maior prioridade.

---

# Seleção de Insights

A Assessment Engine deverá selecionar Insights considerando.

- Índices Comportamentais.
- Indicadores predominantes.
- Arquétipo identificado.
- Regras definidas nas Business Rules.

Os Insights nunca deverão ser escolhidos aleatoriamente.

---

# Regras Gerais

Todo Insight deverá.

✔ Explicar.

✔ Orientar.

✔ Incentivar evolução.

Nunca deverá.

✖ Julgar.

✖ Diagnosticar.

✖ Culpabilizar.

✖ Fazer promessas irreais.

---

# Critérios de Qualidade

Um Insight será considerado válido quando.

✓ Explicar um comportamento observável.

✓ Utilizar linguagem simples.

✓ Possuir uma recomendação prática.

✓ Estar associado a um Indicador Oficial.

✓ Ser reutilizável em diferentes contextos.

---

# Princípio Supremo

Arquétipos organizam padrões.

Insights transformam padrões em compreensão.

A verdadeira entrega de valor da NEXO está na qualidade dos Insights, e não na classificação do usuário.

# PARTE 5 — Evolution Library, Mission Library e Resource Library

---

# 19. Evolution Library

A Evolution Library define como a plataforma transforma conhecimento em ações práticas.

Todo Plano de Evolução deverá ser personalizado de acordo com os resultados da Avaliação.

O objetivo não é apresentar muitas recomendações.

O objetivo é indicar a menor ação possível capaz de iniciar uma mudança consistente.

---

## Estrutura Oficial

Todo Plano de Evolução deverá possuir.

```yaml
id:
version:
status:
archetype:
indexes:
first_step:
recommended_habits:
recommended_exercises:
recommended_missions:
recommended_resources:
estimated_duration:
difficulty:
```

---

# Estrutura do Plano

Todo Plano de Evolução será composto por.

↓

Primeiro Passo

↓

Hábito Inicial

↓

Exercício

↓

Missão

↓

Recursos

↓

Próxima Avaliação

Cada etapa representa um pequeno avanço.

---

# Primeiro Passo

O Primeiro Passo deverá.

- ser concluído em menos de 10 minutos;
- reduzir resistência inicial;
- gerar sensação de progresso.

Exemplo.

"Escolha apenas uma tarefa importante para concluir hoje."

---

# Hábito

O hábito representa uma mudança simples de rotina.

Exemplos.

- Planejar o dia durante cinco minutos.
- Revisar prioridades todas as manhãs.
- Trabalhar em blocos de foco.

---

# Exercício

Exercícios estimulam reflexão e prática.

Exemplos.

- Registrar distrações do dia.
- Anotar três prioridades.
- Refletir sobre tarefas concluídas.

---

# Dificuldade

Todo Plano de Evolução deverá possuir.

Easy

Medium

Hard

O MVP utilizará apenas planos Easy.

---

# Duração

Os planos deverão possuir duração sugerida.

7 dias

14 dias

21 dias

30 dias

No MVP.

7 dias.

---

# Regras

Todo Plano deverá.

✔ Começar simples.

✔ Ser executável.

✔ Ser personalizado.

✔ Estimular continuidade.

Nunca criar listas enormes.

---

# 20. Mission Library

Missões representam pequenas ações práticas.

Cada missão deverá produzir uma pequena vitória.

---

## Estrutura Oficial

```yaml
id:
slug:
title:
description:
difficulty:
estimated_time:
goal:
steps:
success_criteria:
next_mission:
related_resources:
```

---

# Exemplo 01

```yaml
id: mission_first_step

title:
Primeiro Movimento

difficulty:
Easy

estimated_time:
5 minutos

goal:
Dar início a uma tarefa importante.

steps:

Escolher uma tarefa.

Eliminar distrações.

Trabalhar durante cinco minutos.

success_criteria:
A tarefa foi iniciada.

next_mission:
mission_focus
```

---

# Exemplo 02

```yaml
id: mission_focus

title:
Bloco de Foco

difficulty:
Easy

estimated_time:
25 minutos

goal:
Treinar concentração.

steps:

Ativar modo silencioso.

Definir temporizador.

Executar apenas uma tarefa.

success_criteria:
Completar um bloco sem interrupções.
```

---

# Exemplo 03

```yaml
id: mission_priority

title:
Uma Prioridade

difficulty:
Easy

estimated_time:
10 minutos

goal:
Aprender priorização.

steps:

Escrever todas as tarefas.

Escolher apenas uma prioridade.

Executá-la primeiro.

success_criteria:
A prioridade foi concluída.
```

---

# Regras

Toda missão deverá.

✔ Ser simples.

✔ Possuir objetivo claro.

✔ Produzir aprendizado.

✔ Ser concluída rapidamente.

---

# 21. Resource Library

Recursos complementam o Plano de Evolução.

Nenhum recurso deverá substituir a prática.

---

## Estrutura Oficial

```yaml
id:
slug:
type:
title:
description:
estimated_time:
difficulty:
url:
tags:
language:
status:
```

---

## Tipos

Article

Video

Podcast

Book

Checklist

Template

Exercise

Reflection

---

# Exemplo

```yaml
id: article_small_steps

type:
Article

title:
Como dividir grandes tarefas em pequenas ações.

estimated_time:
6 minutos

difficulty:
Easy

tags:
- planejamento
- produtividade
```

---

# Organização

Os recursos deverão ser classificados por.

↓

Dimensão

↓

Indicador

↓

Arquétipo

↓

Nível de dificuldade

↓

Tempo de leitura

---

# Regras

Todos os recursos deverão.

✔ Ser gratuitos durante o MVP.

✔ Complementar um Insight.

✔ Complementar uma Missão.

✔ Complementar um Plano de Evolução.

Nunca existir isoladamente.

---

# Fluxo Oficial

Assessment

↓

Behavior Analysis

↓

Behavior Indexes

↓

Arquétipo

↓

Insights

↓

Plano de Evolução

↓

Missão

↓

Recursos

↓

Próxima Avaliação

---

# Critérios de Qualidade

Todo Plano de Evolução deverá.

✓ Possuir Primeiro Passo.

✓ Possuir pelo menos um hábito.

✓ Possuir um exercício.

✓ Possuir uma missão.

✓ Possuir recursos relacionados.

✓ Ser compatível com o Arquétipo identificado.

---

# Princípio Supremo

Conhecimento sem ação não gera evolução.

Toda Avaliação deverá terminar com um Plano de Evolução simples, personalizado e imediatamente aplicável.

# PARTE 6 — Landing Library, CTA Library, FAQ Library e System Messages

---

# 22. Landing Library

A Landing Library define todos os blocos reutilizáveis das páginas da NEXO.

Cada Landing deverá ser construída utilizando componentes padronizados.

Nenhum texto deverá ser escrito diretamente na interface.

---

## Estrutura Oficial

Todo bloco deverá possuir.

```yaml
id:
slug:
section:
headline:
subheadline:
description:
cta:
order:
status:
version:
```

---

## Hero Section

```yaml
id: landing_hero

headline:
Descubra os padrões que influenciam sua produtividade.

subheadline:
Uma avaliação rápida para entender seus comportamentos e receber um plano de evolução personalizado.

cta:
Iniciar Avaliação
```

---

## Benefícios

```yaml
id: landing_benefits

headline:
O que você receberá

items:

Arquétipo Comportamental

Insights personalizados

Plano de Evolução

Missão inicial

Relatório gratuito
```

---

## Como Funciona

```yaml
id: landing_process

headline:
Como funciona

steps:

Responda à Avaliação.

Descubra seus padrões.

Receba seu Plano de Evolução.

Comece sua primeira missão.
```

---

## Credibilidade

```yaml
id: landing_trust

headline:
Construída para gerar clareza.

description:
A metodologia da NEXO foi desenvolvida para interpretar comportamentos observáveis e transformar conhecimento em ação prática.
```

---

# 23. CTA Library

Toda chamada para ação deverá incentivar continuidade.

Nunca deverá pressionar o usuário.

---

## Estrutura Oficial

```yaml
id:
context:
label:
description:
priority:
```

---

## Exemplos

```yaml
id: cta_start

label:
Iniciar Avaliação
```

---

```yaml
id: cta_download

label:
Baixar Relatório
```

---

```yaml
id: cta_first_step

label:
Começar Meu Plano de Evolução
```

---

```yaml
id: cta_next

label:
Continuar
```

---

```yaml
id: cta_retry

label:
Tentar Novamente
```

---

## Regras

Todo CTA deverá.

✔ Utilizar verbos de ação.

✔ Ser curto.

✔ Ser claro.

✔ Explicar o próximo passo.

Nunca utilizar.

✖ Comprar

✖ Oferta

✖ Última chance

✖ Aproveite agora

---

# 24. FAQ Library

Perguntas frequentes deverão responder dúvidas reais dos usuários.

---

## Estrutura Oficial

```yaml
id:
question:
answer:
category:
```

---

## FAQ 01

**A NEXO faz um diagnóstico psicológico?**

Não.

A NEXO identifica padrões comportamentais observados durante a Avaliação.

Ela não substitui acompanhamento profissional.

---

## FAQ 02

**Quanto tempo leva a Avaliação?**

Em média três minutos.

---

## FAQ 03

**Preciso criar uma conta?**

Não.

O MVP não exige cadastro.

---

## FAQ 04

**O relatório é gratuito?**

Sim.

Todo usuário poderá baixar seu relatório gratuitamente durante o MVP.

---

## FAQ 05

**Posso realizar a Avaliação novamente?**

Sim.

Novas avaliações poderão ser realizadas sempre que desejar.

---

## FAQ 06

**Meus dados são armazenados?**

Durante o MVP, as respostas permanecem apenas durante a sessão.

---

# 25. System Messages

Todas as mensagens da plataforma deverão estar documentadas.

Nenhuma mensagem deverá existir apenas no código.

---

## Estrutura Oficial

```yaml
id:
type:
title:
message:
action:
```

---

# Loading

```yaml
id: loading_analysis

title:
Analisando seus padrões...

message:
Estamos processando suas respostas para gerar uma interpretação personalizada.
```

---

```yaml
id: loading_insights

title:
Preparando seus Insights...

message:
Selecionando recomendações alinhadas ao seu perfil.
```

---

```yaml
id: loading_report

title:
Gerando seu Relatório...

message:
Organizando todas as informações para download.
```

---

# Sucesso

```yaml
id: success_complete

title:
Avaliação concluída

message:
Seu Plano de Evolução está pronto.
```

---

```yaml
id: success_download

title:
Relatório disponível

message:
Seu relatório foi preparado com sucesso.
```

---

# Erro

```yaml
id: error_connection

title:
Não foi possível concluir.

message:
Verifique sua conexão e tente novamente.
```

---

```yaml
id: error_processing

title:
Ocorreu um erro durante o processamento.

message:
Tente novamente em alguns instantes.
```

---

# Estado Vazio

```yaml
id: empty_history

title:
Nenhuma avaliação encontrada.

message:
Realize sua primeira Avaliação para descobrir seus padrões.
```

---

# 26. Diretrizes de Comunicação

Toda comunicação deverá.

✔ Explicar.

✔ Orientar.

✔ Reduzir ansiedade.

✔ Incentivar evolução.

Nunca deverá.

✖ Julgar.

✖ Assustar.

✖ Pressionar.

✖ Manipular.

---

# 27. Critérios de Qualidade

Toda mensagem deverá.

✓ Ser compreendida em menos de cinco segundos.

✓ Utilizar linguagem simples.

✓ Indicar claramente o próximo passo.

✓ Ser consistente com a identidade da marca.

✓ Estar cadastrada na Content Library.

---

# Princípio Supremo

Toda comunicação da NEXO deverá gerar clareza.

Se uma mensagem não ajuda o usuário a compreender o que aconteceu ou o que fazer em seguida, ela deverá ser revisada.

# PARTE 7 — Future Content, Governance e Glossary Reference

---

# 28. Future Content

A Content Library foi projetada para crescer continuamente.

Novos conteúdos deverão ser adicionados utilizando a mesma estrutura metodológica.

Exemplos de futuras expansões.

- Novas Assessments.
- Novos Arquétipos.
- Novos Insights.
- Novas Missões.
- Novos Recursos.
- Novos Planos de Evolução.
- Novas Dimensões.
- Novos Indicadores.

Toda expansão deverá respeitar a metodologia oficial da NEXO.

---

# 29. Content Governance

A Base de Conhecimento deverá possuir um processo de governança.

Nenhum conteúdo poderá ser publicado sem revisão.

Toda alteração deverá ser registrada.

---

## Fluxo Oficial

Proposta

↓

Revisão

↓

Validação

↓

Aprovação

↓

Publicação

↓

Versionamento

---

## Responsabilidades

Todo conteúdo deverá possuir.

- Autor.
- Revisor.
- Versão.
- Data de criação.
- Data de atualização.
- Status.

---

# Status Oficiais

Draft

↓

Review

↓

Approved

↓

Deprecated

↓

Archived

Nenhum conteúdo deverá ser removido.

Sempre arquivado.

---

# 30. Versionamento

Todo objeto da Content Library deverá possuir controle de versão.

Exemplo.

```yaml
version: 1.0.0
```

Alterações.

Correção textual

↓

1.0.1

Nova recomendação

↓

1.1.0

Mudança estrutural

↓

2.0.0

---

Nunca sobrescrever conteúdo antigo.

---

# 31. Qualidade

Antes da publicação, todo conteúdo deverá responder positivamente às seguintes perguntas.

O conteúdo está alinhado à Vision?

↓

Está alinhado à Methodology?

↓

Está alinhado às Personas?

↓

Segue as Brand Guidelines?

↓

Respeita os Product Principles?

↓

Está registrado no Glossary?

↓

Pode ser reutilizado?

↓

Possui versão?

↓

Possui identificador?

Caso qualquer resposta seja negativa, o conteúdo deverá retornar para revisão.

---

# 32. Integração com IA

A Inteligência Artificial da plataforma deverá utilizar exclusivamente conteúdos aprovados da Content Library.

A IA poderá.

✔ Selecionar.

✔ Organizar.

✔ Combinar.

✔ Personalizar.

Nunca poderá.

✖ Inventar metodologia.

✖ Criar diagnósticos.

✖ Alterar regras.

✖ Criar Arquétipos.

✖ Modificar Insights oficiais.

A IA é consumidora da Knowledge Base.

Nunca sua substituta.

---

# 33. Integração com Engines

A Assessment Engine utilizará.

- Assessment Library.
- Question Library.
- Indicator Library.

---

A Behavior Engine utilizará.

- Dimension Library.
- Indicator Library.
- Archetype Library.

---

A Insight Engine utilizará.

- Insight Library.

---

A Evolution Engine utilizará.

- Evolution Library.
- Mission Library.
- Resource Library.

---

A Report Engine utilizará.

- Report Library.

---

Nenhuma Engine deverá possuir conhecimento próprio.

Toda inteligência deverá estar centralizada na Content Library.

---

# 34. Glossary Reference

Todos os termos utilizados neste documento deverão seguir obrigatoriamente o Glossário Oficial.

Documento de referência.

00C_GLOSSARY.md

Nenhuma terminologia poderá ser criada diretamente neste documento.

---

# 35. Escalabilidade

A estrutura da Content Library deverá permitir.

✔ Novos idiomas.

✔ Novas Assessments.

✔ Novos Arquétipos.

✔ Novas Missões.

✔ Novos Recursos.

✔ Novas Interfaces.

✔ Aplicativo Mobile.

✔ API Pública.

✔ Integração com IA.

Sem necessidade de alterar sua estrutura fundamental.

---

# 36. Critérios de Aceite

A Content Library será considerada concluída quando.

✓ Todo conhecimento da plataforma estiver documentado.

✓ Nenhuma informação existir apenas no código.

✓ Todas as Engines utilizarem esta biblioteca.

✓ Todo conteúdo possuir identificador único.

✓ Todo conteúdo possuir versionamento.

✓ Toda comunicação seguir as Brand Guidelines.

✓ Toda terminologia seguir o Glossário Oficial.

✓ Toda informação estiver alinhada à Metodologia.

---

# 37. Princípio Supremo

A Content Library representa o patrimônio intelectual da NEXO.

Ela é a única fonte oficial de conhecimento da plataforma.

Toda funcionalidade, toda interface, toda Engine, toda Inteligência Artificial e toda comunicação deverão consumir conhecimento desta biblioteca.

Nenhuma informação crítica deverá existir exclusivamente no código.

A documentação é a fonte da verdade.


