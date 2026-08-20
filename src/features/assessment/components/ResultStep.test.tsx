import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ResultStep } from "@/features/assessment/components/ResultStep";
import type {
  AssessmentResult,
  EvolutionMission,
  EvolutionResource,
  Insight,
} from "@/features/assessment/types/assessment";

/**
 * Harness mínimo de renderização (sem @testing-library/react, indisponível no
 * projeto — mesmo padrão de useAssessmentFlow.test.tsx). Monta o componente
 * num container descartável e devolve esse container para asserções via DOM.
 */
function renderComponent(ui: React.ReactElement) {
  const container = document.createElement("div");
  let root: Root;

  act(() => {
    root = createRoot(container);
    root.render(ui);
  });

  return {
    container,
    unmount: () => act(() => root.unmount()),
  };
}

/** Encontra o `<p>` de rótulo de seção pelo texto exato (todos os títulos do ResultStep são `<p>`). */
function findSectionHeading(container: HTMLElement, text: string): Element | null {
  return Array.from(container.querySelectorAll("p")).find((el) => el.textContent === text) ?? null;
}

function listItemTexts(heading: Element | null): string[] {
  const list = heading?.nextElementSibling;
  return Array.from(list?.querySelectorAll("li") ?? []).map((li) => li.textContent ?? "");
}

const BASE_RESULT: AssessmentResult = {
  archetypeName: "Executor Sob Pressão",
  archetypeSummary: "Você tende a produzir melhor quando existe um prazo definido.",
  confidenceScore: 78,
  behaviorIndexes: [
    { dimension: "initiative", label: "Iniciativa", value: 20 },
    { dimension: "consistency", label: "Consistência", value: 84 },
  ],
  strengths: ["Agilidade.", "Boa resposta em momentos críticos."],
  attentionPoints: ["Dependência de urgência.", "Estresse frequente."],
  insights: [],
  evolutionPlan: {
    firstStep: "Criar prazos intermediários para tarefas importantes.",
    habits: [],
    missions: [],
    resources: [],
    difficulty: "Easy",
    estimatedDuration: 7,
  },
};

const SAMPLE_INSIGHT: Insight = {
  id: "insight_1",
  indicatorId: "initiative_start",
  priority: "High",
  title: "Você inicia melhor quando existe clareza.",
  description: "Tarefas bem definidas são iniciadas com mais facilidade.",
  recommendation: "Divida grandes tarefas em pequenas ações executáveis.",
};

const SAMPLE_MISSION: EvolutionMission = {
  id: "mission_1",
  title: "Primeiro Movimento",
  goal: "Dar início a uma tarefa importante.",
  difficulty: "Easy",
  estimatedTime: 5,
};

const SAMPLE_RESOURCE: EvolutionResource = {
  id: "resource_1",
  type: "Article",
  title: "Como dividir grandes tarefas em pequenas ações.",
  estimatedTime: 6,
};

