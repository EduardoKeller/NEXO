# BUSINESS RULES

**Projeto:** NEXO Platform
**Documento:** 04_BUSINESS_RULES.md
**Versão:** 2.1
**Status:** Draft (Sprint 0 Review)
**Última atualização:** 04/08/2026

---

# 1. Objetivo

Este documento define todas as regras oficiais da plataforma NEXO.

Toda implementação deverá seguir estas regras.

Caso exista conflito entre código e este documento, este documento prevalece.

---

# 2. Princípios Gerais

Toda regra da plataforma deverá respeitar os princípios da NEXO.

- Clareza
- Consistência
- Evolução
- Simplicidade
- Neutralidade

Nenhuma regra poderá induzir, manipular ou julgar o usuário.

---

# 3. Assessment

Uma Assessment representa uma avaliação comportamental estruturada.

Cada Assessment deverá possuir:

- Identificador único
- Nome
- Versão
- Idioma
- Dimensões
- Indicadores
- Perguntas
- Perfis
- Algoritmo

Uma Assessment poderá evoluir sem alterar sua identidade.

---

# 4. Estrutura Oficial

Assessment

↓

Dimensões

↓

Indicadores

↓

Perguntas

↓

Alternativas

↓

Pontuação

↓

Insights

↓

Arquétipo Comportamental

↓

Plano de Evolução

↓

Relatório

---

# 5. Dimensões

Cada dimensão representa uma área específica do comportamento.

No MVP existirão cinco dimensões.

- Iniciativa
- Planejamento
- Pressão
- Distração
- Consistência

Cada dimensão possui peso próprio.

Nenhuma dimensão poderá medir mais de um objetivo principal.

---

# 6. Indicadores

Os indicadores representam comportamentos observáveis.

Eles são permanentes.

As perguntas podem mudar.

Os indicadores permanecem.

Cada indicador pertence obrigatoriamente a uma única dimensão.

---

# 7. Perguntas

Cada pergunta deverá medir apenas um indicador principal.

Cada pergunta deverá conter.

- objetivo
- indicador
- dimensão
- alternativas
- peso

Perguntas nunca deverão:

- induzir respostas;
- utilizar linguagem técnica;
- revelar qual alternativa representa determinado perfil.

---

# 8. Alternativas

Cada pergunta possuirá quatro alternativas.

Cada alternativa representa uma tendência predominante.

As alternativas deverão parecer igualmente válidas.

Nenhuma alternativa deverá parecer "correta".

---

# 9. Pontuação

Toda alternativa adicionará pontos ao Indicador e à Dimensão correspondente.

Nenhuma alternativa adiciona pontos diretamente a um Arquétipo. O Arquétipo é determinado posteriormente, a partir dos Índices Comportamentais (ver Seção 11).

O cálculo seguirá.

Pontuação da Alternativa

×

Peso da Pergunta

×

Peso da Dimensão

↓

Score Final

Nenhum cálculo poderá ser realizado diretamente na interface.

---

# 10. Distribuição

Ao finalizar a Assessment o sistema deverá calcular.

- score bruto;
- score ponderado;
- percentual de cada perfil.

A soma dos percentuais deverá totalizar 100%.

---

# 11. Arquétipo Comportamental

O usuário receberá um arquétipo predominante.

No MVP existirão quatro arquétipos.

- Executor Sob Pressão
- Refinador Estratégico
- Explorador Analítico
- Acumulador de Prioridades

O arquétipo representa uma tendência predominante.

Nunca uma definição permanente da pessoa.

---

## Como o Arquétipo é Determinado

O arquétipo predominante é identificado comparando os Índices Comportamentais do usuário com o Perfil de Referência oficial de cada arquétipo, mantido na Content Library (05_CONTENT_LIBRARY.md, Archetype Library).

A comparação utiliza Distância Euclidiana Ponderada, com pesos oficiais por Dimensão (07_DATA_MODEL.md).

O algoritmo completo, incluindo a fórmula de cálculo, está documentado em 06_ASSESSMENT_ENGINE.md, Seção 9 (Archetype Resolver).

Todo resultado é acompanhado por um Confidence Score (0 a 100), representando o quão claramente o perfil do usuário corresponde ao arquétipo identificado em relação aos demais candidatos.

