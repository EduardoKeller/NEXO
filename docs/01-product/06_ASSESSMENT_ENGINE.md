# ASSESSMENT ENGINE

**Projeto:** NEXO Platform
**Documento:** 06_ASSESSMENT_ENGINE.md
**Versão:** 2.1
**Status:** Draft (Sprint 0 Review)
**Última atualização:** 04/08/2026

---

# 1. Objetivo

A Assessment Engine é o núcleo responsável por executar qualquer Avaliação da plataforma NEXO.

Sua responsabilidade é transformar respostas em conhecimento estruturado.

Ela nunca deverá:

- conhecer componentes da interface;
- acessar diretamente o banco de dados;
- gerar textos;
- conter regras de negócio duplicadas.

Seu único objetivo é processar uma Avaliação.

---

# 2. Princípios

Toda Engine deverá seguir.

## Determinística

As mesmas respostas deverão produzir exatamente o mesmo resultado.

---

## Desacoplada

A Engine deverá funcionar independentemente de:

- Frontend
- Backend
- API
- Banco de Dados

---

## Configurável

Perguntas, indicadores e arquétipos nunca deverão existir diretamente no código.

Toda configuração deverá vir da Content Library.

---

## Escalável

Novas Avaliações poderão ser adicionadas sem alterar a estrutura da Engine.

---

# 3. Arquitetura

A Assessment Engine é composta pelos seguintes módulos.

```

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

```

Cada módulo possui responsabilidade única.

---

# 4. Fluxo Oficial

```

Assessment

↓

Validation

↓

Score Calculation

↓

Behavior Analysis

↓

Behavior Indexes

↓

Behavior Archetype

↓

Insight Selection

↓

Evolution Plan

↓

Report

↓

Final Result

```

---

# 5. Validation Engine

Responsável por validar.

- estrutura da Assessment;
- respostas;
- perguntas;
- alternativas;
- indicadores;
- dimensões.

Nenhum cálculo poderá ocorrer antes da validação.

---

# 6. Score Engine

Recebe.

- respostas;
- pesos;
- indicadores;
- dimensões.

Calcula.

- score por pergunta;
- score por indicador;
- score por dimensão.

O Score Engine nunca interpreta resultados.

Ele apenas calcula.

---

# 7. Behavior Engine

Recebe.

- scores;
- indicadores;
- dimensões.

Calcula.

- Índices Comportamentais;
- distribuição dos índices;
- predominância;
- nível de confiança.

A saída deste módulo nunca é um Arquétipo.

Sua saída são apenas dados estruturados.

---

# 8. Behavior Indexes

No MVP existirão cinco Índices.

- Initiative Index
- Planning Index
- Pressure Management Index
- Distraction Management Index
- Consistency Index

Cada índice será normalizado entre.

0

↓

100

Esses índices serão utilizados por todos os módulos seguintes.

---

# 9. Archetype Resolver

Responsável por interpretar os Índices Comportamentais.

Entrada.

```

Behavior Indexes

```

Saída.

```

Behavior Archetype

Confidence Score

Supporting Indicators

```

O Arquétipo representa uma interpretação.

Nunca um cálculo direto das respostas.

---

## Algoritmo Oficial de Classificação

O Archetype Resolver utiliza Distância Euclidiana Ponderada entre o vetor de Índices Comportamentais do usuário e o Perfil de Referência (`reference_profile`) de cada Arquétipo, definido na Content Library (05_CONTENT_LIBRARY.md, Archetype Library).

```
distancia(arquétipo) = √( Σ peso[d] × (índiceUsuário[d] − referência[d, arquétipo])² )

para d em { Iniciativa, Planejamento, Gestão da Pressão, Gestão da Distração, Consistência }
```

`peso[d]` corresponde ao peso oficial da Dimensão (`Dimension.weight`, ver 07_DATA_MODEL.md).

O Arquétipo predominante é aquele com a menor distância calculada.

Este cálculo é determinístico: os mesmos Índices Comportamentais sempre produzem o mesmo Arquétipo.

---

