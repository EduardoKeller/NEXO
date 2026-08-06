# DEVELOPMENT STANDARDS

**Projeto:** NEXO Platform
**Documento:** 12A_DEVELOPMENT_STANDARDS.md
**Versão:** 1.2
**Status:** Approved
**Última atualização:** 05/08/2026

---

# 1. Objetivo

Este documento estabelece os padrões oficiais de desenvolvimento da plataforma NEXO.

Seu objetivo é garantir consistência, legibilidade, manutenção e escalabilidade do código produzido por desenvolvedores e agentes de Inteligência Artificial.

Este documento complementa:

- 02_ARCHITECTURE.md
- 03_DESIGN_SYSTEM.md
- 07E_IMPLEMENTATION_GUIDE.md
- 08_AI_DEVELOPMENT_CHARTER.md
- 12_CONTRIBUTING.md

---

# 2. Princípios

Todo código deverá ser.

- simples;
- previsível;
- reutilizável;
- testável;
- desacoplado;
- documentado.

Sempre escolher a solução mais simples que atenda corretamente ao problema.

---

# 3. Estrutura Oficial

Estrutura definida em 13_DECISION_LOG.md (DEC-0004). Detalhamento completo em 07E_IMPLEMENTATION_GUIDE.md, Seção 5.

```text
src/

app/

features/

core/
    domain/
    engines/
    content/
    contracts/
    errors/
    types/

shared/
    ui/
    hooks/
    lib/
    utils/
    validators/
    constants/

infrastructure/
    database/
    repositories/
    external/

providers/

config/

styles/

middleware/

tests/
```

Componentes de interface reutilizáveis (Button, Card, ProgressBar...) vivem em `shared/ui/`. Componentes específicos de uma funcionalidade vivem dentro da própria Feature (`features/assessment/components/`).

Nenhum código deverá ser criado fora desta estrutura sem justificativa.

---

# 4. Convenções de Nome

## Componentes

PascalCase

```text
AssessmentCard.tsx

ProgressBar.tsx

ResultSummary.tsx
```

---

## Hooks

camelCase iniciando com use.

```text
useAssessment.ts

useProgress.ts

useTheme.ts
```

---

## Services

camelCase.

```text
assessmentService.ts

reportService.ts
```

---

## Engines

PascalCase.

```text
ValidationEngine.ts

ScoreEngine.ts

InsightEngine.ts
```

---

## Tipos

PascalCase.

```text
Assessment.ts

BehaviorIndex.ts

Insight.ts
```

---

## Constantes

UPPER_SNAKE_CASE.

```typescript
MAX_QUESTIONS

DEFAULT_LANGUAGE

ASSESSMENT_TIMEOUT
```

---

# 5. Organização dos Componentes

Cada componente deverá possuir.

```text
Component/

Component.tsx

Component.types.ts

Component.test.tsx

index.ts
```

Quando necessário.

```text
Component.module.css
```

Caso Tailwind não seja suficiente.

---

# 6. Componentes React

Todo componente deverá.

✓ possuir responsabilidade única.

✓ receber Props tipadas.

✓ evitar estado desnecessário.

✓ evitar lógica de negócio.

✓ ser reutilizável.

Nunca acessar diretamente.

- banco;
- APIs;
- Assessment Engine.

---

# 7. Hooks

Um Hook deverá.

- resolver apenas um problema;
- possuir nome descritivo;
- não depender da interface.

Evitar Hooks gigantes.

---

# 8. Services

Services deverão conter apenas.

- chamadas externas;
- integração;
- adaptação.

Nunca.

✖ lógica de interface.

✖ renderização.

✖ regras de negócio.

---

# 9. Engines

Toda Engine deverá seguir.

```text
Input

↓

Validation

↓

Processing

↓

Output
```

Engines deverão ser funções puras sempre que possível.

---

# 10. TypeScript

Obrigatório.

- strict mode.

- noImplicitAny.

- exactOptionalPropertyTypes.

- readonly sempre que possível.

Nunca utilizar.

```typescript
any
```

Preferir.

```typescript
unknown
```

Quando necessário.

---

# 11. Tratamento de Erros

Sempre utilizar erros estruturados.

```typescript
AppError {

code

message

details

}
```

Nunca lançar strings.

---

# 12. Logs

Logs deverão possuir.

- contexto;
- nível;
- timestamp;
- requestId (quando aplicável).

Nunca registrar dados sensíveis.

---

# 13. APIs

Toda API deverá seguir.

07B_API_CONTRACTS.md

Formato oficial.

```json
{
  "success": true,
  "data": {},
  "meta": {}
}
```

ou

```json
{
  "success": false,
  "error": {},
  "meta": {}
}
```

---

# 14. Banco de Dados

Persistência deverá seguir.

- 07C_STORAGE_MODEL.md
- 07D_PRISMA_MAPPING.md

Nunca acessar banco diretamente pela interface.

---

# 15. Testes

Todo módulo crítico deverá possuir.

- teste unitário;
- casos de erro;
- casos limite.

Fluxos principais deverão possuir testes de integração.

Fluxos completos deverão possuir testes E2E.

---

# 16. Performance

Evitar.

- renderizações desnecessárias;
- consultas repetidas;
- processamento duplicado;
- estruturas complexas sem necessidade.

Priorizar legibilidade antes de micro-otimizações.

---

# 17. Segurança

Toda entrada deverá ser validada.

Nunca confiar em dados recebidos.

Nunca expor.

- tokens;
- segredos;
- informações sensíveis.

---

# 18. Documentação

Sempre que alterar comportamento oficial.

Atualizar.

- documentação relacionada;
- Changelog;
- Release Notes (quando necessário).

Código e documentação deverão permanecer sincronizados.

---

# 19. Anti-Patterns

Nunca.

✖ Criar componentes gigantes.

✖ Duplicar lógica.

✖ Utilizar any.

✖ Misturar UI com regras de negócio.

✖ Criar dependências circulares.

✖ Ignorar tipagem.

✖ Ignorar contratos.

✖ Criar funções com múltiplas responsabilidades.

---

# 20. Checklist

Antes de finalizar.

✓ Código simples.

✓ Tipagem completa.

✓ Testes aprovados.

✓ Documentação atualizada.

✓ Performance adequada.

✓ Sem duplicação.

✓ Arquitetura respeitada.

---

# 21. Critérios de Aceite

Este documento será considerado aprovado quando.

✓ Todos os padrões técnicos estiverem documentados.

✓ O código produzido por diferentes desenvolvedores seguir a mesma estrutura.

✓ Os agentes de IA utilizarem estas convenções como referência obrigatória.

---

# 22. Princípio Supremo

A qualidade da plataforma NEXO depende da consistência do seu código.

Os padrões definidos neste documento existem para reduzir complexidade, facilitar manutenção e garantir que o software permaneça sustentável ao longo de sua evolução.
