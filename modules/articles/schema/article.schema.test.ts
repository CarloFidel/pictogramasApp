import { ArticleSchema } from "./article.schema";

describe("ArticleSchema", () => {
  it("accepts valid article data", () => {
    const result = ArticleSchema.safeParse({
      title: "Mi título",
      resume: "Resumen breve",
      body: "Este es el contenido del artículo con más de dos letras.",
    });

    expect(result.success).toBe(true);
  });

  it("rejects a title shorter than 2 characters", () => {
    const result = ArticleSchema.safeParse({
      title: "A",
      resume: "Resumen breve",
      body: "Contenido válido",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = result.error.issues.find(
        (issue) => issue.path[0] === "title",
      );
      expect(issue).toBeDefined();
      expect(issue?.path).toEqual(["title"]);
      expect(issue?.message).toContain("más de dos letras");
    }
  });

  it("rejects a resume longer than 70 characters", () => {
    const longResume = "a".repeat(71);
    const result = ArticleSchema.safeParse({
      title: "Título válido",
      resume: longResume,
      body: "Contenido válido",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = result.error.issues.find(
        (issue) => issue.path[0] === "resume",
      );
      expect(issue).toBeDefined();
      expect(issue?.path).toEqual(["resume"]);
      expect(issue?.message).toContain("no debe tener más de 70 letras");
    }
  });

  it("rejects a body shorter than 2 characters", () => {
    const result = ArticleSchema.safeParse({
      title: "Título válido",
      resume: "Resumen válido",
      body: "A",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = result.error.issues.find(
        (issue) => issue.path[0] === "body",
      );
      expect(issue).toBeDefined();
      expect(issue?.path).toEqual(["body"]);
      expect(issue?.message).toContain("más de 2 letras");
    }
  });

  it("rejects a body longer than 200 characters", () => {
    const longBody = "a".repeat(201);
    const result = ArticleSchema.safeParse({
      title: "Título válido",
      resume: "Resumen válido",
      body: longBody,
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = result.error.issues.find(
        (issue) => issue.path[0] === "body",
      );
      expect(issue).toBeDefined();
      expect(issue?.path).toEqual(["body"]);
      expect(issue?.message).toContain("no debe tener más de 200 letrass");
    }
  });
});
