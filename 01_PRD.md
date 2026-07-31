# Product Requirements Document (PRD)

**Projeto:** NEXO
**Versão:** 1.0
**Status:** MVP
**Autor:** Eduardo Keller
**Última atualização:** 31/07/2026

---

# 1. Visão do Produto

## Objetivo

A NEXO é uma plataforma digital de autoconhecimento que ajuda pessoas a compreender padrões de comportamento relacionados à produtividade, foco e procrastinação.

O primeiro produto da plataforma será um questionário interativo capaz de identificar um perfil comportamental predominante e apresentar um relatório personalizado com orientações práticas.

A aplicação possui caráter exclusivamente educativo e informativo, não realizando diagnósticos clínicos, psicológicos ou médicos.

---

# 2. Problema

Milhões de pessoas acreditam que procrastinam apenas por falta de disciplina.

Na prática, diferentes padrões comportamentais podem influenciar a forma como cada indivíduo inicia tarefas, toma decisões e reage à pressão.

Hoje não existe uma ferramenta simples, rápida e visual que ajude o usuário a compreender esses padrões de forma acessível.

---

# 3. Objetivo do MVP

Construir uma aplicação web capaz de:

- apresentar um questionário interativo;
- identificar um perfil comportamental predominante;
- exibir um resultado personalizado;
- disponibilizar um relatório gratuito em PDF.

O MVP tem como principal objetivo validar o interesse dos usuários e a experiência proposta.

---

# 4. Público-alvo

Faixa etária:

18 a 45 anos.

Perfis mais comuns:

- estudantes;
- profissionais;
- empreendedores;
- criadores de conteúdo;
- pessoas interessadas em produtividade;
- pessoas interessadas em desenvolvimento pessoal.

---

# 5. Proposta de Valor

Em poucos minutos o usuário consegue compreender melhor como costuma agir diante de tarefas importantes, recebendo uma explicação clara e recomendações práticas para iniciar mudanças.

A proposta da NEXO é oferecer clareza, e não rótulos.

---

# 6. Escopo do MVP

O MVP deverá possuir apenas as funcionalidades abaixo.

## Landing Page

Apresentação da plataforma e convite para iniciar o questionário.

---

## Questionário

Questionário composto por cinco perguntas objetivas.

Cada pergunta possui quatro alternativas.

---

## Processamento

Após responder todas as perguntas, o sistema deverá calcular automaticamente o perfil predominante.

---

## Resultado

Exibição do perfil identificado contendo:

- nome do perfil;
- descrição;
- pontos fortes;
- pontos de atenção;
- recomendação inicial.

---

## Relatório

Disponibilização de um relatório em PDF relacionado ao resultado apresentado.

---

# 7. Fora do Escopo

As funcionalidades abaixo não fazem parte da primeira versão.

- autenticação;
- cadastro de usuários;
- painel administrativo;
- dashboard;
- histórico de resultados;
- pagamentos;
- integração com plataformas de afiliados;
- envio automático de e-mails;
- inteligência artificial.

---

# 8. Fluxo Principal

Landing Page

↓

Introdução

↓

Pergunta 1

↓

Pergunta 2

↓

Pergunta 3

↓

Pergunta 4

↓

Pergunta 5

↓

Processamento

↓

Resultado

↓

Download do relatório

---

# 9. Perfis

A primeira versão deverá possuir quatro perfis comportamentais.

- Reativo
- Perfeccionista
- Analítico
- Sobrecarregado

A definição detalhada de cada perfil será descrita no documento Business Rules.

---

# 10. Requisitos Funcionais

RF-01

O usuário deve conseguir iniciar o questionário.

RF-02

O sistema deve apresentar uma pergunta por vez.

RF-03

Todas as perguntas são obrigatórias.

RF-04

O sistema deve calcular automaticamente o perfil predominante.

RF-05

O sistema deve apresentar o resultado imediatamente após o processamento.

RF-06

O sistema deve permitir o download do relatório correspondente.

---

# 11. Requisitos Não Funcionais

RNF-01

A aplicação deve seguir abordagem Mobile First.

RNF-02

A interface deve ser responsiva.

RNF-03

O carregamento deve ser rápido.

RNF-04

A navegação deve ser intuitiva.

RNF-05

O sistema deve seguir boas práticas de acessibilidade.

RNF-06

A aplicação deve transmitir sensação de simplicidade, confiança e qualidade.

---

# 12. Critérios de Sucesso do MVP

O MVP será considerado concluído quando:

- o questionário estiver funcional;
- o cálculo do perfil estiver correto;
- o resultado for exibido corretamente;
- o relatório estiver disponível para download;
- a aplicação estiver totalmente responsiva;
- a aplicação estiver publicada em ambiente de produção.

---

# 13. Critérios de Aceite

A entrega será aceita quando:

- todos os requisitos funcionais forem atendidos;
- todos os fluxos estiverem funcionando;
- não existirem erros críticos;
- a navegação funcionar em dispositivos móveis e desktop;
- o usuário conseguir concluir toda a jornada sem assistência.

---

# 14. Evoluções Futuras

Versão 1.1

- analytics;
- métricas de conversão.

Versão 1.2

- captura de e-mail;
- envio automático do relatório.

Versão 2.0

- múltiplos diagnósticos;
- área do usuário;
- painel administrativo;
- recomendações personalizadas.

---

# 15. Princípios do Produto

A NEXO seguirá permanentemente os princípios abaixo.

- Clareza acima de complexidade.
- Simplicidade acima de excesso de funcionalidades.
- Mobile First.
- Performance acima de efeitos visuais.
- Conteúdo baseado em comportamento, nunca em diagnósticos clínicos.
- Experiência premium em toda a jornada.
- Arquitetura preparada para crescimento futuro.
