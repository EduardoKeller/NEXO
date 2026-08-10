import { describe, expect, it } from "vitest";

import { assessment } from "@/core/content/assessment";
import { dimensions } from "@/core/content/dimensions";
import { questions } from "@/core/content/questions";

describe("core/content assessment referential integrity", () => {
  it("composes the same questions and dimensions arrays used elsewhere in core/content", () => {
    expect(assessment.questions).toBe(questions);
    expect(assessment.dimensions).toBe(dimensions);
  });

  it("has the official MVP identity", () => {
    expect(assessment.id).toBe("assessment_procrastination_v1");
    expect(assessment.slug).toBe("procrastination-assessment");
    expect(assessment.status).toBe("Active");
  });
});
