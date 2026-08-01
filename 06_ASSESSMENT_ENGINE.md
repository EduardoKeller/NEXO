# ASSESSMENT ENGINE

**Projeto:** NEXO Platform  
**Documento:** 06_ASSESSMENT_ENGINE.md  
**Versão:** 1.0  
**Status:** Approved  
**Última atualização:** 01/08/2026

---

# 1. Objetivo

A Assessment Engine é o núcleo responsável por executar qualquer avaliação da plataforma NEXO.

Ela recebe uma Assessment configurada, processa as respostas do usuário, calcula os resultados, gera o plano de evolução e retorna um objeto estruturado.

A Engine não possui qualquer dependência da interface gráfica.

Ela poderá ser utilizada por:

- Website
- Aplicativo Mobile
- API
- Inteligência Artificial
- Painel Administrativo
- Integrações futuras

---

# 2. Princípios

A Assessment Engine deverá seguir os princípios abaixo.

- Separação de responsabilidades
- Configuração acima de código
- Independência de framework
- Independência de banco de dados
- Independência da interface
- Alta coesão
- Baixo acoplamento

---

# 3. Fluxo Geral

Assessment

↓

Validação

↓

Processamento

↓

Pontuação

↓

Interpretação

↓

Plano de Evolução

↓

Relatório

↓

Resultado

---

# 4. Pipeline

A Engine deverá executar exatamente esta sequência.

1. Carregar Assessment

↓

2. Validar Estrutura

↓

3. Validar Perguntas

↓

4. Receber Respostas

↓

5. Validar Respostas

↓

6. Calcular Score

↓

7. Calcular Percentuais

↓

8. Identificar Perfil Predominante

↓

9. Identificar Perfis Secundários

↓

10. Calcular Nível de Confiança

↓

11. Gerar Plano de Evolução

↓

12. Gerar Relatório

↓

13. Retornar Resultado

Nenhuma etapa poderá ser ignorada.

---

# 5. Módulos da Engine

A Assessment Engine será composta pelos módulos abaixo.

## Assessment Loader

Responsável por carregar uma Assessment.

Nunca realiza cálculos.

---

## Validation Engine

Valida:

- estrutura
- perguntas
- alternativas
- respostas

Impede processamento inválido.

---

## Score Engine

Responsável exclusivamente pelos cálculos.

Nunca conhece:

- textos
- componentes
- layouts

Recebe:

- perguntas
- respostas
- pesos

Retorna:

Score bruto.

---

## Behavior Engine

Recebe o Score.

Calcula:

- perfil predominante
- distribuição percentual
- perfis secundários
- nível de confiança

---

## Evolution Engine

Recebe o perfil.

Seleciona:

- plano de evolução
- exercícios
- hábitos
- checklist
- recursos

---

## Report Engine

Monta o relatório personalizado.

Não realiza cálculos.

---

## Result Builder

Agrupa todas as informações.

Retorna um único objeto.

---

# 6. Ciclo de Vida

A Assessment passa pelos seguintes estados.

Created

↓

Loaded

↓

Validated

↓

Running

↓

Calculated

↓

Completed

↓

Delivered

---

# 7. Score Engine

Responsabilidades.

Receber respostas.

↓

Aplicar peso da alternativa.

↓

Aplicar peso da pergunta.

↓

Aplicar peso da dimensão.

↓

Somar pontuações.

↓

Retornar Score.

Nunca deverá conhecer perfis por nome.

Utilizar apenas IDs.

---

# 8. Behavior Engine

Responsável por transformar pontuações em comportamento.

Deverá calcular.

- perfil predominante
- percentual
- perfis secundários
- confiança

Nunca gerar textos.

Apenas dados.

---

# 9. Evolution Engine

Recebe o perfil predominante.

Busca na Content Library.

Retorna.

- primeiro passo
- hábito
- exercício
- checklist
- recursos
- missão

Nenhuma regra deverá ficar fixa no código.

---

# 10. Report Engine

Recebe.

- perfil
- evolução
- recursos

Monta.

- relatório
- PDF
- HTML

No MVP.

Gerar apenas PDF.

A arquitetura deverá permitir novos formatos.

---

# 11. Result Builder

Objeto final entregue para qualquer interface.

O Result Builder deverá agrupar.

- assessment
- perfil
- distribuição
- confiança
- evolução
- relatório
- estatísticas

Nenhuma informação deverá ser perdida.

---

# 12. Fluxo de Erros

Caso ocorra erro.

Validation Error

↓

Interromper processamento.

↓

Retornar mensagem amigável.

Nunca gerar resultado parcial.

---

# 13. Cache

A Engine poderá utilizar cache para.

- Assessments
- Perfis
- Relatórios

Nunca armazenar respostas sensíveis além do necessário.

---

# 14. Performance

Tempo máximo esperado.

Carregamento

< 200 ms

Processamento

< 100 ms

Resultado

< 300 ms

Toda operação deverá ser assíncrona quando necessário.

---

# 15. Escalabilidade

A Engine deverá permitir.

- múltiplas Assessments
- múltiplos idiomas
- novos algoritmos
- novos relatórios
- novos perfis
- novas dimensões

Sem alteração estrutural.

---

# 16. Segurança

Nunca confiar em dados recebidos pelo frontend.

Toda resposta deverá ser validada.

Nunca executar regras diretamente na interface.

---

# 17. Testabilidade

Cada módulo deverá possuir testes unitários independentes.

A Engine deverá permitir testes completos sem interface gráfica.

---

# 18. Logs

Registrar apenas eventos técnicos.

Exemplos.

Assessment carregada.

Assessment concluída.

Erro de validação.

Nunca registrar respostas pessoais do usuário em logs.

---

# 19. Dependências

A Engine depende apenas de.

- Content Library
- Business Rules
- Data Model

Não depende de:

- React
- Next.js
- Tailwind
- Banco de Dados

---

# 20. Evolução

No futuro a Engine deverá suportar.

- IA personalizada
- Novos algoritmos
- Machine Learning
- Recomendações inteligentes
- Histórico do usuário
- Gamificação
- Missões adaptativas

Sem reescrever sua arquitetura.

---

# 21. Critérios de Aceite

A Assessment Engine será considerada pronta quando.

✓ Processar qualquer Assessment configurada.

✓ Calcular corretamente os Scores.

✓ Identificar o perfil predominante.

✓ Gerar a distribuição percentual.

✓ Calcular o nível de confiança.

✓ Gerar o plano de evolução.

✓ Gerar o relatório.

✓ Retornar um objeto padronizado.

✓ Permanecer independente da interface.

✓ Ser totalmente reutilizável.
