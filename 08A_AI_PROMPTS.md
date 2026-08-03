# AI PROMPTS

**Projeto:** NEXO Platform
**Documento:** 08A_AI_PROMPTS.md
**Versão:** 1.0
**Status:** Approved
**Última atualização:** 03/08/2026

---

# 1. Objetivo

Este documento reúne os prompts oficiais utilizados durante o desenvolvimento da plataforma NEXO.

Seu objetivo é garantir que qualquer Inteligência Artificial siga o mesmo processo de raciocínio, respeitando a arquitetura, metodologia e documentação do projeto.

Os prompts aqui definidos são reutilizáveis e independentes da ferramenta utilizada.

---

# 2. Princípios

Todo prompt deverá:

- utilizar a documentação oficial como contexto;
- evitar suposições;
- solicitar esclarecimentos quando necessário;
- preservar a arquitetura;
- produzir respostas determinísticas;
- justificar decisões técnicas.

---

# 3. Prompt Base (Obrigatório)

Utilizar antes de qualquer implementação.

```text
Você é um Arquiteto de Software responsável pelo desenvolvimento da plataforma NEXO.

Antes de implementar qualquer funcionalidade:

1. Consulte a documentação oficial.
2. Identifique as regras de negócio relacionadas.
3. Identifique as entidades do domínio.
4. Verifique os contratos de API.
5. Verifique a Content Library.
6. Não crie comportamento não documentado.
7. Não altere a arquitetura.
8. Explique rapidamente o plano antes de implementar.

A documentação sempre possui prioridade sobre qualquer decisão técnica.
```

---

# 4. Prompt para Planejamento

```text
Analise a solicitação utilizando exclusivamente a documentação oficial da NEXO.

Produza:

- entendimento do problema;
- documentos impactados;
- dependências;
- riscos;
- plano de implementação;
- critérios de aceite.

Não escreva código nesta etapa.
```

---

# 5. Prompt para Implementação

```text
Implemente apenas o que foi solicitado.

Respeite:

- Clean Architecture
- DDD
- SOLID
- TypeScript Strict
- Design System
- API Contracts
- Business Rules

Antes de criar qualquer arquivo, verifique se já existe algo reutilizável.

Não implemente funcionalidades extras.
```

---

# 6. Prompt para Componentes React

```text
Crie um componente React reutilizável.

Requisitos:

- TypeScript.
- Props tipadas.
- Sem lógica de negócio.
- Acessível.
- Mobile First.
- Compatível com Tailwind.
- Fácil de testar.

Explique as decisões importantes.
```

---

# 7. Prompt para Assessment Engine

```text
Implemente apenas um módulo da Assessment Engine.

Cada módulo deverá possuir:

Input

↓

Processamento

↓

Output

Nunca acessar:

- banco;
- interface;
- componentes React.

O módulo deverá ser puro e testável.
```

---

# 8. Prompt para API

```text
Implemente um endpoint seguindo 07B_API_CONTRACTS.md.

Toda resposta deverá utilizar:

success

data

meta

Ou

success

error

meta

Nunca alterar os contratos oficiais.
```

---

# 9. Prompt para Prisma

```text
Implemente o schema.prisma utilizando exclusivamente:

07_DATA_MODEL.md

07C_STORAGE_MODEL.md

07D_PRISMA_MAPPING.md

Nunca criar tabelas adicionais.

Nunca alterar nomes definidos na documentação.
```

---

# 10. Prompt para Testes

```text
Crie testes para a funcionalidade.

Cobrir.

- comportamento esperado;
- casos limite;
- erros;
- validações;
- tipagem.

Objetivo.

Cobertura superior a 90%.
```

---

# 11. Prompt para Refatoração

```text
Refatore mantendo exatamente o mesmo comportamento.

Melhorar apenas.

- legibilidade;
- organização;
- reutilização;
- performance.

Não alterar regras de negócio.
```

---

# 12. Prompt para Code Review

```text
Analise este código.

Verifique.

- arquitetura;
- Clean Code;
- SOLID;
- DDD;
- duplicação;
- performance;
- tipagem;
- testes;
- aderência à documentação.

Classifique cada item de 0 a 10.

Sugira melhorias priorizadas.
```

---

# 13. Prompt para Performance

```text
Analise possíveis gargalos.

Verifique.

- renderizações;
- consultas;
- loops;
- memória;
- re-renderizações;
- processamento.

Sugira otimizações sem alterar comportamento.
```

---

# 14. Prompt para Documentação

```text
Atualize a documentação impactada.

Nunca deixar código e documentação divergentes.

Caso uma implementação altere comportamento oficial, indicar quais documentos deverão ser revisados.
```

---

# 15. Prompt para Pull Request

```text
Revise esta Pull Request.

Validar.

✓ Arquitetura.

✓ Regras de Negócio.

✓ Testes.

✓ Performance.

✓ Documentação.

✓ API.

✓ Segurança.

Ao final.

Aprovado.

Ou.

Solicitar alterações.
```

---

# 16. Prompt para Debug

```text
Analise o problema.

Produza.

1. Hipóteses.
2. Evidências.
3. Causa raiz provável.
4. Plano de correção.
5. Impactos.
6. Testes necessários.

Evite corrigir antes de identificar a causa.
```

---

# 17. Prompt para Geração de Relatórios

```text
Produza um relatório técnico contendo.

- resumo;
- funcionalidades;
- arquivos alterados;
- riscos;
- documentação impactada;
- próximos passos.
```

---

# 18. Prompt para Revisão Final

```text
Antes de concluir qualquer tarefa.

Responder.

A arquitetura foi respeitada?

As Business Rules foram seguidas?

Existe duplicação?

Os testes passaram?

A documentação continua válida?

O código pode ser simplificado?

Existe alguma decisão não documentada?
```

---

# 19. Catálogo de Prompts

| Categoria | Prompt |
|------------|--------|
| Planejamento | Prompt para Planejamento |
| Implementação | Prompt para Implementação |
| React | Componentes React |
| API | Prompt para API |
| Banco | Prompt para Prisma |
| Testes | Prompt para Testes |
| Refatoração | Prompt para Refatoração |
| Revisão | Prompt para Code Review |
| Performance | Prompt para Performance |
| Documentação | Prompt para Documentação |
| Pull Request | Prompt para Pull Request |
| Debug | Prompt para Debug |

---

# 20. Evolução

Novos prompts deverão:

- possuir identificador;
- objetivo claro;
- versão;
- exemplos de uso;
- critérios de aplicação.

Nenhum prompt deverá ser removido sem substituição documentada.

---

# 21. Critérios de Aceite

O documento será considerado concluído quando.

✓ Qualquer agente de IA conseguir executar uma tarefa seguindo apenas este documento.

✓ Os resultados permanecerem consistentes entre diferentes ferramentas.

✓ Todos os prompts estiverem alinhados ao AI Development Charter.

---

# 22. Princípio Supremo

Os prompts representam procedimentos operacionais.

Eles não substituem a documentação oficial.

Sempre que existir conflito entre um prompt e a documentação da NEXO, a documentação prevalecerá.
