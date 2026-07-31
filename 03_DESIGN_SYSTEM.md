---

# 23. Design Tokens

Toda a interface deverá utilizar Design Tokens.

Nenhum componente poderá utilizar valores fixos de cores, espaçamentos, bordas ou tipografia diretamente.

Os tokens deverão ser centralizados para facilitar futuras alterações de identidade visual.

## Cores

```css
--color-background
--color-surface
--color-surface-hover

--color-primary
--color-primary-hover

--color-success
--color-error

--color-text-primary
--color-text-secondary

--color-border
```

## Espaçamentos

```css
--space-xs
--space-sm
--space-md
--space-lg
--space-xl
--space-2xl
```

## Bordas

```css
--radius-sm
--radius-md
--radius-lg
--radius-xl
```

## Tipografia

```css
--font-display
--font-title
--font-body
--font-caption
```

Todos os componentes deverão utilizar exclusivamente esses tokens.

---

# 24. Biblioteca Oficial de Componentes

Todo componente deverá possuir uma única responsabilidade.

A identidade visual deverá ser consistente em toda a aplicação.

## Button

Variantes oficiais:

- Primary
- Secondary
- Ghost
- Loading

Nunca criar novos estilos de botão sem necessidade.

---

## Card

Variantes oficiais:

- Default
- Question
- Result
- Profile

---

## Badge

Variantes oficiais:

- Success
- Warning
- Info

---

## Progress Bar

Utilizada apenas durante:

- Questionário
- Processamento

Sempre apresentar animação suave.

---

## Inputs

Componentes oficiais:

- Text Input
- Email Input
- Radio Group

Todos deverão seguir exatamente o mesmo padrão visual.

---

## Feedback

Componentes obrigatórios:

- Loading Screen
- Error Message
- Success Message
- Empty State

Todos devem reutilizar o mesmo padrão visual.

---

# 25. Estados Visuais

Todos os componentes interativos deverão possuir obrigatoriamente os estados abaixo.

## Default

Estado inicial.

---

## Hover

Pequena alteração visual.

Sem animações exageradas.

---

## Active

Feedback imediato ao clique.

---

## Focus

Sempre visível.

Compatível com navegação por teclado.

---

## Disabled

Redução de contraste.

Nunca remover completamente o componente.

---

## Loading

Indicador visual.

Jamais bloquear a interface sem feedback.

---

# 26. Consistência Visual

Todos os componentes devem seguir as mesmas regras.

Mesmo espaçamento.

Mesmo raio.

Mesma tipografia.

Mesmo comportamento.

Nunca criar exceções sem justificativa.

---

# 27. Evolução do Design System

Toda nova tela deverá utilizar exclusivamente componentes existentes.

Caso um novo componente seja necessário:

1. Verificar se existe componente semelhante.

2. Verificar se pode ser reutilizado.

3. Caso não exista, adicionar oficialmente ao Design System.

Nenhum componente deverá ser criado apenas para uma única tela.

---

# 28. Critérios de Aprovação do Design

Uma interface somente será considerada concluída quando atender aos critérios abaixo.

- Interface limpa.
- Mobile First.
- Responsiva.
- Apenas uma ação principal por tela.
- Hierarquia visual clara.
- Componentes reutilizáveis.
- Design Tokens utilizados.
- Sem estilos duplicados.
- Sem valores fixos espalhados pelo código.
- Consistente com toda a identidade visual da NEXO.
