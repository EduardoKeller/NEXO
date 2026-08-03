# AI CONTEXT PACKS

**Projeto:** NEXO Platform  
**Documento:** 08E_AI_CONTEXT_PACKS.md  
**Versão:** 1.0  
**Status:** Approved  
**Última atualização:** 03/08/2026

---

# 1. Objetivo

Este documento define os Context Packs oficiais da plataforma NEXO.

Cada Context Pack representa um conjunto mínimo de documentos necessários para executar uma determinada atividade.

O objetivo é.

- reduzir consumo de contexto;
- aumentar consistência;
- acelerar respostas da IA;
- evitar consultas desnecessárias.

---

# 2. Princípios

Todo Context Pack deverá.

- conter apenas documentos relevantes;
- ser reutilizável;
- possuir objetivo claro;
- possuir versão;
- ser mantido atualizado.

Sempre utilizar o menor contexto possível.

---

# 3. Estrutura

Todo Context Pack deverá possuir.

- Nome
- Objetivo
- Personas
- Documentos
- Entradas
- Saídas
- Checklist

---

# 4. Foundation Pack

## Objetivo

Compreender a visão geral da NEXO.

---

## Documentos

00_VISION.md

00A_METHODOLOGY.md

00B_PERSONAS.md

00C_GLOSSARY.md

00D_BRAND_GUIDELINES.md

00E_PRODUCT_PRINCIPLES.md

---

## Utilizado por

- Software Architect
- Product Engineer

---

# 5. Product Pack

## Objetivo

Implementar funcionalidades.

---

## Documentos

01_PRD.md

02_ARCHITECTURE.md

03_DESIGN_SYSTEM.md

04_BUSINESS_RULES.md

05_CONTENT_LIBRARY.md

---

## Personas

- Product Engineer
- Frontend Engineer
- Backend Engineer

---

# 6. Assessment Pack

## Objetivo

Implementar a Assessment Engine.

---

## Documentos

04_BUSINESS_RULES.md

05_CONTENT_LIBRARY.md

06_ASSESSMENT_ENGINE.md

07_DATA_MODEL.md

---

## Personas

- Backend Engineer
- Software Architect

---

# 7. Frontend Pack

## Objetivo

Construir interfaces.

---

## Documentos

01_PRD.md

02_ARCHITECTURE.md

03_DESIGN_SYSTEM.md

07B_API_CONTRACTS.md

---

## Personas

- Frontend Engineer

---

# 8. Backend Pack

## Objetivo

Construir APIs e serviços.

---

## Documentos

04_BUSINESS_RULES.md

06_ASSESSMENT_ENGINE.md

07_DATA_MODEL.md

07B_API_CONTRACTS.md

---

## Personas

- Backend Engineer

---

# 9. Data Pack

## Objetivo

Persistência.

---

## Documentos

07_DATA_MODEL.md

07C_STORAGE_MODEL.md

07D_PRISMA_MAPPING.md

---

## Personas

- Data Engineer

---

# 10. API Pack

## Objetivo

Criar APIs.

---

## Documentos

07B_API_CONTRACTS.md

07_DATA_MODEL.md

06_ASSESSMENT_ENGINE.md

---

## Personas

- Backend Engineer

---

# 11. Testing Pack

## Objetivo

Criar testes.

---

## Documentos

04_BUSINESS_RULES.md

07B_API_CONTRACTS.md

09_DEFINITION_OF_DONE.md

---

## Personas

- QA Engineer

---

# 12. Documentation Pack

## Objetivo

Atualizar documentação.

---

## Documentos

Todos os documentos impactados.

11_CHANGELOG.md

13_DECISION_LOG.md

---

## Personas

- Technical Writer

---

# 13. Release Pack

## Objetivo

Preparar uma Release.

---

## Documentos

09_DEFINITION_OF_DONE.md

10_ROADMAP.md

11_CHANGELOG.md

08C_AI_WORKFLOWS.md

---

## Personas

- AI Reviewer

---

# 14. Review Pack

## Objetivo

Realizar revisão técnica.

---

## Documentos

Arquivos alterados

Documentação impactada

08_AI_DEVELOPMENT_CHARTER.md

09_DEFINITION_OF_DONE.md

---

## Personas

- AI Reviewer
- Software Architect

---

# 15. Context Matrix

| Atividade | Context Pack |
|-----------|--------------|
| Nova funcionalidade | Product Pack |
| Nova tela | Frontend Pack |
| Nova API | API Pack |
| Nova Engine | Assessment Pack |
| Banco de Dados | Data Pack |
| Testes | Testing Pack |
| Revisão | Review Pack |
| Release | Release Pack |
| Documentação | Documentation Pack |

---

# 16. Context Loading Order

Sempre carregar os Context Packs nesta ordem.

Foundation

↓

Especializado

↓

Arquivos alterados

↓

Prompt

↓

Implementação

---

# 17. Context Refresh

Sempre recarregar o contexto quando.

- houver alteração na documentação;
- iniciar uma nova Sprint;
- mudar de domínio;
- existir conflito entre documentos.

---

# 18. Versionamento

Todo Context Pack deverá possuir.

- versão;
- data de atualização;
- documentos incluídos.

Sempre refletindo a documentação oficial.

---

# 19. Checklist

Antes de iniciar qualquer tarefa.

✓ O Context Pack correto foi carregado?

✓ A documentação está atualizada?

✓ Os documentos necessários estão completos?

✓ Não existem documentos conflitantes?

---

# 20. Evolução

Novos Context Packs poderão ser adicionados.

Exemplos futuros.

- Mobile Pack
- AI Coach Pack
- Analytics Pack
- Dashboard Pack
- Gamification Pack

---

# 21. Critérios de Aceite

Este documento será considerado aprovado quando.

✓ Cada atividade possuir um Context Pack definido.

✓ Não houver documentos redundantes.

✓ O carregamento de contexto for reproduzível.

✓ As Personas utilizarem apenas os documentos necessários.

---

# 22. Princípio Supremo

Toda Inteligência Artificial deverá trabalhar com contexto controlado.

Mais contexto não significa melhor resultado.

O melhor resultado é obtido utilizando exatamente a documentação necessária para executar a tarefa com qualidade, consistência e previsibilidade.