Os Perfis de Referência utilizados no MVP representam uma calibração inicial (v1.0), derivada das descrições oficiais de cada arquétipo. Eles não são constantes imutáveis: deverão ser validados e ajustados conforme dados reais de uso forem coletados, seguindo o processo de governança da Content Library (05_CONTENT_LIBRARY.md, Seção 29).

Esta decisão está registrada em 13_DECISION_LOG.md (DEC-0003).

---

# 12. Insights

Após identificar o arquétipo predominante, a plataforma deverá gerar insights personalizados.

Cada insight deverá:

- explicar um comportamento observado;
- utilizar linguagem educativa;
- incentivar reflexão;
- preparar o usuário para o plano de evolução.

Insights nunca deverão realizar diagnósticos.

---

# 13. Plano de Evolução

Todo usuário deverá receber um plano personalizado.

Cada plano conterá:

- primeiro passo;
- hábito recomendado;
- exercício;
- checklist;
- recursos;
- missão.

O plano deverá respeitar o arquétipo predominante.

---

# 14. Missões

As missões representam pequenas ações práticas.

Cada missão deverá possuir:

- objetivo;
- duração;
- dificuldade;
- benefício esperado.

As missões deverão ser simples de iniciar.

---

# 15. Relatório

Todo usuário deverá receber um relatório personalizado.

O relatório deverá conter.

- resumo;
- distribuição;
- arquétipo;
- insights;
- plano de evolução;
- exercícios;
- próximos passos.

O relatório nunca deverá repetir apenas respostas.

---

# 16. Empates

Caso dois ou mais arquétipos apresentem a menor distância (ou distâncias equivalentes) em relação ao perfil do usuário.

Aplicar, nesta ordem.

1. Maior Confidence Score.

Persistindo.

2. Maior Índice de Consistência.

Persistindo.

3. Maior Índice de Planejamento.

Persistindo.

4. Maior quantidade de Indicadores predominantes.

Persistindo (empate matemático absoluto).

5. Prioridade oficial.

Refinador Estratégico

↓

Explorador Analítico

↓

Executor Sob Pressão

↓

Acumulador de Prioridades

---

Esta é a regra oficial e única de desempate da plataforma. Qualquer outro documento que trate deste tema (incluindo 06_ASSESSMENT_ENGINE.md) deverá referenciar esta seção, nunca redefini-la de forma divergente.

---

# 17. Regras de Comunicação

Toda comunicação deverá.

- ser educativa;
- ser objetiva;
- evitar culpa;
- incentivar evolução.

Nunca utilizar.

- "Você é..."

Preferir.

- "Seus resultados indicam..."

---

# 18. Validação

Uma Assessment somente poderá ser concluída quando.

Todas as perguntas forem respondidas.

Nenhuma resposta poderá ficar vazia.

---

# 19. Persistência

No MVP.

As respostas poderão permanecer apenas durante a sessão.

Versões futuras poderão armazenar histórico mediante consentimento.

---

# 20. Performance

O processamento completo deverá ocorrer em menos de 300 ms.

A geração do relatório em menos de 2 segundos.

---

# 21. Segurança

Nunca confiar em dados enviados pelo frontend.

Toda resposta deverá ser validada antes do cálculo.

---

# 22. Evolução da Plataforma

A arquitetura deverá permitir futuramente.

- novos arquétipos;
- novas dimensões;
- novos indicadores;
- novas avaliações;
- novos algoritmos;
- novos idiomas.

Sem alterar a estrutura principal.

---

# 23. Restrições

A plataforma não poderá.

- emitir diagnósticos clínicos;
- substituir profissionais especializados;
- prometer resultados garantidos;
- classificar pessoas como melhores ou piores.

---

# 24. Critérios de Aceite

As Business Rules serão consideradas aprovadas quando.

✓ Todas as regras estiverem documentadas.

✓ Nenhuma regra depender da interface.

✓ O algoritmo estiver desacoplado.

✓ Toda Assessment seguir a mesma estrutura.

✓ O plano de evolução for obrigatório.

✓ O relatório for gerado a partir dos resultados.

✓ Toda implementação puder ser validada utilizando este documento.

---

# 25. Regra Suprema

Toda regra da plataforma deverá responder positivamente à seguinte pergunta.

"Esta regra ajuda o usuário a compreender melhor seus padrões e agir de forma prática?"

Caso a resposta seja negativa, a regra deverá ser reavaliada.
