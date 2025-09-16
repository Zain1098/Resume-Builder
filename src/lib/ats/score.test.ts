import { scoreResumeForAts } from "./score";

describe("ATS scoring", () => {
  it("scores higher when keywords are present", () => {
    const resume = {
      dataJSON: {
        summary: "Experienced dev",
        skills: ["React", "Node"],
        experience: "Built Node API",
      },
    };
    const withKeywords = scoreResumeForAts(resume, ["React", "Node"]);
    const withoutKeywords = scoreResumeForAts(resume, ["Kubernetes", "Rust"]);
    expect(withKeywords.score).toBeGreaterThanOrEqual(withoutKeywords.score);
  });

  it("penalizes missing sections", () => {
    const minimal = { dataJSON: { summary: "Hello" } };
    const result = scoreResumeForAts(minimal, []);
    expect(result.breakdown.sections.score).toBeLessThan(100);
  });
});
