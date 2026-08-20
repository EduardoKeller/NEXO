# GLOSSARY

**Projeto:** NEXO Platform  
**Documento:** 00C_GLOSSARY.md  
**Versão:** 1.0  
**Status:** Draft (Sprint 0 Review)  
**Última atualização:** 01/08/2026

---

# 1. Objetivo

Este documento define a terminologia oficial utilizada na plataforma NEXO.

Todos os documentos, implementações, interfaces e conteúdos deverão utilizar estes termos de forma consistente.

Caso exista conflito entre documentos, este Glossário prevalece quanto à nomenclatura.

---

# 2. Idioma Oficial

A documentação técnica será escrita utilizando termos em inglês quando relacionados à arquitetura de software.

A interface destinada ao usuário utilizará português.

Exemplo:

| Interno | Interface |
|----------|-----------|
| Assessment | Avaliação |
| Behavior Archetype | Arquétipo Comportamental |
| Evolution Plan | Plano de Evolução |
| Mission | Missão |

---

# 3. Conceitos Fundamentais

## NEXO

A plataforma de Inteligência Comportamental desenvolvida para transformar comportamentos observáveis em compreensão prática e evolução contínua.

---

## NEXO Journey

Fluxo oficial da experiência do usuário.

Landing

↓

Avaliação

↓

Análise

↓

Insights

↓

Arquétipo

↓

Plano de Evolução

↓

Relatório

↓

Próximo Passo

---

## NEXO Core

Conjunto de motores responsáveis pelo processamento da plataforma.

Inclui:

- Assessment Engine
- Validation Engine
- Score Engine
- Behavior Engine
- Insight Engine
- Evolution Engine
- Report Engine
- Result Builder

---

# 4. Assessment

## Assessment (Interno)

Processo estruturado de coleta de respostas utilizado pela plataforma.

---

## Avaliação (Interface)

Nome apresentado ao usuário.

Nunca utilizar "Teste".

Nunca utilizar "Quiz".

---

# 5. Dimensão

Grande área de comportamento analisada pela plataforma.

Exemplos.

- Iniciativa
- Planejamento
- Gestão da Pressão
- Gestão da Distração
- Consistência

Cada Dimensão possui diversos Indicadores.

---

# 6. Indicador

Comportamento específico observado durante uma Avaliação.

Indicadores são permanentes.

Perguntas podem mudar.

---

# 7. Pergunta

Instrumento utilizado para medir um Indicador.

Perguntas não representam conhecimento.

Elas apenas coletam dados.

---

# 8. Alternativa

Resposta possível para uma Pergunta.

Todas as alternativas devem parecer igualmente válidas.

Nenhuma deverá sugerir que é a "correta".

---

# 9. Pontuação

Valor gerado por uma resposta.

A pontuação é utilizada exclusivamente pela Assessment Engine.

O usuário nunca visualizará pontuações brutas.

---

# 10. Índice Comportamental

Resultado numérico que representa a intensidade observada de uma Dimensão.

Exemplos.

- Índice de Iniciativa
- Índice de Planejamento
- Índice de Consistência

Os Índices são utilizados para interpretar padrões.

Nunca para rotular pessoas.

---

# 11. Arquétipo Comportamental

Interpretação predominante dos Índices Comportamentais.

Representa tendências observadas.

Não representa personalidade.

Não representa identidade.

No MVP.

- Executor Sob Pressão
- Refinador Estratégico
- Explorador Analítico
- Acumulador de Prioridades

---

# 12. Insight

Interpretação personalizada baseada nos resultados da Avaliação.

Todo Insight deve responder.

- O que foi observado?
- O que isso significa?
- Como evoluir?

Insights nunca representam diagnósticos.

---

# 13. Plano de Evolução

Conjunto de ações práticas sugeridas ao usuário.

Todo Plano de Evolução deverá conter.

- Primeiro passo
- Hábito
- Exercício
- Checklist
- Recursos
- Missão

---

# 14. Missão

Pequena ação prática proposta ao usuário.

Missões deverão ser:

- simples;
- objetivas;
- alcançáveis.

O objetivo é estimular progresso contínuo.

---

# 15. Recurso

Conteúdo complementar utilizado para aprofundar o aprendizado.

Exemplos.

- Artigo
- Vídeo
- Podcast
- Livro
- Template
- Checklist

Durante o MVP todos os recursos serão gratuitos.

---

# 16. Relatório

Documento personalizado gerado após a Avaliação.

O Relatório deverá consolidar.

- Resumo
- Índices
- Arquétipo
- Insights
- Plano de Evolução
- Recursos

---

# 17. Knowledge Base

Base Oficial de Conhecimento da plataforma.

Todo conteúdo apresentado ao usuário deverá possuir origem na Knowledge Base.

---

# 18. Content Library

Implementação da Knowledge Base.

Armazena.

- Perguntas
- Indicadores
- Arquétipos
- Insights
- Recursos
- Missões
- Relatórios

---

# 19. Behavior Analysis

Processo de interpretação dos Índices Comportamentais.

Transforma dados em padrões observáveis.

---

# 20. Assessment Engine

Motor responsável por coordenar todo o processamento da Avaliação.

Nunca gera conteúdo.

Nunca altera regras de negócio.

---

# 21. Result Builder

Último módulo da Assessment Engine.

Responsável por consolidar todas as informações em um único objeto.

---

# 22. MVP

Primeira versão pública da plataforma.

Objetivo.

Validar a metodologia.

Validar percepção de valor.

Receber feedback.

Construir confiança.

O MVP não possui funcionalidades pagas.

---

# 23. User Value Score (UVS)

Principal indicador de sucesso do MVP.

Mede a percepção de valor entregue ao usuário.

O UVS possui prioridade sobre métricas financeiras.

---

# 24. Termos Proibidos

Os seguintes termos não deverão ser utilizados na comunicação com o usuário.

✖ Teste

✖ Diagnóstico

✖ Resultado Definitivo

✖ Você é...

✖ Correto

✖ Errado

✖ Perfil Psicológico

---

# 25. Termos Preferenciais

Sempre utilizar.

✔ Avaliação

✔ Comportamento

✔ Tendência

✔ Padrão

✔ Insight

✔ Arquétipo

✔ Plano de Evolução

✔ Próximo Passo

✔ Missão

✔ Evolução

---

# 26. Convenções de Escrita

Documentação técnica.

- Assessment
- Behavior Engine
- Insight Engine

Interface.

- Avaliação
- Análise
- Arquétipo Comportamental
- Plano de Evolução

Código.

Utilizar nomes em inglês.

Exemplo.

```ts
AssessmentEngine

BehaviorIndex

EvolutionPlan

Insight

Mission

Report
```

Conteúdo para usuários.

Utilizar português.

---

# 27. Evolução do Glossário

Novos termos somente poderão ser adicionados quando.

- representarem novos conceitos oficiais;
- forem aprovados durante revisão da documentação;
- mantiverem consistência com a metodologia da NEXO.

Nenhum documento poderá criar terminologia própria sem atualização deste Glossário.

---

# 28. Princípio Supremo

A consistência da linguagem é parte da experiência da plataforma.

Todo termo utilizado pela NEXO deverá possuir um significado único, claro e compartilhado por toda a equipe e por todas as implementações.
