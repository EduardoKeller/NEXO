# PRODUCT REQUIREMENTS DOCUMENT (PRD)

**Projeto:** NEXO Platform  
**Documento:** 01_PRD.md  
**Versão:** 2.0  
**Status:** Draft (Sprint 0 Review)  
**Última atualização:** 01/08/2026

---

# 1. Visão do Produto

A NEXO é uma plataforma de Inteligência Comportamental desenvolvida para ajudar pessoas a compreender seus padrões de comportamento relacionados à produtividade, execução e desenvolvimento pessoal.

Por meio de uma avaliação estruturada, a plataforma identifica tendências comportamentais, interpreta os resultados utilizando um mecanismo próprio de análise, gera insights personalizados e apresenta um plano de evolução prático.

A plataforma possui finalidade exclusivamente educativa e não realiza diagnósticos psicológicos, psiquiátricos ou clínicos.

---

# 2. Missão

Ajudar pessoas a compreenderem como seus comportamentos influenciam sua produtividade e fornecer orientações práticas para promover mudanças consistentes ao longo do tempo.

---

# 3. Visão de Longo Prazo

Transformar a NEXO na principal plataforma digital de Inteligência Comportamental da América Latina, oferecendo avaliações, planos personalizados de evolução, acompanhamento contínuo e recursos educacionais baseados em comportamento.

---

# 4. Objetivos do Produto

O usuário deverá ser capaz de:

- realizar uma avaliação comportamental;
- compreender seus padrões predominantes;
- visualizar indicadores comportamentais;
- receber insights personalizados;
- acessar um plano de evolução;
- baixar um relatório personalizado;
- iniciar uma jornada contínua de desenvolvimento.

---

# 5. Público-Alvo

Faixa etária:

18 a 45 anos.

Perfis:

- estudantes;
- profissionais;
- empreendedores;
- criadores de conteúdo;
- pessoas interessadas em produtividade;
- pessoas interessadas em desenvolvimento pessoal.

---

# 6. Problema

Grande parte das pessoas sabe que procrastina ou possui dificuldade para manter consistência, porém não compreende os motivos comportamentais que levam a esse padrão.

As soluções disponíveis normalmente apresentam apenas testes superficiais ou conteúdos genéricos, sem oferecer direcionamentos práticos.

A NEXO busca preencher essa lacuna.

---

# 7. Proposta de Valor

A NEXO entrega uma experiência composta por quatro etapas:

1. Identificação do comportamento.
2. Interpretação dos resultados.
3. Plano personalizado de evolução.
4. Conteúdo educativo para aplicação prática.

O objetivo não é apenas informar um perfil, mas orientar uma evolução contínua.

---

# 8. Escopo do MVP

O MVP deverá conter:

- Landing Page
- Assessment
- Assessment Engine
- Behavior Engine
- Insight Engine (MVP)
- Evolution Engine
- Report Engine
- Página de Resultado
- Relatório em PDF
- Mobile First
- Deploy na Vercel

---

# 9. Fora do Escopo do MVP

Não fazem parte desta versão:

- Login
- Cadastro
- Dashboard
- Histórico de avaliações
- Gamificação
- Comunidade
- Aplicativo Mobile
- Integração com pagamentos
- Área administrativa
- IA Conversacional

Esses itens poderão ser implementados em versões futuras.

---

# 10. Jornada do Usuário

A jornada oficial da plataforma será denominada **NEXO Journey**.

Fluxo:

Landing

↓

Assessment

↓

Behavior Analysis

↓

Insights

↓

Behavior Profile

↓

Evolution Plan

↓

Personalized Report

↓

Mission

↓

Next Step

Cada etapa deverá entregar valor ao usuário e incentivá-lo a continuar sua evolução.

---

# 11. Assessment

A avaliação será composta inicialmente por:

- 10 perguntas;
- 5 dimensões comportamentais;
- 4 perfis predominantes;
- algoritmo baseado em pesos.

A arquitetura deverá permitir expansão futura sem alterações estruturais.

---

# 12. Dimensões Avaliadas

O MVP avaliará cinco dimensões principais.

- Iniciativa
- Planejamento
- Pressão
- Distração
- Consistência

Cada dimensão será composta por indicadores comportamentais específicos.

---

# 13. Perfis

O MVP possuirá quatro perfis predominantes.

- Executor Sob Pressão
- Refinador Estratégico
- Explorador Analítico
- Acumulador de Prioridades

Cada perfil possuirá:

- descrição;
- pontos fortes;
- pontos de atenção;
- plano de evolução;
- exercícios;
- recomendações.

---

# 14. Resultados

Ao concluir a avaliação o usuário receberá:

- Perfil predominante;
- Distribuição dos perfis;
- Indicadores comportamentais;
- Insights personalizados;
- Plano de Evolução;
- Relatório em PDF.

---

# 15. Objetivos de Negócio

O MVP deverá validar:

- interesse do público;
- taxa de conclusão da avaliação;
- taxa de download do relatório;
- percepção de valor;
- potencial de retenção.

---

# 16. Indicadores de Sucesso (KPIs)

Concluir a Assessment:

> 70%

Conversão Landing → Assessment:

> 35%

Download do Relatório:

> 80%

Tempo médio da avaliação:

< 3 minutos

Bounce Rate:

< 45%

---

# 17. Princípios do Produto

Toda funcionalidade deverá seguir os princípios abaixo.

## Educacional

A plataforma possui finalidade educativa.

---

## Baseada em Evidências

As avaliações deverão medir indicadores comportamentais previamente definidos.

---

## Evolução Contínua

Todo resultado deverá gerar um plano de ação.

---

## Clareza

A comunicação deverá ser simples e objetiva.

---

## Mobile First

Toda experiência será projetada inicialmente para smartphones.

---

## Escalabilidade

A arquitetura deverá permitir novas avaliações, novos perfis e novos algoritmos.

---

# 18. Requisitos Não Funcionais

- Mobile First;
- Performance elevada;
- Acessibilidade WCAG AA;
- Lighthouse superior a 95;
- Compatibilidade com navegadores modernos;
- Código em TypeScript;
- Hospedagem na Vercel.

---

# 19. Tecnologias

Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion

Infraestrutura

- Vercel

Documentação

- Markdown

---

# 20. Critérios de Aceite

O MVP será considerado concluído quando:

- Landing Page publicada;
- Assessment funcional;
- Assessment Engine operacional;
- Behavior Engine operacional;
- Insight Engine operacional;
- Evolution Engine operacional;
- Report Engine operacional;
- Resultado correto sendo apresentado;
- PDF gerado corretamente;
- Interface responsiva;
- Deploy realizado.

---

# 21. Restrições

A plataforma não deverá:

- realizar diagnósticos clínicos;
- substituir profissionais especializados;
- utilizar linguagem alarmista;
- induzir respostas;
- coletar dados desnecessários.

---

# 22. Definição de Sucesso

O sucesso do MVP será medido pela capacidade da plataforma de entregar uma experiência clara, rápida e útil, incentivando o usuário a compreender seus padrões comportamentais e iniciar uma jornada prática de evolução.

A principal métrica da NEXO não será apenas a conclusão da avaliação, mas a percepção de valor gerada ao usuário.
