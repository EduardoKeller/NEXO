# ASSESSMENT ENGINE

**Projeto:** NEXO Platform
**Documento:** 06_ASSESSMENT_ENGINE.md
**Versão:** 2.0
**Status:** Draft (Sprint 0 Review)
**Última atualização:** 01/08/2026

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

Caso dois Arquétipos apresentem pontuação semelhante.

Aplicar.

1.

Maior Confidence Score.

↓

2.

Maior Índice de Consistência.

↓

3.

Maior Índice de Planejamento.

↓

4.

Maior quantidade de Indicadores predominantes.

↓

5.

Prioridade definida nas Business Rules.

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
