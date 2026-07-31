# Architecture Document

**Projeto:** NEXO
**Versão:** 1.0
**Status:** MVP

---

# 1. Objetivo

Este documento define toda a arquitetura técnica da plataforma NEXO.

Seu objetivo é garantir organização, padronização, escalabilidade e facilidade de manutenção.

Toda implementação deve seguir obrigatoriamente este documento.

Caso exista conflito entre este documento e qualquer implementação, a implementação deverá ser revisada.

---

# 2. Filosofia da Arquitetura

Toda decisão técnica deve respeitar os princípios abaixo.

- Mobile First
- Componentização
- Separação de responsabilidades
- Código reutilizável
- Performance
- Escalabilidade
- Acessibilidade
- Simplicidade

Nenhuma decisão deve priorizar velocidade de desenvolvimento em detrimento da qualidade da arquitetura.

---

# 3. Stack Tecnológica

## Framework

Next.js 15

(App Router)

## Linguagem

TypeScript

Strict Mode obrigatório.

## Estilização

Tailwind CSS

## Animações

Framer Motion

## Ícones

Lucide React

## Deploy

Vercel

---

# 4. Estrutura Oficial do Projeto

A estrutura deverá seguir exatamente o padrão abaixo.

```text
nexo/
│
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   ├── globals.css
│   │
│   ├── quiz/
│   │   └── page.tsx
│   │
│   ├── result/
│   │   └── page.tsx
│   │
│   ├── privacy/
│   │   └── page.tsx
│   │
│   └── terms/
│       └── page.tsx
│
├── components/
│   ├── ui/
│   ├── layout/
│   ├── quiz/
│   └── result/
│
├── data/
│   ├── questions.ts
│   ├── profiles.ts
│   └── constants.ts
│
├── services/
│   └── profileCalculator.ts
│
├── hooks/
│
├── lib/
│
├── types/
│
├── assets/
│
├── public/
│
├── docs/
│
└── styles/
```

Nenhuma pasta deverá possuir responsabilidade duplicada.

---

# 5. Arquitetura Baseada em Dados

A aplicação deverá ser orientada por dados.

Nenhuma pergunta deverá ficar escrita diretamente dentro dos componentes React.

Todas as perguntas deverão estar em:

```
data/questions.ts
```

Todos os perfis deverão estar em:

```
data/profiles.ts
```

Toda lógica de cálculo deverá estar em:

```
services/profileCalculator.ts
```

Essa arquitetura permitirá criar novos diagnósticos futuramente sem alterar a interface.

---

# 6. Organização dos Componentes

Cada componente deverá possuir apenas uma responsabilidade.

Exemplos:

Button

↓

renderizar botão.

QuestionCard

↓

renderizar pergunta.

ProgressBar

↓

renderizar progresso.

LoadingScreen

↓

renderizar processamento.

ProfileCard

↓

renderizar resultado.

Jamais criar componentes responsáveis por múltiplas funcionalidades.

---

# 7. Separação de Responsabilidades

A arquitetura deverá respeitar rigorosamente a separação abaixo.

## UI

Responsável apenas pela renderização.

Nunca conter regras de negócio.

---

## Business

Responsável pelo cálculo dos perfis.

Nunca renderizar componentes.

---

## Data

Responsável apenas por armazenar perguntas, perfis e constantes.

---

## Services

Responsável pelo processamento.

---

## Utils

Responsável apenas por funções auxiliares.

---

# 8. Estrutura do Questionário

Cada pergunta deverá possuir obrigatoriamente:

```ts
id

title

description

options

order
```

Cada alternativa deverá possuir:

```ts
id

label

profile
```

Nunca utilizar textos fixos dentro dos componentes.

---

# 9. Estrutura dos Perfis

Cada perfil deverá possuir:

```ts
id

name

description

strengths

weaknesses

recommendation

pdf
```

O conteúdo textual ficará exclusivamente em `data/profiles.ts`.

---

# 10. Fluxo da Aplicação

Landing

↓

Quiz

↓

Loading

↓

Resultado

↓

Download PDF

Nunca permitir que o usuário pule etapas.

---

# 11. Estados da Aplicação

A aplicação deverá possuir apenas os estados abaixo.

Landing

Questionário

Calculando

Resultado

Erro

Loading

Todos deverão possuir tratamento visual.

---

# 12. Gerenciamento de Estado

Utilizar estado local sempre que possível.

React Context apenas quando realmente necessário.

Evitar bibliotecas externas durante o MVP.

---

# 13. Performance

Objetivos mínimos.

Primeira renderização inferior a 2 segundos.

Lighthouse

Performance >=95

Accessibility >=95

SEO >=95

Best Practices >=95

Evitar bibliotecas pesadas.

Evitar renderizações desnecessárias.

---

# 14. Responsividade

A aplicação deverá ser desenvolvida seguindo Mobile First.

Larguras mínimas suportadas.

360px

375px

390px

414px

768px

1024px

1280px

Jamais utilizar larguras fixas.

Jamais permitir scroll horizontal.

Toda pergunta deverá ocupar apenas uma tela.

---

# 15. Acessibilidade

Seguir WCAG AA.

Contraste adequado.

ARIA Labels.

Suporte para teclado.

Foco visível.

Redução de animações quando solicitado pelo sistema operacional.

---

# 16. Convenções

Componentes

PascalCase

Hooks

useCamelCase

Arquivos utilitários

camelCase

Pastas

kebab-case

Nunca utilizar nomes genéricos.

Exemplo incorreto.

```
utils.ts
```

Correto.

```
profileCalculator.ts
```

---

# 17. Escalabilidade

A arquitetura deverá permitir futuramente.

Novos diagnósticos.

Novos perfis.

Novos relatórios.

Novos idiomas.

Autenticação.

Painel administrativo.

Sem necessidade de reestruturar o projeto.

---

# 18. Boas Práticas

Nunca utilizar any.

Nunca duplicar código.

Nunca misturar UI e regras de negócio.

Sempre reutilizar componentes.

Sempre utilizar tipagem explícita.

Sempre separar dados da interface.

---

# 19. Checklist Arquitetural

Antes de qualquer implementação responder.

Existe componente reutilizável?

Existe código semelhante?

A responsabilidade está correta?

O componente é pequeno?

A implementação respeita Mobile First?

O código é escalável?

Se qualquer resposta for negativa, a implementação deverá ser revisada.

---

# 20. Critério de Aceite

A arquitetura será considerada correta quando.

✔ Estrutura respeitada.

✔ Componentes reutilizáveis.

✔ Dados separados da interface.

✔ Responsabilidades desacopladas.

✔ Código tipado.

✔ Mobile First.

✔ Build sem erros.

✔ Projeto preparado para crescimento.
