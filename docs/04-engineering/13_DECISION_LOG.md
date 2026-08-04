# Decision Log

> Registro oficial das decisões arquiteturais e de produto da plataforma NEXO.

---

## Objetivo

Este documento registra todas as decisões relevantes tomadas durante o desenvolvimento da plataforma.

Cada decisão deve conter:

- contexto;
- problema;
- alternativas avaliadas;
- decisão adotada;
- justificativa;
- impacto técnico;
- data.

Este documento funciona como histórico oficial da evolução do projeto.

---

# Template

## DEC-XXXX

**Título**

### Data

AAAA-MM-DD

### Status

- Proposed
- Approved
- Deprecated
- Superseded

### Contexto

Descreva o problema que motivou a decisão.

### Alternativas consideradas

- Alternativa A
- Alternativa B
- Alternativa C

### Decisão

Descreva claramente a decisão tomada.

### Justificativa

Explique por que esta alternativa foi escolhida.

### Consequências

Liste impactos positivos e negativos.

### Documentos relacionados

- PRD
- Architecture
- Business Rules
- Assessment Engine

---

# Histórico de Decisões

## DEC-0001

### Título

Documentação como fonte única da verdade.

### Data

2026-08-03

### Status

Approved

### Contexto

Era necessário definir uma metodologia que garantisse consistência entre produto, arquitetura e implementação.

### Alternativas consideradas

- Documentação opcional
- Documentação após implementação
- Documentation First

### Decisão

Adotar a metodologia **Documentation First**, onde toda implementação deve ser precedida pela documentação correspondente.

### Justificativa

Reduz ambiguidades, melhora o uso de Inteligência Artificial e facilita manutenção.

### Consequências

Positivas:

- melhor rastreabilidade;
- menor retrabalho;
- documentação sempre atualizada.

Negativas:

- maior tempo inicial de planejamento.

### Documentos relacionados

- 00_VISION.md
- 00A_METHODOLOGY.md

---

## DEC-0002

### Título

Organização da documentação dentro da pasta `/docs`.

### Data

2026-08-03

### Status

Approved

### Contexto

Inicialmente a documentação estava distribuída na raiz do repositório.

### Decisão

Centralizar toda a documentação na pasta `/docs`, mantendo apenas os arquivos de entrada do projeto (`README.md`, `AGENTS.md` e `CLAUDE.md`) na raiz.

### Justificativa

Melhora a organização, facilita a navegação e mantém a estrutura preparada para crescimento.

### Documentos relacionados

- docs/README.md

---

## DEC-0003

### Título

Algoritmo oficial de classificação de Arquétipos Comportamentais.

### Data

2026-08-04

### Status

Approved

### Contexto

O Archetype Resolver (06_ASSESSMENT_ENGINE.md, Seção 9) definia apenas entrada e saída do módulo responsável por identificar o Arquétipo predominante, sem especificar o algoritmo de classificação. Além disso, 04_BUSINESS_RULES.md (Seção 16) e 06_ASSESSMENT_ENGINE.md (Seção 14) definiam critérios de desempate divergentes entre si, e o cálculo do Confidence Score nunca havia sido especificado em nenhum documento.

### Alternativas consideradas

- Distância Euclidiana (Ponderada)
- Score Ponderado
- Sistema Baseado em Regras
- Cosine Similarity

### Decisão

Adotar Distância Euclidiana Ponderada como algoritmo oficial de classificação de Arquétipos, comparando o vetor de Índices Comportamentais do usuário contra um `reference_profile` por Arquétipo (mantido na Content Library), utilizando os pesos oficiais por Dimensão já definidos na plataforma.

O Confidence Score é calculado pela margem relativa entre a menor e a segunda menor distância, normalizado na faixa 0–100.

Os critérios de desempate divergentes entre Business Rules e Assessment Engine foram unificados em uma única regra canônica, definida em 04_BUSINESS_RULES.md, Seção 16.

Os valores do `reference_profile` (80/50/20) representam uma calibração inicial (v1.0), não constantes imutáveis, sujeitas a validação e recalibração com dados reais de uso.

### Justificativa

Entre as quatro alternativas avaliadas, a Distância Euclidiana Ponderada foi a única que atende simultaneamente aos requisitos já documentados de determinismo e escalabilidade sem alteração estrutural (02_ARCHITECTURE.md, Seção 15; 06_ASSESSMENT_ENGINE.md, Seções 2 e 18), produz o Confidence Score de forma natural a partir da própria distância (sem heurística adicional) e mantém a separação entre dado (perfil de referência, na Content Library) e lógica (fórmula, na Assessment Engine).

Sistema Baseado em Regras foi rejeitado por violar o requisito de escalabilidade sem reestruturação (adicionar um Arquétipo exige revisar toda a árvore de regras) e por não produzir um Confidence Score contínuo nativamente.

Score Ponderado foi rejeitado por exigir calibração de pesos com sinal (positivo/negativo) por Arquétipo × Dimensão, com risco de resultados degenerados (perfil uniformemente alto vencendo todos os Arquétipos) caso mal calibrado.

Cosine Similarity foi rejeitado por ignorar a magnitude dos Índices Comportamentais (considera apenas a proporção relativa entre eles), o que contradiz o conceito de intensidade comportamental definido em 00A_METHODOLOGY.md, Seção 9.

### Consequências

Positivas:

- Algoritmo de classificação determinístico, documentado e testável.
- Confidence Score bem definido, com faixa oficial e correspondência ao enum `ConfidenceLevel`.
- Regra de desempate única, elimina a contradição entre Business Rules e Assessment Engine.
- Novos Arquétipos podem ser adicionados apenas com um novo `reference_profile`, sem alterar a fórmula.

Negativas:

- Os valores de calibração inicial (`reference_profile`) foram derivados manualmente das descrições textuais de cada Arquétipo, não de dados reais — exigem validação futura.
- Introduz dependência entre Content Library (dado) e Assessment Engine (lógica) que deve ser mantida sincronizada a cada recalibração.

### Documentos relacionados

- 04_BUSINESS_RULES.md
- 05_CONTENT_LIBRARY.md
- 06_ASSESSMENT_ENGINE.md
- 07_DATA_MODEL.md
- 07B_API_CONTRACTS.md
- 00A_METHODOLOGY.md

---

## Próximas decisões

As próximas decisões deverão receber numeração sequencial:

- DEC-0004
- DEC-0005
- DEC-0006
- ...
## Regras

Toda decisão aprovada deve:

- possuir identificador único;
- nunca ser removida;
- ser marcada como **Deprecated** ou **Superseded** caso deixe de valer;
- possuir referências aos documentos afetados;
- ser atualizada antes da implementação correspondente.