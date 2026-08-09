import { pictoApi } from "@/config/api-picto/api-picto.config";
import { createArticle, deleteArticle, getArticles } from "./articles.service";

jest.mock("@/config/api-picto/api-picto.config", () => ({
  pictoApi: {
    post: jest.fn(),
    get: jest.fn(),
    delete: jest.fn(),
  },
}));

const mockedPictoApi = pictoApi as jest.Mocked<typeof pictoApi>;

describe("axios-articles service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("createArticle calls pictoApi.post with correct url, body and bearer token", async () => {
    mockedPictoApi.post.mockResolvedValueOnce({
      data: { id: "1", title: "Test" },
    });

    const payload = {
      title: "Mi título",
      resume: "Resumen",
      body: "Contenido",
      token: "token-123",
    };

    const result = await createArticle(payload);

    expect(mockedPictoApi.post).toHaveBeenCalledWith(
      "/articles/create",
      {
        title: "Mi título",
        resume: "Resumen",
        body: "Contenido",
      },
      {
        headers: {
          Authorization: `Bearer token-123`,
        },
      },
    );
    expect(result).toEqual({ id: "1", title: "Test" });
  });

  it("getArticles calls pictoApi.get with auth header", async () => {
    mockedPictoApi.get.mockResolvedValueOnce({
      data: [{ id: "1", title: "A" }],
    });

    const result = await getArticles("token-abc");

    expect(mockedPictoApi.get).toHaveBeenCalledWith("/articles", {
      headers: {
        Authorization: `Bearer token-abc`,
      },
    });
    expect(result).toEqual([{ id: "1", title: "A" }]);
  });

  it("deleteArticle calls pictoApi.delete with the correct article id", async () => {
    mockedPictoApi.delete.mockResolvedValueOnce({ data: { deleted: true } });

    const result = await deleteArticle("token-123", "42");

    expect(mockedPictoApi.delete).toHaveBeenCalledWith("/articles/42", {
      headers: {
        Authorization: `Bearer token-123`,
      },
    });
    expect(result).toEqual({ deleted: true });
  });

  it("rethrows when pictoApi.post fails", async () => {
    const error = new Error("API error");
    mockedPictoApi.post.mockRejectedValueOnce(error);

    await expect(
      createArticle({
        title: "x",
        resume: "y",
        body: "z",
        token: "token",
      }),
    ).rejects.toThrow("API error");
  });
});
