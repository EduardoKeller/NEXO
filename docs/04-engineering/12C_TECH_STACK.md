# TECH STACK

**Projeto:** NEXO Platform
**Documento:** 12C_TECH_STACK.md
**Versão:** 1.2
**Status:** Approved
**Última atualização:** 07/08/2026

---

# 1. Objetivo

Este documento define oficialmente a Stack Tecnológica da plataforma NEXO.

Seu objetivo é garantir consistência tecnológica durante todo o ciclo de vida do projeto.

Toda tecnologia utilizada deverá estar documentada neste arquivo.

---

# 2. Princípios

A escolha de tecnologias deverá priorizar.

- simplicidade;
- estabilidade;
- comunidade ativa;
- documentação;
- performance;
- manutenção de longo prazo.

Novidade não é critério de adoção.

---

# 3. Arquitetura Geral

```text
                Frontend

                   │

                   ▼

              Next.js 16

                   │

                   ▼

            Application Layer

                   │

                   ▼

               Domain Layer

                   │

                   ▼

            Infrastructure

                   │

                   ▼

              PostgreSQL
```

---

# 4. Frontend

## Framework

Next.js 16 (versão estável mais recente — ver 13_DECISION_LOG.md, DEC-0006)

Motivo.

- App Router
- Server Components
- Performance
- Ecossistema
- Longo suporte

---

## Linguagem

TypeScript

Modo.

Strict

---

## Biblioteca de Interface

React

---

## Estilização

Tailwind CSS v4

---

## Componentes

shadcn/ui (style `base-nova`, sobre `@base-ui/react`)

---

## Ícones

Lucide React

---

## Formulários

React Hook Form

---

## Validação

Zod

---

# 5. Backend

## Runtime

Node.js LTS

---

## Framework

Next.js Route Handlers

---

## Validação

Zod

---

## Serviços

TypeScript

---

## Autenticação

Reservado para futura implementação.

---

# 6. Banco de Dados

## Banco

PostgreSQL

---

## ORM

Prisma ORM

---

## Migrações

Prisma Migrate

---

## Seeds

Prisma Seed

---

# 7. Testes

## Unitários

Vitest

---

## Integração

Vitest

---

## End-to-End

Playwright

---

## Cobertura

Objetivo.

≥90%

---

# 8. Qualidade

## Linter

ESLint

---

## Formatação

Prettier

---

## Git Hooks

Husky

---

## Pré-commit

lint-staged

---

# 9. Build

## Bundler

Turbopack (quando estável para produção)

Fallback.

Webpack (quando necessário)

---

# 10. Deploy

## Plataforma

Vercel

---

## Ambientes

Development

↓

Preview

↓

Production

---

# 11. Observabilidade

## Logs

Console estruturado (MVP)

---

## Monitoramento

Sentry (planejado)

---

## Métricas

OpenTelemetry (futuro)

---

# 12. Documentação

## Markdown

Documentação oficial.

---

## Diagramas

Mermaid (preferencial)

ASCII (quando apropriado)

---

# 13. Bibliotecas Aprovadas

## Interface

- React
- Tailwind CSS
- shadcn/ui
- Lucide React
- @base-ui/react (primitivos headless do style `base-nova` de shadcn/ui)
- next-themes (alternância de tema)
- sonner (notificações Toast, componente shadcn/ui)

---

## Utilitários

- clsx
- class-variance-authority
- date-fns
- tailwind-merge (usado por `cn()`)
- tw-animate-css (utilitários de animação compatíveis com Tailwind v4)

---

## Dados

- Prisma
- Zod

---

## Testes

- Vitest
- Playwright

---

## Qualidade

- ESLint
- Prettier
- Husky
- lint-staged

---

# 14. Bibliotecas Experimentais

Poderão ser avaliadas.

- TanStack Query
- React Aria
- OpenTelemetry
- Zustand (caso necessário)

Toda adoção deverá ser registrada no Decision Log.

---

# 15. Tecnologias Não Aprovadas

Evitar.

- JavaScript sem TypeScript.
- CSS global para componentes.
- Múltiplos frameworks de UI.
- ORMs paralelos.
- Gerenciadores de estado desnecessários.
- Bibliotecas sem manutenção ativa.

---

# 16. Atualização de Dependências

Atualizações deverão seguir.

```text
Análise

↓

Compatibilidade

↓

Testes

↓

Review

↓

Merge
```

Nunca atualizar dependências críticas diretamente em produção.

---

# 17. Critérios para Adoção de Nova Tecnologia

Uma nova tecnologia somente poderá ser adicionada quando.

✓ Resolver problema real.

✓ Possuir documentação.

✓ Possuir comunidade ativa.

✓ Não duplicar funcionalidades existentes.

✓ Ser aprovada pela arquitetura.

✓ Ser registrada no Decision Log.

---

# 18. Compatibilidade

Sempre utilizar versões LTS ou estáveis.

Evitar versões beta ou RC em produção.

Exceções deverão ser justificadas.

---

# 19. Checklist

Antes de adicionar uma biblioteca.

- Existe alternativa já utilizada?
- Resolve um problema real?
- Aumenta a complexidade?
- Está alinhada à arquitetura?
- Possui manutenção ativa?
- Impacta performance?

---

# 20. Evolução

A Stack Tecnológica poderá evoluir.

Toda mudança deverá.

- ser documentada;
- possuir justificativa;
- atualizar este documento;
- ser registrada no Decision Log;
- refletir no Changelog.

---

# 21. Critérios de Aceite

Este documento será considerado aprovado quando.

✓ Toda tecnologia utilizada estiver documentada.

✓ Os critérios de adoção estiverem definidos.

✓ A equipe conseguir tomar decisões técnicas seguindo apenas este documento.

✓ O projeto possuir uma stack consistente e sustentável.

---

# 22. Princípio Supremo

A Stack Tecnológica existe para servir ao produto.

Nenhuma tecnologia deverá ser adotada apenas por tendência de mercado.

A melhor tecnologia é aquela que resolve o problema com simplicidade, estabilidade e facilidade de manutenção.
