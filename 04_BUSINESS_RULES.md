# BUSINESS RULES

**Projeto:** NEXO Platform  
**Documento:** 04_BUSINESS_RULES.md  
**Versão:** 3.0  
**Status:** Approved  
**Última atualização:** 01/08/2026

---

# 1. Objetivo

Este documento define as regras de negócio oficiais da plataforma NEXO.

Seu objetivo é estabelecer o comportamento esperado das Avaliações NEXO, independentemente da tecnologia utilizada.

Este documento não define arquitetura, implementação ou interface.

Toda alteração funcional da plataforma deverá ser refletida aqui antes da implementação.

---

# 2. Princípios da Plataforma

A NEXO é uma plataforma de desenvolvimento pessoal baseada em avaliações comportamentais.

Seu objetivo é identificar tendências de comportamento e oferecer informações que promovam autoconhecimento.

A plataforma possui finalidade exclusivamente educativa.

A NEXO:

✔ identifica tendências comportamentais

✔ apresenta recomendações práticas

✔ incentiva reflexão

✔ promove evolução contínua

A NEXO NÃO:

✖ realiza diagnósticos médicos

✖ realiza diagnósticos psicológicos

✖ substitui profissionais especializados

✖ promete resultados garantidos

---

# 3. Terminologia Oficial

Os seguintes termos deverão ser utilizados em toda a plataforma.

Assessment

Avaliação composta por perguntas organizadas para identificar padrões comportamentais.

Dimension

Área específica de comportamento analisada.

Question

Pergunta pertencente a uma dimensão.

Option

Alternativa de resposta.

Profile

Perfil comportamental identificado ao final da avaliação.

Assessment Result

Resultado consolidado da avaliação.

Personalized Report

Relatório personalizado entregue ao usuário.

---

# 4. Estrutura da Avaliação

Toda avaliação deverá possuir:

- título
- descrição
- objetivo
- conjunto de dimensões
- conjunto de perguntas
- conjunto de perfis
- regras de pontuação
- modelo de relatório

Nenhuma avaliação poderá existir sem essas informações.

---

# 5. Dimensões

Toda avaliação deverá ser dividida em dimensões comportamentais.

Cada dimensão representa uma competência ou aspecto específico do comportamento humano.

Uma dimensão deverá possuir pelo menos uma pergunta.

---

# 6. Perguntas

Cada pergunta deverá:

- pertencer a apenas uma dimensão;
- possuir quatro alternativas;
- possuir peso configurável;
- ser obrigatória.

O usuário somente poderá concluir a avaliação após responder todas as perguntas.

---

# 7. Alternativas

Cada alternativa deverá estar vinculada a apenas um perfil comportamental.

Cada alternativa possui um peso próprio.

Não será permitido que uma alternativa pontue simultaneamente para mais de um perfil.

---

# 8. Perfis

Os perfis representam padrões predominantes de comportamento.

Cada avaliação define seus próprios perfis.

Os perfis não fazem parte da plataforma de forma fixa.

Cada perfil deverá possuir:

- nome;
- descrição;
- pontos fortes;
- pontos de atenção;
- recomendações;
- relatório correspondente.

---

# 9. Sistema de Pontuação

Toda resposta gera pontuação.

A pontuação considera:

- alternativa escolhida;
- peso da pergunta;
- peso da dimensão.

A regra de cálculo é configurável por avaliação.

Não existe pontuação negativa.

---

# 10. Resultado

Ao concluir a avaliação, deverá ser identificado:

- perfil predominante;
- distribuição dos demais perfis;
- percentual de cada perfil.

O resultado nunca deverá apresentar apenas um rótulo.

Sempre deverá explicar o comportamento identificado.

---

# 11. Resultado Híbrido

Caso dois perfis apresentem pontuação equivalente dentro da margem definida pela plataforma, o sistema poderá apresentar um resultado híbrido.

Exemplo:

"Seu comportamento apresenta características dos perfis Explorador Analítico e Refinador Estratégico."

O resultado híbrido deverá explicar ambos os perfis.

---

# 12. Relatório Personalizado

Todo relatório deverá conter:

- introdução;
- explicação do perfil predominante;
- distribuição dos perfis;
- pontos fortes;
- pontos de atenção;
- plano de ação;
- próximos passos;
- aviso legal.

---

# 13. Persistência

Durante uma avaliação:

o progresso deverá ser preservado.

Caso o usuário retorne posteriormente, a plataforma poderá restaurar o estado anterior.

A estratégia de persistência é responsabilidade da implementação técnica.

---

# 14. Casos de Exceção

Caso a avaliação esteja incompleta:

não gerar resultado.

Caso não exista resultado válido:

reiniciar o fluxo.

Caso o relatório não esteja disponível:

informar o usuário e permitir nova tentativa.

Mensagens técnicas nunca deverão ser apresentadas ao usuário final.

---

# 15. Linguagem

Toda comunicação deverá utilizar linguagem:

- clara;
- educativa;
- positiva;
- objetiva.

Nunca utilizar linguagem alarmista.

Nunca afirmar condições médicas ou psicológicas.

Sempre utilizar expressões como:

- "Você tende a..."
- "Seu comportamento sugere..."
- "É comum que pessoas com este perfil..."

---

# 16. Escalabilidade

A plataforma deverá permitir:

- novas avaliações;
- novos perfis;
- novas dimensões;
- novos idiomas;
- novos relatórios.

Sem alterar estas regras de negócio.

---

# 17. Regras de Evolução

Uma nova avaliação somente poderá ser adicionada quando possuir:

- objetivo definido;
- dimensões definidas;
- perguntas definidas;
- perfis definidos;
- relatório definido.

Nenhuma avaliação poderá ser publicada incompleta.

---

# 18. Restrições

É proibido que qualquer avaliação:

- realize diagnóstico clínico;
- realize diagnóstico psicológico;
- faça promessas de transformação;
- utilize linguagem discriminatória;
- apresente resultados sem explicação.

---

# 19. Critérios de Aceite

Uma avaliação será considerada válida quando:

- todas as perguntas estiverem respondidas;
- todos os perfis estiverem definidos;
- todas as regras de pontuação estiverem configuradas;
- existir um resultado válido;
- existir um relatório correspondente;
- todos os casos de exceção estiverem tratados.

---

# 20. Definição Oficial

A plataforma NEXO identifica tendências comportamentais a partir das respostas fornecidas pelo usuário.

Todo resultado representa uma interpretação baseada no modelo definido para cada avaliação e possui finalidade exclusivamente educativa.

Nenhuma avaliação da plataforma deverá ser interpretada como diagnóstico profissional.
