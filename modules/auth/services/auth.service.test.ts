import { pictoApi } from "@/config/api-picto/api-picto.config";
import axios from "axios";
import * as authService from "../services/auth.service";

jest.mock("@/config/api-picto/api-picto.config", () => ({
  pictoApi: {
    post: jest.fn(),
    get: jest.fn(),
    delete: jest.fn(),
  },
}));

const mockedApi = pictoApi as jest.Mocked<typeof pictoApi>;

describe("register", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns response data", async () => {
    const user = {
      email: "test@test.com",
      password: "123456",
    };

    const response = {
      data: {
        token: "abc123",
      },
    };

    mockedApi.post.mockResolvedValue(response);

    const result = await authService.register(user as any);

    expect(mockedApi.post).toHaveBeenCalledWith("/auth/register", user);

    expect(result).toEqual(response.data);
  });
});

describe("login", () => {
  it("calls login endpoint", async () => {
    const user = {
      email: "test@test.com",
      password: "123456",
    };

    mockedApi.post.mockResolvedValue({
      data: {
        token: "jwt-token",
      },
    });

    const result = await authService.login(user as any);

    expect(mockedApi.post).toHaveBeenCalledWith("/auth/login", user);

    expect(result).toEqual({
      token: "jwt-token",
    });
  });
});

describe("getOneUserbyId", () => {
  it("sends bearer token", async () => {
    mockedApi.get.mockResolvedValue({
      data: {
        id: "1",
        name: "Carlos",
      },
    });

    const result = await authService.getOneUserbyId("1", "token123");

    expect(mockedApi.get).toHaveBeenCalledWith("/auth/1", {
      headers: {
        Authorization: "Bearer token123",
      },
    });

    expect(result).toEqual({
      id: "1",
      name: "Carlos",
    });
  });
});

describe("deleteUser", () => {
  it("calls delete endpoint", async () => {
    mockedApi.delete.mockResolvedValue({
      data: {
        success: true,
      },
    });

    const result = await authService.deleteUser("token123");

    expect(mockedApi.delete).toHaveBeenCalledWith("/auth/user", {
      headers: {
        Authorization: "Bearer token123",
      },
    });

    expect(result).toEqual({
      success: true,
    });
  });
});

describe("register errors", () => {
  it("throws backend message", async () => {
    const error = {
      isAxiosError: true,
      response: {
        data: {
          message: "Email already exists",
        },
      },
    };

    mockedApi.post.mockRejectedValue(error);

    jest.spyOn(axios, "isAxiosError").mockReturnValue(true);

    await expect(authService.register({} as any)).rejects.toBe(
      "Email already exists",
    );
  });
});

it("throws generic error", async () => {
  mockedApi.get.mockRejectedValue("boom");

  jest.spyOn(axios, "isAxiosError").mockReturnValue(false);

  await expect(authService.getOneUserbyId("1", "token")).rejects.toThrow(
    "Problem buscando usuario con 1",
  );
});