## Cálculo do Confidence Score

```
confidence = round( 100 × (1 − distancia_melhor / (distancia_melhor + distancia_segundo_melhor)) )
```

Faixa oficial: 0 a 100.

Correspondência com `ConfidenceLevel` (07_DATA_MODEL.md, Seção 27):

0–20 VeryLow · 21–40 Low · 41–60 Medium · 61–80 High · 81–100 VeryHigh

---

## Perfis de Referência

Os valores de `reference_profile` utilizados nesta versão (v1.0) representam uma calibração inicial, derivada das descrições oficiais de cada Arquétipo na Content Library.

Eles não são constantes imutáveis. Deverão ser revisados e recalibrados conforme dados reais de uso da plataforma forem coletados, sem exigir alteração da fórmula ou da arquitetura da Engine.

Esta decisão, incluindo as alternativas consideradas (Score Ponderado, Sistema Baseado em Regras, Cosine Similarity), está registrada em 13_DECISION_LOG.md (DEC-0003).

---

# 10. Insight Engine

Recebe.

- Arquétipo;
- Índices;
- Indicadores predominantes.

Seleciona.

- Insights;
- Pontos Fortes;
- Pontos de Atenção.

Todos os Insights deverão existir previamente na Content Library.

A Engine nunca cria novos Insights.

---

# 11. Evolution Engine

Recebe.

- Arquétipo;
- Índices;
- Insights.

Seleciona.

- Primeiro Passo;
- Hábito;
- Exercício;
- Missão;
- Recursos.

Toda recomendação deverá possuir origem na Content Library.

---

# 12. Report Engine

Recebe.

- Resultado Final;
- Insights;
- Plano de Evolução.

Produz.

- HTML
- PDF

O Report Engine não interpreta dados.

Apenas organiza.

---

# 13. Result Builder

Responsável por consolidar todas as informações.

Estrutura oficial.

```yaml
assessment

behaviorIndexes

behaviorArchetype

confidenceScore

insights

strengths

attentionPoints

evolutionPlan

missions

resources

report
```

Este objeto representa a resposta oficial da Assessment Engine.

---

# 14. Tratamento de Empates

A regra oficial e única de desempate está definida em 04_BUSINESS_RULES.md, Seção 16.

Este documento nunca deverá redefinir esse critério de forma divergente. Em caso de qualquer discrepância futura, 04_BUSINESS_RULES.md prevalece, conforme a ordem de precedência definida em 08_AI_DEVELOPMENT_CHARTER.md, Seção 3.

---

# 15. Performance

Objetivos.

Validação

<100 ms

↓

Processamento

<150 ms

↓

Resultado

<300 ms

↓

Relatório

<2 segundos

---

# 16. Segurança

Toda entrada deverá ser validada.

Nunca confiar em dados enviados pelo cliente.

Toda regra oficial pertence às Business Rules.

Toda metodologia pertence ao documento Methodology.

---

# 17. Observabilidade

Registrar.

- início da Assessment;
- tempo de processamento;
- erros;
- conclusão.

Nunca registrar respostas individuais identificáveis durante o MVP.

---

# 18. Escalabilidade

A Engine deverá suportar.

- novas Assessments;
- novos Arquétipos;
- novas Dimensões;
- novos Indicadores;
- novos idiomas;
- múltiplos algoritmos.

Sem alteração estrutural.

---

# 19. Critérios de Aceite

A Assessment Engine será considerada concluída quando.

✓ Validar qualquer Assessment.

✓ Calcular todos os Índices.

✓ Identificar corretamente o Arquétipo.

✓ Selecionar Insights.

✓ Construir o Plano de Evolução.

✓ Gerar o Relatório.

✓ Retornar um objeto padronizado.

✓ Permanecer independente da interface.

---

# 20. Princípio Supremo

A Assessment Engine não interpreta pessoas.

Ela interpreta padrões comportamentais observados durante uma Avaliação.

Seu objetivo é transformar respostas em conhecimento estruturado, preservando integralmente a metodologia oficial da NEXO.