describe("ResultStep", () => {
  let unmount: () => void;

  afterEach(() => {
    unmount?.();
  });

  function setup(result: AssessmentResult, onRestart: () => void = () => {}) {
    const rendered = renderComponent(<ResultStep result={result} onRestart={onRestart} />);
    unmount = rendered.unmount;
    return rendered.container;
  }

  describe("arquétipo", () => {
    it("renders archetypeName, archetypeSummary and confidenceScore", () => {
      const container = setup(BASE_RESULT);

      expect(container.querySelector('[data-slot="card-title"]')?.textContent).toBe(
        BASE_RESULT.archetypeName,
      );
      expect(container.querySelector('[data-slot="card-description"]')?.textContent).toBe(
        BASE_RESULT.archetypeSummary,
      );
      expect(container.querySelector('[data-slot="badge"]')?.textContent).toBe(
        `Confiança ${BASE_RESULT.confidenceScore}%`,
      );
    });
  });

  describe("behaviorIndexes", () => {
    it("renders label and value for each behaviorIndex as an accessible progressbar", () => {
      const container = setup(BASE_RESULT);

      const bars = container.querySelectorAll('[role="progressbar"]');
      expect(bars).toHaveLength(BASE_RESULT.behaviorIndexes.length);

      BASE_RESULT.behaviorIndexes.forEach((index, position) => {
        const bar = bars[position];
        expect(bar.getAttribute("aria-valuenow")).toBe(String(index.value));
        expect(bar.textContent).toContain(index.label);
      });
    });
  });

  describe("insights", () => {
    it("renders title, description and recommendation for each insight when present", () => {
      const container = setup({ ...BASE_RESULT, insights: [SAMPLE_INSIGHT] });

      expect(findSectionHeading(container, "Insights")).not.toBeNull();
      expect(container.textContent).toContain(SAMPLE_INSIGHT.title);
      expect(container.textContent).toContain(SAMPLE_INSIGHT.description);
      expect(container.textContent).toContain(SAMPLE_INSIGHT.recommendation);
    });

    it("does not render the Insights section when insights is empty", () => {
      const container = setup({ ...BASE_RESULT, insights: [] });

      expect(findSectionHeading(container, "Insights")).toBeNull();
    });
  });

  describe("pontos fortes", () => {
    it("renders each strength as a list item", () => {
      const container = setup(BASE_RESULT);

      const heading = findSectionHeading(container, "Pontos Fortes");
      expect(heading).not.toBeNull();
      expect(listItemTexts(heading)).toEqual(BASE_RESULT.strengths);
    });
  });

  describe("pontos de atenção", () => {
    it("renders each attention point as a list item", () => {
      const container = setup(BASE_RESULT);

      const heading = findSectionHeading(container, "Pontos de Atenção");
      expect(heading).not.toBeNull();
      expect(listItemTexts(heading)).toEqual(BASE_RESULT.attentionPoints);
    });
  });

  describe("evolutionPlan", () => {
    it("renders evolutionPlan.firstStep", () => {
      const container = setup(BASE_RESULT);

      const heading = findSectionHeading(container, "Primeiro Passo");
      expect(heading).not.toBeNull();
      expect(heading?.nextElementSibling?.textContent).toBe(BASE_RESULT.evolutionPlan.firstStep);
    });

    it("renders habits as list items when present", () => {
      const habits = ["Planejamento diário.", "Revisão semanal."];
      const container = setup({
        ...BASE_RESULT,
        evolutionPlan: { ...BASE_RESULT.evolutionPlan, habits },
      });

      const heading = findSectionHeading(container, "Hábitos Recomendados");
      expect(heading).not.toBeNull();
      expect(listItemTexts(heading)).toEqual(habits);
    });

    it("does not render Hábitos Recomendados when habits is empty (not an error state)", () => {
      const container = setup(BASE_RESULT);

      expect(findSectionHeading(container, "Hábitos Recomendados")).toBeNull();
    });

    it("renders missions as list items when present", () => {
      const container = setup({
        ...BASE_RESULT,
        evolutionPlan: { ...BASE_RESULT.evolutionPlan, missions: [SAMPLE_MISSION] },
      });

      const heading = findSectionHeading(container, "Missão");
      expect(heading).not.toBeNull();
      expect(listItemTexts(heading)).toEqual([SAMPLE_MISSION.title]);
    });

    it("does not render Missão when missions is empty (not an error state)", () => {
      const container = setup(BASE_RESULT);

      expect(findSectionHeading(container, "Missão")).toBeNull();
    });

    it("renders resources as list items when present", () => {
      const container = setup({
        ...BASE_RESULT,
        evolutionPlan: { ...BASE_RESULT.evolutionPlan, resources: [SAMPLE_RESOURCE] },
      });

      const heading = findSectionHeading(container, "Recursos");
      expect(heading).not.toBeNull();
      expect(listItemTexts(heading)).toEqual([SAMPLE_RESOURCE.title]);
    });

    it("does not render Recursos when resources is empty (not an error state)", () => {
      const container = setup(BASE_RESULT);

      expect(findSectionHeading(container, "Recursos")).toBeNull();
    });
  });

  describe("interação", () => {
    it("calls onRestart exactly once when Refazer Avaliação is clicked", () => {
      const onRestart = vi.fn();
      const container = setup(BASE_RESULT, onRestart);

      const button = Array.from(container.querySelectorAll("button")).find(
        (candidate) => candidate.textContent === "Refazer Avaliação",
      );
      expect(button).toBeDefined();

      act(() => {
        button?.click();
      });

      expect(onRestart).toHaveBeenCalledTimes(1);
    });
  });
});
