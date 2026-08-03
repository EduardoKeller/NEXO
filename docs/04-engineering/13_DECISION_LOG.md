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

## Próximas decisões

As próximas decisões deverão receber numeração sequencial:

- DEC-0003
- DEC-0004
- DEC-0005
- ...
## Regras

Toda decisão aprovada deve:

- possuir identificador único;
- nunca ser removida;
- ser marcada como **Deprecated** ou **Superseded** caso deixe de valer;
- possuir referências aos documentos afetados;
- ser atualizada antes da implementação correspondente.